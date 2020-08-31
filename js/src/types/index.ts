export declare namespace Typings {
  export interface config {
    encoding: encoding;
    sampleRateHertz: number;
    languageCode: string;
    maxAlternatives: number;
    enableWordTimeOffsets: boolean;
  }

  export interface audio {
    audio: ByteBuffer | string;
  }
}

export enum encoding {
  ENCODING_UNSPECIFIED = 0,
  LINEAR16 = 1,
  FLAC = 2,
  MP3 = 3,
}
