---
title: Reading the device ID and local key of the WL-433 gateway – beginner's guide
lang: en
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
---
# Reading the device ID and local key of the WL-433 gateway

**Step-by-step guide for beginners – for Android, iPhone and iPad**

As of 21 September 2026 · This guide belongs to the ioBroker adapter **miboxer-wl433**. The source references in
square brackets (e.g. [Q1]) can be found at the end of the guide.

A German version of this guide is available: [Anleitung_Geraete-ID_und_Local-Key_auslesen.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md).

---

## The essentials at a glance

So that ioBroker can control your pool lights via the WL-433 gateway, the adapter needs **two pieces of information**:

| Information | What it looks like | What it is for |
|---|---|---|
| **Device ID** (in the log "devId") | about 20 to 22 characters made of letters and digits, e.g. `bf0123456789abcdefgh` | It tells the adapter *which* device is meant. |
| **Local key** (in some guides also called "token") | **exactly 16 characters**, often with special characters, e.g. `a1B2$c3D4{e5F6g7` | This is the "password" that allows the adapter to talk to the gateway. |

The **device ID** is easy to find (Part A). The **local key** is not shown directly by any app. For the WL-433 the
manufacturer also does not support the Tuya developer platform, through which the key can be retrieved for other
devices [Q3]. But there is a proven way: the MiBoxer app writes both values into its internal log, and this log can be
read along on an **Android device** [Q1].

**Which way suits you?**

| Your equipment | Your way | Effort |
|---|---|---|
| Android smartphone or tablet (Android 11 or newer) | **Part B**, variant without a computer | approx. 30 minutes |
| Android device (Android 7 to 10) and a computer | **Part B**, variant with a computer | approx. 45 minutes |
| Only an iPhone or iPad | **Part C** – easiest with a borrowed Android device, otherwise with an Android emulator on the computer | 30 to 90 minutes |

**The one rule you need to remember:** the local key **changes every time the gateway is paired with the app
again** [Q2]. Therefore set up the gateway completely first (see the guide
[Connect the PW01 pool light to the WL-433 gateway](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md)), read the local key *afterwards* –
and do not pair the gateway again after that. If you do, simply repeat this guide.

---

## 1. Before you start

### 1.1 What you need – checklist

- [ ] **The WL-433 gateway is fully set up**: added in the "MiBoxer" app, connected to the Wi-Fi, the pool lights are
      linked and can be switched via the app.
- [ ] **Your login details for the MiBoxer app** (email address and password). You may use them to sign in on a
      further device.
- [ ] **An Android device** – your own, a borrowed one or an Android emulator on the computer (see Part C).
      LogFox, the app for reading the log, runs on Android 7 and later [Q4].
- [ ] **Only for the variant with a computer:** a Windows PC, Mac or Linux computer and a USB data cable for the
      Android device.
- [ ] **Paper and pen or a notes app** for the two values.
- [ ] **ioBroker with the adapter "miboxer-wl433" installed.**

### 1.2 Important terms – in simple words

| Term | What it means |
|---|---|
| **Log** | An internal "diary" in which apps write in the background what they are doing. Normally nobody sees it. |
| **LogFox** | A free app for Android that can display and search this diary [Q4]. |
| **Developer options** | A hidden menu in the Android settings. It is unlocked with a trick (section 3.1). |
| **Wireless debugging** (also called "debugging over Wi-Fi") | A function in the developer options that allows a helper program to connect to the phone without a cable. |
| **Shizuku** | A free helper app that gives LogFox the required permission – without any computer (Android 11 and later) [Q5]. |
| **ADB** | "Android Debug Bridge", a small program from Google for the computer with which you can send commands to an Android device [Q6]. |
| **Emulator** | A program that reproduces a complete Android phone on the computer. Important for iPhone owners (Part C). |

### 1.3 Safety notes

- **The local key is a password.** Anyone who knows it and is in your Wi-Fi can control your pool lighting.
  Do not publish it, for example in forums or in screenshots – make it unrecognisable there beforehand.
- **Only your own device.** You only read the log of the MiBoxer app on your own device (or on a borrowed device
  signed in with *your* account).
- **Clean up when you are done.** LogFox can read the log of *all* apps. Afterwards switch the developer options off
  again and remove LogFox and Shizuku when you no longer need them (Part E).

