# SpeechRecognitionResult
A speech recognition result corresponding to a portion of the audio.

```js
{
  "alternatives": [
    {
      object (SpeechRecognitionAlternative)
    }
  ],
  "channelTag": integer
}
```

|Fields | Description |
|--|--|
|alternatives[]	| object (SpeechRecognitionAlternative)<br>May contain one or more recognition hypotheses (up to the maximum specified in maxAlternatives). These alternatives are ordered in terms of accuracy, with the top (first) alternative being the most probable, as ranked by the recognizer.|
|channelTag	| integer <br> For multi-channel audio, this is the channel number corresponding to the recognized result for the audio from that channel. For audioChannelCount = N, its output values can range from '1' to 'N'.|

# SpeechRecognitionAlternative
Alternative hypotheses (a.k.a. n-best list).

```js
{
  "transcript": string,
  "confidence": number,
  "words": [
    {
      object (WordInfo)
    }
  ]
}
```

|Fields | Description |
|--|--|
|transcript | string <br> Transcript text representing the words that the user spoke.|
|confidence	| number <br> The confidence estimate between 0.0 and 1.0. A higher number indicates an estimated greater likelihood that the recognized words are correct. This field is set only for the top alternative of a non-streaming result or, of a streaming result where isFinal=true. This field is not guaranteed to be accurate and users should not rely on it to be always provided. The default of 0.0 is a sentinel value indicating confidence was not set.|
|words[] | object ([WordInfo](#wordinfo))<br> A list of word-specific information for each recognized word. Note: When enableSpeakerDiarization is true, you will see all the words from the beginning of the audio.|

# WordInfo
Word-specific information for recognized words.

```js
{
  "startTime": string,
  "endTime": string,
  "word": string,
  "speakerTag": integer
}
```

|Fields| Description |
|--|--|
| startTime	| string (Duration format)<br> Time offset relative to the beginning of the audio, and corresponding to the start of the spoken word. This field is only set if enableWordTimeOffsets=true and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary.|
|endTime| string (Duration format)<br>Time offset relative to the beginning of the audio, and corresponding to the end of the spoken word. This field is only set if enableWordTimeOffsets=true and only in the top hypothesis. This is an experimental feature and the accuracy of the time offset can vary.|
| word | string <br> The word corresponding to this set of information.|
|speakerTag	| integer <br> Output only. A distinct integer value is assigned for every speaker within the audio. This field specifies which one of those speakers was detected to have spoken this word. Value ranges from '1' to diarizationSpeakerCount. speakerTag is set if enableSpeakerDiarization = 'true' and only in the top alternative.|
