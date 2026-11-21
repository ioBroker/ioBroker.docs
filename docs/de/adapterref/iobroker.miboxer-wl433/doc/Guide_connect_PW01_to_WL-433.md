---
title: Anschluss der PW01-Poolleuchte an das WL-433-Gateway - Anleitung für Anfänger
lang: en
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md
hash: h8TlsLxlILrNGxMvdZz2lfKJYoJ3At8l+dx/oSR7ta0=
---
# Anschluss der MiBoxer PW01 Poolleuchte an das WL-433 Gateway

**Schritt-für-Schritt-Anleitung für Anfänger – keine technischen Vorkenntnisse erforderlich**

Stand: 21. September 2026 · Basierend auf den offiziellen MiBoxer-Handbüchern für das Gateway WL-433 (Version V1.0.1), die Poolleuchte PW01/PW02 (V1.0, Deutsch) und die Fernbedienung FUT086 (V1.0, Deutsch). Die Quellenangaben in eckigen Klammern (z. B. \[Q1]) finden Sie am Ende dieser Anleitung.

Eine deutsche Version dieser Anleitung ist als PDF verfügbar: [Anleitung\_PW01\_mit\_WL-433\_verbinden.pdf](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Anleitung_PW01_mit_WL-433_verbinden.pdf) .

Diese Anleitung bezieht sich auf den ioBroker-Adapter **miboxer-wl433** . Sobald die Poolbeleuchtung in der App funktioniert, fahren Sie mit dem [Adapterhandbuch](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md) und der Anleitung [„Geräte-ID und lokalen Schlüssel des WL-433-Gateways auslesen“](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md) fort.

> \[!NOTE] Englische Zitate aus den Herstellerhandbüchern werden wortgetreu wiedergegeben (einschließlich der Rechtschreibung). Zitate aus den deutschsprachigen Handbüchern \[Q2] und \[Q3] wurden ins Englische übersetzt.

---

## Auf einen Blick

Am Ende dieser Anleitung werden Sie in der Lage sein, Ihre Poolbeleuchtung mit Ihrem Smartphone ein- und auszuschalten, die Farbe, die Helligkeit und den Weißton einzustellen und Farbwechselprogramme zu starten.

Die Verbindung wird in vier Teilen hergestellt. Rechnen Sie insgesamt mit etwa 30 bis 45 Minuten:

| Teil | Was Sie tun                                                                   | Zeit                |
| ---- | ----------------------------------------------------------------------------- | ------------------- |
| A    | Richten Sie das Gateway ein und schließen Sie es an die Stromversorgung an.   | 5 Minuten           |
| B    | Installieren Sie die App „MiBoxer“ und erstellen Sie ein Benutzerkonto.       | 5–10 Minuten        |
| C    | Verbinden Sie das Gateway in der App mit Ihrem WLAN.                          | 5–10 Minuten        |
| D    | „Verbinden“ Sie die Poolbeleuchtung mit dem Gateway (der wichtigste Schritt). | 5 Minuten pro Lampe |

> \[!WICHTIG] **Die wichtigste Regel:** Beim Verbinden zählt jede Sekunde. Die Lampe muss mindestens **10 Sekunden** lang stromlos sein. Nach dem Einschalten haben Sie **3 Sekunden Zeit** , in der App auf „Verbinden“ zu tippen. **Blinkt die Lampe anschließend dreimal langsam** , hat die Verbindung geklappt \[Q1].

---

## 1. Bevor Sie beginnen

### 1.1 Was Sie benötigen – Checkliste

Haken Sie ab, was Sie haben:

- [ ] Die Poolleuchte PW01 ist vollständig installiert und an die Stromversorgung angeschlossen. Der Anschluss im Poolbereich darf nur von einem qualifizierten Elektriker vorgenommen werden. Die Leuchte verfügt über ein 0,5 m langes Anschlusskabel \[Q2].
- [ ] Ein Schalter, mit dem sich das Licht ein- und ausschalten lässt – beispielsweise der Lichtschalter der Poolbeleuchtung, der Stecker des Transformators oder eine schaltbare Steckdose. Ohne eine Möglichkeit, die Stromzufuhr zum Licht zu unterbrechen, ist eine Verbindung nicht möglich (siehe Teil D).
- [ ] Das WL-433-Gateway.
- [ ] Ein Netzteil mit 5 Volt Gleichstrom (DC) und mindestens 500 mA mit einem runden Hohlstecker (5,5 × 2,1 mm) wird benötigt. Laut Handbuch: „Eingang: DC 5 V/500 mA (5,5 × 2,1 mm)“ \[Q1]. **Achtung:** Viele Händler liefern das Netzteil nicht mit („Ein 5-V-DC-Netzteil ist erforderlich (nicht im Lieferumfang enthalten)“ \[Q4]). **Verwenden Sie niemals ein Netzteil mit mehr als 5 Volt:** „Bitte schließen Sie kein Netzteil mit mehr als 5 V DC an, da das Gerät sonst leicht beschädigt werden kann.“ \[Q1]. Ein 12-Volt-Netzteil (wie es beispielsweise häufig für LED-Streifen verwendet wird) zerstört das Gateway.
- [ ] Ein Smartphone – iPhone (iOS 9 oder neuer) oder Android-Telefon (Android 5 oder neuer) \[Q1] – mit Internetzugang.
- [ ] Name und Passwort Ihres WLANs. Das Gateway funktioniert nur mit **2,4-GHz-WLAN** („WiFi-IEEE 802.11b/g/n 2,4 GHz“ \[Q1]). Abschnitt 1.2 erläutert dies genauer.
- [ ] Eine Uhr mit Sekundenanzeige (die Uhr-App auf Ihrem Handy genügt) oder die Möglichkeit, laut mitzuzählen „eins-Mississippi, zwei-Mississippi …“.
- [ ] Papier und Stift für Ihren Zonenplan (Abschnitt 5.6).
- [ ] Optional: die Fernbedienung FUT086 (2 × AAA-Batterien). Sie wird für die App-Steuerung nicht benötigt, kann aber zusätzlich verwendet werden (Teil G).

### 1.2 Wichtige Begriffe – einfach erklärt

