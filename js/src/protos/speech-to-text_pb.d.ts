// package: speech_to_text
// file: speech-to-text.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_api_client_pb from "./google/api/client_pb";
import * as google_api_field_behavior_pb from "./google/api/field_behavior_pb";
import * as google_rpc_status_pb from "./google/rpc/status_pb";

export class RecognizeRequest extends jspb.Message {

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): RecognitionConfig | undefined;
    setConfig(value?: RecognitionConfig): RecognizeRequest;


    hasAudio(): boolean;
    clearAudio(): void;
    getAudio(): RecognitionAudio | undefined;
    setAudio(value?: RecognitionAudio): RecognizeRequest;

    getSegment(): string;
    setSegment(value: string): RecognizeRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RecognizeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RecognizeRequest): RecognizeRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: RecognizeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RecognizeRequest;
    static deserializeBinaryFromReader(message: RecognizeRequest, reader: jspb.BinaryReader): RecognizeRequest;
}

export namespace RecognizeRequest {
    export type AsObject = {
        config?: RecognitionConfig.AsObject,
        audio?: RecognitionAudio.AsObject,
        segment: string,
    }
}

export class LongRunningRecognizeRequest extends jspb.Message {

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): RecognitionConfig | undefined;
    setConfig(value?: RecognitionConfig): LongRunningRecognizeRequest;


    hasAudio(): boolean;
    clearAudio(): void;
    getAudio(): RecognitionAudio | undefined;
    setAudio(value?: RecognitionAudio): LongRunningRecognizeRequest;

    getResultUrl(): string;
    setResultUrl(value: string): LongRunningRecognizeRequest;

    getSegment(): string;
    setSegment(value: string): LongRunningRecognizeRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongRunningRecognizeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LongRunningRecognizeRequest): LongRunningRecognizeRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: LongRunningRecognizeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongRunningRecognizeRequest;
    static deserializeBinaryFromReader(message: LongRunningRecognizeRequest, reader: jspb.BinaryReader): LongRunningRecognizeRequest;
}

export namespace LongRunningRecognizeRequest {
    export type AsObject = {
        config?: RecognitionConfig.AsObject,
        audio?: RecognitionAudio.AsObject,
        resultUrl: string,
        segment: string,
    }
}

export class SpeechOperationRequest extends jspb.Message {
    getName(): string;
    setName(value: string): SpeechOperationRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpeechOperationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SpeechOperationRequest): SpeechOperationRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: SpeechOperationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpeechOperationRequest;
    static deserializeBinaryFromReader(message: SpeechOperationRequest, reader: jspb.BinaryReader): SpeechOperationRequest;
}

export namespace SpeechOperationRequest {
    export type AsObject = {
        name: string,
    }
}

export class StreamingRecognizeRequest extends jspb.Message {

    hasStreamingConfig(): boolean;
    clearStreamingConfig(): void;
    getStreamingConfig(): StreamingRecognitionConfig | undefined;
    setStreamingConfig(value?: StreamingRecognitionConfig): StreamingRecognizeRequest;


    hasAudioContent(): boolean;
    clearAudioContent(): void;
    getAudioContent(): Uint8Array | string;
    getAudioContent_asU8(): Uint8Array;
    getAudioContent_asB64(): string;
    setAudioContent(value: Uint8Array | string): StreamingRecognizeRequest;


    getStreamingRequestCase(): StreamingRecognizeRequest.StreamingRequestCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StreamingRecognizeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StreamingRecognizeRequest): StreamingRecognizeRequest.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: StreamingRecognizeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StreamingRecognizeRequest;
    static deserializeBinaryFromReader(message: StreamingRecognizeRequest, reader: jspb.BinaryReader): StreamingRecognizeRequest;
}

export namespace StreamingRecognizeRequest {
    export type AsObject = {
        streamingConfig?: StreamingRecognitionConfig.AsObject,
        audioContent: Uint8Array | string,
    }

    export enum StreamingRequestCase {
        STREAMING_REQUEST_NOT_SET = 0,

        STREAMING_CONFIG = 1,

        AUDIO_CONTENT = 2,

    }

}

export class StreamingRecognitionConfig extends jspb.Message {

    hasConfig(): boolean;
    clearConfig(): void;
    getConfig(): RecognitionConfig | undefined;
    setConfig(value?: RecognitionConfig): StreamingRecognitionConfig;

