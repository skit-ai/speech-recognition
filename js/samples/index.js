const async = require("async");
const speech = require("vernacularai-js-sdk");
const SpeechClient = speech.SpeechClient;
let config = {
  maxAlternatives: 2,
  sampleRateHertz: 8000,
  enableWordTimeOffsets: false,
  languageCode: "en-IN",
  encoding: 1,
};

let audio = {
  uri: "https://ira-data.s3-us-west-2.amazonaws.com/test-single.wav",
};

/*
  Class that implements Vernacular.ai ASR API
  Args:
    access_token: The authorization token to send with the requests.
*/

let client = new SpeechClient("vernacularai");

function recognize() {
  /*
    Performs synchronous speech recognition: receive results after all audio
    has been sent and processed.
    Params : config giving info abou the audio file
             audio file which is either a url or raw bytes
             callback function for results
    Returns : Transcripts of audio converted to text
    Throws : Error if some error ocurrs if process could not be completed
  */
  client.recognize(config, audio, (err, speechRecognitionResults) => {
    for (let speechRecognitionResult of speechRecognitionResults) {
      let speechRecognitionAlternatives = speechRecognitionResult.getAlternativesList();
      for (let speechRecognitionAlternative of speechRecognitionAlternatives) {
        console.log({
          Transcript: speechRecognitionAlternative.getTranscript(),
          Confidence: speechRecognitionAlternative.getConfidence(),
        });
      }
    }
  });
}

function longRunningRecognize() {
  /*
    Performs asynchronous speech recognition.
    Params : config giving info abou the audio file
             audio file which is either a url or raw bytes
             pollTime time to wait in seconds before making another request again
             callback function for results
    Returns  ``Operation.response`` which contains a
    ``LongRunningRecognizeResponse`` message.
  */
  client.longRunningRecognize(
    config,
    audio,
    5,
    (err, speechRecognitionResults) => {
      for (let speechRecognitionResult of speechRecognitionResults) {
        let speechRecognitionAlternatives = speechRecognitionResult.getAlternativesList();
        for (let speechRecognitionAlternative of speechRecognitionAlternatives) {
          console.log({
            Transcript: speechRecognitionAlternative.getTranscript(),
            Confidence: speechRecognitionAlternative.getConfidence(),
          });
        }
      }
    }
  );
}

function main() {
  async.series([longRunningRecognize]);
}

main();