| Begriff                               | Was es bedeutet                                                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gateway (WL-433)**                  | Eine kleine Box, die zwischen Ihrem Smartphone und der Lampe „übersetzt“. Sie ist mit Ihrem WLAN verbunden und sendet Daten mit 433 MHz an die Lampe. Ohne das Gateway kann das Smartphone die Lampe nicht erreichen: „Smartphone-App-Steuerung (433-MHz-Gateway erforderlich)“ \[Q2].                                                                                              |
| **App**                               | Das Programm „MiBoxer“ auf Ihrem Telefon, mit dem Sie die Lampe bedienen \[Q1].                                                                                                                                                                                                                                                                                                     |
| **Benutzerkonto**                     | Sie müssen sich einmal in der App registrieren und anmelden („App öffnen und auf die Schaltfläche „Registrieren“ klicken; Registrierung abschließen und anmelden.“ \[Q1]).                                                                                                                                                                                                          |
| **Wi-Fi 2,4 GHz / 5 GHz**             | Viele Router senden gleichzeitig zwei WLAN-Frequenzen: 2,4 GHz (größere Reichweite) und 5 GHz (schneller). Das Gateway unterstützt jedoch nur 2,4 GHz. Bei manchen Routern haben beide Frequenzen denselben Namen; bei anderen enthält der Name der schnelleren WLAN-Frequenz die Bezeichnung „5G“ oder „5GHz“ – diese dürfen Sie **nicht** auswählen.                              |
| **Zone**                              | Im Gateway befindet sich ein Fach. Es gibt 8 Zonen („Zone 1 … Zone 8“ \[Q1]). Jede Leuchte ist genau einer Zone zugeordnet. Alle Leuchten in derselben Zone reagieren gemeinsam; verschiedene Zonen können separat gesteuert werden. Eine Zone kann beliebig viele Leuchten enthalten (für die Fernbedienung ist laut Handbuch „unbegrenzt viele Leuchten“ pro Zone möglich \[Q3]). |
| **Verlinkung ("Link")**               | Der Prozess, bei dem sich die Lampe das Gateway „merkt“. Erst danach reagiert sie auf Befehle der App: „Sie müssen die Lampen mit dem Gateway verbinden, um sie zu steuern.“ \[Q1]. Die Lampe speichert bis zu vier Sender (Gateway oder Fernbedienungen): „Eine Lampe oder ein Controller kann maximal von vier Fernbedienungen gesteuert werden.“ \[Q3].                          |
| **Verknüpfung aufheben ("Aufheben")** | Das Gegenteil: Die Lampe „vergisst“ das Gateway wieder. Dies ist erforderlich, wenn Sie eine Lampe in eine andere Zone versetzen möchten.                                                                                                                                                                                                                                           |
| **Blinken des Lichts**                | Die Leuchte "antwortet" durch Blinken: 3 Mal langsam = Verbindung erfolgreich hergestellt; 10 Mal schnell = Verbindung entfernt \[Q1].                                                                                                                                                                                                                                              |

### 1.3 Sicherheitshinweise aus den Handbüchern

- **Poolbeleuchtung:** „Bitte prüfen Sie, ob die Eingangsspannung mit der Betriebsspannung der Beleuchtung übereinstimmt.“ und „Die Betriebsspannung beträgt 24 V Gleichstrom. Die Beleuchtung wird beschädigt, wenn die Spannung höher als 24 V ist.“ \[Q2] Hinweis: Auf der Produktseite von MiBoxer wird abweichend „12 V Wechselstrom / 12–24 V Gleichstrom“ angegeben. \[Q5] Lassen Sie den Anschluss von einem qualifizierten Elektriker überprüfen. Diese Anleitung geht davon aus, dass die Beleuchtung bereits korrekt angeschlossen ist.
- **Nicht öffnen:** „Laien dürfen die Beleuchtung nicht direkt demontieren, da die Beleuchtung sonst beschädigt werden könnte“ \[Q2]; Gleiches gilt für das Gateway: „Nicht-professionelle Benutzer dürfen das Gerät nicht direkt demontieren“ \[Q1].
- **Das Gateway darf nur mit 5 Volt betrieben werden** (siehe Checkliste) \[Q1].
- **Standort des Gateways:** „Installieren Sie das Gerät nicht in direktem Sonnenlicht, in feuchten oder anderen Umgebungen mit hohen Temperaturen.“ und nicht in der Nähe von Metall oder starken Magnetfeldern, da sonst die Reichweite beeinträchtigt wird \[Q1]. Das Gateway ist **nicht wasserdicht** – es gehört ins Haus oder in einen trockenen Pflanzenraum, nicht an den Poolrand.
- **Temperaturen:** Eingangsbereich −20 bis +60 °C \[Q1]; Lichtbereich −20 bis +45 °C \[Q2].

### 1.4 Wie alles zusammenpasst

```text
Your smartphone ("MiBoxer" app)
       │ via the internet and your Wi-Fi (2.4 GHz)
       ▼
WL-433 gateway (dry, close to the Wi-Fi router, at most 50 m from the light)
       │ 433 MHz radio (LoRa) – through walls and down to 0.5 m under water
       ▼
PW01 pool light (remembers the gateway during "linking")
```

> \[!WICHTIG] **Wichtig zu verstehen:** Die Lampe lernt das Gateway, nicht umgekehrt. Deshalb muss die Lampe beim Verbinden direkt eingeschaltet sein – in den ersten drei Sekunden nach dem Einschalten „lauscht“ sie nach einem Verbindungssignal \[Q1]\[Q3].

---

## 2. Teil A – Gateway einrichten und einschalten

1. **Wählen Sie einen geeigneten Standort.** Die Bedienungsanleitung besagt: „Bitte installieren Sie das Gerät innerhalb von 50 m Entfernung zur Poolbeleuchtung und so nah wie möglich am WLAN-Router.“ \[Q1]. Das heißt: maximal 50 Meter in gerader Linie von der Poolbeleuchtung entfernt und so nah wie möglich am WLAN-Router. Der Standort sollte trocken sein, nicht direkter Sonneneinstrahlung ausgesetzt und nicht auf oder neben großen Metalloberflächen (Heizkörper, Metallschrank, Metallregal) stehen. \[Q1]
2. **Schließen Sie das Netzteil an.** Stecken Sie den runden Hohlstecker des 5-Volt-Netzteils in die Buchse des Gateways und das Netzteil in eine Wandsteckdose.
3. **Achten Sie auf die Kontrollleuchte.** Das Gateway verfügt über eine kleine Kontrollleuchte (im Handbuch als „Geräteanzeigelampe“ bezeichnet \[Q1]). Nach dem Einschalten leuchtet oder blinkt sie. Die genaue Bedeutung der Blinkmuster wird im Handbuch des WL-433 nicht beschrieben; das Schwestergerät WL-Box1 (gleiche App, gleiche Gerätegeneration) bietet dazu eine Tabelle mit den Zuständen „Kopplungsmodus“, „Erfolgreich im Netzwerk“, „Signal empfangen“ und „Vom Netzwerk getrennt“ \[Q6]. Wichtig ist an dieser Stelle nur: Leuchtet oder blinkt die Leuchte, ist das Gateway mit Strom versorgt.
4. **Tun Sie noch nichts weiter.** Die WLAN-Verbindung wird in Teil C über die App hergestellt.

