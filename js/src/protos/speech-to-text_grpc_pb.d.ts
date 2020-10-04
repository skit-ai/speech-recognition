// package: speech_to_text
// file: speech-to-text.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as speech_to_text_pb from "./speech-to-text_pb";
import * as google_api_client_pb from "./google/api/client_pb";
import * as google_api_field_behavior_pb from "./google/api/field_behavior_pb";
import * as google_rpc_status_pb from "./google/rpc/status_pb";

interface ISpeechToTextService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    recognize: ISpeechToTextService_IRecognize;
    streamingRecognize: ISpeechToTextService_IStreamingRecognize;
    longRunningRecognize: ISpeechToTextService_ILongRunningRecognize;
    getSpeechOperation: ISpeechToTextService_IGetSpeechOperation;
}

interface ISpeechToTextService_IRecognize extends grpc.MethodDefinition<speech_to_text_pb.RecognizeRequest, speech_to_text_pb.RecognizeResponse> {
    path: "/speech_to_text.SpeechToText/Recognize";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<speech_to_text_pb.RecognizeRequest>;
    requestDeserialize: grpc.deserialize<speech_to_text_pb.RecognizeRequest>;
    responseSerialize: grpc.serialize<speech_to_text_pb.RecognizeResponse>;
    responseDeserialize: grpc.deserialize<speech_to_text_pb.RecognizeResponse>;
}
interface ISpeechToTextService_IStreamingRecognize extends grpc.MethodDefinition<speech_to_text_pb.StreamingRecognizeRequest, speech_to_text_pb.StreamingRecognizeResponse> {
    path: "/speech_to_text.SpeechToText/StreamingRecognize";
    requestStream: true;
    responseStream: true;
    requestSerialize: grpc.serialize<speech_to_text_pb.StreamingRecognizeRequest>;
    requestDeserialize: grpc.deserialize<speech_to_text_pb.StreamingRecognizeRequest>;
    responseSerialize: grpc.serialize<speech_to_text_pb.StreamingRecognizeResponse>;
    responseDeserialize: grpc.deserialize<speech_to_text_pb.StreamingRecognizeResponse>;
}
interface ISpeechToTextService_ILongRunningRecognize extends grpc.MethodDefinition<speech_to_text_pb.LongRunningRecognizeRequest, speech_to_text_pb.SpeechOperation> {
    path: "/speech_to_text.SpeechToText/LongRunningRecognize";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<speech_to_text_pb.LongRunningRecognizeRequest>;
    requestDeserialize: grpc.deserialize<speech_to_text_pb.LongRunningRecognizeRequest>;
    responseSerialize: grpc.serialize<speech_to_text_pb.SpeechOperation>;
    responseDeserialize: grpc.deserialize<speech_to_text_pb.SpeechOperation>;
}
interface ISpeechToTextService_IGetSpeechOperation extends grpc.MethodDefinition<speech_to_text_pb.SpeechOperationRequest, speech_to_text_pb.SpeechOperation> {
    path: "/speech_to_text.SpeechToText/GetSpeechOperation";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<speech_to_text_pb.SpeechOperationRequest>;
    requestDeserialize: grpc.deserialize<speech_to_text_pb.SpeechOperationRequest>;
    responseSerialize: grpc.serialize<speech_to_text_pb.SpeechOperation>;
    responseDeserialize: grpc.deserialize<speech_to_text_pb.SpeechOperation>;
}

export const SpeechToTextService: ISpeechToTextService;

export interface ISpeechToTextServer {
    recognize: grpc.handleUnaryCall<speech_to_text_pb.RecognizeRequest, speech_to_text_pb.RecognizeResponse>;
    streamingRecognize: grpc.handleBidiStreamingCall<speech_to_text_pb.StreamingRecognizeRequest, speech_to_text_pb.StreamingRecognizeResponse>;
    longRunningRecognize: grpc.handleUnaryCall<speech_to_text_pb.LongRunningRecognizeRequest, speech_to_text_pb.SpeechOperation>;
    getSpeechOperation: grpc.handleUnaryCall<speech_to_text_pb.SpeechOperationRequest, speech_to_text_pb.SpeechOperation>;
}

export interface ISpeechToTextClient {
    recognize(request: speech_to_text_pb.RecognizeRequest, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.RecognizeResponse) => void): grpc.ClientUnaryCall;
    recognize(request: speech_to_text_pb.RecognizeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.RecognizeResponse) => void): grpc.ClientUnaryCall;
    recognize(request: speech_to_text_pb.RecognizeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.RecognizeResponse) => void): grpc.ClientUnaryCall;
    streamingRecognize(): grpc.ClientDuplexStream<speech_to_text_pb.StreamingRecognizeRequest, speech_to_text_pb.StreamingRecognizeResponse>;
    streamingRecognize(options: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<speech_to_text_pb.StreamingRecognizeRequest, speech_to_text_pb.StreamingRecognizeResponse>;
    streamingRecognize(metadata: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<speech_to_text_pb.StreamingRecognizeRequest, speech_to_text_pb.StreamingRecognizeResponse>;
    longRunningRecognize(request: speech_to_text_pb.LongRunningRecognizeRequest, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
    longRunningRecognize(request: speech_to_text_pb.LongRunningRecognizeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
    longRunningRecognize(request: speech_to_text_pb.LongRunningRecognizeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
    getSpeechOperation(request: speech_to_text_pb.SpeechOperationRequest, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
    getSpeechOperation(request: speech_to_text_pb.SpeechOperationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
    getSpeechOperation(request: speech_to_text_pb.SpeechOperationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
}

export class SpeechToTextClient extends grpc.Client implements ISpeechToTextClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public recognize(request: speech_to_text_pb.RecognizeRequest, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.RecognizeResponse) => void): grpc.ClientUnaryCall;
    public recognize(request: speech_to_text_pb.RecognizeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.RecognizeResponse) => void): grpc.ClientUnaryCall;
    public recognize(request: speech_to_text_pb.RecognizeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.RecognizeResponse) => void): grpc.ClientUnaryCall;
    public streamingRecognize(options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<speech_to_text_pb.StreamingRecognizeRequest, speech_to_text_pb.StreamingRecognizeResponse>;
    public streamingRecognize(metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientDuplexStream<speech_to_text_pb.StreamingRecognizeRequest, speech_to_text_pb.StreamingRecognizeResponse>;
    public longRunningRecognize(request: speech_to_text_pb.LongRunningRecognizeRequest, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
    public longRunningRecognize(request: speech_to_text_pb.LongRunningRecognizeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
    public longRunningRecognize(request: speech_to_text_pb.LongRunningRecognizeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
    public getSpeechOperation(request: speech_to_text_pb.SpeechOperationRequest, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
    public getSpeechOperation(request: speech_to_text_pb.SpeechOperationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
    public getSpeechOperation(request: speech_to_text_pb.SpeechOperationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: speech_to_text_pb.SpeechOperation) => void): grpc.ClientUnaryCall;
}
