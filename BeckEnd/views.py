from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer


@api_view(['GET', 'POST'])
def todo_list(request):
    """
    Handle GET and POST requests for the Todo list.

    GET:
    - Retrieve all Todo items.
    - Return a JSON response with the serialized data of all Todo items.

    POST:
    - Create a new Todo item.
    - Validate and save the new Todo item.
    - Return a JSON response with the serialized data of the created Todo item.
    - If validation fails, return a JSON response with the errors.
    """
    if request.method == 'GET':
        todos = Todo.objects.all()
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(["GET", "PUT", "DELETE"])
def todo_detail(request, id_num):
    """
    Handle GET, PUT, and DELETE requests for a specific Todo item.

    GET:
    - Retrieve a specific Todo item by its ID.
    - Return a JSON response with the serialized data of the Todo item.

    PUT:
    - Update a specific Todo item by its ID.
    - Validate and save the updated Todo item.
    - Return a JSON response with the serialized data of the updated Todo item.
    - If validation fails, return a JSON response with the errors.

    DELETE:
    - Delete a specific Todo item by its ID.
    - Return a response with HTTP 204 No Content status.
    """
    todos = get_object_or_404(Todo, id=id_num)

    if request.method == "GET":
        serializer = TodoSerializer(todos)
        return Response(serializer.data)
    
    if request.method == "PUT":
        serializer = TodoSerializer(todos, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == "DELETE":
        todos.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

