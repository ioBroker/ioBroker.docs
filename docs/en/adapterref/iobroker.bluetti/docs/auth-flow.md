---
chapters: {"pages":{"en/adapterref/iobroker.bluetti/README.md":{"title":{"en":"ioBroker.bluetti"},"content":"en/adapterref/iobroker.bluetti/README.md"},"en/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md":{"title":{"en":"BLUETTI Home Assistant API Notes"},"content":"en/adapterref/iobroker.bluetti/docs/research/bluetti-ha-api-notes.md"},"en/adapterref/iobroker.bluetti/docs/auth-flow.md":{"title":{"en":"BLUETTI Auth, Token and Device Selection Flow"},"content":"en/adapterref/iobroker.bluetti/docs/auth-flow.md"}}}
---
# BLUETTI Auth, Token and Device Selection Flow

> **Implementation status (2026-07): implemented and verified live.**
> The OAuth login, token exchange/refresh, device discovery/selection, and read-only polling
> are implemented and were confirmed end-to-end against a real BLUETTI account (Elite 30 V2) on
> js-controller 7.0.7. The sections below are the **original design plan** and are kept for
> history; where they disagree with the implementation, the following notes win:
>
> - **Default client credentials are shipped.** BLUETTI's SSO issues no per-user OAuth client;
>   the adapter defaults to the fixed client used by the official Home Assistant integration
>   (`client_id=HomeAssistant`, `client_secret=SG9tZUFzc2lzdGFudA==`, sent verbatim — it is *not*
>   base64-decoded). Admin no longer shows client-id/secret inputs; expert overrides still work via
>   direct native-object edits.
> - **The rotating OAuth token is stored in an encrypted state (`auth.tokenJson`), not in native
>   config.** Every write to `system.adapter.<ns>` restarts the instance, so persisting the token
>   (or transient auth status) to native caused restart loops on login and on every token refresh.
>   The legacy native fields `oauthTokenJson`, `oauthLastRefresh`, and `authStatus` were removed in #140.
> - **The dynamic ioBroker Admin callback URL works.** BLUETTI accepts it at both authorize and
>   token steps; there is no fixed redirect-URI whitelist for this client.
> - **The token exchange uses a standard form body** (client_id/secret in the body, no Basic auth,
>   no PKCE, no scope). The authorization `code` arrives percent-encoded from Admin and must be
>   URL-decoded before the token request, otherwise BLUETTI rejects it with `invalid_grant`.
> - **REST calls send the access token without a `Bearer ` prefix.**
>
> The open questions at the bottom of this document are resolved by the above. One known
> follow-up remains: BLUETTI's token-expiry field is not yet parsed, so the token refreshes on
> every poll (harmless since the token lives in a state, but wasteful).

Status: repository architecture plan for issue #15. This document is intended to be tracked in the GitHub repository so future implementation work can start from the same auth-flow assumptions and open questions. No production BLUETTI credentials are required for this document.

## Decision

Implementing a complete OAuth flow directly in code is **not** the next safe step yet.

A small first implementation becomes reasonable only after one additional source-backed spike confirms the exact BLUETTI OAuth request/response details outside Home Assistant's OAuth helper:

- whether BLUETTI accepts the dynamic ioBroker Admin callback URL as `redirect_uri`,
- the exact authorization URL parameters,
- the exact token exchange form/body and required headers,
- whether refresh tokens are always returned and how expiry fields are shaped.

The provider and tests already cover token injection, one refresh retry, token-expiry API code `805`, and cloud-vs-auth error mapping. The missing piece is the user-facing OAuth bootstrap and persistent token/device configuration.

## Source-backed facts

From the official Home Assistant integration, documented in `docs/research/bluetti-ha-api-notes.md`:

| Area | Fact |
|---|---|
| Authorization endpoint | `https://sso.bluettipower.com/oauth2/grant` |
| Token endpoint | `https://sso.bluettipower.com/oauth2/token` |
| Client credential | built-in default credentials are used by Admin; expert overrides can still be set directly in the native object |
| Device list endpoint | `GET https://gw.bluettipower.com/api/bluiotdata/ha/v1/devices` |
| Device state endpoint | `GET https://gw.bluettipower.com/api/bluiotdata/ha/v1/deviceStates?sns=<serial>` |
| Device binding endpoint | `POST https://gw.bluettipower.com/api/bluiotdata/ha/v1/bindDevices` with `{ "bindSnList": [...] }` |
| REST auth header | Header name `Authorization`; value is the raw access-token string without `Bearer ` prefix |
| Token expiry signal | HTTP 401/403 or BLUETTI API code `805` |

