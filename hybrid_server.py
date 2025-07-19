#!/usr/bin/env python3
"""
Гибридный сервер: Python Flask API + Vite dev server для HireHand
Заменяет Node.js Express сервер
"""

import os
import sys
import subprocess
import threading
import time
import signal
import logging
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Flask приложение
app = Flask(__name__)
CORS(app)

# Конфигурация
PORT = int(os.getenv('PORT', 5000))
VITE_DEV_PORT = PORT + 1  # Vite будет на порту 5001

# База данных
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
        logger.info("✅ База данных инициализирована")
        
    except Exception as e:
        logger.error(f"❌ Ошибка инициализации БД: {e}")
        raise

# API эндпоинты
@app.route('/api/contact', methods=['POST'])
def submit_contact():
    try:
        data = request.get_json()
        
        if not data or not all(k in data for k in ['name', 'email', 'message']):
            return jsonify({
                'success': False,
                'message': 'Неверные данные формы'
            }), 400
        
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
        
        logger.info(f"📧 Новое сообщение от {data['name']} ({data['email']})")
        
        return jsonify({
            'success': True,
            'message': 'Сообщение успешно отправлено',
            'id': result['id']
        })
        
    except Exception as e:
        logger.error(f"❌ Ошибка отправки сообщения: {e}")
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
        logger.error(f"❌ Ошибка получения сообщений: {e}")
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
        'database': 'connected'
    })

# Прокси для Vite dev server
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    """Проксирование запросов к Vite dev server"""
    import requests
    try:
        vite_url = f"http://localhost:{VITE_DEV_PORT}/{path}"
        response = requests.get(vite_url, stream=True)
        return response.content, response.status_code, dict(response.headers)
    except Exception as e:
        logger.error(f"❌ Ошибка проксирования к Vite: {e}")
        return "Frontend недоступен", 503

# Middleware для логирования
@app.before_request
def log_request():
    if request.path.startswith('/api'):
        logger.info(f"🔗 {request.method} {request.path}")

@app.after_request
def log_response(response):
    if request.path.startswith('/api'):
        logger.info(f"✅ {request.method} {request.path} - {response.status_code}")
    return response

# Запуск Vite dev server
def start_vite_server():
    """Запускает Vite dev server"""
    try:
        logger.info(f"🚀 Запускаем Vite dev server на порту {VITE_DEV_PORT}")
        
        # Запуск Vite с указанием порта
        cmd = ["npm", "run", "dev", "--", "--port", str(VITE_DEV_PORT), "--host", "0.0.0.0"]
        
        process = subprocess.Popen(
            cmd,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env={**os.environ, 'VITE_PORT': str(VITE_DEV_PORT)}
        )
        
        # Ожидание запуска Vite
        time.sleep(5)
        
        if process.poll() is None:
            logger.info(f"✅ Vite dev server запущен на порту {VITE_DEV_PORT}")
        else:
            stdout, stderr = process.communicate()
            logger.error(f"❌ Ошибка запуска Vite: {stderr.decode()}")
            
        return process
        
    except Exception as e:
        logger.error(f"❌ Ошибка запуска Vite: {e}")
        return None

def signal_handler(sig, frame):
    """Обработчик сигналов для корректного завершения"""
    logger.info("🛑 Получен сигнал завершения работы")
    sys.exit(0)

def main():
    """Основная функция"""
    try:
        # Обработчик сигналов
        signal.signal(signal.SIGINT, signal_handler)
        signal.signal(signal.SIGTERM, signal_handler)
        
        # Проверка переменных окружения
        required_vars = ['PGHOST', 'PGDATABASE', 'PGUSER', 'PGPASSWORD']
        missing_vars = [var for var in required_vars if not os.getenv(var)]
        
        if missing_vars:
            logger.error(f"❌ Отсутствуют переменные окружения: {', '.join(missing_vars)}")
            sys.exit(1)
        
        # Инициализация базы данных
        init_database()
        
        # Запуск Vite в отдельном потоке
        vite_thread = threading.Thread(target=start_vite_server, daemon=True)
        vite_thread.start()
        
        # Ожидание запуска Vite
        time.sleep(3)
        
        # Запуск Flask сервера
        logger.info(f"🐍 Запускаем HireHand Python API на порту {PORT}")
        logger.info(f"🌐 Приложение доступно: http://localhost:{PORT}")
        logger.info(f"🔗 API эндпоинты: http://localhost:{PORT}/api")
        logger.info("⭐ Полностью переведено на Python! ⭐")
        
        app.run(
            host='0.0.0.0',
            port=PORT,
            debug=False,  # Отключаем debug для стабильности
            threaded=True,
            use_reloader=False  # Отключаем reloader для избежания конфликтов
        )
        
    except Exception as e:
        logger.error(f"❌ Ошибка запуска: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()