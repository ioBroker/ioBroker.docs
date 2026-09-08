---
chapters: {"pages":{"de/adapterref/iobroker.nut2/README.md":{"title":{"de":"ioBroker.nut2 — Einrichtung"},"content":"de/adapterref/iobroker.nut2/README.md"},"de/adapterref/iobroker.nut2/datapoints.md":{"title":{"de":"Datenpunkte"},"content":"de/adapterref/iobroker.nut2/datapoints.md"},"de/adapterref/iobroker.nut2/faq.md":{"title":{"de":"Häufige Fragen"},"content":"de/adapterref/iobroker.nut2/faq.md"}}}
---
# Häufige Fragen

## Im Log steht, meine Zugangsdaten seien abgelehnt worden, aber die Instanz ist grün und die Werte sind aktuell. Was denn nun?

Beides, und es widerspricht sich nicht.

Zum Lesen der USV-Werte braucht NUT keine Anmeldung. Die Anmeldung ist ein eigener Schritt, den der Adapter einmal beim
Start auf einer kurzen zweiten Verbindung ausführt — ausschließlich, um Ihnen zu sagen, ob die Zugangsdaten
funktionieren. Lehnt der Server sie ab, läuft die Überwachung unbeeindruckt weiter; nur das Schalten einer USV und das
Schreiben einer Variablen werden verweigert.

Die Instanz bleibt grün, weil `info.connection` die **Verbindung zum NUT-Server** meldet, und die steht und liefert.
Eine orange Instanz neben frischen Werten wäre die verwirrende Antwort, nicht die ehrliche.

Die übliche Ursache ist eine fehlende Zeile in der `upsd.users` des Servers: Eine Anmeldung verlangt `upsmon secondary`
(oder `upsmon primary`) für diesen Benutzer. Ergänzen behebt die Meldung. `upsd` beantwortet ein falsches Passwort und
eine fehlende `upsmon`-Zeile mit derselben Ablehnung, deshalb nennt der Adapter beide Möglichkeiten.

## Warum bleibt der Adapter nicht einfach angemeldet?

Weil `upsd` Anmeldungen zählt und ein primärer `upsmon` diesen Zähler beim Stromausfall benutzt: Bevor er seinen
Rechner herunterfährt, wartet er, bis außer seiner eigenen keine Anmeldung mehr übrig ist. Ein Überwachungsclient, der
dauerhaft in diesem Zähler steht, würde eine Abschaltung im Batteriebetrieb verzögern. Die reinen Lesewerkzeuge von NUT
(`upsc`, `upscmd`, `upsrw`) melden sich aus demselben Grund nie an.

## Ich will von einem Stromausfall sofort erfahren, nicht beim nächsten Abruf.

Nicht das Abfrageintervall senken — NUT hat keinen Server-Push, ein schnellerer Abruf fragt nur öfter. Die Komponente,
die Ereignisse im Moment des Geschehens kennt, ist `upsmon`, NUTs eigener Überwachungsclient. Er führt über `NOTIFYCMD`
ein Programm Ihrer Wahl aus und übergibt ihm Ereignistyp und USV-Namen.

Dieses Programm auf den beschreibbaren Datenpunkt `nut2.0.notify` zeigen lassen:

```bash
#!/bin/sh
# /etc/nut/notify.sh — wird von upsmon aufgerufen
curl -s -X PATCH "http://IOBROKER:8087/v1/state/nut2.0.notify" \
     -H "Content-Type: application/json" \
     -d "{\"val\": \"$NOTIFYTYPE $UPSNAME\", \"ack\": false}"
```

Und in der `upsmon.conf`:

```
NOTIFYCMD /etc/nut/notify.sh
NOTIFYFLAG ONBATT   SYSLOG+EXEC
NOTIFYFLAG ONLINE   SYSLOG+EXEC
NOTIFYFLAG LOWBATT  SYSLOG+EXEC
NOTIFYFLAG SHUTDOWN SYSLOG+EXEC
```

Jeder Schreibvorgang auf `nut2.0.notify` löst eine sofortige Abfrage aller USVen aus; ein leerer Wert ist schlicht eine
Aktualisierung von Hand. Passt der USV-Name zu einem erkannten Gerät, wird das Ereignis zusätzlich in dessen
`info.notify` geschrieben — so kann ein Skript je USV reagieren, etwa auf `SHUTDOWN`.