From ioBroker Admin/adapter docs:

- JSON config can use a `sendTo` button with `openUrl` to ask the adapter for an OAuth start URL and open it for the user.
- Admin exposes `/oauth2_callbacks/<adapterNamespace>/`, then sends an `oauth2Callback` message to that adapter instance with the query parameters.
- Sensitive adapter-native fields can be listed in `encryptedNative` and `protectedNative` in `io-package.json`. They are decrypted at adapter runtime but not stored in plaintext.
- ioBroker's newer central credential storage exists, but it requires newer platform versions than this adapter currently declares. For the first implementation, encrypted/protected native config is the better fit.

OAuth endpoint smoke check, 2026-07-02:

- A GET request to `https://sso.bluettipower.com/oauth2/grant` with `response_type=code`, `client_id=HomeAssistant`, a local ioBroker-style `redirect_uri` (`http://127.0.0.1:8081/oauth2_callbacks/bluetti.0/`), and a random `state` returned HTTP 200 with the BLUETTI login page.
- This confirms BLUETTI does not reject the dynamic callback URL before login.
- It does **not** prove that the post-login redirect and token exchange succeed with an ioBroker callback URL.

## Proposed user flow

1. User opens the BLUETTI adapter instance configuration in ioBroker Admin.
2. Admin shows:
   - current auth status,
   - **Authenticate with BLUETTI** button,
   - device-selection control disabled until authentication succeeds,
   - selected device serials/names after discovery.
3. The button is a JSON-config `sendTo` action, for example command `getOAuthStartLink`, with `openUrl: true`.
4. Adapter receives `getOAuthStartLink` and builds:
   - a random `state` value,
   - a callback URL: `${data._origin}oauth2_callbacks/${adapter.namespace}/`,
   - the BLUETTI authorization URL with client ID, callback URL, and state.
5. Admin opens the BLUETTI login/consent page.
6. BLUETTI redirects to ioBroker Admin's callback URL with `code` and `state`.
7. Admin sends `oauth2Callback` to the adapter instance.
8. Adapter verifies `state`, exchanges `code` for token data, stores the token data encrypted, then fetches user products.
9. User returns to the adapter configuration and selects one or more BLUETTI devices.
10. Adapter calls `bindDevices` for selected serials and stores selected device metadata.

## OAuth feasibility in ioBroker Admin

OAuth is realistic in ioBroker Admin **if BLUETTI accepts the Admin callback URL dynamically**.

Direct Admin callback is preferred because it keeps the flow local and does not require a production ioBroker cloud proxy. The likely callback shape is:

```text
http(s)://<admin-host>:<admin-port>/oauth2_callbacks/bluetti.0/
```

Risk: the Home Assistant integration uses Home Assistant's OAuth/application-credentials framework. If BLUETTI validates a fixed redirect URI registered for the `HomeAssistant` client, ioBroker cannot simply reuse a dynamic Admin callback URL. In that case, the choices are:

1. request/coordinate a BLUETTI/ioBroker-compatible OAuth application or ioBroker OAuth cloud-code endpoint,
2. use a documented fixed callback/proxy service,
3. do not ship OAuth until BLUETTI provides a supported redirect strategy.

Do **not** implement username/password scraping or browser automation as a fallback. That would be brittle and unsafe for a published adapter.

## Callback and state handling

The adapter should handle two message commands:

| Command | Direction | Purpose |
|---|---|---|
| `getOAuthStartLink` | Admin → Adapter | Create state and return authorization URL via `{ openUrl }` |
| `oauth2Callback` | Admin → Adapter | Validate callback query, exchange code, persist tokens, return `{ result }` or `{ error }` |

State handling rules:

- Generate a cryptographically random `state`.
- Store the pending state with a short TTL, for example 10 minutes.
- For the first implementation, in-memory state is acceptable; if the adapter restarts during login, the callback fails and the user retries.
- A later hardening step can persist pending state in the instance data directory with TTL cleanup.
- Never log `code`, access token, refresh token, or the full callback URL.

