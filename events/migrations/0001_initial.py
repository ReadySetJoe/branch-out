# Generated by Django 2.2.6 on 2019-10-29 21:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('venue', models.CharField(max_length=255)),
                ('url', models.URLField()),
                ('price', models.FloatField()),
                ('date', models.DateField()),
                ('artist', models.CharField(max_length=255)),
            ],
        ),
    ]
