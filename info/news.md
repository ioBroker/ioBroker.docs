# How to add messages

## Adding messages
New news-messages must be added to the file `news.json` located at https://github.com/ioBroker/ioBroker.docs/blob/master/info/news.json. After testing the modified file, 
create a PR for the news to be published.

## Required infos 
- `title` - *required* Object in different languages (can be automatically translated from English with Gulp)
- `content` - *required* Object in different languages (can be automatically translated from English with Gulp)
- `id` - *required* If there are two identical IDs, ONLY the first message is displayed where the conditions apply.
- `created` - *required* Creation date in the format 2019-01-01T00:00:00.000Z

## Display options
- `class` - (default: info) Value can be info (blue), success (green), warning (yellow) and danger (red)

**Nice to know** -`icon` and `fa-icon` were removed. Pleas use `img`.

## Conditions
- `date-start` - When should the message be displayed (in format 2019-01-01T00:00:00.000Z)
- `date-end` - When should the message no longer be displayed (in format 2019-01-01T00:00:00.000Z)
- `node-version` - Can be used with `bigger(x.x.x)`, `smaller(x.x.x)`, `equals(x.x.x)` or `between(x.x.x,y.y.y)` to check the installed node version (since Info 1.5.1, Admin 3.6.7)
- `objects-db-type` - Array of objects dbs for which this condition will be true, e.g. `['jsonl', 'file']`
- `number-of-objects` - Number of objects in the database to match this condition, e.g. `>=15000`
- `npm-version` - Can be used with bigger(x.x.x), smaller(x.x.x), equals(x.x.x) or between(x.x.x,y.y.y) to check the installed npm version (since Info 1.5.5, Admin 3.6.12)
- `os` - Can be `aix`, `darwin`, `freebsd`, `linux`, `openbsd`, `sunos`, `win32` and `android` (since Info 1.5.5, Admin 3.6.10)
- `repo` - Can be `latest` or `default` (since Info 1.5.6, Admin 3.6.12)
- `uuid` - Sentry can help individual users with problems. For this it is now possible to enter the UUID as a condition. This can either be specified as a string, for example: "uuid": "6778667jkhhh7678zh" or as an array, for example: "uuid": ["jbiuh877h8g80ghoo", "huzhz87g887"]. The UUID is entered as hash sha256. Enter the following before the ID: "iobroker-uuid", followed directly by the ID. For hashing, e.g. this page can be used http://www.sha1-online.com/ (since Info 1.7.6, Admin 4.1.4) 
- `conditions` - Object in format (`"adapter": "condition"`) -> All conditions are linked with "and"
  - `installed` - Adapter is installed (example: `"iot": "installed"`)
  - `!installed` - Adapter is not installed (example: `"cloud": "!installed"`)
  - `active` - Instance of adapter is active (since Info 1.7.1, Admin x.x.x)
  . `!active` - Adapter is installed, but there is no active instance of it (since Info 1.7.1, Admin x.x.x)
  - `bigger(x.x.x)` - Adapter version is bigger than (example: `"admin": "bigger(2.2.2)"`)
  - `smaller(x.x.x)` - Adapter version is smaller than (example: `"fronius": "smaller(1.2.2)"`)
  - `equals(x.x.x)` - Adapter has exactly the same version (example: `"cloud": "equals(0.2.2)"`)
  - `between(x.x.x,y.y.y)` - The version of the adapter is between x and y or equal to x or y (example: `"tankerkoenig": "between(1.0.5,2.0.4)"`)
  - `or` - if at least one condition is true, the message will be shown (example: `"or": "true"`) (since Admin 7.4.3)

**Important!!** New filter options should always be used with the following condition: `"info": "bigger (x.x.y)"`

A version before the version of the publication so that it also applies - Why that? 

The display starts as true and goes through the conditions and may be set to false. 

Old versions do not know the filter and simply ignore it, so the message is then incorrectly displayed.**