---

## 2. Part A – Finding the device ID (all devices, including iPhone)

The MiBoxer app does **not** display the device ID – there is no menu item "Device information" as some other
Tuya apps have. You can still get the device ID in two ways:

- **together with the local key** from the log (Part B or C) – it is right next to it there, or
- **in advance with the search button of the adapter** in ioBroker, without any phone. This also lets you check later
  whether you picked the right entry in the log.

**How the search with the adapter works:** the gateway regularly announces itself in your home network on its own, and
the adapter listens for these announcements.

1. To be on the safe side, close the **MiBoxer app on all phones** in the Wi-Fi. As long as an app is connected directly
   to the gateway, it may not announce itself in the network.
2. In ioBroker, open **Instances → miboxer-wl433.0 → settings** (spanner symbol). The instance must be
   running – even if it is not fully set up yet and therefore does not light up green.
3. Leave the field "Device ID" **empty** and click **"Search gateway in the local network"**.
4. After up to 12 seconds a list of all Tuya devices in your network appears, each in the form
   `device ID @ IP address (protocol version)`, for example `bf0123456789abcdefgh @ 192.168.178.45 (3.3)`.
5. **Which entry is the gateway?**
   - If only one device is in the list, it is the gateway.
   - If several devices are listed (e.g. because you own further Wi-Fi sockets or lamps from Tuya brands), there is
     a simple trick: briefly pull the **power plug of the gateway**, wait about 30 seconds and search
     again. **The entry that is now missing is the gateway.** Plug it back in afterwards – after about one
     minute it is back in the Wi-Fi.
6. Write down or copy the device ID.

If no device is found at all, gateway and ioBroker are probably in different networks (e.g. guest Wi-Fi
or separated network segments). Then you will get the device ID in Part B or C together with the local key.

---

## 3. Part B – Reading the local key with an Android device

This part is the core of the guide. It consists of four steps: unlock the developer options, install LogFox,
give LogFox the read permission, read the values.

### 3.1 Unlocking the developer options

1. Open the **Settings** of your Android device.
2. Look for the **Build number**:
   - on Google Pixel and many others: **About phone → Build number**,
   - on Samsung: **About phone → Software information → Build number**.
   Tip: the search function at the top of the settings finds "Build number" directly.
3. Tap the build number **seven times in quick succession**. You may have to enter your screen lock
   (PIN). The message **"You are now a developer!"** (or similar) appears.
4. You will now find the **Developer options** under **Settings → System → Developer options** (Samsung: at the very
   bottom of the settings).
5. Switch on **"USB debugging"** there.

### 3.2 Installing LogFox

LogFox is free and open source and is distributed via **F-Droid** [Q4]:

1. On the Android device, open the page **f-droid.org/packages/com.f0x1d.logfox** in the browser.
2. Tap **"Download APK"**.
3. Open the downloaded file. Android asks whether the browser may install apps: allow this
   (**"Allow from this source"**) and tap **"Install"**.

LogFox is only available in English. The few terms you need are explained below where they occur.

### 3.3 Giving LogFox the read permission

Android only allows an app to read the logs of other apps with a special permission. You grant it
**once** in one of two ways.

#### Variant without a computer (Android 11 and later) – with Shizuku

1. Install the app **"Shizuku"** from the **Google Play Store** [Q5].
2. Connect the Android device to your **Wi-Fi** (mandatory for this way).
3. Open **Settings → System → Developer options** and switch on **"Wireless debugging"** (depending on the
   manufacturer it may also be called "Debugging over Wi-Fi"). Confirm the prompt with
   **"Allow"**.
4. Open **Shizuku**. In the section "Start via Wireless debugging", tap **"Pairing"**. Shizuku now shows a
   **notification**.
5. Switch back to **Wireless debugging** and tap **"Pair device with pairing code"**. A
   **six-digit code** appears.
6. Pull down the notification shade and enter the code **in the Shizuku notification**.
   The message "Pairing successful" appears.
7. Go back to the Shizuku app and tap **"Start"**. At the top it now shows that Shizuku is running
   ("Shizuku is running").
8. Open **LogFox**. On the first start the setup page **"Setup"** appears. Tap **"Shizuku"**
   and confirm Shizuku's prompt with **"Allow"**.

