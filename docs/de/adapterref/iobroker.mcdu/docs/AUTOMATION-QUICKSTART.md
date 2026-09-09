---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md
title: MCDU-Automatisierung - Schnellstartanleitung
hash: e0QqMV2owuHMkpmoN9SXyqfB1MxWwCL3B0TTaJy/RUU=
---
# MCDU-Automatisierung – Schnellstartanleitung

**Phase 4.1: Wesentliche Zustände für die Automatisierung**

Dieser Leitfaden zeigt Ihnen, wie Sie die 32 neuen Automatisierungszustände nutzen können, um Ihre MCDU über ioBroker-Skripte, Automatisierungen und externe Systeme zu steuern.

---

## 🚀 Kurze Beispiele

### 1. LEDs steuern

```javascript
// Turn on STATUS LED (full brightness)
setState('mcdu.0.leds.STATUS', true);

// Set FAIL LED to 50% brightness
setState('mcdu.0.leds.FAIL', 128);

// Turn off MENU LED
setState('mcdu.0.leds.MENU', false);

// Set backlight to 75%
setState('mcdu.0.leds.BACKLIGHT', 191);
```

### 2. Benachrichtigungen anzeigen

```javascript
// Info notification (white, 3 seconds)
setState('mcdu.0.notifications.type', 'info');
setState('mcdu.0.notifications.message', 'System bereit');

// Warning notification (amber, 5 seconds)
setState('mcdu.0.notifications.type', 'warning');
setState('mcdu.0.notifications.duration', 5000);
setState('mcdu.0.notifications.message', 'BATTERIE SCHWACH');

// Error notification (red, 10 seconds)
setState('mcdu.0.notifications.type', 'error');
setState('mcdu.0.notifications.duration', 10000);
setState('mcdu.0.notifications.message', 'VERBINDUNGSFEHLER');

// Success notification (green)
setState('mcdu.0.notifications.type', 'success');
setState('mcdu.0.notifications.message', 'Gespeichert');
```

### 3. Seitennavigation

```javascript
// Go to specific page
setState('mcdu.0.control.switchPage', 'heating-control');

// Navigate to next page
setState('mcdu.0.control.nextPage', true);

// Navigate to previous page
setState('mcdu.0.control.previousPage', true);

// Go back to home
setState('mcdu.0.control.homePage', true);
```

### 4. Betätigung des Auslöseknopfes

```javascript
// Press LSK1L (left button, line 1)
setState('mcdu.0.actions.pressButton', 'LSK1L');

// Press MENU key
setState('mcdu.0.actions.pressButton', 'MENU');

// Confirm pending action
setState('mcdu.0.actions.confirmAction', true);

// Cancel/clear
setState('mcdu.0.actions.cancelAction', true);
```

### 5. Vorbefüllbarer Notizblock

```javascript
// Set scratchpad content (user can edit)
setState('mcdu.0.scratchpad.content', '22.5');

// Check if content is valid
const isValid = getState('mcdu.0.scratchpad.valid').val;

// Clear scratchpad
setState('mcdu.0.scratchpad.clear', true);
```

### 6. Laufzeitstatus überwachen

```javascript
// Check if user is editing
const editing = getState('mcdu.0.runtime.editActive').val;

// Check if confirmation dialog is showing
const pending = getState('mcdu.0.runtime.confirmationPending').val;

// See last button pressed
const lastButton = getState('mcdu.0.runtime.lastButtonPress').val;
const lastTime = getState('mcdu.0.runtime.lastButtonTime').val;

// Check adapter uptime
const uptime = getState('mcdu.0.runtime.uptime').val; // seconds
```

---

## 📋 Vollständige Staatsreferenz

### LED-Steuerung (11 Zustände)

| Zustand                 | Typ      | Werte                  | Beschreibung                                    |
| ----------------------- | -------- | ---------------------- | ----------------------------------------------- |
| `leds.FAIL`             | gemischt | wahr/falsch oder 0-255 | Fehleranzeige                                   |
| `leds.FM`               | gemischt | wahr/falsch oder 0-255 | FM-Anzeige                                      |
| `leds.MCDU`             | gemischt | wahr/falsch oder 0-255 | MCDU-Anzeige                                    |
| `leds.MENU`             | gemischt | wahr/falsch oder 0-255 | Menüanzeige                                     |
| `leds.FM1`              | gemischt | wahr/falsch oder 0-255 | FM1-Anzeige                                     |
| `leds.IND`              | gemischt | wahr/falsch oder 0-255 | IND-Indikator                                   |
| `leds.RDY`              | gemischt | wahr/falsch oder 0-255 | RDY-Anzeige (Bereitschaftsanzeige)              |
| `leds.STATUS`           | gemischt | wahr/falsch oder 0-255 | STATUS-Indikator                                |
| `leds.FM2`              | gemischt | wahr/falsch oder 0-255 | FM2-Anzeige                                     |
| `leds.BACKLIGHT`        | Nummer   | 0-255                  | Helligkeit der Tastenhintergrundbeleuchtung     |
| `leds.SCREEN_BACKLIGHT` | Nummer   | 0-255                  | Helligkeit der Bildschirmhintergrundbeleuchtung |

