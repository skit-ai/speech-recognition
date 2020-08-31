const messages = require("../protos/speech-to-text_pb.js");
const services = require("../protos/speech-to-text_grpc_pb.js");
const grpc = require("grpc");
import { Typings } from "../types";

export class SpeechClient {
  private GRPC_HOST: string = "localhost:5021";
  private AUTHORIZATION: string = "authorization";
  private client: any;
  private metadata: any = new grpc.Metadata();
  private recStream: any;
  constructor(access_token: string) {
    this.metadata.add(this.AUTHORIZATION, "Bearer " + access_token);
    this.client = new services.SpeechToTextClient(
      this.GRPC_HOST,
      grpc.credentials.createInsecure()
    );
  }

  private SpeechRecognize(
    request: any,
    pollTime: number,
    callback: (err: any, res: any) => any
  ) {
    setTimeout(() => {
      this.client.getSpeechOperation(
        request,
        this.metadata,
        (err: any, response: any) => {
          if (err) {
            throw new Error(err);
          } else {
            if (response.getDone()) {
              let _response = response.getResponse();
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
              callback(null, alternatives);
            } else {
              this.SpeechRecognize(request, pollTime, callback);
            }
          }
        }
      );
    }, pollTime * 1000);
  }

  recognize(
    config: Typings.config,
    audio: Typings.audio,
    callback: (err: any, res: any) => any
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
          callback(err, null);
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
          callback(null, alternatives);
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
            let request = new messages.SpeechOperationRequest();
            request.setName(operationRequest);
            this.SpeechRecognize(request, pollTime, callback);
          }
        }
      );
    } catch (e) {
      callback(e, null);
    }
  }
  streamingRecognizeConfig(
    config: Typings.config,
    interimResults: boolean,
    callback: (err: any, res: any) => any
  ) {
    let request = new messages.StreamingRecognizeRequest();
    let streamingRecognitionConfig = new messages.StreamingRecognitionConfig();
    let recognitionConfig = new messages.RecognitionConfig();
    recognitionConfig.setEncoding(config.encoding);
    recognitionConfig.setSampleRateHertz(config.sampleRateHertz);
    recognitionConfig.setMaxAlternatives(config.maxAlternatives);
    recognitionConfig.setEnableWordTimeOffsets(config.enableWordTimeOffsets);
    streamingRecognitionConfig.setConfig(recognitionConfig);
    streamingRecognitionConfig.setInterimResults(interimResults);

    request.setStreamingConfig(streamingRecognitionConfig);
    try {
      this.recStream = this.client
        .streamingRecognize(request)
        .on("error", (err: any) => {
          throw new Error(err);
        })
        .on("data", (response: any) => {
          let alternatives: Array<any> = [];
          let alternativesNest: Array<any> = [];
          let _res = response.getResultsList();
          for (let i = 0; i < _res.length; i++) {
            let _resAlt = _res[i].getAlternativesList();
            for (let j = 0; j < _resAlt.length; j++) {
              alternativesNest.push(_resAlt[j].getTranscript());
            }
            alternatives.push({ Transcript: alternativesNest });
          }
          callback(null, alternatives);
        });
    } catch (e) {
      callback(e, null);
    }
  }
  streamingRecognizeAudio(audio: any) {
    let request = new messages.StreamingRecognizeRequest();
    request.setAudioContent(audio);
    this.recStream.write(request);
  }
}
