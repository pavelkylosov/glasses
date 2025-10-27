import { loadDataSection } from '../utils/dataLoader.js';

/**
 * TvShowsModule - Модуль для работы с телепередачами
 */
export class TvShowsModule {
    constructor() {
        this.tvShows = loadDataSection('tvShows');
        this.triggerMap = {
            'showSolovyev': 'Соловьев',
            'showPustGovoryat': 'Пусть говорят'
        };
    }

    init() {
        console.log(`✅ [TvShows] Модуль инициализирован`);
        return [];
    }

    async showTvShowByTrigger(session, triggerKey) {
        const showName = this.triggerMap[triggerKey];
        if (!showName) {
            console.log(`❌ [TvShows] Неизвестный триггер: ${triggerKey}`);
            return false;
        }

        const show = this.tvShows.find(s => s.name === showName);
        if (!show) {
            console.log(`❌ [TvShows] Передача не найдена: ${showName}`);
            return false;
        }

        session.layouts.showTextWall(show.text || 'Информация недоступна', { durationMs: 10000 });
        console.log(`✅ [TvShows] Показана информация о передаче: ${show.name}`);
        return true;
    }
}