---

## 3. Teil B – Installieren Sie die App und erstellen Sie ein Benutzerkonto.

1. Öffne auf deinem Smartphone den **App Store** (iPhone) oder **Google Play** (Android).
2. Suchen Sie nach **„MiBoxer“** (ohne „Smart“). In der Anleitung heißt es: „Für iOS: Bitte suchen Sie im App Store nach „MiBoxer“ (ab iOS 9.0). … Für Android: Suchen Sie bei Google Play nach „MiBoxer“ (ab Android 5.0).“ \[Q1]. Herausgeber der App ist „Shenzhen Xincaiyi Technology Co., Ltd.“. Das Android-Paket heißt \[Name der Android-Version einfügen]. `com.futlight.miboxer` \[Q7].
3. Tippen Sie auf **„Installieren“** (oder **„Herunterladen** “) und warten Sie, bis die App auf Ihrem Telefon ist.
4. Öffnen Sie die App. Falls Sie dazu aufgefordert werden, erlauben Sie den Zugriff auf WLAN oder Ihren Standort – die App benötigt diese Informationen, um Ihr WLAN zu erkennen (üblich für alle WLAN-fähigen Geräte dieser Art).
5. Tippen Sie auf **„Registrieren“** : „Öffnen Sie die App und klicken Sie auf „Registrieren“. Schließen Sie die Registrierung ab und melden Sie sich an.“ \[Q1]. Geben Sie die von der App angeforderten Daten ein (in der Regel eine E-Mail-Adresse und ein Passwort Ihrer Wahl). **Notieren Sie sich Ihre Anmeldedaten** – Sie benötigen sie auch, wenn Sie später ein neues Telefon einrichten.
6. Melden Sie sich mit diesen Daten an („log in“). Sie sehen nun die Geräteliste – sie ist noch leer.

> \[!TIPP] **Falls die „MiBoxer“-App nicht mehr angeboten wird oder nicht startet:** MiBoxer stuft die „MiBoxer“-App mittlerweile als ältere Version ein und empfiehlt stattdessen die „Miboxer Smart“- oder „Tuya Smart“-App \[Q8]. Händler bezeichnen den WL-433 auch als „Tuya Smart / Smart Life“ \[Q4]. Versuchen Sie in diesem Fall die „MiBoxer Smart“- oder „Smart Life“-App. Die Vorgehensweise (Konto erstellen, „+“, Gerät hinzufügen, Zone auswählen, „Verknüpfen“) ist im Prinzip dieselbe, die Bezeichnungen können jedoch abweichen.

---

## 4. Teil C – Gateway zur App hinzufügen (mit dem WLAN verbinden)

**Vorbereitung:**

- Ihr Telefon muss mit **demselben WLAN-Netzwerk** verbunden sein wie Ihr Router – genauer gesagt mit dem **2,4-GHz-WLAN** . Überprüfen Sie in den Telefoneinstellungen unter „WLAN“, welches Netzwerk verbunden ist. Enthält der Name „5G“ oder „5GHz“, wechseln Sie zum anderen Netzwerk Ihres Routers. Falls beide Netzwerke denselben Namen haben und die Kopplung nicht funktioniert, deaktivieren Sie das 5-GHz-Netzwerk Ihres Routers für die Dauer der Einrichtung (siehe Fehlerbehebung).
- Die mobilen Daten auf dem Telefon können eingeschaltet bleiben.
- Stellen Sie sich mit Ihrem Telefon neben das eingeschaltete Gateway.

**Schritte:**

1. Tippen Sie in der Geräteliste oben rechts auf **„+“** : „Klicken Sie auf das obere rechte „+“ in der Geräteliste.“ \[Q1].
2. Wählen Sie als Gerätetyp **„433 Gateway“** aus: „Bitte wählen Sie den Gerätetyp aus, den Sie hinzufügen möchten“ \[Q1]; das WL-433 wird in der App unter dem Namen „433 Gateway“ angezeigt \[Q1].
3. Folgen Sie nun den Anweisungen auf dem Bildschirm – im Handbuch heißt es: „Führen Sie die Hinzufügung gemäß den Hinweisen der App durch“ \[Q1]. Normalerweise fragt die App nach:
   - Um das Gateway in **den Kopplungsmodus** zu versetzen, verwenden Sie die **„SET“** -Taste \[Q1]. Für das Schwestergerät WL-Box1 lautet die Anweisung: „3 Sekunden lang die „SET“-Taste gedrückt halten, um den Smart-Link-Modus zu aktivieren. Die SYS-Kontrollleuchte blinkt.“ \[Q6] – d. h. die SET-Taste etwa 3 Sekunden lang gedrückt halten, bis die Kontrollleuchte blinkt. Dieser Schritt ist im Handbuch des WL-433 nicht explizit beschrieben; folgen Sie den Anweisungen in der App.
   - Wählen Sie Ihren **WLAN-Namen** und geben Sie das **WLAN-Passwort** ein. Achten Sie dabei auf Groß- und Kleinschreibung.
   - eine **Wartezeit** (in der Regel weniger als eine Minute), während der die App das Gateway sucht und sich damit verbindet.
4. Nach Erhalt der Erfolgsmeldung kehren Sie zur Geräteliste zurück und aktualisieren **Sie diese durch Herunterziehen mit dem Finger** : „Nach erfolgreichem Hinzufügen kehren Sie zur Geräteliste zurück und aktualisieren diese durch Herunterziehen, um den Gerätestatus anzuzeigen.“ \[Q1]. Das Gateway sollte nun als verbunden/online angezeigt werden.
5. **Optional – geben Sie ihm einen Namen:** Wischen Sie den Eintrag in der Geräteliste nach links und tippen Sie auf **„Bearbeiten“** , um ihm einen Namen wie „Pool-Gateway“ zu geben; **mit „Löschen“** wird das Gerät entfernt \[Q1].

