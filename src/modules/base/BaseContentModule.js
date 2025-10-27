import { PaginationHelper } from '../../utils/pagination.js';
import { ViewStateManager } from '../../utils/viewState.js';

/**
 * Базовый класс для модулей с пагинацией контента
 * Инкапсулирует общую логику просмотра и навигации
 */
export class BaseContentModule {
    constructor(itemsPerPage = 3) {
        this.viewState = new ViewStateManager();
        this.pagination = new PaginationHelper(itemsPerPage);
    }

    /**
     * Получить все элементы (должен быть переопределен)
     */
    getAllItems() {
        throw new Error('getAllItems() должен быть реализован в подклассе');
    }

    /**
     * Форматировать элементы (должен быть переопределен)
     */
    formatItems(items) {
        throw new Error('formatItems() должен быть реализован в подклассе');
    }

    /**
     * Получить название модуля (должен быть переопределен)
     */
    getModuleName() {
        throw new Error('getModuleName() должен быть реализован в подклассе');
    }

    /**
     * Показать элементы начиная с индекса
     */
    async showItemsAtIndex(session, sessionId, index, usePagination = true) {
        const allItems = this.getAllItems();

        if (!allItems?.length || index < 0 || index >= allItems.length) {
            session.layouts.showReferenceCard(
                this.getModuleName(),
                `${this.getModuleName()} не найдены`,
                { durationMs: 5000 }
            );
            this.viewState.stopViewing(sessionId);
            return false;
        }

        this.viewState.startViewing(sessionId, index);

        const items = usePagination ? this.pagination.getPage(allItems, index) : [allItems[index]];
        const title = usePagination
            ? this.pagination.formatPageTitle(this.getModuleName(), index, items, allItems.length)
            : `${this.getModuleName()} ${index + 1}/${allItems.length}`;

        session.layouts.showReferenceCard(title, this.formatItems(items), { durationMs: 15000 });
        console.log(`✅ [${this.getModuleName()}] ${title}`);
        return true;
    }

    async showLatest(session, sessionId) {
        return this.showItemsAtIndex(session, sessionId, 0);
    }

    async showNext(session, sessionId, usePagination = true) {
        const currentIndex = this.viewState.getCurrentIndex(sessionId);
        const allItems = this.getAllItems();
        const nextIndex = usePagination ? this.pagination.getNextPageIndex(currentIndex) : currentIndex + 1;

        if (nextIndex >= allItems.length) {
            session.layouts.showReferenceCard(this.getModuleName(), 'Это была последняя страница', { durationMs: 5000 });
            this.viewState.stopViewing(sessionId);
            console.log(`ℹ️ [${this.getModuleName()}] Больше элементов нет`);
            return;
        }

        return this.showItemsAtIndex(session, sessionId, nextIndex, usePagination);
    }

    isInViewMode(sessionId) {
        return this.viewState.isInViewMode(sessionId);
    }

    init() {
        console.log(`✅ [${this.getModuleName()}] Модуль инициализирован`);
        return [];
    }

    cleanup(sessionId) {
        this.viewState.cleanup(sessionId);
    }
}

