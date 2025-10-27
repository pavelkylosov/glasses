/**
 * Класс для управления состоянием просмотра модуля
 */
export class ViewStateManager {
    constructor() {
        this.sessions = new Map();
    }

    getState(sessionId) {
        return this.sessions.get(sessionId) || { index: 0, isViewing: false };
    }

    getCurrentIndex(sessionId) {
        return this.getState(sessionId).index;
    }

    isInViewMode(sessionId) {
        return this.getState(sessionId).isViewing;
    }

    startViewing(sessionId, index) {
        this.sessions.set(sessionId, { index, isViewing: true });
    }

    stopViewing(sessionId) {
        const state = this.getState(sessionId);
        this.sessions.set(sessionId, { ...state, isViewing: false });
    }

    cleanup(sessionId) {
        this.sessions.delete(sessionId);
    }
}
