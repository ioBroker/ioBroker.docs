---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa2/README.md
title: ioBroker.alexa2
hash: scdTXz/4hoNS51L/vFpSFzGbFTare1wpyqrnVMKeKCg=
---
![Logo](../../../en/adapterref/iobroker.alexa2/admin/alexa.png)

![Anzahl der Installationen](http://iobroker.live/badges/alexa2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.alexa2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alexa2.svg)

# IoBroker.alexa2
![Test und Freigabe](https://github.com/Apollon77/iobroker.alexa2/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/alexa2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um Ausnahmen und Codefehler automatisch an die Entwickler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie in Abschnitt [Sentry-Plugin-Dokumentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Die Sentry-Berichterstattung wird ab js-controller 3.0 verwendet.

Mit diesem Adapter können Sie Ihre Alexa-Geräte (Amazon Echo) fernsteuern.

Ein großes Dankeschön geht an soef für Version 1 des Adapters und an Hauke und ruhr70 für ihre Ideen in ihren Skripten aus dem ioBroker-Forum (insbesondere die Aktualisierungen des Medienfortschritts)! Außerdem vielen Dank an meicker für die Unterstützung bei der Dokumentation und an zahlreiche Nutzer aus dem ioBroker-Forum für ihre Unterstützung beim Testen!

## Haftungsausschluss
Alle Produkt- und Firmennamen sowie Logos sind Marken™ oder eingetragene® Marken ihrer jeweiligen Inhaber. Ihre Verwendung impliziert weder eine Zugehörigkeit zu noch eine Unterstützung durch diese oder verbundene Tochtergesellschaften! Dieses private Projekt wird in der Freizeit betrieben und verfolgt keine geschäftlichen Ziele. ALEXA ist eine Marke von AMAZON TECHNOLOGIES, INC.

## Staaten und ihre Bedeutungen:
Im Adapter-Namensraum (z. B. alexa2.0) werden einige Kanäle erstellt.

### Alexa 2.0
| Staatsname | Bedeutung |
|----------------------|--------------------------------------------------------|
| Echo-Geräte.* | Status pro Echo-Gerät, siehe unten |
| Verlauf.* | Informationen zum Befehlsverlauf siehe unten |
| Smart-Home-Geräte.* | Status pro Smart-Home-Gerät und allgemein, siehe unten |
| info.* | Allgemeine Informationen zum Adapterstatus |
| requestResult | Fehlerinformationen für TuneIn- und Smart-Home-Geräteanfragen |

### Alexa2.0.Contacts.ContactId.*
Alle Alexa-Kontakte, an die Textnachrichten gesendet werden können, einschließlich des eigenen Kontakts. Der eigene Kontakt erhält ein spezielles „(Selbst)“ hinter seinem Namen.

| Staatsname | Bedeutung |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| #EigeneNachrichtenlöschen | Existiert nur im eigenen Kontakt und löscht durch einen Auslöser alle Nachrichten, die an ihn selbst gesendet werden (einschließlich Nachrichten, die er über Apps oder Geräte an sich selbst sendet!) |
| textMessage | Sendet diesen Text als Nachricht an den Benutzer. Er wird auf allen Geräten dieses Benutzers mit einem "gelben Ring" angezeigt. |

### Alexa2.0.Echo-Devices.CommandsAll.*
Befehle, die an alle Geräte im Konto gesendet werden sollen.

| Staatsname | Bedeutung | Kommentare |
|--------------------|-------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| deviceStop | Alle Aktionen auf dem Gerät stoppen | Schaltfläche |
| deviceDoNotDisturb | Schaltet den „Nicht stören“-Modus für alle Geräte ein/aus. | wahr/falsch oder Anzahl der Sekunden (max. 12 Std.) oder Zeichenkette im Format „HH:MM“, bis zu der der Modus aktiviert ist. |

### Alexa2.0.Echo-Devices.Serialnumber.*
Unter „Echo-Geräte“ ist jedes Amazon Echo-Gerät mit seiner Seriennummer aufgelistet. Nicht jedes Gerät zeigt alle Status an. Jedes Gerät hat seine eigenen Status, wie unten beschrieben:

### Alexa2.0.Echo-Geräte.Seriennummer.Alarm.*
Alarmeinstellungen (Wecker) für jedes Gerät, sofern verfügbar.

| Staatsname | Bedeutung | Wert |
|-----------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <id>.customVolume | Legen Sie eine benutzerdefinierte Lautstärke für diese Erinnerung fest. Die Lautstärke wird 2 Sekunden vor dem Auslösen der Erinnerung eingestellt und auf den vorherigen Wert zurückgesetzt, sobald der Timer (oder der Adapter) gestoppt wird – spätestens nach 120 Sekunden! Wenn sich benutzerdefinierte Lautstärken und Auslösezeiten überschneiden, wird die Lautstärke am Ende einmalig wiederhergestellt! | Zahl 0..100 |
| <id>.date | Überschreiben Sie das Datum eines bestehenden Alarms, um ein neues Datum für diesen Alarm festzulegen. Falls Sie bereits einen Alarm haben, können Sie das Datum hier ändern, indem Sie einfach die Uhrzeit im Format JJJJ-MM-TT überschreiben. Dies hat möglicherweise keine Auswirkung, wenn mehrmals täglich wiederkehrende Einstellungen verwendet wurden! | Datumsausgabe |
| <id>.delete | Schaltfläche zum Löschen des Alarms | Löschen mit true |
| <id>.enabled | Zeigt den Alarmstatus an und ermöglicht dessen Änderung: Alarm mit true aktivieren - Alarm mit false deaktivieren | true / false |
| <id>.musicEntity | Zeigt die Titelinformationen an, falls es sich um einen Musikwecker handelt | Zeichenkette oder null |
| <id>.musicProvider | Zeigt den Musikanbieter an, falls es sich um einen Musikwecker handelt | Zeichenkette oder null |
| <id>.nextTriggerDate | Enthält den Zeitpunkt der nächsten erwarteten Auslösung als Unix-Epoche in Millisekunden | Zahl |
| <id>.recurringDays | Zeigt die Liste der konfigurierten Tage an, wenn der Alarm wiederkehrende Einstellungen hat | US-Notation der Wochentage (z. B. MO, DI, MI, DO, FR, SA, SO) |
|<id> .recurringPattern | Zeigt das wiederkehrende Alarmmuster an | 0 = einmalig, keine Wiederholung<br> P1D = täglich<br> XXXX-WD = an Wochentagen<br> XXXX-WE = an Wochenenden<br> XXXX-WXX-1 = jeden Montag<br> XXXX-WXX-2 = jeden Dienstag<br> XXXX-WXX-3 = jeden Mittwoch<br> XXXX-WXX-4 = jeden Donnerstag<br> XXXX-WXX-5 = jeden Freitag<br> XXXX-WXX-6 = jeden Samstag<br> XXXX-WXX-7 = jeden Sonntag |
| <id>.snoozed | true, wenn der Wecker momentan auf Schlummern gestellt ist | true/false |
| <id>.sound | Enthält den für diesen Alarm eingestellten Ton. Kann geändert werden. Es ist auch möglich, zwischen einem Musikton und den integrierten Tönen zu wechseln. | ID aus der Liste |
| <id>.time | Alarmzeit. Überschreiben Sie die Zeit eines bestehenden Alarms, um eine neue Zeit für diesen Alarm festzulegen. Falls bereits ein Alarm vorhanden ist, können Sie die Zeit hier ändern, indem Sie die vorhandene Zeit im Format hh:mm:ss überschreiben. Sekunden werden nicht benötigt. Dies hat möglicherweise keine Auswirkung, wenn Einstellungen für mehrmals täglich wiederkehrende Alarme verwendet wurden! | Zeiteingabe |
| <id>.triggered | true, wenn der Alarm erreicht und ausgelöst wurde. Die Uhrzeit muss mit Amazon und iobroker synchronisiert sein. Verwenden Sie dies, um eine andere Aktion auszulösen, sobald die Alarmzeit erreicht ist. | true / false |
| Neu | Daten zum Erstellen einer neuen Erinnerung als Zeichenkette im folgenden Format, getrennt durch Semikolon: "Zeitstempel;[Bezeichnung];[Ton];[Wiederkehrend". Zeitstempel als Unix-Zeitstempel in Millisekunden, Bezeichnung als Text, Ton als Ton-ID, Wiederkehrend entweder leer für einmalig, "TÄGLICH" für täglich oder "WÖCHENTLICH=MO,DI,MI,DO,FR,SA,SO" mit durch Komma getrennter Wochentagsliste. Felder in Klammern im obigen Beispiel sind optional! | Zeichenkette |
| ausgelöst | ID des zuletzt auf diesem Gerät ausgelösten Alarms | ID |

Wenn das Ändern eines Alarms nicht funktioniert, stellen Sie bitte sicher, dass der Alarmzeitpunkt in der Zukunft liegt – das Ändern von z. B. des „Tons“ eines Alarms in der Vergangenheit funktioniert also _nicht_!

### Alexa2.0.Echo-Geräte.Seriennummer.Bluetooth.*
Hier finden Sie alle verbundenen oder bekannten Bluetooth-Geräte mit ihren MAC-Adressen. Der Status jedes Geräts:

| Staatsname | Bedeutung |
|------------|----------------------------------------------------------------------------------------------------|
| verbunden | Zeigt den aktuellen Verbindungsstatus an und ermöglicht das Verbinden (auf „true“ gesetzt) oder Trennen (auf „false“ gesetzt) |
| Entkoppeln | Schaltfläche zum Entkoppeln dieses Geräts vom Echo-Gerät |

### Alexa2.0.Echo-Geräte.Seriennummer.Befehle.*
Mit Sprachbefehlen können Sie Aktionen auf Ihrem Alexa-Gerät auslösen. Wenn Sie diese auf einem Multiroom-System verwenden, werden sie unabhängig voneinander ausgeführt und *nicht* synchron auf den einzelnen Geräten!

| Staatsname | Bedeutung | Wert |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| Nicht stören | Schalten Sie „Nicht stören“ für dieses Gerät oder diese Gruppe ein/aus. Der Wert wird bei Gerätekonfigurationsaktualisierungen aus der Cloud aktualisiert. | wahr/falsch oder Anzahl der Sekunden bis zur Aktivierung (max. 12 Stunden) oder Zeichenfolge im Format „HH:MM“, bis zu der diese Zeit aktiviert ist. |
| Flashbriefing | Kurzzusammenfassung in 100 Sekunden - news etc.pp | Schaltfläche |
| Guten Morgen | Guten Morgen von Alexa ... | Schaltfläche |
| Funfact | Lustige Tatsache von Alexa ... (Derzeit nur in den USA verfügbar) | Schaltfläche |
| Witz | Witz von Alexa ... | Schaltfläche |
| Aufräumen | Spielt einen „Gong“-Ton zum Starten/Enden des Hörmodus ab ... | Taste |
| curatedtts | Zufälliger Satz aus dem ausgewählten Bereich von Alexa ... | Text (erlaubt: "goodbye", "confirmations", "goodmorning", "compliments", "birthday", "goodnight", "iamhome") |
| singasong | Alexa singt ein Lied ... | Schaltfläche |
| sprechen | Alexa sagt, was Sie hier eingeben ... | Texteingabe |
| Sprechlautstärke | Passen Sie die Sprechlautstärke von Alexa an. Diese Lautstärke wird vor dem Sprechen eingestellt und anschließend zurückgesetzt. | 0-100 |
| Skill | Einen definierten Skill starten | Skill-ID als Zeichenkette |
| skillYours | Startet einen definierten Skill – ist mit „Ihre Skills“ vorausgefüllt, wie er auch in der Alexa-App angezeigt wird | Skill-ID als Zeichenkette |
| tellstory | Alexa erzählt eine Geschichte | Schaltfläche |
| Verkehr | Verkehrsmeldungen | Schaltfläche |
| Wetter | Wetternachrichten | Schaltfläche |
| deviceStop | Alle Aktionen auf dem Gerät stoppen | Schaltfläche |
| Benachrichtigung | Sende eine Textbenachrichtigung an den Kunden des Geräts | Text, optional Titel angeben "title;text" |
| Ankündigung | Ansage abspielen (ähnlich wie sprechen, aber mit Bing vor dem Text)<br> *Hinweis: Funktioniert nur, wenn Benachrichtigungen (für dieses Gerät) aktiviert sind und sich das Gerät nicht im „Nicht stören“-Modus befindet.* | Text |
| ssml | SSML-XML-Zeichenfolge aussprechen<br> *Hinweis: Funktioniert nur, wenn Benachrichtigungen (für dieses Gerät) aktiviert sind und sich das Gerät nicht im „Nicht stören“-Modus befindet.* | Text |
| Textbefehl | Sende einen Textbefehl an Alexa. Verwende unbedingt nur Text (z. B. auch 3 -> drei usw.), sonst reagiert Alexa möglicherweise nicht richtig! | Text |
| Ton | Einen Ton auf dem Gerät abspielen | Text |

Detaillierte Informationen zu „Sprechen“ und „Ansagen“: Geben Sie hier ein, was Alexa sagen soll. Sie können die Lautstärke von Alexa anpassen, indem Sie vor Ihrem Text einen Prozentwert angeben.

Beispiel: 10; Alexa spricht mit 10 % Lautstärke, 100; Alexa spricht mit 100 % Lautstärke.

Normalerweise können Sie pro Sprechbefehl nur 250 Zeichen senden. Mit einem Semikolon können Sie beliebig viel schreiben, solange Sie die 250 Zeichen durch ein Semikolon trennen.

Alexa spricht den Text dann nacheinander mit einer kurzen Pause aus. Sie können die Lautstärke auch mit mehreren 255-Zeichen-Blöcken kombinieren, indem Sie #Lautstärke;#Block1;#Block2 usw. eingeben. Die hier festgelegte Lautstärke wird über die vordefinierte Sprechlautstärke angewendet.

Teilweise funktionieren auch Sounds von https://developer.amazon.com/en-US/docs/alexa/custom-skills/ask-soundlibrary.html. Geben Sie in Speak oder SSL `<audio src="soundbank://soundlibrary/animals/amzn_sfx_bear_groan_roar_01"/>` an. Details und Diskussion finden Sie unter https://forum.iobroker.net/topic/27509/ssml-audio

### Alexa2.0.Echo-Devices.Serialnumber.FireTVCommands.*
Wenn es sich bei dem Gerät um einen Amazon FireTV handelt, können Sie die folgenden Befehle verwenden:

| Staatsname | Bedeutung | Wert |
|--------------|--------------------------|--------|
| Einschalten | Fire TV und Fernseher einschalten | Taste |
| Ausschalten | Fire TV und Fernseher ausschalten | Taste |
| videoPause | Laufendes Video anhalten | Schaltfläche |
| VideoFortsetzen | Aktuelles Video fortsetzen | Schaltfläche |
| navigateHome | Zur Startseite navigieren | Schaltfläche |

### Alexa2.0.Echo-Devices.Serialnumber.Info.*
Informationen zum Alexa-Gerät

| Staatsname | Bedeutung | Wert |
|-------------------|---------------------------------------------------------------------------------------------|---------------------------|
| Funktionen | Funktionen des Alexa-Geräts | Informationen |
| Gerätetyp | Gerätetyp von Amazon | Informationen |
| deviceTypeString | Gerätetyp als Zeichenfolge | Information |
| isMultiroomDevice | Ist ein Multiroom-Gerät vorhanden? - Multiroom ist eine virtuelle Gerätegruppe. | Information, wahr / falsch |
| isMultiroomMember | Ist Mitglied einer Multiroom-Gruppe? - Wenn true, ist das Gerät Teil einer Multiroom-Gerätegruppe. | Information, true / false |
| MultiroomParents | Wenn dieses Gerät Teil einer Multiroom-Gerätegruppe ist, zeigt dieser Status das übergeordnete Gruppengerät an | Informationen |
| Name | Name des Alexa-Geräts | Informationen |
| Seriennummer | Seriennummer des Alexa-Geräts |

### Alexa2.0.Echo-Devices.Serialnumber.Music-Provider.*
Sagen Sie Alexa direkt, sie soll Musik oder eine Playlist von unterstützten Musikanbietern abspielen. Unterstützt werden: Meine Bibliothek, Amazon Music und TuneIn. Sie können auch den Namen einer Multiroom-Gerätegruppe in den Befehl einfügen, um die Musik in dieser Gruppe abzuspielen (z. B. „SWR3 auf Erdgeschoss“).

| Staatsname | Bedeutung | Wert |
|-----------------------|------------------------------------|------------|
| Amazon Music | Phrase zum Abspielen mit Amazon Music | Texteingabe |
| Amazon-Music-Playlist | Playlist zum Abspielen mit Amazon Music | Texteingabe |
| Meine Bibliothek | Spielphrase für Meine Bibliothek | Texteingabe |
| Meine-Bibliothek-Playlist | Playlist zum Abspielen mit „Meine Bibliothek“ | Texteingabe |
| Tune-In | Mit Tune-In abspielbarer Satz | Texteingabe |
| TuneIn-Wiedergabeliste | Wiedergabeliste, die mit TuneIn abgespielt werden soll | Texteingabe |

### Alexa2.0.Echo-Geräte.Seriennummer.Player.*
Zustände, um die Wiedergabe des Geräts zu steuern und den aktuellen Status und die Medieninformationen anzuzeigen.

| Staatsname | Bedeutung | Wert |
|---------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------|
| allowNext | Ist die Aktion "Weiter"/"Vorwärts" erlaubt? | Information |
| allowPlayPause | Ist die Wiedergabe-/Pause-Aktion erlaubt? | Informationen |
| allowPrevious | Ist die vorherige Aktion zulässig? | Information |
| allowRepeat | Kann die Wiederholungsfunktion verwendet werden? | Informationen |
| allowShuffle | Kann die Shuffle-Funktion verwendet werden? | Informationen |
| ContentType | Textfeld zur Eingabe des gewünschten Inhalts für die Wiedergabe auf diesem Gerät | Information |
| controlForward | Schaltfläche zum Auslösen des Spielerbefehls "Vorwärts" (30 Sekunden) | Schaltfläche |
| controlNext | Schaltfläche zum Auslösen des Spielerbefehls "Nächster" | Schaltfläche |
| controlPause | Schaltfläche zum Auslösen des „Pause“-Befehls des Spielers | Schaltfläche |
| controlPlay | Schaltfläche zum Auslösen des Wiedergabebefehls | Schaltfläche |
| controlPrevious | Schaltfläche zum Auslösen des Spielerbefehls "Vorheriger" | Schaltfläche |
| controlRepeat | Schaltfläche zum Auslösen des Wiederholungsbefehls des Spielers | wahr / falsch |
| controlRewind | Schaltfläche zum Auslösen des Spieler-Befehls "Zurückspulen" (30 Sekunden) | Schaltfläche |
| controlShuffle | Schalter zum Aktivieren oder Deaktivieren des Zufallswiedergabemodus für den Spieler | wahr / falsch |
| AktuellesAlbum | Aktuell abgespieltes Album | Informationen |
| Aktueller Künstler | Derzeit spielender Künstler | Informationen |
| aktuellerStatus | Wenn gespielt -> wahr, sonst falsch | wahr / falsch |
| Aktueller Titel | Aktuell abgespielter Titel | Informationen |
| imageURL | URL zum Albumbild | Informationen |
| mainArtURL | URL zum aktuellen Hauptbild | Informationen |
| mediaId | Medien-ID des aktuell wiedergegebenen Mediums (normalerweise queueID:<Zahl>) | Zeichenkette, kann so eingestellt werden, dass zur angegebenen Medien-ID gesprungen wird |
| mediaLength | Länge des aktuellen Titels | Informationen |
| mediaLengthStr | Aktive Medienlänge im Format (HH:)MM:SS | Information |
| Hauptfortschritt | Aktive Medien verstrichene Zeit | Informationen |
| mainProgressPercent | Verstrichene Zeit der aktiven Medien in Prozent | Informationen |
| mediaProgressStr | Fortschritt des aktiven Mediums als (HH:)MM:SS | Information |
| miniArtUrl | URL zur Kunst (Mini) | Informationen |
| stummgeschaltet | Status 'STUMM' | Information, wahr / falsch, Lautstärke = 0 wird als stummgeschaltet betrachtet |
| Spielt das Medium in einer Gruppe? | Informationen |
| playingInGroupId | ID der Spielgruppe | Informationen |
| Anbieter-ID | ID des aktuellen Musikanbieters | Informationen |
| Anbietername | Name des aktuellen Musikanbieters | Informationen |
| Qualität | Qualitätsbezeichnung des aktuellen Mediums (kann leer sein) | Informationen |
| qualityCodec | Codec des aktuellen Mediums (kann leer sein) | Informationen |
| qualityDataRate | Datenrate (kbps) des aktuellen Mediums (kann leer sein) | Informationen |
| qualitySampleRate | Abtastrate (Hz) des aktuellen Mediums (kann leer sein) | Informationen |
| queueId | Warteschlangen-ID der aktuellen Wiedergabeliste | Informationen |
| radioStationId | ID des TuneIn-Radiosenders | Informationen |
| Dienst | Name des aktuellen Musikdienstes | Informationen |
| TuneIn-Station | Textfeld zur Eingabe eines Sendernamens, um diesen Sender auf diesem Gerät abzuspielen. Alternativ können Sie die Sendernummer (s123456...), eine Sendungs-/Podcast-ID (p1234567...) oder eine Themen-ID (t123456789...) eingeben. | Texteingabe |
| Lautstärke | Wiedergabelautstärke. Sie können einen Wert zwischen 0 und 100 % eingeben. | EINGABE-Lautstärke |

### Alexa2.0.Echo-Geräte.Seriennummer.Einstellungen.*
Hier finden Sie einige Geräteeinstellungen.

| Staatsname | Bedeutung | Wert |
|----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------|
| ringNotificationsEnabled | Zeigt an, ob Klingelbenachrichtigungen aktiviert sind und ermöglicht die Bearbeitung (true/false). Der Status wird in einem gerätekonfigurationsabhängigen Intervall aus der Cloud aktualisiert. |
| notificationVolume | Die für das Gerät festgelegte Benachrichtigungslautstärke. Der Wert wird einmalig beim Start des Adapters geladen und anschließend nicht mit Cloud-Diensten synchronisiert, ist aber änderbar. | Zahl 0..100 |
| ascendingAlarmState | Der für das Gerät festgelegte aufsteigende Alarmstatus. Der Wert wird einmalig beim Start des Adapters geladen und anschließend nicht mit Cloud-Diensten synchronisiert, kann aber geändert werden. | Boolescher Wert |
| auxPort-*-Direction | Die Richtung des AuxPorts (sofern unterstützt). Der Wert wird einmalig beim Start des Adapters geladen und anschließend nicht mit Cloud-Diensten synchronisiert, kann aber geändert werden. | "INPUT" oder "OUTPUT" |
| angeschlossener Lautsprecher | Der Lautsprecher, der für die Geräteausgabe verwendet wird. Der Wert wird einmalig beim Start des Adapters geladen und anschließend nicht mit Cloud-Diensten synchronisiert, kann aber geändert werden. | "Interner Lautsprecher", "Bluetooth" oder "Aux" (sofern vom Gerät unterstützt! Überprüfen Sie die App) |
| Standardalarmton | Der für das Gerät voreingestellte Standardalarmton. Der Wert wird einmalig beim Start des Adapters geladen und anschließend nicht mit Cloud-Diensten synchronisiert, kann aber geändert werden. | ID aus einer Liste |
| Standard-Timerbenachrichtigungston | Der für das Gerät festgelegte Standard-Timerton. Der Wert wird einmalig beim Start des Adapters geladen und anschließend nicht mit Cloud-Diensten synchronisiert, kann aber geändert werden. | ID aus einer Liste |
| displayAdaptiveBrightnessEnabled | Ist die adaptive Helligkeit für das Display des Geräts aktiviert oder nicht? Der Wert wird einmalig beim Start des Adapters geladen und anschließend nicht mit Cloud-Diensten synchronisiert, kann aber geändert werden. | wahr/falsch |
| displayEnabled | Ist das Display des Geräts aktiviert oder deaktiviert? Der Wert wird einmalig beim Start des Adapters geladen und anschließend nicht mit Cloud-Diensten synchronisiert, kann aber geändert werden. | wahr/falsch |
| Displayhelligkeit | Helligkeit des Displays. Der Wert wird einmalig beim Start des Adapters geladen und anschließend nicht mit Cloud-Diensten synchronisiert, ist aber änderbar. | 0.100% |
| equalizerBass | Einstellung für den Bass-Equalizer. Der Wert wird bei aktivierter Push-Verbindung aktualisiert. | Zahl |
| equalizerMidRange | Einstellung für den Mittenbereich des Equalizers. Der Wert wird bei aktivierter Push-Verbindung aktualisiert. | Zahl |
| equalizerTreble | Höhenregler-Einstellung. Der Wert wird bei aktivierter Push-Verbindung aktualisiert. | Zahl |

### Alexa2.0.Echo-Geräte.Seriennummer.Erinnerung.*
Erinnerungen-Einstellungen für jedes Gerät, sofern verfügbar.

| Staatsname | Bedeutung | Wert |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <id>.customVolume | Legen Sie eine benutzerdefinierte Lautstärke für diese Erinnerung fest. Die Lautstärke wird 2 Sekunden vor dem Auslösen der Erinnerung eingestellt und auf den vorherigen Wert zurückgesetzt, sobald der Timer (oder der Adapter) gestoppt wird – spätestens nach 120 Sekunden! Wenn sich benutzerdefinierte Lautstärken und Auslösezeiten überschneiden, wird die Lautstärke am Ende einmalig wiederhergestellt! | Zahl 0..100 |
| <id>.date | Überschreiben Sie das Datum eines bestehenden Alarms, um ein neues Datum für diesen Alarm festzulegen. Falls Sie bereits einen Alarm haben, können Sie das Datum hier ändern, indem Sie einfach die Uhrzeit im Format JJJJ-MM-TT überschreiben. Dies hat möglicherweise keine Auswirkung, wenn mehrmals täglich wiederkehrende Einstellungen verwendet wurden! | Datumsausgabe |
| <id>.delete | Schaltfläche zum Löschen des Alarms | Löschen mit true |
| <id>.enabled | Zeigt den Alarmstatus an und ermöglicht dessen Änderung: Alarm mit true aktivieren - Alarm mit false deaktivieren | true / false |
| <id>.nextTriggerDate | Enthält den Zeitpunkt der nächsten erwarteten Auslösung als Unix-Epoche in Millisekunden | Zahl |
| <id>.recurringDays | Zeigt die Liste der konfigurierten Tage an, wenn der Alarm wiederkehrende Einstellungen hat | US-Notation der Wochentage (z. B. MO, DI, MI, DO, FR, SA, SO) |
|<id> .recurringPattern | Zeigt das wiederkehrende Alarmmuster an | 0 = einmalig, keine Wiederholung<br> P1D = täglich<br> XXXX-WD = an Wochentagen<br> XXXX-WE = an Wochenenden<br> XXXX-WXX-1 = jeden Montag<br> XXXX-WXX-2 = jeden Dienstag<br> XXXX-WXX-3 = jeden Mittwoch<br> XXXX-WXX-4 = jeden Donnerstag<br> XXXX-WXX-5 = jeden Freitag<br> XXXX-WXX-6 = jeden Samstag<br> XXXX-WXX-7 = jeden Sonntag |
| <id>.snoozed | true, wenn der Wecker momentan auf Schlummern gestellt ist | true/false |
| <id>.sound | Enthält den für diesen Alarm eingestellten Ton. Kann angepasst werden. | ID aus der Liste |
| <id>.time | Alarmzeit. Überschreiben Sie die Zeit eines bestehenden Alarms, um eine neue Zeit für diesen Alarm festzulegen. Falls bereits ein Alarm vorhanden ist, können Sie die Zeit hier ändern, indem Sie die vorhandene Zeit im Format hh:mm:ss überschreiben. Sekunden werden nicht benötigt. Dies hat möglicherweise keine Auswirkung, wenn Einstellungen für mehrmals täglich wiederkehrende Alarme verwendet wurden! | Zeiteingabe |
| <id>.triggered | true, wenn der Alarm erreicht und ausgelöst wurde. Die Uhrzeit muss mit Amazon und iobroker synchronisiert sein. Verwenden Sie dies, um eine andere Aktion auszulösen, sobald die Alarmzeit erreicht ist. | true / false |
| Neu | Daten zum Erstellen einer neuen Erinnerung als Zeichenkette im folgenden Format, getrennt durch Semikolon: "Zeitstempel;Bezeichnung;[Ton];[Wiederkehrend". Zeitstempel als Unix-Zeitstempel in Millisekunden oder als Text wie "HH:MM", Bezeichnung als Text (erforderlich), Ton als Ton-ID, Wiederkehrend entweder leer für einmalig, "TÄGLICH" für täglich oder "WÖCHENTLICH=MO,DI,MI,DO,FR,SA,SO" mit durch Komma getrennter Liste der Wochentage. Für maximale Flexibilität kann "Wiederkehrend" auch ein JSON-Objekt mit allen übergebenen Daten sein. Felder in Klammern im obigen Beispiel sind optional! | Zeichenkette |
| ausgelöst | ID des zuletzt auf diesem Gerät ausgelösten Alarms | ID |

Wenn das Ändern einer Erinnerung nicht funktioniert, stellen Sie bitte sicher, dass der Zeitpunkt der Erinnerung in der Zukunft liegt – das Ändern von z. B. des „Tons“ einer Erinnerung in der Vergangenheit funktioniert also _nicht_!

### Alexa2.0.Echo-Geräte.Seriennummer.Routinen.*
Übersicht der in der Alexa App eingerichteten Routinen. Selbst erstellte Routinen haben eine Seriennummer, Amazon zeigt sie als „vorkonfiguriert:…“ an. Jede Routine kann per Knopfdruck einmalig ausgeführt werden.

| Staatsname | Bedeutung | Wert |
|------------------------------------|-----------------|--------|
| Serien- oder interner Name der Routine | Name der Routine | Schaltfläche |

### Alexa2.0.Echo-Devices.Serialnumber.Timer.*
Auf jedem Alexa-Gerät können ein oder mehrere Timer gleichzeitig laufen. Da Timer sehr dynamisch funktionieren, werden keine weiteren Objekte wie bei Alarmen oder Erinnerungen erstellt. Es gibt jedoch eine Möglichkeit, Benachrichtigungen über ausgelöste Timer zu erhalten.

| Staatsname | Bedeutung | Wert |
|-----------------|--------------------------------------------------------------------------------------------------------------|------------|
| activeTimerList | JSON-Array mit der Liste der aktiven Timer, die ID, Bezeichnung und Auslösezeitpunkt als Unix-Zeitstempel in Millisekunden enthalten | JSON-Array |

| nextTimeDate | Enthält den Zeitpunkt der nächsten erwarteten Auslösung als Unix-Epoche in Millisekunden | Zahl | Zahl

| nextTimerId | ID des nächsten auszulösenden Timers | Zeichenkette |
| stopTimerId | Steuerelement mit einer Timer-ID zum Anhalten des Timers (stoppt auch, wenn der Timer gerade klingelt!) | Zeichenkette |
| ausgelöst | Ein Timer wurde ausgelöst – genauer gesagt, der Timer mit der "nextTimerId" | wahr/falsch |

**Bitte beachten Sie, dass es wichtig ist, dass die Zeitzone des iobroker-Hosts mit Ihrer lokalen Zeitzone übereinstimmt, da die Erkennung des Auslösezeitpunkts sonst fehlerhaft sein könnte!**

### Alexa2.0.Echo-Geräte.Seriennummer.online
Ist dieses Alexa-Gerät online und mit der Amazon-Cloud verbunden?

| Staatsname | Bedeutung | Wert |
|------------|------------------------|--------------|
| online | Ist das Gerät online? | Wahr / Falsch |

### Alexa2.0.History
| Staatsname | Bedeutung | Wert |
|-----------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| #trigger | Schaltfläche zum Abrufen des aktuellen Verlaufs (aktueller als der Zeitstempel in creationTime), nur erforderlich, wenn keine Push-Verbindung verwendet wird oder die automatische Abfrage deaktiviert ist | Schaltfläche |
| Karteninhalt | Zusätzliche Informationen, wie in der Alexa-App/im Echo Show angezeigt | Informationen |
| cardJson | Zusätzliche Informationen, wie sie in der Alexa-App/im Echo Show im JSON-Format angezeigt werden | Informationen |
| Erstellungszeitpunkt | Datum dieses Verlaufseintrags; neue Verlaufseinträge werden erst berücksichtigt, wenn sie nach diesem Zeitpunkt liegen. | Informationen |
| domainApplicationId | Zusätzliche Informationen wie Skill-ID oder Ähnliches, optional | Informationen |
| Domänenanwendungsname | Zusätzliche Informationen wie z. B. der Name der Fertigkeit (optional) | Informationen |
| json | JSON der Daten des letzten Befehls, um alle Informationen z. B. in eigenen JavaScripts verarbeiten zu können | JSON |
| Name | Name des Geräts, das die letzte Anfrage erhalten hat | Informationen |
| Seriennummer | Seriennummer des Geräts, das die letzte Anfrage erhalten hat | Informationen |
| Status | Status des letzten Befehls an Alexa | ERFOLG / FEHLER / VERWORFEN_NICHT_GERÄTE-GERICHTETE_ABSICHT; der letzte Wert wird generiert, wenn das Gerät durch Sprechen des Aktivierungsworts aktiviert wird oder wenn das Gerät die Eingabe als "nicht für mich" verworfen hat. |
| Zusammenfassung | Vom Gerät empfangener Text/Zusammenfassung/Aktion | Information |

### Alexa.0.Smart-Home-Geräte
Beinhaltet alle Smart-Home-Geräte, die Alexa durch Ihre Skills kennt. Für alle bekannten Geräte gilt Folgendes:

| Staatsname | Bedeutung | Wert |
|-----------------|--------------------------------------------------------------------------------------------|--------|
| deleteAll | Löscht alle Smart-Home-Geräte aus Alexa, genau wie die Schaltfläche in der Alexa-App | Schaltfläche |
| discoverDevices | findet neue Smart-Home-Geräte, genau wie die Schaltfläche in der Alexa-App | Schaltfläche |
| queryAll | Fragt alle Geräte ab, wird nur angezeigt, wenn mindestens ein Gerät Informationen abrufen kann | Schaltfläche |

### Alexa.0.Smart-Home-Devices.SerialNumber.*
| Staatsname | Bedeutung | Wert |
|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------|
| #löschen | Smart-Home-Gerät aus Alexa entfernen | Schaltfläche |
| #aktiviert | Ist das Smart-Home-Gerät aktiv? Status und Steuerung zum Aktivieren/Deaktivieren. Der Status wird im gleichen Intervall wie die Daten des Smart-Home-Geräts mit der Cloud synchronisiert. | wahr / falsch |
| #includeInAllQuery | Soll dieses Gerät bei der Abfrage aller Gerätezustände berücksichtigt werden? | true / false |
| #Abfrage | Daten für dieses Gerät abfragen, nur sichtbar, wenn das Smart-Home-Gerät/der Skill das Abrufen von Informationen unterstützt | Schaltfläche |
| aktiv | wird für Szenen angezeigt, die aktiviert/deaktiviert werden können | wahr / falsch |
| powerState | Strom ein-/ausschalten | veränderbar, wahr/falsch |
| ... | Viele weitere mögliche Zustände je nach Art des Smart-Home-Geräts | Information oder veränderbar :-) |

**-> Spezielle Zustände für Farb-/Lichtgeräte**

| Staatsname | Bedeutung | Wert |
|--------------------------|-------------------------------------------------------------------------|--------------------------------|
| Helligkeit | Helligkeit der HUE-Lampe | einstellbar von 0-100% |
| Farbhelligkeit | Helligkeit zur Farbdefinition (zusammen mit Farbton und Sättigung, HSV) | Information, 0-1% |
| Farbton | Farbtonwert (zusammen mit Helligkeit und Sättigung, HSV) | Information, 0-360° |
| Farbsättigung | Sättigung der Farbe (zusammen mit Helligkeit und Farbton, HSV) | Information, 0-1 |
| colorRGB | RGB-Code der tatsächlichen Farbe, zusammengesetzt aus color-* Werten | Information, #rrggbb |
| colorName | Name der Farbe gemäß Alexa-Definition – feste Werte | änderbar, um die Farbe festzulegen, 0–144 |
| Farbtemperatur in Kelvin | Informationen, 1000-10000K |
| colorTemperatureName | Farbtemperaturname gemäß Alexa-Definition – feste Werte | einstellbar, 0–18 |

Mit #brightness können Sie die Helligkeit Ihrer Lampe anpassen, mit #colorName wählen Sie eine vordefinierte Farbe (0–144). Für HUE-Umgebungslicht stehen Ihnen unter #colorTemperatureName 19 Werte von 0 bis 18 zur Auswahl. Alle Lampen lassen sich mit #powerState ein- und ausschalten.

### Alexa2.0.Info.*
| Staatsname | Bedeutung | Wert |
|------------|-------------------------------------------------------------------------------------|-----------------------------|
| Verbindung | Wenn die Verbindung zu Alexa in Ordnung ist | Information -> wahr / falsch |
| Cookie | Alexa-Cookie, Verwendung mit verschiedenen externen Skripten, die ebenfalls auf die Alexa-APIs zugreifen möchten | Informationen |
| CSRF | Alexa CSRF, Verwendung mit mehreren externen Skripten, die ebenfalls auf Alexa-APIs zugreifen möchten | Informationen |

## Installation
Wie üblich kann man das stabile Repository, das neueste Repository oder die „Install“-Optionen von ioBroker von GitHub verwenden.

## Alexa-Gerätebefehle per Nachricht senden
Alle Befehle an die Alexa-Geräte können über den Adapter an einzelne Geräte oder Gruppen gesendet werden. Der Adapter unterstützt das Senden dieser Befehle und kombiniert sie bei Bedarf auch, um vor der Sprachausgabe eine bestimmte Lautstärke einzustellen und anschließend die ursprüngliche Lautstärke wiederherzustellen.

Wenn Sie benutzerdefinierte Sequenzen an Alexa-Geräte senden möchten, können Sie eine Routine erstellen und diese Routine auch über die Zustände auslösen.

Falls dies nicht flexibel genug ist, bietet der Adapter seit Version 3.14.0 die Möglichkeit, Befehle über Nachrichten zu senden.

Sie stellen eine Array-Struktur bereit, die in Befehle umgewandelt wird. Es gibt zwei Arten von Optionen für ein Array-Element:

**Ein Befehl**

```json
{
    "command": "speak", // command like the state name in Commands states
    "value": "This is a test speak.", // value like value you set on state
    "device": "..." // optional: serialNumber of the device to send this command to
}
```

**Eine Sequenzdefinition**

```json
{
    "sequenceType": "...", // "SerialNode" or "ParallelNode"
    "nodes": [...] // array of commands or sequences
}
```

Das Senden der Nachricht, z. B. mithilfe eines JavaScript-Adapters, sieht folgendermaßen aus:

```javascript
adapter.sendTo(
    "alexa.0", // target
    "sendSequenceCommand", // command
    { // value
        "deviceSerialNumber": "...", // Serial number of one device to get Meta data which will be used if no device is pecified on the commands
        "sequenceNodes": [...], // list of sequences or commands
        "sequenceType": "SerialNode" // "SerialNode" or "ParallelNode" for the provided sequenceNodes on main level. Default is "SerialNode"
    }, (err, res) => {
        console.log(err);
        console.log(JSON.stringify(res));
    }
);
```

Befehle werden als „ParallelNode“ parallel ausgeführt, was hauptsächlich sinnvoll ist, um Befehle an verschiedene Geräte zu senden. Befehle als „SerialNode“ werden nacheinander ausgeführt – **Amazon kümmert sich darum, nicht der Adapter!**

Eine Struktur wie die folgende ist möglich:

```json
... // use ParallelNode on main level
"sequenceNodes": [
    {
        "sequenceType": "SerialNode",
        "nodes": [
            {
                "command": "speak",
                "value": "This is a test speak.",
                "device": "DeviceA"
            },
            {
                "command": "speak",
                "value": "This is a second test speak.",
                "device": "DeviceA"
            }
        ]
    },
    {
        "sequenceType": "SerialNode",
        "nodes": [
            {
                "command": "speak",
                "value": "This is a test speak.",
                "device": "DeviceB"
            },
            {
                "command": "speak",
                "value": "This is a second test speak.",
                "device": "DeviceB"
            },
            {
                "sequenceType": "ParallelNode",
                "nodes": [
                    {
                        "command": "flashbriefing",
                        "device": "DeviceC"
                    },
                    {
                        "command": "flashbriefing",
                        "device": "Device B"
                    }
                ]
            }
        ]
    }
]

```

## Fehlerbehebung
### Problem bei der Cookie-Ermittlung im SMS-basierten 2FA-Verfahren
Wenn Sie noch die SMS-/E-Mail-basierte Zwei-Faktor-Authentifizierung (2FA) verwenden, funktioniert dies möglicherweise nicht. Bitte aktualisieren Sie die 2FA-/OTP-Methode in den Amazon-Einstellungen auf das aktuelle Verfahren! Es kann auch zu einem Fehler 404 (Seite nicht gefunden) kommen. Überprüfen und aktualisieren Sie in diesem Fall bitte auch Ihre OTP-Einstellungen.

### Die Alexa-App öffnet sich, wenn ich versuche, mich anzumelden
Wenn Sie die Proxy-URL von einem Mobilgerät aus öffnen, auf dem auch die Alexa-App installiert ist, kann es sein, dass sie nicht funktioniert, da Amazon möglicherweise die Alexa-App öffnet. Verwenden Sie daher bitte ein Gerät oder einen PC, auf dem die Alexa-App nicht installiert ist!

### Mir wird eine Seite mit einem QR-Code angezeigt, der mich zum Scannen auffordert.
Wenn Sie eine Seite sehen, die Ihnen mitteilt, dass „alexa.amazon.xx veraltet ist“ und Sie die Alexa-App verwenden sollten, und die beim Eingeben der Proxy-URL einen QR-Code anzeigt“, dann bedeutet dies, dass Sie die Proxy-URL mit einer anderen IP-Adresse/einem anderen Domainnamen aufrufen als dem, den Sie in den Einstellungen „Proxy eigene IP“ eingegeben haben, oder dass Sie die in der Adapterkonfiguration angezeigte IP-Adresse angepasst haben.

Die Einstellung „Eigene IP“ **muss** mit der IP-Adresse/dem Domänennamen übereinstimmen, die/den Sie zum Aufrufen der Proxy-URL verwenden!

### Probleme bei der Cookie-Ermittlung über E-Mail/Passwort
Manchmal verwendet Amazon ungewöhnliche Sicherheitsvorkehrungen, um unerwartet hohen Traffic beim Login zu erkennen.
Dies kann dazu führen, dass ein Captcha zum Anmelden gelöst werden muss. In der Regel muss dieses Captcha nur einmal beantwortet werden; danach funktioniert die Anmeldung ohne weitere Eingabe.

Wenn Sie ein solches Captcha beantworten müssen, versuchen Sie Folgendes:

* Verwenden Sie einen gängigen Browser (z. B. Chrome)
* JavaScript deaktivieren!
* Löschen Sie alle möglicherweise vorhandenen Amazon-Cookies oder verwenden Sie den privaten/Inkognito-Modus Ihres Browsers.
* Rufen Sie https://alexa.amazon.de an
* Sie sollten ein Anmeldeformular erhalten (normalerweise angezeigt bei älteren mobilen Browsern)
* Melden Sie sich dort mit Ihren Amazon-Zugangsdaten an, wo Ihr Echo/Alexa-Gerät registriert ist.
* Möglicherweise müssen Sie sich zweimal anmelden oder ein Captcha lösen.
Am Ende sollte die URL "https://alexa.amazon.de/spa/index.html" lauten, allerdings ohne Inhalt (da JavaScript weiterhin deaktiviert ist). DAS IST ABER VÖLLIG IN ORDNUNG!
* Versuche nun erneut, den Cookie zu erhalten.
Falls es immer noch nicht funktioniert, wiederholen Sie den Vorgang und überprüfen Sie den User-Agent und die Accept-Language Ihres Browsers. Verwenden Sie diese Werte beim nächsten Versuch im Adapter.

Darüber hinaus muss der Accept-Language-Header (Standardwert: "de-DE") mit Ihrer Sprache/der Sprache Ihres Browsers/der Sprache der Amazon-Seite, auf der Sie sich anmelden, übereinstimmen.

Sie können auch mit dem User-Agent experimentieren und einen verwenden, der besser zu Ihrem Systemtyp passt.
Beispielsweise wurde berichtet, dass die Verwendung des User-Agents „Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36“ auf einem Linux-System zu einer besseren Performance von ioBroker führte.

Sie können alle diese Parameter in der Adapterkonfiguration überschreiben.

### Push-Verbindungen stellen keine Verbindung her
Es kann mitunter vorkommen, dass Amazon aufgrund zu vieler Verbindungsversuche den Push-Verbindungsendpunkt für eine bestimmte IP-Adresse und ein bestimmtes „Gerät“ blockiert.

Wenn die Push-Verbindung nicht hergestellt werden kann, können Sie Folgendes versuchen:

* Löschen Sie die Instanz des Adapters
* Prüfen Sie, ob Dateien wie /opt/iobroker/node_modules/iobroker.alexa2/formerDataStore*.json vorhanden sind – falls ja, löschen Sie diese bitte.
* Neue Instanz hinzufügen und neues Cookie erhalten

Dann sollte es wieder funktionieren.

### Ich habe zu viele App-/„Dieses Gerät“-Geräte in meiner Liste der Echo-Geräte
Der Adapter liest alle von Amazon gemeldeten Daten. Manchmal bleiben ungenutzte und alte Apps oder andere Verbindungen in dieser Liste erhalten. Um diese Liste zu bereinigen, müssen Sie die Amazon-Website besuchen und die Geräte dort entfernen.

Link: https://www.amazon.de/hz/mycd/digital-console/devicedetails?deviceFamily=ALEXA_APP

Nach dem Löschen eines nicht verwendeten Geräts starten Sie bitte den Adapter neu, um auch diese Geräte dort zu entfernen.

### 🌍 Regionsspezifische Amazon-Konfiguration
Bei der erstmaligen Konfiguration des Adapters kann es bei einigen Nutzern zu Abstürzen kommen.

Dies liegt häufig daran, dass der Adapter **für die deutsche Amazon-Region (amazon.de) vorkonfiguriert ist**.
Wenn Ihr Alexa-Konto in einem anderen Amazon-Marktplatz registriert ist, müssen Sie einige Einstellungen aktualisieren, damit der Adapter mit den korrekten regionalen Endpunkten kommuniziert.

Wenn diese Werte nicht angepasst werden, funktionieren Authentifizierung und Cookies möglicherweise, es kommt jedoch beim Abrufen Ihrer Geräte zu Fehlern, die zu Adapterstartfehlern führen und ein Beendigungssignal TERMINATE_YOURSELF auslösen.

Um die regionalen Endpunkte zu korrigieren, gehen Sie zu `Instances > alexa2.x > Settings > Cookie` und konfigurieren Sie die Werte wie unten beschrieben.

| Region / Land | Alexa-Basis-URL | Akzeptierte Sprache | Amazon-Cookie-URL |
|------------------|-----------------------|------------------|--------------------|
| **Frankreich** 🇫🇷 | `alexa.amazon.fr` | `fr-FR` | `amazon.fr` |
| *(Weitere hinzufügen...)* | | | |

Falls Ihre Region nicht aufgeführt ist und Sie den Wert ermitteln, zögern Sie nicht, diese Dokumentation mit Ihren Erkenntnissen zu ergänzen.

## Changelog
<!-- ### __WORK IN PROGRESS__ -->
### 3.27.4 (2025-11-06)
* (@Apollon77) Adjusts authentication check to recent Amazon changes

### 3.27.3 (2025-07-15)
* (Apollon77) Adjust Lists to recent Amazon changes
* (Apollon77) Adjust retrieving the Smart home device list to recent Amazon changes
* (Apollon77) Delete all ioBroker originated Smart Home devices because not controllable anyway
* (Apollon77) Adjust usage of some deprecated js-controller methods

### 3.26.7 (2024-10-24)
* (Apollon77) Fix Sentry integration

### 3.26.6 (2024-10-20)
* (simatec) Responsive Design added

### 3.26.5 (2024-04-16)
* (Apollon77) Adjust History query to recent Amazon changes

### 3.26.4 (2024-01-25)
* (Apollon77) Removed Weblink
* (Apollon77) Adjust History query to recent Amazon changes

### 3.26.3 (2023-11-25)
* (Apollon77) Fixed the proxy login process

### 3.26.2 (2023-11-24)
* (Apollon77) Removed infos how to get cookies manually because no longer available
* (Apollon77) Optimized Admin configuration order of settings for history
* (Apollon77) Fixed some crash cases reported by Sentry
* (Diginix/Apollon77) Added some more device types

### 3.26.1 (2023-11-08)
* (Apollon77) Fix missing text in Admin Config

### 3.26.0 (2023-11-08)
* (Apollon77) Automatically query of activity/history needs to be enabled manually (if you need it!)

### 3.25.5 (2023-10-29)
* (Apollon77) Optimize activity detection to process all relevant entries in all cases

### 3.25.4 (2023-10-27)
* (Apollon77) Optimize activity detection to process all relevant entries and not just the last one

### 3.25.3 (2023-10-27)
* (Apollon77) Adjust History update to work with recent Amazon changes

### 3.25.2 (2023-09-12)
* (Apollon77) Optimize reconnection handling for push connections

### 3.25.1 (2023-09-09)
* IMPORTANT: Minimum required Node-js version is 16 now!
* (Apollon77) Updated the Push connection after Amazon technology changes
* (Apollon77) Added some more device types

### 3.24.1 (2023-08-08)
* (Apollon77) Work around Amazon changes that affected all functions over the Push connection
* (Apollon77) Some smaller fixes and adjustments

### 3.23.2 (2022-11-30)
* (Apollon77) Prioritize real devices higher than app devices when serialnumbers overlap

### 3.23.1 (2022-11-26)
* (Apollon77) Enhance checks when changing smart device values
* (Apollon77) Try to prevent Amazon rate limiting (again)

### 3.21.0 (2022-11-03)
* IMPORTANT: Because of rate limits by Amazon, I decided to remove the update of smart home device values in intervals because it seems to produce too much load in Skills and Amazon systems.
* (Apollon77) Optimizes loading of smart home device states
* (Apollon77) Fixed issue with enabling/disabling of Alarms in combination with non-default music for the alarm
* (Apollon77) Prevented that Timers or Alarms that are long in the future to trigger their trigger state too early
* (Apollon77) Fixed deleting own user Messages state
* (Apollon77) Already request Notification updates when history registered a Notification action and do not wait for Push info to come in

### 3.20.1 (2022-10-29)
* (Apollon77) make sure caching works correctly with multiple instances of the adapter

### 3.20.0 (2022-10-29)
* (Apollon77) Increase minimum interval for requesting smart home device data to 15 minutes (900s) because of Amazon rate limits. Please do not try to work around it!
* (Apollon77) Cache Smart home device list and data to prevent too many requests when restarting adapter in short intervals and to prevent deleted smart home devices also on further rate limit issues

### 3.19.10 (2022-10-27)
* (Apollon77) Fix issue in retry handling when rate limit exceeded is returned by Amazon
* (Apollon77) Do not clean up Smart Home Device objects for now - delete manually if you remove a device

### 3.19.9 (2022-09-12)
* (Apollon77) Receive the correct player status again when musik is stopped

### 3.19.8 (2022-09-07)
* (Apollon77) Add safeguard for too high intervals

### 3.19.7 (2022-08-19)
* (Apollon77) Fix doNotDisturb when using a time string

### 3.19.6 (2022-08-18)
* (Apollon77) Fix doNotDisturb when using a time string

### 3.19.5 (2022-08-09)
* (Apollon77) Fix doNotDisturb for groups

### 3.19.4 (2022-08-07)
* (Apollon77) Prevent unwanted device Name updates

### 3.19.3 (2022-08-07)
* (Apollon77) Fix crash check with multiple adapter instances

### 3.19.2 (2022-08-06)
* (Apollon77) Fix Alarm creation when just providing time and it is for next day

### 3.19.1 (2022-08-04)
* (Apollon77) Fix retry handling

### 3.19.0 (2022-08-04)
* (Apollon77) Preserve Names as soon as it is an App type in general
* (Apollon77) Enhance checks and safeguards for polling intervals
* (Apollon77) Check for restart intervals that do not make sense and stop adapter if detected
* (Apollon77) Add additional crash-loop detection

### 3.18.6 (2022-07-19)
* (Apollon77) Fix deviceStop sequence command

### 3.18.5 (2022-07-19)
* (Apollon77) Fix crash case reported by Sentry
* (arteck) Add image for Fire Cube

### 3.18.3 (2022-07-18)
* (Apollon77) Fix doNotDisturb and doNotDisturb for All devices
* (Apollon77) Update do not disturb status after set for all devices
* (Apollon77) preserve a changed name for a "This device" device object

### 3.18.2 (2022-07-18)
* (Apollon77) Enable commands again for Apps with type A2TF17PFR55MTB - will only work sometimes as it seems

### 3.18.1 (2022-07-18)
* (Apollon77) Optimize Handling when push connection could not be established

### 3.18.0 (2022-07-18)
* IMPORTANT: Smart home device values are from now on only synchronized when enabled via #includeInIntervalQuery state. Enable only what's really needed!
* (Apollon77) Allow to query several more smart home device states (incl. the Echo own Temperature-Sensor if available) and more optimizations
* (Apollon77) Optimize querying smart home device states to only request relevant properties
* (Apollon77) Exclude some value types again from requesting from Amazon because they make no sense and will never contain meaningful data
* (Apollon77) Add FireTV commands for FireTV devices
* (Apollon77) Add CommandsAll.deviceStop and CommandsAll.deviceDoNotDisturb commands to be sent to all devices
* (Apollon77) Add Equalizer preferences (if supported by devices)
* (Apollon77) Add Speaker and AUX preferences (if supported by devices)
* (Apollon77) Add Display (enabled, brightness, adaptive brightness) preferences (if supported by devices)
* (Apollon77) Enhance doNotDisturb state to also allow specifying a enable duration or end timepoint
* (Apollon77) Add a fallback to update music player when a new history record mentions music as target for the spoken words. Could help as fallback when push infos are not coming in sometimes with Sonos
* (Apollon77) Delay initialization of push connection to when basic structures are initialized
* (Apollon77) Add some more devices

### 3.17.5 (2022-07-14)
* (Apollon77) Minimum smart home device query interval is now 5 minutes and not 1 minute anymore to remove some requests for now

### 3.17.4 (2022-07-13)
* (Apollon77) Make sure disabling query intervals really work (disabling smart home device and state and configuration was not possible)

### 3.17.3 (2022-07-12)
* (Apollon77) Prevent datatype warnings in log

### 3.17.2 (2022-07-12)
* (Apollon77) Another adjustment for smart home device data readings
* (Apollon77) Fix crash cases reported by Sentry

### 3.17.1 (2022-07-12)
* (Apollon77) Work around timing issues with speak-volume when using announcement
* (Apollon77) Correctly initialize volume/mute on startup also when player data are not available
* (Apollon77) Do not overwrite speak-volume (and some other fields) with null on adapter start
* (Apollon77) Fix crash cases reported by Sentry

### 3.17.0 (2022-07-11)
* (Apollon77) Add support to play Audible books in Music-Providers
* (Apollon77) Optimize deletion of alarms and reminders
* (Apollon77) Optimize requesting smart home device data

### 3.16.1 (2022-07-11)
* (Apollon77) Fix deletion and cancellation of Alarms and Reminders

### 3.16.0 (2022-07-11)
* (Apollon77) Add (official) support for Music-Alarms - they are now listed under "Alarms" together with the other Alarms! The "sound" list will contain the device specific music targets - so you can basically zse the ones that you created at least once via voice commands.
* (Apollon77) For a Music Alarm the "customVolume" on the alarm is used to set the normal device volume 2s before the alarm but do not (!) reset it afterwards
* (Apollon77) Prevent crashes on one time Alarms that just triggered

### 3.15.2 (2022-07-09)
* (Apollon77) Fix case where initialization of the adapter was never finished and so nothing was controllable when App devices where not synced

### 3.15.1 (2022-07-09)
* (Apollon77) Convert Smarthome device values if wrong datatype is delivered by device
* (Apollon77) Add handling for two more battery health states for smart home devices
* (Apollon77) Fix crash case when initializing notifications

### 3.15.0 (2022-07-09)
* (Apollon77) IMPORTANT: Format to specify multiple Details on "New" for Alarms and Reminders changed, see documentation!
* (Apollon77) Add Alarm/Reminder triggered state per device which will contain the ID of the alarm that got triggered when it is triggered
* (Apollon77) Add several more fields for Alarms and Reminders to show better the details of the alarm
* (Apollon77) Allow to cancel Reminders and Alarms as in the Alexa App
* (Apollon77) Allow to also edit Alarm/Reminder Dates additionally to the times
* (Apollon77) Allow to set a custom Volume for Reminders and Alarms - it will be set 2s before the expected trigger and restored afterwards
* (Apollon77) Calculate the "nextTriggerDate" as Timestamp of next expected triggering
* (Apollon77) Add a JSON-Array with all running timers and the "next id" as state
* (Apollon77) Allow to stop a timer by ID
* (Apollon77) Add the days-list of Alarms when configured for recurrency
* (Apollon77) Add new Commands skill and skillYours to start Skills
* (Apollon77) Add Notification volume, Ascending Alarm setting and default notification sounds as preferences
* (Apollon77) Slow down the initialization of all data a bit, so startup could take longer

### 3.14.0 (2022-07-06)
* (Apollon77) Allow to define if Lists and Smart home devices are synced by the adapter with the Amazon Cloud at all
* (Apollon77) Enhance Smart Home Device support by adding various controllers and states. If in your Alexa App something is configurable which is not in ioBroker please send a debug log!
* (Apollon77) Re-Introduce the ability to poll smart home device states in intervals, but only devices are queried that report their status proactively to Amazon-Cloud to prevent Skill developer costs! ioBroker (and OpenHab) devices are NOT queried! The interval can be configured but must not be lower than 60s! Querying is disabled by default.
* (Apollon77) Add message to send out sequences of commands to alexa devices
* (Apollon77) Add Info states for macAddress and WifiSSID of the Alexa devices
* (Apollon77) Add several new states for Player for allowed actions, medium quality
* (Apollon77) Add mediaId and also allow to set it to jump to a defined entry in the playlist
* (Apollon77) Add Commands.sound to play a sound
* (Apollon77) Do not set the speak-volume when executing textCommand and deviceStop
* (Apollon77) Do not set speak-volume if the volume is already as wanted when executing commands
* (Apollon77) update Do-Not-Disturb status once on start and with device configuration updates
* (Apollon77) Allow to specify the title in notification commands
* (Apollon77) When a device plays music in a group then new states in "Player"will indicate this together with the group ID
* (Apollon77) Allow to enable and disable smart home devices - this will be synced together with the smart home state updates from the cloud if changed in the app!
* (Apollon77) Detect Rate limit exceeded response and do one automatic request retry 10s later (plus a random part)
* (Apollon77) Slow down the update of player status to prevent rate limit exceeded errors. initial update of the player states is delayed on startup of the adapter
* (Apollon77) Restore character replacement for Music providers (space is now again a "-")
* (Apollon77) Add more devices
* (Apollon77) Optimize startup and unload handling

### 3.13.0 (2022-07-02)
* IMPORTANT List Names are now checked for invalid characters and replaced. Might change the name of objects in ioBroker. Old ones need to be deleted manually!
* (Apollon77) Fix command sending in multi owner environments (e.g. Family shared devices)
* (Apollon77) Add some new devices
* (ammawel) Add the date of an alarm as state, not only time
* (Apollon77) Add option to also query the App Devices to allow to send commands to them
* (Apollon77) Rework Multiroom for commands to prevent rate limiting issues!
* (Apollon77) Fix Routine Naming if triggers were used
* (Apollon77) Support devices with "Ziggy" as wake word
* (Apollon77) All commands with voice output respect the defined speak-volume now
* (Apollon77) Allow again to directly enter TuneIn station Ids (s*) and topicIds (t*)
* (Apollon77) Add media states to show remaining time of media playback
* (simatec) Adjust link color im Admin configuration
* (Apollon77) Some requests are automatically retried with a slight delay if Amazon responds with error 503

### 3.12.0 (2021-11-13)
* (Apollon77) SequenceNodes created for a device are now bound to the "deviceOwnCustomer" - should help in mixed owner groups
* (ammawel) Add recurringPattern for Notifications (see Readme)
* (Apollon77) Fix crash case
* (Apollon77) Make sure states are not set too early before objects are created

### 3.11.2 (2021-10-12)
* (Apollon77) Fix crash case (Sentry IOBROKER-ALEXA2-AT)

### 3.11.1 (2021-10-12)
* (Apollon77) Prevent warnings with js-controller 3.3

### 3.11.0 (2021-10-12)
* (Apollon77) Add support for Multi Utterance Routines
* (Apollon77) Fix object deletion for lists
* (Apollon77) Fix Creation of new Lists and add deletion support
* (Apollon77) Allow Commands for Stereo Pairs
* (Apollon77) Optimize Push Connection and History retrieval

### 3.10.4 (2021-10-11)
* IMPORTANT: Node.js 10 support is dropped, supports LTS versions of Node.js starting with 12.x
* (Apollon77) Update Push Connection

### 3.9.3 (2021-07-11)
* (Apollon77) Try to fix setting targetTemperature for ThermostatController

### 3.9.2 (2021-07-05)
* (Apollon77) Only ignore empty history entries if both, summary and alexaResponse is empty

### 3.9.1 (2021-06-04)
* (Apollon77) Fix cookie exchange and cookie validation checks

### 3.9.0 (2021-05-11)
* (Apollon77) Add some new devices
* (Apollon77) Always recognize "alexa" as wakeword to handle commands via the apps correctly

### 3.8.4 (2021-05-11)
* (Apollon77) Optimize Cookie refresh handling
* (Apollon77) Fix warnings from js-controller 3.3 and optimize

### 3.8.2 (2021-04-19)
* (Apollon77) Adjust automatic Cookie Refresh interval from 7 to 4 days

### 3.8.1 (2021-02-09)
* (Apollon77) Initialize volume for all devices on start

### 3.8.0 (2021-02-04)
* (Apollon77) Add configuration option to not write history entries where no command text was recognized

### 3.7.1 (2021-02-03)
* (Apollon77) add some more detected text into summary and answerText states (textCommand commands should be in history back again)

### 3.7.0 (2021-02-03)
* (Apollon77) IMPORTANT: History entries are now requested via a different data source because Amazon seems to tun off the old option. History.status is for this no longer filled, but new states were added. Only voice commands are reported ( textCommand entries not longer)
* (Apollon77) other optimizations in communications and prevent hammering amazon with requests in error cases

### 3.6.1 (2021-02-02)
* (fbeister) Add and adjust some known devices
* (Apollon77) Optimize object deletion

### 3.6.0 (2021-01-28)
* (Apollon77) Update Routines API because of amazon changes

### 3.5.6 (2021-01-22)
* (Apollon77) Catch error when deleting objects

### 3.5.4 (2021-01-22)
* (Apollon77) restart adapter when no initial cookie could be requested

### 3.5.2 (2021-01-17)
* (Apollon77) Prevent to write non-existing state values
* (Apollon77) Add and adjust some known devices

### 3.5.0 (2020-12-24)
* (Apollon77) Remove bespoken because textCommand is more flexible
* (Apollon77) Add and adjust some known devices, add Echo 4 image

### 3.4.0 (2020-12-11)
* (Apollon77) add support for textCommand - tell an Alexa device a text as you would speak it
* (Apollon77) make sure discovery of devices is still possible also after deleting all devices before

### 3.3.5 (2020-12-03)
* (Apollon77) make sure music providers with empty names do not produce errors

### 3.3.2 (2020-11-23)
* (Apollon77) prevent crash cases and optimize reconnection handling

### 3.3.1 (2020-07-24)
* (Apollon77) Further optimize Cookie handling

### 3.3.0 (2020-07-19)
* (Apollon77) Hopefully allow easier upgrades if old deviceId is invalid now
* (Apollon77) Allow to have separate deviceIds per instance

### 3.2.8 (2020-07-16)
* (Apollon77) Work around Amazon Security changes and make proxy working again

### 3.2.7 (2020-07-15)
* (Apollon77) Work around Amazon Security changes and make proxy working again
* (arteck) add echo studio

### 3.2.6 (2020-07-15)
* (Apollon77) Work around Amazon Security changes and make proxy working again

### 3.2.5 (2020-07-13)
* (Apollon77) Work around Amazon Security changes and make proxy working again 
* (Apollon77) fix Sentry crash case when Amazon do not respond correctly (IOBROKER-ALEXA2-1C)

### 3.2.4 (2020-06-18)
* (Apollon77) Update Alexa-Remote Library to optimize communication error/timeout cases

### 3.2.3 (2020-06-17)
* (Apollon77) Fix currentState handling

### 3.2.2 (2020-06-17)
* (Apollon77) remove goodnight because was not working
* (Apollon77) Fix Play/Pause states and some media optimizations

### 3.2.1 (2020-06-17)
* (Apollon77) update amazon-cookie library: another optimization for Node.js 14

### 3.2.0 (2020-06-17)
* (Apollon77/hive) add new commands, jokes/facts/goodnight/cleanup
* (Apollon77/hive) add new command curatedtts with allowed values ["goodbye", "confirmations", "goodmorning", "compliments", "birthday", "goodnight", "iamhome"] to play random curated sentences
* (Apollon77) Prevent some crashes
* (Apollon77) Make sure Timer are not triggering the state when deleted
* (Apollon77) make sure that Lists objects are deleted correctly when deleting
* (Apollon77) Make compatible with nodejs 14
* (Apollon77) Adjust to changes from Amazon so that initial Proxy process works again
* (OberstVonGatow) Make sure that for Spotify Media data requests do not have negative effects and stop the playback

### 3.1.2 (2020-03-18)
* (Gieskanne/Apollon77) Add Next Timer Date as state
* (Apollon77) Fix missing history entries
* (Apollon77) Prevent List deletions from logging errors
* (Apollon77) optimiztions, dependency updates and fixes
* (Apollon77) Switch to ioBroker own sentry instance
* (Apollon77) add Info.softwareVersion

### 3.0.8 (2020-01-19)
* (Apollon77) fix some crash cases
* (Apollon77) Update Sentry DSN and add filtering
* (Apollon77) Update deps

### 3.0.7 (2019-12-28)
* (Apollon77) Prevent some errors

### 3.0.6 (2019-12-26)
* (Apollon77) Prevent some errors

### 3.0.5 (2019-12-25)
* (Apollon77) Prevent some errors

### 3.0.4 (2019-12-24)
* (Apollon77) Prevent some errors

### 3.0.3 (2019-12-24)
* Adapter needs nodejs 8+ and js-controller 2.0 now!
* (Zefau) add functionality for handling of lists
* (Apollon77) Add answerText when available from history
* (Apollon77) handle error for empty valueMaps for ColorTemperatures
* (Apollon77) also support names for new special routines (Alarm Notifications, Sensor Detections, ..)
* (Apollon77) GitHub Actions for Test& Build
* (Apollon77) Add Sentry for error reporting
* (Apollon77) prevent some crashed after changes by Amazon
* (Apollon77) fix Routine names after changes by Amazon
* (Apollon77) add some devices and new images
* (Apollon77) Add more situations to update player status because amazon send no info anymore on title changes

### 2.6.4 (2019-07-25)
* (Apollon77) add some error handling for contacts

### 2.6.1 (2019-07-22)
* (Apollon77) add new device
* (Apollon77) fix volume logic for ssml
* (Apollon77) Allow reminders to bet set >+ 1day

### 2.6.0 (2019-07-21)
* (Apollon77) added possibility to send text messages to users including himself, allows deletion of all messages to himself
* (Apollon77) added option to reset Cookies. After sahev the adapter will restart and needs to get a new Login (see adapter config)
* (Apollon77) change announcement and ssml to send commands more synchronous

### 2.5.0/1 (2019-07-07/18)
* (INgoRah) Support compact mode
* (Apollon77) enhance error handling for broken authentications

### 2.4.6 (2019-07-05)
* (Apollon77) enhance error handling for broken authentications

### 2.4.5 (2019-07-01)
* (Apollon77) enhance error handling for broken authentications

### 2.4.4 (2019-06-26)
* (Apollon77) new devices added

### 2.4.3 (2019-06-25)
* (Apollon77) enhance error handling for Amazon Push Infos

### 2.4.1/2 (2019-06-23)
* (Apollon77) Allow to specify an external docker container IP to override Proxy-IP
* (Apollon77) Add more Devices from GitHub
* (Apollon77) try to work around an Image URL bug from Amazon
* (Apollon77) optimize Admin display of Status/Link
* (Apollon77) add Link to https://alexa.amazon.com to Admin instance overview
* (Apollon77) Remove Admin2 support
* (Apollon77) Optimize Handling from DNS errors (hopefully) to prevent stopped Adapters on Internet/DNS problems

### 2.3.3 (2019-06-21/22)
* (Apollon77) adjust to current Amazon changes
* (Apollon77) fix volume handling
* (Apollon77) Add some more devices
* (Apollon77) Logging reduced
* (Apollon77) unknown devices get commands activated automatically
* (Apollon77) remove Email/Password fields and add info about login to Admin screen (still needs to be polished, only Admin v3)
* (Apollon77) detect App-Devices and remove them from the list because they are not usable in any way

### 2.2.0 (2019-01-xx) [unpublished]
* (Apollon77) add new sequenceCommands "calendarNext", "calendarToday", "calendarTomorrow"
* (Apollon77) fix wake word handling and history sanitizing

### 2.1.0 (2019-01-13) [unpublished]
* (Apollon77) cookie handling completely rewritten, no email/password anymore, only Proxy (still only from log)
* (Apollon77) fixes routine triggering that triggered on wrong device sometimes
* (Apollon77) added new commands "deviceStop", "announcement", "notification", and "ssml" (see documentation above)

### 1.1.3 (2018-11-17)
* (Apollon77) optimize cookie handling again

### 1.1.2 (2018-11-17)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.1 (2018-11-09)
* (Apollon77) new devices
* (Apollon77) make proxy for cookies work again

### 1.1.0 (2018-09-18)
* (Apollon77) Further optimizations to lower number of requests
* (Apollon77) Experimental support for Playlist IDs (p1234567) in TuneIn-Station

### 1.0.1 (2018-09-16)
* (Apollon77) fixes and important changes to make sure not too many requests are sent

### 1.0.0 (2018-09-06)
* (Apollon77) polishng and finalization, make it 1.0.0

### 0.7.5 (2018-09-04)
* (Apollon77) speak can now contain separated text by semicolons. These Texts will then be spoken sequencially. So the old limit if 250 characters is only existing for one such text part. So, now longer texts are possible too. Separate it with a semicolon.
* (Apollon77) more color handling fixes

### 0.7.0 (2018-08-30)
* (Apollon77) Add Bespoken Virtual device support to be able to interact with Alexa infrastructure
* (Apollon77) add new Device Types for Smarthome-integration (Contact and Motion sensors)

### 0.6.4 (2018-08-30)
* (Apollon77) fixes to colorhandling
* (Apollon77) allow to deliver a volume together with aspeak command by using "80;text" and then volume is set before speak and reset afterwards. Experimental!

### 0.6.1 (2018-08-24)
* (Apollon77) sometimes new alarms were not triggered in adapter
* (Apollon77) add support to control smart devices and groups (and also add groups). Because I was only able to test a few types i added logging. please check log, try out and report back!
* (Apollon77) When routines are executed via voice command and push connection is enabled the routine state is also triggered by "true" with ack=true when routine trigger text is matching exactly to spoken text
* (Apollon77) corrected volume and mute handling in states, a volume of 0 is also seen as "muted" if muting flag is not supported by device
* (Apollon77) when speak text is coming from cloud adapter and contains SSML tags they will be filtered out, so you can use a speak endpoint directly to output response from Smart Home skill actions

### 0.5.2 (2018-08-16)
* (Apollon77) fix an error when getting new cookie
* (Apollon77) add new "Playlist" states for the Music providers to directly prepend "playlist" :-)
* (Apollon77) Volumes are not updated for multiroom devices when === 0
* (Apollon77) Add Reminder and Alarms support. Write time and pot. text separated by comma into the "New" stat to create a new one (e.g. "10:00:00, Test-Reminder")
* (Apollon77) Also with Push-Connection some times states are generally updated to make sure data are correct (e.g. player media info will disappear 2h after stopping the music)
* (Apollon77) Added some more deviceTypes

