import json
from json.encoder import JSONEncoder
from django.contrib.auth.decorators import login_required
from django.http.response import HttpResponse, JsonResponse
from datetime import datetime

from .models import Tradenotes

date_Format = '%m/%d/%Y %I:%M%p'
@login_required
def create_Tradenote(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('title','').strip() \
                and request.POST.get('summary','').strip() \
                and request.POST.get('begin_time', '') \
                and request.POST.get('end_time', '') \
                and request.POST.get('emotions',''):
                    new_tradenote = request.user.tradenotes_set.create(
                        title=request.POST.get('title',''),
                        summary=request.POST.get('summary',''), 
                        begin_time=datetime.strptime(request.POST.get('begin_time',''), date_Format), 
                        end_time=datetime.strptime(request.POST.get('end_time',''), date_Format), 
                        emotions=request.POST.get('emotions',''),
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
            return JsonResponse({'message': str('Empty POST Request not allowed')})
    else:
        return JsonResponse({'message': str('ONLY POST REQUESTS ALLOWED')})


@login_required
def edit_Tradenote_Header(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('id',''):
                if request.POST.get('title','').strip() \
                    or request.POST.get('summary','').strip() \
                    or request.POST.get('rationale','').strip() \
                    or request.POST.get('begin_time','').strip() \
                    or request.POST.get('end_time','').strip() or request.POST.get('emotions','').strip():
                    tradenotes = Tradenotes.objects.get(id=request.POST.get('id',''), User__id=request.user.id)
                    tradenotes.title = request.POST.get('title','')
                    tradenotes.summary = request.POST.get('summary','') 
                    tradenotes.rationale = request.POST.get('rationale','')
                    tradenotes.begin_time = datetime.strptime(request.POST.get('begin_time',''), date_Format)
                    tradenotes.end_time = datetime.strptime(request.POST.get('end_time',''), date_Format)
                    tradenotes.last_modified_date = datetime.now()
                    tradenotes.save()
                    return JsonResponse(json.loads(TradenoteEncoder().encode(tradenotes)))
                else: 
                    return JsonResponse({'message': str('No changes have been made.')})
            else: 
                return JsonResponse({'message': str('Invalid access')})
        else: 
            return JsonResponse({'message': str('Empty POST requests not allowed')})
    else: 
        return JsonResponse({'message': str('Only POST requests allowed')})


@login_required
def get_Tradenote(request, tradenote_id):
    if request.method == 'GET':
        if tradenote_id != 0:
            try:
                return JsonResponse({'Tradenote': \
                json.loads(TradenoteEncoder().encode(Tradenotes.objects.get(id=tradenote_id, User__id=request.user.id)))})
            except Tradenotes.DoesNotExist:
                return JsonResponse({'message': str('Unauthorized access to Tradenote')})
        else:
            return JsonResponse({'message': str('Please provide a valid id')})
    else:
        return JsonResponse({'message': str('ONLY GET REQUESTS ALLOWED')})




class TradenoteEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime):
            return o.ctime()
        else:
            return o.__dict__


@login_required
def add_Kpi(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('id',''):
                tradenote = Tradenotes.objects.get(id=request.POST.get('id',''), User_id=request.user.id)
                if tradenote.kpis == None:
                    tradenote.kpis = []
                tradenote.kpis.append({
                    'ticker': request.POST.get('ticker', ''),
                    'value':  request.POST.get('value', 0.00)
                }) 
                tradenote.save()
                return JsonResponse(json.loads(TradenoteEncoder().encode(Tradenotes.objects.get(id=request.POST.get('id',''), User_id=request.user.id))))
            else:
                return JsonResponse({'message': str('Please provide a valid id')})
        else: 
            return JsonResponse({'message': str('Empty POST requests not allowed')})
    else:
        return JsonResponse({'message': str('ONLY GET REQUESTS ALLOWED')})