---
title: Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide
lang: en
chapters: {"pages":{"en/adapterref/iobroker.miboxer-wl433/README.md":{"title":{"en":"ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/README.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md":{"title":{"en":"User manual ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md":{"title":{"en":"Handbuch ioBroker.miboxer-wl433"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Handbuch_miboxer-wl433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md":{"title":{"en":"Miboxer WL-433 + PW01 – Lokale Steuerung ohne Cloud, Protokollanalyse und ioBroker-Integration"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Miboxer_WL-433_PW01_Protokollanalyse_lokale_Steuerung.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md":{"title":{"en":"Connecting the PW01 pool light to the WL-433 gateway – Beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_connect_PW01_to_WL-433.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md":{"title":{"en":"Reading the device ID and local key of the WL-433 gateway – beginner's guide"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md"},"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md":{"title":{"en":"Geräte-ID und Local Key des Gateways WL-433 auslesen – Einsteigeranleitung"},"content":"en/adapterref/iobroker.miboxer-wl433/doc/Anleitung_Geraete-ID_und_Local-Key_auslesen.md"}}}
---
# Connecting the MiBoxer PW01 pool light to the WL-433 gateway

**Step-by-step guide for beginners – no technical knowledge required**

As of 21 September 2026 · Based on: the official MiBoxer manuals for the WL-433 gateway (version V1.0.1), the PW01/PW02
pool light (V1.0, German) and the FUT086 remote control (V1.0, German). The source references in square brackets
(e.g. [Q1]) are listed at the end of this guide.

A German version of this guide is available as PDF: [Anleitung_PW01_mit_WL-433_verbinden.pdf](https://github.com/ssbingo/ioBroker.miboxer-wl433/blob/main/doc/Anleitung_PW01_mit_WL-433_verbinden.pdf).

This guide belongs to the ioBroker adapter **miboxer-wl433**. Once the pool light works in the app, continue with the
[adapter manual](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Manual_miboxer-wl433.md) and the guide
[Reading the device ID and local key of the WL-433 gateway](/#/docs/adapterref/iobroker.miboxer-wl433/doc/Guide_device-ID_and_local-key.md).

> [!NOTE]
> English quotations from the manufacturer manuals are reproduced verbatim (including their spelling). Quotations from
> the German-language manuals [Q2] and [Q3] have been translated into English.

---

## At a glance

By the end of this guide you will be able to switch your pool light on and off with your smartphone, set the colour,
the brightness and the white tone, and start colour-changing programmes.

The connection is made in four parts. Allow about 30 to 45 minutes in total:

| Part | What you do | Time |
|---|---|---|
| A | Set up the gateway and connect it to power | 5 minutes |
| B | Install the "MiBoxer" app and create a user account | 5–10 minutes |
| C | Connect the gateway to your Wi-Fi in the app | 5–10 minutes |
| D | "Link" the pool light to the gateway (the core step) | 5 minutes per light |

> [!IMPORTANT]
> **The one rule you need to remember:** When linking, every second counts. The light must be without power for at
> least **10 seconds**, and after switching it on you have **3 seconds** to tap "Link" in the app. If the light then
> **blinks slowly 3 times**, it has worked [Q1].

---

## 1. Before you start

### 1.1 What you need – checklist

Tick off what you have:

- [ ] The PW01 pool light, fully installed and connected to its power supply. Connecting it in the pool area is a job
  for a qualified electrician. The light has a connection cable 0.5 m long [Q2].
- [ ] A switch with which you can turn the light on and off – for example the light switch of the pool lighting, the
  plug of the transformer or a switchable socket. Without a way to cut the power to the light, linking is not possible
  (see Part D).
- [ ] The WL-433 gateway.
- [ ] A plug-in power supply with 5 volts direct current (DC) and at least 500 mA with a round barrel plug
  5.5 × 2.1 mm. According to the manual: "Input: DC5V/500mA ( 5.5*2.1mm )" [Q1]. **Caution:** many retailers do not
  include the power supply ("A 5V DC power supply is required (not included)" [Q4]). **Never use a power supply with
  more than 5 volts:** "Please do not connect the power supply over DC5V, otherwise, the device will be broken easily."
  [Q1]. A 12-volt power supply (as commonly used for LED strips, for example) will destroy the gateway.
- [ ] A smartphone – iPhone (iOS 9 or newer) or Android phone (Android 5 or newer) [Q1] – with internet access.
- [ ] The name and password of your Wi-Fi. The gateway only works with **2.4 GHz Wi-Fi** ("WiFi-IEEE 802.11b/g/n
  2.4GHz" [Q1]). Section 1.2 explains what this means.
- [ ] A clock with a seconds display (the clock app on your phone is enough) or the ability to count out loud
  "one-Mississippi, two-Mississippi …".
- [ ] Paper and pen for your zone plan (section 5.6).
- [ ] Optional: the FUT086 remote control (2 × AAA batteries). It is not needed for app control, but can be used in
  addition (Part G).

### 1.2 Important terms – in plain words

| Term | What it means |
|---|---|
| **Gateway (WL-433)** | A small box that "translates" between your phone and the light. It is connected to your Wi-Fi and transmits to the light on 433 MHz. Without the gateway the phone cannot reach the light: "smartphone app control (433 MHz gateway required)" [Q2]. |
| **App** | The "MiBoxer" program on your phone with which you operate the light [Q1]. |
| **User account** | You have to register once in the app and log in ("Open APP and click Register button; Complete the register and log in." [Q1]). |
| **Wi-Fi 2.4 GHz / 5 GHz** | Many routers broadcast two kinds of Wi-Fi at the same time: 2.4 GHz (longer range) and 5 GHz (faster). The gateway only understands 2.4 GHz. On some routers both kinds have the same name; on others the name of the fast Wi-Fi contains "5G" or "5GHz" – you must **not** choose that one. |
| **Zone** | A "drawer" in the gateway. There are 8 zones ("Zone1 … Zone8" [Q1]). Each light is sorted into exactly one zone. All lights in the same zone respond together; different zones can be operated separately. A zone can contain any number of lights (for the remote control the manual says "an endless number of lights" per zone [Q3]). |
| **Linking ("Link")** | The process in which the light "remembers" the gateway. Only afterwards does it respond to commands from the app: "You must link the lamps to the gateway to control the lamps" [Q1]. The light remembers up to four transmitters (gateway or remote controls): "A lamp or a controller can only be controlled by four remote controls (max)." [Q3]. |
| **Unlinking ("Unlink")** | The opposite: the light "forgets" the gateway again. Needed if you want to move a light to a different zone. |
| **Blinking of the light** | The light "answers" by blinking: 3 times slowly = linking successful; 10 times quickly = link removed [Q1]. |

### 1.3 Safety notes from the manuals

- **Pool light:** "Please check whether the input voltage matches the operating voltage of the lighting" and "The
  operating voltage is DC24V, the lighting will be damaged if the voltage is higher than DC24V" [Q2]. Note: the MiBoxer
  product page states, differently, "AC12V / DC12~24V" [Q5]. Have the connection checked by a qualified electrician;
  this guide assumes that the light is already connected correctly.
- **Do not open:** "Laypersons cannot dismantle the lighting directly, otherwise the lighting may be damaged" [Q2]; the
  same applies to the gateway: "Non-professional user cannot dismantle the divice directly" [Q1].
- **Operate the gateway with 5 volts only** (see checklist) [Q1].
- **Location of the gateway:** "Do not install the device to direct sunlight, moist and other high temperature area."
  and not near metal or strong magnetic fields, otherwise the range suffers [Q1]. The gateway is **not waterproof** – it
  belongs in the house or in a dry plant room, not at the edge of the pool.
- **Temperatures:** gateway −20 to +60 °C [Q1]; light −20 to +45 °C [Q2].

### 1.4 How everything fits together

```text
Your smartphone ("MiBoxer" app)
       │ via the internet and your Wi-Fi (2.4 GHz)
       ▼
WL-433 gateway (dry, close to the Wi-Fi router, at most 50 m from the light)
       │ 433 MHz radio (LoRa) – through walls and down to 0.5 m under water
       ▼
PW01 pool light (remembers the gateway during "linking")
```

> [!IMPORTANT]
> **Key to understanding:** The light learns the gateway, not the other way round. That is why the light must be
> freshly switched on when linking – during the first three seconds after switching on it "listens" for a linking
> signal [Q1][Q3].

---

## 2. Part A – Set up and switch on the gateway

1. **Choose a location.** The manual says: "Please install the device within 50m as lights, and approaching the WiFi
   Router." [Q1]. So: at most 50 metres in a straight line from the pool light and as close as possible to the Wi-Fi
   router. Dry, not in direct sunlight, not on or next to large metal surfaces (radiator, metal cabinet, metal shelf)
   [Q1].
2. **Connect the power supply.** Plug the round barrel plug of the 5-volt power supply into the socket of the gateway
   and the power supply into a wall outlet.
3. **Watch the indicator light.** The gateway has a small indicator light (called "device indicating lamp" in the
   manual [Q1]). After switching on, it lights up or blinks. What the blinking patterns mean exactly is not described
   in the text of the WL-433 manual; the sister device WL-Box1 (same app, same device generation) has a table for this
   with the states "pairing mode", "successfully on the network", "signal received" and "disconnected from the network"
   [Q6]. All you need to know at this point: if something lights up or blinks, the gateway has power.
4. **Do nothing else yet.** The connection to the Wi-Fi is made in Part C via the app.

---

## 3. Part B – Install the app and create a user account

1. On your phone, open the **App Store** (iPhone) or **Google Play** (Android).
2. Search for **"MiBoxer"** (without "Smart" after it). The manual says: "For IOS System: Pls search “MiBoxer” on APP
   store. (Above IOS9.0) … For Android System: search “MiBoxer” on Google Play (Above Android 5.0)" [Q1]. The publisher
   of the app is "Shenzhen Xincaiyi Technology Co., Ltd.", the Android package is called `com.futlight.miboxer` [Q7].
3. Tap **Install** (or **Get**) and wait until the app is on your phone.
4. Open the app. If it asks, allow it access to Wi-Fi or location – it needs this to detect your Wi-Fi (usual for all
   Wi-Fi devices of this kind).
5. Tap **"Register"**: "Open APP and click Register button; Complete the register and log in." [Q1]. Enter the details
   the app asks for (usually an e-mail address and a password of your choice). **Write down your login details** – you
   will also need them if you set up a new phone later.
6. Log in with these details ("log in"). You now see the device list – it is still empty.

> [!TIP]
> **If the "MiBoxer" app is no longer offered or does not start:** MiBoxer now classifies the "MiBoxer" app as an older
> generation and generally recommends "Miboxer smart or Tuya smart APP" [Q8]. Retailers also name "Tuya Smart / Smart
> Life" for the WL-433 [Q4]. In that case, try the "MiBoxer Smart" or "Smart Life" app; the procedure (create account,
> "+", add device, choose zone, "Link") is basically the same, the labels may differ.

---

## 4. Part C – Add the gateway to the app (connect it to the Wi-Fi)

**Preparation:**

- Your phone must be connected to the **same Wi-Fi** that the gateway is to join – and specifically to the **2.4 GHz
  Wi-Fi**. Check in the phone settings under "Wi-Fi" which network is connected. If the name contains "5G" or "5GHz",
  switch to the other network of your router. If both networks have the same name and pairing does not work, it helps
  to switch off the 5 GHz network on the router for the duration of the setup (see troubleshooting).
- Mobile data on the phone can stay switched on.
- Stand next to the switched-on gateway with your phone.

**Steps:**

1. In the device list, tap **"+"** at the top right: "Click the right top “+” on the device list." [Q1].
2. Select **"433 Gateway"** as the device type: "Please select the device type you will add" [Q1]; the WL-433 appears
   in the app under the name "433 Gateway" [Q1].
3. Now follow the instructions on the screen – the manual says: "complete the adding according to the hint of APP"
   [Q1]. Typically the app asks for:
   - putting the gateway into **pairing mode**. The WL-433 has a **"SET"** button [Q1]. For the sister device WL-Box1
     the instruction is: "Long press “SET” 3 seconds to smart link mode, SYS pilot lamp blinking." [Q6] – i.e. hold the
     SET button for about 3 seconds until the indicator light blinks. For the WL-433 this step is not described
     literally in the manual; follow what the app shows.
   - selecting your **Wi-Fi name** and entering the **Wi-Fi password**. Pay attention to upper/lower case.
   - a **waiting time** (usually less than a minute) during which the app searches for and connects the gateway.
4. After the success message, go back to the device list and **pull the list down with your finger** to refresh it:
   "Back to device list after adding successfully, then pull down refresh in list to get the device status." [Q1]. The
   gateway should now be shown as connected/online.
5. **Optional – give it a name:** swipe the entry in the device list to the left and tap **"Edit"** to give it a name
   such as "Pool gateway"; **"Delete"** would remove the device [Q1].

**Pairing does not work?** See troubleshooting, section 9, items 1–4.

---

## 5. Part D – Link the pool light to the gateway (core step)

### 5.1 Preparation – please read carefully

- **Only switch on the light you want to link right now.** If you have several pool lights on the same switch, all
  lights that receive the linking command within the 3 seconds will be linked when switched on – they then all end up
  in the same zone together. That is fine if all lights should always light up together. If you want to control lights
  separately, you have to link them individually one after the other (each light alone on power) and choose different
  zones. (Practical advice; the manuals only describe the process for "the light" in the singular [Q1][Q3].)
- **A light that is already linked cannot be linked again:** "The linked light cannot be linked again." [Q1]. If you
  want to move a light to a different zone, remove the link first (Part F).
- **At least 10 seconds off – not less.** The pool light has a special feature: if it is switched off only briefly
  (about 5 seconds) and switched on again, it jumps to the next colour or the next programme ("Switch the colours and
  dynamic modes in sequence" [Q2]). This is normal and not a fault. The table in the manual contains further rows for
  "5–10 seconds" and "more than 10 seconds", whose effect is only shown graphically [Q2]; the linking instructions of
  the gateway and the remote control explicitly require 10 seconds of off time [Q1][Q3]. So really count to 10, or even
  to 15 – longer does no harm.
- **3-second time window.** After switching on, you must tap "Link" in the app within 3 seconds [Q1]. So hold the phone
  with the link screen open in one hand, your thumb over the button, and operate the light switch with the other hand.
  If the switch is far away from the pool, that is no problem – you do not need to see the light, only later to check.
- **It is easier with two people:** one person switches, the other taps. It is not necessary, though.

### 5.2 Step by step: first light in zone 1

1. Open the app and tap your **"433 Gateway"** in the device list. You are now in the control screen of the gateway:
   "Click “433 Gateway” on the device list to enter control interface." [Q1].
2. Tap **"Link/Unlink"** [Q1]. The linking screen opens.
3. **Choose the zone:** tap **"Zone"** at the bottom left ("Click the “Zone” on the left bottom into the Zone
   selection." [Q1]) and select **"Zone1"**. Check that zone 1 is highlighted. The manual calls this step "Please select
   linking channel" [Q1].
4. **Switch the light off** (cut the power) and wait **10 to 15 seconds**: "Switch of the light; after 10 seconds,
   switch on again." [Q1]. Count out loud or watch the seconds display.
5. **Switch the light on.**
6. **Immediately – within 3 seconds – tap "Link"** (once, not several times): "Press the linking button once within 3
   seconds." [Q1].
7. Watch the light: it must now **blink slowly 3 times**: "Link is done when the light blink 3 times slowly." [Q1]. If
   you cannot see the light from the switch, have someone watch or check success in step 9.
8. **If the light does not blink slowly, it has not worked:** "Note: If the light doesn’t blink slowly, Linking is
   failed." [Q1]. Repeat steps 4 to 7 – usually the off time was too short or the tap was too late. In case of failure
   the manual recommends: check whether the light is compatible, check whether it is already linked, and repeat the
   steps [Q1].
9. **Check:** go back to the control screen of the gateway ("After linking successfully, back to the control interface
   to control the lights" [Q1]). Make sure zone 1 is selected – "Please select the linked Zone, otherwise it cannot
   control the lamps." [Q1] – and tap Off and then On again. If the light responds: done.
10. Enter the light in your zone plan (section 5.6).

### 5.3 Second and further lights

**Should the lights always light up together?** Then link each further light exactly as in 5.2 – also with zone 1.
The lights in zone 1 then respond together. (If all lights are on the same switch, this happens automatically anyway –
see 5.1.)

**Should the lights be controllable separately?** Then you need a separate switch or plug for each light and choose
zone 2 for the second light, zone 3 for the third and so on. The procedure is as in 5.2, only with a different zone in
step 3. Please note: the gateway cannot combine zones into groups ("Note: This gateway cannot group control." [Q1]); you
then operate each zone individually.

### 5.4 How to recognise success

| What the light does | Meaning |
|---|---|
| Blinks slowly 3 times after tapping "Link" | Linking successful [Q1] |
| Blinks quickly 10 times after tapping "Unlink" | Link removed [Q1] |
| No blinking | Process failed – repeat [Q1] |
| Colour changes when switched on again | You waited too briefly (about 5 seconds); the light has switched to the next colour [Q2]. No problem – switch off again and wait at least 10 seconds. |

### 5.5 Short version to print out

| Step | LINK | UNLINK |
|---|---|---|
| 1 | App: 433 Gateway → Link/Unlink | App: 433 Gateway → Link/Unlink |
| 2 | Choose a zone (e.g. Zone1) | Choose the SAME zone as when linking |
| 3 | Light OFF – wait 10–15 seconds | Light OFF – wait 10–15 seconds |
| 4 | Light ON | Light ON |
| 5 | Within 3 seconds: tap "Link" | Within 3 seconds: tap "Unlink" |
| 6 | Light blinks 3× SLOWLY = done | Light blinks 10× QUICKLY = done |
| No blinking? | → repeat from step 3. | → repeat from step 3. |

### 5.6 Your zone plan (please fill in)

| Zone | Light(s) – location | Switch/plug | Linked on | Successfully tested? |
|---|---|---|---|---|
| Zone 1 | | | | ☐ |
| Zone 2 | | | | ☐ |
| Zone 3 | | | | ☐ |
| Zone 4 | | | | ☐ |
| Zone 5 | | | | ☐ |
| Zone 6 | | | | ☐ |
| Zone 7 | | | | ☐ |
| Zone 8 | | | | ☐ |

---

## 6. Part E – Operating the light with the app

1. In the device list, tap the **"433 Gateway"**.
2. **Choose the zone first** ("Zone" at the bottom left). Without the right zone nothing responds: "Please select the
   linked Zone, otherwise it cannot control the lamps." [Q1].
3. According to the manual, the following are then available [Q1]:
   - **On / Off** (ON / OFF),
   - **brightness and saturation** via sliders ("Dim brightness/Saturation"),
   - **colour** from the colour wheel ("16 Millions of colors to choose"),
   - **white light** with adjustable colour temperature from warm white to cool white ("Color temperature
     2700K~6500K") – switch to white light mode ("White Light") for this,
   - **dynamic modes** (colour-changing programmes) with speed: "Click speed+ under dynamic mode. Click speed- under
     dynamic mode." The light knows nine programmes, in the German manual for example "Carnival", "Automatic colour
     change", "Gemstone", "Twilight" [Q2],
   - **timer** ("Timing ON/OFF the lights") for time-controlled switching on and off.
4. **You operate several zones one after the other:** change zone, adjust, next zone.

> [!TIP]
> **Note on the light switch:** It is best to always switch the light via the app and leave the power switched on. If
> the power is interrupted only briefly, the light may change colour when switched on again (see 5.1) [Q2]. The link to
> the gateway is not lost in the process – after all, the linking procedure itself begins with switching off the light
> [Q1].

---

## 7. Part F – Removing the link (Unlink)

Needed if a light is to go into a different zone, if you replace the gateway or if something got mixed up during
linking.

1. App → **433 Gateway** → **Link/Unlink**.
2. **Choose exactly the zone in which the light was linked.** The remote control manual says so explicitly: "Unlinking
   must use the same zone as linking." [Q3]; the gateway manual: "Please select the linking channel" [Q1]. If you no
   longer know the zone, try the zones one after the other.
3. Switch the light off, wait 10–15 seconds, switch it on [Q1].
4. **Within 3 seconds tap "Unlink"** [Q1].
5. The light **blinks quickly 10 times** = link removed: "Unlink is done when the light blink 10 times quickly." [Q1].
   If it does not blink quickly, repeat from step 3 ("If the light doesn’t blink quickly, Unlinking is failed." [Q1]).
   A light that is not linked cannot be "unlinked": "The unlinked light cannot be unlinked again." [Q1].
6. Afterwards you can link the light again (Part D), for example in a different zone.

---

## 8. Part G – If you also have the FUT086 remote control

The remote control is not necessary, but handy (for example for guests without the app). There are two ways to combine
it with the system.

### 8.1 Linking the light directly to the remote control

This works exactly like with the gateway, except that instead of "Link" in the app you use the **"I" (On) button** of
the remote control [Q3]:

1. On the remote control, choose the desired zone button (1–8).
2. "Switch off the light, then switch it on again after 10 seconds." [Q3].
3. "Press the “I” button three times within 3 seconds while the light is on." [Q3].
4. Success: "The lighting blinks three times slowly" [Q3].
5. Unlinking: same zone, light off for 10 s, on, "Press the “I” button 5 times within 3 seconds" → "blinks 10 times
   quickly" [Q3].

A light can remember up to four transmitters [Q3] – for example the gateway and up to three remote controls, each
linked separately.

### 8.2 More convenient: the gateway "learns" the remote control

If your lights are already linked to the remote control, you do **not** need to link them to the gateway again. The
gateway can adopt the "identity" of the remote control and thus becomes indistinguishable from the remote control for
the lights: "Gateway copy the remote ID to fulfill the gateway and remote ID no difference; after linking with remote,
the gateway can control the lamps directly without linking again." [Q1].

1. App → **433 Gateway** → tap the **"Learn"** button. The indicator light of the gateway blinks: "click “Learn”
   button, device indicating lamp blinking." [Q1].
2. **Within 10 seconds** press any button on the FUT086: "within 10 seconds, click any button on the remote, APP will
   hint learning successfully." [Q1].
3. The app reports success. From now on, all lights linked to the remote control also respond to the app – in the
   same zone numbers as on the remote control.

> [!NOTE]
> This only works with the FUT086: "Note: Just FUT086 433MHz remote support learning currently." [Q1].

> [!WARNING]
> **Resetting the gateway identity:** If you want to get rid of the learned identity again (e.g. because the remote
> control is being sold), press **"SET" briefly 5 times** on the gateway; the indicator light blinks 3 times: "Short
> press gateway “SET” five times; restore successfully after devices indicating lamp blink 3 times." [Q1].
> **Caution:** afterwards the gateway only knows its own identity again – lights that could only be reached via the
> learned identity must be linked again (Part D).

---

## 9. Troubleshooting – when something does not work

| No. | Problem | Probable cause | What you can do |
|---|---|---|---|
| 1 | The app does not find the gateway when adding it | Phone is on the 5 GHz Wi-Fi; gateway not in pairing mode; too far from the router | Switch the phone to the 2.4 GHz Wi-Fi [Q1]; temporarily switch off the 5 GHz network on the router if both networks have the same name; place the gateway next to the router; hold the SET button until the indicator light blinks (on the WL-Box1: 3 seconds [Q6]); restart the process |
| 2 | Wi-Fi password is not accepted | Typo, upper/lower case | Check the password on the router (sticker), re-enter it slowly |
| 3 | Gateway is shown as "offline" | No power; Wi-Fi connection dropped; router has switched off 2.4 GHz | Check the power supply (indicator light?); pull the device list down (refresh) [Q1]; check the router setting "2.4 GHz"; cut power to the gateway for 10 seconds and restart it |
| 4 | Gateway is standing on metal or in the sun | Range impaired | Change the location [Q1] |
| 5 | Light does not blink after "Link" | Off time too short; "Link" tapped later than 3 seconds; wrong zone; light already linked | 10–15 seconds off, then tap immediately after switching on [Q1]; if already linked: Unlink first (Part F); manual tip: check compatibility, check link status, repeat [Q1] |
| 6 | Light only changes colour when switched on | Off time was about 5 seconds | Normal behaviour of the light [Q2]; switch off again and wait at least 10 seconds |
| 7 | Light does not respond to the app although linking worked | Wrong zone selected in the app | Tap "Zone" at the bottom left and choose the right zone [Q1] |
| 8 | Several lights shine differently or "out of sync" | Lights have ended up in different zones, or a light has not received the command (range) | Re-link each light individually in the same zone (Unlink first); move the gateway closer to the pool (max. 50 m; for underwater operation max. 0.5 m depth for full range [Q1]). This problem is also described by PW01 users in the MiBoxer forum [Q9]. |
| 9 | Light cannot be "unlinked" | Wrong zone; light was not linked at all | Change zone and repeat [Q3]; "The unlinked light cannot be unlinked again." [Q1] |
| 10 | Light responds neither to the app nor to the remote control | No power at the light; light too far away / too deep | Check the power supply (electrician); check distance and water depth [Q1] |
| 11 | Range too short | Gateway behind metal, in a basement with thick walls | Move the gateway [Q1]; the 50 m apply at 0.5 m water depth [Q1] |
| 12 | "MiBoxer" app cannot be installed / crashes | The manufacturer considers the app an older generation [Q8] | Check for an app update in the store; alternatively try "MiBoxer Smart" or "Smart Life" (retailer information [Q4]); under warranty: contact MiBoxer service [Q8] |
| 13 | After resetting the gateway (SET 5×) the lights no longer respond | Learned remote control identity was deleted [Q1] | Re-link the lights (Part D) or teach the remote control again (8.2) |

---

## 10. Part I – Further functions (optional)

- **Share the device with family members:** in the app, open the menu at the top left → **"My sharing"** → **"Add
  sharing"**. Note from the manual: whoever receives a shared device cannot share it further; if the device is deleted,
  it also disappears for the friends [Q1].
- **Voice control (Alexa, Google):** in the app, open the menu at the top left and read the instructions; in the voice
  assistant app, search for the skill/service **"Mi-Light Smart"** [Q1].
- **DMX512 connection:** the gateway also has an input for professional lighting consoles ("Set DMX" in the app) [Q1].
  You do not need it for normal use with the app.

---

## 11. Frequently asked questions

**Does the phone have to be on the same Wi-Fi to operate the light?** No – only for the setup. Afterwards, according to
the manual, operation works "through WiFi or 4G network" [Q1], i.e. also on the go via the mobile network. Prerequisite:
the gateway and router have power and internet.

**How many lights can I connect?** The gateway has 8 zones [Q1]; any number of lights is possible per zone [Q3].

**Can I switch several zones at the same time?** No, the gateway does not offer group control [Q1]. If you want to
switch all lights together, put them in the same zone.

**What happens during a power failure?** The link is retained – it is stored in the light, and the linking procedure
itself begins with switching off [Q1]. After short interruptions the light may start in a different colour (see 5.1)
[Q2]; then simply set it again via the app. After restarting, the gateway reconnects to the Wi-Fi by itself – if
necessary, pull the device list down to refresh it [Q1].

**I have a new phone.** Install the app, log in with the same account – the gateway is back. That is why you should
keep your login details.

**I have a new gateway.** The lights know the old gateway; link them to the new one (Part D). If the light is already
linked to four transmitters [Q3], remove one link first (Part F).

**How far under water may the light be?** The range specification of 50 m applies to lights up to 0.5 m below the water
surface [Q1][Q5]. Lights installed deeper may be harder to reach – then place the gateway closer to the pool.

---

## 12. Glossary

| Word in the app / in the manual | Meaning |
|---|---|
| Register | Register (create an account) |
| Log in | Log in (sign in) |
| Device list | List of your devices |
| 433 Gateway | Your WL-433 gateway |
| Link / Unlink | Link / remove link |
| Zone | Zone ("drawer" 1–8 for lights) |
| Learn | Teach the remote control to the gateway |
| SET | Button on the gateway (5× briefly = reset identity; hold down = pairing mode, see 4.) |
| White Light | White light mode (colour temperature) |
| Dynamic mode / speed+ / speed– | Colour-changing programme / faster / slower |
| Timer | Time switch |
| My sharing / Add sharing | My shares / add a share |
| Pull down refresh | Pull the list down to refresh it |

---

## 13. Sources

- **[Q1]** MiBoxer: LoRa 433MHz Gateway, Model No.: WL-433 – User Manual, version V1.0.1 (English).
  <https://miboxer.com/light/download/manual/WL-433.pdf>
  (mirror copy: <https://www.ledbe.com/image/catalog/MiBoxer/WL433/MiBoxer-WL-433-MHz-Gateway-User-Manual.pdf>)
- **[Q2]** MiBoxer: PW01/PW02 operating instructions, version V1.0 (German).
  <https://miboxer.com/light/m_n/pdf/PW01_PW02/PW01-PW02_DE_V1.0.pdf> (English: …/PW01-PW02_EN_V1.0.pdf)
- **[Q3]** MiBoxer: FUT086 LoRa 433MHz remote control – operating instructions, version V1.0 (German).
  <https://miboxer.com/light/m_n/pdf/FUT086/FUT086_DE_V1.0.pdf>
- **[Q4]** Future House Store (retailer): MiBoxer 433MHz Gateway WL-433 – scope of delivery ("1× MiBoxer WL-433 433MHz
  LoRa Gateway • User manual", "A 5V DC power supply is required (not included)"), app information "Tuya Smart / Smart
  Life". <https://futurehousestore.co.uk/miboxer-lora/miboxer-433mhz-gateway-wl-433>
- **[Q5]** MiBoxer: product page 27W RGB+CCT PAR56 LED Pool Light (LoRa 433MHz), PW01.
  <https://miboxer.com/product/27w-rgbcct-par56-led-pool-light-lora-433mhz>
- **[Q6]** MiBoxer: WL-Box1 – User Manual (sister device; SET button 3 seconds = pairing mode, indicator light table).
  <https://miboxer.com/light/download/manual/WL-Box1.pdf>
- **[Q7]** Apple App Store: MiBoxer (ID 1460445992; publisher Shenzhen Xincaiyi Technology Co., Ltd.).
  <https://apps.apple.com/us/app/miboxer/id1460445992>; Google Play: `com.futlight.miboxer`
- **[Q8]** MiBoxer: FAQ ("Why my App stopped working ? ( Mi-Light 3.0 APP , Mi-Light Cloud APP, Miboxer APP)").
  <https://miboxer.com/faq>
- **[Q9]** MiBoxer forum: FUT086 remote not linking up properly with PW01 LED pool light (user reports 2026).
  <https://forum.miboxer.com/t/fut086-remote-not-linking-up-properly-with-pw01-led-pool-light/251>
- **[Q10]** Video (not verified, from search results): How to Pair wifi network for Miboxer WL433 Gateway?
  <https://www.youtube.com/watch?v=vIcAFJFyUxs>

> [!NOTE]
> **Note on reliability:** The linking steps (times, blinking patterns, zones) are taken literally from the
> manufacturer manuals. Not described in the WL-433 manual – and therefore derived from the sister device WL-Box1 or from
> general practice – are: the exact operation of the SET button for Wi-Fi pairing mode, the meaning of the blinking
> patterns of the indicator light and the recommendation to link lights individually. The app guides you through Wi-Fi
> pairing; in case of doubt, what it shows takes precedence over this guide.