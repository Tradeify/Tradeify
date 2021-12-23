from django.http import HttpResponse

def JSON_Response(response_string):
    response = HttpResponse(response_string, content_type="application/json")
    return response
    