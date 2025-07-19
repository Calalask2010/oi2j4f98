"""
Модели вакансий и заявок
"""

from typing import Optional, Dict, Any, List
from datetime import datetime
import logging

from ..database import db_manager

logger = logging.getLogger(__name__)

class Job:
    """Модель вакансии"""
    
    def __init__(self, id: Optional[int] = None, title: str = "", description: str = "",
                 requirements: Optional[str] = None, salary_min: Optional[int] = None,
                 salary_max: Optional[int] = None, location: Optional[str] = None,
                 employment_type: Optional[str] = None, experience_level: Optional[str] = None,
                 industry: Optional[str] = None, company_name: str = "",
                 contact_email: str = "", contact_phone: Optional[str] = None,
                 is_active: bool = True, featured: bool = False,
                 language: str = "ru", created_at: Optional[datetime] = None,
                 updated_at: Optional[datetime] = None):
        self.id = id
        self.title = title
        self.description = description
        self.requirements = requirements
        self.salary_min = salary_min
        self.salary_max = salary_max
        self.location = location
        self.employment_type = employment_type
        self.experience_level = experience_level
        self.industry = industry
        self.company_name = company_name
        self.contact_email = contact_email
        self.contact_phone = contact_phone
        self.is_active = is_active
        self.featured = featured
        self.language = language
        self.created_at = created_at
        self.updated_at = updated_at
    
    @classmethod
    def create(cls, data: Dict[str, Any]) -> 'Job':
        """Создать новую вакансию"""
        try:
            query = """
                INSERT INTO jobs (title, description, requirements, salary_min, salary_max, 
                                location, employment_type, experience_level, industry, 
                                company_name, contact_email, contact_phone, featured, language)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, title, description, requirements, salary_min, salary_max, 
                         location, employment_type, experience_level, industry, 
                         company_name, contact_email, contact_phone, is_active, 
                         featured, language, created_at, updated_at
            """
            
            params = (
                data.get('title'),
                data.get('description'),
                data.get('requirements'),
                data.get('salary_min'),
                data.get('salary_max'),
                data.get('location'),
                data.get('employment_type'),
                data.get('experience_level'),
                data.get('industry'),
                data.get('company_name'),
                data.get('contact_email'),
                data.get('contact_phone'),
                data.get('featured', False),
                data.get('language', 'ru')
            )
            
            result = db_manager.execute_query(query, params, fetch_one=True)
            
            if result:
                logger.info(f"Создана новая вакансия: {result['title']}")
                return cls.from_dict(result)
            
            raise Exception("Не удалось создать вакансию")
            
        except Exception as e:
            logger.error(f"Ошибка создания вакансии: {e}")
            raise
    
    @classmethod
    def get_all(cls, active_only: bool = True, featured_only: bool = False, 
                industry: Optional[str] = None, limit: int = 50, offset: int = 0) -> List['Job']:
        """Получить все вакансии с фильтрами"""
        try:
            conditions = []
            params = []
            
            if active_only:
                conditions.append("is_active = TRUE")
            
            if featured_only:
                conditions.append("featured = TRUE")
            
            if industry:
                conditions.append("industry = %s")
                params.append(industry)
            
            where_clause = "WHERE " + " AND ".join(conditions) if conditions else ""
            
            query = f"""
                SELECT id, title, description, requirements, salary_min, salary_max, 
                       location, employment_type, experience_level, industry, 
                       company_name, contact_email, contact_phone, is_active, 
                       featured, language, created_at, updated_at
                FROM jobs
                {where_clause}
                ORDER BY featured DESC, created_at DESC
                LIMIT %s OFFSET %s
            """
            
            params.extend([limit, offset])
            results = db_manager.execute_query(query, tuple(params))
            return [cls.from_dict(row) for row in results]
            
        except Exception as e:
            logger.error(f"Ошибка получения вакансий: {e}")
            return []
    
    @classmethod
    def get_by_id(cls, job_id: int) -> Optional['Job']:
        """Получить вакансию по ID"""
        try:
            query = """
                SELECT id, title, description, requirements, salary_min, salary_max, 
                       location, employment_type, experience_level, industry, 
                       company_name, contact_email, contact_phone, is_active, 
                       featured, language, created_at, updated_at
                FROM jobs
                WHERE id = %s
            """
            
            result = db_manager.execute_query(query, (job_id,), fetch_one=True)
            return cls.from_dict(result) if result else None
            
        except Exception as e:
            logger.error(f"Ошибка получения вакансии {job_id}: {e}")
            return None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Job':
        """Создать экземпляр из словаря"""
        return cls(
            id=data.get('id'),
            title=data.get('title', ''),
            description=data.get('description', ''),
            requirements=data.get('requirements'),
            salary_min=data.get('salary_min'),
            salary_max=data.get('salary_max'),
            location=data.get('location'),
            employment_type=data.get('employment_type'),
            experience_level=data.get('experience_level'),
            industry=data.get('industry'),
            company_name=data.get('company_name', ''),
            contact_email=data.get('contact_email', ''),
            contact_phone=data.get('contact_phone'),
            is_active=data.get('is_active', True),
            featured=data.get('featured', False),
            language=data.get('language', 'ru'),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """Преобразовать в словарь"""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'requirements': self.requirements,
            'salary_min': self.salary_min,
            'salary_max': self.salary_max,
            'location': self.location,
            'employment_type': self.employment_type,
            'experience_level': self.experience_level,
            'industry': self.industry,
            'company_name': self.company_name,
            'contact_email': self.contact_email,
            'contact_phone': self.contact_phone,
            'is_active': self.is_active,
            'featured': self.featured,
            'language': self.language,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class JobApplication:
    """Модель заявки на вакансию"""
    
    def __init__(self, id: Optional[int] = None, job_id: int = 0, candidate_id: int = 0,
                 status: str = "pending", cover_letter: Optional[str] = None,
                 application_date: Optional[datetime] = None, updated_at: Optional[datetime] = None):
        self.id = id
        self.job_id = job_id
        self.candidate_id = candidate_id
        self.status = status
        self.cover_letter = cover_letter
        self.application_date = application_date
        self.updated_at = updated_at
    
    @classmethod
    def create(cls, data: Dict[str, Any]) -> 'JobApplication':
        """Создать новую заявку"""
        try:
            query = """
                INSERT INTO job_applications (job_id, candidate_id, status, cover_letter)
                VALUES (%s, %s, %s, %s)
                RETURNING id, job_id, candidate_id, status, cover_letter, application_date, updated_at
            """
            
            params = (
                data.get('job_id'),
                data.get('candidate_id'),
                data.get('status', 'pending'),
                data.get('cover_letter')
            )
            
            result = db_manager.execute_query(query, params, fetch_one=True)
            
            if result:
                logger.info(f"Создана заявка на вакансию {result['job_id']} от кандидата {result['candidate_id']}")
                return cls.from_dict(result)
            
            raise Exception("Не удалось создать заявку")
            
        except Exception as e:
            logger.error(f"Ошибка создания заявки: {e}")
            raise
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'JobApplication':
        """Создать экземпляр из словаря"""
        return cls(
            id=data.get('id'),
            job_id=data.get('job_id', 0),
            candidate_id=data.get('candidate_id', 0),
            status=data.get('status', 'pending'),
            cover_letter=data.get('cover_letter'),
            application_date=data.get('application_date'),
            updated_at=data.get('updated_at')
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """Преобразовать в словарь"""
        return {
            'id': self.id,
            'job_id': self.job_id,
            'candidate_id': self.candidate_id,
            'status': self.status,
            'cover_letter': self.cover_letter,
            'application_date': self.application_date.isoformat() if self.application_date else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }