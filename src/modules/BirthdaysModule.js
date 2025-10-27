import { loadDataSection } from '../utils/dataLoader.js';
import { formatDate } from '../utils/dateFormatter.js';
import { BaseContentModule } from './base/BaseContentModule.js';

/**
 * BirthdaysModule - Модуль для работы с днями рождения
 */
export class BirthdaysModule extends BaseContentModule {
    constructor() {
        super(3);
    }

    getModuleName() {
        return 'Дни рождения';
    }

    getAllItems() {
        return loadDataSection('birthdays');
    }

    formatItems(birthdays) {
        if (!birthdays?.length) return 'Дни рождения не найдены';
        return birthdays.map(b => `${b.name} ${formatDate(b.date)}, ${b.age} лет`).join('\n');
    }

    async showLatestBirthday(session, sessionId) {
        return this.showLatest(session, sessionId);
    }

    async showNextBirthday(session, sessionId) {
        return this.showNext(session, sessionId);
    }
}

