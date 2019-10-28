import os
import logging

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings
from django.template import loader


class IndexView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `npm
    run build`).
    """

    def get(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            try:
                with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                    return HttpResponse(f.read())
            except FileNotFoundError:
                logging.exception('Production build of app not found')
                return HttpResponse(
                    """
                   This URL is only used when you have built the production
                   version of the app. Visit http://localhost:3000/ instead, or
                   run `npm run build` to test the production version.
                   """,
                    status=501,
                )
        else:
            template = loader.get_template('frontend/landing.html')
            context = {}
            return HttpResponse(template.render(context, request))

# from django.contrib.auth import login
#
# from social_django.utils import psa
#
# # Define an URL entry to point to this view, call it passing the
# # access_token parameter like ?access_token=<token>. The URL entry must
# # contain the backend, like this:
# #
#
#
# @psa('social:complete')
# def register_by_access_token(request, backend):
#     # This view expects an access_token GET parameter, if it's needed,
#     # request.backend and request.strategy will be loaded with the current
#     # backend and strategy.
#     token = request.GET.get('access_token')
#     user = request.backend.do_auth(token)
#     if user:
#         login(request, user)
#         return 'OK'
#     else:
#         return 'ERROR'