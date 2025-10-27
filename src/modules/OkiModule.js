import fetch from 'node-fetch';
import { removeTriggerFromText } from '../utils/triggerUtils.js';

/**
 * OkiModule - Модуль для отправки webhook
 * Отправляет POST запрос на webhook с текстом
 */
export class OkiModule {
    constructor() {
        this.webhookUrl = 'https://webhook.nodul.ru/13218/dev/req';
    }

    init() {
        console.log(`✅ [Oki] Модуль инициализирован`);
        return [];
    }

    /**
     * Отправка POST запроса на webhook
     */
    async sendWebhook(originalText, session) {
        const startTime = Date.now();
        const cleanedText = removeTriggerFromText(originalText, 'okiTrigger');

        try {
            session.layouts.showTextWall("Услышал. Думаю...", { durationMs: 15000 });

            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: cleanedText || originalText })
            });

            const result = await response.text();
            const duration = Date.now() - startTime;

            console.log(`✅ [Oki] Запрос отправлен (${response.status}, ${duration}мс)`);
            console.log(`📤 [Oki] Отправлено: "${cleanedText}"`);
            console.log(`📥 [Oki] Получено: "${result}"`);

            session.layouts.showTextWall(result, { durationMs: 10000 });
        } catch (error) {
            const duration = Date.now() - startTime;

            console.error(`❌ [Oki] Ошибка (${duration}мс):`, error.message);

            session.layouts.showReferenceCard(
                "Ошибка Oki",
                `Не удалось отправить запрос: ${error.message}`,
                { durationMs: 3000 }
            );
        }
    }

    cleanup() {
        // Нет ресурсов для очистки
    }
}
