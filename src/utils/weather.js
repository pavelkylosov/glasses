/**
 * Маппинг кодов погоды на эмодзи и описания
 */
const WEATHER_CODES = {
    0: '☀️ Ясно',
    1: '🌤️ Переменная облачность',
    2: '⛅ Облачно',
    3: '☁️ Пасмурно',
    45: '🌫️ Туман',
    48: '🌫️ Изморозь',
    51: '🌦️ Морось',
    53: '🌧️ Морось',
    61: '🌧️ Дождь',
    63: '🌧️ Сильный дождь',
    65: '⛈️ Ливень',
    71: '🌨️ Снег',
    73: '🌨️ Сильный снег',
    75: '❄️ Метель',
    80: '🌦️ Ливень',
    95: '⛈️ Гроза',
    96: '⛈️ Гроза с градом'
};

/**
 * Получает текущую погоду по координатам через Open-Meteo API
 */
export async function getWeather(lat, lng) {
    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`;
        const response = await fetch(url);
        const data = await response.json();

        const { temperature_2m, wind_speed_10m, weather_code } = data.current;
        const condition = WEATHER_CODES[weather_code] || '🌡️ Неизвестно';

        return `${condition} ${temperature_2m}°C | 💨 ${wind_speed_10m} км/ч`;
    } catch (error) {
        return `❌ Ошибка получения погоды: ${error.message}`;
    }
}
