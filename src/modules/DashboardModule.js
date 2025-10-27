import { ViewType } from '@mentra/sdk';
import { formatDateTime, formatDate } from '../utils/dateFormatter.js';

/**
 * DashboardModule - Модуль главного дашборда
 * Отображает основную информацию при поднятии головы
 */
export class DashboardModule {
    constructor(weatherModule, birthdaysModule) {
        this.weatherModule = weatherModule;
        this.birthdaysModule = birthdaysModule;
        this.weatherCache = new Map();
        this.cacheTTL = 10 * 60 * 1000; // 10 минут
    }

    init(session, sessionId) {
        console.log(`✅ [Dashboard] Модуль инициализирован`);
        
        this.preloadWeather(sessionId);
        
        const interval = setInterval(() => this.preloadWeather(sessionId), this.cacheTTL);
        return [() => clearInterval(interval)];
    }

    /**
     * Предзагрузка погоды в фоне
     */
    async preloadWeather(sessionId) {
        try {
            const weatherData = await this.weatherModule.getWeatherForSession(sessionId);

            this.weatherCache.set(sessionId, { data: weatherData, timestamp: Date.now() });

            console.log(`🌤️ [Dashboard] Погода предзагружена`);
        } catch (error) {
            console.error(`❌ [Dashboard] Ошибка предзагрузки погоды:`, error);
        }
    }

    /**
     * Получить кешированную погоду
     */
    getCachedWeather(sessionId) {
        const cached = this.weatherCache.get(sessionId);

        if (!cached) {
            return { weather: 'Загрузка...', locationName: 'Москва' };
        }

        // Обновляем в фоне если устарело
        if (Date.now() - cached.timestamp > this.cacheTTL) {
            this.preloadWeather(sessionId);
        }

        return cached.data;
    }

    /**
     * Получить информацию о днях рождения
     */
    getBirthdayInfo() {
        const allBirthdays = this.birthdaysModule.getAllBirthdays();
        const today = new Date();
        const todayStr = `${today.getMonth() + 1}-${today.getDate()}`;

        const todayBirthdays = allBirthdays.filter(birthday => {
            const bDate = new Date(birthday.date);
            return `${bDate.getMonth() + 1}-${bDate.getDate()}` === todayStr;
        });

        if (todayBirthdays.length > 0) {
            const names = todayBirthdays.map(b => b.name).join(', ');
            return `День рождения у ${names}`;
        }

        if (allBirthdays.length > 0) {
            const nearest = allBirthdays[0];
            return `Ближайший ДР у ${nearest.name}; ${formatDate(nearest.date)}`;
        }

        return 'Нет информации о днях рождения';
    }

    /**
     * Показать главный дашборд
     */
    showDashboard(session, sessionId) {
        const { time, dayOfWeek, day, month } = formatDateTime();
        const { weather, locationName } = this.getCachedWeather(sessionId);

        const tempMatch = weather.match(/([-\d.]+°C)/);
        const temp = tempMatch ? tempMatch[1] : 'N/A';

        const birthdayInfo = this.getBirthdayInfo();

        const content = `${time}, ${dayOfWeek}, ${day} ${month}
${locationName || 'Москва'} ${temp}
Благоприятный день по лунному календарю
${birthdayInfo}`;

        session.layouts.showTextWall(content, { view: ViewType.DASHBOARD, durationMs: -1 });

        console.log(`✅ [Dashboard] Дашборд отображен`);
    }

    /**
     * Скрыть дашборд
     */
    hideDashboard(session) {
        session.layouts.showTextWall('', { view: ViewType.DASHBOARD, durationMs: 1 });
        console.log(`🔽 [Dashboard] Дашборд скрыт`);
    }

    cleanup(sessionId) {
        this.weatherCache.delete(sessionId);
    }
}
