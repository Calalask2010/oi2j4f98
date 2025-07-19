"""
API роуты для контактных сообщений
"""

import logging
from flask import Blueprint, request, jsonify

from ..models.contact import ContactMessage

logger = logging.getLogger(__name__)
contact_bp = Blueprint('contact', __name__)

@contact_bp.route('', methods=['POST'])
def submit_contact():
    """Отправка контактного сообщения"""
    try:
        data = request.get_json()
        
        # Валидация обязательных полей
        required_fields = ['name', 'email', 'message']
        if not data or not all(field in data and data[field] for field in required_fields):
            return jsonify({
                'success': False,
                'message': 'Заполните все обязательные поля: имя, email, сообщение'
            }), 400
        
        # Создание сообщения
        message = ContactMessage.create(data)
        
        logger.info(f"Новое контактное сообщение от {data['name']} ({data['email']})")
        
        return jsonify({
            'success': True,
            'message': 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.',
            'id': message.id
        })
        
    except Exception as e:
        logger.error(f"Ошибка отправки сообщения: {e}")
        return jsonify({
            'success': False,
            'message': 'Произошла ошибка при отправке сообщения. Попробуйте еще раз.'
        }), 500

@contact_bp.route('/messages', methods=['GET'])
def get_contact_messages():
    """Получение всех контактных сообщений"""
    try:
        # Параметры пагинации
        limit = int(request.args.get('limit', 50))
        offset = int(request.args.get('offset', 0))
        
        # Получение сообщений
        messages = ContactMessage.get_all(limit=limit, offset=offset)
        
        return jsonify({
            'success': True,
            'messages': [msg.to_dict() for msg in messages],
            'count': len(messages)
        })
        
    except Exception as e:
        logger.error(f"Ошибка получения сообщений: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка получения сообщений'
        }), 500

@contact_bp.route('/messages/<int:message_id>', methods=['GET'])
def get_contact_message(message_id):
    """Получение конкретного сообщения по ID"""
    try:
        message = ContactMessage.get_by_id(message_id)
        
        if not message:
            return jsonify({
                'success': False,
                'message': 'Сообщение не найдено'
            }), 404
        
        return jsonify({
            'success': True,
            'message': message.to_dict()
        })
        
    except Exception as e:
        logger.error(f"Ошибка получения сообщения {message_id}: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка получения сообщения'
        }), 500