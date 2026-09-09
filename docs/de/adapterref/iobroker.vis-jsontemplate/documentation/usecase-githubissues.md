---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md
title: kein Titel
hash: uWODm+D0xCzEIjFY5UDLaMiiHCl4cHHks2cu3U/fvWY=
---
#### Anwendungsfall zur Anzeige von GitHub-Issues und Pull Requests

##### **Einführung**

Dieser Anwendungsfall beschreibt, wie die Anzahl offener GitHub-Issues und Pull Requests (PRs) für ein oder mehrere GitHub-Repositories angezeigt werden kann.`ioBroker VIS` Die

Die Implementierung verwendet die`JSONTemplate` Das Widget ruft Repository-Statistiken direkt von der öffentlichen GitHub-API ab, ohne dass eine Authentifizierung erforderlich ist.

Um die Anzahl der API-Anfragen zu reduzieren, aktualisiert sich das Widget automatisch nach einem konfigurierbaren Intervall.

![Widget](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/img/githubissues.png)

---

##### **GitHub-Repository-Konfiguration**

Zuerst müssen die zu überwachenden Repositories definiert werden.

Jedes Repository muss folgendes Format aufweisen:

```text
owner/repository
```

Beispiel:

```text
oweitman/ioBroker.vis-jsontemplate
```

###### **Repository-Konfiguration**

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

##### **Integration in VIS**

Platziere die`JSONTemplate` Widget und fügen Sie die folgende Vorlage ein.

###### **Vorlagencode**

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

##### **Automatische Aktualisierung**

Das Widget aktualisiert sich automatisch nach dem konfigurierten Intervall.

```javascript
const refreshMinutes = 60;
```

Die Aktualisierung verwendet rekursive`setTimeout()` anstatt`setInterval()` Die

Vorteile:

- Verhindert sich überschneidende Anfragen
- Vermeidet unnötiges Speicherwachstum
- Stellt sicher, dass die nächste Aktualisierung erst nach Abschluss startet.
- Besser geeignet für Dashboards mit langer Laufzeit

---

##### **GitHub-API-Nutzung**

Die Implementierung nutzt die öffentliche GitHub-Such-API.

Offene Fragen:

```text
repo:{owner}/{repo} type:issue state:open
```

Offene Pull-Anfragen:

```text
repo:{owner}/{repo} type:pr state:open
```

Beispielanfrage:

```text
https://api.github.com/search/issues?q=repo:oweitman/ioBroker.pi-hole2+type:issue+state:open
```

Normalerweise ist für öffentliche Repositories kein GitHub-Token erforderlich.

Bitte beachten Sie, dass die Anzahl der Anfragen pro Stunde für den öffentlichen API-Zugriff auf 60 begrenzt ist. Die Vorlage erfordert 2 API-Anfragen pro Repository. Für umfangreichere Abfragen muss eine Authentifizierung hinzugefügt werden.

Um ein GitHub-Zugriffstoken zu erhalten, folgen Sie diesen Schritten:

1. Bei GitHub anmelden
2. Klicken Sie oben rechts auf Ihr Profilbild → **Einstellungen**
3. Links nach unten scrollen → **Entwicklereinstellungen**
4. Offene **persönliche Zugriffstoken**
5. **Spielsteine auswählen (klassisch)**
6. Klicken Sie auf **„Neues Token generieren“** .
7. Wählen Sie ein Ablaufdatum
8. Konfigurieren Sie die erforderlichen Berechtigungen: public\_repo
9. Generieren Sie das Token und kopieren Sie es sofort (es wird nur einmal angezeigt).

---

##### **Code-Erklärung**

###### **Vorlagenstruktur**

| Abschnitt                    | Beschreibung                                                           |
| ---------------------------- | ---------------------------------------------------------------------- |
| Repository-Konfiguration     | Definiert die anzuzeigenden Repositories.                              |
| Aktualisierungskonfiguration | Definiert das automatische Aktualisierungsintervall                    |
| getCount()                   | Fragt die GitHub-API nach der Anzahl von Issues oder Pull Requests ab. |
| getRepoStats()               | Erfasst Ausgabe- und PR-Zahlen                                         |
| renderTable()                | Erstellt und aktualisiert Tabellenzeilen                               |
| refreshLoop()                | Verarbeitet automatische Aktualisierungen mithilfe von`setTimeout()`   |
| Statusanzeige                | Zeigt den aktuellen Aktualisierungsstatus an                           |
| Aufräumhelfer                | Löscht geplante Aktualisierungen beim Seitenaufruf                     |

---

##### **Anmerkungen**

- Funktioniert nur mit öffentlichen Repositories
- Für nicht authentifizierte Anfragen gelten die Ratenbegrenzungen von GitHub.
- Repository-Namen müssen sowohl den Eigentümer als auch das Repository enthalten.
- Geeignet für Dashboards und Überwachungsansichten in`ioBroker VIS`