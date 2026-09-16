---
title:       "Benachrichtigungen"
lastChanged: "08.09.2026"
---

# Benachrichtigungen

Ein Adapter merkt Dinge, die der Benutzer wissen sollte: das Zertifikat läuft
ab, die Anmeldung am Dienst wurde abgelehnt, die Festplatte des Zielservers ist
voll. Das gehört nicht ins Log, wo es niemand sieht, und auch nicht in einen
Zustand, den niemand abonniert hat.

Dafür gibt es das Benachrichtigungssystem des js-controller. Es sammelt solche
Meldungen, zeigt sie im Admin und stellt sie Adaptern zur Verfügung, die sie
weiterleiten.

## Wie der Benutzer sie sieht

Im Admin, Reiter **Hosts**, trägt der Host ein Zeichen mit der Anzahl offener
Meldungen. Ein Klick öffnet den Dialog *Hostspezifische Benachrichtigungen*: ein
Reiter je Kategorie, darin die Meldungen nach Instanz gruppiert, jede mit
Zeitstempel. Ein Knopf **Bestätigen** räumt die Kategorie ab.

Das System kennt selbst schon eine ganze Reihe Kategorien, alle im Bereich
*System-Benachrichtigungen*: zu wenig Arbeitsspeicher, zu wenig Plattenplatz,
Dateisystemfehler, Instanzen in der Neustartschleife, fehlgeschlagene
automatische Aktualisierungen und einiges mehr.

Der Adapter [notification-manager](/adapters/notification-manager) leitet diese
Meldungen weiter, zum Beispiel per Telegram oder E-Mail. Damit wird aus dem
Dialog, den man ansehen muss, eine Nachricht, die einen erreicht.

## Eigene Kategorien anmelden

Ein Adapter, der eigene Meldungen erzeugen will, beschreibt seine Kategorien in
der `io-package.json` unter `notifications`. Der Aufbau ist zweistufig: ein
**Bereich** (*scope*) mit mehreren **Kategorien**.

```json
"notifications": [
  {
    "scope": "meinAdapter",
    "name": {
      "en": "My adapter",
      "de": "Mein Adapter"
    },
    "description": {
      "en": "Notifications of my adapter",
      "de": "Meldungen meines Adapters"
    },
    "categories": [
      {
        "category": "loginFailed",
        "name": {
          "en": "Login rejected",
          "de": "Anmeldung abgelehnt"
        },
        "description": {
          "en": "The service rejected the stored credentials.",
          "de": "Der Dienst hat die hinterlegten Zugangsdaten abgelehnt."
        },
        "severity": "alert",
        "regex": [],
        "limit": 3
      }
    ]
  }
]
```

Die Felder einer Kategorie:

| Feld | Bedeutung |
| ---- | --------- |
| `category` | Die Kennung, mit der die Meldung später abgesetzt wird. |
| `name` | Der Name, mehrsprachig. Erscheint als Reiterbeschriftung im Dialog. |
| `description` | Was die Kategorie bedeutet, mehrsprachig. Steht als Erklärung über den Meldungen. |
| `severity` | `info`, `notify` oder `alert`, in dieser Reihenfolge steigend. |
| `regex` | Muster, gegen die Fehlerausgaben geprüft werden. Trifft eines zu, entsteht die Meldung von selbst. Leeres Array, wenn die Meldung nur aus dem Code kommt. |
| `limit` | Wie viele Meldungen dieser Kategorie höchstens aufbewahrt werden. |

Zur Wahl der Stufe: `alert` ist für Dinge gedacht, um die sich jemand kümmern
muss, damit das System weiterarbeitet. `notify` für Dinge, die man wissen
sollte. `info` für alles Übrige. Wer alles zu `alert` erklärt, erreicht damit
nur, dass der Benutzer den Dialog irgendwann ungelesen abräumt.

## Eine Meldung absetzen

Zur Laufzeit genügt ein Aufruf:

```js
await this.registerNotification('meinAdapter', 'loginFailed',
    'Die Anmeldung wurde abgelehnt. Bitte Zugangsdaten prüfen.');
```

Die drei Angaben sind der Bereich, die Kategorie und der Text für den Benutzer.
Der Text sollte sagen, was zu tun ist, nicht nur, was schiefging.

Wird als Kategorie `null` übergeben, prüft das System die Meldung gegen die
`regex`-Muster des Bereichs und sortiert sie selbst ein.

Ein vierter Parameter kann Zusatzangaben mitgeben (`contextData`), die
weiterleitende Adapter auswerten können.

## Was in eine Benachrichtigung gehört und was nicht

!> Eine Benachrichtigung ist keine zweite Protokollzeile. Sie bleibt stehen, bis
jemand sie bestätigt, und sie taucht bei allen auf, die den Weiterleiter
eingerichtet haben. Was bei jedem Durchlauf entstehen kann, gehört ins Log.

Sinnvoll sind Meldungen, die eine Handlung des Benutzers verlangen und die er
sonst nicht bemerkt: abgelaufene Zugangsdaten, ein Gerät, das dauerhaft nicht
mehr antwortet, eine Konfiguration, die seit einer Aktualisierung nicht mehr
gültig ist.

Nicht sinnvoll sind vorübergehende Störungen. Eine Verbindung, die sich nach
zehn Sekunden von selbst wieder aufbaut, gehört ins Log und in
`info.connection`, nicht in den Benachrichtigungsdialog.

## Abgrenzung

Es gibt drei Wege, auf denen ein Adapter etwas mitteilen kann, und sie werden
gern verwechselt:

| Weg | Wofür |
| --- | ----- |
| **Log** | Der Verlauf. Für die Fehlersuche, nicht für den Benutzer. |
| **Zustände** | Der aktuelle Stand, etwa `info.connection`. Wird laufend überschrieben. |
| **Benachrichtigungen** | Einzelne Ereignisse, die eine Handlung verlangen und bis zur Bestätigung stehen bleiben. |

Absturzmeldungen sind noch einmal etwas anderes: die gehen an den Entwickler,
nicht an den Benutzer. Siehe
[Absturzmeldungen](/docs/ecosystem/sentry.md).