**Die Kopplung funktioniert nicht?** Siehe Fehlerbehebung, Abschnitt 9, Punkte 1–4.

---

## 5. Teil D – Verbinden Sie die Poolbeleuchtung mit dem Gateway (zentraler Schritt)

### 5.1 Vorbereitung – bitte sorgfältig lesen

- **Schalten Sie jetzt nur die Lampe ein, die Sie verbinden möchten.** Wenn mehrere Poolleuchten an demselben Schalter hängen, werden alle Lampen, die innerhalb von 3 Sekunden den Verbindungsbefehl erhalten, beim Einschalten verbunden und befinden sich dann alle in derselben Zone. Das ist in Ordnung, wenn alle Lampen immer gleichzeitig leuchten sollen. Wenn Sie die Lampen einzeln steuern möchten, müssen Sie sie nacheinander einzeln verbinden (jede Lampe einzeln mit Strom versorgen) und unterschiedliche Zonen auswählen. (Praktischer Hinweis: Die Handbücher beschreiben den Vorgang nur für „die Lampe“ im Singular \[Q1]\[Q3].)
- **Eine bereits verbundene Leuchte kann nicht erneut verbunden werden:** „Die verbundene Leuchte kann nicht erneut verbunden werden.“ \[Q1]. Wenn Sie eine Leuchte in eine andere Zone verschieben möchten, entfernen Sie zuerst die Verbindung (Teil F).
- **Mindestens 10 Sekunden aus – nicht weniger.** Die Poolbeleuchtung hat eine Besonderheit: Wird sie nur kurz (ca. 5 Sekunden) ausgeschaltet und wieder eingeschaltet, wechselt sie zur nächsten Farbe oder zum nächsten Programm („Farben und dynamische Modi nacheinander wechseln“ \[Q2]). Dies ist normal und kein Fehler. Die Tabelle im Handbuch enthält weitere Zeilen für „5–10 Sekunden“ und „mehr als 10 Sekunden“, deren Auswirkung nur grafisch dargestellt wird \[Q2]. Die Verbindungsanleitung von Gateway und Fernbedienung erfordert ausdrücklich 10 Sekunden Ausschaltzeit \[Q1]\[Q3]. Zählen Sie also wirklich bis 10, oder sogar bis 15 – länger schadet nicht.
- **Sie haben ein Zeitfenster von 3 Sekunden.** Nach dem Einschalten müssen Sie innerhalb von 3 Sekunden in der App auf „Verknüpfen“ tippen \[Q1]. Halten Sie dazu Ihr Smartphone mit geöffnetem Link-Bildschirm in einer Hand, den Daumen auf dem Button, und betätigen Sie den Lichtschalter mit der anderen Hand. Falls der Schalter weiter vom Pool entfernt ist, ist das kein Problem – Sie müssen das Licht nicht sehen, sondern können es später überprüfen.
- **Zu zweit geht es einfacher:** Eine Person schaltet den Schalter, die andere tippt. Es ist aber nicht unbedingt notwendig.

### 5.2 Schritt für Schritt: Erstes Licht in Zone 1

1. Öffnen Sie die App und tippen Sie in der Geräteliste auf Ihr **„433 Gateway“** . Sie befinden sich nun im Steuerungsbildschirm des Gateways: „Klicken Sie in der Geräteliste auf „433 Gateway“, um die Steuerungsoberfläche aufzurufen.“ \[Q1]
2. Tippen Sie auf **„Verknüpfen/Verknüpfung aufheben“** \[Q1]. Der Verknüpfungsbildschirm wird geöffnet.
3. **Wählen Sie die Zone aus:** Tippen Sie unten links auf **„Zone“** (klicken Sie unten links auf „Zone“, um die Zonenauswahl aufzurufen. \[Q1]) und wählen Sie **„Zone 1“** aus. Stellen Sie sicher, dass Zone 1 markiert ist. Im Handbuch wird dieser Schritt als „Bitte wählen Sie den Verbindungskanal aus“ bezeichnet. \[Q1]
4. **Schalten Sie das Licht aus** (Stromzufuhr unterbrechen) und warten Sie **10 bis 15 Sekunden** : „Licht ausschalten; nach 10 Sekunden wieder einschalten.“ \[Q1]. Zählen Sie laut mit oder beobachten Sie die Sekundenanzeige.
5. **Schalte das Licht an.**
6. **Tippen Sie sofort – innerhalb von 3 Sekunden – auf „Verknüpfen“** (einmal, nicht mehrmals): „Drücken Sie die Verknüpfungstaste einmal innerhalb von 3 Sekunden.“ \[Q1].
7. Beobachten Sie die Kontrollleuchte: Sie muss nun **dreimal langsam blinken** : „Die Verbindung ist hergestellt, wenn die Kontrollleuchte dreimal langsam blinkt.“ \[Q1]. Falls Sie die Kontrollleuchte am Schalter nicht sehen können, bitten Sie jemanden, dies zu beobachten oder den Erfolg in Schritt 9 zu überprüfen.
8. **Blinkt die Leuchte nicht langsam, hat es nicht funktioniert:** „Hinweis: Wenn die Leuchte nicht langsam blinkt, ist die Verbindung fehlgeschlagen.“ \[Q1]. Wiederholen Sie die Schritte 4 bis 7 – meist war die Ausschaltzeit zu kurz oder der Tipp zu spät. Im Fehlerfall empfiehlt die Anleitung: Prüfen Sie, ob die Leuchte kompatibel ist, ob sie bereits verbunden ist, und wiederholen Sie die Schritte \[Q1].
9. **Prüfen Sie:** Gehen Sie zurück zur Steuerungsoberfläche des Gateways („Nach erfolgreicher Verbindung zurück zur Steuerungsoberfläche, um die Lampen zu steuern“ \[Q1]). Stellen Sie sicher, dass Zone 1 ausgewählt ist – „Bitte wählen Sie die verbundene Zone aus, sonst können die Lampen nicht gesteuert werden.“ \[Q1] – und tippen Sie auf „Aus“ und dann wieder auf „Ein“. Wenn die Lampe reagiert: Fertig.
10. Tragen Sie die Lampe in Ihren Zonenplan ein (Abschnitt 5.6).

### 5.3 Zweite und weitere Lichter