### 0.4.0 (2018-08-13)
* (Apollon77) internal Refactoring
* (Apollon77) states that are not needed anymore will be removed. This will be logged for now, so please check this and give feedback!
* (Apollon77) sanitized music provider state names (spaces are now dashes ... should be removed automatically)
* (Apollon77) Renamed TuneIn-Direct to TuneIn-Station (even if you still can enter text to search, this works with stations too) ... should be removed automatically)
* (Apollon77) Device and Bluetooth status is now also checked at states update
* (Apollon77) After enabling Push-Connection the configured polling is turned off and anything is done based on real time informations from Alexa. Test it
* (Apollon77) Enhanced History states to include the status of the action (SUCCESS, FAIL ...), infos from returned cards (if available) and info on accessed skill for this action.
* (Apollon77) When using Push-Connection History update is also updated automatically. An empty summary with status DISCARDED_NON_DEVICE_DIRECTED_INTENT means the activation of the echo by saying the wake word
* (Bluefox) Add icons for some of the devices for Admin

### 0.3.8 (2018-07-27)
* (Apollon77) Several Multiroom-fixes
* (Apollon77) fixed shuffle/repeat
* (Apollon77) fixed status for play, pause, shuffle and repeat

### 0.3.4 (2018-07-27)
* (Apollon77) Only 20 Routines were queried, now up to 2000
* (Apollon77) Also allow commands including speak for multiroom, BUT it is triggered per device, so NO synchronous audio output!!
* (Apollon77) Thanks to Matten-Matten also Music-provers can be started on multiroom devices

