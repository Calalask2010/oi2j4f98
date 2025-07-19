# Зависимости проекта HireHand

## Node.js зависимости

### Установка всех зависимостей Node.js
```bash
npm install
```

### Основные зависимости (dependencies)
```bash
# React и UI компоненты
npm install react@^18.3.1
npm install react-dom@^18.3.1
npm install @radix-ui/react-accordion@^1.2.4
npm install @radix-ui/react-alert-dialog@^1.1.7
npm install @radix-ui/react-aspect-ratio@^1.1.3
npm install @radix-ui/react-avatar@^1.1.4
npm install @radix-ui/react-checkbox@^1.1.5
npm install @radix-ui/react-collapsible@^1.1.4
npm install @radix-ui/react-context-menu@^2.2.7
npm install @radix-ui/react-dialog@^1.1.7
npm install @radix-ui/react-dropdown-menu@^2.1.7
npm install @radix-ui/react-hover-card@^1.1.7
npm install @radix-ui/react-label@^2.1.3
npm install @radix-ui/react-menubar@^1.1.7
npm install @radix-ui/react-navigation-menu@^1.2.6
npm install @radix-ui/react-popover@^1.1.7
npm install @radix-ui/react-progress@^1.1.3
npm install @radix-ui/react-radio-group@^1.2.4
npm install @radix-ui/react-scroll-area@^1.2.4
npm install @radix-ui/react-select@^2.1.7
npm install @radix-ui/react-separator@^1.1.3
npm install @radix-ui/react-slider@^1.2.4
npm install @radix-ui/react-slot@^1.2.0
npm install @radix-ui/react-switch@^1.1.4
npm install @radix-ui/react-tabs@^1.1.4
npm install @radix-ui/react-toast@^1.2.7
npm install @radix-ui/react-toggle@^1.1.3
npm install @radix-ui/react-toggle-group@^1.1.3
npm install @radix-ui/react-tooltip@^1.2.0

# Формы и валидация
npm install react-hook-form@^7.55.0
npm install @hookform/resolvers@^3.10.0
npm install zod@^3.24.2
npm install zod-validation-error@^3.4.0

# Роутинг и навигация
npm install wouter@^3.3.5

# Состояние и API
npm install @tanstack/react-query@^5.60.5

# База данных и ORM
npm install @neondatabase/serverless@^0.10.4
npm install drizzle-orm@^0.39.1
npm install drizzle-zod@^0.7.0
npm install ws@^8.18.0

# Сервер Express
npm install express@^4.21.2
npm install express-session@^1.18.1

# Аутентификация
npm install passport@^0.7.0
npm install passport-local@^1.0.0

# Сессии и хранилище
npm install connect-pg-simple@^10.0.0
npm install memorystore@^1.6.7

# Стилизация и UI утилиты
npm install tailwind-merge@^2.6.0
npm install tailwindcss-animate@^1.0.7
npm install tw-animate-css@^1.2.5
npm install class-variance-authority@^0.7.1
npm install clsx@^2.1.1

# Компоненты и анимации
npm install framer-motion@^11.13.1
npm install vaul@^1.1.2
npm install cmdk@^1.1.1
npm install embla-carousel-react@^8.6.0
npm install react-resizable-panels@^2.1.7
npm install react-day-picker@^8.10.1
npm install input-otp@^1.4.2

# Иконки и графика
npm install lucide-react@^0.453.0
npm install react-icons@^5.4.0
npm install recharts@^2.15.2

# Утилиты для дат
npm install date-fns@^3.6.0

# Темы
npm install next-themes@^0.4.6

# Трассировка
npm install @jridgewell/trace-mapping@^0.3.25
```

### Зависимости разработки (devDependencies)
```bash
# TypeScript и типы
npm install --save-dev typescript@5.6.3
npm install --save-dev @types/react@^18.3.11
npm install --save-dev @types/react-dom@^18.3.1
npm install --save-dev @types/node@20.16.11
npm install --save-dev @types/express@4.17.21
npm install --save-dev @types/express-session@^1.18.0
npm install --save-dev @types/passport@^1.0.16
npm install --save-dev @types/passport-local@^1.0.38
npm install --save-dev @types/connect-pg-simple@^7.0.3
npm install --save-dev @types/ws@^8.5.13

# Сборка и разработка
npm install --save-dev vite@^5.4.19
npm install --save-dev @vitejs/plugin-react@^4.3.2
npm install --save-dev tsx@^4.19.1
npm install --save-dev esbuild@^0.25.0

# Tailwind CSS
npm install --save-dev tailwindcss@^3.4.17
npm install --save-dev @tailwindcss/typography@^0.5.15
npm install --save-dev @tailwindcss/vite@^4.1.3
npm install --save-dev autoprefixer@^10.4.20
npm install --save-dev postcss@^8.4.47

# База данных
npm install --save-dev drizzle-kit@^0.30.4

# Replit плагины
npm install --save-dev @replit/vite-plugin-cartographer@^0.2.7
npm install --save-dev @replit/vite-plugin-runtime-error-modal@^0.0.3
```

### Опциональные зависимости
```bash
npm install --save-optional bufferutil@^4.0.8
```

## Python зависимости

### Установка Python зависимостей
```bash
pip install -r requirements.txt
```

### requirements.txt содержимое
```
flask>=2.3.0
flask-cors>=4.0.0
psycopg2-binary>=2.9.0
pydantic>=2.0.0
python-dotenv>=1.0.0
requests>=2.31.0
```

### Установка через pyproject.toml
```bash
pip install .
```

## Системные зависимости

### Для Ubuntu/Debian
```bash
sudo apt update
sudo apt install -y nodejs npm python3 python3-pip postgresql-client
```

### Для macOS (через Homebrew)
```bash
brew install node npm python3 postgresql
```

### Для Windows
- Установить Node.js с официального сайта
- Установить Python 3.11+ с официального сайта
- Установить PostgreSQL

## База данных

### PostgreSQL зависимости
- PostgreSQL 14+ (рекомендуется 15+)
- Расширения: uuid-ossp, pg_stat_statements

### Переменные окружения
```bash
DATABASE_URL=postgresql://username:password@localhost:5432/hirehand
PGHOST=localhost
PGPORT=5432
PGDATABASE=hirehand
PGUSER=username
PGPASSWORD=password
```

## Команды установки (быстрый старт)

### Полная установка
```bash
# 1. Установить Node.js зависимости
npm install

# 2. Установить Python зависимости
pip install -r requirements.txt

# 3. Настроить базу данных
npm run db:push

# 4. Запустить приложение
npm run dev
```

### Очистка и переустановка
```bash
# Очистить кэш npm
npm cache clean --force

# Удалить node_modules и переустановить
rm -rf node_modules package-lock.json
npm install

# Переустановить Python зависимости
pip uninstall -y -r requirements.txt
pip install -r requirements.txt
```

## Версии Node.js и Python

- **Node.js**: 18.x или 20.x (рекомендуется 20.x)
- **Python**: 3.11+ (рекомендуется 3.11)
- **npm**: 9.x или 10.x

## Проверка установки

```bash
# Проверить Node.js и npm
node --version
npm --version

# Проверить Python
python3 --version
pip --version

# Проверить зависимости проекта
npm list
pip list
```