**Sollen die Lampen immer gleichzeitig aufleuchten?** Dann verbinden Sie jede weitere Lampe genau wie in Abschnitt 5.2 beschrieben – ebenfalls mit Zone 1. Die Lampen in Zone 1 reagieren dann gemeinsam. (Wenn alle Lampen am selben Schalter hängen, geschieht dies ohnehin automatisch – siehe Abschnitt 5.1.)

**Sollen die Leuchten einzeln steuerbar sein?** Dann benötigen Sie für jede Leuchte einen separaten Schalter oder Stecker und wählen Sie Zone 2 für die zweite Leuchte, Zone 3 für die dritte usw. Die Vorgehensweise entspricht der in Abschnitt 5.2 beschriebenen, nur mit einer anderen Zone in Schritt 3. Bitte beachten Sie: Das Gateway kann keine Zonen zu Gruppen zusammenfassen („Hinweis: Dieses Gateway unterstützt keine Gruppensteuerung.“ \[Q1]); Sie müssen daher jede Zone einzeln bedienen.

### 5.4 Wie man Erfolg erkennt

| Was das Licht bewirkt                                             | Bedeutung                                                                                                                                                                               |
| ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Blinkt nach dem Antippen von „Link“ dreimal langsam.              | Verknüpfung erfolgreich \[Q1]                                                                                                                                                           |
| Blinkt nach dem Tippen auf „Verknüpfung aufheben“ 10 Mal schnell. | Link entfernt \[Q1]                                                                                                                                                                     |
| Kein Blinzeln                                                     | Prozess fehlgeschlagen – wiederholen \[Q1]                                                                                                                                              |
| Die Farbe ändert sich beim erneuten Einschalten.                  | Sie haben zu kurz gewartet (etwa 5 Sekunden); die Lampe hat auf die nächste Farbe umgeschaltet \[Q2]. Kein Problem – schalten Sie sie erneut aus und warten Sie mindestens 10 Sekunden. |

### 5.5 Kurzfassung zum Ausdrucken

| Schritt        | LINK                                                   | UNLINK                                                           |
| -------------- | ------------------------------------------------------ | ---------------------------------------------------------------- |
| 1              | App: 433 Gateway → Verbinden/Trennen                   | App: 433 Gateway → Verbinden/Trennen                             |
| 2              | Wählen Sie eine Zone (z. B. Zone1)                     | Wählen Sie dieselbe Zone wie beim Verknüpfen.                    |
| 3              | Licht aus – 10–15 Sekunden warten                      | Licht aus – 10–15 Sekunden warten                                |
| 4              | Licht an                                               | Licht an                                                         |
| 5              | Innerhalb von 3 Sekunden: Tippen Sie auf „Verknüpfen“. | Innerhalb von 3 Sekunden: Tippen Sie auf „Verknüpfung aufheben“. |
| 6              | Licht blinkt 3× LANGSAM = fertig                       | Die Leuchte blinkt 10 Mal schnell = fertig                       |
| Kein Blinzeln? | → Wiederhole ab Schritt 3.                             | → Wiederhole ab Schritt 3.                                       |

### 5.6 Ihr Zonenplan (bitte ausfüllen)

| Zone   | Licht(er) – Standort | Schalter/Stecker | Verlinkt auf | Erfolgreich getestet? |
| ------ | -------------------- | ---------------- | ------------ | --------------------- |
| Zone 1 |                      |                  |              | ☐                     |
| Zone 2 |                      |                  |              | ☐                     |
| Zone 3 |                      |                  |              | ☐                     |
| Zone 4 |                      |                  |              | ☐                     |
| Zone 5 |                      |                  |              | ☐                     |
| Zone 6 |                      |                  |              | ☐                     |
| Zone 7 |                      |                  |              | ☐                     |
| Zone 8 |                      |                  |              | ☐                     |

---

## 6. Teil E – Bedienung der Lampe mit der App

1. Tippen Sie in der Geräteliste auf **„433 Gateway“** .
2. **Wählen Sie zuerst die Zone aus** ("Zone" unten links). Ohne die richtige Zone reagiert nichts: "Bitte wählen Sie die verknüpfte Zone aus, sonst können die Lampen nicht gesteuert werden." \[Q1].
3. Dem Handbuch zufolge stehen dann folgende Optionen zur Verfügung \[Q1]:
   - **Ein/Aus** (EIN/AUS),
   - **Helligkeit und Sättigung** über Schieberegler („Dimmbare Helligkeit/Sättigung“),
   - **Farben** aus dem Farbkreis („16 Millionen Farben zur Auswahl“)
   - **Weißes Licht** mit einstellbarer Farbtemperatur von Warmweiß bis Kaltweiß ("Farbtemperatur 2700K\~6500K") – hierfür in den Weißlichtmodus ("Weißes Licht") schalten.
   - **Dynamische Modi** (Farbwechselprogramme) mit Geschwindigkeit: „Geschwindigkeit+ unter dynamischer Modus anklicken. Geschwindigkeit- unter dynamischer Modus anklicken.“ Die Leuchte kennt neun Programme, in der deutschen Bedienungsanleitung beispielsweise „Karneval“, „Automatischer Farbwechsel“, „Edelstein“, „Dämmerung“ \[Q2].
   - **Timer** (Zeitschaltuhr für Ein- und Ausschalten der Beleuchtung) für zeitgesteuertes Ein- und Ausschalten.
4. **Sie bedienen mehrere Zonen nacheinander:** Zone wechseln, anpassen, nächste Zone.

> \[!TIPP] **Hinweis zum Lichtschalter:** Schalten Sie das Licht am besten immer über die App ein und lassen Sie es eingeschaltet. Bei einer nur kurzzeitigen Stromunterbrechung kann sich die Farbe des Lichts beim Wiedereinschalten ändern (siehe 5.1) \[Q2]. Die Verbindung zum Gateway geht dabei nicht verloren – schließlich beginnt der Verbindungsvorgang bereits mit dem Ausschalten des Lichts \[Q1].

---

## 7. Teil F – Verknüpfung entfernen (Unlink)

Erforderlich, wenn eine Lampe in eine andere Zone versetzt werden soll, wenn Sie das Gateway austauschen oder wenn bei der Verbindung etwas schiefgelaufen ist.

