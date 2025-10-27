import { StreamType } from '@mentra/sdk';
import { createDelayedAction } from '../../utils/delayedAction.js';

/**
 * HeadTrackingModule - Модуль для отслеживания движений головы
 * Показывает дашборд при поднятии головы
 */
export class HeadTrackingModule {
    constructor(dashboardModule) {
        this.dashboardModule = dashboardModule;
        this.lastPosition = new Map();
        this.dashboardActions = new Map(); // Задержанные действия для каждой сессии
    }

    /**
     * Инициализация модуля для сессии
     * @param {AppSession} session - Сессия
     * @param {string} sessionId - ID сессии
     */
    init(session, sessionId) {
        // Создаем менеджер задержанных действий для этой сессии
        const delayedDashboard = createDelayedAction();
        this.dashboardActions.set(sessionId, delayedDashboard);

        const headPositionHandler = (data) => {
            console.log(`👤 [HeadTracking] ${data.position}`);

            const lastPos = this.lastPosition.get(sessionId);

            if (data.position === 'up') {
                // Показываем дашборд с задержкой 100мс
                delayedDashboard.delay(() => {
                    console.log(`📊 [HeadTracking] Показываем дашборд`);
                    this.dashboardModule.showDashboard(session, sessionId);
                }, 100);
            } else if (lastPos === 'up' && data.position !== 'up') {
                // Голова опущена - скрываем дашборд
                console.log(`🔽 [HeadTracking] Скрываем дашборд`);

                // Если дашборд еще не показан - отменяем показ
                if (!delayedDashboard.cancel()) {
                    // Дашборд уже показан - скрываем
                    this.dashboardModule.hideDashboard(session);
                }
            }

            this.lastPosition.set(sessionId, data.position);
        };

        // Подписываемся на события позиции головы
        session.subscribe?.(StreamType.HEAD_POSITION);
        const unsubscribe = session.events.onHeadPosition(headPositionHandler);
        console.log(`✅ [HeadTracking] Модуль инициализирован`);

        return [unsubscribe];
    }

    /**
     * Очистка ресурсов сессии
     */
    cleanup(sessionId) {
        const delayedDashboard = this.dashboardActions.get(sessionId);
        if (delayedDashboard) {
            delayedDashboard.cancel();
            this.dashboardActions.delete(sessionId);
        }
        this.lastPosition.delete(sessionId);
    }
}

