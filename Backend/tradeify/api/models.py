from django.http.response import JsonResponse
from djongo import models
from django import forms
from django.contrib.auth.models import User
from json import JSONEncoder
from datetime import datetime

#class Profile(models.Model):
    #username = models.CharField(max_length=100)
    #full_name = models.CharField(max_length=200)

    #def __str__(self) -> str:
        #return f"\nUsername: {self.username}\nFull Name: {self.full_name}"


# class ProfileForm(forms.ModelForm):
#     class Meta:
#         model = Profile
#         fields = (
#             'username', 'full_name'
#         )


class Kpi(models.Model, JSONEncoder):
    ticker = models.CharField(max_length=10)
    value = models.FloatField()

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return f"\nTicker: {self.ticker} \nValue: {self.value}"

    def default(self, o):
        if isinstance(o, datetime):
            return dict(year=o.year, month=o.month, day=o.day)
        else:
            return o.__dict__

class KpiForm(forms.ModelForm):
    class Meta:
        model = Kpi
        fields = (
            'ticker', 'value'
        )


class Trade(models.Model, JSONEncoder):
    ticker = models.CharField(max_length=10)
    entry_time = models.DateTimeField()
    exit_time = models.DateTimeField()
    entry_price = models.FloatField()
    exit_price = models.FloatField()

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return f"\nTicker: {self.ticker}"

    def default(self, o):
        if isinstance(o, datetime):
            return dict(year=o.year, month=o.month, day=o.day)
        else:
            return o.__dict__


class TradeForm(forms.ModelForm):
    class Meta:
        model = Trade
        fields = (
            'ticker', 'entry_time', 'exit_time', 'entry_price', 'exit_price'
        )


class Media(models.Model, JSONEncoder):
    media_type = models.CharField(max_length=100)
    media_name = models.CharField(max_length=100)
    media_data = models.CharField(max_length=10000)

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return f"\nMedia: {self.media_name}"

    def default(self, o):
        if isinstance(o, datetime):
            return dict(year=o.year, month=o.month, day=o.day)
        else:
            return o.__dict__


class MediaForm(forms.ModelForm):
    class Meta:
        model = Media
        fields = (
            'media_type', 'media_name', 'media_data',
        )


class Tradenotes(models.Model, JSONEncoder):
    User = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    title = models.CharField(max_length=100)
    summary = models.CharField(max_length=1000)
    rationale = models.CharField(max_length=1000, null=True)
    begin_time = models.DateTimeField()
    end_time = models.DateTimeField()
    last_modified_date = models.DateTimeField()
    created_date = models.DateTimeField()
    emotions = models.CharField(max_length=10)
    #Profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    media = models.ArrayField(model_container=Media,
                              model_form_class=MediaForm,
                              null=True)
    kpis = models.ArrayField(model_container=Kpi,
                             model_form_class=KpiForm,
                             null=True)
    trades = models.ArrayField(model_container=Trade,
                               model_form_class=TradeForm, 
                               null=True)
    objects = models.DjongoManager()


# class TradenotesForm(forms.ModelForm):
#     class Meta:
#         model = Tradenotes
#         fields = (
#             'summary', 'rationale', 'begin_time', 'end_price', 'last_modified', 'last_modefied_date', 'created_date', 'emotions', 'media', 'kpis', 'trades'
#         )

    def __str__(self) -> str:
        return f"\nTradenotes: {self.title} - {self.summary}"
    
    def default(self, o):
        if isinstance(o, datetime):
            return dict(year=o.year, month=o.month, day=o.day)
        else:
            return o.__dict__
