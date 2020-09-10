from vernacular.ai import speech
from vernacular.ai.speech import enums, types
import os


def infer_encoding(file_path: str):
    if ".mp3" in file_path:
        return enums.RecognitionConfig.AudioEncoding.MP3
    elif ".wav" in file_path:
        return enums.RecognitionConfig.AudioEncoding.LINEAR16
    elif ".raw" in file_path:
        return enums.RecognitionConfig.AudioEncoding.LINEAR16

    return enums.RecognitionConfig.AudioEncoding.ENCODING_UNSPECIFIED


def sample_recognize_streaming(access_token, file_path):
    speech_client = speech.SpeechClient(access_token)

    with open(file_path, "rb") as file:
        audio_content = file.read()

    config = types.RecognitionConfig(
        encoding=infer_encoding(file_path),
        sample_rate_hertz=8000,
        language_code="en-IN",
        max_alternatives=1,
    )
    stream_config = types.StreamingRecognitionConfig(
        config=config,
    )

    # this should ideally be a generator yielding chunks of audio data
    requests = []
    for i in range(0, len(audio_content), 10000):
        requests.append(
            types.StreamingRecognizeRequest(audio_content=audio_content[i:i+10000])
        )

    responses = speech_client.streaming_recognize(stream_config, requests)
    for response in responses:
        for result in response.results:
            # First alternative is the most probable result
            alternative = result.alternatives[0]
            print("Transcript: {}".format(alternative.transcript))
            print("Confidence: {}".format(alternative.confidence))


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

    sample_recognize_streaming(args.access_token, args.file_path)


if __name__ == "__main__":
    main()
