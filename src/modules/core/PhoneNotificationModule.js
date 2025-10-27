import { StreamType } from '@mentra/sdk';

/**
 * PhoneNotificationModule - Модуль для отслеживания уведомлений с телефона
 * Логирует уведомления приходящие с подключенного телефона
 */
export class PhoneNotificationModule {
    /**
     * Инициализация модуля для сессии
     * @param {AppSession} session - Сессия
     * @param {string} sessionId - ID сессии
     */
    init(session, sessionId) {
        const phoneNotificationHandler = (data) => {
            const priorityEmoji = {
                'high': '🔴',
                'normal': '🟡',
                'low': '🟢'
            };

            const emoji = priorityEmoji[data.priority] || '📱';

            console.log(`${emoji} [PhoneNotification] ${data.app}`);
            console.log(`   Заголовок: ${data.title}`);
            console.log(`   Содержание: ${data.content}`);
            console.log(`   Приоритет: ${data.priority}`);

            // Показываем только уведомления с высоким приоритетом
            if (data.priority === 'high') {
                const notificationText = `${data.title}\n${data.content}`;

                session.layouts.showReferenceCard(
                    data.app,
                    notificationText,
                    { durationMs: 8000 }
                );
            }
        };

        // Подписываемся на уведомления телефона
        session.subscribe?.(StreamType.PHONE_NOTIFICATION);
        const unsubscribe = session.events.onPhoneNotifications(phoneNotificationHandler);
        console.log(`✅ [PhoneNotification] Модуль инициализирован`);

        return [unsubscribe];
    }
}

