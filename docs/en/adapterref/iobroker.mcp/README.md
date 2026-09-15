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
   `http(s)://<host>:8082/mcp/`.

   When a web instance is selected, the standalone server settings (port, bind address, authentication, SSL)
   are hidden because they are inherited from the chosen `web` instance.

## Configuration

The adapter can be configured through the ioBroker admin interface using JSONConfig:

### Server Configuration
- **Extend WEB adapter**: Select a `web` instance to run as its extension. Leave empty to run standalone.
- **Port**: The port on which the web server will listen (default: 8093) – standalone only
- **Bind Address**: IP address to bind the server to (0.0.0.0 for all interfaces) – standalone only

### Authentication
- **Enable Authentication**: Enable ioBroker user authentication for the web server
- **Default User**: The ioBroker user whose permissions every MCP request runs with (default: `admin`).
  All object/state reads and writes performed by the tools are executed in the name of this user, so the
  user's ACLs are enforced. A plain name like `operator` is automatically expanded to `system.user.operator`.
  When running as a web extension and no user is set here, the host `web` instance's default user is used.

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
- **Allow setting states**: Allow MCP clients to write state values (the `set_state` and `set_states` tools).
  Default: **on**.
- **Mark setting states as destructive**: Declare `set_state` and `set_states` with `destructiveHint: true`, so MCP
  clients can warn before a state is written. Default: **on**. When off, both tools are declared as non-destructive
  writes (`readOnlyHint` stays `false`); whether a client still asks for confirmation then depends on the client.
- **Allow object/file changes**: Allow MCP clients to create/modify/delete objects and files (the `set_object`,
  `delete_object`, `create_state`, `create_scene`, `write_file`, `delete_file`, `rename_file` and `mkdir`
  tools). Default: **off**. When off, these tools are not exposed at all.

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
3. Use the URL `https://<your public address>/mcp` (as web extension `https://<your public address>/mcp/`) in the
   client and log in with an ioBroker user.

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

- Set a **Default User** with only the rights the AI should have. Every tool runs with its permissions.
- Leave **Allow object/file changes** off unless you need it.
- Leave **Mark setting states as destructive** on, so the clients ask before they switch something.

## MCP Endpoint

The MCP server is served at `POST/GET/DELETE /mcp` using the Streamable HTTP transport with per-session
state (tracked via the `Mcp-Session-Id` header). Point your MCP client at:

- standalone: `http(s)://<host>:<port>/mcp`
- web extension: `http(s)://<host>:<webPort>/mcp/`

### Available tools

