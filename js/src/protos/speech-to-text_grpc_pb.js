// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var speech$to$text_pb = require('./speech-to-text_pb.js');
var google_api_annotations_pb = require('./google/api/annotations_pb');
var google_api_client_pb = require('./google/api/client_pb');
var google_api_field_behavior_pb = require('./google/api/field_behavior_pb');
var google_rpc_status_pb = require('./google/rpc/status_pb');

function serialize_speech_to_text_LongRunningRecognizeRequest(arg) {
  if (!(arg instanceof speech$to$text_pb.LongRunningRecognizeRequest)) {
    throw new Error('Expected argument of type speech_to_text.LongRunningRecognizeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_speech_to_text_LongRunningRecognizeRequest(buffer_arg) {
  return speech$to$text_pb.LongRunningRecognizeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_speech_to_text_RecognizeRequest(arg) {
  if (!(arg instanceof speech$to$text_pb.RecognizeRequest)) {
    throw new Error('Expected argument of type speech_to_text.RecognizeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_speech_to_text_RecognizeRequest(buffer_arg) {
  return speech$to$text_pb.RecognizeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_speech_to_text_RecognizeResponse(arg) {
  if (!(arg instanceof speech$to$text_pb.RecognizeResponse)) {
    throw new Error('Expected argument of type speech_to_text.RecognizeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_speech_to_text_RecognizeResponse(buffer_arg) {
  return speech$to$text_pb.RecognizeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_speech_to_text_SpeechOperation(arg) {
  if (!(arg instanceof speech$to$text_pb.SpeechOperation)) {
    throw new Error('Expected argument of type speech_to_text.SpeechOperation');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_speech_to_text_SpeechOperation(buffer_arg) {
  return speech$to$text_pb.SpeechOperation.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_speech_to_text_SpeechOperationRequest(arg) {
  if (!(arg instanceof speech$to$text_pb.SpeechOperationRequest)) {
    throw new Error('Expected argument of type speech_to_text.SpeechOperationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_speech_to_text_SpeechOperationRequest(buffer_arg) {
  return speech$to$text_pb.SpeechOperationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_speech_to_text_StreamingRecognizeRequest(arg) {
  if (!(arg instanceof speech$to$text_pb.StreamingRecognizeRequest)) {
    throw new Error('Expected argument of type speech_to_text.StreamingRecognizeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_speech_to_text_StreamingRecognizeRequest(buffer_arg) {
  return speech$to$text_pb.StreamingRecognizeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_speech_to_text_StreamingRecognizeResponse(arg) {
  if (!(arg instanceof speech$to$text_pb.StreamingRecognizeResponse)) {
    throw new Error('Expected argument of type speech_to_text.StreamingRecognizeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_speech_to_text_StreamingRecognizeResponse(buffer_arg) {
  return speech$to$text_pb.StreamingRecognizeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SpeechToTextService = exports.SpeechToTextService = {
  // Performs synchronous non-streaming speech recognition
recognize: {
    path: '/speech_to_text.SpeechToText/Recognize',
    requestStream: false,
    responseStream: false,
    requestType: speech$to$text_pb.RecognizeRequest,
    responseType: speech$to$text_pb.RecognizeResponse,
    requestSerialize: serialize_speech_to_text_RecognizeRequest,
    requestDeserialize: deserialize_speech_to_text_RecognizeRequest,
    responseSerialize: serialize_speech_to_text_RecognizeResponse,
    responseDeserialize: deserialize_speech_to_text_RecognizeResponse,
  },
  // Performs bidirectional streaming speech recognition: receive results while
// sending audio. This method is only available via the gRPC API (not REST).
streamingRecognize: {
    path: '/speech_to_text.SpeechToText/StreamingRecognize',
    requestStream: true,
    responseStream: true,
    requestType: speech$to$text_pb.StreamingRecognizeRequest,
    responseType: speech$to$text_pb.StreamingRecognizeResponse,
    requestSerialize: serialize_speech_to_text_StreamingRecognizeRequest,
    requestDeserialize: deserialize_speech_to_text_StreamingRecognizeRequest,
    responseSerialize: serialize_speech_to_text_StreamingRecognizeResponse,
    responseDeserialize: deserialize_speech_to_text_StreamingRecognizeResponse,
  },
  // Performs asynchronous non-streaming speech recognition
longRunningRecognize: {
    path: '/speech_to_text.SpeechToText/LongRunningRecognize',
    requestStream: false,
    responseStream: false,
    requestType: speech$to$text_pb.LongRunningRecognizeRequest,
    responseType: speech$to$text_pb.SpeechOperation,
    requestSerialize: serialize_speech_to_text_LongRunningRecognizeRequest,
    requestDeserialize: deserialize_speech_to_text_LongRunningRecognizeRequest,
    responseSerialize: serialize_speech_to_text_SpeechOperation,
    responseDeserialize: deserialize_speech_to_text_SpeechOperation,
  },
  // Returns SpeechOperation for LongRunningRecognize. Used for polling the result
getSpeechOperation: {
    path: '/speech_to_text.SpeechToText/GetSpeechOperation',
    requestStream: false,
    responseStream: false,
    requestType: speech$to$text_pb.SpeechOperationRequest,
    responseType: speech$to$text_pb.SpeechOperation,
    requestSerialize: serialize_speech_to_text_SpeechOperationRequest,
    requestDeserialize: deserialize_speech_to_text_SpeechOperationRequest,
    responseSerialize: serialize_speech_to_text_SpeechOperation,
    responseDeserialize: deserialize_speech_to_text_SpeechOperation,
  },
};

exports.SpeechToTextClient = grpc.makeGenericClientConstructor(SpeechToTextService);
