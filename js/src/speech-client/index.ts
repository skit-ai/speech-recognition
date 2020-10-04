import messages, { RecognizeResponse } from "../protos/speech-to-text_pb.js";
import services from "../protos/speech-to-text_grpc_pb.js";
import grpc from 'grpc';

export class SpeechClient {
  private GRPC_HOST: string = "speechapis.vernacular.ai:80";
  private AUTHORIZATION: string = "authorization";
  private client: services.ISpeechToTextClient;
  private metadata: grpc.Metadata = new grpc.Metadata();
  constructor(access_token: string) {
    this.metadata.add(this.AUTHORIZATION, "Bearer " + access_token);
    this.client = new services.SpeechToTextClient(
      this.GRPC_HOST,
      grpc.credentials.createInsecure()
    );
  }

  private SpeechRecognize(
    request: messages.SpeechOperationRequest,
    pollTime: number,
    callback: (err: any, res: messages.SpeechRecognitionResult[] | undefined) => any
  ) {
    setTimeout(() => {
      this.client.getSpeechOperation(
        request,
        this.metadata,
        (err: any, response: messages.SpeechOperation) => {
          if (err) {
            throw new Error(err);
          } else {
            if (response.getDone()) {
              callback(null, response.getResponse()?.getResultsList());
            } else {
              this.SpeechRecognize(request, pollTime, callback);
            }
          }
        }
      );
    }, pollTime * 1000);
  }

  recognize(
    config: messages.RecognitionConfig.AsObject,
    audio: messages.RecognitionAudio.AsObject,
    callback: (err: any, res: messages.SpeechRecognitionResult[]) => any
  ) {
    let request = new messages.RecognizeRequest();
    let recognitionConfig = new messages.RecognitionConfig();
    let audioConfig = new messages.RecognitionAudio();
    recognitionConfig.setEncoding(config.encoding);
    recognitionConfig.setSampleRateHertz(config.sampleRateHertz);
    recognitionConfig.setMaxAlternatives(config.maxAlternatives);
    recognitionConfig.setEnableWordTimeOffsets(config.enableWordTimeOffsets);
    if (audio.content) {
      audioConfig.setContent(audio.content);
    } else {
      audioConfig.setUri(audio.uri);
    }
    request.setConfig(recognitionConfig);
    request.setAudio(audioConfig);
    this.client.recognize(
      request,
      this.metadata,
      (err: any, _response: RecognizeResponse) => {
        callback(err, _response.getResultsList());
      }
    );
  }
  longRunningRecognize(
    config: messages.RecognitionConfig.AsObject,
    audio: messages.RecognitionAudio.AsObject,
    pollTime: number,
    callback: (err: any, res: messages.SpeechRecognitionResult[] | undefined) => any
  ) {
    pollTime = Math.max(pollTime, 5);
    let request = new messages.LongRunningRecognizeRequest();
    let recognitionConfig = new messages.RecognitionConfig();
    let audioConfig = new messages.RecognitionAudio();
    recognitionConfig.setEncoding(config.encoding);
    recognitionConfig.setSampleRateHertz(config.sampleRateHertz);
    recognitionConfig.setMaxAlternatives(config.maxAlternatives);
    recognitionConfig.setEnableWordTimeOffsets(config.enableWordTimeOffsets);
    if (audio.content) {
      audioConfig.setContent(audio.content);
    } else {
      audioConfig.setUri(audio.uri);
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
      callback(e, []);
    }
  }
}
