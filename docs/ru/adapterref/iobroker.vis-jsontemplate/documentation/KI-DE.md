---
chapters: {"pages":{"en/adapterref/iobroker.vis-jsontemplate/README.md":{"title":{"en":"JSONTemplate - Adapter to visualize JSON data and other data in Vis/Vis2"},"content":"en/adapterref/iobroker.vis-jsontemplate/README.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-asynccall.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-loadingscripts.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-public-transport.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-simplegauge.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-githubissues.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/usecase-fritzbox-call-list.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md":{"title":{"en":"Creating Templates with AI"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/AI-EN.md"},"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md":{"title":{"en":"Templates mit KI erstellen"},"content":"en/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.vis-jsontemplate/documentation/KI-DE.md
title: Templates mit KI erstellen
hash: z++MvH4ocYNUaXKx27dmF+eJsGiEhrAah0+Ncpu/c2k=
---
# Templates mit KI erstellen

Адаптер _ioBroker.vis-jsontemplate_ содержит данные JSON в VIS или VIS-2 с различными шаблонами. Этот шаблон может содержать HTML, CSS, JavaScript и дополнительные возможности EJS.

Eine KI kann beim Erstellen solcher Templates helfen. Entscheidend ist, dass die Anforderungen möglichst konkret beschrieben werden.

## Какая информация полезна для KI?

Ergänze im Prompt möglichst diese Bestandteile:

### 1. Aufgabe

Beschreibe kurz, было dargestellt werden soll.

Примеры:

- Wetterdaten als Karten
- eine Geräteliste als Tabelle
- Termine als Liste
- Данные датчиков в виде панели мониторинга

### 2. Beispieldaten

Füge ein möglichst Realistisches Beispiel des JSON-Datenpunkts ein.

```json
{
    "devices": [
        {
            "name": "Wohnzimmer",
            "temperature": 22.4,
            "online": true
        }
    ]
}
```

Ohne Beispieldaten muss die KI die Datenstruktur erraten.

### 3. Gewünschte Darstellung

Beschreibe das Layout и die wichtigsten Inhalte.

Примеры:

- адаптивные карты
- Tabelle mit drei Spalten
- große Temperaturanzeige
- Online-Geräte grün, Offline-Geräte grau
- для смартфонов и планшетов

### 4. Функции

Beschreibe, ob das Template nur Daten anzeigen или auch Aktionen ermöglichen soll.

Примеры:

- Список фильтров
- Einträge sortieren
- Schaltfläche anzeigen
- Datenpunkt или вызов vis.setValue()
- Daten über einen Адаптер abrufen

### 5. Technische Vorgaben

Die KI sollte folgende Regeln Beachten:

- Das Template verwendet EJS.
- Метод обработки JSON в переменной`data` .
- Zusätzliche Datenpunkte stehen в`dp` .
- JavaScript-Ausgaben erfolgen beispielsweise mit`<%- data.value %>` .
- Schleifen und Bedingungen Stehen в`<% ... %>` .
- Используйте функцию Zugriff, а также необязательно, чтобы можно было использовать или использовать массивы.
- VIS интерпретатор`{...}` innerhalb einer Zeile als Datenpunkt-Binding. Deshalb durfen öffnende und schließende geschweifte Klammern mit beliebigem Inhalt dazwischen niemals in derselben Zeile stehen. Schreibe sie immer в getrennte Zeilen. Лир Кламмерн (англ.`{}` ) sind erlaubt.
- Что такое количественное выражение регулярных выражений?`{2}` ,`{1,2}` Одер`{4}` . Schreibe sie stattdessen ohne geschweifte Klammern, z. Б.`\d{2}` →`\d\d` ,`\d{1,2}` →`\d\d?` ,`\d{4}` →`\d\d\d\d` .
- `setInterval()` darf nicht verwendet werden.
- Bei wiederholten Abläufen soll stattdessen`setTimeout()` eingesetzt werden.
- Das Ergebnis работает прямо в das Feld`json_template` kopierbar sein.
- Когда данные в EJS-шаблоне используются для клиентского JavaScript, они будут загружены, а данные не будут сериализованы. Verwende stattdessen eine globale Variable im`window` -Namensraum und wähle einen möglichst eindeutigen Variablennamen, um Konflikte mit anderen Skripten zu vermeiden.

## Vorlage für einen KI-Prompt

Kopiere den folgenden Prompt und ersetze die Texte in eckigen Klammern.

```text
Erstelle ein vollständiges Template für das ioBroker-Widget
„JSON Template“ aus dem Adapter vis-jsontemplate.

AUFGABE
[Beschreibe, was angezeigt werden soll.]

JSON-BEISPIEL

[Hier die vollständigen Beispieldaten einfügen.]


DARSTELLUNG
[Beschreibe Layout, Farben, Größen und gewünschte Elemente.]

FUNKTIONEN
[Beschreibe Filter, Sortierung, Schaltflächen oder andere Funktionen.
Falls keine Interaktion erforderlich ist, schreibe: Nur Anzeige.]

### TECHNISCHE VORGABEN

- Verwende HTML, CSS, JavaScript und EJS nur soweit erforderlich.
- Die JSON-Daten befinden sich in der Variable `data`.
- Verwende `<%- ... %>` für die Ausgabe von Werten.
- Verwende `<% ... %>` für Schleifen und Bedingungen.
- Prüfe vor dem Zugriff, ob optionale Werte oder Arrays vorhanden sind.
- Verwende keine externen Bibliotheken.
- Verwende kein `setInterval()`.
- VIS interpretiert `{...}` innerhalb einer Zeile als Datenpunkt-Binding.
  Deshalb dürfen öffnende und schließende geschweifte Klammern mit beliebigem
  Inhalt dazwischen niemals in derselben Zeile stehen. Schreibe sie immer in
  getrennte Zeilen. Leere Klammern (`{}`) sind erlaubt.
- Verwende keine Regex-Quantifizierer wie `{2}`, `{1,2}` oder `{4}`.
  Schreibe sie stattdessen ohne geschweifte Klammern, z. B.
  `\d{2}` → `\d\d`,
  `\d{1,2}` → `\d\d?`,
  `\d{4}` → `\d\d\d\d`.
- Begrenze CSS und JavaScript auf dieses Widget. Nutze dazu die Widget-ID
  `#<%- widgetid %>`.
- Das Ergebnis muss direkt in das Feld `json_template` eingefügt werden können.
- Wenn Daten von einem EJS-Template an das clientseitige JavaScript übergeben
  werden sollen, sollten die Daten nicht serialisiert werden.
  Verwende stattdessen eine globale Variable im `window`-Namensraum und wähle
  einen möglichst eindeutigen Variablennamen, um Konflikte mit anderen Skripten
  zu vermeiden.

AUSGABEFORMAT

1. Gib zuerst ausschließlich das vollständige Template in einem Codeblock aus.
2. Erkläre danach kurz die wichtigsten Bereiche.
3. Nenne anschließend die erforderlichen Widget-Einstellungen und zusätzlichen
   Datenpunkte.
4. Erfinde keine Felder, die nicht im JSON-Beispiel enthalten sind.
```

## Beispielprompt

Beispiele verchiedener KI-Anbieter:

![КИ Beispiele](../../../../en/adapterref/iobroker.vis-jsontemplate/documentation/ai-examples.png)

```text
Erstelle ein vollständiges Template für das ioBroker-Widget
„JSON Template“ aus dem Adapter vis-jsontemplate.

### AUFGABE
Zeige eine Liste von Räumen mit Temperatur und Onlinestatus an.

### JSON-BEISPIEL

{
  "devices": [
    {
      "name": "Wohnzimmer",
      "temperature": 22.4,
      "online": true
    },
    {
      "name": "Schlafzimmer",
      "temperature": 19.8,
      "online": false
    }
  ]
}

### DARSTELLUNG

Jeder Raum soll als kompakte Karte dargestellt werden. Der Raumname steht
oben, die Temperatur groß darunter. Online-Geräte erhalten einen grünen
Statuspunkt, Offline-Geräte einen grauen Statuspunkt. Die Karten sollen sich
automatisch an die verfügbare Breite anpassen.

### FUNKTIONEN

Nur Anzeige.

### TECHNISCHE VORGABEN

- Verwende HTML, CSS, JavaScript und EJS nur soweit erforderlich.
- Die JSON-Daten befinden sich in der Variable `data`.
- Verwende `<%- ... %>` für die Ausgabe von Werten.
- Verwende `<% ... %>` für Schleifen und Bedingungen.
- Prüfe, ob `data.devices` vorhanden und ein Array ist.
- Zeige bei fehlenden Daten den Text „Keine Gerätedaten vorhanden“.
- Verwende keine externen Bibliotheken.
- Verwende kein `setInterval()`.
- VIS interpretiert `{...}` innerhalb einer Zeile als Datenpunkt-Binding.
  Deshalb dürfen öffnende und schließende geschweifte Klammern mit beliebigem
  Inhalt dazwischen niemals in derselben Zeile stehen. Schreibe sie immer in
  getrennte Zeilen. Leere Klammern (`{}`) sind erlaubt.
- Verwende keine Regex-Quantifizierer wie `{2}`, `{1,2}` oder `{4}`.
  Schreibe sie stattdessen ohne geschweifte Klammern, z. B.
  `\d{2}` → `\d\d`,
  `\d{1,2}` → `\d\d?`,
  `\d{4}` → `\d\d\d\d`.
- Begrenze das CSS auf `#<%- widgetid %>`.
- Das Ergebnis muss direkt in das Feld `json_template` eingefügt werden können.
- Wenn Daten von einem EJS-Template an das clientseitige JavaScript übergeben
  werden sollen, sollten die Daten nicht serialisiert werden.
  Verwende stattdessen eine globale Variable im `window`-Namensraum und wähle
  einen möglichst eindeutigen Variablennamen, um Konflikte mit anderen Skripten
  zu vermeiden.

### AUSGABEFORMAT

1. Vollständiges Template in einem Codeblock
2. Kurze Erklärung
3. Erforderliche Widget-Einstellungen
```

## Erklärung des Beispielподсказки

### Aufgabe

Dieser Abschnitt gibt der KI das fachliche Ziel vor. Если у вас есть соответствующая информация.

### Пример JSON

Das Beispiel определяет tatsächliche Datenstruktur. Die KI erkennt dadurch, dass sie über data.devices iterieren und beispielsweise auf device.name zugreifen muss.

### Дарстеллунг

Hier werden Layout и Visual Regeln beschrieben. Je konkreter dieser Abschnitt ist, desto weniger muss die KI gestalterische Annahmen treffen.

### Функции

Dieser Abschnitt trennt eine reine Anzeige von einem interaktiven Template. Интерактивные функции помогают использовать JavaScript и использовать их при работе с датами.

### Technische Vorgaben

Diese Regeln verhindern typische Fehler в VIS и адаптере. Чтобы изменить настройки EJS-тегов, получить CSS-коды и настройки в setInterval().

### Формат Ausgabe

Если вы хотите, чтобы KI zuerst einen direkt einsetzbaren Codeblock Lifert und ergänzende Erklärungen davon trennt, вы должны использовать кодовый блок.

## Hinweise zur Prüfung

KI-generierter Code sollte vor dem produktiven Einsatz geprüft werden:

- Стимулировать все поля ввода с JSON-Datenpunkt überein?
- Werden fehlende или leere Werte abgefangen?
- Начинается ли использование CSS в актуальном виджете?
- Werden keine nicht vorhandenen Datenpunkte oder Funktionen vorausgesetzt?
- Ввести код в setInterval()?
- Функционально ли шаблон может быть использован для редактирования?

Если вы не хотите, чтобы ваш шаблон работал, этот шаблон не работает. Hilfreicher sind die konkrete Fehlermeldung, die tatsächlichen JSON-Daten und das bisher erzeugte Template.