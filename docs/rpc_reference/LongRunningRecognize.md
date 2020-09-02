# LongRunningRecognize

`rpc LongRunningRecognize`([LongRunningRecognizeRequest](#longrunningrecognizerequest)) `returns `([SpeechOperation](#speechoperation))

Performs asynchronous speech recognition: receive results via SpeechOperation. Returns either an SpeechOperation.error or an SpeechOperation.response which contains a [LongRunningRecognizeResponse](#longrunningrecognizeresponse) message.

To get latest state of speech operation, you can poll for the result using [GetSpeechOperation](#getspeechoperation) rpc.


## GetSpeechOperation

`rpc GetSpeechOperation`([SpeechOperationRequest](#speechoperationrequest))` returns `([SpeechOperation](#speechoperation))

Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at some intervals.

#### SpeechOperationRequest
|Fields|Description|
|--|--|
|name| string <br> The name of the SpeechOperation i.e [SpeechOperation.name](#speechoperation)|


## LongRunningRecognizeRequest
The top-level message sent by the client for the Recognize method.

|Fields|Description|
|--|--|
|config	| [RecognitionConfig](../types/RecognitionConfig.md) <br> Required. Provides information to the recognizer that specifies how to process the request.|
|audio	| [RecognitionAudio](../types/RecognitionAudio.md) <br> Required. The audio data to be recognized.|
|result_url	| string <br> Optional. Post the results to this url when done. Url must be accessible through our servers.|

## SpeechOperation
An intermediate operation object which contains response upon completion

|Fields| Description |
|--|--|
|name| string <br> The server-assigned name, which is only unique within the same service that originally returns it.|
|done| bool <br> If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available.|
|result| Union field <br> The operation result, which can be either an error or a valid response. If done == false, neither error nor response is set. If done == true, exactly one of error or response is set. See below for more details|

`result` can be only one of the following:
| Field| |
|--|--|
|error|	google.rpc.Status <br> The error result of the operation in case of failure or cancellation.|
|response| [LongRunningRecognizeResponse](#longrunningrecognizeresponse) <br> The normal response of the operation in case of success.|

## LongRunningRecognizeResponse
The only message returned to the client by the Recognize method. It contains the result as zero or more sequential SpeechRecognitionResult messages.

|Fields | Description|
|--|--|
|results[] | [SpeechRecognitionResult](../types/SpeechRecognitionResult.md) <br> Sequential list of transcription results corresponding to sequential portions of audio.|