### Scratchpad-Steuerung (4 Zustände)

| Zustand                      | Typ             | Zugang | Beschreibung              |
| ---------------------------- | --------------- | ------ | ------------------------- |
| `scratchpad.content`         | Zeichenkette    | R/W    | Scratchpad-Textpuffer     |
| `scratchpad.valid`           | boolescher Wert | R      | Ist der Inhalt gültig?    |
| `scratchpad.validationError` | Zeichenkette    | R      | Validierungsfehlermeldung |
| `scratchpad.clear`           | boolescher Wert | W      | Clear Scratchpad (Taste)  |

### Benachrichtigungen (5 Bundesstaaten)

| Zustand                  | Typ             | Werte                      | Beschreibung                         |
| ------------------------ | --------------- | -------------------------- | ------------------------------------ |
| `notifications.message`  | Zeichenkette    | beliebiger Text            | Benachrichtigungstext                |
| `notifications.type`     | Zeichenkette    | Info/Warnung/Fehler/Erfolg | Nachrichtentyp (legt die Farbe fest) |
| `notifications.duration` | Nummer          | Millisekunden              | Anzeigedauer (Standard: 3000)        |
| `notifications.line`     | Nummer          | 1-13                       | Welche Anzeigezeile (Standard: 13)   |
| `notifications.clear`    | boolescher Wert | WAHR                       | Benachrichtigung jetzt löschen       |

### Navigation (4 Staaten)

| Zustand                | Typ                 | Beschreibung              |
| ---------------------- | ------------------- | ------------------------- |
| `control.nextPage`     | boolescher Wert     | Weiter zur nächsten Seite |
| `control.previousPage` | boolescher Wert     | Zur vorherigen Seite      |
| `control.homePage`     | boolescher Wert     | Zur ersten Seite          |
| `control.pageHistory`  | Zeichenkette (JSON) | Navigationsverlauf        |

### Tastenauslöser (3 Zustände)

| Zustand                 | Typ             | Werte             | Beschreibung              |
| ----------------------- | --------------- | ----------------- | ------------------------- |
| `actions.pressButton`   | Zeichenkette    | LSK1L, MENÜ, etc. | Tastendruck simulieren    |
| `actions.confirmAction` | boolescher Wert | WAHR              | Trigger OVFY (bestätigen) |
| `actions.cancelAction`  | boolescher Wert | WAHR              | Trigger CLR (Abbrechen)   |

### Laufzeitüberwachung (5 Zustände)

| Zustand                       | Typ             | Beschreibung                                     |
| ----------------------------- | --------------- | ------------------------------------------------ |
| `runtime.editActive`          | boolescher Wert | Der Benutzer befindet sich im Bearbeitungsmodus. |
| `runtime.confirmationPending` | boolescher Wert | Bestätigungsdialog wird angezeigt                |
| `runtime.lastButtonPress`     | Zeichenkette    | Zuletzt gedrückte Taste                          |
| `runtime.lastButtonTime`      | Nummer          | Zeitstempel des letzten Klicks                   |
| `runtime.uptime`              | Nummer          | Betriebszeit des Adapters (Sekunden)             |

---

## 🎯 Häufige Anwendungsfälle

### Anwendungsfall 1: Anzeige des Heizstatus

```javascript
// Show heating on/off on LED
on({ id: 'hm-rpc.0.Heizung.STATE', change: 'ne' }, function(obj) {
    setState('mcdu.0.leds.STATUS', obj.state.val);
    
    if (obj.state.val) {
        setState('mcdu.0.notifications.type', 'success');
        setState('mcdu.0.notifications.message', 'Heizung AN');
    } else {
        setState('mcdu.0.notifications.type', 'info');
        setState('mcdu.0.notifications.message', 'Heizung AUS');
    }
});
```

### Anwendungsfall 2: Warnung vor Türverriegelung

```javascript
on({ id: 'hm-rpc.0.Tuer.LOCK_STATE', val: false }, function() {
    // Flash FAIL LED
    setInterval(() => {
        const current = getState('mcdu.0.leds.FAIL').val;
        setState('mcdu.0.leds.FAIL', !current);
    }, 500);
    
    // Show warning
    setState('mcdu.0.notifications.type', 'warning');
    setState('mcdu.0.notifications.duration', 60000); // 1 minute
    setState('mcdu.0.notifications.message', 'TÜR NICHT VERSCHLOSSEN');
});
```

### Anwendungsfall 3: Temperaturanpassungshilfe

```javascript
// Pre-fill current temperature when user switches to heating page
on({ id: 'mcdu.0.runtime.currentPage', val: 'heating-control' }, function() {
    const currentTemp = getState('hm-rpc.0.Heizung.ACTUAL_TEMPERATURE').val;
    setState('mcdu.0.scratchpad.content', currentTemp.toFixed(1));
    
    setState('mcdu.0.notifications.type', 'info');
    setState('mcdu.0.notifications.duration', 2000);
    setState('mcdu.0.notifications.message', 'Aktuell: ' + currentTemp + '°C');
});
```

### Anwendungsfall 4: Automatischer Navigationsplan

