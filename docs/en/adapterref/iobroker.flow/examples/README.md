---
chapters: {"pages":{"en/adapterref/iobroker.flow/README.md":{"title":{"en":"ioBroker.flow"},"content":"en/adapterref/iobroker.flow/README.md"},"en/adapterref/iobroker.flow/examples/README.md":{"title":{"en":"Examples"},"content":"en/adapterref/iobroker.flow/examples/README.md"}}}
---
# Examples

Complete diagrams to start from. Open the designer, use **Import**, paste the file — then fill in the
state ids. Every `"oid": ""` in these files is a blank waiting for one.

---

## `hybrid-12v.json` — 12 V off-grid / hybrid installation

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="../src-widgets/public/img/prev_hybrid-12v-dark.svg">
  <img alt="hybrid-12v" src="../src-widgets/public/img/prev_hybrid-12v.svg">
</picture>

A DC-coupled setup: four MPPT chargers feed a 12 V battery bank, a DC branch runs directly off the
battery, an inverter makes 230 V for the household appliances, and the grid can both supply the AC
side and charge the battery.

### What to bind

Thirteen state ids, most of them meters you already have. The ones marked *derived* need nothing --
the diagram works them out from the connections.

| Element | What it needs |
|---|---|
| **MPPT 1 … 4** | Power of each charge controller, in W |
| **Produktion** | *derived* -- the sum of what leaves it. Its badge takes the daily yield in kWh |
| **DC 12V** | Power of the 12 V branch, in W |
| **Batterie** | *derived* -- net of the two lines. `soc` takes the state of charge in %, the badge the charge current in A |
| **Inverter** | Apparent power in VA. Its `action` can toggle the inverter — put the switch state there |
| **AC 220V** | Power on the AC side, in W |
| **Netz** | Grid power in W. Positive = drawing, negative = feeding in |
| **Wasch-/Spülmaschine, Herd, Boiler** | One meter each, in W |
| **Connections** | One state each: MPPT→Produktion, Produktion→DC/Batterie/Inverter, Batterie→DC, Netz→Batterie, Netz→AC, Inverter→AC, AC→appliance |

Anything you have no meter for: leave it empty. An unbound connection stays grey and does not animate,
and the rest of the diagram is unaffected.

### Two things worth knowing

**The battery power is not bound, it is derived.** It is the net of the charge line and the DC line:
196 W leaving towards the DC branch while 156 W arrive from the charger shows as 40 W, and the sign
says which way round it is. Bind a value to the node if you would rather read your BMS directly.

**The charging line is in watts, the charge current is a badge.** The original of this diagram prints
"12 A" on the line from the grid to the battery. That is one unit on a line among watts, and as soon as
a node derives its value from such a line the sum mixes amperes into watts. So the line carries the
charger power and the current sits under the state of charge, where it reads the same and cannot be
summed by mistake. If you prefer it on the line, set that connection's unit to `A` and give the battery
node its own value source.

### Where it differs from the original

- The **four MPPT readouts** are nodes connected to *Produktion* rather than four free-standing
  numbers, so *Produktion* can derive its value from them.
- The **three appliances** are connected to *AC 220V*. In the original they float unconnected.
- The battery's **min/max history** ("98 % a few hours ago") has no equivalent yet — there is no
  history access in the widget.