1. App → **433 Gateway** → **Link/Unlink** .
2. **Wählen Sie genau die Zone aus, mit der die Leuchte verbunden war.** Die Bedienungsanleitung der Fernbedienung weist ausdrücklich darauf hin: „Zum Trennen der Verbindung muss dieselbe Zone verwendet werden wie zum Verbinden.“ \[Q3]; die Bedienungsanleitung des Gateways: „Bitte wählen Sie den Verbindungskanal aus.“ \[Q1]. Falls Sie die Zone nicht mehr kennen, versuchen Sie es nacheinander mit den Zonen.
3. Licht ausschalten, 10–15 Sekunden warten, Licht wieder einschalten \[Q1].
4. **Tippe innerhalb von 3 Sekunden auf „Verknüpfung aufheben“** \[Q1].
5. Die Leuchte **blinkt 10 Mal schnell** = Verbindung getrennt: „Die Verbindung wurde getrennt, sobald die Leuchte 10 Mal schnell blinkt.“ \[Q1]. Blinkt sie nicht schnell, wiederholen Sie den Vorgang ab Schritt 3 („Wenn die Leuchte nicht schnell blinkt, ist die Trennung fehlgeschlagen.“ \[Q1]). Eine nicht verbundene Leuchte kann nicht erneut getrennt werden: „Die getrennte Leuchte kann nicht erneut getrennt werden.“ \[Q1].
6. Anschließend können Sie die Leuchte wieder anschließen (Teil D), zum Beispiel in einer anderen Zone.

---

## 8. Teil G – Falls Sie auch die Fernbedienung FUT086 besitzen

Die Fernbedienung ist nicht unbedingt notwendig, aber praktisch (zum Beispiel für Gäste ohne die App). Es gibt zwei Möglichkeiten, sie mit dem System zu verbinden.

### 8.1 Direkte Verbindung der Leuchte mit der Fernbedienung

Dies funktioniert genau wie beim Gateway, nur dass Sie anstelle der "Link"-Taste in der App die **"I"-Taste (Ein)** der Fernbedienung verwenden \[Q3]:

1. Wählen Sie auf der Fernbedienung die gewünschte Zonentaste (1–8).
2. „Schalte das Licht aus und schalte es nach 10 Sekunden wieder ein.“ \[Q3].
3. „Drücken Sie die Taste „I“ dreimal innerhalb von 3 Sekunden, während die Leuchte eingeschaltet ist.“ \[Q3].
4. Erfolg: „Die Beleuchtung blinkt dreimal langsam“ \[Q3].
5. Entkopplung: gleiche Zone, Licht 10 Sekunden lang aus, an, "Drücken Sie die "I"-Taste 5 Mal innerhalb von 3 Sekunden" → "blinkt 10 Mal schnell" \[Q3].

Eine Leuchte kann sich bis zu vier Sender merken \[Q3] – zum Beispiel das Gateway und bis zu drei Fernbedienungen, die jeweils separat miteinander verbunden sind.

### 8.2 Komfortabler: Das Gateway „lernt“ die Fernbedienung

Wenn Ihre Lampen bereits mit der Fernbedienung verbunden sind, müssen Sie sie **nicht** erneut mit dem Gateway verbinden. Das Gateway kann die „Identität“ der Fernbedienung übernehmen und ist somit für die Lampen nicht mehr von ihr zu unterscheiden: „Das Gateway kopiert die Fernbedienungs-ID, sodass es keinen Unterschied zwischen Gateway- und Fernbedienungs-ID gibt; nach der Verbindung mit der Fernbedienung kann das Gateway die Lampen direkt steuern, ohne dass eine erneute Verbindung erforderlich ist.“ \[Q1].

1. App → **433 Gateway** → Tippen Sie auf die Schaltfläche **„Lernen“** . Die Kontrollleuchte des Gateways blinkt: „Klicken Sie auf die Schaltfläche „Lernen“, die Geräteanzeigelampe blinkt.“ \[Q1].
2. Drücken Sie **innerhalb von 10 Sekunden** eine beliebige Taste auf dem FUT086: „Drücken Sie innerhalb von 10 Sekunden eine beliebige Taste auf der Fernbedienung. Die App wird Ihnen dann mitteilen, dass das Lernen erfolgreich war.“ \[Q1].
3. Die App meldet Erfolg. Ab sofort reagieren alle mit der Fernbedienung verbundenen Lampen auch auf die App – in denselben Zonennummern wie auf der Fernbedienung.

> \[!NOTE] Dies funktioniert nur mit dem FUT086: "Hinweis: Derzeit wird nur das Fernlernen für den FUT086 433MHz unterstützt." \[Q1].

> \[!WARNUNG] **Gateway-Identität zurücksetzen:** Um die gespeicherte Identität zu löschen (z. B. beim Verkauf der Fernbedienung), drücken Sie **die Taste „SET“ am Gateway fünfmal kurz** . Die Kontrollleuchte blinkt dreimal: „Fünfmal kurz die Taste „SET“ am Gateway drücken; Wiederherstellung erfolgreich, nachdem die Kontrollleuchte dreimal geblinkt hat.“ \[Q1]. **Achtung:** Danach kennt das Gateway nur noch seine eigene Identität. Alle Leuchten, die nur über die gespeicherte Identität erreichbar waren, müssen neu verknüpft werden (Teil D).

---

## 9. Fehlerbehebung – wenn etwas nicht funktioniert

