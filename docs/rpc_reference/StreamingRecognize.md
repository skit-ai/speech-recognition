# StreamingRecognize

`rpc StreamingRecognize`([StreamingRecognizeRequest](#streamingrecognizerequest))` returns `([StreamingRecognizeResponse](#streamingrecognizeresponse))

Performs bidirectional streaming speech recognition: receive results while sending audio. This method is only available via the gRPC API (not REST API).

## StreamingRecognizeRequest
The top-level message sent by the client for the StreamingRecognize method. Multiple StreamingRecognizeRequest messages are sent. The first message must contain a `streaming_config` message and must not contain `audio_content`. All subsequent messages must contain audio_content and must not contain a streaming_config message.

Union field streaming_request. The streaming request, which is either a streaming config or audio content.
`streaming_request` can be only one of the following:

|Fields|Description|
|--|--|
|streaming_config | [StreamingRecognitionConfig](#streamingrecognitionconfig) <br> Provides information to the recognizer that specifies how to process the request. The first StreamingRecognizeRequest message must contain a streaming_config message.|
|audio_content | bytes <br> The audio data to be recognized. Sequential chunks of audio data are sent in sequential StreamingRecognizeRequest messages. The first StreamingRecognizeRequest message must not contain audio_content data and all subsequent StreamingRecognizeRequest messages must contain audio_content data. The audio bytes must be encoded as specified in [RecognitionConfig](../types/RecognitionConfig.md). Note: as with all bytes fields, proto buffers use a pure binary representation (not base64).|

## StreamingRecognizeResponse
StreamingRecognizeResponse is the only message returned to the client by StreamingRecognize. A series of zero or more StreamingRecognizeResponse messages are streamed back to the client. If there is no recognizable audio, and single_utterance is set to false, then no messages are streamed back to the client.

Here's an example of a series of ten StreamingRecognizeResponses that might be returned while processing audio:

```
results { alternatives { transcript: "tube" } stability: 0.01 }

results { alternatives { transcript: "to be a" } stability: 0.01 }

results { alternatives { transcript: "to be" } stability: 0.9 } results { alternatives { transcript: " or not to be" } stability: 0.01 }

results { alternatives { transcript: "to be or not to be" confidence: 0.92 } alternatives { transcript: "to bee or not to bee" } is_final: true }

results { alternatives { transcript: " that's" } stability: 0.01 }

results { alternatives { transcript: " that is" } stability: 0.9 } results { alternatives { transcript: " the question" } stability: 0.01 }

results { alternatives { transcript: " that is the question" confidence: 0.98 } alternatives { transcript: " that was the question" } is_final: true }
```

Notes:

Only two of the above responses #4 and #7 contain final results; they are indicated by is_final: true. Concatenating these together generates the full transcript: "to be or not to be that is the question".

The others contain interim results. #3 and #6 contain two interim results: the first portion has a high stability and is less likely to change; the second portion has a low stability and is very likely to change. A UI designer might choose to show only high stability results.

The specific stability and confidence values shown above are only for illustrative purposes. Actual values may vary.

In each response, only one of these fields will be set: error or one or more (repeated) results.

|Fields| Description|
|--|--|
|error| Status <br> If set, returns a google.rpc.Status message that specifies the error for the operation.|
|results[]| [StreamingRecognitionResult](#streamingrecognitionresult) <br> This repeated list contains zero or more results that correspond to consecutive portions of the audio currently being processed. It contains zero or one is_final=true result (the newly settled portion), followed by zero or more is_final=false results (the interim results).|

## StreamingRecognitionConfig
Provides information to the recognizer that specifies how to process the request.

|Fields|Description|
|--|--|
|config	| [RecognitionConfig](../types/RecognitionConfig.md)<br> Required. Provides information to the recognizer that specifies how to process the request.|
|interim_results| bool <br> If true, interim results (tentative hypotheses) may be returned as they become available (these interim results are indicated with the is_final=false flag). If false or omitted, only is_final=true result(s) are returned|
|silence_detection_config| [SilenceDetectionConfig](#silencedetectionconfig) <br> Optional. Add silence detection config for enabling silence detection.|

Note: For now `interim_results` will not work. You will only get a final response.

## SilenceDetectionConfig
|Fields|Description|
|--|--|
|enable_silence_detection|bool <br> If true, it enables SD from server side|
|max_speech_timeout|float <br> Max number of seconds for which recognition should go on. For example: For a value of 5, streaming will end after 5 seconds regardless of whether person is speaking or not. Set it to -1 to disable this.|
|silence_patience| float <br> Wait for this many seconds of silence after a voice activity detection, to fire of the silence detected event. Usually 1.5 to 2 is a good value to set.|
|no_input_timeout|float <br> Wait for this many seconds if no voice activity is detected before firing of silence detected event. For example: if set to 5 seconds, detector will wait for 5 seconds for any voice activity and then end the stream. This is there to prevent endless stream if no voice activity is there. Usually 3-5 seconds is a good range for this.|

## StreamingRecognitionResult
A streaming speech recognition result corresponding to a portion of the audio that is currently being processed.

|Fields|Description|
|--|--|
|alternatives[] | [SpeechRecognitionAlternative](../types/SpeechRecognitionResult.md#speechrecognitionalternative) <br>May contain one or more recognition hypotheses (up to the maximum specified in max_alternatives). These alternatives are ordered in terms of accuracy, with the top (first) alternative being the most probable, as ranked by the recognizer.|
|is_final | bool <br>If false, this StreamingRecognitionResult represents an interim result that may change. If true, this is the final time the speech service will return this particular StreamingRecognitionResult, the recognizer will not return any further hypotheses for this portion of the transcript and corresponding audio.|
|stability | float <br>An estimate of the likelihood that the recognizer will not change its guess about this interim result. Values range from 0.0 (completely unstable) to 1.0 (completely stable). This field is only provided for interim results (is_final=false). The default of 0.0 is a sentinel value indicating stability was not set.|
|result_end_time | Duration<br> Time offset of the end of this result relative to the beginning of the audio.|
|channel_tag | int32<br>For multi-channel audio, this is the channel number corresponding to the recognized result for the audio from that channel. For audio_channel_count = N, its output values can range from '1' to 'N'.|
