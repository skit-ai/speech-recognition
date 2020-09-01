const async = require("async");
import { SpeechClient, Typings, encoding } from "vernacularai-js-sdk";

let config: Typings.config = {
  maxAlternatives: 2,
  sampleRateHertz: 8000,
  enableWordTimeOffsets: false,
  languageCode: "en-IN",
  encoding: encoding.LINEAR16,
};

let audio: Typings.audio = {
  audio: "URL or Raw Bytes audio Here",
};

/*
  Class that implements Vernacular.ai ASR API
  Args:
    access_token: The authorization token to send with the requests.
*/

let client = new SpeechClient("access token");

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
  client.recognize(config, audio, (err: any, res: any) => {
    console.log(err, res);
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
  client.longRunningRecognize(config, audio, 5, (err: any, res: any) => {
    console.log(err, res);
  });
}

function streamingRecongnize() {
  /*
    Performs bidirectional streaming speech recognition: receive results while
    sending audio.
  */
  client.streamingRecognizeConfig(config, false, (err: any, res: any) => {
    console.log(err, res);
  });
  let recorder = require("node-record-lpcm16");
  recorder
    .record({
      sampleRateHertz: config.sampleRateHertz,
      threshold: 0, //silence threshold
      recordProgram: "rec", // Try also "arecord" or "sox"
      silence: "5.0", //seconds of silence before ending
    })
    .stream()
    .on("error", console.error)
    .on("data", (data: any) => {
      client.streamingRecognizeAudio(data);
    });
}

function main() {
  async.series([recognize, longRunningRecognize, streamingRecongnize]);
}

main();
