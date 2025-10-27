import { loadDataSection } from '../utils/dataLoader.js';
import { formatDate } from '../utils/dateFormatter.js';
import { BaseContentModule } from './base/BaseContentModule.js';

/**
 * HolidaysModule - Модуль для работы с праздниками
 * Отображает ближайшие праздники на очках
 */
export class HolidaysModule extends BaseContentModule {
    constructor() {
        super(3); // 3 элемента на страницу
    }

    getModuleName() {
        return 'Праздники';
    }

    getAllItems() {
        return loadDataSection('holidays');
    }

    getAllHolidays() {
        return this.getAllItems();
    }

    formatItems(holidays) {
        if (!holidays || holidays.length === 0) return 'Праздники не найдены';

        return holidays.map(holiday => {
            const formattedDate = formatDate(holiday.date);
            return `${holiday.name} ${formattedDate}\n${holiday.description}`;
        }).join('\n\n');
    }

    async showLatestHoliday(session, sessionId) {
        await this.showLatest(session, sessionId);
    }

    async showNextHoliday(session, sessionId) {
        await this.showNext(session, sessionId);
    }
}

