/**
 * Класс для управления состоянием просмотра модуля
 */
export class ViewStateManager {
    constructor() {
        this.currentIndex = new Map();
        this.isViewing = new Map();
    }

    /**
     * Получить текущий индекс
     */
    getCurrentIndex(sessionId) {
        return this.currentIndex.get(sessionId) || 0;
    }

    /**
     * Установить текущий индекс
     */
    setCurrentIndex(sessionId, index) {
        this.currentIndex.set(sessionId, index);
    }

    /**
     * Проверить, находится ли сессия в режиме просмотра
     */
    isInViewMode(sessionId) {
        return this.isViewing.get(sessionId) || false;
    }

    /**
     * Установить режим просмотра
     */
    setViewMode(sessionId, isViewing) {
        this.isViewing.set(sessionId, isViewing);
    }

    /**
     * Начать просмотр (установить индекс и режим)
     */
    startViewing(sessionId, index) {
        this.setCurrentIndex(sessionId, index);
        this.setViewMode(sessionId, true);
    }

    /**
     * Завершить просмотр
     */
    stopViewing(sessionId) {
        this.setViewMode(sessionId, false);
    }

    /**
     * Очистить состояние сессии
     */
    cleanup(sessionId) {
        this.currentIndex.delete(sessionId);
        this.isViewing.delete(sessionId);
    }
}
