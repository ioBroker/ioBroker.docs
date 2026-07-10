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

### Permissions
- **Allow setting states**: Allow MCP clients to write state values (the `set_state` and `set_states` tools).
  Default: **on**.
- **Allow object/file changes**: Allow MCP clients to create/modify/delete objects and files (the `set_object`,
  `delete_object`, `create_state`, `create_scene`, `write_file`, `delete_file`, `rename_file` and `mkdir`
  tools). Default: **off**. When off, these tools are not exposed at all.

### SSL/TLS Configuration
- **Enable HTTPS**: Enable HTTPS/SSL for secure connections
- **Public Certificate**: Path to the public certificate file
- **Private Key**: Path to the private key file
- **Chained Certificate**: Path to the chained certificate file (optional)

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
### 1.0.11 (2026-07-02)
* (@GermanBluefox) Default port was changed to 8011
* (@GermanBluefox) Corrected the issue with authentication

### 1.0.8 (2026-06-18)
* (@GermanBluefox) Used `@iobroker/mcp-server` package

### 1.0.5 (2026-06-17)
* (@GermanBluefox) Added debug for ICMP ping and TCP probe in `ping_host` tool

### 1.0.2 (2026-06-13)
* (@GermanBluefox) Some repo checker errors were fixed

### 1.0.0 (2026-06-12)
* (@GermanBluefox) Allowed node 18

### 0.3.1 (2026-06-11)
* (@GermanBluefox) Added `search_adapter_repository` tool to search the whole adapter repository (not only installed adapters)
* (@GermanBluefox) Added `ping_host` tool (ICMP ping + optional TCP probe) for network diagnostics

### 0.2.5 (2026-06-11)
* (@GermanBluefox) Supported direct import of MCP server

### 0.2.0 (2026-06-11)
* (@GermanBluefox) Many changes: see the previous changelog entry

### 0.1.5 (2026-06-11)
* (@GermanBluefox) Added wildcard support to `get_states` (e.g. `hue.0.*.brightness`)
* (@GermanBluefox) Added `set_states` for writing multiple states in one call (scenes/group actions)
* (@GermanBluefox) Added `delete_object` and `create_state` tools (gated by *Allow object/file changes*)
* (@GermanBluefox) Added `create_scene` tool that creates scenes for the ioBroker `scenes` adapter
* (@GermanBluefox) Added file management tools: `list_files`, `file_exists`, `delete_file`, `rename_file`, `mkdir`
* (@GermanBluefox) Added `list_adapters` to list installed adapters with metadata
* (@GermanBluefox) Extended `search_objects` with `type` and `adapter` filters; the keyword now also matches object names
* (@GermanBluefox) Extended `history_query` with the aggregations `count`, `minmax`, `percentile`, `quantile` and `integral`

### 0.1.4 (2026-05-28)
* (@GermanBluefox) Initial development

### 0.0.1 (2025-01-03)
* Initial release with basic web server functionality
*Configurable port, bind address, authentication, and SSL

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
