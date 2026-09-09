---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.lovelace/docs/en/theme_migration.md
title: Migration von Themes (Frontend-Update 2026)
hash: epwv9g2Vt+yeHfL7xiXktDjalmXvKTk8SASaC0mwUZc=
---
# Migration von Themes (Frontend-Update 2026)

Das Frontend-Update brachte eine komplett überarbeitete Theme-Engine für Home Assistant mit sich. **Bestehende Themes funktionieren weiterhin** – die alten Variablen werden nach wie vor unterstützt. Einige Änderungen können jedoch sichtbare Probleme verursachen. Das häufigste Problem: **weiße Hintergründe für Eingabefelder** .

## Inhalt

- [Das Problem: weiße Eingabefelder](#the-problem-white-input-fields)
- [Schnelle Lösung](#quick-fix)
- [Empfohlene Designvorlage (hell + dunkel)](#recommended-theme-template-light--dark)
- [Was hat sich geändert?](#what-changed)
- [Häufig gestellte Fragen](#faq)

---

## Das Problem: weiße Eingabefelder

Mehrere Eingabeelemente (Textfelder, Auswahllisten, Schieberegler, Schalter, Kontrollkästchen, Zeiteingabefelder usw.) verwenden nun neue Komponenten. Sie übernehmen ihren Hintergrund **nicht mehr** von den alten Komponenten.`--mdc-text-field-fill-color` /`--input-fill-color` Variablen, aber aus einer **neuen Variable** :

```
--ha-color-form-background
```

Die Standardwerte sind:

| Modus  | Standard                | Ergebnis                 |
| ------ | ----------------------- | ------------------------ |
| Licht  | `--ha-color-neutral-95` | ≈`#f3f3f3` (nahezu weiß) |
| Dunkel | `--ha-color-neutral-20` | ≈`#363636` (dunkel)      |

**Wichtig:** Der dunkle Wert gilt nur, **wenn der Dunkelmodus aktiviert ist** .`--ha-color-form-background` folgt **nicht**`--card-background-color` Wenn Ihr Theme also nur festlegt`card-background-color` und die alten`--mdc-text-field-*` Variablen (wie das klassische _Synthwave-_ Thema),`--ha-color-form-background` Bleibt bei der hellen Standardeinstellung → **weiße Felder** , selbst in einem ansonsten dunklen Design.

---

## Schnelle Lösung

Stellen Sie die neue`--ha-color-form-background` Variable (sowie die Varianten „Hover“ und „Deaktiviert“):

```yaml
my_theme:
  ha-color-form-background: 'var(--card-background-color)'          # field background
  ha-color-form-background-hover: 'var(--light-primary-color)'      # on hover
  ha-color-form-background-disabled: 'var(--primary-background-color)'  # disabled
```

Sie können stattdessen auch feste Farben verwenden.`var(...)` z.B.`ha-color-form-background: '#34294f'` Die

### Siehe auch: weiße Ziehharmonikas / Erweiterungspaneele

Der gleiche neue Token-Typ betrifft erweiterte **Akkordeons/Erweiterungspanels** (z. B. im Einstellungspanel des Browser-Mods). Deren Header-Hintergrund verwendet`--ha-color-fill-neutral-normal-active` Standardmäßig werden helle Farben angezeigt. Falls weiße Akkordeon-Überschriften erscheinen, fügen Sie Folgendes hinzu:

```yaml
my_theme:
  ha-color-fill-neutral-normal-active: 'var(--card-background-color)'
  ha-color-fill-neutral-normal-hover: 'var(--light-primary-color)'
```

Im Allgemeinen gilt für alle diese Designs die gleiche Regel: Nur ältere Designs überschreiben nicht die neuen.`--ha-color-*` Tokens werden nur ausgegeben, wenn der Dunkelmodus aktiviert ist (siehe unten).

> Für das _Synthwave_ -Thema genügt es, genau diese drei Zeilen hinzuzufügen – das setzt das Thema bereits.`card-background-color` einfach nicht`ha-color-form-background` Die aktuelle Upstream-Version des Themes setzt diese Variable selbst.

---

## Empfohlene Designvorlage (hell + dunkel)

Damit sowohl helle als auch dunkle Bereiche stimmig wirken, verwenden Sie die`modes` Block. Home Assistant wählt dann automatisch das passende Set aus:

```yaml
my_theme:
  # shared
  primary-color: "#18bcf2"
  accent-color: "#f36d00"
  modes:
    light:
      primary-background-color: "#fafafa"
      card-background-color: "#ffffff"
      secondary-background-color: "#e5e5e5"
      primary-text-color: "#212121"
      secondary-text-color: "#727272"
    dark:
      primary-background-color: "#111111"
      card-background-color: "#1c1c1c"
      secondary-background-color: "#282828"
      primary-text-color: "#e1e1e1"
      secondary-text-color: "#9b9b9b"
      ha-color-form-background: "#1c1c1c"
      ha-color-form-background-hover: "#282828"
      ha-color-form-background-disabled: "#111111"
```

Einstellung`--ha-color-form-background` Die Einstellung pro Modus sorgt dafür, dass die neuen Eingabefelder korrekt eingefärbt werden. Im hellen Modus ist dies normalerweise nicht nötig (die Standardeinstellung für den hellen Modus ist ausreichend); im dunklen Modus (oder bei dunklen Designs ohne diese Einstellung)`modes` ) Es ist erforderlich.

---

## Was hat sich geändert?

### 1. Neues mehrschichtiges Farbsymbolsystem

Es gibt nun drei Ebenen von Farbvariablen:

| Schicht                     | Beispiele                                                                                   | Zweck                                                              |
| --------------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Kern**                    | `--ha-color-primary-50` ,`--ha-color-neutral-90` …                                          | Unverarbeitete Farbpalette. Nicht zur direkten Verwendung gedacht. |
| **Semantisch**              | `--ha-color-text-primary` ,`--ha-color-fill-neutral-normal-resting` ,`--ha-color-surface-*` | Zweckorientierte Farben, abgeleitet vom Farbkern.                  |
| **Legacy (Kompatibilität)** | `--card-background-color` ,`--primary-text-color` ,`--primary-color` …                      | Immer noch vorhanden und immer noch funktionsfähig.                |

Themen, die die alten Variablen festlegen, funktionieren weiterhin. Neue Komponenten lesen jedoch teilweise die Semantik oder`--wa-*` Variablen – die von einem Legacy-Theme nicht überschrieben werden.

### 2.`primary-color` Generiert nun automatisch eine Palette

Wenn ein Thema festgelegt wird`primary-color` Das Frontend generiert nun das vollständige`--ha-color-primary-*` Farbpalette daraus. Also eine einzelne`primary-color` Die Ergebnisse werden in die neuen Variablen übernommen. **Hintergründe/Oberflächen werden NICHT automatisch generiert** – diese müssen manuell festgelegt werden.

### 3. Dunkelmodus

Der Dunkelmodus wendet die dunklen Werte der neuen Farbebenen **nur dann an, wenn der Dunkelmodus tatsächlich aktiv ist** . Ein „dunkel wirkendes“ Design, das im Hellmodus angewendet wird (ohne …), …`modes` ) beginnt mit den **hellen** Standardfarben → weiße Felder. Verwenden Sie also die`modes` Block.

### 4. Interne Dateien entfernt

Intern wurden die alten Dateiformate entfernt und durch ein neues Themesystem ersetzt. Themes, die ausschließlich dokumentierte HA-Variablen verwenden, sind davon nicht betroffen. Themes, die interne Variablennamen kopiert haben, können jedoch fehlerhaft funktionieren.

---

## Häufig gestellte Fragen

**Muss ich mein Theme komplett neu schreiben?** Nein. In den meisten Fällen reicht es, Folgendes hinzuzufügen:`ha-color-form-background` (Plus`-hover` Und`-disabled` ) ist ausreichend.

**Mein Theme war ursprünglich nur dunkel und sieht jetzt teilweise hell aus (weiße Felder).** Das ist der häufigste Fall.`ha-color-form-background` zu einer dunklen Farbe (z. B.`var(--card-background-color)` Optional können die Werte in ein`modes: dark:` Blockieren und Aktivieren des Dunkelmodus, damit die dunklen Standardeinstellungen der neuen Variablen automatisch angewendet werden.

**Wo konfiguriere ich das Theme?** Wie zuvor in den Adaptereinstellungen unter „Themes“ (YAML). Der Adapter übergibt diese Themes unverändert an das Frontend.

**Benötige ich das neue`--ha-color-*` Variablen?** Bei den meisten Themen ist das Hinzufügen von Variablen erforderlich.**`ha-color-form-background`** Das genügt – es ist die eine neue Variable, die fast alle betrifft (weiße Eingabefelder). Die andere`--ha-color-*` Variablen werden nur zur Feinabstimmung benötigt.