import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Удаляет триггерное слово из начала текста
 */
export function removeTriggerFromText(originalText, triggerKey, commands = null) {
    if (!commands) {
        commands = JSON.parse(
            readFileSync(join(__dirname, '../config/commands.json'), 'utf-8')
        );
    }

    const triggers = commands[triggerKey]?.triggers || [];
    const text = originalText.trim().toLowerCase();

    for (const trigger of triggers) {
        const triggerLower = trigger.toLowerCase();

        if (text.startsWith(triggerLower)) {
            const cleaned = originalText.substring(trigger.length).trim();

            // Удаляем начальные знаки препинания
            return cleaned.replace(/^[,.\-!?]+\s*/, '').trim();
        }
    }

    return originalText;
}
