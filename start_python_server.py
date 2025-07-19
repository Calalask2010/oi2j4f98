#!/usr/bin/env python3

import os
import sys
from flask import Flask
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Создаем Flask приложение
app = Flask(__name__)
CORS(app)

# Конфигурация базы данных
DB_CONFIG = {
    'host': os.getenv('PGHOST'),
    'database': os.getenv('PGDATABASE'),
    'user': os.getenv('PGUSER'),
    'password': os.getenv('PGPASSWORD'),
    'port': os.getenv('PGPORT', 5432)
}

def get_db_connection():
    return psycopg2.connect(**DB_CONFIG)

def init_database():
    """Инициализация базы данных"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Создание таблиц
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
        """)
        
        conn.commit()
        cursor.close()
        conn.close()
        logger.info("База данных инициализирована")
        
    except Exception as e:
        logger.error(f"Ошибка инициализации БД: {e}")
        raise

@app.route('/api/contact', methods=['POST'])
def submit_contact():
    """API для отправки контактных сообщений"""
    from flask import request, jsonify
    
    try:
        data = request.get_json()
        
        # Валидация данных
        if not data or not all(k in data for k in ['name', 'email', 'message']):
            return jsonify({
                'success': False,
                'message': 'Неверные данные формы'
            }), 400
        
        # Сохранение в базу данных
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
            INSERT INTO contact_messages (name, email, message)
            VALUES (%s, %s, %s)
            RETURNING id, name, email, message, created_at
        """, (data['name'], data['email'], data['message']))
        
        result = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        logger.info(f"Новое контактное сообщение: {data['name']} ({data['email']})")
        
        return jsonify({
            'success': True,
            'message': 'Сообщение успешно отправлено',
            'id': result['id']
        })
        
    except Exception as e:
        logger.error(f"Ошибка при отправке сообщения: {e}")
        return jsonify({
            'success': False,
            'message': 'Внутренняя ошибка сервера'
        }), 500

@app.route('/api/contact-messages', methods=['GET'])
def get_contact_messages():
    """API для получения контактных сообщений"""
    from flask import jsonify
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
            SELECT id, name, email, message, created_at
            FROM contact_messages
            ORDER BY created_at DESC
        """)
        
        messages = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'messages': [dict(msg) for msg in messages]
        })
        
    except Exception as e:
        logger.error(f"Ошибка при получении сообщений: {e}")
        return jsonify({
            'success': False,
            'message': 'Внутренняя ошибка сервера'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    """Проверка состояния сервера"""
    from flask import jsonify
    return jsonify({
        'status': 'healthy', 
        'service': 'HireHand Python API',
        'version': '1.0.0'
    })

# Middleware для логирования
@app.before_request
def log_request():
    from flask import request
    logger.info(f"{request.method} {request.path}")

@app.after_request
def log_response(response):
    from flask import request
    logger.info(f"{request.method} {request.path} - {response.status_code}")
    return response

if __name__ == '__main__':
    try:
        # Проверка переменных окружения
        required_vars = ['PGHOST', 'PGDATABASE', 'PGUSER', 'PGPASSWORD']
        missing_vars = [var for var in required_vars if not os.getenv(var)]
        
        if missing_vars:
            logger.error(f"Отсутствуют переменные окружения: {', '.join(missing_vars)}")
            sys.exit(1)
        
        # Инициализация базы данных
        init_database()
        
        # Запуск сервера
        port = int(os.getenv('PORT', 5000))
        logger.info(f"🚀 Запускаем HireHand Python API на порту {port}")
        logger.info("📝 Frontend доступен по адресу: http://localhost:5000")
        logger.info("🛠️  API доступно по адресу: http://localhost:5000/api")
        
        # Настройка для работы с Vite frontend
        from werkzeug.middleware.proxy_fix import ProxyFix
        app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1, x_prefix=1)
        
        app.run(
            host='0.0.0.0',
            port=port,
            debug=True,
            threaded=True
        )
        
    except Exception as e:
        logger.error(f"Ошибка запуска: {e}")
        sys.exit(1)