import enum


class RecognitionConfig(object):
    class AudioEncoding(enum.IntEnum):
        """
        The encoding of the audio data sent in the request.
        All encodings support only 1 channel (mono) audio, unless the
        ``audio_channel_count`` and ``enable_separate_recognition_per_channel``
        fields are set.
        For best results, the audio source should be captured and transmitted
        using a lossless encoding (``FLAC`` or ``LINEAR16``). The accuracy of
        the speech recognition can be reduced if lossy codecs are used to
        capture or transmit audio, particularly if background noise is present.
        Lossy codecs include ``MULAW``, ``AMR``, ``AMR_WB``, ``OGG_OPUS``,
        ``SPEEX_WITH_HEADER_BYTE``, and ``MP3``.
        The ``FLAC`` and ``WAV`` audio file formats include a header that
        describes the included audio content. You can request recognition for
        ``WAV`` files that contain either ``LINEAR16`` or ``MULAW`` encoded
        audio. If you send ``FLAC`` or ``WAV`` audio file format in your
        request, you do not need to specify an ``AudioEncoding``; the audio
        encoding format is determined from the file header. If you specify an
        ``AudioEncoding`` when you send send ``FLAC`` or ``WAV`` audio, the
        encoding configuration must match the encoding described in the audio
        header; otherwise the request returns an
        ``google.rpc.Code.INVALID_ARGUMENT`` error code.
        Attributes:
          ENCODING_UNSPECIFIED (int): Not specified.
          LINEAR16 (int): Uncompressed 16-bit signed little-endian samples (Linear PCM).
          FLAC (int): ``FLAC`` (Free Lossless Audio Codec) is the recommended encoding because
          it is lossless--therefore recognition is not compromised--and requires
          only about half the bandwidth of ``LINEAR16``. ``FLAC`` stream encoding
          supports 16-bit and 24-bit samples, however, not all fields in
          ``STREAMINFO`` are supported.
        """

        ENCODING_UNSPECIFIED = 0
        LINEAR16 = 1
        FLAC = 2
        MP3 = 3