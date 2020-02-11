import proto.speech_to_text_pb2 as sppt_pb
import proto.speech_to_text_pb2_grpc as sppt_grpc_pb
import grpc

class Sttp_Client(object):

    def __init__(self, channel=None):
        STTP_HOST = os.environ.get('STTP_HOST', "grpc://host:port")
        if STTP_HOST.startswith("grpc://"):
            STTP_HOST = STTP_HOST[len("grpc://"):]
        self.channel = grpc.insecure_channel(STTP_HOST)
        self.client = sppt_grpc_pb.SpeechToTextStub(self.channel)
    
    def recognize(self, config, audio, token, uuid, timeout, segment):
        
        request = sppt_pb.RecognizeRequest(config=config, audio=audio, token=token , uuid=uuid, segment=segment)
        results = self.client.Recognize(request, timeout=timeout)
        return results
    
