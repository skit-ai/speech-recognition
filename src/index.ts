import { Typings } from "./types";
import { SpeechClient } from "./speech-client";

let config: Typings.config = {
  encoding: 1,
  sampleRateHertz: 8000,
  languageCode: "en-IN",
  maxAlternatives: 4,
  enableWordTimeOffsets: true,
};

let audio: Typings.audio = {
  audio: "https://ira-data.s3-us-west-2.amazonaws.com/test-single.wav",
};

function callback(err: any, res: any) {
  console.log(err, res);
}

function main() {
  let speechClient = new SpeechClient("f89a5f77-2898-4af1-894b-5ade10e69d0f");
  speechClient.longRunningRecognize(config, audio, 5, callback);
}
main();
