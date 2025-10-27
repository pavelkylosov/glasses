/**
 * Создает менеджер для одной задержанной операции
 * Возвращает функции для запуска и отмены
 */
export function createDelayedAction() {
    let timer = null;

    return {
        /**
         * Запустить действие с задержкой
         */
        delay: (action, delayMs) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                action();
                timer = null;
            }, delayMs);
        },

        /**
         * Отменить запланированное действие
         * @returns {boolean} true если действие было отменено
         */
        cancel: () => {
            if (timer) {
                clearTimeout(timer);
                timer = null;
                return true;
            }

            return false;
        }
    };
}
