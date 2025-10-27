import { StreamType } from '@mentra/sdk';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { checkCommandTriggers } from '../../utils/commands.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * TranscriptionModule - Модуль для обработки распознавания речи
 * Обрабатывает голосовые команды через маппинг
 */
export class TranscriptionModule {
    constructor(weatherModule, menuModule, newsModule, birthdaysModule, holidaysModule, tvShowsModule, feedModule, okiModule) {
        this.weatherModule = weatherModule;
        this.menuModule = menuModule;
        this.newsModule = newsModule;
        this.birthdaysModule = birthdaysModule;
        this.holidaysModule = holidaysModule;
        this.tvShowsModule = tvShowsModule;
        this.feedModule = feedModule;
        this.okiModule = okiModule;

        this.commands = JSON.parse(readFileSync(join(__dirname, '../../config/commands.json'), 'utf-8'));

        this.setupCommandHandlers();
    }

    /**
     * Настройка маппинга команд на обработчики
     */
    setupCommandHandlers() {
        // Обработчики "оки" команд
        this.okiHandlers = [
            { trigger: 'showWeather', handler: (s, sid) => this.weatherModule.showWeatherForSession(s, sid) },
            { trigger: 'showNews', handler: (s) => this.newsModule.showLatestNews(s, this.currentSessionId) },
            { trigger: 'showSolovyev', handler: (s) => this.tvShowsModule.showTvShowByTrigger(s, 'showSolovyev') },
            { trigger: 'showPustGovoryat', handler: (s) => this.tvShowsModule.showTvShowByTrigger(s, 'showPustGovoryat') },
            { trigger: 'showFeed', handler: (s) => this.feedModule.showFeed(s) }
        ];

        // Обработчики пунктов меню
        this.menuHandlers = [
            { trigger: 'showWeather', handler: (s, sid) => this.weatherModule.showWeatherForSession(s, sid) },
            { trigger: 'showBirthdays', handler: (s, sid) => this.birthdaysModule.showLatestBirthday(s, sid) },
            { trigger: 'showHolidays', handler: (s, sid) => this.holidaysModule.showLatestHoliday(s, sid) },
            { trigger: 'showNews', handler: (s, sid) => this.newsModule.showLatestNews(s, sid) }
        ];

        // Обработчики навигации для модулей
        this.navigationModules = [
            { module: this.newsModule, handler: (s, sid) => this.newsModule.showNextNews(s, sid) },
            { module: this.birthdaysModule, handler: (s, sid) => this.birthdaysModule.showNextBirthday(s, sid) },
            { module: this.holidaysModule, handler: (s, sid) => this.holidaysModule.showNextHoliday(s, sid) }
        ];
    }

    /**
     * Инициализация модуля для сессии
     */
    init(session, sessionId) {
        this.currentSessionId = sessionId;
        
        const transcriptionHandler = async (data) => {
            console.log(`🎤 [Transcription] "${data.text}" (${data.isFinal})`);

            if (data.isFinal) {
                await this.handleCommand(data, session, sessionId);
            }
        };

        session.subscribe?.(StreamType.TRANSCRIPTION);
        const unsubscribe = session.events.onTranscription(transcriptionHandler);
        console.log(`✅ [Transcription] Модуль инициализирован (язык: ru-RU)`);

        return [unsubscribe];
    }

    /**
     * Сброс режимов просмотра всех модулей
     */
    resetViewModes(sessionId) {
        this.newsModule.viewState.setViewMode(sessionId, false);
        this.birthdaysModule.viewState.setViewMode(sessionId, false);
        this.holidaysModule.viewState.setViewMode(sessionId, false);
    }

    /**
     * Обработка голосовых команд
     */
    async handleCommand(data, session, sessionId) {
        const text = data.text.toLowerCase().trim();

        console.log(`🔍 [Transcription] Обрабатываем: "${text}"`);

        // 1. Проверка "оки" триггера
        if (checkCommandTriggers(text, this.commands, 'okiTrigger')) {
            console.log(`🔔 [Transcription] Обнаружен триггер "оки"`);

            // Проверяем специфичные "оки" команды
            for (const { trigger, handler } of this.okiHandlers) {
                if (checkCommandTriggers(text, this.commands, trigger)) {
                    console.log(`✅ [Transcription] Обработка "${trigger}" через "оки"`);
                    await handler(session, sessionId);
                    return;
                }
            }

            // Если нет специфичных команд - отправляем webhook
            console.log(`📤 [Transcription] Отправляем webhook`);
            await this.okiModule.sendWebhook(data.text, session);
            return;
        }

        // 2. Команда открытия меню
        if (checkCommandTriggers(text, this.commands, 'openMenu')) {
            console.log(`👋 [Transcription] Открытие меню`);
            await this.menuModule.openMenu(session, sessionId);
            return;
        }

        // 3. Обработка выбора пунктов меню
        if (this.menuModule.isMenuOpen(sessionId)) {
            for (const { trigger, handler } of this.menuHandlers) {
                if (checkCommandTriggers(text, this.commands, trigger)) {
                    console.log(`✅ [Transcription] Выбран пункт меню: "${trigger}"`);
                    this.menuModule.closeMenu(sessionId);
                    this.resetViewModes(sessionId);
                    await handler(session, sessionId);
                    return;
                }
            }
        }

        // 4. Навигация внутри модулей
        if (checkCommandTriggers(text, this.commands, 'nextNews')) {
            for (const { module, handler } of this.navigationModules) {
                if (module.isInViewMode(sessionId)) {
                    console.log(`➡️ [Transcription] Следующая страница`);
                    await handler(session, sessionId);
                    return;
                }
            }
        }

        console.log(`❌ [Transcription] Команда "${text}" не распознана`);
    }
}
