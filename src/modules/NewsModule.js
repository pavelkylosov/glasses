import { loadDataSection } from '../utils/dataLoader.js';
import { BaseContentModule } from './base/BaseContentModule.js';

/**
 * NewsModule - Модуль для работы с новостями
 */
export class NewsModule extends BaseContentModule {
    constructor() {
        super(1);
    }

    getModuleName() {
        return 'Новости';
    }

    getAllItems() {
        return loadDataSection('news');
    }

    formatItems(newsItems) {
        if (!newsItems?.length) return 'Новости не найдены';
        const news = newsItems[0];
        return `${news.title}\n${news.content}\n${news.date} | ${news.source}`;
    }

    async showLatestNews(session, sessionId) {
        return this.showLatest(session, sessionId);
    }

    async showNextNews(session, sessionId) {
        return this.showNext(session, sessionId, false);
    }
}
