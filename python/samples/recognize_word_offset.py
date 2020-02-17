from vernacular.ai import speech
from vernacular.ai.speech import enums, types
import os


def sample_recognize(access_token, file_path):
    speech_client = speech.SpeechClient(access_token)

    enable_word_time_offsets = True

    audio = types.RecognitionAudio(
        content = open(file_path, "rb").read()
    )
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=8000,
        language_code = "hi-IN",
        max_alternatives = 1,
        enable_word_time_offsets=enable_word_time_offsets
    )

    response = speech_client.recognize(audio=audio, config=config)

    for result in response.results:
        # First alternative is the most probable result
        alternative = result.alternatives[0]
        print(u"Transcript: {}".format(alternative.transcript))
        print(u"Words: {}".format(alternative.words))


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--access_token", type=str, default=os.environ["AUTH_ACCESS_TOKEN"]
    )
    parser.add_argument(
        "--file_path", type=str, default="../resources/hello.wav"
    )
    args = parser.parse_args()

    sample_recognize(args.access_token, args.file_path)


if __name__ == "__main__":
    main()
