#!/usr/bin/env python3
"""
Главный файл запуска Python сервера для HireHand
Этот файл заменяет Node.js/Express сервер
"""

import os
import sys
import logging
from python_server.app import app
from python_server.config import settings
from python_server.database import db_manager

# Настройка логирования
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def main():
    """Основная функция запуска приложения"""
    try:
        # Проверяем настройки базы данных
        settings.validate_db_config()
        logger.info("Настройки базы данных валидны")
        
        # Инициализируем базу данных
        db_manager.init_tables()
        logger.info("База данных инициализирована")
        
        # Запускаем Flask приложение
        logger.info(f"Запускаем HireHand Python API на {settings.HOST}:{settings.PORT}")
        logger.info("Для остановки используйте Ctrl+C")
        
        app.run(
            host=settings.HOST,
            port=settings.PORT,
            debug=settings.DEBUG
        )
        
    except EnvironmentError as e:
        logger.error(f"Ошибка конфигурации: {e}")
        sys.exit(1)
    except Exception as e:
        logger.error(f"Ошибка запуска приложения: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()