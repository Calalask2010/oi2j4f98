"""
API роуты для пользователей
"""

import logging
from flask import Blueprint, request, jsonify, session

from ..models.user import User

logger = logging.getLogger(__name__)
users_bp = Blueprint('users', __name__)

@users_bp.route('/register', methods=['POST'])
def register():
    """Регистрация нового пользователя"""
    try:
        data = request.get_json()
        
        # Валидация обязательных полей
        required_fields = ['username', 'email', 'password']
        if not data or not all(field in data and data[field] for field in required_fields):
            return jsonify({
                'success': False,
                'message': 'Заполните все обязательные поля: username, email, password'
            }), 400
        
        # Проверка длины пароля
        if len(data['password']) < 6:
            return jsonify({
                'success': False,
                'message': 'Пароль должен содержать минимум 6 символов'
            }), 400
        
        # Проверка уникальности username и email
        existing_user = User.get_by_username(data['username'])
        if existing_user:
            return jsonify({
                'success': False,
                'message': 'Пользователь с таким username уже существует'
            }), 400
        
        existing_user = User.get_by_email(data['email'])
        if existing_user:
            return jsonify({
                'success': False,
                'message': 'Пользователь с таким email уже существует'
            }), 400
        
        # Создание пользователя
        user = User.create(data)
        
        logger.info(f"Зарегистрирован новый пользователь: {user.username}")
        
        return jsonify({
            'success': True,
            'message': 'Пользователь успешно зарегистрирован',
            'user': user.to_dict()
        }), 201
        
    except Exception as e:
        logger.error(f"Ошибка регистрации пользователя: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка регистрации пользователя'
        }), 500

@users_bp.route('/login', methods=['POST'])
def login():
    """Авторизация пользователя"""
    try:
        data = request.get_json()
        
        # Валидация данных
        if not data or not data.get('username') or not data.get('password'):
            return jsonify({
                'success': False,
                'message': 'Введите username и пароль'
            }), 400
        
        # Поиск пользователя
        user = User.get_by_username(data['username'])
        if not user:
            return jsonify({
                'success': False,
                'message': 'Неверный username или пароль'
            }), 401
        
        # Проверка пароля
        if not user.check_password(data['password']):
            return jsonify({
                'success': False,
                'message': 'Неверный username или пароль'
            }), 401
        
        # Создание сессии
        session['user_id'] = user.id
        session['username'] = user.username
        session['role'] = user.role
        
        logger.info(f"Пользователь {user.username} успешно авторизован")
        
        return jsonify({
            'success': True,
            'message': 'Успешная авторизация',
            'user': user.to_dict()
        })
        
    except Exception as e:
        logger.error(f"Ошибка авторизации: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка авторизации'
        }), 500

@users_bp.route('/logout', methods=['POST'])
def logout():
    """Выход из системы"""
    try:
        username = session.get('username', 'Неизвестный')
        
        # Очистка сессии
        session.clear()
        
        logger.info(f"Пользователь {username} вышел из системы")
        
        return jsonify({
            'success': True,
            'message': 'Вы вышли из системы'
        })
        
    except Exception as e:
        logger.error(f"Ошибка выхода из системы: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка выхода из системы'
        }), 500

@users_bp.route('/profile', methods=['GET'])
def get_profile():
    """Получение профиля текущего пользователя"""
    try:
        user_id = session.get('user_id')
        if not user_id:
            return jsonify({
                'success': False,
                'message': 'Необходима авторизация'
            }), 401
        
        user = User.get_by_username(session.get('username'))
        if not user:
            return jsonify({
                'success': False,
                'message': 'Пользователь не найден'
            }), 404
        
        return jsonify({
            'success': True,
            'user': user.to_dict()
        })
        
    except Exception as e:
        logger.error(f"Ошибка получения профиля: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка получения профиля'
        }), 500

@users_bp.route('/check-auth', methods=['GET'])
def check_auth():
    """Проверка авторизации"""
    user_id = session.get('user_id')
    username = session.get('username')
    role = session.get('role')
    
    return jsonify({
        'authenticated': bool(user_id),
        'user_id': user_id,
        'username': username,
        'role': role
    })