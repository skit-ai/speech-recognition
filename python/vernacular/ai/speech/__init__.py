from __future__ import absolute_import

from vernacular.ai.speech import speech_client
from vernacular.ai.speech import types
from vernacular.ai.speech import enums


class SpeechClient(speech_client.SpeechClient):
    __doc__ = speech_client.SpeechClient.__doc__
    enums = enums
    types = types


__all__ = ("SpeechClient", "enums", "types")
