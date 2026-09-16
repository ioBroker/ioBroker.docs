---
chapters: {"pages":{"en/adapterref/iobroker.motioneye/README.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/README.md"},"en/adapterref/iobroker.motioneye/settings.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/settings.md"},"en/adapterref/iobroker.motioneye/cameras.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/cameras.md"},"en/adapterref/iobroker.motioneye/modes.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/modes.md"},"en/adapterref/iobroker.motioneye/alert-level.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/alert-level.md"},"en/adapterref/iobroker.motioneye/datapoints.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/datapoints.md"},"en/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/vis-stream.md"},"en/adapterref/iobroker.motioneye/faq.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.motioneye/faq.md"}}}
---
![Logo](../../admin/motioneye.png)

### ioBroker adapter for MotionEye

[Back to documentation index](/#/adapters/motioneye)

## Help & FAQ

Typical questions and log messages from alpha testers.

---

### Log shows `unauthorized`

MotionEye is reachable, but login or API signature failed.

**Check:**

1. Open the instance settings and re-enter **MotionEye username** and **password**, then **Save** and restart the instance.
2. After adapter updates since 0.2.1 the password is stored encrypted — an old plain-text value may no longer work until you save it again.
3. If MotionEye has **no password**, leave the field empty (no spaces).
4. Username must match MotionEye exactly (often `admin`).
5. **MotionEye config API port** is **8765** — not a reverse-proxy web port unless the API is forwarded there too.

**Success:** `_info.connection` = `true`, no `unauthorized` warnings in the log.

#### Web login works, adapter still shows `unauthorized`

If the browser login succeeds but the adapter logs `GET /config/list → HTTP 403: unauthorized`, it is usually **not** a wrong host but **different credentials** or the **wrong API URL**:

1. **Same port as the adapter:** Web login must work at `http://<motionHost>:8765/` — not only at `:80`, `:443`, or another URL.
2. **Same user:** **MotionEye username** must match the MotionEye admin user exactly (case-sensitive, often `admin`).
3. **Password in ioBroker:** Clear the field completely → **Save** → restart instance → type the password **manually** (do not paste) → **Save** → restart. Fixes broken encryption or invisible whitespace.
4. **Two separate servers:** ioBroker and MotionEye on different VMs/LXCs (e.g. Proxmox) is fine — SSH tests and `node` must run on the **ioBroker host**, not on the MotionEye container.
5. **MotionEye 0.44 or newer:** From MotionEye **0.44** the API uses **session login** instead of URL signatures. You need adapter **0.5.0** or newer — with **0.4.x** you still get `unauthorized` even when web login works. See [MotionEye 0.44+](#motioneye-044-adapter-050).

---

### MotionEye 0.44+ (adapter 0.5.0+)

From **MotionEye 0.44** onwards, API authentication changed: instead of `_username` / `_signature` in the URL, the client signs in via **`POST /login`** and uses a session cookie ([release notes](https://github.com/motioneye-project/motioneye/releases/tag/0.44.0)).

| MotionEye | Adapter | Result |
|-----------|---------|--------|
| **0.43.x** | 0.4.x or **0.5.0+** | works (URL signature) |
| **0.44+** | 0.4.x | `unauthorized` — even if web login on port 8765 works |
| **0.44+** | **0.5.0+** | works (session login, automatic fallback) |
| **0.43.x** | **0.5.0+** | still works (backward compatible upgrade) |

**Check version:** MotionEye web UI, `http://<host>:8765/version`, or datapoint `motioneye.<instance>._info.motionEyeVersion`.

**Upgrade:** Update the adapter to **0.5.0** or newer (npm or ioBroker Admin). No camera or MotionEye config changes required — host, username, and password stay the same.

---

### Device settings (`settings.*`)

From adapter **0.6.0** onwards, camera parameters live under `motioneye.<instance>.<camera>.settings.*` (e.g. `framerate`, `resolution`, `rotation`, `autoBrightness`, `privacyMask`). Values are read during the status poll and can be written via datapoints.

**Privacy mask (`settings.privacyMask`):**

1. Draw the **mask regions** once in the MotionEye web UI (Video Device → Privacy mask).
2. **Enable/disable** preferably only via the ioBroker datapoint `settings.privacyMask` — the adapter caches the drawn regions (persisted on the object, survives adapter updates/restarts from **0.6.1**) and re-sends them when enabling.
3. If you turn the mask **off directly in MotionEye**, MotionEye discards the regions immediately. Then you must redraw the mask in MotionEye, wait for a poll (or restart the instance) so the adapter picks up the lines again.
4. **Brightness/contrast/saturation/hue** are only available in MotionEye for local USB/v4l2 cameras, not for network (RTSP) cameras — therefore no datapoints in the adapter.

**Changing several settings at once:** From adapter **0.7.0**, config writes are queued per camera, so setting multiple `settings.*`/`overlay.*`/`motiondetection.*` datapoints for the same camera at nearly the same time (e.g. via a script or batch edit) no longer risks one change silently overwriting another. On older versions, change one datapoint at a time and wait for `lastAction` to update before changing the next.

---

### Motion detection tuning (`motiondetection.*`)

Since adapter **1.0.0**, motion detection tuning parameters live under `motioneye.<instance>.<camera>.motiondetection.*` (`frameChangeThreshold`, `autoThresholdTuning`, `autoNoiseDetect`, `noiseLevel`, `eventGap`, `minimumMotionFrames`, `lightSwitchDetect`, `despeckleFilter`, `preCapture`, `postCapture`).

1. **Detection on/off** is still controlled via root `mode` (`off` / `still` / `sharp`) — the `motiondetection.*` datapoints only tune sensitivity and timing while detection is enabled.
2. **`frameChangeThreshold`** is the percentage of image pixels that must change to trigger motion (0–20 %, matching the MotionEye slider). Setting it to `0` effectively disables detection.
3. **`autoThresholdTuning`** and **`autoNoiseDetect`** let MotionEye adjust threshold/noise automatically. When auto noise detection is on, `noiseLevel` is still readable but has little practical effect until you turn auto off.
4. **Timing:** `eventGap` is how long motion must be absent before an event ends (seconds). `minimumMotionFrames` filters brief false triggers. `preCapture`/`postCapture` are frame buffers before/after motion (frame count depends on camera framerate).
5. **Sync delay:** values changed in the MotionEye web UI appear in ioBroker after the next status poll (`statusPollIntervalSec`, default 300 s). Writes from ioBroker are applied immediately.

After updating the adapter: **restart the instance** so the new objects under `motiondetection.*` are created.

---

### Text overlay (`overlay.*`)

From adapter **0.7.0** onwards, the camera's text overlay lives under `motioneye.<instance>.<camera>.overlay.*` (`enabled`, `leftText`, `rightText`, `customLeftText`, `customRightText`, `textScale`).

1. **`enabled`** is the master on/off switch for the overlay. When switched off, MotionEye clears the displayed text on the video — `leftText`/`rightText`/custom text are kept in the adapter and MotionEye config, ready for when you switch it back on.
2. **`leftText`/`rightText`** accept one of `camera-name`, `timestamp`, `custom-text`, `disabled` (shown as a dropdown in ioBroker Admin/object view).
3. **Custom text:** set `leftText` (or `rightText`) to `custom-text` and fill in `customLeftText` (or `customRightText`) — in either order. MotionEye only stores the custom text while the mode is already `custom-text`, so the adapter always sends both fields together in one request to avoid the text getting silently dropped.
4. **`textScale`** controls the text size (`1`–`10`, matches the slider in the MotionEye UI).

**Presetting overlay text via the admin config (Overlay tab):**

From the next adapter release onwards, the **Overlay** config tab shows one table row per camera (from the Cameras tab) with the same fields as above, plus a **"Apply overlay settings now"** button. This is a one-way street from config to datapoints — the table is never updated automatically from datapoint changes, so it cannot silently revert something you changed live:

- Leave a field empty (or the select on **"— unchanged —"**) to skip it — it never overwrites an existing value.
- **Brand-new camera** (added on the Cameras tab, not yet saved/restarted): filled-in fields become the datapoints' initial value the first time they're created — no extra step needed after the first restart.
- **Camera that already has `overlay.*` datapoints** (the normal case if you're reading this after already using the adapter): filling in the table alone does **nothing** by itself — you must click **"Apply overlay settings now"**. That button applies the table immediately (datapoints + MotionEye), without needing to save the config or restart the instance, and it's safe to use repeatedly, e.g. for setting up several cameras at once.
- Because the config table never reads datapoint changes back, editing a live datapoint later (e.g. via VIS or a script) is never overwritten by the table on the next adapter restart — the table row only matters again if you click "Apply overlay settings now" yourself.

---

### Where are snapshots and videos stored?

**In short:** The **full media archive** (all snapshots, all video clips) lives on the **MotionEye server** — not in ioBroker. Additionally, the adapter can cache the **latest snapshot** per camera in **ioBroker file storage** ( **Snapshots** tab, enabled by default): one JPEG under **Admin → Files**, datapoints `snapshots.*`. There is **no** complete archive in ioBroker — only `lastsnap.jpg`, overwritten on each update.

| What | Where |
|------|-------|
| **Snapshot/video archive** | On the **MotionEye server**, in that camera's media directory (default `/var/lib/motioneye/Camera<N>/`, or a custom folder in MotionEye / the adapter **Media folder** field on the Cameras tab) |
| **`snapshot` datapoint** | Button — tells MotionEye to take a picture; MotionEye saves the file on the MotionEye server |
| **`motion` datapoint** | Boolean event from MotionEye webhook — no image attached |
| **`storage.*` datapoints** | Read-only **counts and occupied space** queried from MotionEye — not the files themselves |
| **`snapshots.*` + Files tab** | **Latest snapshot JPEG** in ioBroker file storage (cache, can be disabled) — `snapshots.filePath` for Telegram/scripts, `snapshots.urlLocal` / `snapshots.html` for VIS |

**To browse or download the archive:** MotionEye web UI (Pictures / Movies per camera) or the MotionEye host filesystem.

Snapshot cache details (VIS, Telegram, Blockly): [Snapshot cache](#snapshot-cache-snapshots) below.

---

### Snapshot cache (`snapshots.*`)

When **Cache latest snapshot in ioBroker** is enabled (`snapshotCacheEnabled`, default on), the adapter downloads MotionEye's `lastsnap.jpg` (symlink to the latest saved snapshot) and stores it under **Admin → Files → `motioneye.<instance>/snapshots/<channel>/lastsnap.jpg`**.

| Trigger | When |
|---------|------|
| **`snapshot` datapoint** | After each successful snapshot action (with configurable delay so MotionEye can write the file) |
| **Motion webhook** | Optional (`snapshotCacheOnMotion`, off by default) — rate-limited per camera |
| **`snapshots.refresh`** | Manual re-download without taking a new snapshot |

**Datapoints for automation / VIS:**

- `snapshots.urlLocal` — full URL for VIS/html widget in the LAN, e.g. `http://192.168.1.10:8082/motioneye.0/snapshots/garten/lastsnap.jpg`
- `snapshots.filePath` — absolute path on disk for Telegram and scripts, e.g. `/opt/iobroker/iobroker-data/files/motioneye.0/snapshots/garten/lastsnap.jpg` (resolved automatically for your host)
- `snapshots.html` — HTML widget binding (same pattern as `streamUrl`)
- `snapshots.lastUpdate` — when the cache was last refreshed

**Telegram:** use `snapshots.filePath` as the **only** message/`text` (Blockly: bind the datapoint alone — do not concatenate text before the path). For a caption under the image, use JavaScript (`caption: '…'`) or two separate Telegram messages. Do **not** use the Admin → Files download URL (`:8081/files/...`) — that returns HTML, not a JPEG.

Requires the **web adapter** (`admin` / port 8082) so the JPEG is served over HTTP for `urlLocal`. Uses **ioBroker host for webhooks** (`webhookHost`) for the LAN URL when set.

Per-camera opt-out: **Snapshots** tab → **Exclude from snapshot cache**.

---

### Telegram notifications (**Notifications** tab)

On **motion webhook** or after a **snapshot update**, the adapter can send Telegram messages automatically — no Blockly/script required.

1. Install the **Telegram adapter** and authenticate users.
2. **Notifications** tab → **Enable Telegram notifications** and add **recipients** (instance usually `0`, Chat ID from the Telegram adapter). Uncheck **Active** to temporarily disable someone.
3. Per camera in the table: **Text before image**, **Send image** / **Timestamp**, **On motion** / **On snapshot** (Yes/No dropdown, default Yes), optional **Recipients** (empty = all active; otherwise name or chat ID).

The adapter sends **up to three separate Telegram messages** (like your Blockly example): pre text → image (`snapshots.filePath`) → post text. Placeholders in texts: `{camera}`, `{channel}`, `{timestamp}`.

On **motion webhook** with **Send image** enabled, the adapter triggers a MotionEye snapshot first, then downloads the JPEG (see [Alert level](/#/docs/adapterref/iobroker.motioneye/alert-level.md#telegram-image-on-motion-notify--full)). The **On snapshot** column only applies to manual `snapshot` / `snapshots.refresh`.

**Test:** **Send test message** button. **Minimum interval per camera** limits flooding during continuous motion.

For custom logic, Blockly/scripts with `snapshots.filePath` still work.

**VIS alert level:** Bind one dropdown to `motioneye.<instance>.<camera>.alertLevel` to control MotionEye mode and Telegram-on-motion together (`off` / `motion` / `notify` / `record` / `full`). Details: [Alert level](/#/docs/adapterref/iobroker.motioneye/alert-level.md).

---

### Storage (`storage.*`)

Since adapter **0.9.0**, `motioneye.<instance>.<camera>.storage.*` reports how many snapshots/video clips are currently stored and how much space they occupy (`snapshotCount`, `videoCount`, `usedSpaceMb`, `lastRefresh`, and the `refresh` trigger).

1. **Why it's not automatic by default:** getting these numbers requires MotionEye to recursively scan the camera's media folder and check every single stored file — for cameras with a large media library (thousands of snapshots/clips) this can take a while and put noticeable load on the MotionEye server. That's why it is **not** part of the regular status poll (`statusPollIntervalSec`).
2. **Manual refresh (always available):** set `storage.refresh` to `true` on the camera you want to update — the adapter fetches the current numbers and resets `refresh` back to `false` when done. This works regardless of the settings below.
3. **Global auto-refresh switch:** on the **Storage** config tab, **Enable storage stats auto-refresh** (`storagePollEnabled`) is off by default. Turn it on and set **the interval in seconds** (`storagePollIntervalSec`, e.g. `3600` for hourly) to refresh cameras automatically on that interval.
4. **Per-camera opt-out:** the same **Storage** tab lists one row per camera with an **Exclude from auto-refresh** checkbox (unchecked by default). Check it for unimportant cameras with large media libraries so they are skipped by the automatic interval — their `storage.refresh` datapoint still works on demand regardless. The tab also has a **"Refresh storage stats now"** button that immediately refreshes every camera in the table (ignoring the checkbox), handy for a one-off update of all cameras without waiting for the interval.
5. **`usedSpaceMb` is an approximation:** MotionEye only reports a pre-rounded size string per file (e.g. `"1.2 MB"`), not exact byte counts, so the total has a small rounding error — accurate enough to see storage trends, not meant as an exact disk-usage report.
6. If a refresh fails (e.g. MotionEye times out on a very large folder), the previous values are kept and the error is written to `status`; try again later or increase **API request timeout** (`requestTimeoutMs`) in Settings.

---

### Test connection (admin UI)

From the GitHub build / version **0.4.2** onwards, **Settings** includes a **Test connection** button. It checks host, port, username, and the **saved** password against `/config/list` — no SSH required.

**Requirements:**

- Adapter instance is **running**
- Settings saved (password must be stored in the instance)

**Steps:**

1. **Settings** → verify host, port `8765`, username, password → **Save**
2. Click **Test connection**
3. Result appears in the admin UI; details (camera count, MotionEye version) are written to the adapter log

| Result | Meaning |
|--------|---------|
| Success | API and credentials are OK — after an instance restart, `_info.connection` should become `true` |
| `unauthorized` | Saved password or username does not match the API — repeat the steps under `unauthorized` |

Optional: **Logs** tab → enable **detailed diagnostic logging** for API paths and HTTP status in the log (no password).

---

### API test via SSH (ioBroker host)

Isolates whether MotionEye accepts the credentials — independent of ioBroker password storage.

**Important:** Run the command on the **ioBroker host** (SSH into the ioBroker VM/LXC), **not** on the Proxmox host or MotionEye LXC. There `node` is often missing (`node: command not found`).

ioBroker ships its own Node — full path:

```bash
/opt/iobroker/node/bin/node -e "const {createMotionEyeApi}=require('/opt/iobroker/node_modules/iobroker.motioneye/lib/motionEyeApi');createMotionEyeApi({host:'192.168.1.10',motionEyePort:8765,username:'admin',password:'YOUR_PASSWORD',requestTimeoutMs:10000,listCacheMs:0}).getCameraList().then(c=>console.log('OK',c.length)).catch(e=>console.error('FAIL',e.message));"
```

Replace `192.168.1.10` and `YOUR_PASSWORD` (type the password manually).

| Output | Meaning |
|--------|---------|
| `OK 1` (or another number) | API + credentials are OK → problem is the **ioBroker instance** (encryption). Delete instance, create anew, type password manually |
| `FAIL unauthorized` | Web login is probably **not** on port **8765** with the same data — check the browser address bar when logging in |

**Docker ioBroker:** Run the command **inside the ioBroker container** (`docker exec -it <iobroker-container> bash`), adjust paths if needed.

---

### Install latest GitHub version

For fixes before the npm release (e.g. **Test connection**, trimming host/username/password):

```bash
cd /opt/iobroker
npm install inventwo/ioBroker.motioneye
iobroker upload motioneye
```

Then restart the adapter instance. The startup log line should show a current Git commit (not an old `#41a69ae` hash).

---

### Log shows `EHOSTUNREACH` or `ECONNREFUSED` (Docker / Unraid)

The ioBroker container cannot reach `motionHost:8765` at the network level — this is **not** a password issue.

**Check:**

1. Test from **inside the ioBroker container**, not from your PC:

   ```bash
   docker exec -it <iobroker-container> sh
   wget -O- http://<motionHost>:8765/ 2>&1 | head
   ```

2. **motionHost** must be the address reachable **from the ioBroker container**:
   - Same Docker custom network → container name (e.g. `motioneye`)
   - Otherwise Unraid/host IP, if routed from the container
   - `192.168.x.x` from a PC browser does not guarantee the container can reach it

3. MotionEye Docker template: port **8765** published?
4. **webhookHost** is separate — MotionEye must reach ioBroker on port **8090** for motion webhooks.

---

### `_info.connection` stays `false`

- Wrong **motionHost** or **motionEyePort** (default 8765)
- Firewall between ioBroker and MotionEye
- MotionEye not running
- Docker/network issue (see above)

---

### No stream image in VIS

1. Set `<camera>.stream` to `true` (or trigger `streamPulse`).
2. HTML widget with binding, e.g. `{motioneye.0.garten.streamUrl}` — use lowercase channel folder name.
3. Wait a few seconds after enabling the stream.
4. **HTTPS VIS + HTTP MotionEye:** browser may block mixed content.

See [Live stream in VIS](/#/docs/adapterref/iobroker.motioneye/vis-stream.md) for step-by-step instructions.

---

### Motion works in ioBroker but not in MotionEye UI (or vice versa)

Leave **Control MotionEye via config API** enabled. The adapter writes mode, webhooks, and stream state to MotionEye. If disabled, ioBroker only receives webhooks and does not sync config.

---

### Where to find detailed logs?

Set the instance log level to **debug**, reproduce the issue, and check **Logs** in ioBroker Admin. Include `_info.connection` and the first error line when asking in the forum.