import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Загружает данные из data.json
 */
export function loadData() {
    const data = JSON.parse(
        readFileSync(join(__dirname, '../config/data.json'), 'utf-8')
    );

    return data;
}

/**
 * Загружает конкретную секцию из data.json
 */
export function loadDataSection(sectionName) {
    const data = loadData();

    return data[sectionName] || [];
}

