from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate
from JSON_Response import JSON_Response


def Create_User(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST['username'].strip() \
                and request.POST['password'].strip() \
                and request.POST['email'] \
                and request.POST['first_name'] \
                and request.POST['last_name']:
                if User.objects.filter(username=request.POST['username'].strip().lower()).count() == 0:
                    a = User.objects.create_user(
                    username = request.POST['username'].strip().lower(),
                    password = request.POST['password'].strip(),
                    email = request.POST['email'].strip(),
                    first_name = request.POST['first_name'].strip(),
                    last_name = request.POST['last_name'].strip()
                    )
                    a.save() 
                    login(request, a)
                    res = JSON_Response('{ user: ' + str(User.objects.get(username=request.POST['username'])) + '}')
                    return res
                else:
                    return HttpResponse(str('User already exists'))
            else:
                return HttpResponse(str('data is incorrect'))
        else:
            return HttpResponse(str('Empty POST Request Sent'))
    else:
        return HttpResponse(str('ONLY POST REQUESTS ALLOWED'))


def Login_User(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST['username'].strip() and request.POST['password'].strip():
                user = authenticate(request, username=request.POST['username'].strip(), \
                    password=request.POST['password'].strip())
                if user is not None: 
                    login(request, user)
                    return JSON_Response({'f'username: {user} )
                else:
                    return JSON_Response('User credentials invalid')
            else:
                return HttpResponse('Required fields are empty: check username and password')
        else:
            return HttpResponse('Empty POST Request Sent')
    else:
        return HttpResponse('Only POST Requests Allowed')
                    
                    