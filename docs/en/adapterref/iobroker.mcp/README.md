<img src="admin/mcp.png" alt="ioBroker.mcp" width="200"/>

# ioBroker.mcp

MCP server for ioBroker

## Description

This adapter exposes ioBroker as an [MCP (Model Context Protocol)](https://modelcontextprotocol.io) server, so MCP-capable clients (e.g. Claude Desktop) can read and control your installation through a well-defined set of tools.

## Features

- MCP server over the **Streamable HTTP** transport (`/mcp` endpoint)
- Configurable HTTP/HTTPS web server
- Configurable port and bind address
- Optional authentication
- Optional SSL/TLS support
- Network diagnostics (ICMP ping / TCP probe) to troubleshoot adapter connections
- Adapter **repository** search to recommend installable adapters

## Operating modes

The adapter can run in two ways:

1. **Standalone** (default) – it starts its own web server on the configured port. The MCP endpoint is
   `http(s)://<host>:<port>/mcp`.
2. **Web extension** – it runs inside an existing [`web`](https://github.com/ioBroker/ioBroker.web) adapter
   instance and shares its web server (port, authentication, SSL). Select the target web instance in the
   admin configuration ("Extend WEB adapter"). The MCP endpoint is then served under the web adapter, e.g.
   `http(s)://<host>:8082/mcp`.

   When a web instance is selected, the standalone server settings (port, bind address, authentication, SSL)
   are hidden because they are inherited from the chosen `web` instance.

## Configuration

The adapter can be configured through the ioBroker admin interface using JSONConfig:

### Server Configuration
- **Extend WEB adapter**: Select a `web` instance to run as its extension. Leave empty to run standalone.
- **Port**: The port on which the web server will listen (default: 8093) – standalone only
- **Bind Address**: IP address to bind the server to (0.0.0.0 for all interfaces) – standalone only
- **MCP server URL**: The address to enter in the MCP client, with a button to copy it. Standalone it is built from
  SSL, bind address and port of this instance; as a web extension from SSL, bind address and port of the selected
  `web` instance (with "all instances" one URL per instance). With OAuth and a **Public URL** the public URL is
  used, otherwise the host from the address of the admin page.

### Authentication
- **Enable Authentication**: Enable ioBroker user authentication for the web server
- **Default User**: The ioBroker user whose permissions MCP requests run with when authentication is off
  (default: `admin`). With authentication on, every session runs with the permissions of the user who logged in,
  so this field is hidden then. All object/state reads and writes performed by the tools are executed in the name
  of that user, so the user's ACLs are enforced. A plain name like `operator` is automatically expanded to
  `system.user.operator`. As a web extension the authentication and the default user of the `web` instance apply.

### OAuth

MCP clients such as Claude Desktop connect through a browser login instead of a token you create by hand.
The client discovers the server on its own, the user logs in and confirms, and the client never sees the
ioBroker password.

- **Enable OAuth (browser login)**: In standalone mode this requires *Enable Authentication*. As a **web
  extension** the selected `web` instance provides the login, so OAuth has to be enabled **there as well**
  ("Allow third-party clients") — otherwise MCP clients only receive a redirect to the login page, which
  they cannot use.
- **Public URL**: The externally reachable address of this server, without a path, e.g.
  `https://iobroker.example.com`. Required behind a reverse proxy: the URLs published for OAuth discovery
  must be the ones the client can actually reach. As a web extension it must match the public URL
  configured in the `web` instance.
- **Allow client self-registration**: Let MCP clients register themselves (default: **on**). With this off,
  every client has to be registered by hand first. In web-extension mode this is the `web` instance's
  setting, so the option is hidden here.

**HTTPS is required** for anything but `localhost` — the flow runs through the user's browser, and MCP
clients refuse plain `http://` for remote hosts.

Access tokens are bound to this endpoint, so a token issued for another service on the same server is
rejected. Clients can drop their tokens again via `POST /oauth/revoke`.

### Permissions
All options that change the system are **off** by default; turn on only what the MCP client really needs.

**States and objects**
- **Allow setting states**: Allow MCP clients to write state values and to acknowledge system notifications (the
  `set_state`, `set_states` and `clear_notifications` tools). Default: **on**. Which states can be written is
  decided by the ACLs of the user the request runs with (logged-in user or Default User). `set_states` checks the
  write permission of all states first and writes nothing if one of them is not writable.
- **Mark setting states as destructive** (`setStateDestructive`): Declare `set_state` and `set_states` with
  `destructiveHint: true`, so MCP clients can warn before a state is written. Default: **on**. When off, both tools
  are declared as non-destructive writes (`readOnlyHint` stays `false`); whether a client still asks for
  confirmation then depends on the client.
- **Allow object/file changes** (`allowObjectChange`): Allow MCP clients to create/modify/delete objects, aliases
  and files (the `set_object`, `delete_object`, `create_state`, `create_scene`, `create_alias`, `write_file`,
  `delete_file`, `rename_file` and `mkdir` tools). Default: **off**.

**System**
- **Allow controlling instances** (`allowInstanceControl`): Start, stop and restart adapter instances and change
  their log level (`start_instance`, `stop_instance`, `restart_instance`, `set_log_level`). Default: **off**.
- **Allow managing adapters** (`allowAdapterManagement`): Add and delete instances and upgrade adapters from the
  repository (`add_instance`, `delete_instance`, `upgrade_adapter`). Default: **off**.
- **Allow changing scripts** (`allowScriptChange`): Create, change, start/stop and delete scripts of the
  javascript adapter and run code once (`set_script`, `enable_script`, `delete_script`, `run_script`). Reading
  scripts (`list_scripts`, `get_script`) is always possible. Scripts run with full access to ioBroker. Default:
  **off**.
- **Allow messages to adapters** (`sendToAllowlist`): Adapters (`telegram`) or instances (`backitup.0`) the
  `send_to` tool may send messages to, separated by commas; `*` allows all. Default: empty, then there is no
  `send_to` tool.

**Safety**
- **Ask for confirmation before dangerous actions** (`confirmDangerous`): MCP clients that support
  [elicitation](https://modelcontextprotocol.io/specification/2025-06-18/client/elicitation) ask the user before an
  object or instance is deleted, an instance stopped, an adapter upgraded or installed, a script saved or run, or a
  message sent. Clients without elicitation rely on the `destructiveHint` of the tools and their own confirmation.
  Default: **on**.
- **Allow download/upload links** (`transferLinks`): Tools may hand out short-lived links for data that is too large
  for an MCP message, see [Large results and files](#large-results-and-files). Default: **on**.

**Developers**
- **Allow installing packages (developers only)** (`allowPackageInstall`): Offer the `install_package` tool, which
  installs an adapter package on an ioBroker host - from npm, GitHub, a URL or a `.tgz` file - exactly like
  *Install from custom URL / file* in ioBroker.admin (`iobroker url ...`). Default: **off**. This option is only
  relevant for adapter developers, e.g. to let an AI agent build an adapter, pack it with `npm pack` and install the
  `.tgz` on a test system. An installed package runs with full rights on the host, so never enable it on a
  productive system or for clients you do not fully trust.

**Rights of the ioBroker user**
The options above decide which tools exist; what a call may do is decided by the rights of the ioBroker user the
MCP session runs as (the logged-in user, or the Default User without authentication), like in ioBroker.admin:
- the ACLs of objects, states and files for reading and writing them,
- the "other" rights of the user's groups: **execute** for commands on a host (`install_package`, `add_instance`,
  `delete_instance`, `upgrade_adapter`) and **sendto** for messages to adapters (`send_to`, `run_script`).
  Without them the call is refused before anything runs. Administrators have all rights.

A session is not even offered the tools that need a right the groups of its user lack: without the write right for
states no `set_state`/`set_states`, without the write right for objects no `set_object`, `create_state`,
`start_instance`, ..., without the delete right for states no `delete_orphan_states`, without the write right for
files no `write_file`, without **execute** no `install_package`,
without **sendto** no `send_to`. The rights are read when the session starts; every call is checked anyway.

`check_permissions` shows these rights and the ACLs of given objects.

**Log**
Every call of a changing tool is logged at info level with the user, the tool and its arguments
(`MCP system.user.admin: set_state(id="hue.0.light.state", value=true)`), and every failed call as a warning with
the same details. Long values are shortened; file contents, script code and `send_to` payloads are replaced by
their size.

### SSL/TLS Configuration
- **Enable HTTPS**: Enable HTTPS/SSL for secure connections
- **Public Certificate**: Path to the public certificate file
- **Private Key**: Path to the private key file
- **Chained Certificate**: Path to the chained certificate file (optional)

## Connecting ChatGPT and Claude

There is no official ioBroker app in the connector directories of Claude and ChatGPT yet. Until then, add ioBroker
as a **custom connector**. There are two ways to reach your installation:

|              | A: via ioBroker Remote (recommended)                                     | B: directly to your server                               |
|--------------|--------------------------------------------------------------------------|----------------------------------------------------------|
| Server URL   | `https://mcp.iobroker.in/mcp`                                            | `https://<your public address>/mcp`                      |
| Login        | e-mail and password of your [ioBroker.pro](https://iobroker.pro) account | ioBroker user of your installation                       |
| Requirements | ioBroker.pro account and assistance or remote active subscription        | public HTTPS address (port forwarding or reverse proxy)  |
| Open ports   | none                                                                     | your MCP or web port must be reachable from the internet |

### A: via ioBroker Remote

1. Configure this adapter (standalone or as web extension). Leave **Enable Authentication** and **Enable OAuth**
   **off**: the login happens on iobroker.pro, and ioBroker.iot connects to this instance locally without
   credentials. As a web extension, the selected `web` instance must not use authentication either. The port does
   not have to be reachable from the internet.
2. In the settings of **ioBroker.iot** (logged in with your ioBroker.pro account) enable **Allow remote access** and
   select this instance as **MCP instance**. Save.
3. Add the connector in Claude or ChatGPT (see below) with the URL `https://mcp.iobroker.in/mcp`.
4. A login page "Connect to ioBroker" opens: enter the e-mail and password of your ioBroker.pro account and click
   **Sign in and allow**. Only allow the connection if you have just set it up yourself.

Access is granted with a verified e-mail address and a valid ioBroker.pro license. New accounts can use it for
7 days after the registration without a license.

Good to know:

- ioBroker.iot must be connected to the cloud, otherwise the client gets the error "ioBroker is offline".
- Live updates (subscribing to resources) are not available via Remote. All tools work.
- After a restart of the MCP instance, the client starts a new session by itself.
- Removing the connector in the client ends the access. An already issued access token stays valid for up to one
  hour. To stop the access immediately, clear **MCP instance** in ioBroker.iot.

### B: directly to your server

1. Enable **Enable Authentication** and **Enable OAuth**. As a web extension, enable OAuth ("Allow third-party
   clients") in the `web` instance as well.
2. Make the server reachable via **HTTPS** from the internet and enter this address as **Public URL**.
3. Use the URL `https://<your public address>/mcp` in the client and log in with an ioBroker user.

### Claude (claude.ai, Claude Desktop)

Custom connectors are available on all plans, the Free plan is limited to one custom connector.

1. Open **Customize → Connectors**, click **+** and select **Add custom connector**.
2. Enter a name (e.g. `ioBroker`) and the server URL. The **Advanced settings** (OAuth client ID and secret) stay
   empty, Claude registers itself.
3. Click **Add**. If the login does not start by itself, click **Connect** next to the connector.
4. In a chat, click **+** (lower left) → **Connectors** and enable **ioBroker**.

Team and Enterprise: an owner first adds the connector under **Organization settings → Connectors** → **Add** →
**Custom** → **Web**. Members then open **Customize → Connectors** and click **Connect**.

**Claude Code:**

```bash
claude mcp add --transport http iobroker https://mcp.iobroker.in/mcp
```

Then run `/mcp` in Claude Code, select `iobroker` and log in in the browser.

### ChatGPT

Custom MCP connections need the **developer mode**, which is available for Plus, Pro, Business, Enterprise and
Education accounts in ChatGPT on the web. In Business and Enterprise workspaces an admin has to allow it first.

1. Open **Settings → Security and login** and turn on **Developer mode**.
2. Open [ChatGPT Plugins](https://chatgpt.com/plugins) and click **+**.
3. Enter a name (e.g. `ioBroker`) and a description (e.g. "Reads and controls my ioBroker smart home"). Under
   **Connection** choose **Public endpoint** and enter the server URL. Choose **OAuth** as authentication.
4. Create the connection and log in. ChatGPT then lists the tools of ioBroker.
5. In a chat, open **+** → **Developer mode** and select **ioBroker**. It helps to name ioBroker explicitly in the
   request, e.g. "Use ioBroker to switch off the lights in the kitchen".

ChatGPT marks developer mode connections as elevated risk and asks before write actions.

The menu names are taken from the help pages of
[Claude](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) and
[ChatGPT](https://developers.openai.com/api/docs/guides/developer-mode) (September 2026) and may change.

### Recommendations

- Let the AI log in with an ioBroker user that has only the rights it should have, or, without authentication, set
  such a user as **Default User**. Every tool runs with its permissions.
- Leave **Allow object/file changes** off unless you need it.
- Turn on the **System** options (instances, adapters, scripts, messages) only for clients you trust, and only the
  ones you need. With **Allow messages to adapters** name the adapters explicitly instead of `*`.
- Leave **Allow installing packages** off. It is only meant for adapter developers on test systems.
- Leave **Mark setting states as destructive** and **Ask for confirmation before dangerous actions** on, so the
  clients ask before they switch or change something.

## MCP Endpoint

The MCP server is served at `POST/GET/DELETE /mcp` using the Streamable HTTP transport with per-session
state (tracked via the `Mcp-Session-Id` header). Point your MCP client at:

- standalone: `http(s)://<host>:<port>/mcp`
- web extension: `http(s)://<host>:<webPort>/mcp`

### Available tools

| Tool                        | Description                                                                                                                                                                                                                                          |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `get_states`                | Retrieve the current value of one or multiple states; IDs may contain wildcards (e.g. `hue.0.*.brightness`); an ID without a state is returned with `exists: false` or a hint                                                                      |
| `wait_for_state`            | Wait until a state has a `value` (or, without `value`, until it is updated), optionally only with `ack`; gives up after `timeout` seconds (default 30, at most 50) with `reached: false`                                                             |
| `find_orphan_states`        | Find states without object (e.g. `system.adapter.vis.0.alive` of a deleted instance) by an ID `pattern`, except the upload progress `system.adapter.<adapter>.upload`, which has no object on purpose; delete them with `delete_orphan_states` or on the host with `iobroker state del <id>`|
| `get_object`                | Read a single object by its ID                                                                                                                                                                                                                       |
| `check_permissions`         | Show the user and groups of the MCP session, the rights of its groups and, for given object IDs, whether it may read/write/delete the object and read/write the state                                                                               |
| `search_objects`            | Search objects/states by keyword (matched against ID and name); optional filters for object `type`, `role`, `room` and source `adapter` instance                                                                                                     |
| `list_devices`              | List detected devices grouped by room (uses the ioBroker type-detector to expose functional devices with named controls); optional `language` and `room` filter                                                                                      |
| `list_instances`            | List adapter instances with their status                                                                                                                                                                                                             |
| `list_adapters`             | List installed adapters with metadata (version, title, description, keywords)                                                                                                                                                                        |
| `search_adapter_repository` | Search the ioBroker adapter **repository** (all *installable* adapters, not just installed ones) by keyword; optional `type` category, `onlyNotInstalled` and `language` filters — use it to recommend which adapter to install for a device/service |
| `list_hosts`                | List ioBroker hosts with their status                                                                                                                                                                                                                |
| `list_rooms`                | List rooms (`enum.rooms.*`) with localized names and member details; optional `language` and `withIcons`                                                                                                                                             |
| `list_functions`            | List functions (`enum.functions.*`) with localized names and member details; optional `language` and `withIcons`                                                                                                                                     |
| `history_query`             | Query historical values (requires a history adapter); aggregations: `raw`, `min`, `max`, `avg`, `sum`, `count`, `minmax`, `percentile`, `quantile`, `integral`                                                                                       |
| `read_file`                 | Read a file from an adapter file storage (optional base64); large files in chunks via `offset`/`length`; `download: true` returns a download link instead                                                                                              |
| `list_files`                | List a directory in an adapter file storage                                                                                                                                                                                                          |
| `file_exists`               | Check whether a file exists in an adapter file storage                                                                                                                                                                                               |
| `get_logs`                  | Retrieve recent ioBroker log lines; optional filters by `level` (error/warn/info/debug), source `adapter`, start time (`from_ts`) and `search` in the message (text, or `/regex/flags`); `logFile` tells the time of the newest line and the file size                                                            |
| `write_log`                 | Write a message to the ioBroker log                                                                                                                                                                                                                  |
| `system_info`               | Get system and js-controller information                                                                                                                                                                                                             |
| `list_adapter_updates`      | List installed adapters that have a newer version in the active repository                                                                                                                                                                           |
| `list_notifications`        | List the system notifications of the hosts (the bell in admin): disk space, crashed adapters, ...                                                                                                                                                    |
| `list_scripts`              | List the scripts of the javascript adapter (without source)                                                                                                                                                                                          |
| `get_script`                | Read a script including its source                                                                                                                                                                                                                   |
| `ping_host`                 | Diagnose connectivity to a network device: ICMP ping to `host` plus an optional TCP connect to `port` — useful to investigate adapter `ETIMEDOUT`/connection errors                                                                                  |
| `set_state`                 | Set the value of a state (value coerced to the state type); with `wait_ack` (seconds) it waits until the device confirms the command (`ack: true`) and returns the confirmed state — requires *Allow setting states*                                 |
| `set_states`                | Set multiple states in one call (for scenes/group actions like "all lights off") — requires *Allow setting states*                                                                                                                                   |
| `clear_notifications`       | Acknowledge system notifications, optionally of one scope/category/instance — requires *Allow setting states*                                                                                                                                        |
| `set_object`                | Create/update an object (merges common/native) — requires *Allow object/file changes*                                                                                                                                                                |
| `delete_object`             | Delete an object, optionally with all children — requires *Allow object/file changes*                                                                                                                                                                |
| `delete_orphan_states`      | Delete states without object, given by their IDs or by patterns like `system.adapter.vis.0.*`; each state is checked again first, so a state with an object and the upload progress of an adapter are never deleted — requires *Allow object/file changes* |
| `create_state`              | Create a new state object with type/role/unit/min/max and optional initial value — requires *Allow object/file changes*                                                                                                                              |
| `create_scene`              | Create or update a scene for the ioBroker `scenes` adapter (state/value pairs applied together) — requires *Allow object/file changes*                                                                                                               |
| `create_alias`              | Create an alias (`alias.0.*`) pointing to a state, optionally with a separate write state — requires *Allow object/file changes*                                                                                                                     |
| `write_file`                | Write a file to an adapter file storage, from `content` or from a file uploaded via `prepare_upload` (`upload_id`) — requires *Allow object/file changes*                                                                                              |
| `delete_file`               | Delete a file from an adapter file storage — requires *Allow object/file changes*                                                                                                                                                                    |
| `rename_file`               | Rename/move a file within the same adapter file storage — requires *Allow object/file changes*                                                                                                                                                       |
| `mkdir`                     | Create a directory in an adapter file storage — requires *Allow object/file changes*                                                                                                                                                                 |
| `prepare_upload`            | Get a one-time upload link for a file that is too large for a tool argument (e.g. a `.tgz`), for clients that can run shell commands — requires *Allow download/upload links* and *Allow object/file changes* or *Allow installing packages*           |
| `install_package`           | Install an adapter package (npm, GitHub, URL, `.tgz` from the file storage, as base64 or uploaded via `prepare_upload`) on a host, restart its enabled instances and report whether they came up, with their first log lines — requires *Allow installing packages*, developers only |
| `start_instance`            | Start (enable) an instance — requires *Allow controlling instances*                                                                                                                                                                                  |
| `stop_instance`             | Stop (disable) an instance — requires *Allow controlling instances*                                                                                                                                                                                  |
| `restart_instance`          | Restart a running instance — requires *Allow controlling instances*                                                                                                                                                                                  |
| `set_log_level`             | Change the log level of an instance, temporarily or persistently — requires *Allow controlling instances*                                                                                                                                            |
| `add_instance`              | Create an instance of an adapter from the repository (`iobroker add`) — requires *Allow managing adapters*                                                                                                                                           |
| `delete_instance`           | Delete an instance with its objects and states (`iobroker del`) — requires *Allow managing adapters*                                                                                                                                                 |
| `upgrade_adapter`           | Upgrade an adapter to the repository or a given version (`iobroker upgrade`) — requires *Allow managing adapters*                                                                                                                                    |
| `set_script`                | Create a JavaScript/TypeScript script or change its source — requires *Allow changing scripts*                                                                                                                                                       |
| `enable_script`             | Start or stop a script — requires *Allow changing scripts*                                                                                                                                                                                           |
| `delete_script`             | Delete a script — requires *Allow changing scripts*                                                                                                                                                                                                  |
| `run_script`                | Run code once in the javascript adapter and return its log output (javascript ≥ 10.1.0) — requires *Allow changing scripts*                                                                                                                          |
| `send_to`                   | Send a message to an adapter instance (`sendTo`) and return the answer — only instances in *Allow messages to adapters*                                                                                                                              |

All object/state access runs with the permissions of the logged-in user, or of the **Default User** without
authentication. The write tools are only registered when their respective permission option is enabled, and only
offered to users whose groups have the rights they need.

### Large results and files
MCP clients reject tool results above 1 MiB, and a model cannot pass megabytes of base64 as a tool argument. So:

- **Every result stays below the limit.** Lists (`get_states`, `search_objects`, `list_files`, `list_scripts`,
  `history_query`) return as many entries as fit and add `truncated`, `total`, `nextOffset` and a `hint`; call
  again with `offset` set to `nextOffset` for the next part. `get_logs` keeps the newest lines. Any other result
  that is too large is replaced by a download link, or by an error asking to narrow the request down.
- **Download links** (`download_url`): a cut list carries a link to all of its entries as JSON, and `read_file`
  with `download: true` returns a link to the whole file. Clients that can run shell commands (e.g. Claude Code)
  fetch it with `curl -o <file> "<download_url>"`.
- **Upload links**: `prepare_upload` returns a link and an `upload_id`. The client uploads the file with
  `curl -T <file> "<url>"` (`PUT` or `POST`, raw body, up to 100 MB) and passes the `upload_id` to `write_file` or
  `install_package`. A link can be used once. This way an AI agent can install a `.tgz` it built with `npm pack`.

The links are `<mcp endpoint>/transfer/<token>`: the random token is the credential, so they work without the
login of the MCP endpoint, and they expire after 15 minutes. They are not available as a web extension with
authentication enabled in the web adapter, because the web adapter asks for a login first; the tools then say so.

### Prompts
MCP clients offer these as ready-made commands (e.g. as slash commands):

- `diagnose_adapter` (`instance`) - find out why an instance does not work: status, log, notifications,
  connectivity and available updates.
- `room_overview` (`room`) - summary of the devices of a room and anything unusual.
- `create_automation` (`description`) - turn a description into a script for the javascript adapter.

### Resources & live updates (SSE)

States and objects are also exposed as MCP **resources** using the canonical ioBroker URI scheme, so clients
can read and **subscribe** to them. The server pushes changes over the Streamable HTTP SSE stream
(`notifications/resources/updated`).

- States: `iobstate://<id>` (e.g. `iobstate://javascript.0.temperature`) – `resources/read` returns
  `{ id, val, ack, ts, lc, q }`.
- Objects: `iobobject://<id>` (e.g. `iobobject://system.adapter.admin.0`) – `resources/read` returns the object.
- Logs: `ioblog://all` (every source) or `ioblog://<source>` (e.g. `ioblog://admin.0`) – `resources/read`
  returns the recent log lines (`{ source, logs: [{ ts, level, source, message }] }`). Subscribing enables
  log forwarding for the adapter; each new matching line triggers a `notifications/resources/updated`.
- `resources/subscribe` subscribes to the underlying ioBroker state/object/log; on every change the client
  receives a `notifications/resources/updated` for that URI and re-reads it. `resources/unsubscribe` stops it.

Subscriptions are tracked per session and ref-counted, so the adapter subscribes to a state/object only once
regardless of how many clients/sessions watch it, and unsubscribes when the last one leaves.

(Files use `iobfile://<adapter>/<path>` in the same scheme; they are available via the `read_file`/`write_file`
tools rather than as subscribable resources.)

### Health endpoints (non-MCP)

- `GET /` - Basic server information
- `GET /status` - Server status, uptime and active session count
- `GET /api/info` - Adapter information

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.8.1 (2026-10-27)
* (@GermanBluefox) Fixed: js-controller usually killed the instance with SIGKILL when stopping it, because the adapter never closed its server and the connections of the MCP clients

### 1.8.0 (2026-10-27)
* (@GermanBluefox) New tool `delete_orphan_states`: deletes the states without object found by `find_orphan_states`, but never a state with an object (`@iobroker/mcp-server` 1.9.0)

### 1.7.1 (2026-10-26)
* (@GermanBluefox) `find_orphan_states` no longer reports the upload progress of the adapters (`system.adapter.<adapter>.upload`), which js-controller writes without object on purpose (`@iobroker/mcp-server` 1.8.1)

### 1.7.0 (2026-10-26)
* (@GermanBluefox) Security: commands on a host need the "execute" right of the user, messages to adapters the "sendto" right, like in admin; a session is only offered the tools its user has the rights for (`@iobroker/mcp-server` 1.8.0)
* (@GermanBluefox) Every change made via MCP is logged with the user, the tool and its arguments; `get_logs` searches the messages for a text or a regular expression (`@iobroker/mcp-server` 1.8.0)
* (@GermanBluefox) `set_state` can wait for the confirmation of the device (`wait_ack`); new tools `wait_for_state` and `find_orphan_states` (`@iobroker/mcp-server` 1.8.0)
* (@GermanBluefox) `install_package` reports a done installation even if the instances could not be restarted afterwards (`@iobroker/mcp-server` 1.8.0)

### 1.6.2 (2026-10-26)
* (@GermanBluefox) Fixed: `get_logs` always returned `size: null` for the log file (`@iobroker/mcp-server` 1.7.1)

## License

MIT License

Copyright (c) 2025-2026 ioBroker

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