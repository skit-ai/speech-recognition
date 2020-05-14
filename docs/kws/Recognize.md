# Recognize
Performs a synchronous speech recognition i.e receive results after all audio has been sent and processed.

### Request Method
`POST https://asr.vernacular.ai/v1/kws:recognize`

### Request Headers
```
X-ACCESS-TOKEN: some-access-token
content-type: application/json
```

### Request Body
The request body contains data with the following structure:

```js
{
  "config":  {
    object (RecognitionConfig)
  },
  "audio": {
    object (RecognitionAudio)
  },
  "keywords": [string],
}
```

|Fields||
|--|--|
|config|object ([RecognitionConfig](./RecognitionConfig.md))<br>Required. Provides information to the recognizer that specifies how to process the request.|
|audio|object ([RecognitionAudio](../types/RecognitionAudio.md))<br>Required. The audio data to be recognized.|
|keywords| Array of strings that needs to be searched for |

### Response Body
If successful, the response body contains data with the following structure:

The only message returned to the client by the recognize method.

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

### Sample Request and Response
Request:
```bash
curl -X POST 'https://asr.vernacular.ai/v1/kws:recognize' \
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