## Token storage

Store token data in the encrypted `auth.tokenJson` state, not in native config fields.

| Field | Sensitive | Purpose |
|---|---:|---|
| `auth.tokenJson` (state) | yes | JSON string containing token response: access token, refresh token, created/expires fields |
| `deviceSerial` (native) | partly | Serial of the selected device used for polling and bindDevices |

`auth.tokenJson` is encrypted with `this.encrypt()` and stored as an ioBroker state to avoid adapter restarts on token rotation.

### Security assessment (#141)

The `auth.tokenJson` state is declared with `read: false, write: false` and its value is encrypted via `this.encrypt()`. This protects against:

- Casual exposure in the Admin UI object tree (hidden from view)
- Backup leaks and direct file-system access (encrypted at rest)

It does **not** protect against an ioBroker admin user, who can read the raw state value via scripting or the REST API and decrypt it using the instance-wide encryption key. This is an accepted tradeoff:

- ioBroker admin users already have full system access (file system, database, other adapters, native config).
- Moving the token to `encryptedNative` would reintroduce the adapter restart loop on every token refresh (each native-config write triggers a js-controller restart), which was the exact problem fixed by moving tokens to a state in #140.
- Storing the token in the file system would lose ioBroker's built-in encryption and complicate debugging.

The encrypted state is the correct ioBroker-idiomatic approach for rotating tokens that must not trigger adapter restarts.

Device serials are not OAuth secrets but can identify the user's hardware. They should not be logged in full. Whether to encrypt them is a product decision; protecting them is reasonable.

Persisting refreshed token data requires updating the instance object, not only mutating `this.config`. The implementation should update `system.adapter.<namespace>.native` through ioBroker object APIs, preserving unrelated native fields.

## Token refresh across adapter restarts

On adapter start:

1. Read and parse the encrypted `auth.tokenJson` state.
2. If missing, set `info.connection = false` and auth status to `not_authenticated`; do not poll.
3. Compute validity using:
   - `expires_at - 30s`, or
   - `created_at + expires_in - 30s`.
4. If token is expired or near expiry, refresh before the first poll.
5. Throttle refresh attempts, for example once per hour after a failed attempt, matching the Home Assistant integration's defensive behavior.
6. Persist any successful refreshed token back to encrypted native config.
7. Build the existing `BluettiCloudProvider` with a `BluettiTokenProvider` that:
   - returns the current access token,
   - refreshes and persists a token when requested,
   - marks auth expired when provider sees HTTP 401/403 or API code `805`.

Refresh errors must not be treated as BLUETTI device outages.

## Device selection and bindDevices

Device selection should happen after successful OAuth and before polling.

Flow:

1. Adapter calls `getUserProducts()` using the fresh token.
2. Admin config obtains the device list through a `sendTo`/`selectSendTo` control, or the adapter stores the discovered list for display after OAuth callback.
3. User selects a single serial.
4. Adapter calls `POST /api/bluiotdata/ha/v1/bindDevices` with `{ "bindSnList": [deviceSerial] }`.
5. Adapter stores the selected serial.
6. Polling only uses the selected serial.

Representation:

| Native/config value | Use |
|---|---|
| `deviceSerial: string` | Polling target |
| `bindDevices` result | Used only to confirm configuration; do not expose control states |

The first implementation should keep this read-only. `fulfillment`/control endpoints remain out of scope.

## Error taxonomy

Auth, cloud, and device failures must remain separate because outage-health states depend on this distinction.

| Source | Provider status | Adapter/auth state | `info.connection` | Outage model impact |
|---|---|---|---:|---|
| Missing token | `auth_failed` | `not_authenticated` | false | no outage suspicion |
| Invalid/expired token, HTTP 401/403, API `805` | `auth_failed` | `reauth_required` | false | no outage suspicion |
| Token refresh network timeout | `cloud_unreachable` | `refresh_deferred` | false | cloud unavailable, not device outage |
| Gateway timeout/network error during poll | `cloud_unreachable` | `authenticated` | false | can mark telemetry stale |
| Non-auth API error | `provider_error` | `authenticated` | false | provider/API failure |
| Product `online != "1"` | `ok` | `authenticated` | false for that device | device offline signal |
| Successful poll for at least one selected device | `ok` | `authenticated` | true | telemetry fresh |

