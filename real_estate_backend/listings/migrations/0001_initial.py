# Generated by Django 4.2.3 on 2023-07-23 17:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('realtors', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Listing',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, max_length=300, null=True)),
                ('price', models.DecimalField(blank=True, decimal_places=3, max_digits=10, null=True)),
                ('property_status', models.CharField(blank=True, choices=[('Sale', 'Sale'), ('Rent', 'Rent')], max_length=20, null=True)),
                ('rooms', models.IntegerField(blank=True, null=True)),
                ('furnished', models.BooleanField(default=False)),
                ('pool', models.BooleanField(default=False)),
                ('elevator', models.BooleanField(default=False)),
                ('cctv', models.BooleanField(default=False)),
                ('parking', models.BooleanField(default=False)),
                ('date_posted', models.DateTimeField(auto_now_add=True)),
                ('lattitude', models.FloatField(blank=True, null=True)),
                ('longitude', models.FloatField(blank=True, null=True)),
                ('picture1', models.ImageField(blank=True, null=True, upload_to='pictures/%Y/%m/%d')),
                ('picture2', models.ImageField(blank=True, null=True, upload_to='pictures/%Y/%m/%d')),
                ('picture3', models.ImageField(blank=True, null=True, upload_to='pictures/%Y/%m/%d')),
                ('picture4', models.ImageField(blank=True, null=True, upload_to='pictures/%Y/%m/%d')),
                ('realtor', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='realtors.realtor')),
            ],
        ),
    ]
