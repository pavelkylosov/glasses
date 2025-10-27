import { AppServer } from '@mentra/sdk';
import dotenv from 'dotenv';
import { WeatherModule } from './modules/WeatherModule.js';
import { TranscriptionModule } from './modules/core/TranscriptionModule.js';
import { HeadTrackingModule } from './modules/core/HeadTrackingModule.js';
import { ButtonModule } from './modules/core/ButtonModule.js';
import { PhoneNotificationModule } from './modules/core/PhoneNotificationModule.js';
import { MenuModule } from './modules/MenuModule.js';
import { NewsModule } from './modules/NewsModule.js';
import { BirthdaysModule } from './modules/BirthdaysModule.js';
import { HolidaysModule } from './modules/HolidaysModule.js';
import { TvShowsModule } from './modules/TvShowsModule.js';
import { FeedModule } from './modules/FeedModule.js';
import { OkiModule } from './modules/OkiModule.js';
import { DashboardModule } from './modules/DashboardModule.js';

dotenv.config();

const PACKAGE_NAME = process.env.PACKAGE_NAME || "com.example.myfirstmentraosapp";
const PORT = parseInt(process.env.PORT || "3000");
const MENTRAOS_API_KEY = process.env.MENTRAOS_API_KEY;

if (!MENTRAOS_API_KEY) {
    console.error("MENTRAOS_API_KEY environment variable is required");
    process.exit(1);
}

/**
 * MyMentraOSApp - Главное приложение MentraOS
 * Управляет модулями и сессиями через единый маппинг
 */
class MyMentraOSApp extends AppServer {
    constructor(options) {
        super(options);
        this.cleanupHandlers = new Map();
        this.initializeModules();
    }

    /**
     * Инициализация всех модулей
     */
    initializeModules() {
        // Контент модули
        this.weatherModule = new WeatherModule();
        this.newsModule = new NewsModule();
        this.birthdaysModule = new BirthdaysModule();
        this.holidaysModule = new HolidaysModule();
        this.tvShowsModule = new TvShowsModule();
        this.feedModule = new FeedModule();

        // Функциональные модули
        this.menuModule = new MenuModule();
        this.okiModule = new OkiModule();
        this.dashboardModule = new DashboardModule(this.weatherModule, this.birthdaysModule);

        // Кор модули
        this.transcriptionModule = new TranscriptionModule(
            this.weatherModule,
            this.menuModule,
            this.newsModule,
            this.birthdaysModule,
            this.holidaysModule,
            this.tvShowsModule,
            this.feedModule,
            this.okiModule
        );
        this.headTrackingModule = new HeadTrackingModule(this.dashboardModule);
        this.buttonModule = new ButtonModule();
        this.phoneNotificationModule = new PhoneNotificationModule();

        // Маппинг модулей с параметрами инициализации
        this.modules = [
            { module: this.weatherModule, needsSession: true },
            { module: this.newsModule, needsSession: false },
            { module: this.birthdaysModule, needsSession: false },
            { module: this.holidaysModule, needsSession: false },
            { module: this.tvShowsModule, needsSession: false },
            { module: this.feedModule, needsSession: false },
            { module: this.menuModule, needsSession: false },
            { module: this.okiModule, needsSession: false },
            { module: this.dashboardModule, needsSession: true },
            { module: this.transcriptionModule, needsSession: true },
            { module: this.headTrackingModule, needsSession: true },
            { module: this.buttonModule, needsSession: true },
            { module: this.phoneNotificationModule, needsSession: true }
        ];

        console.log(`✅ Модули инициализированы (${this.modules.length})`);
    }

    /**
     * Обработка новых подключений сессий
     */
    async onSession(session, sessionId, userId) {
        console.log(`\n🎉 Новая сессия: ${sessionId} | Пользователь: ${userId}`);

        const handlers = this.modules.flatMap(({ module, needsSession }) =>
            needsSession ? module.init(session, sessionId) : module.init()
        );

        this.cleanupHandlers.set(sessionId, handlers);

        console.log(`\n✅ Приложение готово к работе!`);
    }

    /**
     * Обработка остановки сессии
     */
    async onStop(sessionId, userId, reason) {
        console.log(`\n🛑 Сессия ${sessionId} остановлена (${reason})`);

        // Очищаем обработчики
        const handlers = this.cleanupHandlers.get(sessionId);
        if (handlers) {
            handlers.forEach(cleanup => cleanup?.());
            this.cleanupHandlers.delete(sessionId);
        }

        // Очищаем модули
        this.modules.forEach(({ module }) => module.cleanup?.(sessionId));

        console.log(`🧹 Ресурсы очищены`);
    }
}

// Создание и запуск сервера
const server = new MyMentraOSApp({
    packageName: PACKAGE_NAME,
    apiKey: MENTRAOS_API_KEY,
    port: PORT
});

console.log(`🚀 Запуск сервера MentraOS на порту ${PORT}...`);

server.start().catch((err) => {
    console.error("❌ Не удалось запустить сервер:", err);
});
