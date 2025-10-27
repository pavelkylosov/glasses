import { StreamType } from '@mentra/sdk';

/**
 * ButtonModule - Модуль для обработки нажатий кнопок
 * Обрабатывает события от физических кнопок на очках
 */
export class ButtonModule {
    /**
     * Инициализация модуля для сессии
     * @param {AppSession} session - Сессия
     * @param {string} sessionId - ID сессии
     */
    init(session, sessionId) {
        const handlers = [];

        const buttonHandler = (data) => {
            console.log(`🔘 [Button] ${JSON.stringify(data)}`);
        };

        // Подписываемся на события кнопок
        session.subscribe?.(StreamType.BUTTON_PRESS);
        handlers.push(session.events.onButtonPress(buttonHandler));
        console.log(`✅ [Button] Модуль инициализирован`);

        return handlers;
    }
}

