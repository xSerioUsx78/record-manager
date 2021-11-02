from django.utils import timezone
from rest_framework.decorators import (
    api_view, permission_classes
)
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import LimitOffsetPagination
from .serializers import RecordSerializer
from .models import Record


@api_view(['GET', 'POST'])
@permission_classes([permissions.IsAuthenticated])
def record_view(request):
    if request.method == 'GET':
        records = Record.objects.all().order_by('-created')
        paginator = LimitOffsetPagination()
        records = paginator.paginate_queryset(records, request)
        serializer = RecordSerializer(instance=records, many=True)
        return paginator.get_paginated_response(serializer.data)
    elif request.method == 'POST':
        serializer = RecordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)
    

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([permissions.IsAuthenticated])
def record_detail_view(request, pk):

    obj = None
    try:
        obj = Record.objects.get(pk=pk)
    except Record.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = RecordSerializer(instance=obj)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'PUT':
        serializer = RecordSerializer(instance=obj, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(updated=timezone.now())
        return Response(data=serializer.data, status=status.HTTP_200_OK)
    elif request.method == 'DELETE':
        obj.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)