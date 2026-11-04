---
title: Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung
lang: de
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
---
# Geräte-ID und Local Key des Gateways WL-433 auslesen

**Schritt-für-Schritt-Anleitung für Einsteiger – für Android, iPhone und iPad**

Stand: 21. September 2026 · Diese Anleitung gehört zum ioBroker-Adapter **miboxer-wl433**. Die Quellenangaben in
eckigen Klammern (z. B. [Q1]) finden Sie am Ende der Anleitung.

---

## Das Wichtigste auf einen Blick

Damit ioBroker Ihre Poolleuchten über das Gateway WL-433 steuern kann, braucht der Adapter **zwei Angaben**:

| Angabe | Wie sie aussieht | Wofür |
|---|---|---|
| **Geräte-ID** (englisch „Device ID“, im Protokoll „devId“) | etwa 20 bis 22 Zeichen aus Buchstaben und Ziffern, z. B. `bf0123456789abcdefgh` | Damit weiß der Adapter, *welches* Gerät gemeint ist. |
| **Local Key** (in manchen Anleitungen auch „Token“ oder „lokaler Schlüssel“) | **genau 16 Zeichen**, oft mit Sonderzeichen, z. B. `a1B2$c3D4{e5F6g7` | Das ist das „Passwort“, mit dem der Adapter mit dem Gateway sprechen darf. |

Die **Geräte-ID** ist leicht zu finden (Teil A). Der **Local Key** wird Ihnen von keiner App direkt angezeigt. Der
Hersteller unterstützt für das WL-433 auch nicht die Tuya-Entwicklerplattform, über die man den Schlüssel bei anderen
Geräten abrufen kann [Q3]. Es gibt aber einen erprobten Weg: Die MiBoxer-App schreibt beide Werte in ihr internes
Protokoll (das „Log“), und dieses Protokoll kann man auf einem **Android-Gerät** mitlesen [Q1].

**Welcher Weg passt zu Ihnen?**

| Ihre Ausstattung | Ihr Weg | Aufwand |
|---|---|---|
| Android-Smartphone oder -Tablet (Android 11 oder neuer) | **Teil B**, Variante ohne Computer | ca. 30 Minuten |
| Android-Gerät (Android 7 bis 10) und ein Computer | **Teil B**, Variante mit Computer | ca. 45 Minuten |
| Nur iPhone oder iPad | **Teil C** – am einfachsten mit einem geliehenen Android-Gerät, sonst mit einem Android-Emulator auf dem Computer | 30 bis 90 Minuten |

**Die eine Regel, die Sie sich merken müssen:** Der Local Key **ändert sich jedes Mal, wenn das Gateway neu mit der App
gekoppelt wird** [Q2]. Richten Sie das Gateway deshalb zuerst vollständig ein (siehe Anleitung
„Poolleuchte PW01 mit dem Gateway WL-433 verbinden“), lesen Sie *danach* den Local Key aus – und koppeln Sie das Gateway
anschließend nicht mehr neu. Tun Sie es doch, wiederholen Sie einfach diese Anleitung.

---

## 1. Bevor Sie beginnen

### 1.1 Das brauchen Sie – Checkliste

- [ ] **Das Gateway WL-433 ist fertig eingerichtet**: in der App „MiBoxer“ angelegt, mit dem WLAN verbunden, die
      Poolleuchten sind verknüpft und lassen sich per App schalten.
- [ ] **Ihre Zugangsdaten zur MiBoxer-App** (E-Mail-Adresse und Passwort). Sie melden sich damit eventuell auf einem
      weiteren Gerät an.
- [ ] **Ein Android-Gerät** – Ihr eigenes, ein geliehenes oder ein Android-Emulator auf dem Computer (siehe Teil C).
      LogFox, die App zum Mitlesen des Protokolls, läuft ab Android 7 [Q4].
- [ ] **Nur für die Variante mit Computer:** ein Windows-PC, Mac oder Linux-Rechner und ein USB-Datenkabel für das
      Android-Gerät.
- [ ] **Zettel und Stift oder eine Notiz-App** für die beiden Werte.
- [ ] **ioBroker mit installiertem Adapter „miboxer-wl433“.**

### 1.2 Wichtige Begriffe – in einfachen Worten

| Begriff | Was damit gemeint ist |
|---|---|
| **Protokoll / Log** | Ein internes „Tagebuch“, in das Apps im Hintergrund schreiben, was sie gerade tun. Normalerweise sieht es niemand. |
| **LogFox** | Eine kostenlose App für Android, die dieses Tagebuch anzeigen und durchsuchen kann [Q4]. |
| **Entwickleroptionen** | Ein verstecktes Menü in den Android-Einstellungen. Man schaltet es mit einem Trick frei (Abschnitt 3.1). |
| **Debugging über WLAN** (auch „Kabelloses Debugging“, „Wireless-Debugging“) | Eine Funktion in den Entwickleroptionen, mit der sich ein Hilfsprogramm ohne Kabel mit dem Handy verbinden darf. |
| **Shizuku** | Eine kostenlose Hilfs-App, die LogFox die nötige Berechtigung gibt – ganz ohne Computer (ab Android 11) [Q5]. |
| **ADB** | „Android Debug Bridge“, ein kleines Programm von Google für den Computer, mit dem man einem Android-Gerät Befehle schicken kann [Q6]. |
| **Emulator** | Ein Programm, das auf dem Computer ein komplettes Android-Handy nachbildet. Wichtig für iPhone-Besitzer (Teil C). |

### 1.3 Sicherheitshinweise

- **Der Local Key ist ein Passwort.** Wer ihn kennt und sich in Ihrem WLAN befindet, kann Ihre Poolbeleuchtung steuern.
  Veröffentlichen Sie ihn nicht, zum Beispiel in Foren oder auf Bildschirmfotos – dort vorher unkenntlich machen.
- **Nur Ihr eigenes Gerät.** Sie lesen ausschließlich das Protokoll der MiBoxer-App auf Ihrem eigenen (oder einem
  geliehenen, mit *Ihrem* Konto angemeldeten) Gerät aus.
- **Nach getaner Arbeit aufräumen.** LogFox kann das Protokoll *aller* Apps lesen. Schalten Sie die Entwickleroptionen
  danach wieder aus und entfernen Sie LogFox und Shizuku, wenn Sie sie nicht mehr brauchen (Teil E).

---

## 2. Teil A – Die Geräte-ID finden (alle Geräte, auch iPhone)

Die MiBoxer-App zeigt die Geräte-ID **nicht** an – einen Menüpunkt „Geräteinformationen“, wie ihn manche andere
Tuya-Apps haben, gibt es dort nicht. Sie bekommen die Geräte-ID trotzdem auf zwei Wegen:

- **zusammen mit dem Local Key** aus dem Protokoll (Teil B bzw. C) – sie steht dort direkt daneben, oder
- **vorab mit dem Suchknopf des Adapters** in ioBroker, ganz ohne Handy. So können Sie später auch prüfen, ob Sie im
  Protokoll den richtigen Eintrag erwischt haben.

**So funktioniert die Suche mit dem Adapter:** Das Gateway meldet sich regelmäßig von selbst in Ihrem Heimnetz, und der
Adapter hört diese Meldungen ab.

1. Schließen Sie zur Sicherheit die **MiBoxer-App auf allen Handys** im WLAN. Solange eine App direkt mit dem Gateway
   verbunden ist, meldet es sich unter Umständen nicht im Netz.
2. Öffnen Sie in ioBroker **Instanzen → miboxer-wl433.0 → Einstellungen** (Schraubenschlüssel-Symbol). Die Instanz muss
   laufen – auch wenn sie noch nicht fertig eingerichtet ist und deshalb nicht grün leuchtet.
3. Lassen Sie das Feld „Geräte-ID“ **leer** und klicken Sie auf **„Gateway im lokalen Netzwerk suchen“**.
4. Nach bis zu 12 Sekunden erscheint eine Liste aller Tuya-Geräte in Ihrem Netz, jeweils in der Form
   `Geräte-ID @ IP-Adresse (Protokollversion)`, zum Beispiel `bf0123456789abcdefgh @ 192.168.178.45 (3.3)`.
5. **Welcher Eintrag ist das Gateway?**
   - Steht nur ein Gerät in der Liste, ist es das Gateway.
   - Stehen mehrere Geräte dort (z. B. weil Sie weitere WLAN-Steckdosen oder -Lampen von Tuya-Marken besitzen), gibt es
     einen einfachen Trick: Ziehen Sie kurz den **Netzstecker des Gateways**, warten Sie etwa 30 Sekunden und suchen
     Sie erneut. **Der Eintrag, der jetzt fehlt, ist das Gateway.** Stecken Sie es danach wieder ein – nach etwa einer
     Minute ist es wieder im WLAN.
6. Schreiben Sie die Geräte-ID ab oder kopieren Sie sie.

Wird gar kein Gerät gefunden, sind Gateway und ioBroker vermutlich in unterschiedlichen Netzwerken (z. B. Gäste-WLAN
oder getrennte Netzbereiche). Dann erhalten Sie die Geräte-ID in Teil B bzw. C zusammen mit dem Local Key.

---

## 3. Teil B – Den Local Key mit einem Android-Gerät auslesen

Dieser Teil ist der Kern der Anleitung. Er besteht aus vier Schritten: Entwickleroptionen freischalten, LogFox
installieren, LogFox die Leseberechtigung geben, Werte auslesen.

### 3.1 Entwickleroptionen freischalten

1. Öffnen Sie die **Einstellungen** Ihres Android-Geräts.
2. Suchen Sie die **Build-Nummer**:
   - bei Google Pixel und vielen anderen: **Über das Telefon → Build-Nummer**,
   - bei Samsung: **Telefoninfo → Softwareinformationen → Buildnummer**.
   Tipp: Die Suchfunktion oben in den Einstellungen findet „Build-Nummer“ direkt.
3. Tippen Sie **siebenmal schnell hintereinander** auf die Build-Nummer. Eventuell müssen Sie Ihre Bildschirmsperre
   (PIN) eingeben. Es erscheint die Meldung **„Du bist jetzt Entwickler!“** (oder ähnlich).
4. Die **Entwickleroptionen** finden Sie jetzt unter **Einstellungen → System → Entwickleroptionen** (Samsung: ganz
   unten in den Einstellungen).
5. Schalten Sie dort **„USB-Debugging“** ein.

### 3.2 LogFox installieren

LogFox ist kostenlos und quelloffen und wird über **F-Droid** verteilt [Q4]:

1. Öffnen Sie auf dem Android-Gerät im Browser die Seite **f-droid.org/packages/com.f0x1d.logfox**.
2. Tippen Sie auf **„APK herunterladen“** (englisch „Download APK“).
3. Öffnen Sie die heruntergeladene Datei. Android fragt, ob der Browser Apps installieren darf: erlauben Sie das
   (**„Aus dieser Quelle zulassen“**) und tippen Sie auf **„Installieren“**.

LogFox ist nur auf Englisch verfügbar. Die wenigen Begriffe, die Sie brauchen, sind unten jeweils übersetzt.

### 3.3 LogFox die Leseberechtigung geben

Android erlaubt einer App das Lesen fremder Protokolle nur mit einer besonderen Berechtigung. Diese vergeben Sie
**einmalig** auf einem von zwei Wegen.

#### Variante ohne Computer (ab Android 11) – mit Shizuku

1. Installieren Sie aus dem **Google Play Store** die App **„Shizuku“** [Q5].
2. Verbinden Sie das Android-Gerät mit Ihrem **WLAN** (Pflicht für diesen Weg).
3. Öffnen Sie **Einstellungen → System → Entwickleroptionen** und schalten Sie **„Debugging über WLAN“** ein (heißt je
   nach Hersteller auch „Kabelloses Debugging“ oder „Wireless-Debugging“). Bestätigen Sie die Rückfrage mit
   **„Zulassen“**.
4. Öffnen Sie **Shizuku**. Tippen Sie im Abschnitt zum Start über Debugging über WLAN (englisch „Start via Wireless
   debugging“) auf **„Kopplung“** (englisch „Pairing“). Shizuku zeigt nun eine **Benachrichtigung** an.
5. Wechseln Sie zurück zu **Debugging über WLAN** und tippen Sie auf **„Gerät mit Kopplungscode koppeln“**. Es
   erscheint ein **sechsstelliger Code**.
6. Ziehen Sie die Benachrichtigungsleiste herunter und geben Sie den Code **in der Shizuku-Benachrichtigung** ein.
   Die Meldung „Kopplung erfolgreich“ erscheint.
7. Gehen Sie zurück in die Shizuku-App und tippen Sie auf **„Starten“** (englisch „Start“). Oben wird jetzt angezeigt,
   dass Shizuku läuft (englisch „Shizuku is running“).
8. Öffnen Sie **LogFox**. Beim ersten Start erscheint die Einrichtungsseite **„Setup“**. Tippen Sie auf **„Shizuku“**
   und bestätigen Sie die Rückfrage von Shizuku mit **„Zulassen“**.

Wichtig: Nach einem **Neustart des Handys** ist Shizuku wieder aus und muss mit Schritt 7 neu gestartet werden [Q5].
Das betrifft Sie nur, wenn Sie den Vorgang später wiederholen.

**Gut zu wissen:** Hat die Freigabe geklappt, **schließt sich LogFox kurz und startet neu**. Das ist Absicht und kein
Absturz – danach zeigt LogFox direkt die Protokollzeilen an.

#### Wenn LogFox „Error using Shizuku“ meldet

LogFox zeigt diese Meldung in drei Fällen [Q4]. Prüfen Sie sie der Reihe nach und tippen Sie danach in LogFox erneut
auf **„Setup“ → „Shizuku“**:

1. **Shizuku läuft nicht.** Öffnen Sie die Shizuku-App: Oben muss stehen, dass Shizuku läuft (englisch „Shizuku is
   running“). Falls nicht: Prüfen Sie, dass das Handy im WLAN ist und **Debugging über WLAN** eingeschaltet ist, und
   tippen Sie in Shizuku auf **„Starten“**. Nach jedem Neustart des Handys ist das erneut nötig [Q5].
2. **LogFox ist in Shizuku nicht freigegeben.** Haben Sie die Rückfrage von Shizuku einmal abgelehnt oder übersehen,
   fragt LogFox **nicht noch einmal**. Öffnen Sie in Shizuku den Punkt **„Autorisierte Anwendungen“** (englisch
   „Authorized applications“) und schalten Sie **LogFox** ein.
3. **Ihr Handy sperrt die Rechtevergabe.** Einige Hersteller verlangen eine zusätzliche Einstellung in den
   **Entwickleroptionen** [Q5]:
   - **Xiaomi, Redmi, POCO:** zusätzlich zu „USB-Debugging“ auch **„USB-Debugging (Sicherheitseinstellungen)“**
     einschalten (englisch „USB debugging (Security options)“; das ist ein eigener Schalter). Xiaomi verlangt dafür
     meist eine eingelegte SIM-Karte und ein angemeldetes Xiaomi-Konto. Außerdem unter Einstellungen →
     Benachrichtigungen den Stil der Benachrichtigungsleiste auf „Android“ stellen, sonst scheitert die Kopplung.
   - **OPPO, OnePlus, realme:** **„Berechtigungsüberwachung deaktivieren“** einschalten (englisch „Disable permission
     monitoring“).
   - **Huawei:** „ADB-Debugging im Nur-Laden-Modus zulassen“ einschalten (englisch „Allow ADB debugging options in
     ‚Charge only‘ mode“).
   - **Meizu:** „Flyme-Zahlungsschutz“ ausschalten (englisch „Flyme payment protection“).

Hängt Shizuku schon beim Koppeln („Suche nach Kopplungsdienst …“), erlauben Sie Shizuku in den App-Einstellungen, **im
Hintergrund zu laufen** (Akku-Optimierung für Shizuku ausschalten) [Q5].

Klappt es trotzdem nicht, nehmen Sie die **Variante mit Computer** (nächster Abschnitt). Die herstellerspezifischen
Schalter aus Punkt 3 brauchen Sie dort allerdings ebenfalls.

#### Variante mit Computer (alle Android-Versionen) – mit ADB

1. Laden Sie auf dem Computer die **„SDK Platform-Tools“** von Google herunter
   (developer.android.com/tools/releases/platform-tools) und entpacken Sie die ZIP-Datei, z. B. nach
   `C:\platform-tools` [Q6].
2. Verbinden Sie das Android-Gerät per **USB-Kabel** mit dem Computer. Auf dem Handy erscheint **„USB-Debugging
   zulassen?“** – setzen Sie den Haken bei „Von diesem Computer immer zulassen“ und tippen Sie auf **„Zulassen“**.
3. Öffnen Sie auf dem Computer ein Befehlsfenster im entpackten Ordner:
   - **Windows:** Ordner `platform-tools` im Explorer öffnen, oben in die Adresszeile `cmd` tippen, Enter drücken.
   - **Mac / Linux:** Terminal öffnen und `cd` gefolgt vom Ordnerpfad eingeben.
4. Tippen Sie diesen Befehl ein und drücken Sie Enter (Mac/Linux: `./adb` statt `adb`):

   ```text
   adb shell pm grant com.f0x1d.logfox android.permission.READ_LOGS
   ```

   Kommt keine Fehlermeldung, hat es geklappt. Denselben Befehl zeigt LogFox übrigens unter **„Setup“ → „ADB“** an [Q4].
5. Beenden Sie LogFox vollständig (aus der App-Übersicht wegwischen) und öffnen Sie es neu.

Hinweis für Android 13 und neuer: Google hat den Zugriff auf diesem Weg eingeschränkt. LogFox zeigt das Protokoll dann
nur **einige Minuten** lang; danach die Aufzeichnung neu starten [Q4]. Außerdem kann Android fragen, ob LogFox
**„auf alle Geräteprotokolle zugreifen“** darf – wählen Sie **„Einmaligen Zugriff erlauben“** [Q7]. Arbeiten Sie
Abschnitt 3.4 deshalb zügig ab.

### 3.4 Geräte-ID und Local Key auslesen

1. **Schließen Sie die MiBoxer-App vollständig** (App-Übersicht öffnen, MiBoxer nach oben wegwischen).
2. Öffnen Sie **LogFox**. Oben laufen jetzt Protokollzeilen durch. Steht dort „Recording paused“ (Aufzeichnung
   pausiert), tippen Sie auf **„Resume“** (Fortsetzen).
3. Öffnen Sie die **MiBoxer-App**, melden Sie sich falls nötig an und tippen Sie auf Ihr **Gateway WL-433**. Schalten
   Sie die Leuchte **einmal aus und wieder ein**. Dabei schreibt die App die gesuchten Werte in ihr Protokoll [Q1].
4. Wechseln Sie zurück zu **LogFox** und tippen Sie auf die **Lupe** („Search“). Geben Sie als Suchbegriff genau
   **`localKey`** ein.
5. Sie sehen nun eine oder mehrere Zeilen, die ungefähr so aussehen (Werte hier erfunden):

   ```text
   ..."devId":"bf0123456789abcdefgh", ... "localKey":"a1B2$c3D4{e5F6g7", ... "name":"WL-433", ...
   ```

   - Der Text **zwischen den Anführungszeichen nach `"devId":`** ist die **Geräte-ID**.
   - Der Text **zwischen den Anführungszeichen nach `"localKey":`** ist der **Local Key**.
   - Stehen dort mehrere Geräte (weil Sie weitere Tuya- oder MiBoxer-Geräte haben), nehmen Sie die Zeile, deren
     `"name"` dem Namen Ihres Gateways in der App entspricht. Vergleichen Sie die Geräte-ID mit dem Suchergebnis aus Teil A.
6. **Kopieren statt abschreiben:** Tippen Sie lange auf die Zeile und wählen Sie **„Extended copy“**, um genau den
   gewünschten Teil zu markieren und zu kopieren. LogFox meldet **„Text copied“**. Fügen Sie den Text in eine
   Notiz-App ein. Beim Abschreiben passieren leicht Fehler (`l` / `1` / `I`, `O` / `0`).
7. **Prüfen Sie die Werte:**
   - Der Local Key hat **genau 16 Zeichen**. Sonderzeichen wie `$ { ' < |` gehören dazu – übernehmen Sie alles exakt,
     aber **ohne** die umschließenden Anführungszeichen.
   - Steht im Local Key ein **Schrägstrich mit vorangestelltem Rückstrich** (`\/`) oder ein Rückstrich vor einem
     Anführungszeichen (`\"`), ist der Rückstrich nur eine Schreibweise des Protokolls: Übernehmen Sie nur `/` bzw. `"`.

Findet die Suche nichts, lesen Sie Abschnitt 7 („Häufige Fragen“).

---

## 4. Teil C – Sie haben nur ein iPhone oder iPad

**Warum geht es nicht direkt auf dem iPhone?** Apple erlaubt keiner App auf dem iPhone oder iPad, die Protokolle anderer
Apps zu lesen. Eine iPhone-Version von LogFox gibt es deshalb nicht und kann es nicht geben.

**Die gute Nachricht:** Der Local Key gehört zum **Gateway**, nicht zu Ihrem Handy. Er ist in Ihrem MiBoxer-Konto
gespeichert und wird an *jedes* Gerät übertragen, auf dem Sie sich mit diesem Konto anmelden. Es genügt also,
**vorübergehend irgendein Android-Gerät** zu verwenden – Ihr iPhone bleibt unverändert, und das Gateway muss dafür
**nicht** neu gekoppelt werden.

Die Geräte-ID finden Sie unabhängig vom Handy mit dem Suchknopf des Adapters (Teil A).

### 4.1 Der einfachste Weg: ein Android-Gerät ausleihen

Jedes Android-Smartphone oder -Tablet ab Android 7 genügt, auch ein altes Gerät aus der Schublade oder das Handy eines
Familienmitglieds.

1. Installieren Sie auf dem Android-Gerät aus dem Google Play Store die App **„MiBoxer“**.
2. Melden Sie sich mit **Ihrem** MiBoxer-Konto an (dieselbe E-Mail-Adresse und dasselbe Passwort wie auf dem iPhone).
   Ihr Gateway erscheint automatisch in der Geräteliste. **Fügen Sie das Gateway nicht neu hinzu und entfernen Sie es
   nicht** – sonst ändert sich der Local Key [Q2].
3. Arbeiten Sie **Teil B** vollständig durch.
4. Melden Sie sich danach in der MiBoxer-App auf dem Leihgerät ab (in Tuya-basierten Apps meist unter **„Ich“ →
   Einstellungen → „Abmelden“**) und deinstallieren Sie MiBoxer, LogFox und Shizuku wieder. Ihr Gateway und Ihr iPhone bleiben davon unberührt.

### 4.2 Ohne Android-Gerät: Android-Emulator auf dem Computer

Mit einem **Emulator** läuft ein komplettes Android-System in einem Fenster auf Ihrem Windows-PC oder Mac. Sie brauchen
dafür einen Computer mit mindestens 8 GB Arbeitsspeicher und ein Google-Konto für den Play Store.

**Ehrlicher Hinweis:** Dieser Weg ist technisch schlüssig, wurde mit der MiBoxer-App aber noch nicht erprobt. Wird die
App im Play Store des Emulators nicht angeboten oder startet sie nicht, bleibt Weg 4.1.

**Schritt 1 – Android Studio installieren** (kostenlos, von Google, für Windows, Mac und Linux) [Q8]:

1. Laden Sie **Android Studio** von developer.android.com/studio herunter und installieren Sie es mit den
   vorgeschlagenen Einstellungen („Standard“). Die Installation lädt mehrere Gigabyte nach.
2. Klicken Sie im Startfenster auf **„More Actions“ → „Virtual Device Manager“**.
3. Klicken Sie auf **„+“ (Create Virtual Device)**, wählen Sie ein Telefon **mit Play-Store-Symbol** in der Spalte
   „Play Store“ (z. B. „Pixel 8“) und klicken Sie auf **„Next“**.
4. Wählen Sie das empfohlene Systemabbild (**„Google Play“** muss im Namen stehen), laden Sie es mit dem Download-Pfeil
   herunter und klicken Sie auf **„Finish“**.
5. Starten Sie das virtuelle Gerät mit dem **Play-Symbol** ▶. Nach einer Minute erscheint ein Android-Handy im Fenster.

**Schritt 2 – MiBoxer-App im Emulator:**

1. Öffnen Sie im Emulator den **Play Store**, melden Sie sich mit einem Google-Konto an und installieren Sie
   **„MiBoxer“**.
2. Melden Sie sich in der MiBoxer-App mit **Ihrem** MiBoxer-Konto an. Das Gateway erscheint in der Liste – **nicht neu
   hinzufügen, nicht entfernen**.

**Schritt 3 – Protokoll mitlesen:** Im Emulator brauchen Sie weder LogFox noch Shizuku, denn das Protokoll lässt sich
direkt am Computer lesen:

1. Öffnen Sie ein Befehlsfenster (Windows: Startmenü → `cmd`; Mac: Programm „Terminal“) und wechseln Sie in den Ordner
   mit dem Programm `adb`. Android Studio hat es bereits installiert:
   - **Windows:** `cd %LOCALAPPDATA%\Android\Sdk\platform-tools`
   - **Mac:** `cd ~/Library/Android/sdk/platform-tools`
2. Starten Sie die gefilterte Protokollanzeige:
   - **Windows:** `adb logcat | findstr /i "localKey"`
   - **Mac:** `./adb logcat | grep -i "localKey"`
3. Tippen Sie im Emulator in der MiBoxer-App auf das Gateway und schalten Sie die Leuchte einmal aus und ein.
4. Im Befehlsfenster erscheinen Zeilen wie in Abschnitt 3.4, Schritt 5. Werten Sie sie genauso aus (Schritte 5 bis 7).
   Kopieren können Sie, indem Sie den Text mit der Maus markieren (Windows: danach Rechtsklick bzw. Enter).
5. Beenden Sie die Anzeige mit **Strg + C** (Mac: **ctrl + C**). Melden Sie sich in der MiBoxer-App im Emulator ab.

Alternative für Windows: Statt Android Studio funktioniert auch der kostenlose Emulator **BlueStacks 5**. Dort schalten
Sie unter **Einstellungen → Erweitert → „Android Debug Bridge“** den Zugriff ein und verbinden sich mit
`adb connect 127.0.0.1:5555` (die Portnummer zeigt BlueStacks an; sie kann sich nach jedem Neustart ändern) [Q9].
Danach geht es oben mit „Schritt 3 – Protokoll mitlesen“, Punkt 2, weiter.

### 4.3 Nur für Mac-Besitzer: Versuch mit der Konsole (ohne Gewähr)

Auf einem Mac kann das Programm **„Konsole“** die Protokolle eines per Kabel angeschlossenen iPhones anzeigen [Q10].
**Ob die iPhone-Version der MiBoxer-App den Local Key dort ausgibt, ist nicht bekannt** – der erprobte Bericht betrifft
nur Android [Q1]. Ein Versuch kostet aber nur zehn Minuten:

1. Verbinden Sie das iPhone per Kabel mit dem Mac und tippen Sie auf dem iPhone auf **„Vertrauen“**.
2. Öffnen Sie auf dem Mac **Programme → Dienstprogramme → Konsole**.
3. Wählen Sie links unter „Geräte“ Ihr **iPhone** aus. Aktivieren Sie im Menü **„Aktion“** die Punkte
   **„Info-Meldungen einschließen“** und **„Debug-Meldungen einschließen“**.
4. Geben Sie oben rechts in das Suchfeld **`localKey`** ein und klicken Sie auf **„Streaming starten“** („Start“).
5. Öffnen Sie auf dem iPhone die MiBoxer-App, tippen Sie auf das Gateway und schalten Sie die Leuchte aus und ein.
6. Erscheint eine Zeile mit `"localKey"`, werten Sie sie wie in Abschnitt 3.4 aus. Erscheint nichts oder nur
   `<private>`, gibt die iPhone-App den Schlüssel nicht preis – dann nutzen Sie Weg 4.1 oder 4.2.

---

## 5. Teil D – Werte in ioBroker eintragen und prüfen

1. Öffnen Sie in ioBroker **Instanzen → miboxer-wl433.0 → Einstellungen** (Schraubenschlüssel-Symbol).
2. Tragen Sie die **Geräte-ID** und den **Local Key** ein. Achten Sie darauf, dass beim Einfügen keine Leerzeichen am
   Anfang oder Ende mitkommen.
3. Klicken Sie auf **„Gateway im lokalen Netzwerk suchen“**. Wird das Gateway gefunden, trägt der Adapter
   **IP-Adresse** und **Protokollversion** selbst ein. Alternativ lassen Sie das IP-Feld leer – dann sucht der Adapter
   bei jedem Start selbst. Die Protokollversion für das WL-433 ist **3.3**.
4. Klicken Sie auf **„Speichern und schließen“**.
5. **Schließen Sie die MiBoxer-App** auf allen Handys, die im selben WLAN sind. Tuya-Geräte erlauben nur **eine** lokale
   Verbindung gleichzeitig – ist die App im Heimnetz geöffnet, kommt der Adapter nicht zum Zug.
6. **Prüfen:** Das Symbol der Instanz wird **grün**. Unter **Objekte → miboxer-wl433.0 → info → connection** steht
   **true**. Schalten Sie testweise **light.on** um – die Poolleuchten reagieren.

**Was tun, wenn es nicht klappt?** Der Adapter schreibt Hinweise ins ioBroker-Protokoll (**Log**):

| Meldung im Log (englisch) | Bedeutung | Lösung |
|---|---|---|
| „The local key must have exactly 16 characters (configured: …)“ | Beim Kopieren sind Zeichen verloren gegangen oder hinzugekommen (z. B. Anführungszeichen, Leerzeichen). | Local Key erneut und exakt übernehmen (Abschnitt 3.4, Schritt 7). |
| „Gateway sent data that could not be decoded …“ | Der Local Key ist falsch oder veraltet (Gateway wurde neu gekoppelt). | Local Key neu auslesen. Protokollversion 3.3 prüfen. |
| „Cannot keep a connection to the WL-433 gateway …“ | Das Gateway lässt den Adapter nicht zu – meist ist die MiBoxer-App im Heimnetz geöffnet, oder die IP-Adresse stimmt nicht. | App auf allen Handys schließen, andere Tuya-Integrationen für dieses Gerät beenden, IP-Adresse prüfen. |
| „Gateway … did not announce itself in the local network“ | Die automatische Suche hat das Gateway nicht gefunden. | IP-Adresse aus dem Router ablesen und im Feld „IP-Adresse des Gateways“ eintragen. Gateway und ioBroker müssen im selben Netz sein. |

---

## 6. Teil E – Aufräumen

- **Entwickleroptionen ausschalten:** Einstellungen → System → Entwickleroptionen → Schalter ganz oben auf **Aus**.
  Damit sind auch USB-Debugging und Debugging über WLAN wieder aus.
- **LogFox und Shizuku deinstallieren**, wenn Sie sie nicht mehr brauchen.
- **Emulator:** Melden Sie sich in der MiBoxer-App im Emulator ab. Das virtuelle Gerät können Sie im Virtual Device
  Manager löschen.
- **Werte sicher aufbewahren**, am besten in einem Passwort-Manager. Sie brauchen sie wieder, wenn Sie ioBroker neu
  einrichten.
- **Merken Sie sich:** Nach jedem erneuten Koppeln des Gateways (WLAN neu eingerichtet, Gateway aus der App entfernt und
  neu hinzugefügt) ist ein **neuer Local Key** fällig [Q2] – dann diese Anleitung wiederholen.

---

## 7. Häufige Fragen

**LogFox findet bei der Suche nach `localKey` nichts. Was nun?**
Prüfen Sie der Reihe nach: (1) Lief die Aufzeichnung, während Sie die MiBoxer-App geöffnet haben? Schließen Sie die App
vollständig und öffnen Sie sie erneut, während LogFox mitliest. (2) Suchen Sie auch nach `devId`, `localkey` oder
`local_key`. (3) Bei der ADB-Variante ab Android 13: Die Aufzeichnung läuft nur einige Minuten – in LogFox neu starten
und die MiBoxer-App sofort danach öffnen. (4) Der Weg wurde im Juni 2025 von einem Anwender mit genau diesem Gateway
beschrieben [Q1]. Es ist möglich, dass eine neuere Version der MiBoxer-App diese Ausgabe entfernt hat.

**Kann ich den Local Key nicht einfach beim Hersteller oder bei Tuya abfragen?**
Leider nein. Der Hersteller schreibt ausdrücklich, dass das WL-433 nicht auf der Tuya-Entwicklerplattform eingerichtet
werden kann [Q3]; ein Anwender hat das bestätigt [Q1].

**Muss ich die App „MiBoxer“ oder „MiBoxer Smart“ verwenden?**
Verwenden Sie die App, in der Ihr Gateway eingerichtet ist – laut Handbuch des WL-433 ist das die App „MiBoxer“.

**Darf ich die MiBoxer-App danach noch benutzen?**
Ja. Nur **gleichzeitig im selben WLAN** kann es Probleme geben, weil das Gateway nur eine lokale Verbindung erlaubt.
Unterwegs über das Mobilfunknetz spricht die App über die Cloud mit dem Gateway – das sollte den Adapter nicht stören.

**Ändert sich der Local Key von selbst?**
Nein, nur wenn das Gateway neu mit der App gekoppelt wird [Q2]. Ein Stromausfall oder ein Neustart des Gateways ändert
ihn nicht.

---

## Quellen

- **[Q1]** GitHub, jasonacox/tinytuya, Diskussion #623 „MiBoxer WL-433 Gateway DPs questions and some info“ (Anwender
  „Silverstar“, 04.06.2025): „the app freely tells me the device id and local key and some DP data when logging its debug
  output (with LogFox on android)“; „this device cannot be used with the tuya cloud platform“.
  https://github.com/jasonacox/tinytuya/discussions/623
- **[Q2]** TinyTuya, README: „The Local_Key for Tuya devices will change every time a device is removed and re-added to
  the TuyaSmart app.“ https://github.com/jasonacox/tinytuya
- **[Q3]** MiBoxer, FAQ und offizielles Forum (25.03.2025): „Attention！ 1. WL-Box1 WL-433 can not be set up.“
  https://miboxer.com/faq ·
  https://forum.miboxer.com/t/does-miboxer-wi-fi-and-zigbee-series-support-home-assistant-homebridge/29
- **[Q4]** LogFox (F0x1d), F-Droid-Seite (Version 2.1.10, „Android 7.0 or newer“, „Shizuku, Root & ADB support“) und
  Quellcode (ADB-Befehl `adb shell pm grant com.f0x1d.logfox android.permission.READ_LOGS`; Hinweis „Since Android 13
  Google has limited logcat access via ADB. You will be able to see logs only for several minutes“).
  https://f-droid.org/packages/com.f0x1d.logfox/ · https://github.com/F0x1d/LogFox
- **[Q5]** Shizuku, Benutzerhandbuch „Setup“: Start über Debugging über WLAN ab Android 11, Kopplung mit Kopplungscode,
  „the startup steps need to be performed again after each reboot“. https://shizuku.rikka.app/guide/setup/ ·
  Google Play: https://play.google.com/store/apps/details?id=moe.shizuku.privileged.api
- **[Q6]** Android Developers: „SDK Platform Tools release notes“ (Download ADB).
  https://developer.android.com/tools/releases/platform-tools
- **[Q7]** Google, Android-Hilfe: „Manage your device logs“ (einmaliger Zugriff auf alle Geräteprotokolle ab
  Android 13). https://support.google.com/android/answer/12986432
- **[Q8]** Android Developers: „Android Studio herunterladen“ und „Create and manage virtual devices“.
  https://developer.android.com/studio · https://developer.android.com/studio/run/managing-avds
- **[Q9]** BlueStacks Support: „How to enable Android Debug Bridge on BlueStacks 5“.
  https://support.bluestacks.com/hc/en-us/articles/23925869130381-How-to-enable-Android-Debug-Bridge-on-BlueStacks-5
- **[Q10]** Apple, Konsole-Benutzerhandbuch: Protokollmeldungen eines angeschlossenen Geräts anzeigen.
  https://support.apple.com/guide/console/cnsl1012/mac
- Hintergrund zum Protokoll: [Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md),
  Abschnitt 3.1.4.