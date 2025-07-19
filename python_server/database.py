import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import List, Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)

class DatabaseManager:
    def __init__(self):
        self.connection_params = {
            'host': os.getenv('PGHOST'),
            'database': os.getenv('PGDATABASE'),
            'user': os.getenv('PGUSER'),
            'password': os.getenv('PGPASSWORD'),
            'port': os.getenv('PGPORT', 5432)
        }

    def get_connection(self):
        """Получение подключения к базе данных"""
        try:
            conn = psycopg2.connect(**self.connection_params)
            return conn
        except Exception as e:
            logger.error(f"Ошибка подключения к базе данных: {e}")
            raise

    def execute_query(self, query: str, params: tuple = None, fetch: bool = False) -> Optional[List[Dict[Any, Any]]]:
        """Выполнение SQL запроса"""
        conn = None
        cursor = None
        try:
            conn = self.get_connection()
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            
            cursor.execute(query, params)
            
            if fetch:
                result = cursor.fetchall()
                return [dict(row) for row in result]
            else:
                conn.commit()
                if cursor.description:
                    result = cursor.fetchone()
                    return dict(result) if result else None
                return None
                
        except Exception as e:
            if conn:
                conn.rollback()
            logger.error(f"Ошибка выполнения запроса: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if conn:
                conn.close()

    def init_tables(self):
        """Создание таблиц в базе данных"""
        try:
            # Таблица пользователей
            users_table = """
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    username TEXT NOT NULL UNIQUE,
                    password TEXT NOT NULL
                )
            """
            
            # Таблица контактных сообщений
            contact_messages_table = """
                CREATE TABLE IF NOT EXISTS contact_messages (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
                )
            """
            
            self.execute_query(users_table)
            self.execute_query(contact_messages_table)
            
            logger.info("Таблицы базы данных созданы успешно")
            
        except Exception as e:
            logger.error(f"Ошибка создания таблиц: {e}")
            raise

    def create_contact_message(self, name: str, email: str, message: str) -> Dict[str, Any]:
        """Создание нового контактного сообщения"""
        query = """
            INSERT INTO contact_messages (name, email, message)
            VALUES (%s, %s, %s)
            RETURNING id, name, email, message, created_at
        """
        return self.execute_query(query, (name, email, message))

    def get_contact_messages(self) -> List[Dict[str, Any]]:
        """Получение всех контактных сообщений"""
        query = """
            SELECT id, name, email, message, created_at
            FROM contact_messages
            ORDER BY created_at DESC
        """
        return self.execute_query(query, fetch=True)

    def create_user(self, username: str, password: str) -> Dict[str, Any]:
        """Создание нового пользователя"""
        query = """
            INSERT INTO users (username, password)
            VALUES (%s, %s)
            RETURNING id, username
        """
        return self.execute_query(query, (username, password))

    def get_user_by_username(self, username: str) -> Optional[Dict[str, Any]]:
        """Получение пользователя по имени"""
        query = """
            SELECT id, username, password
            FROM users
            WHERE username = %s
        """
        result = self.execute_query(query, (username,), fetch=True)
        return result[0] if result else None

# Создаем глобальный экземпляр менеджера базы данных
db_manager = DatabaseManager()