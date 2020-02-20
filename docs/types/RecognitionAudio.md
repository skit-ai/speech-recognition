# RecognitionAudio
Contains audio data in the encoding specified in the RecognitionConfig. Either content or uri must be supplied. Supplying both or neither returns error.

```js
{

  // Union field audio_source can be only one of the following:
  "content": string,
  "uri": string
}
```

| Field | Description  |
|---|---|
| content | string (bytes format) <br> The audio data bytes encoded as specified in RecognitionConfig. Note: as with all bytes fields, proto buffers use a pure binary representation, whereas JSON representations use [base64](https://en.wikipedia.org/wiki/Base64). |
| uri | string <br> URI that points to a file that contains audio data bytes as specified in RecognitionConfig. The file must not be compressed (for example, gzip). Url must be publicly accessible. |


## Encoding to base64
Use base64 command to convert
```shell
base64 source_audio_file -w 0 > dest_audio_file
```

### Content Limits

The API contains the following limits on the size of audio in content field:

| Content Limit	|Audio Length | Audio Size |
|---|---|---|
|Synchronous Requests	|~1 Minute | max 4Mb |
|Streaming Requests	| ~5 Minutes | - |
|Asynchronous Requests|	~480 Minutes | - |
