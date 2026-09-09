---
chapters: {"pages":{"en/adapterref/iobroker.pid/README.md":{"title":{"en":"ioBroker.pid"},"content":"en/adapterref/iobroker.pid/README.md"},"en/adapterref/iobroker.pid/docs/en/pid_en.md":{"title":{"en":"PID Adapter Information"},"content":"en/adapterref/iobroker.pid/docs/en/pid_en.md"}}}
---
# PID Adapter Information

## General information

This adapter provides one or more configurable pid controllers per instance.

The general functionality of a pid controller is documented i.e. at wikipedia (https://en.wikipedia.org/wiki/PID_controller). In short a pid controller computes an output value depending on the input value and three parameters:

-   proportional component
-   integral component
-   deriative component

This ioBroker adapter allows the configuration of the pid controller by specifying several parameters listed [here](#controller-configuration) . The output value is calculated in regular intervalls specified as cylce time. In addition the calulation can be suspended and internal values can be reset on demand.

As an convinient feature the output value can be set to a specified value when operating in manual mode.

States used for input and set by controller output are listed in section [Description of States](#description-of-states)

## Configuration

### TAB Configuration

This tab allows to specifiy one or more controller instances operanting independently.

<p align=center><img src="img/pid_tab_controllers.jpg" width="600" /></p>

#### Configurationmode Selection

You may speciify the following parameters:

- configuration mode <br>
  The field `configuration mode`allows to select whether Kp/Tn/Tv mode or Xp/tn/Tv mode is desired. Right to the selection you will see the formula used for calculation depending on the seletcion.

- ignore setpoint for derivate <br>
  If this field is selected the difference value for the derivative term is calculated based on the actual value only, otherwise the setpoint value is taken into account too.

#### Controller Configuration

This table allows to configure a list of controllers

<!-- prettier-ignore-start -->
| Parameter          | Type    | Description                             | Comment                                                   |
| ------------------ | ------- | --------------------------------------- | --------------------------------------------------------- |
| Enabled            | boolean | if marked, controller will be used      | can be used to disable a controller temporary             |
| Autostart          | boolean | if marked, controller will started whenever the adapter is started      | The controller can be stopped and started using `hold` state in any case |
| Use States for Config | boolean | if marked, parameters will be controlled by states | This flag will disable parameter fields when selected |
| Controller-Id      | text    | Controller-Id identifying a controller  | This id must be unique among all controllers but can be selected by user |
| Kp or Xp           | number  | proportional term of controller         | specification of some decimal part is possible            |
| Tn                 | number  | integral term of controller             | specification of some decimal part is possible            |
| Tv                 | number  | deriative term of controller            | specification of some decimal part is possible            |
| Min Out            | number  | minimum output value                    |                                                           |
| Max Out            | number  | maximum output value                    |                                                           |
| Offset             | number  | offset added to output value            |                                                           |
| Hysteresis         | number  | hysteresis value                        | Output will not change as long as difference is smaller than hysteresis |
| Invert             | boolean | invert the output value                 |                                                           |
| Cycle time (ss)    | integer | Cycle time in ms                        | specifies the cycle time for recurrent calulations. The cicle time is limitied to 100 - 3600000ms. |
<!-- prettier-ignore-end -->

### TAB General Options

Here you specify some general options

<p align=center><img src="img/pid_tab_options.jpg" width="600" /></p>

-   log calculation <br>
    Setting this option activates logging of data calculated during regular recomputaions.

-   disable folders for states <br>
    Normally states are structured using folders. If a flat structure is prefered activating this option disables all folders. Please note that changing this option will delete all existing states. This might have sideeffects i.e. related to history recording. Thus a warning must be confirmed before this option can be changed. 

## Details of Functionality

### Description of States

Every adapter instance creates a set of states per configured controller. The following table describes the contents of those states and wether they are read-only (RO) or writeable by users (RW).

<!-- prettier-ignore-start -->
| Folder      | State       | Type    | RW/RO | Description                                                                                 |
| ----------- | ----------- | ------- | ----- | ------------------------------------------------------------------------------------------- |
| cfg         | cycle       | number  | RO    | cycle time in ms as configured at config (*)                                                |
| cfg         | dao         | boolean | RO    | true indicates that deriavative uses act input only                                         |
| cfg         | inv         | boolean | RO    | true indicates that output is inverted                                                      |
| cfg         | useXp       | boolean | RO    | true indicates that Xp/Tn/Tv mode is used                                                   |
|             |             |         |       |                                                                                             |
| in          | act         | number  | RW    | actual value as input to controller                                                         |
| in          | hold        | boolean | RW    | flag to hold processing                                                                     |
| in          | man         | boolean | RW    | flag to enable manual mode; true enables manual mode                                        |
| in          | man_inp     | number  | RW    | manual input value output to 'y' if 'man' is set to true                                    |
| in          | rst         | boolean | RW    | trigger to initialize a reset of controller (writing true resets controller)                |
| in          | set         | number  | RW    | setpoint value as input to controller                                                       |
|             |             |         |       |                                                                                             |
| out         | diff        | number  | RO    | difference between actual value ('act') and setpoint ('set') at last cycle                  |
| out         | lim         | boolean | RO    | indicator set to true if controller output hit limits at last cycle                         |
| out         | supr        | boolean | RO    | indicator set to true if controller ignored input due to supr (hysteresis) limit            |
| out         | y           | number  | RO    | output value of controller to be used as feedback to system                                 |
|             |             |         |       |                                                                                             |
| para        | kp          | number  | RW    | Proportional factor configured at config (*)                                                |
| para        | max         | number  | RW    | Maximum value for output or null as factor configured at config (*)                         |
| para        | min         | number  | RW    | Minimum value for output or null as factor configured at config (*)                         |
| para        | off         | number  | RW    | statis coffset value to be added to output ('y')                                            |
| para        | sup         | number  | RW    | suppress / hysteresis value                                                                 |
| para        | tn          | number  | RW    | integral term configured at config (*)                                                      |
| para        | tv          | number  | RW    | deriative term configured at config (*)                                                     |
| para        | xp          | number  | RW    | Proportional factor configured at config (*)                                                |
|             |             |         |       |                                                                                             |
| xtra        | i_differr   | number  | RO    | internal difference used for calulation of D term at last cycle                             |
| xtra        | i_sumerr    | number  | RO    | internal accumulated error used for calulation of P term at last cycle                      |
| xtra        | last_delta  | number  | RO    | time between last cylces (ms)                                                               |
| xtra        | last_upd    | number  | RO    | timestamp (ms since epoch) of last iupdate cycle                                            |
| xtra        | run         | boolean | RO    | set to true if controller is running. Setting 'run' to flase will suspend calcultaions      |
|             |             |         |       |                                                                                             |
<!-- prettier-ignore-end -->

### Hysteresis Handling and Update of Output

The adapter evaluates every input written to state 'act' and calclutaes the difference to 'set'. If the difference is smaller than the hysteresis value no recalculation is performed. This reduces small changes to output if 'act' only changes a little bit.

If the adapter control state 'hold' is set to true, no new calculation is performed. The output is frozen ('on-hold') while 'hold' is set to true.

If a non zero cycle time is configured (and 'hold' is false) the adapter performs a recalculation every x ms specified by 'cycle'. The result of the calulation is written to the appropiate states. You can check the internal values too.