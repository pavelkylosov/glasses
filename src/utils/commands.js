/**
 * Проверяет содержит ли текст любой из триггеров команды
 * @param {string} text - Текст для проверки
 * @param {object} commands - Объект с командами из data.json
 * @param {string} commandKey - Ключ команды для проверки
 */
export function checkCommandTriggers(text, commands, commandKey) {
    const command = commands[commandKey];

    if (!command || !command.triggers) return false;

    return command.triggers.some(trigger => text.includes(trigger.toLowerCase()));
}

