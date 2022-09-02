from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate


def create_user(request):
    """Creates a new Tradeify user

    Args:
        request (WebRequest): describes a web request object

    Returns:
        WebResopnse: returns a web response
    """
    if request.method == 'POST':
        if request.POST != {}:
            errors = []
            if request.POST.get('username', '').strip() == '':
                errors.append("Invalid Username")
            if request.POST.get('password', '').strip() == '':
                errors.append("Invalid Password")
            if request.POST.get('email', '').strip() == '':
                errors.append("Invalid Email")
            if request.POST.get('firstname', '').strip() == '':
                errors.append("Invalid First Name")
            if request.POST.get('lastname', '').strip() == '':
                errors.append("Invalid Last Name")

            if len(errors) <= 0:
                if User.objects.filter(username=request.POST.get('username', '').strip().lower()).count() == 0:
                    a = User.objects.create_user(
                        username=request.POST.get(
                            'username', '').strip().lower(),
                        password=request.POST.get('password', ''),
                        email=request.POST.get('email', '').strip(),
                        first_name=request.POST.get('firstname', '').strip(),
                        last_name=request.POST.get('lastname', '').strip()
                    )
                    a.save()
                    login(request, a)
                    res = JsonResponse({
                        'user': str(User.objects.get(username=request.POST.get('username', '').strip().lower())),
                        'firstname': a.first_name,
                        'lastname': a.last_name,
                        'email': a.email,
                    })
                    res.status_code = 201
                    return res
                else:
                    res = JsonResponse({'message': str('User already exists')})
                    res.status_code = 400
                    return res
            else:
                res = JsonResponse({
                    'message': str('data is incorrect'),
                    'errors' : errors
                })
                res.status_code = 400
                return res
        else:
            res = JsonResponse({'message': str('Empty POST Request Sent')})
            res.status_code = 400
            return res
    else:
        res = JsonResponse({'message': str('ONLY POST REQUESTS ALLOWED')})
        res.status_code = 400
        return res


def Login_User(request):
    """Logs a user in

     Args:
        request (WebRequest): describes a web request object

    Returns:
        WebResopnse: returns a web response
    """
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('username', '').strip() and request.POST.get('password', '').strip():
                user = authenticate(request, username=request.POST.get('username', '').strip().lower(),
                                    password=request.POST.get('password', '').strip())
                if user is not None:
                    login(request, user)
                    return JsonResponse({
                        'username': str(user),
                        'firstname': user.first_name,
                        'lastname': user.last_name,
                        'email': user.email,
                    })
                else:
                    res = JsonResponse({'message': 'User credentials invalid'})
                    res.status_code = 400
                    return res
            else:
                res = JsonResponse({'message': 'Required fields are empty: check username and password'})
                res.status_code = 400
                return res
        else:
            res = JsonResponse({'message': 'Empty POST Request Sent'})
            res.status_code = 400
            return res
    else:
        res = JsonResponse({'message': 'Only POST Requests Allowed'})
        res.status_code = 400
        return res


def Send_Unauthorized(request):
    """ Overloads an Unauthorized default response
     Args:
        request (WebRequest): describes a web request object

    Returns:
        WebResopnse: returns a web response
    """
    res = JsonResponse({
        'message': 'User needs to be logged in'
    })
    res.status_code = 401
    return res