Important: after a **restart of the phone**, Shizuku is off again and must be started again with step 7 [Q5].
This only affects you if you repeat the procedure later.

**Good to know:** if the permission was granted successfully, **LogFox closes briefly and restarts**. This is intended
and not a crash – afterwards LogFox shows the log lines directly.

#### If LogFox reports "Error using Shizuku"

LogFox shows this message in three cases [Q4]. Check them one after the other and then tap
**"Setup" → "Shizuku"** in LogFox again:

1. **Shizuku is not running.** Open the Shizuku app: at the top it must say that Shizuku is running ("Shizuku is
   running"). If not: check that the phone is in the Wi-Fi and that **Wireless debugging** is switched on, and
   tap **"Start"** in Shizuku. This is necessary again after every restart of the phone [Q5].
2. **LogFox is not authorised in Shizuku.** If you once declined or overlooked Shizuku's prompt,
   LogFox does **not ask again**. In Shizuku, open the item **"Authorized applications"** and switch on
   **LogFox**.
3. **Your phone blocks the granting of permissions.** Some manufacturers require an additional setting in the
   **Developer options** [Q5]:
   - **Xiaomi, Redmi, POCO:** in addition to "USB debugging", also switch on **"USB debugging (Security options)"**
     (this is a separate switch). For this, Xiaomi usually requires an inserted SIM card and a signed-in Xiaomi
     account. Also set the notification shade style to "Android" under Settings → Notifications, otherwise pairing
     fails.
   - **OPPO, OnePlus, realme:** switch on **"Disable permission monitoring"**.
   - **Huawei:** switch on "Allow ADB debugging options in ‚Charge only‘ mode".
   - **Meizu:** switch off "Flyme payment protection".

If Shizuku already hangs while pairing ("Searching for pairing service …"), allow Shizuku in the app settings **to run
in the background** (switch off battery optimisation for Shizuku) [Q5].

If it still does not work, use the **variant with a computer** (next section). However, you will need the
manufacturer-specific switches from point 3 there as well.

#### Variant with a computer (all Android versions) – with ADB

1. On the computer, download the **"SDK Platform-Tools"** from Google
   (developer.android.com/tools/releases/platform-tools) and unpack the ZIP file, e.g. to
   `C:\platform-tools` [Q6].
2. Connect the Android device to the computer with a **USB cable**. The phone shows **"Allow USB
   debugging?"** – tick "Always allow from this computer" and tap **"Allow"**.
3. On the computer, open a command window in the unpacked folder:
   - **Windows:** open the folder `platform-tools` in Explorer, type `cmd` into the address bar at the top, press Enter.
   - **Mac / Linux:** open Terminal and enter `cd` followed by the folder path.
4. Type this command and press Enter (Mac/Linux: `./adb` instead of `adb`):

   ```text
   adb shell pm grant com.f0x1d.logfox android.permission.READ_LOGS
   ```

   If no error message appears, it worked. By the way, LogFox shows the same command under **"Setup" → "ADB"** [Q4].
5. Close LogFox completely (swipe it away in the app overview) and open it again.

Note for Android 13 and newer: Google has restricted access via this way. LogFox then shows the log
only for **a few minutes**; after that, restart the recording [Q4]. In addition, Android may ask whether LogFox
may **"access all device logs"** – choose **"Allow one-time access"** [Q7]. So work through
section 3.4 quickly.

### 3.4 Reading the device ID and local key

1. **Close the MiBoxer app completely** (open the app overview, swipe MiBoxer up and away).
2. Open **LogFox**. Log lines are now scrolling through at the top. If it says "Recording paused",
   tap **"Resume"**.
3. Open the **MiBoxer app**, sign in if necessary and tap your **WL-433 gateway**. Switch the light
   **off and on again once**. In doing so, the app writes the values you are looking for into its log [Q1].
4. Switch back to **LogFox** and tap the **magnifying glass** ("Search"). Enter exactly
   **`localKey`** as the search term.
5. You will now see one or more lines that look roughly like this (values made up here):

   ```text
   ..."devId":"bf0123456789abcdefgh", ... "localKey":"a1B2$c3D4{e5F6g7", ... "name":"WL-433", ...
   ```

   - The text **between the quotation marks after `"devId":`** is the **device ID**.
   - The text **between the quotation marks after `"localKey":`** is the **local key**.
   - If several devices are listed (because you have further Tuya or MiBoxer devices), take the line whose
     `"name"` matches the name of your gateway in the app. Compare the device ID with the search result from Part A.
6. **Copy instead of writing down:** long-tap the line and choose **"Extended copy"** to mark and copy exactly the
   part you want. LogFox reports **"Text copied"**. Paste the text into a
   notes app. Writing it down by hand easily leads to mistakes (`l` / `1` / `I`, `O` / `0`).
7. **Check the values:**
   - The local key has **exactly 16 characters**. Special characters such as `$ { ' < |` are part of it – take over
     everything exactly, but **without** the surrounding quotation marks.
   - If the local key contains a **slash preceded by a backslash** (`\/`) or a backslash before a
     quotation mark (`\"`), the backslash is only a notation of the log: take over only `/` or `"` respectively.

If the search finds nothing, read section 7 ("Frequently asked questions").

---

## 4. Part C – You only have an iPhone or iPad

**Why does it not work directly on the iPhone?** Apple does not allow any app on the iPhone or iPad to read the logs of
other apps. Therefore there is no iPhone version of LogFox, and there cannot be one.

**The good news:** the local key belongs to the **gateway**, not to your phone. It is stored in your MiBoxer account
and is transferred to *every* device on which you sign in with this account. So it is enough to
**temporarily use any Android device** – your iPhone remains unchanged, and the gateway does **not** have to be paired
again for this.

You can find the device ID independently of the phone with the search button of the adapter (Part A).

### 4.1 The easiest way: borrow an Android device

Any Android smartphone or tablet with Android 7 or later will do, even an old device from the drawer or the phone of a
family member.

1. Install the app **"MiBoxer"** from the Google Play Store on the Android device.
2. Sign in with **your** MiBoxer account (the same email address and the same password as on the iPhone).
   Your gateway appears automatically in the device list. **Do not add the gateway again and do not remove
   it** – otherwise the local key changes [Q2].
3. Work through **Part B** completely.
4. Afterwards, sign out of the MiBoxer app on the borrowed device (in Tuya-based apps usually under **"Me" →
   Settings → "Log out"**) and uninstall MiBoxer, LogFox and Shizuku again. Your gateway and your iPhone remain unaffected.

### 4.2 Without an Android device: Android emulator on the computer

With an **emulator**, a complete Android system runs in a window on your Windows PC or Mac. For this you need
a computer with at least 8 GB of RAM and a Google account for the Play Store.

**Honest note:** this way is technically sound, but has not yet been tried with the MiBoxer app. If the
app is not offered in the emulator's Play Store or does not start, way 4.1 remains.

**Step 1 – Install Android Studio** (free, from Google, for Windows, Mac and Linux) [Q8]:

1. Download **Android Studio** from developer.android.com/studio and install it with the
   suggested settings ("Standard"). The installation downloads several gigabytes.
2. In the start window, click **"More Actions" → "Virtual Device Manager"**.
3. Click **"+" (Create Virtual Device)**, choose a phone **with a Play Store symbol** in the column
   "Play Store" (e.g. "Pixel 8") and click **"Next"**.
4. Choose the recommended system image (**"Google Play"** must be in the name), download it with the download arrow
   and click **"Finish"**.
5. Start the virtual device with the **play symbol** ▶. After a minute an Android phone appears in the window.

**Step 2 – MiBoxer app in the emulator:**

1. In the emulator, open the **Play Store**, sign in with a Google account and install
   **"MiBoxer"**.
2. Sign in to the MiBoxer app with **your** MiBoxer account. The gateway appears in the list – **do not add it
   again, do not remove it**.

**Step 3 – Read the log:** in the emulator you need neither LogFox nor Shizuku, because the log can be
read directly on the computer:

1. Open a command window (Windows: Start menu → `cmd`; Mac: the "Terminal" app) and change to the folder
   containing the program `adb`. Android Studio has already installed it:
   - **Windows:** `cd %LOCALAPPDATA%\Android\Sdk\platform-tools`
   - **Mac:** `cd ~/Library/Android/sdk/platform-tools`
2. Start the filtered log output:
   - **Windows:** `adb logcat | findstr /i "localKey"`
   - **Mac:** `./adb logcat | grep -i "localKey"`
3. In the emulator, tap the gateway in the MiBoxer app and switch the light off and on once.
4. Lines like those in section 3.4, step 5 appear in the command window. Evaluate them in the same way (steps 5 to 7).
   You can copy by marking the text with the mouse (Windows: then right-click or Enter).
5. Stop the output with **Ctrl + C** (Mac: **control + C**). Sign out of the MiBoxer app in the emulator.

Alternative for Windows: instead of Android Studio, the free emulator **BlueStacks 5** also works. There you switch
on access under **Settings → Advanced → "Android Debug Bridge"** and connect with
`adb connect 127.0.0.1:5555` (BlueStacks shows the port number; it may change after every restart) [Q9].
Then continue above with "Step 3 – Read the log", point 2.

### 4.3 Only for Mac owners: attempt with Console (no guarantee)

On a Mac, the **"Console"** app can display the logs of an iPhone connected by cable [Q10].
**Whether the iPhone version of the MiBoxer app outputs the local key there is not known** – the proven report only
concerns Android [Q1]. But an attempt only takes ten minutes:

1. Connect the iPhone to the Mac with a cable and tap **"Trust"** on the iPhone.
2. On the Mac, open **Applications → Utilities → Console**.
3. On the left under "Devices", select your **iPhone**. In the **"Action"** menu, activate the items
   **"Include Info Messages"** and **"Include Debug Messages"**.
4. Enter **`localKey`** in the search field at the top right and click **"Start streaming"** ("Start").
5. On the iPhone, open the MiBoxer app, tap the gateway and switch the light off and on.
6. If a line with `"localKey"` appears, evaluate it as in section 3.4. If nothing appears or only
   `<private>`, the iPhone app does not reveal the key – then use way 4.1 or 4.2.

---

## 5. Part D – Entering and checking the values in ioBroker

1. In ioBroker, open **Instances → miboxer-wl433.0 → settings** (spanner symbol).
2. Enter the **Device ID** and the **Local key**. Make sure that no spaces at the beginning or end are included
   when pasting.
3. Click **"Search gateway in the local network"**. If the gateway is found, the adapter enters the
   **IP address** and **protocol version** itself. Alternatively, leave the IP field empty – then the adapter searches
   by itself at every start. The protocol version for the WL-433 is **3.3**.
4. Click **"Save and close"**.
5. **Close the MiBoxer app** on all phones that are in the same Wi-Fi. Tuya devices only allow **one** local
   connection at a time – if the app is open in the home network, the adapter does not get its turn.
6. **Check:** the symbol of the instance turns **green**. Under **Objects → miboxer-wl433.0 → info → connection** it says
   **true**. As a test, toggle **light.on** – the pool lights react.

**What to do if it does not work?** The adapter writes hints into the ioBroker **Log**:

| Message in the log | Meaning | Solution |
|---|---|---|
| "The local key must have exactly 16 characters (configured: …)" | Characters were lost or added while copying (e.g. quotation marks, spaces). | Take over the local key again exactly (section 3.4, step 7). |
| "Gateway sent data that could not be decoded …" | The local key is wrong or outdated (the gateway was paired again). | Read the local key again. Check protocol version 3.3. |
| "Cannot keep a connection to the WL-433 gateway …" | The gateway does not let the adapter in – usually the MiBoxer app is open in the home network, or the IP address is wrong. | Close the app on all phones, stop other Tuya integrations for this device, check the IP address. |
| "Gateway … did not announce itself in the local network" | The automatic search did not find the gateway. | Look up the IP address in the router and enter it in the field "IP address of the gateway". Gateway and ioBroker must be in the same network. |

---

## 6. Part E – Cleaning up

- **Switch off the developer options:** Settings → System → Developer options → switch at the very top to **Off**.
  This also switches USB debugging and Wireless debugging off again.
- **Uninstall LogFox and Shizuku** when you no longer need them.
- **Emulator:** sign out of the MiBoxer app in the emulator. You can delete the virtual device in the Virtual Device
  Manager.
- **Keep the values safe**, ideally in a password manager. You will need them again when you set up ioBroker
  again.
- **Remember:** after every new pairing of the gateway (Wi-Fi set up again, gateway removed from the app and
  added again) a **new local key** is due [Q2] – then repeat this guide.

---

## 7. Frequently asked questions

**LogFox finds nothing when searching for `localKey`. What now?**
Check one after the other: (1) Was the recording running while you opened the MiBoxer app? Close the app
completely and open it again while LogFox is reading along. (2) Also search for `devId`, `localkey` or
`local_key`. (3) With the ADB variant on Android 13 and later: the recording only runs for a few minutes – restart it
in LogFox and open the MiBoxer app immediately afterwards. (4) The way was described in June 2025 by a user with
exactly this gateway [Q1]. It is possible that a newer version of the MiBoxer app has removed this output.

**Can't I simply ask the manufacturer or Tuya for the local key?**
Unfortunately not. The manufacturer states explicitly that the WL-433 cannot be set up on the Tuya developer platform
[Q3]; a user has confirmed this [Q1].

**Do I have to use the app "MiBoxer" or "MiBoxer Smart"?**
Use the app in which your gateway is set up – according to the WL-433 manual this is the app "MiBoxer".

**May I still use the MiBoxer app afterwards?**
Yes. Problems can only occur **at the same time in the same Wi-Fi**, because the gateway only allows one local
connection. When you are out and about on the mobile network, the app talks to the gateway via the cloud – this should
not disturb the adapter.

**Does the local key change by itself?**
No, only when the gateway is paired with the app again [Q2]. A power failure or a restart of the gateway does not
change it.

---

## Sources

- **[Q1]** GitHub, jasonacox/tinytuya, discussion #623 "MiBoxer WL-433 Gateway DPs questions and some info" (user
  "Silverstar", 04.06.2025): "the app freely tells me the device id and local key and some DP data when logging its debug
  output (with LogFox on android)"; "this device cannot be used with the tuya cloud platform".
  https://github.com/jasonacox/tinytuya/discussions/623
