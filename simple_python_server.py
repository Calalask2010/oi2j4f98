#!/usr/bin/env python3
"""
Простой Python API сервер для HireHand
"""

import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor

app = Flask(__name__)
CORS(app)

def get_db():
    return psycopg2.connect(
        host=os.getenv('PGHOST'),
        database=os.getenv('PGDATABASE'),
        user=os.getenv('PGUSER'),
        password=os.getenv('PGPASSWORD'),
        port=os.getenv('PGPORT', 5432)
    )

@app.route('/health')
def health():
    return {'status': 'healthy', 'service': 'HireHand Python API'}

@app.route('/api/contact', methods=['POST'])
def contact():
    try:
        data = request.json
        if not data or not all(k in data for k in ['name', 'email', 'message']):
            return {'success': False, 'message': 'Неверные данные'}, 400
        
        conn = get_db()
        cur = conn.cursor(cursor_factory=RealDictCursor)
        cur.execute("""
            INSERT INTO contact_messages (name, email, message)
            VALUES (%s, %s, %s) RETURNING id
        """, (data['name'], data['email'], data['message']))
        
        result = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()
        
        return {'success': True, 'message': 'Сообщение отправлено', 'id': result['id']}
    except Exception as e:
        return {'success': False, 'message': f'Ошибка: {str(e)}'}, 500

@app.route('/api/python/info')
def python_info():
    return {
        'message': 'Привет из Python!',
        'language': 'Python 3.11',
        'framework': 'Flask',
        'status': 'Работает!'
    }

if __name__ == '__main__':
    print("🐍 Запускаем простой Python сервер на порту 5001")
    app.run(host='0.0.0.0', port=5001, debug=True)