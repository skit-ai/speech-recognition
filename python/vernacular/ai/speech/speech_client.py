import grpc

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
            >>> client = speech.SpeechClient()
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
