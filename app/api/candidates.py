"""
API роуты для кандидатов
"""

import logging
from flask import Blueprint, request, jsonify

from ..models.candidate import Candidate

logger = logging.getLogger(__name__)
candidates_bp = Blueprint('candidates', __name__)

@candidates_bp.route('', methods=['GET'])
def get_candidates():
    """Получение списка кандидатов"""
    try:
        # Параметры фильтрации
        available_only = request.args.get('available_only', 'true').lower() == 'true'
        skills = request.args.getlist('skills')
        experience_min = request.args.get('experience_min')
        limit = int(request.args.get('limit', 50))
        offset = int(request.args.get('offset', 0))
        
        # Преобразование параметров
        experience_min = int(experience_min) if experience_min and experience_min.isdigit() else None
        
        # Получение кандидатов
        candidates = Candidate.get_all(
            available_only=available_only,
            skills=skills if skills else None,
            experience_min=experience_min,
            limit=limit,
            offset=offset
        )
        
        return jsonify({
            'success': True,
            'candidates': [candidate.to_dict() for candidate in candidates],
            'count': len(candidates)
        })
        
    except Exception as e:
        logger.error(f"Ошибка получения кандидатов: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка получения кандидатов'
        }), 500

@candidates_bp.route('/<int:candidate_id>', methods=['GET'])
def get_candidate(candidate_id):
    """Получение конкретного кандидата"""
    try:
        candidate = Candidate.get_by_id(candidate_id)
        
        if not candidate:
            return jsonify({
                'success': False,
                'message': 'Кандидат не найден'
            }), 404
        
        return jsonify({
            'success': True,
            'candidate': candidate.to_dict()
        })
        
    except Exception as e:
        logger.error(f"Ошибка получения кандидата {candidate_id}: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка получения кандидата'
        }), 500

@candidates_bp.route('', methods=['POST'])
def create_candidate():
    """Создание нового кандидата"""
    try:
        data = request.get_json()
        
        # Валидация обязательных полей
        required_fields = ['full_name', 'email']
        if not data or not all(field in data and data[field] for field in required_fields):
            return jsonify({
                'success': False,
                'message': 'Заполните все обязательные поля: имя и email'
            }), 400
        
        # Проверка уникальности email
        existing_candidate = Candidate.get_by_email(data['email'])
        if existing_candidate:
            return jsonify({
                'success': False,
                'message': 'Кандидат с таким email уже существует'
            }), 400
        
        # Создание кандидата
        candidate = Candidate.create(data)
        
        logger.info(f"Создан новый кандидат: {candidate.full_name}")
        
        return jsonify({
            'success': True,
            'message': 'Профиль кандидата успешно создан',
            'candidate': candidate.to_dict()
        }), 201
        
    except Exception as e:
        logger.error(f"Ошибка создания кандидата: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка создания профиля кандидата'
        }), 500

@candidates_bp.route('/search', methods=['POST'])
def search_candidates():
    """Поиск кандидатов по критериям"""
    try:
        data = request.get_json()
        
        # Параметры поиска
        skills = data.get('skills', [])
        experience_min = data.get('experience_min')
        location = data.get('location')
        desired_position = data.get('desired_position')
        salary_max = data.get('salary_max')
        
        # Получение кандидатов с фильтрами
        candidates = Candidate.get_all(
            available_only=True,
            skills=skills if skills else None,
            experience_min=experience_min,
            limit=data.get('limit', 50),
            offset=data.get('offset', 0)
        )
        
        # Дополнительная фильтрация (можно перенести в базовый метод)
        filtered_candidates = []
        for candidate in candidates:
            match = True
            
            if location and candidate.location and location.lower() not in candidate.location.lower():
                match = False
            
            if desired_position and candidate.desired_position and desired_position.lower() not in candidate.desired_position.lower():
                match = False
            
            if salary_max and candidate.desired_salary and candidate.desired_salary > salary_max:
                match = False
            
            if match:
                filtered_candidates.append(candidate)
        
        return jsonify({
            'success': True,
            'candidates': [candidate.to_dict() for candidate in filtered_candidates],
            'count': len(filtered_candidates),
            'search_params': data
        })
        
    except Exception as e:
        logger.error(f"Ошибка поиска кандидатов: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка поиска кандидатов'
        }), 500