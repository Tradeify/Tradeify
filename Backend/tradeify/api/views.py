from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate


def Create_User(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('username','').strip() \
                and request.POST.get('password','').strip() \
                and request.POST.get('email','') \
                and request.POST.get('first_name','') \
                and request.POST.get('last_name',''):
                if User.objects.filter(username=request.POST.get('username','').strip().lower()).count() == 0:
                    a = User.objects.create_user(
                    username = request.POST.get('username','').strip().lower(),
                    password = request.POST.get('password','').strip(),
                    email = request.POST.get('email','').strip(),
                    first_name = request.POST.get('first_name','').strip(),
                    last_name = request.POST.get('last_name','').strip()
                    )
                    a.save() 
                    login(request, a)
                    res = JsonResponse({'user': str(User.objects.get(username=request.POST['username']))})
                    return res
                else:
                    return JsonResponse({ 'message': str('User already exists')})
            else:
                return JsonResponse({'message': str('data is incorrect')})
        else:
            return JsonResponse({'message': str('Empty POST Request Sent')})
    else:
        return JsonResponse({'message': str('ONLY POST REQUESTS ALLOWED')})


def Login_User(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('username','').strip() and request.POST.get('password','').strip():
                user = authenticate(request, username=request.POST.get('username','').strip(), \
                    password=request.POST.get('password','').strip())
                if user is not None: 
                    login(request, user)
                    return JsonResponse({'username': str(user)})
                else:
                    return JsonResponse({'message':'User credentials invalid'})
            else:
                return JsonResponse({'message': 'Required fields are empty: check username and password'})
        else:
            return JsonResponse({'message': 'Empty POST Request Sent'})
    else:
        return JsonResponse({'message': 'Only POST Requests Allowed'})
                    
def Send_Unauthorized(request):
    res = JsonResponse({
        'message': 'User needs to be logged in'
    })
    res.status_code = 401;
    return res        