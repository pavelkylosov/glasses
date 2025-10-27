import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let cachedData = null;

/**
 * Загружает данные из data.json
 */
export function loadData() {
    if (!cachedData) {
        cachedData = JSON.parse(readFileSync(join(__dirname, '../config/data.json'), 'utf-8'));
    }
    return cachedData;
}

/**
 * Загружает конкретную секцию из data.json
 */
export function loadDataSection(sectionName) {
    return loadData()[sectionName] || [];
}

