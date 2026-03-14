from django.db import models


class Contact(models.Model):
    """
    Model for storing contact form submissions.
    """
    name = models.CharField(max_length=40)
    email = models.EmailField(max_length=40)
    content = models.TextField(max_length=400)
    number = models.CharField(max_length=12)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['-date']
        verbose_name = 'Contact Message'
        verbose_name_plural = 'Contact Messages'

