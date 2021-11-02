from rest_framework import serializers
from .models import Record
from users.serializers import UserSerializer


class RecordSerializer(serializers.ModelSerializer):

    created = serializers.SerializerMethodField()
    updated = serializers.SerializerMethodField()
    user = UserSerializer(read_only=True)

    class Meta:
        model = Record
        fields = "__all__"

    def get_created(self, obj):
        return obj.created.strftime('%d %B %Y')
    
    def get_updated(self, obj):
        if obj.updated:
            return obj.updated.strftime('%d %B %Y')
        return None