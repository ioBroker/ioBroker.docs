---
chapters: {"pages":{"en/adapterref/iobroker.alias-workbench/README.md":{"title":{"en":"ioBroker.alias-workbench"},"content":"en/adapterref/iobroker.alias-workbench/README.md"},"en/adapterref/iobroker.alias-workbench/README_de.md":{"title":{"en":"ioBroker.alias-workbench"},"content":"en/adapterref/iobroker.alias-workbench/README_de.md"},"en/adapterref/iobroker.alias-workbench/docs/changes-detailed.md":{"title":{"en":"Changes in detail"},"content":"en/adapterref/iobroker.alias-workbench/docs/changes-detailed.md"},"en/adapterref/iobroker.alias-workbench/docs/aenderungen-ausfuehrlich.md":{"title":{"en":"Änderungen im Einzelnen"},"content":"en/adapterref/iobroker.alias-workbench/docs/aenderungen-ausfuehrlich.md"}}}
---
<img src="admin/alias-workbench.png" width="80" align="right" alt="logo">

# ioBroker.alias-workbench

Creates aliases the comfortable way — devices that vis, Alexa and the device
adapter understand. Templates do the work: shipped ones for HomeMatic and
Tasmota, your own for everything else. For Tasmota it also checks the
path to the device: missing command points, publishing switched off, delayed
feedback.

