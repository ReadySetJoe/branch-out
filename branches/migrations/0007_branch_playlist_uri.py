# Generated by Django 2.2.6 on 2019-11-12 21:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('branches', '0006_branch_playlist_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='branch',
            name='playlist_uri',
            field=models.CharField(max_length=255, null=True),
        ),
    ]