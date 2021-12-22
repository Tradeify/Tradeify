from djongo import models
from django import forms


class Profile(models.Model):
    username = models.CharField(max_length=100)
    full_name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return f"\nUsername: {self.username}\nFull Name: {self.full_name}"


# class ProfileForm(forms.ModelForm):
#     class Meta:
#         model = Profile
#         fields = (
#             'username', 'full_name'
#         )


class Kpi(models.Model):
    ticker = models.CharField(max_length=10)
    value = models.FloatField()

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return f"\nTicker: {self.ticker} \nValue: {self.value}"


class KpiForm(forms.ModelForm):
    class Meta:
        model = Kpi
        fields = (
            'ticker', 'value'
        )


class Trade(models.Model):
    ticker = models.CharField(max_length=10)
    entry_time = models.DateTimeField()
    exit_time = models.DateTimeField()
    entry_price = models.FloatField()
    exit_price = models.FloatField()

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return f"\nTicker: {self.ticker}"


class TradeForm(forms.ModelForm):
    class Meta:
        model = Trade
        fields = (
            'ticker', 'entry_time', 'exit_time', 'entry_price', 'exit_price'
        )


class Media(models.Model):
    media_type = models.CharField(max_length=100)
    media_name = models.CharField(max_length=100)
    media_data = models.CharField(max_length=10000)

    class Meta:
        abstract = True

    def __str__(self) -> str:
        return f"\nMedia: {self.media_name}"


class MediaForm(forms.ModelForm):
    class Meta:
        model = Media
        fields = (
            'media_type', 'media_name', 'media_data',
        )


class Tradenotes(models.Model):
    summary = models.CharField(max_length=1000)
    rationale = models.CharField(max_length=1000)
    begin_time = models.DateTimeField()
    end_time = models.DateTimeField()
    last_modified_date = models.DateTimeField()
    created_date = models.DateTimeField()
    emotions = models.CharField(max_length=10)
    Profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    media = models.ArrayField(model_container=Media,
                              model_form_class=MediaForm)
    kpis = models.ArrayField(model_container=Kpi,
                             model_form_class=KpiForm)
    trades = models.ArrayField(model_container=Trade,
                               model_form_class=TradeForm)
    objects = models.DjongoManager()


# class TradenotesForm(forms.ModelForm):
#     class Meta:
#         model = Tradenotes
#         fields = (
#             'summary', 'rationale', 'begin_time', 'end_price', 'last_modified', 'last_modefied_date', 'created_date', 'emotions', 'media', 'kpis', 'trades'
#         )

#     def __str__(self) -> str:
#         return f"\nTradenotes: {self.summary}"
