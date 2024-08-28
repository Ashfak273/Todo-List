from django.urls import path
from .views import *


urlpatterns = [
    path("todos", todo_list),
    path("todos/<int:id_num>", todo_detail)
]

#urls:
# http://127.0.0.1:8000/todos
# http://127.0.0.1:8000/todos/id