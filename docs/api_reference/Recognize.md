# Recognize
Performs a synchronous speech recognition i.e receive results after all audio has been sent and processed.

### Request Method
`POST https://asr.vernacular.ai/v1/speech:recognize`

### Request Body
The request body contains data with the following structure:

```js
{
  "config": {
    object (RecognitionConfig)
  },
  "audio": {
    object (RecognitionAudio)
  }
}
```

|Fields||
|--|--|
|config|object ([RecognitionConfig](../types/RecognitionConfig.md))<br>Required. Provides information to the recognizer that specifies how to process the request.|
|audio|object ([RecognitionAudio](../types/RecognitionAudio.md))<br>Required. The audio data to be recognized.|

### Response Body
If successful, the response body contains data with the following structure:

The only message returned to the client by the recognize method. It contains the result as zero or more sequential [SpeechRecognitionResult](../types/SpeechRecognitionResult.md) messages.

```js
{
  "results": [
    {
      object (SpeechRecognitionResult)
    }
  ]
}
```