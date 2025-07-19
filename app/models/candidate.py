"""
Модель кандидата
"""

from typing import Optional, Dict, Any, List
from datetime import datetime
import logging

from ..database import db_manager

logger = logging.getLogger(__name__)

class Candidate:
    """Модель кандидата"""
    
    def __init__(self, id: Optional[int] = None, full_name: str = "", email: str = "",
                 phone: Optional[str] = None, resume_url: Optional[str] = None,
                 skills: Optional[List[str]] = None, experience_years: Optional[int] = None,
                 current_position: Optional[str] = None, desired_position: Optional[str] = None,
                 desired_salary: Optional[int] = None, location: Optional[str] = None,
                 language: str = "ru", is_available: bool = True,
                 created_at: Optional[datetime] = None, updated_at: Optional[datetime] = None):
        self.id = id
        self.full_name = full_name
        self.email = email
        self.phone = phone
        self.resume_url = resume_url
        self.skills = skills or []
        self.experience_years = experience_years
        self.current_position = current_position
        self.desired_position = desired_position
        self.desired_salary = desired_salary
        self.location = location
        self.language = language
        self.is_available = is_available
        self.created_at = created_at
        self.updated_at = updated_at
    
    @classmethod
    def create(cls, data: Dict[str, Any]) -> 'Candidate':
        """Создать нового кандидата"""
        try:
            query = """
                INSERT INTO candidates (full_name, email, phone, resume_url, skills, 
                                     experience_years, current_position, desired_position, 
                                     desired_salary, location, language)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id, full_name, email, phone, resume_url, skills, 
                         experience_years, current_position, desired_position, 
                         desired_salary, location, language, is_available, 
                         created_at, updated_at
            """
            
            params = (
                data.get('full_name'),
                data.get('email'),
                data.get('phone'),
                data.get('resume_url'),
                data.get('skills', []),
                data.get('experience_years'),
                data.get('current_position'),
                data.get('desired_position'),
                data.get('desired_salary'),
                data.get('location'),
                data.get('language', 'ru')
            )
            
            result = db_manager.execute_query(query, params, fetch_one=True)
            
            if result:
                logger.info(f"Создан новый кандидат: {result['full_name']}")
                return cls.from_dict(result)
            
            raise Exception("Не удалось создать кандидата")
            
        except Exception as e:
            logger.error(f"Ошибка создания кандидата: {e}")
            raise
    
    @classmethod
    def get_all(cls, available_only: bool = True, skills: Optional[List[str]] = None,
                experience_min: Optional[int] = None, limit: int = 50, offset: int = 0) -> List['Candidate']:
        """Получить всех кандидатов с фильтрами"""
        try:
            conditions = []
            params = []
            
            if available_only:
                conditions.append("is_available = TRUE")
            
            if skills:
                conditions.append("skills && %s")
                params.append(skills)
            
            if experience_min is not None:
                conditions.append("experience_years >= %s")
                params.append(experience_min)
            
            where_clause = "WHERE " + " AND ".join(conditions) if conditions else ""
            
            query = f"""
                SELECT id, full_name, email, phone, resume_url, skills, 
                       experience_years, current_position, desired_position, 
                       desired_salary, location, language, is_available, 
                       created_at, updated_at
                FROM candidates
                {where_clause}
                ORDER BY created_at DESC
                LIMIT %s OFFSET %s
            """
            
            params.extend([limit, offset])
            results = db_manager.execute_query(query, tuple(params))
            return [cls.from_dict(row) for row in results]
            
        except Exception as e:
            logger.error(f"Ошибка получения кандидатов: {e}")
            return []
    
    @classmethod
    def get_by_id(cls, candidate_id: int) -> Optional['Candidate']:
        """Получить кандидата по ID"""
        try:
            query = """
                SELECT id, full_name, email, phone, resume_url, skills, 
                       experience_years, current_position, desired_position, 
                       desired_salary, location, language, is_available, 
                       created_at, updated_at
                FROM candidates
                WHERE id = %s
            """
            
            result = db_manager.execute_query(query, (candidate_id,), fetch_one=True)
            return cls.from_dict(result) if result else None
            
        except Exception as e:
            logger.error(f"Ошибка получения кандидата {candidate_id}: {e}")
            return None
    
    @classmethod
    def get_by_email(cls, email: str) -> Optional['Candidate']:
        """Получить кандидата по email"""
        try:
            query = """
                SELECT id, full_name, email, phone, resume_url, skills, 
                       experience_years, current_position, desired_position, 
                       desired_salary, location, language, is_available, 
                       created_at, updated_at
                FROM candidates
                WHERE email = %s
            """
            
            result = db_manager.execute_query(query, (email,), fetch_one=True)
            return cls.from_dict(result) if result else None
            
        except Exception as e:
            logger.error(f"Ошибка получения кандидата по email {email}: {e}")
            return None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Candidate':
        """Создать экземпляр из словаря"""
        return cls(
            id=data.get('id'),
            full_name=data.get('full_name', ''),
            email=data.get('email', ''),
            phone=data.get('phone'),
            resume_url=data.get('resume_url'),
            skills=data.get('skills', []),
            experience_years=data.get('experience_years'),
            current_position=data.get('current_position'),
            desired_position=data.get('desired_position'),
            desired_salary=data.get('desired_salary'),
            location=data.get('location'),
            language=data.get('language', 'ru'),
            is_available=data.get('is_available', True),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """Преобразовать в словарь"""
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'phone': self.phone,
            'resume_url': self.resume_url,
            'skills': self.skills,
            'experience_years': self.experience_years,
            'current_position': self.current_position,
            'desired_position': self.desired_position,
            'desired_salary': self.desired_salary,
            'location': self.location,
            'language': self.language,
            'is_available': self.is_available,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }