package ai.vernacular.speech;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.Metadata;
import ai.vernacular.speech.SpeechToTextGrpc;

import java.io.IOException;

import ai.vernacular.speech.RecognitionAudio;
import ai.vernacular.speech.RecognizeRequest;
import ai.vernacular.speech.RecognizeResponse;
import ai.vernacular.speech.RecognitionAudio;
import ai.vernacular.speech.RecognitionConfig;

public class SpeechClient implements AutoCloseable{

    public static final String STTP_GRPC_HOST = "localhost";
    public static final int STTP_GRPC_PORT = 5021;
    public static final String AUTHORIZATION = "authorization";

    private String accessToken;
    private ManagedChannel channel;
    private SpeechToTextGrpc.SpeechToTextBlockingStub channelStub;

    public SpeechClient(String accessToken) {
        this.accessToken = accessToken;

        this.channel = ManagedChannelBuilder.forAddress(STTP_GRPC_HOST, STTP_GRPC_PORT).usePlaintext().build();
        this.channelStub = SpeechToTextGrpc.newBlockingStub(channel);
    }

    public final RecognizeResponse recognize(RecognitionConfig config, RecognitionAudio audio) {
        // return recognizeCallable().call(request);
        RecognizeRequest request = RecognizeRequest.newBuilder().setConfig(config).setAudio(audio).build();
        return this.channelStub.recognize(request);
    }

    @Override
    public void close() throws IOException {

    }

}
