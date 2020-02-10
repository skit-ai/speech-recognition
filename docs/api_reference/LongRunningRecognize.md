# LongRunningRecognize
Performs asynchronous speech recognition

### Request Method
`POST https://asr.vernacular.ai/v1/speech:longrunningrecognize`

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
  "resultUrl": string,
}
```

|Fields||
|--|--|
|config|object ([RecognitionConfig](../types/RecognitionConfig.md))<br>Required. Provides information to the recognizer that specifies how to process the request.|
|audio|object ([RecognitionAudio](../types/RecognitionAudio.md))<br>Required. The audio data to be recognized.|
|resultUrl| string<br> Optional. Post the results to this url when done.

### Response Body
TODO