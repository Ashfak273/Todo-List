# Todo-List

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)

# Welcome To ToDo List Mini Task

Backend has been created by Django and frontend has been created by React.

# Clone the Repository 
```
git clone https://github.com/Ashfak273/Todo-List.git
```

The Project TODO-LIST has FrontEnd and BeckEnd folder itself 

create virtual environment in the root directory of the project and activate
```
python -m venv venv
venv/Scripts/activate
```

# Install Dependencies
```
pip install django
pip install djangorestframework 
python manage.py makemigrations
python manage.py migrate
pip install django-cors-headers
```

# create a super user to access admin 
```
python manage.py createsuperuser
```

The BeckEnd can be run by 
```
python manage.py runserver
```

It will run on port 8000 and cors enabled in ToFoList/settings.py
```
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```


## Now open a new terminal for FrontEnd React App
install 
```
npm i
npm install axios
```

run the front-end by 
```
npm run dev
```
 
