---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# MCDU Automation Quick Start Guide

**Phase 4.1: Essential States for Automation**

This guide shows you how to use the 32 new automation states to control your MCDU from ioBroker scripts, automations, and external systems.

---

## 🚀 Quick Examples

### 1. Control LEDs
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

### 2. Show Notifications
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

### 3. Navigate Pages
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

### 4. Trigger Button Presses
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

### 5. Pre-fill Scratchpad
```javascript
// Set scratchpad content (user can edit)
setState('mcdu.0.scratchpad.content', '22.5');

// Check if content is valid
const isValid = getState('mcdu.0.scratchpad.valid').val;

// Clear scratchpad
setState('mcdu.0.scratchpad.clear', true);
```

### 6. Monitor Runtime State
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

## 📋 Complete State Reference

### LED Control (11 states)
| State | Type | Values | Description |
|-------|------|--------|-------------|
| `leds.FAIL` | mixed | true/false or 0-255 | FAIL indicator |
| `leds.FM` | mixed | true/false or 0-255 | FM indicator |
| `leds.MCDU` | mixed | true/false or 0-255 | MCDU indicator |
| `leds.MENU` | mixed | true/false or 0-255 | MENU indicator |
| `leds.FM1` | mixed | true/false or 0-255 | FM1 indicator |
| `leds.IND` | mixed | true/false or 0-255 | IND indicator |
| `leds.RDY` | mixed | true/false or 0-255 | RDY (ready) indicator |
| `leds.STATUS` | mixed | true/false or 0-255 | STATUS indicator |
| `leds.FM2` | mixed | true/false or 0-255 | FM2 indicator |
| `leds.BACKLIGHT` | number | 0-255 | Button backlight brightness |
| `leds.SCREEN_BACKLIGHT` | number | 0-255 | Screen backlight brightness |

### Scratchpad Control (4 states)
| State | Type | Access | Description |
|-------|------|--------|-------------|
| `scratchpad.content` | string | R/W | Scratchpad text buffer |
| `scratchpad.valid` | boolean | R | Is content valid? |
| `scratchpad.validationError` | string | R | Validation error message |
| `scratchpad.clear` | boolean | W | Clear scratchpad (button) |

### Notifications (5 states)
| State | Type | Values | Description |
|-------|------|--------|-------------|
| `notifications.message` | string | any text | Notification text |
| `notifications.type` | string | info/warning/error/success | Message type (sets color) |
| `notifications.duration` | number | milliseconds | How long to show (default: 3000) |
| `notifications.line` | number | 1-13 | Which display line (default: 13) |
| `notifications.clear` | boolean | true | Clear notification now |

### Navigation (4 states)
| State | Type | Description |
|-------|------|-------------|
| `control.nextPage` | boolean | Go to next page |
| `control.previousPage` | boolean | Go to previous page |
| `control.homePage` | boolean | Go to first page |
| `control.pageHistory` | string (JSON) | Navigation history |

### Button Triggers (3 states)
| State | Type | Values | Description |
|-------|------|--------|-------------|
| `actions.pressButton` | string | LSK1L, MENU, etc. | Simulate button press |
| `actions.confirmAction` | boolean | true | Trigger OVFY (confirm) |
| `actions.cancelAction` | boolean | true | Trigger CLR (cancel) |

### Runtime Monitoring (5 states)
| State | Type | Description |
|-------|------|-------------|
| `runtime.editActive` | boolean | User is in edit mode |
| `runtime.confirmationPending` | boolean | Confirmation dialog showing |
| `runtime.lastButtonPress` | string | Last physical button pressed |
| `runtime.lastButtonTime` | number | Timestamp of last button |
| `runtime.uptime` | number | Adapter uptime (seconds) |

---

## 🎯 Common Use Cases

### Use Case 1: Heating Status Display
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

### Use Case 2: Door Lock Warning
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

### Use Case 3: Temperature Adjustment Helper
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

### Use Case 4: Auto-Navigation Schedule
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

### Use Case 5: Critical Action Auto-Confirm
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

### Use Case 6: Button Press Logger
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

## Testing

Run the adapter test suite:
```bash
cd /path/to/iobroker.mcdu
npm test
```

---

## Further Reading

- [PAGE-CONFIGURATION-GUIDE.md](/#/docs/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md) - Page configuration reference
- [MQTT-TEST-COMMANDS.md](/#/docs/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md) - Manual MQTT testing commands

---

## ⚠️ Important Notes

1. **State Acknowledgment**: All automation states auto-acknowledge after processing
2. **MQTT Timing**: LED and notification changes publish to MQTT with QoS 1
3. **Button Simulation**: Triggered buttons respect debounce (100ms) and confirmation dialogs
4. **Scratchpad Validation**: Content is validated on write (max 20 chars)
5. **Runtime States**: Read-only states update automatically, don't write to them

---

## 🐛 Troubleshooting

### Notification not showing
- Check `notifications.message` is not empty
- Verify `notifications.type` is valid (info/warning/error/success)
- Ensure `notifications.line` is 1-13

### LED not changing
- Verify LED name is correct (case-sensitive)
- Check value is boolean or 0-255 range
- Ensure MQTT connection is active (`info.connection` = true)

### Button trigger not working
- Verify button name is valid (LSK1L, MENU, etc.)
- Check if confirmation dialog is active (blocks other buttons)
- Ensure adapter is running and ready

### Scratchpad not updating
- Check content length (max 20 characters)
- Verify `scratchpad.content` state exists
- Use `scratchpad.clear` to reset if stuck

---

## 💡 Tips & Tricks

1. **Batch LED Updates**: Group multiple LED changes in one script block for better performance
2. **Notification Queuing**: Wait for `notifications.message` to clear before sending next notification
3. **Smart Navigation**: Check `runtime.currentPage` before navigating to avoid redundant switches
4. **Edit Mode Detection**: Use `runtime.editActive` to pause automations during user input
5. **Uptime Monitoring**: Use `runtime.uptime` to detect adapter restarts

---

**Ready to automate!** 🚀

For questions or issues, see the main project documentation or create an issue on GitHub.