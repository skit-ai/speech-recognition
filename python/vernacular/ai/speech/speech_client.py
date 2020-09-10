import grpc
import time

from vernacular.ai.speech.proto import speech_to_text_pb2 as sppt_pb
from vernacular.ai.speech.proto import speech_to_text_pb2_grpc as sppt_grpc_pb
from vernacular.ai.exceptions import VernacularAPICallError


class SpeechClient(object):
    """
    Class that implements Vernacular.ai ASR API
    """

    STTP_GRPC_HOST = "speechapis.vernacular.ai:80"
    AUTHORIZATION = "authorization"
    DEFAULT_TIMEOUT = 30

    def __init__(self, access_token):
        """Constructor.
        Args:
            access_token: The authorization token to send with the requests.
        """
        self.access_token = f"bearer {access_token}"
        self.channel = grpc.insecure_channel(self.STTP_GRPC_HOST)

        self.client = sppt_grpc_pb.SpeechToTextStub(self.channel)
    
    def recognize(self, config, audio, timeout=None):
        """
        Performs synchronous speech recognition: receive results after all audio
        has been sent and processed.

        Example:
            >>> from vernacular.ai import speech
            >>> from vernacular.ai.speech import enums
            >>>
            >>> client = speech.SpeechClient(access_token)
            >>>
            >>> encoding = enums.RecognitionConfig.AudioEncoding.LINEAR16
            >>> sample_rate_hertz = 8000
            >>> language_code = 'en-IN'
            >>> config = {'encoding': encoding, 'sample_rate_hertz': sample_rate_hertz, 'language_code': language_code}
            >>> content = open('path/to/audio/file.wav', 'rb').read()
            >>> audio = {'content': content}
            >>>
            >>> response = client.recognize(config, audio)
        Args:
            config (Union[dict, ~vernacular.ai.speech.types.RecognitionConfig]): Required. Provides information to the
                recognizer that specifies how to process the request.
                If a dict is provided, it must be of the same form as the protobuf
                message :class:`~vernacular.ai.speech.types.RecognitionConfig`
            audio (Union[dict, ~vernacular.ai.speech.types.RecognitionAudio]): Required. The audio data to be recognized.
                If a dict is provided, it must be of the same form as the protobuf
                message :class:`~vernacular.ai.speech.types.RecognitionAudio`
            timeout (Optional[float]): The amount of time, in seconds, to wait
                for the request to complete. Default value is `30s`.
        Returns:
            A :class:`~vernacular.ai.speech.types.RecognizeResponse` instance.
        Raises:
            vernacular.ai.exceptions.VernacularAPICallError: If the request
                    failed for any reason.
            ValueError: If the parameters are invalid.
        """
        request = sppt_pb.RecognizeRequest(config=config, audio=audio)
        if timeout is None:
            timeout = self.DEFAULT_TIMEOUT

        response = None
        try:
            response = self.client.Recognize(
                request,
                timeout=timeout,
                metadata=[(self.AUTHORIZATION, self.access_token)]
            )
            return response
        except Exception as e:
            raise VernacularAPICallError(message=str(e),response=response)


    def long_running_recognize(self, config, audio, timeout=None, poll_time=8, callback=None):
        """
        Performs asynchronous speech recognition. Returns either an
        ``Operation.error`` or an ``Operation.response`` which contains a
        ``LongRunningRecognizeResponse`` message. For more information on
        asynchronous speech recognition, see the
        `how-to <https://github.com/Vernacular-ai/speech-recognition/blob/master/docs/rpc_reference/LongRunningRecognize.md>`.

        Example:
            >>> from vernacular.ai import speech
            >>> from vernacular.ai.speech import enums
            >>>
            >>> client = speech.SpeechClient(access_token)
            >>>
            >>> encoding = enums.RecognitionConfig.AudioEncoding.LINEAR16
            >>> sample_rate_hertz = 8000
            >>> language_code = 'en-IN'
            >>> config = {'encoding': encoding, 'sample_rate_hertz': sample_rate_hertz, 'language_code': language_code}
            >>> content = open('path/to/audio/file.wav', 'rb').read()
            >>> audio = {'content': content}
            >>>
            >>> def handle_result(result):
            ...     # Handle result.
            ...     print(result)
            >>>
            >>> response = client.long_running_recognize(config, audio, callback=handle_result)
        Args:
            config (Union[dict, ~vernacular.ai.speech.types.RecognitionConfig]): Required. Provides information to the
                recognizer that specifies how to process the request.
                If a dict is provided, it must be of the same form as the protobuf
                message :class:`~vernacular.ai.speech.types.RecognitionConfig`
            audio (Union[dict, ~vernacular.ai.speech.types.RecognitionAudio]): Required. The audio data to be recognized.
                If a dict is provided, it must be of the same form as the protobuf
                message :class:`~vernacular.ai.speech.types.RecognitionAudio`
            timeout (Optional[float]): The amount of time, in seconds, to wait
                for the request to complete. Default value is `30s`.
            poll_time (Optional[float]): The amount of time, in seconds, for which results
                should be polled. Default value is `8s`. Min value is 5s.
            callback (Optional): Function to handle response
        Returns:
            A :class:`~vernacular.ai.speech.types.SpeechOperation` instance.
        Raises:
            vernacular.ai.exceptions.VernacularAPICallError: If the request
                failed for any reason.
            ValueError: If the parameters are invalid.
        """
        request = sppt_pb.LongRunningRecognizeRequest(config=config, audio=audio)
        if timeout is None:
            timeout = self.DEFAULT_TIMEOUT
        
        speech_operation = None
        try:
            speech_operation = self.client.LongRunningRecognize(
                request,
                timeout=timeout,
                metadata=[(self.AUTHORIZATION, self.access_token)]
            )
        except Exception as e:
            raise VernacularAPICallError(message=str(e),response=speech_operation)
        
        # set minimum value for poll time
        if poll_time < 5:
            poll_time = 5
        
        operation_request = sppt_pb.SpeechOperationRequest(name=speech_operation.name)
        response = None
        is_done = False
        try:
            while not is_done:
                time.sleep(poll_time)
                response = self.client.GetSpeechOperation(
                    operation_request,
                    timeout=timeout,
                    metadata=[(self.AUTHORIZATION, self.access_token)]
                )
                is_done = response.done

            return response
        except Exception as e:
            raise VernacularAPICallError(message=str(e),response=speech_operation)


    def _streaming_request_iterable(self, config, requests):
        """A generator that yields the config followed by the requests.
        """
        yield self.types.StreamingRecognizeRequest(streaming_config=config)
        for request in requests:
            yield request

    def streaming_recognize(self, config, requests, timeout=None):
        """
        Performs bidirectional streaming speech recognition: receive results while
        sending audio. This method is only available via the gRPC API (not REST).
        Example:
            >>> from vernacular.ai import speech
            >>>
            >>> client = speech.SpeechClient()
            >>> config = types.StreamingRecognitionConfig(
            ...     config=types.RecognitionConfig(
            ...         encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
            ...     ),
            ... )
            >>>
            >>> request = types.StreamingRecognizeRequest(audio_content=b'...')
            >>> requests = [request]
            >>> for element in client.streaming_recognize(requests):
            ...     # process element
            ...     pass
        Args:
            config (vernacular.ai.speech.types.StreamingRecognitionConfig) The config to use for streaming
            requests (iterator[dict|vernacular.ai.speech.types.StreamingRecognizeRequest]):
                The input objects. If a dict is provided, it must be of the
                same form as the protobuf message:`~vernacular.ai.speech.types.StreamingRecognizeRequest`
            timeout (Optional[float]): The amount of time, in seconds, to wait
                for the request to complete. Default value is `30s`.
        Returns:
            Iterable[~vernacular.ai.speech.types.StreamingRecognizeResponse].
        Raises:
            vernacular.ai.exceptions.VernacularAPICallError: If the request
                failed for any reason.
            ValueError: If the parameters are invalid.
        """
        if timeout is None:
            timeout = self.DEFAULT_TIMEOUT

        streaming_responses = self.client.StreamingRecognize(
            self._streaming_request_iterable(config, requests),
            metadata=[(self.AUTHORIZATION, self.access_token)]
        )
        return streaming_responses
