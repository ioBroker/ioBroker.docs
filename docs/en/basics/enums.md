---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/basics/enums.md
title: Categories/Lists in ioBroker – Complete Overview
hash: NagHzS5uBOdyMgM+SA2Wj7OhaTsJqREfxSpqosZJ0AQ=
---
# Categories/Lists in ioBroker – Complete Overview
## What are categories/enumerations?
Categories or enumerations (English: “enums”) form the **organizational basis** of ioBroker. They categorize devices and data points according to criteria such as room or function, thus enabling unified management instead of individual device configuration.

**Core principle:** Scripts, visualizations, and automations work with the category – not with the specific device or data point. This makes smart home systems easy to maintain, flexible, and scalable.

## Standard and custom categories
- **enum.rooms** – spatial allocation (e.g. living room, kitchen, bedroom)
- **enum.functions** – functional assignment (e.g., light, windows, heating, security)
- **Custom Categories** – any self-created groupings, e.g.:
- `enum.custom.battery_status` for battery warnings
- `enum.custom.heimkino` for multimedia devices
- `enum.custom.alarmlichter` for alarm lighting

> **Note:** Not only devices, but also **data points** can be assigned to enums – e.g., temperature or humidity values.

## Key Advantages
✅ **Maintainability:** Device replacement or data point changes only require category assignment, no script changes. ✅ **Scalability:** System grows with your needs – new devices or data points integrate seamlessly. ✅ **Clarity:** Clear structure even with hundreds of elements. ✅ **Future-proof:** Independence from manufacturers and device types.

---

# Application areas with examples
## 1. Automation/Scripts
**Possibilities**

- Device- and data point-independent programming
- Central control of multiple elements
- Maintenance-free expansion

**Example – Battery Monitoring**

```
// Alle Datenpunkte der eigenen Kategorie "battery_status" überwachen
$('state[id=*battery][custom=battery_status]').on('change', obj => {
    if (obj.state.val < 20) {
        sendTo('telegram', 'Batterie schwach: ' + obj.common.name);
    }
});
```

*Advantage:* New device or data point → simply assign to the category, script runs automatically.

---

## 2. Visualization
**Possibilities**

- Automatic structuring
- Responsive display
- Dynamic widget creation
- Grouping and sorting

**Example – iQontrol Room Layout** Rooms from `enum.rooms` are automatically adopted as separate views. Devices and data points automatically assign themselves to the correct view based on their room assignment.

---

## 3. Scenes
**Possibilities**

- Complex multi-device and data point automations
- Cross-category actions
- Maintenance-free scene creation

**Example – “We’re leaving” scene**

```
// Alle Lichter ausschalten
$('state[id=*on][functions=licht]').setState(false);
// Alle Sicherheitsgeräte aktivieren
$('state[id=*][functions=sicherheit]').setState(true);
```

---

## 4. Voice control
**Possibilities**

- Natural language commands
- Automatic integration with Alexa/Google Home
- Offline voice control possible

**Example – Alexa control**

- **Command:** “Alexa, turn on the light in the living room”
- **Function:** Controls all devices and data points from `enum.rooms.livingroom` + `enum.functions.light`

---

# Practical Implementation
## Create and manage categories
1. **Admin GUI:** Create a new category under “Enums” (standard or custom)
2. **Object Browser:** Assign devices and data points via drag and drop
3. **Script-based:** Create categories and assignments via JavaScript

## Using selectors
- `state[id=*][functions=licht]` – all light switches
- `state[id=*][rooms=kitchen][functions=light]` – all lights in the kitchen
- `state[id=*][functions=windowstatus]` – all window sensors

## Best Practices
1. **Logical structure:** Consistently assign spaces, functions, and data points.
2. **Unique names:** Use clear, understandable category names.
3. **Utilize hierarchies:** Create subcategories for complex systems.
4. **Documentation:** Document and communicate the category structure

---

# Conclusion
Categories/enumerations transform a collection of individual devices and data points into a structured, intelligently networked smart home system. They are the **fundamental organizational principle** for professional ioBroker installations and enable:

- **Maintenance-free extensions** – new elements are automatically integrated.
- **Flexible Automations** – Scripts work independently of devices and data points.
- **Intuitive operation** – natural voice commands and structured visualizations
- **Future-proof** – Independence from specific manufacturers