![Logo](admin/modbus.png)
# iobroker.modbus

![Number of Installations](http://iobroker.live/badges/modbus-installed.svg)
![Number of Installations](http://iobroker.live/badges/modbus-stable.svg)
[![NPM version](http://img.shields.io/npm/v/iobroker.modbus.svg)](https://www.npmjs.com/package/iobroker.modbus)

![Test and Release](https://github.com/ioBroker/iobroker.modbus/workflows/Test%20and%20Release/badge.svg)
[![Translation status](https://weblate.iobroker.net/widgets/adapters/-/modbus/svg-badge.svg)](https://weblate.iobroker.net/engage/adapters/?utm_source=widget)
[![Downloads](https://img.shields.io/npm/dm/iobroker.modbus.svg)](https://www.npmjs.com/package/iobroker.modbus)

**This adapter uses Sentry libraries to automatically report exceptions and code errors to the developers.** For more details and for information on how to disable the error reporting, see [Sentry-Plugin Documentation](https://github.com/ioBroker/plugin-sentry#plugin-sentry)! Sentry reporting is used starting with js-controller 3.0.

Implementation of ModBus Slave and Master for ioBroker. The following types are supported:
- Modbus RTU over serial (master)
- Modbus RTU over TCP (master)
- Modbus TCP (slave, master)
- Modbus TCP with SSL/TLS (master)

## SSL/TLS Support
For secure connections to devices that require SSL/TLS encryption (such as the Kostal KSEM Smart Energy Meter on port 802), you can select "TCP with SSL/TLS" as the connection type. This provides the following configuration options:

- **SSL Certificate file path**: Path to your SSL certificate file in PEM format
- **SSL Private key file path**: Path to your SSL private key file in PEM format  
- **SSL CA Certificate file path**: Path to CA certificate file in PEM format (optional)
- **Reject unauthorized certificates**: Uncheck to allow self-signed certificates

Note: Certificate files must be accessible by the ioBroker process and in PEM format.

## Settings
### Partner IP Address
IP address of modbus partner.

### Port
TCP Port of modbus partner if configured as master (client) or own port if configured as slave(server).

### Device ID
Modbus Device ID. Important if TCP/Modbus bridge is used.

### Type
Slave (Server) or Master (Client).

### Select device by (serial)
For serial connections you can choose how the device is addressed:
- **Serial port**: pick a fixed port path (e.g. `COM3` or `/dev/ttyUSB0`).
- **USB device ID**: pick the device by its stable USB identifier (vendor ID / product ID / serial number). The actual port is resolved at start, so the connection keeps working even if the operating system assigns a different port name (e.g. after a reboot or replugging).

### Use aliases as address
Normally, all registers can have address from 0 to 65535. By using of aliases, you can define virtual address fields for every type of registers. Normally:
- discrete inputs are from 10001 to 20000
- coils are from 1 to 1000
- input registers are from 30001 to 40000
- holding registers are from 40001 to 60000

Every alias will be mapped internally to address, e.g., 30011 will be mapped to input register 10. and so on.

### Direct addresses
Used for binary inputs and coils.
Without this flag the bits will be addressed from like: `0 => 15, 1 => 14, 2 => 13, ..., 15 => 0`.
With this flag activated the bits will be addressed as: `0 => 0, 1 => 1, 2 => 2, ..., 15 => 15`.

### Do not align addresses to 16 bits (word)
Normally, the coils and the discrete inputs addresses are aligned to 16 bits.
Like addresses from 3 to 20 will be aligned to 0 up 32.
If this option is active, the addresses will not be aligned.

### Do not use multiple registers
If a slave does not support the "write multiple registers" command, you can activate it to get warnings when the multiple registers will be written.

### Use only multiple write registers
If a slave only supports the "write multiple registers" command, you can activate so the registers will be written always with FC15/FC16 command.

### Round Real to
How many digits after comma for float and doubles.

### Data polling interval
Cyclic poll interval (Only relevant for master)

### Reconnect delay
Reconnection interval (Only relevant for master)

### Read timeout
Timeout for read requests in milliseconds. If no response is received from a slave at this time, the connection will be terminated.

### Pulse time
If pulse is used for coils, this defines the interval in milliseconds how long is the pulse.

### Wait time
Wait time between polling of two different device IDs in milliseconds.

### Max read request length
Maximal length of command READ_MULTIPLE_REGISTERS as the number of registers to read.

Some systems require first "write request" to deliver the data on "read request".
You can force this mode by setting of the "Max read request length" to 1.

**Notice:**
Some USB Modbus solutions (e.g. based on `socat`) can have trouble to work with `serialport` npm module.

There is a software [**Modbus RTU <-> Modbus RTU over TCP**](http://mbus.sourceforge.net/index.html) gateway to enable using of serial RTU over TCP protocol.

Both solutions **RTU over TCP** and **TCP** work well.

### Read interval
Delay between two read requests in milliseconds. Default 0.

### Write interval
Delay between two write requests in milliseconds. Default 0.

### Update unchanged states
Normally, if the value has not changed, it will not be written into ioBroker.
This flag allows updating the value's timestamp by every cycle.

### Value Sanitization
Enable automatic sanitization of invalid register values (NaN, Infinity, extreme float values like ±3.4e38).
This feature helps prevent corrupted Modbus float values from propagating into ioBroker states, which is especially useful for devices like SolarEdge inverters that occasionally return invalid values due to timeouts or internal scaling errors.

When enabled, you can configure per-register sanitization options:
- **Sanitize**: Enable sanitization for this specific register
- **Sanitize Action**: Choose how to handle invalid values
  - *Keep Last Valid*: Keeps the last known valid value when an invalid value is detected
  - *Replace with 0*: Replaces invalid values with 0
- **Min Valid Value**: Optional minimum valid value threshold
- **Max Valid Value**: Optional maximum valid value threshold

Invalid values detected:
- `NaN` (Not a Number)
- `Infinity` or `-Infinity`
- Extreme float values (≥3.4e38 or ≤-3.4e38) - typical Modbus error values
- Values outside the configured min/max range

### Do not include addresses in ID
Do not add address in the generated ioBroker iD. `10_Input10` vs `_Input10`.

### Preserve dots in ID
With this flag the Name will be `Inputs.Input10`. Without => `Inputs_Input10`.

## Parameters for a single address line in config
### Address
Modbus address to read.

### Slave ID
In case there are multiple slaves, then this is the ID if not the default one that is given in global config.

### Name
This is the name for the Parameter.

### Description
Parameter description.

### Unit
Unit of the Parameter.

### Type
Datatype to read from Bus. For details about the possible data types, see the section Data types.

### Length
Length of parameter. For most parameters, this is determined based on the data type, but for Strings this defines the length in Bytes / characters.

### Factor
This factor is used to multiply the read value from Bus for static scaling. So the calculation looks like following `val = x * Factor + Offset`.

### Offset
This offset is added to the read value after the above multiplication. So the calculation looks like following `val = x * Factor + Offset`.

### Formula
This field can be used for advanced calculations if Factor and Offset are not enough. **If this field is set, then the Factor and Offset fields are ignored.**
The Formula is executed by the eval() function. Therefore, all common functions are supported. Especially the Math functions. The formula must comply with JavaScript syntax, therefore, also take care about upper and lower cases.

In the formula, "x" has to be used for the read value from Modbus. E.g. `x * Math.pow(10, sf['40065'])`

Using the "sf" array (see above example), you can access other read modbus values if they are flagged as "Scale Factor" in the config (see below info on "SF" flag).

If the formula cannot be evaluated during runtime, then the Adapter writes a warning message to the log.

Another use case for formulas could also be to prevent implausible data with a formula like `x > 2000000 ? null : x`

### Role
ioBroker role to assign.

### Room
ioBroker room to assign.

### Poll
If activated, the values are polled in a predefined interval from a slave.

### WP
Write pulse

### CW
Cyclically write

### SF
Use value as a scaling factor.
This is necessary to be used by dynamic scaling factors which are on some systems provided through values on interface.
If a value is marked with this flag, then the value will be stored into a variable with the following naming convention: `sf['Modbus_address']`.
This variable can be then later used in any formula for other parameters. E.g., the following formula can set: `(x * sf['40065']) + 50;`

### Sanitize (Expert Mode)
Enable value sanitization for this register. Only available when "Value Sanitization" is enabled globally in the adapter settings.

### Sanitize Action (Expert Mode)
Choose the action to take when an invalid value is detected:
- **Keep Last Valid**: Retains the last known valid value
- **Replace with 0**: Replaces the invalid value with 0

### Min Valid / Max Valid (Expert Mode)
Optional minimum and maximum value thresholds for range validation. Values outside this range will be treated as invalid and sanitized according to the Sanitize Action.

## Data types
- `uint16be`  - `Unsigned 16 bit (Big Endian): AABB => AABB`
- `uint16le`  - `Unsigned 16 bit (Little Endian): AABB => BBAA`
- `int16be`   - `Signed 16 bit (Big Endian): AABB => AABB`
- `int16le`   - `Signed 16 bit (Little Endian): AABB => BBAA`
- `uint32be`  - `Unsigned 32 bit (Big Endian): AABBCCDD => AABBCCDD`
- `uint32le`  - `Unsigned 32 bit (Little Endian): AABBCCDD => DDCCBBAA`
- `uint32sw`  - `Unsigned 32 bit (Big Endian Word Swap): AABBCCDD => CCDDAABB`
- `uint32sb`  - `Unsigned 32 bit (Big Endian Byte Swap): AABBCCDD => DDCCBBAA`
- `int32be`   - `Signed 32 bit (Big Endian): AABBCCDD => AABBCCDD`
- `int32le`   - `Signed 32 bit (Little Endian): ABBCCDD => DDCCBBAA`
- `int32sw`   - `Signed 32 bit (Big Endian Word Swap): AABBCCDD => CCDDAABB`
- `int32sb`   - `Signed 32 bit (Big Endian Byte Swap): AABBCCDD => DDCCBBAA`
- `uint64be`  - `Unsigned 64 bit (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `uint64le`  - `Unsigned 64 bit (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `uint8be`   - `Unsigned 8 bit (Big Endian): AABB => BB`
- `uint8le`   - `Unsigned 8 bit (Little Endian): AABB => AA`
- `int8be`    - `Signed 8 bit (Big Endian): AABB => BB`
- `int8le`    - `Signed 8 bit (Little Endian): AABB => AA`
- `floatbe`   - `Float (Big Endian): AABBCCDD => AABBCCDD`
- `floatle`   - `Float (Little Endian): AABBCCDD => DDCCBBAA`
- `floatsw`   - `Float (Big Endian Word Swap): AABBCCDD => CCDDAABB`
- `floatsb`   - `Float (Big Endian Byte Swap): AABBCCDD => DDCCBBAA`
- `doublebe`  - `Double (Big Endian): AABBCCDDEEFFGGHH => AABBCCDDEEFFGGHH`
- `doublele`  - `Double (Little Endian): AABBCCDDEEFFGGHH => HHGGFFEEDDCCBBAA`
- `string`    - `String 8 bit (Zero-end): ABCDEF\0 => ABCDEF\0`
- `stringle`  - `String 8 bit (Little Endian, Zero-end): ABCDEF\0 => BADCFE\0`
- `string16`  - `String 16 bit (Zero-end): \0A\0B\0C\0D\0E\0F\0\0 => ABCDEF\0`
- `string16le`- `String 16 bit (Little Endian, Zero-end): A\0B\0C\0D\0E\0F\0\0\0 => ABCDEF\0`
- `rawhex`    - `String with value in hex representation AABBCCDD.... => AABBCCDD....`

The following description was copied from [here](http://www.chipkin.com/how-real-floating-point-and-32-bit-data-is-encoded-in-modbus-rtu-messages/)

The point-to-point Modbus protocol is a popular choice for RTU communications if for no other reason than its basic convenience. The protocol itself controls the interactions of each device on a Modbus network, how the device establishes a known address, how each device recognizes its messages and how basic information is extracted from the data. In essence, the protocol is the foundation of the entire Modbus network.

Such a convenience does not come without any complications, however, and Modbus RTU Message protocol is no exception.
The protocol itself was designed based on devices with a 16-bit register length.
Consequently, special considerations were required when implementing 32-bit data elements.
This implementation settled on using two consecutive 16-bit registers to represent 32 bits of data or essentially 4 bytes of data.
It is within these four bytes of data that single-precision floating point data can be encoded into a Modbus RTU message.

### The Importance of Byte Order
Modbus itself does not define a floating point data type, but it is widely accepted that it implements 32-bit floating point data using the IEEE-754 standard.
However, the IEEE standard has no clear definition of the byte order of the data payload.
Therefore, the most important consideration when dealing with 32-bit data is that data is addressed in the proper order.

For example, the number 123/456.00 as defined in the IEEE 754 standard for single-precision 32-bit floating point numbers appears as follows:

![Image1](img/img1.png)

The effects of various byte orderings are significant. For example, ordering the 4 bytes of data that represent 123456.00 in a `B A D C` sequence in known as a “byte swap”. When interpreted as an IEEE 744 floating point data type, the result is quite different:

![Image2](img/img2.png)

Ordering the same bytes in a “C D A B” sequence is known as a “word swap”. Again, the results differ drastically from the original value of 123456.00:

![Image3](img/img3.png)

Furthermore, both a `byte swap` and a `word swap` would essentially reverse the sequence of the bytes altogether to produce yet another result:

![Image4](img/img4.png)

Clearly, when using network protocols such as Modbus, strict attention must be paid to how bytes of memory are ordered when they are transmitted, also known as the ‘byte order’.

### Determining Byte Order
The Modbus protocol itself is declared as a ‘big-Endian’ protocol, as per the Modbus Application Protocol Specification, V1.1.b:

**Modbus uses a “big-Endian” representation for addresses and data items. 
This means that when a numerical quantity larger than a single byte is transmitted, the most significant byte is sent first.**

Big-Endian is the most commonly used format for network protocols – so common, in fact, that it is also referred to as ‘network order’.

Given that the Modbus RTU message protocol is big-Endian, in order to successfully exchange a 32-bit datatype via a Modbus RTU message, the endianness of both the master and the slave must be considered. Many RTU master and slave devices allow specific selection of byte order, particularly in the case of software-simulated units. It only has to be ensured that both units are set to the same byte order.

As a rule of thumb, the family of a device’s microprocessor determines its endianness. Typically, the big-Endian style (the high-order byte is stored first, followed by the low-order byte) is generally found in CPUs designed with a Motorola processor. The little-Endian style (the low-order byte is stored first, followed by the high-order byte) is generally found in CPUs using the Intel architecture. It is a matter of personal perspective as to which style is considered ‘backwards’.

If, however, byte order and endianness are not a configurable option, you will have to determine how to interpret the byte. This can be done by requesting a known floating-point value from the slave. If an impossible value is returned, i.e., a number with a double-digit exponent or such, the byte ordering will most likely need modification.

### Practical Help
The FieldServer Modbus RTU drivers offer several function moves that handle 32-bit integers and 32-bit float values. More importantly, these function moves consider all different forms of byte sequencing. The following table shows the FieldServer function moves that copy two adjacent 16-bit registers to a 32-bit integer value.

| Function Keyword  | Swap Mode          | Source Bytes    | Target Bytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.i32       | N/A                | [ a b ] [ c d ] | [ a b c d ]  |
| 2.i16-1.i32-s     | byte and word swap | [ a b ] [ c d ] | [ d c b a ]  |
| 2.i16-1.i32-sb    | byte swap          | [ a b ] [ c d ] | [ b a d c ]  |
| 2.i16-1.i32-sw    | word swap          | [ a b ] [ c d ] | [ c d a b ]  |

The following table shows the FieldServer function moves that copy two adjacent 16-bit registers to a 32-bit floating point value:

| Function Keyword  | Swap Mode          | Source Bytes    | Target Bytes |
|-------------------|--------------------|-----------------|--------------|
| 2.i16-1.ifloat    | N/A                | [ a b ] [ c d ] | [ a b c d ]  |
| 2.i16-1.ifloat-s  | byte and word swap | [ a b ] [ c d ] | [ d c b a ]  |
| 2.i16-1.ifloat-sb | byte swap          | [ a b ] [ c d ] | [ b a d c ]  |
| 2.i16-1.ifloat-sw | word swap          | [ a b ] [ c d ] | [ c d a b ]  |

The following table shows the FieldServer function moves that copy a single 32-bit floating point value to two adjacent 16-bit registers:

| Function Keyword | Swap Mode          | Source Bytes    | Target Bytes   |
|------------------|--------------------|-----------------|----------------|
| 1.float-2.i16    | N/A                | [ a b ] [ c d ] | [ a b ][ c d ] |
| 1.float-2.i16-s  | byte and word swap | [ a b ] [ c d ] | [ d c ][ b a ] |
| 1.float-2.i16-sb | byte swap          | [ a b ] [ c d ] | [ b a ][ d c ] |
| 1.float-2.i16-sw | word swap          | [ a b ] [ c d ] | [ c d ][ a b ] |

Given the various FieldServer function moves, the correct handling of 32-bit data is dependent on choosing the proper one. Observe the following behavior of these FieldServer function moves on the known single-precision decimal float value of 123456.00:

| 16-bit Values | Function Move    | Result    | Function Move    | Result        |
|---------------|------------------|-----------|------------------|---------------|
| 0x2000 0x47F1 | 2.i16-1.float    | 123456.00 | 1.float-2.i16    | 0x2000 0x47F1 |
| 0xF147 0x0020 | 2.i16-1.float-s  | 123456.00 | 1.float-2.i16-s  | 0xF147 0X0020 |
| 0x0020 0xF147 | 2.i16-1.float-sb | 123456.00 | 1.float-2.i16-sb | 0x0020 0xF147 |
| 0x47F1 0x2000 | 2.i16-1.float-sw | 123456.00 | 1.float-2.i16-sw | 0x47F1 0x2000 |

Notice that different byte and word orderings require the use of the appropriate FieldServer function move. Once the proper function move is selected, the data can be converted in both directions.

Of the many hex-to-floating point converters and calculators that are available on the Internet,
very few actually allow manipulation of the byte and word orders.
One such utility is located at www.61131.com/download.htm where both Linux and Windows versions of the utilities can be downloaded.
Once installed, the utility is run as an executable with a single dialog interface.
The utility presents the decimal float value of 123456.00 as follows:

![Image5](img/img5.png)

One can then swap bytes and/or words to analyze what potential endianness issues may exist between Modbus RTU master and slave devices.

## Export / Import of registers
With export / import functionality, you can convert all register data (only of one type) to a TSV (Tab-separated values) file and back to easily copy data from one device to another or to edit register in Excel.

You can share your schemas with other users in [modbus-templates,](https://github.com/ioBroker/modbus-templates) or you can find some register schemas there.

## Test
There are some programs in folder `test` to test the TCP communication:
- Ananas32/64 is a slave simulator (only holding registers and inputs, no coils and digital inputs)
- RMMS is a master simulator
- mod_RSsim.exe is a slave simulator. It can be that you need [Microsoft Visual C++ 2008 SP1 Redistributable Package](https://www.microsoft.com/en-us/download/details.aspx?id=5582) to start it (because of a Side-By-Side error).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- (@GermanBluefox) Fixed repeated `Can not set value: The value of "offset" is out of range` errors when a device answers a combined read block with fewer registers than requested (issue #502, via `@iobroker/modbus`): the short response is now reported with a single clear warning and the values that were returned are still stored. Workaround without the update: set "Max address gap to combine" to 0
- (@GermanBluefox) Added Modbus/UDP support as a master (issue #222): select "UDP (Master)" as the connection type. Requires `@iobroker/modbus` >= 7.6.0
- (@GermanBluefox) The register table export/import dialog can now use CSV (`;`-separated, quoted) or JSON in addition to TSV, and the data can be saved to / loaded from a file (issue #249): pick the format in the dialog to mass-edit the data points in Excel or a text editor. Empty columns (e.g. an unused "name") are preserved, so a round-trip export→edit→import no longer breaks the format
- (@GermanBluefox) Register tables with many data points are now much faster to edit (issue #249): rows are virtualized (only the visible ones are rendered), and a new "freeze order" toolbar button keeps rows from re-sorting/jumping while you type
- (@GermanBluefox) When "Multi device IDs" is enabled, register tables can be shown as a tree grouped by slave/device ID with collapsible sections (issue #249): toggle it with the new "Group by device ID" toolbar button

### 8.3.0 (2026-07-03)
- (@GermanBluefox) Added a "Max address gap to combine" setting (issue #581): controls how large an address gap may be bridged when combining registers into one read request. Set it to 0 to read only contiguous configured registers, so devices that reject a non-existent register in a gap no longer fail the whole read (requires `@iobroker/modbus` >= 7.5.1)
- (@GermanBluefox) Added per-device timeout and wait time (issue #605): when "Multi device IDs" is enabled, the Connection tab shows a table of all device IDs used in the register tables, each with its own timeout and wait time (blank = global value)
- (@GermanBluefox) Added a proxy mode (issue #775): a master can additionally serve its polled data as a Modbus TCP slave. Enable it in the Connection tab (requires `@iobroker/modbus` >= 7.5.1)
- (@GermanBluefox) Fixed the TCP/SSL master not recovering after a communication loss (issue #594, via `@iobroker/modbus`): the receive buffer is now cleared and the socket recreated on every reconnect, so a frame cut off by the disconnect can no longer desync the parser and permanently break polling until an adapter restart
- (@GermanBluefox) Fixed cyclic write of non-polled holding registers in immediate-write mode `maxBlock < 2` (follow-up to issue #771, via `@iobroker/modbus`)
- (@GermanBluefox) Updated the `@iobroker/modbus` package: fixed `Put.floatle()` to write a valid IEEE-754 little-endian float and to stop dropping data written after it

### 8.2.2 (2026-07-01)
- (@johannes-lode) Fixed FC1 coil reads returning stale data: the slave now refreshes the coil buffer before responding (event name matched the listener)
- (@johannes-lode) Fixed the TCP slave crashing on server listen errors (e.g. address already in use or privileged port without permission); such errors are now logged instead
- (@johannes-lode) Fixed coil/discrete-input reads being written to the wrong buffer bit for start addresses other than 0
- (@johannes-lode) Fixed the coil/discrete-input buffer size when the highest address is a multiple of 8 (`ceil(addressHigh / 8)`)

### 8.2.1 (2026-06-27)
- (@GermanBluefox) Allowed the selection of port by USB path

### 8.2.0 (2026-05-29)
- (@GermanBluefox) Added selection of the serial device by its stable USB ID (vendor/product/serial), so the connection keeps working even if the OS reassigns the port name

### 8.1.3 (2026-04-13)
- (@GermanBluefox) Corrected room definition for the first register

[Older changelogs can be found there](CHANGELOG_OLD.md)

## License
The MIT License (MIT)

Copyright (c) 2015-2026 Bluefox <dogafox@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
