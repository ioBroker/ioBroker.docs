![WebUntis2](docs/webuntis2-readme-banner.png)

# ioBroker.webuntis2

[![NPM version](https://img.shields.io/npm/v/iobroker.webuntis2.svg)](https://www.npmjs.com/package/iobroker.webuntis2)

WebUntis2 connects ioBroker with WebUntis. It retrieves timetables for a
student or family account and makes them available in ioBroker for
visualizations, notifications, and automations.

## What the adapter provides

- School search by school name, city, or address
- Simple school selection during setup
- Secure username and password configuration
- A connection test before saving
- Timetables for today, tomorrow, and the current week
- Lesson details such as subject, teacher, room, class, time, and status, with available long names in additional states
- Information about changes, substitutions, and cancelled lessons
- Daily summaries with lesson counts, school times, subjects, and changes
- Current and next lesson information, including the remaining time
- Current and upcoming school holidays
- Upcoming exams, including subject, date, and start and end times
- Timetables, holidays, inbox messages, and exams refresh every five minutes
- Current and next lesson values refresh every minute

## Installation and setup

1. Install **WebUntis2** from the ioBroker adapter list.
2. Create a new `webuntis2` instance.
3. Search for your school by entering part of its name or a city.
4. Select the matching school from the results.
5. Enter the WebUntis username and password.
6. Use **Test connection** and save the settings.

The adapter stores the selected school together with the information required
for the connection. No server address needs to be entered manually when it is
provided by the school search.

## Admin configuration interface

The adapter uses a React-based Admin interface because setup includes two
interactive operations: searching WebUntis schools from a user-entered query
and displaying the returned schools for selection, and testing the entered
credentials against the selected school before saving. Both operations call
the adapter asynchronously and need to show loading, empty-result, and error
states in the same form. The standard `jsonConfig` controls do not provide
this complete query-and-result workflow on their own; reproducing it there
would require a custom component or equivalent custom UI code. React keeps
these setup interactions together while the adapter remains responsible for
WebUntis requests and validation.

## Data in ioBroker

The instance tree has four top-level channels: `students`, `holidays`, `inbox`,
and `info`. The adapter reads the account type from WebUntis automatically and
reports it in the `info.accountType` state as `Student`, `Parent`, or `Other`.

Each student has a channel below `students.<name>`. The channel ID is
based on the student's name, normalized for ioBroker IDs; duplicate normalized
names are disambiguated with the WebUntis student ID. If WebUntis provides no
student name, the ID is used as a fallback. Timetables are available at
`students.<name>.timetable.today`,
`students.<name>.timetable.tomorrow`, and
`students.<name>.timetable.week`. Each lesson contains readable values
for the subject, teacher, room, class, start and end time, and lesson status.
Lesson `startTime` and `endTime` are strings with the `time` role.

Daily summaries show whether there is school, the number and duration of
lessons, the first and last lesson, the subjects in timetable order, and
changes or cancellations. Each day channel also contains a `lessonComparison`
JSON array with the lesson number, original and actual subject, teacher, room,
and status. The lesson number reflects the position in the daily list. Original
and actual start/end times are currently identical. The `info` section contains
connection status, account type, and update information. Holiday information
is available below `holidays`.

For a WebUntis parent account, WebUntis supplies each linked student's ID and
name; the adapter creates the same `students.<name>` structure
automatically. Each student's timetable includes lesson details, daily
summaries, and current/next lesson values. Exams are available under
`students.<name>.exams`, including a JSON array and numbered entry
channels. Holidays and messages remain account-level data because WebUntis does
not associate those responses with an individual student.

Messages are available below `inbox.messages.unread` and
`inbox.messages.read`. Each message has a numbered channel ordered by its
arrival time. `inbox.messages.unread.unreadCount` gives the unread message
count, and `inbox.messages.unread.unread` contains a JSON array of unread
messages. `inbox.messages.read.count` gives the number of read message
channels. Message channels include the date/time, sender, subject, content, and
an attachment indicator. The adapter retrieves full content when the WebUntis
endpoint permits it and otherwise uses the available preview; the
`contentIsPreview` property distinguishes the two.

The `info.refresh` button runs the complete startup refresh immediately:
timetable, messages, exams, holidays, cleanup, and derived current/next lesson
states.

Upcoming exams are available below each student's `exams` channel.
`students.<name>.exams.count` gives the number of exams announced in the
requested date window, `students.<name>.exams.upcoming` contains a JSON
array, and `students.<name>.exams.upcomingText` joins the display text
for that student's exams with newlines. Each exam also has a sequentially
numbered channel such as `students.<name>.exams.entries.01` or
`students.<name>.exams.entries.02`. Exams are ordered by date, start time,
then WebUntis ID, so multiple exams on the same date or in the same subject
remain separate. The channel numbers can change when the ordered exam list
changes; use the `id` field to identify an exam across updates. The array
contains the following fields:

```json
[
	{
		"id": 4102,
		"displayText": "05.11.2026 · 08:00–09:30 · Mathematik · Kapitel 4, Aufgaben 1–6"
	},
	{
		"subject": "Englisch",
		"date": "2026-11-05",
		"startTime": "10:00",
		"text": "Unit 3",
		"displayText": "05.11.2026 · 10:00–10:45 · Englisch · Unit 3"
	}
]
```

The individual `entries.<NN>` channels expose `id` as a number.
Availability depends on the WebUntis account's school permissions and API
scope. A failed or forbidden request leaves the last successful exam data in
place; a successful response with no exams clears stale entries. Exam data
does not include grades or student personal details. If the cookie-authenticated
exam request is forbidden, the adapter retries it once with its REST token.
For parent accounts, the adapter loads the linked students from WebUntis app
data and reads each student's timetable, so identical exams remain separate
and are attributed to the correct child. School permissions can still deny
access to one or more child timetables; a failed refresh preserves the last
successful data.

## Requirements and notes

- Node.js 24 or newer, js-controller 7.2.2 or newer, and Admin 8.2.0 or newer are required.
- A WebUntis account with access to the selected school is required.
- Username-and-password login is supported.
- QR-code, Microsoft 365, SAML, and OAuth login are not supported.
- Homework is not provided.
- [WebUntis](https://webuntis.com/) is an external service. This project is
  independent and is not affiliated with Untis GmbH.

## Privacy and security

The password is stored using ioBroker's protected configuration mechanism.
Credentials, cookies, and session information are not shown in logs or
published as states. Do not share login details in issues or support requests.

## Support

If the connection does not work, check the selected school and WebUntis login
in a browser first. Then run the connection test in the adapter configuration
and include only relevant, non-sensitive log messages when asking for help.

[![Donate](https://camo.githubusercontent.com/ef8c60305542390406855547e32850909812a73c4abada236de22a6dc88b313f/68747470733a2f2f7777772e70617970616c6f626a656374732e636f6d2f64655f44452f44452f692f62746e2f62746e5f646f6e61746543435f4c472e676966)](https://www.paypal.com/donate/?hosted_button_id=3RJQGSJNRSHUJ)

## Changelog
### 0.2.0 (2026-10-25)

- (Voodoo2man) Raised the minimum Node.js, js-controller, and Admin requirements.
- (Voodoo2man) Added the Ukrainian Admin translation.
- (Voodoo2man) Added multi Student support and structure.
- (Voodoo2man) Added upcoming exams
- (Voodoo2man) Added read and unread inbox messages
- (Voodoo2man) Added a manual full refresh button
- (Voodoo2man) Improved timetable details
- (Voodoo2man) Removed duplicate date states.

### 0.1.10 (2026-10-18)

- (Voodoo2man) Improved configuration feedback, holiday names, and connection status; reduced routine login log messages; verified Node.js 26 compatibility; and migrated Dependabot auto-merging to the `pull_request` event.

### 0.1.9 (2026-10-15)

- (Voodoo2man) Improved timetable data and reliability with comparisons, long names, and automatic re-authentication for expired sessions
- (Voodoo2man) Added an inbox for unread messages.

### 0.1.8 (2026-10-14)

- (Voodoo2man) Updated dynamic lesson names, migrated metadata for existing objects, and repaired legacy i18n names.

### 0.1.7 (2026-10-14)

- (Voodoo2man) Improved ioBroker compliance, multilingual object names, shutdown handling, and state updates.
- (Voodoo2man) Added regression tests and removed the historical object dump containing adapter data.

For earlier releases, see CHANGELOG_OLD.md.

## License

Copyright (c) 2026 Voodoo2man <Voodoo2man@outlook.de>

MIT License. See [LICENSE](https://github.com/Voodoo2man/ioBroker.webuntis2/blob/main/LICENSE).