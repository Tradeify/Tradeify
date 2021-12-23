# Generated by Django 4.0 on 2021-12-23 17:17

import api.models
from django.db import migrations, models
import djongo.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_remove_tradenotes_profile_tradenotes_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='tradenotes',
            name='title',
            field=models.CharField(default='default title', max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='tradenotes',
            name='kpis',
            field=djongo.models.fields.ArrayField(model_container=api.models.Kpi, model_form_class=api.models.KpiForm, null=True),
        ),
        migrations.AlterField(
            model_name='tradenotes',
            name='media',
            field=djongo.models.fields.ArrayField(model_container=api.models.Media, model_form_class=api.models.MediaForm, null=True),
        ),
        migrations.AlterField(
            model_name='tradenotes',
            name='rationale',
            field=models.CharField(max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='tradenotes',
            name='trades',
            field=djongo.models.fields.ArrayField(model_container=api.models.Trade, model_form_class=api.models.TradeForm, null=True),
        ),
    ]