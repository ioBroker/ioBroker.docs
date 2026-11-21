---
chapters: {"pages":{"en/adapterref/iobroker.idm-modbus/README.md":{"title":{"en":"ioBroker.idm-modbus"},"content":"en/adapterref/iobroker.idm-modbus/README.md"},"en/adapterref/iobroker.idm-modbus/docs/en/manual.md":{"title":{"en":"ioBroker.idm-modbus – Manual"},"content":"en/adapterref/iobroker.idm-modbus/docs/en/manual.md"}}}
---
# ioBroker.idm-modbus – Manual

Local ioBroker adapter for IDM heat pumps with Navigator control (Navigator 2.0 / Pro verified, Navigator 10 and 1.0/1.7 from the IDM documents). It talks to the Navigator over **Modbus TCP** on your own network, with no cloud. [Deutsche Version](https://github.com/seaspotter/ioBroker.idm-modbus/blob/main/docs/de/handbuch.md)

## 1. Before you start

Two things have to be set up **once on the Navigator**, usually at installer/service level (ask your installer if you cannot reach the menus):

1. **Modbus TCP** is switched off by default. In the main menu "Settings" choose "Building management" (Gebäudeleittechnik) and set "Modbus TCP" to "On"; give the Navigator a fixed IP address. Without it the adapter cannot read anything; _Test connection_ then reports a failed connection.
2. **Network PIN** – only for the optional _web interface_ part (room names, room data, statistics from the Navigator's web pages). The adapter works without it.

The adapter never unlocks installer functions and never changes these settings itself.

**Safety in short:** reading is always harmless. Writing is off by default, per group, and every write is checked, limited and counted. Many Navigator settings live in an EEPROM that survives about 300,000 write cycles per setting, so never let an automation write them continuously.

## 2. First setup (5 minutes)

1. Install the adapter and create an instance.
2. **Connection** tab: enter the Navigator's IP address and choose the Navigator generation. Press **Test connection**: it shows the outdoor temperature and the generation it detected (a hint appears if it differs from your choice).
3. **Installation** tab: press **Scan device** (about 3 minutes, read requests only; do not restart the adapter meanwhile; the page shows the progress). When the status line says _Scan finished_, press **Apply suggestion**. It ticks the heating circuits, zone modules and blocks the Navigator really has. Check them, then **Save**.
4. States appear as soon as the Navigator reports a value. Hardware your plant does not have gets no empty states.

Everything else is optional and off until you switch it on.

## 3. Settings reference

### Connection

![Connection tab](../images/en/settings-connection.png)

| Setting                  | Meaning                                                                                                                                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Navigator host / IP      | Address of the Navigator. Use a fixed address.                                                                                                                                                                                                                                                          |
| Navigator generation     | 2.0 (also Pro), 1.7 or 10. The test button detects it for you.                                                                                                                                                                                                                                          |
| Web interface (optional) | Also read data from the web interface: inputs and outputs (Navigator 2.0 / Pro and 10), plus room names, room data and statistics (Navigator 2.0 / Pro). Not for the Navigator 1.0/1.7. Needs the display's network PIN (stored encrypted, sent unencrypted over your local network like in a browser). |
| Diagram                  | Heat source, parts to leave out, rooms next to heating circuits; see section 8a.                                                                                                                                                                                                                        |
| Expert settings          | Visible with the admin's expert mode: port (502), unit ID (1), request timeout, pause between requests (at least 100 ms: the Navigator stalls under hard polling), polling intervals fast/medium/slow/settings (30 s / 60 s / 300 s / 3600 s) and the web intervals.                                    |

### Installation

Heating circuits A–G (with optional names), number of zone modules and rooms per module, optional register blocks (solar, ISC, cascade, bivalence, PV and power values, booster pumps of the Navigator 10), the device scan with _Apply suggestion_, and two options for which states exist:

- **Hide states of hardware that reports no value** (default on): states of sensors, pumps and the like that your plant does not have are not created. A state appears by itself when a real value arrives and then stays: the adapter never deletes a state that exists (only switching a register off in the settings does).
- **Delete states of circuits, zones and blocks switched off here**: cleans up what you disabled.

### Statistics

Derived values and statistics (see section 6): optional external electricity meter (counter and/or power) and heat meter, which heat source feeds the efficiency figures, price per kWh (fixed or from a state, in currency or cent per kWh), currency, CO₂ factor (fixed or from a state, in g or kg per kWh), maximum age of external values, _Reset statistics_.

### Control

Allows writing to the heat pump. **Everything is off by default**, per group: system mode and fault acknowledgement, hot water settings, each heating circuit, room setpoints and operating modes of the zone modules (Navigator Pro), solar mode, and bivalence/cascade (expert). Plus the one-time hot water charge, the minimum time between two writes of one setting (default 60 s) and a warning threshold for writes per setting and day.

### Photovoltaics, Room sensors, Building automation

Feeding of values from ioBroker states to the Navigator, see section 7.

### Diagnostics

_Create support file_ (section 9).

## 4. The object tree

All states are below the instance (`idm-modbus.0.`). Names are translated into your ioBroker language.

| Channel                                             | Content                                                                                                             |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `info`                                              | `connection`, `family`, `errors`, `lastSuccess`                                                                     |
| `system`                                            | outdoor temperature, system mode, fault number `internal_message` and its text `internal_message_text`              |
| `dhw`                                               | hot water: storage and heater temperatures, setpoints, one-time charge (`boost_*`)                                  |
| `hp`                                                | heat pump: flow/return, operating mode, compressors, pumps, valves, demands, summary fault                          |
| `hc.A` … `hc.G`                                     | per heating circuit: flow, room temperature, mode, setpoints, heating curve, limits                                 |
| `zones.1.rooms.1` …                                 | zone modules: room temperature, setpoint, humidity, operating mode, relay (names from the web interface if enabled) |
| `energy`                                            | heat quantity counters, momentary power                                                                             |
| `solar`, `isc`, `cascade`, `bivalence`, `pv`, `glt` | optional blocks                                                                                                     |
| `calc`                                              | calculated values: temperature differences, flow deviation, momentary COP                                           |
| `stats`                                             | energy per operating mode, COP and annual performance factor, cost, CO₂, operating hours, starts, defrosts          |
| `web`                                               | inputs and outputs, room data and statistics from the web interface                                                 |
| `rooms`                                             | room temperature feeding: `writer_conflict`, `last_write` (like `pv` and `glt`)                                     |
| `diagram`                                           | settings of the heat pump diagram (`settings`)                                                                      |
| `diag`                                              | request statistics, last error, write counters, scan state                                                          |

Rules for the values:

- Temperatures, temperature differences and counters (kWh, hours) show **one decimal**.
- A value the Navigator marks as _not available_ (sensor missing) is empty with a bad quality flag, never a made-up number.
- Writable states are written with `ack=false`; the adapter confirms with `ack=true` after the Navigator accepted and read back the value.

## 5. Writing and its protections

Every write passes these checks: allowed group, valid value (documented range and allowed values only), only if it differs from the current value (for EEPROM settings), debounced (1 s), at least 60 s between two writes of one EEPROM setting (the newest value wins), written, **read back** after 1 s and counted (`diag.writes.<id>`). A burst or more than the daily threshold gives a warning; three failures in a row lock a setting for ten minutes. Nothing is queued while the Navigator is offline, and a refused value is shown back as the real value.

**One-time hot water charge** (Control tab, off by default): `dhw.boost_start` / `dhw.boost_stop`. It switches the hot water demand (register 1712) on, refreshes it every 30 s and **always switches it off again**: at the target temperature (default 55 °C), after the time limit (default 60 minutes), on request, after three failed writes, when the adapter stops and after a restart.

## 6. Statistics

- **Calculated values** (`calc`): heat pump flow minus return, heat source inlet minus outlet, hot water minus setpoint, flow deviation per heating circuit, momentary COP (internal from the Navigator's power registers, external if you have your own meter).
- **Energy and efficiency** (`stats`): electrical and thermal energy per operating mode (heating, hot water, cooling, defrost) for today, this month, this year and since the start, COP and annual performance factor (also the last 365 days), cost at the price valid when the energy was used, CO₂ at the intensity valid then (`stats.co2.intensity` shows the factor in use), operating hours, starts and short runs per compressor, defrost cycles and hours. The statistics survive restarts. COP guards: at least 50 W, at least 0.1 kWh per period.
- **External meters:** a counter state is preferred (it keeps counting while the adapter is stopped); a power-only state is integrated. The unit is read from the state; if it has none, choose it, otherwise the source stays off with a warning (the adapter never guesses a unit).
- **Web statistics** (`web.statistics`, needs the PIN): runtime, heat quantity and electrical energy per operating state for today, month, year and total, a JSON history of days, months and years (back to the first operation), and the COP calculated from them. Compare it with the Modbus-based figures before relying on it; the hot water COP in particular depends on how the Navigator assigns energy.

## 7. Feeding values to the Navigator

All three modules are **off by default**, write only when something is configured, and read back what they wrote to detect a second writer (`*.writer_conflict`).

![Photovoltaics tab](../images/en/settings-pv.png)

- **Photovoltaics** (registers 74–86): one block each for PV surplus (74), production (78), house consumption (82, including the heat pump), battery discharge (84, positive = discharging, negative = charging) and battery level (86). Give a block a source state to send it; **a block without a state sends nothing**. The electric heating rod (76) is not offered, the Navigator delivers it itself. A factor converts to kW (1 for kW, 0.001 for W, point or comma; there is deliberately no default), plus invert and limits (clear a limit by emptying the field). Surplus is taken directly from a state or calculated as production minus house consumption. Every configured value is written every cycle (30 s by default), changed or not, because the Navigator reports missing data when values stop arriving. If a source is missing or too old, **0** is written (battery level: **-1**, "not available") so that the Navigator keeps receiving every value and the heat pump does not keep running on an old surplus. At the start the adapter warns about what is not set up (no surplus block, calculated surplus without production or house consumption, battery level without battery power). The Navigator's PV menu must be set up. Switch off any other program that writes these registers. Older configurations with the table of rows are moved into the blocks at the first start.
- **Source states:** every source state of the PV, room, building automation and statistics tabs must carry confirmed values (`ack=true`). Values written with `ack=false` (a plain `setState(id, value)` in a script) are ignored, and the log names the state once. In scripts use `setState(id, value, true)`.
- **Room sensors** (registers 1650+): the temperature of a state as external room temperature of a heating circuit; written on a change of 0.2 °C or at the heartbeat (300 s), only within 15–30 °C, and not from sources older than 15 minutes (or a fixed fallback value). In the Navigator the room must use the Modbus/GLT sensor as its temperature source.
- **Building automation** (registers 1690–1722): outdoor temperature, humidity, temperature and heating/cooling/hot water demands, storage temperatures. Switch on the matching GLT option in the Navigator first (for example "GLT outdoor temperature"). Not tested on a real device.

## 8. Web interface (optional)

> **Language:** this part is only tested and supported with the Navigator language set to German (General settings | Language on the display). With another language the statistics, some part names and the diagram may be missing or wrong, and the adapter logs a warning once when the statistics use names it does not know. Everything that comes from Modbus does not depend on the language.

With the display PIN the adapter reads the Navigator's local web pages (read only): room names and heating circuit names (used as names in the object tree), room temperature, target, humidity and mode per room, and the statistics. The web interface is not documented by IDM and may change with firmware updates. Polling every 60 s (rooms, inputs and outputs) and 15 minutes (statistics); never faster than 30 s / 5 minutes.

The inputs and outputs of the Navigator's information menu become states under `web.io`: sensor inputs that Modbus does not deliver (for example the heating flow rate B2 and the refrigerant circuit pressures and temperatures), digital inputs (for example the hot water flow switch B1 and fault contacts), analog outputs (pump and fan control, -1 % means "not controlled") and digital outputs (pumps, valves, heating rods). Their names are English with translations where the adapter knows the part, otherwise the Navigator's own text.

Navigator 10: the same input/output tables are read through the Navigator 10's WebSocket (port 61220, the display PIN as login). Rooms, circuit names and statistics are not read there yet. This has been tested against a simulated Navigator 10 only, following the protocol that Xerolux documents; please report how it behaves on a real device. Navigator 1.0/1.7: there is no web interface to read, the option is hidden.

Modbus wins: a part that Modbus delivers (the adapter matches the IDM tag in the register names, e.g. B33, M64) is not created from these tables, and a room that Modbus reads has no entry under `web.rooms` at all (its name is the state `zones.<zone>.rooms.<room>.name` and the name of the channel, its values are the zone states). The web copy appears only while Modbus has no value, for example the charging pump M73 while it stands (-1 % = not driven cannot be told from "not available" by Modbus). A web copy that exists stays (nothing is deleted), but only a part that Modbus currently reports no value for gets a new one.

## 8a. Heat pump diagram

The diagram is a live picture of your plant on a web page. It is drawn from the values the adapter reads, it is read only and cannot change anything. The page runs in your browser and gets its data through the ioBroker **web adapter**, so it needs one web instance (the usual port 8082) and no port of its own.

**Opening it.** Click the link _Heat pump diagram_ next to the instance in the instances list, or open `http://<ioBroker computer>:8082/idm-modbus/index.html?instance=0` (the number is the instance of this adapter). The page follows the language of the ioBroker system settings.

**How to read it.** The pictures below are drawn from sample values (not a real plant).

- **Orange** pipes carry the hot flow from the heat pump (or a boiler, stove, solar), **blue** pipes the return and, while cooling, the cold water.
- A **thin grey** pipe carries no water now (the operating mode does not use it, or the pump behind it is off); its value label is grey too.
- **Light dashes** moving along a coloured pipe mean that the water flows there now.
- **Green** (a dot, a pump or mixer symbol) means running or driven, grey means off.
- The short codes (B33, B38, M73 ...) are the IDM measuring points (B = sensor, M = actor); hover over a label to see its name.

![Heating](../images/en/diagram-heating.png)

_Heating: the heat pump (top left) charges the heating buffer (middle), heating circuit A (right) takes its heat from it. The hot water vessel with its fresh water station (bottom) rests, so its pipes are grey. The solar thermal box (bottom left) heats the storage through a coil._

![Hot water](../images/en/diagram-hot-water.png)

_Hot water: the same plant while the heat pump charges the hot water vessel. The pipes to the vessel are coloured now and the heat pump pipes to the buffer rest. The buffer still feeds circuit A, so its pipes stay coloured._

![Cooling](../images/en/diagram-cooling.png)

_Cooling: the heat pump charges the cold storage (middle, blue) and the circuit takes its cold from it. All pipes with cold water are blue; the buffer and the hot water vessel rest._

**Settings (Diagram tab).** They apply at once, the page redraws itself.

| Setting                        | Meaning                                                                                                                                                                                               |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Heat source                    | Automatic, Air or Ground or groundwater. Automatic decides from the sensors the Navigator reports; choose by hand if it guesses wrong.                                                                |
| Source of power and COP        | Electrical power, thermal power and COP come from the Navigator (default) or from the external meters (Statistics tab). Where there is no external meter, the Navigator value is used.                |
| COP rows                       | Shows the COP of the chosen source (default), both COPs (Navigator and external), or none.                                                                                                            |
| Parts to leave out             | Buffer, hot water tank, fresh water station, photovoltaics, solar thermal, bivalence. Parts the plant does not have are not drawn anyway.                                                             |
| Storage in the diagram         | One vessel (a Hygienik with stratification plate: heating buffer and hot water share it) or two vessels (a separate heating buffer next to a Hygienik or AQA). The sensors cannot tell the two apart. |
| Size of the diagram (%)        | How large the diagram is drawn, in percent of the original size (default 90).                                                                                                                         |
| Rooms next to heating circuits | By default the rooms of zone module 1 stand next to heating circuit A, those of module 2 next to circuit B, and so on. Add a row to place a zone module next to another circuit.                      |

**What you see.** The diagram assembles itself: a part appears only when the adapter has a real value for it.

- **Heat pump** (left): electrical and thermal power, COP, the heating flow rate (B2), sensors of the heat source (for example the air intake B37), pump status (M73), the operating mode, and the outdoor temperature (B32) to its left. The fan turns with the fan voltage M13, or while the compressor runs. A ground or groundwater heat pump (heat source sensors and pumps, no air intake) shows a pump symbol instead of the fan, with the source pumps M15 and M16.
- **Storage** (middle): hot water at the top (B48) and in the middle (B41), the heat storage at the bottom (B38). Three pipes lead to the heat pump: hot gas line (B35), flow (B33) and return (B34). A storage with fewer sensors shows fewer levels.
- **Fresh water station** (right of the storage, when the tapping temperature B42 is reported): the heat exchanger, the cold water inlet and a faucet with B42 and the hot water setpoint. The drop is bright while hot water is drawn (flow switch B1).
- **Two vessels:** with a separate heating buffer the hot water vessel hangs below the buffer and is charged by its own pipes. A cooling plant with a cold storage (B40) shows it as a further vessel. Where the plant has no heating buffer, the pipes go straight to the heating circuits.
- **Heating circuits** (right): one card per circuit with its flow temperature (B51 for circuit A, B52 for B and so on), setpoint, room temperature, its pump (M31 for A, M32 for B, ...) and mixer (M41, ...). The dot in the corner of the card is green while the circuit pump runs. A circuit with a pump and no mixer is a direct circuit. The rooms of zone module N stand next to circuit N; more circuits stack below each other.
- **Solar thermal** (bottom left, when the plant has it): the collector (B73), a coil in the storage, charging (B74) and return (B75) on their pipes, the solar pumps (M75, M76) and further solar sensors in the box. The solar pipes move while the pumps run (without pump values: while B74 is clearly warmer than B75).
- **Heating rod and circulation:** the stages of the electric heating rod and the hot water circulation pump (M64) where the plant reports them.
- **Further heat generators** (bottom left): a cascade of heat pumps (stages running of the stages available for heating, cooling and hot water; the sensors of the other units are not exposed), an oil or gas boiler (priority valve M111) and a tiled stove (pump M88, sensor B84). Their pipes join the heating buffer, or the heat pump pipes where there is none, and move while they run. The boiler is always drawn to the heating buffer, although its valves may also switch it to the hot water vessel.
- **Energy tiles** (bottom): photovoltaics, battery, surplus, house and heat pump power. They are not tied to the heat pump.

![Boiler](../images/en/diagram-boiler.png)

_An oil or gas boiler (bottom left) feeds the heating buffer while it runs; a tiled stove is drawn the same way._

![Cascade](../images/en/diagram-cascade.png)

_A cascade of two heat pumps: the card (bottom left) shows how many stages run of those available for heating and hot water; its pipes join the heat pump pipes._

**Pumps and mixers.** Pumps (the charging pump M73, the fresh water pump M22, the heating circuit pump M31, and the source pumps of a ground source heat pump) show as a small pump symbol: green while it runs, grey while it is off, with its speed. The hot gas mixer M71 (in the heat pump box) and the mixer M41 of heating circuit A (the text the Navigator reports) show as a valve symbol, green while they are driven; M71 and the fan M13 are 0-10 V outputs and shown as 0-100 %. The pump circle turns green while the pump runs. Mixers and the pumps M22, M31 and M73 need the web interface values.

**Colours and movement.** Heating pipes are orange (flow) and blue (return), the storage fades from hot (top) to cold (bottom). The water takes the path of the operating mode: while the heat pump heats, the pipes to the heating buffer and the circuits are coloured; while it charges hot water, those to the hot water vessel; while it cools, the pipes carrying cold water are all blue, to the cold storage (or straight to the circuits without one). A pipe is coloured only while water really flows through it (the circuits keep drawing from the heating buffer while the heat pump itself is off or defrosting); a pipe on the active path whose pump is off, and any pipe the current mode does not use, stays thin and grey, and so do the value labels on it. Light dashes move along a coloured pipe while something runs: the charging pump M73 or the flow sensor B2 for the heat pump pipes, the mixer M71 and the water for the hot gas line, the circuit pump (M31, M32, ...) for the pipes of a circuit, the station while hot water is drawn (all four pipes of the station while it works), the solar pumps for the solar loop. Moving the mouse over a label that shows only a tag and a value (for example B38) shows the name of that part.

**Where the values come from.** Mostly from Modbus. A few exist only in the web interface (the flow rate B2, the hot water flow switch B1, the pump M22, the fan voltage M13, the pump M31): switch on _Web interface_ and enter the display PIN to see them. Where Modbus and the web interface both deliver a value, Modbus is used.

**With Modbus only.** If the web interface is off or not available, everything that comes from Modbus is drawn as usual. What only the web interface delivers is missing: the pump and mixer rows of the circuits, the station pump M22 and the flow switch B1, the fan voltage M13, the flow rate B2, the hot gas mixer M71, the solar pumps, the heating rod stages, the boiler and the stove, and the room and circuit names. The diagram then draws from the best information left and never claims more than it knows: a circuit without a pump state shows its operating mode in its dot, and its pipes are coloured by the operating mode but not animated; the fresh water station is coloured but not animated (nothing tells whether hot water is drawn); the fan turns while the compressor runs; the solar loop follows the sensors B74 and B75.

**Staying current.** The page compares all values with the server every minute, shows the current values after the connection to the web adapter was interrupted, tries a load again that failed, opens the connection again when it stops answering, and refreshes when a tab that was in the background becomes visible again. A status line at the top shows the time of the last update.

**Good to know.** Rooms are assigned to circuits by zone module number (zone 1 to circuit A, zone 2 to circuit B and so on); this is an assumption. Heating circuits are numbered B51 to B57 (flow) and B61 to B67 (room) for circuits A to G. The ground and groundwater variant and the solar block have not been seen on a real plant yet.

## 9. Support

_Diagnostics_ tab → **Create support file**: a report for bug reports with the configuration (without host, PIN and state ids), connection state, registers that report no value, the latest reading of every register and the last scan result. IP and e-mail addresses are removed. The file opens in a new tab and is kept in the file area `support` (last five files). Attach it together with the adapter log (set the log level to _debug_ for connection problems).

## 10. Troubleshooting

| Symptom                                               | Cause / remedy                                                                                                                                                                      |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _Test connection_ fails                               | Modbus TCP not enabled on the Navigator, wrong IP, or another client blocks the port.                                                                                               |
| Connected but no outdoor temperature                  | Unit ID other than 1 (expert settings).                                                                                                                                             |
| Many empty states                                     | Hardware your plant does not have: keep _Hide states of hardware that reports no value_ on, or run the scan and apply the suggestion.                                               |
| Wrong or missing values after changing the generation | Select the generation the test button reports.                                                                                                                                      |
| The Navigator becomes slow                            | Polling intervals or the pause between requests too short; keep the defaults.                                                                                                       |
| Scan stops at about 25 %                              | The adapter was restarted during the scan (also by a configuration save); start it again and leave the adapter alone.                                                               |
| `web.connected` is false                              | Wrong PIN, web interface not reachable, or the PIN is not set on the Navigator.                                                                                                     |
| The diagram does not open                             | Install and start a web adapter instance; the page is served by it (`/idm-modbus/`). Use the link next to the instance, it carries the instance number.                             |
| A part is missing in the diagram                      | The adapter has no value for it: the plant does not have it, it is not enabled in the Installation tab, or (flow rate, pumps, fan voltage) the web interface is off.                |
| A write has no effect                                 | Check the group is enabled in the Control tab; the log names the reason (range, equal value, interval, lock). Room setpoints only act while the room is in operating mode _Normal_. |

## 11. Known limits

- Navigator 10 and 1.0/1.7 register files come from the IDM documents and are untested on real devices; scans from other owners will confirm them. The 1.7 coil registers (3000–3003) are not supported.
- The Navigator may deliver wrong data when overlapping registers are read in one block; the adapter reads the affected registers (for example room humidity and mode) one by one.
- A Modbus room created in the Navigator app cannot be fed by this adapter yet; how the Navigator expects its temperature is open.

## 12. Credits and disclaimer

Register definitions follow the IDM Modbus TCP documents (Navigator 2.0: 812170 Rev.10, Navigator 10: 812663 Rev.0, Navigator 1.0/1.7: 812049 Rev.1). Thanks to **Xerolux** ([idm-heatpump-api](https://github.com/Xerolux/idm-heatpump-api), [idm-heatpump-hass](https://github.com/Xerolux/idm-heatpump-hass), MIT) for the comparison data and for finding many device quirks first. This is an independent community project, not affiliated with or endorsed by IDM Energiesysteme GmbH. Use at your own risk, especially when writing.