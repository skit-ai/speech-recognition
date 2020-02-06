# Speech-to-Text API
Converts audio to text

**ServiceHost:** https://asr.vernacular.ai

We recommend that you call this service using Vernacular provided client libraries. If your application needs to call this service using your own libraries, you should use the HTTP Endpoints.


## Ways to use the Service
- Transcribing short audios
- Transcribing long audios [more than 1 min]
- Transcribing audio from streaming input


## REST Reference
### Types
- [RecognitionConfig](docs/types/RecognitionConfig.md)
- [RecognitionAudio](docs/types/RecognitionAudio.md)

### APIs
| Name | Description |
|--|--|
| [recognize](docs/api_reference/Recognize.md) | Performs synchronous speech recognition: receive results after all audio has been sent and processed. |
| [longrunningrecognize](docs/api_reference/LongRunningRecognize.md) | Performs asynchronous speech recognition. Generally used for long audios |


## RPC Reference

TODO