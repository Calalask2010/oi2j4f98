"""
API роуты для HireHand Platform
"""

from flask import Flask
from .contact import contact_bp
from .jobs import jobs_bp
from .candidates import candidates_bp
from .users import users_bp

def register_api_routes(app: Flask):
    """Регистрация всех API роутов"""
    
    # Префикс для всех API роутов
    api_prefix = '/api'
    
    # Регистрация блюпринтов
    app.register_blueprint(contact_bp, url_prefix=f"{api_prefix}/contact")
    app.register_blueprint(jobs_bp, url_prefix=f"{api_prefix}/jobs")
    app.register_blueprint(candidates_bp, url_prefix=f"{api_prefix}/candidates")
    app.register_blueprint(users_bp, url_prefix=f"{api_prefix}/users")