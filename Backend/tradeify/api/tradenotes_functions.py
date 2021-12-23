from django.contrib.auth.decorators import login_required
from django.http.response import JsonResponse
from datetime import datetime

from .models import Tradenotes

date_Format = '%m/%d/%Y %I:%M%p'
@login_required
def create_Tradenote(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST['title'].strip() \
                and request.POST['summary'].strip() \
                and request.POST['begin_time'] \
                and request.POST['end_time'] \
                and request.POST['emotions']:
                    new_tradenote = request.user.tradenotes_set.create(
                        title=request.POST['title'],
                        summary=request.POST['summary'], 
                        begin_time=datetime.strptime(request.POST['begin_time'], date_Format), 
                        end_time=datetime.strptime(request.POST['end_time'], date_Format), 
                        emotions=request.POST['emotions'],
                        last_modified_date=datetime.now(),
                        created_date=datetime.now()
                    )
                    return JsonResponse({'Tradenote': {
                        'Title': new_tradenote.title,
                        'Summary': new_tradenote.summary
                    }})
            else:
                return JsonResponse({ 'message': str('Please enter tradenote title')})
        else :
            return JsonResponse({'message': str('Empty POST Request Sent')})
    else:
        return JsonResponse({'message': str('ONLY POST REQUESTS ALLOWED')})


#@login_required
#def edit_Tradenote_Header(request):
    #if request.method == 'POST':
        #if request.POST != {}:
            #if request.POST['id']:
                #if request.POST['title'].strip() \
                    #or request.POST['summary'].strip() \
                    #or request.POST['rationale'].strip() \
                    #or request.POST['begin_time'].strip() \
                    #or request.POST['end_time'].strip() or request.POST['emotions'].strip():
                    #Tradenotes.object.get(id=request.POST['id'], User__id=request.user.id)

@login_required
def get_Tradenote(request, tradenote_id):
    if request.method == 'GET':
        if tradenote_id != 0:
            Tradenotes.objects.get(tradenote_id, User__id=request.user.id)
            return JsonResponse({'Tradenote': Tradenotes.objects.get(tradenote_id, User__id=request.user.id)})
        else:
            return JsonResponse({'message': str('Please provide a valid id')})
    else:
        return JsonResponse({'message': str('ONLY GET REQUESTS ALLOWED')})