    getInterimResults(): boolean;
    setInterimResults(value: boolean): StreamingRecognitionConfig;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StreamingRecognitionConfig.AsObject;
    static toObject(includeInstance: boolean, msg: StreamingRecognitionConfig): StreamingRecognitionConfig.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: StreamingRecognitionConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StreamingRecognitionConfig;
    static deserializeBinaryFromReader(message: StreamingRecognitionConfig, reader: jspb.BinaryReader): StreamingRecognitionConfig;
}

export namespace StreamingRecognitionConfig {
    export type AsObject = {
        config?: RecognitionConfig.AsObject,
        interimResults: boolean,
    }
}

export class RecognitionConfig extends jspb.Message {
    getEncoding(): RecognitionConfig.AudioEncoding;
    setEncoding(value: RecognitionConfig.AudioEncoding): RecognitionConfig;

    getSampleRateHertz(): number;
    setSampleRateHertz(value: number): RecognitionConfig;

    getLanguageCode(): string;
    setLanguageCode(value: string): RecognitionConfig;

    getMaxAlternatives(): number;
    setMaxAlternatives(value: number): RecognitionConfig;

    clearSpeechContextsList(): void;
    getSpeechContextsList(): Array<SpeechContext>;
    setSpeechContextsList(value: Array<SpeechContext>): RecognitionConfig;
    addSpeechContexts(value?: SpeechContext, index?: number): SpeechContext;

    getAudioChannelCount(): number;
    setAudioChannelCount(value: number): RecognitionConfig;

    getEnableSeparateRecognitionPerChannel(): boolean;
    setEnableSeparateRecognitionPerChannel(value: boolean): RecognitionConfig;

    getEnableWordTimeOffsets(): boolean;
    setEnableWordTimeOffsets(value: boolean): RecognitionConfig;

    getEnableAutomaticPunctuation(): boolean;
    setEnableAutomaticPunctuation(value: boolean): RecognitionConfig;


    hasDiarizationConfig(): boolean;
    clearDiarizationConfig(): void;
    getDiarizationConfig(): SpeakerDiarizationConfig | undefined;
    setDiarizationConfig(value?: SpeakerDiarizationConfig): RecognitionConfig;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RecognitionConfig.AsObject;
    static toObject(includeInstance: boolean, msg: RecognitionConfig): RecognitionConfig.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: RecognitionConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RecognitionConfig;
    static deserializeBinaryFromReader(message: RecognitionConfig, reader: jspb.BinaryReader): RecognitionConfig;
}

export namespace RecognitionConfig {
    export type AsObject = {
        encoding: RecognitionConfig.AudioEncoding,
        sampleRateHertz: number,
        languageCode: string,
        maxAlternatives: number,
        speechContextsList: Array<SpeechContext.AsObject>,
        audioChannelCount: number,
        enableSeparateRecognitionPerChannel: boolean,
        enableWordTimeOffsets: boolean,
        enableAutomaticPunctuation: boolean,
        diarizationConfig?: SpeakerDiarizationConfig.AsObject,
    }

    export enum AudioEncoding {
        ENCODING_UNSPECIFIED = 0,
        LINEAR16 = 1,
        FLAC = 2,
        MP3 = 3,
    }

}

export class SpeechContext extends jspb.Message {
    clearPhrasesList(): void;
    getPhrasesList(): Array<string>;
    setPhrasesList(value: Array<string>): SpeechContext;
    addPhrases(value: string, index?: number): string;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpeechContext.AsObject;
    static toObject(includeInstance: boolean, msg: SpeechContext): SpeechContext.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: SpeechContext, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpeechContext;
    static deserializeBinaryFromReader(message: SpeechContext, reader: jspb.BinaryReader): SpeechContext;
}

export namespace SpeechContext {
    export type AsObject = {
        phrasesList: Array<string>,
    }
}

export class SpeakerDiarizationConfig extends jspb.Message {
    getEnableSpeakerDiarization(): boolean;
    setEnableSpeakerDiarization(value: boolean): SpeakerDiarizationConfig;

    getMinSpeakerCount(): number;
    setMinSpeakerCount(value: number): SpeakerDiarizationConfig;

    getMaxSpeakerCount(): number;
    setMaxSpeakerCount(value: number): SpeakerDiarizationConfig;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpeakerDiarizationConfig.AsObject;
    static toObject(includeInstance: boolean, msg: SpeakerDiarizationConfig): SpeakerDiarizationConfig.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: SpeakerDiarizationConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpeakerDiarizationConfig;
    static deserializeBinaryFromReader(message: SpeakerDiarizationConfig, reader: jspb.BinaryReader): SpeakerDiarizationConfig;
}

export namespace SpeakerDiarizationConfig {
    export type AsObject = {
        enableSpeakerDiarization: boolean,
        minSpeakerCount: number,
        maxSpeakerCount: number,
    }
}

