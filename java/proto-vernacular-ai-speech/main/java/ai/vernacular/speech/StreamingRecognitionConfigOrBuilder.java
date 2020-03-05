// Generated by the protocol buffer compiler.  DO NOT EDIT!
// source: speech-to-text.proto

package ai.vernacular.speech;

public interface StreamingRecognitionConfigOrBuilder extends
    // @@protoc_insertion_point(interface_extends:speech_to_text.StreamingRecognitionConfig)
    com.google.protobuf.MessageOrBuilder {

  /**
   * <pre>
   * Required. Provides information to the recognizer that specifies how to
   * process the request.
   * </pre>
   *
   * <code>.speech_to_text.RecognitionConfig config = 1 [(.google.api.field_behavior) = REQUIRED];</code>
   * @return Whether the config field is set.
   */
  boolean hasConfig();
  /**
   * <pre>
   * Required. Provides information to the recognizer that specifies how to
   * process the request.
   * </pre>
   *
   * <code>.speech_to_text.RecognitionConfig config = 1 [(.google.api.field_behavior) = REQUIRED];</code>
   * @return The config.
   */
  ai.vernacular.speech.RecognitionConfig getConfig();
  /**
   * <pre>
   * Required. Provides information to the recognizer that specifies how to
   * process the request.
   * </pre>
   *
   * <code>.speech_to_text.RecognitionConfig config = 1 [(.google.api.field_behavior) = REQUIRED];</code>
   */
  ai.vernacular.speech.RecognitionConfigOrBuilder getConfigOrBuilder();

  /**
   * <pre>
   * If `true`, interim results (tentative hypotheses) may be
   * returned as they become available (these interim results are indicated with
   * the `is_final=false` flag).
   * If `false` or omitted, only `is_final=true` result(s) are returned.
   * </pre>
   *
   * <code>bool interim_results = 2;</code>
   * @return The interimResults.
   */
  boolean getInterimResults();
}