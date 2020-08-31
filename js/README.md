# Node TS Library for VernacularAI ASR interface

Install the library using npm or yarn
```
npm i vernacularai-js-sdk
yarn add vernacularai-js-sdk
```

## Ways to use the Service
- Transcribing short audios
- Transcribing long audios [more than 1 min]
- Transcribing audio from streaming input

### Transcribing short audios

- Import SpeechClient class from the library
- Provide access-token in the constructor
- Use **recognize** method which takes in config of audio file and audio in the form of string or raw bytes
- Access the transcribed results in callback function

### Transcribing long audios

- Method **longRunnningReconginze**, takes in config, audio, pollTime(amount of time to wait)*minimum value is 10sec* and callback function

### Streaming Recognize

- Method streaming recognize, it has two methods **streamingRecognizeConfig** which takes in audio config, interim results(boolean) and callback function, while the other one takes in the stream of audio for continuous transcibing.

### Refer samples to see the examples for each method
