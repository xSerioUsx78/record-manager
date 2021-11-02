from django.urls import path
from .views import record_view, record_detail_view


urlpatterns = [
    path('record/', record_view),
    path('record/<pk>/', record_detail_view)
]