Das Ereignis wird bewusst **vor** der Abfrage festgehalten: Bei einem Abschalt-Ereignis kann der NUT-Rechner mitten in
der Abfrage sterben.

## Der Kanal `commands` erscheint nicht, obwohl ich Befehle aktiviert habe.

Befehle brauchen Zugangsdaten. `upsd` prüft Befehlsrechte (`instcmds`) gegen einen benannten Benutzer — ohne Benutzer
und Passwort gibt es nichts zu prüfen, und es werden keine Tasten angelegt. Seit Version 0.14.0 sagt der Adapter das
im Log, statt zu schweigen.

Sind Zugangsdaten hinterlegt und der Kanal fehlt trotzdem, meldet Ihr USV-Treiber keine Befehle (`upscmd -l ups0` am
Server listet sie auf).

## Ich habe einen Datenpunkt im Objektbaum umbenannt, und der Name kam zurück.

Das ist so gewollt. Name und Beschreibung seiner Datenpunkte gehören dem Adapter genauso wie deren Typ und Rolle, und
ein Treiber- oder Adapter-Update muss sie korrigieren können. Der Platz für eigene Benennung ist `0_userdata` oder ein
Alias.

Ihre Aufzeichnungseinstellungen sind die ausdrückliche Ausnahme — die gehören Ihnen, werden nie überschrieben und
wandern sogar mit, wenn der Adapter einen eigenen Datenpunkt umbenennt.

## Eine USV ist aus dem Objektbaum verschwunden.

Der Adapter liest die USV-Liste bei jeder Abfrage neu. Meldet der NUT-Server eine USV nicht mehr, werden ihre Objekte
entfernt; kommt sie zurück, werden sie neu angelegt. So erscheint eine am Server hinzugefügte oder entfernte USV, ohne
den Adapter neu zu starten.

## Der Verbindungstest sagt „unverschlüsselt", obwohl ich TLS aktiviert habe.

Dann hat der Handshake nicht stattgefunden, und der Test meldet, was tatsächlich passiert ist, statt was eingestellt
war. Die üblichen Ursachen: Der NUT-Server wurde ohne TLS-Unterstützung gebaut, oder er hat kein `CERTFILE`/`CERTPATH`
in der `upsd.conf`. In beiden Fällen lehnt `upsd` das `STARTTLS` ab, und der Test sagt es.

## Ich habe eine CA-Datei gesetzt, dann die strenge Prüfung abgeschaltet — und der Adapter ging auf Gelb.

Das war ein Fehler und ist in 0.14.0 behoben. Die CA-Datei wird jetzt nur noch gelesen, solange **Gültiges Zertifikat
verlangen** wirklich an ist — bei abgeschalteter strenger Prüfung wird kein Zertifikat geprüft, die Datei hat also
keine Aufgabe. Ein Pfad, der von einem früheren Versuch übrig ist, steht einmal im Debug-Log und wird sonst ignoriert.

## Welche Werte kann ich schreiben?

Alles, was Ihr USV-Treiber als schreibbar meldet (`LIST RW`), sobald **SET VAR aktivieren** an ist. Typische Kandidaten
sind `ups.delay.shutdown`, `ups.delay.start` und der Signalton-Status. Wo der Server zusätzlich die erlaubten Werte
oder einen Bereich meldet, bekommt der Datenpunkt eine Auswahlliste oder Minimum/Maximum — die Admin kann Ihnen dann
gar nichts anbieten, was die USV ablehnen würde.

Ja/Nein-Variablen werden als Wahrheitswerte gespeichert und beim Schreiben in das `yes`/`no` zurückübersetzt, das das
Protokoll erwartet.

## Kann eine Instanz mehrere USVen bedienen?

Ja — jede USV, die der NUT-Server anbietet, wird ein eigenes Gerät unter der Instanz und wird automatisch erkannt. Eine
zweite Instanz braucht es nur für einen zweiten NUT-**Server**.

Ein USV-Name, den ioBroker nicht als Objekt-ID verwenden kann (Leerzeichen, Punkte), wird bereinigt; auf dem Protokoll
wird weiter der echte Name benutzt. Fallen zwei Namen auf dieselbe ID zusammen, bekommt der zweite eine Ziffer angehängt
und der Adapter warnt darüber.