# Recognize

`rpc Recognize`([RecognizeRequest](#recognizerequest)) `returns `([RecognizeResponse](#recognizeresponse))

Performs synchronous speech recognition: receive results after all audio has been sent and processed. 

**Note**: Audios more than 60 seconds do not work with sync Recognize. Use [LongRunningRecognize](LongRunningRecognize.md) for long audios.

## RecognizeRequest
The top-level message sent by the client for the Recognize method.

|Fields|Description|
|--|--|
|config	| [RecognitionConfig](../types/RecognitionConfig.md) <br> Required. Provides information to the recognizer that specifies how to process the request.|
|audio	| [RecognitionAudio](../types/RecognitionAudio.md) <br> Required. The audio data to be recognized.|

## RecognizeResponse
The only message returned to the client by the Recognize method. It contains the result as zero or more sequential SpeechRecognitionResult messages.

|Fields | Description|
|--|--|
|results[] | [SpeechRecognitionResult](../types/SpeechRecognitionResult.md) <br> Sequential list of transcription results corresponding to sequential portions of audio.|