*(Diese Anleitung auf Deutsch: [README_de.md](/#/docs/adapterref/iobroker.alias-workbench/README_de.md).)*

---

## Why

An alias is quickly created and always looks fine afterwards. Whether it is any
good is decided by things you **cannot see**:

- whether the **roles** are chosen so that the type-detector recognises a device
- whether the **source** exists at all and carries a value
- whether the **read function** returns a number or `undefined`
- whether the **write path** works

A tool that only links datapoints helps with none of that. This adapter shows
all four while you are building, not hours later in the log.

### Why an admin tab, not a settings page

The workbench is an **admin tab** (`adminTab` in `io-package.json`) and runs
without an adapter process (`mode: none`). That is deliberate: it is an
interactive editor — an object tree on the left, the draft with live values on
the right, a dry run before anything is written, a source swap, a template
sheet. None of that fits into a jsonConfig page, which is built for settings.
The instance's actual settings do live in a normal jsonConfig page
(`adminUI.config: "json"`, four switches, translated into all eleven
languages). Without a process the adapter uses no memory while nobody has the
tab open.

## What it does

![The workbench with a device picked](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/01-device.png)

*A Tasmota socket picked in the tree: what the detector makes of it, which template won, and every datapoint with the value it returns right now.*

**Live detector report.** The real `@iobroker/type-detector` runs against a
draft of your alias while you edit it. Change a role and the report changes with
it — you see immediately whether you built a device or a pile of loose values,
which pattern slots are filled and which are still free.

**Live value preview.** Every datapoint shows what its read function returns
*right now*, next to the raw value of the source. A formula that yields
`undefined` or throws is visible before anything is written.

![A datapoint row opened](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/03-datapoint.png)

*One row opened: where it reads from, which JSON field, the read function, the role — and the pattern slot that role fills.*

**JSON is unpacked without you writing a formula.** Many devices do not deliver
their readings as separate datapoints but as a single JSON — a Tasmota puts
everything into `tele/SENSOR`. Where the workbench finds valid JSON in a
source, it takes it apart and offers its fields in a drop-down:
`ENERGY.Power`, `ENERGY.Total`, `Wifi.Signal`. One click is enough, the
matching formula appears by itself — and in the guarded form:

```js
JSON.parse(val)?.ENERGY?.Power ?? null
```

The `?.` is not decoration. `tele/SENSOR` is a catch-all whose contents differ
from device to device and from message to message; the bare
`JSON.parse(val).ENERGY.Power` fails the moment `ENERGY` is absent — the alias
then delivers nothing at all and the controller writes a warning to the log.
With `?.` the result is simply `null`. And if the field is `0`, `0` is what
you get, not "no value": `??` only steps in for `null` and `undefined`.

It works in both directions. Where a row already carries a formula, the
workbench reads it back and shows the field it means instead of "custom
formula" — including the bare spelling without `?.`. Only something that
really does more than access a field (`JSON.parse(val)?.POWER === "ON"`) stays
a custom formula and is left alone. And what you wrote yourself stays: if your
formula differs from the one the template proposes, the row says so — it is
changed only when you ask for it.

**Role, room and function are kept in order too.** An alias is more than a
bundle of datapoints, and the workbench maintains the three things that make a
device recognisable as a device in ioBroker:

- **The roles of the points** come from the template or the pattern, and they
  follow along when you switch the pattern — `switch.light` does not fit a
  `socket` SET. The role picker is grouped by pattern slot and shows which
  slot a role would fill and whether it is still free. Where a slot accepts
  several spellings, all of them are offered: `LOWBAT` takes
  `indicator.lowbat` just as well as `indicator.maintenance.lowbat` — so
  whatever your own hardware writes is among them. Deprecated spellings stay
  out.
- **The role of the channel** is the device type itself (`light`, `blind`,
  `thermostat`), the way the admin's device adapter keeps it — that is what
  other adapters recognise it by.
- **Room and function** do not live on the object but in `enum.rooms.*` and
  `enum.functions.*`. The workbench proposes both — the room from the source,
  its name or the target folder, the function from the template or the
  detected device type — enters the alias there when writing, and takes it out
  again when you change the assignment. Move the alias and the assignment
  moves with it; other members of the same enumeration are left untouched.
- **And their pictures.** The admin ships ready-made room and function
  templates with icons. Where an existing enumeration has none — ones mirrored
  from a Homematic CCU never do — the workbench fills it in. Next to the field
  you see beforehand what is going to happen. See
  [Room and function](#room-and-function).

None of this happens out of sight: every one of these changes appears in the
dry run before anything is written — including the ones to enumerations, which
are, after all, other people's objects.

**Templates.** A template describes how a device source becomes a finished alias
device. Templates are plain JSON files, one per template — see
[Template format](#template-format). Sixteen ship with the adapter: four for
Tasmota, one plain measuring point, and eleven for Homematic — see
[What the shipped templates cover](#what-the-shipped-templates-cover).

**Your own templates.** Build a device — by hand or by adapting a shipped
template — and save it as a template of your own. What can be derived is
derived; what cannot be derived is asked. Before anything is stored, a try-out
runs the new template against every device in the system and shows which ones it
matches, which template wins there, and which devices would change hands. See
[Saving your own templates](#saving-your-own-templates).

**Tasmota and MQTT.** A Tasmota device arrives through the MQTT adapter as a set
of raw topics: `cmnd/`, `stat/`, `tele/` — no device, just datapoints. The
workbench does not only build the alias from them, it also checks the path to the
device:

- **Missing command points.** A `cmnd.POWER` that does not exist is created at
  the press of a button — with the right topic and a fitting role.
- **Mute points.** They exist, but they are not allowed to send: `publish` is
  off. An alias switching through them does nothing, and nothing about it shows.
  The workbench points that out and enables it on request.
- **Delayed feedback.** Without `SetOption59`, Tasmota reports a change only
  with the next telemetry — the alias shows the old value for minutes. The
  workbench asks the device and turns the setting on.
- **Asking for commands.** When the command list of a device is unknown, it asks
  the device (Status 11). A plain query that switches nothing and changes
  nothing.

**Known exception: writing into the MQTT adapter's namespace.** Normally the
workbench writes only to `alias.*` and `enum.*`. The Tasmota helpers are the
one exception. Creating a send point, enabling sending, querying the device and
SetOption59 all need a `cmnd` data point under `mqtt-client.0.…`, and the
workbench creates or changes it there. This is **off by default**. It is
enabled in the instance settings (*Allow creating and changing data points in
the MQTT adapter*). Without it, the workbench shows what would need doing and
writes nothing outside its own namespace.

Bind your Tasmota devices this way and you need no separate adapter for the
device structure: MQTT delivers the data, the workbench turns it into devices.

**Devices with several outputs.** A power strip or valve manifold has
`POWER1`, `POWER2`, … Since a `socket` pattern has exactly one `SET`, each
output becomes its own channel, grouped under one folder. The output numbers are
read from what actually exists — gaps are allowed.

**Move, rename, swap the source.** An id cannot be changed in the object store,
so moving is always: create new, move the enum memberships, delete old — in that
order, so a failure leaves you with two aliases rather than none. Swapping the
source keeps the alias untouched and only re-points it, which is what you want
when a device dies. See [Swapping a source](#swapping-a-source).

**Guessing missing places.** A device that matches no pattern is often not an unknown
device — a role is simply missing. **Guess missing places** sets roles in the
draft and lets the detector decide again. It only ever runs on that button, never
during normal detection, every guessed row is marked, and while any guess is
undecided the write buttons stay locked. Not deciding is no longer a silent yes.

![The dry run](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/02-dry-run.png)

*The dry run before anything is written: eleven objects, ten new, one would be overwritten — each with its target and its source.*

**Nothing is written without a dry run.** The dry run lists every object that
would be created, changed or removed, as full JSON. For anything that changes it
puts **before and after side by side**, line against line, so you can see *what*
changes instead of only *that* it changes. Field order and trailing commas are
normalised first — otherwise half the lines light up for no reason. Only from
there can you write. If a source does not exist, writing is blocked: the js-controller
remembers a missing source permanently, and only deleting and recreating the
object fixes it.

## Status

![The checks](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/06-checks.png)

*The checks run alongside and touch nothing. Here one of them fails: the alias would look finished, but its switch could not send — publishing is off on the MQTT command point.*

Early. Usable, but not finished.

- Works as an admin tab; the adapter itself runs no process (`mode: none`).
  The instance exists only to carry the settings.
- Interface in all eleven admin languages, 712 keys each — one dictionary at
  `admin/i18n/`, shared by the tab and the settings page. An unknown language
  falls back to English
- 16 bundled templates: eleven Homematic, four Tasmota, one plain measuring point
- **Missing:** "who uses this alias" — vis views, Alexa and Google names cannot
  be searched from here, so a rename warns you instead of pretending to be
  complete. Exporting a template to a file and reading it back works but is
  the least tested path.

## Installation

Open the ioBroker admin, go to **Adapters**, look for **Alias Workbench** and
create an instance. Then reload the admin and pick **Alias Workbench** in the
left menu.

## Why the tree shows devices that do not exist

With MQTT, ioBroker only creates objects for the datapoints themselves. A topic
like `SmartHome/Bastelzimmer/Gartenpumpe/stat/POWER` produces one object for
`stat.POWER` — the level `Gartenpumpe` is only part of a name, not an object.

The type-detector, however, looks for a `channel` or `device` to group
datapoints under. It finds none, so it recognises no device, and Alexa, Matter
and Material have nothing to attach to.

That gap is what the alias fills: `alias.0.…Gartenpumpe` is a real channel with
proper roles beneath it. The workbench therefore lets you pick such a
non-existent node in the tree and build a device out of it.

## What an existing alias contributes

![An existing alias in edit mode](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/05-alias.png)

*An alias that already exists. Its own roles and formulas win over the template, the free slots of the light pattern are listed below, and the three management buttons appear only in this mode.*

Pick a source that already has an alias, and the alias wins. Role, type, unit,
value list, caption, formulas, both sources and the ticks come from what is
stored — in **both** views, "create alias" and "edit alias".

Before that, the same row carried a different role depending on which tab you
were in, and refreshing did something different in each. Now refreshing changes
nothing by itself.

Where the template wants something else, the row says so — *"Template:
sensor.window"* — and a button above the list offers to apply it. That is a
click, never a side effect. The caption is exempt: the display name belongs to
whoever typed it.

## Swapping a source

A device breaks and gets replaced. The alias should stay exactly as it is —
same id, same recording, same room and function — and only point somewhere
else. **Swap source…** does that, and it changes only `common.alias.id` per
datapoint plus `native.quelle` on the channel.

Each datapoint is matched in three steps, and the dialog says which one was
used:

1. **same relative path** below the new device — `…ABC.1.STATE` → `…XYZ.1.STATE`
2. **through the template row** — finds `LOWBAT` on a device that spells it
   `LOWBAT` where the old one said `LOW_BAT`
3. **guessed** from name or role — deliberately weak, and marked **guessed** so
   you check it

Rows with no match at all turn red and offer a checkbox: *remove this point
when swapping*. Leave it unticked and the point stays, still pointing at the
old source — allowed, but visible.

Two things the dialog is careful about. It names the old source even when the
device is **gone** — that is the normal case for "device broken". And it warns
where the new source measures differently: *"Watch out: ACTUAL: value range
0..100 → 0..255"*. The alias keeps its formulas; if the new device counts
differently, the numbers are wrong afterwards and nothing else would tell you.

## Room and function

Both live in `enum.rooms.*` / `enum.functions.*`, not on the object — so this
is the one place where the workbench writes outside `alias.`. Nothing else
outside that namespace is ever touched.

The proposal comes from, in order: the room already on the source or one of its
channels, the device name (`FK_Max_Spielzimmer` → `Max_Spielzimmer`), the
target folder. The function comes from the template's `enumFunction` field, or from
the detected type when the template has none.

The admin ships 62 function and 58 room templates, each with a picture. The
workbench does not copy them; it reads them out of the admin's own bundle at
runtime, so there are never two lists ageing apart. If that fails, the field
quietly shows only what exists — and says so in the last row, rather than
looking empty for no reason.

**The picture is shown before it is written.** Next to each of the two fields
stands the picture of the chosen enum: solid when one is already stored, faded
with a small **new** corner when the workbench would add one on writing, and
nothing at all when the catalogue does not know the name or the switch is off.
So the settings page is visible in the row itself, instead of having to be
guessed from a dry run.

## Settings

The instance has no process; its settings only decide how the workbench writes.
Four switches, all on by default — and if `native` is missing entirely, the same
defaults apply rather than everything counting as off:

| Switch | What it does |
|---|---|
| `ikonRaeume` | add a missing picture to a **room** |
| `ikonFunktionen` | the same for a **function** |
| `ikonErsetzen` | also replace an entry that is not a picture. ioBroker's default rooms carry `icon: "Bedroom"` — a bare word that renders as a broken box |
| `vorlagenVomAdmin` | offer the admin's room and function templates at all |

The tab reads them **once on load**. After saving, reload the tab.

## What the shipped templates cover

Sixteen templates come with the adapter. Four Tasmota, one plain measuring
point — and eleven for Homematic, where the interesting part is not that a
template matches but that the **right** one does. The devices look alike in the
data; what separates them is one datapoint each:

| Told apart by | Which is which |
|---|---|
| `1.WORKING` | switch actuator, not a window contact — both have `1.STATE` |
| `2.STATE` | multi-channel actuator; the single-channel template refuses when it is present |
| `1.LEVEL_REAL` vs `1.STOP` | dimmer vs shutter — both have `1.LEVEL` |
| `1.ERROR` | classic window contact vs HmIP, which computes a boolean from a number |
| `0.SABOTAGE` | required for the HmIP contact. Without it, `1.STATE` + `0.LOW_BAT` matched twelve devices, eight of them actuators |
| `1.LEVEL` / `1.HUMIDITY` / `4.SECTION` | radiator valve vs wall thermostat vs heating group |
| `1.TEMPERATURE` vs `1.ACTUAL_TEMPERATURE` | a plain sensor vs something that also sets a value |

The CCU's own receivers — `HM-RCV-50`, `HmIP-RCV-50`, `RPI-RF-MOD` — match
nothing on purpose. Fifty bare `LEVEL` channels are not a device.

When a template is rejected, the picker says why: *"1.LEVEL missing"*, not
*"does not fit"*. A reason you cannot act on is not a reason.

**About the consumption role.** Four templates (`messpunkt`, `tasmota-lampe`,
`tasmota-mehrfach`, `tasmota-steckdose`) give the row `CONSUMPTION` the role
`value.energy.consumed`. That is the correct one: the unit is Wh, which is
**energy** and not power, so it belongs under `value.energy.*` rather than with
the watts in `value.power.*`. That is exactly why `value.power.consumption` is
struck through in the ioBroker
[state roles list](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/stateroles.md).

Up to `@iobroker/type-detector` 6.0.2 there was no choice anyway: the pattern
`consumption` recognised `CONSUMPTION` only with the struck-through role, and a
point carrying the correct one dropped out of the detected device without a
word. Reported as
[issue 334](https://github.com/ioBroker/ioBroker.type-detector/issues/334),
fixed in PR 339, and since 6.0.3 the place accepts both
(`/^value\.(energy\.consumed|power\.consumption)$/`).

**Reading such an alias with an older detector loses the point.** What is
affected is not the workbench but every adapter that reads the alias — and each
brings its **own** detector version, some over npm, some baked into its
frontend where no `package.json` reveals it. Measured on a live system on
2026-10-14:

| Reader | Version | accepts `value.energy.consumed`? |
|---|---|---|
| `iobroker.admin`, device manager | baked into a frontend asset | no — the bundle holds `value\.power\.consumption` only |
| `iobroker.devices` | baked into a frontend asset | no, likewise |
| `iobroker.matter` | 5.0.15 over npm | no, `/^value\.power\.consumption$/` |
| `@iobroker/mcp-server` | 6.0.1 over npm | no, same line |
| `iobroker.hm-rpc` | 4.6.4, top level | no — but it does not read aliases |

This was measured on the pattern itself rather than on a version number: in
both baked bundles `energy.consumed` appears nowhere. So the consumption is
missing there until the reading adapter catches up. Existing aliases with the
old role stay recognised everywhere, the expression still accepts them. Each of
the four rows carries the reason in a field `_role`.

### Role knowledge beside the rows

A template can carry `extraPoints`: roles for datapoints that get no row of
their own. Without it, "all datapoints of the device" showed *no role* on most
lines, because hm-rpc simply leaves the field empty. A `*.NAME` wildcard applies
per channel, so `2.LEVEL` and `3.RAMP_TIME` are covered without listing every
channel. It changes nothing about which template wins — only raw rows are
enriched.

## Saving your own templates

The **Save as template …** button turns the device you are looking at back into
a template. Paths become relative to the device, `JSON.parse(val).ENERGY.Power`
becomes `jsonField: "ENERGY.Power"` again, and roles, units and formulas are kept.

What a template cannot know by itself is **which datapoints make a device this
kind of device**. That is a statement about all future devices, so the dialog
asks:

- **required datapoints** — proposed (anything with a write path is required by
  default), decided by you with a tick per row. Every extra required point makes
  the template more precise and more brittle at the same time.
- **content checks** — proposed wherever a JSON field is read. This is what
  separates "socket" from "socket with metering", so it is offered but not
  ticked.
- **name hint** — never derived. It only breaks ties between templates that fit
  equally well; MQTT cannot tell a lamp from a PC.
- **several outputs** — a tick plus the number that identifies this output.
  `stat.POWER1` then becomes `stat.POWER%N%`, replaced only at the end of a path
  segment so `ENERGY.Power` stays intact. If the draft still refers to the other
  outputs, the dialog says so: such a template would only ever fit this one
  device.
- **must not exist** — datapoints whose presence rules the template out.

Then the try-out shows what the detection actually catches, before anything is
saved.

### Managing them

The third view next to **Sources** and **Aliases** is **Templates**: every
template with its detection, its datapoints, a permanent try-out and the raw
JSON. Everything about a template of yours can be changed there: name, rank,
name hint, the required and forbidden datapoints, and every datapoint itself —
click a row to open its role, type, unit, paths, formulas and flags. Datapoints
can be added and removed. The try-out below reacts to every change, so you see
what an edit does to the detection before you save.

Shipped templates cannot be edited — that way they always stay the state they
were delivered in. *Make an editable copy* gives you a copy under the same id
that shadows the original; delete that copy and the shipped one reappears.
*Duplicate* on a template of your own gives it a new id, for a variant that
stands next to the original rather than replacing it.

Import accepts one template per file, in exactly the format under
`admin/vorlagen/`. Nothing is stored on import: the file appears as a preview
first, with a line saying what saving would do — create, replace your own
version, or shadow a shipped one.

Your templates live in `native.vorlagen` of the instance object, so they survive
`iobroker upload` and adapter updates and are part of a Backitup backup. A
template of yours with the same `id` as a shipped one shadows it. Storage and
exchange format are the same JSON, so a template that turned out well can move
into the package unchanged.

### How a template is picked

When several templates fit, the winner is decided in this order:

1. **how many datapoints the template actually verified** — required points, per
   output for multi-output devices, plus content checks that came out true
2. **the name hint**, if it matches
3. **your own template** over a shipped one
4. **`priority`**, so the same device is always detected the same way

Order matters. Counting evidence first is what keeps a template you built on
purpose from losing to a shipped one whose word happens to appear in the device
name.

Note what step 3 means for updates: a template of yours **cannot be outranked by
a shipped one on `priority`** — that step sits above `priority` in the order, so no
future version of this adapter can quietly take a device away from a template
you built. `priority` only ever breaks ties between templates of the same origin,
which is also why a new template of yours is numbered from your own templates
and ignores the shipped numbers entirely.

A shipped template can still win on step 1 by verifying strictly more
datapoints. That is deliberate — more evidence should win — and it only affects
devices you have not built yet: a finished alias records the template it came
from and keeps it.

## What a template ticks by default

Whether a datapoint has a slot in the type-detector pattern is **not** the
criterion. That only decides *where* the point ends up — inside the device or
in a separate info device. It says nothing about whether anyone needs it. The
`thermostat` pattern has 24 slots, `socket` has 14; everything that could ever
sit in such a device is listed there, down to frequency and apparent power.

The criterion is purpose: **tick what you need to operate the device and to
notice when something is wrong.** Setpoint, actual value, and the signals that
announce a failure — `LOWBAT`, `UNREACH`.

Left unticked: diagnostics. Signal strength, uptime, ramp times, inhibit
flags. You tick those when you are chasing a problem.

Battery **voltage** looks like it belongs in the first group — it falls
visibly over weeks while `LOW_BAT` only flips once the change is already due.
It stays unticked anyway, because the detector has nowhere to put it. Patterns
are assembled from two shared groups:

```
maintenance  WORKING UNREACH LOWBAT MAINTAIN ERROR DIRECTION
             CONNECTED RSSI ON_TIME BATTERY   value.battery   unit %
metering     ELECTRIC_POWER CURRENT VOLTAGE CONSUMPTION
             FREQUENCY SPEED POWER            value.voltage   unit V
```

`VOLTAGE` sits between current and consumption: it is the **mains voltage of a
metering device**, not a sensor's cell voltage. A window contact has no
metering group at all, which is why it has no voltage slot — and `BATTERY`,
the slot it does have, means a percentage. Writing volts into either is
wrong, so the point is offered and left off.

Two things override that:

- A point that reads the **same source** as an already-ticked one is never
  ticked. Otherwise the same value sits in the alias twice and the seventh
  check reports it, rightly. Homematic switch actuators have no separate
  feedback value — `1.STATE` is both — so their `ON_ACTUAL` stays off.
- Where the purpose says tick but the pattern has **no slot**, weigh it: the
  point lands in an info device next to the real one. For a single value that
  is rarely worth it, and the template's `note` has to say so. And check
  what a slot **means** before using it — a matching name is not a matching
  purpose, as the voltage case above shows.

## Template format

![A template sheet](https://raw.githubusercontent.com/RicardoHipp/ioBroker.alias-workbench/main/docs/04-template.png)

*A shipped template, read-only: header, what must and must not exist for it to match, and its datapoints. "Own copy" makes it editable.*

One JSON file per template under `admin/vorlagen/`. Example:

```jsonc
{
  "id": "tasmota-steckdose",
  "version": 1,
  "rang": 20,
  "name": { "en": "Tasmota socket", "de": "Tasmota-Steckdose" },
  "geraetetyp": "socket",

  "erkennung": {
    "erforderlich": ["stat.POWER", "cmnd.POWER"],
    "inhalt": { "tele.SENSOR": "ENERGY" },
    "namenshinweis": "steckdose|dose|plug|socket"
  },

  "zustaende": [
    { "name": "SET", "rolle": "switch", "typ": "boolean",
      "lesen": "stat.POWER", "schreiben": "cmnd.POWER",
      "schreibformel": "val ? \"ON\" : \"OFF\"" },

    { "name": "ELECTRIC_POWER", "rolle": "value.power", "einheit": "W",
      "lesen": "tele.SENSOR", "feld": "ENERGY.Power", "optional": true },

    { "name": "TODAY", "rolle": "value", "einheit": "kWh",
      "lesen": "tele.SENSOR", "feld": "ENERGY.Today",
      "optional": true, "vorgabeAus": true }
  ]
}
```

| Key | Meaning |
|---|---|
| `detection.required` | these datapoints must exist, otherwise the template does not match |
| `detection.content` | the named datapoint must contain this field in its JSON |
| `detection.forbidden` | these datapoints must **not** exist, otherwise the template does not match |
| `detection.nameHint` | only breaks ties between templates that fit equally well |
| `priority` | last tie-breaker, so the same device is always detected the same way |
| `optional` | the state is skipped when its source or JSON field is missing |
| `offByDefault` | proposed but unchecked — see **What a template ticks by default** below |
| `jsonField` | builds the read function `JSON.parse(val).<field>` |
| `multiple` + `%N%` | one device per output; the numbers are read from what exists |
| `valueList` | value list for the datapoint — slots like EFFECT are not detected without one |
| `absolute` | `read` is a full object id, not relative to the device — the same object for every device |
| `caption` | the datapoint's display name, if it should differ from its slot name |
| `decimals` | decimals for the value display |

`forbidden` is what genuinely separates a single socket from a multi-output one:
the single one has no `stat.POWER2`. An absent datapoint deliberately does **not**
count as evidence — otherwise a list of invented exclusions could inflate a
template's score.

Datapoint names are matched case-insensitively as a fallback, because MQTT keeps
whatever casing was published — the same device family sends `cmnd.POWER` on one
unit and `cmnd.power` on the next.

## Under the hood

```
source (e.g. mqtt-client.0.…)
   ↓  a template is matched and applied
draft in memory  →  object image  →  type-detector  →  report
   ↓  dry run
alias.0.<folder>.<device>          channel + states with common.alias
```

The draft never touches the object database. The detector runs against an image
of the draft, which is why the report reacts instantly and why nothing can break
while you experiment.

The type-detector is a real npm dependency, bundled for the browser with
esbuild. It is never copied into the source tree — a frozen copy that drifts
from the library was the main weakness of the existing alias manager.

## Development

After cloning, fetch the dependencies the usual way for a Node project, then
run the build script:

```bash
npm run build      # bundles @iobroker/type-detector into admin/detector.js
```

`npm run build` touches **only** the detector bundle. The tab's own modules are
served as they are; editing one and reloading the tab is the whole cycle. On a
running installation the admin caches adapter files, so `iobroker upload
alias-workbench` after copying is what makes the browser see the change.

There is one dictionary, `admin/i18n/`, all eleven languages. The admin loads
it for the settings page (`jsonConfig` with `"i18n": true`). The tab loads the
same files from `admin/js/sprache.js`. A language that is not in the list falls
back to English. Watch for strings
written straight into `admin/tab.html`: they are replaced at runtime, and one
that nobody wired up stays English in every language without anyone noticing.

The tab is **30 ES modules** under `admin/js/`, loaded by the browser as
modules — there is no build step for them, and styling lives in one file,
`admin/css/werkbank.css`. Because a module boundary can be crossed wrongly in
ways the browser only notices while running, `npm test` checks before every
commit that everything still bundles, that every identifier is declared or
imported, and that all eleven language files carry the same keys.

## Background

- [@iobroker/type-detector](https://github.com/ioBroker/ioBroker.type-detector) —
  decides what counts as a device, by roles rather than names
- [Tasmota](https://tasmota.github.io/docs/) — the device family the shipped
  templates cover
- [ioBroker aliases](https://github.com/ioBroker/ioBroker.docs) — aliases are a
  core feature of the js-controller, not of any adapter

## Changelog

### **WORK IN PROGRESS**
* **A short view on the right — the first impression no longer overwhelms.** After clicking a device, the workbench now shows a summary by default: what it recognised the device as, room, function, place and name (the same fields as before), a traffic light from the checks, and a preview of how the alias will look in the object browser — new rows green, changed ones orange, removed ones struck through, with the device's current values. If everything fits, "Create alias" right below the preview is all that is left; next to it are "Checks" and "I need to set more". Template box, pattern choice, MQTT card and the row list are still there: the switch **Short | Detail** at the top right shows today's view unchanged.
* **Rows a check is about are marked.** In the detailed view, a row named by a check now carries a sign in front of its name — red ✕ for an error, orange ! for a hint, the text of the check as tooltip; a click opens the row. Before, you only saw it in the "Checks" dialog and had to look for the row. The traffic light of the short view also shows what the MQTT card reports in its header (offline, send points missing, delayed feedback).
* **"N send points missing" only where the alias needs them.** The yellow chip in the header of the MQTT card counted every command the device knows and that has no point yet — `Sleep`, `SleepMode` … —, so it stood at almost every Tasmota although hardly anyone needs them. Now it only counts missing send points a ticked row of the alias wants to write to. The expanded card and the dialog still list all of them. The same goes for "N cannot send": only send points the alias writes to count.
* **A Tasmota with the factory topic is filed like any other.** With `%prefix%/%topic%/` the device lies under `cmnd`, `stat` and `tele`; the suggested place came from the branch you clicked — `alias.0.cmnd.<device>`, `alias.0.stat.<device>` … Now all three branches suggest the same place, formed like for every other Tasmota (`alias.0.<level above the prefix>.<device>`).
* **Empty room or function is marked.** The field turns orange with "pick a room" / "pick a function", and the traffic light of the short view says why it matters (Alexa, vis and the device adapter find devices by room; functions make groups such as "all lights"). A click on the hint jumps into the field. Nothing is blocked — a meter, for instance, simply belongs to no room.
* **Choosing the output in the short view.** For devices with several outputs (Tasmota power strip, multi-relay), the box "Recognised as …" now has the output selection too; switching it is the same as switching it in the template box.
* **With neighbouring branches, every row names its branch.** After "Add neighbouring branches" (Matter puts switch and measurements in separate endpoints), each row says where it reads from — "from ElectricalSensor-2", "from OnOffPlugInUnit-1", "from info". The same when only one branch is clicked and the existing alias reads from several.
* **No false "slot already taken".** If a role fits two slots (`button.long` fits PRESS and PRESS_LONG of the button pattern), the row's detail no longer claims it does not count while it sits on the second one.
* **Findings read as findings; a button without a value is none.** In the traffic light and at the row mark, a failed check now says what is wrong ("Source has no value yet" instead of "source has a value: PRESS"). Buttons (`button…`) that were never pressed are an orange hint ("Button not pressed yet") instead of an error.
* **Buttons without the three dots.** "Create alias …", "Move …", "Remove alias …" and the other buttons that open a dialog first are now labelled without the trailing "…", in all eleven languages.
* **In the short view, "Update alias" is only active when something would change.** On an existing alias where nothing is different, it is grey with "No changes" next to it; changing room, function, place or name — or a newer template — makes it active. A changed room or function now also turns the channel row of the preview orange.
* **From the traffic light straight to the spot.** Every line of the traffic light can be clicked, and so can "Show in the detailed view": it switches to Detail and opens the area where you can act — the MQTT card for send points and feedback, the row itself for a finding about a row — expanded and scrolled into view.
* **The empty right side is a card.** Before anything is picked, a card with an arrow to the left, a heading, the explanation of the mode and — when creating — three numbered steps; already when the tab opens.
* **Each device opens in the short view — or as set.** New setting "Show when a device is picked" (section "Short and detailed view"): *Short view* (default) — every device opens short, the switch only holds until the next one; *Always the detailed view*; *Remember the last choice*. The tooltip of the switch says where to set it.

### 0.14.1 (2026-11-22)
* **What goes into the database is English; what is only shown follows your language.** Three places were still German. The value list of the Tasmota colour effects (`Scheme`, slot EFFECT of the colour light template) is now `single colour, wake up, cycle colours up, cycle colours down, random` — it is written into the alias and the send point and stays there, so it is English like the value lists of the device adapters; the template is now version 7, and an existing alias shows the difference and takes the new list with "Reset to template". A send point the workbench creates now carries the fixed description `created by the Alias Workbench` instead of a text in the language of whoever clicked. And the descriptions in the "Create send points" dialog ("brightness 0 to 100" …) come from the language files, in all eleven languages. The command knowledge file has English field names.

### 0.14.0 (2026-11-22)
* **Creating data points in the MQTT adapter is now a setting, and it is off by default.** The Tasmota helpers need `cmnd` points under `mqtt-client.0.…` — to query a device (`Status`, `TelePeriod`), to switch on SetOption59, and as the send point of an alias. That is outside the workbench's own area (`alias.*`, `enum.*`); the review of the repository request flagged it, and it was accepted as an exception. Now it is a decision for whoever runs the workbench: *Allow creating and changing data points in the MQTT adapter* in the instance settings. With it off, the MQTT card says so at the top, and every button that would write there opens a dialog naming the data points it would create, with a button straight into the settings — nothing is written. Reading, detection and aliases on existing points work as before. The setting is read fresh before each of these writes, so switching it on takes effect without reloading the workbench. **If you used these helpers before: switch it on once after the update.**
* **The four settings now carry English names.** `ikonRaeume`, `ikonFunktionen`, `ikonErsetzen` and `vorlagenVomAdmin` became `iconRooms`, `iconFunctions`, `iconReplace` and `templatesFromAdmin`. The ioBroker checklist asks for English object ids where they are the adapter's own, and these are — they were German because that is how the workbench was built, not because anything required it.
* **A conversion runs once at startup, and it is not optional.** Renaming alone would have been silent damage: `einst()` reads the settings out of the instance object, would no longer find the old keys and would fall back to the defaults — and all four default to **on**. Anyone who had switched one off would have had it back on without a word. So an instance still carrying old names opens a modal dialog at startup that names the count and says there is no way back. "Not now" does not close it; the workbench does not work until the conversion has run. Afterwards the old keys are gone, the values are kept — a setting that was off stays off — and your own templates in the same object are untouched. A second run finds nothing.
* **One place knows the old names, and only one.** `admin/js/migration.js` is it; every other file in the adapter knows the English names only. The alternative — reading both spellings everywhere — would have meant 92 places in the adapter, each a second truth, and none of them ever going away again. The module stays: not every installation updates next week, and it costs nothing when nothing matches.
* **And a trap that only showed up on deployment.** `iobroker upload` carries the defaults from `io-package.json` into existing instances. After a deployment the four English keys are therefore already present — with their default **on**, not with the user's value — while the old ones still sit beside them. The first draft would have given the new value precedence and so made exactly the silent jump the conversion is meant to prevent. Now the old value wins, and the result no longer depends on the order of the keys in the object. Found on the live system, reproduced and recorded on the test system.
* **And the same conversion for the aliases themselves.** The fields the workbench writes on its aliases were German: `quelle`, `vorlage`, `vorlageVersion`, `ausZustand`, `geraetetyp`, `musterVonHand`, `vonHand`, `angelegtVon`, `attrappeAus`. Now `source`, `template`, `templateVersion`, `templateState`, `deviceType`, `deviceTypeManual`, `manual`, `createdBy`, `mockedFrom`. The same dialog does it at startup and names the number of affected objects — only those carrying one of our fields are counted, so an alias built by hand in the admin is left alone. Only `native` is touched: no `common.alias`, no role, no formula, no unit. No value moves and nothing switches. Checked against 109 objects — `common` stayed identical on **all** of them, `native` changed on exactly the 100 affected. If the run is cut short because the tab is closed, the dialog names exactly the remaining ones next time.
* **The conversion no longer hangs on an object that has gone in the meantime.** If an alias named in the dialog was deleted before "Convert" was clicked, the button stayed on "Converting…" for good: the object was missing, a step threw, and the run never finished. Now every object is read fresh from the database before it is written; one that has gone is skipped and not counted, and is never created again. A step that throws or gets no answer within 15 seconds ends up in the error list, and the rest still run.
* **A half-built alias no longer fills the log.** When an alias was selected that has a point without `common.alias.id`, the workbench subscribed to `alias.….*`; the controller rejects such a pattern as a whole, and the admin wrote `Error on "subscribeForeignStates": Alias … has no target` into the ioBroker log on every selection. Now the points with a target are subscribed individually and the one without is left out — it has no value that could change.
* **Your own templates now live under `templates`.** The key in the instance configuration used to be `vorlagen`. Only the key is renamed — the template underneath stays identical character for character. Its **field names** (`zustaende`, `rolle`, `typ` …) are deliberately left for later: they cannot be caught by a pattern, because the same words mean other things elsewhere in the code — `z.typ` is a template field while the `typ:` right beside it is a draft field, both on the same line. That will be a step of its own.
* **The template format is English — and better named, not just translated.** Every field of a template has a new name: `points` instead of `zustaende`, `detection` with `required`, `forbidden`, `content` and `nameHint`, per point `role`, `type`, `unit`, `read`, `write`, `readFormula`, `writeFormula`, `readFallback`, `offByDefault` and so on. Where a translation fell short there is a better name: `priority` says what the number is for (which template wins); `points` rather than "states", which gets confused with the value list `common.states` and with the detector's slots; `jsonField`, because the field is a path **inside a JSON**; `enumFunction`, because `function` is a keyword and the ioBroker enumeration is meant. The 16 shipped templates are converted, **your own templates are converted by the same startup dialog**, content and all. An old exported file is **refused** on import — with a sentence saying it comes from an older version, instead of a puzzling "no rows". The field-name table in this README has been updated.
* **The mock file is English too.** "Export as mock" now writes `root`, `createdAt`, `createdBy`, `source`, `nativeIncluded`, `objects` and per entry `path`, `virtual`, `value` (format 2). An older file (format 1) is refused on import with a note to export it again.
* **“SET hat schon SET” now says what it means.** When another row holds the place a role points to, the hint read “{place} already holds {row}” — with both named the same it read like nonsense. Now the sentence says what triggers it, what blocks it and what follows: “The role “state” makes ACTUAL the place SET in the socket pattern, but the row SET already holds it. So ACTUAL does not count towards the device.” Then either the advice to pick another place or — when both rows read the same data point — “Both read stat.POWER, so ACTUAL only shows the same thing again.”
* **No more regular expression under “Role”.** It read “matches /^switch(\.active)?$|^state$/ → slot SET in the socket pattern, expects boolean” — the type-detector's matching pattern. Now: “With the role “state” the row belongs on the place SET in the socket pattern. The place requires the type boolean.” On the device and in the template sheet. If the place is already taken, the line is left out, because the yellow sentence below says the same.
* **An existing alias point is matched to the right template row again.** When two template rows read the same source — `hm-schaltaktor-lampe` has SET (switches) and ON_ACTUAL (only reports) both on `1.STATE` — the last one used to win. A switching alias point `STATE` was taken for ON_ACTUAL, showed “differs from the template”, and “Apply template values” turned the switch into a read-only sensor without a write target: after updating, the light could no longer be switched. Now the write direction decides: a writing alias point takes the writing row, a reading one the reading row.
* **Changing the pattern no longer renames rows blindly.** Switching an existing alias from socket to light turned its point `STATE` into `SET` (updating would have deleted `STATE` and created `SET`), turned the unticked switch lock `INHIBIT` into a second `SET` with role `switch.light`, and left three rows named `SET`. Now unticked rows stay as they are, a row that already exists in the alias gets the new role but keeps its name, and no name is given twice.
* **“Apply template values” takes the template's pattern along.** An alias whose switch had the role `switch` opens as a socket. Applying a light template turned the point into `switch.light` but left the pattern on socket — whose SET only takes `switch` — so the pattern showed “not detected”. Now the button sets the pattern to the template's device type as well, and the header no longer claims it was chosen by hand.
* **The pattern says when the template means another one.** An existing alias keeps the pattern its roles say — that is the truth about it — but the pattern header now adds “the template is built for Light, the existing alias is set up as Socket”.
* **The blue button no longer turns white under the mouse**, and an empty line between the pattern note and the buttons below it is gone.
* **Two buttons say what they do.** “Take template values” is now **“Reset to template”** — whatever differs from the template on the alias goes back to the template, the pattern included. “Suggest free slots” is now **“Guess missing places”**, because it is a guess, not knowledge. Found along the way: in five languages the guess button read “free slot machines” (Spanish, French, Dutch, Polish, Chinese), in four “free-of-charge slots” — all retranslated.
* **“Reset to template” also ticks what the template would tick.** An existing alias with only `STATE` gets `WORKING`, `LOWBAT` and `UNREACH` ticked, as the template intends; nothing is unticked, so no point of the alias disappears through this button. The number on the button counts these rows too.
* **The list shows what will be added to the alias and what will be removed.** A newly ticked row looked exactly like one already in the alias; only the change card on updating said “new”. Under an existing alias, a ticked row whose point does not exist yet now carries a green “will be added”, an unticked row whose point exists a red “will be removed” — the same rule the change card uses.
* **The row marks answer one question: what happens to the point on writing.** Under an existing alias: “will be added”, “will be changed” (formerly “differs from the saved alias”; the tooltip names the fields, now including the caption), “will be removed” — no mark means it stays as it is. The mark “changed” is gone: it only said “something was clicked here”, stood twice next to “differs from the saved alias”, and stayed after a value was set back. For a new alias the rows carry no such mark, since everything is new; “differs from the template” now works there too, because the template values are kept from the start.
* **The orange bar no longer offers a row the template switched off.** It read “INHIBIT fits on SET, but is not ticked — tick it”: the switch lock of a Homematic actuator has the role `switch`, and ticking it would have made the lock the socket's switch. A row the template leaves off by default is no substitute for a required place. Its claim “would work with ‘Suggest free places’” was also computed on the roles from before “Apply template values”; the forecast is now dropped when the rows change.

### 0.13.0 (2026-11-02)
* **The type detector is now 6.2.0, and that adds a device type: `tv`.** The workbench therefore offers 52 patterns instead of 51, with twenty places for a television — `POWER`, `KEY`, `VOLUME`, `INPUT`, `APP`, `ART_MODE` and the rest. 6.1.0 brought an ES module build along the way, which is what makes the shipped bundle smaller (66 KB instead of 70). The consumption role is unchanged from 6.0.3: both roles are recognised, the current one is suggested. Measured on 2026-11-02 over all patterns: 752 places instead of 732, and the role derivation is untouched — the same eight places take their role from the expression, the same nineteen have none.
* **The consumption point now carries the role it should: `value.energy.consumed`.** The unit is Wh, which is energy and not power, so it belongs under `value.energy.*` and not with the watts in `value.power.*` — which is why the ioBroker roles list strikes `value.power.consumption` through. Up to `@iobroker/type-detector` 6.0.2 there was no choice anyway: the pattern `consumption` matched the struck-through role alone, and a point carrying the correct one dropped out of the detected device without a word — the socket was still recognised, just without its consumption, and that is how it reached vis, Alexa and the device manager. Reported as [issue 334](https://github.com/ioBroker/ioBroker.type-detector/issues/334) with the finding, fixed in PR 339, released as 6.0.3 on 2026-10-14. The detector now accepts both roles, and the four shipped templates (`messpunkt`, `tasmota-lampe`, `tasmota-mehrfach`, `tasmota-steckdose`) write the correct one.
* **What that costs, said plainly — and who has caught up by now.** An alias is read not by the workbench but by every adapter that reads it, and each carries its own detector version — some over npm, some baked into its frontend where no `package.json` reveals it. One older than 6.0.3 accepts the struck-through role only. That is why the change was held back for three weeks and measured again on 2026-11-02 on the pattern itself rather than on a version number: the admin's **device manager** (from 8.3.6, 2026-10-29) and **iobroker.devices** (from 4.2.7, 2026-10-25) now carry the new role in their baked bundle. **iobroker.matter** is still at 1.3.1 from 2026-07-23 and therefore on type-detector 5.0.15 — but its main branch already requires `^6.0.1`, so its next release gets it by itself. Anyone using an older reader will find a consumption point newly built from one of the four templates missing there. Existing aliases are untouched: the expression still accepts the old role, so they stay recognised either way.

### 0.12.0 (2026-10-14)
**Swapping the source**
* **Swapping now asks the same recognition as the tree.** The existing stages all started from the **old** source — path, remembered template, names, roles. Yet swapping asks the same question the workbench answers anyway when you click a device: which point **there** is the `ELECTRIC_POWER`? Now, before guessing, the draft of the **new** source is computed and mapped through its pattern slots — template first, otherwise the detector. That carries in **both** directions, which was the point: to a device that labels its points (Matter: `role: value.power`, `unit: W`) the detector answers; to one that labels nothing, the template does. Measured at `mqtt-client.0.SmartHome.PC_Jonas`: all ten points without `common.role`, type `mixed`, the type detector makes `info` of it — but the Tasmota template knows that `stat.POWER` is the status point and the power sits in `tele.SENSOR` under `ENERGY.Power`. Swapping from Matter back to MQTT previously found **0 of 7** points; now 6 of 7, with separate read and write sources.
* **And the formulas come along.** They belong to the source, not to the alias: `JSON.parse(val)?.ENERGY?.Power ?? null` describes how to get a power reading out of a Tasmota telemetry message. Left in place when swapping to Matter, the point sat silently at `null` — four readings empty with no error at all, and `SET` would have written the string from `val ? "ON" : "OFF"` onto a boolean. Each direction now brings its own: none towards Matter, the JSON formula again back to Tasmota.
* **A point no stage can find can be named by hand.** Until now the only choices were "remove" or leave it. The row now offers a list of every point on the new device, with role and unit beside it. What you pick there carries the mark "by hand" and the note that **formula, unit and value range stay as they are on the alias** — the workbench knows nothing about that point, so it changes nothing about it.
* **When the unit changes, the numbers sit beside it — nothing is decided for you.** Tasmota delivers `ENERGY.Total` in kWh, Matter `CONSUMPTION` in Wh: the same meter, factor 1000, invisible. Nothing is converted automatically, because the labelling itself is unreliable — Matter writes the unit `mA` on `CURRENT` and delivers amperes (0.926 at 245 W and 228 V). An automation that believed the label would have made 926 A of it. Instead the row states the finding ("on the alias A · new source: none"), shows what the alias displays today, and offers **two free fields**: unit and factor, both at the current state. The result recomputes as you type. Where the workbench knows something, a shortcut sits beside the field (`Wh`, `/ 1000`) — a suggestion from the labelling, checkable against the numbers above. Free fields, because fixed buttons fail where the target carries **no** unit at all: a JSON collector point has none, the unit sits in the field. This is only shown when the **new source** delivers something other than the old one — swapping between devices of the same kind shows nothing.
* **When swapping, the remembered template is checked against the new source.** An alias remembers which template it came from, and the workbench keeps applying it until you explicitly change it — exactly right for a like-for-like replacement. For a differently built device it was not, and the bad part was the silence: after swapping a Tasmota socket for a Matter one, the channel still read "Tasmota socket, forced, ✕ cmnd.POWER" — and the **formulas** from that same template stayed on the points. `JSON.parse(val)?.ENERGY?.Power ?? null` is meant for a telemetry JSON; Matter delivers a plain number, and the point sat at `null`. Four readings were empty with no error anywhere, and `SET` would have written the string from `val ? "ON" : "OFF"` onto a boolean. The dialog now checks the remembered template against the **new** device: if it still fits, nothing changes; if it does not, it says why, how many points carry formulas, and — if a different template fits the new source — which one. Plus a pre-ticked box that drops the remembering and the formulas along with it. **Nothing is decided automatically**: the formula belongs to the source, not to the alias, and on the way back to MQTT it is needed again — deleting it silently would be the same mistake as silently keeping it. `native.geraetetyp` and the whole of `common` are left untouched; the swap changes the source, not what the device is.
* **Source swapping now also asks the alias point itself.** Until now all three mapping stages started from the **old source** — its path, its template row, the name or role of the old state. That works while both devices are built alike and fails completely once they are not: moving an alias from a Tasmota socket to a Matter socket produced **0 out of 8** mappings, for two devices that do the same thing. Both reasons were on the source side, never on the target — `mqtt-client` keeps no roles, and five of the eight points read from **one** telemetry JSON. Yet the answer is already in the alias: `ELECTRIC_POWER` carries `role: value.power`, and the new device holds exactly one point of that name with that role. So before guessing, the **alias point** is asked. If **name and role** match and the point exists exactly once, that counts like a path hit and the row carries the grey mark "from alias"; if only the **role** matches, and it too exactly once, it is a suggestion marked "guessed". Two points of the same role cancel each other out instead of one being picked. In the measured case that is six out of eight, spread over **both** Matter endpoints; `TODAY` and `YESTERDAY` stay empty because the new device has no such thing.
* **If one point at the new device both reads and writes, it may do so.** The rule "the write target is never the read source" guards against a guessed status point (`stat.POWER` instead of `cmnd.POWER`). Where a single point can do both — `OnOffPlugInUnit-1.SET` on Matter, `1.STATE` on Homematic — it was too strict and reported "no write target found" at exactly the point meant for it. The exception applies only to the evidenced hit via the alias point, and only when both sides are writable; a status point such as `ACTUAL` still gets none.

**Tree**
* **Several branches can be selected as one device.** Some adapters spread one device across sibling branches: Matter stores a socket as a folder without data points of its own, holding two `device` nodes — the switch in one, the readings in the other. The folder was not selectable, and each endpoint on its own produced half a device: at the switch the detector recognised a socket and offered the five readings as "to be created", while the neighbouring branch already had them. **Ctrl-click** now adds a branch to the selection or takes it out; the selection moves to the common parent, and every branch involved is marked in the tree. The same sits in the **context menu**, for anyone without a keyboard, and in the header of the right-hand side as a button **"Add neighbouring branches (N)"** — where the adapter provides evidence, the tooltip says so (Matter writes the same node id to every endpoint). Point names are shortened where they are unambiguous: `OnOffPlugInUnit-1.SET` becomes `SET`. Not for Tasmota — there the branch carries meaning, and the templates address `stat.POWER` and `tele.SENSOR`. **Nothing is merged automatically**: many devices can sit side by side under one node, and only a person knows what counts as one device.
* **Right-click a node → "Export as mock device".** Everything below that node goes into a file: the objects and the values they carry right now. The point is not backup but rebuilding — from that file a device can be recreated elsewhere, so a template can be built for a device you do not own. What goes in is a positive list, not a filter: `native` is dropped entirely, and from `common` only `name`, `role`, `type`, `unit`, `read`, `write`, `min`, `max`, `def` and `states` are kept. `states` has to come along, otherwise the type detector does not recognise the slots with `statesDefined`. Paths are relative to the exported node, which is why the mock device matches the same templates somewhere else. Levels without an object of their own are recorded as such. 
* **Before writing the file, the workbench shows what goes into it.** One row per entry with value, path, type, role and name — and a checkbox per value: untick what should not travel, and the object still stays. Values that look like an IP, a MAC or an identifier are highlighted. Above that stands what travels even without `native`: identifiers often sit **in the path and in the names too**, and leaving out `native` does not remove those. Measured on a HomeMatic central: twelve such places, although the file carries no `native` at all.
* **And read back in.** Right-click → "Import mock device …" takes such a file and builds a device from it again — **always under `0_userdata.0.wb-attrappe.<name>`, never at the original path.** That is not a rule but a way of building: a foreign export cannot overwrite a real device. The templates still match, because they check relative names (`stat.POWER`, `1.LEVEL`) and not the root. Beforehand a dialog shows every object that would appear, with a name to change; a file that does not fit is rejected with a reason. Measured: an HmIP wall thermostat, exported and imported as a mock device, is recognised there by the same template — same device type, the same eleven filled slots.

### 0.11.0 (2026-10-11)
**Templates**
* **Template notes are German and English.** The description, the recognition note and each row note are `{ "de", "en" }`. The tab shows the admin language, otherwise English, otherwise German. The name hint stays one search pattern (`licht|lampe|light|…`): it matches the device name, which does not follow the admin language.
* **One dictionary for the settings page and the tab.** Both live in `admin/i18n/`, all eleven languages, the same keys. The tab loads that same file. An unknown language falls back to English. The tab used to keep its own dictionary at `admin/sprachen/`, German and English only.

**Identifiers**
* **Object ids no longer contain umlauts.** An id may only contain unaccented letters, digits, `-` and `_`. `Küche` in the name field becomes `Kueche` (`ä`/`Ä` to `ae`/`Ae`, `ö`/`Ö` to `oe`/`Oe`, `ü`/`Ü` to `ue`/`Ue`, `ß` to `ss`). The same applies to "Place under", the move dialog and the name of a new point. Dots in the folder field stay, they separate the levels. An alias whose id already contains an umlaut is left as it is, until the name field is left again.
* **Rooms and functions keep the umlaut.** The room is still called `Wohnküche`. When the folder is taken from it, the folder is `Wohnkueche` and the path is `alias.0.Wohnkueche.…`.
* **Typing a folder by hand does not rename the room suggestion.** `Küche` in "Place under" becomes the folder `Kueche`. The question below still names the room `Küche`. Confirming it creates `enum.rooms.Küche`, not `enum.rooms.Kueche`.

**Value list and thermostats**
* **Shipped templates can now be opened row by row**, read-only. Until now the row view was reserved for your own templates: to see which fallback sources, formulas or notes a shipped one carries, you had to make an own copy first — and were left with a copy you never wanted. Every field in the block is disabled, so no working copy is created by looking.
* The **‚must be present‘ mark** now shows whether the row itself is mandatory, not whether its read path appears in the recognition list — two different questions that had been shown under one word. At the HmIP heating group one row was marked where four are mandatory; the Tasmota templates marked none at all. The same applied to the checkbox in the expanded row, so there was nowhere in the interface showing the truth. Counted across all 16 templates, 15 now show a different number — each matching what the template file says.
* That checkbox also **silently edited the recognition list**. Ticking SET on the Tasmota light template would have bound it to `stat.POWER`, a point the MQTT adapter only creates once the device has been switched at least once. It now sets only what it says; the recognition list is edited in its own field above.
* The row overview marks rows that have **fallback read paths** („+3 fallback“). Previously only the first path was shown and the others were invisible until the row was expanded.
* The **device type** field in the template sheet is now a search field with its own list instead of a 52-entry dropdown. Typing searches both names — `socket` and `Steckdose` both find it — just as the pattern chooser has always done. A dropdown cannot be searched, and since the label starts with the translated name, the browser’s type-ahead never found the raw one.
* The detail row now has a **value list** field (`common.states`). Until now it could only be inherited from a template — not seen, not created, not changed, although the workbench wrote it all along. Where the source carries one and the draft does not, a button offers to take it over, and "yields" shows the text for the value instead of the bare number. Both deviation comparisons include it; against the existing object in both directions, so a list can no longer disappear silently.
* **Fixed**: the HmIP radiator and heating-group templates read the valve opening from `1.VALVE_STATE`. On HmIP that is a state code 0-8 (ADAPTION_DONE, TOO_TIGHT, ERROR_POSITION, …), not a percentage — a thermostat reporting code 4 showed "4 %". They now read `1.LEVEL`, which the radiator template already required for detection anyway.

**MQTT**
* The card now says whether the device is reporting: a red "offline" chip when the broker published the last will, a yellow "not reporting" chip when the device claims to be online but no telemetry has arrived within three telemetry periods, and nothing at all when there is no information. Only an explicit offline counts as offline — other firmwares use other words, and an unknown one means "do not know", not "gone". A retained "Online" can be years old: a device that runs for a year never repeats it.
* "Ask the device" now also fetches the device IP and the telemetry period, and the button appears whenever one of the three is missing — not only when the command list is incomplete. Neither is reported by the device on its own: the IP only in `tele/INFO2` (sent once at boot) or `stat/STATUS5` (on request), the period only on request. Previously a device with a complete command list offered no button at all, so there was no way to get either.
* The telemetry period was read from `tele/STATE`, where Tasmota does not put it — measured across 36 devices, not one carried the field. It is now asked for and remembered, so the SetOption59 hint names the real number instead of leaving it out.
* `Status 5` is now requested twice, like `Status 11`: on first contact the MQTT adapter only creates the answer object and discards the value. Captured on the broker — the answer was published, the value never arrived.
* A Tasmota using the factory FullTopic `%prefix%/%topic%/` is now treated as one device. The MQTT adapters map the topic straight onto the object path, so such a device is spread over `tele.<name>`, `stat.<name>` and `cmnd.<name>` with no node holding it together — the MQTT card did not appear, and a send point created one level up would have been shared with the next device on the same prefix. Both layouts now yield the same relative names, so the shipped templates apply unchanged, and the card says how many branches were joined.
* Only the factory prefixes `cmnd`/`stat`/`tele` count as a prefix. A structural fallback for renamed ones turned out to merge unrelated nodes — measured against a live installation it joined the L1 phases of eight different AC sources into one device — and Victron data and a renamed Tasmota are indistinguishable in the object tree.
**Admin enumerations**
* **The room and function catalogue works again under Admin 8.0.x.** Admin ships 58 room and 62 function templates, translated and with icons; the workbench reads them from its bundles instead of keeping a copy of its own. Since Admin 8.0.x they sit elsewhere and in a different notation — no longer as JSON text in a dedicated "Enums" chunk, but as plain JavaScript inside a shared module of nearly eight megabytes. Two things were in the way: a three-megabyte size limit skipped exactly the right file, and the search pattern required `JSON.parse`. Both notations are now read. Anyone who saw only the existing entries instead of 120 templates under Admin 8 gets them back; under Admin 7 nothing changes.
* The result is then kept **in the adapter's file area** and is only fetched again when Admin rewrites its bundles — recognised by the bundle names rather than the version number, so an interim build is noticed too. While it is being fetched, a note in the bottom right explains why it takes a few seconds that one time. For storage the workbench creates an `alias-workbench.0` object of type `meta` on first use; the file area does not exist otherwise, because the workbench has no backend.
* **The pattern names now come from the store as well.** `socket` → “Socket” is also taken from Admin, because the type detector only knows raw type names — and since Admin 8 that map sits in the same shared module as the room catalogue. Both now share one store, so it is fetched once instead of twice. Measured on the second opening of the tab: **404 instead of 2,255 KB under Admin 8.0.14**, 419 instead of 864 KB under Admin 7.8.23, with no request above 100 KB in either case. Both interface languages are taken along, so switching language does not trigger the fetch again.
* **Fixed: the “n sources” chip counted one device twice** when an alias reads from two nodes, one of which sits below the other. Until now only siblings were merged — so `…Solar_Balkon.stat` and `…Solar_Balkon.tele` were, but `…inverter.HM600.ch0` and `…inverter.HM600` were not. `Solar.Balkon.Einspeisung` therefore showed “4 sources” although the HM600 is a single inverter. A source that sits below another source now counts towards it — under the same condition as before: only if the deeper node has no object of its own (that is how MQTT creates its key levels) or the ancestor is a `device` (that is where Homematic keeps its channels). Two `channel` objects stay separate even when one sits below the other — those are two devices.
* **Fixed: a German leftover in the English tab.** In the change card a hand-added row without a name showed „(ohne Namen)“ — hardcoded instead of translated, in an otherwise entirely English interface. The text now comes from the language files (`diff.noName`).

### 0.10.0 (2026-09-20)
**Detection and patterns**
* Picking another pattern re-ticks the rows and leaves them alone while the new pattern does not apply yet.
* Guessing gives every datapoint one slot only, and a contradicting unit rules a slot out — a start delay in seconds does not become an actual temperature.
* The pattern field names what is really missing, groups included (“SET / SET_HEATING / SET_COOLING”). The legend says why a pattern does not apply and offers the matching button.
* The hint “might fit better” only suggests patterns that apply afterwards.
* For “Information” the field reads “✓ 24 points” instead of “24/31 filled” — that pattern takes any number of points.
* The message “No remaining datapoint fits” no longer sits above the orange legend and names the rows decided by hand.

**Free slots**
* A slot can be created once, and every slot is listed once.
* “Suggest free slots” now sits in the blue box next to the pattern; the button for the whole device is called “Load all datapoints of the device” and sits above the list.

**The detail row of a point**
* New: “Name” and “Slot in the pattern” — the slot fills in role, type, unit and value list.
* “reads from” and “writes to” are wider, the formula is called “read formula” and sits below.
* If the slot already belongs to another row, the workbench says so instead of blaming the type. A pure measured value no longer gets a write target.

**Templates**
* “Apply template values” no longer deletes a value list.
* A template without a name can be imported and then named.
* A skipped row gives the reason: point missing, no JSON, or field missing.
* “Update template” leaves the detection as it was; an exported template can be imported again.

**Source swap**
* If one point fails, the note on the alias stays on the old source — the swap can be finished afterwards.
* The greyed-out button gives its own reason.
* The hint “one level up” only appears where it helps.

**Deleting and moving**
* The delete dialog only warns about channels that really lie below the alias.
* After a move the source knows its alias again right away; “to the source →” no longer jumps somewhere vague.

**Room and function**
* A room is found in the middle of a device name too (“Heizung_Badezimmer INT0000001”).
* Picking with the keyboard works like the mouse, and the offer “file it under … as well?” no longer opens a row of its own.
* If rooms and functions cannot be loaded, the fields say so themselves.

**Tasmota and MQTT**
* The IP is found on older firmware too (`tele.INFO2` in both forms).
* The card no longer claims a switched-off point sends; “allow sending” switches the link back on as well.
* Creating several send points at once yields the same objects as creating them one by one — `POWER`, `Fade` and `LedTable` as `mixed`, so the write formula takes effect.
* A HomeMatic actuator without a template no longer drags maintenance points along.
* “Ask” for SetOption59 only counts what arrived after sending; if no answer comes, “No answer …” is shown and the button stays for a re-check.
* The “MQTT device” card opens again on devices without a row from `tele/…`.

**Display**
* The number on a tree node counts what lies below it.
* A node without an object of its own is marked “VIR”, the device card sorts like the tree.
* A button reads along and stays a button; the misleading “never changes” badge is gone.
* JSON fields with a dot in their name can be selected.

All changes in detail, with cause and measurement: [docs/changes-detailed.md](/#/docs/adapterref/iobroker.alias-workbench/docs/changes-detailed.md).

### 0.9.12 (2026-09-18)
* The small **type badges in the tree** (DEV, CHA, FOL …) now all have the same width. A node without an object of its own shows just a dot there, and its badge was narrower — its name fell out of line.
* **“Move …” did nothing on some aliases.** Creating alias points by hand in the admin often yields an alias without its own channel object — the node shows in the tree but is not an object itself. The workbench displayed the “Move …” button there, but clicking it opened no dialog and said nothing. Such an alias is now moved exactly like one with a channel; a missing channel is not created along the way.
* **No German left in the English interface.** Three places were hard-wired German: the type badge in the detail row (“Zahl”), the “Datenpunkt” field next to “writes to” and the screen-reader label of the tick boxes (“SET anlegen”). The fixed default texts in `tab.html` are now English — before, 44 German texts were only translated at runtime. The two browser-console messages are English now as well.
* The tab's **menu entry** now has the adapter's name in all eleven admin languages. Before, it existed in German and English only, and every other language showed “Alias Workbench”.
* **Why `value.power.consumption`** — four shipped templates give consumption this role, which the ioBroker roles list marks as deprecated. That is deliberate: the type-detector 6.0.x recognises consumption only with exactly this role. The reason is now written into every affected template (field `_rolle`) and into the README. The README also explains why the workbench is an admin tab rather than a settings page.
* **The object count in the header grew the longer the tab stayed open.** Only devices, channels, folders and states are meant to be counted — and only those are loaded. When following changes, however, the workbench took in every changed object type: after switching the system language, `system.config` sat in its store and the count read 3146 instead of 3145, likewise after every saved instance setting or adapter update. Following changes now applies the same rule as loading.
* **Values from another node did not update at a source.** When you select a source that already has an alias, the list also shows that alias’s rows — and they often read from somewhere else. The electricity meter shows three rows “from Solar.Netz”: import, smoothed import and house consumption. Their value was fetched once on selection and then froze; it stayed at 428 W for hours while the system reported 22 W. Only the selected node was subscribed; the rows’ sources were only added in “Edit alias” mode. The workbench now subscribes to everything it displays — including a source you point a row to by hand in the detail view. The header accordingly shows two subscriptions instead of one on the electricity meter.
* The legend above the list claimed **“The light pattern does not apply right now: SET requires boolean, number is set. That is why no row has a place.”** — on a device whose SET row carries `switch.light`/`boolean` and is perfectly fine. The culprit was `0_AES_KEY`: hm-rpc gives it the role `state` and the type `number`, and `state` is allowed on the light pattern’s SET place. The check asks per row “your role would fit a place, your type does not” — it never looks at who ended up holding the place, and the message then printed the PLACE instead of the row it was about. The sentence was wrong at the end too: five rows did have a place. The type reason now only applies when the named place really did stay empty; otherwise the ordinary legend is back, and every placeless row is tinted instead of just one. The case the message was built for — SET itself in the wrong type, place stays empty — is unchanged.
* Rows carried **“differs from the template”** where no template was in force at all — and flagged the better value while doing so. What was really compared was the raw draft, that is the bare role of the source point: on a switch actuator, after “— no template —”, `SET` showed the badge and below it “The template wants: **switch**”, while the alias holds `switch.light`, which even fits the `light` pattern. Same on `UNREACH`, where `indicator.maintenance.unreach` counted as the deviation and `indicator.unreach` as the target. And it was not only the dismissed case: on a device for which a template is **never** found, the same badge appeared. The rule now: with no template in force — dismissed or never found — no template value is recorded, so the badge, the detail line, the `←` button and the **template** filter button all drop out. Rows keep what the alias holds; that is the stock rule and has nothing to do with templates. With a template everything stays as it was — a real deviation is still shown.
* With **“— no template —”** the **output** picker stayed on screen if you came from the multi-output template — coming via any other template it was gone. Two routes, two answers on the same device. Worse: using the leftover picker brought the dismissed template **silently back** (measured: after switching to `Licht_Esstisch` the field read “HomeMatic switch actuator with several outputs” again). An output does not belong to the device but to the template’s `mehrfach` block — without it there is no placeholder and so nothing to choose; of 17 bundled templates exactly two carry such a block. The raw draft no longer inherits it, and the channels go through “one sub-folder per channel” instead. **And everything is ticked now.** The raw draft used to tick whatever had a place in the detected pattern; on two **identical** channels the detector picked one of them — the second — so `Licht_Esstisch` stood ticked and `Licht_Bar` empty. Which one it picks is chance, and guessing is not the job of a draft without a template: dropping the template means picking the points yourself.
* The expander in the template box read **“Why this template +”** and always wanted the right-hand edge. With a long name and two badges — “HomeMatic roller shutter actuator”, chosen by hand, forced — it no longer found room there and took **a line of its own**; the box grew without anything having been added. It is now a **question mark**, with the sentence in the tooltip. What was left out stays visible as a short badge (`4 WITHOUT SOURCE`) — nobody should have to go looking for the fact that points are missing — and the sentence behind it now reads “4 left out because the source is missing” instead of “Left out because the source is missing: 4”. The header no longer wraps at all: room is made by the template name, which is shortened and shown in full in its tooltip; the id stays put, because `hm-rollladen…` is no longer an id. Expanded, the question mark is filled.
* **A push-button is not simply any write-only point.** The workbench left the read source empty on every row whose source carried `read: false`. But HomeMatic uses that flag for two different things, counted across every device in the house: for a button press (`PRESS_SHORT` 100 points, `RAMP_STOP` 3, `STOP` 1, `OLD_LEVEL` 3 — all with `native.TYPE: ACTION`) **and** for a setting that stays put (`ON_TIME` 20 points, `RAMP_TIME` 3 — `TYPE: FLOAT`). That is why the living-room dimmer showed “never changes” on `ON_TIME` with an empty “reads from” field — on a value in seconds that one does set at the source now and then. Measured: an alias put on `1.ON_TIME`, the source set to 30 directly, and the alias showed 30. So `read: false` does not block reading. The read source is now left empty only where a button press is really meant: `native.TYPE: ACTION`, or a role starting with `button`. `OLD_LEVEL` is the case where the role is not enough — it is called `value.dimmer`.
* **“— no template —”** is now in the template picker. Once the workbench had detected a template it could only be swapped for another one, never dropped: the first entry of the list was a mere heading with an empty value, and the branch bailed out on an empty value. Anyone wanting to create all points of a device without a template’s defaults had no way to get there. The choice now rebuilds the draft without any template — ticked is whatever has a place in the detected pattern — and target, folder, name, room and function stay as they were.
* The mark on a row whose source only writes read **“reports nothing”**. That sounded like a fault — as if the device were mute. What is meant is different: the value stays where it was written and never reports back by itself. It now reads **“never changes”**, and the same in the “target does not read” check.
* **“One sub-folder per channel”** — the button next to “create as one device” serves a different purpose, and nothing said so: it **mirrors the folder structure of the source**. A container for the device, one channel each below it, the states below those. **The ticks now decide what appears**: one sub-folder for every channel that contributes at least one ticked row, holding exactly those rows. Before, the path built a fresh draft per channel and ticked whatever that channel’s pattern offered — things appeared that nobody had chosen (on the test device the maintenance channel got three points instead of the two ticked ones), and channels with nothing chosen were created all the same. Edits made by hand on a row — role, type, unit, formula, caption — now travel with it. **Information channels count too**: they used to be dropped, so the button said “3 of them” while six channels stood in the tree next to it — and clicking `general` on its own has long given a draft (“Information ✓ 7/14 filled”) that could be created. **The maintenance channel gets its own folder** instead of being copied into every output: `UNREACH` exists only in channel 0 of the dimmer, so that is where it belongs; whoever wants it with the light takes “create as one device”. The copying had produced nonsense — 206 raw data points of a lawn mower in each of four drafts, the three meter phases of a Shelly SHEM-3 counted as “shared” instead of as channels of their own. **Virtual channels drop out by themselves**: on a HomeMatic dimmer nothing is ticked in the two `VIRTUAL_DIMMER` channels, so nothing is created there. **States directly on the device** stay in the container, which is then created as a channel instead of a folder. **And the hint is right again**: it computed `targetFolder + channel` while writing uses `targetFolder + device + channel` — on the dishwasher it promised `alias.0.Commands` and created `alias.0.Dishwasher.Commands`, on the living-room dimmer it read `alias.0.1`, `alias.0.2`, `alias.0.3`. It now names the id, the number of ticked points and the detected type. The label says so too: “one sub-folder per channel, N of them …” instead of “one device per channel”
* On a **multi-output device** the draft adopted the ticks of a foreign alias. The workbench asked "is there already an alias for this device?" and answered with the one that reads **most often** from it. On Ricardo's power strip that is the consumption alias with six points from `tele.SENSOR` — it beat `RF1000` with two points from `stat.POWER1`. Output 1 then showed ELECTRIC_POWER and CONSUMPTION ticked, SET unticked, and the pattern field reported **"✕ SET missing"** on a device with a working SET. The majority rule is right for a single-output device and the wrong question for a multi-output one. The right question is: **does this alias belong to the output currently selected?** That is not guessed from names but asked of the template — which of its paths carry the placeholder? Exactly those tell the outputs apart (`stat.POWER%N%`, `cmnd.POWER%N%`); everything else (`tele.SENSOR`, `tele.LWT`) is shared. This also removes the trap from I31: `tele.INFO2` does carry a two, but no placeholder. For output 1 the bare `cmnd.POWER` counts as well — with Tasmota, POWER without a number is a second name for POWER1, measured at the device: a query to `cmnd/POWER` is answered with `{"POWER1":"ON"}`, and a topic `stat/POWER` does not exist. **The bug only hit the first glance**: coming through the tree brought the wrong stock, switching the output asked nothing at all and the template defaults won — the same output looked different depending on how you got there. All three paths now ask the same question. Single-output devices never enter the new branch by construction; without the new argument `aliasFuer` behaves line for line as before.
* **The target line now follows the same alias.** On a multi-output device it always showed the output number — `alias.0.Bastelzimmer.Steckdosenleiste.POWER1`, an ID that does not exist — and reported "will be created", while `RF1000` stood right next to it. Clicking would have put a second alias beside the existing ones. The source said: "the workbench cannot know what the individual output is called." That held as long as it could only ask about the device. The target line now points at `…Steckdosenleiste.RF1000` with the badge "already exists", and "update alias" hits it. Where no alias exists for the output yet — the garden valve island — the proposal from the output number stays, and so does "will be created".
* The **SetOption59** note appeared on every Tasmota device, including where it has no effect. It claimed an alias would show "the old value for minutes after switching" — but on the power strip not a single row reads from `tele/STATE`; they all read from `stat.POWERn`, which the device sends immediately on every command (measured: 1.07 s). "For minutes" also assumed the Tasmota default of 300 seconds; on that strip it is ten (measured: `tele/STATE` every ten seconds). The block now only appears when a row really reads from `tele/…` **and** writes to `cmnd/…`, names those rows, and reads the interval from `TelePeriod`; if it is not in the telegram the text says "on the telemetry cycle" instead of inventing a number. The same applies to the chip in the header. And the check "feedback is immediate" no longer reports "all fine" where there was nothing to check, but **"no row affected — all read from stat/…"** with a grey dot instead of a tick. Card and check ask the same function and can no longer drift apart.

Older entries: CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Ricardo Hipp <ricardo.hipp@googlemail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.