| Tool                        | Description                                                                                                                                                                                                                                          |
|-----------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `get_states`                | Retrieve the current value of one or multiple states; IDs may contain wildcards (e.g. `hue.0.*.brightness`)                                                                                                                                          |
| `get_object`                | Read a single object by its ID                                                                                                                                                                                                                       |
| `search_objects`            | Search objects/states by keyword (matched against ID and name); optional filters for object `type`, `role`, `room` and source `adapter` instance                                                                                                     |
| `list_devices`              | List detected devices grouped by room (uses the ioBroker type-detector to expose functional devices with named controls); optional `language` and `room` filter                                                                                      |
| `list_instances`            | List adapter instances with their status                                                                                                                                                                                                             |
| `list_adapters`             | List installed adapters with metadata (version, title, description, keywords)                                                                                                                                                                        |
| `search_adapter_repository` | Search the ioBroker adapter **repository** (all *installable* adapters, not just installed ones) by keyword; optional `type` category, `onlyNotInstalled` and `language` filters — use it to recommend which adapter to install for a device/service |
| `list_hosts`                | List ioBroker hosts with their status                                                                                                                                                                                                                |
| `list_rooms`                | List rooms (`enum.rooms.*`) with localized names and member details; optional `language` and `withIcons`                                                                                                                                             |
| `list_functions`            | List functions (`enum.functions.*`) with localized names and member details; optional `language` and `withIcons`                                                                                                                                     |
| `history_query`             | Query historical values (requires a history adapter); aggregations: `raw`, `min`, `max`, `avg`, `sum`, `count`, `minmax`, `percentile`, `quantile`, `integral`                                                                                       |
| `read_file`                 | Read a file from an adapter file storage (optional base64)                                                                                                                                                                                           |
| `list_files`                | List a directory in an adapter file storage                                                                                                                                                                                                          |
| `file_exists`               | Check whether a file exists in an adapter file storage                                                                                                                                                                                               |
| `get_logs`                  | Retrieve recent ioBroker log lines; optional filters by `level` (error/warn/info/debug), source `adapter` and start time (`from_ts`)                                                                                                                 |
| `write_log`                 | Write a message to the ioBroker log                                                                                                                                                                                                                  |
| `system_info`               | Get system and js-controller information                                                                                                                                                                                                             |
| `ping_host`                 | Diagnose connectivity to a network device: ICMP ping to `host` plus an optional TCP connect to `port` — useful to investigate adapter `ETIMEDOUT`/connection errors                                                                                  |
| `set_state`                 | Set the value of a state (value coerced to the state type) — requires *Allow setting states*                                                                                                                                                         |
| `set_states`                | Set multiple states in one call (for scenes/group actions like "all lights off") — requires *Allow setting states*                                                                                                                                   |
| `set_object`                | Create/update an object (merges common/native) — requires *Allow object/file changes*                                                                                                                                                                |
| `delete_object`             | Delete an object, optionally with all children — requires *Allow object/file changes*                                                                                                                                                                |
| `create_state`              | Create a new state object with type/role/unit/min/max and optional initial value — requires *Allow object/file changes*                                                                                                                              |
| `create_scene`              | Create or update a scene for the ioBroker `scenes` adapter (state/value pairs applied together) — requires *Allow object/file changes*                                                                                                               |
| `write_file`                | Write a file to an adapter file storage — requires *Allow object/file changes*                                                                                                                                                                       |
| `delete_file`               | Delete a file from an adapter file storage — requires *Allow object/file changes*                                                                                                                                                                    |
| `rename_file`               | Rename/move a file within the same adapter file storage — requires *Allow object/file changes*                                                                                                                                                       |
| `mkdir`                     | Create a directory in an adapter file storage — requires *Allow object/file changes*                                                                                                                                                                 |

All object/state access runs with the permissions of the configured **Default User**. The write tools are only
registered when their respective permission option is enabled.

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
### **WORK IN PROGRESS**
* (@GermanBluefox) Added instructions for connecting ChatGPT and Claude (via ioBroker Remote or directly)

### 1.1.6 (2026-09-15)
* (@GermanBluefox) Added IP address selector
* (@GermanBluefox) New option "Mark setting states as destructive" (default on): `set_state`/`set_states` can be declared as non-destructive writes

### 1.1.4 (2026-09-03)
* (@GermanBluefox) `read_file` reads large files in chunks: new optional `offset`/`length` parameters, at most 512 KiB per call by default; the result now contains `size`, `offset`, `length`, `truncated` and `nextOffset` (MCP clients reject tool results above 1 MB, ioBroker/ioBroker.mcp#63)

### 1.1.3 (2026-09-03)
* (ioBroker-Bot) Adapter requires admin >= 7.8.23 now.
* (@GermanBluefox) Updated packages

### 1.1.2 (2026-08-26)
* (@GermanBluefox) Node.js 22 is required now
* (@GermanBluefox) Corrected OAuth page

### 1.1.0 (2026-08-04)
* (@GermanBluefox) Added OAuth: MCP clients can now be connected through a browser login instead of a manually created token
* (@GermanBluefox) OAuth also works as a web extension, using the host `web` instance as the authorization server (requires OAuth enabled there too)
* (@GermanBluefox) Updated `@iobroker/mcp-server` and `@iobroker/webserver`

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