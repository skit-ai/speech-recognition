# Recognize
Performs a synchronous speech recognition i.e receive results after all audio has been sent and processed.

**Note**: Audios more than 60 seconds do not work with sync Recognize. Use [LongRunningRecognize](LongRunningRecognize.md) for long audios.

### Request Method
`POST https://asr.vernacular.ai/v2/speech:recognize`

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

### Sample Request and Response
Request:
```bash
curl -X POST 'https://asr.vernacular.ai/v2/speech:recognize' \
--header 'X-ACCESS-TOKEN: {{access-token}}' \
--header 'Content-Type: application/json' \
--data-raw '{
    "config": {
      "encoding": "LINEAR16",
      "sampleRateHertz": 8000,
      "languageCode": "en-IN",
      "maxAlternatives": 2
    },
    "audio": {
      "uri": "https://audio-url.wav"
    }
}'
```
Response:
```json
{
    "results": [
        {
            "alternatives": [
                {
                    "transcript": "i want to know my balance",
                    "confidence": 0.95417684
                },
                {
                    "transcript": "i want know balance",
                    "confidence": 0.95404005
                }
            ]
        }
    ]
}
```
