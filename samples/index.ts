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
  audio: "https://ira-data.s3-us-west-2.amazonaws.com/test-single.wav",
};

let client = new SpeechClient("f89a5f77-2898-4af1-894b-5ade10e69d0f");

function recognize() {
  client.recognize(config, audio, (err: any, res: any) => {
    console.log(err, res);
  });
}

function longRunningRecognize() {
  client.longRunningRecognize(config, audio, 5, (err: any, res: any) => {
    console.log(err, res);
  });
}

function streamingRecongnize() {
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
