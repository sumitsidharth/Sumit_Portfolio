from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib import messages
from firstapp import models
from firstapp.models import Contact


def home(request):
    """
    Render the home page.
    """
    return render(request, 'home.html')


def contact(request):
    """
    Handle contact form submissions.
    Validates input and saves contact information to database.
    """
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        number = request.POST.get('number')
        content = request.POST.get('content')

        # Validate name
        if not (1 < len(name) < 30):
            messages.error(request, 'Length of name should be greater than 1 and less than 30 characters')
            return render(request, 'home.html')

        # Validate email
        if not (1 < len(email) < 50):
            messages.error(request, 'Invalid email, please try again')
            return render(request, 'home.html')

        # Validate phone number (should be 10-12 digits)
        if not (9 < len(number) < 13):
            messages.error(request, 'Invalid phone number, please try again')
            return render(request, 'home.html')

        # Save contact to database
        ins = models.Contact(
            name=name,
            email=email,
            content=content,
            number=number
        )
        ins.save()

        messages.success(request, 'Thank you for contacting me!! Your message has been saved')
        print('Data has been saved to database')

    return render(request, 'home.html')

