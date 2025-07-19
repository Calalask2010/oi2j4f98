import os
from typing import Optional

class Settings:
    """Настройки приложения"""
    
    # Настройки базы данных
    DATABASE_URL: Optional[str] = os.getenv('DATABASE_URL')
    PGHOST: Optional[str] = os.getenv('PGHOST')
    PGDATABASE: Optional[str] = os.getenv('PGDATABASE')
    PGUSER: Optional[str] = os.getenv('PGUSER')
    PGPASSWORD: Optional[str] = os.getenv('PGPASSWORD')
    PGPORT: str = os.getenv('PGPORT', '5432')
    
    # Настройки сервера
    PORT: int = int(os.getenv('PORT', 5000))
    HOST: str = '0.0.0.0'
    DEBUG: bool = os.getenv('NODE_ENV', 'development') == 'development'
    
    # Настройки CORS
    CORS_ORIGINS: list = ['*']  # В продакшене указать конкретные домены
    
    # Настройки логирования
    LOG_LEVEL: str = 'INFO'
    
    @classmethod
    def validate_db_config(cls) -> bool:
        """Проверка настроек базы данных"""
        required_vars = ['PGHOST', 'PGDATABASE', 'PGUSER', 'PGPASSWORD']
        missing_vars = [var for var in required_vars if not getattr(cls, var)]
        
        if missing_vars:
            raise EnvironmentError(
                f"Отсутствуют переменные окружения для базы данных: {', '.join(missing_vars)}"
            )
        return True

# Создаем экземпляр настроек
settings = Settings()