export class RecognitionAudio extends jspb.Message {

    hasContent(): boolean;
    clearContent(): void;
    getContent(): Uint8Array | string;
    getContent_asU8(): Uint8Array;
    getContent_asB64(): string;
    setContent(value: Uint8Array | string): RecognitionAudio;


    hasUri(): boolean;
    clearUri(): void;
    getUri(): string;
    setUri(value: string): RecognitionAudio;


    getAudioSourceCase(): RecognitionAudio.AudioSourceCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RecognitionAudio.AsObject;
    static toObject(includeInstance: boolean, msg: RecognitionAudio): RecognitionAudio.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: RecognitionAudio, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RecognitionAudio;
    static deserializeBinaryFromReader(message: RecognitionAudio, reader: jspb.BinaryReader): RecognitionAudio;
}

export namespace RecognitionAudio {
    export type AsObject = {
        content: Uint8Array | string,
        uri: string,
    }

    export enum AudioSourceCase {
        AUDIO_SOURCE_NOT_SET = 0,

        CONTENT = 1,

        URI = 2,

    }

}

export class RecognizeResponse extends jspb.Message {
    clearResultsList(): void;
    getResultsList(): Array<SpeechRecognitionResult>;
    setResultsList(value: Array<SpeechRecognitionResult>): RecognizeResponse;
    addResults(value?: SpeechRecognitionResult, index?: number): SpeechRecognitionResult;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RecognizeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RecognizeResponse): RecognizeResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: RecognizeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RecognizeResponse;
    static deserializeBinaryFromReader(message: RecognizeResponse, reader: jspb.BinaryReader): RecognizeResponse;
}

export namespace RecognizeResponse {
    export type AsObject = {
        resultsList: Array<SpeechRecognitionResult.AsObject>,
    }
}

export class LongRunningRecognizeResponse extends jspb.Message {
    clearResultsList(): void;
    getResultsList(): Array<SpeechRecognitionResult>;
    setResultsList(value: Array<SpeechRecognitionResult>): LongRunningRecognizeResponse;
    addResults(value?: SpeechRecognitionResult, index?: number): SpeechRecognitionResult;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LongRunningRecognizeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LongRunningRecognizeResponse): LongRunningRecognizeResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: LongRunningRecognizeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LongRunningRecognizeResponse;
    static deserializeBinaryFromReader(message: LongRunningRecognizeResponse, reader: jspb.BinaryReader): LongRunningRecognizeResponse;
}

export namespace LongRunningRecognizeResponse {
    export type AsObject = {
        resultsList: Array<SpeechRecognitionResult.AsObject>,
    }
}

export class StreamingRecognizeResponse extends jspb.Message {

    hasError(): boolean;
    clearError(): void;
    getError(): google_rpc_status_pb.Status | undefined;
    setError(value?: google_rpc_status_pb.Status): StreamingRecognizeResponse;

    clearResultsList(): void;
    getResultsList(): Array<StreamingRecognitionResult>;
    setResultsList(value: Array<StreamingRecognitionResult>): StreamingRecognizeResponse;
    addResults(value?: StreamingRecognitionResult, index?: number): StreamingRecognitionResult;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StreamingRecognizeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StreamingRecognizeResponse): StreamingRecognizeResponse.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: StreamingRecognizeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StreamingRecognizeResponse;
    static deserializeBinaryFromReader(message: StreamingRecognizeResponse, reader: jspb.BinaryReader): StreamingRecognizeResponse;
}

export namespace StreamingRecognizeResponse {
    export type AsObject = {
        error?: google_rpc_status_pb.Status.AsObject,
        resultsList: Array<StreamingRecognitionResult.AsObject>,
    }
}

export class SpeechRecognitionResult extends jspb.Message {
    clearAlternativesList(): void;
    getAlternativesList(): Array<SpeechRecognitionAlternative>;
    setAlternativesList(value: Array<SpeechRecognitionAlternative>): SpeechRecognitionResult;
    addAlternatives(value?: SpeechRecognitionAlternative, index?: number): SpeechRecognitionAlternative;

    getChannelTag(): number;
    setChannelTag(value: number): SpeechRecognitionResult;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpeechRecognitionResult.AsObject;
    static toObject(includeInstance: boolean, msg: SpeechRecognitionResult): SpeechRecognitionResult.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: SpeechRecognitionResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpeechRecognitionResult;
    static deserializeBinaryFromReader(message: SpeechRecognitionResult, reader: jspb.BinaryReader): SpeechRecognitionResult;
}

