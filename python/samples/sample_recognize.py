from vernacular.ai.speech import Sttp_Client


audio = sppt_pb.RecognitionAudio(
        content = open(args.path, "rb").read()
    )
    config = sppt_pb.RecognitionConfig(
        language_code = args.language_code,
        max_alternatives = args.max_alternatives,
        speech_contexts = [],
    )
    # vernacular token
    token = args.token

    client = Sttp_Client()
    response = client.recognize(audio=audio, config=config, token = token, uuid=args.uuid, timeout=10, segment=args.segment)

    if response and hasattr(response, 'results'):
        for result in response.results:
            # The first alternative is the most likely one for this portion.
            if hasattr(result, 'alternatives') and result.alternatives:
                transcript = result.alternatives[0].transcript.lower()
                confidence = result.alternatives[0].confidence

    print("Response")
    print(response, "\nTranscription:", transcript)
    