/**
 * Класс для управления пагинацией данных
 */
export class PaginationHelper {
    constructor(itemsPerPage = 3) {
        this.itemsPerPage = itemsPerPage;
    }

    /**
     * Получить элементы для страницы
     */
    getPage(items, startIndex) {
        return items.slice(startIndex, startIndex + this.itemsPerPage);
    }

    /**
     * Проверить, есть ли следующая страница
     */
    hasNextPage(items, currentIndex) {
        const nextIndex = currentIndex + this.itemsPerPage;
        return nextIndex < items.length;
    }

    /**
     * Получить индекс следующей страницы
     */
    getNextPageIndex(currentIndex) {
        return currentIndex + this.itemsPerPage;
    }

    /**
     * Форматировать заголовок с номерами элементов
     */
    formatPageTitle(prefix, currentIndex, pageItems, totalItems) {
        const startNum = currentIndex + 1;
        const endNum = Math.min(currentIndex + pageItems.length, totalItems);

        return `${prefix} ${startNum}-${endNum}/${totalItems}`;
    }

    /**
     * Проверить валидность индекса
     */
    isValidIndex(items, index) {
        return index >= 0 && index < items.length;
    }
}

