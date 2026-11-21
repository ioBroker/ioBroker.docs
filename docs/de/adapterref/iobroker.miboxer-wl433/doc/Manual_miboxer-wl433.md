---
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md
title: Benutzerhandbuch ioBroker.miboxer-wl433
hash: MRLeX5rge0xpb4VOTHu8yAPH6AzQU3U/OJ2VPkdshgM=
---
# Benutzerhandbuch ioBroker.miboxer-wl433

_MiBoxer-Poolbeleuchtung (Gateway WL-433, Lampen PW01 / PW02) lokal mit ioBroker steuern – Schritt für Schritt erklärt_

|                |                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| Adapterversion | 0.2.2                                                                                                  |
| Datum          | 2026-11-02                                                                                             |
| Anforderungen  | ioBroker mit Admin 8 oder neuer, js-controller 6.0.11 oder neuer, Node.js 22 oder neuer                |
| Sprache        | Englisch · [Deutsche Fassung](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md) |

## Inhalt

1. [Über dieses Handbuch](#1-about-this-manual)
2. [Was der Adapter bewirkt](#2-what-the-adapter-does)
3. [Was Sie benötigen](#3-what-you-need)
4. [Schritt 1 – Richten Sie die Lampen und das Gateway in der MiBoxer-App ein.](#4-step-1--set-up-the-lamps-and-the-gateway-in-the-miboxer-app)
5. [Schritt 2 – Geräte-ID und lokalen Schlüssel abrufen](#5-step-2--get-the-device-id-and-the-local-key)
6. [Schritt 3 – Adapter installieren](#6-step-3--install-the-adapter)
7. [Schritt 4 – Instanz einrichten](#7-step-4--set-up-the-instance)
8. [Schritt 5 – Überprüfen Sie, ob alles funktioniert](#8-step-5--check-that-everything-works)
9. [Bedienung der Poolbeleuchtung](#9-operating-the-pool-lights)
10. [Zonen](#10-zones)
11. [Timer](#11-timers)
12. [Beispiele für Automatisierung](#12-automation-examples)
13. [Fehlerbehebung](#13-troubleshooting)
14. [Für alle Neugierigen: So funktioniert es im Detail](#14-for-the-curious-how-it-works-in-detail)
15. [Glossar](#15-glossary)
16. [Rechtliche Hinweise und Kontakt](#16-legal-notice-and-contact)

## 1. Über dieses Handbuch

Diese Anleitung führt Sie von einer bereits eingerichteten MiBoxer-App zur Steuerung Ihrer Poolbeleuchtung über ioBroker. Sie können die Beleuchtung schalten, dimmen und die Farbe anpassen. **Programmierkenntnisse sind nicht erforderlich** . Jeder Schritt ist detailliert beschrieben, sodass Sie ihn einfach der Reihe nach durcharbeiten können.

**So lesen Sie dieses Handbuch:**

- Arbeiten Sie die Kapitel 3 bis 8 **der Reihe** nach durch. Danach funktioniert die Steuerung.
- Die Kapitel 9 bis 12 zeigen, was Sie anschließend tun können. Kapitel 13 hilft Ihnen weiter, wenn etwas nicht funktioniert.
- Nummerierte Listen stellen die auszuführenden Schritte dar: zuerst Schritt 1, dann Schritt 2 und so weiter.
- Wörter in `this font` werden genau so eingegeben oder erscheinen genau so auf dem Bildschirm.
- Kapitel 15 erklärt unbekannte Begriffe.

Farbige Kästchen weisen auf etwas Besonderes hin:

> \[!TIP] Ein Tipp erleichtert Ihnen die Arbeit.

> \[!NOTE] Eine Anmerkung erläutert den Hintergrund.

> \[!WICHTIG] Wichtig: Dies nicht übersehen.

> \[!WARNUNG] Vorsicht: Hier kann etwas schiefgehen, wenn Sie nicht vorsichtig sind.

**Geprüft wurde Folgendes:** Alle Schritte mit dem Adapter wurden am 22.09.2026 mit einem echten WL-433-Gateway getestet. Die Bilder stammen aus ioBroker Admin 8. In anderen Admin-Versionen können die Schaltflächen leicht abweichen oder andere Bezeichnungen haben. Bereiche, die nicht getestet werden konnten, sind mit **„(nicht verifiziert)“** gekennzeichnet.

## 2. Was der Adapter bewirkt

Das MiBoxer WL-433 Gateway dient als Schnittstelle zwischen Ihrem Heimnetzwerk (WLAN) und der Poolbeleuchtung. Die Lampen empfangen ihre Befehle per Funk (LoRa, 433 MHz) vom Gateway. Normalerweise steuern Sie das Gateway über die MiBoxer App – ein Großteil der Kommunikation läuft über das Internet (die „Cloud“ des Herstellers Tuya).

Der Adapter **ioBroker.miboxer-wl433** kommuniziert **direkt mit dem Gateway in Ihrem Heimnetzwerk** , ohne Umweg über das Internet:

```text
ioBroker  ──(home network / WiFi)──►  WL-433 gateway  ──(radio 433 MHz)──►  PW01 / PW02 pool lights
```

**Was Sie mit dem Adapter machen können:**

- Schalten Sie die Lampen ein und aus und dimmen Sie sie (1–100 %).
- Stellen Sie das weiße Licht von warm (2700 K) auf kalt (6500 K) ein.
- Beliebige Farbe einstellen, einschließlich blasser Pastelltöne (Farbton und Sättigung)
- Starten Sie die 9 Farbprogramme M1–M9 der App und lassen Sie sie schneller oder langsamer laufen (S+ / S-).
- Steuern Sie einzelne der 8 Zonen oder alle Zonen gleichzeitig.
- Schalten Sie die Lampen automatisch mit bis zu 50 Timern – zu festen Zeiten oder mit dem Sonnenlicht, auch ohne Internet
- Verbinden Sie alles mit ioBroker-Skripten, Zeitplänen, Visualisierungen und Sprachassistenten.

**Was der Adapter nicht leisten kann (weil das Gateway dies nicht meldet):**

- Es kann nicht angezeigt werden, welche Zone aktuell welche Farbe hat. Das Gateway kennt nur **einen** Zustand für alle Lampen: die letzte Einstellung. Auch die MiBoxer-App zeigt keinen Unterschied zwischen den Zonen an.
- Es kann nicht anzeigen, wie schnell ein Farbprogramm abläuft.
- Es kann nicht feststellen, ob eine Lampe den Funkbefehl tatsächlich empfangen hat. Es sieht nur, was das Gateway meldet.
- Es kann weder die Timer der MiBoxer-App anzeigen noch ändern – diese werden in der Tuya-Cloud gespeichert (Kapitel 11).

## 3. Was Sie benötigen

Haken Sie diese Liste ab, bevor Sie beginnen:

- [ ] Ein **MiBoxer WL-433** Gateway und mindestens eine **PW01** oder **PW02** Lampe, eingerichtet in der **MiBoxer App** (Kapitel 4).
- [ ] Eine laufende **ioBroker-** Installation, beispielsweise auf einem Raspberry Pi. Mindestversionen: **Admin 8** , **js-controller 6.0.11** , **Node.js 22** .
- [ ] Gateway und ioBroker im **selben Heimnetzwerk** .
- [ ] Die **Geräte-ID** und der **lokale Schlüssel** des Gateways (Kapitel 5). Hierfür benötigen Sie einmalig ein **Android-Smartphone oder -Tablet** – ein iPhone oder iPad allein reicht nicht aus (Kapitel 5 erklärt den Grund dafür).
- [ ] Etwa 30 bis 60 Minuten Zeitaufwand.

> \[!TIPP] **So überprüfen Sie Ihre ioBroker-Versionen:** Öffnen Sie ioBroker Admin im Browser. Im Menü auf der linken Seite finden Sie **„Hosts“** – dort werden die Versionen von js-controller und Node.js angezeigt. Unter **„Adapters“** zeigt die Kachel **„Admin“** die installierte Admin-Version an.

> \[!TIPP] **Feste IP-Adresse für das Gateway:** Richten Sie in Ihrem Router eine DHCP-Reservierung für das Gateway ein (auf einer FRITZ!Box: _Heimnetz → Netzwerk → Gerät bearbeiten → „Diesem Netzwerkgerät immer dieselbe IPv4-Adresse zuweisen“_ ). Dadurch ändert sich die Adresse nie. Dies ist zwar nicht zwingend erforderlich, erhöht aber die Zuverlässigkeit.

## 4. Schritt 1 – Richten Sie die Lampen und das Gateway in der MiBoxer-App ein.

Der Adapter übernimmt die Lampen so, wie sie in der App konfiguriert sind. Stellen Sie daher zuerst alles in der App ein.

1. Installieren Sie die **MiBoxer** -App (Hersteller: Futlight) auf Ihrem Smartphone – entweder über Google Play (Android) oder den App Store (iPhone/iPad).
2. Erstellen Sie ein Konto und fügen Sie das **WL-433-Gateway** hinzu. Folgen Sie den Anweisungen der App.
3. Verbinden Sie jede Poollampe mit einer **Zone** des Gateways (Zone 1 bis 8). Die Anleitung [Guide\_connect\_PW01\_to\_WL-433.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md) ( [PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Guide_connect_PW01_to_WL-433.pdf) ) erklärt dies Schritt für Schritt.
4. Probieren Sie in der App aus, ob sich alle Lampen schalten lassen.

> \[!TIPP] Notieren Sie sich, welche Lampe sich in welcher Zone befindet. Sie benötigen diese Information später, wenn Sie einzelne Lampen steuern möchten:
>
> | Zone | Lampe (z. B. Standort) |
> | ---- | ---------------------- |
> | 1    |                        |
> | 2    |                        |
> | 3    |                        |

> \[!WICHTIG] Wenn Sie das Gateway später aus der App löschen und erneut hinzufügen („erneut koppeln“), ändert sich dessen **lokaler Schlüssel** . Wiederholen Sie dann Kapitel 5 und geben Sie den neuen Schlüssel im Adapter ein.

## 5. Schritt 2 – Geräte-ID und lokalen Schlüssel abrufen

Der Adapter benötigt zwei Werte, um mit dem Gateway kommunizieren zu dürfen:

| Wert                                  | So sieht es aus                                                 | Wozu dient es?                                                     |
| ------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Geräte-ID** ( _devId_ im Protokoll) | etwa 20 bis 22 Zeichen, z.B. `bf0123456789abcdefgh`              | Teilt dem Adapter mit _, welches_ Gerät angeschlossen werden soll. |
| **Lokaler Schlüssel**                 | genau 16 Zeichen, oft mit Sonderzeichen, z.B. `a1B2$c3D4{e5F6g7` | Das "Passwort" für die verschlüsselte Verbindung                   |

Die MiBoxer-App zeigt diese Werte nirgends an. Sie schreibt sie aber in ihr internes **Protokoll** – und dieses Protokoll kann auf einem **Android-Gerät** gelesen werden.

**Am einfachsten geht es mit der ausführlichen Anleitung** [Guide\_device-ID\_and\_local-key.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md) ( [PDF](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Guide_device-ID_and_local-key.pdf) ). Darin wird jeder einzelne Schritt erklärt – ganz ohne Computer mithilfe der Apps _LogFox_ und _Shizuku_ – und auch, was mit einem iPhone oder iPad möglich ist.

### 5.1 Alternative: mit einem Computer und einem USB-Kabel (Windows)

Diese Methode wurde am 22.09.2026 mit einem Android-13-Telefon getestet.

1. **Entwickleroptionen freischalten:** Öffnen Sie auf dem Android-Gerät _Einstellungen → Über das Telefon_ und tippen Sie **7 Mal** auf **die Build-Nummer** , bis die Meldung "Sie sind jetzt ein Entwickler" erscheint.
2. **USB-Debugging aktivieren:** Gehen Sie zu _Einstellungen → System → Entwickleroptionen → USB-Debugging_ . Auf Xiaomi-Geräten muss **USB-Debugging zusätzlich in den Sicherheitseinstellungen** aktiviert werden.
3. **Laden Sie das Tool für Ihren Computer herunter:** die **SDK Platform-Tools** von Google: <https://developer.android.com/tools/releases/platform-tools> . Entpacken Sie die ZIP-Datei, zum Beispiel nach \[Pfad einfügen]. `C:\sdk` Die
4. **Öffnen Sie die Eingabeaufforderung:** Drücken Sie die Windows-Taste und geben Sie Folgendes ein: `cmd` Drücken Sie die Eingabetaste. Wechseln Sie anschließend in den folgenden Ordner: `cd C:\sdk\platform-tools`
5. **Verbinden Sie das Telefon:** Verbinden Sie das Telefon mit einem USB-Kabel und entsperren Sie es. Es wird gefragt: **„USB-Debugging zulassen?“** – aktivieren Sie **„Von diesem Computer immer zulassen“** und tippen Sie auf **OK** .
6. **Überprüfen Sie die Verbindung:** Typ `adb devices` Ihr Gerät muss mit dem Wort angezeigt werden `device` Wenn es heißt `unauthorized` Sie haben die Frage aus Schritt 5 noch nicht bestätigt: Entsperren Sie das Telefon und schauen Sie auf den Bildschirm.
7. **Aufnahme starten:** eingeben `adb logcat -v time > miboxer.txt` Das Fenster scheint nun "zu hängen" – das ist richtig, es zeichnet auf.
8. **So verwenden Sie die App:** Öffnen Sie die MiBoxer-App, tippen Sie auf das Gateway und schalten Sie das Licht einmal aus und wieder ein.
9. **Aufnahme beenden:** Zurück am Computer drücken Sie **Strg + C.**
10. **Werte suchen:** Typ `findstr /i "localKey devId" miboxer.txt` In den gefundenen Zeilen folgt die Geräte-ID. `devId` und der lokale Schlüssel folgt `localKey` Die

> \[!WARNUNG] Der lokale Schlüssel ist wie ein Passwort. Geben Sie ihn nicht weiter und veröffentlichen Sie die Datei nicht. `miboxer.txt` Löschen Sie die Datei, sobald Sie die Werte notiert haben. Deaktivieren Sie anschließend **das USB-Debugging** in den Entwickleroptionen wieder.

### 5.2 Nur ein iPhone oder iPad verfügbar?

Apple erlaubt es keinem Programm, die Protokolle anderer Apps zu lesen. Am einfachsten ist es, sich für zehn Minuten ein Android-Gerät auszuleihen, die MiBoxer-App darauf zu installieren und sich mit **Ihrem** MiBoxer-Konto anzumelden. Das Gateway erscheint dann automatisch, und Sie können wie oben beschrieben fortfahren. Weitere Möglichkeiten (Android-Emulator auf dem Computer) werden in der ausführlichen Anleitung beschrieben; diese sind **jedoch nicht verifiziert** .

> \[!TIPP] Die **Geräte-ID** lässt sich auch ohne Protokoll ermitteln: Nach der Installation des Adapters durchsucht die Schaltfläche **„Gateway im lokalen Netzwerk suchen“** (Kapitel 7) alle Tuya-Geräte in Ihrem Heimnetzwerk und zeigt deren IDs an. Der **lokale Schlüssel** kann jedoch nicht ermittelt werden.

## 6. Schritt 3 – Adapter installieren

Der Adapter ist noch nicht in der offiziellen Adapterliste von ioBroker enthalten. Daher installieren Sie ihn direkt von GitHub. Sobald er der Liste hinzugefügt wurde, genügt eine Suche nach ihm. `miboxer` auf der Registerkarte **Adapter** und klicken Sie auf **+** (installieren).

### 6.1 Expertenmodus aktivieren

1. Öffnen Sie ioBroker Admin im Browser, normalerweise unter `http://<IP address of your ioBroker>:8081` Die
2. Klicken Sie im Menü auf der linken Seite auf **Adapter** .
3. Klicken Sie auf das **Kopfsymbol** unten links (rot markiert).

![Expertenmodus aktivieren: Kopfsymbol unten links](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-expert-en.png)

4. Es erscheint ein Hinweis zum Expertenmodus. Klicken Sie auf **OK** .

![Hinweis zum Expertenmodus](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-expert-dialog-en.png)

> \[!HINWEIS] Der Expertenmodus zeigt zusätzliche Schaltflächen an. Er gilt nur für diese Browsersitzung und ist unschädlich. Sie können ihn mit derselben Schaltfläche wieder deaktivieren.

### 6.2 Installation von GitHub

1. In der oberen Leiste erscheint nun ein **Katzensymbol** (das GitHub-Logo) mit dem Tooltip **„Von benutzerdefinierter URL installieren“** . Klicken Sie darauf.
2. Wählen Sie im Fenster die Registerkarte **„Benutzerdefiniert“** .
3. Geben Sie genau diese Adresse in das Feld **URL** ein: `https://github.com/ssbingo/ioBroker.miboxer-wl433`
4. Lassen Sie das Häkchen bei **„Instanz erstellen“, falls diese noch nicht existiert** .
5. Klicken Sie auf **Installieren** .

![Installation über benutzerdefinierte URL: Registerkarte „Benutzerdefiniert“ und Adresse](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-install-en.png)

6. Der Fortschritt wird in einem Fenster angezeigt. Warten Sie, bis die Installation abgeschlossen ist (auf einem Raspberry Pi kann dies einige Minuten dauern) und schließen Sie das Fenster.

> \[!NOTE] Die rote Warnung im Fenster ist ein allgemeiner Hinweis von ioBroker für alle Adapter, die nicht aus der offiziellen Liste stammen.

**Alternative für erfahrene Benutzer – auf der Konsole** (z. B. über SSH auf dem ioBroker-Rechner):

```bash
iobroker url https://github.com/ssbingo/ioBroker.miboxer-wl433
iobroker add miboxer-wl433
```

## 7. Schritt 4 – Instanz einrichten

Nach der Installation existiert eine **Instanz** namens `miboxer-wl433.0` – Dies ist der „laufende Adapter“ für Ihr Gateway.

1. Klicken Sie links auf **„Instanzen“** .
2. Suchen Sie die Zeile **„miboxer-wl433.0“** und klicken Sie auf das **Schraubenschlüssel-Symbol** . Die Einstellungsseite öffnet sich. Sie enthält oben zwei Registerkarten: **„Gateway“** für die Verbindung (dieses Kapitel) und **„Timer“** für die Schaltzeiten (Kapitel 11). Beginnen Sie mit der Registerkarte **„Gateway“** .

![Einstellungsseite der Instanz (Beispielwerte)](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-config-en.png)

3. Füllen Sie die Felder aus:

| Feld                               | Was Sie eingeben                                                                                                          | Beispiel               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| **Geräte-ID**                      | Die Geräte-ID aus Kapitel 5                                                                                               | `bf0123456789abcdefgh` |
| **Lokaler Schlüssel**              | Der lokale Schlüssel aus Kapitel 5 – genau 16 Zeichen, Groß- und Kleinschreibung beachten.                                | `a1B2$c3D4{e5F6g7`     |
| **IP-Adresse des Gateways**        | Die IP-Adresse des Gateways Ihres Routers. **Oder lassen Sie das Feld leer** – dann sucht der Adapter das Gateway selbst. | `192.168.1.50`         |
| **Tuya-Protokollversion**          | Halten `3.3`                                                                                                              | `3.3`                  |
| **Wiederverbindungsverzögerung**   | Nach wie vielen Sekunden versucht der Adapter nach einem Problem einen erneuten Versuch? `30` ist in Ordnung               | `30`                   |
| **Statusaktualisierungsintervall** | In regelmäßigen Abständen fragt der Adapter den Status ab. `60` ist in Ordnung                                             | `60`                   |
| **Zonensteuerung**                 | Wie die Zonen angeboten werden – siehe unten. Im Zweifelsfall **den Zonenauswahldialog** verwenden.                       | Zonenauswahl           |

4. **Wählen Sie die Zonensteuerung:** Klicken Sie auf das Auswahlfeld. Es gibt zwei Optionen:

![Auswahl der Zonensteuerung](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-zonemode-en.png)

| Auswahl                      | Was Sie erhalten                                                                                                                 | Treffen Sie diese Wahl, wenn …                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Zonenauswahl (Lichtzone)** | Eine Gruppe von Staaten `light.*` und ein Staat `light.zone` Dadurch wird die Zone ausgewählt, an die die Befehle gesendet werden. | … Sie steuern meist alle Lampen gleichzeitig oder sind sich unsicher. **Empfehlenswert.** |
| **Ein Kanal pro Zone**       | Zusätzlich zu den Ordnern `zones.zone1` Zu `zones.zone8` mit ihren eigenen Staaten pro Zone                                        | … Sie möchten einzelne Zonen direkt in Skripten oder Visualisierungen ansprechen.         |

Kapitel 10 erläutert beide Varianten anhand von Beispielen.

5. Klicken Sie unten auf **„Speichern und schließen“** . Die Instanz startet und verbindet sich mit dem Gateway.

> \[!TIPP] **IP-Adresse unbekannt?** Geben Sie die Geräte-ID und den lokalen Schlüssel ein, klicken Sie auf **„Speichern“** (nicht schließen) und anschließend **auf „Gateway im lokalen Netzwerk suchen“** . Die Suche dauert bis zu 12 Sekunden. Wird das Gateway gefunden, werden IP-Adresse und Protokollversion automatisch eingetragen. Klicken Sie anschließend erneut auf **„Speichern“ und schließen Sie** das Fenster. Die Schaltfläche funktioniert nur, solange die Instanz ausgeführt wird.

> \[!WICHTIG] Wenn Sie die **Zonensteuerung** später ändern, löscht der Adapter die Zustände der anderen Variante. Skripte, die diese Zustände verwenden, müssen dann angepasst werden.

## 8. Schritt 5 – Überprüfen Sie, ob alles funktioniert

1. **Instanzstatus:** Klicken Sie links auf **„Instanzen** “. Das Symbol am Anfang der Zeile **„miboxer-wl433.0“** zeigt den Status an – genau wie bei allen ioBroker-Adaptern:
   - **Grün:** Betrieb und Verbindung zum Gateway – alles in Ordnung;
   - **gelb:** läuft, aber (noch) nicht verbunden – einen Moment warten, ansonsten siehe Kapitel 13;
   - **Rot:** Stopp – mit dem Startknopf (Dreieck) wieder starten.
2. **Sehen Sie sich die Zustände an:** Klicken Sie links auf **„Objekte“** und öffnen Sie nacheinander die Ordner **„miboxer-wl433“ → „0“ → „light“** (klicken Sie auf das Ordnersymbol). Die Werte sollten mit den Werten der MiBoxer-App übereinstimmen.

![Staaten unter miboxer-wl433.0.light](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-objects-light-en.png)

3. **Überprüfen Sie die Verbindung:** Im Ordner „ **Info“** muss der Verbindungsstatus „ **Verbindung“** lauten. `true` Die
4. **Erster Schalttest:** Klicken Sie auf den Wert in der Zeile **Helligkeit** , geben Sie ein `50` und drücken Sie die Eingabetaste. Nach etwa **2 bis 3 Sekunden** zeigt die App auch 50 % Helligkeit an.

> \[!HINWEIS] **Warum dauert es 2 bis 3 Sekunden?** Das Gateway meldet seinen neuen Status erst etwa 2,5 Sekunden nach der letzten Änderung. Erst dann bestätigt der Adapter den Wert. Bis dahin wird der eingegebene Wert im Administratorbereich als noch nicht bestätigt angezeigt.

Sollte etwas nicht funktionieren, lesen Sie in Kapitel 13 weiter.

## 9. Bedienung der Poolbeleuchtung

### 9.1 Ändern eines Wertes

Auf der Registerkarte **„Objekte“** ändern Sie einen Wert wie folgt:

1. Klicken Sie auf den Wert des Bundeslandes in der Spalte „ **Wert“** .
2. Geben Sie den neuen Wert ein oder wählen Sie ihn aus. Schalter (wie „ **Ein“** ) werden einfach angeklickt, Schaltflächen (wie **„Beschleunigen“** ) ebenfalls.
3. Mit Enter oder **Apply** bestätigen.

In Skripten, Visualisierungen oder Sprachassistenten verwenden Sie die gleichen Zustände – nur automatisch (Kapitel 12).

### 9.2 Was möchten Sie tun?

Alle Bundesstaaten befinden sich im Ordner `miboxer-wl433.0.light`:

| Sie wollen …                                     | Zustand                  | Wert (Beispiel)                                       |
| ------------------------------------------------ | ------------------------ | ----------------------------------------------------- |
| einschalten                                      | `light.on`               | `true` (einschalten)                                  |
| ausschalten                                      | `light.on`               | `false` (ausschalten) – oder `light.brightness` Zu `0`  |
| Mach es heller oder dunkler                      | `light.brightness`       | `1` Zu `100` (Prozent)                                 |
| warmweißes Licht                                 | `light.colorTemperature` | `2700`                                                |
| neutralweißes Licht                              | `light.colorTemperature` | `4500`                                                |
| kaltes, weißes Licht                             | `light.colorTemperature` | `6500`                                                |
| eine Farbe                                       | `light.color`            | `#0000ff` (blau) – oder `light.hue` mit einem Gradwert |
| eine hellere Farbe                               | `light.saturation`       | `0` (weiß) bis `100` (stark)                           |
| ein Farbprogramm starten                         | `light.scene`            | `1` Zu `9` (M1–M9 in der App)                          |
| Farbprogramm schneller                           | `light.speedUp`          | Drücken Sie den Knopf                                 |
| Farbprogramm langsamer                           | `light.speedDown`        | Drücken Sie den Knopf                                 |
| zurück zu weißem Licht                           | `light.mode`             | `white`                                               |
| zurück zur letzten Farbe                         | `light.mode`             | `colour`                                              |
| Schaltet nach einer gewissen Zeit automatisch um | `light.countdown`        | Sekunden, z.B. `3600` für eine Stunde                  |

### 9.3 Farben

Die einfachste Methode zum Festlegen von Farben ist `light.color` im Format `#RRGGBB`, oder `light.hue` als Winkel auf dem Farbkreis:

| Farbe   | `light.hue` | `light.color` |
| ------- | ----------- | ------------- |
| Rot     | `0`         | `#ff0000`     |
| Orange  | `30`        | `#ff8000`     |
| Gelb    | `60`        | `#ffff00`     |
| Grün    | `120`       | `#00ff00`     |
| Türkis  | `180`       | `#00ffff`     |
| Blau    | `240`       | `#0000ff`     |
| Violett | `270`       | `#8000ff`     |
| Rosa    | `300`       | `#ff00ff`     |

Die **Helligkeit** wird immer separat eingestellt mit `light.brightness` Ein dunkler RGB-Wert wie z. B. `#800000` ergibt daher **bei der aktuellen Helligkeit ein kräftiges Rot** – kein dunkles Rot.

### 9.4 Was der Adapter automatisch tut

- **Automatisches Einschalten bei Bedarf:** Wenn Sie Helligkeit, Farbe, Weißton oder ein Programm einstellen, während die Lampe ausgeschaltet ist, schaltet der Adapter sie zuerst ein – genau wie die App.
- **Moduswechsel:** Bei einer bestimmten Farbtemperatur wird automatisch auf weißes Licht umgeschaltet, bei einer anderen Farbe auf farbiges Licht.
- **Schieberegler:** Wenn Sie einen Wert sehr schnell hintereinander ändern (z. B. mit einem Schieberegler), sendet der Adapter nur den letzten Wert.
- **Bestätigung:** Jeder Befehl gilt erst dann als ausgeführt, wenn das Gateway den neuen Status meldet (nach etwa 2,5 Sekunden). Trifft die Meldung nicht ein, fragt der Adapter nach und schreibt eine Warnung ins Protokoll (Kapitel 13).
- **Die App-Anpassung funktioniert wie folgt:** Änderungen in der MiBoxer-App werden auch in ioBroker angezeigt. Zusätzlich fragt der Adapter regelmäßig den Status ab ( _Statusaktualisierungsintervall_ einstellen).

### 9.5 DMX-Startadresse

Der WL-433 verfügt über einen Eingang für **DMX512** – den Standard für Lichtsteuerpulte zur Steuerung von Bühnen- und Effektbeleuchtung. Ab seiner **Startadresse** wertet das Gateway fünf DMX-Kanäle aus: Rot, Grün, Blau, Kaltweiß und Warmweiß. Dies ist nur erforderlich, wenn Sie ein DMX-Lichtsteuerpult anschließen. Die Adresse wird in der MiBoxer-App unter **„DMX einstellen** “ (DMX 1 bis 512) festgelegt. Der Adapter zeigt den Status an. `settings.dmxAddress` und kann es auch ändern:

1. Öffnen Sie auf der Registerkarte **Objekte** den Ordner **miboxer-wl433 → 0 → settings** .
2. Klicken Sie auf den Wert von **dmxAddress** und geben Sie eine Zahl ein. `1` Zu `512` und drücken Sie die Eingabetaste.
3. Das Gateway bestätigt die neue Adresse innerhalb weniger Sekunden. Falls die Bestätigung nicht eintrifft, wird eine Warnung im Protokoll (Kapitel 13) vermerkt.

Genau wie in der App gilt die Adresse für die aktuell ausgewählte Zone: mit dem _Variantenzonenwähler_ für die Zone in `light.zone`, mit _einem Kanal pro Zone_ zu allen Zonen.

> \[!HINWEIS] Ändern Sie die Adresse nur, wenn Sie eine DMX-Lichtkonsole verwenden – sie muss mit den Einstellungen der Konsole übereinstimmen. Der Hersteller gibt nicht an, ob jede Zone einen eigenen Kanalblock besitzt. Im Normalbetrieb meldet das Gateway nur den unteren Teil der Adresse (das niedrigste Byte). Daher zeigt der Adapter nach einem Neustart zunächst fälschlicherweise eine Adresse über 255 an – die Adresse ist wieder korrekt, sobald sie in der App oder am Adapter geändert wurde.

## 10. Zonen

Das Gateway kann bis zu **8 Zonen** separat (Zone 1 bis 8) oder alle zusammen („ALLE“) steuern. Die Zuordnung der Lampen zu den Zonen wurde in Kapitel 4 in der App festgelegt.

> \[!WICHTIG] Das Gateway meldet **nur einen Status für alle Lampen** – den der letzten Einstellung, unabhängig davon, an welche Zone die Daten gesendet wurden. Wenn Sie Zone 1 auf Rot und dann Zone 2 auf Blau einstellen, `light.*` Es wird „blau“ angezeigt, obwohl die Lampen in Zone 1 weiterhin rot leuchten. Dies ist eine Eigenschaft des Gateways: Auch die MiBoxer-App zeigt keinen Unterschied zwischen den Zonen an.

### 10.1 Variante „Zonenauswahl“ (Standard)

Mit dem Staat `light.zone` Sie wählen, wo die Befehle von `light.*` gehen:

| `light.zone` | Befehle gehen an |
| ------------ | ---------------- |
| `0`          | alle Zonen       |
| `1` Zu `8`    | nur diese Zone   |

**Beispiel – nur die Lampen in Zone 2 sollen blau leuchten:**

1. Satz `light.zone` Zu `2` Die
2. Satz `light.color` Zu `#0000ff` Die
3. Anschließend setzen `light.zone` zurück zu `0` so dass spätere Befehle wieder an alle Zonen gesendet werden.

> \[!TIPP]`light.zone` Die Einstellung bleibt so lange bestehen, bis Sie sie ändern – auch nach einem Neustart. Nach gezielten Befehlen an eine Zone empfiehlt es sich, die Einstellung wieder auf den Standardwert zurückzusetzen. `0` Die

### 10.2 Variante „ein Kanal pro Zone“

Hier befindet sich außerdem der Ordner `zones` mit jeweils einem Unterordner `zone1` Zu `zone8` Jedes hat die gleichen Zustände wie `light` (Ein, Helligkeit, Farbtemperatur, Farbe, Farbton, Sättigung, Modus, Szene, Geschwindigkeit erhöhen, Geschwindigkeit verringern). In dieser Variante `light.*` Sendet immer an **alle** Zonen.

**Beispiel – nur Zone 2 blau:** einstellen `zones.zone2.color` Zu `#0000ff`. Erledigt.

![Zonenkanal Zone2: Nur die bestätigten Werte werden ausgefüllt.](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-objects-zones-en.png)

> \[!HINWEIS] Ein Zonenkanal zeigt die **zuletzt an diese Zone gesendeten und vom Gateway bestätigten** Werte an. Die Felder bleiben leer, bis Sie Daten an die Zone gesendet haben. Im Bild wurden nur „Ein“ und „Helligkeit 40 %“ an Zone 2 gesendet. Ein Befehl über `light.*` (alle Zonen) gibt seinen Wert in allen acht Zonenkanälen ein.

## 11. Timer

Der Adapter kann die Poolbeleuchtung selbstständig schalten – zu festen Zeiten oder abhängig vom Sonnenstand. Sie können bis zu **50 Timer** in den Einstellungen der Instanz einrichten, ganz ohne Programmierung. Die Timer laufen in ioBroker in Ihrem Heimnetzwerk und funktionieren auch bei Internetausfall.

### 11.1 Timer des Adapters oder Timer der App?

Die MiBoxer-App verfügt ebenfalls über Timer. Beide Arten funktionieren unabhängig voneinander:

|                                            | Zeitschaltuhren des Adapters                                                                                                | Timer der MiBoxer-App         |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Wo sie gelagert und ausgeführt werden      | in ioBroker, in Ihrem Zuhause                                                                                               | in der Tuya-Cloud im Internet |
| Ohne Internet                              | arbeiten                                                                                                                    | funktionieren nicht           |
| Auslösen                                   | fester Zeitpunkt oder Sonnenereignis (z. B. Sonnenuntergang), jeweils mit einer Abweichung in Minuten                       | feste Zeit                    |
| Zufällige Verschiebung (Präsenzsimulation) | Ja                                                                                                                          | NEIN                          |
| Tage                                       | Wochentage und Saison (z. B. nur vom 1. Mai bis zum 30. September)                                                          | Wochentage                    |
| Zonen                                      | alle Zonen oder eine bestimmte Zone                                                                                         | alle Zonen                    |
| Aktionen                                   | Einschalten, Ausschalten, weißes Licht, Farbe, Farbprogramm, Helligkeit und erneutes Ausschalten nach einer bestimmten Zeit | Ein- oder Ausschalten         |

Die Informationen zu den App-Timern stammen aus einem Test der App am 22.09.2026.

> \[!HINWEIS] Der Adapter kann die Timer der App weder anzeigen noch ändern. Wenn jedoch ein App-Timer die Lampen schaltet, erkennt der Adapter das Ergebnis sofort und aktualisiert sich. `light.*` Sie können beide Arten gleichzeitig verwenden – achten Sie nur darauf, dass sie sich nicht widersprechen (z. B. App-Timer „an um 20:00 Uhr“ und Adapter-Timer „aus um 19:55 Uhr“).

### 11.2 Vorbereitung: Standort für Sonnenereignisse

Dieser Schritt ist nur erforderlich, wenn ein Timer einem Sonnenereignis (Sonnenaufgang, Sonnenuntergang, Abenddämmerung usw.) folgen soll. Der Adapter berechnet diese Zeiten anhand des Standorts Ihrer ioBroker-Installation. Normalerweise ist dieser bereits konfiguriert. So überprüfen Sie ihn:

1. Klicken Sie in ioBroker Admin unten links auf **System** . Das Fenster **Basiseinstellungen** öffnet sich.
2. Auf der Registerkarte **„System“** finden Sie rechts unter der Karte (rot markiert) die Angaben **zu Breitengrad** und **Längengrad** . Wenn die Werte ungefähr mit Ihrem Wohnort übereinstimmen, ist alles in Ordnung.
3. Andernfalls geben Sie die Werte ein. Sie finden diese beispielsweise, indem Sie Ihren Ort in einem Kartendienst suchen. Beispiel London: Breitengrad `51.51`, Längengrad `-0.13` Verwenden Sie einen **Punkt** als Dezimaltrennzeichen.
4. Klicken Sie auf **Speichern und schließen** .
5. Starten Sie die Instanz **miboxer-wl433.0** neu (klicken Sie links auf **„Instanzen** “ in der entsprechenden Zeile auf das Symbol mit dem kreisförmigen Pfeil). Erst dann übernimmt der Adapter den neuen Standort.

![Standort in den Basiseinstellungen (Karte: © OpenStreetMap-Mitwirkende)](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-system-position-en.png)

> \[!HINWEIS] Ohne Standortangabe ignoriert der Adapter Timer mit Sonnenereignis und schreibt eine Warnung ins Protokoll. Timer mit fester Zeit benötigen keinen Standort.

### 11.3 Einen Timer erstellen – Schritt für Schritt

1. Klicken Sie links auf **Instances** und in der Zeile **miboxer-wl433.0** auf das **Schraubenschlüssel-Symbol** (wie in Kapitel 7).
2. Klicken Sie oben auf den Reiter **„Timer“** .
3. Klicken Sie auf das **Pluszeichen** (+, rot markiert). Ein neuer Eintrag erscheint und ist bereits geöffnet. Er ist so voreingestellt, dass er jeden Tag um 20:00 Uhr alle Zonen aktiviert:

![Neuer Timer mit seinen Startwerten](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-timers-new-en.png)

4. Geben Sie unter **Name** einen Kurznamen ein, zum Beispiel `Pool evening` Der Name erscheint sowohl in der Kopfzeile des Eintrags als auch im Protokoll.
5. Wählen Sie den **Auslöser** : _Tageszeit_ oder Sonnenereignis (Tabelle in Abschnitt 11.4). Klicken Sie für _die Tageszeit_ auf das Uhrensymbol im Feld **„Tageszeit“** und wählen Sie die gewünschte Uhrzeit aus.
6. **Wochentage** auswählen: Klicken Sie auf das Feld, eine Liste öffnet sich. Ein Klick auf einen Tag wählt diesen aus oder hebt die Auswahl auf. Ein Klick neben der Liste schließt sie wieder.
7. **Zone** und **Aktion** festlegen. Je nach Aktion erscheinen weitere Felder: **Farbtemperatur** für _Weißlicht_ , **Farbe** für _Farbe_ , **Szene** für _Szene_ .
8. Klicken Sie unten auf **„Speichern und schließen“** . Die Instanz wird neu gestartet und der Timer wird neu geplant.
9. **Prüfen Sie:** Auf der Registerkarte **„Objekte** “ den Status `miboxer-wl433.0.timers.nextRun` zeigt an, wann der nächste Timer umgeschaltet wird (11.7).

> \[!TIPP] Erstellen Sie ähnliche Timer mit dem Kopiersymbol (11.6) – dann müssen Sie nur noch die Unterschiede ändern.

### 11.4 Die Felder im Detail

| Feld                                | Bedeutung                                                                                                                                                   | Beispiel                                                |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| **Aktiv**                           | Durch Entfernen des Häkchens wird der Timer ausgeschaltet, ohne ihn zu löschen.                                                                             | angekreuzt                                              |
| **Name**                            | Jeder beliebige Name                                                                                                                                        | `Pool evening`                                          |
| **Auslösen**                        | _Tageszeit_ oder Sonnenereignis (siehe Tabelle unten)                                                                                                       | _Sonnenuntergang_                                       |
| **Uhrzeit**                         | Nur für den Auslöser _Tageszeit_ : wenn der Timer umschaltet                                                                                                | `21:30`                                                 |
| **Offset**                          | Diese vielen Minuten vor (negative Zahl) oder nach (positive Zahl) dem Auslöser, von −720 bis 720                                                           | `-15` = 15 Minuten vor Sonnenuntergang                  |
| **Zufällige Verschiebung**          | Jedes Mal wird der Timer zufällig um bis zu 120 Minuten vor- oder zurückgestellt. Dadurch wirkt es, als wäre jemand zu Hause.                               | `10` = zwischen 10 Minuten früher und 10 Minuten später |
| **Wochentage**                      | Die Tage, an denen der Timer umschaltet                                                                                                                     | Montag bis Freitag                                      |
| **Jahreszeit von / Jahreszeit bis** | Nur in dieser Jahreszeit, in diesem Format `DD.MM.` Eine Saison über das neue Jahr hinweg ist möglich (`01.11.` Zu `28.02.` Beide Felder leer = ganzes Jahr   | `01.05.` Zu `30.09.`                                     |
| **Zone**                            | _Alle Zonen_ oder eine Zone von 1 bis 8                                                                                                                     | _Alle Zonen_                                            |
| **Aktion**                          | Was passiert (siehe Tabelle unten)                                                                                                                          | _Weißes Licht_                                          |
| **Farbtemperatur**                  | Nur für _weißes Licht_ : 2700 K (warm) bis 6500 K (kalt)                                                                                                    | `3000`                                                  |
| **Farbe**                           | Nur für _Farbe_ : Farbe aus der Farbauswahl                                                                                                                 | Blau                                                    |
| **Szene**                           | Nur für _Szene_ : Farbprogramm M1 bis M9                                                                                                                    | M3                                                      |
| **Helligkeit**                      | 1 bis 100 %. Leer lassen = Helligkeit bleibt unverändert. Nicht zum _Ausschalten._                                                                          | `60`                                                    |
| **Nach dem Ausschalten**            | Nach dieser Anzahl Minuten schaltet der Timer die Lampen seiner Zone wieder aus (0 = nicht ausschalten, maximal 1440 = 24 Stunden). Nicht zum _Ausschalten_ | `120`                                                   |

**Sonnenereignisse:**

| Auslösen                 | Wann                                                                                            |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| _Dämmerung_              | Es wird hell: Beginn der bürgerlichen Morgendämmerung (Sonne 6° unter dem Horizont)             |
| _Sonnenaufgang_          | Die Sonne erscheint am Horizont                                                                 |
| _Goldene Stunde (Abend)_ | Beginn der „goldenen Stunde“, etwa eine Stunde vor Sonnenuntergang (Sonne 6° über dem Horizont) |
| _Sonnenuntergang_        | Die Sonne verschwindet hinter dem Horizont                                                      |
| _Dämmerung_              | Es ist fast dunkel: Ende der bürgerlichen Abenddämmerung (Sonne 6° unter dem Horizont).         |
| _Nacht_                  | Es ist vollkommen dunkel: Beginn der astronomischen Nacht (Sonne 18° unter dem Horizont).       |

Beispiel Berlin am 21. Juni: Morgendämmerung 03:52 Uhr, Sonnenaufgang 04:43 Uhr, goldene Stunde 20:37 Uhr, Sonnenuntergang 21:33 Uhr, Abenddämmerung 22:23 Uhr. Am 21. Dezember: Sonnenaufgang 08:14 Uhr, Sonnenuntergang 15:53 Uhr.

> \[!WICHTIG] In Deutschland (und weiter nördlich) wird es von Mitte Mai bis Ende Juli nie vollständig dunkel – die _Nachtfunktion_ findet in dieser Zeit nicht statt, und ein Timer mit diesem Auslöser wird an diesen Tagen nicht aktiviert. Verwenden Sie im Sommer besser _die Dämmerungsfunktion_ mit einem Zeitversatz.

**Die Aktionen:**

| Aktion           | Was geschieht                                                                         |
| ---------------- | ------------------------------------------------------------------------------------- |
| _Einschalten_    | Schaltet die Lampen mit den zuletzt eingestellten Werten ein.                         |
| _Ausschalten_    | Schaltet die Lampen aus                                                               |
| _Weißes Licht_   | Weißes Licht mit der gewählten Farbtemperatur                                         |
| _Farbe_          | Die gewählte Farbe                                                                    |
| _Szene_          | Startet das gewählte Farbprogramm M1 bis M9                                           |
| _Helligkeit nur_ | Ändert nur die Helligkeit – dazu muss das Feld **„Helligkeit“** einen Wert enthalten. |

Wenn die Lampen ausgeschaltet sind, schalten die Modi _„Weißes Licht“_ , _„Farbe“_ , _„Szene“_ und _„Helligkeit“_ sie zuerst ein – genau wie in der App.

### 11.5 Beispiele

**Beispiel 1 – warmweißes Licht jeden Abend im Sommer**

| Feld       | Wert                                                 |
| ---------- | ---------------------------------------------------- |
| Name       | `Pool evening`                                       |
| Auslösen   | _Sonnenuntergang_ , Versatz `-15`                     |
| Wochentage | alle                                                 |
| Jahreszeit | `01.05.` Zu `30.09.`                                  |
| Zone       | _Alle Zonen_                                         |
| Aktion     | _Weißes Licht_ , Farbtemperatur `3000` Helligkeit `60` |

Ergebnis: Von Mai bis September schaltet der Adapter jeden Abend 15 Minuten vor Sonnenuntergang warmweißes Licht mit 60 % Helligkeit ein.

![Beispiel „Poolabend“](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-timers-en.png)

**Beispiel 2 – Farbprogramm für zwei Stunden am Wochenende**

| Feld       | Wert                                              |
| ---------- | ------------------------------------------------- |
| Name       | `Party Friday`                                    |
| Auslösen   | _Uhrzeit_ `21:30`                                  |
| Wochentage | Freitag, Samstag                                  |
| Zone       | _Zone 2_                                          |
| Aktion     | _Szene_ M3, nach dem Ausschalten ausschalten `120` |

Ergebnis: Freitags und samstags um 21:30 Uhr startet das Farbprogramm M3 in Zone 2. Um 23:30 Uhr schaltet der Adapter Zone 2 wieder ab.

![Beispiel „Party-Freitag“](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-timers-scene-en.png)

**Beispiel 3 – Ausschalten in der Nacht, als ob per Hand**

| Feld       | Wert                                        |
| ---------- | ------------------------------------------- |
| Name       | `Off at night`                              |
| Auslösen   | _Uhrzeit_ `23:30` zufällige Verschiebung `10` |
| Wochentage | alle                                        |
| Zone       | _Alle Zonen_                                |
| Aktion     | _Ausschalten_                               |

Ergebnis: Jeden Abend gehen alle Lampen zwischen 23:20 Uhr und 23:40 Uhr aus – jeden Tag zu einer etwas anderen Zeit.

> \[!TIPP] Beispiel 3 bietet ebenfalls eine gute Sicherheitsvorkehrung: Die automatische Abschaltung nach einem bestimmten Zeitpunkt (Beispiel 2) geht verloren, wenn die Instanz zwischenzeitlich neu gestartet wird (11.8). Ein eigener Timer schaltet das System weiterhin ab.

### 11.6 Ändern, Kopieren, Verschieben und Löschen von Timern

- **Ändern:** Klicken Sie auf die Überschrift eines Eintrags (den Namen), um ihn zu öffnen oder zu schließen und die Felder zu ändern.
- In der grauen Leiste am unteren Rand jedes geöffneten Eintrags finden Sie diese Symbole:

| Symbol                  | Wirkung                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Pfeil nach oben / unten | Verschieben Sie den Eintrag in der Liste nach oben oder unten. Die Reihenfolge bestimmt lediglich die Nummer des Timers im Protokoll. |
| Abfalleimer             | Eintrag löschen                                                                                                                       |
| Zwei Blätter            | Eintrag kopieren – praktisch für ähnliche Timer                                                                                       |

- Klicken Sie **nach jeder Änderung** auf **„Speichern und schließen“** . Nur dann werden die Änderungen übernommen. Wenn Sie **„Schließen** “ ohne Speichern wählen, werden alle Änderungen verworfen.
- Auf der Einstellungsseite sind maximal **50 Timer** zulässig.
- Über der Liste befinden sich Symbole zum Speichern aller Timer in einer Datei ( **Konfigurationsabschnitt „Exportieren** “) und zum Laden aus einer Datei ( **Konfigurationsabschnitt „Importieren und Ersetzen“** bzw. **„Konfiguration importieren und hinzufügen** “). So können Sie Ihre Timer sichern oder auf eine andere Instanz übertragen. **(ungeprüft)**

### 11.7 Die Timer im Auge behalten und anhalten

Auf der Registerkarte **„Objekte“** finden Sie diese Zustände unter **miboxer-wl433 → 0 → Timer** :

![Zustände unter Einstellungen und Timer (hier noch ohne eingerichtete Timer)](../../../../en/adapterref/iobroker.miboxer-wl433/doc/img/admin-objects-timers-en.png)

| Zustand           | Bedeutung                                                                                                                                                                                                                    |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `timers.active`   | Schalter für **alle** Timer: `false` unterbricht sie (zum Beispiel während der Feiertage oder im Winter). `true` Die Läufe werden erneut ausgeführt. Läufe, die in die Pause fallen, werden übersprungen und nicht nachgeholt. |
| `timers.nextRun`  | Der nächste Durchlauf mit seinem Namen, zum Beispiel `Tue 2026-09-22 19:05:00 · Pool evening` Während der Pause beginnt es mit `paused`                                                                                       |
| `timers.lastRun`  | Der letzte Durchlauf mit Namen und Aktion                                                                                                                                                                                    |
| `timers.overview` | Liste aller Timer mit Zeitplan, Aktion, nächster Ausführung und – falls ein Timer ignoriert wird – dem Grund (`error`)                                                                                                      |

> \[!TIPP]`timers.active` kann auch über Skripte, Visualisierungen oder Sprachassistenten umgeschaltet werden – siehe das Beispiel in Kapitel 12.1.

### 11.8 Gut zu wissen

- **Zeit:** Es gilt die Zeit des ioBroker-Computers. Die Sommerzeit wird berücksichtigt.
- **Gateway nicht verbunden:** Wenn das Gateway zum Zeitpunkt des Ablaufs eines Timers nicht erreichbar ist, wird dieser Durchlauf übersprungen. Der Adapter schreibt eine Warnung ins Protokoll und führt den Durchlauf nicht nach.
- **Neustart:** Jedes Mal, wenn die Einstellungen gespeichert werden, wird die Instanz neu gestartet und alle Timer werden neu geplant. Eine laufende „Ausschalten nach“-Einstellung geht verloren.
- **Wochentage und Offset:** Wochentage und Jahreszeit beziehen sich auf den Tag des Auslösevorgangs. Ein Timer mit der Einstellung „Tageszeit 00:30, Offset −60, nur Samstag“ schaltet sich daher am Freitag um 23:30 Uhr ein.
- **Zonen:** Mit dem _Variantenzonenwähler_ senden Timer an ihre eigene Zone, ohne die Zone zu ändern. `light.zone` Mit _einem Kanal pro Zone_ aktualisieren sie den Kanal ihrer Zone (`zones.zone1` Zu `zones.zone8`).
- **Bestätigung:** Wie jeder andere Befehl wird auch jeder Timer-Befehl vom Gateway bestätigt (Kapitel 9.4).

### 11.9 Wenn ein Timer nicht schaltet

Gehen Sie diese Punkte der Reihe nach durch:

1. Ist das Häkchen bei „Timer“ **gesetzt** und haben Sie auf **„Speichern und schließen“** geklickt?
2. Ist `timers.active` eingestellt auf `true` ?
3. Ist der Timer aufgeführt in `timers.overview` mit einem `error` Dann wird im Eintrag der Grund genannt:

| Grund                                              | Bedeutung                                                             | Abhilfe                                                                    |
| -------------------------------------------------- | --------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `no valid time set`                                | Keine Zeitangabe                                                      | Wähle einen Zeitpunkt                                                      |
| `no weekday selected`                              | Kein Wochentag ausgewählt                                             | Wählen Sie mindestens einen Tag aus                                        |
| `season needs "from" and "to" as DD.MM.`           | Nur eines der Saisonfelder ist ausgefüllt oder das Format ist falsch. | Füllen Sie beide Felder im folgenden Format aus: `DD.MM.` oder beide leeren |
| `action white needs a colour temperature`          | _Weißes Licht_ ohne Farbtemperatur                                    | Geben Sie eine Farbtemperatur ein.                                         |
| `action colour needs a colour like #0000ff`        | _Farbe_ ohne gültige Farbe                                            | Wähle eine Farbe                                                           |
| `action scene needs a scene 1 to 9`                | _Szene_ ohne Szene                                                    | Wähle eine Szene                                                           |
| `action brightness needs a brightness`             | _Helligkeit nur_ ohne Helligkeit                                      | Geben Sie eine Helligkeit ein                                              |
| `uses the sun event "…", but no position is set …` | Der Ort für das Sonnenereignis fehlt.                                 | Standort festlegen (11.2)                                                  |

4. Läuft der Timer überhaupt noch einmal? Wenn ja `nextRun` Ist `null` Wochentage, Jahreszeit und Auslöser passen nie zusammen (zum Beispiel nur _nachts_ im Juni).
5. War das Gateway zum geplanten Zeitpunkt verbunden? Dann zeigt das Protokoll Folgendes an: `[timer] … could not switch the lights …` Die
6. Stellen Sie den Protokollierungsgrad auf ein `debug` (Kapitel 13.1). Der Adapter schreibt dann mit dem Tag `[timer]` für jeden Timer, wann er das nächste Mal läuft und warum.

## 12. Beispiele für Automatisierung

> \[!TIPP] Für das Umschalten der Zeiten benötigen Sie kein Skript: Die Timer aus Kapitel 11 erledigen das einfacher. Skripte sind sinnvoll, wenn die Beleuchtung auf andere Ereignisse reagieren soll – beispielsweise auf einen Bewegungsmelder oder die Poolabdeckung.

### 12.1 Mit Skripten (JavaScript-Adapter)

Installieren Sie dazu den Adapter **JavaScript/Blockly** (Registerkarte **„Adapter“** , Suche). `javascript` Erstellen Sie unter **„Skripte“** eine neue JavaScript-Datei und fügen Sie Folgendes ein:

```javascript
// At sunset: switch the pool lights on in blue at 60 % brightness
schedule({ astro: "sunset" }, async () => {
    await setStateAsync("miboxer-wl433.0.light.color", "#0000ff");
    await setStateAsync("miboxer-wl433.0.light.brightness", 60);
});

// Switch off at 11 pm
schedule("0 23 * * *", async () => {
    await setStateAsync("miboxer-wl433.0.light.on", false);
});
```

**Nur eine Zone schalten – Variante „Zonenauswahl“:**

```javascript
// Zone 2 to colour programme M3, then address all zones again
await setStateAsync("miboxer-wl433.0.light.zone", 2);
await setStateAsync("miboxer-wl433.0.light.scene", 3);
await setStateAsync("miboxer-wl433.0.light.zone", 0);
```

**Schalten Sie nur eine Zone – Variante „ein Kanal pro Zone“:**

```javascript
await setStateAsync("miboxer-wl433.0.zones.zone2.scene", 3);
```

**Alle Timer werden angehalten, solange die Poolabdeckung geschlossen ist** (passen Sie den Zustand der Abdeckung an Ihre Installation an):

```javascript
on({ id: "0_userdata.0.poolCoverClosed", change: "ne" }, obj => {
    setState("miboxer-wl433.0.timers.active", !obj.state.val);
});
```

### 12.2 Mit Blockly (ohne Programmierung)

Blockly ist Teil des **JavaScript/Blockly-** Adapters. Man setzt Bausteine zusammen: **(ungeprüft)**

1. Erstelle ein neues **Blockly-** Skript unter **Skripte** .
2. Wählen Sie einen Auslöser aus der Gruppe **Timeouts / Zeitplan** , zum Beispiel **Astro** bei _Sonnenuntergang_ .
3. Ziehen Sie das **Blocksteuerelement** aus der Gruppe „ **System“** und wählen Sie die Objekt-ID aus. `miboxer-wl433.0.light.color` und eintreten `#0000ff` als Wert.
4. Speichern und starten Sie das Skript.

### 12.3 Visualisierung und Sprachassistenten

Die Zustände verfügen über die in ioBroker üblichen „Rollen“ (z. B. _Lichtschalter_ , _Dimmer_ , _RGB-Farbe_ , _Farbtemperatur_ ). Visualisierungen und Adapter für Sprachassistenten erkennen die Poolbeleuchtung daher in der Regel automatisch als Lampe. **(unbestätigt)**

## 13. Fehlerbehebung

### 13.1 Aktivieren des detaillierten Protokolls

Zur Fehlerbehebung kann der Adapter jeden Schritt in das Protokoll schreiben:

1. Öffnen Sie die Einstellungen der Instanz (Kapitel 7, Schraubenschlüssel).
2. Ganz oben, neben dem Namen, sehen Sie die **Protokollierungsstufe** (zum Beispiel). `info` Klicken Sie auf den **Stift** daneben und wählen Sie aus `debug` Die
3. Den Bleistift finden Sie auch im Bild in Kapitel 7 oben rechts in _Version 0.2.0_ .

Das Protokoll wird links unter **„Protokolle“** angezeigt. `miboxer` Geben Sie im Filterfeld oben ein, dass nur die Nachrichten dieses Adapters angezeigt werden sollen. Jede Nachricht beginnt mit einem Tag in eckigen Klammern, zum Beispiel `[conn]` für die Verbindung oder `[cmd]` für Befehle.

> \[!TIPP] Stellen Sie den Pegel wieder auf `info` nach der Fehlerbehebung. Der Pegel `debug` erzeugt eine Menge Zeilen.

### 13.2 Nachrichten und was Sie tun können

| Meldung im Protokoll (Anfang)                                                       | Bedeutung                                                                                                 | Was Sie tun können                                                                                                                                                                                               |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[cfg] Adapter is not configured: please enter the device ID and the local key …`   | Geräte-ID oder lokaler Schlüssel fehlen                                                                   | Kapitel 7: Füllen Sie beide Felder aus                                                                                                                                                                           |
| `[cfg] The local key must have exactly 16 characters …`                             | Der lokale Schlüssel ist zu kurz oder zu lang                                                             | Kopieren Sie den Schlüssel exakt (16 Zeichen, keine Leerzeichen).                                                                                                                                                |
| `[conn] Cannot keep a connection to the WL-433 gateway …`                           | Das Gateway lässt den Adapter nicht durch.                                                                | Prüfen Sie IP-Adresse, lokalen Schlüssel und Protokollversion; schließen Sie die MiBoxer-App auf allen Telefonen; deaktivieren Sie andere Tuya-Integrationen (ioBroker.tuya, Home Assistant) für dieses Gateway. |
| `[rx] Gateway sent data that could not be decoded …`                                | Der lokale Schlüssel ist falsch oder veraltet (Gateway erneut gekoppelt).                                 | Wiederholen Sie Kapitel 5 und geben Sie den neuen lokalen Schlüssel ein.                                                                                                                                         |
| `[disc] Gateway … did not announce itself in the local network …`                   | Die automatische Suche hat das Gateway nicht gefunden.                                                    | Lesen Sie die IP-Adresse vom Router ab und geben Sie sie ein; Gateway und ioBroker müssen sich im selben Netzwerk befinden.                                                                                      |
| `[cmd] #12 light.brightness: the gateway did not confirm …`                         | Nach einem Befehl meldete das Gateway keinen übereinstimmenden Zustand.                                   | Ist das Gateway eingeschaltet und mit dem WLAN verbunden? Prüfen Sie in der App, ob es erreichbar ist. Falls das Problem häufig auftritt: Melden Sie es (13.4).                                                  |
| `[poll] … Status query not answered …`                                              | Das Gateway beantwortet die Statusabfrage nicht.                                                          | Prüfen Sie, ob es sich tatsächlich um einen WL-433 handelt; melden Sie ein Problem (13.4).                                                                                                                       |
| `[cmd] … not executed: a colour like "#ff8800" is expected`                         | Der eingegebene Wert hat das falsche Format.                                                              | Geben Sie die Farbe im folgenden Format ein: `#RRGGBB`                                                                                                                                                           |
| `[cmd] … not executed: gateway is not connected`                                    | Der Befehl kam, obwohl keine Verbindung bestand.                                                          | Warten Sie, bis `info.connection` Ist `true` Wiederholen Sie den Befehl erneut.                                                                                                                                    |
| `[dp101] Status frame … has an unknown mode …`                                      | Das Gateway meldet einen unbekannten Zustand                                                              | Problem melden (13.4)                                                                                                                                                                                            |
| `[cfg] light.mode is created again without the mode "music" …`                      | Einmalige Änderung beim Update von Version 0.0.1                                                          | Nichts – die benutzerdefinierten Einstellungen dieses Zustands (z. B. Verlauf) können bei Bedarf erneut festgelegt werden.                                                                                       |
| `[cfg] Zone mode "…": removed …`                                                    | Nach der Änderung der Zonensteuerung wurden die Zustände der anderen Variante gelöscht.                   | Nichts – Skripte bei Bedarf anpassen                                                                                                                                                                             |
| `[timer] Timer 3 "…" is ignored: …`                                                 | Der Timer ist unvollständig eingerichtet; der Grund folgt nach dem Doppelpunkt.                           | Korrigieren Sie den Timer auf der Registerkarte **Timer** (11.9).                                                                                                                                                |
| `[timer] Timer … uses the sun event "…", but no position is set …`                  | Der Ort für Sonnenereignisse fehlt.                                                                       | Standort festlegen und Instanz neu starten (11.2).                                                                                                                                                               |
| `[timer] Timer … has no run within the next year …`                                 | Wochentage, Jahreszeit und Auslöser passen nie zusammen                                                   | Wochentage, Jahreszeit und Auslöser prüfen (11.9)                                                                                                                                                                |
| `[timer] #… Timer … could not switch the lights: gateway is not connected`          | Das Gateway war zum Zeitpunkt des Ablaufs des Timers nicht verbunden; dieser Durchlauf wird übersprungen. | Überprüfen Sie die Verbindung (Kapitel 8)                                                                                                                                                                        |
| `[timer] … timers configured, only the first 50 are used …`                         | Es werden mehr als 50 Timer gespeichert (zum Beispiel nach einem Import).                                 | Überflüssige Timer löschen                                                                                                                                                                                       |
| `[cmd] #… settings.dmxAddress: the gateway did not confirm the DMX start address …` | Das Gateway hat die neue DMX-Startadresse nicht bestätigt.                                                | Überprüfen Sie die Verbindung und schreiben Sie den Wert erneut (9.5).                                                                                                                                           |

### 13.3 Häufig gestellte Fragen

**Alle Zonen zeigen dieselbe Farbe an, obwohl die Lampen unterschiedlich leuchten.** Das ist korrekt: Das Gateway meldet nur einen Zustand für alle Lampen (Kapitel 10).

**Ein Wert springt nach einer Änderung kurzzeitig zurück oder wird erst nach 2 bis 3 Sekunden übernommen.** Das Gateway meldet seinen Status etwa 2,5 Sekunden nach der letzten Änderung. Erst dann übernimmt der Adapter den Wert endgültig.

**Nach erneutem Koppeln des Gateways in der App funktioniert nichts mehr.** Der lokale Schlüssel hat sich geändert. Lesen Sie ihn erneut (Kapitel 5) und geben Sie ihn ein (Kapitel 7).

**Die IP-Adresse des Gateways hat sich geändert.** Lassen Sie das Feld **„IP-Adresse des Gateways“** leer – der Adapter sucht dann selbst nach dem Gateway. Noch besser: Richten Sie eine DHCP-Reservierung im Router ein (Kapitel 3).

**Die Geschwindigkeit des Farbprogramms wird nirgends angezeigt.** Das Gateway meldet sie nicht. `speedUp` Und `speedDown` Funktioniert immer noch.

**Der Adapter meldet Erfolg, aber die Lampe reagiert nicht.** Der Adapter erkennt nur das Gateway, nicht die Lampen. Prüfen Sie, ob die Lampe einer Zone zugeordnet ist und ob sie in der App reagiert. Unterwasserlampen haben eine geringere Funkreichweite.

**Ich habe Timer in der MiBoxer-App erstellt. Warum erkennt der Adapter sie nicht?** Die Timer der App werden in der Tuya-Cloud gespeichert, nicht im Gateway. Der Adapter kann sie nicht lesen, erkennt aber, wenn sie umgeschaltet werden (Kapitel 11.1).

**Ein Timer hat nicht umgeschaltet.** Gehen Sie die Liste in Kapitel 11.9 durch.

**Mein Timer schaltet jeden Tag zu einer anderen Zeit.** Das ist korrekt, wenn er einem Sonnenereignis folgt – das sich im Laufe des Jahres verschiebt – oder wenn eine zufällige Verschiebung eingestellt ist.

**Wie kann ich alle Timer pausieren, beispielsweise während der Feiertage?** `timers.active` Zu `false`. Mit `true` Sie laufen wieder (Kapitel 11.7).

### 13.4 Meldung eines Problems

Eröffnen Sie ein „Issue“ auf GitHub: <https://github.com/ssbingo/ioBroker.miboxer-wl433/issues> . Hilfreich sind:

1. die Adapterversion (wird oben in den Instanzeinstellungen angezeigt, z. B. _v0.2.0_ );
2. ein Protokoll auf **Debug-** Ebene – vom Beginn der Instanz bis zum Fehler (13.1);
3. der Inhalt des Staates `dp101.history` (Klicken Sie darauf auf der Registerkarte „Objekte“ unter `miboxer-wl433.0.dp101` und kopieren Sie es);
4. Eine kurze Beschreibung dessen, was Sie getan haben und was passiert ist.

> \[!HINWEIS] Der Adapter schreibt den lokalen Schlüssel **niemals** in das Protokoll – das Protokoll zeigt lediglich dessen Länge an. Sie können das Protokoll daher bedenkenlos anhängen. Hängen Sie jedoch **keine** Aufzeichnungen der MiBoxer-App (Kapitel 5) an, da diese den Schlüssel enthalten.

## 14. Für Neugierige: Wie es im Detail funktioniert

Dieses Kapitel richtet sich an alle, die verstehen oder nachbauen möchten, wie der Adapter mit dem Gateway kommuniziert. Für den Betrieb ist es nicht erforderlich.

### 14.1 Die Verbindung

Der WL-433 enthält ein WLAN-Modul von Tuya. Der Adapter verbindet sich über das **Tuya LAN-Protokoll 3.3** (TCP-Port 6668, verschlüsselt mit dem lokalen Schlüssel) mit dem Gateway. Die eigentlichen Licht-, Zonen- und Szenenbefehle befinden sich im herstellerspezifischen **Datenpunkt 101** : kurze Nachrichten („Frames“) von 12 Byte. Das letzte Byte ist eine Prüfsumme – die Summe der ersten 11 Byte.

### 14.2 Die Befehle

Ein Befehl an das Gateway sieht folgendermaßen aus (Werte in hexadezimaler Notation):

```text
41 00 00 0B  cc  vv  vv vv vv  zz  80  ss
             │   │             │       └─ checksum
             │   │             └─ zone: 00 = all, 01–08 = zone 1–8
             │   └─ value
             └─ command
```

| Befehl `cc` | Bedeutung                   | Wert `vv`                                                                                                                                                                                                                                |
| ---------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `01`       | Farbton (wechselt zu Farbe) | 0–255 für den gesamten Farbkreis, in den Bytes 5 bis 8                                                                                                                                                                                   |
| `02`       | Helligkeit                  | 1–100 %                                                                                                                                                                                                                                  |
| `03`       | Farbtemperatur              | 0–38 (2700 K + 100 K pro Schritt)                                                                                                                                                                                                        |
| `04`       | Sättigung                   | 0–100 %                                                                                                                                                                                                                                  |
| `05`       | Farbprogramm                | 1–9 (M1–M9)                                                                                                                                                                                                                              |
| `06`       | Schlüssel                   | `01` An, `02` aus, `03` langsamer (S-), `04` schneller (S+), `06` weißes Licht. `05` Schaltet sich auch aus (ein zweites Mal bleiben die Lampen aus); was diese Taste anders macht als `02` ist noch unbekannt – der Adapter verwendet es nicht |

Das Gateway beantwortet die Anfrage `43 00 00 80 00 00 00 00 00 80 80 C3` mit seinem Bundesstaat:

```text
42|44 00 00 00  mm  hh  tt  bb  ss  0B  dd  xx
                │   │   │   │   │       └─ DMX start address (low byte)
                │   │   │   │   └─ saturation (0 in white mode)
                │   │   │   └─ brightness
                │   │   └─ colour temperature step
                │   └─ hue
                └─ mode: 00 off, 01 colour, 02 white, 03–0B programme M1–M9
```

`42` meldet eine Änderung (etwa 2,5 Sekunden nach der letzten Änderung). `44` ist die Antwort auf die Anfrage.

Die DMX-Startadresse (Kapitel 9.5) hat einen eigenen Befehl:

```text
49 00 00 0B 02  aa aa  00 00  zz  80  ss
                │             │       └─ checksum
                │             └─ zone: 00 = all, 01–08 = zone 1–8
                └─ DMX start address 1–512 (high byte, low byte)
```

Das Gateway antwortet mit `49 00 00 0B 02 01 tt bb ss aa aa xx`: `01` = akzeptiert, gefolgt von Farbtemperaturschritt, Helligkeit, Sättigung und der Adresse.

### 14.3 Die Timer der MiBoxer-App

Die App speichert ihre Timer über die Tuya-Cloud (Schnittstelle) `tuya.m.timer.group.add`, Kategorie `mi-light-timer` Ein Timer besteht aus einer Zeitangabe, den Wochentagen (`loops`, Zum Beispiel `0111000` = Montag bis Mittwoch, beginnend mit Sonntag) und ein Befehl wie `{"dps":{"20":true}}` Es schreibt also den Standarddatenpunkt 20 (Ein/Aus) ohne Zone und ohne Datenpunkt 101. Zum geplanten Zeitpunkt sendet die Cloud den Befehl an das Gateway; der Adapter empfängt dann Datenpunkt 20 und etwa 2,5 Sekunden später den neuen Status. Diese Timer können nicht lokal ausgelesen werden.

### 14.4 Das Protokoll selbst reproduzieren

Das Format wurde am 22.09.2026 folgendermaßen dekodiert – Sie können es mit der gleichen Methode überprüfen oder für eine neuere Gateway-Firmware erweitern:

1. **Lesen Sie die Anweisungen der App:** Verbinden Sie ein Android-Gerät wie in Kapitel 5.1 beschrieben mit dem Computer und starten Sie die App. `adb logcat -v time > commands.txt` Die MiBoxer-App schreibt jeden Befehl als Zeile. `ayxsendData =<hex values>` zum Protokoll.
2. **Genau eine Aktion pro Schritt:** Führen Sie genau **eine** Aktion in der App aus (z. B. „Helligkeit auf 50 % stellen“), notieren Sie sich die Zeit und warten Sie etwa 10 Sekunden, bis Sie die nächste Aktion ausführen.
3. **Die Befehle finden:** `findstr "ayxsendData" commands.txt` (Windows) oder `grep ayxsendData commands.txt` (Linux, macOS) listet alle gesendeten Befehle auf.
4. **Vergleichen Sie die Bundesstaaten:** der Staat `dp101.history` Der Adapter zeigt die entsprechenden Statusberichte des Gateways mit ihrer jeweiligen Zeitangabe an.
5. **Schicken Sie sich selbst ein:** in `dp101.hex` Sie können 11 Bytes eingeben – der Adapter addiert die Prüfsumme und sendet den Frame. Beispiel: `43 00 00 80 00 00 00 00 00 80 80` fragt den Staat.

> \[!WARNUNG] Die Datei `commands.txt` Enthält auch den lokalen Schlüssel. Veröffentlichen Sie ihn nicht – veröffentlichen Sie nur den lokalen Schlüssel. `ayxsendData` Zeilen, die Sie ausgewählt haben.

Die vollständige Herleitung mit allen Belegen findet sich in der Protokollanalyse (Deutsch), Kapitel 3.1.8 und 3.1.9: [Miboxer\_WL-433\_PW01\_Protokollanalyse\_lokale\_steuerung.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md) .

## 15. Glossar

| Begriff                                         | Erläuterung                                                                                                                                                      |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Adapter**                                     | Ein Zusatzprogramm für ioBroker, das ein bestimmtes Gerät oder einen bestimmten Dienst verbindet.                                                                |
| **Beispiel**                                    | Ein laufender Adapter mit eigenen Einstellungen, z. B. `miboxer-wl433.0`                                                                                          |
| **Zustand**                                     | Ein einzelner Wert in ioBroker, z. B. `light.brightness` Auf der Registerkarte **„Objekte“** sichtbar.                                                            |
| **Bestätigt (ack)**                             | Der Wert wurde vom Gerät gemeldet oder bestätigt – er wurde nicht nur eingegeben.                                                                                |
| **Tor**                                         | Das WL-433-Gerät dient als Vermittler zwischen WLAN und Funk.                                                                                                    |
| **Zone**                                        | Eine Gruppe von Lampen, die gemeinsam geschaltet werden (1 bis 8)                                                                                                |
| **Szenen-/Farbprogramm**                        | Die Programme M1–M9 der App mit wechselnden Farben                                                                                                               |
| **Geräte-ID**                                   | Die eindeutige Kennung des Gateways bei Tuya                                                                                                                     |
| **Lokaler Schlüssel**                           | Der geheime 16-stellige Schlüssel für die verschlüsselte Verbindung im Heimnetzwerk                                                                              |
| **Tuya**                                        | Hersteller des WLAN-Moduls im Gateway und der zugehörigen Cloud                                                                                                  |
| **LoRa**                                        | Die Funktechnologie, die das Gateway zur Anbindung der Lampen verwendet (433 MHz).                                                                               |
| **Protokoll**                                   | Ein Tagebuch, in dem ein Programm aufschreibt, was es tut                                                                                                        |
| **adb**                                         | Ein Tool von Google, das einem Computer den Zugriff auf ein Android-Gerät ermöglicht.                                                                            |
| **DHCP-Reservierung**                           | Eine Router-Einstellung, die einem Gerät immer dieselbe IP-Adresse zuweist.                                                                                      |
| **Timer**                                       | Ein Schaltzeitpunkt: Die Lampen werden zu einem bestimmten Zeitpunkt eingeschaltet.                                                                              |
| **Sonnenereignis**                              | Ein Zeitpunkt, der von der Position der Sonne abhängt, zum Beispiel Sonnenuntergang. Er verschiebt sich im Laufe des Jahres.                                     |
| **Dämmerung (Morgendämmerung, Abenddämmerung)** | Die Zeit zwischen Tag und Nacht, wenn es noch (Abend) oder bereits (Morgen) etwas hell ist.                                                                      |
| **Jahreszeit**                                  | Ein Zeitraum des Jahres, zum Beispiel vom 1. Mai bis zum 30. September                                                                                           |
| **Präsenzsimulation**                           | Lichter, die jeden Tag zu leicht unterschiedlichen Zeiten angehen, sodass das Haus bewohnt aussieht.                                                             |
| **DMX**                                         | Ein Standard zur Steuerung von Bühnen- und Effektbeleuchtung per Kabel. Jedes Gerät liest eine feste Anzahl von Kanälen von seiner Startadresse (1 bis 512) aus. |
| **JSON**                                        | Ein Textformat für strukturierte Daten, zum Beispiel in `timers.overview`                                                                                         |

## 16. Rechtliche Hinweise und Kontakt

Dies ist ein **inoffizielles Community-Projekt** . Es steht in keiner Verbindung zu Shenzhen Futlight Optoelectronics Co., Ltd. (MiBoxer / Mi-Light) oder Tuya. „MiBoxer“, „Mi-Light“ und „Tuya“ sind Marken ihrer jeweiligen Inhaber und werden hier lediglich zur Beschreibung der Kompatibilität verwendet. Die Nutzung erfolgt auf eigene Gefahr.

- Quellcode und Fragen: <https://github.com/ssbingo/ioBroker.miboxer-wl433>
- Lizenz: MIT – Copyright (c) 2026 ssbingo