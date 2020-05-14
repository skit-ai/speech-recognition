# RecognitionConfig
Provides information to the recognizer that specifies how to process the request.

```js
{
  "encoding": enum (AudioEncoding),
  "sampleRateHertz": integer,
  "audioChannelCount": integer,
  "enableSeparateRecognitionPerChannel": boolean,
  "languageCode": string,
}
```

| Field  | Description  |
|---|---|
|  encoding |  enum ([AudioEncoding](#audioencoding)) <br> Encoding of audio data sent in all RecognitionAudio messages. This field is optional for FLAC and WAV audio files and required for all other audio formats. For details, see AudioEncoding.|
| sampleRateHertz  |  integer <br> Sample rate in Hertz of the audio data sent in all RecognitionAudio messages. For now we only support 8000Hz. In case your audio is of any other sampling rate, consider resampling to 8000Hz. |
| audioChannelCount  | integer <br> The number of channels in the input audio data. ONLY set this for MULTI-CHANNEL recognition. Valid values for LINEAR16 and FLAC are 1-8. If 0 or omitted, defaults to one channel (mono). <br> **Note**: We only recognize the first channel by default. To perform independent recognition on each channel set enableSeparateRecognitionPerChannel to 'true'.  |
| enableSeparateRecognitionPerChannel  |  boolean <br> This needs to be set to true explicitly and audioChannelCount > 1 to get each channel recognized separately. The recognition result will contain a channelTag field to state which channel that result belongs to. If this is not true, we will only recognize the first channel. The request is billed cumulatively for all channels recognized: audioChannelCount multiplied by the length of the audio. |
| languageCode  | string <br> Required. The language of the supplied audio as a BCP-47 language tag. Example: "en-IN". See [Language Support](#languagesupport) for a list of the currently supported language codes. |


## AudioEncoding
The encoding of the audio data sent in the request.

All encodings support only 1 channel (mono) audio, unless the audioChannelCount and enableSeparateRecognitionPerChannel fields are set.

For best results, the audio source should be captured and transmitted using a lossless encoding (FLAC or LINEAR16). The accuracy of the speech recognition can be reduced if lossy codecs are used to capture or transmit audio, particularly if background noise is present. Lossy codecs include MULAW, AMR, AMR_WB, OGG_OPUS, SPEEX_WITH_HEADER_BYTE, and MP3.


| Format | Description  |
|--|--|
|LINEAR16|	Uncompressed 16-bit signed little-endian samples (Linear PCM).|


## LanguageSupport
Vernacular ASR only supports indian languages for now. Use these language codes for following languages.
|Language| Code |
|--|--|
|Hindi | hi-IN |
|English | en-IN |
|Kannada | kn-IN |
|Malayalam| ml-IN|
|Bengali | bn-IN|
|Marathi | mr-IN |
|Gujarati | gu-IN |
|Punjabi | pa-IN |
|Telugu | te-IN|
|Tamil | ta-IN|
