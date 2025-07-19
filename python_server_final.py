#!/usr/bin/env python3
"""
Финальный Python сервер для HireHand - полная замена Node.js
Включает и API и статичные файлы
"""

import os
import sys
from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
import logging

# Настройка логирования
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

app = Flask(__name__, static_folder='dist/public', static_url_path='')
CORS(app)

# База данных
def get_db():
    return psycopg2.connect(
        host=os.getenv('PGHOST'),
        database=os.getenv('PGDATABASE'), 
        user=os.getenv('PGUSER'),
        password=os.getenv('PGPASSWORD'),
        port=os.getenv('PGPORT', 5432)
    )

def init_db():
    conn = get_db()
    cur = conn.cursor()
    
    cur.execute("""
        CREATE TABLE IF NOT EXISTS contact_messages (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL, 
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
        )
    """)
    
    cur.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )
    """)
    
    conn.commit()
    cur.close()
    conn.close()
    logger.info("База данных инициализирована")

# API маршруты
@app.route('/api/contact', methods=['POST'])
def api_contact():
    try:
        data = request.json
        if not data or not all(k in data for k in ['name', 'email', 'message']):
            return jsonify({'success': False, 'message': 'Неверные данные формы'}), 400
        
        conn = get_db()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("""
            INSERT INTO contact_messages (name, email, message) 
            VALUES (%s, %s, %s) RETURNING id, created_at
        """, (data['name'], data['email'], data['message']))
        
        result = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        
        logger.info(f"Новое сообщение от {data['name']}")
        return jsonify({
            'success': True,
            'message': 'Contact message submitted successfully', 
            'id': result['id']
        })
        
    except Exception as e:
        logger.error(f"Ошибка отправки сообщения: {e}")
        return jsonify({'success': False, 'message': 'Internal server error'}), 500

@app.route('/api/contact-messages', methods=['GET'])
def api_contact_messages():
    try:
        conn = get_db()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("SELECT * FROM contact_messages ORDER BY created_at DESC")
        messages = [dict(row) for row in cur.fetchall()]
        cur.close()
        conn.close()
        
        return jsonify({'success': True, 'messages': messages})
    except Exception as e:
        logger.error(f"Ошибка получения сообщений: {e}")
        return jsonify({'success': False, 'message': 'Internal server error'}), 500

@app.route('/health')
def health():
    return jsonify({'status': 'healthy', 'service': 'HireHand Python Server'})

# Обслуживание статичных файлов React
@app.route('/')
def serve_index():
    try:
        return send_file('dist/public/index.html')
    except:
        return "<h1>HireHand - Собираем frontend...</h1><p>Python сервер работает! Frontend скоро будет готов.</p>"

@app.route('/<path:path>')
def serve_static(path):
    try:
        return send_from_directory('dist/public', path)
    except:
        return send_file('dist/public/index.html')  # SPA fallback

# Middleware
@app.before_request
def log_request():
    if request.path.startswith('/api'):
        logger.info(f"{request.method} {request.path}")

@app.after_request  
def log_response(response):
    if request.path.startswith('/api'):
        logger.info(f"{request.method} {request.path} - {response.status_code}")
    return response

if __name__ == '__main__':
    init_db()
    port = int(os.getenv('PORT', 5000))
    
    logger.info("=" * 50)
    logger.info("🐍 HIREHAND PYTHON SERVER")
    logger.info(f"🌐 http://localhost:{port}")
    logger.info("🚀 Полностью на Python!")
    logger.info("=" * 50)
    
    app.run(host='0.0.0.0', port=port, debug=True)