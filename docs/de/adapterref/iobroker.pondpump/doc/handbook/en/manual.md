---
title: ioBroker.pondpump - Benutzerhandbuch
chapters: {"pages":{"en/adapterref/iobroker.pondpump/README.md":{"title":{"en":"ioBroker.pondpump"},"content":"en/adapterref/iobroker.pondpump/README.md"},"en/adapterref/iobroker.pondpump/doc/handbook/en/manual.md":{"title":{"en":"ioBroker.pondpump — User Manual"},"content":"en/adapterref/iobroker.pondpump/doc/handbook/en/manual.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.pondpump/doc/handbook/en/manual.md
hash: tff6vs4tH4VwRxHeAqgUp6JmniUfjo7BDvOrGzWjxtM=
---
<div class="cover">
  <img src="../assets/logo.png" alt="pondpump logo" />
  <h1>ioBroker.pondpump</h1>
  <p class="subtitle">User Manual — set up, control and monitor your OASE AquaMax Eco Titanium pond pumps in ioBroker</p>
  <div class="badge">🐟 Beginner-friendly guide</div>
</div>

## 1. Was dieser Adapter bewirkt

<figure>
  <img src="../assets/connection.svg" alt="How the adapter connects to the pumps" />
  <figcaption>How ioBroker reaches your pumps: today via the OASE cloud, and — in local mode — directly over your LAN.</figcaption>
</figure>

Der **Teichpumpenadapter** verbindet ioBroker über das **OASE Garden Controller Cloud (EGC)** -Gateway mit Ihrer/Ihren **OASE AquaMax Eco Titanium** Teichpumpe(n). Sobald die Verbindung hergestellt ist, können Sie über ioBroker (und damit auch über VIS, Skripte, Szenen, Alexa usw.) Folgendes steuern:

- **Jede Pumpe ein- und ausschalten** ,
- **Stellen Sie die Pumpengeschwindigkeit** von 0 bis 100 % ein.
- **Live-Telemetriedaten ablesen** : Leistung (W), Motordrehzahl (U/min), Wasser-/Elektroniktemperatur (°C) und Netzspannung (V),
- **Verbindungs- und Gerätestatus anzeigen** .

Jede Pumpe behält den Namen, den Sie ihr in der OASE-App gegeben haben (z. B. _Wasserfall_ , _Filter_ ), sodass Sie sie in der Objektstruktur wiedererkennen können.

> **Gut zu wissen:** Der Adapter kommuniziert mit dem **Controller** (Artikelnummer 55317), der wiederum mit den Pumpen (Artikelnummer 73656) kommuniziert. Es handelt sich um ein separates Projekt, das nicht mit dem Community-Adapter für die OASE-Sockelsteuerungen identisch ist – es ist speziell für intelligente Teichpumpen entwickelt worden.

---

## 2. Bevor Sie beginnen – was Sie benötigen

| Du brauchst                                                                                           | Warum                                           |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| Eine laufende **ioBroker-** Installation (js-controller, Node.js ≥ 22)                                | Die Plattform, auf der dieser Adapter läuft     |
| Ein **OASE Garden Controller Cloud** (EGC, Artikel 55317), eingerichtet in der OASE-App               | Das Gateway, mit dem der Adapter verbunden ist  |
| Eine oder zwei **OASE AquaMax Eco Titanium** Pumpen (Artikel 73656), die in der App gekoppelt wurden. | Die gesteuerten Geräte                          |
| Ihre Pumpen **funktionieren bereits in der OASE-App.**                                                | Der Adapter verwendet dasselbe Cloud-Konto.     |
| Ein **Cloud-Refresh-Token** (siehe Kapitel 4)                                                         | Wie sich der Adapter ohne Ihr Passwort anmeldet |

> **Tipp:** Stellen Sie **zunächst sicher, dass alles in der OASE-App** funktioniert. Wenn die App die Pumpen umschalten kann, kann der Adapter das auch.

---

## 3. Installation des Adapters

Der Adapter wird auf npm veröffentlicht al&#x73;**`iobroker.pondpump`** Bis es Teil des offiziellen ioBroker-Repositorys ist, installieren Sie es bitte aus dem Quellcode:

1. Öffnen Sie die ioBroker- **Admin-** Benutzeroberfläche.
2. Gehen Sie zu **Adapter** und schalten Sie **den Expertenmodus** ein (das Zauberhut-Symbol, oben rechts).
3. Klicken Sie auf das **Katzen-/Oktokatzen-Symbol „Von eigener URL installieren“** .
4. Geben Sie eines der folgenden Felder ein:
   - der npm-Paketnam&#x65;**`iobroker.pondpump`** , oder
   - die GitHub-URL eines Release-Tarballs, falls Ihnen einer mitgeteilt wurde.
5. Bestätigen Sie die Eingabe und warten Sie, bis der Adapter in der Liste erscheint.
6. Klicken Sie auf das **+** auf der Kachel „Teichpumpe“, um eine **Instanz** zu erstellen (`pondpump.0` ).

Die Instanzkonfiguration öffnet sich automatisch. Lassen Sie sie einen Moment in Ruhe – wir benötigen zuerst ein Aktualisierungstoken (nächstes Kapitel).

---

## 4. Cloud-Refresh-Token erhalten (Schritt für Schritt mit mitmproxy)

Die OASE-Cloud nutzt **Microsoft Azure AD B2C** für die Anmeldung. Aus Sicherheitsgründen speichert der Adapter Ihr Kontopasswort **nicht** . Stattdessen verwendet er ein **Aktualisierungstoken** – eine lange, einmalig gültige Anmeldeinformation, die Ihre OASE-Anwendung beim Anmelden erhält. Sie erfassen dieses Token **einmalig** mit einem kleinen Tool namens **mitmproxy** , fügen es in den Adapter ein, und der Adapter aktualisiert es anschließend automatisch.

Keine Sorge, falls Sie das noch nie gemacht haben – befolgen Sie einfach die folgenden Schritte genau.

<figure>
  <img src="../assets/mitmproxy.svg" alt="mitmproxy sits between your phone and the OASE cloud" />
  <figcaption>mitmproxy sits between your phone and the OASE cloud, so you can read the login and copy the token.</figcaption>
</figure>

### 4.1 Installieren und starten Sie mitmproxy

mitmproxy ist ein kleines, kostenloses Programm. Wir verwenden die Browserversion **mitmweb** . Folgen Sie den Anweisungen für **Ihr** Betriebssystem.

#### Windows (mit PowerShell)

1. Öffnen Sie Ihren Webbrowser und gehen Sie zu **<https://mitmproxy.org/downloads/>** .

2. Laden Sie das **Windows-** Paket herunter (die neueste Version – normalerweise ein&#x65;**`.msi`** Installer).

3. Öffnen Sie die heruntergeladene Datei und klicken Sie sich durch das Installationsprogramm: **Weiter → Weiter → Installieren → Fertigstellen** .

4. Öffnen Sie nun **PowerShell** :
   - Drücken Sie die **Windows-Taste** und geben Sie Folgendes ein:**`PowerShell`** und klicken Sie in der Liste **auf Windows PowerShell** .
   - Es erscheint ein dunkles Fenster mit einem blinkenden Textcursor – dies ist die Befehlszeile.

5. Geben Sie diesen Befehl ein und drücken Sie **die Eingabetaste** (dadurch wird der Proxy-Port auf **8080** festgelegt):

   ```powershell
   mitmweb --listen-port 8080
   ```

6. Wenn Windows fragt, ob **der Netzwerkzugriff erlaubt werden soll** , klicken Sie auf **„Zulassen“** . Das Bedienfeld öffnet sich automatisch unter **<http://127.0.0.1:8081>** in Ihrem Browser – das ist das mitmproxy-Bedienfeld, das Sie beobachten sollten. Der eigentliche **Proxy lauscht auf Port 8080** und wartet dort auf den Datenverkehr des Telefons. ✅

7. **Lassen Sie dieses PowerShell-Fenster die ganze Zeit geöffnet** – durch Schließen wird mitmproxy beendet. Um es später zu beenden, klicken Sie auf das Fenster und drücken Sie **Strg + C.**

> **"mitmweb wird nicht erkannt"?** Schließen Sie PowerShell und öffnen Sie sie erneut (damit das neu installierte Programm erkannt wird). Wenn Sie die Datei heruntergeladen haben, ...**`.zip`** Verwenden Sie anstelle des Installationsprogramms die Versionsnummer, entpacken Sie diese und geben Sie dann in PowerShell Folgendes ein:`cd ` gefolgt vom Ordnerpfad und führen Sie die folgenden Schritte aus:**`.\mitmweb.exe`** Die

#### macOS

1. **Terminal** öffnen ( **Cmd + Leertaste** drücken, eingeben)**`Terminal`** (, drücken Sie die Eingabetaste).
2. Am einfachsten geht es mit [Homebrew](https://brew.sh) : Ausführen`brew install mitmproxy` (Kein Homebrew installiert? Laden Sie die macOS-Version von **<https://mitmproxy.org/downloads/>** herunter und entpacken Sie sie.)
3. Laufe&#x6E;**`mitmweb --listen-port 8080`** Ein Browser-Tab öffnet sich unter **<http://127.0.0.1:8081>** .

#### Linux

1. Installieren Sie es mi&#x74;**`pipx install mitmproxy`** (oder das Paket Ihrer Distribution oder die Binärdateien von der Downloadseite).
2. Laufe&#x6E;**`mitmweb --listen-port 8080`** in einem Terminal und öffnen Sie **<http://127.0.0.1:8081>** .

In jedem Fall gilt: Die Browserseite auf **Port 8081** ist das Kontrollfeld, das Sie beobachten werden, und **Port 8080** ist der Port, an den Ihr Telefon seinen Datenverkehr sendet (nächster Schritt).

### 4.2 Leiten Sie den Datenverkehr Ihres Telefons über mitmproxy.

Ihr Telefon und Ihr Computer müssen sich im **selben WLAN-Netzwerk** befinden.

1. Ermitteln Sie **die lokale IP-Adresse Ihres Computers** (z. B.`192.168.1.20` Windows`ipconfig` macOS/Linux`ip addr` /`ifconfig` Die
2. Auf dem Telefon: **WLAN-Einstellungen → Ihr Netzwerk → Proxy → Manuell** und geben Sie **Server = die IP-Adresse Ihres Computers** und **Port = 8080** ein. Speichern.
3. Öffnen Sie den Browser Ihres Telefons und besuchen Sie **<http://mitm.it>** . Wählen Sie Ihr Telefonsystem aus, **installieren Sie** das angebotene Zertifikat **und vertrauen Sie ihm** .

   - **iOS:** Installieren Sie das Profil, dann _Einstellungen → Allgemein → Info → Zertifikatsvertrauenseinstellungen_ und **aktivieren** Sie das mitmproxy-Zertifikat.
   - **Android:** Installieren Sie es als **CA-Zertifikat** (Einstellungen → Sicherheit → Verschlüsselung & Anmeldeinformationen → Zertifikat installieren → CA-Zertifikat).

   Dieses Zertifikat ermöglicht es mitmproxy, den ansonsten verschlüsselten OASE-Datenverkehr zu lesen. **Entfernen Sie den Proxy und das Zertifikat wieder, wenn Sie fertig sind.**

### 4.3 Anmeldedaten erfassen und Aktualisierungstoken abrufen

1. Auf der **mitmweb** -Seite sollte die Liste gelöscht werden (damit neue Anfragen leicht zu erkennen sind).

2. In der **OASE-App** : **Abmelden** und anschließend **wieder anmelden** .

3. Geben Sie im **Filterfeld** von mitmweb oben einen dieser Suchbegriffe ein, um direkt zur richtigen Anfrage zu gelangen – dieser Trick erspart Ihnen das Scrollen durch Hunderte von Einträgen:

   | Diesen Filter eingeben | Es zeigt                                  |
   | ---------------------- | ----------------------------------------- |
   | `~u token`             | nur Anfragen, deren URL "token" enthält   |
   | `~d account.oase.com`  | nur Anfragen an den OASE-Anmeldeserver    |
   | `~b refresh_token`     | nur Anfragen, deren Inhalt`refresh_token` |

4. Klicken Sie auf die **POST-** Anfrage, die mit folgendem endet:**`/oauth2/v2.0/token`** Die

5. Öffnen Sie den Reiter **„Anfrage“** und sehen Sie sich den Formularinhalt an.**`refresh_token=`** und kopiere den nachfolgenden Long-Wert (bis zum nächsten).`&` ).
   - **Zusätzlicher Tipp:** Drücke&#x6E;**`/`** in mitmweb und suchen Sie nach`refresh_token` um es sofort hervorzuheben.

6. Fügen Sie diesen Wert in die Adaptereinstellung **„Cloud-Refresh-Token“** (Kapitel 5) ein.

> Das Aktualisierungstoken ist lang (Hunderte von Zeichen) – kopieren Sie es **vollständig** . Behandeln Sie es wie ein Passwort: Geben Sie es niemals weiter. Sie können es jederzeit widerrufen, indem Sie sich in der OASE-App überall abmelden. **Ihr Kontopasswort wird niemals im Adapter eingegeben.**

### 4.4 (Erweitert) Gerätepasswort für den lokalen Modus ermitteln

Nur erforderlich, wenn Sie den Verbindungsmodus verwenden möchten.**`local`** (Kapitel 8). Während mitmproxy noch läuft:

1. Öffne in der App deinen Teich, damit die Pumpen geladen werden (dadurch wird der Inventar-Download ausgelöst).
2. Geben Sie im Filterfeld von mitmweb Folgendes ein:**`~u Inventory`** um die Anfrage anzuzeige&#x6E;**`/User/Inventory`** Die
3. Klicken Sie darauf und öffnen Sie den Tab **„Antwort“** . Suchen Sie in der JSON-Datei die **benutzerdefinierten Attribute** der Pumpe; den Eintrag mit **`Id`= 101** enthält das **Gerätepasswort** – einen **64-stelligen** Wert (er kann Folgendes enthalten):`\uXXXX` Fluchtsequenzen, das ist in Ordnung).
4. Kopieren Sie diesen Wert in die Adaptereinstellung **„Gerätepasswort“** . Der Adapter dekodiert ihn und verwendet ihn für den lokalen TLS-Handshake.

> **Falls mitm.it nicht geladen wird:** Überprüfen Sie, ob der Proxy Ihres Telefons auf die IP-Adresse Ihres Computers auf Port 8080 verweist und ob der Datenverkehr funktioniert. Unter iOS müssen Sie das Zertifikat **installieren** _und_ **ihm vertrauen** (zwei separate Schritte).

---

## 5. Konfigurieren der Instanz

Öffnen Sie **Instanzen → pondpump.0 → Einstellungen** (Schraubenschlüssel-Symbol). Die Einstellungen sind gruppiert:

### Verbindung

| Einstellung          | Was einzutragen ist                                                                                                   |
| -------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Verbindungsmodus** | `cloud` für den Internetweg,`local` für den internen LAN-Pfad (Kapitel 8). Die beiden schließen sich gegenseitig aus. |
| **Umfrageintervall** | Wie oft (in Sekunden) der Adapter seinen Status abfragt. Standardwert: **30.** Mindestwert: 5.                        |

### Wolke

| Einstellung                                            | Was einzutragen ist                                                                              |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| **Cloud-Aktualisierungstoken**                         | Das Token aus Kapitel 4 (verschlüsselt gespeichert).                                             |
| _Erweitert (Basis-URL, Token-URL, Client-ID, Bereich)_ | Die Standardeinstellungen bleiben unverändert, es sei denn, OASE ändert die Cloud-Einstellungen. |

### Lokal (nur für`local` )

| Einstellung             | Was einzutragen ist                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| **Controller-IP**       | Die Adresse des EGC-Controllers in Ihrem Netzwerk.                                                           |
| **Gerätepasswort**      | Das 64-stellige Gerätepasswort (fortgeschritten; siehe Kapitel 8).                                           |
| **Adresse/Port binden** | Die ioBroker-Hostadresse und der TCP-Port, zu dem der Controller eine Verbindung herstellt (Standard: 5999). |

Klicken Sie auf **Speichern** . Die Instanz startet und nach einigen Sekunden…**`info.connection`** sollte **wahr** werden.

---

## 6. Die vom Adapter erstellten Objekte

Nach der ersten erfolgreichen Umfrage finden Sie diese unte&#x72;**`pondpump.0`** :

```
pondpump.0
├── info.connection            (true when connected)
├── <gateway>                  the EGC controller (device)
│   ├── serialNumber, firmware
│   └── online                 (controller reachable)
└── pumps.<deviceNumber>       one device per pump, named after the app
    ├── control.on             ← switch on/off        (writable)
    ├── control.speed          ← speed 0–100 %        (writable)
    ├── control.speedRaw       ← speed 0–255 (raw)    (writable)
    ├── status.connected       pump reachable
    ├── status.fcStatus        controller status text
    └── telemetry
        ├── power              live power in W
        ├── speed              live motor speed in rpm
        ├── temperature        °C
        ├── temperature2       °C (second sensor)
        ├── voltage            mains voltage in V
        └── raw.sensorN        still-unclassified sensor values
```

---

## 7. Pumpen steuern und ablesen

**Pumpe ein-/ausschalten** – einstellen`pumps.<deviceNumber>.control.on` Zu`true` /`false` Die

**Geschwindigkeit einstellen** – einen Prozentsatz (0–100) eingeben`pumps.<deviceNumber>.control.speed` Der Adapter sendet den Befehl, bestätigt ihn und liest die Pumpe kurz darauf erneut aus, sodass die Zustände die Realität widerspiegeln.

**Telemetriedaten lesen** – die Werte unter`telemetry` Die Daten werden bei jeder Abfrage live aktualisiert (schnelle Werte wie Leistung und Drehzahl in jedem Zyklus, langsamere Werte wie Temperatur alle paar Zyklen, um die Cloud-Funktionalität zu gewährleisten). Sie können die Daten in Visualisierungen, Diagrammen oder Skripten verwenden.

Beispiel (JavaScript-Adapter):

```javascript
// Run the "Waterfall" pump at 70 %
setState('pondpump.0.pumps.1234567.control.speed', 70);

// Log its live power
on('pondpump.0.pumps.1234567.telemetry.power', (obj) => {
    log('Pump power: ' + obj.state.val + ' W');
});
```

---

## 8. Lokaler Modus (hauseigenes LAN)

Der Adapter kann **vollständig über Ihr lokales Netzwerk** , ohne Internetverbindung, betrieben werden. Stellen Sie **den Verbindungsmodus** auf ein.**`local`** und das wird es auch:

- Starten Sie einen kleinen **TLS-Server** und senden Sie ein **UDP-Wake-** Paket an den Controller.
- Der Controller **stellt die Verbindung über TLS wieder her** und authentifiziert sich mit dem **Gerätepasswort** .
- Der Adapter liest dann das Gateway und die Pumpen aus und fragt **Live-Telemetriedaten** (Leistung, Drehzahl, Temperatur, Spannung) ab. So können Sie die Pumpen über das LAN **ein- und ausschalten und die Drehzahl einstellen** .

**Was Sie benötigen:**

- **Controller-IP** – die Adresse des EGC-Controllers in Ihrem Netzwerk.
- **Gerätepasswort** – der 64-stellige Wert (siehe Kapitel 4.4 für Informationen zum Auslesen).
- Ein offener Netzwerkpfad muss vorhanden sein: **UDP 5959** zum Controller und **TCP 5999** zurück zum ioBroker. Befinden sich Controller und ioBroker in unterschiedlichen Subnetzen/VLANs, müssen diese beiden Richtungen zugelassen werden.

Bitte hinterlassen Sie **die Bind-Adresse** bei`0.0.0.0` — Der Adapter erkennt automatisch die Hostadresse, mit der der Controller eine Verbindung herstellen soll.

> **Hinweis:** Der aktuelle **Drehzahlsollwert** (der Prozentwert) wird nicht über den lokalen Kanal zurückgelesen.`control.speed` Der Status spiegelt den zuletzt in ioBroker festgelegten Wert wider. **Der Ein-/Aus-Status wird live ausgelesen** (abgeleitet vom Stromverbrauch der Pumpe) und spiegelt daher auch Änderungen wider, die Sie in der OASE-App vornehmen.

---

## 9. vis-2 Widgets

Der Adapter enthält **zwei vorkonfigurierte vis-2-Widgets** – es ist keine zusätzliche Installation erforderlich. Nach der Installation des Adapters startet vis-2 automatisch neu und die Widgets erscheinen im vis-2-Editor unter der Widget-Gruppe **„Teichpumpe“** .

> **Tipp:** Falls die Widgets direkt nach der Installation nicht im Editor angezeigt werden, laden Sie die Editorseite in Ihrem Browser einmal neu ( **Strg + F5** ).

### 9.1 Hinzufügen eines Widgets und Verknüpfen mit einer Pumpe

1. Öffnen Sie den **vis-2-Editor** und ziehen Sie eines der beiden Widgets aus der Gruppe **„Teichpumpe“** in Ihre Ansicht.
2. Wählen Sie rechts in den Widget-Einstellungen Ihre Option aus.`pondpump` Instanz unter **Instanz** (z. B.`pondpump.0` ).
3. Darunter wählen Sie unter **„Pumpe“** die gewünschte Pumpe aus – die Liste zeigt automatisch alle erkannten Pumpen nach Namen an.

Das ist alles, was Sie konfigurieren müssen: Die Widgets kennen die passenden Objekt-IDs selbst und verbinden sich automatisch mit der ausgewählten Pumpe.

### 9.2 Das Widget „Pumpenvisualisierung“ (PumpVisual)

Dieses Widget stellt die Pumpe grafisch dar:

- Das **Laufrad** dreht sich abhängig von der Pumpendrehzahl – in 10%-Schritten, von langsam bis schnell.
- Wenn die Pumpe **ausgeschaltet** ist, steht das Laufrad still und ist mit einem **roten Kreuz** versehen.
- Wenn **die saisonale Durchflussregelung (SFC)** aktiv ist, wird das Laufrad durch einen rotierenden **Eiskristall** ersetzt.
- Unterhalb der Grafik werden die Live-Werte angezeigt: **Leistung** (W), **Drehzahl** (U/min) und **Leistung** (Sollwert in %).

Ein farbiges Symbol oben rechts zeigt den Status an: **Aktiv** , **Aus** oder **Saisonalmodus** .

### 9.3 Das Widget „Pumpensteuerung“ (PumpControl)

Dieses Widget steuert die Pumpe:

- Die Pumpe wird **durch Ein-/Ausschalter** gesteuert.
- Mit dem **Schieberegler** wird die Leistung in Prozent eingestellt. Der Befehl wird erst gesendet, wenn Sie den Schieberegler loslassen. Dadurch wird das Gerät nicht mit Befehlen überlastet. Über die **Schnellwahltasten** (0/25/50/75/100 %) kann der Wert direkt eingestellt werden.
- **Die saisonale Durchflussregelung (SFC)** lässt sich per Knopfdruck ein- und ausschalten. Der Knopf reagiert sofort (ein Drehknopf zeigt die Bestätigung an) – wiederholtes Drücken ist nicht nötig.

> **Was ist SFC?** „Saisonale Durchflussregelung“ (SFC) ist die temperaturabhängige saisonale Durchflussregulierung von OASE: Bei aktiviertem SFC reduziert die Pumpe automatisch ihre Fördermenge und Förderhöhe (um bis zu −50 %) und passt sich so der Teichbiologie im Jahresverlauf an. Es handelt sich **nicht um** einen Frostschutz.

### 9.4 Anpassen des Erscheinungsbildes

In den Widget-Einstellungen unter **Darstellung** können Sie unter anderem die **Akzentfarbe** auswählen, den **Kartenhintergrund** ausblenden, die **Animation** deaktivieren oder einzelne Teile (Werte, Ein-/Ausschalter, Schnellzugriffsschaltflächen, SFC) ein-/ausblenden.

## 10. Zeitpläne (Betrieb der Pumpen nach einem Zeitplan)

Der Adapter kann jede Pumpe nach einem **Tagesplan** anstatt mit einer festen Einstellung betreiben. Sie definieren Zeitfenster, in denen jeweils ein **bestimmter Leistungsprozentsatz** festgelegt oder **die SFC** ein- bzw. ausgeschaltet wird; außerhalb jedes Zeitfensters schaltet die Pumpe auf eine konfigurierbare **Grundleistung** zurück.

### 10.1 Zeitplanung für eine Pumpe aktivieren

1. Öffnen Sie die Instanzeinstellungen und bleiben Sie auf der Registerkarte **„Verbindung“** .
2. Scrollen Sie zum Abschnitt **„Zeitpläne“** ganz unten. Dort werden alle Pumpen aufgelistet, die der Adapter erkannt hat. (Falls die Liste leer ist, lassen Sie den Adapter einmal laufen, damit er die Pumpen findet, und laden Sie die Seite anschließend neu.)
3. Schalten Sie die Pumpe(n) ein, die Sie nach einem Zeitplan betreiben möchten. Jede aktivierte Pumpe erhält oben einen eigenen Tab **„Zeitplaner – \<Pumpenname>“** .

### 10.2 Definieren Sie die Zeitfenster

Öffnen Sie die Registerkarte **„Planer“** der Pumpe:

- **Grundleistung %** – wird angewendet, wenn kein Fenster aktiv ist (z. B. bei einem Ruhemodus für die Nacht).
- Die Tabelle enthält die **Zeitfenster** . Fügen Sie eine Zeile mit **„Zeitplan hinzufügen“** hinzu und legen Sie Folgendes fest:
  - **Start** / **Ende** – tägliche Uhrzeiten (HH:MM). Ein Zeitfenster darf Mitternacht nicht überschreiten – teilen Sie es in zwei Hälften.
  - **Modus** — **Leistung %** (das Fenster stellt eine feste Leistung ein), **SFC** (das Fenster schaltet die saisonale Flusssteuerung ein oder aus) oder **Aktor** (das Fenster steuert einen **externen Zustand** , z. B. einen Wasserfall/UVC — kombinieren Sie dies mit Astro-Grenzen, siehe 10.4).
  - **Wert** – der Leistungsprozentsatz oder Ein/Aus bei SFC; bei einem **Aktor** die **Zielobjekt-ID** plus ein Ein-Wert (aktiv) und ein optionaler Aus-Wert (inaktiv; leer = außen unberührt lassen).
- Fenster **dürfen sich nicht überlappen.** Der Editor prüft dies live und zeigt eine rote Meldung an, wenn zwei Fenster kollidieren; der Adapter prüft dies ebenfalls vor der Anwendung, sodass ein ungültiger Zeitplan niemals ausgeführt wird.

Nicht vergessen zu **speichern** .

### 10.3 Wie es funktioniert

Der Adapter wertet den Zeitplan aus und wendet das Ziel **an jeder Fenstergrenze** (und einmal beim Start) an:

- Im Inneren eines **elektrischen** Fensterhebers wird die Stromzufuhr unterbrochen und SFC ausgeschaltet.
- Innerhalb eines **SFC** -Fensters schaltet es SFC in den gewählten Zustand und behält die Grundleistung bei (was nur relevant ist, wenn SFC ausgeschaltet ist).
- Außerhalb jedes Fensters wird die **Grundleistung** bei ausgeschaltetem SFC angelegt.

Es wird nur geschrieben, wenn sich das Ziel tatsächlich ändert, sodass die Planung mit der manuellen Steuerung koexistiert: Ihre letzte manuelle Änderung bleibt so lange bestehen, bis die nächste Fenstergrenze die Pumpe wieder bewegt.

### 10.4 Astronomische Fenster (Sonnenaufgang/Sonnenuntergang)

Der Beginn und das Ende eines Zeitfensters müssen nicht auf eine feste Uhrzeit festgelegt sein. Für jede Grenze können Sie anstelle **der Uhrzeit** **Sonnenaufgang** oder **Sonnenuntergang** wählen und einen **Versatz in Minuten** angeben (auch negativ möglich). Beispiele: „Start = Sonnenuntergang + 0“, „Ende = Sonnenaufgang + 120“ ist ein **Nachtzeitfenster** , das über Mitternacht hinausgeht; „Sonnenaufgang − 30“ beginnt eine halbe Stunde vor Sonnenaufgang. Die Sonnenzeiten werden täglich neu berechnet.

> **Anmerkung (Forschung):** Eine nächtliche **Durchflussreduzierung ist im Sommer kontraproduktiv** (das Sauerstoffminimum liegt nachts). Astrofenster eignen sich am besten als **Schutzfenster** (Durchfluss nicht reduzieren) und für seitliche Aktuatoren (Wasserfall). Siehe`doc/research/` Die

**Standort:** Die Sonnenzeiten benötigen einen Standort. Wählen Sie auf der Registerkarte **„Verbindung“** im Abschnitt **„Zeitpläne** “ den **Standortmodus** aus:

- **Verwenden Sie den ioBroker-Systemstandort** (Standard) — übernimmt Breiten- und Längengrad aus den ioBroker-Systemeinstellungen.
- **Ein Standort für alle Pumpen** – eine gemeinsame Position; diese kann auf der **Karte** (durch Klicken oder Ziehen der Markierung), per **Adresssuche** oder in den Breiten-/Längengradfeldern festgelegt werden.
- **Ein Standort pro Pumpe** – jede Pumpe legt ihre eigene Position auf ihrer eigenen Registerkarte fest.

**Nachtschutz:** Im Bereich **„Temperatur-/Wettersteuerung“** können Sie **den Nachtschutz** für jede Pumpe einzeln aktivieren. Die Fördermenge wird dann **während der astronomischen Nacht** **nicht unter einen festgelegten Wert (standardmäßig 100 %) reduziert** , solange die Wassertemperatur einen Schwellenwert (standardmäßig 18 °C) erreicht oder überschreitet – genau wie von der Forschung empfohlen (der Sauerstoffgehalt ist nachts am niedrigsten; eine Reduzierung in warmen Nächten ist schädlich). Der Nachtschutz benötigt einen Standort und ist weiterhin durch die **maximale Leistung** begrenzt.

## 11. Temperatur- und wetterbasierte Steuerung

Neben festen Zeitfenstern kann jede Pumpe auch durch **Wassertemperatur und Wetterbedingungen** gesteuert werden. Die Idee stammt aus der Teichströmungsforschung (siehe`doc/research/` ): Die **Strömung folgt der Wassertemperatur** (kälteres Wasser = geringere Zirkulation, wärmeres Wasser = höhere Zirkulation), und **das Wetter kann die Strömung nur erhöhen** , niemals verringern (z. B. Hitze → mehr Belüftung).

> **Wichtig:** der Pumpenzustand`telemetry.temperature` Es handelt sich um die **Gerätetemperatur** , nicht um die Wassertemperatur. Verwenden Sie einen **realen Wassersensor** als Kurvenquelle (z. B. eine Teichsonde von einem anderen Adapter).

Öffnen Sie die Registerkarte **„Zeitplaner** “ der Pumpe und scrollen Sie zum Abschnitt **„Temperatur-/Wettersteuerung“** .

### 11.1 Wie es sich auf die Zeitfenster bezieht

Die Auswahlmöglichkeit oben legt fest, wie die Kurve mit den Zeitfenstern zusammenhängt:

- **Die Kurve hat Vorrang vor dem aktiven Zeitfenster** – die Wassertemperaturkurve bestimmt immer die Leistung.
- **Die Kurve gilt nur außerhalb der Zeitfenster** – innerhalb eines Fensters hat das Fenster Vorrang; außerhalb setzt sich die Kurve durch.

### 11.2 Wassertemperatursensor und Kennlinie

Wählen Sie oben den **Wassertemperatursensor** aus: Im Dropdown-Menü werden die pumpeneigenen Temperatursensoren **mit ihren aktuellen Werten** aufgelistet. Vergleichen Sie diese mit einem Thermometer Ihres Vertrauens und wählen Sie denjenigen aus, der die Wassertemperatur korrekt misst. Ihre Auswahl wird an den neuen Sensor übermittelt.`telemetry.waterTemperature` Der Status wird festgelegt und **die Kurvenquelle vorab ausgefüllt** . Bei einer **externen** Sonde lassen Sie diese Option auf „Keine“ eingestellt und geben Sie deren Objekt als Kurvenquelle unten ein (Lupensymbol).

Um die Kurve einzulegen:

1. **Wassertemperatur → Leistungskurve** einschalten.
2. Prüfen Sie die **Wassertemperaturquelle** – sie ist vom oben genannten Sensor vorbefüllt; bei einer externen Sonde wählen Sie deren Objekt mit dem **Lupensymbol** aus.
3. Geben Sie **die Punkte** ein (Temperatur °C → Leistung %). Die Werte werden zwischen den Punkten linear interpoliert und an den Endpunkten begrenzt. **Die Standardlastkurve** füllt die empfohlene Forschungskurve (Q10-Regel, 17 °C → 100 %) als Ausgangspunkt aus.

**Sicherheitsverhalten:** Wenn der Sensor ausfällt (die Quelle hat keinen Wert), läuft die Pumpe zur Sicherheit mit **100 %** – zu viel Zirkulation kostet nur Strom, zu wenig kostet Fische.

### 11.3 Feinabstimmung (optional)

Unterhalb der Kurve befinden sich optionale Grenzwerte. In der Admin-Benutzeroberfläche wird für jedes Feld ein **vorgeschlagener Wert** (grauer Platzhalter) und ein **Hilfetext** angezeigt:

- **Mindestleistung in Prozent** – eine Untergrenze; der Durchfluss sinkt nie darunter. Empfohlener Wert: **35–40 %** .
- **Maximale Leistung in Prozent** – eine Obergrenze; der Durchfluss überschreitet diese nie (auch nicht im Boost- oder Notlaufmodus). Z. B. **90 %** für eine Pumpe, die nur mit dieser maximalen Leistung arbeitet.
- **Temperaturglättung (Stunden)** – mittelt die Temperatur, sodass kurze Temperaturspitzen die Pumpe nicht ständig nachjustieren. Empfohlen: **12–24 Stunden** .`0` = aus.
- **Hysterese (°C)** – Die Kurve wird erst neu berechnet, nachdem sich die Temperatur um diesen Wert geändert hat. Empfohlener Wert: **0,5–1 °** C.`0` = aus.
- **Maximale Änderung (% pro Stunde)** – begrenzt die Geschwindigkeit der Leistungsänderung (sanfte Rampe). Empfohlener Wert: **10–20 %** .`0` = sofort.

### 11.4 Wetterregeln

Die untenstehende Regeltabelle kann zusätzlich den Durchfluss **erhöhen** oder Aktoren ansteuern. Jede Regel vergleicht eine **Quelle** (eine beliebige Zustands-ID, z. B. eine Außentemperatur oder eine Regen-OID) mit einem **Schwellenwert** und einem Operator (`<` ,`≤` ,`>` ,`≥` ,`=` ,`≠` Wenn eine Übereinstimmung vorliegt, tritt der entsprechende **Effekt** ein:

- **Potenz %** — erhöht den Exponenten mindestens auf diesen Wert (verringert ihn niemals).
- **Auf 100 % steigern** – volle Leistung (z. B. Hitze).
- **Halten (Frost)** — friert die Leistung auf ihrem letzten Wert ein.
- **SFC ein/aus** – schaltet die saisonale Durchflussregelung der Pumpe ein/aus.
- **Aktor setzen** — schreibt **die ID eines beliebigen Zielobjekts** auf einen Wert (wahr/falsch oder eine Zahl), z. B. schaltet er einen Belüfter oder einen Wasserfall ein.

Alle übereinstimmenden Regeln werden kombiniert (Erhöhungen nehmen den Maximalwert; ein „Halten“ friert ein, es sei denn, eine Erhöhung gewinnt; Aktor-Schreibvorgänge akkumulieren sich). Der Adapter abonniert die Quellzustände und wertet sie neu aus, **sobald sie sich ändern** , nicht nur an Fenstergrenzen.

> **Hinweis zu SFC:** Wenn die Leistungskurve die Leistung regelt, während die pumpeneigene **SFC** aktiviert ist, überschreibt die Pumpe den Sollwert – der Adapter gibt daraufhin eine Warnung im Protokoll aus. Deaktivieren Sie SFC oder steuern Sie die Pumpe über eine „SFC“-Regel.
>
> **Beim Upgrade von Version 0.3.0** hat sich das Regelmodell geändert. Regeln aus Version 0.3.0 (Effekte _Power %/SFC/Off_ ) sind inaktiv und müssen mit den neuen Effekten neu erstellt werden.

Vergiss nicht zu **speichern** .

## 12. Fehlerbehebung

| Symptom                                                    | Was zu überprüfen ist                                                                                                                                                                      |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `info.connection`bleibt **falsch**                         | Wurde ein **Aktualisierungstoken** eingegeben? Besorgen Sie sich ein neues (Kapitel 4) – Tokens können ablaufen, wenn Sie sich woanders anmelden.                                          |
| Das Protokoll meldet: **Authentifizierung fehlgeschlagen** | Das Aktualisierungstoken ist ungültig/abgelaufen → ein neues anfordern.                                                                                                                    |
| Es erscheinen keine Pumpen.                                | Sind die Pumpen in der **OASE-App** online? Der Adapter spiegelt den Cloud-Bestand wider.                                                                                                  |
| Befehle bewirken nichts.                                   | Warten Sie auf die **erste erfolgreiche Abfrage** (der Adapter lernt dann die Pumpenadressierung). Überprüfen Sie das Protokoll.                                                           |
| Möchten Sie mehr Details?                                  | Legen Sie den **Protokollierungsgrad der Instanz fest auf`debug`** — jeder Schritt wird mit einem Tag wie`[poll]` ,`[cloud/auth]` ,`[cloud/cmd]` Geheimnisse werden niemals protokolliert. |

Die Logzeilen sind nach Komponenten kategorisiert, sodass jedes Problem genau lokalisiert werden kann. Wenn Sie ein Problem melden, fügen Sie bitte den Debug-Log des betreffenden Bereichs bei.

---

## 13. Datenschutz und Sicherheit

- Ihr **OASE-Kontopasswort** wird vom Adapter weder eingegeben noch gespeichert.
- Das **Aktualisierungstoken** und **das Gerätepasswort** werden **verschlüsselt** in ioBroker gespeichert.
- Der Adapter kommuniziert ausschließlich mit der OASE-Cloud (oder im lokalen Modus direkt mit Ihrem Controller).
- Die Nutzung erfolgt auf eigene Gefahr – dies ist ein inoffizielles Community-Projekt und steht in keiner Verbindung zur OASE GmbH.

---

_Fragen oder Probleme? Erstelle ein Issue im GitHub-Repository des Projekts. Viel Spaß beim Teichpflegen!_ 🐟