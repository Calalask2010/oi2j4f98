"""
API роуты для вакансий
"""

import logging
from flask import Blueprint, request, jsonify

from ..models.job import Job, JobApplication

logger = logging.getLogger(__name__)
jobs_bp = Blueprint('jobs', __name__)

@jobs_bp.route('', methods=['GET'])
def get_jobs():
    """Получение списка вакансий"""
    try:
        # Параметры фильтрации
        active_only = request.args.get('active_only', 'true').lower() == 'true'
        featured_only = request.args.get('featured_only', 'false').lower() == 'true'
        industry = request.args.get('industry')
        limit = int(request.args.get('limit', 50))
        offset = int(request.args.get('offset', 0))
        
        # Получение вакансий
        jobs = Job.get_all(
            active_only=active_only,
            featured_only=featured_only,
            industry=industry,
            limit=limit,
            offset=offset
        )
        
        return jsonify({
            'success': True,
            'jobs': [job.to_dict() for job in jobs],
            'count': len(jobs)
        })
        
    except Exception as e:
        logger.error(f"Ошибка получения вакансий: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка получения вакансий'
        }), 500

@jobs_bp.route('/<int:job_id>', methods=['GET'])
def get_job(job_id):
    """Получение конкретной вакансии"""
    try:
        job = Job.get_by_id(job_id)
        
        if not job:
            return jsonify({
                'success': False,
                'message': 'Вакансия не найдена'
            }), 404
        
        return jsonify({
            'success': True,
            'job': job.to_dict()
        })
        
    except Exception as e:
        logger.error(f"Ошибка получения вакансии {job_id}: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка получения вакансии'
        }), 500

@jobs_bp.route('', methods=['POST'])
def create_job():
    """Создание новой вакансии"""
    try:
        data = request.get_json()
        
        # Валидация обязательных полей
        required_fields = ['title', 'description', 'company_name', 'contact_email']
        if not data or not all(field in data and data[field] for field in required_fields):
            return jsonify({
                'success': False,
                'message': 'Заполните все обязательные поля'
            }), 400
        
        # Создание вакансии
        job = Job.create(data)
        
        logger.info(f"Создана новая вакансия: {job.title}")
        
        return jsonify({
            'success': True,
            'message': 'Вакансия успешно создана',
            'job': job.to_dict()
        }), 201
        
    except Exception as e:
        logger.error(f"Ошибка создания вакансии: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка создания вакансии'
        }), 500

@jobs_bp.route('/<int:job_id>/apply', methods=['POST'])
def apply_to_job(job_id):
    """Подача заявки на вакансию"""
    try:
        data = request.get_json()
        
        # Проверка существования вакансии
        job = Job.get_by_id(job_id)
        if not job:
            return jsonify({
                'success': False,
                'message': 'Вакансия не найдена'
            }), 404
        
        if not job.is_active:
            return jsonify({
                'success': False,
                'message': 'Вакансия неактивна'
            }), 400
        
        # Валидация данных заявки
        if not data or not data.get('candidate_id'):
            return jsonify({
                'success': False,
                'message': 'Укажите ID кандидата'
            }), 400
        
        # Создание заявки
        application_data = {
            'job_id': job_id,
            'candidate_id': data['candidate_id'],
            'cover_letter': data.get('cover_letter'),
            'status': 'pending'
        }
        
        application = JobApplication.create(application_data)
        
        logger.info(f"Подана заявка на вакансию {job_id} от кандидата {data['candidate_id']}")
        
        return jsonify({
            'success': True,
            'message': 'Заявка успешно подана',
            'application': application.to_dict()
        }), 201
        
    except Exception as e:
        logger.error(f"Ошибка подачи заявки на вакансию {job_id}: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка подачи заявки'
        }), 500

@jobs_bp.route('/featured', methods=['GET'])
def get_featured_jobs():
    """Получение рекомендуемых вакансий"""
    try:
        limit = int(request.args.get('limit', 10))
        
        jobs = Job.get_all(
            active_only=True,
            featured_only=True,
            limit=limit,
            offset=0
        )
        
        return jsonify({
            'success': True,
            'jobs': [job.to_dict() for job in jobs],
            'count': len(jobs)
        })
        
    except Exception as e:
        logger.error(f"Ошибка получения рекомендуемых вакансий: {e}")
        return jsonify({
            'success': False,
            'message': 'Ошибка получения рекомендуемых вакансий'
        }), 500