from vernacular.ai import speech
from vernacular.ai.speech import enums, types
import os
import time
import threading
from six.moves import queue


def infer_encoding(file_path: str):
    if ".mp3" in file_path:
        return enums.RecognitionConfig.AudioEncoding.MP3
    elif ".wav" in file_path:
        return enums.RecognitionConfig.AudioEncoding.LINEAR16
    elif ".raw" in file_path:
        return enums.RecognitionConfig.AudioEncoding.LINEAR16

    return enums.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED


class AddAudio(threading.Thread):
   def __init__(self, file_path, _buff):
      threading.Thread.__init__(self)
      self.file_path = file_path
      self._buff = _buff

   def run(self):
      with open(self.file_path, "rb") as file:
        audio_content = file.read()

        for i in range(0, len(audio_content), 8000):
            self._buff.put(audio_content[i:i+8000])
            # add a delay for real time streaming simulation
            time.sleep(0.1)

        # add None to queue to mark end of streaming
        self._buff.put(None)


class SampleRecognizeStreaming():
    def __init__(self, access_token, file_path):
        self.speech_client = speech.SpeechClient(access_token)
        self.file_path = file_path

        config = types.RecognitionConfig(
            encoding=infer_encoding(file_path),
            sample_rate_hertz=8000,
            language_code="en-IN",
            max_alternatives=1,
        )
        self.stream_config = types.StreamingRecognitionConfig(
            config=config,
        )

        self._buff = queue.Queue()

    def run(self):
        requests = (types.StreamingRecognizeRequest(audio_content=content)
                    for content in self.audio_generator())

        responses = self.speech_client.streaming_recognize(self.stream_config, requests)

        # add audios in a new thread to simulate streaming
        t1 = AddAudio(self.file_path, self._buff)
        t1.start()

        # this is blocking call and will wait until server sends the result
        for response in responses:
            for result in response.results:
                alternative = result.alternatives[0]
                print("Transcript: {}".format(alternative.transcript))
                print("Confidence: {}".format(alternative.confidence))


    def audio_generator(self):
        while True:
            chunk = self._buff.get()
            if chunk is None:
                return

            yield chunk


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--access_token", type=str, default=os.environ.get("AUTH_ACCESS_TOKEN")
    )
    parser.add_argument(
        "--file_path", type=str, default="../resources/test-single-channel-8000Hz.raw"
    )
    args = parser.parse_args()

    ss = SampleRecognizeStreaming(args.access_token, args.file_path)
    ss.run()


if __name__ == "__main__":
    main()
