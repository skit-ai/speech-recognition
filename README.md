# Speech-to-Text API
Converts audio to text

We support these ten indian languages.
- Hindi
- English
- Marathi
- Kannada
- Malayalam
- Bengali
- Gujarati
- Punjabi
- Telugu
- Tamil

## Authentication
To get access to our APIs reach out to us at hello@vernacular.ai


## Ways to use the Service
- Transcribing short audios
- Transcribing long audios [more than 1 min]
- Transcribing audio from streaming input

We recommend that you call this service using Vernacular provided client libraries. If your application needs to call this service using your own libraries, you should use the HTTP Endpoints.

**Supported SDKs**: [Python](https://github.com/Vernacular-ai/speech-recognition/tree/master/python), [Go](https://github.com/Vernacular-ai/speech-recognition/tree/master/go), [Java](https://github.com/Vernacular-ai/speech-recognition/tree/master/java)


## REST Reference

**ServiceHost:** https://asr.vernacular.ai

### Speech Recognition
| Name | Description |
|--|--|
| [recognize](docs/api_reference/Recognize.md) | Performs synchronous speech recognition: receive results after all audio has been sent and processed. |
| [longrunningrecognize](docs/api_reference/LongRunningRecognize.md) | Performs asynchronous speech recognition. Generally used for long audios |

### Keyword Spotting
| Name | Description |
|--|--|
| [recognize](docs/kws/Recognize.md) | Performs synchronous kws recognition: receive results after all audio has been sent and processed. |
| [longrunningrecognize](docs/kws/LongRunningRecognize.md) | Performs asynchronous kws recognition. Generally used for long audios |

## RPC Reference

### Speech Recognition
| Methods | Description |
|--|--|
|[Recognize](docs/rpc_reference/Recognize.md) | Performs synchronous speech recognition: receive results after all audio has been sent and processed.|
|[LongRunningRecognize](docs/rpc_reference/LongRunningRecognize.md) | Performs asynchronous speech recognition: receive results via the longrunning.Operations interface.|
|[StreamingRecognize](docs/rpc_reference/StreamingRecognize.md)	|Performs streaming speech recognition: receive results while sending audio. Supports both unidirectional and bidirectional streaming.|

### Keyword Spotting

No GRPC APIs exist for key word spotting
