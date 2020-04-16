package ai.vernacular.examples.speech;

import ai.vernacular.speech.SpeechClient;
import ai.vernacular.speech.RecognitionAudio;
import ai.vernacular.speech.RecognitionConfig;
import ai.vernacular.speech.SpeechRecognitionAlternative;
import ai.vernacular.speech.RecognitionConfig.AudioEncoding;
import ai.vernacular.speech.RecognizeResponse;
import ai.vernacular.speech.SpeechRecognitionResult;
import com.google.protobuf.ByteString;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class RecognizeSync {

    public static void sampleRecognize(String accessToken, String localFilePath) {
        try (SpeechClient speechClient = new SpeechClient(accessToken)) {
            // The language of the supplied audio
            String languageCode = "en-IN";

            // Sample rate in Hertz of the audio data sent
            int sampleRateHertz = 8000;

            // Encoding of audio data sent. This sample sets this explicitly.
            RecognitionConfig.AudioEncoding encoding = RecognitionConfig.AudioEncoding.LINEAR16;
            RecognitionConfig config = RecognitionConfig.newBuilder().setLanguageCode(languageCode)
                    .setSampleRateHertz(sampleRateHertz).setEncoding(encoding).build();
            Path path = Paths.get(localFilePath);
            byte[] data = Files.readAllBytes(path);
            ByteString content = ByteString.copyFrom(data);
            RecognitionAudio audio = RecognitionAudio.newBuilder().setContent(content).build();
            RecognizeResponse response = speechClient.recognize(config, audio);
            for (SpeechRecognitionResult result : response.getResultsList()) {
                // First alternative is the most probable result
                SpeechRecognitionAlternative alternative = result.getAlternativesList().get(0);
                System.out.printf("Transcript: %s\n", alternative.getTranscript());
            }
        } catch (IOException exception) {
            System.err.println("Failed to create the client due to: " + exception.getMessage());
        }
    }

    public static void main(String[] args) {
        sampleRecognize("vernacularai", "hello.wav");
    }
}
