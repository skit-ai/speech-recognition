from __future__ import absolute_import
import sys
import collections
import inspect

from google.rpc import status_pb2
from google.protobuf.message import Message

from vernacular.ai.speech.proto import speech_to_text_pb2
from vernacular.ai.speech.utils import _SpeechOperation


_shared_modules = [status_pb2]
_local_modules = [speech_to_text_pb2]

names = []

def get_messages(module):
    """Discovers all protobuf Message classes in a given import module.

    Args:
        module (module): A Python module; :func:`dir` will be run against this
            module to find Message subclasses.

    Returns:
        dict[str, google.protobuf.message.Message]: A dictionary with the
            Message class names as keys, and the Message subclasses themselves
            as values.
    """
    answer = collections.OrderedDict()
    for name in dir(module):
        candidate = getattr(module, name)
        if inspect.isclass(candidate) and issubclass(candidate, Message):
            answer[name] = candidate
    return answer


for module in _shared_modules:  # pragma: NO COVER
    for name, message in get_messages(module).items():
        setattr(sys.modules[__name__], name, message)
        names.append(name)

for module in _local_modules:
    for name, message in get_messages(module).items():
        message.__module__ = "vernacular.ai.speech.types"
        setattr(sys.modules[__name__], name, message)
        names.append(name)


__all__ = tuple(sorted(names))
