---
chapters: {"pages":{"en/adapterref/iobroker.alarm/README.md":{"title":{"en":"ioBroker.alarm"},"content":"en/adapterref/iobroker.alarm/README.md"},"en/adapterref/iobroker.alarm/docs/en/alarm_en.md":{"title":{"en":"ioBroker.alarm"},"content":"en/adapterref/iobroker.alarm/docs/en/alarm_en.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alarm/docs/en/alarm_en.md
title: ioBroker.alarm
hash: 5WOIAISx78lRN3QU1LP/XKCTBDgbNd2vRkm1ZYgk1HE=
---
![Logo](../../../../../en/adapterref/iobroker.alarm/docs/en/admin/alarm.png)

![Anzahl der Installationen](http://iobroker.live/badges/alarm-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.alarm.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alarm.svg)
![Bekannte Schwachstellen](https://snyk.io/test/github/misanorot/ioBroker.alarm/badge.svg)
![NPM](https://nodei.co/npm/iobroker.alarm.png?downloads=true)
![GitHub Actions](https://github.com/misanorot/ioBroker.alarm/workflows/Test%20and%20Release/badge.svg)

# ioBroker.alarm

**GitHub Actions** :

[![PayPal](https://www.paypalobjects.com/en_US/DK/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick\&hosted_button_id=ZYHW84XXF5REJ\&source=url)

# Inhalt

- [Überblick](#iobroker-alarm)
- [Haupteinstellungen](#tab-main-settings)
- [Benachrichtigungen](#tab-notifications)
- [Überwachung](#tab-monitoring)
- [Sprachausgabe](#tab-speech-output)
- [Abkürzungen](#tab-shortcuts)
- [Andere Alarme](#tab-other-alarms)
- [Zonen](#tab-zones)
- [Präsenzsimulation](#tab-presence)
- [Staaten](#states)

## ioBroker-Alarm

Mit diesem Adapter können Sie eine Alarmanlage für Ihr Zuhause einrichten, ohne umfangreiche Programmierkenntnisse zu benötigen. Sie können drei Sicherheitskreise konfigurieren und diese während der Nacht, bei Aktivierung oder Deaktivierung überwachen. Interne Adapterzustände lassen sich direkt mit externen Zuständen verknüpfen. Diese Verknüpfungen werden im Tab „Verknüpfungen“ konfiguriert. Eine einfache Anwesenheitssimulation kann problemlos eingerichtet werden, um den Schutz vor Einbrechern zu erhöhen. Benachrichtigungen über verschiedene Ereignisse sind ebenfalls möglich und können über verschiedene Kanäle wie Telegram oder E-Mail versendet werden _(vorausgesetzt, der entsprechende Adapter ist installiert!)_ .

**Alle Überwachungszustände und Zonen müssen vom Typ "boolean" sein! _(true, false, 1, 0)_**

---

### Registerkarte „Haupteinstellungen“

Hier können Sie Einstellungen wie Nachtruhezeiten, Sirenendauer, stillen Alarm und Passwort konfigurieren.

- **Aktivierungszeit** : Verzögerung vor der Aktivierung bei Verwendung eines Verzögerungsdatenpunkts
- **Sirenenalarm bei Einbruch** : Während eines Einbruchs wird der Datenpunkt alarm.0.status.siren / siren\_inside für diese Dauer auf „true“ gesetzt.
- **Blitzfrequenz bei Einbruch** : Wird zur Steuerung einer Lampe verwendet
- **Sirenenalarm im Modus „Sharp Inside“** : Während eines Einbruchs im Modus „Sharp Inside“ wird der Datenpunkt „alarm.0.status.siren\_inside“ für diese Dauer auf „true“ gesetzt.
- **Start & Ende der Nachtruhe** : Diese Einstellungen werden für die automatische Nachtruhe verwendet (optional).
- **Passwort** : Zur Aktivierung/Deaktivierung des Systems per Passwort
- **Alarmverzögerung** : Verzögerungszeit, bevor der Einbruchsalarm ausgelöst wird (während dieser Zeit wird der stille Alarm ausgelöst).
- **Protokoll** : Bei Auswahl dieser Option werden verschiedene Meldungen in die Info-Protokollliste geschrieben.
- **Zustände ignorieren** : Wenn während der Aktivierung ein Fenster des Alarmkreises geöffnet ist, wird dies ignoriert und das System mit Warnungen aktiviert.
- **Außensirene für Innenbereich** : Wenn diese Option ausgewählt ist, wird die Außensirene auch ausgelöst, wenn der Alarm im Innenbereich ausgelöst wird.
- **Abwesenheitsmodus** : Ist diese Option ausgewählt, wird das Alarmsystem aktiviert, bevor der Countdown abläuft, wenn der entsprechende Kontakt ausgelöst wird (muss auf der Registerkarte Überwachung ausgewählt werden).

#### Verzögerte Auslösung

Sensoren mit dem Auslösemodus „Verzögert“ (z. B. Bewegungsmelder, IP-Kameras) lösen nicht sofort einen Alarm aus. Stattdessen wird der Alarm erst ausgelöst, wenn eine konfigurierbare Anzahl **verschiedener** verzögerter Sensoren innerhalb eines festgelegten Zeitfensters aktiviert wurde. Dies reduziert Fehlalarme durch unzuverlässige Sensoren erheblich und gewährleistet gleichzeitig die Sicherheit.

**Konfiguration:**

- **Anzahl der Sensoren** : Wie viele unterschiedliche Sensoren im verzögerten Modus ausgelöst werden müssen, um einen Alarm auszulösen (Standard: 3)
- **Zeitfenster (min)** : Das Zeitfenster in Minuten, innerhalb dessen die Sensoren auslösen müssen (Standard: 2).

**So funktioniert es:**

1. Ein Sensor im verzögerten Modus löst aus und das Signal wird mit einem Zeitstempel protokolliert.
2. Einträge, die älter als der konfigurierte Zeitraum sind, werden automatisch entfernt.
3. Wenn die Anzahl der eindeutigen verzögerten Sensoren, die innerhalb des Zeitfensters ausgelöst haben, den konfigurierten Schwellenwert erreicht, wird ein vollständiger Alarm ausgelöst.
4. Wenn die Alarmanlage deaktiviert wird, werden alle aufgezeichneten verzögerten Auslöser gelöscht.

**Beispiel:** Bei den Standardeinstellungen (3 Sensoren, 2 Minuten) wird der Alarm ausgelöst, wenn 3 verschiedene Bewegungsmelder innerhalb von 2 Minuten eine Bewegung erfassen. Ein einzelner Bewegungsmelder, der dreimal auslöst, erfüllt die Schwelle **nicht** – es müssen 3 **verschiedene** Sensoren sein.

**Anwendungsfälle:**

| Sensortyp            | Empfohlener Modus | Grund                                                    |
| -------------------- | ----------------- | -------------------------------------------------------- |
| Tür-/Fensterkontakte | Direkt            | Höchste Zuverlässigkeit, sofortige Reaktion erforderlich |
| Glasbruchsensoren    | Direkt            | Höchste Zuverlässigkeit, sofortige Reaktion erforderlich |
| Bewegungsmelder      | Verzögert         | Kann zu falsch positiven Ergebnissen führen              |
| Präsenzsensoren      | Verzögert         | Kann zu falsch positiven Ergebnissen führen              |
| IP-Kameras           | Verzögert         | Kann zu falsch positiven Ergebnissen führen              |

Jeder Stromkreis kann individuell auf der Registerkarte „Überwachung“ konfiguriert werden, indem die Spalte „Triggermodus“ entweder auf „Direkt“ oder „Verzögert“ eingestellt wird.

---

### Tab-Benachrichtigungen

Benachrichtigungen über andere Adapter wie Telegram, E-Mail oder andere.

- **1:** Fügen Sie den entsprechenden Adapter oder die entsprechende Instanz hinzu. Kann auch direkt eingegeben werden!
- **2:** Für Benachrichtigungen an den Telegram-Adapter können Benutzer- oder Chat-IDs verwendet werden.

**Wird im Bereich „Zonen“ eine Zone ausgewählt, wird unabhängig vom Systemstatus eine Benachrichtigung versendet!**

---

### Registerkartenüberwachung

Hier werden die Schaltkreise des Systems konfiguriert. _Die Namen der Zustände können geändert werden._

Der Alarmkreis hat höchste Priorität und ist bei aktiviertem System (Sharp) vor allen anderen Kreisen aktiv. Er dient der Systemüberwachung und gewährleistet den vollen Schutz eines Alarmsystems. Der Sharp-Inside-Kreis wird überwacht, wenn sich das System im Sharp-Inside-Zustand befindet und somit den Perimeterschutz gewährleistet. Der Benachrichtigungskreis wird ausschließlich für Benachrichtigungen in den Zuständen Sharp, Sharp Inside und Nachtruhe verwendet. _Es ist problemlos möglich, alle drei Kreise in einem einzigen Zustand zu überprüfen._

- **1:** Gerät hinzufügen
- **2:** Ein Gerät bearbeiten
- **3:** Falls es erforderlich ist, einzelne Zustände nicht bei _„wahr“_ , sondern bei _„falsch“_ auszulösen (z. B. bei drahtbruchsicheren Sensoren), können Sie „negieren“ aktivieren.
- **4:** Alarmschaltung
- **5:** Falls ein Kontakt den Alarmkreis nicht sofort auslösen soll, können Sie den „stillen Alarm“ aktivieren. Nach Ablauf der konfigurierten Zeit (Haupteinstellungen) wird der Alarm ausgelöst.
- **6:** Wenn Sie die Option „Verlassen“ im Tab „Haupteinstellungen“ aktiviert haben, können Sie für den entsprechenden Datenpunkt „Verlassen“ auswählen. Das bedeutet, dass bei verzögerter Aktivierung der Countdown nicht ablaufen muss – das Schließen der Tür genügt.
- **7:** Scharfe Innenschaltung
- **8:** Bei Auswahl dieser Option wird auch der stille Alarm bei scharfen Innengeräuschen ausgelöst.
- **9:** Benachrichtigungsschaltung
- **10:** Auslösemodus – „Direkt“ löst den Alarm sofort aus, „Verzögert“ erfordert eine Bestätigung von mehreren Sensoren innerhalb eines Zeitfensters (siehe [Verzögerte Auslösung](#delayed-triggering) )

---

### Tab-Sprachausgabe

Wenn eine Sprachausgabe gewünscht ist, z. B. bei Zustandsänderungen, kann diese hier mit den gewünschten Phrasen konfiguriert werden. _Stellen Sie sicher, dass der ausgewählte Datenpunkt mit Text beschrieben werden kann! Beispiel: „sayit.0.tts“._

- **1:** Wenn Sie möchten, dass die Namen bei den Durchsagen bekanntgegeben werden, können Sie diese Option auswählen.
- **2:** Gerät hinzufügen
- **3:** Verzögerungszeit der Sprachausgabe in ms (z. B. für verschiedene Räume)

---

### Tab-Tastenkombinationen

Hier können adapterinterne Zustände direkt mit externen Zuständen verknüpft werden. Dadurch entfällt die Notwendigkeit eines Skripts oder ähnlicher Workarounds. Beispielsweise kann eine Tür beim Beginn der Nachtruhe verriegelt werden.

- **1:** Gerät hinzufügen
- **2:** Wählen Sie den internen Zustand aus, der die Reaktion auslösen soll.
- **3:** Wählen Sie den Wert aus, der ausgelöst werden soll
- **4:** ID festlegen
- **5:** Wert, der in die ID geschrieben werden soll
- **6:** Wählen Sie die ID aus, die die Reaktion auslösen soll.
- **7:** Auslöser --> beliebig = wird bei jeder Änderung ausgelöst / ne = wird nur bei Wertänderung ausgelöst
- **8:** Wählen Sie den Wert aus, der ausgelöst werden soll
- **9:** Wählen Sie aus, welcher interne Zustand geschrieben werden soll.

---

### Registerkarte „Andere Alarme“

Es stehen zwei frei konfigurierbare Überwachungskreise zur Verfügung. Diese werden unabhängig vom Alarmsystemstatus permanent überwacht! Standardmäßig sind sie als Brand- und Wasseralarm gekennzeichnet. In der Konfiguration werden sie als Kreise 1 und 2 bezeichnet.

Falls es erforderlich ist, einzelne Zustände nicht bei _„wahr“_ , sondern bei _„falsch“_ auszulösen (z. B. bei drahtbruchsicheren Sensoren), können Sie „negieren“ aktivieren.

#### Achten Sie darauf, keine Zustände der Hauptüberwachungsschaltungen zu verwenden!

---

### Tab-Zonen

Drei Zonen stehen zur freien Konfiguration zur Verfügung. Diese werden typischerweise zur Überwachung und Benachrichtigung von Bereichen mit geringerem Wert, wie z. B. einem Stall, verwendet. Die drei Zonen arbeiten unabhängig von der Hauptüberwachung. Um sie in die Hauptüberwachung zu integrieren, können Sie den entsprechenden Zonenstatus _, z. B. alarm.X.zone.one,_ zur Hauptüberwachung hinzufügen (Registerkarte „Überwachung“). Dies hat jedoch zur Folge, dass Benachrichtigungen für die entsprechenden Zonen ignoriert werden.

Über den Status _alarm.x.zone.one\_on\_off_ können Sie die Zone jederzeit aktivieren oder deaktivieren, ohne den Adapter neu starten zu müssen! Dies ermöglicht beispielsweise eine flexiblere Integration von Bewegungsmeldern in den Hauptstromkreis.

_Hinweis: Wenn diese in den Hauptstromkreis integriert sind, werden sie auch im deaktivierten Zustand in den Listen angezeigt._

---

### Registerkartenpräsenz

Hier können Sie eine ID-spezifische Präsenzsimulation konfigurieren, die optional aktiviert werden kann, wenn das System auf „scharf“ eingestellt ist. Der Datenpunkt _alarm.X.presence.on\_off_ steht als Option zur Verfügung und ermöglicht es Ihnen, die Simulation zu aktivieren oder zu deaktivieren, ohne den Adapter neu starten zu müssen.

Die Ausführung pro Zustand erfolgt nur EINMAL! Wird die Instanz während eines aktiven Systems neu gestartet, wird die Anwesenheitssimulation erst bei der nächsten Aktivierung fortgesetzt! Änderungen des konfigurierten Zustands während der Simulation werden nicht berücksichtigt!

- **1:** Festlegen der globalen Verzögerungszeit vor dem Start der Simulation (bevor die ID-spezifischen Einstellungen wirksam werden)
- **2:** Gerät hinzufügen
- **3:** Öffnen Sie die spezifischen Einstellungen für die ID.

#### Anwesenheitseinstellungen

- **Triggermodus:** Zeit = Zeitbereich, Sonnenaufgang = Sonnenaufgang bis Mittag, Sonnenuntergang = Sonnenuntergang bis 22 Uhr, Licht = wenn der Lichtwert des Triggers unter den festgelegten Schwellenwert fällt
- **Zeitbereich von/bis:** Zeitfenster, in dem die Simulation stattfinden soll
- **Einschaltdauer:** Wie lange die ID eingeschaltet bleiben soll
- **Zufallsfaktor:** Höchster (1-10) Zufallsfaktor für die Zeit
- **Zeitverzögerung:** Verzögerung nach dem Auslösen des Modus
- **Wert EIN/AUS:** Werte, die beim Ein-/Ausschalten geschrieben werden sollen
- **Lichtsensor-Trigger:** Status-ID für den Lichtsensor (für den Lichtmodus)
- **Lichtwert:** Lux-Schwellenwert, unterhalb dessen das Gerät aktiviert wird

_(Die Triggerabfrage wird jede Minute ausgeführt)_

**Für die Anwesenheitssimulation ist eine Standortkonfiguration erforderlich! Die korrekte Funktion von Sonnenaufgang und Sonnenuntergang erfordert eine korrekte Standortangabe!**

---

### Staaten

Der Adapter bietet eine Reihe von Zuständen:

#### "alarm.x.use....."

Dies sind die tatsächlichen Zustände für den Betrieb des Alarmsystems.

- use.activate\_nightrest -> Nachtruhe aktivieren
- use.activate\_sharp\_inside\_circuit -> Überwachung des Warnschaltkreises (scharf innen) aktivieren
- use.disable -> System (Alarmanlage) deaktivieren
- use.enable -> System aktivieren (Alarmanlage)
- use.enable\_with\_delay -> Aktiviere das System (Alarmanlage) mit Verzögerung
- use.list -> Deaktivieren/Aktivieren/Warnschaltung/Aktivieren mit Verzögerung
- use.quit\_changes -> Setzt die Zustände _info.notification\_circuit\_changes, info.sharp\_inside\_siren, status.activation\_failed, other\_alarms.one\_changes, other\_alarms.two\_changes zurück_
- use.toggle\_password -> System (Alarmanlage) mit Passwort deaktivieren/aktivieren
- use.toggle\_with\_delay -> System (Alarmanlage) mit Verzögerung deaktivieren/aktivieren.
- use.toggle\_with\_delay\_and\_password -> System (Alarmanlage) mit Passwort und Verzögerung deaktivieren/aktivieren.
- use.panic -> Manuelle Auslösung der Alarmanlage (Einbruch), auch wenn deaktiviert

#### "alarm.x-status...."

Hier können Sie den Systemstatus ablesen.

- status.sleep -> Signalisiert den Status der automatischen Nachtruhe

#### "alarm.x.info...."

Liefert zusätzliche Informationen, z. B. welche Türen geöffnet sind oder einen Protokollstatus. Der Protokollstatus „log\_today“ wird um Mitternacht gelöscht.

#### "alarm.x.other\_alarms...."

Enthält Informationen über die "anderen" Alarmkreise 1 + 2.

#### "alarm.x.zone...."

Zeigt an, ob in den jeweiligen Zonen ein Auslöser aufgetreten ist.

---

## Probleme

- Wenn Sie über das + einen Telegram-Dienst oder Ähnliches hinzufügen, können Sie nur einen Status der Instanz auswählen und müssen alles bis einschließlich _telegram.0_ löschen.

#### Wichtig: Die Verwendung dieses Adapters erfolgt auf eigene Gefahr. Für etwaige Funktionsstörungen wird keine Haftung übernommen!