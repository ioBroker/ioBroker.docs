# ioBroker Schema
## IDs
ID is a string with a maximum length of 240 bytes.
It is hierarchically structured, the levels separated by dots.

The ID has different levels. Each level is determined by dot. Example: `system.adapter.admin.0`
- `system` - is namespace for system objects
- `adapter` - namespace for adapter configs
- `admin` - adapter name
- `0` - adapter instance

Or other example `hm-rpc.1.ABC110022.2.VALUE`:
- `hm-rpc` - is name of adapter
- `1` - adapter instance
- `ABC110022` - device address
- `2` - channel name
- `VALUE` - state name

Following characters are prohibited to use in IDs: `[]*,;'"&#96;<>\\?`.

It is not suggested to use `^$()/` too.