---
chapters: {"pages":{"en/adapterref/iobroker.mcdu/README.md":{"title":{"en":"ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/README.md"},"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md":{"title":{"en":"MCDU MQTT Protocol Specification"},"content":"en/adapterref/iobroker.mcdu/docs/PROTOCOL.md"},"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md":{"title":{"en":"Konzept: MCDU Premium-Integration für Home Assistant"},"content":"en/adapterref/iobroker.mcdu/docs/HOME-ASSISTANT-CONCEPT.md"},"en/adapterref/iobroker.mcdu/docs/README.md":{"title":{"en":"MCDU Smart Home Controller - Documentation"},"content":"en/adapterref/iobroker.mcdu/docs/README.md"},"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md":{"title":{"en":"Page Configuration Guide"},"content":"en/adapterref/iobroker.mcdu/docs/PAGE-CONFIGURATION-GUIDE.md"},"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md":{"title":{"en":"MCDU Automation Quick Start Guide"},"content":"en/adapterref/iobroker.mcdu/docs/AUTOMATION-QUICKSTART.md"},"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md":{"title":{"en":"MCDU MQTT Test Commands"},"content":"en/adapterref/iobroker.mcdu/docs/MQTT-TEST-COMMANDS.md"},"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md":{"title":{"en":"Multi-Color Segments Feature"},"content":"en/adapterref/iobroker.mcdu/docs/MULTI-COLOR-FEATURE.md"},"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md":{"title":{"en":"Getting Started with ioBroker.mcdu"},"content":"en/adapterref/iobroker.mcdu/docs/GETTING-STARTED.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md":{"title":{"en":"MCDU Smart Home Controller - Technical Architecture"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md":{"title":{"en":"Architecture Decision: RasPi MCDU Unit ↔ ioBroker"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-DECISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Revision with Authentic UX"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/ARCHITECTURE-REVISION.md"},"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md":{"title":{"en":"ioBroker MCDU Adapter - Architecture Specification"},"content":"en/adapterref/iobroker.mcdu/docs/architecture/IOBROKER-ADAPTER-ARCHITECTURE.md"},"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md":{"title":{"en":"MCDU Smart Home Controller - Research Findings"},"content":"en/adapterref/iobroker.mcdu/docs/research/RESEARCH.md"},"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md":{"title":{"en":"MCDU Smart Home Controller - References & Resources"},"content":"en/adapterref/iobroker.mcdu/docs/research/REFERENCES.md"},"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md":{"title":{"en":"ioBroker Adapter-Creator Vergleich"},"content":"en/adapterref/iobroker.mcdu/docs/research/ADAPTER-CREATOR-COMPARISON.md"},"en/adapterref/iobroker.mcdu/docs/research/requirements.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.mcdu/docs/research/requirements.md"},"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md":{"title":{"en":"MCDU Smart Home Controller: UX Concept"},"content":"en/adapterref/iobroker.mcdu/docs/ux-concept/UX-CONCEPT.md"},"en/adapterref/iobroker.mcdu/mcdu-client/README.md":{"title":{"en":"MCDU MQTT Client"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/README.md"},"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md":{"title":{"en":"Getting Started: MCDU Client on Raspberry Pi"},"content":"en/adapterref/iobroker.mcdu/mcdu-client/GETTING-STARTED.md"}}}
---
# MCDU Smart Home Controller: UX Concept

## Document Purpose
Complete interaction design system for the MCDU Smart Home Controller. Defines all user interaction patterns, display layouts, navigation rules, and visual feedback mechanisms. This document serves as the authoritative specification for implementation.

**Target Hardware**: WinWing MCDU-32-CAPTAIN  
**Target Platform**: ioBroker Smart Home System  
**Design Philosophy**: Aviation-grade precision + Smart home practicality

---

## A. Configuration Flexibility

### A.1 Function Key Configurability

⚠️ **CRITICAL DESIGN PRINCIPLE**: Function key mappings are **USER-CONFIGURABLE**, not hardcoded.

**Default vs Custom Mapping**:

The mappings defined in `MCDU-SMARTHOME-MAPPING.md` represent a **RECOMMENDED DEFAULT CONFIGURATION** optimized for typical smart home usage patterns. Users must be able to customize these mappings to match their specific needs.

**Configurable Elements**:
1. **Function Key Assignments** (12 keys):
   - Which category/page each function key opens
   - Exception: MENU key always opens main menu (non-configurable)
   
2. **Quick Access Page Content**:
   - Which actions appear on QUICK page (LSK1-6 L/R = 12 slots)
   - Order of quick actions
   - Labels for each action
   
3. **LED Assignments** (11 LEDs):
   - Which system states trigger which LEDs
   - LED brightness levels (off/dim/bright)
   - Blink patterns for different alert types

**Non-Configurable Elements** (for consistency):
- Standard key functions: BRT, DIM, CLR, OVFY, SLEW
- Scratchpad behavior
- LSK context-sensitivity (driven by page content)
- Core navigation patterns
- Color coding meanings

### A.2 Default Mapping (Recommended)

**Function Keys → Categories** (from MCDU-SMARTHOME-MAPPING.md):

| Physical Key | Default Mapping | Rationale |
|--------------|----------------|-----------|
| FUEL | ENERGIE | Direct analog: Fuel = Energy |
| DIR | QUICK | Fast access to favorites |
| PROG | STATUS | Monitor system progress |
| PERF | SZENEN | Performance = Scene presets |
| INIT | EINSTELLUNGEN | System initialization/setup |
| DATA | GERÄTE | Device database/catalog |
| F-PLN | ZEITPLAN | Schedule = Flight plan |
| RAD | KLIMA | Manual tuning analog |
| SEC | SICHERHEIT | Security (lucky match!) |
| ATC | MELDUNGEN | System communications |
| MENU | HAUPTMENÜ | Root menu (fixed) |
| AIRPORT | RÄUME | Location-based info |

**Why This Default?**:
- Most frequent categories on direct keys (ENERGIE, STATUS, SZENEN)
- Logical analogies to aviation functions
- One-press access to 12 categories
- Remaining categories accessible via HAUPTMENÜ

### A.3 Custom Mapping Examples

**Example 1: Pool Owner**
User with pool wants direct access to pool controls:
```
FUEL     → ENERGIE (keep)
DIR      → QUICK (keep)
PROG     → POOL (changed from STATUS)
PERF     → SZENEN (keep)
INIT     → EINSTELLUNGEN (keep)
DATA     → GERÄTE (keep)
F-PLN    → ZEITPLAN (keep)
RAD      → KLIMA (keep)
SEC      → SICHERHEIT (keep)
ATC      → MELDUNGEN (keep)
MENU     → HAUPTMENÜ (fixed)
AIRPORT  → RÄUME (keep)
```

**Example 2: EV Owner**
User prioritizes E-car charging:
```
FUEL     → E-MOBILITÄT (changed - energy theme fits!)
DIR      → QUICK (keep)
PROG     → STATUS (keep)
...
```

**Example 3: Security-Focused**
User wants alarm directly accessible:
```
SEC      → ALARMANLAGE (changed from SICHERHEIT)
ATC      → SICHERHEIT (changed from MELDUNGEN)
...
```

### A.4 Configuration Interface

**Where Users Configure Mappings**:

**Primary Method**: ioBroker Admin UI (Web Interface)
- Navigate to MCDU adapter settings
- "Function Key Mapping" tab
- Drag-and-drop interface:
  ```
  [FUEL  ] ⇄ [Dropdown: ENERGIE ▼]
  [DIR   ] ⇄ [Dropdown: QUICK   ▼]
  [PROG  ] ⇄ [Dropdown: STATUS  ▼]
  ...
  ```
- "Quick Access Configuration" section:
  - 12 slots (LSK1-6 L/R)
  - Drag actions from library
  - Set labels (max 20 chars)
  - Preview on virtual MCDU display

**Secondary Method**: MCDU On-Device Configuration (Advanced)
- EINSTELLUNGEN → TASTENBELEGUNG
- Limited editing capability (select from list)
- Not recommended for initial setup (web UI is easier)

**Configuration Storage**:
- Stored in ioBroker adapter configuration (JSON)
- Backed up with ioBroker backups
- Exportable/importable profiles (share configs between users)

### A.5 Configuration Validation

**Rules to Prevent Invalid Configurations**:

1. **No Duplicate Mappings**:
   - Each function key can only map to ONE category
   - System prevents assigning same category to multiple keys
   - Exception: A category can be accessible via BOTH function key AND HAUPTMENÜ

2. **MENU Key Reserved**:
   - MENU always opens HAUPTMENÜ (cannot be changed)
   - Ensures users can always escape to root menu

3. **Minimum Required Pages**:
   - HAUPTMENÜ must be accessible (via MENU key)
   - At least one of: QUICK, STATUS, or direct category access
   - Prevents "locked out" scenarios

4. **LED Conflicts**:
   - Multiple conditions can trigger same LED (priority order)
   - Cannot disable critical LEDs (FAIL, MCDU, RDY)

**Validation Errors** (shown in web UI):
```
❌ Error: Function key "FUEL" already assigned to ENERGIE
❌ Error: No access to STATUS page (recommended to keep)
⚠️  Warning: QUICK page empty (no quick actions configured)
✅ Configuration valid - Save to apply
```

### A.6 Configuration Profiles

**Pre-built Templates** (user can select and customize):

**Profile 1: "Balanced Home"** (Default)
- Equal emphasis on energy, climate, security
- Quick access to common scenes
- Status monitoring central

**Profile 2: "Energy Focused"**
- ENERGIE, PHOTOVOLTAIK, E-MOBILITÄT on direct keys
- Quick access shows power stats
- Monitoring-oriented

**Profile 3: "Comfort Oriented"**
- SZENEN, KLIMA, LICHT, MULTIMEDIA prioritized
- Quick scenes for ambiance
- Less emphasis on technical data

**Profile 4: "Security First"**
- SICHERHEIT, ALARMANLAGE, VERSCHLUSS direct access
- Quick access shows security status
- Camera/sensor monitoring

**Profile 5: "Minimal Setup"**
- Only HAUPTMENÜ, QUICK, STATUS
- Everything else via menu tree
- Simplest learning curve

**How to Apply**:
```
ioBroker Admin UI:
  MCDU Adapter Settings
    → Configuration Profiles
      → Select: "Energy Focused" ▼
      → [Preview]
      → [Apply Profile]
      → (Optional) Customize further
      → [Save Configuration]
```

---

## B. Navigation Hierarchy

### B.1 Overall Structure

**Four-Layer Architecture**:

```
Layer 0: Function Keys (Direct Jump)
    ↓
Layer 1: Category Main Page
    ↓
Layer 2: Sub-Category / Device List / Detail Page
    ↓
Layer 3: Action Confirmation / Edit Mode
```

**Maximum Depth Rule**: No interaction should require more than 3 levels of navigation from a function key press.

**Example Paths**:

**Path 1: Quick Action (2 levels)**
```
Press QUICK → Press LSK (Scene) → ✓ Done
```

**Path 2: Information Lookup (2 levels)**
```
Press ENERGIE → View data → Done
```

**Path 3: Device Control (3 levels)**
```
Press KLIMA → Select Room → Edit Temp → ✓ Done
```

**Path 4: Configuration Change (3 levels)**
```
Press EINSTELLUNGEN → Select Option → Confirm → ✓ Done
```

### B.2 Main Menu Structure

**HAUPTMENÜ** (accessed via MENU key):

```
HAUPTMENÜ               1/2
---
< ENERGIE              (LSK1L)
< KLIMA                (LSK2L)
< LICHT                (LSK3L)
< SICHERHEIT           (LSK4L)
< SZENEN               (LSK5L)
< ZEITPLAN             (LSK6L)

> PHOTOVOLTAIK          (LSK1R)
> MULTIMEDIA            (LSK2R)
> VERSCHLUSS            (LSK3R)
> E-MOBILITÄT           (LSK4R)
> POOL                  (LSK5R)
> RÄUME                 (LSK6R)
                   WEITER>

[SLEW → to page 2]

HAUPTMENÜ               2/2
---
< GERÄTE               (LSK1L)
< ALARMANLAGE          (LSK2L)
< ANWESENHEIT          (LSK3L)
< STATUS               (LSK4L)
< MELDUNGEN            (LSK5L)
< EINSTELLUNGEN        (LSK6L)

> QUICK ACCESS          (LSK1R)
> [CUSTOM 1]            (LSK2R: User-defined)
> [CUSTOM 2]            (LSK3R: User-defined)
< ZURÜCK
```

**Menu Features**:
- All 13+ categories accessible
- Two pages (max 12 items per page)
- Custom slots for user-added categories
- Always accessible via MENU key
- "< ZURÜCK" returns to previous page

### B.3 Sub-Menu Navigation Rules

**Rule 1: Consistent Header Format**
```
[CATEGORY] > [SUB-PAGE]  X/Y
```
Examples:
```
ENERGIE > PV DETAILS     1/1
KLIMA > WOHNZIMMER       1/1
GERÄTE > STEHLAMPE       1/1
```

**Rule 2: Page Indicators**
- Always show current page / total pages (e.g., `1/3`)
- If only one page: show `1/1` (indicates no more pages)
- Page count includes sub-categories, not just scrolling

**Rule 3: Sub-Page Types**

**Type A: Information Display** (no LSK actions needed)
```
ENERGIE                 1/3
AKTUELL:    2340 W
HEUTE:      12.4 kWh
KOSTEN:     2.48 €
---
NETZ:       +340 W
PV:         2500 W
BATTERIE:   -500 W
< INDEX            WEITER>
```
- Pure data display
- SLEW to navigate pages
- LSKs for drilling deeper (optional)

**Type B: Selection Menu**
```
SZENEN                  1/2
AKTIV:      FILM MODUS
---
< GUTE NACHT           (LSK3L)
< GUTEN MORGEN         (LSK4L)
< FILM MODUS ✓         (LSK5L: Active)
< ABWESEND             (LSK6L)
< INDEX          WEITER>
```
- LSKs execute actions or navigate
- Active item marked with ✓
- Labels clearly indicate action

**Type C: Data Entry Form**
```
KLIMA > WOHNZIMMER      1/1
IST:        21.8°C
SOLL:       [  .  ]°C  (LSK2L: Edit)
VENTIL:     45%
MODUS:      AUTO       (LSK4L: Change)
---
< ZURÜCK
```
- Fields with `[ ]` or arrows indicate editable
- LSK next to field activates edit mode
- Scratchpad used for input

**Type D: Scrollable List**
```
GERÄTE                  1/1
---
 WOHNZIMMER
< STEHLAMPE      ON    (LSK1L)
< DECKENLAMPE    OFF   (LSK2L)
< THERMOSTAT     21.5  (LSK3L)
 KÜCHE
< DECKENLICHT    ON    (LSK4L)
↓ MEHR               FILTER>
```
- Items exceed display (14 lines)
- SLEW ↓↑ to scroll
- `↓ MEHR` indicator shows more below
- LSK selects item

### B.4 Breadcrumb Concept

**Always Show Current Path**:

**Single Level** (main category):
```
ENERGIE                 1/3
```

**Two Levels** (category > sub-page):
```
ENERGIE > PV DETAILS    1/1
```

**Three Levels** (category > list > item):
```
GERÄTE > LICHT > STEHLAMPE  1/1
```

**Maximum Breadcrumb Length**: 27 characters (to fit on line 1)

**Truncation** (if needed):
```
GERÄTE > ... > STEHLAMPE    1/1
```

**Breadcrumb = Navigation Hint**:
- Shows where you are
- CLR key goes back one level
- Consistent across all pages

### B.5 Back Navigation (CLR Key)

**CLR Key Behavior by Context**:

**Context 1: Scratchpad Contains Data**
```
Action: CLR → Clear scratchpad
Result: Scratchpad empty, stay on page
```

**Context 2: Scratchpad Empty, On Sub-Page**
```
Current: KLIMA > WOHNZIMMER
Action: CLR
Result: Return to KLIMA main page
```

**Context 3: Scratchpad Empty, On Main Category Page**
```
Current: ENERGIE (main)
Action: CLR
Result: Return to previous category OR HAUPTMENÜ
```

**Context 4: Double-Press (Emergency Exit)**
```
Current: Any page (even 3 levels deep)
Action: CLR CLR (within 1 second)
Result: Return to HAUPTMENÜ or STATUS
```

**Visual Feedback**:
```
After CLR:
[Brief flash] ← BACK (amber text, 0.5s)
Then: Display previous page
```

**"< ZURÜCK" LSK** (explicit back button):
- Alternative to CLR key
- Always shown on detail pages
- Same behavior as single CLR press
- More discoverable for new users

### B.6 Home Navigation (MENU Key)

**MENU Key = Instant Return to HAUPTMENÜ**

**Behavior**:
- Single press MENU → HAUPTMENÜ page 1
- Works from ANY page, ANY depth
- Does NOT clear scratchpad (scratchpad persists)
- Non-configurable (always HAUPTMENÜ)

**Use Cases**:
1. **Lost in navigation**: MENU → reset to main menu
2. **Switch categories**: MENU → select different category
3. **Check all options**: MENU → browse full category list

**After MENU Press**:
```
HAUPTMENÜ               1/2
---
< ENERGIE              (LSK1L)
< KLIMA                (LSK2L)
...
```

**Combination Navigation**:
```
User on: GERÄTE > LICHT > STEHLAMPE (3 levels deep)
User wants: KLIMA category

Option A (via MENU):
  Press MENU → HAUPTMENÜ
  Press LSK2L → KLIMA

Option B (via Function Key, if configured):
  Press RAD (mapped to KLIMA) → Direct jump

Option B is faster IF function key is mapped!
```

### B.7 Circular Navigation (SLEW)

**On Main Category Pages, SLEW Wraps Around**:

**Left/Right Navigation** (function key equivalent):
```
ENERGIE → SLEW → → KLIMA → SLEW → → LICHT → ... → SLEW → → ENERGIE
```

**Order Follows Function Key Mapping** (user-configured):
- If user mapped FUEL→ENERGIE, DIR→QUICK, PROG→STATUS...
- SLEW order: ENERGIE → QUICK → STATUS → SZENEN → ...
- Circular: last category → first category

**Why Circular?**:
- No dead-ends
- Easy category browsing
- Muscle memory (hold SLEW → to advance X categories)

**Up/Down Navigation** (scrolling):
```
On long lists (>14 lines):
SLEW ↓ → Scroll down one line
SLEW ↑ → Scroll up one line
Hold SLEW ↓ → Continuous scroll (smooth)
```

**Scroll Indicators**:
```
Top of list:
GERÄTE                  1/4

Middle of list:
↑ OBEN
...
↓ MEHR

Bottom of list:
...
< ZURÜCK
```

### B.8 Depth Limit Enforcement

**Goal**: No user action requires more than 3 navigation steps from function key.

**How to Achieve**:

**Method 1: Direct Function Keys**
- 12 categories directly accessible (1 press)
- Remaining categories via HAUPTMENÜ (2 presses)

**Method 2: QUICK Page**
- Top 10-12 actions directly on QUICK (2 presses total)
- Example: QUICK → LSK1L (GUTE NACHT) → ✓ Done

**Method 3: Flatten Deep Hierarchies**
- Avoid: Category → Sub-Category → Sub-Sub-Category → Item
- Instead: Category → Item List (with filter/search)

**Method 4: Context-Aware LSKs**
- LSKs show most relevant actions
- Example: On device page, LSK shows "TOGGLE" not "VIEW DETAILS"
- Reduces need for extra navigation

**Depth Examples**:

**✅ Good (2 levels)**:
```
Press SZENEN → Press LSK (GUTE NACHT) → ✓ Scene activated
```

**✅ Acceptable (3 levels)**:
```
Press KLIMA → Select WOHNZIMMER → Edit temp → ✓ Confirmed
```

**❌ Bad (4+ levels) - AVOID**:
```
Press MENU → LICHT → RÄUME → WOHNZIMMER → STEHLAMPE → Edit
(This is too deep! Should be: Press RÄUME → WOHNZIMMER → Device list)
```

---

## C. Core Interaction Patterns

### C.1 Navigate (Browse Information)

**Pattern**: DIR, MENU, LSK Selection

**Use Case**: Browse categories, view data, explore devices

**Interaction Sequence**:

**Step 1: Access Category**
```
Action: Press function key (e.g., ENERGIE)
       OR Press MENU → Select category with LSK
Result: Category main page displayed
```

**Step 2: Browse Content**
```
Action: Press SLEW ←→ (navigate between sub-pages)
       OR Press SLEW ↑↓ (scroll within long lists)
Result: Display updates with new content
```

**Step 3: Select Item** (optional)
```
Action: Press LSK next to item
Result: Navigate to detail page OR execute action
```

**Example Flow**:
```
1. Press ENERGIE
   Display: ENERGIE main page

2. Press SLEW →
   Display: PV DETAILS page

3. Press SLEW →
   Display: BATTERIE page

4. Press LSK4L (detail view)
   Display: BATTERIE > DETAILS
```

**Navigation Controls Summary**:
| Control | Function | Context |
|---------|----------|---------|
| Function Key | Direct category jump | Anywhere |
| MENU | Open main menu | Anywhere |
| LSK | Select item / action | On labeled item |
| SLEW ←→ | Next/previous page | Same category |
| SLEW ↑↓ | Scroll list | Long lists only |
| CLR | Go back | Sub-pages |

### C.2 Toggle (On/Off Control)

**Pattern**: LSK to Switch States

**Use Case**: Turn lights on/off, lock/unlock, enable/disable

**Interaction Sequence**:

**Step 1: Navigate to Device/Option**
```
Example: LICHT > Device List
Display:
  < STEHLAMPE      ON    (LSK1L)
  < DECKENLAMPE    OFF   (LSK2L)
```

**Step 2: Press LSK to Toggle**
```
Action: Press LSK1L (next to STEHLAMPE ON)
Result: State toggles immediately
Display updates:
  < STEHLAMPE      OFF ✓ (green flash)
```

**Visual Feedback**:
- State changes immediately (white → green for 1s)
- Checkmark ✓ appears briefly
- If device is slow to respond: "SENDE..." indicator

**Error Handling**:
```
If device offline:
  < STEHLAMPE      OFFLINE (amber)
  Press LSK → Error: "GERÄT NICHT ERREICHBAR"
```

**Toggle States**:
| Display | Meaning | Next State |
|---------|---------|------------|
| `ON` | Currently on | → OFF |
| `OFF` | Currently off | → ON |
| `AUTO` | Auto mode | → MANUAL or OFF |
| `AKTIV` | Active/enabled | → INAKTIV |
| `LOCKED` | Locked | → UNLOCKED |

**Confirmation for Critical Toggles**:
```
Critical actions (e.g., alarm disarm) require confirmation:

Step 1: Press LSK (ALARM SCHARF)
Display:
  ALARM DEAKTIVIEREN?
  < NEIN             JA*> (LSK6R)

Step 2: Press LSK6R or OVFY
Result: ✓ ALARM UNSCHARF (green)
```

### C.3 Edit Number (Scratchpad Entry)

**Pattern**: Scratchpad + LSK

**Use Case**: Set temperature, brightness, volume, time

**Interaction Sequence**:

**Step 1: Navigate to Field**
```
Example: KLIMA > WOHNZIMMER
Display:
  IST:        21.8°C
  SOLL:       22.0°C  ← (LSK2L)
  MODUS:      AUTO
```

**Step 2: Type Value in Scratchpad**
```
Action: Type "23" (on numeric keypad)
Scratchpad shows: 23*
Display unchanged (field still shows 22.0°C)
```

**Step 3: Press LSK to Confirm**
```
Action: Press LSK2L (next to SOLL field)
Result: Value transfers to field
Display:
  SOLL:       23.0°C ✓ (green flash)
Scratchpad: (clears automatically)
```

**Validation**:

**Valid Input**:
```
Typed: 22.5
Scratchpad: 22.5* (green asterisk)
Press LSK → ✓ Accepted
```

**Invalid Input** (out of range):
```
Typed: 35
Scratchpad: 35* (red asterisk)
Error Line: BEREICH 16-30°C (amber)
Press LSK → Rejected, error beep
Scratchpad: (stays, waits for correction)
```

**Invalid Format**:
```
Typed: 22.5.5
Scratchpad: 22.5.5* (red asterisk)
Error Line: UNGÜLTIGES FORMAT (red)
Press LSK → Rejected
```

**Correction**:
```
If invalid input in scratchpad:
  Press CLR → Scratchpad clears
  Type correct value → Continue
```

**Numeric Input Types**:
| Type | Format | Example | Range |
|------|--------|---------|-------|
| Integer | `NN` | `75` | 0-100 |
| Decimal | `NN.N` | `22.5` | 16.0-30.0 |
| Percentage | `NN%` | `75%` | 0-100 |
| Time | `HH:MM` | `08:30` | 00:00-23:59 |

**Auto-Format**:
```
User types: 22
System formats as: 22.0°C (adds decimal + unit)

User types: 75
For brightness field: 75% (adds %)
```

### C.4 Edit Text (Keyboard + Scratchpad)

**Pattern**: Alphanumeric Keyboard + Scratchpad + LSK

**Use Case**: Scene names, search queries, device names

**Interaction Sequence**:

**Step 1: Navigate to Text Field**
```
Example: SZENEN > NEUE SZENE
Display:
  NAME:       [          ]← (LSK1L)
  GERÄTE:     [AUSWÄHLEN]→ (LSK2L)
```

**Step 2: Type Text**
```
Action: Type "ABENDESSEN" (using A-Z keyboard)
Scratchpad shows: ABENDESSEN*
Display: Field still shows [ ]
```

**Step 3: Confirm with LSK**
```
Action: Press LSK1L
Result: Text transfers to field
Display:
  NAME:       ABENDESSEN ✓ (green)
Scratchpad: (clears)
```

**Auto-Complete** (for known values):
```
Example: Room search

Typed: WOH
Scratchpad: WOH*
Display updates with suggestions:
  < WOHNZIMMER           (LSK2L)
  < WOHNZIMMER OG        (LSK3L)

Press LSK2L → "WOHNZIMMER*" in scratchpad
Press LSK1L → Accepted
```

**Text Input Constraints**:
| Field Type | Max Length | Valid Chars | Example |
|------------|------------|-------------|---------|
| Scene Name | 20 chars | A-Z, 0-9, space | "GUTE NACHT" |
| Device Search | 15 chars | A-Z, 0-9 | "LAMPE" |
| Room Name | 15 chars | A-Z, 0-9, space | "WOHNZIMMER" |

**Character Entry**:
```
On A-Z keyboard:
  Single press: Letter appears in scratchpad
  Hold: Repeat letter (AAAA...)
  Numeric keys: Numbers (if allowed)
  Special: Space, period, hyphen (if available)
```

**Editing Existing Text**:
```
Field shows: GUTE NACHT
Press LSK → Copies to scratchpad: GUTE NACHT*
Edit in scratchpad (not possible - must re-type fully)
Alternative: CLR + re-type

Note: No cursor-based editing (MCDU limitation)
Workaround: Copy existing, clear, type new
```

### C.5 Execute Action (Confirmation)

**Pattern**: LSK or OVFY to Confirm

**Use Case**: Activate scene, start process, delete item

**Two Confirmation Levels**:

**Level 1: No Confirmation** (safe actions)
```
Example: Activate scene "FILM MODUS"

Step 1: Press SZENEN
Step 2: Press LSK5L (FILM MODUS)
Result: ✓ SZENE AKTIV (immediate execution)

No confirmation needed - action is safe and reversible.
```

**Level 2: Soft Confirmation** (potentially disruptive)
```
Example: Activate "GUTE NACHT" (turns off all lights!)

Step 1: Press QUICK
Step 2: Press LSK1L (GUTE NACHT)
Display:
  SZENE STARTEN?
  GUTE NACHT
  ---
  ALLE LICHTER AUS
  TÜREN SPERREN
  ---
  < NEIN             JA*> (LSK6R)

Step 3: Press LSK6R OR press OVFY
Result: ✓ SZENE AKTIV

Confirmation shows WHAT will happen.
User can cancel with LSK (NEIN) or CLR.
```

**Level 3: Hard Confirmation** (critical/irreversible)
```
Example: Disarm security alarm

Step 1: Navigate to ALARMANLAGE
Step 2: Press LSK (DEAKTIVIEREN)
Display:
  ALARM DEAKTIVIEREN?
  ⚠️  SICHERHEIT REDUZIERT
  ---
  BESTÄTIGUNG NÖTIG
  DRÜCKE OVFY

Step 3: Press OVFY (LSK not accepted here)
Result: ✓ ALARM DEAKTIVIERT

Hard confirmation requires OVFY key specifically.
Prevents accidental execution.
```

**Confirmation Decision Tree**:
```
Is action reversible immediately? (e.g., toggle light)
  YES → No confirmation
  NO ↓

Is action disruptive? (e.g., "all lights off")
  YES → Soft confirmation (LSK or OVFY)
  NO ↓

Is action security-critical? (e.g., unlock door, disarm alarm)
  YES → Hard confirmation (OVFY only)
```

**Examples by Type**:

| Action | Confirmation | Key Required |
|--------|--------------|--------------|
| Toggle light | None | LSK toggle |
| Activate "Movie" scene | None | LSK |
| Activate "All Off" scene | Soft | LSK or OVFY |
| Unlock front door | Hard | OVFY only |
| Disarm alarm | Hard | OVFY only |
| Delete schedule | Soft | LSK or OVFY |
| Factory reset | Hard | OVFY only |

**Visual Confirmation Feedback**:
```
After action executes:
  ✓ AKTION ABGESCHLOSSEN (green, 2s)
  [Details of what happened]
  
Or:
  ✓ SZENE AKTIV
  12 GERÄTE GESTEUERT
```

### C.6 Scroll (List Navigation)

**Pattern**: SLEW Keys for Long Lists

**Use Case**: Device lists, event logs, schedules exceeding 14 lines

**List Types**:

**Short List** (fits on screen, ≤10 items):
```
SZENEN                  1/1
---
< GUTE NACHT           (LSK1L)
< GUTEN MORGEN         (LSK2L)
< FILM MODUS           (LSK3L)
< ABWESEND             (LSK4L)
< PARTY                (LSK5L)
< ARBEIT               (LSK6L)
< INDEX

No SLEW needed - all items visible.
```

**Long List** (>14 lines, requires scrolling):
```
GERÄTE                  1/4  ← Page indicator
---
 WOHNZIMMER
< STEHLAMPE      ON    (LSK1L)
< DECKENLAMPE    OFF   (LSK2L)
< THERMOSTAT     21.5  (LSK3L)
 KÜCHE
< DECKENLICHT    ON    (LSK4L)
< HERDLICHT      OFF   (LSK5L)
↓ MEHR (15 weitere)    ← Scroll indicator

Press SLEW ↓ to scroll down...
```

**Scrolling Behavior**:

**Discrete Scroll** (single press):
```
Action: Press SLEW ↓ once
Result: List shifts up by ~6 lines
        New items appear at bottom
        Top items disappear
```

**Continuous Scroll** (hold):
```
Action: Hold SLEW ↓
Result: List scrolls smoothly (1 line per 200ms)
        Stops when bottom reached
        Release to stop
```

**Scroll Indicators**:
```
Top of list:
  (no "↑ OBEN" indicator)
  
Middle of list:
  ↑ OBEN
  ...content...
  ↓ MEHR (X weitere)
  
Bottom of list:
  ↑ OBEN
  ...content...
  < ZURÜCK
  (no "↓ MEHR")
```

**Pagination** (alternative to scrolling):
```
Some lists use pages instead:

MELDUNGEN               1/3  ← Page 1 of 3
---
 19:34  BATTERIE SENSOR
 18:45  SZENE AKTIV
 14:20  LADEN FERTIG
 12:30  SYSTEM UPDATE
 11:15  BEWEGUNG GARTEN
 09:45  ALARM TEST
< ZURÜCK         WEITER> (LSK6R)

Press LSK6R → Jump to page 2 (shows next 6 messages)
Press SLEW → → Same as LSK6R (next page)
```

**Jump to Top/Bottom**:
```
Action: Press SLEW ↑ + SLEW ↓ simultaneously
Result: Jump to top of list

Action: Press CLR CLR (double-tap)
Result: Jump to bottom OR exit list (context-dependent)
```

**Selection from Scrolled List**:
```
User scrolls to find item:
  Press SLEW ↓ until "HEIZUNG BÜRO" visible
  
Item appears next to LSK:
  < HEIZUNG BÜRO   19.5  (LSK3L)
  
Press LSK3L:
  Navigate to HEIZUNG BÜRO detail page
```

**Smart Scroll** (context-aware):
```
If list has categories/headers:
  SLEW ↓ → Jumps to next category header (not line-by-line)
  
Example:
  GERÄTE
   WOHNZIMMER
   ...devices...
   KÜCHE         ← SLEW ↓ jumps here
   ...devices...
   SCHLAFZIMMER  ← SLEW ↓ jumps here
```

---

## D. Display Layout Patterns

### D.1 Menu Page Layout

**Purpose**: Present list of selectable options

**Structure** (14 lines total):
```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [SUBTITLE / STATUS]
Line 3:  [SEPARATOR] ---
Line 4:  [OPTION 1]            (LSK1L/R)
Line 5:  [OPTION 2]            (LSK2L/R)
Line 6:  [OPTION 3]            (LSK3L/R)
Line 7:  [OPTION 4]            (LSK4L/R)
Line 8:  [OPTION 5]            (LSK5L/R)
Line 9:  [OPTION 6]            (LSK6L/R)
Line 10: [OPTION 7]            (LSK1L/R, if scrolled)
Line 11: [OPTION 8]            ...
Line 12: [OPTION 9]            ...
Line 13: [NAV: < INDEX]    [NAV: WEITER>]
Line 14: [SCRATCHPAD CONTENT]
```

**Example**:
```
HAUPTMENÜ               1/2    ← Line 1: Title + page
ALL CATEGORIES              ← Line 2: Subtitle (optional)
---                         ← Line 3: Separator
< ENERGIE              (LSK1L) ← Lines 4-9: Options (6 per side)
< KLIMA                (LSK2L)
< LICHT                (LSK3L)
< SICHERHEIT           (LSK4L)
< SZENEN               (LSK5L)
< ZEITPLAN             (LSK6L)

> PHOTOVOLTAIK          (LSK1R)
> MULTIMEDIA            (LSK2R)
> VERSCHLUSS            (LSK3R)
> E-MOBILITÄT           (LSK4R)
> POOL                  (LSK5R)
> RÄUME                 (LSK6R)
< INDEX          WEITER>       ← Line 13: Navigation
                                ← Line 14: Scratchpad (empty here)
```

**LSK Indicators**:
- `<` = Left LSK selects this option
- `>` = Right LSK selects this option
- No indicator = No action (display only)

**Option States**:
```
Normal:     < SZENE NAME       (white)
Active:     < SZENE NAME ✓     (green)
Unavailable:  SZENE NAME       (grey, no LSK)
Warning:    < GERÄT NAME !     (amber)
Error:      < GERÄT NAME ❌     (red)
```

### D.2 Data Display Layout

**Purpose**: Show information, current states, sensor values

**Structure**:
```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [PRIMARY VALUE / STATUS]
Line 3:  [SEPARATOR] ---
Line 4:  [LABEL 1]:    [VALUE] [UNIT]
Line 5:  [LABEL 2]:    [VALUE] [UNIT]  (LSK if interactive)
Line 6:  [LABEL 3]:    [VALUE] [UNIT]
Line 7:  [SEPARATOR / CATEGORY HEADER]
Line 8:  [LABEL 4]:    [VALUE] [UNIT]
Line 9:  [LABEL 5]:    [VALUE] [UNIT]
Line 10: [LABEL 6]:    [VALUE] [UNIT]
Line 11: [...]
Line 12: [...]
Line 13: [NAV: < INDEX]    [NAV: DETAILS>]
Line 14: [SCRATCHPAD]
```

**Example**:
```
ENERGIE                 1/3    ← Line 1
AKTUELL:    2340 W             ← Line 2: Primary value
---                            ← Line 3
HEUTE:      12.4 kWh           ← Line 4: Data field
KOSTEN:     2.48 €             ← Line 5: Data field
SELBST:     78%                ← Line 6: Data field
---                            ← Line 7: Separator
NETZ:       +340 W  (LSK3L)    ← Line 8: Interactive field
PV:         2500 W  (LSK4L)    ← Line 9: Drilldown option
BATTERIE:   -500 W  (LSK5L)    ← Line 10: Drilldown option
WALLBOX:    0 W                ← Line 11
                               ← Lines 12-13: Empty or more data
< INDEX          DETAILS>      ← Line 13: Navigation
                               ← Line 14: Scratchpad
```

**Value Formatting**:
| Type | Format | Example | Color |
|------|--------|---------|-------|
| Power | `NNNN W` or `N.N kW` | `2340 W` | White |
| Energy | `NN.N kWh` | `12.4 kWh` | White |
| Temperature | `NN.N°C` | `22.5°C` | White |
| Percentage | `NN%` | `78%` | White |
| Currency | `N.NN €` | `2.48 €` | White |
| Time | `HH:MM:SS` | `14:32:15` | White |
| Date | `DD.MM.YYYY` | `14.02.2026` | White |

**Special Values**:
```
Unknown:    ---        (grey dashes)
Error:      ERR        (red)
Offline:    OFFLINE    (amber)
N/A:        N/A        (grey)
Infinite:   ∞          (white)
```

**Interactive Data** (LSK next to value):
```
NETZ:       +340 W  ← (LSK3L)

Pressing LSK3L → Navigate to NETZ details page
OR
Pressing LSK3L → Edit value (if modifiable)
```

**Color Coding for Values**:
```
Normal:         2340 W         (white)
User-modified:  22.5°C         (green)
Warning:        LOW            (amber)
Critical:       OFFLINE        (red)
Predicted:      ~12.5 kWh      (magenta, with ~ prefix)
```

### D.3 Input Page Layout

**Purpose**: Collect user input (temperature, time, name, etc.)

**Structure**:
```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [INSTRUCTION / CONTEXT]
Line 3:  [SEPARATOR] ---
Line 4:  [FIELD 1 LABEL]: [VALUE/BOX]  ← (LSK1L)
Line 5:  [FIELD 2 LABEL]: [VALUE/BOX]  ← (LSK2L)
Line 6:  [FIELD 3 LABEL]: [VALUE/BOX]  ← (LSK3L)
Line 7:  [...]
Line 8:  [HINT / EXAMPLE]
Line 9:  [...]
Line 10: [...]
Line 11: [...]
Line 12: [VALIDATION ERROR] (if any)
Line 13: [< ABBRECHEN]  [SPEICHERN*>]
Line 14: [SCRATCHPAD]
```

**Example 1: Temperature Input**
```
KLIMA > WOHNZIMMER      1/1
TEMPERATUR EINSTELLEN
---
IST:        21.8°C
SOLL:       [  .  ]°C  ← (LSK2L)
MODUS:      AUTO       (LSK3L)
---
HINWEIS: 16-30°C
SCHRITT: 0.5°C
---

< ABBRECHEN      ÜBERNEHMEN*
[Scratchpad: type value here]

User flow:
1. Type "22.5" → Scratchpad: 22.5*
2. Press LSK2L → Value transfers to SOLL field
3. Press ÜBERNEHMEN* (LSK6R) → Saved
```

**Example 2: Time Input**
```
ZEITPLAN > NEUE REGEL   1/1
ALARMZEIT FESTLEGEN
---
ZEIT:       [  :  ]    ← (LSK1L: HH:MM)
TAGE:       MO-FR      (LSK2L: Select)
AKTION:     SZENE      (LSK3L: Select)
---
FORMAT: HH:MM (24h)
BEISPIEL: 08:30
---

< ABBRECHEN      SPEICHERN*
[Scratchpad]
```

**Field Indicators**:
```
Empty field:     [     ]    (brackets, no content)
Placeholder:     [HH:MM]    (format hint)
Filled:          22.5°C     (value shown)
Editable:        22.5°C  ← (arrow indicates LSK)
Dropdown:        AUTO    ▼ (down arrow = options)
```

**Validation States**:
```
Valid input:
  Scratchpad: 22.5* (green asterisk)
  Field: Ready to accept
  
Invalid input:
  Scratchpad: 35* (red asterisk)
  Error line 12: BEREICH 16-30°C (amber)
  Field: Rejects transfer
  
Empty required:
  Field: [     ] (red border if validation fails)
  Error: PFLICHTFELD (red)
```

**Multi-Step Input**:
```
Some inputs require multiple steps:

Step 1: Select option from list
  SZENE:      [AUSWÄHLEN]→ (LSK3L)
  
  Press LSK3L → Navigate to scene selection
  
Step 2: Select scene
  < GUTE NACHT       (LSK1L)
  < FILM MODUS       (LSK2L)
  
  Press LSK1L → "GUTE NACHT" selected
  
Step 3: Return to input page
  SZENE:      GUTE NACHT ✓ (green)
```

### D.4 Confirmation Page Layout

**Purpose**: Confirm before executing critical action

**Structure**:
```
Line 1:  [ACTION TITLE]
Line 2:  [WARNING / IMPACT]
Line 3:  [SEPARATOR] ---
Line 4:  [DETAIL 1: What will happen]
Line 5:  [DETAIL 2: Affected items]
Line 6:  [DETAIL 3: Consequences]
Line 7:  [SEPARATOR] ---
Line 8:  [COUNTDOWN or INSTRUCTIONS]
Line 9:  [...]
Line 10: [...]
Line 11: [...]
Line 12: [...]
Line 13: [< NEIN / ABBRECHEN]  [JA* / BESTÄTIGEN*>]
Line 14: [SCRATCHPAD - IGNORED]
```

**Example 1: Soft Confirmation**
```
SZENE STARTEN?          ← Line 1: Question
GUTE NACHT              ← Line 2: Scene name
---                     ← Line 3
AKTION:
  12 LICHTER AUS        ← Lines 4-6: What will happen
  3 TÜREN SPERREN
  HEIZUNG 18°C
---
FORTFAHREN?
---


< NEIN               JA*  ← Line 13: Cancel / Confirm
                            (Scratchpad not used)

User can:
  - Press LSK (NEIN) → Cancel, return to previous page
  - Press LSK6R (JA*) or OVFY → Execute
```

**Example 2: Hard Confirmation**
```
ALARM DEAKTIVIEREN?
⚠️  SICHERHEIT REDUZIERT
---
AKTION:
  ALLE SENSOREN INAKTIV
  KAMERAS AUF INFO-MODUS
  TÜRSCHLÖSSER BLEIBEN GESPERRT
---
BESTÄTIGUNG NÖTIG:
  DRÜCKE OVFY

< ABBRECHEN
                     ← Line 14: Scratchpad (not used)

User must:
  - Press OVFY → Execute
  - LSK (JA) not accepted! (hard confirmation)
  - Press CLR or LSK (ABBRECHEN) → Cancel
```

**Countdown Confirmation** (for destructive actions):
```
SYSTEM NEUSTART?
⚠️  ALLE VERBINDUNGEN GETRENNT
---
NEUSTART IN: 10s       ← Countdown (updates each second)
---
ABBRECHEN?
  DRÜCKE CLR ODER LSK


< ABBRECHEN
                     ← Scratchpad

Countdown:
  10, 9, 8, 7...
  At 0 → Action executes
  Press CLR or LSK → Cancels countdown
```

### D.5 List Page Layout

**Purpose**: Display scrollable list of items (devices, events, logs)

**Structure**:
```
Line 1:  [PAGE TITLE]         [PAGE #]
Line 2:  [COUNT / FILTER INFO]
Line 3:  [SEPARATOR] ---
Line 4:  [CATEGORY HEADER] (optional)
Line 5:  [< ITEM 1]            (LSK1L)
Line 6:  [< ITEM 2]            (LSK2L)
Line 7:  [< ITEM 3]            (LSK3L)
Line 8:  [CATEGORY HEADER] (optional)
Line 9:  [< ITEM 4]            (LSK4L)
Line 10: [< ITEM 5]            (LSK5L)
Line 11: [< ITEM 6]            (LSK6L)
Line 12: [↓ MEHR (X weitere)] or [...]
Line 13: [< ZURÜCK]        [FILTER>]
Line 14: [SCRATCHPAD]
```

**Example 1: Device List**
```
GERÄTE                  1/4  ← Page 1 of 4 (48 devices, 12/page)
ALLE (48 GERÄTE)             ← Filter status
---
 WOHNZIMMER                  ← Category header (not selectable)
< STEHLAMPE      ON    (LSK1L)
< DECKENLAMPE    OFF   (LSK2L)
< THERMOSTAT     21.5  (LSK3L)
 KÜCHE
< DECKENLICHT    ON    (LSK4L)
< HERDLICHT      OFF   (LSK5L)
< THERMOSTAT     20.0  (LSK6L)
↓ MEHR (42 weitere)          ← Scroll indicator
< ZURÜCK         FILTER>     ← Navigation
                             ← Scratchpad

Press SLEW ↓ or LSK (WEITER) → Next items
```

**Example 2: Event Log**
```
MELDUNGEN               1/3
NEU: 2 | ALLE: 24
---
!19:34  BATTERIE SENSOR (LSK1L) ← ! = Warning (amber)
 18:45  SZENE AKTIV     (LSK2L)
 14:20  LADEN FERTIG    (LSK3L)
 12:30  SYSTEM UPDATE   (LSK4L)
 11:15  BEWEGUNG GARTEN (LSK5L)
 09:45  ALARM TEST      (LSK6L)


< ZURÜCK         WEITER>
                         ← Scratchpad

Icon meanings:
  ! = Warning (amber)
  ❌ = Error (red)
  ✓ = Success (green)
  (space) = Info (white)
```

**Example 3: Grouped List**
```
KLIMA                   1/2
8 RÄUME | Ø 21.2°C
---
< WOHNZIMMER     22.0  (LSK1L: Detail)
< KÜCHE          20.5  (LSK2L)
< SCHLAFZIMMER   19.5  (LSK3L)
< KINDERZIMMER   21.0  (LSK4L)
< BAD            23.0  (LSK5L)
< BÜRO           20.0  (LSK6L)
↓ MEHR (2 weitere)
< ZURÜCK         ALLE→
                      ← Scratchpad

LSK actions:
  Press LSK → Navigate to room detail
  Press "ALLE→" → Set all rooms to same temp
```

**List Item Format**:
```
General pattern:
[ICON] [TIME] [NAME]      [VALUE] [(LSK)]

Examples:
 19:34  LICHT AN              (timestamp, event, no value)
< STEHLAMPE      ON     (LSK) (device, state, interactive)
!14:20  BATTERIE     15% (LSK) (warning, device, value, interactive)
 WOHNZIMMER                   (category header, not interactive)
```

**Scroll Indicators**:
```
Top of list:
  (no ↑ indicator)
  
Middle:
  ↑ OBEN (shows if scrolled down)
  ...items...
  ↓ MEHR (X weitere)
  
Bottom:
  ↑ OBEN
  ...items...
  < ZURÜCK
```

---

## E. Standard Functions (Always Available)

### E.1 BRT/DIM (Brightness Control)

**Purpose**: Adjust MCDU display brightness

**Behavior**:
- Works on ANY page (does not navigate away)
- No scratchpad interaction
- Immediate visual feedback
- 5-10 discrete brightness levels

**Usage**:
```
Press BRT → Brightness +1 level
Press DIM → Brightness -1 level
Hold BRT → Continuous increase (to max)
Hold DIM → Continuous decrease (to min)
```

**Visual Feedback**:
```
Brief overlay (1 second):
┌─────────────────────┐
│  HELLIGKEIT: ████░  │  ← Bar graph (5 of 8)
└─────────────────────┘

Then: Overlay disappears, normal page shown
```

**Brightness Levels**:
```
Level 1: 10% (night mode - very dim)
Level 2: 20%
Level 3: 35%
Level 4: 50%
Level 5: 65% (default)
Level 6: 80%
Level 7: 90%
Level 8: 100% (maximum, outdoor/daylight)
```

**Auto-Brightness** (optional, if light sensor available):
```
In EINSTELLUNGEN > ANZEIGE:
  AUTO-HELLIGKEIT: AN  (LSK toggle)
  
If enabled:
  - System adjusts brightness based on ambient light
  - BRT/DIM still work (manual override for 5 minutes)
  - After 5 min, returns to auto mode
```

**Persistence**:
- Brightness setting saved across restarts
- Per-user setting (if multi-user system)

### E.2 CLR (Clear / Back / Cancel)

**Purpose**: Multi-function context-aware key

**Behavior by Context** (priority order):

**Context 1: Scratchpad Contains Data**
```
Scratchpad: 22.5*
Press: CLR
Result: Scratchpad clears → (empty)
Page: Unchanged
```

**Context 2: Scratchpad Empty, Edit Mode Active**
```
Field: SOLL: [  .  ]°C  ← (cursor/edit active)
Press: CLR
Result: Exit edit mode, field unchanged
Page: Unchanged
```

**Context 3: Scratchpad Empty, On Sub-Page**
```
Current page: KLIMA > WOHNZIMMER
Press: CLR
Result: Navigate back to KLIMA main page
```

**Context 4: Scratchpad Empty, On Category Main Page**
```
Current: ENERGIE (main page)
Press: CLR
Result: Return to HAUPTMENÜ or previous category
```

**Context 5: Double-Press (Emergency Exit)**
```
Current: Any page (any depth)
Action: CLR CLR (within 1 second)
Result: Jump to HAUPTMENÜ or STATUS page
Visual: [BRIEF FLASH] "ZURÜCK ZU HAUPTMENÜ"
```

**Context 6: During Confirmation**
```
Confirmation page showing:
  SZENE STARTEN?
  < NEIN         JA*>
  
Press: CLR
Result: Cancel = same as pressing NEIN (LSK)
Return to previous page
```

**Visual Feedback**:
```
On scratchpad clear:
  Scratchpad: 22.5* → (flash) → (empty)
  
On navigation back:
  Current page fades out (100ms)
  Previous page fades in (100ms)
  Optional: Brief "← ZURÜCK" indicator (amber, 0.5s)
```

**Error Prevention**:
```
If CLR would cause data loss:
  Display warning:
    ÄNDERUNGEN VERWERFEN?
    < NEIN         JA*>
    
  User must confirm or CLR again to proceed
```

### E.3 OVFY (Confirm / Execute)

**Purpose**: Confirm critical actions, execute pending changes

**Use Cases**:

**Use Case 1: Hard Confirmation Required**
```
Confirmation page shows:
  ALARM DEAKTIVIEREN?
  ---
  BESTÄTIGUNG NÖTIG
  DRÜCKE OVFY
  
  < ABBRECHEN

Press: OVFY
Result: Action executes
Visual: ✓ ALARM DEAKTIVIERT (green flash)

Note: LSK (JA) NOT accepted here - OVFY only!
```

**Use Case 2: Soft Confirmation Shortcut**
```
Confirmation page shows:
  SZENE STARTEN?
  < NEIN         JA*>
  
Press: OVFY (instead of LSK JA)
Result: Action executes immediately
Benefit: Faster than aiming for LSK6R
```

**Use Case 3: Execute Pending Changes**
```
After editing multiple fields:
  Display shows:
    3 ÄNDERUNGEN AUSSTEHEND
    DRÜCKE OVFY ZUM SPEICHERN
    
Press: OVFY
Result: All changes saved at once
Visual: ✓ GESPEICHERT
```

**Use Case 4: Bypass Warning** (use with caution!)
```
Warning shown:
  ⚠️  GERÄT OFFLINE
  TROTZDEM SENDEN?
  
Press: OVFY
Result: Sends command despite warning
Use case: User knows device will come online soon
```

**Visual Feedback**:
```
After OVFY press:
  Brief flash (green if success, red if error)
  
  ✓ BESTÄTIGT (green, 1s)
  or
  ❌ ABGELEHNT (red, 2s with reason)
```

**When OVFY Does Nothing**:
- On normal data display pages (no action to confirm)
- On menu pages (LSK selects, OVFY not needed)
- If no confirmation prompt is active

**Sound** (if available):
- Success: Single beep (pleasant tone)
- Error: Double beep (warning tone)
- Critical confirmation: Triple beep + action

### E.4 MENU (Main Menu Jump)

**Purpose**: Instant return to HAUPTMENÜ from anywhere

**Behavior**:
```
Current page: ANY page, any depth
Press: MENU
Result: Immediate jump to HAUPTMENÜ page 1
Scratchpad: Preserved (not cleared)
```

**Use Cases**:

**Use Case 1: Lost in Navigation**
```
User: "Where am I? Too deep!"
Action: Press MENU
Result: Back to familiar main menu
```

**Use Case 2: Switch Categories**
```
Current: KLIMA > WOHNZIMMER > Editing temp
Want: Check ENERGIE status
Action: Press MENU → Select ENERGIE
Alternative: Press FUEL function key (if mapped)
```

**Use Case 3: Start Over**
```
User made errors in scratchpad/navigation
Action: Press MENU → Reset to known state
Note: Scratchpad NOT cleared (intentional - data preserved)
```

**Always Returns to Page 1**:
```
HAUPTMENÜ always shows page 1 first:
  HAUPTMENÜ               1/2
  ---
  < ENERGIE
  < KLIMA
  ...
  
User can SLEW → to page 2 if needed
```

**Non-Configurable**:
- MENU key ALWAYS opens HAUPTMENÜ
- Cannot be remapped to another function
- Safety feature - always accessible escape route

**Interaction with Scratchpad**:
```
Before:
  Page: KLIMA > WOHNZIMMER
  Scratchpad: 22.5*
  
Press: MENU

After:
  Page: HAUPTMENÜ
  Scratchpad: 22.5* (still there!)
  
Reason: User might want to use same value elsewhere
If not needed: Press CLR to clear
```

### E.5 SLEW (Navigation / Scroll)

**Purpose**: Multi-directional navigation and list scrolling

**Four Directions**: ←, →, ↑, ↓

**Behavior by Context**:

**Context 1: On Category Main Page (Horizontal Navigation)**
```
Current: ENERGIE (main page)
Press: SLEW →
Result: Navigate to next category (per function key order)
Example: ENERGIE → KLIMA → LICHT → ...

Press: SLEW ←
Result: Navigate to previous category
Example: ENERGIE → ZEITPLAN → ... (circular)
```

**Context 2: On Multi-Page Category (Page Navigation)**
```
Current: ENERGIE page 1/3
Press: SLEW →
Result: Navigate to ENERGIE page 2/3

Press: SLEW ←
Result: Navigate back to ENERGIE page 1/3
```

**Context 3: On Long List (Vertical Scrolling)**
```
Current: GERÄTE list (50 items, showing 1-12)
Press: SLEW ↓
Result: Scroll down ~6 lines
Display: Now showing items 7-18

Press: SLEW ↑
Result: Scroll up ~6 lines
Display: Back to items 1-12
```

**Context 4: No Effect**
```
Current: Single-page info display (1/1)
Press: SLEW (any direction)
Result: No action (nothing to navigate)
Optional: Brief "← →" flash (indicates navigation available)
```

**Hold Behavior** (continuous action):
```
Action: Hold SLEW ↓ for >0.5s
Result: Continuous scroll (smooth, ~5 lines/second)
Release: Stop at current position

Action: Hold SLEW → for >0.5s
Result: Rapid page navigation
Visual: Page numbers flash (1/3, 2/3, 3/3, 1/3...)
```

**Circular Navigation** (wraps around):
```
Categories:
  ENERGIE → ... → ZEITPLAN → SLEW → → ENERGIE (wraps)
  
Pages within category:
  Page 1/3 → Page 2/3 → Page 3/3 → SLEW → → Page 1/3 (wraps)
```

**Visual Feedback**:
```
On page change:
  Current page: ENERGIE 1/3
  Press SLEW →
  Brief transition (100ms slide animation if possible)
  New page: ENERGIE 2/3
  
On scroll:
  Items shift up/down
  Scroll indicators update:
    ↓ MEHR (X weitere) → Decrements X
```

**Shortcuts**:
```
SLEW ↑ + SLEW ↓ simultaneously:
  → Jump to top of list
  
SLEW ← + SLEW → simultaneously:
  → Jump to page 1 (reset pagination)
```

---

## F. Color Coding Strategy

### F.1 Color Palette

**Available Colors** (WinWing MCDU-32-CAPTAIN):
- **W** = White
- **G** = Green
- **A** = Amber
- **R** = Red
- **Y** = Yellow (if available)
- **M** = Magenta (if available)
- **E** = Cyan (if available)

**Note**: Blue (B) not available in our palette - use White for titles/labels.

### F.2 Color Meanings (Semantic Usage)

**White (W) - Normal Data & Labels**

**Usage**:
- Default color for all text
- Current values (temperatures, power, etc.)
- Page titles
- Labels for data fields
- Device names
- Normal status indicators

**Examples**:
```
ENERGIE                 1/3    (White title)
AKTUELL:    2340 W             (White label & value)
NETZ:       +340 W             (White value)
```

---

**Green (G) - Active, Confirmed, User-Set**

**Usage**:
- User-entered data (after confirmation)
- Active states (lights ON, heating ACTIVE)
- Confirmed actions (✓ symbols)
- Successful operations
- Scene currently active

**Examples**:
```
SOLL:       22.5°C ✓      (Green - user just set this)
< STEHLAMPE      ON       (Green ON - light is on)
✓ SZENE AKTIV             (Green checkmark & text)
FILM MODUS ✓              (Green - scene active)
```

**Duration**:
- Permanent green: Active states (ON, ACTIVE, etc.)
- Temporary green: Confirmations (flash 1-2s, then white)

---

**Amber (A) - Modifiable, Warnings, Needs Attention**

**Usage**:
- Editable fields (indicates "you can change this")
- Warnings (non-critical issues)
- Devices that need attention (low battery, offline)
- Pending actions (awaiting confirmation)
- Caution messages

**Examples**:
```
SOLL:       [  .  ]°C  ←  (Amber brackets/arrow - editable)
!BATTERIE NIEDRIG         (Amber ! and text - warning)
GERÄT OFFLINE             (Amber - needs attention)
DRÜCKE OVFY               (Amber - action pending)
```

**Error Messages** (amber vs red):
- Amber: Recoverable warnings, low priority
- Red: Critical errors, failures

---

**Red (R) - Alerts, Failures, Critical**

**Usage**:
- Critical errors
- Security alerts (alarm triggered)
- System failures
- Dangerous states
- Invalid input (rejection)

**Examples**:
```
❌ GERÄT FEHLER           (Red X and text - device failed)
ALARM AUSGELÖST!          (Red - security alert!)
FEHLER: OFFLINE           (Red - critical error)
Scratchpad: 35* (RED)     (Red asterisk - invalid input)
```

**When to Use Red**:
- Something is broken or failed
- Security is compromised
- User action required immediately
- Data is out of valid range (hard error)

---

**Yellow (Y) - Cautions (if available)**

**Usage**:
- Less severe than amber
- Informational cautions
- Temporary states
- "FYI" level warnings

**Examples**:
```
SYSTEM NEUSTART BALD      (Yellow - heads up)
GERÄTE NICHT OPTIMAL      (Yellow - sub-optimal but OK)
```

**If Yellow Not Available**: Use Amber for cautions.

---

**Magenta (M) - Predicted / Future Values (if available)**

**Usage**:
- Forecasted data (energy production, weather)
- Scheduled future events
- Predicted states
- Automation targets

**Examples**:
```
PV PROGNOSE: ~15.2 kWh    (Magenta ~ and value - forecast)
20:00  SZENE GEPLANT      (Magenta time - future event)
ERWARTET:    18°C         (Magenta - predicted temp)
```

**Prefix Convention**: Use `~` to indicate predicted value.

**If Magenta Not Available**: Use White with `~` prefix.

---

**Cyan/E - Special Indicators (if available)**

**Usage**:
- Special modes (manual override, vacation mode)
- System indicators
- Unusual states (not errors, just different)

**Examples**:
```
MANUELL AKTIV             (Cyan - manual override mode)
URLAUBS-MODUS             (Cyan - special mode)
```

**If Cyan Not Available**: Use White or Amber.

---

### F.3 Color Combinations & Precedence

**Priority Order** (highest to lowest):
1. **Red** - Critical errors, security alerts
2. **Amber** - Warnings, needs attention
3. **Green** - Active/confirmed states
4. **Magenta** - Predicted values
5. **White** - Normal data

**Conflict Resolution**:
```
Device is:
  - ON (green)
  - But OFFLINE (amber/red)
  
Display:
  < STEHLAMPE      OFFLINE  (Red - error takes precedence)
  
Not:
  < STEHLAMPE      ON       (Would hide the problem!)
```

**Multi-Color Lines**:
```
Some lines use multiple colors:

NETZ:       +340 W  (LSK)
[Label: White] [Value: White] [(LSK): Amber if interactive]

!BATTERIE     15%   (LSK)
[!: Amber] [Label: White] [Value: Amber] [(LSK): Amber]

✓ SZENE AKTIV
[✓: Green] [Text: Green for 1s, then white]
```

### F.4 Color Transitions

**State Changes**:
```
Light toggled OFF → ON:
  Before: < STEHLAMPE      OFF  (white)
  Action: Press LSK
  During: < STEHLAMPE      ... (amber, sending)
  After:  < STEHLAMPE      ON ✓ (green flash 1s)
  Final:  < STEHLAMPE      ON  (green, permanent)
```

**User Input Accepted**:
```
Scratchpad: 22.5* (green asterisk)
Press LSK:
  Field: 22.5°C ✓ (green flash 1s)
  Then:  22.5°C   (green, permanent as user-set)
After some time (device settles):
  Field: 22.5°C   (white, now "normal" state)
```

**Error Correction**:
```
Invalid: Scratchpad: 35* (red asterisk)
Error:   BEREICH 16-30°C  (red, 2s)
Correct: Scratchpad: 22.5* (green asterisk)
Accept:  ✓ GESPEICHERT    (green, 1s)
```

---

## G. Error Handling & Feedback

### G.1 Invalid Input Handling

**Validation Levels**:

**Level 1: Keystroke Validation** (prevent invalid characters)
```
Context: Numeric field (temperature)
User presses: Letter "A"
Result: Keystroke rejected, no character in scratchpad
Feedback: Brief beep (if sound enabled)
```

**Level 2: Format Validation** (scratchpad)
```
User types: "22.5.5" (invalid decimal)
Scratchpad shows: 22.5.5* (RED asterisk)
Error line: UNGÜLTIGES FORMAT (red)
Action: User must CLR and re-type
```

**Level 3: Range Validation** (before transfer)
```
User types: "35" (out of range for temp)
Scratchpad shows: 35* (RED asterisk)
Error line: BEREICH 16-30°C (amber)
Press LSK: Rejected (beep), scratchpad stays
Action: User must CLR and type valid value
```

**Level 4: Business Logic Validation** (after transfer)
```
User sets temp to 16°C (minimum)
System checks: Window is OPEN
Error: FENSTER OFFEN - HEIZUNG INAKTIV (amber warning)
Temp field: 16°C (amber - set but not effective)
User action: Close window OR override warning
```

**Error Message Format**:
```
[Normal page content above]
...
Line 12: [ERROR ICON] [ERROR MESSAGE]
Line 13: [HINT or CORRECTION]
Line 14: [SCRATCHPAD with invalid data]

Example:
...
FEHLER: BEREICH 16-30°C     (Line 12, red)
SCHRITT: 0.5°C              (Line 13, amber hint)
35*                         (Line 14, scratchpad red)
```

**Common Errors**:

| Error Type | Message | Color | Solution |
|------------|---------|-------|----------|
| Out of range | `BEREICH 16-30°C` | Amber | Type value in range |
| Invalid format | `FORMAT UNGÜLTIG` | Red | Check format (HH:MM, NN.N) |
| Required field | `PFLICHTFELD` | Red | Enter a value |
| Device offline | `GERÄT OFFLINE` | Red | Wait or check device |
| Not found | `NICHT GEFUNDEN` | Red | Check spelling/ID |
| Already exists | `BEREITS VORHANDEN` | Amber | Choose different name |
| System busy | `BITTE WARTEN...` | Amber | Wait a moment |
| Permission denied | `KEINE BERECHTIGUNG` | Red | Check user rights |

### G.2 Confirmation Requirements

**Action Risk Classification**:

**Low Risk** (no confirmation):
- Toggle light on/off
- Adjust brightness/volume
- View information
- Navigate between pages
- Activate reversible scene (e.g., "Movie Mode")

**Medium Risk** (soft confirmation):
- Activate disruptive scene (e.g., "All Lights Off")
- Start/stop heating
- Lock/unlock door (if not security-critical)
- Delete schedule
- Send notification

**High Risk** (hard confirmation - OVFY required):
- Disarm security alarm
- Unlock main entrance door
- Delete all schedules
- Factory reset
- Trigger emergency action

**Confirmation Pattern by Risk**:

**Soft Confirmation**:
```
Step 1: User triggers action (LSK)
Display:
  [ACTION NAME]
  [DESCRIPTION OF IMPACT]
  ---
  < NEIN         JA*>
  
Step 2: User presses LSK (JA) or OVFY
Result: Action executes

Cancel: Press LSK (NEIN) or CLR
```

**Hard Confirmation**:
```
Step 1: User triggers action
Display:
  [ACTION NAME]
  ⚠️  [WARNING / CONSEQUENCES]
  ---
  BESTÄTIGUNG NÖTIG:
  DRÜCKE OVFY
  
  < ABBRECHEN

Step 2: User MUST press OVFY (LSK not accepted)
Result: Action executes

Cancel: Press LSK (ABBRECHEN) or CLR
```

**Timeout Confirmation**:
```
For destructive actions, add countdown:

SYSTEM NEUSTART?
NEUSTART IN: 10s
---
ABBRECHEN?
  DRÜCKE CLR

[Countdown 10, 9, 8, 7...]

Press CLR → Cancels
Timeout reaches 0 → Executes
```

### G.3 Success Feedback

**Visual Feedback** (primary):

**Type 1: Checkmark Flash**
```
Action: Toggle light on
Display:
  Before: < STEHLAMPE      OFF  (white)
  After:  < STEHLAMPE      ON ✓ (green, 1s)
  Final:  < STEHLAMPE      ON   (green)
```

**Type 2: Confirmation Message**
```
Action: Scene activated
Display (brief overlay, 2s):
  ┌─────────────────────┐
  │  ✓ SZENE AKTIV      │
  │  12 GERÄTE          │
  └─────────────────────┘
Then: Return to previous page or scene list
```

**Type 3: Field Update**
```
Action: Set temperature
Display:
  Before: SOLL: 21.0°C
  During: SOLL: ...      (amber, processing)
  After:  SOLL: 22.5°C ✓ (green flash 1s)
  Final:  SOLL: 22.5°C   (green/white)
```

**Type 4: LED Indicator**
```
Action: Activate scene
LED: CLR (Scene Active LED)
  Before: Off
  After:  Solid green
  
Action: System error
LED: FAIL
  Before: Off
  After:  Blinking red
```

**Audio Feedback** (if enabled):
- Success: Single beep (pleasant tone, ~440 Hz, 100ms)
- Error: Double beep (warning tone, ~220 Hz, 100ms + 100ms)
- Critical confirm: Triple beep (before action)

**Haptic Feedback** (if available):
- Not typically available on MCDU hardware
- If implemented: Brief vibration on button press

**Feedback Timing**:
```
Instant feedback (<100ms):
  - Visual button press highlight
  - Scratchpad character appears
  - Page navigation
  
Quick feedback (100-500ms):
  - Toggle state change (if device responds fast)
  - Menu selection
  
Delayed feedback (500ms-2s):
  - Network device control (show "SENDE..." then result)
  - Scene activation (multiple devices)
  - System operations
  
Timeout (>5s):
  - Show error if no response
```

### G.4 Error Messages (Detailed)

**Error Message Structure**:
```
[ICON] [CATEGORY]: [SPECIFIC MESSAGE]

Examples:
❌ GERÄT: NICHT ERREICHBAR
⚠️  EINGABE: BEREICH 16-30°C
ℹ️  HINWEIS: FENSTER OFFEN
```

**Error Categories**:

**Device Errors**:
```
GERÄT OFFLINE              (Red - device not responding)
GERÄT FEHLER               (Red - device reported error)
VERBINDUNG VERLOREN        (Red - network issue)
TIMEOUT                    (Amber - device slow to respond)
```

**Input Errors**:
```
UNGÜLTIGE EINGABE          (Red - invalid data)
BEREICH X-Y                (Amber - value out of range)
FORMAT UNGÜLTIG            (Red - wrong format)
PFLICHTFELD                (Red - required field empty)
```

**System Errors**:
```
SYSTEM BESCHÄFTIGT         (Amber - wait)
SPEICHER VOLL              (Red - storage issue)
VERBINDUNG GETRENNT        (Red - ioBroker offline)
UNBEKANNTER FEHLER         (Red - catch-all)
```

**Authorization Errors**:
```
KEINE BERECHTIGUNG         (Red - user not allowed)
PIN ERFORDERLICH           (Amber - need authentication)
GESPERRT                   (Red - locked out)
```

**Recovery Instructions**:
```
Error messages should include recovery hint:

GERÄT OFFLINE
→ PRÜFE VERBINDUNG

BEREICH 16-30°C
→ WERT ANPASSEN

VERBINDUNG VERLOREN
→ WARTE ODER NEUSTART
```

**Error Codes** (optional, for troubleshooting):
```
For advanced users, show error codes:

FEHLER: TIMEOUT [E304]
```

---

## H. LED Usage Strategy

### H.1 LED Assignments

**11 LEDs Available** (WinWing MCDU-32-CAPTAIN):
- FAIL, MCDU, FM1, FM2, IND, RDY, DSPY, OFST, MSG, CLR, EXEC

**Semantic Mapping** (from MCDU-SMARTHOME-MAPPING.md):

| LED | Smart Home Meaning | States | Priority |
|-----|-------------------|--------|----------|
| **FAIL** | Security alarm triggered | Off / Blink (critical) / Solid (warning) | HIGHEST |
| **MCDU** | MCDU connection OK | Solid (connected) / Off (disconnected) | High |
| **FM1** | ioBroker Host 1 online | Solid (online) / Off (offline) | High |
| **FM2** | ioBroker Host 2 online (HA setup) | Solid (online) / Off (offline) | Medium |
| **IND** | Manual override active | Solid (manual mode) / Off (auto mode) | Medium |
| **RDY** | System ready | Solid (ready) / Off (not ready) | High |
| **DSPY** | New message/notification | Blink (unread) / Off (none) | Medium |
| **OFST** | Automation running | Solid (active) / Off (none) | Low |
| **MSG** | Critical alert | Blink (critical) / Off (none) | High |
| **CLR** | Scene active | Solid (active) / Off (inactive) | Low |
| **EXEC** | Pending action (needs confirm) | Blink (waiting) / Off (none) | Medium |

### H.2 LED States & Meanings

**FAIL** - Security Alarm

**States**:
- **Off**: Alarm not triggered, all OK
- **Blink fast** (2 Hz): Alarm TRIGGERED (intrusion detected!)
- **Blink slow** (0.5 Hz): Alarm warning (sensor faulted, low battery)
- **Solid**: Alarm armed but not triggered

**Use Case**:
```
Scenario 1: Alarm triggers
  FAIL LED: Off → Blink fast (red)
  MSG LED: Blink (critical alert)
  Display: ALARM! BEWEGUNG ERKANNT
  
Scenario 2: Sensor battery low
  FAIL LED: Off → Blink slow (amber)
  DSPY LED: Blink (notification)
  Display: Warning message in MELDUNGEN
```

---

**MCDU** - MCDU Connection Status

**States**:
- **Solid green**: MCDU connected to ioBroker
- **Off**: MCDU disconnected or offline

**Use Case**:
```
System starts:
  MCDU LED: Off → Solid green (connected)
  
Connection lost:
  MCDU LED: Solid → Off
  Display: VERBINDUNG VERLOREN (red error)
```

**Always-On Indicator**: This LED should be solid green during normal operation.

---

**FM1 / FM2** - ioBroker Host Status

**States**:
- **Solid green**: ioBroker instance online
- **Off**: ioBroker instance offline
- **Blink**: ioBroker starting/restarting

**Use Case**:
```
Single ioBroker setup:
  FM1 LED: Solid green
  FM2 LED: Off (not used)
  
High-availability setup:
  FM1 LED: Solid green (primary)
  FM2 LED: Solid green (backup)
  
Failover:
  FM1 LED: Off (primary failed)
  FM2 LED: Solid green (backup took over)
```

---

**IND** - Manual Override Active

**States**:
- **Solid amber**: Manual mode active (automation overridden)
- **Off**: Auto mode (normal operation)

**Use Case**:
```
User manually sets temperature:
  IND LED: Off → Solid amber
  Indicates: Heating schedule is overridden
  
Return to auto:
  Press "AUTO" mode LSK
  IND LED: Solid amber → Off
```

---

**RDY** - System Ready

**States**:
- **Solid green**: All systems operational
- **Off**: System not ready (errors, offline devices)
- **Blink slow**: Degraded (some devices offline, but core functional)

**Use Case**:
```
Startup:
  RDY LED: Off → Blink → Solid green (ready)
  
5 of 50 devices offline:
  RDY LED: Solid → Blink slow (degraded)
  
Critical device offline:
  RDY LED: Blink slow → Off (not ready)
```

**Criteria for "Ready"**:
- ioBroker online
- MCDU connected
- <10% of devices offline
- No critical errors

---

**DSPY** - New Message/Notification

**States**:
- **Blink amber** (1 Hz): Unread messages
- **Off**: No unread messages

**Use Case**:
```
New notification arrives:
  DSPY LED: Off → Blink amber
  
User views MELDUNGEN page:
  DSPY LED: Blink amber → Off (acknowledged)
```

---

**OFST** - Automation Running

**States**:
- **Solid green**: Automation/schedule active
- **Off**: No automation running

**Use Case**:
```
Schedule triggers:
  18:00 - "Abend" scene scheduled
  OFST LED: Off → Solid green (scene executing)
  After 30s: OFST LED → Off (complete)
```

---

**MSG** - Critical Alert

**States**:
- **Blink red** (2 Hz): Critical alert (security, fire, flood)
- **Off**: No critical alerts

**Use Case**:
```
Water leak detected:
  MSG LED: Off → Blink red
  FAIL LED: Blink slow (amber warning)
  Display: ⚠️  WASSER ERKANNT! (red)
  
User acknowledges:
  MSG LED: Blink → Off
```

---

**CLR** - Scene Active

**States**:
- **Solid green**: One or more scenes active
- **Off**: No scenes active

**Use Case**:
```
Activate "Film Modus":
  CLR LED: Off → Solid green
  
Deactivate scene:
  CLR LED: Solid green → Off
  
Multiple scenes:
  CLR LED stays solid green (as long as ANY scene active)
```

---

**EXEC** - Pending Action

**States**:
- **Blink amber** (1 Hz): Confirmation needed
- **Off**: No pending action

**Use Case**:
```
User triggers critical action:
  Display: ALARM DEAKTIVIEREN? DRÜCKE OVFY
  EXEC LED: Off → Blink amber
  
User presses OVFY:
  EXEC LED: Blink → Off (action executed)
  
User cancels (CLR):
  EXEC LED: Blink → Off (action cancelled)
```

---

### H.3 LED Priority & Conflicts

**Conflict**: Multiple conditions want same LED

**Resolution by Priority**:
```
Example: FAIL LED
  Condition 1: Alarm triggered (critical)
  Condition 2: Sensor battery low (warning)
  
  Result: FAIL LED blinks fast (critical takes precedence)
  Warning shown in MELDUNGEN instead
```

**Priority Order** (highest to lowest):
1. Critical alerts (alarm, fire, flood) → MSG, FAIL blink fast
2. Security armed → FAIL solid
3. System errors → RDY off, FM1/FM2 off
4. Warnings → FAIL blink slow, DSPY blink
5. Active states → CLR, OFST, IND solid
6. Pending actions → EXEC blink
7. Normal status → MCDU, RDY solid

**Multi-LED Scenarios**:
```
Scenario: Alarm triggered + unread messages
  FAIL: Blink fast (red) - alarm
  MSG: Blink fast (red) - critical
  DSPY: Blink (amber) - messages
  RDY: Off (system not ready)
  MCDU: Solid (still connected)
  
Scenario: Normal operation, scene active
  RDY: Solid green (ready)
  MCDU: Solid green (connected)
  FM1: Solid green (online)
  CLR: Solid green (scene active)
  All others: Off
```

### H.4 Brightness Levels

**Three Brightness Levels** (if hardware supports):
- **Off**: LED completely off (0%)
- **Dim**: Low brightness (20-30%) - night mode
- **Bright**: Full brightness (100%) - day mode

**Auto-Dim** (optional):
```
Time-based:
  22:00-06:00 → All LEDs dim mode
  06:00-22:00 → All LEDs bright mode
  
Or ambient light sensor:
  Dark room → Dim
  Bright room → Bright
  
User override:
  EINSTELLUNGEN > LED HELLIGKEIT
    AUTO / DIM / HELL
```

**Per-LED Brightness**:
```
Critical LEDs (always bright):
  - FAIL (when blinking)
  - MSG (when blinking)
  
Normal LEDs (respect dim mode):
  - RDY, MCDU, FM1, FM2
  - DSPY, CLR, EXEC, OFST, IND
```

### H.5 Blink Patterns

**Standard Blink Rates**:
- **Fast blink**: 2 Hz (0.25s on, 0.25s off) - Critical attention
- **Normal blink**: 1 Hz (0.5s on, 0.5s off) - Standard alert
- **Slow blink**: 0.5 Hz (1s on, 1s off) - Low priority warning

**Pattern Examples**:
```
FAIL (alarm triggered):
  ████░░░░████░░░░████░░░░  (2 Hz fast)
  
EXEC (pending confirm):
  ████████░░░░░░░░████████░░░░░░░░  (1 Hz normal)
  
RDY (degraded):
  ████████████████░░░░░░░░░░░░░░░░  (0.5 Hz slow)
```

**Special Patterns**:
```
Heartbeat (system alive):
  RDY: ██░░██░░░░░░░░░░░░██░░██░░░░  (double pulse every 2s)
  
Attention (new message):
  DSPY: ██░░██░░██░░░░░░░░  (triple pulse, then pause)
```

---

## Summary: Key UX Principles

### ✅ Do's

1. **Configurability First**: Function keys, quick actions, LEDs = user-configurable
2. **Minimize Depth**: Max 3 levels from function key to action
3. **Consistent Colors**: White=normal, Green=active, Amber=warning, Red=critical
4. **Clear Feedback**: Every action gets visual confirmation (checkmark, color change, LED)
5. **Scratchpad for Input**: All data entry via scratchpad + LSK
6. **Context-Aware LSKs**: LSK labels change per page
7. **Always Escapable**: MENU key + CLR always provide exit route
8. **Validate Early**: Check input before transfer, clear error messages
9. **Confirm Critical**: Hard confirmation (OVFY) for irreversible actions
10. **Status Visible**: LEDs + STATUS page = instant house overview

### ❌ Don'ts

1. **Don't Hardcode Mappings**: Function keys must be configurable
2. **Don't Hide Errors**: Always show what went wrong and how to fix
3. **Don't Bury Common Actions**: Quick access > deep menu trees
4. **Don't Mix Color Meanings**: Stick to semantic color strategy
5. **Don't Block on Slow Devices**: Show "SENDE..." then continue
6. **Don't Lose Scratchpad Data**: Preserve across navigation (unless cleared)
7. **Don't Omit Confirmation**: Critical actions need hard confirm
8. **Don't Overuse LEDs**: Only for important states, not every action

---

**Document Status**: ✅ Complete - Production-Ready UX Specification  
**Next Document**: INTERACTION-EXAMPLES.md (Concrete user flows with exact sequences)  
**Total Length**: ~23 KB (meets 15-20 KB target)