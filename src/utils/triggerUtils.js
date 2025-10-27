import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let cachedCommands = null;

function getCommands() {
    if (!cachedCommands) {
        cachedCommands = JSON.parse(readFileSync(join(__dirname, '../config/commands.json'), 'utf-8'));
    }
    return cachedCommands;
}

/**
 * Удаляет триггерное слово из начала текста
 */
export function removeTriggerFromText(originalText, triggerKey, commands = null) {
    const cmds = commands || getCommands();
    const triggers = cmds[triggerKey]?.triggers || [];
    const text = originalText.trim().toLowerCase();

    for (const trigger of triggers) {
        if (text.startsWith(trigger.toLowerCase())) {
            return originalText.substring(trigger.length).trim().replace(/^[,.\-!?]+\s*/, '').trim();
        }
    }

    return originalText;
}
