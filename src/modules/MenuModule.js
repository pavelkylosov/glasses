/**
 * MenuModule - Модуль главного меню
 * Отображает меню выбора функций
 */
export class MenuModule {
    constructor() {
        this.menuState = new Map();
        this.menuItems = [
            '1. Погода',
            '2. Дни рожденья',
            '3. Праздники',
            '4. Новости'
        ];
    }

    init() {
        console.log(`✅ [Menu] Модуль инициализирован`);
        return [];
    }

    async openMenu(session, sessionId) {
        console.log(`📋 [Menu] Открываем главное меню`);

        session.layouts.showTextWall(this.menuItems.join('\n'), { durationMs: 20000 });
        this.menuState.set(sessionId, true);

        console.log(`✅ [Menu] Меню отображено`);
    }

    closeMenu(sessionId) {
        this.menuState.set(sessionId, false);
        console.log(`✅ [Menu] Меню закрыто`);
    }

    isMenuOpen(sessionId) {
        return this.menuState.get(sessionId) || false;
    }

    cleanup(sessionId) {
        this.menuState.delete(sessionId);
    }
}
