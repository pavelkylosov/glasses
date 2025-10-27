# Утилиты

## Работа с данными
- **dataLoader.js** - загрузка данных из `data.json`
- **dateFormatter.js** - форматирование дат и времени на русском

## Работа с командами
- **commands.js** - проверка триггеров команд
- **triggerUtils.js** - удаление триггеров из текста

## Работа с погодой
- **weather.js** - получение данных о погоде через API

## Управление состоянием
- **viewState.js** - управление состоянием просмотра модулей
- **pagination.js** - пагинация данных
- **delayedAction.js** - управление задержанными действиями

## Использование

### dataLoader
```javascript
import { loadData, loadDataSection } from './utils/dataLoader.js';

const allData = loadData();
const birthdays = loadDataSection('birthdays');
```

### dateFormatter
```javascript
import { formatDate, formatDateTime } from './utils/dateFormatter.js';

const date = formatDate(new Date()); // "24 ноября"
const { time, dayOfWeek } = formatDateTime(); // { time: "15:30", dayOfWeek: "Среда" }
```

### commands
```javascript
import { checkCommandTriggers } from './utils/commands.js';

const isWeatherCommand = checkCommandTriggers(text, commands, 'showWeather');
```

### ViewStateManager
```javascript
import { ViewStateManager } from './utils/viewState.js';

const viewState = new ViewStateManager();
viewState.startViewing(sessionId, 0);
const isViewing = viewState.isInViewMode(sessionId);
```

### PaginationHelper
```javascript
import { PaginationHelper } from './utils/pagination.js';

const pagination = new PaginationHelper(3); // 3 элемента на страницу
const page = pagination.getPage(items, startIndex);
```

### createDelayedAction
```javascript
import { createDelayedAction } from './utils/delayedAction.js';

const action = createDelayedAction();
action.delay(() => console.log('Выполнено'), 1000);
action.cancel(); // Отмена действия
```
