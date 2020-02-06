# RecognitionConfig
Provides information to the recognizer that specifies how to process the request.

```js
{
  "encoding": enum (AudioEncoding),
  "sampleRateHertz": integer,
  "audioChannelCount": integer,
  "enableSeparateRecognitionPerChannel": boolean,
  "languageCode": string,
  "maxAlternatives": integer,
  "speechContexts": [
    {
      object (SpeechContext)
    }
  ],
  "enableWordTimeOffsets": boolean,
  "diarizationConfig": {
    object (SpeakerDiarizationConfig)
  },
}
```

| Field  | Description  |
|---|---|
|  encoding |  enum ([AudioEncoding](#audioencoding)) <br> Encoding of audio data sent in all RecognitionAudio messages. This field is optional for FLAC and WAV audio files and required for all other audio formats. For details, see AudioEncoding.|
| sampleRateHertz  |  integer <br> Sample rate in Hertz of the audio data sent in all RecognitionAudio messages. Valid values are: 8000-48000. 16000 is optimal. For best results, set the sampling rate of the audio source to 16000 Hz. If that's not possible, use the native sample rate of the audio source (instead of re-sampling). This field is optional for FLAC and WAV audio files, but is required for all other audio formats. For details, see AudioEncoding. |
| audioChannelCount  | integer <br> The number of channels in the input audio data. ONLY set this for MULTI-CHANNEL recognition. Valid values for LINEAR16 and FLAC are 1-8. If 0 or omitted, defaults to one channel (mono). <br> **Note**: We only recognize the first channel by default. To perform independent recognition on each channel set enableSeparateRecognitionPerChannel to 'true'.  |
| enableSeparateRecognitionPerChannel  |  boolean <br> This needs to be set to true explicitly and audioChannelCount > 1 to get each channel recognized separately. The recognition result will contain a channelTag field to state which channel that result belongs to. If this is not true, we will only recognize the first channel. The request is billed cumulatively for all channels recognized: audioChannelCount multiplied by the length of the audio. |
| languageCode  | string <br> Required. The language of the supplied audio as a BCP-47 language tag. Example: "en-US". See Language Support for a list of the currently supported language codes. |
| maxAlternatives  | integer <br> Maximum number of recognition hypotheses to be returned. Specifically, the maximum number of SpeechRecognitionAlternative messages within each SpeechRecognitionResult. The server may return fewer than maxAlternatives. Valid values are 0-10. A value of 0 or 1 will return a maximum of one. If omitted, will return a maximum of one. |
|speechContexts[] | object ([SpeechContext](#speechcontext)) <br> Array of SpeechContext|
| diarizationConfig	| object ([SpeakerDiarizationConfig](#speakerdiarizationconfig)) <br> Config to enable speaker diarization and set additional parameters to make diarization better suited for your application. |
| enableWordTimeOffsets  | boolean <br> If true, the top result includes a list of words and the start and end time offsets (timestamps) for those words. If false, no word-level time offset information is returned. The default is false. |


## AudioEncoding
The encoding of the audio data sent in the request.

All encodings support only 1 channel (mono) audio, unless the audioChannelCount and enableSeparateRecognitionPerChannel fields are set.

For best results, the audio source should be captured and transmitted using a lossless encoding (FLAC or LINEAR16). The accuracy of the speech recognition can be reduced if lossy codecs are used to capture or transmit audio, particularly if background noise is present. Lossy codecs include MULAW, AMR, AMR_WB, OGG_OPUS, SPEEX_WITH_HEADER_BYTE, and MP3.


#### Enums
| Format | Description  |
|--|--|
|LINEAR16|	Uncompressed 16-bit signed little-endian samples (Linear PCM).|
|FLAC |	FLAC (Free Lossless Audio Codec) is the recommended encoding because it is lossless--therefore recognition is not compromised--and requires only about half the bandwidth of LINEAR16. FLAC stream encoding supports 16-bit and 24-bit samples, however, not all fields in STREAMINFO are supported.|
| MP3 | Speech API support mp3 encoding but it is not recommended to use due to loss of data during compression.|

## SpeechContext
Provides **hints** to the speech recognizer to favor specific words and phrases in the results.

```json
{
  "phrases": [
    string
  ]
}
```

| Field | Description |
|--|--|
| phrases[] | string <br> A list of strings containing words and phrases "hints" so that the speech recognition is more likely to recognize them. This can be used to improve the accuracy for specific words and phrases, for example, if specific commands are typically spoken by the user. This can also be used to add additional words to the vocabulary of the recognizer. See usage limits. |


## SpeakerDiarizationConfig
Config to enable speaker diarization.

```json
{
  "enableSpeakerDiarization": boolean,
  "minSpeakerCount": integer,
  "maxSpeakerCount": integer,
  "speakerTag": integer
}
```

| Field | Description |
|--|--|
| enableSpeakerDiarization  | boolean <br> If **true**, enables speaker detection for each recognized word in the top alternative of the recognition result. |
| minSpeakerCount | integer <br> Minimum number of speakers in the conversation. This range gives you more flexibility by allowing the system to automatically determine the correct number of speakers. If not set, the default value is 2. |
| maxSpeakerCount | integer <br> Maximum number of speakers in the conversation. This range gives you more flexibility by allowing the system to automatically determine the correct number of speakers. If not set, the default value is 6. |
