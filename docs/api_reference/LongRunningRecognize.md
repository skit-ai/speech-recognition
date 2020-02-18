# LongRunningRecognize
Performs asynchronous speech recognition. Returns an intermediate response [SpeechOperation](#speechoperation) which will either contains response or an error when processing is done.

To get latest state of speech operation, you can poll for the result using [GetSpeechOperation](#getspeechoperation) request.


### Request Method
`POST https://asr.vernacular.ai/v2/speech:longrunningrecognize`

### Request Headers
```
X-ACCESS-TOKEN: some-access-token
content-type: application/json
```

### Request Body
The request body contains data with the following structure:

```js
{
  "config": {
    object (RecognitionConfig)
  },
  "audio": {
    object (RecognitionAudio)
  },
  "result_url": string,
}
```

| Fields | Description|
|--|--|
|config|object ([RecognitionConfig](../types/RecognitionConfig.md))<br>Required. Provides information to the recognizer that specifies how to process the request.|
|audio|object ([RecognitionAudio](../types/RecognitionAudio.md))<br>Required. The audio data to be recognized.|
|result_url| string<br> Optional. Post the results to this url when done.

### ResponseBody
An intermediate speech operation object which contains response upon completion.

```js
{
  "name": string,
  "done": bool,
  "result": union {
    object (google.grpc.Status),
    object (LongRunningRecognizeResponse),
  },
}
```

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



## GetSpeechOperation

`GET https://asr.vernacular.ai/v2/speech_operations/{name}`

Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at some intervals.

|UrlParam|Description|
|--|--|
|name| string <br> The name of the SpeechOperation in the [response](#responsebody)|

Returns the [response](#responsebody) again with latest state.