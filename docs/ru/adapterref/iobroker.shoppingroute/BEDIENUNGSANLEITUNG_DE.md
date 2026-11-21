---
chapters: {"pages":{"en/adapterref/iobroker.shoppingroute/README.md":{"title":{"en":"ShoppingRoute for ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README.md"},"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md":{"title":{"en":"ShoppingRoute – User Guide"},"content":"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md"},"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md":{"title":{"en":"ShoppingRoute – Bedienungsanleitung"},"content":"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md"},"en/adapterref/iobroker.shoppingroute/README_DE.md":{"title":{"en":"ShoppingRoute für ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md
title: ShoppingRoute - Bedienungsanleitung
hash: fHD6REIzoYqEsRGG2d4w4za0guAoTThOo2+7hcwodRM=
---
# ShoppingRoute – Bedienungsanleitung

**Bedienungsanleitung für ShoppingRoute 0.6.3 (20.11.2026)**

**Новое в версии 0.6.3:** Die Einkaufslistenansicht zeigt den aktuellen bestätigten Alexa-Listenstand statt veralteter Browserdaten. Abgehakte oder gelöschte Artikel tauchen nach dem Neuladen nicht erneut auf. Noch gültige lokale Verschiebungen werden an die aktuelle Liste angepasst; bei einem Abruffehler erscheint eine Fehlermeldung statt eines veralteten Listenstands. Außerdem stellt ShoppingRoute einen lesenden Hilfeaufruf für Skripte und KI-Agenten bereit.

### Nachrichten für Skripte und KI-Agenten

Der Aufruf `sendTo('shoppingroute.0', 'help', {}, response => ...)` liefert ein Objekt mit `help` (englische Beschreibung der Schnittstelle) и `commands` (Liste aller unterstützten Nachrichtennamen). Дер Эйнтраг `write: true` bezeichnet einen potenziell verändernden Befehl, `write: false` einen lesenden Befehl. Ein KI-Agent может дать умереть Nachrichtenformate vor der Nutzung ermitteln. Выполните прослушивание или настройку конфигурации, если это необходимо. Пробный запуск, статус активации, лучшие настройки и настройка Amazon-Schreiblimits bleiben aktiv. Дер `help` -Befehl allein verursacht keine Listenänderung.

**Версия 0.6.2: Проверка** ioBroker-Testabhängigkeit для актуальной версии 6.3.2 (Repo-Checker W0037, выпуск № 85). Die bisherigen Alexa-/Bring!-Funktionen und Schutzmechanismen bleiben erhalten.

ShoppingRoute hilft dir dabei, eine Alexa-Einkaufsliste so zu ordnen, wie du tatsächlich einkaufst.

**Новая версия 0.6.1:** ShoppingRoute настроена на лучшие возможности для поиска! - и Alexa-Listen jetzt ereignisgesteuert. Die zusätzliche ShoppingRoute-Wartezeit von bisher bis zu 90 Sekunden entfällt; Также зарезервируйте все 30 секунд для контроля. Предлагаемая статья была найдена в лучших предложениях по использованию. Алекса-Шрайбсперрен bleiben erhalten. В журнале ioBroker-Log есть предупреждения для оптимизации и изменения тайм-аутов без просмотра журнала.

**Wichtig: Diese Wartezeit kann ShoppingRoute nicht beeinflussen.** Отдельный адаптер ioBroker-Adapter Bring! 1.9.1 fragt die Bring!-Cloud в einem eigenen Intervall von ungefähr **90 Sekunden** ab. **ШоппингRoute kann diesen Abruf weder beschleunigen noch vorzeitig auslösen.** Приложение «Ein in der Bring!-App» или дополнительная статья используется для покупок «Route» раньше, чем вы начнете актуализировать Durch Den Bring!-Adapter; Netzwerk- или Cloud-Verzögerungen können hinzukommen. Сначала необходимо получить доступ к подписке ShoppingRoute 0.6.1. 30-секундное восстановление от ShoppingRoute **не** должно превышать 90 секунд для адаптеров Bring!.

**Откройте версию 0.6.1:** Wird während der Bestätigung einer älteren Bring!/Alexa-Übertragung ein weiterer Artikel in Bring! abgehakt, prüft ShoppingRoute die ursprünglichen Schreibvorgänge einzeln. Sobald diese vollständig bestätigt sind, verarbeitet es die spätere Erledigung im nächsten Abgleich, ohne den erledigten Artikel in Bring! видергерцустеллен. Никогда не используйте лучший способ приготовления. При выборе параметров и тайм-аутов в журнале ioBroker-Log вы можете просмотреть журнал, который будет заполнен опросом. Проблемы с синхронизацией умирают Datenpunkte `shoppingroute.0.info.bringSyncStatus` унд `shoppingroute.0.data.bringSyncJournal` прюфен; das Journal nur nach Sicherung und Abgleich beider Слушайте исправления.

## Принесите!-Слушайте в ShoppingRoute 0.6.0 einbinden

Новые функции Bring! являются дополнительными и стандартными.

**Дополнительные сведения:** **«Мгновенный переход» → «Маршрут покупок» → «Bring!-Integration»** для установки «Bring!-Instanz und speicherst». Danach wählst du deine Bring!-Einkaufsliste aus. Для работы с Alexa необходимо настроить Alexa-Einkaufsliste. Belasse zunächst **Dry-Run** eingeschaltet.

Вы должны vier Betriebsarten zur Auswahl:

1. **Авт.:** Alexa работает в версии 0.5.3.
2. **Приносить! → Alexa:** Die Bring!-Liste Liefert die Artikel. Новая статья была добавлена в Alexa weitergegeben; anschließend bei Bring! Если вы хотите синхронизировать статью, она также будет работать с Alexa. Ergänzungen, die nur bei Alexa vorhanden sind, bleiben dort.
3. **Nur Bring!:** Alexa wird nicht benötigt. Öffne die **Einkaufsliste** in der ShoppingRoute-Verwaltung, um die Bring!-Artikel nach deinen Märkten und Laufwegen sortiert anzusehen. Bearbeiten kannst du sie weiterhin direkt in Bring!.
4. **Приносить! ↔ Alexa:** Beide Apps Nuzen DentalBen Artikelbestand. Hinzufügen und Erledigen werden nach dem ersten Abgleich in beide Richtungen übertragen.

**Beim ersten Abgleich werden bestehende Artikel nur ergänzt, niemals gelöscht.** Das betrifft ausdrücklich auch unterschiedliche Artikel in beiden Listen.

### Alexa ohne Bring!-Skill verwenden

Bei eingeschaltetem Modus **Bring! ↔ Alexa** reicht dienormale Spracheingabe **«Alexa, Milch auf die Einkaufsliste»** . Der Artikel Landet Zunächst в der Alexa-Liste; ShoppingRoute sortiert nach deinen Markt- und Laufwegregeln und übernimmt ihn beim nächsten bestätigten Abgleich in Bring!. Den langen Aufruf **«Алекса, мудрец, принеси!…»** brauchst du für diesen Ablauf nicht mehr. Erledigst du Milch anschließend в Bring!, Entfernt ShoppingRoute den gespiegelten Eintrag aus der aktiven Alexa-Liste. Конечно, это технический аспект, но он не может быть определен как маркёрт. Если вы работаете в режиме Verbindung funktioniert und keine Sicherheits- или Konfliktsperre Greeift, то это может привести к неприятным последствиям.

Приносить! selbst sortiert Artikel nach seinen eigenen Produktkategorien. Die App unterstützt **keine frei vorgegebene Reihenfolge einzelner Artikel** . Индивидуальный ShoppingRoute-Laufwege siehst du daher auf der ShoppingRoute-Verwaltungsseite beziehungsweise в Alexa. В приложении Bring!-App вы можете получить доступ к собственной категории вручную.

### Wichtig für den sicheren Betrieb

- **Воспользуйтесь функцией ShoppingRoute:** Отдельный адаптер Bring!-Adapter Fragt Seine Cloud-Liste Normalerweise ungefähr alle **90 Sekunden** ab. ШоппингRoute kann dieses Intervall nicht verkürzen. Sobald ein aktualisierter Listenstand im ioBroker ankommt, wird ShoppingRoute ereignisgesteuert aktiv; собственное Rückfallprüfung рассчитано на 30 секунд.
- Bei gleichen Artikelnamen mit unterschiedlichen Mengen/Beschreibungen или bei mehrfachen Artikeln wird nichts erraten. Der Abgleich остановился и разрешил конфликт.
- Werden Daten nicht rechtzeitig bestätigt, bleibt ein Wiederherstellungsjournal bestehen und weitere Schreibvorgänge werden blockiert. Vor einem Zurücksetzen des Journals müssen **beide Listen manuell geprüft** werden.
- Bei Dry-Run werden weder Принесите! Ночь Алекса бесшрибен.
- Die Statusmeldung steht unter `shoppingroute.0.info.bringSyncStatus`; die berechnete Bring!-Route unter `shoppingroute.0.info.bringSyncPreview`.

**Praxistest (26.10.2026):** Vorhandene Bring!-Listen und neu in Bring! hinzugefügte Artikel werden in ShoppingRoute übernommen und beim nächsten Sortierlauf entsprechend den Markt- und Laufwegregeln eingeordnet. Приложение Die Bring!-App будет бесплатным для сортировки ваших статей. Автоматические тесты для синхронизации и конфликтов. Nicht durch diesen Praxistest bestätigt sind sämtliche Erledigungs-, Lösch- und Konfliktfälle bei bidirektionalem Live-Abgleich. Diesen Modus zuerst mit Gesicherten Testlisten verwenden.

## Новое в версии 0.5.3: прямой доступ к Alexa-App

**Вы хотите узнать, есть ли у вас Angebot и хотите ли вы найти Einkaufsliste ändern? Это будет прямой рейс к Handy.** Вы можете использовать обычное приложение Alexa.

### Шаг 1: Käse Heute Liber bei LIDL kaufen

Дополнительный список сведений:

```text
25> Käse
```

Eigentlich kaufst du Käse bei ALDI. Heute is aber bei LIDL im Angebot.

**Итак, вот:** Tippe in der Alexa-Einkaufsliste auf **Eintrag hinzufügen** und schreibe:

```text
25WLIDL
```

**Фертиг.** ShoppingRoute verschebt den Käse für **diesen Einkauf** zu LIDL. Beim nächsten Einkauf wird er Wieder seinem Normalen Markt zugeordnet.

### Действие 2: Как погрузиться в LIDL kaufen

Вы хотите проверить качество LIDL? Данн füge stattdessen diesen Eintrag hinzu:

```text
25FLIDL
```

**Der Unterschied:** **W** gilt nur für diesen Einkauf. **F** merkt sich LIDL dauerhaft für diesen Artikel.

### Часть 3: Статья в списке, находящемся на шее

Назовите список в LIDL так:

```text
10> Gurken
20> Bananen
25> Käse
30> Milch
40> Butter
```

Вы можете протестировать Käse **zwei Plätze weiter oben** haben. Füge diesen Eintrag hinzu:

```text
25H2
```

Danach steht Käse vor Gurken und Bananen:

```text
Käse
Gurken
Bananen
Milch
Butter
```

Möchtest du Käse stattdessen **zwei Plätze nach unten** schieben, verwendest du:

```text
25R2
```

**H = хох, R = бегун.** Если статья не закрыта, она не может быть отключена от номера. Ein Artikel bleibt immer in seinem Markt; an der ersten oder letzten Stelle ist Schluss. Deine festgelegten Laufwege und Produktgruppen werden dadurch nicht geändert.

### Das solltest du wissen

**Die Nummer ist nur ein Beispiel.** Schau vor jedem Befehl nach, welche **zweistellige Number gerade vor deinem Artikel** steht. Bei einem anderen Einkauf kann Käse eine andere Nummer haben. Номера для Marktüberschriften не должны быть указаны в Artikelnummern.

Вы можете быть **более внимательны** в этом списке. Groß- und Kleinschreibung ist egal: `25wlidl` гениальный функционал. Кляйне, eindeutig erkennbare Tippfehler bei Marktnamen werden korrigiert.

**Bitte nicht ungeduldig werden:** ShoppingRoute sortiert **nicht sofort** . Я нахожусь в Интернете и Alexa может быть занят **в течение нескольких минут** . Соланж дер Бефель сегодня в дер Листе, это в первую очередь нормально. Nach erfolgreicher Verarbeitung verschwindet er autotisch.

**Steht der Befehl nach fünf Minuten immer noch da?** Prüfe die Internet-/Alexa-Verbindung und ob Nummer, Buchstabe und Markt richtig sind. Einen falschen Befehl einfach **abhaken und neu eingeben** . Когда ShoppingRoute einen Befehl nicht eindeutig versteht, lässt es ihn stehen, statt den falschen Artikel zu verschieben.

**Vier Funktionen, драгоценности на немецком или английском языке:** `W/C` (Wechsel/Change), `F/E` (Фест/Эвер), `H/U` (Hoch/Up) und `R/D` (Бегущий/Вниз). Зум Бейшпиль Синд `25WLIDL` унд `25CLIDL` gleichwertig. Для большего удобства `25FLIDL` Одер `25ELIDL`. `25D2` bedeutet **zwei Plätze nach unten** , nicht dauerhaft wechseln.

## Warum ShoppingRoute beim Einkaufen wirklich hilft

Der größte Vorteil ist nicht einfach nur eine «sortierte Liste», кажется, что ShoppingRoute deine **echten Einkaufsgewohnheiten** abbildet.

### Alle Märkte in einer einzigen Liste – oder bewusst getrennt

Вы можете сделать **все возможное, чтобы получить больше информации в своем списке Alexa-Liste** . ШоппингRoute trennt die Artikel trotzdem autotisch nach Markt.

Пример:

**ЛИДЛ**

- Бананен
- Молоко
- Йогурт

**РЕВЕ**

- веганы Хак
- Оливен

**Аптека**

- Таблетки для снятия боли в голове

Так что musst du nicht ständig zwischen mehreren Listen wechseln.

Wenn du Liber getrennte Слушайте verwendest, geht das ebenfalls. Вы можете написать список для Lebensmittel и написать письмо для Baumarkt или Apotheke verwenden. ШоппингRoute unterstützt **beide Arbeitsweisen** .

### Das Besondere: dein eigener Laufweg durch jeden Markt

Der wichtigste Unterschied zu einer Normalen Einkaufsliste ist das **Marktrouting** .

Für jeden Markt legt du selbst fest, в welcher Reihenfolge du durch die Abteilungen gehst.

Когда вы LIDL используете Obst und Gemüse vorbeikommst, danach an Brot, dann an Fleisch, Milchprodukten und zuletzt an Tiefkühlware, kannst du genau diesen Weg hinterlegen.

ShoppingRoute sortiert deine Artikel anschließend passend zu **deinem persönlichen Laufweg** .

Das bedeutet beim Einkauf:

- weniger Zurücklaufen,
- weniger Suchen,
- weniger vergessen,
- eine ruhigere, übersichtlichere Einkaufsliste,
- и для всех: **шнеллеры и эффективные айнкауфены** .

Jeder Markt cann dabei einen völlig anderen Laufweg haben, weil ein REWE anders aufgebaut ist als ein LIDL or ALDI. Genau das bildet ShoppingRoute ab.

Statt einer langen unsortierten Liste wie:

- Молоко
- Шраубен
- Бананен
- Йогурт
- Томатен

kann ShoppingRoute daraus zum Beispiel machen:

**ЛИДЛ**

- Бананен
- Томатен
- Молоко
- Йогурт

**БАУМАРКТ**

- Шраубен

Вы должны запрограммировать ночную техническую подсветку в заднем дворе.

---

## 1. Das Wichtigste zuerst

Wenn du ShoppingRoute neu einrichtest, brauchst du im Grunde nur fünf Dinge:

1. свои функции **Alexa2-Instanz** в ioBroker,
2. Mindestens eine Alexa-Einkaufsliste,
3. deine Märkte, zum Beispiel **LIDL** , **ALDI** или **REWE** ,
4. Produktgruppen wie **Obst/Gemüse** , **Milchprodukte** или **Getränke** ,
5. die Reihenfolge, in der du durch den jeweiligen Markt läufst.

Danach übernimmt ShoppingRoute die Sortierung.

### Eine wichtige Einstellung в Alexa-App

Откройте Einkaufsliste в Alexa-App и выберите сортировку по **A–Z** .

Если вы хотите получить выгоду, это очень важно, когда вы покупаете маршрут по алфавитной сортировке, где есть gewünschte Reihenfolge abzubilden.

Вы должны ничего не делать, если это техническая функция.

### Was bedeutet „Dry-Run“?

**Dry-Run ist ein Probetreeb.**

Solange Dry-Run eingeschaltet ist, darf ShoppingRoute deine Alexa-Liste **lesen und planen** , aber **nichts verändern** .

Это идеальный вариант для Ersteinrichtung:

- Du richtest Märkte, Artikel und Laufwege ein.
- В данный момент ShoppingRoute был такой странный.
- Deine echte Alexa-Liste bleibt dabei unverändert.

Если вы хотите, чтобы все было хорошо, попробуйте Dry-Run aus. Прежде всего, обратитесь к ShoppingRoute die Liste tatsächlich umsortieren.

Вы можете сделать Dry-Run Wie Eine Vorschau для dem Drucken vorstellen.

---

## 2. Wo finde ich was?

Шляпа ShoppingRoute ab Версия 0.5.0 zwei Bereiche.

### Adapter-Einstellungen

Unter **Instantzen → Маршрут для покупок → Schraubenschlüssel** findest du nur noch die grundlegenden Einstellungen, zum Beispiel:

- как Alexa2-Instanz verwendet wird,
- ob Dry-Run aktiv ist,
- wie unbekannte Artikel behandelt werden,
- allgemeine Sicherheits- und API-Einstellungen.

### ShoppingRoute-Verwaltung

В ссылке ioBroker-Seitenleiste gibt есть einen eigenen Eintrag **ShoppingRoute** .

Dort pflegst du alles, был du im Alltag brauchst:

- **Список покупок**
- **Статья**
- **Маркте**
- **Группы продуктов**
- **Laufwege**
- **Слушать**
- **Prüfung**

Änderungen auf dieser Seite werden Direct Gespeichert. Адаптер должен быть отключен.

---

## 3. Schnellstart – за 10 минут zur ersten sortierten Liste

### Schritt 1: Alexa2 auswählen

Отключите стандартный адаптер от ShoppingRoute.

Используйте **Allgemein** deine Alexa2-Instanz aus und speichere.

Когда вы сначала запустите Instanz gerade, öffne die Seite danach einmal neu.

### Шрифт 2: «Сухой пробег»

Aktiviere zunächst:

**Dry-Run – ничего от Алексы Шрайбен**

Damit kannst du gefahrlos einrichten und testen.

### Шрифт 3: Einkaufsliste auswählen

Öffne die neue **ShoppingRoute-Verwaltung** in der Seitenleiste und gehe auf **Listen** .

Если у вас есть список Alexa-Liste, вы можете использовать ShoppingRoute.

Für die meisten Nutzer reicht eine Liste, zum Beispiel:

**МАГАЗИН**

### Schritt 4: Märkte anlegen

Gehe auf **Märkte** und trage die Geschäfte ein, in denen du Normalerweise einkaufst.

Пример:

- ЛИДЛ
- АЛДИ
- РЕВЕ
- ЭДЕКА
- Аптека
- БАУМАРКТ

ShoppingRoute speichert Marktnamen autotisch в **GROSSBUCHSTABEN** .

Вы также можете использовать «Lidl» или «Rewe».

### Шрифт 5: Produktgruppen prüfen

Unter **Produktgruppen** legt du Bereiche fest, die ungefähr den Abteilungen eines Geschäfts entsprechen.

Пример:

- Obst/Gemüse
- Брот/Гебек
- Флейш/Фиш
- Молочные продукты
- Getränke
- Tiefkühlprodukte
- Хаушальт/Гигиена
- Непродовольственные товары
- Прочее

Вы не должны ничего делать с Warengruppe Anlegen. Es reicht, wenn die Gruppen für deinen Einkauf sinnvoll sind.

### Schritt 6: Laufweg festlegen

Gehe auf **Laufwege** .

Wähle einen Markt, zum Beispiel **LIDL** , und ordne die Produktgruppen so and, wie du Normalerweise durch den Laden gehst.

Пример:

1. Obst/Gemüse
2. Брот/Гебек
3. Флейш/Фиш
4. Молочные продукты
5. Getränke
6. Tiefkühlprodukte

Когда ALDI anders aufgebaut ist, bekommt ALDI einfach einen anderen Laufweg.

### Шрифт 7: Erste Artikel prüfen

Если вы хотите прочитать **статью** о продуктах, обратите внимание на ShoppingRoute.

Ein Artikel kann zum Beispiel so eingestellt sein:

**Молоко**

- Produktgruppe: Milchprodukte
- Standardmarkt: LIDL
- Торговая марка: LIDL, ALDI, REWE

### Schritt 8: Testen

Вот несколько статей, посвященных Алексе, из следующего списка:

- Бананен
- Молоко
- Йогурт
- Кола

Schau anschließend на ShoppingRoute uner **Einkaufsliste** .

При включении режима работы всухую можно включить адаптер-Einstellungen ausschalten.

Ab Dann Darf ShoppingRoute deine echte Alexa-Liste sortieren.

---

## 4. Список покупок

Unter **Einkaufsliste** siehst du die aktuelle Liste nach Märkten Gegliedert.

Пример:

**ЛИДЛ**

- Бананен
- Помидоры
- Молоко
- Йогурт

**РЕВЕ**

- веганы Хак

### Artikel verschieben

Если вы хотите найти статью на фальшивом рынке, вы можете получить прямой доступ к ней.

Je nach Ansicht stehen dafür Drag & Drop, Pfeiltasten или eine Marktauswahl zur Verfügung.

Мануэль Вершибунген в Einkaufsliste bleiben zunächst Entwurf im Browser. Verschiebe alle gewünschten Artikel und Drücke Dann **Änderungen an Alexa übertragen** . Сначала нажмите кнопку, чтобы начать работу с Alexa-Sortierlauf. Bei einem Fehler bleibt der Entwurf erhalten; **Änderungen verwerfen** lädt die aktuelle Liste neu. Solange Änderungen offen sind, sind Listenwechsel, Hinzufügen, Löschen und Zurücksetzen gesperrt, damit der Entwurf erhalten bleibt. Вкладки браузера теперь доступны только в том случае, если вы хотите, чтобы они были доступны для быстрого доступа к Alexa Geladene Liste angevendet. Erledigte, gelöschte или umbenannte Artikel werden durch alte Entwürfe nicht wiederhergestellt. Solange die Ansicht sichtbar ist und bei der Rückkehr zum Tab erfolgt eine sparsame Aktualisierung. Ist Alexa nicht erreichbar, zeigt die Oberfläche einen Fehler mit erneuter Lademöglichkeit statt einer veralteten Liste. Ошибка кэширования браузера не имеет значения.

Eine manuelle Änderung Hat Vorrang vor der der Autotischen Zuordnung.

### Artikel löschen

Mit **Löschen** entfernst du den Eintrag aus der aktuellen Alexa-Einkaufsliste.

Der Artikel selbst bleibt im Artikelstamm erhalten und kann später Wieder verwendet werden.

---

## 5. Маркте

Unter **Märkte** verwaltest du deine Geschäfte.

Ein Markt besteht im Wesentlichen aus:

- **Имя**
- **Актив**
- **Рейенфолге**
- **Псевдоним**

### Was sind Aliase?

Альтернативный псевдоним Bezeichnungen für Denselben Markt.

Пример:

**РЕВЕ**

Псевдоним:

- Реве Маркет
- Центр Реве

Wenn du später sagst:

«Setze Milch bei Rewe Center auf die Einkaufsliste»

kann ShoppingRoute trotzdem erkennen, dass **REWE** gemeint ist.

### OHNE MARKT

**OHNE MARKT** — это Auffangbereich.

Dort können Artikel Landen, wenn ShoppingRoute noch nicht weiß, welchem Geschäft sie zugeordnet werden sollen.

---

## 6. Группы продуктов

Produktgruppen beschreiben, **wo im Laden ein Artikel ungefähr zu finden ist** .

Примеры:

- Bananen → Obst/Gemüse
- Молоко → Молочные продукты
- Cola → Getränke
- Tiefkühlpizza → Tiefkühlprodukte

Sie sind wichtig, weil ShoppingRoute damit deinen Laufweg durch den Markt nachbildet.

Du brauchst keine Perfecte Warenwirtschaft. Die Gruppen sollen nur beim praktischen Einkauf helfen.

---

## 7. Laufwege

Ein Laufweg ist einfach die Reihenfolge, in der du an den Abteilungen eines Marktes vorbeikommst.

Пример для LIDL:

1. Obst/Gemüse
2. Брот/Гебек
3. Флейш/Фиш
4. Молочные продукты
5. Getränke
6. Tiefkühlprodukte

ShoppingRoute versurucht dann, die Artikel in genau dieser Reihenfolge auf deiner Einkaufsliste anzuzeigen.

Jeder Markt kann einen eigenen Laufweg haben.

---

## 8. Статья

Unter **Artikel** verwaltest du den Produktstamm.

Статья для праздника:

### Имя

Обычное название продуктов.

Пример:

**Молоко**

### Псевдоним

Andere Wörter, die dasselbe Produkt meinen.

Действия для «Hackfleisch»:

- Взлом
- Риндерхак

### Группа продуктов

Wo der Artikel im Laden zu finden ist.

Пример:

Молоко → Молочные продукты

### Стандартмаркт

Der Markt, in dem du diesen Artikelnormalerweise kaufst.

Пример:

Милч → ЛИДЛ

### Verfügbare Märkte

Weitere Geschäfte, in denen der Artikel ebenfalls gekauft werden kann.

Пример:

Молоко:

- ЛИДЛ
- АЛДИ
- РЕВЕ

Таким образом, ShoppingRoute может быть более гибким.

---

## 9. Эйнен Маркт напрямую от Алексы Неннен

Du kannst ShoppingRoute ausdrücklich sagen, на welchem Markt ein Artikel gekauft werden soll.

Пример:

- «Milch von REWE»
- «Кола в LIDL»
- «Кофейня в ALDI»

Diese Angabe Hat Vorrang vor der Normalen Autotischen Zuordnung.

Если вы также сынок Milch bei LIDL kaufst, aber diesmal ausdrücklich «Milch von REWE» sagst, bleibt sie bei REWE.

---

## 10. Mengenangaben

Вы можете сказать, что Алекса не знает, как это сделать.

Пример:

- 2 молока
- 3 упаковки молока
- две бутылки колы
- Картофель 1,5 кг
- 6x Wasser
- halbes Kilo Hack

ShoppingRoute versurucht dabei, den eigentlichen Artikel zu erkennen und die Mengenangabe sichtbar zu erhalten.

---

## 11. Был ли passiert mit unbekannten Artikeln?

Если вы не знаете эту статью, то ShoppingRoute noch nicht kennt, gibt es drei Möglichkeiten.

Вы должны установить обычный адаптер-Einstellungen ein.

### Первый тест

Der neue Artikellandet unter **Prüfung** .

Это лучший способ Einstieg лучше всего Einstellung.

Du kannst dort kontrollieren:

- Название продукта
- Группа продуктов
- Стандартмаркт
- weitere verfügbare Märkte
- Псевдоним

Danach kannst du den Artikel übernehmen.

### Automatisch lernen

ShoppingRoute versurucht neue Artikel selbstständig in den Produktstamm aufzunehmen.

Das ist bequem, aber für eine neue Installation weniger übersichtlich.

### Nicht lernen

Unbekannte Artikel werden nicht dauerhaft Gespeichert.

---

## 12. Prüfung

Unter **Prüfung** findest du unbekannte или noch nicht bestätigte Artikel.

Пример:

Шляпа Alexa «Skyr» добавлена, ShoppingRoute kennt Skyr aber noch nicht.

Dann kannst du dort festlegen:

- Имя: Скайр
- Produktgruppe: Milchprodukte
- Standardmarkt: LIDL
- другие рынки: ALDI, REWE

Mit **Übernehmen** wird der Artikel dauerhaft в ден Artikelstamm aufgenommen.

С **игнорированием** ничего не происходит.

---

## 13. Welcher Markt gewinnt?

Meist musst du dich um diese Regeln nicht kümmern.

Falls du aber wissen möchtest, warum ein Artikel in einem bestimmten Markt gelandet ist, gilt vereinfacht diese Reihenfolge:

1. Ein Markt, den du ausdrücklich bei Alexa genannt hast
2. der Standardmarkt des Artikels
3. ein vorübergehend gewählter Markt für den aktuellen Einkauf
4. der Standardmarkt der verwendeten Alexa-Liste
5. общий стандартный рынок
6. ein anderer erlaubter Markt
7. OHNE MARKT

Ein ausdrücklich genannter Markt gewinnt также immer.

---

## 14. Безопасность

ShoppingRoute schreibt nicht beliebig часто на Алексе-Листе.

Если это не было сделано на Amazon, это не лучший вариант, возможно, адаптер будет **отключен** .

Das bedeutet:

**ShoppingRoute останавливается в Weitere Änderungen, statt auf Verdacht weiterzuschreiben.**

Если вы хотите получить больше информации, вы можете получить актуальный список Alexa-Liste und die Fehlermeldung.

Ein Sicherheitsstopp — это kein Datenverlust, sondern eine Schutzfunktion.

---

## 15. Было ли в Alexa слово «20>»?

Manchmal siehst du auf der Alexa-Liste Einträge wie:

`20> Milch`

oder eine Überschrift wie:

`40> ═════ LIDL ═════`

Diese Zeichen verwendet ShoppingRoute стажер, дай Алекса умереть в списке в der gewünschten Reihenfolge anzeigt.

**Du musst damit nichts tun.**

Bitte ändere или Entferne Diese Zahlen nicht manuell, solange ShoppingRoute die Liste verwaltet.

Это технический трюк для сортировки.

---

## 16. Шоппинг-роут был нерабочим

ShoppingRoute:

- hakt keine Artikel autotisch als erledigt ab,
- bestellt nichts,
- kauft nichts,
- löscht deinen Artikelstamm nicht, wenn du einen Eintrag aus der aktuellen Einkaufsliste entfernst,
- Для нормальной эксплуатации и использования изделий рекомендуется использовать адаптер или адаптер Neustart.

---

## 17. Когда это не работало

### Die Liste wird nicht sortiert

Prüfe:

1. Можно ли использовать список Alexa-App в приложении Alexa-App от **A до Z** ?
2. Является ли список Alexa-Liste активным для **прослушивания** ?
3. Является ли Dry-Run vielleicht noch eingeschaltet?
4. Läuft die Alexa2-Instanz?
5. Zeigt ShoppingRoute einen Fehler или Sicherheitsstopp an?

### Ein Artikel Landet im Falschen Markt

Прюфе ден Артикель унтер **Артикель** :

- Стандартмаркт
- verfügbare Märkte
- Группа продуктов

Вы также можете перейти прямо в Einkaufsliste.

### Новая статья чувствовалась в Artikelstamm

Schau unter **Prüfung** .

Если вы выбрали «Первоначальный метод обучения», то это значит, что вам нужно выбрать лучший вариант.

### Ein Button reagiert nicht

Если вы путешествуете по торговому маршруту, где есть места для покупок на Amazon, вы можете получить больше удовольствия от покупок. Warte, bis der Vorgang bedetist, und versuche es dann erneut.

---

## 18. Für Fortgeschrittene

Der folgende Abschnitt ist für den Normalen Betrieb **nicht erforderlich** .

### Temporärer Prioritätsmarkt

Для того, чтобы получить больше информации, вы можете воспользоваться услугами рынка:

`shoppingroute.0.control.temporaryPriorityMarket`

### Предварительное

Technische Vorschau-Informationen stehen unter anderem в:

`shoppingroute.0.info.preview`

`shoppingroute.0.info.previewText`

`shoppingroute.0.info.lastPlan`

### Конфигурационная защита

В версии 0.5.0 есть большие каталоги, которые можно использовать в качестве Laufzeitdaten для:

`shoppingroute.0.data.managedConfig`

gespeichert.

Если вы хотите, чтобы информация, информация, статья и другие данные были добавлены, вы должны получить доступ к обновлению администратора при помощи пакета-стандарта.

### Sortierpräfixe

Die sichtbaren Zahlen von `00>` бис `99>` Sind Interne Sortierschlüssel.

ShoppingRoute ничего не значит, что мы умрем Alexa-Liste, который будет свободен от определенных ограничений. Durch die Einstellung **A–Z** werden diese Zahlen алфавитный bzw. числовые значения в Gewünschte Reihenfolge gebracht.

Для нормального использования необходимо знать, что технология неизвестна.

---

## 19. Empfehlung für neue Nutzer

Для новой установки необходимо:

1. Alexa-Liste auf **AZ** stellen.
2. Dry-Run einschalten.
3. Märkte anlegen.
4. Produktgruppen prüfen.
5. Laufwege einrichten.
6. einige typische Artikel hinzufügen.
7. unter **Einkaufsliste** und **Prüfung** kontrollieren.
8. Dry-Run ausschalten.
9. einen echten Einkauf testen.

Danach erledigt ShoppingRoute den größten Teil der Arbeitautotisch.

### Слушайте и рассказывайте статьи

Unter **Listen → В Alexa anlegen** erstellt ShoppingRoute eine echte Alexa-Liste und speichert ihre Zuordnung direkt. Сначала лучше всего пользоваться Amazon zählt als Erfolg. Список включен в приложение Alexa App для Handy zur Verfügung. Bereits vorhandene Namen werden wiederverwendet.

Im Bereich **Einkaufsliste** kannst du über **Neuen Artikel hinzufügen → Hinzufügen** direkt in die ausgewählte Alexa-Liste schreiben, auch wenn diese noch leer ist. Адаптер не работает при последующей сортировке. Bei einem Fehler bleibt deine Eingabe erhalten. Dry-Run und Schreibschutz gelten также здесь. Слушайте Alexa-Listen Blockieren keine Anderen Listen.