import { loadDataSection } from '../utils/dataLoader.js';

/**
 * FeedModule - Модуль для работы с социальной лентой
 * Отображает события из социальной ленты пользователя
 */
export class FeedModule {
    constructor() {
        this.feedEvents = loadDataSection('feed');
    }

    init() {
        console.log(`✅ [Feed] Модуль инициализирован`);
        return [];
    }

    /**
     * Показать события из ленты на очках
     */
    async showFeed(session) {
        const events = this.feedEvents;

        if (!events || events.length === 0) {
            session.layouts.showTextWall('В вашей ленте пока ничего нового', { durationMs: 5000 });
            return;
        }

        const eventsList = events.map(e => `- ${e.text}`).join('\n');
        const content = `Новое в вашей ленте\n${eventsList}`;

        session.layouts.showTextWall(content, { durationMs: 15000 });

        console.log(`✅ [Feed] Показаны события ленты (${events.length} событий)`);
    }

    cleanup() {
        // Нет ресурсов для очистки
    }
}
