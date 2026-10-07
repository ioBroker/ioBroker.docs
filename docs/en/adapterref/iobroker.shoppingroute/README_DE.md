---
chapters: {"pages":{"en/adapterref/iobroker.shoppingroute/README.md":{"title":{"en":"ShoppingRoute for ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README.md"},"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md":{"title":{"en":"ShoppingRoute – User Guide"},"content":"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md"},"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md":{"title":{"en":"ShoppingRoute – Bedienungsanleitung"},"content":"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md"},"en/adapterref/iobroker.shoppingroute/README_DE.md":{"title":{"en":"ShoppingRoute für ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README_DE.md"}}}
---
# ShoppingRoute für ioBroker

![ShoppingRoute](admin/shoppingroute.png)

**Aktuelle Version: 0.5.1**

ShoppingRoute macht aus einer normalen Alexa-Einkaufsliste eine praktische Einkaufshilfe: **Alle Märkte können gemeinsam in einer einzigen Liste geführt oder bewusst auf mehrere Listen verteilt werden.** Das besondere Merkmal ist das frei einstellbare **Marktrouting**: Für jeden Markt legst du deinen persönlichen Laufweg durch die Abteilungen fest. Dadurch steht die Einkaufsliste in der Reihenfolge, in der du tatsächlich durch den Laden gehst – für weniger Zurücklaufen, weniger Suchen und **schnelleres, effizienteres Einkaufen**.

ShoppingRoute sortiert Alexa-Einkaufslisteneinträge nach Markt, Produktgruppe und dem individuellen Laufweg durch den jeweiligen Markt. Dazu vergibt es sichtbare zweistellige Schlüssel wie `20> Bananen` und `40> ═════ ALDI ═════`; verwaltete Listen müssen deshalb in der Alexa-App auf **A–Z** stehen. ShoppingRoute übernimmt lokal die Alexa2-Authentifizierung für direkte Updates, Deletes und Batch-Creates; Alexa2-Listenstates bleiben die Triggerquelle für externe Änderungen.

## Bedienungsanleitung / User guide

🇩🇪 [**Deutsche Bedienungsanleitung**](/#/docs/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md)  
🇬🇧 [**English user guide**](/#/docs/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md)

## Neu in 0.5.1: bequem am Handy einkaufen

Diese Version behebt die gemeldeten Speicher- und Verschiebefehler der neuen Verwaltungsseite. Im Mittelpunkt steht die Bedienung am Handy während des Einkaufs:

- **Neue Listen tatsächlich in Alexa anlegen:** ShoppingRoute erstellt und bestätigt die Liste in Alexa, bevor sie verwendet wird. Eine ungültige neue Listenverknüpfung wird vor dem Speichern zurückgewiesen und beeinträchtigt keine funktionierenden Listen.
- **Artikel direkt hinzufügen:** Auf der Seite **Einkaufsliste** kannst du neue Artikel eintragen, auch wenn die Alexa-Liste noch leer ist.
- **Bis ans Ende und wieder zurück verschieben:** Eigene Ablageflächen am Listenende, Touch-Griffe, korrigierte Einfügepositionen und leere Rückkehr-Märkte erleichtern das Verschieben. Mit **Weitere Märkte als Ablageziel anzeigen** werden zusätzliche Zielmärkte eingeblendet.
- **Längere Vorgänge verstehen:** Ein gut lesbarer Hinweis erklärt sofort, dass Alexa gerade aktualisiert wird. Das endgültige Ergebnis wird gesondert abgefragt; ein längerer Vorgang wird nicht mehr durch den bisherigen Oberflächen-Timeout als fehlgeschlagen angezeigt.
- **Änderungen behalten:** Löschen, Umordnen und Auswahlen auf der Verwaltungsseite werden sofort gespeichert. Texteingaben bleiben bis zum Druck auf **Speichern** ein Entwurf; **Hinzufügen** übernimmt einen neuen Eintrag. Gespeicherte Änderungen bleiben beim erneuten Öffnen erhalten.
- **Unterbrochene Speicheraktionen vermeiden:** Lokale Katalogänderungen benötigen keine unnötige Amazon-Abfrage mehr. Lerndaten werden ohne Adapter-Neustart gespeichert. Schnelle Änderungen werden nacheinander verarbeitet; bei einem echten Speicherfehler bleiben die Eingaben für einen erneuten Versuch erhalten.
- **Artikel nach einer Alexa-Neunummerierung zurückschieben:** Geänderte Amazon-Artikel-IDs werden bei eindeutigem Artikelnamen sicher zugeordnet. Bei gleichnamigen Artikeln wird keine Zuordnung geraten.

Öffne **ShoppingRoute** in der ioBroker-Seitenleiste auf dem Handy. Zum Ziehen verwendest du den Griff `⋮⋮`; Pfeiltasten und Marktauswahl stehen weiterhin zur Verfügung. Nach dem Update bitte die Verwaltungsseite einmal vollständig neu laden. Alexa-Schreibzugriffe verwenden weiterhin die eingestellten Limits, Dry-Run und Ergebnisprüfungen.

Rückmeldungen zu 0.5.1 bitte im bestehenden [Tester-Thread](https://forum.iobroker.net/topic/85510/test-adapter-shoppingroute-v0.4.4) oder als [GitHub-Issue](https://github.com/RaviniZib/ioBroker.shoppingroute/issues) melden.

## Funktionen

- eigene **ShoppingRoute-Verwaltungsseite** in der ioBroker-Seitenleiste für Einkaufsliste, Artikel, Märkte, Produktgruppen, Laufwege, Listen und Prüfung
- Katalogänderungen werden zur Laufzeit gespeichert und benötigen keinen Adapter-Neustart
- bestätigte Alexa-Listen und neue Einkaufsartikel direkt am Handy anlegen
- sofortiges Speichern von Strukturänderungen; Texteingaben über den Button **Speichern** übernehmen
- Marktnamen werden unabhängig von der Eingabe automatisch in **GROSSBUCHSTABEN** gespeichert; alle Marktverweise werden konsistent mit normalisiert
- Schutz vor versehentlichem Zurücksetzen großer Katalogdaten durch Admin-/Update-Vorgänge

- mehrere Alexa-Einkaufslisten mit eigenem Prioritätsmarkt
- globale, listenbezogene und temporäre Marktpriorität
- Markt-Aliase und automatische Erkennung häufiger Marktvarianten
- optionale, automatisch verwaltete Marktüberschriften wie `═════ ALDI ═════`
- optionale marktübergreifende Zusammenlegung anhand einer Mindestanzahl von Artikeln pro zusätzlichem Markt; explizite Marktangaben bleiben unverändert
- frei pflegbare Produktgruppen und marktbezogene Laufwege
- Laufweg nach Tabellenreihenfolge; Reihenfolgen werden automatisch neu nummeriert
- Artikelstamm mit Aliasen, Produktgruppe, bevorzugtem Markt und verfügbaren Märkten
- verbesserter Mengenparser für Zahlen, Zahlwörter, Packungen, Kisten, halbes Kilo, `6x` usw.
- Duplikaterkennung beim Lernen unbekannter Produkte
- Prüfliste für unbekannte Artikel mit Übernehmen/Ändern/Ignorieren
- automatische oder manuelle Lernstrategie
- intelligente Kategorie-Vorschläge aus Regeln und bereits bekannten Artikeln
- Alias-Vorschläge für erkannte Schreibvarianten
- Sortiervorschau vor Alexa-Schreibzugriffen
- inkrementelle Präfixsortierung `00>`–`99>` mit Lückenerhalt und Suffix-Fallback
- direkte Amazon-Antworten plus ein abschließender Listenabruf als Bestätigung
- API-Schonmodus mit konfigurierbarem Schreibzugriffs-Limit
- lokale Einkaufsstatistik ohne Cloud-Telemetrie
- Konfigurations-Export/Import
- exportierbare/importierbare Marktprofile zum Teilen von Laufwegen
- datenschutzfreundlicher Diagnose-/Feedbackbericht
- Alexa2/alexa-remote2-Diagnose der direkten Sitzung
- Dry-Run für sichere Tests

## Prioritätslogik

Bei der Marktzuordnung gilt:

1. ausdrücklich genannter Markt (`Milch von REWE`)
2. Artikel-Standardmarkt
3. temporärer Prioritätsmarkt
4. Prioritätsmarkt der jeweiligen Alexa-Liste
5. globaler Prioritätsmarkt
6. erster erlaubter Markt aus „Verfügbare Märkte“
7. Fallback-Markt

Anschließend kann ShoppingRoute flexible Artikel marktübergreifend zusammenlegen, wenn ein zusätzlicher Markt die konfigurierte Mindestanzahl nicht erreicht. Dafür werden ausschließlich im Artikelstamm hinterlegte alternative verfügbare Märkte verwendet. Explizite Angaben wie `Milch von LIDL` oder `Eier bei ALDI` werden niemals verschoben.

## Wichtige Datenpunkte

- `info.previewText` – lesbare Sortiervorschau
- `info.reviewQueue` – unbekannte Artikel
- `info.statistics` – lokale Einkaufsstatistik
- `info.traffic` – API-/Schreibzähler
- `info.sortTransaction` – lokales Wiederherstellungsjournal einer laufenden Sortierung; im Normalzustand `{}`
- `info.configExport` – komplette Konfigurationssicherung
- `info.marketProfiles` – teilbare Marktprofile
- `info.versionInstalled` – installierte Adapterversion
- `info.feedbackReport` – bereinigter Diagnose-/Feedbackbericht ohne Einkaufsinhalte
- `control.temporaryPriorityMarket` – temporärer Markt für den aktuellen Einkauf
- `control.importConfigJson` – Konfiguration importieren
- `control.marketProfileImport` – Marktprofil importieren

## Lizenz

ShoppingRoute wird unter der **[MIT-Lizenz](https://github.com/RaviniZib/ioBroker.shoppingroute/blob/main/LICENSE)** veröffentlicht. Frühere bereits veröffentlichte Versionen bleiben unter der jeweils damals gültigen Lizenz.

## Changelog

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