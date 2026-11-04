![Logo](admin/pi-agent.png)

# ioBroker.pi-agent

![Stable](https://iobroker.live/badges/pi-agent-stable.svg)
[![NPM version](https://img.shields.io/npm/v/iobroker.pi-agent.svg)](https://www.npmjs.com/package/iobroker.pi-agent)
[![Downloads](https://img.shields.io/npm/dm/iobroker.pi-agent.svg)](https://www.npmjs.com/package/iobroker.pi-agent)
[![License](https://img.shields.io/github/license/sadam6752-tech/ioBroker.pi-agent.svg)](LICENSE)

[![NPM](https://nodei.co/npm/iobroker.pi-agent.png?downloads=true)](https://nodei.co/npm/iobroker.pi-agent/)

[![Test and Release](https://github.com/sadam6752-tech/ioBroker.pi-agent/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/sadam6752-tech/ioBroker.pi-agent/actions/workflows/test-and-release.yml)
![Number of Installations](https://iobroker.live/badges/pi-agent-installed.svg)

A language model agent for ioBroker that survives restarts and crashes. It is built on
[Pi Durable](https://earendil.com/posts/pi-durable/): every model call and tool call is stored as a checkpoint
before it runs, so an interrupted request continues after the adapter starts again instead of starting over.

## What it does

- Reads and searches states through the tools `search_objects`, `get_state` (one id or a `*` pattern) and
  `list_instances`. These tools may be repeated safely. Both show type, unit, writable, and where the state has them
  min, max and the allowed values (`common.states`), so the agent writes the value the device expects.
- Finds the states of a room and/or a function as set up in ioBroker (`enum.rooms`, `enum.functions`) with
  `find_states`, e.g. room "Küche" and function "Licht" for "the lights in the kitchen"; `list_rooms` and
  `list_functions` show what exists. Names match in every language of the enum and in part; a member that is a
  device or channel brings the states below it.
- `list_instances` starts from the instance objects and reads `alive` and `connected` of each instance by its exact id.
  A `*` pattern only finds states that have an object, so a stale `alive` value of an instance whose state object is
  gone is missing from a pattern query but not from `list_instances`.
- Logs every tool call as one line: `Tool <name> <arguments> -> <outcome>` (blocked writes as a warning).
- Writes states through `set_state`. This tool is **never repeated** after an interruption: the model is told that the
  call was interrupted and checks the actual value first. A light cannot be switched twice by a restart.
- Writes only to states the **write permissions** allow. Everything else is blocked before it runs.
- Answers each request exactly once. The request id is derived from the triggering state, so a repeated trigger finds the
  original request.

## Requirements

- Node.js 22.19.0 or newer, js-controller 6.0.11 or newer, admin 8.0.0 or newer.
- An API key of the chosen provider: Anthropic, OpenAI, DeepSeek, Google Gemini or OpenRouter, or an OpenAI-compatible server (a
  local one such as Ollama needs no key). Or the system-wide AI settings of admin (System settings, tab "AI"), which
  name provider, model and key once for the whole system.
- The adapter runs as its own process (not in compact mode). It keeps long-running model requests and a conversation
  store open, and its dependencies are large; running it apart keeps a fault or a memory peak away from other adapters.
  The API key is kept in memory of this instance only and is never put into the process environment.

## Configuration

The settings have four tabs: **General**, **Write permissions**, **Messengers** and **Backup** (see below).

| Setting         | Meaning                                                                          |
| --------------- | -------------------------------------------------------------------------------- |
| Key source      | **System-wide AI settings of admin**: provider, model, base URL and key come from the system settings of admin, tab "AI" (object `system.ai`); a change there restarts the instance. **Store the key in the adapter** or **Central credential store**: the settings below. An instance with neither a key nor an OpenAI-compatible server of its own also takes the system-wide settings, so a new instance works without any setting once they are set up. |
| Provider, Model | The language model. The model field lists the models of the chosen provider (the instance must be running for the list); any other model ID can be typed in. Empty: the default of the provider (`claude-sonnet-5-5`, `gpt-6-sol`, `deepseek-flash`, `gemini-3.5-flash`, `anthropic/claude-sonnet-5.5`). |
| Base URL        | Only for **OpenAI-compatible (own URL)**: the endpoint of the server, see below. |
| API key         | **Store the key in the adapter** (the field "API key", stored encrypted) or **Central credential store**: a credential of the central credential store of admin 8, chosen in "API key credential". A changed credential restarts the instance with the new key. |
| Test connection | Asks the model one short question with the values of the form, saved or not, and shows the answer or the error. The instance must be running. |
| Simulation mode (nothing is switched) | On by default. The agent says what it would switch, but no state is written and no instance is restarted. |
| Long-term memory | On by default: the agent keeps facts across all conversations, see below. |
| Write permissions | Table, one row per scope: an instance or object ID (`hm-rpc.0` covers everything below it) or a pattern with `*` (`hm-rpc.0.*.STATE`), with the checkboxes "Write allowed", "Confirmation required" and "Restart allowed" (only for a row with a whole instance, see below). **Add installed instances** adds a row for every installed instance that has none, with nothing allowed yet. The buttons **… all on/off** above the table switch one checkbox column for all rows: when every row has it set, it is cleared, otherwise it is set; "Confirmation required" only in rows where writing is allowed, "Restart allowed" only in rows with a whole instance. Like the import, they change the table only; save it as usual. States that match no row can only be read. |
| Scripts | **The agent may create and change scripts** (off by default), the javascript instance of new scripts, **Also change other scripts** and **Confirm scripts by voice**, see below. |
| Write allowlist, Confirmation required | Under "Advanced": regular expressions, one per line, in addition to the table (the settings of 0.0.5 and earlier keep working). |
| Time zone       | IANA name such as `Europe/Berlin` for reminders, `get_time` and history times, chosen from a list with the current UTC offsets (the instance must be running for the list) or typed in. Empty: the time zone of the ioBroker server. |
| Limits          | **Requests per minute per conversation** (default 10, 0 = no limit) and **Tokens per day** (default 0 = no limit), see "Limits" below. |
| History instance | `history`, `sql` or `influxdb` instance for `get_history`. Empty: the default history of the system settings. |
| Instructions    | Text appended to the system prompt, for example room names and house rules. The agent answers in the language of the question; a language named here (e.g. "Always answer in German.") wins. |
| Messengers      | Table, one row per `telegram` or `max` instance (bot): active, instance, allowed users, prefix. No row: no messenger is used. |
| ↳ Allowed users | User ID, user name or first name (as in the messenger adapter), separated by commas. Messages from anyone else are ignored. |
| ↳ Prefix        | Only messages that start with it go to the agent, e.g. `/ai`. Empty: every message of an allowed user. |

Example of the table "Write permissions":

| Scope                  | Write allowed | Confirmation required |
| ---------------------- | ------------- | --------------------- |
| `hm-rpc.0.Wohnzimmer`  | ✓             |                       |
| `zigbee.0.*.lock`      | ✓             | ✓                     |
| `javascript.0.agent`   | ✓             |                       |

The same as regular expressions under "Advanced":

```
^hm-rpc\.0\.Wohnzimmer\.
^zigbee\.0\..*\.lock$
^javascript\.0\.agent\.
```

Start with simulation mode on, watch the log, and only then switch it off.

## Usage

### Chat in the admin

The menu entry **Pi Agent** on the left side of the admin opens a chat with the agent:

- Every ioBroker user has a conversation of their own; **New conversation** starts over. The old conversation is
  deleted from the store at the next start of the instance, after a safety copy (`pi-agent-prepurge-….sqlite.gz` in the
  backup folder). A conversation with a reminder that is not due yet is deleted after the reminder. The deletion relies
  on the storage schema of Pi Durable; with an unknown schema version (after an update of Pi Durable) nothing is deleted.
- The answer is shown formatted, with the tool calls of the agent above it.
- A write on the "Confirmation required" list is asked in the chat with ✅/❌ buttons.
- A request keeps running when the page is closed; the answer is in the chat when it is opened again.
- Reminders of the conversation appear in the chat (kept until the adapter restarts).
- **Details** (remembered in the browser) shows under every answer the provider, the model, the time, the tokens
  (in, out, cached) and the number of model calls, and for every tool call its arguments, the start of its result and
  its time; a blocked or failed call is red.
- Administrators (group "administrator") choose in the list at the top another conversation: the chats of the
  messengers, of the other admin users and of `sendTo` callers such as ioBroker.assistant (one per room or satellite).
  These are shown read only, and refreshed every few seconds.

### States and scripts

Write a text to `pi-agent.0.chat.input`. The answer appears in `pi-agent.0.chat.answer`. From a script:

```js
sendTo('pi-agent.0', 'ask', { text: 'Is the living room light on?' }, result => log(result.answer));
```

The answer of a `sendTo` request comes back only through the callback (`result.answer`, or `result.error`); it is not
written to `chat.answer`.

Without further fields, all `sendTo` requests share one conversation. A caller that serves several people or rooms
(for example a voice assistant) can give each of them a conversation of its own, with its own history and its own
instructions:

```js
sendTo('pi-agent.0', 'ask', {
    text: 'Is the light on?',
    conversation: 'kitchen', // own conversation of this caller; up to 100 characters
    instructions: 'Answer in one or two short sentences without Markdown; the answer is spoken.', // optional
    requestId: 'kitchen-1730123456789', // optional: a repeated request with the same id is answered once
    language: 'ru', // optional: language of the user, for the questions to confirm (see below)
}, result => log(result.answer));
```

The conversations are kept per sending instance (`pi-agent.0.telegram.chats` lists them as
`sendTo:<instance>/<conversation>`). Changed instructions apply from the next request of the conversation on.

A request can carry pictures; ioBroker.assistant passes on the photos that users send to the Telegram bot this way:

```js
sendTo('pi-agent.0', 'ask', {
    text: 'What is this?', // optional when there are pictures
    images: [{ data: '<base64>', mimeType: 'image/jpeg' }], // a data URL works too
    conversation: 'telegram:Max',
}, result => log(result.answer));
```

- JPEG, PNG, GIF and WebP, at most 4 pictures of up to about 3.9 MB each. The type is taken from the content of the
  picture. Other files and larger pictures are dropped with a warning in the log.
- A model without image input gets a note instead of the picture.
- A picture goes to the model only once, with its own message. The model writes what it shows into notes after its
  answer (`<picture-notes>`, the user does not see them); later questions get these notes instead of the picture. So
  a picture costs its tokens once, and a picture the provider refuses cannot block the conversation.
- The store keeps the newest 20 pictures; older ones are removed at the next start of the instance (their notes
  stay). `chat.pending` keeps only the text.

Such a conversation has no buttons, so by default a write with "Confirmation required", a restart and an update are
blocked there. With **Confirmation by text in sendTo conversations** (tab "Write permissions", off by default) the
agent asks by text instead:

- The question comes back as the answer of the request, followed by `[[LISTEN]]` (ioBroker.assistant opens the
  microphone again), e.g. "Restart the instance telegram.0? Say yes or no.". It is in the `language` the caller sent
  with its last request of the conversation (ioBroker.assistant sends the language its satellites listen in), else in
  the language of the ioBroker system. A satellite that listens in Russian does not understand a German "Ja": its
  speech recognition returns nothing or "Я".
- The next request of the same conversation is the answer. pi-agent checks it itself, not the model: the answer must
  consist of yes words, apart from case and punctuation: "yes" or the word for it in one of the languages of the
  adapter ("ja", "да", "oui"), what people say instead ("okay", "klar", "jawohl", "конечно", "ага") and what speech
  recognition makes of a short "Ja" ("Ya", "Yup"). Polite words may stand next to them ("ja bitte", "да,
  пожалуйста"); the same word twice ("да да", "Ja, ja.") counts too. Any other word makes it a no ("ja, aber erst …",
  a new question), and so do 2 minutes without an answer. Context a caller puts in front, separated by an empty line
  (ioBroker.assistant sends time, weather and presence first), does not count. The log shows what was heard and how
  it was decided.
- The answer of that next request is the result: what the agent says after the action, or the next question.
- By voice anyone in the room can say yes. Only switch it on where that is acceptable.

`pi-agent.0.chat.pending` lists the requests that were accepted but not answered yet. If the adapter stops in the
middle, they continue on the next start. The answer of a request from `chat.input` or `sendTo` is then written to
`chat.answer` (the `sendTo` caller is no longer waiting), the answer of a messenger request goes to its chat. A
`sendTo` caller that was interrupted gets `{ error: "Interrupted by shutdown; the request continues after the next start" }`.

### Confirmation, reminders, history, usage

- **Confirmation:** a write to a state on the "Confirmation required" list is asked in the messenger chat or in the
  admin chat of the conversation with ✅/❌ buttons. Only "Yes" lets it happen; "No", no answer (10 minutes), or a request that did not
  come from a messenger blocks it. The answer is stored with the call, so a restart does not ask twice. In simulation mode nothing is
  written, so nothing is asked.
- **Reminders:** `remind_me` sends a message later (at most 7 days ahead) to the chat of the conversation, or to
  `chat.answer`. The reminder waits in the conversation store and survives restarts.
- **History:** `get_history` reads past values (up to 31 days, averaged to at most 200 values) from the history
  instance.
- **Usage:** `pi-agent.0.usage.*` shows input, output and total tokens and the cost in USD over all conversations
  (the cost needs prices in the model catalog; it can stay 0 for a provider without them), `usage.json` per model,
  `usage.tokensToday` the tokens since midnight in the time zone of the house.

### Limits

Two limits stop a request before the model is asked, so a runaway costs no tokens:

- **Requests per minute per conversation** (default 10): a loop, e.g. a script or another adapter that asks again
  right after every answer, is stopped at the request over the limit. Every conversation counts on its own (a messenger
  chat, a user of the admin chat, a satellite or conversation of a sendTo caller, a background job); a person does not
  reach 10 requests a minute. The refused request gets the error `Too many requests from this conversation (at most 10
  per minute)`, and the log gets one warning per run with the name of the conversation, e.g.
  `sendTo:assistant.0/chat`. Requests continued after a restart do not count.
- **Tokens per day** (default 0 = off): when the tokens since midnight (`usage.tokensToday`) reach the number, every
  request is answered with `The daily token limit (…) is reached; the agent answers again after midnight` until
  midnight, the log gets one warning, and `usage.limitReached` is `true` until the first request after midnight.
  A request that started before the limit is finished, so the day can end a little above it. Answers to ✅/❌
  questions keep working, they need no model.

### Messengers: Telegram and MAX

Add a row to the table "Messengers" with **+**, select a `telegram` or `max` instance, enter the allowed users and,
if the bot also serves other scripts, a prefix such as `/ai`. Then write to the bot: `/ai Is the living room light on?`
Messenger adapters that can only send (e.g. WhatsApp, Signal, Pushover) cannot be used for a chat.

- Several bots can talk to the agent, each with its own users and prefix. Answers, confirmations and reminders go back
  through the bot the request came from.
- Every chat has its own conversation with its own history; `pi-agent.0.telegram.chats` maps `<instance>/<chat id>`
  to them.
- Settings of 0.0.5 and earlier (one instance in single fields) are moved into the table at the first start, which
  restarts the instance once. Existing chats keep their conversation.
- Messages from users who are not on the list are ignored and logged as a warning. An empty list allows nobody.
- A first name such as `Alex` counts only for users the messenger adapter knows (authenticated in the telegram
  adapter, `max.0.users.<id>` in the max adapter), because anybody can choose any first name. Two known users with the same first name are both allowed; use the user name
  or the ID to tell them apart.
- A message that the messenger adapter delivers twice is answered once.
- Long answers are split into several messages.
- **Telegram:** Markdown of the model is sent as Telegram HTML (bold, italic, code, links).
- **MAX** (adapter `max` 0.1.12 or newer): answers are plain text. In a private dialog the answer goes to the user, in
  a group to the group. MAX has no "ask", so a confirmation sends callback buttons; the pressed button comes back as
  `communicate.request`, is answered with `answerCallback` and never reaches the model.

### Voice messages (Telegram and MAX)

The telegram adapter and the max adapter (0.1.13 or newer) save every voice message they receive and write the path
of the file to `<instance>.communicate.pathFile`. With speech recognition set up (tab "Messengers", block "Speech recognition"),
pi-agent turns such a message into text, shows it in the chat (`🎤 «…»`) and answers it like a written one: same
conversation, same confirmations, same limits.

- **Own server:** any server with the transcription API of OpenAI (`POST <url>/audio/transcriptions`), for example
  [speaches](https://github.com/speaches-ai/speaches) (faster-whisper) in Docker. No key is needed, nothing leaves the
  house. Enter the URL (`http://<host>:8000/v1`) and pick one of the models the server has installed. On a CPU,
  `Systran/faster-whisper-small` needs about a third of the length of the speech, `large-v3-turbo` about as long as the
  speech itself but understands more.
- **OpenRouter:** its transcription models, `openai/whisper-large-v3-turbo` when none is chosen. Without a key in this
  block, the OpenRouter key of the agent (provider OpenRouter) or of the system settings of admin (tab "AI") is used.
- **Language:** two letters (`de`, `ru`) or empty. Empty detects the language of every message, which costs a local
  server extra time but understands messages in several languages.
- The column **Voice** of the table chooses the bots that take voice messages; the prefix does not apply to them. Only
  allowed users are heard. An older max adapter does not save voice messages; they are then ignored.
- The text goes to the model as `🎤 <text>`; the instructions of the messenger chats tell it that such a text may contain
  misheard words.
- **Test speech recognition** sends one second of silence with the values of the form: a wrong URL, key or model shows
  up at once.

### DeepSeek

Select **DeepSeek** as provider and enter a key from the DeepSeek platform. Available models: `deepseek-flash`
(default, fast) and `deepseek-v4-pro`. Requests go to `https://api.deepseek.com`.

### OpenRouter

Select **OpenRouter** and enter an OpenRouter key. The model field lists the OpenRouter models that the installed
version knows, with their limits and prices. OpenRouter adds models faster than that list grows: a model ID that is not
listed (e.g. `minimax/minimax-m3.1-flash`) still works through the OpenAI API of OpenRouter. Its prices, context
window, answer length and image input come from the public model list of OpenRouter, read at the start; reasoning stays
off. When the list cannot be read, the model works with the assumptions of an OpenAI-compatible server (context of 128k
tokens, at most 8192 tokens per answer, no cost), and the log says so.

### OpenAI-compatible servers

Select **OpenAI-compatible (own URL)** for any server with the OpenAI chat completions API, local or in the cloud:

| Server     | Base URL                              | API key  |
| ---------- | ------------------------------------- | -------- |
| Ollama     | `http://<host>:11434/v1`              | none     |
| LM Studio  | `http://<host>:1234/v1`               | none     |
| vLLM       | `http://<host>:8000/v1`               | optional |
| Groq       | `https://api.groq.com/openai/v1`      | required |
| OpenRouter | `https://openrouter.ai/api/v1`        | required |

- The model field lists what the server reports at `<base URL>/models`; the model ID is required.
- The model must support tool calling, otherwise the agent can neither read nor write states.
- The adapter does not know the limits of such a model; it assumes a context of 128k tokens and at most 8192 tokens
  per answer, and it reports no cost.

## Security

- The model decides which tools to call. The write permissions and the simulation mode are your protection, not the prompt.
- Scripts the agent writes run with the rights of the javascript adapter: once one runs, the write permissions and
  the simulation mode of pi-agent do not limit it. Read the change before you confirm it (see Scripts).
- The text of your requests and the values the agent reads are sent to the provider. Do not give it access to states
  that contain secrets.
- The conversations are stored unencrypted in the instance data directory (`session.sqlite`, SQLite built into
  Node.js). An installation that still has the JSONL store of version 0.0.1/0.0.2 (folder `session`) switches to
  SQLite at the first start without pending requests; the old folder is renamed to `session.jsonl-<date>` and kept.
  Earlier history is not carried over, and the messenger chats start new conversations.

## Notifications, scheduled writes, diagnostics

- `notify_when` tells the user in the chat of the conversation when a state meets a condition: `==`, `!=`, `>`,
  `<`, `>=`, `<=` or `changes`, optionally for some minutes, e.g. "the washing machine is done" (power below 5 W
  for 3 minutes) or "the window is open for more than 10 minutes". Only values reported by the device (ack=true)
  count, not commands. A watch fires once and ends after 7 days at the latest; at most 20 at a time. The watches are
  kept in `scheduled.watches` and go on after a restart.
- `schedule_set_state` writes a state later ("switch the heater off at 23:00"), at most 7 days ahead. The write
  permissions and the confirmation are checked when it is planned; the permission is checked again when it is due,
  so a permission taken away in the meantime stops it. The user gets a message when it is done. It survives restarts.
- `list_scheduled` shows the reminders, scheduled writes and watches of the conversation, `cancel_scheduled` cancels
  one of them.
- `get_logs` reads the newest lines of the ioBroker log file (filtered by instance, level and a word, at most 50);
  `list_notifications` shows the notifications of ioBroker (the bell in admin). Both only read.
- A message from a conversation of a `sendTo` caller (e.g. ioBroker.assistant) goes to `chat.answer`.

## Background jobs

A background job is a task that runs for days and needs thinking each time, e.g. "while I am away until the 20th,
tell me when a window stays open for 15 minutes while the heating runs, or a Zigbee sensor drops out" or "every morning
at 7, tell me the weather and the low batteries".

- The agent sets it up with `create_job`: a short name, the task in the words of the user, the triggers, how many days
  it runs (at most 30) and where its messages go.
- **Triggers:** a state that meets a condition (`==`, `!=`, `>`, `<`, `>=`, `<=` or `changes`, optionally for some
  minutes; only values of the device count), a time of day (`daily`, local time), or an interval (15 to 1440
  minutes). A state trigger fires when its condition becomes met and again only after the condition broke off.
- **The model is called only when a trigger fires.** The adapter watches the triggers itself; then the job's own
  conversation is woken up with the task, reads what it needs and tells the user, or stays quiet (a false alarm).
  A job that never fires costs nothing.
- **Where it reports:** the chat the job was set up in (default), the admin chat, a messenger chat, or **by voice**:
  the satellite of ioBroker.assistant the job was set up from (`assistant.0.satellites.<id>.tts`), else all of them
  (`assistant.0.tts.text`). Speaking needs **Write allowed** for that state in "Write permissions"; in simulation mode
  nothing is spoken. Set up by voice, the agent asks where to report.
- **Actions only with ✅/❌:** every write, restart, command, update or script change of a job is asked in the
  messenger or admin chat it reports to, also without "Confirmation required". A job that reports only by voice can
  only tell.
- **Limits:** at most 5 jobs and 5 triggers per job. A job woken more than 20 times in one day is paused and says so,
  so a flapping sensor cannot use up the budget; `resume_job` starts it again.
- `list_jobs` shows the jobs (triggers, running or paused, until when, how often they woke up), `stop_job` stops one;
  a job may stop itself when its task is complete ("tell me once when the washing machine is done"). The jobs are kept
  in `scheduled.jobs` and go on after a restart.
- The chat in the admin shows the jobs above the conversation (collapsible): status, triggers, until when, wake-ups
  of today, the last one, where they report, with **Stop** and **Resume**.
- For a single message when something happens, `notify_when` is enough.

## Code mode

With **Code mode** (tab "General", off by default) the agent may answer a question about many states with a short
script instead of one tool call after the other, e.g. "which batteries are below 20 %, by room?":

```js
const rooms = await tools.list_rooms({});
for (const room of rooms.rows) {
    const found = await tools.find_states({ room: room.name, function: 'battery' });
    const low = found.rows.filter(s => s.role === 'value.battery');
    // …
}
```

- The script runs in a QuickJS sandbox (`@earendil-works/pi-codemode`): no files, no network, no timers, only the
  tools of the agent as `tools.<name>(args)`. The read tools give their values as objects. Only what the script
  prints goes to the model, so a question about the whole house takes one model call instead of dozens, with far fewer
  tokens.
- **Every call of a script is a tool call of its own:** the write permissions, the simulation mode and the
  confirmations hold for each one, also in background jobs. A script that switches ten lamps on the "Confirmation
  required" list asks ten times. A blocked call is an error in the script, which the script may handle.
- A script survives a restart of the adapter: it continues where it was, and the calls it made before are not run
  again (a write that was interrupted is reported as interrupted, like outside a script).
- Scripts cannot call models (no classifiers, no image generation). The model decides when a script is worth it; a
  single switch stays a single tool call.
- The tools are described to the model as TypeScript declarations (about 3000 tokens more per request). Works best with
  strong models; with a small one, compare the answers with Code mode off.

> **Code mode saves tokens only on questions with several steps.** A question that one read with a pattern answers
> ("which batteries are below 20 %?") costs a little more with Code mode than without it: on a test system with
> DeepSeek flash 3 model calls instead of 2. A question that combines data, counts or goes through many devices ("where
> is a window open while the light is on, and which batteries are below 20 %?") took 1,646 new input tokens instead
> of 7,972, about 80 % less, and the script did the matching exactly instead of the model. Switch it on when such
> questions are common or the house is large.

## Scheduler fullcalendar

For actions that repeat (every weekday at 7:00), lie more than 7 days ahead, switch something on for a while, or
depend on a condition, the agent uses the adapter [fullcalendar](https://github.com/ioBroker/ioBroker.fullcalendar)
(3.3 or newer) through `send_to`: `addEvent`, `updateEvent`, `deleteEvent`, `listEvents`, `getCalendars`,
`enableCalendar`. The events appear in the calendar and can be changed there. What is planned the agent reads in
`fullcalendar.0.events.today`, `.tomorrow` and `.next`.

- It needs **Write allowed** for `fullcalendar.0` in "Write permissions".
- fullcalendar writes the state of an event by itself, later. So pi-agent checks that state (`oid`) against its own
  write permissions first: an event for a state pi-agent may not write is blocked. For `updateEvent` without `oid`
  the state of the event is looked up. Where the state, or the row of `fullcalendar.0`, has **Confirmation
  required**, the user confirms the event with what and when, e.g. "addEvent: hm-rpc.0.heater.STATE = false, start
  23:00, recurring daily".
- When fullcalendar is not installed, or not allowed, the agent tells the user what is missing and offers what works
  without it (`schedule_set_state` once within 7 days, `notify_when`, `remind_me`). The agent notices an
  installation without a restart.

## Restart of instances

The tool `restart_instance` restarts an adapter instance, e.g. "telegram does not answer, restart it":

- Only instances with **Restart allowed** in the table "Write permissions". The checkbox counts only for a row whose
  scope is a whole instance (`telegram.0`), not for an object ID or a pattern, and never for pi-agent or admin.
  Writing and restarting are allowed separately.
- Every restart is confirmed with ✅/❌ in the chat of the conversation (messenger or admin chat), also without
  "Confirmation required". A `sendTo` caller (e.g. ioBroker.assistant) cannot confirm, so a restart from there is
  blocked, unless "Confirmation by text in sendTo conversations" is on.
- The restart works like the restart button of admin. The agent then waits up to 45 seconds until the instance runs
  again and says so. A switched-off instance is not switched on. In simulation mode nothing is restarted.

## Commands to other adapters

The tool `send_to` sends a command to another adapter and returns its answer, e.g. instance `telegram.0`, command
`send`, message `{"text": "Hello"}`, or a text to speech adapter. The agent uses the command and message the adapter
documents.

- Only to instances whose row in "Write permissions" is the whole instance (`telegram.0`) with **Write allowed**; a
  row for some states of an instance (`telegram.0.communicate.*`) is not enough. Never to pi-agent or admin.
- With **Confirmation required** in that row, every command is confirmed with ✅/❌ in the chat first.
- The agent waits up to 30 seconds for the answer; many adapters do not answer, then the command may still have worked.
  A command is never sent a second time after an interruption. In simulation mode nothing is sent.

## Updates of adapters

With **Allow adapter updates** (tab "Write permissions", off by default) the agent can update adapters, e.g. "are
there updates?" or "update telegram":

- `list_updates` shows the installed adapters with a newer version in the repository chosen in ioBroker (as admin
  shows it), and whether the agent may update them. Asked about npm or the newest versions ("check all updates on
  npm"), it compares every installed adapter with npm in one call, pi-agent included. `check_npm` shows the newest
  version on npm for one adapter; it also finds an adapter by its title (FingerprintDoorbell → `fingerprint`).
- Versions, states and logs read earlier in the conversation are not reused: asked to check again, the agent reads
  them again.
- Only adapters with an instance that has **Write allowed** in the write permissions, and pi-agent itself. Never
  admin or js-controller, and only adapters on the host of pi-agent.
- Every update is confirmed with ✅/❌ in the chat of the conversation, also without "Confirmation required". A
  `sendTo` caller cannot confirm, so an update from there is blocked, unless "Confirmation by text in sendTo
  conversations" is on. In simulation mode nothing is installed.
- The update runs on the host like the update button of admin (`iobroker upgrade`, or `iobroker url` for npm); the
  agent waits up to 10 minutes and reports the result. When pi-agent updates itself it restarts and tells the chat
  afterwards whether the new version runs (state `update.pending` in the meantime).

## Scripts

With **The agent may create and change scripts** (tab "Write permissions", off by default) the agent writes scripts
of the javascript adapter, e.g. "write a script that switches the hall light on at sunset". A script runs with the
rights of the javascript adapter, not of pi-agent: the write permissions and the simulation mode do not reach it once
it runs. So this is meant for users who read the code before they confirm it.

- `list_scripts` and `get_script` read every script. `save_script` creates or changes one, `set_script_enabled`
  starts or stops it, `revert_script` brings back the previous version (each call one version further back; the
  script is stopped afterwards).
- New scripts are JavaScript; TypeScript when you ask for it ("write it in TypeScript"). An existing script keeps its
  language.
- The agent writes only in the folder `script.js.pi-agent`. **Also change other scripts** lets it change the other
  scripts too, global scripts included. Blockly and Rules scripts stay read-only.
- Every save, start, stop and revert is confirmed on its own. The admin chat shows the change line by line; Telegram
  and MAX show it as far as a message allows. The question also lists what pi-agent found in the code: `exec`,
  `require`, file access, object changes, `sendTo`, network calls, and `setState` on states outside the write
  permissions of pi-agent or by a computed id. This search is a hint, not a protection.
- A new script stays stopped until its start is confirmed. A running script restarts with the new code at once; the
  question says so. The syntax is checked before the user is asked; the agent fixes errors first. TypeScript loses its
  types for this check (Node.js `stripTypeScriptTypes`): types are not checked, and `enum` or `namespace` only by the
  compiler of the javascript adapter when the script starts.
- After a start the agent watches the log of the javascript instance for a few seconds and reports errors of the
  script.
- By voice (a `sendTo` conversation such as ioBroker.assistant) scripts are confirmed only with **Confirm scripts by
  voice**, which needs "Confirmation by text in sendTo conversations". The code is not read out: the question names
  the script, says in one sentence what it does (written by the model) and lists what pi-agent found in the code.
- The previous versions (five per script) are kept in the instance data directory and are part of the backups of the
  conversations.

## Long-term memory

A conversation remembers everything said in it, but the conversations do not know each other. Facts that should
count everywhere go into the long-term memory:

- The agent keeps a fact with the tool `remember` when you ask it to ("remember: the lamp in the living room is
  hue.0.lamp3") or when you tell it a lasting preference, and removes it with `forget`.
- All facts go into the instructions of every conversation: messengers, admin chat and `sendTo` callers such as
  ioBroker.assistant. At most 100 facts, 500 characters each and 8,000 characters together.
- The facts are in the state `pi-agent.0.memory.list` (JSON). You can edit it there; the adapter takes the change over.
  `memory.count` shows how many there are. The memory is part of the backups of the conversations.
- The memory is shared by everyone who writes to the agent. Switch it off with "Long-term memory" in the settings.
  Never let it keep passwords or keys; the agent is told not to.

## Backup of the conversations

The conversations are in `session.sqlite` in the instance data directory, which the ioBroker backup does not
contain. The tab **Backup** saves them where it does:

- **Create backup** writes a consistent, gzip-compressed copy of the store, together with the assignment of the
  messenger chats, into the storage folder `pi-agent.0.storage/backups` (admin → **Files**). ioBroker and BackItUp
  backups take this folder along. The agent goes on working while the copy is made.
- **Automatic backup**: daily (default) or weekly, counted from the last backup, also after a restart; a backup that
  is due runs five minutes after the start. "Automatic backups to keep" (default 7) deletes the oldest automatic
  ones; backups made by hand and safety copies are never deleted.
- **Restore** replaces the conversations by the chosen backup and restarts the instance. The current conversations
  are saved first as a safety copy (`pi-agent-prerestore-….sqlite.gz`). Requests that were waiting are dropped.
- **Copy to an external server (SFTP)**: every backup is also copied to another computer, e.g. a NAS, with the SFTP
  protocol itself (no mount, no sudo). The upload is written as `.part` and renamed when it is complete; the
  fingerprint of the server can be pinned. Use a user that may only write into the target directory. The file holds
  the full text of the conversations and is not encrypted on the server.
- **Restore from the external server**, e.g. after a new installation: enter the SFTP settings, switch the copy on,
  save, then choose a backup on the server.

The states `backup.last`, `backup.size`, `backup.lastRemote` and `backup.remoteError` show the last backup and
the last copy.

## Changelog

<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.9.4 (2026-11-04)

- Pictures go to the model only once: the model keeps notes of what a picture shows, later questions get the notes
  instead of the picture. The store keeps the newest 20 pictures, older ones are removed at the start

### 0.9.3 (2026-11-04)

- (@GermanBluefox) Pictures in `ask`: `images: [{ data: <base64>, mimeType }]` (JPEG, PNG, GIF, WebP, at most 4 of up
  to about 3.9 MB) go to the model with the text; a request may consist of pictures only. ioBroker.assistant passes
  on the photos of Telegram this way. The type is taken from the content; other files and larger pictures are dropped
  with a warning, so a picture the model refuses cannot block the conversation. A model without image input gets a
  note instead; `chat.pending` keeps only the text

### 0.9.2 (2026-11-04)

- Telegram: a warning in the log when the telegram instance also hands messages to an assistant instance (since
  telegram 6.1.0 also voice messages) or to text2command, because then every message gets two answers

### 0.9.1 (2026-11-03)

- Confirmation by voice: besides the plain yes word, "okay", "klar", "конечно" and the like count as yes, also with
  "bitte" or "please", and so do "Ya" and "Yup", which Whisper made of a short spoken "Ja". The model no longer tells
  a voice user to press a button

### 0.9.0 (2026-11-03)

- Voice messages: voice messages of Telegram and MAX (max 0.1.13 or newer) are turned into text by a local server with the transcription API of OpenAI
  (e.g. speaches with faster-whisper) or by OpenRouter, shown in the chat and answered like a written message. New
  block "Speech recognition" and column "Voice" on the tab "Messengers"

### 0.8.9 (2026-11-03)

- Updates: `list_updates` with `npm: true` compares every installed adapter with npm in one call, pi-agent included;
  `check_npm` and `update_adapter` also find an adapter by its title. The agent is told to call the tools again when
  asked to check, instead of answering from earlier results of the conversation

### 0.8.8 (2026-11-03)

- Limits: at most 10 requests per minute per conversation (setting) stop a loop of a script or another adapter
  before the model is asked; an optional limit of tokens per day stops all requests until midnight. New states
  `usage.tokensToday` and `usage.limitReached`
- OpenRouter: a model outside the catalog gets its prices, context window and answer length from the public model
  list of OpenRouter, so its cost is counted

Older changelog entries can be found in CHANGELOG_OLD.md.

## License

MIT License

Copyright (c) 2026 Alex <sadam6752@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to
whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.