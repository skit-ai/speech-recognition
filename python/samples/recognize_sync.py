from vernacular.ai import speech
from vernacular.ai.speech import enums, types
import os


def sample_recognize(file_path):
    speech_client = speech.SpeechClient(os.environ["AUTH_ACCESS_TOKEN"])

    audio = types.RecognitionAudio(
        content = open(file_path, "rb").read()
    )
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=8000,
        language_code = "hi-IN",
        max_alternatives = 1,
    )

    response = speech_client.recognize(audio=audio, config=config)

    print("Response", response)


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--file_path", type=str, default="../resources/hello.wav"
    )
    args = parser.parse_args()

    sample_recognize(args.file_path)


if __name__ == "__main__":
    main()