`info.connection` should be true only when authentication works and at least one selected device returns usable status/telemetry.

## Minimal implementation sequence

1. **OAuth start-link/state helper**
   - `src/lib/bluetti-oauth-flow.ts` builds the authorization URL from ioBroker Admin origin and adapter namespace.
   - It uses a 10-minute in-memory `state` TTL, validates callback state/code, rejects OAuth errors, and consumes states once to prevent replay.
   - Unit tests cover URL parameters, callback normalization, one-shot state consumption, expiry, and OAuth error callbacks.
   - This helper is intentionally not wired into `main.ts` yet.

2. **Token manager without polling lifecycle**
   - `src/lib/bluetti-stored-token-provider.ts` parses the stored token JSON, exposes the existing `BluettiTokenProvider` interface, and stays independent from `main.ts`.
   - It supports `expires_at` and `created_at + expires_in`, a 30-second expiry buffer, explicit `markTokenExpired()`, refresh throttling after failures, refresh-token retention when BLUETTI omits a new refresh token, and a persistence callback for refreshed token JSON.
   - Unit tests cover expiry calculation, refresh, persistence, refresh throttling, malformed stored data, retained refresh tokens, and redaction.

3. **OAuth token exchange client**
   - `src/lib/bluetti-oauth-token-client.ts` posts standard OAuth form bodies to `/oauth2/token` using credentials provided by ioBroker native config.
   - It supports `authorization_code` exchange and `refresh_token` refresh with injected `fetchImpl`, timeout handling, structured errors, response normalization, and redaction.
   - Unit tests cover request body/header shape, created-at normalization, refresh requests, OAuth errors, HTTP errors, invalid responses, timeout, network errors, and secret redaction.
   - The request shape is source-backed by the Home Assistant integration and OAuth conventions; the post-login exchange still needs a live ioBroker callback test.

4. **Admin auth configuration and callback wiring**
   - `admin/jsonConfig.json` has a one-button `sendTo` auth flow for `getOAuthStartLink`; no client-id/client-secret inputs are shown anymore.
   - `io-package.json` enables `messagebox` and stores `oauthClientSecret` as a protected and encrypted native field.
   - `src/main.ts` handles `getOAuthStartLink`, `oauth2Callback`, and `getDevices`, persists token JSON server-side in the `auth.tokenJson` state, and does not return token material to Admin responses.
   - Device discovery/selection is still intentionally not wired.

5. **Admin device selection**
   - Add JSON config controls for device selection.
   - Add adapter message handlers for `discoverDevices` and `saveSelectedDevices`.
   - Store selected serials in protected/encrypted native fields if full serials are retained.

6. **Provider lifecycle integration**
   - Wire token provider and selected serials into `src/main.ts`.
   - Start polling only when authenticated and devices are selected.
   - Keep telemetry object creation in the later telemetry issues (#4/#6) unless needed for a minimal `info.connection` proof.

## Open questions before wiring #15 into Admin/main.ts

- Does BLUETTI accept the dynamic ioBroker Admin callback URL after login, not only for the initial login page?
- Does `/oauth2/token` accept the standard form body implemented in `BluettiOAuthTokenClient`, or does BLUETTI require Basic auth or another variant despite the Home Assistant credential setup?
- Does refresh always return a `refresh_token`, and should the old refresh token be retained if omitted? The current token provider retains it defensively.
- Are token expiry fields returned as `expires_at`, `expires_in`, `created_at`, or another shape? The current code supports the known Home Assistant shapes.
- Does `bindDevices` have to be called on every device selection update, or only for newly selected devices?
- Should full serials be stored encrypted or only protected/redacted?

## Recommendation for issue #15

Use this document as the #15 implementation plan. The current branch wires the login smoke-test path only; do not add device selection or telemetry polling until the ioBroker Admin callback has been live-tested.

The next code change should add device discovery/selection as a separate Admin step: instantiate the stored token provider from encrypted native config, call the verified device-list endpoint, present serial/name/status choices, and persist selected serials without starting telemetry polling yet.