| NEIN. | Problem                                                                       | Wahrscheinliche Ursache                                                                                                              | Was Sie tun können                                                                                                                                                                                                                                                                                                                                 |
| ----- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Die App findet das Gateway beim Hinzufügen nicht.                             | Das Telefon ist mit dem 5-GHz-WLAN verbunden; das Gateway befindet sich nicht im Kopplungsmodus; es ist zu weit vom Router entfernt. | Stellen Sie das Telefon auf das 2,4-GHz-WLAN \[Q1] ein; deaktivieren Sie vorübergehend das 5-GHz-Netzwerk am Router, falls beide Netzwerke denselben Namen haben; platzieren Sie das Gateway neben dem Router; halten Sie die SET-Taste gedrückt, bis die Kontrollleuchte blinkt (bei der WL-Box1: 3 Sekunden \[Q6]); starten Sie den Vorgang neu. |
| 2     | Das WLAN-Passwort wird nicht akzeptiert.                                      | Tippfehler, Groß-/Kleinschreibung                                                                                                    | Überprüfen Sie das Passwort auf dem Router (Aufkleber) und geben Sie es langsam erneut ein.                                                                                                                                                                                                                                                        |
| 3     | Gateway wird als "offline" angezeigt.                                         | Kein Strom; WLAN-Verbindung unterbrochen; Router hat das 2,4-GHz-Band abgeschaltet.                                                  | Stromversorgung prüfen (Kontrollleuchte?); Geräteliste aktualisieren \[Q1]; Router-Einstellung „2,4 GHz“ prüfen; Gateway für 10 Sekunden vom Stromnetz trennen und neu starten                                                                                                                                                                     |
| 4     | Gateway steht auf Metall oder in der Sonne                                    | Reichweitenbeeinträchtigt                                                                                                            | Standort ändern \[Q1]                                                                                                                                                                                                                                                                                                                              |
| 5     | Die Leuchte blinkt nach dem „Link“ nicht.                                     | Ausschaltzeit zu kurz; „Verbinden“ später als 3 Sekunden betätigt; falsche Zone; Licht bereits verbunden                             | 10–15 Sekunden ausschalten, dann direkt nach dem Einschalten auf \[Q1] tippen; falls bereits verbunden: Verbindung zuerst trennen (Teil F); Tipp aus der Anleitung: Kompatibilität prüfen, Verbindungsstatus prüfen, \[Q1] wiederholen                                                                                                             |
| 6     | Die Lampe ändert ihre Farbe nur beim Einschalten.                             | Die Pause betrug etwa 5 Sekunden.                                                                                                    | Normales Verhalten der Lampe \[Q2]; schalten Sie sie wieder aus und warten Sie mindestens 10 Sekunden.                                                                                                                                                                                                                                             |
| 7     | Die Lampe reagiert nicht auf die App, obwohl die Verbindung funktioniert hat. | In der App wurde die falsche Zone ausgewählt.                                                                                        | Tippen Sie unten links auf „Zone“ und wählen Sie die richtige Zone \[Q1].                                                                                                                                                                                                                                                                          |
| 8     | Mehrere Lichter leuchten unterschiedlich oder „nicht synchron“.               | Die Leuchten befinden sich in unterschiedlichen Zonen, oder eine Leuchte hat den Befehl (Reichweite) nicht erhalten.                 | Verbinden Sie jede Leuchte in derselben Zone einzeln neu (vorher die Verbindung trennen); bringen Sie das Gateway näher an den Pool (max. 50 m; für Unterwasserbetrieb max. 0,5 m Tiefe für volle Reichweite \[Q1]). Dieses Problem wurde auch von PW01-Nutzern im MiBoxer-Forum beschrieben \[Q9].                                                |
| 9     | Licht kann nicht "entkoppelt" werden.                                         | Falsche Zone; die Lampe war überhaupt nicht angeschlossen.                                                                           | Zone wechseln und wiederholen \[Q3]; „Das nicht verbundene Licht kann nicht wieder entkoppelt werden.“ \[Q1]                                                                                                                                                                                                                                       |
| 10    | Die Lampe reagiert weder auf die App noch auf die Fernbedienung.              | Kein Strom an der Ampel; Ampel zu weit entfernt / zu tief                                                                            | Stromversorgung prüfen (Elektriker); Entfernung und Wassertiefe prüfen \[Q1]                                                                                                                                                                                                                                                                       |
| 11    | Reichweite zu kurz                                                            | Einfahrt hinter Metall, in einem Keller mit dicken Wänden                                                                            | Verschieben Sie das Gateway \[Q1]; die 50 m gelten bei einer Wassertiefe von 0,5 m \[Q1]                                                                                                                                                                                                                                                           |
| 12    | Die App "MiBoxer" lässt sich nicht installieren / stürzt ab                   | Der Hersteller betrachtet die App als ältere Generation \[Q8].                                                                       | Prüfen Sie im Store, ob ein App-Update verfügbar ist; alternativ können Sie „MiBoxer Smart“ oder „Smart Life“ ausprobieren (Händlerinformationen \[Q4]); im Garantiefall: Wenden Sie sich an den MiBoxer-Kundendienst \[Q8].                                                                                                                       |
| 13    | Nach dem Zurücksetzen des Gateways (5×) reagieren die Lichter nicht mehr.     | Die gelernte Fernbedienungsidentität wurde gelöscht \[Q1]                                                                            | Verbinden Sie die Leuchten erneut (Teil D) oder programmieren Sie die Fernbedienung neu (8.2).                                                                                                                                                                                                                                                     |

---

## 10. Teil I – Weitere Funktionen (optional)

- **Teilen Sie das Gerät mit Familienmitgliedern:** Öffnen Sie in der App das Menü oben links → **„Meine Freigaben“** → **„Freigabe hinzufügen“** . Hinweis aus dem Handbuch: Wer ein freigegebenes Gerät erhält, kann es nicht weiterverbreiten; wird das Gerät gelöscht, verschwindet es auch für die Freunde \[Q1].
- **Sprachsteuerung (Alexa, Google):** Öffnen Sie in der App das Menü oben links und lesen Sie die Anweisungen; suchen Sie in der Sprachassistenten-App nach dem Skill/Dienst **„Mi-Light Smart“** \[Q1].
- **DMX512-Anschluss:** Das Gateway verfügt außerdem über einen Eingang für professionelle Lichtsteuerpulte („Set DMX“ in der App) \[Q1]. Für die normale Nutzung der App ist dieser Anschluss nicht erforderlich.

---

## 11. Häufig gestellte Fragen

**Muss sich das Telefon im selben WLAN befinden, um die Lampe zu betreiben?** Nein – nur für die Einrichtung. Anschließend funktioniert der Betrieb laut Handbuch „über WLAN oder 4G-Netz“ \[Q1], also auch unterwegs über das Mobilfunknetz. Voraussetzung: Gateway und Router müssen mit Strom und Internet verbunden sein.

**Wie viele Lampen kann ich anschließen?** Das Gateway verfügt über 8 Zonen \[Q1]; pro Zone ist eine beliebige Anzahl von Lampen möglich \[Q3].

**Kann ich mehrere Zonen gleichzeitig schalten?** Nein, das Gateway unterstützt keine Gruppensteuerung \[Q1]. Wenn Sie alle Lampen gleichzeitig schalten möchten, müssen Sie sie in dieselbe Zone einordnen.

