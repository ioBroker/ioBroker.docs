---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md
title: без названия
hash: uWODm+D0xCzEIjFY5UDLaMiiHCl4cHHks2cu3U/fvWY=
---
#### Пример использования для демонстрации проблем и запросов на слияние в GitHub.

##### **Введение**

В этом примере использования описывается, как отобразить количество открытых задач GitHub Issues и запросов на слияние (Pull Requests, PR) для одного или нескольких репозиториев GitHub внутри`ioBroker VIS` .

В данной реализации используется`JSONTemplate` Этот виджет получает статистику репозитория непосредственно из общедоступного API GitHub без необходимости аутентификации.

Для уменьшения количества запросов к API виджет автоматически обновляется через настраиваемый интервал.

![Виджет](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/githubissues.png)

---

##### **Настройка репозитория GitHub**

Сначала определите репозитории, которые следует отслеживать.

Каждый репозиторий должен соответствовать следующему формату:

```text
owner/repository
```

Пример:

```text
oweitman/ioBroker.vis-jsontemplate
```

###### **Конфигурация репозитория**

<details>
  <summary>Details</summary>

```javascript
const repos = ['oweitman/ioBroker.vis-jsontemplate', 'oweitman/ioBroker.mytime', 'oweitman/ioBroker.pi-hole2'];

// refresh interval in minutes
const refreshMinutes = 60;

//optional github token
const token = '';
```

</details>

---

##### **Интеграция в VIS**

Разместите`JSONTemplate` идентификатор, а затем вставьте следующий шаблон.

###### **Код шаблона**

<details>
  <summary>Details</summary>
  <pre><code>

```ejs
<%
const repos = [
  "oweitman/ioBroker.vis-jsontemplate",
  "oweitman/ioBroker.mytime",
  "oweitman/ioBroker.pi-hole2",
];

// Aktualisierung alle X Minuten
const refreshMinutes = 1;

//optional github token
// beginnt mit ghp_
const token = "";

%>

<style>
.ghtable {
    width: 100%;
    border-collapse: collapse;
    font-family: system-ui, sans-serif;

    background: #161b22;
    color: #e6edf3;

    border-radius: 12px;
    overflow: hidden;

    box-shadow: 0 8px 30px rgba(0,0,0,.18);

    font-size: 14px;
}

.ghtable thead {
    background: #21262d;
}

.ghtable th {
    padding: 10px 18px;
    text-align: left;
    font-weight: 600;
    border-bottom: 1px solid #30363d;
}

.ghtable td {
    padding: 10px 18px;
    border-bottom: 1px solid #30363d;
}

.ghtable tbody tr:hover {
    background: #1f2937;
}

.ghtable td:nth-child(2),
.ghtable td:nth-child(3),
.ghtable th:nth-child(2),
.ghtable th:nth-child(3) {
    text-align: center;
    width: 60px;
}

.ghtable a {
    color: #58a6ff;
    text-decoration: none;
}

.ghtable a:hover {
    text-decoration: underline;
}

.ghbadge {
    display: inline-block;
    min-width: 28px;
    padding: 4px 10px;
    border-radius: 999px;
    font-weight: 700;
    color: white;
}

.ghbadge.ghissue {
    background: #238636;
}

.ghbadge.ghpr {
    background: #8957e5;
}

.ghtable tbody tr:last-child td {
    border-bottom: none;
}

.ghstatus {
    margin-top: 10px;
    color: #8b949e;
    font-size: 12px;
    font-family: system-ui;
}

@media (max-width: 600px) {

    .ghtable {
        font-size: 13px;
    }

    .ghtable td,
    .ghtable th {
        padding: 10px;
    }

}
</style>

<table class="ghtable">
    <thead>
        <tr>
            <th>Repository</th>
            <th>Issues</th>
            <th>PRs</th>
        </tr>
    </thead>
<tbody id="ghRepoTableBody">
</tbody>

</table>

<div
    id="ghRepoStatus"
    class="ghstatus">

    Lade GitHub-Daten …

</div>

<script>

const repos =
    <%- JSON.stringify(repos) %>;

const refreshIntervalMs =
    <%= refreshMinutes %> * 60 * 1000;

const token = "<%= token %>"

const tableBody =
    document.getElementById(
        "ghRepoTableBody"
    );

const statusElement =
    document.getElementById(
        "ghRepoStatus"
    );

let refreshTimer =
    null;

let stopped =
    false;

async function getCount(
    repo,
    type
) {

    const query =
        "repo:" +
        repo +
        " type:" +
        type +
        " state:open";

    const headers =
    {
        Accept:
            "application/vnd.github+json"
    };

    if (token) {
        headers.Authorization =
            `Bearer ${
                token
            }`;
    }

    const response =
        await fetch(
            "https://api.github.com/search/issues?q=" +
            encodeURIComponent(query),
            {
                headers
            }
        );

    const data =
        await response.json();

    if (
        !response.ok
    ) {

        throw new Error(
            response.status +
            ": " +
            data.message
        );

    }

    return (
        data.total_count
    );

}

async function getRepoStats(
    repo
) {

    const counts =
        await Promise.all([
            getCount(
                repo,
                "issue"
            ),

            getCount(
                repo,
                "pr"
            )
        ]);

    return {
        repo:
            repo,

        openIssues:
            counts[0],

        openPRs:
            counts[1]
    };

}

function renderTable(
    results
) {

    tableBody.innerHTML =
        "";

    results.forEach(
        function (
            result
        ) {

            const row =
                document.createElement(
                    "tr"
                );

            row.innerHTML =
                '<td>' +
                '<a target="_blank" href="https://github.com/' +
                result.repo +
                '">' +
                result.repo +
                '</a>' +
                '</td>' +

                '<td>' +
                '<a target="_blank" href="https://github.com/' +
                result.repo +
                '/issues">' +
                '<span class="ghbadge ghissue">' +
                result.openIssues +
                '</span>' +
                '</a>' +
                '</td>' +

                '<td>' +
                '<a target="_blank" href="https://github.com/' +
                result.repo +
                '/pulls">' +
                '<span class="ghbadge ghpr">' +
                result.openPRs +
                '</span>' +
                '</a>' +
                '</td>';

            tableBody.appendChild(
                row
            );

        }
    );

}

async function refreshLoop() {

    if (
        stopped
    ) {
        return;
    }

    try {

        statusElement.textContent =
            "Aktualisiere GitHub-Daten …";

        const results =
            await Promise.all(
                repos.map(
                    getRepoStats
                )
            );

        renderTable(
            results
        );

        statusElement.textContent =
            "Zuletzt aktualisiert: " +
            new Date()
                .toLocaleString();

    }

    catch (
        error
    ) {

        console.error(
            error
        );

        statusElement.textContent =
            "Fehler: " +
            error.message;

    }

    finally {

        if (
            !stopped
        ) {

            refreshTimer =
                setTimeout(
                    refreshLoop,
                    refreshIntervalMs
                );

        }

    }

}

refreshLoop();

window.addEventListener(
    "beforeunload",

    function () {

        stopped =
            true;

        if (
            refreshTimer
        ) {

            clearTimeout(
                refreshTimer
            );

        }

    }
);

</script>

```

