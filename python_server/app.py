from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from pydantic import BaseModel, ValidationError
from typing import Optional
from datetime import datetime
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Модели данных
class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

class ContactMessageResponse(BaseModel):
    id: int
    name: str
    email: str
    message: str
    created_at: datetime

# Подключение к базе данных
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=os.getenv('PGHOST'),
            database=os.getenv('PGDATABASE'),
            user=os.getenv('PGUSER'),
            password=os.getenv('PGPASSWORD'),
            port=os.getenv('PGPORT', 5432)
        )
        return conn
    except Exception as e:
        logger.error(f"Ошибка подключения к базе данных: {e}")
        raise

# Создание таблиц если их нет
def init_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Создаем таблицу контактных сообщений
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Создаем таблицу пользователей
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
        logger.error(f"Ошибка инициализации базы данных: {e}")

# API эндпоинты
@app.route('/api/contact', methods=['POST'])
def submit_contact():
    try:
        # Валидация данных
        data = request.get_json()
        contact_data = ContactMessage(**data)
        
        # Сохранение в базу данных
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        
        cursor.execute("""
            INSERT INTO contact_messages (name, email, message)
            VALUES (%s, %s, %s)
            RETURNING id, name, email, message, created_at
        """, (contact_data.name, contact_data.email, contact_data.message))
        
        result = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Сообщение успешно отправлено',
            'id': result['id']
        })
        
    except ValidationError as e:
        return jsonify({
            'success': False,
            'message': 'Неверные данные формы',
            'errors': e.errors()
        }), 400
    except Exception as e:
        logger.error(f"Ошибка при отправке сообщения: {e}")
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
        logger.error(f"Ошибка при получении сообщений: {e}")
        return jsonify({
            'success': False,
            'message': 'Внутренняя ошибка сервера'
        }), 500

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'service': 'HireHand Python API'})

# Middleware для логирования
@app.before_request
def log_request():
    logger.info(f"{request.method} {request.path} - {request.remote_addr}")

@app.after_request
def log_response(response):
    logger.info(f"{request.method} {request.path} - {response.status_code}")
    return response

if __name__ == '__main__':
    # Инициализация базы данных
    init_db()
    
    # Запуск сервера
    port = int(os.getenv('PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=True)