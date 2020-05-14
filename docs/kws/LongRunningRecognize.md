# LongRunningRecognize
Performs asynchronous keyword spotting recognition. Returns an intermediate response [KWSOperation](#kwsoperation) which will either contains response or an error when processing is done.

To get latest state of speech operation, you can poll for the result using [GetKWSOperation](#getkwsoperation) request.


### Request Method
`POST https://asr.vernacular.ai/v1/kws:longrunningrecognize`

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
  "keywords": [string],
  "result_url": string,
}
```

| Fields | Description|
|--|--|
|config|object ([RecognitionConfig](./RecognitionConfig.md))<br>Required. Provides information to the recognizer that specifies how to process the request.|
|audio|object ([RecognitionAudio](../types/RecognitionAudio.md))<br>Required. The audio data to be recognized.|
|keywords| Array of strings that needs to be searched for |
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
The only message returned to the client by the Recognize method.

```js
{
  "results": [
    {
        "transcript": string,
        "matched_words": [
            {
                "start_time": float,
                "end_time": float,
                "word": string
            }
        ]
    }
  ]
}
```

|Fields | Description|
|--|--|
|results[] | <br> Sequential list of kws results corresponding to sequential portions of audio.|

## GetKWSOperation

`GET https://asr.vernacular.ai/v1/kws_operations/{name}`

Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at some intervals.

|UrlParam|Description|
|--|--|
|name| string <br> The name of the KWSOperation in the [response](#responsebody)|

Returns the [response](#responsebody) again with latest state.

### Sample Request and Response
Request:
```bash
curl -X POST 'https://asr.vernacular.ai/v1/kws:longrunningrecognize' \
--header 'X-ACCESS-TOKEN: {{access-token}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "config": {
      "encoding": "LINEAR16",
      "sampleRateHertz": 8000,
      "languageCode": "en-IN",
    },
    "keywords": ["balance", "credit"],
    "audio": {
      "uri": "https://audio-url.wav"
    }
}'
```
Response:
```json
{
  "name": "3498b75d-4d81-4e96-a83d-129cd8c6b0f5",
  "done": false
}
```

If you poll the operation request

Request:
```bash
curl -X GET 'https://asr.vernacular.ai/v1/kws_operations/3498b75d-4d81-4e96-a83d-129cd8c6b0f5' \
--header 'X-ACCESS-TOKEN: {{access-token}}' \
--header 'Content-Type: application/json'
```

Response on completion:
```json
{
  "name": "3498b75d-4d81-4e96-a83d-129cd8c6b0f5",
  "done": true,
  "results": [
      {
          "transcript": "i want to know about my credit card balance",
          "matched_words": [
              {
                  "start_time": 3.34,
                  "end_time": 3.70,
                  "word": "credit"
              },
              {
                  "start_time": 3.84,
                  "end_time": 4.23,
                  "word": "balance"
              }
          ]
      }
  ]
}
```