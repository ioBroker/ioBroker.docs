---
title: "Photo frame and screensaver"
lastChanged: "21.11.2026"
---
# Photo frame and screensaver

The adapter [screensaver](https://github.com/ioBroker/ioBroker.screensaver) turns wall tablets and other displays
connected to ioBroker into a digital photo frame: your own photos as a slideshow, with clock and weather if you like.

## What it does

- **Photo frame**: a slideshow as a tile, as a whole page or anywhere on a view of [vis-2](/docs/viz/vis-2.md).
- **Screensaver**: after some minutes without input, the photos lie over every view of vis-2; a touch brings the
  view back.
- **Web components** for the [Devices adapter](/docs/viz/devices.md) and other hosts, with the same settings.
- Photos by date (for example "on this day" or the last days), captions with date and place, soft transitions.

## Where the photos come from

- a folder in the file storage of ioBroker, or a folder on the ioBroker server;
- [Immich](https://immich.app), your own server or one that the adapter starts in Docker;
- **Google Photos** (see below);
- a list of addresses, or a state that holds them.

The adapter keeps the albums on your ioBroker server, sorts them by date and reduces the photos to the size of the
display, so that a tablet does not have to load the originals.

## Google Photos

With Google Photos, your ioBroker becomes a device in Google Photos, like a digital photo frame. In the Google Photos
app you choose what it shows: albums, people or pets. New photos of them appear by themselves.

1. In the settings of the instance, tab **Google Photos**, click **Connect with Google Photos**. A code and a QR code
   appear; the text above them says what ioBroker may see.
2. Open `google.com/device` on a phone or computer (or scan the QR code), enter the code, sign in and agree.
3. Choose in the Google Photos app what the device shows. The tab shows the connected account with its name and
   profile picture.
4. Add an album with the source *Google Photos* and show it with the photo frame or the screensaver.

What ioBroker sees: the name and profile picture of the account, and only the photos you choose for the device. It
cannot see the rest of your library and changes nothing in Google Photos. Everything stays on your own ioBroker
server; copies of the photos are kept for at most 60 minutes. **Disconnect** removes the device from Google Photos,
withdraws the permission and deletes the data.

Details: [Privacy policy: Google Photos](/policy/google-photos).

## Installation

Install the adapter **screensaver** in the tab **Adapters** of admin and create an instance. As long as it is not in
the repository of ioBroker yet, install it from GitHub (`ioBroker/ioBroker.screensaver`).

It needs vis-2 2.20.1 or newer; with vis-2 2.20.2 or newer the screensaver lies over every view.

All settings are described in the
[documentation of the adapter](https://github.com/ioBroker/ioBroker.screensaver/blob/main/docs/en/README.md).
