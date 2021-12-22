from djongo import models
from django import forms


class User(models.Model):
    username = models.CharField(max_length=100)
    full_name = models.CharField(max_length=200)
    Tradenotes = models.ForeignKey(Tradenotes, on_delete=models.CASCADE)


    class Meta:
        abstract = True
    
class UserForm(forms.modelForm):
    class Meta:
        model = User
        fields = (
            'username', 'full_name'
        )

class Kpi(models.Model):
    ticker = models.CharField(max_length=10)
    value = models.FloatField
    Tradenotes = models.ForeignKey(Tradenotes, on_delete=models.CASCADE)

    
    class Meta:
        abstract = True

class KpiForm(forms.modelForm):
    class Meta:
        model = Kpi
        fields = (
            'ticker', 'value'
        )

class Trade(models.Model):
    ticker = models.CharField(max_length=10)
    entry_time = models.DateTimeField()
    exit_time = models.DateTimeField()
    entry_price = models.FloatField
    exit_price = models.FloatField
    Tradenotes = models.ForeignKey(Tradenotes, on_delete=models.CASCADE)


    class Meta:
        abstract = True

class TradeForm(forms.modelForm):
    class Meta:
        model = Trade
        fields = (
            'ticker', 'entry_time', 'exit_time', 'entry_price', 'exit_price'
        )

class Tradenotes(models.Model):
    summary = models.CharField(max_length=1000)
    rationale = models.CharField(max_length=1000)
    begin_time = models.DateTimeField()
    end_time = models.DateTimeField()
    last_modified_date = models.DateTimeField()
    created_date = models.DateTimeField()
    emotions = models.CharField(max_length=10)
    Tradenotes = models.ForeignKey(Tradenotes, on_delete=models.CASCADE)


class Media(models.Model):
    media_type = models.CharField(max_length=100)
    media_name = models.CharField(max_length=100)
    media_data = models.CharField(max_length=10000)
    Tradenotes = models.ForeignKey(Tradenotes, on_delete=models.CASCADE)

    class Meta:
        abstract = True

class MediaForm(forms.modelForm):
    class Meta:
        model = Media
        fields = (
            'media_type', 'media_name', 'media_data', 
        )