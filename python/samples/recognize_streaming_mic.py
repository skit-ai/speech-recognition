"""
NOTE: This module requires the additional dependency `pyaudio`.
To install using pip:
    pip install pyaudio
Example usage:
    python recognize_streaming_mic.py
"""

from __future__ import division

import re
import sys

from vernacular.ai import speech
from vernacular.ai.speech import enums, types
import pyaudio
import os
from six.moves import queue

# Audio recording parameters
RATE = 8000
CHUNK = int(RATE / 10)  # 100ms

class MicrophoneStream(object):
    """Opens a recording stream as a generator yielding the audio chunks."""
    def __init__(self, rate, chunk):
        self._rate = rate
        self._chunk = chunk

        # Create a thread-safe buffer of audio data
        self._buff = queue.Queue()
        self.closed = True

    def __enter__(self):
        self._audio_interface = pyaudio.PyAudio()
        self._audio_stream = self._audio_interface.open(
            format=pyaudio.paInt16,
            # The API currently only supports 1-channel (mono) audio
            # https://goo.gl/z757pE
            channels=1, rate=self._rate,
            input=True, frames_per_buffer=self._chunk,
            # Run the audio stream asynchronously to fill the buffer object.
            # This is necessary so that the input device's buffer doesn't
            # overflow while the calling thread makes network requests, etc.
            stream_callback=self._fill_buffer,
        )

        self.closed = False

        return self

    def __exit__(self, type, value, traceback):
        self.end()

    def end(self):
        self._audio_stream.stop_stream()
        self._audio_stream.close()
        self.closed = True
        # Signal the generator to terminate so that the client's
        # streaming_recognize method will not block the process termination.
        self._buff.put(None)
        self._audio_interface.terminate()

    def _fill_buffer(self, in_data, frame_count, time_info, status_flags):
        """Continuously collect data from the audio stream, into the buffer."""
        self._buff.put(in_data)
        return None, pyaudio.paContinue

    def generator(self):
        while not self.closed:
            # Use a blocking get() to ensure there's at least one chunk of
            # data, and stop iteration if the chunk is None, indicating the
            # end of the audio stream.
            chunk = self._buff.get()
            if chunk is None:
                return
            data = [chunk]

            # Now consume whatever other data's still buffered.
            while True:
                try:
                    chunk = self._buff.get(block=False)
                    if chunk is None:
                        return
                    data.append(chunk)
                except queue.Empty:
                    break

            yield b''.join(data)


def main():
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--access_token", type=str, default=os.environ.get("AUTH_ACCESS_TOKEN")
    )
    args = parser.parse_args()
    language_code = 'hi-IN'  # a BCP-47 language tag

    client = speech.SpeechClient(args.access_token)
    config = types.RecognitionConfig(
        encoding=enums.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=RATE,
        language_code=language_code,
    )
    sd_config = types.SilenceDetectionConfig(
        enable_silence_detection=True,
        max_speech_timeout=4,
    )

    streaming_config = types.StreamingRecognitionConfig(config=config, silence_detection_config=sd_config)

    with MicrophoneStream(RATE, CHUNK) as stream:
        audio_generator = stream.generator()
        requests = (types.StreamingRecognizeRequest(audio_content=content)
                    for content in audio_generator)

        responses = client.streaming_recognize(streaming_config, requests)

        # Now, put the transcription responses to use.
        for response in responses:
            stream.end()
            if len(response.results) > 0 and len(response.results[0].alternatives) > 0:
                # Display the transcription of the top alternative.
                transcript = response.results[0].alternatives[0].transcript
                print(transcript)
            else:
                print("Empty results")


if __name__ == '__main__':
    main()
