from vernacular.ai import speech
from vernacular.ai.speech import enums, types

client = speech.SpeechClient()

audio = types.RecognitionAudio(
    content = open("/home/deepankar/Downloads/hello.wav", "rb").read()
)
config = types.RecognitionConfig(
    encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
    sample_rate_hertz=8000,
    language_code = "hi",
    max_alternatives = 1,
)

response = client.recognize(
    audio=audio, config=config, timeout=10
)

print("Response", response)
