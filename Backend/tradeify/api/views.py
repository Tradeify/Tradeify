from django.shortcuts import render
from django.http import HttpResponse

from .models import Profile

def Create_Profile(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST['username'].strip() and request.POST['full_name'].strip():
                print(str(Profile.objects.filter(username='nothing').count()))
                if Profile.objects.filter(username=request.POST['username']).count() == 0:
                    a = Profile(
                    username = request.POST['username'],
                    full_name = request.POST['full_name']
                    )
                    a.save() 
                    res = HttpResponse(str(Profile.objects.get(username=request.POST['username'])))
                    return res
                else:
                    return HttpResponse(str('User already exists'))
            else:
                return HttpResponse(str('data is incorrect'))
        else:
            return HttpResponse(str('Empy POST Request Sent'))
    else:
        return HttpResponse(str('ONLY POST REQUESTS ALLOWED'))


