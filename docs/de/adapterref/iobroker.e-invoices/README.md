---
chapters: {"pages":{"en/adapterref/iobroker.e-invoices/README.md":{"title":{"en":"ioBroker.e-invoices"},"content":"en/adapterref/iobroker.e-invoices/README.md"},"en/adapterref/iobroker.e-invoices/docs/en/disclaimer.md":{"title":{"en":"Disclaimer"},"content":"en/adapterref/iobroker.e-invoices/docs/en/disclaimer.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.e-invoices/README.md
title: ioBroker.e-Rechnungen
hash: SxxYiV41M0d7rjVHRXe/MxR4wXAbb0sBkusvDHbEntI=
---
![Logo](../../../en/adapterref/iobroker.e-invoices/admin/e-invoices.png)

![NPM-Version](https://img.shields.io/npm/v/iobroker.e-invoices.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.e-invoices.svg)
![Anzahl der Installationen](https://iobroker.live/badges/e-invoices-installed.svg)
![Aktuelle Version im stabilen Repository](https://iobroker.live/badges/e-invoices-stable.svg)
![NPM](https://nodei.co/npm/iobroker.e-invoices.png?downloads=true)
![Test und Freigabe](https://github.com/sadam6752-tech/ioBroker.e-invoices/workflows/Test%20and%20Release/badge.svg)

# ioBroker.e-Rechnungen

## E-Rechnungs-Adapter für ioBroker

Erstellen Sie ZUGFeRD-E-Rechnungen als PWA mit PDF- und Excel-Export sowie Datensicherung.

Der Adapter betreibt eine kleine Web-App (PWA), mit der Sie deutsche B2B-E-Rechnungen erstellen (ZUGFeRD-Hybrid: lesbares PDF mit eingebettetem EN 16931 XML – das XML ist das führende Steuerdokument), jede ausgestellte Rechnung in einer lokalen Datenbank speichern und alles als versionierte ZIP-Dateien sichern.

Merkmale:

- Entwurf → Problemablauf mit atomaren Rechnungsnummern pro Jahr und Mitarbeiter (`YYYY-EE-NNN` Standardformat `{YYYY}-{EMPLOYEE}-{SEQ}` z.B. `2026-01-012`)
- Angebote („Angebote“) als zweiter Dokumenttyp mit eigener Nummerierung, Gültigkeit und Lebenszyklus – ein einfaches PDF, niemals eine elektronische Rechnung, und eine Umwandlung in einen Rechnungsentwurf.
- ZUGFeRD-Profile BASIC und EN 16931, Offline-XSD-Validierung
- Hybrid-PDF plus eigenständiges XML für jede ausgestellte Rechnung
- Anlagen pro Rechnung (Lieferschein, Arbeitsnachweis) – hochgeladen in der PWA, eingebettet in die PDF/A-3-Datei und, für EN 16931, in die XML-Datei als BG-24
- Excel-Kopien (Einzelrechnungen und gefilterte Listen, als steuerfreie Kopien gekennzeichnet)
- Layoutvorlagen mit Firmenlogo, Farben und Fußzeile (Pflichtinhalte sind durch einen Validator geschützt und können nicht ausgeblendet werden)
- Sicherung und Wiederherstellung (Datenbank plus alle Dateien, SHA-256-Manifest), optional per SFTP auf einen externen Server kopiert
- Steuerbar über Zustände (`control.*` und eine JSON-API für die PWA

## Installieren

Installieren Sie es im Adminbereich: **Adapter** → Filter für `e-invoices` → installieren.

Öffnen Sie nach der Installation die Instanzeinstellungen und überprüfen Sie den API-Port (Standard: 8093). Die PWA ist dann über diesen Port Ihres ioBroker-Hosts erreichbar. Optional können Sie dort ein API-Token festlegen; ohne Token vertraut die API dem lokalen Netzwerk.

## Erste Schritte

1. **Token (empfohlen).** Festlegen `authToken` in den Instanzeinstellungen (ein langer Zufallswert). Ohne Token vertraut die API jedem, der den Port erreichen kann – siehe _Sicherheitshinweise_ .
2. **Öffnen Sie die Web-App** unter `http://<iobroker-host>:8093/` (Sie erreichen die Seite über die IP-Adresse, falls Sie kein Token festgelegt haben.) Mit einem Token fragt die Anmeldeseite dieses einmalig ab und speichert es im Browser.
3. **Firmendaten.** Erstellen Sie unter _„Firma“_ Ihr Firmenprofil: Name, Adresse, Umsatzsteuer-Identifikationsnummer oder Steuernummer, Bankverbindung (IBAN), Kontaktdaten. Die erste Angabe ist die Standardeinstellung und wird in jedes neue Dokument automatisch ausgefüllt. Es können mehrere Firmen angelegt werden (siehe _„Mehrere Firmen“_ ).
4. **Druckvorlage.** Laden Sie unter _„Druckvorlagen“_ ein Logo hoch, wählen Sie Farben, legen Sie die Fußzeile fest und nutzen Sie den Testdruck (Rechnung, Kleinunternehmen, Gutschrift), um das Layout zu prüfen. Pflichtfelder können nicht deaktiviert werden.
5. **Erste Rechnung.** _Rechnungen_ → _+ Neu_ : Verkäufer, Käufer, Positionen, Überprüfung. Ein Entwurf kann frei geändert werden; **die Ausstellung** vergibt die Nummer, erstellt die XML- und die hybride PDF-Datei und sperrt den Datensatz.
6. **Backup.** Erstellen Sie ein Adapter-Backup auf der _Backup-_ Seite und notieren Sie sich, wo das Instanz-Backup (z. B. BackItUp) die Dateien speichert – siehe _Dateien und Backup_ .

## Verwendung

### PWA

Offen `http://<iobroker-host>:8093/` Das Rechnungs-Dashboard umfasst den Reiter „Angebote“, den mehrstufigen Assistenten (Verkäufer → Käufer → Positionen → Überprüfung), Rechnungsdetails mit Validierung, Anhänge und Downloads, Layoutvorlagen mit PDF-Vorschau sowie die **Systemseite** . Die Kopfzeile enthält nur die Reiter – die Schaltflächen „+ Neu“ befinden sich an der Stelle ihrer Listen.

Die **Systemseite** enthält Informationen, die selten benötigt werden, übersichtlich angeordnet in einer Reihe von Registerkarten: **Status** (App-Name, Version, Schema, Zähler und Darstellung – hell, dunkel oder geräteabhängig), **Backup** (Sicherung und Wiederherstellung), **Firma** (Firmendaten, einmalig ausgefüllt) und **Druckvorlagen** . Sie ersetzt die bisherigen Registerkarten „Backup“, „Firma“, „Druckvorlagen“ und „Status“; deren alte Adressen `#/backup`, `#/company`, `#/templates` Und `#/status` Es handelt sich um die Registerkarten der Seite, sodass alte Lesezeichen weiterhin funktionieren.

### Druckvorlagen: Feinabstimmung der Kopfzeile

Neben Logo, Farben und Blöcken enthält eine Druckvorlage zwei Kopfzeilenabstände, beide in mm vom **oberen Rand des Blattes** :

- **Abstand des Logos von der Oberkante** – dem Punkt, an dem das Logo beginnt (leer = 12,7 mm, wo es sich immer befand).
- **Textabstand vom oberen Rand** – wo der Kopfzeilentext beginnt: die kleine Absenderzeile, die Empfängeradresse und die Rechnungsdaten (leer = direkt unter dem Logo).

Sind beide Felder leer, entspricht das Layout exakt dem der Vorlage. Legen Sie nur den Logoabstand fest, folgt der Text dem Logo; legen Sie den Textabstand fest, bleibt der Text an seiner Position, unabhängig vom Logo. So lassen sich Briefköpfe mit vorgedrucktem Logo oder Fensterumschläge visuell mit der PDF-Vorschau abgleichen. Die Werte gelten gleichermaßen für Rechnungen und Angebote. Das Logo der Folgeseiten (sofern es auf jeder Seite abgebildet ist) verwendet denselben Abstand. Zulässige Werte liegen zwischen 0 und 150 mm; ein leeres Feld übernimmt einen Wert zurück.

### Sprache der Web-App

Die Web-App spricht die elf Sprachen von ioBroker: Deutsch, Englisch, Russisch, Portugiesisch, Niederländisch, Französisch, Italienisch, Spanisch, Polnisch, Ukrainisch und Chinesisch (vereinfacht; von jedem chinesischen Browser in jeder Region erkannt). Die Sprache wird in den Instanzeinstellungen ausgewählt (`Web app language`, Registerkarte _Server_ : `auto` oder eine der Sprachen) und die App startet darin. Die erste Übereinstimmung gewinnt:

1. `?lang=xx` in der Adressleiste, z.B. `?lang=fr` (auf diesem Gerät gespeichert),
2. die auf diesem Gerät gespeicherte Auswahl,
3. die Instanzeinstellung —`auto` bedeutet "den Browser fragen",
4. die Sprache des Browsers, wenn es sich um eine der elf handelt,
5. Englisch.

Es wird nur das Wörterbuch der verwendeten Sprache geladen; die anderen sind separate Dateien, die nie abgerufen werden. Ein Satz, der in einem Wörterbuch fehlt, wird auf Englisch angezeigt.

Die Anmeldeseite spricht bereits die Sprache der Instanz: `GET /api/health` (die einzige offene Route) trägt die Einstellung als `pwaLanguage` **Der Dokumentinhalt** bleibt unabhängig von der Bildschirmsprache deutsch (deutsches Steuerrecht, deutsche Rechnungsempfänger): die Rechnungs- und Angebots-PDFs, das XML, die Dokumenttitel (`Rechnung`, `Angebot`, …), die voreingestellten Zahlungsbedingungen und den Text der Kundenmail. Nur deren Bezeichnungen in den Dropdown-Menüs entsprechen der Seitensprache (in der Web-App und in den Instanzeinstellungen).

Die **Exporte** (CSV und Excel: Rechnungsliste, offene Posten, Umsatz, Mahnvorschläge) sind in der Sprache der Webanwendung verfasst: Sie sendet ihre Sprache mit jeder Anfrage (Header). `x-e-invoices-language`; `?lang=xx` Funktioniert bei einem direkten Anruf). Ohne eine solche Einstellung zählt zuerst die _Sprache der Webanwendung_ , dann die Sprache des ioBroker-Systems und schließlich Englisch. Die Zahlen behalten ihr Format (Semikolonliste, Dezimaltrennzeichen), nur Titel, Hinweise und Spaltenüberschriften ändern sich. Zwei Dinge bleiben absichtlich auf Deutsch: die Excel-Kopie einer einzelnen Rechnung (eine Kopie eines deutschen Steuerdokuments) und die DATEV-Datei (deren Header durch DATEV vorgegeben sind).

Die **Mahnschreiben** verwenden die Sprache des ioBroker-Systems ( _Systemeinstellungen → Sprache_ ). Ist keine der elf verfügbaren Sprachen ausgewählt, wird Englisch verwendet. Dies betrifft die vordefinierten Texte der drei Stufen, das Datums- und Betragsformat, den Skontosatz und die PDF-Datei der Schreiben. Ein auf der Seite „Mahnwesen“ geänderter Text bleibt unverändert. Da die Mahnschreiben an Kunden gerichtet sind, ist die Sprache nicht an die Bildschirmdarstellung angepasst.

### HTTPS und die Installation der Web-App auf einem Telefon

Ein Smartphone installiert die Web-App nur von einer **sicheren Quelle** – iOS (iPhone, iPad) benötigt dafür HTTPS; über unverschlüsseltes HTTP bleibt sie ein Lesezeichen. Der Adapter antwortet selbst über HTTPS mit einem Zertifikat aus der Zertifikatssammlung von ioBroker, demselben, das auch der Webadapter verwendet – ein Reverse-Proxy ist nicht erforderlich.

1. Aktivieren Sie in den Instanzeinstellungen die Option **„HTTPS verwenden** “ und wählen Sie das **öffentliche Zertifikat** , den **privaten Schlüssel** und, falls vorhanden, die **Zertifikatskette** aus. Die Einträge finden Sie unter **„Admin > Einstellungen > Zertifikate“** (`defaultPublic` /`defaultPrivate` (Es handelt sich um das selbstsignierte Zertifikatspaar, das ioBroker selbst erstellt; ein Let's Encrypt-Zertifikat wird auf die gleiche Weise ausgewählt).
2. Speichern – die Instanz wird neu gestartet und die Web-App antwortet bei `https://<host>:<port>/` Der Link der Instanz in den Admin-Schaltern wird auf `https` von allein.
3. Öffnen Sie auf dem iPhone oder iPad diese Adresse in Safari und wählen Sie dann **Teilen > Zum Home-Bildschirm hinzufügen** .

Wenn das Zertifikat fehlt oder nicht gelesen werden kann, greifen Web-App und API **nicht** auf unverschlüsseltes HTTP zurück: Sie bleiben nicht verfügbar, und im Protokoll wird der Grund angegeben (die Übertragung eines API-Tokens über eine unverschlüsselte Leitung wurde durch die Aktivierung von HTTPS verhindert). Ein selbstsigniertes Zertifikat führt zu einer Browserwarnung, und das Smartphone installiert die App nur, wenn es dem Zertifikat **vertraut** : Installieren Sie das Zertifikat auf dem Smartphone (iOS: zusätzlich unter Einstellungen > Allgemein > Info > Zertifikatsvertrauenseinstellungen aktivieren) oder verwenden Sie ein Zertifikat einer anerkannten Zertifizierungsstelle. Das Zertifikat muss die eingegebene Adresse (Hostname oder IP-Adresse) enthalten. Der Adapter sendet keinen HSTS-Header, sodass das Deaktivieren von HTTPS weiterhin funktioniert.

Wenn der Browser die Ausnahme für ein selbstsigniertes Zertifikat vergisst oder das Zertifikat erneuert wird, kann die Webanwendung (die aus dem Cache geladen wird) die API nicht mehr erreichen: Der Browser blockiert die Anfragen stillschweigend. Die Webanwendung zeigt dann _die Meldung „Der Server ist nicht erreichbar“_ mit einer Schaltfläche _zum Neuladen_ an. Durch das Neuladen der Seite wird die Warnung erneut angezeigt, und durch deren Bestätigung wird die Verbindung wiederhergestellt. Der Adapter lädt das Zertifikat beim Start, daher muss die Instanz nach einer Erneuerung neu gestartet werden.

### Helles und dunkles Erscheinungsbild

Die Web-App bietet ein helles und ein dunkles Erscheinungsbild. Auf der **Statusseite** stehen drei _Darstellungsoptionen_ zur Verfügung: **„System“** (Geräteeinstellung anpassen – Standard), **„Hell** “ und „ **Dunkel** “. Die Auswahl ist gerätespezifisch (sie wird wie die Sprache im Browser gespeichert) und wird angewendet, bevor die Seite geladen wird. So wird beispielsweise bei der dunklen Darstellung kein helles Aufblitzen verursacht. Im _Modus „System“_ passt sich die App auch während der Nutzung dem Gerät an, beispielsweise wenn ein Smartphone abends in den Dunkelmodus wechselt. Nur die Benutzeroberfläche ändert sich: PDFs, Testdrucke und Excel-Dateien bleiben unverändert, da es sich um Dokumente handelt, die nicht vom Gerät abhängen dürfen.

### Anlagen

Ein Entwurf kann bis zu 10 Dateien (PDF, PNG oder JPEG, je 5 MB) enthalten – Lieferscheine, Leistungsnachweise, Auftragsbestätigungen. Laden Sie diese in der Detailansicht oder im letzten Schritt des Assistenten hoch („Entwurf speichern“ zuerst: Eine Datei benötigt einen gespeicherten Datensatz). Der Dateityp wird aus den Magic Bytes der Datei ermittelt, niemals aus dem Namen oder dem deklarierten MIME-Typ.

Bei Ausstellung werden die Anhänge Bestandteil der elektronischen Rechnung:

- **PDF/A-3:** Jede Datei wird als zugehörige Datei mitgeliefert (`Names → EmbeddedFiles` und dem Katalog `/AF`, `AFRelationship /Data`), und die Sichtkomponente listet sie unter „Anlagen“ mit Typ und Größe auf.
- **EN 16931 XML:** Jede Datei wird als BG-24 „Zusätzliche Begleitdokumente“ geschrieben (`BT-122` Referenz, `BT-123` Beschreibung, `BT-125` base64-Payload) – eingebettet, nicht verlinkt und wie der Rest XSD-validiert. Factur-X's **BASIC** XSD hat keine `AdditionalReferencedDocument` Eine BASIC-Rechnung behält ihre Dateien also nur im PDF-Container (sie sind weiterhin eingebettet).
- Ausgestellte Rechnungen sind gesperrt (GoBD): Die Anlagen können zwar aufgelistet und heruntergeladen, aber nicht mehr hinzugefügt oder gelöscht werden. Anhänge vergrößern die Artefakte und das Backup merklich (eine 5-MB-Datei zählt einmal im PDF, einmal als Base64-kodiertes XML und einmal als eigener Eintrag im Backup-ZIP).

### Angebote (Angebote)

Ein Angebot ist neben der Rechnung ein zweiter Dokumenttyp: Es teilt sich Datensatz, Positionen, Anhänge, Darstellungsverlauf und Sicherungskopie mit ihr, ist aber keine elektronische Rechnung. Erstellen Sie eins mit `POST /api/invoices` (`docType: "quote"`) und listen Sie nur Angebote auf, die `GET /api/invoices?docType=quote` Die

- **Eigener Zahlenkreis:** bietet Zahl als `A-YYYY-EE-NNN` Das Muster ist die Instanzeinstellung "Angebotsnummernformat" (`quoteNumberFormat`, Standard `A-{YYYY}-{EMPLOYEE}-{SEQ}` Angebote verbrauchen niemals eine Rechnungsnummer – die Rechnungsnummer bleibt fortlaufend (§ 14 Abs. 4 Nr. 4 UStG).
- **Eigene Gültigkeit:** `validUntil` Die Gültigkeitsdauer („Gültig bis“) beträgt standardmäßig 30 Tage ab Ausstellungsdatum und wird auf dem Angebot abgedruckt. Angebote haben kein Aufbewahrungsdatum (Rechnungen betreffend § 147 AO) und keine Leitweg-ID.
- **Klares PDF, niemals eine elektronische Rechnung:** kein CII-XML, kein PDF/A-3-Container, kein BG-24 und kein `pdfaid` Anspruch. Auf der Ausgabeseite wird nur die PDF-Datei gespeichert; die Anhänge sind unter „Anlagen“ mit dem Hinweis aufgeführt, dass sie separat und nicht eingebettet übertragen werden. `POST /api/invoices/:id/validate` Es werden ausschließlich Geschäftsergebnisse gemeldet – es gibt kein EN 16931-Dokument, das überprüft werden könnte, daher werden auch keine XSD-Ergebnisse gemeldet.
- **Lebenszyklus:** Entwurf → geöffnet → angenommen oder abgelehnt oder abgelaufen nach Ablauf der Gültigkeitsdauer (berechnet ab dem Datum, ohne Zeitlimit). Die Entscheidung wird mit ihrem Zeitstempel gespeichert. `POST /api/invoices/:id/quote-accept` oder `…/quote-reject` mit Freitextbegründung; die erste Entscheidung zählt und eine zweite wird abgelehnt. Das Sichtungs-PDF druckt es („Angenommen am …“, „Abgelehnt am …: …“, „Das Angebot ist am … verfallen.“).
- **Konvertierung:** `POST /api/invoices/:id/convert` erstellt einen _Rechnungsentwurf_ (die Nummer wird wie üblich bei der Ausstellung vergeben), der Kopfzeile und Positionen kopiert, die Datumsangaben übersetzt und die Verknüpfung beibehält (`sourceDocumentId`, gedruckt als „Zugrunde liegendes Angebot“ / „Daraus hervorgegangene Rechnung(en)“). Standardmäßig muss das Angebot angenommen worden sein –`{ "requireAccepted": false }` Dies setzt sich außer Kraft – und ein zweiter offener umgewandelter Entwurf wird abgelehnt. Das Angebot selbst wird nicht angetastet.
- **Keine Einnahmen:** Angebote werden nie eingefordert und bleiben aus den Buchhaltungsexporten heraus. CSV- und XLSX-Dateien exportieren nur Rechnungen, es sei denn, der Anrufer wünscht etwas anderes: ohne `docType` Parameter, die an Rechnungen gebunden sind, das explizite Gegenwort ist `?docType=all` (Und `?docType=quote` DATEV exportiert nur die Angebote). DATEV enthält niemals ein Angebot.

In der PWA haben Angebote einen eigenen Tab ( **Angebote** ): Die Liste zeigt den Status (offen, angenommen, abgelehnt, abgelaufen), speichert die Antwort des Kunden und wandelt ein angenommenes Angebot mit einem Klick in einen Rechnungsentwurf um („In Rechnung umwandeln“). „+ Neues Angebot“ öffnet den Assistenten mit vorausgewähltem Dokumenttyp – denselben Assistenten wie für Rechnungen, jedoch ohne die rechnungsspezifischen Felder: kein „Fälligkeitsdatum“, kein Konto, keine Zahlungsbedingungen, sondern ein „Gültig bis“-Datum, das dem Ausstellungsdatum folgt (30 Tage), solange es unverändert bleibt. Ein aus einem Angebot erstellter Rechnungsentwurf verlinkt zurück („Zugrunde liegendes Angebot“), und das Angebot listet die daraus erstellten Rechnungen auf. Die Texte auf jedem Bildschirm stammen aus einer Tabelle pro Dokumenttyp (`src-www/src/labels.ts`), was die Serverkonfiguration widerspiegelt `documentLabels()` — Auf dem Angebotsbildschirm wird „Rechnung“ nicht angezeigt. Die Buchungsliste und die drei Buchhaltungsexporte bleiben angeheftet. `docType=invoice` Die beiden Dokumenttypen vermischen sich daher nie.

### DATEV-Export

Die Schaltfläche **DATEV** in der Rechnungsliste erstellt einen _Buchungsstapel_ im DATEV-Format (EXTF, Format 700, Kategorie 21), den ein Steuerberater in DATEV Rechnungswesen importiert. Jeder Benutzer hat einen eigenen Berater; die Nummern, die die Datei mit der Buchhaltung des Beraters verknüpfen, stammen aus den Instanzeinstellungen, Registerkarte **DATEV** .

| Einstellung                      | Bedeutung                                                                        |
| -------------------------------- | -------------------------------------------------------------------------------- |
| Beraternummer / Kundennummer     | _Beraternummer_ und _Mandantennummer_ von Ihrem Steuerberater – **erforderlich** |
| Kontenplan                       | SKR03 (Standard) oder SKR04                                                      |
| Kontolänge                       | Länge der Hauptbuchkonten, standardmäßig 4                                       |
| Erster Monat des Geschäftsjahres | 1. Januar                                                                        |
| Debitorenkonto                   | Kollektivschuldner, leer =`10000` (mit Kontolänge 4)                             |
| Umsatzkonten 19 % / 7 % / 0 %    | leer = SKR03 `8400` /`8300` /`8100`, SKR04 `4400` /`4300` /`4100`                 |

- Ohne Berater- und Kundennummer existiert **keine DATEV-Datei** – der Export zeigt an, was fehlt. Die CSV- und Excel-Listen funktionieren auch ohne diese Angaben.
- Eine Zeile pro Rechnung und Mehrwertsteuersatz: Bruttobetrag, Belastung des Debitorenkontos, Gutschrift des Erlöskontos (ein _Automatikkonto_ , das die Mehrwertsteuer automatisch abzieht, sodass kein BU-Schlüssel erstellt wird). Eine Gutschrift wird umgekehrt gebucht ( _Haben_ ). Eine stornierte Rechnung und ihre Storno-Nummer sind beide in der Datei und heben sich gegenseitig auf. Angebote und Entwürfe werden nie gebucht.
- Eine Datei enthält **ein Geschäftsjahr** : Verkleinern Sie den Zeitraum, wenn die Rechnungen mehr als ein Geschäftsjahr umfassen.
- Die Datei ist `EXTF_outgoing-invoices….csv` Windows-1252, mit der Rechnungsnummer im _Belegfeld 1_ (Zeichen DATEV werden nicht übernommen) `-`).
- Die Erlöskonten sind Standardkonten. Für Reverse-Charge-Verfahren, innergemeinschaftliche Lieferungen oder Exporte werden andere Konten benötigt – wenden Sie sich an Ihren Berater und richten Sie das 0%-Konto entsprechend ein. Eine Instanz umfasst einen DATEV-Kunden; bei mehreren Unternehmen mit unterschiedlichen Kunden filtern Sie den Export nach Unternehmen und passen die Einstellungen an.
- **Nicht anhand eines echten DATEV-Imports verifiziert** (hier kein DATEV-Zugriff): Das Layout entspricht der veröffentlichten Formatbeschreibung. Lassen Sie Ihren Betreuer den ersten Import prüfen.

### Datumsbereich für Listen und Exporte

Die Rechnungsliste verfügt über einen **Zeitraumfilter** : Schnellauswahl (dieser Monat, letzter Monat, dieses Quartal, letztes Quartal, dieses Jahr, letztes Jahr) oder zwei freie Tage _(Von_ / _Bis)_ . Gefiltert wird nach **Rechnungsdatum** , wobei **beide Tage innerhalb des Zeitraums liegen** – vom 1. August bis zum 31. August sind alle Rechnungen beider Tage enthalten. Eine Seite kann leer bleiben (offenes Ende).

- Excel, CSV und DATEV übernehmen exakt den Filter der Liste, sodass das, was Sie sehen, auch exportiert wird. Der Dateiname benennt den Bereich: `invoices_2026-08-01_2026-08-31.csv` (`…_from-…` oder `…_to-…` (für ein offenes Ende), und das zeigt auch der Excel-Titel an.
- Exporte enthalten **alle** zugehörigen Rechnungen (ohne Seitenbegrenzung) in chronologischer Reihenfolge und **niemals Entwürfe** – Entwürfe haben keine Buchungsnummer. Ein Entwurf wird nur dann in einen Export aufgenommen, wenn der Status „Entwurf“ explizit angefordert wird.
- API: `from` Und `to` (ISO-Datum, `2026-08-01`) An `GET /api/invoices` und auf den drei Exportrouten; ein fehlerhaftes Datum oder ein Bereich, der endet, bevor er beginnt, beantwortet `400` Sie verbinden sich mit `status`, `companyId`, `q` Und `docType` Die

### Mehrere Unternehmen

Jedes Dokument ist mit dem Firmenprofil verknüpft, für das es erstellt wurde (die im Assistenten ausgewählte Firma; ein neues Dokument beginnt mit der Standardfirma). Diese Verknüpfung wird mit dem Dokument gespeichert und bleibt somit auch nach späteren Profiländerungen erhalten. Eine Storno-Gutschrift und eine auf einem Angebot basierende Rechnung übernehmen die Firma des ursprünglichen Dokuments.

- Die Rechnungsliste erhält einen Firmenfilter, sobald zwei oder mehr Firmen vorhanden sind (auch `?companyId=` auf der Liste und Exportrouten; `none` = Dokumente ohne Firmenzugehörigkeit).
- **Einnahmen** (`#/revenue`, `GET /api/reports/revenue-by-company`, Auch `.csv` Und `.xlsx` Die ausgestellten Rechnungen werden pro Unternehmen für ein Jahr oder für alle Unternehmen addiert, abzüglich der eigenen Gutschriften (z. B. für eine Teillieferung). Angebote, Entwürfe und Storno-Dokumente werden nicht berücksichtigt; eine stornierte Rechnung wird zusammen mit dem zugehörigen Storno-Dokument nicht berücksichtigt.
- Dokumente aus der Zeit vor der Bindung haben keine Gesellschaft und bilden eine eigene Zeile „ohne Gesellschaft“, sodass die Summe immer der Summe der einzelnen Dokumente entspricht.
- Die **Rechnungsnummer bleibt für alle Unternehmen gleich** – an der Nummerierung hat sich nichts geändert, keine bestehende Nummer wurde verschoben.

### XRechnung (Kunden aus dem öffentlichen Sektor)

Öffentliche Stellen in Deutschland benötigen eine **XRechnung** : die reine XML-Datei (Standard-XRechnung 3.0, CII-Syntax), ohne PDF-Container. Der Adapter erstellt sie als zweites Rechnungsformat neben dem Standardformat ZUGFeRD.

- **Wählen Sie im Assistenten („Rechnungsformat“, erster Schritt) das Format** pro Dokument aus oder legen Sie das Standardformat für neue Rechnungen in den Instanzeinstellungen fest („Standard-Rechnungsformat“). Ein Entwurf kann bis zur Ausstellung geändert werden; ein ausgestelltes Dokument behält sein Format.
- **Leitweg-ID:** Der Käufer benötigt die Routing-ID der Behörde (BT-10, Regel BR-DE-15). Der Assistent und die Kundenliste enthalten ein Feld dafür; eine XRechnung ohne diese Angabe wird bei der Ausstellung abgelehnt, und es wird keine Nummer verbraucht. Es wird lediglich die **Syntax** geprüft (Buchstaben, Ziffern und Bindestriche, maximal 46 Zeichen) – die Prüfsumme existiert nur für einige Bundesländer, daher würde eine strengere Prüfung gültige IDs ablehnen.
- **Pflichtangaben:** Ansprechpartner des Verkäufers, Telefonnummer und E-Mail-Adresse (BT-41/42/43), IBAN des Verkäufers, E-Mail-Adresse des Käufers (BT-49). Fehlende Angaben werden vor der Erstellung des Kontos gemäß ihrer jeweiligen Regel ergänzt.
- **Sie erhalten:** die XML-Datei mit der XRechnung-Kennung und dem Peppol-Geschäftsprozess (BT-23/24) sowie eine einfache PDF-Ansicht – diese enthält **kein XML** und beansprucht kein PDF/A-3-Format. Die XML-Datei ist die Rechnung: Senden Sie diese an die Behörde (z. B. über deren Portal). Die Detailseite beschriftet die Schaltflächen entsprechend und bietet keine Schaltfläche zum Versenden der PDF-Datei per E-Mail für eine XRechnung. Anhänge werden innerhalb der XML-Datei übertragen (BG-24); eine Gutschrift (Storno) behält das Format ihrer Rechnung bei.
- **Geprüft:** die Beispielfälle von `npm run validate` zwei XRechnungen enthalten; der KoSIT-Validator (Szenario "EN16931 XRechnung (CII)", XRechnung-Konfiguration 2026-08-31) akzeptiert sie.
- Angebote haben nie ein bestimmtes Format: Es sind einfach nur PDFs.

### Dunning (Mahnwesen)

Die Seite „Mahnwesen“ zeigt für jede überfällige, unbezahlte Rechnung den **nächsten Schritt** mit bereits ausgefülltem Text an: Zahlungserinnerung, 1. Mahnung, 2. Mahnung. Ein Schritt wird ab einem Tag nach dem Fälligkeitsdatum vorgeschlagen (Standardwerte: 5, 19 und 33 Tage) und eine Zahlungsfrist festgelegt (7, 7 und 5 Tage). Die drei Texte, die Tage und die Fristen können auf derselben Seite bearbeitet werden (Platzhalter). `{number}`, `{customer}`, `{issueDate}`, `{dueDate}`, `{amount}`, `{days}`, `{deadline}`, `{seller}` und wurde zum integrierten Text zurückgeführt.

- **Der Adapter sendet nichts.** Kopieren Sie den Text und öffnen Sie ihn in Ihrem E-Mail-Programm (`mailto:` Sie können einen Link hinzufügen, wenn der Kunde eine E-Mail-Adresse hat, oder alle Rechnungen als eine PDF-Datei ausdrucken (eine Seite pro Rechnung). Eine CSV-Liste ist ebenfalls verfügbar. Klicken Sie anschließend auf **„Als Erinnerung markieren“** – dadurch wird die Rechnung in die nächste Ebene verschoben; Ebene und Datum werden angezeigt.
- Ein Brief ist keine elektronische Rechnung: **Es wird kein XML-Dokument erstellt** , und das PDF enthält keine PDF/A-Ansprüche.
- Gebühren und Verzugszinsen sind **nicht** im Voraus festgelegt – dies ist eine rechtliche Entscheidung des Absenders.
- Bezahlte Rechnungen, Angebote, Storno-Gutschriften und stornierte Originale werden nie nachgehakt; nichts wird zweimal am selben Tag vorgeschlagen und nach dem zweiten Mahnschreiben gibt es keine Vorlage mehr.
- Für Dashboards und Skripte der Status `info.reminderSuggestions` speichert die Vorschläge im JSON-Format; die API bietet `GET /api/dunning/suggestions` (Auch `.csv`, `.pdf`) Und `/api/dunning/texts` Die

### Offene Posten

Der Reiter _„Offene Posten“_ listet die unbezahlten, ausgestellten Rechnungen mit ihrem Fälligkeitsdatum auf und summiert sie: nach Fälligkeitskategorie (nicht fällig · 1–30 · 31–60 · 61–90 · über 90 Tage überfällig), nach Kunde und insgesamt, mit einem Schalter für den überfälligen Anteil und einem _Stichtag_ . Das Dashboard enthält eine einzeilige Kachel mit denselben Summen. Die Liste ist auch als CSV- und Excel-Datei verfügbar. `GET /api/open-items`, `.csv`, `.xlsx`, Filter `asOf=YYYY-MM-DD` Und `onlyOverdue=1` Alle drei Werte stammen aus einer einzigen Berechnung, daher sind ihre Summen identisch.

Was zählt: Ausgestellte **Rechnungen** , die **nicht als bezahlt gekennzeichnet** sind. Angebote, Entwürfe, stornierte Originale, Storno-Gutschriften und Dokumente mit dem Titel _„Gutschrift“_ zählen nicht – da der Datensatz keine Zuordnung einer Gutschrift zu der beglichenen Rechnung enthält, werden sie nicht berücksichtigt, anstatt geschätzt zu werden. Der Datensatz enthält auch keine Teilzahlungen, sodass der offene Betrag einer Rechnung ihrem Bruttobetrag entspricht. Eine Rechnung ohne Fälligkeitsdatum wird als _nicht fällig_ aufgeführt. Die Mahnliste (`info.overdue*` Die engere Variante ist: Sie beginnt fünf Tage nach dem Fälligkeitstermin und bleibt nach einer Erinnerung einen Tag lang ruhig.

### Staaten

- `info.connection`, `info.invoiceCount`, `info.draftCount`, `info.issuedCount`, `info.lastNumber`, `info.lastIssuedAt`, `info.dbVersion`, `info.lastBackup`, `info.backupWarning` (leer = Backup ist aktuell), `info.lastRemoteBackup` Und `info.remoteBackupError` (Auf den externen Server kopieren, leer = in Ordnung)
- `control.createDraft` (Schaltfläche: erstellt einen leeren Entwurf, ID landet in `control.lastDraftId`), `control.issueId` +`control.issue` (Schaltfläche: erstellt einen Entwurf) `control.refresh`, `control.backup`, `control.restoreId` +`control.restore` (Schaltflächen für Sicherung/Wiederherstellung)

### Dateien und Sicherung

Ausgestellte Dokumente (PDF/XML/XLSX), Logos und Sicherungs-ZIPs befinden sich unterhalb der `e-invoices.0.storage` Datei einbinden. Die Datenbankdatei `invoices.db` befindet sich im Instanzdatenverzeichnis.

#### BackItUp (ioBroker-Backup) im Vergleich zum Adapter-Backup

|                                                        | ioBroker-Backup (z. B. BackItUp)                                                                             | Adapter-Backup (ZIP)                                           |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| Enthält die PDFs, XML-Dateien, Excel-Dateien und Logos | Ja (`files/e-invoices.0.storage`)                                                                           | Ja                                                             |
| Enthält die **Rechnungsdatenbank**                     | **NEIN** -`invoices.db` befindet sich im Instanzdatenverzeichnis, das nicht Teil eines ioBroker-Backups ist. | ja, wie `dump.json`                                             |
| Bei Wiederherstellung verifiziert.                     | NEIN                                                                                                         | SHA-256-Manifest, Wiederherstellungsvorschau, Sicherheitskopie |
| Wiederherstellen                                       | Stellen Sie ioBroker und anschließend die Dateien wieder her.                                                | PWA _-Sicherungsseite_ oder `control.restore`                   |

**Die Datenbank erreicht ein ioBroker-Backup nur über den Adapter ZIP.** Die ZIPs werden geschrieben nach `e-invoices.0.storage/backups/` Dies ist Teil der Dateien, die ein ioBroker-Backup erstellt. Ohne eine ZIP-Datei werden bei der Wiederherstellung eines ioBroker-Backups zwar die Dokumente wiederhergestellt, jedoch nicht die Rechnungsnummern, die Zählerstände, der Status und die Mahnungen. Daher:

- Die **automatische Datensicherung ist standardmäßig aktiviert** (alle 1440 Minuten = täglich, _Sicherungsintervall in Minuten_ einstellen, 0 = deaktiviert). Das Intervall wird ab der letzten automatischen Datensicherung gezählt, sodass ein Neustart des Adapters weder eine Sicherung überspringt noch wiederholt; falls eine Sicherung überfällig ist, wird sie eine Minute nach dem Start ausgeführt.
- Die letzten **7 automatischen Backups werden aufbewahrt** (Einstellung _„Automatische Backups“: Aufbewahren_ , 0 = Alle behalten). Nur Dateien mit dem Namen `e-invoices-auto-….zip` werden jemals gelöscht. Manuelle Backups (`e-invoices-backup-….zip`) und die Sicherheitskopien vor einer Wiederherstellung (`…-prerestore-…`) werden niemals gelöscht.
- Die _Backup-_ Seite und der Status `info.backupWarning` Es wird eine Warnung ausgegeben, wenn keine Sicherung vorhanden ist oder die neueste Sicherung älter als das Doppelte des Sicherungsintervalls ist (mindestens zwei Tage; eine Woche, wenn die automatische Sicherung deaktiviert ist). Der Status ist leer, wenn alles in Ordnung ist, sodass eine Benachrichtigung ausgelöst werden kann.
- Bei Instanzen, die vor Version 0.9.2 installiert wurden, bleibt das gespeicherte Intervall erhalten (der alte Standardwert war 0 = aus): Es kann in den Instanzeinstellungen festgelegt werden.

Für die Notfallwiederherstellung verwenden Sie **beides** : ein ioBroker-Backup des gesamten Systems und die Adapter-ZIPs (diese werden darin gespeichert). Um auf ein anderes System zu wechseln, stellen Sie dort ein Adapter-Backup-ZIP über die PWA wieder her. `control.restoreId` +`control.restore` Die Wiederherstellung überprüft zunächst die Prüfsummen und ersetzt die Datenbank in einer einzigen Transaktion.

Bei Verwendung des BackItUp-Adapters müssen diese Adapterinstanz und ihre Dateien in den Sicherungsauftrag aufgenommen werden – und dies sollte einmal im Archiv überprüft werden. `files/e-invoices.0.storage/backups/` enthält eine ZIP-Datei.

#### Auf einen externen Server kopieren (SFTP)

Ein Backup, das sich auf demselben Rechner wie die Datenbank befindet, geht bei Ausfall dieses Rechners verloren. Die Registerkarte _„Externes Backup“_ in den Instanzeinstellungen kopiert **jedes Backup** (automatisch und manuell) per **SFTP** auf einen anderen Computer, beispielsweise ein NAS. Der Adapter öffnet die SSH-Verbindung selbst: kein Mounten, kein …`sudo`, kein Shell-Befehl.

1. Erstellen Sie auf dem Server einen Benutzer, der nur in das Zielverzeichnis schreiben darf (kein Administrator) und schalten Sie SFTP ein (auf einem Synology: _Systemsteuerung → Dateidienste → FTP → SFTP-Dienst aktivieren_ ).
2. In den Instanzeinstellungen unter _„Externe Sicherung“_ die Kopie aktivieren und Host, Benutzername, Passwort und das Verzeichnis eingeben (dieses wird erstellt, falls es fehlt). Das Passwort wird verschlüsselt gespeichert und niemals im Protokoll protokolliert.
3. Klicken Sie auf _„Verbindung testen“_ : Der Adapter meldet sich an, erstellt das Verzeichnis, schreibt und löscht eine kleine Testdatei und zeigt den **Fingerabdruck** des Servers an. Geben Sie diesen Fingerabdruck in den Einstellungen ein, um nur diesem Server zu vertrauen – ein anderer Server wird dann abgelehnt, bevor das Passwort gesendet wird. Auch ohne Fingerabdruck funktioniert das Kopieren, der Server wird jedoch nicht verifiziert (das Protokoll warnt bei jedem Kopiervorgang mit dem Fingerabdruck).

So verhält es sich:

- Zuerst wird eine lokale Sicherung erstellt. Schlägt das Kopieren fehl, bleibt die Sicherung erhalten, der Fehler wird protokolliert und angezeigt. `info.remoteBackupError` Das wird auch auf der Sicherungsseite angezeigt. Ein fehlgeschlagener Kopiervorgang wird **nicht wiederholt** : Die nächste Sicherung wird erneut kopiert, da sie alle Daten enthält.
- Eine Kopie erscheint erst unter ihrem endgültigen Namen, wenn sie fertiggestellt ist (sie wird hochgeladen als `.part` Die Größe der Datei wird überprüft und sie wird umbenannt. Die gesamte Kopie ist auf zehn Minuten begrenzt. Eine halbe Datei eines fehlgeschlagenen Uploads wird sofort gelöscht, solange die Verbindung noch funktioniert; andernfalls wird sie von der nächsten erfolgreichen Kopie gelöscht (nur `e-invoices-auto-….zip.part` Und `e-invoices-backup-….zip.part`, sonst nichts).
- _Die Option „Kopien auf dem Server behalten“_ löscht die ältesten **automatisch erstellten** Kopien ab einer bestimmten Anzahl (0 = alle behalten). Manuell erstellte Backups und alle anderen Dateien im Verzeichnis werden niemals gelöscht.
- Es wird nur die Anmeldung mit Passwort unterstützt. Die ZIP-Datei ist **nicht verschlüsselt** (siehe _Sicherheitshinweise_ ): Die Übertragung ist verschlüsselt, die Datei auf dem Server jedoch nicht – speichern Sie sie auf einem Datenträger, auf den nur Sie Zugriff haben.

### API

Same-Origin JSON API unter `/api` (Gesundheitsstatus, Rechnungsbearbeitung (CRUD), Erstellung, Validierung mit einem gespeicherten Bericht, XML/PDF/XLSX-Downloads, Anhänge eines Entwurfs – Liste, Upload als Base64-JSON, Download, Löschung –, Angebote (Liste nach Dokumenttyp, annehmen, ablehnen, in einen Rechnungsentwurf umwandeln), Vorlagen mit Logo-Upload und PDF-Vorschau, Backups, Wiederherstellung, offene Elemente als JSON, CSV und Excel). Mit einem konfigurierten API-Token ist jede Route außer `/api/health` benötigt ein `Authorization: Bearer <token>` Kopfzeile.

## Elektronische Rechnungen kurz erklärt

Ab 2025 müssen deutsche Unternehmen elektronische Rechnungen **empfangen** können, und ab 2027/2028 wird die Pflicht zur **Ausstellung** von E-Rechnungen im B2B-Bereich schrittweise ausgebaut. Eine E-Rechnung ist ein strukturiertes XML-Dokument (Standard EN 16931); ein reines PDF ist keine E-Rechnung.

- **ZUGFeRD / Factur-X** (was dieser Adapter erzeugt): eine PDF/A-3-Datei, die das XML enthält. Benutzer lesen die PDF-Datei, Software liest das XML. **Das XML ist das führende Dokument** – bei Abweichungen ist das XML maßgebend. Der Adapter erzeugt das EN-16931-Profil.
- **XRechnung** ist ein reines XML-Format, das hauptsächlich für öffentliche Auftraggeber (B2G) verwendet wird. Der Adapter erstellt es ebenfalls, als zweites Format neben ZUGFeRD – siehe „XRechnung (Kunden aus dem öffentlichen Sektor)“.
- Jede ausgestellte Rechnung wird bei Ausstellung anhand des XSD-Schemas geprüft; die PDF/A-3-Struktur und das XML wurden zusätzlich mit dem KoSIT-Validator und veraPDF validiert (siehe `docs/en/validation.md` Führen Sie vor der produktiven Nutzung Ihre eigene Abnahmeprüfung durch.

## Retention und GoBD

- Eine **ausgestellte Rechnung ist unveränderlich** . Ein Fehler wird mit einer **Storno** (Gutschrift) und einer neuen Rechnung korrigiert – niemals durch Bearbeitung. Der Nummernkreis bleibt pro Jahr und Mitarbeitercode lückenlos.
- Jede ausgestellte Rechnung vermerkt ihr **frühestes Löschdatum** (`retain_until`): Ende des **zehnten** Jahres nach dem Ausstellungsjahr. Dies ist eine bewusst vorsichtige Wahl und nicht die gesetzliche Mindestaufbewahrungsfrist: Für Rechnungen beträgt die Aufbewahrungsfrist seit 2025 **acht Jahre** (§ 147 AO und § 14b UStG in der Fassung des Vierten Bürokratieentlastungsgesetzes, BEG IV), während für andere Unterlagen (z. B. Geschäftsbriefe oder Jahresabschlüsse) eine längere Aufbewahrungsfrist gelten kann. Fragen Sie Ihren Steuerberater, welche Frist für Sie gilt – der Adapter löscht niemals selbstständig Daten. Nur Entwürfe können gelöscht werden, niemals ausgestellte Rechnungen. Die Rechnungsansicht in der Web-App zeigt dieses Datum mit demselben Hinweis an.
- **Die Ausstellung wird geprüft, bevor die Nummer vergeben wird.** Die Dokumente werden zunächst einmalig mit einer Platzhalternummer erstellt. Bei einem Fehler im Layout, den Anhängen oder der XML-Datei wird der Vorgang an dieser Stelle abgebrochen, der Entwurf bleibt unverändert und es wird keine Nummer vergeben. Sollte ein Dokument dennoch **ohne die zugehörigen Dateien** nummeriert werden (z. B. weil die Festplatte voll oder nicht beschreibbar war), wird es im Dashboard unter „Ausgestellt, aber ohne Datei“ angezeigt. Die Funktion „ _Dateien neu erstellen_ “ erstellt dann exakt die fehlenden Dateien aus den gespeicherten Daten – die XML-Datei aus dem Datensatz, die PDF-Datei mit dem zum Zeitpunkt der Ausstellung fixierten Layout und die Excel-Kopie. Eine bereits vorhandene Datei wird nicht verändert, und die Rechnung selbst bleibt unverändert.
- Das erneute Rendern einer PDF-Datei (z. B. nach einer Layoutänderung) **überschreibt niemals** die ausgelieferte Datei: Das Original wird archiviert als `<number>.orig-<n>.pdf` Der Grund wird protokolliert, und die XML-Datei bleibt unverändert. Das Layout der ausgestellten Rechnung wird fixiert und kann wiederverwendet werden.
- Der Adapter hilft bei der Einhaltung dieser Regeln, aber **Sie** behalten die Verantwortung dafür – siehe _Haftungsausschluss_ .

## Was dieser Adapter nicht ist

- **Keine Buchhaltung.** Es gibt kein Hauptbuch, keinen Kontenplan, keine Umsatzsteuervoranmeldung, keine Gewinn- und Verlustrechnung für die Steuererklärung und keine Steuererklärung. Die CSV-, Excel- und DATEV-Exporte sind Listen für Ihren Steuerberater oder Ihre Buchhaltungssoftware.
- **Keine E-Mail-Zustellung.** Der Adapter versendet weder Rechnungen noch Mahnungen. Diese versenden Sie selbst (die Web-App bietet Vorlagen, `mailto:` Links und PDF/CSV-Listen) und markieren Sie diese als gesendet.
- **Keine Zahlungsabwicklung.** „Bezahlt“ ist ein von Ihnen gesetztes Kennzeichen; es besteht keine Bankverbindung und es werden keine Teilzahlungen akzeptiert.
- **Kein Ersatz für Steuer- oder Rechtsberatung** und keine Garantie dafür, dass eine Rechnung für Ihren Fall korrekt ist.

## Sicherheitshinweise

- **Token:** setzen `authToken` in der Instanzkonfiguration. Jede API-Route außer `/api/health` dann benötigt `Authorization: Bearer <token>` Ohne Token vertraut die API jedem Client, der den Port erreichen kann. In diesem Fall beantwortet sie nur Anfragen, deren Hostname eine IP-Adresse ist. `localhost` (Damit eine Webseite Ihren Browser nicht per DNS-Rebinding zum Adapter umleiten kann) und verweigert Schreibvorgänge, die eine fremde Adresse enthalten `Origin` Sie können die PWA über die IP-Adresse erreichen oder ein Token zur Verwendung eines Hostnamens festlegen. Verwenden Sie ein langes, zufällig generiertes Token (bei weniger als 16 Zeichen gibt der Adapter eine Warnung aus).
- **Bindungsadresse:** `bind` Standardwert `127.0.0.1` Daher kann nur der Host, auf dem der Adapter ausgeführt wird, die API erreichen. Ein nicht authentifizierter Zugriff auf eine andere Schnittstelle wird beim Start als Warnung protokolliert – verwenden Sie in diesem Fall ein Token.
- **Ratenbegrenzungen:** 600 Anfragen pro Minute und Client aktiviert `/api` aber nur 10 auf `/api/restore*`, wodurch die gesamte Datenbank ersetzt wird. Antworten auf Budgetüberschreitungen `429 Too many requests` und protokolliert Methode plus Pfad (niemals das Token). **Fehlgeschlagene Anmeldungen haben ein eigenes Budget:** zwanzig falsche Tokens pro Minute und Client (Anfragen ohne Token zählen nicht), dann `429` — selbst wenn man erst nach Ablauf der Minute das richtige Token errät — daher ist das Erraten des Tokens langsam und ein Fremder kann Ihr Gesamtbudget nicht aufbrauchen, indem er ohne Token fragt.
- **Was der offene Gesundheitsweg besagt:** `/api/health` (Kein Token) Nennt nur Status, Version, Schemaversion und die Sprache der Webanwendung. Die Anzahl der Dokumente pro Status befindet sich hinter dem Token (`/api/status`).
- **Browserhärtung:** API und PWA antworten mit einer alleinstehenden Content Security Policy (`default-src 'self'`, `frame-ancestors 'none'`),`X-Content-Type-Options:
  nosniff `,` Referrer-Policy: no-referrer ` und ohne` X-Powered-By ` Die` X-Forwarded-* ` Header werden nicht als vertrauenswürdig eingestuft (` trust proxy` deaktiviert) – der Adapter soll direkt erreichbar sein – mit „HTTPS verwenden“ spricht der Adapter selbst TLS (siehe „HTTPS und Installation der Web-App auf einem Telefon“); platzieren Sie ihn nur hinter einem Reverse-Proxy mit HTTPS und einem Token.
- **Wiederherstellungssicherheit:** Bevor eine Wiederherstellung die Datenbank ersetzt, wird der aktuelle Zustand in die Datenbank geschrieben. `backups/e-invoices-prerestore-<time>.zip` Wenn das fehlschlägt, wird nichts wiederhergestellt. Die Zählerstände werden niemals verringert, und jede Wiederherstellung wird angehängt. `backups/restore-log.jsonl` Die
- **Wiederherstellungsbeschränkungen:** Eine Sicherungs-ZIP-Datei darf höchstens 512 MB groß sein und darf auf höchstens 1 GB erweitert werden (`dump.json` Maximal 256 MB; ein speziell präpariertes Archiv wird vor dem Entpacken abgelehnt. Pfade, Prüfsummen pro Datei und das Manifest werden überprüft. Dieselben Beschränkungen gelten für **die Erstellung** von Backups: Ein Backup, das die Wiederherstellung ablehnen würde, wird nicht erstellt; die Fehlermeldung gibt die überschrittene Grenze an (die Anhänge sind eigene Einträge im ZIP-Archiv neben den Dateien) – besser gar kein Backup als eines, das nur den Anschein von Schutz erweckt.
- **Wo die PWA das Token speichert:** im Browserprofil `localStorage` Ein Neuladen fragt daher nicht erneut danach. Es wird immer nur als eine `Authorization` Der Header wird an den Adapter gesendet (niemals in einer URL), aber ein Skript, das auf demselben Ursprung ausgeführt wird, kann ihn lesen – verwenden Sie ein dediziertes Browserprofil und beachten Sie, dass die Änderung des Tokens in der Instanzkonfiguration erst nach dem Neustart des Adapters wirksam wird.
- **Anhänge:** Ein Entwurf darf maximal 10 Dateien mit je 5 MB enthalten, ausschließlich im PDF-, PNG- oder JPEG-Format. Der Dateityp wird anhand der magischen Bytes bestimmt, nicht anhand des Dateinamens oder des angegebenen MIME-Typs. Der Dateiname wird bereinigt, bevor die Datei gespeichert wird. `Content-Disposition` Kopfzeile. Eine ausgestellte Rechnung ist gesperrt: Ihre Anhänge können zwar aufgelistet und heruntergeladen, aber nicht mehr hinzugefügt oder gelöscht werden (GoBD) – sie sind dann Teil der gespeicherten PDF-/XML-Datei.
- **Die Sicherungsdateien sind nicht verschlüsselt:** Die ZIP-Datei enthält die Datenbank, Anhänge und XML-/PDF-Artefakte im Klartext. Bewahren Sie sie auf einem verschlüsselten Datenträger oder einer verschlüsselten Freigabe auf. Die Anhänge sind eigene Einträge in der ZIP-Datei (`attachments/<id>`), daher ist ein Backup mit Anlagen etwa so groß wie die Originaldateien.

## Kompaktmodus

Der Adapter unterstützt den Kompaktmodus von ioBroker (`common.compact: true` (seit Version 1.4.0): Wenn diese Option in den Systemeinstellungen aktiviert ist, läuft die Instanz in einem separaten Prozess zusammen mit anderen Adaptern und spart so den Speicher ihres eigenen Node.js-Prozesses. Ihre eigene SQLite-Datei und ihr eigener Webport funktionieren ebenfalls dort. Was ein gemeinsam genutzter Prozess benötigt, erledigt der Adapter beim Beenden: Er schließt den Webserver **und** die offenen Verbindungen der Webanwendung, stoppt die Aufräumtimer seiner Ratenbegrenzer und seine eigenen Timer und schließt die Datenbank – nichts von einer gestoppten Instanz läuft weiter, und ein neuer Start findet den Port frei vor.

Die Sicherung und Wiederherstellung erfolgen im Arbeitsspeicher und umfassen die gesamte Datenbank sowie ZIP-Dateien mit einer Größe von bis zu mehreren hundert MB. Bei vielen Dokumenten oder großen Anhängen empfiehlt es sich, der Instanz eine **eigene Kompaktgruppe** zuzuweisen (Instanzeinstellungen im Expertenmodus, Spalte _„Kompaktgruppe“_ ), damit eine große Sicherung die anderen Adapter der Gruppe nicht ausbremst.

## Einschränkungen

- Die PDFs der Website enthalten die Schriftart Liberation Sans (SIL OFL 1.1) und verfügen über eine sRGB-Ausgabeabsicht, daher sind sie als PDF/A-3b erstellt; die Struktur wurde anhand einer echten Rechnung überprüft (`/OutputIntents` mit `GTS_PDFA1`, Schriftteilmengen mit `/FontFile` Und `/ToUnicode` Ein unabhängiger Validierungslauf (KoSIT Online-Validator oder veraPDF) ist weiterhin der empfohlene Abnahmeschritt vor dem Produktiveinsatz. Das eingebettete XML bleibt davon unberührt und behält den Hauptteil.
- Die Offline-XSD-Validierung wird bei jedem Issue durchgeführt; der KoSIT-Online-Validator ist ein empfohlener manueller Abnahmeschritt vor der produktiven Nutzung.
- Diese Version unterstützt ausschließlich EUR-Rechnungen, B2B-Rechnungen im Inland und das EN 16931-Profil (als ZUGFeRD oder XRechnung). XRechnung wird vom KoSIT-Validator geprüft. Wie die jeweilige Behörde die Daten verarbeitet (Portal, Peppol-Zugangspunkt, eigene Regelungen), müssen Sie vor der ersten Rechnung klären.

## Haftungsausschluss

**Haftungsausschluss.** Diese Software wird kostenlos und ohne jegliche Gewährleistung, insbesondere ohne Zusicherung der Eignung für einen bestimmten Zweck, bereitgestellt. Sie stellt keine Steuer- oder Rechtsberatung dar. Soweit gesetzlich zulässig, ist die Haftung ausgeschlossen; die Haftung für Vorsatz und grobe Fahrlässigkeit, für Schäden an Leben, Körper oder Gesundheit sowie die Haftung nach zwingendem Recht bleiben unberührt. Sie sind verantwortlich für:

- die Richtigkeit Ihrer Rechnungen und Angebote sowie die Überprüfung der Ergebnisse (z. B. mit einem Prüfer oder Ihrem Steuerberater).
- Einhaltung der für Sie geltenden Vorschriften (z. B. Umsatzsteuerrecht, GoBD, Aufbewahrungsfristen, DSGVO).
- regelmäßige Datensicherungen – auch außerhalb des Adapters – und Tests, ob diese wiederhergestellt werden können.

Dieser Haftungsausschluss befindet sich auch in [docs/en/disclaimer.md](/#/docs/adapterref/iobroker.e-invoices/docs/en/disclaimer.md) ; das deutsche Original befindet sich in [docs/de/disclaimer.md](https://github.com/sadam6752-tech/ioBroker.e-invoices/blob/main/docs/de/disclaimer.md) .

## Normen und Referenzen

Dieser Adapter basiert auf einem _Rechnungsformat_ , nicht auf einem Gerät. Daher entspricht die Referenzdokumentation des „Herstellers“ der Spezifikation, die er implementiert:

- [Factur-X / ZUGFeRD](https://fnfe-mpe.org/factur-x/) — der deutsch-französische Hybrid-Rechnungsstandard (lesbares PDF mit dem führenden CII-XML-Inhalt) und die hier verwendeten Profile (BASIC, EN 16931).
- [KoSIT Validator](https://github.com/itplr-kosit/validator) – die offene Validierungs-Engine für EN 16931-Dokumente; ihre Konfiguration für XRechnung/EN 16931 ist diejenige, die die unter „Einschränkungen“ beschriebene manuelle Abnahmeprüfung ausführt.
- [@stackforge-eu/factur-x](https://www.npmjs.com/package/@stackforge-eu/factur-x) — die Bibliothek, die das CII-XML generiert und das hybride PDF einbettet.

Die deutschen Regeln, die der Nummerierungs- und Aufbewahrungslogik zugrunde liegen, stammen aus § 14 UStG und § 147 AO; der Adapter setzt sie um, er ist kein Ersatz für eine Steuerberatung.

## Herkunft

Alle Adapterquellen in `src/` und die PWA in `src-www/` sind für dieses Projekt geschrieben. Drittanbieterbibliotheken (einfache npm-Abhängigkeiten, kein kopierter Code): `@stackforge-eu/factur-x` (EUPL-1.2) für die CII-Generierung, XSD-Validierung und hybride Einbettung, `pdfkit`, `exceljs`, `jszip`, `better-sqlite3` Und `express` (alle MIT-Lizenzen).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 1.4.0 (2026-11-20)

* (alex) Compact mode: the adapter can run in the shared process of ioBroker (`common.compact: true`). On stop it now also closes the open connections of the web app and stops the timers of its rate limiters, and no promise is left without error handling; see *Compact mode* in the README.

### 1.3.0 (2026-11-06)

* (alex) Review of the ioBroker repository (PR #6894): the download file names are English (`invoices….csv`, `EXTF_outgoing-invoices….csv`, `revenue-by-company…`, `open-items…`, `dunning-suggestions.csv`, `dunning-letters.pdf`, `…_from-…`/`…_to-…` for an open range).
* (alex) The exports (CSV and Excel lists of invoices, open items, revenue and dunning suggestions) are written in the eleven ioBroker languages: titles, notice and column headers follow the language of the web app, else the instance setting, else the system language, else English. The invoice copy and the DATEV file stay German.
* (alex) The built-in dunning texts (three levels), the dunning letter PDF and `info.reminderSuggestions` come in the eleven ioBroker languages, chosen by the language of the ioBroker system (English for any other). Texts you changed stay as they are.
* (alex) Instance settings: the payment terms presets show translated labels in all eleven languages; the stored text stays the German sentence printed on the German invoice.
* (alex) The validation evidence moved from `docs/validierung/` to `docs/validation/` with English names (`sample-cases/`, `sample-cases.mjs`, `credit-note`, …), the German documentation files to `docs/de/validation.md` and `docs/de/disclaimer.md`. The script prints English messages.

### 1.2.2 (2026-10-19)

* (alex) When the server gives no answer, the web app shows a banner instead of the browser's "NetworkError": the server cannot be reached; with HTTPS and a self-signed certificate reload the page (or open the address) and accept the security warning again, otherwise check the instance. A *Reload* button is in the banner, which goes away with the next answer of the server. All eleven languages.

### 1.2.1 (2026-10-12)

* (alex) A half uploaded file (`….zip.part`) of a failed copy is removed on the server: at once when the connection still works, otherwise by the next good copy. Only half files of this adapter are touched.
* (alex) fix: *Test connection* uses the saved password only for the saved server and user, so no script can have the password sent to a server of its own.
* (alex) fix: when the time limit runs out while the connection is still being made, the late connection is closed at once instead of uploading after the failure was reported.
* (alex) fix: a failed state update can no longer turn a successful backup into an error of the API; an old copy error is cleared when the copy is switched off.
* (alex) fix: a restored attachment takes its size from its content, not from `dump.json`.
* (alex) The admin labels "Host" and "Password" of the external backup are worded so every language has its own text.
* (alex) fix: the time limit of the copy to the external server uses the timers of the adapter (`this.setTimeout`) instead of the plain `setTimeout` of Node.js (repository checker E5005).

### 1.2.0 (2026-10-12)

* (alex) **Copy of the backups to an external server over SFTP:** the new tab *External backup* in the instance settings copies every backup (automatic and by hand) to another computer, for example a Synology NAS. Pure SFTP without mount, `sudo` or shell command; password stored encrypted; optional host key fingerprint; *Test connection* button; a failed copy never touches the local backup and is shown in the log, in `info.remoteBackupError` and on the backup page. Optionally the oldest automatic copies on the server are deleted (only files of this adapter).
* (alex) The web app asks "Really sign out?" before it signs out (menu link and login page).
* (alex) The unused translation key `e-invoices adapter settings` was removed from `admin/i18n`.

Older changes: see CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 alex <sadam6752@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.