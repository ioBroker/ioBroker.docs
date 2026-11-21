---
chapters: {"pages":{"en/adapterref/iobroker.shoppingroute/README.md":{"title":{"en":"ShoppingRoute for ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README.md"},"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md":{"title":{"en":"ShoppingRoute – User Guide"},"content":"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md"},"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md":{"title":{"en":"ShoppingRoute – Bedienungsanleitung"},"content":"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md"},"en/adapterref/iobroker.shoppingroute/README_DE.md":{"title":{"en":"ShoppingRoute für ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README_DE.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.shoppingroute/README_DE.md
title: ShoppingRoute für ioBroker
hash: /mm8CAK3IlXph8sMqPua+bN7ThtdEow9hdUiE/F3wUE=
---
# ShoppingRoute für ioBroker

![ShoppingRoute](../../../en/adapterref/iobroker.shoppingroute/admin/shoppingroute.png)

**Актуэлье Версия: 0.6.3 (20.11.2026).**

**Новое в версии 0.6.3:** Die Einkaufslistenansicht verwendet frisch bestätigte Alexa-Date statt veralteter Browser-Entwürfe. Bereits erledigte или gelöschte Artikel werden nicht wieder eingeblendet; noch gültige manuelle Verschiebungen bleiben erhalten. Zusätzlich bietet ShoppingRoute für Skripte und KI-Agenten den lesenden `help` -Бефель.

**Новинка в версии 0.6.1 – шнеллер и робастёр Bring!-/Alexa-Abgleich:** Sobald der Bring!-Adapter einen bestätigten Listenstand или Alexa eine Listenänderung одновременно, когда ShoppingRoute становится активным. Это entfällt die zusätzliche Wartezeit von zu 90 Sekunden im ShoppingRoute-Intervall. В течение 30 секунд после завершения процедуры, вы увидите, как будут проведены сортировочные мероприятия и время наилучшего действия. Bereits ausgeführte Schreibvorgänge werden unabhängig von zwischenzeitlich erledigten anderen Artikeln erkannt. Dadurchblockieren solche Erledigungen den nächsten Abgleich nicht mehr. В течение двух минут без лучшего предупреждения в журнале ioBroker-Log, по тайм-ауту в Фелере и после предупреждения – в вашем журнале.

**Wichtige Geschwindigkeitsgrenze außerhalb von ShoppingRoute:** Der eigenständige ioBroker-Adapter **Bring! 1.9.1** фрагмент «Bring!-Cloud Standard» будет доступен **в течение 90 секунд** . **ShoppingRoute kann dieses Intervall weder einstellen noch verkürzen oder einen früheren Cloud-Abruf erzwingen.** Вы найдете статью в приложении Bring!-App, которая будет доступна или доступна, прежде чем вы получите доступ к ShoppingRoute, затем начните с Bring!-Adapter seine ioBroker-Liste actualisiert Hat. Die Verzögerung kann durch Netzwerk- oder Dienstprobleme auch länger sein. **Ab diesem Zeitpunkt** verarbeitet ShoppingRoute 0.6.1 die Änderung ereignisgesteuert, ohne weitere 90 Sekunden abzuwarten. Die Wartezeit des Bring!-Адаптеры также входят **в комплект поставки ShoppingRoute** . Amazon-API-Schreibsperren bleiben bestehen.

Bei Problemen `shoppingroute.0.info.bringSyncStatus` унд `shoppingroute.0.data.bringSyncJournal` прюфен. Ein ausstehendes Journal niemals löschen, ohne vorher beide aktiven Listen und die erledigten Artikel zu sichern zu vergleichen. Сихэ, [выпуск №82](https://github.com/RaviniZib/ioBroker.shoppingroute/issues/82) .

ShoppingRoute macht aus einernormalen Alexa-Einkaufsliste eine praktische Einkaufshilfe: **Alle Märkte können gemeinsam in einer einzigen Liste geführt or bewusst auf mehrere Listen verteilt werden.** Das besondere Merkmal ist das frei einstellbare **Marktrouting** : Für jeden Markt legt du deinen Laufweg durch die Abteilungen fest. Dadurch steht die Einkaufsliste in der Reihenfolge, in der du tatsächlich durch den Laden gehst – für weniger Zurücklaufen, wenigeruchen und **schnelleres, effizienteres Einkaufen** .

ShoppingRoute sortiert Alexa-Einkaufslisteneinträge nach Markt, Produktgruppe und dem individuellen Laufweg durch den Jeweiligen Markt. Dazu vergibt es sichtbare zweistellige Schlüssel wie `20> Bananen` унд `40> ═════ ALDI ═════`; verwaltete Слушайте каждый раз в приложении Alexa на **A – Z** stehen. ShoppingRoute использует локальную аутентификацию Alexa2 для прямых обновлений, удалений и пакетного создания; Alexa2-Listenstates bleiben die Triggerquelle for externe Änderungen.

## Bedienungsanleitung / Руководство пользователя

🇩🇪 [**Deutsche Bedienungsanleitung**](/#/docs/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md)\
&#x20;🇬🇧 [**Руководство пользователя на английском языке**](/#/docs/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md)

## Новинки в версии 0.6.0: Bring!-Listen und ShoppingRoute-Sortierung

ShoppingRoute unterstützt zusätzlich den ioBroker-Adapter **Bring.0** (Bring! 1.9.1) и может быть добавлен в список Bring!-Liste mit einer Alexa-Einkaufsliste verknüpfen. Die Funktion является **стандартным** , и его можно использовать в обычном режиме. Обновление лучше всего слушать.

Die vier Betriebsarten stehen unter **Instanz-Einstellungen → Bring!-Integration** :

- **Aus:** ShoppingRoute работает с Alexa.
- **Приносить! → ShoppingRoute/Alexa:** Принесите! ist die Quelle. Neue Bring!-Artikel werden nach Alexa übernommen; zuvor gespiegelte und anschließend в Bring! erledigte Artikel werden auch в Alexa entfernt. Alexa-eigene Artikel bleiben erhalten.
- **Nur Bring!:** ShoppingRoute zeigt die Bring!-Artikel auf seiner Verwaltungsseite nach Märkten, Produktgruppen und persönlichen Laufwegen sortiert an, ohne Alexa zu benötigen. Diese Ansicht ist absichtlich schreibgeschützt.
- **Приносить! ↔ Alexa:** Новые статьи и новые статьи добавлены в дополнительные материалы. Beim **allerersten Abgleich** werden ausschließlich fehlende Einträge ergänzt; kein vorhandener Artikel wird gelöscht.

### Alexa-Sprachkurzbefehl für Bring!-Nutzer

**При активации режима «Принеси! ↔ Alexa» появится «Alexa, Milch auf die Einkaufsliste».** Алекса легла в статью, которая была добавлена в ее собственный список книг. ShoppingRoute berücksichtigt die Markt- und Laufwegregeln und gleicht den Artikel anschließend mit Bring! аб. Der bisher nötige Umweg über «Алекса, мудрец, принеси!…» entfällt bei dieser Nutzung. Wird der Artikel später в журнале Bring! Кроме того, вы можете включить ShoppingRoute в лучший раздел, связанный с активным Alexa-Liste. Das ist eine Entfernung des Eintrags und kein Setzen eines Alexa-Erledigt-Häkchens. Voraussetzung sind активная двунаправленная синхронизация, erreichbare Dienste und konfliktfreie Listen.

### Wichtige Einschränkung von Bring!

**Приносить! erlaubt keine freeie Reihenfolge einzelner Artikel.** Приложение Seine App имеет собственную категорию продуктов, которая соответствует требованиям Reihenfolge Nutzer dort einstellen können. ShoppingRoute поможет выбрать оптимальный вариант Reihenfolge в собственном приложении Verwaltungsoberfläche, **но не** в свободном сортировке Reihenfolge Internalhalb der Bring!-App. Eine identische Darstellung Beider Apps ничего не предлагает.

### Шуцмеханизмы синхронизации

- Для этого мы будем использовать Bestätigte Bring!- и актуальную возможность прослушивания Amazon. Bei nicht verfügbaren или veralteten Daten wird **nicht geschrieben** .
- В двух артикульных названиях более широкое описание/спецификация или нестандартные варианты остановки. Unklarheiten werden nicht erraten.
- Ein dauerhaftes lokales Journal verhindert, dass ein unterbrochener Schreibvorgang nach Neustart uncontrolliert wiederholt wird. Vor einem neuen Schreiblauf müssen beide Seiten das Ergebnis des vorherigen bestätigen.
- Ein Schreiblauf verarbeitet höchstens 30 действий; die bisherige Alexa-Grenze von 99 Einträgen und die eingestellten Amazon-Zugriffslimits gelten weiterhin.
- **Dry-Run** zeigt geplante Aktionen an, ohne etwas в Alexa или Bring! zu verändern.
- Статус: `shoppingroute.0.info.bringSyncStatus`; Bring!-Laufwegvorschau: `shoppingroute.0.info.bringSyncPreview`; Wiederherstellungsjournal: `shoppingroute.0.data.bringSyncJournal`.

Für die Einrichtung: Bring!-Instanz auswählen und speichern, Bring!-Liste auswählen, bei Verbindung zu Alexa eine aktivierte Zielliste angeben, zuerst Dry-Run prüfen und erst danach bewusst aktivieren. Die Bring!-Daten kommen aus der vorhandenen lokalen ioBroker-Instanz; ShoppingRoute benötigt kein eigenes Принесите!-Пароль.

**Испытательный стенд (26.10.2026):** Автоматические испытания синхронизирующих, сортировочных и защитных механизмов в рабочем состоянии. Der Praxistest bestätigt die Übernahme von Bring!-Слушайте sowie neu in Bring! hinzugefügter Artikel, die beim nächsten Sortierlauf в ShoppingRoute eingeordnet werden. Бесплатное внутреннее артикулирование der Bring!-App не является техническим, но не может быть полезным. Abschließen, Löschen und sämtliche Konfliktfälle des beidseitigen Live-Abgleichs wurden mit diesem Praxistest nicht bestätigt. Для двунаправленного режима прохождения тестового прослушивания.

## Hilfe для скриптов и KI-агентов

Мит `sendTo('shoppingroute.0', 'help', {}, callback)` erhalten Skripte und KI-Agenten eine Beschreibung der unterstützten Nachrichten und die Liste `commands`. Dort zeigt `write: true` ан, welche Befehle Daten verändern können; `write: false` steht für reine Abfragen. Die vorhandenen Schutzmechanismen, Berechtigungen, Dry-Run-Einstellungen и Amazon-Zugriffslimits bleiben unverändert. Der Hilfeaufruf selbst schreibt weder nach Alexa noch nach Bring!. Weitere Einzelheiten enthält die [deutsche Bedienungsanleitung](/#/docs/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md) .

## Мануэль Эйнкауфслистендерунген

Мануэль Вершибунген в Einkaufsliste bleiben zunächst Entwurf im Browser. Verschiebe alle gewünschten Artikel und Drücke Dann **Änderungen an Alexa übertragen** . Сначала нажмите кнопку, чтобы начать работу с Alexa-Sortierlauf. Bei einem Fehler bleibt der Entwurf erhalten; **Änderungen verwerfen** lädt die aktuelle Liste neu. Solange Änderungen offen sind, sind Listenwechsel, Hinzufügen, Löschen und Zurücksetzen gesperrt, damit der Entwurf erhalten bleibt. Если вы не хотите использовать вкладки браузера, вы не можете использовать их, чтобы получить доступ к фришному списку от Alexa. Erledigte oder entfernte Artikel tauchen durch alte Entwürfe nicht wieder auf. На вкладке «Sichtbare Tab» есть разбросанная и ненажатая кнопка Rückkehr. Schlägt das Laden fehl, erscheint eine Fehlermeldung mit erneuter Lademöglichkeit statt einer als aktuell dargestellten veralteten Liste. Удаление кешей браузера не является проблемой.

## Новое в версии 0.5.3: Управление в приложении Alexa

**Marktwechsel прямо в обычном Alexa-Einkaufsliste auf dem Handy – одно приложение и один Zugriff на ioBroker-Verwaltung.**

**Vier Handy-Funktionen (немецкий/английский: W/C, F/E, H/U, R/D):** `13WNETTO` Wechselt Artikel 13 **vorübergehend** zu NETTO, `13FNETTO` ordnet ihn **dauerhaft** NETTO zu. `25H3` verschiebt Artikel 25 **Drei echte Artikelpositionen nach Oben** , `25R3` **Drei nach unten** – драгоценности на внутренних бирках, без маркировки. H/R verändern keine gespeicherten Laufwege или Produktgruppen.

Füge einen Steuerbefehl wie `13WNETTO` как обычно Listeneintrag hinzu: `13` ist die **aktuell sichtbare zweistellige Number vor dem Artikel** , `W` bedeutet Wechsel und `NETTO` ist ein bereits angelegter Zielmarkt. Вы можете больше узнать об этом. Groß-/Kleinschreibung ist egal; eindeutige kleine Tippfehler im Marktnamen werden korrigiert.

**Bitte Geduld:** Ein neuer Sortiervorgang erfolgt **niemals sofort** . Abhängig von Internetverbindung, Geschwindigkeit und Alexa может быть **эс цу fünf Minuten** dauern. Соланж дер Бефель сегодня в дер Einkaufsliste Steht, это нормально. **Сначала найдите минутный** Интернет-/Alexa-Verbindung, который будет содержать артикльный номер и торговое наименование. Bei einem Eingabefehler den Befehl в Alexa abhaken и korrigiert neu eingeben.

Ein Wechsel mit **W** gilt nur für diesen Einkauf; **Fändert** die dauerhafte Marktzuordnung. Имеющиеся продукты и функции обучения не используются. Erfolgreiche Steuerbefehle verschwinden aus der Liste. Bleibt ein Befehl stehen, Number und Markt prüfen, den falschen Befehl в Alexa abhaken und richtig neu eingeben. **Номер vor Marktüberschriften können nicht zum Verschieben von Artikeln verwendet werden.** Bei mehrdeutigen Befehlen wird nichts geraten.

Функция находится в версии 0.5.2 verfügbar.

## Frühere Verbesserungen (0.5.1)

Эта версия включает в себя Gemeldeten Speicher- und Verschiebefehler der neuen Verwaltungsseite. Im Mittelpunkt steht die Bedienung am Handy während des Einkaufs:

- **Новое прослушивание в Alexa anlegen:** ShoppingRoute erstellt und bestätigt die Liste in Alexa, bevor ie verwendet wird. Вам не нужно будет прослушивать прослушивание, чтобы вы могли слушать музыку и работать с ней.
- **Прямая статья:** Auf der Seite **Einkaufsliste** может стать новой статьей, а также если Alexa-Liste noch leer ist.
- **Bis ans Ende und Wieder zurück verschieben:** Eigene Ablageflächen am Listenende, Touch-Griffe, korrigierte Einfügepositionen und leere Rückkehr-Märkte erleichtern das Verschieben. Mit **Weitere Märkte als Ablageziel anzeigen** werden zusätzliche Zielmärkte eingeblendet.
- **Дополнительные сведения:** Когда вы лесбиянка, вы можете быть уверены в том, что Алекса будет актуален. Das endgültige Ergebnis wird gesondert abgefragt; При длительном использовании время ожидания будет больше, чем в случае с большим перерывом в работе.
- **Änderungen behalten:** Löschen, Umordnen und Auswahlen auf der Verwaltungsseite werden sofort gespeichert. Texteingaben bleiben bis zum Druck auf **Speichern** ein Entwurf; **Hinzufügen** übernimmt einen neuen Eintrag. Gespeicherte Änderungen bleiben beim erneuten Öffnen erhalten.
- **Дополнительные сведения:** Местный каталог, который лучше всего подходит для Amazon-Abfrage mehr. Lerndaten werden ohne Adaptor-Neustart Gespeichert. Schnelle Änderungen werden nacheinander verarbeitet; bei einem echten Speicherfehler bleiben die Eingaben für einen erneuten Versuch erhalten.
- **Статья для einer Alexa-Neunummerierung zurückschieben:** Geänderte Amazon-Artikel-IDs werden bei eindeutigem Artikelnamesicher zugeordnet. Bei gleichnamigen Artikeln wird keine Zuordnung geraten.

Открытый **торговый маршрут** в ioBroker-Seitenleiste auf dem Handy. Zum Ziehen verwendest du den Griff `⋮⋮`; Pfeiltasten und Marktauswahl stehen weiterhin zur Verfügung. Nach dem Update bitte die Verwaltungsseite einmal vollständig neu laden. Alexa-Schreibzugriffe verwenden weiterhin die eingestellten Limits, Dry-Run und Ergebnisprüfungen.

Загрузите версию 0.5.1 в лучший [поток Tester](https://forum.iobroker.net/topic/85510/test-adapter-shoppingroute-v0.4.4) или в [GitHub-Issue](https://github.com/RaviniZib/ioBroker.shoppingroute/issues) .

## Функции

- eigene **ShoppingRoute-Verwaltungsseite** in der ioBroker-Seitenleiste für Einkaufsliste, Artikel, Märkte, Produktgruppen, Laufwege, Listen und Prüfung

- Каталог товаров и услуг для адаптера-Neustart

- Лучшее прослушивание Alexa и новые советы прямо в Handy Anlegen

- sofortiges Speichern von Strukturänderungen; Texteingaben über den Button **Speichern** übernehmen

- Marktnamen werden unabhängig von der Eingabe autotisch в **GROSSBUCHSTABEN** Gespeichert; Все Marktverweise Werden согласуются с нормализацией

- Schutz vor vershentlichem Zurücksetzen großer Katalogdaten durch Admin-/Update-Vorgänge

- mehrere Alexa-Einkaufslisten mit eigenem Prioritätsmarkt

- Globale, Listenbezogene и Temporäre Marktpriorität

- Маркт-псевдоним и автоматический Erkennung häufiger Marktvarianten

- опционально, автоматически проверяется Marktüberschriften wie `═════ ALDI ═════`

- опционально marktübergreifende Zusammenlegung anhand einer Mindestanzahl von Artikeln pro zusätzlichem Markt; объясните, что Marktangaben bleiben unverändert

- Frei pflegbare Produktgruppen und marktbezogene Laufwege

- Laufweg nach Tabellenreihenfolge; Reihenfolgen werden autotisch neu nummeriert

- Artikelstamm mit Aliasen, Produktgruppe, bevorzugtem Markt und verfügbaren Märkten

- verbesserter Mengenparser für Zahlen, Zahlwörter, Packungen, Kisten, halbes Kilo, `6x` ушв.

- Дубликаты для хранения необработанных продуктов

- Prüfliste für unbekannte Artikel mit Übernehmen/Ändern/Ignorieren

- автоматический или ручной Lernstrategie

- Интеллектуальные категории-представления о правилах и правилах использования статей

- Alias-Vorschläge für erkannte Schreibvarianten

- Sortiervorschau vor Alexa-Schreibzugriffen

- дополнительная предварительная сортировка `00>` –`99>` с Lückenerhalt и Suffix-Fallback

- Направьте Amazon-Antworten plus ein abschließender Listenabruf als Bestätigung

- API-Schonmodus mit configurierbarem Schreibzugriffs-Limit

- Региональная статистика для облачной телеметрии

- Конфигурации - Экспорт/Импорт

- экспортный/импортный Marktprofile zum Teilen von Laufwegen

- datenschutzfreundlicher Диагностика/Обратная связьbericht

- Alexa2/alexa-remote2-Диагностика прямого действия

- Пробный запуск для безопасных испытаний

## Приоритетная логика

Bei der Marktzuordnung gilt:

1. ausdrücklich genannter Markt and beliebiger Stelle im Artikelnamen (`Milch REWE`, `REWE Milch`, `Milch vom REWE`); ohne fest vorgeschriebene Bindewörter
2. Артикель-Стандарт
3. temporärer Prioritätsmarkt
4. Приоритетный рынок ювелирных изделий Alexa-Liste
5. глобальный приоритетный рынок
6. erster erlaubter Markt aus «Verfügbare Märkte»
7. Резервный рынок

### Intelligente Marktoptimierung – weniger Geschäfte, kürzere Einkaufswege

ShoppingRoute sortiert nicht nur Artikel nach Märkten und Laufwegen, sondern kann auch **unnötige zusätzliche Marktbesuche vermeiden** . Если вы сконфигурируете Mindestanzahl и Artikeln für einen Markt unterschritten, вы можете получить дополнительную маркировку Zusammenlegung, а также приобрести Artikel в другом месте, где это необходимо. Dafür berücksichtigt ShoppingRoute ausschließlich die im Artikelstamm hinterlegten **altern verfügbaren Märkte** .

**Пример:**

| Маркт | Статья для оптимизации         |
| ----- | ------------------------------ |
| АЛДИ  | Мильх, Масло, Брот, Эйер, Кезе |
| РЕВЕ  | Цукер                          |

Это **ALDI для Zucker, который предлагает альтернативные рынки** и возможность настройки Mindestartikel-Regel, можно ShoppingRoute Zucker dem ALDI-Einkauf zuordnen. Дополнительные сведения: **6 статей ALDI, kein zusätzlicher REWE-Beuch notig.**

Оптимизация не является обязательной и не является обязательной для использования в качестве альтернативного варианта. **Подробное описание Marktangaben** wie `Milch von LIDL` Одер `Eier bei ALDI` bleiben verbindlich und werden niemals autotisch in einen anderen Markt verschoben.

## Важные точки данных

- `info.previewText` – lesbare Sortiervorschau
- `info.reviewQueue` – unbekannte Artikel
- `info.statistics` – lokale Einkaufsstatistik
- `info.traffic` – API-/Schreibzähler
- `info.sortTransaction` – lokales Wiederherstellungsjournal einer laufenden Sortierung; я в норме `{}`
- `info.configExport` – полная конфигурация конфигурации
- `info.marketProfiles` – teilbare Marktprofile
- `info.versionInstalled` – установить версию адаптера
- `info.feedbackReport` – bereinigter Diagnose-/Feedbackbericht ohne Einkaufsinhalte
- `control.temporaryPriorityMarket` – временный Markt für den aktuellen Einkauf
- `control.importConfigJson` – Konfiguration importieren
- `control.marketProfileImport` – Marktprofil importieren

## Лицензия

ShoppingRoute ведет под **[MIT-Lizez](https://github.com/RaviniZib/ioBroker.shoppingroute/blob/main/LICENSE)** veröffentlicht. Frühere bereits veröffentlichte Versionen bleiben unter der der jeweils damals gültigen Lizenz.

## Changelog

### 0.6.3 (20.11.2026)
- Einkaufslistenansicht gegen veraltete Browser-Entwürfe abgesichert: aktuelle Alexa-Artikel und erledigte Einträge werden korrekt angezeigt; gültige manuelle Verschiebungen bleiben erhalten (#90).
- Lesenden `help`-Befehl für Skripte und KI-Agenten mit Übersicht der unterstützten Nachrichten und Schreibkennzeichnung ergänzt (#93).
- Deutsche und englische Dokumentation aktualisiert; bestehende Schutzmechanismen und Zugriffslimits unverändert.

### 0.6.2 (13.11.2026)
- @iobroker/testing auf 6.3.2 aktualisiert (Repo-Checker-Warnung W0037, Issue #85).
- Bisher unveröffentlichte Repo-Checker-Korrekturen aus #86 übernommen: README-Changelog, veraltete Changelog-Dateien und zu viele Versionsmeldungen bereinigt.
- Zweisprachigen Hinweis zur eigenständigen, ungefähr 90-sekündigen Bring!-Cloud-Abfrage übernommen (#84).
- Bereits zusammengeführte Aktualisierungen auf Vite 8.3.5 und @module-federation/vite 1.23.7 enthalten (#87, #88).
- Versionsangaben im Laufzeitcode und in den Paketdateien abgeglichen; bewährte Alexa-/Bring!-Schutzmechanismen und Funktionen beibehalten.

### 0.6.1 (27.10.2026)

- **Bring! ↔ Alexa:** Bestätigte Schreibvorgänge einer offenen Transaktion werden auch dann anerkannt, wenn zwischenzeitlich andere Artikel erledigt oder hinzugefügt wurden. Anschließende Änderungen werden in einer neuen Transaktion sicher abgeglichen, ohne erledigte Artikel in Bring! wiederherzustellen.
- **Sicherheitslogik:** Nicht bestätigte Schreibvorgänge bleiben weiterhin gesperrt. Das Transaktionsjournal wird nicht blind zurückgesetzt.
- **Protokollierung:** Bei mehr als drei Minuten ausstehender Bestätigung wird einmalig eine Warnung, beim Timeout eine Fehlermeldung und nach erfolgreicher Wiederherstellung eine Entwarnung im normalen ioBroker-Log ausgegeben. Wiederholte Polls erzeugen keine Logflut.
- **Tests und Dokumentation:** Automatische Regressionstests für konkurrierende Erledigungen, vollständige Bestätigung und ausstehende Schreibvorgänge; deutsche und englische Anleitungen aktualisiert.
- **Geschwindigkeit:** Ereignisgesteuerte Aktualisierung nach Bring!- und Alexa-Statusänderungen, 30-Sekunden-Rückfallprüfung und verkürzte Bestätigungsprüfung. **Externe Grenze:** Der eigenständige Bring!-Adapter 1.9.1 fragt seine Cloud ungefähr alle **90 Sekunden** ab. **ShoppingRoute kann dieses Intervall nicht einstellen, verkürzen oder vorzeitig auslösen**; der schnelle ShoppingRoute-Abgleich beginnt erst nach dem aktualisierten Bring!-Datenpunkt.

### 0.6.0 (26.10.2026)

- Explizite Marktnamen werden als vollständige Begriffe an beliebiger Position im Artikel erkannt und haben stets Vorrang vor dem Standardmarkt; mehrdeutige Mehrfachnennungen werden nicht geraten.

- Manuelle Einkaufslisten-Verschiebungen sammeln und mit **Änderungen an Alexa übertragen** gemeinsam senden. Entwürfe bleiben bei Fehlern erhalten; der ganze Auftrag wird vor dem Schreiben geprüft.

- Optionale Bring!-Integration in vier Betriebsarten einschließlich einseitigem Import und bidirektionaler Synchronisierung.
- Sicherheit: Journal, Konflikt- und Duplikatprüfung, Dry-Run und begrenzte Schreibaktionen.
- Bring!-Laufwege als schreibgeschützte Ansicht für Nutzer ohne Alexa; Bring!-App kann einzelne Artikel nicht frei umsortieren.
- Adapter-Konfiguration in allen elf Admin-Sprachen, neue Regressionstests und aktualisierte deutsche/englische Dokumentation.

### 0.5.3 (2026-10-17)

- Deutsche und englische Befehle: W/C temporär, F/E dauerhaft, H/U hoch, R/D runter.
- D bedeutet nun Runter; F ersetzt das bisherige dauerhafte D.

### 0.5.2 (2026-10-17)

- Temporärer Marktwechsel über `NNWMARKT` direkt in der normalen Alexa-Handy-App.
- Mehrere Befehle pro Sortierlauf, eindeutige Tippfehlerkorrektur und Schutz vor ungültigen Artikelnummern.
- Dauerhafte Artikelzuordnungen, Lernfunktion und bisherige Sortierlogik bleiben erhalten.

### 0.5.1 (2026-10-07)
- Neue Listen werden in Alexa angelegt und vor dem Speichern ihrer Verknüpfung bestätigt; Einkaufsartikel können direkt hinzugefügt werden, auch in leeren Listen.
- Alexa-Verschiebungen zeigen sofort eine gut lesbare Rückmeldung. Die gewählte Position bleibt während des Wartens sichtbar; lange Vorgänge werden ohne den bisherigen Oberflächen-Timeout verfolgt.
- Ablageflächen am Listenende, Einfügepositionen, Touch-Ziehen und leere Rückkehr-Märkte in der Einkaufsliste korrigiert; Drag & Drop für Märkte, Produktgruppen und Laufwege wiederhergestellt.
- Löschen, Umordnen und Auswahlen auf der Verwaltungsseite werden sofort gespeichert. Texteingaben bleiben bis zum Speichern erhalten; schnelle Strukturänderungen werden ohne Wiederholungsschleife verarbeitet.
- Unnötige Amazon-Listenprüfungen bei lokalen Speicheraktionen entfernt. Lerndaten werden als Laufzeitdaten gespeichert und lösen keine Neustarts über das Instanzobjekt mehr aus.
- Eindeutig benannte Artikel werden nach geänderten Amazon-IDs sicher wiedererkannt. Mehrdeutige Zuordnungen bleiben gesperrt; Schutzmechanismen für Alexa-Schreibzugriffe bleiben erhalten.
- Deutsche und englische Einkaufslisten-Rückmeldungen, sprachabhängigen Hilfe-Button, Bedienungsanleitungen und beide READMEs aktualisiert.

### 0.5.0 (2026-10-05)
- Neue eigenständige ShoppingRoute-Verwaltungsseite in der ioBroker-Seitenleiste mit fester Kopfzeile sowie Einkaufsliste, Artikel-, Markt-, Produktgruppen-, Laufweg-, Listen- und Prüfverwaltung.
- Große Katalogdaten werden außerhalb der normalen Instanzkonfiguration als Laufzeitdaten gespeichert; Änderungen benötigen keinen Adapter-Neustart mehr.
- Schutzmechanismus und Regressionstests verhindern den in Issue #59 beobachteten Rückfall auf Paket-Standarddaten; zusätzlich auf einer realen ioBroker-Instanz geprüft.
- Marktnamen werden beim Anlegen, Umbenennen, Laden und Speichern immer in GROSSBUCHSTABEN normalisiert; Marktverweise werden konsistent mitgezogen.
- Überarbeitete Verwaltungsoberfläche mit festem Header, Logo und dezenter Block-/Zebra-Darstellung.

### 0.4.4 (2026-09-25)
- (RaviniZib) `No Market` als Standard-Ausweichmarkt für neue Konfigurationen, Backup-Seite in allen 11 Admin-Sprachen und sechs ungenutzte Übersetzungsschlüssel entfernt. Vorhandene Marktnamen, Laufwege und Produktdaten bleiben unverändert.

### 0.4.3 (2026-09-25)
- Alexa-Callback-Timeouts verwenden jetzt ioBroker-verwaltete Timer; hängende Aufrufe bleiben damit begrenzt, ohne nacktes Node.js-`setTimeout()` im Adapter-Quellcode.
- `common.news` wird auf die vom Repository-Builder unterstützten sieben Einträge begrenzt.

### 0.4.1 (2026-09-12)

- Prüft Einkaufslistenantworten vor Anzeige und Übernahme. Unvollständige Antworten zeigen einen Fehler und „Erneut laden“, statt mit einem `.map()`-Fehler abzustürzen.

- Ergänzt eine Löschtaste pro Einkaufsartikel. Die gewählte Amazon-ID und leere Marktüberschriften werden über die exklusive, protokollierte Verarbeitung mit direkter Schlussprüfung entfernt. Dry Run und Sicherheitsstopp sperren das Löschen.

- Verhindert doppelte Einkaufsartikel durch weitergereichte Drop-Ereignisse und überlappende Schreibläufe. Reserviert Bedienbefehle und Backend-Läufe synchron; Verschiebefehler bleiben nach dem Nachladen sichtbar.

- Korrigiert die Metadaten aus Checker-Issue #16: unveröffentlichte 0.3.8 aus `common.news` entfernt, öffentliche npm-Maintaineradresse bei Autor/Copyright ergänzt, MIT-Lizenz verlinkt und testing ^6.2.1 deklariert. Lokaler Checker ohne Fehler; Repository-Aufnahme über PR #6434 bleibt offen.

- Übernahme und Entfernen der Prüfzeile erfolgen gemeinsam im Admin-Entwurf. Dadurch bleibt keine übernommene Zeile bis zur Server-Aktualisierung sichtbar. Speichern sichert die Änderung, Verwerfen stellt den ursprünglichen Entwurf wieder her. Die gemeldeten Fehler wurden vom Benutzer als behoben bestätigt.
- Ersetzt das native Mehrfachauswahlfeld der Prüfliste durch einzeln anklickbare Markt-Kästchen mit sichtbarer Auswahl. In 0.4.1 enthalten; nicht in der veröffentlichten 0.4.0.

### 0.4.0 (2026-09-12)

**Korrektur der ursprünglichen Freigabeaussage:** Der vollständige Prüflistenablauf war nicht behoben. Übernommene Zeilen konnten im Admin-Entwurf sichtbar bleiben; die Marktauswahl verwendete weiterhin ein natives Mehrfachauswahlfeld. Die ursprüngliche Bezeichnung „End-to-End-Test“ war falsch: Geprüft wurden Editor-/Hilfsfunktionen und Serialisierung, keine vollständige Admin-Bedienung.

- Speichert die serverseitige Startbereinigung bereits übernommener Prüfeinträge auch ohne erneute Artikelübernahme.
- Normalisiert ältere Artikelmarkt-Strings beim Start zu Arrays und erhält Markt-Arrays in den Übernahmefunktionen.
- Die ergänzende lokale Oberflächenkorrektur steht unter „0.4.1“; sie gehört nicht zum veröffentlichten 0.4.0-Paket.

### 0.3.9 (2026-09-11)

- Ersetzt unvollständige 0.3.8-Zwischenstände, die möglicherweise direkt von GitHub installiert wurden, durch eine eindeutig neuere Version.
- Enthält die in PR #37 abschließend geprüfte Vereinheitlichung der Artikelmärkte, Prüflisten-Bereinigung, einspaltige Einkaufslistenansicht, strukturelle Header-Erkennung und Entfernung verwaister Marktüberschriften.
- Keine manuelle Konfigurationsmigration erforderlich; ältere Komma-/Semikolon-Marktwerte werden automatisch vereinheitlicht.

### 0.3.8 (2026-09-11)

- „Verfügbare Märkte“ wird einheitlich als Mehrfachauswahl gespeichert; ältere Komma-/Semikolon-Strings werden weiterhin gelesen und beim Start in Arrays überführt.
- Übernommene Prüflisteneinträge werden nach dem Speichern entfernt, nachdem der Artikelstamm aktualisiert wurde.
- Die aktuelle Einkaufsliste wird als übersichtliche einspaltige Folge von Marktabschnitten dargestellt.
- Formatierte Marktüberschriften werden anhand ihrer Struktur ausgefiltert, auch wenn der Marktname unbekannt oder vertippt ist (zum Beispiel `═════ DROGERIEMART ═════`).
- Marktüberschriften ohne zugehörige aktive Artikel werden beim nächsten Sortierlauf aus der Alexa-Einkaufsliste gelöscht.
- Prüfliste korrigiert: „Übernehmen“ aktualisiert Artikelstamm und sichtbaren Status jetzt sofort im selben Admin-Entwurf.
- Alte Marktüberschriften wie `— LIDL —` werden sicher als Überschriften erkannt und können nicht mehr als Artikel oder Prüflisteneintrag erscheinen.
- Verschachtelte interne Sortierpräfixe werden beim Parsen und in der Admin-Einkaufslistenanzeige rekursiv entfernt.
- Ansicht der aktuellen Einkaufsliste vereinfacht: leere Marktspalten bleiben verborgen; Drag&Drop, Pfeile und Marktauswahl bleiben parallel verfügbar.
- Aktuelle ioBroker-CI-/Checker-Anforderungen übernommen: testing-action-check v2, Node.js 26 in der Matrix, aktuelles @iobroker/testing und auf sieben Einträge begrenzte common.news-Historie.

### 0.3.7 (2026-09-11)

- Interaktive aktuelle Einkaufsliste im Admin ergänzt: Drag&Drop sowie touch-taugliche Pfeil- und Marktauswahl stehen parallel zur Verfügung.
- Manuelle Artikelpositionen und Marktverschiebungen werden lokal gespeichert und haben Vorrang vor der automatischen Sortierung, solange der aktive Listeneintrag existiert.
- Alexa-Schreibzugriffe erfolgen ausschließlich im Adapter; der Browser erhält keine Alexa-/Amazon-Zugangsdaten. Bei Fehlern wird die bestätigte Liste neu geladen.
- Responsive Admin-Darstellung für xs/sm verbessert und die empfohlene Tab-Breite der Responsive Design Initiative ergänzt.
- Prüflisteneinträge behalten nach normalem Speichern nun den idempotenten Status „Übernommen“, statt wieder auf „Offen“ zurückzufallen.

### 0.3.6 (2026-09-04)

- Vermeidbare Repository-Checker-Warnungen bereinigt.
- Den JSON-Config-i18n-Modus explizit gesetzt und alle bestehenden Übersetzungen in die Standard-Sprachdateistruktur verschoben.
- Veralteten Prepublish-Schutz entfernt und ältere Changelog-Einträge archiviert.
- Sortier- und Laufzeitverhalten wurden nicht geändert.

### 0.3.5 (2026-08-17)

- Verbleibende Repository-Re-Review-Bereinigung mit englischem Statistik-Fallback abgeschlossen.
- Release-Deploy auf denselben regulären und getesteten `npm run build`-Pfad vereinheitlicht.
- Veralteten `stable:build`-/Source-Map-Bereinigungspfad entfernt und die zugehörige Regression-Prüfung angepasst.
- Sortierverhalten und Adapterfunktionalität wurden nicht verändert.

### 0.3.4 (2026-08-14)

- Admin-8-Kompatibilität für alle benutzerdefinierten Admin-Komponenten ergänzt und die Admin-Mindestversion auf 8.0.0 gesetzt.
- Logging mit optionaler Sortier-Abschlussmeldung verbessert und Marktüberschriften deutlicher gestaltet (`═════ MARKT ═════`).
- Prüflisten-Funktion „Alle auf Übernehmen stellen“ repariert; fremde Alexa2-States werden nur noch bei bestätigten Werten verarbeitet.
- Veraltete Timing-/API-Konfigurationsoptionen und die interne npm-Versionsprüfung entfernt.
- Code-Obfuscation und überholte Paketvorbereitungswege entfernt.
- Repository-Review- und Kompatibilitätsbereinigung abgeschlossen, einschließlich englischer Runtime-Log-/State-Texte und begrenzter `maxWritesPerMinute`-Verarbeitung.

### 0.3.3 (2026-08-13)

- Neue direkte `00>`–`99>`-Präfixsortierung für Alexa-Listen in A–Z.
- Sehr schnelle inkrementelle Einfügungen in freie Nummernlücken; nur bei ausgeschöpfter Lücke wird das betroffene Suffix neu aufgebaut.
- Direkte Amazon-Antworten bestätigen jede Operation, anschließend verifiziert genau ein direkter Kontrollabruf das vollständige Listenergebnis.
- Verwaltete Alexa-Listen müssen in der Alexa-App auf **A–Z** gestellt sein.

### 0.3.2 (2026-08-11)

- Den bisherigen Puffer-/Marker-/`updatedDateTime`-Sortierer durch genau eine direkte `00>`–`99>`-Präfixarchitektur für Alexa-Listen in A–Z ersetzt.
- Neue Artikel werden mittig in freie Nummernlücken eingesetzt; reicht eine Lücke nicht, wird nur das kleinste notwendige Suffix seriell gelöscht und mit einem Batch neu erzeugt.
- Die Alexa2-Anmeldedaten werden lokal wiederverwendet, ohne Secrets zu loggen oder Alexa2-Itemstates zu beschreiben. Direkte Amazon-Antworten bestätigen jede Operation; genau ein direkter Listenabruf prüft anschließend den Gesamtlauf.
- Einfachen exklusiven Lebenszyklus `IDLE`/`COLLECTING`/`APPLYING` ergänzt: Ein neuer Artikel wartet höchstens fünf Sekunden, der zweite startet den gemeinsamen Lauf sofort.
- Die alte Marker-Transaktion wurde durch ein kompaktes persistentes Direkt-Apply-Journal und Sicherheitsstopp bei unvollständigem oder uneindeutigem Remote-Ergebnis ersetzt.

### 0.3.1 (2026-08-10)

- Neustartschleife im Prüflisten-Lernmodus korrigiert: identische Wiederholungsbeobachtungen schreiben `reviewItems` nicht mehr allein wegen eines neuen `lastSeen`-Zeitpunkts zurück.

### 0.3.0 (2026-08-10)

- Optionale Marktüberschriften ergänzt (jetziges Format: `═════ MARKT ═════`).
- Überschriften bleiben aktiv, solange mindestens ein echter Artikel des Marktes offen ist, und werden danach vollständig gelöscht statt unter erledigten Artikeln stehen zu bleiben.
- Marktübergreifende Zusammenlegung anhand einer konfigurierbaren Mindestanzahl ergänzt.
- Explizite Marktangaben bleiben von der Zusammenlegung ausnahmslos unberührt.
- Die damalige Header-Verwaltung nutzte Alexa2-Datenpunkte (`#New`, `#delete`). Ab 0.3.2 werden Header als normale präfixierte Items über die direkte, lokal authentifizierte Sitzung verwaltet.

Ältere Versionen: CHANGELOG_OLD.md.

Copyright (c) 2026 RaviniZib <zib@ravini.org>