```javascript
// Show energy dashboard at 6:00 AM
schedule('0 6 * * *', function() {
    setState('mcdu.0.control.switchPage', 'energy-dashboard');
    setState('mcdu.0.leds.RDY', 255);
});

// Return to home at night
schedule('0 23 * * *', function() {
    setState('mcdu.0.control.homePage', true);
    setState('mcdu.0.leds.BACKLIGHT', 64); // Dim backlight
    setState('mcdu.0.leds.SCREEN_BACKLIGHT', 32);
});
```

### Anwendungsfall 5: Automatische Bestätigung kritischer Aktionen

```javascript
// Emergency heating boost (auto-confirm after 3 seconds)
function emergencyHeatBoost() {
    // Trigger heating boost action
    setState('mcdu.0.actions.pressButton', 'LSK6L');
    
    // Wait for confirmation dialog
    setTimeout(() => {
        const pending = getState('mcdu.0.runtime.confirmationPending').val;
        if (pending) {
            setState('mcdu.0.actions.confirmAction', true);
            log('Emergency heating boost confirmed');
        }
    }, 3000);
}
```

### Anwendungsfall 6: Tastendruckprotokollierung

```javascript
// Log all button presses
on({ id: 'mcdu.0.runtime.lastButtonPress', change: 'ne' }, function(obj) {
    const button = obj.state.val;
    const time = getState('mcdu.0.runtime.lastButtonTime').val;
    const timestamp = new Date(time).toLocaleTimeString();
    
    log(`[${timestamp}] Button pressed: ${button}`, 'info');
    
    // Track button usage statistics
    setState('stats.mcdu.button.' + button + '.count', 
             getState('stats.mcdu.button.' + button + '.count').val + 1);
});
```

---

## Testen

Führen Sie die Adaptertestsuite aus:

```bash
cd /path/to/iobroker.mcdu
npm test
```

---

## Weiterführende Literatur

- [PAGE-CONFIGURATION-GUIDE.md](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md) – Referenz zur Seitenkonfiguration
- [MQTT-TEST-COMMANDS.md](/#/docs/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md) - Manuelle MQTT-Testbefehle

---

## ⚠️ Wichtige Hinweise

1. **Statusbestätigung** : Alle Automatisierungsstatus werden nach der Verarbeitung automatisch bestätigt.
2. **MQTT-Timing** : LED- und Benachrichtigungsänderungen werden mit QoS 1 an MQTT gesendet.
3. **Tastensimulation** : Ausgelöste Tasten berücksichtigen die Entprellzeit (100 ms) und Bestätigungsdialoge.
4. **Scratchpad-Validierung** : Der Inhalt wird beim Schreiben validiert (maximal 20 Zeichen).
5. **Laufzeitzustände** : Schreibgeschützte Zustände werden automatisch aktualisiert; schreiben Sie nicht in diese.

---

## 🐛 Fehlerbehebung

### Benachrichtigung wird nicht angezeigt

- Überprüfen`notifications.message` ist nicht leer
- Verifizieren`notifications.type` ist gültig (Info/Warnung/Fehler/Erfolg)
- Sicherstellen`notifications.line` ist 1-13

### LED ändert sich nicht

- Prüfen Sie, ob der LED-Name korrekt ist (Groß-/Kleinschreibung beachten).
- Der Prüfwert ist ein boolescher Wert oder liegt im Bereich von 0 bis 255.
- Stellen Sie sicher, dass die MQTT-Verbindung aktiv ist (`info.connection` = wahr)

### Der Auslöserknopf funktioniert nicht.

- Prüfen Sie, ob der Tastenname gültig ist (LSK1L, MENU usw.).
- Prüfen Sie, ob der Bestätigungsdialog aktiv ist (und damit andere Schaltflächen blockiert).
- Stellen Sie sicher, dass der Adapter läuft und betriebsbereit ist.

### Scratchpad wird nicht aktualisiert

- Bitte prüfen Sie die Inhaltslänge (maximal 20 Zeichen).
- Verifizieren`scratchpad.content` Zustand existiert
- Verwenden`scratchpad.clear` Zum Zurücksetzen, falls es festhängt

---

## 💡 Tipps & Tricks

1. **LED-Aktualisierungen im Batch-Verfahren** : Gruppieren Sie mehrere LED-Änderungen in einem Skriptblock, um eine bessere Leistung zu erzielen.
2. **Benachrichtigungswarteschlange** : Warten auf`notifications.message` Vor dem Senden der nächsten Benachrichtigung löschen
3. **Intelligente Navigation** : Prüfen`runtime.currentPage` vor dem Navigieren, um redundante Schalter zu vermeiden
4. **Bearbeitungsmoduserkennung** : Verwenden`runtime.editActive` Automatisierungen während der Benutzereingabe pausieren
5. **Verfügbarkeitsüberwachung** : Verwenden`runtime.uptime` um Adapterneustarts zu erkennen

---

**Bereit zur Automatisierung!** 🚀

Bei Fragen oder Problemen konsultieren Sie bitte die Hauptprojektdokumentation oder erstellen Sie ein Issue auf GitHub.