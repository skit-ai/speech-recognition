from __future__ import absolute_import

import grpc

class VernacularAPIError(Exception):
    """
    Base class for all exceptions raised by Vernacular API Clients.
    """
    pass


class VernacularAPICallError(VernacularAPIError):
    """
    Base class for exceptions raised by calling API methods.

    Args:
        message (str): The exception message.
        errors (Sequence[Any]): An optional list of error details.
        response (Union[requests.Request, grpc.Call]): The response or
            gRPC call metadata.
    """

    code = None
    """
    Optional[int]: The HTTP status code associated with this error.

    This may be ``None`` if the exception does not have a direct mapping
    to an HTTP error.

    See http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html
    """

    grpc_status_code = None
    """
    Optional[grpc.StatusCode]: The gRPC status code associated with this
    error.

    This may be ``None`` if the exception does not match up to a gRPC error.
    """

    def __init__(self, message, errors=(), response=None):
        super(VernacularAPIError, self).__init__(message)
        self.message = message
        """str: The exception message."""
        self._errors = errors
        self._response = response

    def __str__(self):
        return "{} {}".format(self.code, self.message)

    @property
    def errors(self):
        """Detailed error information.

        Returns:
            Sequence[Any]: A list of additional error details.
        """
        return list(self._errors)

    @property
    def response(self):
        """Optional[Union[requests.Request, grpc.Call]]: The response or
        gRPC call metadata."""
        return self._response