#!/usr/bin/env python3
"""
Python API сервер для HireHand
Работает параллельно с Node.js frontend на отдельном порту
"""

import os
import sys
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Создание Flask приложения
app = Flask(__name__)

# CORS настройки для работы с frontend на порту 5000
CORS(app, origins=['http://localhost:5000', 'http://0.0.0.0:5000'])

# Конфигурация базы данных
def get_db_connection():
    return psycopg2.connect(
        host=os.getenv('PGHOST'),
        database=os.getenv('PGDATABASE'),
        user=os.getenv('PGUSER'),
        password=os.getenv('PGPASSWORD'),
        port=os.getenv('PGPORT', 5432)
    )

def init_database():
    """Инициализация базы данных"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
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
        logger.info("База данных инициализирована успешно")
        
    except Exception as e:
        logger.error(f"Ошибка инициализации БД: {e}")
        raise

# API эндпоинты
@app.route('/api/contact', methods=['POST'])
def submit_contact():
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
        
        logger.info(f"Новое сообщение от {data['name']} ({data['email']})")
        
        return jsonify({
            'success': True,
            'message': 'Сообщение успешно отправлено',
            'id': result['id']
        })
        
    except Exception as e:
        logger.error(f"Ошибка отправки сообщения: {e}")
        return jsonify({
            'success': False,
            'message': 'Внутренняя ошибка сервера'
        }), 500

@app.route('/api/contact-messages', methods=['GET'])
def get_contact_messages():
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
        logger.error(f"Ошибка получения сообщений: {e}")
        return jsonify({
            'success': False,
            'message': 'Внутренняя ошибка сервера'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'service': 'HireHand Python API',
        'version': '1.0.0',
        'database': 'connected',
        'port': 5001
    })

# Новые Python эндпоинты
@app.route('/api/python/info', methods=['GET'])
def python_info():
    """Информация о Python сервере"""
    return jsonify({
        'message': 'Привет из Python!',
        'language': 'Python 3.11',
        'framework': 'Flask',
        'database': 'PostgreSQL',
        'status': 'Работает успешно!'
    })

@app.route('/api/python/stats', methods=['GET'])
def python_stats():
    """Статистика Python сервера"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM contact_messages")
        message_count = cursor.fetchone()[0]
        
        cursor.execute("SELECT COUNT(*) FROM users")
        user_count = cursor.fetchone()[0]
        
        cursor.close()
        conn.close()
        
        return jsonify({
            'total_messages': message_count,
            'total_users': user_count,
            'python_version': sys.version,
            'server_status': 'active'
        })
        
    except Exception as e:
        logger.error(f"Ошибка получения статистики: {e}")
        return jsonify({'error': 'Ошибка получения статистики'}), 500

# Middleware для логирования
@app.before_request
def log_request():
    logger.info(f"{request.method} {request.path} - {request.remote_addr}")

@app.after_request
def log_response(response):
    logger.info(f"{request.method} {request.path} - {response.status_code}")
    return response

def main():
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
        port = 5001  # Фиксированный порт для Python API
        logger.info("=" * 60)
        logger.info("🐍 PYTHON API СЕРВЕР ЗАПУЩЕН!")
        logger.info(f"🌐 Адрес: http://localhost:{port}")
        logger.info(f"🔗 API: http://localhost:{port}/api")
        logger.info(f"❤️  Health Check: http://localhost:{port}/health")
        logger.info("📝 Frontend на Node.js работает на порту 5000")
        logger.info("🔄 Python API обслуживает бэкенд на порту 5001")
        logger.info("=" * 60)
        
        app.run(
            host='0.0.0.0',
            port=port,
            debug=True,
            threaded=True
        )
        
    except Exception as e:
        logger.error(f"Ошибка запуска Python сервера: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()