### 0.3.2 (2018-07-25)
* (Apollon77) Fix volume settings for multiroom devices (please report other devices where it is not working)
* (Apollon77) Add serial number and name to Info

### 0.3.0 (2018-07-24)
* (Bluefox) Admin3 fixes and slight changes to roles and code
* (Apollon77) Reworked state names (hopefully last time!)
* (Apollon77) Combine Player-Control and Player-Info into channel Player to support better detection and material support
* (Apollon77) Added further information in Infos states per echo device
* (Apollon77) Try to detect the type of the device different and decide if commands are available or not (till capabilities are known better)
* (Apollon77) New "Music-Provider" states depending on available music providers with possibility to enter a text to play something (same as you would speak it)
* (Apollon77) Volume is send different now, so that it also works when Device player get's inactive

### 0.2.4 (2018-07-22)
* (pix) materialize settings window
* (Apollon77) WOn IP is set automatically with IP from first network interface
* (Apollon77) fix comma replacements in speaks, do not speak empty text
* (Apollon77) if Device is Multiroom, the do not create Routines and Commands and not bluetooth
* (Apollon77) add information about multiroom device and master (later we can use this to sort out commands that are impossible with multiroom)
* (Apollon77) History is also stored as JSON, so it can be used to monitor one datapoint and have all infos on updateState
* (Apollon77) Several other fixes

