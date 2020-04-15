# Java Speech to Text SDK
Java SDK for vernacular.ai speech to text APIs. Go [here](https://github.com/Vernacular-ai/speech-recognition) for detailed product documentation.


## Installation
If you are using maven add this to your `pom.xml`

```xml
<dependency>
  <groupId>ai.vernacular.speech</groupId>
  <artifactId>vernacular-ai-speech</artifactId>
  <version>0.1.0</version>
</dependency>
```

If you are using Gradle, add this to your dependencies

```gradle
compile 'ai.vernacular.speech:vernacular-ai-speech:0.1.0'
```

## Example Usage
This example shows how to recognize speech from audio url. First add these imports to top of java file.

```java
import ai.vernacular.speech.SpeechClient;
import ai.vernacular.speech.RecognitionAudio;
import ai.vernacular.speech.RecognitionConfig;
import ai.vernacular.speech.RecognitionConfig.AudioEncoding;
import ai.vernacular.speech.RecognizeResponse;
```

Then add this code to recognize the audio.

```java
try (SpeechClient speechClient = SpeechClient.create(accessToken)) {
   RecognitionConfig.AudioEncoding encoding = RecognitionConfig.AudioEncoding.LINEAR16;
   int sampleRateHertz = 8000;
   String languageCode = "en-IN";
   RecognitionConfig config = RecognitionConfig.newBuilder()
     .setEncoding(encoding)
     .setSampleRateHertz(sampleRateHertz)
     .setLanguageCode(languageCode)
     .build();
   String uri = "https://url/to/audio.wav";
   RecognitionAudio audio = RecognitionAudio.newBuilder()
     .setUri(uri)
     .build();
   RecognizeResponse response = speechClient.recognize(config, audio);
}
```

To see more examples, go to [samples](https://github.com/Vernacular-ai/speech-recognition/tree/master/java/samples).

To run a sample:

```shell
./gradlew :samples:run -Pexample=RecognizeSync
```