from django.urls import path
from .views import (
    RegisterView, LoginView, LogoutView, UserView,
    SessionLoginView, SessionLogoutView
)


urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('session-login/', SessionLoginView.as_view()),
    path('session-logout/', SessionLogoutView.as_view()),
    path('user/', UserView.as_view())
]