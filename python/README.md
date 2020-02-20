# Python Speech to Text SDK

Python SDK for vernacular.ai speech to text APIs. Go [here](https://github.com/Vernacular-ai/speech-recognition) for detailed product documentation.

## Installation
To install this sdk run:

```shell
pip install vernacular-ai-speech
```

#### Supported Python Versions

Python >= 3.5

## Example Usage

```python
from vernacular.ai import speech
from vernacular.ai.speech import enums, types


def sample_recognize(access_token, file_path):
    """
    Args:
        access_token Token provided by vernacular.ai for authentication
        file_path Path to audio file e.g /path/audio_file.wav
    """
    speech_client = speech.SpeechClient(access_token)

    audio = types.RecognitionAudio(
        content = open(file_path, "rb").read()
    )

    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=8000,
        language_code = "hi-IN",
    )

    response = speech_client.recognize(audio=audio, config=config)

    for result in response.results:
        alternative = result.alternatives[0]
        print("Transcript: {}".format(alternative.transcript))
```

To see more examples, go to [samples](https://github.com/Vernacular-ai/speech-recognition/tree/master/python/samples).
