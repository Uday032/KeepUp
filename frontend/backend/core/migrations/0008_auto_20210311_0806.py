# Generated by Django 3.1.7 on 2021-03-11 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_auto_20210305_1643'),
    ]

    operations = [
        migrations.AlterField(
            model_name='articles',
            name='ArticleTitle',
            field=models.CharField(max_length=220, unique=True),
        ),
    ]