### 0.2.3 (2018-07-20)
* (Apollon77) in Numbers with . are replaced by commas

### 0.2.2 (2018-07-20)
* (Apollon77) Finally fix device renaming

### 0.2.1 (2018-07-20)
* (Apollon77) Small fix of history channel type and setting states initially

### 0.2.0 (2018-07-20) (as iobroker.alexa2)
* (Apollon77) 0.2.0: added many Player-Info datapoints including "progress updates " when media is playing
* (Apollon77) 0.2.0: removed "Notifications" because the only benefit for now is to show them, no interaction or change possible
* (Apollon77) 0.2.0: adapter now allows to configure intervals for history updates and other data updates like player info
* (Apollon77) 0.2.0: if cookie could not be determined correctly a proxy is started to allow manual login and cookie is catched in the background on success
* (Apollon77) 0.2.0: add info datapoints for connection (connected to Alexa), cookie and csrf
* (Apollon77) 0.2.0: rework complete logic to not use soef library anymore
* (Apollon77) 0.2.0: Speaking free text at any timepoint is available under Commands.speak
* (Apollon77) 0.2.0: Sequence-Commands (weather, traffic, flashbriefing, goodmorning, singasong, tellstory) are available to be triggered under "Commands"
* (Apollon77) 0.2.0: Automation-Routines are now available to be triggered per device under "Routines"
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Automatically use different user-agents for Win32, MacOS and Linux based systems
* (Apollon77) 0.2.0: Also support entering TuneIn-Station IDs ("s" plus 4-6 digits) to play that station

### 0.1.0 (2018-07-10)
* (Apollon77) get Adapter working again, especially getting cookie and optimize refresh

### 0.0.x
* soef versions

## License

The MIT License (MIT)

Copyright (c) 2018-2025 Ingo Fischer <iobroker@fischer-ka.de>, 2017-2018 soef <soef@gmx.net>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.