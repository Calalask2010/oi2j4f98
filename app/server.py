"""
Основной Flask сервер для HireHand Platform
"""

import os
import logging
from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
from werkzeug.exceptions import HTTPException

from .config import config
from .api import register_api_routes
from .database import get_db_stats

logger = logging.getLogger(__name__)

def create_app():
    """Создание и конфигурация Flask приложения"""
    app = Flask(__name__, 
                template_folder='templates',
                static_folder='static')
    
    # Конфигурация
    app.config.update({
        'SECRET_KEY': config.SECRET_KEY,
        'DEBUG': config.DEBUG,
        'SESSION_PERMANENT': config.SESSION_PERMANENT,
        'SESSION_TYPE': config.SESSION_TYPE
    })
    
    # CORS настройки
    CORS(app, origins=config.CORS_ORIGINS)
    
    # Регистрация API роутов
    register_api_routes(app)
    
    # Главная страница
    @app.route('/')
    def index():
        """Главная страница"""
        return render_template('index.html')
    
    # Статические файлы
    @app.route('/static/<path:filename>')
    def serve_static(filename):
        """Обслуживание статических файлов"""
        return send_from_directory(app.static_folder, filename)
    
    # Health check
    @app.route('/health')
    def health_check():
        """Проверка состояния сервера"""
        try:
            stats = get_db_stats()
            return jsonify({
                'status': 'healthy',
                'service': 'HireHand Platform',
                'version': '1.0.0',
                'language': 'Python 3.11',
                'framework': 'Flask',
                'database': 'PostgreSQL',
                'port': config.PORT,
                'stats': stats
            })
        except Exception as e:
            logger.error(f"Health check failed: {e}")
            return jsonify({
                'status': 'unhealthy',
                'error': str(e)
            }), 500
    
    # Обработка ошибок
    @app.errorhandler(404)
    def not_found(error):
        """Обработка 404 ошибок"""
        return jsonify({
            'success': False,
            'error': 'Страница не найдена',
            'status_code': 404
        }), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        """Обработка 500 ошибок"""
        logger.error(f"Internal server error: {error}")
        return jsonify({
            'success': False,
            'error': 'Внутренняя ошибка сервера',
            'status_code': 500
        }), 500
    
    @app.errorhandler(Exception)
    def handle_exception(e):
        """Обработка всех исключений"""
        if isinstance(e, HTTPException):
            return jsonify({
                'success': False,
                'error': e.description,
                'status_code': e.code
            }), e.code
        
        logger.error(f"Unhandled exception: {e}")
        return jsonify({
            'success': False,
            'error': 'Внутренняя ошибка сервера',
            'status_code': 500
        }), 500
    
    # Middleware для логирования запросов
    @app.before_request
    def log_request_info():
        """Логирование входящих запросов"""
        logger.info(f"{request.method} {request.path} - {request.remote_addr}")
    
    @app.after_request
    def log_response_info(response):
        """Логирование ответов"""
        logger.info(f"{request.method} {request.path} - {response.status_code}")
        return response
    
    return app