export namespace SpeechRecognitionResult {
    export type AsObject = {
        alternativesList: Array<SpeechRecognitionAlternative.AsObject>,
        channelTag: number,
    }
}

export class StreamingRecognitionResult extends jspb.Message {
    clearAlternativesList(): void;
    getAlternativesList(): Array<SpeechRecognitionAlternative>;
    setAlternativesList(value: Array<SpeechRecognitionAlternative>): StreamingRecognitionResult;
    addAlternatives(value?: SpeechRecognitionAlternative, index?: number): SpeechRecognitionAlternative;

    getIsFinal(): boolean;
    setIsFinal(value: boolean): StreamingRecognitionResult;

    getStability(): number;
    setStability(value: number): StreamingRecognitionResult;

    getResultEndTime(): number;
    setResultEndTime(value: number): StreamingRecognitionResult;

    getChannelTag(): number;
    setChannelTag(value: number): StreamingRecognitionResult;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StreamingRecognitionResult.AsObject;
    static toObject(includeInstance: boolean, msg: StreamingRecognitionResult): StreamingRecognitionResult.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: StreamingRecognitionResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StreamingRecognitionResult;
    static deserializeBinaryFromReader(message: StreamingRecognitionResult, reader: jspb.BinaryReader): StreamingRecognitionResult;
}

export namespace StreamingRecognitionResult {
    export type AsObject = {
        alternativesList: Array<SpeechRecognitionAlternative.AsObject>,
        isFinal: boolean,
        stability: number,
        resultEndTime: number,
        channelTag: number,
    }
}

export class SpeechRecognitionAlternative extends jspb.Message {
    getTranscript(): string;
    setTranscript(value: string): SpeechRecognitionAlternative;

    getConfidence(): number;
    setConfidence(value: number): SpeechRecognitionAlternative;

    clearWordsList(): void;
    getWordsList(): Array<WordInfo>;
    setWordsList(value: Array<WordInfo>): SpeechRecognitionAlternative;
    addWords(value?: WordInfo, index?: number): WordInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpeechRecognitionAlternative.AsObject;
    static toObject(includeInstance: boolean, msg: SpeechRecognitionAlternative): SpeechRecognitionAlternative.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: SpeechRecognitionAlternative, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpeechRecognitionAlternative;
    static deserializeBinaryFromReader(message: SpeechRecognitionAlternative, reader: jspb.BinaryReader): SpeechRecognitionAlternative;
}

export namespace SpeechRecognitionAlternative {
    export type AsObject = {
        transcript: string,
        confidence: number,
        wordsList: Array<WordInfo.AsObject>,
    }
}

export class WordInfo extends jspb.Message {
    getStartTime(): number;
    setStartTime(value: number): WordInfo;

    getEndTime(): number;
    setEndTime(value: number): WordInfo;

    getWord(): string;
    setWord(value: string): WordInfo;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WordInfo.AsObject;
    static toObject(includeInstance: boolean, msg: WordInfo): WordInfo.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: WordInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WordInfo;
    static deserializeBinaryFromReader(message: WordInfo, reader: jspb.BinaryReader): WordInfo;
}

export namespace WordInfo {
    export type AsObject = {
        startTime: number,
        endTime: number,
        word: string,
    }
}

export class SpeechOperation extends jspb.Message {
    getName(): string;
    setName(value: string): SpeechOperation;

    getDone(): boolean;
    setDone(value: boolean): SpeechOperation;


    hasError(): boolean;
    clearError(): void;
    getError(): google_rpc_status_pb.Status | undefined;
    setError(value?: google_rpc_status_pb.Status): SpeechOperation;


    hasResponse(): boolean;
    clearResponse(): void;
    getResponse(): LongRunningRecognizeResponse | undefined;
    setResponse(value?: LongRunningRecognizeResponse): SpeechOperation;


    getResultCase(): SpeechOperation.ResultCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SpeechOperation.AsObject;
    static toObject(includeInstance: boolean, msg: SpeechOperation): SpeechOperation.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: { [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message> };
    static serializeBinaryToWriter(message: SpeechOperation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SpeechOperation;
    static deserializeBinaryFromReader(message: SpeechOperation, reader: jspb.BinaryReader): SpeechOperation;
}

export namespace SpeechOperation {
    export type AsObject = {
        name: string,
        done: boolean,
        error?: google_rpc_status_pb.Status.AsObject,
        response?: LongRunningRecognizeResponse.AsObject,
    }

    export enum ResultCase {
        RESULT_NOT_SET = 0,

        ERROR = 3,

        RESPONSE = 4,

    }

}
