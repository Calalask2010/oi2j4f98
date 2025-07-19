"""
Модель контактных сообщений
"""

from typing import Optional, Dict, Any, List
from datetime import datetime
import logging

from ..database import db_manager

logger = logging.getLogger(__name__)

class ContactMessage:
    """Модель контактного сообщения"""
    
    def __init__(self, id: Optional[int] = None, name: str = "", email: str = "", 
                 message: str = "", phone: Optional[str] = None, 
                 company: Optional[str] = None, service_type: Optional[str] = None,
                 language: str = "ru", created_at: Optional[datetime] = None,
                 updated_at: Optional[datetime] = None):
        self.id = id
        self.name = name
        self.email = email
        self.message = message
        self.phone = phone
        self.company = company
        self.service_type = service_type
        self.language = language
        self.created_at = created_at
        self.updated_at = updated_at
    
    @classmethod
    def create(cls, data: Dict[str, Any]) -> 'ContactMessage':
        """Создать новое контактное сообщение"""
        try:
            query = """
                INSERT INTO contact_messages (name, email, message, phone, company, service_type, language)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id, name, email, message, phone, company, service_type, language, created_at, updated_at
            """
            
            params = (
                data.get('name'),
                data.get('email'),
                data.get('message'),
                data.get('phone'),
                data.get('company'),
                data.get('service_type'),
                data.get('language', 'ru')
            )
            
            result = db_manager.execute_query(query, params, fetch_one=True)
            
            if result:
                logger.info(f"Создано новое сообщение от {result['name']} ({result['email']})")
                return cls.from_dict(result)
            
            raise Exception("Не удалось создать сообщение")
            
        except Exception as e:
            logger.error(f"Ошибка создания контактного сообщения: {e}")
            raise
    
    @classmethod
    def get_all(cls, limit: int = 100, offset: int = 0) -> List['ContactMessage']:
        """Получить все контактные сообщения"""
        try:
            query = """
                SELECT id, name, email, message, phone, company, service_type, language, created_at, updated_at
                FROM contact_messages
                ORDER BY created_at DESC
                LIMIT %s OFFSET %s
            """
            
            results = db_manager.execute_query(query, (limit, offset))
            return [cls.from_dict(row) for row in results]
            
        except Exception as e:
            logger.error(f"Ошибка получения контактных сообщений: {e}")
            return []
    
    @classmethod
    def get_by_id(cls, message_id: int) -> Optional['ContactMessage']:
        """Получить сообщение по ID"""
        try:
            query = """
                SELECT id, name, email, message, phone, company, service_type, language, created_at, updated_at
                FROM contact_messages
                WHERE id = %s
            """
            
            result = db_manager.execute_query(query, (message_id,), fetch_one=True)
            return cls.from_dict(result) if result else None
            
        except Exception as e:
            logger.error(f"Ошибка получения сообщения {message_id}: {e}")
            return None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'ContactMessage':
        """Создать экземпляр из словаря"""
        return cls(
            id=data.get('id'),
            name=data.get('name', ''),
            email=data.get('email', ''),
            message=data.get('message', ''),
            phone=data.get('phone'),
            company=data.get('company'),
            service_type=data.get('service_type'),
            language=data.get('language', 'ru'),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )
    
    def to_dict(self) -> Dict[str, Any]:
        """Преобразовать в словарь"""
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email,
            'message': self.message,
            'phone': self.phone,
            'company': self.company,
            'service_type': self.service_type,
            'language': self.language,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }