---
title: Auslesen der Geräte-ID und des lokalen Schlüssels des WL-433-Gateways - Leitfaden für Anfänger
lang: en
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md
hash: oZR06US4D5jcXl3qwJGV+Yv9ZItXyUvWELxeciROLl4=
---
# Auslesen der Geräte-ID und des lokalen Schlüssels des WL-433-Gateways

**Schritt-für-Schritt-Anleitung für Anfänger – für Android, iPhone und iPad**

Stand: 21. September 2026 · Diese Anleitung bezieht sich auf den ioBroker-Adapter **miboxer-wl433** . Die Quellcode-Referenzen in eckigen Klammern (z. B. \[Q1]) finden Sie am Ende der Anleitung.

Eine deutsche Version dieser Anleitung ist verfügbar: [Anleitung\_Geraete-ID\_und\_Local-Key\_auslesen.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md) .

---

## Das Wichtigste auf einen Blick

Damit ioBroker Ihre Poolbeleuchtung über das WL-433-Gateway steuern kann, benötigt der Adapter **zwei Informationen** :

| Information                                                         | So sieht es aus                                                                           | Wozu dient es?                                                                            |
| ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| **Geräte-ID** (im Protokoll "devId")                                | etwa 20 bis 22 Zeichen, bestehend aus Buchstaben und Ziffern, z. B. `bf0123456789abcdefgh` | Es teilt dem Adapter mit _, welches_ Gerät gemeint ist.                                   |
| **Lokaler Schlüssel** (in manchen Anleitungen auch „Token“ genannt) | **genau 16 Zeichen** , oft mit Sonderzeichen, z.B. `a1B2$c3D4{e5F6g7`                      | Dies ist das "Passwort", das es dem Adapter ermöglicht, mit dem Gateway zu kommunizieren. |

Die **Geräte-ID** ist leicht zu finden (Teil A). Der **lokale Schlüssel** wird von keiner App direkt angezeigt. Für das WL-433 unterstützt der Hersteller auch nicht die Tuya-Entwicklerplattform, über die der Schlüssel für andere Geräte abgerufen werden kann \[Q3]. Es gibt jedoch eine bewährte Methode: Die MiBoxer-App schreibt beide Werte in ihr internes Protokoll, das auf einem **Android-Gerät** mitgelesen werden kann \[Q1].

**Welcher Weg passt Ihnen?**

| Ihre Ausrüstung                                         | Dein Weg                                                                                                              | Bemühung          |
| ------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------- |
| Android-Smartphone oder -Tablet (Android 11 oder neuer) | **Teil B** , Variante ohne Computer                                                                                   | ca. 30 Minuten    |
| Android-Gerät (Android 7 bis 10) und ein Computer       | **Teil B** , Variante mit Computer                                                                                    | ca. 45 Minuten    |
| Nur ein iPhone oder iPad                                | **Teil C** – am einfachsten mit einem geliehenen Android-Gerät, ansonsten mit einem Android-Emulator auf dem Computer | 30 bis 90 Minuten |

**Die wichtigste Regel:** Der lokale Schlüssel **ändert sich jedes Mal, wenn das Gateway erneut mit der App gekoppelt wird** \[Q2]. Richten Sie das Gateway daher zuerst vollständig ein (siehe Anleitung [„Poolleuchte PW01 mit dem Gateway WL-433 verbinden](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md) “), lesen Sie _anschließend_ den lokalen Schlüssel aus und koppeln Sie das Gateway danach nicht erneut. Sollten Sie dies dennoch tun, wiederholen Sie einfach diese Anleitung.

---

## 1. Bevor Sie beginnen

### 1.1 Was Sie benötigen – Checkliste

- [ ] **Das WL-433 Gateway ist vollständig eingerichtet** : Es wurde in der "MiBoxer"-App hinzugefügt, mit dem WLAN verbunden, die Poolbeleuchtung ist vernetzt und kann über die App geschaltet werden.
- [ ] **Ihre Anmeldedaten für die MiBoxer-App** (E-Mail-Adresse und Passwort). Sie können diese verwenden, um sich auf einem anderen Gerät anzumelden.
- [ ] **Ein Android-Gerät** – Ihr eigenes, ein geliehenes oder ein Android-Emulator auf dem Computer (siehe Teil C). LogFox, die App zum Lesen des Protokolls, läuft unter Android 7 und höher \[Q4].
- [ ] **Nur für die Variante mit Computer:** ein Windows-PC, Mac- oder Linux-Computer und ein USB-Datenkabel für das Android-Gerät.
- [ ] Für die beiden Werte **Papier und Stift oder eine Notiz-App** .
- [ ] **ioBroker mit installiertem Adapter "miboxer-wl433".**

### 1.2 Wichtige Begriffe – einfach erklärt

| Begriff                                                       | Was es bedeutet                                                                                                                       |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Protokoll**                                                 | Ein internes „Tagebuch“, in dem Apps im Hintergrund aufzeichnen, was sie tun. Normalerweise sieht es niemand.                         |
| **LogFox**                                                    | Eine kostenlose App für Android, die dieses Tagebuch anzeigen und durchsuchen kann \[Q4].                                             |
| **Entwickleroptionen**                                        | Ein verstecktes Menü in den Android-Einstellungen. Es wird mit einem Trick freigeschaltet (Abschnitt 3.1).                            |
| **Drahtloses Debugging** (auch „Debugging über WLAN“ genannt) | Eine Funktion in den Entwickleroptionen, die es einem Hilfsprogramm ermöglicht, sich ohne Kabel mit dem Telefon zu verbinden.         |
| **Shizuku**                                                   | Eine kostenlose Hilfs-App, die LogFox die erforderliche Berechtigung erteilt – ohne Computer (Android 11 und höher) \[Q5].            |
| **ADB**                                                       | „Android Debug Bridge“, ein kleines Programm von Google für den Computer, mit dem man Befehle an ein Android-Gerät senden kann \[Q6]. |
| **Emulator**                                                  | Ein Programm, das ein komplettes Android-Telefon auf dem Computer nachbildet. Wichtig für iPhone-Besitzer (Teil C).                   |

### 1.3 Sicherheitshinweise

- **Der lokale Schlüssel ist ein Passwort.** Jeder, der ihn kennt und sich in Ihrem WLAN befindet, kann Ihre Poolbeleuchtung steuern. Veröffentlichen Sie ihn nicht, beispielsweise in Foren oder auf Screenshots – machen Sie ihn vorher unkenntlich.
- **Nur auf Ihrem eigenen Gerät.** Sie können das Protokoll der MiBoxer-App nur auf Ihrem eigenen Gerät (oder auf einem geliehenen Gerät, das mit _Ihrem_ Konto angemeldet ist) lesen.
- **Nach Gebrauch sollten Sie aufräumen.** LogFox kann die Protokolle _aller_ Apps lesen. Deaktivieren Sie anschließend die Entwickleroptionen wieder und entfernen Sie LogFox und Shizuku, sobald Sie diese nicht mehr benötigen (Teil E).

---

## 2. Teil A – Ermitteln der Geräte-ID (alle Geräte, einschließlich iPhone)

Die MiBoxer-App zeigt die Geräte-ID **nicht** an – es gibt keinen Menüpunkt „Geräteinformationen“ wie bei manchen anderen Tuya-Apps. Sie können die Geräte-ID dennoch auf zwei Arten ermitteln:

- **zusammen mit dem lokalen Schlüssel** aus dem Protokoll (Teil B oder C) – er befindet sich direkt daneben, oder
- **Sie können die Suchfunktion des Adapters in ioBroker nutzen** , ohne ein Telefon zu benötigen. So können Sie später auch überprüfen, ob Sie den richtigen Eintrag im Protokoll ausgewählt haben.

**So funktioniert die Suche mit dem Adapter:** Das Gateway meldet sich regelmäßig von selbst in Ihrem Heimnetzwerk an, und der Adapter wartet auf diese Meldungen.

1. Sicherheitshalber sollten Sie die **MiBoxer-App auf allen mit dem WLAN verbundenen Smartphones** schließen. Solange eine App direkt mit dem Gateway verbunden ist, meldet sie sich möglicherweise nicht im Netzwerk an.
2. Öffnen Sie in ioBroker „ **Instanzen“ → „miboxer-wl433.0“ → „Einstellungen** “ (Schraubenschlüssel-Symbol). Die Instanz muss laufen – auch wenn sie noch nicht vollständig eingerichtet ist und daher nicht grün leuchtet.
3. Lassen Sie das Feld „Geräte-ID“ **leer** und klicken Sie auf **„Gateway im lokalen Netzwerk suchen“** .
4. Nach maximal 12 Sekunden erscheint eine Liste aller Tuya-Geräte in Ihrem Netzwerk, jeweils in folgender Form: `device ID @ IP address (protocol version)`, Zum Beispiel `bf0123456789abcdefgh @ 192.168.178.45 (3.3)` Die
5. **Welcher Eingang ist das Tor?**
   - Wenn nur ein Gerät in der Liste enthalten ist, handelt es sich um das Gateway.
   - Werden mehrere Geräte angezeigt (z. B. weil Sie weitere WLAN-Steckdosen oder Lampen der Marke Tuya besitzen), gibt es einen einfachen Trick: Ziehen Sie kurz den **Netzstecker des Gateways** , warten Sie etwa 30 Sekunden und suchen Sie erneut. **Der fehlende Eintrag ist nun das Gateway.** Stecken Sie es anschließend wieder ein – nach etwa einer Minute ist es wieder mit dem WLAN verbunden.
6. Notieren oder kopieren Sie die Geräte-ID.

Wird kein Gerät gefunden, befinden sich Gateway und ioBroker wahrscheinlich in unterschiedlichen Netzwerken (z. B. Gast-WLAN oder getrennten Netzwerksegmenten). In diesem Fall erhalten Sie die Geräte-ID zusammen mit dem lokalen Schlüssel in Teil B oder C.

---

## 3. Teil B – Auslesen des lokalen Schlüssels mit einem Android-Gerät

Dieser Teil ist der Kern der Anleitung. Er besteht aus vier Schritten: Entwickleroptionen freischalten, LogFox installieren, LogFox die Leseberechtigung erteilen und die Werte lesen.

### 3.1 Freischalten der Entwickleroptionen

1. Öffnen Sie die **Einstellungen** Ihres Android-Geräts.
2. Suchen Sie nach der **Build-Nummer** :
   - auf Google Pixel und vielen anderen: **Über das Telefon → Build-Nummer** ,
   - Bei Samsung: **Über das Telefon → Softwareinformationen → Build-Nummer** . Tipp: Die Suchfunktion oben in den Einstellungen findet die „Build-Nummer“ direkt.
3. Tippen Sie **siebenmal schnell hintereinander** auf die Build-Nummer. Möglicherweise müssen Sie Ihre Bildschirmsperre (PIN) eingeben. Die Meldung **„Sie sind jetzt Entwickler!“** (oder ähnlich) erscheint.
4. Die **Entwickleroptionen** finden Sie nun unter **Einstellungen → System → Entwickleroptionen** (Samsung: ganz unten in den Einstellungen).
5. Schalten Sie dort das **"USB-Debugging"** ein.

### 3.2 Installation von LogFox

LogFox ist kostenlos und Open Source und wird über **F-Droid** vertrieben \[Q4]:

1. Öffnen Sie auf dem Android-Gerät die Seite **f-droid.org/packages/com.f0x1d.logfox** im Browser.
2. Tippen Sie auf **„APK herunterladen“** .
3. Öffnen Sie die heruntergeladene Datei. Android fragt, ob der Browser Apps installieren darf: Erlauben Sie dies ( **„Installation aus dieser Quelle zulassen“** ) und tippen Sie auf **„Installieren“** .

LogFox ist nur auf Englisch verfügbar. Die wenigen benötigten Begriffe werden im Folgenden an den entsprechenden Stellen erläutert.

### 3.3 LogFox die Leseberechtigung erteilen

Android erlaubt einer App nur mit einer speziellen Berechtigung das Lesen der Protokolle anderer Apps. Diese Berechtigung kann **einmalig** auf eine von zwei Arten erteilt werden.

#### Variante ohne Computer (Android 11 und höher) – mit Shizuku

1. Installieren Sie die App **"Shizuku"** aus dem **Google Play Store** \[Q5].
2. Verbinden Sie das Android-Gerät mit Ihrem **WLAN** (dies ist in diesem Fall zwingend erforderlich).
3. Öffnen Sie **Einstellungen → System → Entwickleroptionen** und aktivieren Sie **„Drahtloses Debugging“** (je nach Hersteller kann es auch „Debugging über WLAN“ heißen). Bestätigen Sie die Aufforderung mit **„Zulassen“** .
4. Öffnen Sie **Shizuku** . Tippen Sie im Abschnitt „Start via Wireless Debugging“ auf **„Koppeln“** . Shizuku zeigt nun eine **Benachrichtigung** an.
5. Wechseln Sie zurück zur **drahtlosen Fehlersuche** und tippen Sie auf **„Gerät mit Kopplungscode koppeln“** . Ein **sechsstelliger Code** wird angezeigt.
6. Ziehen Sie die Benachrichtigungsleiste herunter und geben Sie den Code **in der Shizuku-Benachrichtigung** ein. Die Meldung „Kopplung erfolgreich“ erscheint.
7. Öffne die Shizuku-App erneut und tippe auf **„Start“** . Oben wird nun angezeigt, dass Shizuku läuft („Shizuku läuft“).
8. Öffnen Sie **LogFox** . Beim ersten Start erscheint die Einrichtungsseite **„Einrichtung“** . Tippen Sie auf **„Shizuku“** und bestätigen Sie Shizukus Aufforderung mit **„Zulassen“** .

Wichtig: Nach einem **Neustart des Telefons** ist Shizuku wieder deaktiviert und muss mit Schritt 7 \[Q5] erneut gestartet werden. Dies betrifft Sie nur, wenn Sie den Vorgang später wiederholen.

**Gut zu wissen:** Wenn die Berechtigung erfolgreich erteilt wurde, **schließt sich LogFox kurz und startet neu** . Dies ist beabsichtigt und kein Absturz – anschließend zeigt LogFox die Protokollzeilen direkt an.

#### Wenn LogFox "Fehler bei der Verwendung von Shizuku" meldet

LogFox zeigt diese Meldung in drei Fällen an \[Q4]. Überprüfen Sie diese nacheinander und tippen Sie dann in LogFox erneut auf **„Setup“ → „Shizuku“** :

1. **Shizuku läuft nicht.** Öffnen Sie die Shizuku-App: Oben sollte angezeigt werden, dass Shizuku läuft („Shizuku läuft“). Falls nicht: Prüfen Sie, ob Ihr Telefon mit WLAN verbunden ist und das **WLAN-Debugging** aktiviert ist. Tippen Sie anschließend in Shizuku auf **„Starten“** . Dies ist nach jedem Neustart des Telefons erforderlich \[Q5].
2. **LogFox ist in Shizuku nicht autorisiert.** Wenn Sie die Aufforderung von Shizuku bereits einmal abgelehnt oder ignoriert haben, **fragt LogFox nicht erneut** . Öffnen Sie in Shizuku den Punkt **„Autorisierte Anwendungen“** und aktivieren Sie **LogFox** .
3. **Ihr Telefon blockiert die Erteilung von Berechtigungen.** Einige Hersteller erfordern eine zusätzliche Einstellung in den **Entwickleroptionen** \[Q5]:
   - **Xiaomi, Redmi, POCO:** Aktivieren Sie neben „USB-Debugging“ auch **„USB-Debugging (Sicherheitsoptionen)“** (dies ist ein separater Schalter). Xiaomi benötigt hierfür in der Regel eine eingelegte SIM-Karte und ein angemeldetes Xiaomi-Konto. Stellen Sie außerdem unter Einstellungen → Benachrichtigungen den Benachrichtigungsstil auf „Android“ ein, da die Kopplung sonst fehlschlägt.
   - **OPPO, OnePlus, realme:** Aktivieren Sie die Option **„Berechtigungsüberwachung deaktivieren“** .
   - **Huawei:** Aktivieren Sie die Option "ADB-Debugging-Optionen im Modus ‚Nur Laden‘ zulassen".
   - **Meizu:** Schalten Sie den „Flyme-Zahlungsschutz“ aus.

Falls Shizuku bereits während des Kopplungsvorgangs hängt („Suche nach Kopplungsdienst …“), erlauben Sie Shizuku in den App-Einstellungen **, im Hintergrund zu laufen** (schalten Sie die Batterieoptimierung für Shizuku aus) \[Q5].

Sollte es weiterhin nicht funktionieren, verwenden Sie die **Variante mit einem Computer** (nächster Abschnitt). Allerdings benötigen Sie dafür auch die herstellerspezifischen Schalter aus Punkt 3.

#### Variante mit Computer (alle Android-Versionen) – mit ADB

1. Laden Sie auf dem Computer die **„SDK Platform-Tools“** von Google (developer.android.com/tools/releases/platform-tools) herunter und entpacken Sie die ZIP-Datei, z. B. nach `C:\platform-tools` \[Q6].
2. Verbinden Sie das Android-Gerät mit einem **USB-Kabel** mit dem Computer. Auf dem Telefon wird **„USB-Debugging zulassen?“** angezeigt – aktivieren Sie „Von diesem Computer immer zulassen“ und tippen Sie auf **„Zulassen“** .
3. Öffnen Sie auf dem Computer ein Befehlsfenster im entpackten Ordner:
   - **Windows:** Öffnen Sie den Ordner `platform-tools` Geben Sie im Explorer Folgendes ein: `cmd` Geben Sie den Wert in die Adressleiste oben ein und drücken Sie die Eingabetaste.
   - **Mac / Linux:** Terminal öffnen und Folgendes eingeben `cd` gefolgt vom Ordnerpfad.
4. Geben Sie diesen Befehl ein und drücken Sie die Eingabetaste (Mac/Linux: `./adb` anstatt `adb`):

   ```text
   adb shell pm grant com.f0x1d.logfox android.permission.READ_LOGS
   ```

   Wenn keine Fehlermeldung erscheint, hat es funktioniert. Übrigens zeigt LogFox denselben Befehl unter **„Setup“ → „ADB“** \[Q4] an.
5. Schließen Sie LogFox vollständig (wischen Sie es in der App-Übersicht weg) und öffnen Sie es erneut.

Hinweis für Android 13 und neuer: Google hat den Zugriff über diesen Weg eingeschränkt. LogFox zeigt das Protokoll dann nur für **wenige Minuten** an; danach muss die Aufzeichnung neu gestartet werden \[Q4]. Android fragt möglicherweise außerdem, ob LogFox **„auf alle Geräteprotokolle zugreifen“** darf – wählen Sie **„Einmaligen Zugriff erlauben“** \[Q7]. Arbeiten Sie daher Abschnitt 3.4 zügig durch.

### 3.4 Auslesen der Geräte-ID und des lokalen Schlüssels

1. **Schließen Sie die MiBoxer-App vollständig** (öffnen Sie die App-Übersicht und wischen Sie MiBoxer nach oben und weg).
2. Öffnen Sie **LogFox** . Die Protokollzeilen werden nun oben angezeigt. Falls „Aufnahme pausiert“ erscheint, tippen Sie auf **„Fortsetzen“** .
3. Öffnen Sie die **MiBoxer-App** , melden Sie sich gegebenenfalls an und tippen Sie auf Ihr **WL-433-Gateway** . Schalten Sie das Licht **einmal aus und wieder ein** . Dadurch schreibt die App die gesuchten Werte in ihr Protokoll \[Q1].
4. Wechseln Sie zurück zu **LogFox** und tippen Sie auf die **Lupe** („Suchen“). Geben Sie genau Folgendes ein:** `localKey` ** als Suchbegriff.
5. Sie sehen nun eine oder mehrere Zeilen, die ungefähr so aussehen (die Werte sind hier fiktiv):

   ```text
   ..."devId":"bf0123456789abcdefgh", ... "localKey":"a1B2$c3D4{e5F6g7", ... "name":"WL-433", ...
   ```

   - Der Text **zwischen den Anführungszeichen nach `"devId":` ** ist die **Geräte-ID** .
   - Der Text **zwischen den Anführungszeichen nach `"localKey":` ** ist der **lokale Schlüssel** .
   - Wenn mehrere Geräte aufgelistet sind (weil Sie weitere Tuya- oder MiBoxer-Geräte besitzen), wählen Sie die Zeile, deren `"name"` Stimmt der Name Ihres Gateways in der App überein. Vergleichen Sie die Geräte-ID mit dem Suchergebnis aus Teil A.
6. **Kopieren statt abschreiben:** Tippen Sie länger auf die Zeile und wählen Sie **„Erweitertes Kopieren“,** um genau den gewünschten Abschnitt zu markieren und zu kopieren. LogFox meldet **„Text kopiert“** . Fügen Sie den Text in eine Notiz-App ein. Das handschriftliche Abschreiben führt leicht zu Fehlern (`l` /`1` /`I`, `O` /`0`).
7. **Überprüfen Sie die Werte:**
   - Der lokale Schlüssel hat **genau 16 Zeichen** . Sonderzeichen wie z. B. `$ { ' < |` sind Teil davon – übernehmen Sie alles genau so, aber **ohne** die umgebenden Anführungszeichen.
   - Wenn der lokale Schlüssel einen **Schrägstrich enthält, dem ein Backslash vorangestellt ist** (`\/`) oder ein Backslash vor einem Anführungszeichen (`\"`), der Backslash ist lediglich eine Notation des Logs: übernehmen nur `/` oder `"` jeweils.

Falls die Suche nichts ergibt, lesen Sie Abschnitt 7 („Häufig gestellte Fragen“).

---

## 4. Teil C – Sie besitzen nur ein iPhone oder iPad

**Warum funktioniert es nicht direkt auf dem iPhone?** Apple erlaubt keiner App auf dem iPhone oder iPad, die Protokolle anderer Apps auszulesen. Daher gibt es keine iPhone-Version von LogFox, und es kann auch keine geben.

**Die gute Nachricht:** Der lokale Schlüssel gehört zum **Gateway** , nicht zu Ihrem Smartphone. Er ist in Ihrem MiBoxer-Konto gespeichert und wird auf _jedes_ Gerät übertragen, mit dem Sie sich mit diesem Konto anmelden. Daher genügt es **, vorübergehend ein beliebiges Android-Gerät zu verwenden** – Ihr iPhone bleibt unverändert, und das Gateway muss dafür **nicht** erneut gekoppelt werden.

Die Geräte-ID können Sie unabhängig vom Telefon mit der Suchtaste des Adapters (Teil A) ermitteln.

### 4.1 Der einfachste Weg: ein Android-Gerät ausleihen

Jedes Android-Smartphone oder -Tablet mit Android 7 oder höher genügt, sogar ein altes Gerät aus der Schublade oder das Telefon eines Familienmitglieds.

1. Installieren Sie die App **„MiBoxer“** aus dem Google Play Store auf Ihrem Android-Gerät.
2. Melden Sie sich mit **Ihrem** MiBoxer-Konto an (dieselbe E-Mail-Adresse und dasselbe Passwort wie auf dem iPhone). Ihr Gateway wird automatisch in der Geräteliste angezeigt. **Fügen Sie das Gateway nicht erneut hinzu und entfernen Sie es nicht** – andernfalls ändert sich der lokale Schlüssel \[Q2].
3. Arbeiten Sie **Teil B** vollständig durch.
4. Melden Sie sich anschließend auf dem geliehenen Gerät von der MiBoxer-App ab (bei Tuya-basierten Apps üblicherweise unter **„Ich“ → Einstellungen → „Abmelden“** ) und deinstallieren Sie MiBoxer, LogFox und Shizuku erneut. Ihr Gateway und Ihr iPhone bleiben davon unberührt.

### 4.2 Ohne Android-Gerät: Android-Emulator auf dem Computer

Mit einem **Emulator** läuft ein komplettes Android-System in einem Fenster auf Ihrem Windows-PC oder Mac. Dazu benötigen Sie einen Computer mit mindestens 8 GB RAM und ein Google-Konto für den Play Store.

**Ehrlicher Hinweis:** Diese Methode ist technisch einwandfrei, wurde aber noch nicht mit der MiBoxer-App getestet. Falls die App im Play Store des Emulators nicht verfügbar ist oder nicht startet, bleibt Methode 4.1.

**Schritt 1 – Installieren Sie Android Studio** (kostenlos, von Google, für Windows, Mac und Linux) \[Q8]:

1. Laden Sie **Android Studio** von developer.android.com/studio herunter und installieren Sie es mit den empfohlenen Einstellungen („Standard“). Die Installation umfasst mehrere Gigabyte an Daten.
2. Klicken Sie im Startfenster auf **„Weitere Aktionen“ → „Manager für virtuelle Geräte“** .
3. Klicken Sie auf **„+“ (Virtuelles Gerät erstellen)** , wählen Sie ein Telefon **mit einem Play Store-Symbol** in der Spalte „Play Store“ (z. B. „Pixel 8“) und klicken Sie auf **„Weiter“** .
4. Wählen Sie das empfohlene Systemabbild aus (der Name muss **„Google Play“** enthalten), laden Sie es mit dem Download-Pfeil herunter und klicken Sie auf **„Fertigstellen“** .
5. Starten Sie das virtuelle Gerät mit dem **Wiedergabesymbol** ▶. Nach einer Minute erscheint ein Android-Telefon im Fenster.

**Schritt 2 – MiBoxer-App im Emulator:**

1. Öffnen Sie im Emulator den **Play Store** , melden Sie sich mit einem Google-Konto an und installieren Sie **„MiBoxer“** .
2. Melden Sie sich mit **Ihrem** MiBoxer-Konto in der MiBoxer-App an. Das Gateway wird in der Liste angezeigt – **fügen Sie es nicht erneut hinzu und entfernen Sie es nicht** .

**Schritt 3 – Protokoll lesen:** Im Emulator benötigen Sie weder LogFox noch Shizuku, da das Protokoll direkt auf dem Computer gelesen werden kann:

1. Öffnen Sie ein Befehlsfenster (Windows: Startmenü →`cmd` Mac: die „Terminal“-App) und in den Ordner wechseln, der das Programm enthält `adb` Android Studio hat es bereits installiert:
   - **Windows:** `cd %LOCALAPPDATA%\Android\Sdk\platform-tools`
   - **Mac:** `cd ~/Library/Android/sdk/platform-tools`
2. Starten Sie die gefilterte Protokollausgabe:
   - **Windows:** `adb logcat | findstr /i "localKey"`
   - **Mac:** `./adb logcat | grep -i "localKey"`
3. Im Emulator tippen Sie in der MiBoxer-App auf das Gateway und schalten das Licht einmal aus und wieder ein.
4. Im Befehlsfenster erscheinen Zeilen wie in Abschnitt 3.4, Schritt 5. Führen Sie diese auf dieselbe Weise aus (Schritte 5 bis 7). Sie können den Text kopieren, indem Sie ihn mit der Maus markieren (Windows: Rechtsklick oder Eingabetaste).
5. Beenden Sie die Ausgabe mit **Strg + C** (Mac: **Control + C** ). Melden Sie sich in der MiBoxer-App im Emulator ab.

Alternative für Windows: Anstelle von Android Studio funktioniert auch der kostenlose Emulator **BlueStacks 5.** Dort aktivieren Sie den Zugriff unter **Einstellungen → Erweitert → „Android Debug Bridge“** und stellen die Verbindung her mit `adb connect 127.0.0.1:5555` (BlueStacks zeigt die Portnummer an; diese kann sich nach jedem Neustart ändern) \[Q9]. Fahren Sie dann mit „Schritt 3 – Protokoll lesen“, Punkt 2, fort.

### 4.3 Nur für Mac-Besitzer: Versuchen Sie es mit der Konsole (keine Garantie)

Auf einem Mac kann die App **„Konsole“** die Protokolle eines per Kabel verbundenen iPhones anzeigen \[Q10]. **Ob die iPhone-Version der MiBoxer-App den lokalen Schlüssel dort ausgibt, ist nicht bekannt** – der vorliegende Bericht bezieht sich nur auf Android \[Q1]. Ein Versuch dauert jedoch nur zehn Minuten:

1. Verbinde das iPhone mit einem Kabel mit dem Mac und tippe auf dem iPhone auf **„Vertrauen“** .
2. Öffnen Sie auf dem Mac **Programme → Dienstprogramme → Konsole** .
3. Wählen Sie links unter „Geräte“ Ihr **iPhone** aus. Aktivieren Sie im Menü **„Aktion“** die Optionen **„Infomeldungen einbeziehen“** und **„Debugmeldungen einbeziehen“** .
4. Eingebe&#x6E;** `localKey` ** im Suchfeld oben rechts auf **„Start streaming“** klicken ("Start").
5. Öffnen Sie auf dem iPhone die MiBoxer-App, tippen Sie auf das Gateway und schalten Sie das Licht aus und wieder ein.
6. Wenn eine Zeile mit `"localKey"` Wenn etwas erscheint, bewerten Sie es wie in Abschnitt 3.4 beschrieben. Wenn nichts erscheint oder nur `<private>` Wenn die iPhone-App den Schlüssel nicht anzeigt, verwenden Sie Methode 4.1 oder 4.2.

---

## 5. Teil D – Eingabe und Überprüfung der Werte in ioBroker

1. In ioBroker öffnen Sie **Instances → miboxer-wl433.0 → settings** (Schraubenschlüssel-Symbol).
2. Geben Sie die **Geräte-ID** und den **lokalen Schlüssel** ein. Achten Sie beim Einfügen darauf, dass keine Leerzeichen am Anfang oder Ende enthalten sind.
3. Klicken Sie auf **„Gateway im lokalen Netzwerk suchen“** . Wird ein Gateway gefunden, trägt der Adapter automatisch die **IP-Adresse** und **die Protokollversion** ein. Alternativ können Sie das IP-Feld leer lassen – dann sucht der Adapter bei jedem Start selbstständig. Die Protokollversion für den WL-433 ist **3.3** .
4. Klicken Sie auf **„Speichern und schließen“** .
5. **Schließen Sie die MiBoxer-App** auf allen Smartphones im selben WLAN-Netzwerk. Tuya-Geräte erlauben jeweils nur **eine** lokale Verbindung – wenn die App im Heimnetzwerk geöffnet ist, kann der Adapter keine Verbindung herstellen.
6. **Prüfen Sie:** Das Symbol der Instanz wird **grün** . Unter **Objekte → miboxer-wl433.0 → Info → Verbindung** wird **„true“** angezeigt. Schalten Sie testweise **„light.on“** ein – die Poolbeleuchtung reagiert.

**Was tun, wenn es nicht funktioniert?** Der Adapter schreibt Hinweise in das ioBroker- **Protokoll** :

| Meldung im Protokoll                                                     | Bedeutung                                                                                                                              | Lösung                                                                                                                                                         |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "Der lokale Schlüssel muss genau 16 Zeichen lang sein (konfiguriert: …)" | Beim Kopieren gingen Zeichen verloren oder wurden hinzugefügt (z. B. Anführungszeichen, Leerzeichen).                                  | Übernehmen Sie den lokalen Schlüssel erneut genau so (Abschnitt 3.4, Schritt 7).                                                                               |
| „Das Gateway hat Daten gesendet, die nicht dekodiert werden konnten…“    | Der lokale Schlüssel ist falsch oder veraltet (das Gateway wurde neu gekoppelt).                                                       | Lesen Sie den lokalen Schlüssel erneut. Überprüfen Sie die Protokollversion 3.3.                                                                               |
| „Es kann keine Verbindung zum WL-433-Gateway hergestellt werden…“        | Das Gateway lässt den Adapter nicht durch – normalerweise ist die MiBoxer-App im Heimnetzwerk geöffnet oder die IP-Adresse ist falsch. | Schließen Sie die App auf allen Telefonen, beenden Sie andere Tuya-Integrationen für dieses Gerät und überprüfen Sie die IP-Adresse.                           |
| „Gateway … hat sich im lokalen Netzwerk nicht angekündigt.“              | Die automatische Suche hat das Gateway nicht gefunden.                                                                                 | Suchen Sie die IP-Adresse im Router und geben Sie sie in das Feld „IP-Adresse des Gateways“ ein. Gateway und ioBroker müssen sich im selben Netzwerk befinden. |

---

## 6. Teil E – Aufräumen

- **Deaktivieren Sie die Entwickleroptionen:** Einstellungen → System → Entwickleroptionen → Schalter ganz oben auf **„Aus“** . Dadurch werden auch USB-Debugging und WLAN-Debugging wieder deaktiviert.
- **Deinstallieren Sie LogFox und Shizuku,** wenn Sie sie nicht mehr benötigen.
- **Emulator:** Melden Sie sich in der MiBoxer-App im Emulator ab. Sie können das virtuelle Gerät im Virtual Device Manager löschen.
- **Bewahren Sie die Werte sicher auf** , idealerweise in einem Passwort-Manager. Sie benötigen sie erneut, wenn Sie ioBroker wieder einrichten.
- **Zur Erinnerung:** Nach jeder neuen Kopplung des Gateways (Wi-Fi neu einrichten, Gateway aus der App entfernen und wieder hinzufügen) ist ein **neuer lokaler Schlüssel** erforderlich \[Q2] – dann wiederholen Sie diese Anleitung.

---

## 7. Häufig gestellte Fragen

**LogFox findet bei der Suche nichts. `localKey` Und nun?** Überprüfen Sie Folgendes nacheinander: (1) Lief die Aufnahme, während Sie die MiBoxer-App geöffnet hatten? Schließen Sie die App vollständig und öffnen Sie sie erneut, während LogFox mitliest. (2) Suchen Sie außerdem nach `devId`, `localkey` oder `local_key` (3) Bei der ADB-Variante unter Android 13 und höher: Die Aufnahme läuft nur wenige Minuten – starten Sie sie in LogFox neu und öffnen Sie anschließend sofort die MiBoxer-App. (4) Diese Vorgehensweise wurde im Juni 2025 von einem Nutzer mit genau diesem Gateway beschrieben \[Q1]. Möglicherweise wurde diese Ausgabe in einer neueren Version der MiBoxer-App entfernt.

**Kann ich nicht einfach den Hersteller oder Tuya nach dem lokalen Schlüssel fragen?** Leider nein. Der Hersteller gibt ausdrücklich an, dass sich das WL-433 nicht auf der Tuya-Entwicklerplattform einrichten lässt \[Q3]; ein Benutzer hat dies bestätigt \[Q1].

**Muss ich die App „MiBoxer“ oder „MiBoxer Smart“ verwenden?** Verwenden Sie die App, in der Ihr Gateway eingerichtet ist – laut WL-433-Handbuch ist dies die App „MiBoxer“.

**Kann ich die MiBoxer-App anschließend weiterhin nutzen?** Ja. Probleme können nur **gleichzeitig im selben WLAN** auftreten, da das Gateway nur eine lokale Verbindung zulässt. Unterwegs im Mobilfunknetz kommuniziert die App über die Cloud mit dem Gateway – dies sollte den Adapter nicht beeinträchtigen.

**Ändert sich der lokale Schlüssel automatisch?** Nein, nur wenn das Gateway erneut mit der App gekoppelt wird \[Q2]. Ein Stromausfall oder ein Neustart des Gateways ändert ihn nicht.

---

## Quellen

- **\[Q1]** GitHub, jasonacox/tinytuya, Diskussion #623 „MiBoxer WL-433 Gateway DPs Fragen und Infos“ (Benutzer „Silverstar“, 04.06.2025): „Die App zeigt mir beim Protokollieren der Debug-Ausgabe (mit LogFox unter Android) die Geräte-ID, den lokalen Schlüssel und einige DP-Daten an.“; „Dieses Gerät kann nicht mit der Tuya-Cloud-Plattform verwendet werden.“ <https://github.com/jasonacox/tinytuya/discussions/623>
- **\[Q2]** TinyTuya, README: „Der Local\_Key für Tuya-Geräte ändert sich jedes Mal, wenn ein Gerät aus der TuyaSmart-App entfernt und wieder hinzugefügt wird.“ <https://github.com/jasonacox/tinytuya>
- **\[Q3]** MiBoxer, FAQ und offizielles Forum (25.03.2025): „Achtung! 1. WL-Box1 WL-433 kann nicht eingerichtet werden.“ <https://miboxer.com/faq> · <https://forum.miboxer.com/t/does-miboxer-wi-fi-and-zigbee-series-support-home-assistant-homebridge/29>
- **\[Q4]** LogFox (F0x1d), F-Droid-Seite (Version 2.1.10, „Android 7.0 oder neuer“, „Shizuku, Root- und ADB-Unterstützung“) und Quellcode (ADB-Befehl) `adb shell pm grant com.f0x1d.logfox android.permission.READ_LOGS` Hinweis: „Seit Android 13 hat Google den Zugriff auf Logcat über ADB eingeschränkt. Die Protokolle sind nur für einige Minuten sichtbar.“ <https://f-droid.org/packages/com.f0x1d.logfox/> · <https://github.com/F0x1d/LogFox>
- **\[Q5]** Shizuku, Benutzerhandbuch „Einrichtung“: Starten Sie über Wireless Debugging ab Android 11, koppeln Sie das Gerät mit dem Kopplungscode. „Die Einrichtungsschritte müssen nach jedem Neustart erneut durchgeführt werden.“ <https://shizuku.rikka.app/guide/setup/> · Google Play: <https://play.google.com/store/apps/details?id=moe.shizuku.privileged.api>
- **\[Q6]** Android-Entwickler: „SDK Platform Tools – Versionshinweise“ (ADB herunterladen). <https://developer.android.com/tools/releases/platform-tools>
- **\[Q7]** Google, Android-Hilfe: „Geräteprotokolle verwalten“ (einmaliger Zugriff auf alle Geräteprotokolle ab Android 13). <https://support.google.com/android/answer/12986432>
- **\[Q8]** Android-Entwickler: „Android Studio herunterladen“ und „Virtuelle Geräte erstellen und verwalten“. <https://developer.android.com/studio> · <https://developer.android.com/studio/run/managing-avds>
- **\[Q9]** BlueStacks-Support: „So aktivieren Sie die Android Debug Bridge in BlueStacks 5“. <https://support.bluestacks.com/hc/en-us/articles/23925869130381-How-to-enable-Android-Debug-Bridge-on-BlueStacks-5>
- **\[Q10]** Apple, Console-Benutzerhandbuch: Protokollmeldungen eines verbundenen Geräts anzeigen. <https://support.apple.com/guide/console/cnsl1012/mac>
- Hintergrundinformationen zum Protokoll (Deutsch): [Miboxer\_WL-433\_PW01\_Protokollanalyse\_lokale\_steuerung.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md) , Abschnitt 3.1.4.