from django.utils.translation import gettext_lazy as _
from django.conf import settings

from rest_framework.authentication import TokenAuthentication, get_authorization_header
from rest_framework import exceptions


HTTP_ONLY_TOKEN_KEY = getattr(settings, 'HTTP_ONLY_TOKEN_KEY', 'token')


class CustomTokenAuthentication(TokenAuthentication):

    def authenticate(self, request):
        auth = get_authorization_header(request).split()

        """
        Overriding authenticate method to enable use of httponly 
        alongside header authentication
        """
        if not auth:
            token = request.COOKIES.get(HTTP_ONLY_TOKEN_KEY)
            if token:
                return self.authenticate_credentials(token)
            return None
        if auth[0].lower() != self.keyword.lower().encode():
            return None

        if len(auth) == 1:
            msg = _('Invalid token header. No credentials provided.')
            raise exceptions.AuthenticationFailed(msg)
        elif len(auth) > 2:
            msg = _('Invalid token header. Token string should not contain spaces.')
            raise exceptions.AuthenticationFailed(msg)

        try:
            token = auth[1].decode()
        except UnicodeError:
            msg = _('Invalid token header. Token string should not contain invalid characters.')
            raise exceptions.AuthenticationFailed(msg)

        return self.authenticate_credentials(token)