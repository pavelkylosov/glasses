/**
 * Названия месяцев на русском в родительном падеже
 */
const MONTHS_GENITIVE = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

/**
 * Названия дней недели на русском
 */
const DAYS_OF_WEEK = [
    'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 
    'Четверг', 'Пятница', 'Суббота'
];

/**
 * Форматирует дату в формате "24 ноября"
 */
export function formatDate(date) {
    const d = new Date(date);
    const day = d.getDate();
    const month = MONTHS_GENITIVE[d.getMonth()];

    return `${day} ${month}`;
}

/**
 * Форматирует полную дату с днем недели
 */
export function formatFullDate(date = new Date()) {
    const d = new Date(date);
    const dayOfWeek = DAYS_OF_WEEK[d.getDay()];
    const day = d.getDate();
    const month = MONTHS_GENITIVE[d.getMonth()];

    return { dayOfWeek, day, month };
}

/**
 * Форматирует время в формате "HH:MM"
 */
export function formatTime(date = new Date()) {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
}

/**
 * Возвращает объект с временем и полной датой
 */
export function formatDateTime(date = new Date()) {
    const time = formatTime(date);
    const { dayOfWeek, day, month } = formatFullDate(date);

    return { time, dayOfWeek, day, month };
}

