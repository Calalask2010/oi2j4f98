"""
Модель пользователя
"""

from typing import Optional, Dict, Any, List
from datetime import datetime
import logging
import hashlib
import secrets

from ..database import db_manager

logger = logging.getLogger(__name__)

class User:
    """Модель пользователя"""
    
    def __init__(self, id: Optional[int] = None, username: str = "", email: str = "",
                 password_hash: str = "", full_name: Optional[str] = None,
                 role: str = "user", language: str = "ru", is_active: bool = True,
                 created_at: Optional[datetime] = None, updated_at: Optional[datetime] = None):
        self.id = id
        self.username = username
        self.email = email
        self.password_hash = password_hash
        self.full_name = full_name
        self.role = role
        self.language = language
        self.is_active = is_active
        self.created_at = created_at
        self.updated_at = updated_at
    
    @staticmethod
    def hash_password(password: str) -> str:
        """Хеширование пароля"""
        salt = secrets.token_hex(16)
        pwdhash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return salt + pwdhash.hex()
    
    @staticmethod
    def verify_password(stored_password: str, provided_password: str) -> bool:
        """Проверка пароля"""
        salt = stored_password[:32]
        stored_pwdhash = stored_password[32:]
        pwdhash = hashlib.pbkdf2_hmac('sha256', provided_password.encode('utf-8'), salt.encode('utf-8'), 100000)
        return pwdhash.hex() == stored_pwdhash
    
    @classmethod
    def create(cls, data: Dict[str, Any]) -> 'User':
        """Создать нового пользователя"""
        try:
            # Хеширование пароля
            password_hash = cls.hash_password(data['password'])
            
            query = """
                INSERT INTO users (username, email, password_hash, full_name, role, language)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING id, username, email, password_hash, full_name, role, language, is_active, created_at, updated_at
            """
            
            params = (
                data.get('username'),
                data.get('email'),
                password_hash,
                data.get('full_name'),
                data.get('role', 'user'),
                data.get('language', 'ru')
            )
            
            result = db_manager.execute_query(query, params, fetch_one=True)
            
            if result:
                logger.info(f"Создан новый пользователь: {result['username']}")
                return cls.from_dict(result)
            
            raise Exception("Не удалось создать пользователя")
            
        except Exception as e:
            logger.error(f"Ошибка создания пользователя: {e}")
            raise
    
    @classmethod
    def get_by_username(cls, username: str) -> Optional['User']:
        """Получить пользователя по username"""
        try:
            query = """
                SELECT id, username, email, password_hash, full_name, role, language, is_active, created_at, updated_at
                FROM users
                WHERE username = %s AND is_active = TRUE
            """
            
            result = db_manager.execute_query(query, (username,), fetch_one=True)
            return cls.from_dict(result) if result else None
            
        except Exception as e:
            logger.error(f"Ошибка получения пользователя {username}: {e}")
            return None
    
    @classmethod
    def get_by_email(cls, email: str) -> Optional['User']:
        """Получить пользователя по email"""
        try:
            query = """
                SELECT id, username, email, password_hash, full_name, role, language, is_active, created_at, updated_at
                FROM users
                WHERE email = %s AND is_active = TRUE
            """
            
            result = db_manager.execute_query(query, (email,), fetch_one=True)
            return cls.from_dict(result) if result else None
            
        except Exception as e:
            logger.error(f"Ошибка получения пользователя по email {email}: {e}")
            return None
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'User':
        """Создать экземпляр из словаря"""
        return cls(
            id=data.get('id'),
            username=data.get('username', ''),
            email=data.get('email', ''),
            password_hash=data.get('password_hash', ''),
            full_name=data.get('full_name'),
            role=data.get('role', 'user'),
            language=data.get('language', 'ru'),
            is_active=data.get('is_active', True),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at')
        )
    
    def to_dict(self, include_password: bool = False) -> Dict[str, Any]:
        """Преобразовать в словарь"""
        result = {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'full_name': self.full_name,
            'role': self.role,
            'language': self.language,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
        
        if include_password:
            result['password_hash'] = self.password_hash
        
        return result
    
    def check_password(self, password: str) -> bool:
        """Проверить пароль пользователя"""
        return self.verify_password(self.password_hash, password)