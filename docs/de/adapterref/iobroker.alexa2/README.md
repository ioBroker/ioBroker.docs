---
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.alexa2/README.md
title: ioBroker.alexa2
hash: 0tkrZY32K/97TQpOQ+IVlSzPZ7AfaQ5i4iO5NNUUD+A=
---
![Logo](../../../en/adapterref/iobroker.alexa2/admin/alexa.png)

![Anzahl der Installationen](http://iobroker.live/badges/alexa2-stable.svg)
![NPM-Version](http://img.shields.io/npm/v/iobroker.alexa2.svg)
![Downloads](https://img.shields.io/npm/dm/iobroker.alexa2.svg)

# IoBroker.alexa2
![Testen und freigeben](https://github.com/Apollon77/iobroker.alexa2/workflows/Test%20and%20Release/badge.svg) [![Übersetzungsstatus](https://weblate.iobroker.net/widgets/adapters/-/alexa2/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)

**Dieser Adapter verwendet Sentry-Bibliotheken, um den Entwicklern automatisch Ausnahmen und Codefehler zu melden.** Weitere Details und Informationen zum Deaktivieren der Fehlerberichterstattung finden Sie unter [Dokumentation zum Sentry-Plugin](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry Reporting wird ab js-controller 3.0 verwendet.

Mit diesem Adapter können Sie Ihre Alexa (Amazon Echo)-Geräte fernsteuern.

Großen Dank an soef für die Version 1 des Adapters und an Hauke und ruhr70 für Ideen in ihren Skripten aus dem ioBroker-Forum (insbesondere die Medienfortschritts-Updates)! Ein großes Dankeschön auch an meicker für die Unterstützung bei der Dokumentation all dessen und zahlreiche User aus dem ioBroker Forum für ihre Testunterstützung!

## Staaten und ihre Bedeutungen:
Im Adapter-Namespace (z.B. alexa2.0) werden einige Kanäle angelegt

### Alexa2.0
| Staatsname | Bedeutung |
| - | - |
| Echo-Geräte.* | Zustände pro Echo-Gerät, siehe unten |
| Geschichte.* | Infos zur Befehlshistorie siehe unten |
| Smart-Home-Geräte.* | Zustände pro Smart-Home-Gerät und allgemein, siehe unten |
| info.*| Allgemeine Informationen zum Adapterstatus |
| AnfrageErgebnis | Fehlerinfo für TuneIn- und Smart-Home-Geräteanfragen |

### Alexa2.0.Kontakte.KontaktId.*
Alle Alexa-Kontakte, an die Textnachrichten gesendet werden können, einschließlich an ihn selbst. Der eigene Kontakt bekommt ein spezielles "(Selbst)" nach seinem Namen.

| Staatsname | Bedeutung |
| - | - |
| #clearOwnMessages | Existiert nur im eigenen Kontakt und ein Trigger löscht alle Nachrichten, die an ihn gesendet werden (beinhaltet auch Nachrichten an ihn selbst über App oder Geräte!) |
| Textnachricht | Sendet diesen Text als Nachricht an den Benutzer. Es wird auf allen Geräten dieses Benutzers mit einem "gelben Ring" angezeigt |

### Alexa2.0.Echo-Geräte.Seriennummer.*
Unter "Echo-Geräte" wird jedes Amazon Echo-Gerät mit seiner Seriennummer aufgelistet. Nicht jedes Gerät zeigt alle Zustände an. Jedes Gerät hat seine eigenen Zustände, wie unten beschrieben:

### Alexa2.0.Echo-Geräte.Seriennummer.Alarm.*
Alarmeinstellungen (Wecker) für jedes Gerät, falls verfügbar.

| Staatsname | Bedeutung | Wert |
| - | - | - |
| aktiviert | Zeigt den Alarmstatus an und ermöglicht dessen Änderung: Alarm aktivieren mit true - Alarm deaktivieren mit false | wahr / falsch |
| Zeit | Zeit für Alarm. Überschreiben Sie die Zeit für einen bestehenden Alarm, um eine neue Zeit für diesen Alarm einzustellen. Falls Sie einen bestehenden Alarm haben, können Sie die Zeit hier ändern, indem Sie einfach die Zeit im Format hh:mm:ss überschreiben, Sekunden werden nicht benötigt, um | Zeiteingabe |
| ausgelöst | true, wenn Alarm erreicht und ausgelöst wird. Die Uhr muss mit Amazon und iobroker synchronisiert sein. Verwenden Sie dies, um andere Aktionen auszulösen, sobald die Weckzeit erreicht ist | wahr / falsch |
| wiederkehrendes Muster | Zeigt das wiederkehrende Alarmmuster | 0 = einmalig, nicht wiederkehrend<br> P1D = täglich<br> XXXX-WD = an Wochentagen<br> XXXX-WE = am Wochenende<br> XXXX-WXX-1 = jeden Montag<br> XXXX-WXX-2 = jeden Dienstag<br> XXXX-WXX-3 = jeden Mittwoch<br> XXXX-WXX-4 = jeden Donnerstag<br> XXXX-WXX-5 = jeden Freitag<br> XXXX-WXX-6 = jeden Samstag<br> XXXX-WXX-7 = jeden Sonntag |
| neu | Zeit für einen neuen Alarm für dieses Gerät. Wenn Sie hier einen Wert eingeben, wird ein neuer Alarm erstellt | Zeiteingabe (hh:mm:ss, Sekunden werden nicht benötigt) |

### Alexa2.0.Echo-Devices.Seriennummer.Bluetooth.*
Hier finden Sie alle verbundenen oder bekannten Bluetooth-Geräte mit MAC-Adresse(n). Die Zustände jedes Geräts:

| Staatsname | Bedeutung |
| - | - |
| verbunden | Zeigt den aktuellen Verbindungsstatus an und erlaubt eine Verbindung (auf true gesetzt) oder eine Trennung (auf false gesetzt) |
| entkoppeln | Schaltfläche zum Entkoppeln dieses Geräts vom Echo-Gerät |

### Alexa2.0.Echo-Devices.Serialnumber.Commands.*
Mit Befehlen können Sie einige Aktionen auf Ihrem Alexa-Gerät auslösen. Wenn Sie diese auf einem Multiroom-Gerät verwenden, werden sie unabhängig ausgeführt und *laufen* nicht synchron auf den einzelnen Geräten!

| Staatsname | Bedeutung | Wert |
| - | - | - |
| doNotDisturb | Bitte nicht stören für dieses Gerät ein-/ausschalten| wahr/falsch |
| Flashbriefing | Briefing in 100 Sekunden - Nachrichten etc.pp| Schaltfläche |
| Guten Morgen | Guten Morgen von Alexa ...| Schaltfläche |
| Funfact | Fun Fact von Alexa ... (derzeit nur USA)| Schaltfläche |
| Witz | Witz von Alexa ...| Schaltfläche |
| Aufräumen | Spielt einen "Gong"-Ton wie für den Start/Ende des Hörmodus ...| Schaltfläche |
| kuratiert | Zufälliger Satz aus dem gewählten Bereich von Alexa ...| Text (erlaubt: "Auf Wiedersehen", "Bestätigungen", "Guten Morgen", "Komplimente", "Geburtstag", "Gute Nacht", "Iamhome") |
| Singsang | Alexa singt ein Lied ...| Schaltfläche |
| sprechen | Alexa sagt, was du hier eingibst ...| Texteingabe |
| Sprachlautstärke | Passen Sie die Sprechlautstärke von Alexa an, diese Lautstärke wird vor dem Sprechen eingestellt und danach zurückgesetzt| 0-100 |
| Erzählung | Alexa erzählt eine Geschichte | Schaltfläche |
| Verkehr | Verkehrsnachrichten | Schaltfläche |
| Wetter | Wetternachrichten | Schaltfläche |
| deviceStop | Alle Aktionen auf dem Gerät stoppen | Schaltfläche |
| Benachrichtigung | SMS-Benachrichtigung an den Kunden des Geräts senden | Text |
| Ankündigung | Ansage abspielen (wie Sprechen, aber mit Bing vor Text) | Text |
| ssml | Sprechen Sie die SSML-XML-Zeichenfolge | Text |
| Textbefehl | Senden Sie einen Textbefehl an Alexa, derzeit nur USA! | Text |

Detaillierte Informationen Sprechen und Ansage: Geben Sie hier ein, was Alexa sagen soll. Sie können die Lautstärke von Alexa auch anpassen, indem Sie vor Ihrem Text einen Prozentsatz angeben.
Beispiel: 10;Alexa sagt Alexa mit 10 % Lautstärke, während 100;Alexa 100 % Lautstärke hat.
Normalerweise können Sie nur 250 Zeichen pro Sprechbefehl senden. Mit dem Semikolon können Sie beliebig viel schreiben, solange Sie 250 Zeichen durch ein Semikolon trennen.
Alexa wird dann den Text mit einer kleinen Pause nacheinander sprechen. Sie können die Lautstärke auch zusammen mit mehr 255 Blöcken verwenden, indem Sie #Volume;#Block1;#Block2, etc. schreiben. Eine hier eingestellte Lautstärke wird über eine definierte Sprechlautstärke verwendet.

Teilweise funktionieren auch Sounds von https://developer.amazon.com/en-US/docs/alexa/custom-skills/ask-soundlibrary.html. Geben Sie in speak oder ssml als `<audio src="soundbank://soundlibrary/animals/amzn_sfx_bear_groan_roar_01"/>` an. Details und Diskussion bitte unter https://forum.iobroker.net/topic/27509/ssml-audio

### Alexa2.0.Echo-Geräte.Seriennummer.Info.*
Informationen zum Alexa-Gerät

| Staatsname | Bedeutung | Wert |
| - | - | - |
| Fähigkeiten | Fähigkeiten, wenn das Alexa-Gerät | Informationen |
| Gerätetyp | Gerätetyp von Amazon | Informationen |
| deviceTypeString | Gerätetyp als String | Informationen |
| isMultiroomDevice | Ist Multiroom-Gerät - Multiroom ist eine virtuelle Gerätegruppe | Informationen, wahr / falsch |
| isMultiroomMember | Ist Multiroom-Mitglied – Wenn wahr, ist das Gerät Teil einer Multiroom-Gerätegruppe | Informationen, wahr / falsch |
| MultiroomEltern | Wenn dieses Gerät Teil einer Multiroom-Gerätegruppe ist, zeigt dieser Status das übergeordnete Gruppengerät | Informationen |
| Name | Name des Alexa-Geräts | Informationen |
| Seriennummer | Seriennummer des Alexa-Geräts |

### Alexa2.0.Echo-Devices.Seriennummer.Music-Provider.*
Sagen Sie Alexa direkt, dass sie Musik oder eine Wiedergabeliste von unterstützten Musikanbietern abspielen soll. Derzeit werden unterstützt: Meine Bibliothek, Amazon Music, Tune In. Sie können auch einen Multiroom-Gerätegruppennamen in die Phrase aufnehmen, um sie auf dieser Gruppe abzuspielen (z. B. "SWR3 im Erdgeschoss")

| Staatsname | Bedeutung | Wert |
| - | - | - |
| Amazon-Musik | Phrase zum Abspielen mit Amazon Music | Texteingabe |
| Amazon-Musik-Playlist | Playlist zum Abspielen mit Amazon Music | Texteingabe |
| Meine Bibliothek | Phrase zum Spielen mit My Library | Texteingabe |
| My-Library-Playlist | Playlist zum Spielen mit My Library | Texteingabe |
| Einschalten | Phrase zum Spielen mit Tune In | Texteingabe |
| Tune-In-Playlist | Playlist zum Abspielen mit Tune In | Texteingabe |

### Alexa2.0.Echo-Devices.Seriennummer.Player.*
Zustände, um die Wiedergabe des Geräts zu steuern und den aktuellen Status und Medieninformationen anzuzeigen

| Staatsname | Bedeutung | Wert |
| - | - | - |
| TuneIn-Sender | Textfeld, um einen Sendernamen einzugeben, um diesen Sender auf diesem Gerät abzuspielen. Es ist auch möglich, die Stationsnummer (s123456...), eine Show/Podcast-ID (p1234567...) oder eine Themen-ID (t123456789...) einzugeben | Texteingabe |
| Inhaltstyp | Textfeld zum Eingeben des gewünschten Inhalts zur Wiedergabe auf diesem Gerät | Informationen |
| controlForward | Schaltfläche zum Auslösen des Spielerbefehls "vorwärts" (30s) | Schaltfläche |
| controlWeiter | Schaltfläche zum Auslösen des Spielerbefehls "Weiter" | Schaltfläche |
| controlPause | Schaltfläche zum Auslösen des Spielerbefehls "Pause" | Schaltfläche |
| controlPlay | Schaltfläche zum Auslösen des Spielerbefehls "Play" | Schaltfläche |
| controlZurück | Schaltfläche zum Auslösen des "Zurück"-Befehls des Spielers | Schaltfläche |
| controlRepeat | Schaltfläche zum Auslösen des Spielerbefehls "Wiederholen" | wahr / falsch |
| controlRewind | Schaltfläche zum Auslösen des Spielerbefehls "Zurückspulen" (30s) | Schaltfläche |
| controlShuffle | Umschalten, um den Zufallsmodus für den Player zu aktivieren oder zu deaktivieren | wahr / falsch |
| aktuellesAlbum | Aktuelles Album läuft gerade | Informationen |
| aktuellKünstler | Aktueller Künstler spielt tatsächlich | Informationen |
| aktueller Zustand | Wenn gespielt -> true , sonst false| wahr / falsch |
| aktuellerTitel | Aktueller Titel wird aktuell wiedergegeben | Informationen |
| imageURL | URL zum Bild des Albums | Informationen |
| mainArtURL | URL zum aktuellen Hauptwerk | Informationen |
| Medienlänge | Länge des aktuellen Titels | Informationen |
| mediaLengthStr | aktive Medienlänge als (HH:)MM:SS | Informationen |
| mainFortschritt | Aktive Medien verstrichene Zeit | Informationen |
| mainProgressPercent | Verstrichene Zeit des aktiven Mediums in Prozent | Informationen |
| mediaProgressStr | aktiver Medienverlauf als (HH:)MM:SS | Informationen |
| miniArtUrl | URL zur Kunst (mini) | Informationen |
| gedämpft | Status 'MUTE' | Information, wahr / falsch, Lautstärke = 0 gilt als stumm |
| Anbieter-ID | ID des aktuellen Musikanbieters | Informationen |
| Anbietername | Name des aktuellen Musikanbieters | Informationen |
| radioStationId | ID des TuneIn-Radiosenders | Informationen |
| Dienst | Name des aktuellen Musikdienstes | Informationen |
| Lautstärke | Lautstärke der Wiedergabe. Sie können einen Wert zwischen 0-100% | . eingeben EINGANG Lautstärke |

### Alexa2.0.Echo-Geräte.Seriennummer.Erinnerung.*
Erinnerungseinstellungen (Erinnerungen) für jedes Gerät, falls verfügbar.

| Staatsname | Bedeutung | Wert |
| - | - | - |
| aktiviert | Zeigt den Erinnerungsstatus an und ermöglicht es, diesen zu ändern: Erinnerung mit true aktivieren - Erinnerung mit false deaktivieren, wird nach einiger Zeit automatisch gelöscht, wenn deaktiviert | wahr / falsch |
| Zeit| Zeit für Erinnerung. Überschreiben Sie die Zeit für die vorhandene Erinnerung, um eine neue Zeit einzustellen | Zeiteingabe | Falls Sie eine vorhandene Erinnerung haben, können Sie hier die Uhrzeit ändern, indem Sie einfach die Uhrzeit im Format hh:mm:ss überschreiben, Sekunden werden nicht benötigt, um |
| ausgelöst | true, wenn die Erinnerung erreicht und ausgelöst wird. Die Uhr muss mit Amazon und iobroker synchronisiert sein. Verwenden Sie dies, um andere Aktionen auszulösen, sobald die Erinnerungszeit erreicht ist | wahr / falsch |

| neu | Fügen Sie eine neue Erinnerung im Format hinzu<br> Zeit (hh:mm), Text<br> | Text Eingabe<br> 12:00,Erinnere mich daran

### Alexa2.0.Echo-Devices.Seriennummer.Routines.*
Übersicht über die in der Alexa App eingerichteten Routinen. Selbst erstellte Routinen haben eine Seriennummer, Amazon zeigt als 'vorkonfiguriert:...' an. Jede Routine kann mit einem Button zum einmaligen Ausführen ausgelöst werden.

| Staatsname | Bedeutung | Wert |
| - | - | - |

| Serieller oder interner Name der Routine | Name der Routine | Taste

### Alexa2.0.Echo-Devices.Seriennummer.Timer.*
Sie können auf jedem Alexa-Gerät einen oder mehrere Timer laufen lassen. Aufgrund der sehr dynamischen Natur von Timern werden keine weiteren Objekte wie bei Alarm oder Erinnerungen erstellt, aber es gibt eine Möglichkeit, eine ausgelöste Info zu erhalten.

| Staatsname | Bedeutung | Wert |
| - | - | - |

| ausgelöst | Ein Timer wurde ausgelöst | Information

**Bitte beachten Sie, dass es wichtig ist, dass die Zeitzone des ipbroker-Hosts mit Ihrer lokalen Zeitzone übereinstimmt, da sonst die ausgelöste Zeiterkennung möglicherweise falsch ist!**

### Alexa2.0.Echo-Geräte.Seriennummer.online
Ist dieses Alexa-Gerät online und mit der Amazon-Cloud verbunden?

| Staatsname | Bedeutung | Wert |
| - | - | - |

| online | Ist das Gerät online? | Wahr falsch

### Alexa2.0.Verlauf
| Staatsname | Bedeutung | Wert |
| - | - | - |
| #auslöser | Schaltfläche zum Abrufen eines neuen Verlaufs (aktueller als der Zeitstempel in CreationTime), nur erforderlich, wenn die Push-Verbindung nicht verwendet wird | Schaltfläche |
| Karteninhalt | Zusätzliche Informationen wie in Alexa-App/Echo Show angezeigt | Informationen |
| cardJson | Zusätzliche Informationen wie in Alexa-App/Echo Show im JSON-Format angezeigt | Informationen |
| Erstellungszeit | Datum dieses History-Eintrags, neue History-Einträge werden nur berücksichtigt, wenn später als dieser Zeitstempel | Informationen |
| domainApplicationId | Zusätzliche Informationen wie Skill-ID oder ähnliches, optional | Informationen |
| domainApplicationName | Zusätzliche Informationen wie Skillname oder ähnliches, optional | Informationen |
| json | Json der letzten Befehlsdaten, um alle Infos verarbeiten zu können, z.B. in eigenen JavaScripts| JSON |
| Name | Name des Geräts, das die letzte Anfrage erhalten hat | Informationen |
| Seriennummer | Seriennummer des Geräts, das die letzte Anfrage erhalten hat | Informationen |
| Status | Status des letzten Befehls an Alexa | ERFOLG / FEHLER / DISCARDED_NON_DEVICE_DIRECTED_INTENT; letzte wird generiert, wenn das Gerät aktiviert wird, indem das Aktivierungswort gesprochen wird, oder wenn das Gerät die Eingabe als "nicht für mich" verworfen hat |
| Zusammenfassung | vom Gerät empfangener Text/Zusammenfassung/Aktion | Informationen |

### Alexa.0.Smart-Home-Geräte
Beinhaltet alle Smart-Home-Geräte, die Alexa von Ihren Fähigkeiten her kennt. Staaten wie folgt für alle bekannten Geräte:

| Staatsname | Bedeutung | Wert |
| - | - | - |

| Alles löschen | löscht alle Smart-Home-Geräte von Alexa, genauso wie die Schaltfläche in der Alexa-App | Schaltfläche | Geräte entdecken | findet neue Smart-Home-Geräte, genauso wie der Button in der Alexa App | Schaltfläche | AbfrageAlle | fragt alle Geräte ab, nur sichtbar, wenn mindestens ein Gerät Informationen abrufen kann | Taste

### Alexa.0.Smart-Home-Devices.SerialNumber.*
| Staatsname | Bedeutung | Wert |
| - | - | - |

| #löschen | Smart-Home-Gerät von Alexa löschen | Schaltfläche | #aktiviert | Ist das Smart-Home-Gerät aktiv? | Information

| #abfrage | Daten für dieses Gerät abfragen, nur sichtbar, wenn das Smart Home-Gerät/der Skill das Abrufen von Informationen unterstützt | Schaltfläche |
| aktiv | für Szenen angezeigt, wenn sie aktiviert/deaktiviert werden können | wahr / falsch |
| powerState | Strom ein-/ausschalten | veränderbar, wahr / falsch |
| ... | Viele weitere mögliche Zustände je nach Typ des Smart-Home-Geräts | Info oder änderbar :-) |

**-> Sonderstatus für Farb-/Lichtgeräte**

| Staatsname | Bedeutung | Wert |
| - | - | - |
| Helligkeit | Helligkeit des HUE-Lichts | änderbar 0-100% |
| Farbe-Helligkeit | Helligkeit zur Farbdefinition (zusammen mit Farbton und Sättigung, HSV) | Informationen, 0-1% |
| Farbton | Farbtonwert der Farbe (zusammen mit Helligkeit und Sättigung, HSV) | Informationen, 0-360° |
| Farbsättigung | Sättigung der Farbe (zusammen mit Helligkeit und Farbton, HSV) | Informationen, 0-1 |
| FarbeRGB | RGB-Code des tatsächlichen Farbaufbaus aus Farb-*-Werten | Informationen, #rrggbb |
| Farbname | Name der Farbe wie von Alexa definiert - feste Werte | änderbar, um Farbe einzustellen, 0-144 |
| colorTemperarureInKelvin | Farbtemperatur in Kelvin | Informationen, 1000-10000K |
| FarbtemperaturName | Farbtemperaturname wie von Alexa definiert - feste Werte | änderbar auf Set, 0-18 |

Mit #brightness können Sie die Helligkeit Ihres Lichts anpassen, #colorName ist eine vordefinierte Farbe (0-144) auszuwählen. Für HUE Umgebungslicht können Sie zwischen 19 Werten von 0-18 in #colorTemperatureName wählen. Alle Lichter können mit #powerState ein- und ausgeschaltet werden.

### Alexa2.0.Info.*
| Staatsname | Bedeutung | Wert |
| - | - | - |
| Verbindung | Wenn die Verbindung zu Alexa in Ordnung ist | Informationen -> wahr / falsch |
| Keks | Alexa-Cookie, mit mehreren externen Skripten verwenden, die auch auf Alexa-APIs zugreifen möchten | Informationen |
| csrf | Alexa CSRF, Verwendung mit mehreren externen Skripten, die auch auf Alexa-APIs zugreifen möchten | Informationen |

## Fehlende Funktionen
* Wie aktualisiere ich den Anfangsstatus für Lautstärke, Shuffle oder Repeat und doNotDisturb?! Oder unnötig?
* Felder hinzufügen, um Spielinformationen wie die JS-Version anzuzeigen
* Selbstdeaktivierung bei ungültigem Cookie/csrf

## Installation
Verwenden Sie wie gewohnt ein stabiles Repository, das neueste Repository oder verwenden Sie die ioBroker-Optionen "Installieren" von GitHub

## Fehlerbehebung
###Probleme bei der Cookie-Ermittlung per E-Mail/Passwort
Manchmal hat Amazon seltsame Kontrollen eingerichtet, wenn sie unerwarteten Datenverkehr bei der Anmeldung feststellen.
Dies kann zu dem Problem führen, dass ein Captcha beantwortet werden muss, um sich anzumelden.
Meist muss dieses Captcha einmal beantwortet werden und danach funktioniert die Anmeldung ohne Captcha.

Wenn Sie ein solches Captcha beantworten müssen, versuchen Sie Folgendes:

* Verwenden Sie einen gängigen Browser (z. B. Chrome)
* Javascript ausschalten!
* Löschen Sie alle Cookies, die für Amazon möglicherweise vorhanden sind, oder verwenden Sie den Proivate/Inkognito-Modus des Browsers
* https://alexa.amazon.de aufrufen
* Sie sollten ein Anmeldeformular erhalten (normalerweise für ältere mobile Browser angezeigt)
* loggen Sie sich dort mit Ihren Amazon-Zugangsdaten ein, bei denen das Echo/Alexa registriert ist
* Möglicherweise müssen Sie sich zweimal anmelden oder ein Captcha lösen
* Am Ende sollte als URL "https://alexa.amazon.de/spa/index.html" angezeigt werden, jedoch ohne echten Inhalt (da JS noch deaktiviert ist), ABER DAS IST VOLLSTÄNDIG OK!!!!
* Versuchen Sie jetzt erneut, Cookie zu bekommen
* wenn es immer noch nicht funktioniert, wiederholen Sie es und überprüfen Sie den User-Agent und die akzeptieren-Sprache Ihres Browsers und verwenden Sie diese beim nächsten Versuch im Adapter

Außerdem muss der Accept-Language-Header (standardmäßig "de-DE") mit Ihrer Sprache/der Browsersprache/der Sprache der Amazon-Seite übereinstimmen, auf die Sie sich einloggen.

Sie können auch versuchen, mit dem User-Agent herumzuspielen und einen zu verwenden, der mehr zu dem von Ihnen verwendeten Systemtyp passt.
Als Beispiel mit "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36" als User-Agent wurde berichtet, dass es besser funktioniert, wenn ioBroker auf einem Linux-System läuft.

Sie können alle diese Parameter in der Adapterkonfiguration überschreiben.

### Wie kann ich Cookie selbst bestimmen?
Wenn die automatische Cookie-Ermittlung nicht funktioniert oder Sie dem Adapter die E-Mail/das Passwort nicht zutrauen, können Sie das Cookie selbst bestimmen. Es gibt mehrere Informationen im Web, wie es geht. Hier einige Links:

* https://www.gehrig.info/alexa/Alexa.html
* oder benutze das Shellscript von https://blog.loetzimmer.de/2017/10/amazon-alexa-hort-auf-die-shell-echo.html um es auf die Shell zu bekommen ...

Aber Achtung: Das Cookie läuft nach einiger Zeit ab und dann wird der Adapter nicht mehr funktionieren und sich selbst deaktivieren. Sie müssen dann manuell ein neues Cookie erhalten!

## Changelog

### __WORK IN PROGRESS__
* (Apollon77) Fix crash case
* (ammawel) Add recurringPattern for Notifications (see Readme)
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

Copyright (c) 2018-2021 Ingo Fischer <iobroker@fischer-ka.de>, 2017-2018 soef <soef@gmx.net>

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