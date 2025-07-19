#!/usr/bin/env python3
"""
HireHand - Главный файл приложения
Платформа рекрутинга и управления трудовыми ресурсами на Python
"""

import os
import sys
import logging
from pathlib import Path

# Добавляем текущую директорию в PYTHONPATH
current_dir = Path(__file__).parent.absolute()
sys.path.insert(0, str(current_dir))

from app.server import create_app
from app.database import init_database
from app.config import Config

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def main():
    """Главная функция запуска приложения"""
    try:
        logger.info("🚀 Запуск HireHand Platform...")
        
        # Проверка конфигурации
        config = Config()
        if not config.validate():
            logger.error("❌ Ошибка конфигурации")
            sys.exit(1)
        
        # Инициализация базы данных
        logger.info("📊 Инициализация базы данных...")
        init_database()
        
        # Создание и запуск приложения
        app = create_app()
        
        logger.info("=" * 60)
        logger.info("🎉 HIREHAND PLATFORM ЗАПУЩЕНА!")
        logger.info(f"🌐 Веб-интерфейс: http://localhost:{config.PORT}")
        logger.info(f"🔗 API: http://localhost:{config.PORT}/api")
        logger.info(f"❤️  Health Check: http://localhost:{config.PORT}/health")
        logger.info("💼 Платформа рекрутинга готова к работе")
        logger.info("=" * 60)
        
        app.run(
            host='0.0.0.0',
            port=config.PORT,
            debug=config.DEBUG,
            threaded=True
        )
        
    except KeyboardInterrupt:
        logger.info("👋 Завершение работы по запросу пользователя")
        sys.exit(0)
    except Exception as e:
        logger.error(f"❌ Критическая ошибка: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()