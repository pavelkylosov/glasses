import { loadDataSection } from '../utils/dataLoader.js';
import { BaseContentModule } from './base/BaseContentModule.js';

/**
 * NewsModule - Модуль для работы с новостями
 * Отображает новости на очках
 */
export class NewsModule extends BaseContentModule {
    constructor() {
        super(1); // 1 новость за раз
    }

    getModuleName() {
        return 'Новости';
    }

    getAllItems() {
        return loadDataSection('news');
    }

    getAllNews() {
        return this.getAllItems();
    }

    formatItems(newsItems) {
        if (!newsItems || newsItems.length === 0) return 'Новости не найдены';

        const newsItem = newsItems[0]; // Показываем только первую
        return `${newsItem.title}\n${newsItem.content}\n${newsItem.date} | ${newsItem.source}`;
    }

    async showLatestNews(session, sessionId) {
        await this.showLatest(session, sessionId);
    }

    async showNextNews(session, sessionId) {
        await this.showNext(session, sessionId, false); // Без пагинации, по одному
    }
}