**Was passiert bei einem Stromausfall?** Die Verbindung bleibt erhalten – sie ist in der Leuchte gespeichert, und der Verbindungsvorgang beginnt bereits beim Ausschalten \[Q1]. Nach kurzen Unterbrechungen kann die Leuchte mit einer anderen Farbe starten (siehe 5.1) \[Q2]; stellen Sie sie dann einfach über die App wieder ein. Nach dem Neustart verbindet sich das Gateway automatisch wieder mit dem WLAN – ziehen Sie gegebenenfalls die Geräteliste nach unten, um sie zu aktualisieren \[Q1].

**Ich habe ein neues Handy.** Installieren Sie die App, melden Sie sich mit demselben Konto an – das Gateway funktioniert wieder. Deshalb sollten Sie Ihre Anmeldedaten aufbewahren.

**Ich habe ein neues Gateway.** Die Leuchten kennen das alte Gateway; verbinden Sie sie mit dem neuen (Teil D). Falls die Leuchte bereits mit vier Sendern verbunden ist \[Q3], entfernen Sie zuerst eine Verbindung (Teil F).

**Wie weit unter Wasser darf die Leuchte sein?** Die Reichweitenangabe von 50 m gilt für Leuchten bis zu 0,5 m unter der Wasseroberfläche \[Q1]\[Q5]. Tiefer installierte Leuchten sind möglicherweise schwerer zu erreichen – platzieren Sie den Zugang in diesem Fall näher am Pool.

---

## 12. Glossar

| Wort in der App / im Handbuch                      | Bedeutung                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Registrieren                                       | Registrieren (ein Konto erstellen)                                                               |
| Einloggen                                          | Anmelden (registrieren)                                                                          |
| Geräteliste                                        | Liste Ihrer Geräte                                                                               |
| 433 Gateway                                        | Ihr WL-433-Gateway                                                                               |
| Verknüpfen / Verknüpfen aufheben                   | Link / Link entfernen                                                                            |
| Zone                                               | Zone ("Schublade" 1–8 für Leuchten)                                                              |
| Lernen                                             | Die Fernbedienung mit dem Gateway verbinden                                                      |
| SATZ                                               | Taste am Gateway (5× kurz = Identität zurücksetzen; gedrückt halten = Kopplungsmodus, siehe 4.). |
| Weißes Licht                                       | Weißlichtmodus (Farbtemperatur)                                                                  |
| Dynamikmodus / Geschwindigkeit+ / Geschwindigkeit– | Farbwechselprogramm / schneller / langsamer                                                      |
| Timer                                              | Zeitschalter                                                                                     |
| Meine Freigabe / Freigabe hinzufügen               | Meine Anteile / Anteil hinzufügen                                                                |
| Nach unten ziehen, um die Seite zu aktualisieren   | Ziehen Sie die Liste nach unten, um sie zu aktualisieren.                                        |

---

## 13. Quellen

- **\[Q1]** MiBoxer: LoRa 433MHz Gateway, Modellnr.: WL-433 – Benutzerhandbuch, Version V1.0.1 (Englisch). <https://miboxer.com/light/download/manual/WL-433.pdf> (Spiegelkopie: <https://www.ledbe.com/image/catalog/MiBoxer/WL433/MiBoxer-WL-433-MHz-Gateway-User-Manual.pdf> )
- **\[Q2]** MiBoxer: Bedienungsanleitung PW01/PW02, Version V1.0 (Deutsch). <https://miboxer.com/light/m_n/pdf/PW01_PW02/PW01-PW02_DE_V1.0.pdf> (Englisch: …/PW01-PW02\_EN\_V1.0.pdf)
- **\[Q3]** MiBoxer: FUT086 LoRa 433MHz Fernbedienung – Bedienungsanleitung, Version V1.0 (Deutsch). <https://miboxer.com/light/m_n/pdf/FUT086/FUT086_DE_V1.0.pdf>
- **\[Q4]** Future House Store (Händler): MiBoxer 433MHz Gateway WL-433 – Lieferumfang („1× MiBoxer WL-433 433MHz LoRa Gateway • Benutzerhandbuch“, „Ein 5V-Gleichstromnetzteil wird benötigt (nicht im Lieferumfang enthalten)“), App-Informationen „Tuya Smart / Smart Life“. <https://futurehousestore.co.uk/miboxer-lora/miboxer-433mhz-gateway-wl-433>
- **\[Q5]** MiBoxer: Produktseite 27W RGB+CCT PAR56 LED-Poolleuchte (LoRa 433MHz), PW01. <https://miboxer.com/product/27w-rgbcct-par56-led-pool-light-lora-433mhz>
- **\[Q6]** MiBoxer: WL-Box1 – Benutzerhandbuch (Schwestergerät; SET-Taste 3 Sekunden gedrückt halten = Kopplungsmodus, Kontrollleuchtentabelle). <https://miboxer.com/light/download/manual/WL-Box1.pdf>
- **\[Q7]** Apple App Store: MiBoxer (ID 1460445992; Herausgeber: Shenzhen Xincaiyi Technology Co., Ltd.). <https://apps.apple.com/us/app/miboxer/id1460445992> ; Google Play: `com.futlight.miboxer`
- **\[F8]** MiBoxer: FAQ („Warum funktioniert meine App nicht mehr? (Mi-Light 3.0 App, Mi-Light Cloud App, Miboxer App)“). <https://miboxer.com/faq>
- **\[Q9]** MiBoxer-Forum: Fernbedienung FUT086 verbindet sich nicht korrekt mit LED-Poolleuchte PW01 (Nutzerbericht 2026). <https://forum.miboxer.com/t/fut086-remote-not-linking-up-properly-with-pw01-led-pool-light/251>
- **\[Q10]** Video (nicht verifiziert, aus den Suchergebnissen): Wie koppelt man ein WLAN-Netzwerk für das Miboxer WL433 Gateway? <https://www.youtube.com/watch?v=vIcAFJFyUxs>

> \[!HINWEIS] **Hinweis zur Zuverlässigkeit:** Die Schritte zum Koppeln (Zeiten, Blinkmuster, Zonen) wurden wörtlich aus den Herstellerhandbüchern übernommen. Nicht im Handbuch des WL-433 beschrieben – und daher vom Schwestergerät WL-Box1 oder aus der allgemeinen Praxis abgeleitet – sind: die genaue Funktion der SET-Taste für den WLAN-Kopplungsmodus, die Bedeutung der Blinkmuster der Kontrollleuchte und die Empfehlung, die Leuchten einzeln zu koppeln. Die App führt Sie durch die WLAN-Kopplung; im Zweifelsfall haben die angezeigten Informationen Vorrang vor dieser Anleitung.