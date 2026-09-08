---
title:       "Eigener Adapter"
lastChanged: "08.09.2026"
---

# Einen eigenen Adapter entwickeln

Ein Adapter ist ein Node.js-Programm, das ioBroker startet, überwacht und
konfigurierbar macht. Er verbindet ein Gerät, einen Dienst oder eine Funktion
mit dem Objektbaum: er legt Objekte an, schreibt Werte hinein und reagiert auf
Werte, die andere hineinschreiben.

Alles Weitere ist Handwerk. Wer Node.js kann, kann einen Adapter schreiben. Was
man zusätzlich lernen muss, ist überschaubar und steht in diesem Kapitel.

## Was einen Adapter ausmacht

Ein Adapter ist ein npm-Paket mit einem festgelegten Aufbau. Vier Dateien
tragen die Sache:

| Datei | Wozu |
| ----- | ---- |
| `package.json` | Das normale npm-Manifest: Abhängigkeiten, Startdatei, Skripte. |
| `io-package.json` | Alles, was ioBroker über den Adapter wissen muss: Betriebsart, Konfigurationsoberfläche, Voreinstellungen, Objekte, die bei jeder Instanz angelegt werden. Siehe [io-package.json](/docs/dev/iopackage.md). |
| `main.js` | Das Programm. Wird von ioBroker gestartet, meldet sich an, macht seine Arbeit, räumt beim Beenden auf. |
| `admin/jsonConfig.json` | Die Konfigurationsoberfläche im Admin, beschrieben als JSON statt als HTML. Siehe [JSON-Config](/docs/dev/adapterjsonconfig.md). |

Dazu kommen ein Symbol, die Übersetzungen und die Liesmich-Datei.

## Der Lebenslauf einer Instanz

Ein Adapter wird nicht einmal ausgeführt, sondern als **Instanz** betrieben.
Vom selben Adapter kann es mehrere geben, jede mit eigener Konfiguration und
eigenem Zweig im Objektbaum.

Der übliche Ablauf im Programm:

* **`ready`**: die Instanz startet. Hier werden die Konfiguration gelesen
  (`this.config.<feld>`), die Verbindung aufgebaut und die eigenen Objekte
  angelegt.
* **`stateChange`**: jemand hat einen Wert geschrieben, den die Instanz
  abonniert hat. Meist ein Befehl, der ans Gerät weitergereicht wird.
* **`message`**: eine andere Instanz oder ein Skript schickt einen Auftrag.
  Siehe [Nachrichten zwischen Instanzen](/docs/dev/messagebox.md).
* **`unload`**: die Instanz wird beendet. Timer stoppen, Verbindungen schließen,
  dann den Callback aufrufen. Wer das auslässt, hinterlässt Prozesse, die nicht
  sterben wollen.

Wie eine Instanz gestartet wird, legt `common.mode` fest: dauerhaft laufend
(`daemon`), nach Zeitplan (`schedule`), einmalig (`once`) und einige Sonderfälle
mehr.

## Der Weg von der Idee zum Adapter

**1. Prüfen, ob es ihn schon gibt.** Ein halbfertiger Adapter, der einen
Mitstreiter braucht, ist mehr wert als ein zwölfter Anlauf auf dasselbe Gerät.
Die [Adapterliste](/adapters) und die
[Adapter Requests](https://github.com/ioBroker/AdapterRequests/issues) geben
Auskunft.

**2. Das Gerüst erzeugen.** Der
[Adapter Creator](https://adapter-creator.iobroker.in/) fragt Namen, Art und
Betriebsart ab und liefert ein vollständiges Paket samt Tests und
GitHub-Konfiguration. Auf der Kommandozeile geht dasselbe mit

```bash
npx @iobroker/create-adapter@latest
```

Vorausgesetzt werden Node.js ab Version 18 und npm ab Version 9. Der Pfad, in
dem das läuft, darf keine Leerzeichen enthalten.

**3. Entwickeln und ausprobieren.** Dafür gibt es den
[dev-server](/docs/dev/devserver.md): eine kleine ioBroker-Installation im
Projektordner, die den Adapter bei jeder Codeänderung neu startet. Kein
Hochladen auf ein Produktivsystem, keine kaputte Wohnung.

**4. Testen.** Das Gerüst bringt Tests mit, die den Adapter starten und prüfen,
ob er sich ordentlich anmeldet und beendet. Siehe
[Adaptertests](/docs/dev/adaptertesting.md).

**5. Veröffentlichen.** Erst auf npm, dann ins ioBroker-Repository. Die
Bedingungen dafür stehen unter
[Adapter veröffentlichen](/docs/dev/adapterpublish.md), vorher lohnt ein Lauf
durch den [Adapter Checker](https://adapter-check.iobroker.in/).

## Reihenfolge zum Lesen

Wer noch nie einen Adapter geschrieben hat, liest am besten in dieser
Reihenfolge:

1. [Empfehlungen für die Entwicklung](/docs/dev/bestpractices.md): die
   Grundsätze, die den Unterschied zwischen einem Adapter und einem Skript mit
   Adapternamen ausmachen.
2. [io-package.json](/docs/dev/iopackage.md): was ioBroker über den Adapter
   erfährt.
3. [Zustandsrollen](/docs/dev/stateroles.md): wie ein Wert benannt und
   eingeordnet wird, damit ihn andere Adapter verstehen.
4. [JSON-Config](/docs/dev/adapterjsonconfig.md): die Konfigurationsoberfläche.
5. [Adapterreferenz](/docs/dev/adapterref.md): die Aufrufe im Einzelnen.

## Weiterführende Werkzeuge

| Werkzeug | Wozu |
| -------- | ---- |
| [Adapter Creator](https://adapter-creator.iobroker.in/) | Gerüst über ein Webformular. |
| [Adapter Checker](https://adapter-check.iobroker.in/) | Prüft das Repository gegen die Anforderungen des ioBroker-Repositories. |
| [Translator](https://translator.iobroker.in/) | Übersetzt die Texte des Adapters in die unterstützten Sprachen. |
| `@iobroker/adapter-dev` | Übersetzung und Bau als npm-Skripte im Projekt: `npm run translate`, `npm run build`. |
| [dev-server](/docs/dev/devserver.md) | Entwicklungsumgebung im Projektordner. |

?> Fragen zur Entwicklung gehören ins
[Forum](https://forum.iobroker.net/category/8/entwicklung), nicht in ein Issue
am fremden Adapter. Dort sitzen die Leute, die dieselben Probleme schon hatten.
