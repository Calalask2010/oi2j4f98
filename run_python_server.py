#!/usr/bin/env python3
"""
Python Server Runner for HireHand Platform
Запуск Flask сервера в режиме разработки
"""

import subprocess
import sys
import os

def main():
    """Запуск Python Flask сервера"""
    print("🐍 Запуск HireHand Python Platform...")
    
    # Убеждаемся, что мы в правильной директории
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    try:
        # Запускаем main.py
        subprocess.run([sys.executable, "main.py"], check=True)
    except KeyboardInterrupt:
        print("\n⏹️  Сервер остановлен пользователем")
    except subprocess.CalledProcessError as e:
        print(f"❌ Ошибка запуска сервера: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()