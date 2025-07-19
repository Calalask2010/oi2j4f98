"""
Управление базой данных для HireHand Platform
"""

import os
import logging
import psycopg2
from psycopg2.extras import RealDictCursor
from contextlib import contextmanager
from typing import Optional, Dict, Any, List

from .config import config

logger = logging.getLogger(__name__)

class DatabaseManager:
    """Менеджер базы данных"""
    
    def __init__(self):
        self.connection_params = {
            'host': config.DB_HOST,
            'database': config.DB_NAME,
            'user': config.DB_USER,
            'password': config.DB_PASSWORD,
            'port': config.DB_PORT
        }
    
    @contextmanager
    def get_connection(self):
        """Контекстный менеджер для подключения к БД"""
        conn = None
        try:
            conn = psycopg2.connect(**self.connection_params)
            yield conn
        except Exception as e:
            if conn:
                conn.rollback()
            logger.error(f"Ошибка подключения к БД: {e}")
            raise
        finally:
            if conn:
                conn.close()
    
    def execute_query(self, query: str, params: Optional[tuple] = None, fetch_one: bool = False, fetch_all: bool = True):
        """Выполнить SQL запрос"""
        with self.get_connection() as conn:
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            try:
                cursor.execute(query, params or ())
                
                if query.strip().upper().startswith(('SELECT',)):
                    if fetch_one:
                        return cursor.fetchone()
                    elif fetch_all:
                        return cursor.fetchall()
                else:
                    conn.commit()
                    if cursor.description is None:
                        return None
                    return cursor.fetchone() if fetch_one else cursor.fetchall()
                    
            except Exception as e:
                conn.rollback()
                logger.error(f"Ошибка выполнения запроса: {e}")
                raise
            finally:
                cursor.close()

# Глобальный экземпляр менеджера БД
db_manager = DatabaseManager()

def init_database():
    """Инициализация структуры базы данных"""
    try:
        logger.info("🔧 Создание таблиц базы данных...")
        
        # Таблица контактных сообщений
        db_manager.execute_query("""
            CREATE TABLE IF NOT EXISTS contact_messages (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                phone TEXT,
                company TEXT,
                service_type TEXT,
                language TEXT DEFAULT 'ru',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            )
        """)
        
        # Таблица пользователей
        db_manager.execute_query("""
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username TEXT NOT NULL UNIQUE,
                email TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                full_name TEXT,
                role TEXT DEFAULT 'user',
                language TEXT DEFAULT 'ru',
                is_active BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            )
        """)
        
        # Таблица вакансий
        db_manager.execute_query("""
            CREATE TABLE IF NOT EXISTS jobs (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                requirements TEXT,
                salary_min INTEGER,
                salary_max INTEGER,
                location TEXT,
                employment_type TEXT,
                experience_level TEXT,
                industry TEXT,
                company_name TEXT NOT NULL,
                contact_email TEXT NOT NULL,
                contact_phone TEXT,
                is_active BOOLEAN DEFAULT TRUE,
                featured BOOLEAN DEFAULT FALSE,
                language TEXT DEFAULT 'ru',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            )
        """)
        
        # Таблица кандидатов
        db_manager.execute_query("""
            CREATE TABLE IF NOT EXISTS candidates (
                id SERIAL PRIMARY KEY,
                full_name TEXT NOT NULL,
                email TEXT NOT NULL,
                phone TEXT,
                resume_url TEXT,
                skills TEXT[],
                experience_years INTEGER,
                current_position TEXT,
                desired_position TEXT,
                desired_salary INTEGER,
                location TEXT,
                language TEXT DEFAULT 'ru',
                is_available BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
            )
        """)
        
        # Таблица приложений к вакансиям
        db_manager.execute_query("""
            CREATE TABLE IF NOT EXISTS job_applications (
                id SERIAL PRIMARY KEY,
                job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
                candidate_id INTEGER REFERENCES candidates(id) ON DELETE CASCADE,
                status TEXT DEFAULT 'pending',
                cover_letter TEXT,
                application_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
                UNIQUE(job_id, candidate_id)
            )
        """)
        
        # Создание индексов для оптимизации
        db_manager.execute_query("CREATE INDEX IF NOT EXISTS idx_jobs_active ON jobs(is_active)")
        db_manager.execute_query("CREATE INDEX IF NOT EXISTS idx_jobs_industry ON jobs(industry)")
        db_manager.execute_query("CREATE INDEX IF NOT EXISTS idx_candidates_available ON candidates(is_available)")
        db_manager.execute_query("CREATE INDEX IF NOT EXISTS idx_contact_messages_created ON contact_messages(created_at DESC)")
        
        logger.info("✅ База данных инициализирована успешно")
        
    except Exception as e:
        logger.error(f"❌ Ошибка инициализации БД: {e}")
        raise

def get_db_stats() -> Dict[str, Any]:
    """Получить статистику базы данных"""
    try:
        stats = {}
        
        # Количество записей в каждой таблице
        tables = ['contact_messages', 'users', 'jobs', 'candidates', 'job_applications']
        
        for table in tables:
            result = db_manager.execute_query(f"SELECT COUNT(*) as count FROM {table}", fetch_one=True)
            stats[f"{table}_count"] = result['count'] if result else 0
        
        # Активные вакансии
        result = db_manager.execute_query("SELECT COUNT(*) as count FROM jobs WHERE is_active = TRUE", fetch_one=True)
        stats['active_jobs_count'] = result['count'] if result else 0
        
        # Доступные кандидаты
        result = db_manager.execute_query("SELECT COUNT(*) as count FROM candidates WHERE is_available = TRUE", fetch_one=True)
        stats['available_candidates_count'] = result['count'] if result else 0
        
        return stats
        
    except Exception as e:
        logger.error(f"Ошибка получения статистики БД: {e}")
        return {}