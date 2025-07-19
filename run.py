#!/usr/bin/env python3
"""
Wrapper для запуска main.py в production режиме
"""
import subprocess
import sys

if __name__ == "__main__":
    try:
        subprocess.run([sys.executable, "main.py"], check=True)
    except KeyboardInterrupt:
        print("Завершение работы...")
        sys.exit(0)
    except Exception as e:
        print(f"Ошибка запуска: {e}")
        sys.exit(1)