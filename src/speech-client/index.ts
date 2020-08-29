const messages = require("../protos/speech-to-text_pb.js");
const services = require("../protos/speech-to-text_grpc_pb.js");
const grpc = require("grpc");
import { Typings } from "../types";

export class SpeechClient {
  private GRPC_HOST: string = "localhost:5021";
  private AUTHORIZATION: string = "authorization";
  private DEFAULT_TIMEOUT: number = 30;
  private client: any;
  private metadata: any = new grpc.Metadata();
  constructor(access_token: string) {
    this.metadata.set(this.AUTHORIZATION, "Bearer " + access_token);
    this.client = new services.SpeechToTextClient(
      this.GRPC_HOST,
      grpc.credentials.createInsecure()
    );
  }

  private SpeechRecognize(
    request: any,
    callback: (err: any, res: any) => any
  ) {}

  async recognize(
    config: Typings.config,
    audio: Typings.audio,
    callback: (x: any) => any
  ) {
    let request = new messages.RecognizeRequest();
    let recognitionConfig = new messages.RecognitionConfig();
    let audioConfig = new messages.RecognitionAudio();
    recognitionConfig.setEncoding(config.encoding);
    recognitionConfig.setSampleRateHertz(config.sampleRateHertz);
    recognitionConfig.setMaxAlternatives(config.maxAlternatives);
    recognitionConfig.setEnableWordTimeOffsets(config.enableWordTimeOffsets);
    if (typeof audio.audio === "string") {
      audioConfig.setUri(audio.audio);
    } else {
      audioConfig.setContent(audio.audio);
    }
    request.setConfig(recognitionConfig);
    request.setAudio(audioConfig);
    this.client.recognize(
      request,
      this.metadata,
      (err: any, _response: any) => {
        if (err) {
          callback(null);
        } else {
          let alternatives: Array<any> = [];
          let alternativesNest: Array<any> = [];
          let _res = _response.getResultsList();
          for (let i = 0; i < _res.length; i++) {
            let _resAlt = _res[i].getAlternativesList();
            for (let j = 0; j < _resAlt.length; j++) {
              alternativesNest.push(_resAlt[j].getTranscript());
            }
            alternatives.push({ Transcript: alternativesNest });
          }
          callback(alternatives);
        }
      }
    );
  }
  longRunningRecognize(
    config: Typings.config,
    audio: Typings.audio,
    pollTime: number,
    callback: (err: any, response: any) => any
  ) {
    pollTime = Math.max(pollTime, 5);
    let request = new messages.LongRunningRecognizeRequest();
    let recognitionConfig = new messages.RecognitionConfig();
    let audioConfig = new messages.RecognitionAudio();
    recognitionConfig.setEncoding(config.encoding);
    recognitionConfig.setSampleRateHertz(config.sampleRateHertz);
    recognitionConfig.setMaxAlternatives(config.maxAlternatives);
    recognitionConfig.setEnableWordTimeOffsets(config.enableWordTimeOffsets);
    if (typeof audio.audio === "string") {
      audioConfig.setUri(audio.audio);
    } else {
      audioConfig.setContent(audio.audio);
    }
    request.setConfig(recognitionConfig);
    request.setAudio(audioConfig);
    let operationRequest: any = null;
    try {
      this.client.longRunningRecognize(
        request,
        this.metadata,
        async (err: any, response: any) => {
          if (err) {
            throw new Error(err);
          } else {
            operationRequest = response.getName();
            let _res: any = null;
            let isDone: boolean = false;
            let isProcessing: any = false;

            let request = new messages.SpeechOperationRequest();
            request.setName(operationRequest);
            while (!isDone) {
              if (isProcessing) {
                continue;
              }
              console.log(isProcessing);
              isProcessing = setTimeout(() => {
                console.log("in");
                isProcessing = false;
                isDone = true;
                // this.client.getSpeechOperation(
                //   request,
                //   this.metadata,
                //   (err: any, response: any) => {
                //     console.log(response.getDone());
                //     isProcessing = null;
                //     if (err) {
                //       throw new Error(err);
                //     } else {
                //       console.log(response);
                //       isDone = response.getDone();
                //       callback(null, response.getDone());
                //     }
                //   }
                // );
              }, pollTime * 1000);
            }
          }
        }
      );
    } catch (e) {
      callback(e, null);
    }
  }
  streamingRecognize() {}
}
