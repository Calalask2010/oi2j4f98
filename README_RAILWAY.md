# HireHand Platform - Railway Deployment

🚀 **Ваш сайт готов для развертывания на Railway.com!**

## Созданные файлы конфигурации

✅ `railway.json` - основная конфигурация Railway  
✅ `railway.toml` - расширенная конфигурация с переменными окружения  
✅ `nixpacks.toml` - настройки сборки (Node.js + Python)  
✅ `Procfile` - альтернативные команды запуска  
✅ `.env.example` - шаблон переменных окружения  
✅ `requirements.txt` - зависимости Python  
✅ `start.js` - универсальный скрипт запуска  

## Изменения в коде

✅ Добавлен endpoint `/api/health` для мониторинга  
✅ Настроена CORS для Railway доменов  
✅ Обновлена конфигурация базы данных для Railway  
✅ Добавлена поддержка переменных окружения Railway  

## Быстрый старт

### 1. Зайдите на Railway.app
- Зарегистрируйтесь через GitHub
- Подключите ваш репозиторий

### 2. Создайте новый проект
- Нажмите "New Project"
- Выберите "Deploy from GitHub repo"
- Выберите ваш репозиторий

### 3. Добавьте PostgreSQL
- Нажмите "+ New Service"
- Выберите "PostgreSQL"

### 4. Настройте переменные окружения
В Settings → Variables добавьте:

```
NODE_ENV=production
SECRET_KEY=your-secure-secret-key
DEBUG=false
```

Переменные базы данных Railway добавит автоматически.

### 5. Развертывание
Railway автоматически соберет и развернет ваше приложение!

## Поддерживаемые конфигурации

**Node.js Backend (основной):**
- Express.js + TypeScript
- React + Vite фронтенд
- PostgreSQL + Drizzle ORM

**Python Backend (альтернативный):**
- Flask + Python
- Статический фронтенд
- PostgreSQL + psycopg2

## Мониторинг

После развертывания доступны:
- 🌐 Веб-интерфейс: `https://your-app.railway.app`
- 🔗 API: `https://your-app.railway.app/api`
- ❤️ Health Check: `https://your-app.railway.app/api/health`

## Техническая поддержка

Подробная инструкция в файле `RAILWAY_DEPLOYMENT.md`

---
**Готово к развертыванию! 🎉**