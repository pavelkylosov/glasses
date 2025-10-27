# MentraOS Glasses App

Приложение для умных очков MentraOS с модульной архитектурой и интеграцией различных сервисов.

## 📋 Оглавление

- [Описание](#описание)
- [Возможности](#возможности)
- [Требования](#требования)
- [Настройка с нуля](#настройка-с-нуля)
- [Запуск приложения](#запуск-приложения)
- [Настройка ngrok](#настройка-ngrok)
- [Подключение к MentraOS](#подключение-к-mentraos)
- [Документация](#документация)

## Описание

Приложение представляет собой серверное приложение для MentraOS с модульной архитектурой. Поддерживает работу с погодой, новостями, днями рождения, праздниками, социальной лентой и голосовыми командами.

## Возможности

- 🌤️ **Модуль погоды** - получение погоды по геолокации
- 📰 **Новости** - просмотр новостной ленты
- 🎂 **Дни рождения** - отслеживание дней рождения
- 🎉 **Праздники** - информация о праздниках
- 📺 **Телепередачи** - информация о передачах
- 📱 **Социальная лента** - события из ленты
- 🎤 **Голосовые команды** - обработка голосовых команд
- 📊 **Дашборд** - главный экран при поднятии головы
- 🔔 **Уведомления** - обработка уведомлений с телефона

## Требования

- **Node.js** 18.0.0 или выше
- **Yarn** 1.22.0 или выше
- **ngrok** - для создания туннелей
- **API ключ MentraOS** - полученный на [mentra.glass](https://mentra.glass)
- **Умные очки MentraOS** - для тестирования

## Настройка с нуля

### 1. Установка Node.js

Установите Node.js версии 18 или выше:

**macOS/Linux:**
```bash
# Используя nvm (рекомендуется)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 18
nvm use 18
```

**Windows:**
Скачайте и установите с [nodejs.org](https://nodejs.org/)

### 2. Установка Yarn

```bash
npm install -g yarn
```

Проверьте установку:
```bash
yarn --version
```

### 3. Установка ngrok

**macOS (Homebrew):**
```bash
brew install ngrok/ngrok/ngrok
```

**Linux:**
```bash
# Скачайте с ngrok.com
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar -xzf ngrok-v3-stable-linux-amd64.tgz
sudo mv ngrok /usr/local/bin/
```

**Windows:**
Скачайте с [ngrok.com](https://ngrok.com/download)

### 4. Получение API ключа MentraOS

1. Зарегистрируйтесь на [mentra.glass](https://mentra.glass)
2. Перейдите в раздел "API Keys" или "Разработка"
3. Создайте новый API ключ
4. Скопируйте ключ

### 5. Клонирование и установка зависимостей

```bash
# Клонируйте репозиторий (если еще не клонирован)
git clone git@gitlab.com:badaftermath/mentra-glasses-mvp.git
cd mentra-glasses-mvp

# Установите зависимости
yarn install
```

### 6. Настройка переменных окружения

```bash
# Скопируйте пример файла окружения
cp env.example .env

# Откройте .env в редакторе
nano .env  # или используйте любой другой редактор
```

Заполните переменные:

```env
# MentraOS API ключ (обязательно)
MENTRAOS_API_KEY=ваш_ключ_сюда

# Имя пакета приложения (опционально)
PACKAGE_NAME=com.example.myfirstmentraosapp

# Порт сервера (опционально, по умолчанию 3000)
PORT=3000
```

### 7. Настройка ngrok

**Создайте аккаунт на ngrok.com** (бесплатный):
1. Зарегистрируйтесь на [ngrok.com](https://dashboard.ngrok.com/signup)
2. Перейдите в Dashboard → Your Authtoken
3. Скопируйте authtoken

**Настройте authtoken:**
```bash
ngrok config add-authtoken ваш_authtoken
```

Проверьте подключение:
```bash
ngrok http 3000
```

Должен появиться туннель с URL вида `https://xxxx-xx-xxx-xxx-xx.ngrok-free.app`

## Запуск приложения

### Режим разработки (с автоперезагрузкой)

```bash
# macOS/Linux
yarn dev

# Windows
yarn dev-win
```

### Обычный запуск

```bash
# macOS/Linux
yarn start

# Windows
yarn start-win
```

При запуске сервер будет доступен на порту 3000 (или указанном в `.env`).

## Настройка ngrok

### Запуск ngrok туннеля

В отдельном терминале запустите:

```bash
# macOS/Linux
yarn ngrok

# Windows
yarn ngrok-win
```

ngrok откроет туннель к вашему локальному серверу.

### Получение URL туннеля

После запуска ngrok вы увидите:
```
Forwarding  https://xxxx-xx-xxx-xxx-xx.ngrok-free.app -> http://localhost:3000
```

Скопируйте URL `https://xxxx-xx-xxx-xxx-xx.ngrok-free.app`

## Подключение к MentraOS

### 1. Откройте консоль MentraOS

Перейдите на [console.mentra.glass](https://console.mentra.glass)

### 2. Настройте приложение

1. Перейдите в раздел "Apps" или "Приложения"
2. Найдите ваше приложение или создайте новое
3. Укажите следующие параметры:
   - **Package Name**: `com.example.myfirstmentraosapp` (или из `.env`)
   - **Webhook URL**: URL из ngrok туннеля (например, `https://xxxx-xx-xxx-xxx-xx.ngrok-free.app`)

### 3. Запустите приложение на очках

1. Включите умные очки MentraOS
2. Откройте меню приложений
3. Найдите и запустите ваше приложение

## Документация

- **MentraOS SDK**: [docs.mentra.glass](https://docs.mentra.glass)
- **ngrok**: [ngrok.com/docs](https://ngrok.com/docs)
- **Node.js**: [nodejs.org/docs](https://nodejs.org/docs)

## Поддержка

При возникновении проблем:
1. Проверьте, что все зависимости установлены (`yarn install`)
2. Убедитесь, что переменные окружения настроены корректно (`.env`)
3. Проверьте, что ngrok туннель активен
4. Проверьте логи приложения и ngrok

## Лицензия

MIT
