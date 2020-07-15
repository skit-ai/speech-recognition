from vernacular.ai import speech
from vernacular.ai.speech import enums, types
import os

def infer_encoding(file_path: str):
    if ".mp3" in file_path:
        return enums.RecognitionConfig.AudioEncoding.MP3
    elif ".wav" in file_path:
        return enums.RecognitionConfig.AudioEncoding.LINEAR16

    return enums.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED


def sample_recognize(access_token, file_path):
    speech_client = speech.SpeechClient(access_token)

    # The number of channels in the input audio file
    audio_channel_count = 2

    # When set to true, each audio channel will be recognized separately.
    # The recognition result will contain a channel_tag field to state which
    # channel that result belongs to
    enable_separate_recognition_per_channel = True

    audio = types.RecognitionAudio(
        content = open(file_path, "rb").read()
    )
    config = types.RecognitionConfig(
        encoding=infer_encoding(file_path),
        sample_rate_hertz=8000,
        language_code = "hi-IN",
        max_alternatives = 1,
        enable_separate_recognition_per_channel=enable_separate_recognition_per_channel,
        audio_channel_count=audio_channel_count,
    )

    response = speech_client.recognize(audio=audio, config=config, timeout=60)

    for result in response.results:
        alternative = result.alternatives[0]
        print("Transcript: {}".format(alternative.transcript))
        print("ChannelTag: {}".format(result.channel_tag))


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--access_token", type=str, default=os.environ.get("AUTH_ACCESS_TOKEN")
    )
    parser.add_argument(
        "--file_path", type=str, default="../resources/hello.wav"
    )
    args = parser.parse_args()

    sample_recognize(args.access_token, args.file_path)


if __name__ == "__main__":
    main()
