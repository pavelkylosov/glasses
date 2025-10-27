import { loadDataSection } from '../utils/dataLoader.js';

/**
 * FeedModule - Модуль для работы с социальной лентой
 */
export class FeedModule {
    constructor() {
        this.feedEvents = loadDataSection('feed');
    }

    init() {
        console.log(`✅ [Feed] Модуль инициализирован`);
        return [];
    }

    async showFeed(session) {
        if (!this.feedEvents?.length) {
            session.layouts.showTextWall('В вашей ленте пока ничего нового', { durationMs: 5000 });
            return;
        }

        const eventsList = this.feedEvents.map(e => `- ${e.text}`).join('\n');
        session.layouts.showTextWall(`Новое в вашей ленте\n${eventsList}`, { durationMs: 15000 });
        console.log(`✅ [Feed] Показаны события ленты (${this.feedEvents.length} событий)`);
    }
}
