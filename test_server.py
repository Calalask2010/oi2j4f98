#!/usr/bin/env python3
"""
Простой тестовый сервер для проверки работы Python
"""

from flask import Flask, jsonify, render_template_string
import logging
import os

# Настройка логирования
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Создание Flask приложения
app = Flask(__name__)

# HTML шаблон для главной страницы
HTML_TEMPLATE = """
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HireHand - Python Platform</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .header { background: white; padding: 2rem; border-radius: 12px; margin-bottom: 2rem; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header h1 { color: #3498db; font-size: 2.5rem; margin-bottom: 0.5rem; }
        .header p { color: #7f8c8d; font-size: 1.2rem; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .feature { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .feature h3 { color: #2c3e50; margin-bottom: 1rem; }
        .feature ul { list-style: none; }
        .feature li { padding: 0.5rem 0; color: #555; }
        .feature li:before { content: "✓"; color: #27ae60; margin-right: 10px; font-weight: bold; }
        .status { background: #e8f5e8; border: 2px solid #27ae60; border-radius: 8px; padding: 1rem; margin-bottom: 2rem; }
        .status h2 { color: #27ae60; }
        .api-links { display: flex; gap: 1rem; margin-top: 1rem; }
        .api-link { padding: 0.75rem 1.5rem; background: #3498db; color: white; text-decoration: none; border-radius: 6px; transition: background 0.3s; }
        .api-link:hover { background: #2980b9; }
    </style>
</head>
<body>
    <div class="container">
        <div class="status">
            <h2>🎉 HireHand Platform успешно запущена на Python!</h2>
            <p>Платформа рекрутинга и управления трудовыми ресурсами работает на Python Flask</p>
            <div class="api-links">
                <a href="/health" class="api-link">Health Check</a>
                <a href="/api/test" class="api-link">Test API</a>
            </div>
        </div>
        
        <div class="header">
            <h1>HireHand Platform</h1>
            <p>Комплексная платформа рекрутинга на основе Python</p>
        </div>
        
        <div class="features">
            <div class="feature">
                <h3>🐍 Python Backend</h3>
                <ul>
                    <li>Flask веб-сервер</li>
                    <li>REST API эндпоинты</li>
                    <li>PostgreSQL интеграция</li>
                    <li>Модульная архитектура</li>
                </ul>
            </div>
            
            <div class="feature">
                <h3>💼 Функциональность</h3>
                <ul>
                    <li>Управление вакансиями</li>
                    <li>База кандидатов</li>
                    <li>Система пользователей</li>
                    <li>Контактные формы</li>
                </ul>
            </div>
            
            <div class="feature">
                <h3>🌐 Веб-интерфейс</h3>
                <ul>
                    <li>Адаптивный дизайн</li>
                    <li>Многоязычная поддержка</li>
                    <li>JavaScript функциональность</li>
                    <li>Современный UI/UX</li>
                </ul>
            </div>
            
            <div class="feature">
                <h3>⚡ Технологии</h3>
                <ul>
                    <li>Python 3.11</li>
                    <li>Flask Framework</li>
                    <li>HTML5 & CSS3</li>
                    <li>JavaScript ES6+</li>
                </ul>
            </div>
        </div>
    </div>
    
    <script>
        // Простая проверка API
        fetch('/health')
            .then(response => response.json())
            .then(data => {
                console.log('Health Check:', data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    </script>
</body>
</html>
"""

@app.route('/')
def index():
    """Главная страница"""
    return render_template_string(HTML_TEMPLATE)

@app.route('/health')
def health():
    """Health check"""
    return jsonify({
        'status': 'healthy',
        'service': 'HireHand Python Platform',
        'version': '1.0.0',
        'python_version': f"Python {'.'.join(map(str, __import__('sys').version_info[:3]))}",
        'framework': 'Flask',
        'port': 5001,
        'database_configured': bool(os.getenv('DATABASE_URL')),
        'message': 'Платформа работает успешно!'
    })

@app.route('/api/test')
def api_test():
    """Тестовый API эндпоинт"""
    return jsonify({
        'success': True,
        'message': 'API работает!',
        'data': {
            'platform': 'HireHand',
            'language': 'Python',
            'framework': 'Flask',
            'features': [
                'Управление вакансиями',
                'База кандидатов', 
                'Система пользователей',
                'REST API'
            ]
        }
    })

@app.route('/api/status')
def status():
    """Статус системы"""
    return jsonify({
        'system': 'HireHand Platform',
        'status': 'running',
        'python_backend': True,
        'database_available': bool(os.getenv('DATABASE_URL')),
        'endpoints': [
            '/',
            '/health',
            '/api/test',
            '/api/status'
        ]
    })

if __name__ == '__main__':
    port = 5001
    logger.info("=" * 60)
    logger.info("🚀 HIREHAND PYTHON PLATFORM")
    logger.info(f"🌐 Адрес: http://localhost:{port}")
    logger.info(f"🔗 API: http://localhost:{port}/api")
    logger.info(f"❤️  Health: http://localhost:{port}/health")
    logger.info("🐍 Работает на Python + Flask")
    logger.info("=" * 60)
    
    app.run(host='0.0.0.0', port=port, debug=True)