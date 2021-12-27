import json
from json.encoder import JSONEncoder
from django.contrib.auth.decorators import login_required
from django.db.models.indexes import Index
from django.http.response import HttpResponse, JsonResponse
from datetime import datetime

from .models import Tradenotes

date_Format = '%m/%d/%Y %I:%M%p'


@login_required
def create_Tradenote(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('title', '').strip() \
                    and request.POST.get('summary', '').strip() \
                    and request.POST.get('begin_time', '') \
                    and request.POST.get('end_time', '') \
                    and request.POST.get('emotions', ''):
                new_tradenote = request.user.tradenotes_set.create(
                    title=request.POST.get('title', ''),
                    summary=request.POST.get('summary', ''),
                    begin_time=datetime.strptime(
                        request.POST.get('begin_time', ''), date_Format),
                    end_time=datetime.strptime(
                        request.POST.get('end_time', ''), date_Format),
                    emotions=request.POST.get('emotions', ''),
                    last_modified_date=datetime.now(),
                    created_date=datetime.now()
                )
                return JsonResponse({'Tradenote': {
                    'Title': new_tradenote.title,
                    'Summary': new_tradenote.summary
                }})
            else:
                return JsonResponse({'message': str('Please enter tradenote title')})
        else:
            return JsonResponse({'message': str('Empty POST Request not allowed')})
    else:
        return JsonResponse({'message': str('ONLY POST REQUESTS ALLOWED')})


@login_required
def edit_Tradenote_Header(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('id', ''):
                if request.POST.get('title', '').strip() \
                        or request.POST.get('summary', '').strip() \
                        or request.POST.get('rationale', '').strip() \
                        or request.POST.get('begin_time', '').strip() \
                        or request.POST.get('end_time', '').strip() or request.POST.get('emotions', '').strip():
                    try:
                        tradenotes = Tradenotes.objects.get(
                            id=request.POST.get('id', ''), User__id=request.user.id)
                        tradenotes.title = request.POST.get('title', '')
                        tradenotes.summary = request.POST.get('summary', '')
                        tradenotes.rationale = request.POST.get(
                            'rationale', '')
                        tradenotes.begin_time = datetime.strptime(
                            request.POST.get('begin_time', ''), date_Format)
                        tradenotes.end_time = datetime.strptime(
                            request.POST.get('end_time', ''), date_Format)
                        tradenotes.last_modified_date = datetime.now()
                        tradenotes.save()
                        return JsonResponse(json.loads(TradenoteEncoder().encode(tradenotes)))
                    except Tradenotes.DoesNotExist:
                        return JsonResponse({'message': str('Unauthorized access to Tradenote')})
                else:
                    return JsonResponse({'message': str('No changes have been made.')})
            else:
                return JsonResponse({'message': str('Invalid access')})
        else:
            return JsonResponse({'message': str('Empty POST requests not allowed')})
    else:
        return JsonResponse({'message': str('Only POST requests allowed')})


@login_required
def delete_Tradenote(request, tradenote_id):
    if request.method == 'DELETE':
        if tradenote_id != 0:
            try:
                tradenotes = Tradenotes.objects.get(
                    id=tradenote_id, User__id=request.user.id)
                tradenotes.delete()
                if Tradenotes.objects.filter(id=tradenote_id, User__id=request.user.id).count() == 0:
                    return JsonResponse({'message': str('Tradenote has been deleted')})
                else:
                    return JsonResponse({'message': str('Tradenote was not deleted')})
            except Tradenotes.DoesNotExist:
                return JsonResponse({'message': str('Tradenote does not exist')})
        else:
            return JsonResponse({'message': str('Invalid access')})
    else:
        return JsonResponse({'message': str('Only DELETE requests allowed')})


@login_required
def get_Tradenote(request, tradenote_id):
    if request.method == 'GET':
        if tradenote_id != 0:
            try:
                return JsonResponse({'Tradenote':
                                     json.loads(TradenoteEncoder().encode(Tradenotes.objects.get(id=tradenote_id, User__id=request.user.id)))})
            except Tradenotes.DoesNotExist:
                return JsonResponse({'message': str('Unauthorized access to Tradenote')})
        else:
            return JsonResponse({'message': str('Please provide a valid id')})
    else:
        return JsonResponse({'message': str('ONLY GET REQUESTS ALLOWED')})


@login_required
def get_All_Tradenotes(request):
    if request.method == 'GET':
        try:
            return JsonResponse({'Tradenotes':
                                 json.loads(TradenoteEncoder.encode(Tradenotes.objects.filter(User__id=request.user.id)))})
        except Tradenotes.DoesNotExist:
            return JsonResponse({'message': 'No tradenotes found for this user'})
    else:
        return JsonResponse({'message': str('ONLY GET REQUESTS ALLOWED')})


class TradenoteEncoder(JSONEncoder):
    def default(self, o):
        return o.ctime() if isinstance(o, datetime) else o.__dict__


@login_required
def add_Kpi(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('id', ''):
                try:
                    tradenote = Tradenotes.objects.get(
                        id=request.POST.get('id', ''), User_id=request.user.id)
                    if tradenote.kpis == None:
                        tradenote.kpis = []
                    tradenote.kpis.append({
                        'ticker': request.POST.get('ticker', ''),
                        'value':  request.POST.get('value', 0.00)
                    })
                    tradenote.save()
                    return JsonResponse(json.loads(TradenoteEncoder().encode(Tradenotes.objects.get(id=request.POST.get('id', ''), User_id=request.user.id))))
                except Tradenotes.DoesNotExist:
                    return JsonResponse({'message': str('Unauthorized access to Tradenote')})
            else:
                return JsonResponse({'message': str('Please provide a valid id')})
        else:
            return JsonResponse({'message': str('Empty POST requests not allowed')})
    else:
        return JsonResponse({'message': str('ONLY POST REQUESTS ALLOWED')})


@login_required
def edit_Kpi(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('id', ''):
                if request.POST.get('ticker', '').strip() \
                        or request.POST.get('value', '').strip():
                    try:
                        tradenote = Tradenotes.objects.get(
                            id=request.POST.get('id', ''), User_id=request.user.id)
                        tradenote.kpis[int(request.POST.get('index', 0))] = {
                            'ticker': request.POST.get('ticker', ''),
                            'value':  request.POST.get('value', 0.00)
                        }
                        tradenote.save()
                        return JsonResponse(json.loads(TradenoteEncoder().encode(Tradenotes.objects.get(id=request.POST.get('id', ''), User_id=request.user.id))))
                    except Tradenotes.DoesNotExist:
                        return JsonResponse({'message': str('Unauthorized access to Tradenote')})
                else:
                    return JsonResponse({'message': str('Please provide a ticker')})
            else:
                return JsonResponse({'message': str('Please provide a valid id')})
        else:
            return JsonResponse({'message': str('Empty POST requests not allowed')})
    else:
        return JsonResponse({'message': str('ONLY POST REQUESTS ALLOWED')})


@login_required
def add_Trade(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('id', ''):
                try:
                    tradenote = Tradenotes.objects.get(
                        id=request.POST.get('id', ''), User_id=request.user.id)
                    if tradenote.trades == None:
                        tradenote.trades = []
                    tradenote.trades.append({
                        'ticker': request.POST.get('ticker', ''),
                        'entry_time': datetime.strptime(request.POST.get('entry_time', ''), date_Format),
                        'exit_time': datetime.strptime(request.POST.get('exit_time', ''), date_Format),
                        'entry_price': request.POST.get('entry_price', ''),
                        'exit_price': request.POST.get('exit_price', '')
                    })
                    tradenote.save()
                    return JsonResponse(json.loads(TradenoteEncoder().encode(Tradenotes.objects.get(id=request.POST.get('id', ''), User_id=request.user.id))))
                except Tradenotes.DoesNotExist:
                    return JsonResponse({'message': str('Unauthorized access to Tradenote')})
            else:
                return JsonResponse({'message': str('Please provide a valid id')})
        else:
            return JsonResponse({'message': str('Empty POST requests not allowed')})
    else:
        return JsonResponse({'message': str('ONLY POST REQUESTS ALLOWED')})


@login_required
def edit_Trade(request):
    if request.method == 'POST':
        if request.POST != {}:
            if request.POST.get('id', ''):
                if request.POST.get('ticker', '').strip() \
                        or request.POST.get('entry_time', '').strip()\
                        or request.POST.get('exit_time', '').strip()\
                        or request.POST.get('entry_price', '').strip()\
                        or request.POST.get('exit_price', '').strip():
                    try:
                        tradenote = Tradenotes.objects.get(
                            id=request.POST.get('id', ''), User_id=request.user.id)
                        tradenote.trades[int(request.POST.get('index', 0))] = {
                            'ticker': request.POST.get('ticker', ''),
                            'entry_time':  datetime.strptime(request.POST.get('entry_time', 0.00), date_Format),
                            'exit_time':  datetime.strptime(request.POST.get('exit_time', 0.00), date_Format),
                            'entry_price':  request.POST.get('entry_price', 0.00),
                            'exit_price':  request.POST.get('exit_price', 0.00)
                        }
                        tradenote.save()
                        return JsonResponse(json.loads(TradenoteEncoder().encode(Tradenotes.objects.get(id=request.POST.get('id', ''), User_id=request.user.id))))
                    except Tradenotes.DoesNotExist:
                        return JsonResponse({'message': str('Unauthorized access to Tradenote')})
                else:
                    return JsonResponse({'message': str('Please provide a ticker')})
            else:
                return JsonResponse({'message': str('Please provide a valid id')})
        else:
            return JsonResponse({'message': str('Empty POST requests not allowed')})
    else:
        return JsonResponse({'message': str('ONLY POST REQUESTS ALLOWED')})
