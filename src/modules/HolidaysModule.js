import { loadDataSection } from '../utils/dataLoader.js';
import { formatDate } from '../utils/dateFormatter.js';
import { BaseContentModule } from './base/BaseContentModule.js';

/**
 * HolidaysModule - Модуль для работы с праздниками
 */
export class HolidaysModule extends BaseContentModule {
    constructor() {
        super(3);
    }

    getModuleName() {
        return 'Праздники';
    }

    getAllItems() {
        return loadDataSection('holidays');
    }

    formatItems(holidays) {
        if (!holidays?.length) return 'Праздники не найдены';
        return holidays.map(h => `${h.name} ${formatDate(h.date)}\n${h.description}`).join('\n\n');
    }

    async showLatestHoliday(session, sessionId) {
        return this.showLatest(session, sessionId);
    }

    async showNextHoliday(session, sessionId) {
        return this.showNext(session, sessionId);
    }
}

