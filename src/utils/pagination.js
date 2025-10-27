/**
 * Класс для управления пагинацией данных
 */
export class PaginationHelper {
    constructor(itemsPerPage = 3) {
        this.itemsPerPage = itemsPerPage;
    }

    getPage(items, startIndex) {
        return items.slice(startIndex, startIndex + this.itemsPerPage);
    }

    getNextPageIndex(currentIndex) {
        return currentIndex + this.itemsPerPage;
    }

    formatPageTitle(prefix, currentIndex, pageItems, totalItems) {
        const startNum = currentIndex + 1;
        const endNum = Math.min(currentIndex + pageItems.length, totalItems);
        return `${prefix} ${startNum}-${endNum}/${totalItems}`;
    }
}

