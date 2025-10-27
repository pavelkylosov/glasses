import { loadDataSection } from '../utils/dataLoader.js';
import { formatDate } from '../utils/dateFormatter.js';
import { BaseContentModule } from './base/BaseContentModule.js';

/**
 * BirthdaysModule - Модуль для работы с днями рождения
 * Отображает ближайшие дни рождения на очках
 */
export class BirthdaysModule extends BaseContentModule {
    constructor() {
        super(3); // 3 элемента на страницу
    }

    getModuleName() {
        return 'Дни рождения';
    }

    getAllItems() {
        return loadDataSection('birthdays');
    }

    getAllBirthdays() {
        return this.getAllItems();
    }

    formatItems(birthdays) {
        if (!birthdays || birthdays.length === 0) return 'Дни рождения не найдены';

        return birthdays.map(birthday => {
            const formattedDate = formatDate(birthday.date);
            return `${birthday.name} ${formattedDate}, ${birthday.age} лет`;
        }).join('\n');
    }

    async showLatestBirthday(session, sessionId) {
        await this.showLatest(session, sessionId);
    }

    async showNextBirthday(session, sessionId) {
        await this.showNext(session, sessionId);
    }
}