</details>

---

##### **Автоматическое обновление**

Виджет автоматически обновляется через заданный интервал времени.

```javascript
const refreshMinutes = 60;
```

Обновление осуществляется рекурсивно.`setTimeout()` вместо`setInterval()` .

Преимущества:

- Предотвращает наложение запросов.
- Предотвращает ненужный рост объема памяти.
- Гарантирует, что следующее обновление начнётся только после его завершения.
- Лучше подходит для длительно работающих панелей мониторинга.

---

##### **Использование API GitHub**

В данной реализации используется общедоступный API поиска GitHub.

Нерешенные вопросы:

```text
repo:{owner}/{repo} type:issue state:open
```

Открытые запросы на слияние:

```text
repo:{owner}/{repo} type:pr state:open
```

Пример запроса:

```text
https://api.github.com/search/issues?q=repo:oweitman/ioBroker.pi-hole2+type:issue+state:open
```

Обычно для доступа к публичным репозиториям не требуется токен GitHub.

Обратите внимание, что для доступа к публичному API количество запросов в час ограничено 60. Шаблон требует 2 запроса к API на каждый репозиторий. Для более сложных запросов следует добавить аутентификацию.

Чтобы получить токен доступа к GitHub, выполните следующие действия:

1. Войдите в GitHub
2. Нажмите на свою фотографию профиля в правом верхнем углу → **Настройки**
3. Прокрутите вниз влево → **Настройки разработчика**
4. Открыть **персональные токены доступа**
5. Выберите **токены (классический вариант)**
6. Нажмите **«Сгенерировать новый токен».**
7. Выберите дату истечения срока действия
8. Настройте необходимые права доступа: public\_repo
9. Сгенерируйте токен и немедленно скопируйте его (он будет показан только один раз).

---

##### **Пояснение к коду**

###### **Структура шаблона**

| Раздел                   | Описание                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| Конфигурация репозитория | Определяет репозитории для отображения.                                                    |
| Обновить конфигурацию    | Определяет интервал автоматического обновления                                             |
| getCount()               | Запрос к API GitHub для получения информации о количестве проблем или запросов на слияние. |
| getRepoStats()           | Собирает данные о количестве выпусков и публикаций в СМИ.                                  |
| renderTable()            | Создает и обновляет строки таблицы.                                                        |
| refreshLoop()            | Обрабатывает автоматические обновления с помощью`setTimeout()`                             |
| Отображение состояния    | Отображает текущее состояние обновления.                                                   |
| Работник по уборке       | При загрузке страницы отменяется запланированное обновление.                               |

---

##### **Примечания**

- Работает только с общедоступными репозиториями.
- На GitHub действуют ограничения на количество запросов, отправленных без аутентификации.
- В названиях репозиториев должны быть указаны как владелец, так и сам репозиторий.
- Подходит для создания панелей мониторинга и представлений в`ioBroker VIS`