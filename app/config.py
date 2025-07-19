"""
Конфигурация приложения HireHand
"""

import os
import logging
from typing import Optional

logger = logging.getLogger(__name__)

class Config:
    """Класс конфигурации приложения"""
    
    def __init__(self):
        # Основные настройки
        self.DEBUG = os.getenv('DEBUG', 'True').lower() == 'true'
        self.PORT = int(os.getenv('PORT', 5000))
        self.SECRET_KEY = os.getenv('SECRET_KEY', 'hirehand-secret-key-2025')
        
        # Настройки базы данных PostgreSQL
        self.DB_HOST = os.getenv('PGHOST')
        self.DB_NAME = os.getenv('PGDATABASE')  
        self.DB_USER = os.getenv('PGUSER')
        self.DB_PASSWORD = os.getenv('PGPASSWORD')
        self.DB_PORT = int(os.getenv('PGPORT') or 5432)
        
        # Настройки CORS
        railway_domain = os.getenv('RAILWAY_PUBLIC_DOMAIN')
        cors_origins = ['http://localhost:3000', 'http://localhost:5000', 'http://0.0.0.0:5000']
        
        if railway_domain:
            cors_origins.extend([
                f'https://{railway_domain}',
                f'http://{railway_domain}'
            ])
        
        # Добавляем стандартные Railway домены
        cors_origins.extend([
            'https://*.railway.app',
            'https://*.up.railway.app'
        ])
        
        self.CORS_ORIGINS = cors_origins
        
        # Языковые настройки
        self.SUPPORTED_LANGUAGES = ['ru', 'en', 'et']
        self.DEFAULT_LANGUAGE = 'ru'
        
        # Настройки безопасности
        self.SESSION_PERMANENT = False
        self.SESSION_TYPE = 'filesystem'
        
    def get_database_url(self) -> str:
        """Получить URL подключения к базе данных"""
        if all([self.DB_HOST, self.DB_NAME, self.DB_USER, self.DB_PASSWORD]):
            return f"postgresql://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        
        # Fallback на DATABASE_URL
        return os.getenv('DATABASE_URL', '')
    
    def validate(self) -> bool:
        """Валидация конфигурации"""
        # Для Railway проверяем только DATABASE_URL, так как отдельные переменные могут не быть установлены
        db_url = self.get_database_url()
        if not db_url:
            logger.error("Не удалось сформировать URL базы данных. Проверьте DATABASE_URL или переменные PGHOST, PGDATABASE, PGUSER, PGPASSWORD")
            return False
            
        logger.info("✅ Конфигурация валидна")
        return True

# Создание экземпляра конфигурации
config = Config()