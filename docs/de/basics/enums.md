# Kategorien/Aufzählungen in ioBroker – Vollständige Übersicht

## Was sind Kategorien/Aufzählungen?

Kategorien oder Aufzählungen (englisch: “enums”) bilden die **organisatorische Basis** von ioBroker. Sie ordnen Geräte und Datenpunkte nach Kriterien wie Raum oder Funktion und ermöglichen so eine einheitliche Verwaltung statt Einzelgerätekonfiguration.  

**Kernprinzip:** Skripte, Visualisierungen und Automationen arbeiten mit der Kategorie – nicht mit dem konkreten Gerät oder Datenpunkt. Dadurch werden Smart-Home-Systeme wartungsfreundlich, flexibel und skalierbar.

## Standard- und eigene Kategorien

- **enum.rooms** – räumliche Zuordnung (z. B. Wohnzimmer, Küche, Schlafzimmer)  
- **enum.functions** – funktionale Zuordnung (z. B. Licht, Fenster, Heizung, Sicherheit)  
- **Eigene Kategorien** – beliebige, selbst angelegte Gruppierungen, z. B.:  
  - `enum.custom.battery_status` für Batteriewarnungen  
  - `enum.custom.heimkino` für Multimedia-Geräte  
  - `enum.custom.alarmlichter` für Alarmbeleuchtung  

> **Hinweis:** Nicht nur Geräte, sondern auch **Datenpunkte** lassen sich Enums zuordnen – z. B. Temperatur- oder Feuchtewerte.

## Zentrale Vorteile

✅ **Wartungsfreundlichkeit:** Gerätetausch oder Datenpunktänderung erfordert nur Kategoriezuordnung, keine Skriptänderung  
✅ **Skalierbarkeit:** System wächst mit – neue Geräte oder Datenpunkte fügen sich nahtlos ein  
✅ **Übersichtlichkeit:** Klare Struktur auch bei hunderten von Elementen  
✅ **Zukunftssicherheit:** Unabhängigkeit von Herstellern und Gerätetypen  

---

# Einsatzbereiche mit Beispielen

## 1. Automatisierung/Skripte

**Möglichkeiten**  
- Geräte- und datenpunktunabhängige Programmierung  
- Zentrale Steuerung mehrerer Elemente  
- Wartungsfreie Erweiterung  

**Beispiel – Batterieüberwachung**  
```
// Alle Datenpunkte der eigenen Kategorie "battery_status" überwachen
$('state[id=*battery][custom=battery_status]').on('change', obj => {
    if (obj.state.val < 20) {
        sendTo('telegram', 'Batterie schwach: ' + obj.common.name);
    }
});
```  
*Vorteil:* Neues Gerät oder Datenpunkt → einfach der Kategorie zuordnen, Skript läuft automatisch.

---

## 2. Visualisierung

**Möglichkeiten**  
- Automatische Strukturierung  
- Responsive Darstellung  
- Dynamische Widget-Erstellung  
- Gruppierungen und Sortierungen  

**Beispiel – iQontrol Raumaufteilung**  
Räume aus `enum.rooms` werden automatisch als separate Ansichten übernommen. Geräte und Datenpunkte ordnen sich basierend auf ihrer Raumzuordnung selbstständig der richtigen Ansicht zu.

---

## 3. Szenen

**Möglichkeiten**  
- Komplexe Multi-Geräte- und Datenpunkt-Automationen  
- Kategorienübergreifende Aktionen  
- Wartungsfreie Szenenerstellung  

**Beispiel – “Wir gehen”-Szene**  
```
// Alle Lichter ausschalten
$('state[id=*on][functions=licht]').setState(false);
// Alle Sicherheitsgeräte aktivieren
$('state[id=*][functions=sicherheit]').setState(true);
```

---

## 4. Sprachsteuerung

**Möglichkeiten**  
- Natürliche Sprachbefehle  
- Automatische Integration in Alexa/Google Home  
- Offline-Sprachsteuerung möglich  

**Beispiel – Alexa-Steuerung**  
- **Befehl:** “Alexa, schalte das Licht im Wohnzimmer ein”  
- **Funktion:** Steuert alle Geräte und Datenpunkte aus `enum.rooms.wohnzimmer` + `enum.functions.licht`

---

# Praktische Umsetzung

## Kategorien erstellen und verwalten

1. **Admin-GUI:** Unter “Enums” neue Kategorie anlegen (Standard oder `custom`)  
2. **Objekt-Browser:** Geräte und Datenpunkte per Drag-and-Drop zuweisen  
3. **Skript-basiert:** Kategorien und Zuweisungen via JavaScript anlegen  

## Selektoren verwenden

- `state[id=*][functions=licht]` – alle Licht-Schalter  
- `state[id=*][rooms=küche][functions=licht]` – alle Lichter in der Küche  
- `state[id=*][functions=windowstatus]` – alle Fenster-Sensoren  

## Best Practices

1. **Logische Struktur:** Räume, Funktionen und Datenpunkte konsequent zuordnen  
2. **Eindeutige Namen:** Klare, verständliche Kategorienamen verwenden  
3. **Hierarchien nutzen:** Bei komplexen Systemen Unterkategorien erstellen  
4. **Dokumentation:** Kategorienstruktur dokumentieren und kommunizieren  

---

# Fazit

Kategorien/Aufzählungen verwandeln eine Sammlung einzelner Geräte und Datenpunkte in ein strukturiertes, intelligent vernetztes Smart-Home-System. Sie sind das **fundamentale Organisationsprinzip** für professionelle ioBroker-Installationen und ermöglichen:

- **Wartungsfreie Erweiterungen** – neue Elemente fügen sich automatisch ein  
- **Flexible Automationen** – Skripte arbeiten geräte- und datenpunktunabhängig  
- **Intuitive Bedienung** – natürliche Sprachbefehle und strukturierte Visualisierungen  
- **Zukunftssicherheit** – Unabhängigkeit von spezifischen Herstellern  