- **[Q2]** TinyTuya, README: "The Local_Key for Tuya devices will change every time a device is removed and re-added to
  the TuyaSmart app." https://github.com/jasonacox/tinytuya
- **[Q3]** MiBoxer, FAQ and official forum (25.03.2025): "Attention！ 1. WL-Box1 WL-433 can not be set up."
  https://miboxer.com/faq ·
  https://forum.miboxer.com/t/does-miboxer-wi-fi-and-zigbee-series-support-home-assistant-homebridge/29
- **[Q4]** LogFox (F0x1d), F-Droid page (version 2.1.10, "Android 7.0 or newer", "Shizuku, Root & ADB support") and
  source code (ADB command `adb shell pm grant com.f0x1d.logfox android.permission.READ_LOGS`; note "Since Android 13
  Google has limited logcat access via ADB. You will be able to see logs only for several minutes").
  https://f-droid.org/packages/com.f0x1d.logfox/ · https://github.com/F0x1d/LogFox
- **[Q5]** Shizuku, user manual "Setup": start via Wireless debugging from Android 11, pairing with pairing code,
  "the startup steps need to be performed again after each reboot". https://shizuku.rikka.app/guide/setup/ ·
  Google Play: https://play.google.com/store/apps/details?id=moe.shizuku.privileged.api
- **[Q6]** Android Developers: "SDK Platform Tools release notes" (download ADB).
  https://developer.android.com/tools/releases/platform-tools
- **[Q7]** Google, Android Help: "Manage your device logs" (one-time access to all device logs from
  Android 13). https://support.google.com/android/answer/12986432
- **[Q8]** Android Developers: "Download Android Studio" and "Create and manage virtual devices".
  https://developer.android.com/studio · https://developer.android.com/studio/run/managing-avds
- **[Q9]** BlueStacks Support: "How to enable Android Debug Bridge on BlueStacks 5".
  https://support.bluestacks.com/hc/en-us/articles/23925869130381-How-to-enable-Android-Debug-Bridge-on-BlueStacks-5
- **[Q10]** Apple, Console User Guide: view log messages of a connected device.
  https://support.apple.com/guide/console/cnsl1012/mac
- Background on the protocol (German): [Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md),
  section 3.1.4.