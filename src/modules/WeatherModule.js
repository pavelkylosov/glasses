import { StreamType } from '@mentra/sdk';
import { getWeather } from '../utils/weather.js';
import { loadData } from '../utils/dataLoader.js';

/**
 * WeatherModule - Модуль для получения и отображения погоды
 * Подписывается на геолокацию и показывает погоду на очках
 */
export class WeatherModule {
    constructor() {
        this.locations = new Map();

        const testData = loadData();
        this.defaultLocation = testData.testLocations[testData.defaultLocation];
    }

    init(session, sessionId) {
        const locationHandler = (data) => {
            this.locations.set(sessionId, { lat: data.lat, lng: data.lng });
        };

        session.subscribe?.(StreamType.LOCATION_UPDATE);
        const unsubscribe = session.events.onLocation(locationHandler);

        return [unsubscribe];
    }

    /**
     * Получить погоду для сессии
     */
    async getWeatherForSession(sessionId) {
        const location = this.locations.get(sessionId) || this.defaultLocation;
        const weather = await getWeather(location.lat, location.lng);

        const locationName = this.locations.has(sessionId)
            ? 'Ваше местоположение'
            : this.defaultLocation.name;

        return { weather, locationName };
    }

    /**
     * Показать погоду для сессии
     */
    async showWeatherForSession(session, sessionId) {
        const { weather, locationName } = await this.getWeatherForSession(sessionId);

        session.layouts.showReferenceCard(locationName, weather, { durationMs: 10000 });

        console.log(`✅ [Weather] Погода показана для ${locationName}`);
    }

    cleanup(sessionId) {
        this.locations.delete(sessionId);
    }
}
