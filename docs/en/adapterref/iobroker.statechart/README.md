---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.statechart.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.statechart.svg
BADGE-Number of Installations: https://iobroker.live/badges/statechart-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/statechart-stable.svg
BADGE-NPM: https://nodei.co/npm/iobroker.statechart.png?downloads=true
BADGE-Test and Release: https://github.com/IggePop/ioBroker.statechart/workflows/Test%20and%20Release/badge.svg
chapters: {"pages":{"en/adapterref/iobroker.statechart/README.md":{"title":{"en":"ioBroker.statechart: reference"},"content":"en/adapterref/iobroker.statechart/README.md"},"en/adapterref/iobroker.statechart/development.md":{"title":{"en":"ioBroker.statechart: development"},"content":"en/adapterref/iobroker.statechart/development.md"}}}
---
# ioBroker.statechart: reference

[Overview](https://github.com/IggePop/ioBroker.statechart/blob/main/README.md) | [Deutsch](https://github.com/IggePop/ioBroker.statechart/blob/main/docs/de/reference.md)

## The editor

The list of charts is on the left, the chart in the middle, and the tabs **Properties**, **Variables** and
**History** on the right. Both side panels can be resized by dragging their border (double click: default width),
and collapsed with the arrow on their border, for more space for the chart. A double click on a state or transition
expands the right panel again. The browser remembers the widths and which panels are collapsed.

The toolbar above the chart is grouped by tasks, the tooltip of each icon shows its name and shortcut:

| Group | Icons |
|---|---|
| Save | **Save** (Ctrl+S, also while typing in a field; blue when there are unsaved changes) |
| History | **Undo** (Ctrl+Z), **Redo** (Ctrl+Y) |
| Clipboard | **Cut** (Ctrl+X), **Copy** (Ctrl+C), **Paste** (Ctrl+V), also between charts, and **Delete** (Del; a super state together with its sub states, Ctrl+Z brings them back) |
| Add | **Add state**, **Add function**, **Add note**, in the color of the element they add |
| Layout | **Align** the selected elements, or give them the **same width** or **height** as the one selected first (menu, after a selection with a rectangle as the largest one), **Snap to the grid** on and off, **View** (menu: show the grid, i.e. the dots of the background, the minimap and the zoom buttons), **Show everything** (zooms and scrolls so that the whole chart is visible) |
| Output (right) | **Show code**, **Export chart** (JSON), **Export as image** (PNG), see [Import and export](#import-and-export) |
| Running (right) | **Pause** or **Start** the chart (like in the list of charts), **Live values** on and off, **Simulation** start and stop, see [Watching a running chart](#watching-a-running-chart) and [Simulation](#simulation) |

With **Snap to the grid** switched on, states, function blocks and notes snap to the dots of the background. The
browser remembers the setting, like those of the menu **View**.

## Transition labels

```
event[condition]{action}
```

All parts are optional and may span several lines.

| Part | Meaning | Example |
|---|---|---|
| `event` | Name of an input: the transition is only checked when this input changes | `motion` |
| `after(n, unit)` | Instead of an event: a temporal expression, see below | `after(30, sec)` |
| `[condition]` | JavaScript expression, the transition is only taken if it is true | `[temp > 21 && !window]` |
| `{action}` | JavaScript, executed when the transition is taken | `{count++; light = true;}` |

Example: `motion[motion && brightness < 50]{light = true;}` is checked when the input `motion` changes, and taken
if motion is detected and the variable `brightness` is below 50. Then it switches on the output `light`.

Without event, a transition is checked whenever any input changes. If a state has several outgoing
transitions, they are checked in the order of their **priority** (shown at the arrow).

**Branching** (if / else if / else) is done with several transitions from the same state with the same event and
different conditions. The first one by priority whose condition is true is taken, the last one without condition is
the "else":

```
motion[temp > 25]   → Cooling      priority 1
motion[temp < 18]   → Heating      priority 2
motion              → Ventilation  priority 3, "else"
```

In Stateflow, such branches are often drawn with a connective junction, a branching point on one arrow. The chart
behaves the same, only the event is written on each transition. Connective junctions are not supported, see
[Limitations](#limitations).

### Temporal logic

Instead of an event, a transition can have a temporal expression like in Stateflow. Time is measured from entering
the source state, in the units `msec`, `sec` and `min`:

| Expression | Valid | Example |
|---|---|---|
| `after(n, unit)` | from *n* units on. A timer wakes up the chart, then the condition is checked again on every following wakeup | `after(30, sec)[!motion]` |
| `before(n, unit)` | during the first *n* units, there is no timer | `before(5, sec)[button]` |
| `at(n, unit)` | exactly once: in the wakeup of its timer after *n* units, not later | `at(10, min)` |
| `every(n, unit)` | every *n* units, in the wakeup of its timer | `every(15, min){count++;}` |
| `after(n, unit, condition)` | as soon as the condition has been true for *n* units without interruption. A timer wakes up the chart exactly then | `after(5, min, !motion)` |
| `at("event", minutes)` | every day at an astro event, optionally shifted by minutes (negative: before), in the wakeup of its timer | `at("sunset", -30)` |
| `at("HH:mm")` | every day at this time | `at("22:30")[!window]` |

The same operators can count the wakeups by an input instead of the time, e.g. `after(3, button)` is valid on the
third and every further wakeup by `button` since entering the state, `at(3, button)` only on the third,
`every(2, button)` on every second one and `before(3, button)` on the first two. These transitions are only checked
on the wakeups by that input, the wakeup which entered the state does not count.

`at("sunset")` and `at("22:30")` are not measured from entering the state: while the state is active, they are valid
once a day at that time. Astro events: `sunrise`, `sunriseEnd`, `goldenHourEnd`, `solarNoon`, `goldenHour`,
`sunsetStart`, `sunset`, `dusk`, `nauticalDusk`, `night`, `nadir`, `nightEnd`, `nauticalDawn`, `dawn`, calculated
for the location of the ioBroker system settings. If an event does not happen on a day (polar regions), the
transition is not valid that day.

The condition of `after(n, unit, condition)` is checked on every wakeup, so it should depend on inputs and variables,
not on functions like `isTimeBetween()` which change without a wakeup. In conditions and actions, `elapsed(unit)` and
`duration(condition, unit)` give the times as numbers (see the helper functions). The counters and the times of
`after(n, unit, condition)` continue after a restart of the adapter.

## Where a variable is used

When you open a variable in the tab **Variables**, **Used in** (a click expands it) lists the states, transitions and function blocks
which use it, with the part (e.g. `entry`, condition, action) and whether the variable is read or written there. A
click on an entry selects the element and moves the view to it. Only real uses count: not the name in a text or
comment, and not a local variable of the same name declared in the code.

## When inputs wake up the chart

Every input has three settings in the tab **Variables**, under **Wake up options** (a click expands them, the button shows "customized" if one of them differs from the
default):

| Setting | Values | Default |
|---|---|---|
| **Wake up on** | every update / value changes only | every update |
| **Acknowledged (ack)** | any / confirmed values only (`ack=true`) / commands only (`ack=false`) | any |
| **Debounce (ms)** | the chart wakes up only after the input had no update for this time, with its last value | 0 (off) |

Updates filtered out by ack do not change the variable, so it e.g. only contains confirmed values.

## Actions

Actions and conditions are JavaScript. All variables of the chart can be used directly by their name,
plus `Math`, `Date`, `JSON` etc. and `log("text")` to write to the ioBroker log.

| Action | Executed |
|---|---|
| `entry` | when the state is entered |
| `during` | on every wakeup of the chart while the state is active and none of its outgoing transitions is taken |
| `exit` | when the state is left |

## Nested states

Drop a state into another state to make it a **sub state**, drag it out again to undo it. While dragging,
the state it would be moved into is highlighted. Every level has its own initial state (dot with arrow).

- Entering a super state also enters its initial sub state (or the sub state the transition points to).
  Leaving it leaves the active sub state first.
- On every wakeup, each active state is processed in this order, starting with the outermost one:
  1. transitions leaving the state, 2. its `during` action, 3. its **inner transitions**, 4. its active sub state.
  So the transitions of a super state have priority over those of its sub states.
- A transition from a state to one of its own sub states is an **inner transition** (dot at its start):
  the state stays active, only its active sub state is left, its own `entry`/`exit` are not executed.
  With the option **Leave and enter the parent state again**, it is left and entered again instead.

### History junction

With the option **Return to the last active sub state (history)** of a state with sub states, entering it returns to
the sub state which was active when it was left last, instead of its initial state. Like in Stateflow, the state
shows a circle with an **H**. Example: a state "Auto" with the sub states "Eco" and "Comfort", and a state "Manual".
After "Manual", the chart returns to "Comfort" if that was active before.

- The initial state is only used when the state is entered the first time, and after a start without the stored
  state (e.g. after `reset` or a changed chart).
- It applies to all transitions ending at the state, also its self transitions and those from its sub states.
  A transition to one of its sub states enters that sub state as usual.
- Only the direct sub state is remembered (shallow history): its own sub states are entered at their initial state,
  unless it has a history junction itself.
- The history is kept when the adapter restarts, like the active states.

## Parallel states

With the option **Sub states are parallel (AND)** of a state, all its sub states are active at the same time
instead of exactly one, e.g. "Heating" and "Window" in a state "Home". The option **Top level states are parallel
(AND)** of the chart does the same for the top level. Like in Stateflow, parallel states have a dashed border and
show their position in the execution order in the upper right corner. They have no initial state.

- Entering the parent enters all parallel states (each with its initial sub state), in their execution order.
  Leaving it leaves them in reverse order.
- On every wakeup, after the parent (its transitions and its `during` action), each parallel state is processed in
  its execution order, see above. A transition in one of them does not stop the others, so each of them can take a
  transition in the same wakeup. A transition which leaves the parent stops the processing of the remaining ones.
- The execution order is set in the properties of the parallel states: lower first, states without a number after
  the others.
- Transitions between parallel states, or between their sub states, are not possible: both are active anyway.
- `activeState` contains all active states, separated by commas, e.g. `Home.Heating.On, Home.Window.Closed`.

## Helper functions

In conditions, actions and function blocks:

| Function | Purpose |
|---|---|
| `log(message, level)` | writes to the ioBroker log, level `"debug"`, `"info"` (default), `"warn"` or `"error"` |
| `setState(id, value, ack)` | writes any ioBroker state, `ack` is `false` by default |
| `setStateDelayed(id, value, delayMs, ack)` | writes after a delay, cancelled when the chart stops |
| `sendTo(instance, command, message)` | sends a message to an adapter, e.g. `sendTo("telegram.0", "send", { text: "Window open" })` |
| `isTimeBetween("22:00", "06:00")` | true if the current time is in the range, also over midnight |
| `isDaytime()` | true between sunrise and sunset |
| `astroTime("sunset", offsetMinutes)` | time of an astro event today as `Date`: `sunrise`, `sunset`, `dawn`, `dusk`, `solarNoon`, ... |
| `hasChanged(variable)` | true if the variable has changed, see below |
| `hasChangedFrom(variable, value)` | true if the variable has changed and its previous value was `value` |
| `hasChangedTo(variable, value)` | true if the variable has changed to `value`, e.g. `hasChangedTo(button, true)` for a rising edge |
| `getState("id")` | reads any ioBroker state: `{ val, ack, ts, lc }`, `null` if it does not exist, e.g. `[getState("0_userdata.0.lux").val < 50]`. The ID must be written as text: the adapter reads these states when the chart starts and keeps them up to date. Unlike inputs, they do not wake up the chart |
| `elapsed(unit)` | time since the state was entered (in conditions of transitions: the source state), unit `sec` (default), `msec` or `min`, e.g. `[elapsed(min) > 10]` |
| `duration(condition, unit)` | time the condition has been true without interruption, measured on the wakeups, unit `sec` (default), `msec` or `min`. It does not wake up the chart, for that use `after(n, unit, condition)` |

`isDaytime()` and `astroTime()` use the location of the ioBroker system settings. States which should wake up the
chart when they change are added as inputs, `getState()` is for states which are only needed in a condition or an
action. Time based functions do not wake up the chart by themselves, they are evaluated when it wakes up, for a
time of day use `at("22:30")`.

**Change detection** works like in Stateflow: it compares the value of the variable at the start of the current
wakeup with its value at the start of the previous wakeup. Inputs, outputs and locals can be checked. An update
with the same value is no change, neither is a wakeup by another input or a timer, so `[hasChangedTo(button, true)]`
is only true once per press of the button. On the wakeup after the start nothing has changed yet. A change of a
local by an action is seen on the next wakeup, also in a super step. Objects and arrays are compared by their
contents.

## Function blocks

**Add function** creates a block for your own JavaScript. It is executed once when the chart starts,
all functions and constants declared in it can be used in every condition and action of the chart:

```js
const LIMIT = 22;

function tooWarm(temp) {
    return temp > LIMIT;
}
```

Transition label: `[tooWarm(temperature)]{heating = false;}`

## Comments and notes

- **Comment:** states, transitions, function blocks and the chart itself have a field **Comment** in their properties.
  A speech bubble on the canvas shows that there is a comment, the comment is shown as tooltip (on hover or tap).
- **Notes** (icon **Add note** in the toolbar) are free texts on the canvas, like sticky notes. Drop a note into a
  state, so it moves together with it.
- **Color:** states are light yellow, another color can be chosen under **Color** in their properties, e.g. to highlight
  states which belong together or error states. Every second level of nested states (sub states, their sub sub sub
  states and so on) is a bit darker, so it stands out from its parent. Function blocks always have a light gray
  background. In the dark theme, the colors are darkened.
- **Right-angled transitions:** with this option in the properties of the chart, the arrows consist of horizontal
  and vertical lines instead of curves. States side by side or one above the other are connected by a straight line,
  in the middle of the range where they overlap.

Comments, notes and colors have no influence on the execution. They are included in the generated code and in exported
files, and changing them does not prevent restoring the state after a restart.

## Disabling states and transitions

The option **Disabled** in the properties of a state or transition switches it off, like commenting it out in code.
It stays in the chart and can be switched on again at any time.

- A disabled **transition** is never taken.
- A disabled **state** is never entered. Its sub states and all transitions from and to it are disabled as well.
- Disabled states and transitions are shown light gray, and they are not checked, so they may contain unfinished
  code. **Show code** leaves them out and names them at the top.
- If the initial state of a level is disabled, the chart starts in the first enabled state of that level instead,
  and the check reports a warning.
- Disabling or enabling changes the logic: after saving, a running chart starts again in its initial state.

## Checking the chart

While you edit, the editor checks the chart. Errors are shown red, warnings orange, both at the state, transition,
function block or variable, with the message as tooltip of the icon (on hover or tap). Hints are only shown by a blue icon. When a
chart starts, the adapter writes errors and warnings to the log, hints only with the log level debug.

- **Code:** syntax errors, unknown variables and events, invalid temporal logic, writing an input (warning). They are
  also underlined in the code editors.
- **States of inputs and outputs** (warning): no state is selected, or the state does not exist in ioBroker, e.g.
  because of a typing error. Then the chart never wakes up by the input, or writes into nothing. The adapter also
  writes a warning to the log when the chart starts.
- **States which never become active** (warning): no transition leads to them, and they are not entered as initial
  state. Only the topmost one is reported, its sub states are never active either.
- **Transitions which are never taken** (warning): a transition before them (higher priority) is always valid, i.e. it
  has no condition (or one which is always true) and no temporal logic, and no event or the same event. Or one before
  them has the same event, temporal logic and condition. The transitions leaving a state are checked before its inner
  transitions, like when the chart runs.
- **Conditions which are never true** (warning, e.g. `[1 > 2]`) or always true (hint, e.g. `[true]`). Only conditions
  which do not depend on variables or functions are evaluated.
- **States which are never left** (hint): neither the state nor a state containing it has an outgoing transition. That
  is often intended, e.g. for a state "Error". States with a `during` action are not reported, they work as long as
  they are active.
- **Variables:** an output which is never written (warning), an input which is not used and only wakes up the chart
  (hint), a local variable which is not used or only written (hint).

The check cannot know which values the states will have. Whether a condition with variables ever becomes true is
shown by the [simulation](#simulation).

## Watching a running chart

While a chart runs, the editor shows what it does:

- The **active states** have a thick green border with a light green glow.
- **Live values** (panel at the top left of the canvas, switched on and off with the icon **Live values** in the
  toolbar, green while they are shown):
  the current values of all variables. They are also shown in the line of each variable in the tab **Variables**.
- A **transition lights up** for a moment when the chart takes it.
- **Paused chart:** the editor keeps showing the state at the moment it was paused, frozen: the states which were
  active have a gray border instead of a green one, and the live values are gray, titled with the time they are from.
  This helps to find out what happened, e.g. after the adapter stopped a chart because of an error. Starting the
  chart replaces them.
- The tab **History** lists the starts of the chart and the transitions taken, newest first: when, from which state
  to which, triggered by which input or by a timer (`after`), and which states were active afterwards. Click a
  transition to select it in the chart. The adapter keeps the last 200 events, also when the editor is closed and
  after a restart. **Clear history** removes them.

The live values and the history come from the running chart, so they refer to the saved chart, not to unsaved
changes in the editor.

## Simulation

The button with the flask in the toolbar starts a **simulation**: the chart runs as shown in the editor, including
unsaved changes, but nothing is switched in the house.

- The real chart is stopped while the simulation runs.
- The inputs start with their current values. Then they only change when you set them in the panel on the top left:
  booleans with a switch, other values in the text field with Enter (a number, `true`/`false`, or text). The flash
  next to an input wakes up the chart with its event, without changing its value. Real changes of the inputs are
  ignored.
- Outputs, `setState()`, `setStateDelayed()` and `sendTo()` are not executed. The history shows them as
  **Not executed: …**, the live values show the simulated values of the outputs. `getState()` reads the real
  states.
- Timers and the temporal logic run in real time, unless you advance the time (see below).
- The active states, the live values and the history work as for the real chart, the events of the simulation are
  marked in the history. The stored state of the real chart is not changed.
- **Stop simulation** ends it, then the real chart continues where it was before. The simulation also ends when the
  chart is saved, when the adapter restarts, when another chart is selected, and after two minutes if the editor was
  closed.

The bar at the top of the canvas shows the simulated time, the next timer and the state of the simulation:

- **Advance the time:** the fast forward button jumps to the next timer, e.g. to the end of `after(2, min)`, the
  buttons **+1 min**, **+10 min** and **+1 h** let time pass. The timers which are due meanwhile fire in their order,
  `every(...)` as often as it is due. Everything which depends on the time uses the simulated time: `elapsed()`,
  `isTimeBetween()`, `at("22:30")`, astro events and the times in the history.
- **Pause:** the following events (inputs set by hand, events, timers) wait instead of being processed. **Single
  step** processes the next waiting event, **Continue** processes all of them and runs on.
- **Breakpoints:** in the properties of a state or transition, **Breakpoint** stops the simulation when the state is
  entered or the transition is taken. It is shown as red dot and also works for the initial states right after the
  start. The simulation stops after the step in which the breakpoint was reached, the history shows where. With the
  super step option, it stops after the transition, the rest of the chain is the next step. Breakpoints are not
  stored in the chart, they are lost when the editor is reloaded.

## Import and export

- **Export chart** (icon in the toolbar of the editor) saves the chart as JSON file, including unsaved changes.
- **Export as image** (icon in the toolbar of the editor) saves the whole chart as PNG image, also the parts outside
  of the visible area, e.g. for a question in the forum. It looks like in the editor, without the selection, the
  minimap and the panels.
- **Export all charts** (icon above the chart list) saves all saved charts in one file.
- **Import charts** (icon above the chart list) adds the charts of such a file as new charts, existing charts are not
  changed. The file is checked before (structure, IDs, references between states and transitions).

Imported charts are **paused**: their variables may refer to states of another system. Check them in the tab
**Variables**, then start the chart with the button in the chart list.

## Former versions

When a chart is saved, the version before is kept, the last 10 of them. They are listed under **Former versions** in
the properties of the chart (click on an empty spot of the canvas), with the time they were replaced.
**Restore** loads a version into the editor as unsaved change: look at it, undo it with Ctrl+Z, or save it. Whether
the chart runs or is paused is not changed. The former versions are stored in the object of the chart, they are not
part of exported files.

## States created by the adapter

For every chart, the adapter creates below `statechart.<instance>.charts.<chart>`:

| State | Content |
|---|---|
| `activeState` | Name of the active state, nested states as `Parent.Child`, parallel states separated by commas. Empty while the chart is paused |
| `activeStateIds` | IDs of all active states as JSON. A paused chart keeps the last ones |
| `snapshot` | Stored state of the chart (active states, when they were entered, locals), see below |
| `values` | Current values of all variables as JSON. A paused chart keeps the last ones |
| `history` | The last 200 events (starts and transitions taken) as JSON. Writing it without ack clears it |
| `simulation` | `true` while the chart runs as simulation from the editor |
| `simulationStatus` | Status of the simulation as JSON: paused, time offset, waiting events, next timer, breakpoint |
| `error` | Last error or warning of the chart, e.g. `On/entry: boom` or `Stopped: …`, see [Errors in the code](#errors-in-the-code). Cleared when the chart starts, kept when it is stopped because of an error. Messages of `log()` are not shown here, nor problems of a simulation |

The chart itself is stored in the object `statechart.<instance>.charts.<chart>`.

### Controlling a chart from vis or scripts

Three states control a chart. They react on commands (written without ack), the adapter confirms them with ack:

| State | Write | Effect |
|---|---|---|
| `enabled` | `false` / `true` | Pauses the chart, or starts it in its initial state, like ▶ and ⏸ in the chart list or in the toolbar. The state always shows whether the chart runs, also when it is started or paused in the editor |
| `reset` | `true` | Starts a running chart again in its initial state, the entry actions of the initial states are executed. A paused chart stays paused |
| `event` | name of an input | Wakes up the chart with the event of this input, without changing its value: transitions like `button[...]` and counting expressions like `after(3, button)` react as if the input was updated. Other names are logged as warning |

Example for a script of the JavaScript adapter: `setState("statechart.0.charts.light.reset", true);`

## Restart of the adapter

After a restart of the adapter or of ioBroker, every chart continues in the states which were active
before, with its local variables. The entry actions are not executed again, and timers continue with
their remaining time. A timer which expired while the adapter was stopped is taken right after the start.
Like after every start, the chart then wakes up once, so changes of the inputs during the stop are
noticed.

The same applies after saving the chart in the editor, if only positions, sizes, comments, notes or colors
were changed. The chart starts in its initial state instead if its logic was changed (states, transitions,
variables, function blocks), after pausing it, and if the option **Restore the state after a restart** in
the chart properties is switched off. Variables declared in function blocks are not restored.

## Execution model and differences to other statechart tools

- The adapter uses [XState](https://stately.ai/docs/xstate) to execute the charts.
- Every change of an input wakes up the chart once, as well as an expiring `after(...)` and the start of the chart
  (also after restoring it). Transitions without event, e.g. without label, are checked on every wakeup, so they
  are taken right after the start if their condition is true.
- By default, only one transition is taken per wakeup, a following one waits for the next wakeup. With the
  chart option **Take transitions until none is valid (super step)**, the chart is checked again right after a
  transition, until no transition is valid anymore, like the super step semantics of Stateflow. The event of an
  input only counts for the first transition of a wakeup, during actions may run several times. To protect against
  loops, at most 100 transitions are taken per wakeup, then a warning is logged.
- `{action}` is executed while the transition is taken, i.e. after `exit` of the old and before `entry` of
  the new state. A separate condition action and `/action` are not supported (yet).
- Transitions are selected like in Stateflow (outer before inner, see above), XState only executes them.
  Pure XState would check the transitions of sub states first.
- Temporal logic is measured in real time, not in time steps: conditions are only checked when the chart wakes up.
  `after(n, unit, condition)` replaces the common Stateflow pattern `[duration(condition) > n]`, which would need a
  wakeup at the right time.
- Conditions and actions use JavaScript, not MATLAB/C syntax.

## Errors in the code

Conditions, actions and function blocks run in the adapter process, each chart in its own JavaScript context. All
charts share the process, so the adapter protects them from each other:

- **Exception:** it is logged as warning with the chart and the place, the rest of that condition or action is
  skipped. The chart continues.
- **Time limit:** every condition and action must finish within 1 second. A chart which exceeds it, e.g. because of
  an endless loop, is stopped right away and paused like with ⏸, the reason is logged as error. Fix it and start it
  again. A simulation ends instead.
- **Promises:** callbacks of promises (`.then()`, `async` functions) run right after the code which creates them,
  within its time limit. An exception in them is logged like any other, it does not restart the adapter.
- **Writes:** a chart may write at most 1000 times per minute (outputs, `setState()`, `setStateDelayed()`,
  `sendTo()`), far more than a chart needs. A chart which exceeds it, e.g. because of a feedback loop through its own
  inputs, is stopped like after exceeding the time limit.

The last error or warning of a chart is also written to its state `error`, e.g. to show it in vis or to get notified.

## Limitations

- Connective junctions (branching points of transitions) are not supported. Branches are drawn as several
  transitions with priorities instead, see [Transition labels](#transition-labels).
- Conditions and actions run in a separate JavaScript context with a time limit (see
  [Errors in the code](#errors-in-the-code)), but this is **no security sandbox**: everyone who may edit charts can execute any code in the adapter,
  just like with the JavaScript adapter.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.7.2 (2026-11-24)
* (IggePop) saving a chart in the editor without changing its logic, e.g. after moving states or editing comments, no longer restarts it in its initial state: it continues where it was, like after a restart of the adapter
* (IggePop) the points to drag a new transition from only appear over a state, while it is selected or while a transition is dragged, and they are larger, like the handles to resize

### 0.7.1 (2026-11-22)
* (IggePop) the adapter and its tab in the admin are called "Statechart" in all languages
* (IggePop) fixed: a state of the adapter which could not be written, e.g. while it stops, caused an unhandled rejection
* (IggePop) unused translations removed, a missing Polish translation added

### 0.7.0 (2026-11-21)
* (IggePop) four new templates: washing machine done, shutter with automatic and manual mode, push button with short, long and double press, presence
* (IggePop) a paused chart keeps showing its last active states and values in the editor, gray and with their time, to help with debugging. The states `activeStateIds` and `values` keep the last values when a chart is paused, `activeState` is still cleared
* (IggePop) menu "View" in the toolbar: show or hide the grid, the minimap and the zoom buttons
* (IggePop) Ctrl+S saves the chart, also while typing in a field or code editor
* (IggePop) larger fields for transition labels (5 lines) and the actions of states (3 lines)
* (IggePop) the name of the adapter in all languages without translation errors, documentation of branching with priorities

### 0.6.0 (2026-11-19)
* (IggePop) the details of a variable list where it is used (states, transitions, function blocks), a click shows the element
* (IggePop) the wake up options of an input are always collapsed at first, the button shows if they are customized
* (IggePop) a chart whose code does not finish within the time limit of 1 s (e.g. an endless loop) is stopped, so it cannot block the other charts again and again
* (IggePop) a chart which writes more than 1000 times per minute (e.g. a feedback loop) is stopped
* (IggePop) the explanation of the transition label shows conditions with variables and a complete example
* (IggePop) new state `charts.<id>.error` with the last error or warning of a chart, e.g. to show it in vis
* (IggePop) the longer explanations behind the ⓘ icons are split into paragraphs, so they are easier to read
* (IggePop) fixed: an exception in a promise of the code of a chart restarted the adapter, and an endless loop in a promise was not aborted
* (IggePop) fixed: with the modern themes of admin 8 (also with the automatic theme), the editor stayed light instead of following the theme of the admin

### 0.5.1 (2026-11-15)
* (IggePop) documentation updated: active states, tooltips on tap, start and pause in the toolbar, the new layout functions
* (IggePop) the types of ioBroker are a direct development dependency (finding W048 of the repository checker)

Older changes: CHANGELOG_OLD.md

## License
MIT License

Copyright (c) 2026 IggePop <mail@igge.org>

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