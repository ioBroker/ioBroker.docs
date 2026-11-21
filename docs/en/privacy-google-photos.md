---
title: "Privacy Policy: Google Photos in the screensaver adapter"
lastChanged: "21.11.2026"
---
# Privacy Policy: Google Photos in the screensaver adapter

This page completes our [privacy policy](/policy) for one function: Google Photos in the ioBroker adapter
"screensaver". It explains which Google user data the adapter accesses through the Google Photos Ambient API and what
happens to it.

Responsible: ioBroker GmbH, see the [imprint](/imprint). For questions about your data, contact us at the address
given there.

## What the adapter does

The adapter "screensaver" turns displays connected to ioBroker into a photo frame and a screensaver. ioBroker is
software that you run on your own hardware ("your ioBroker server"). If you connect Google Photos, your ioBroker
server becomes a device in Google Photos ("Ambient device"), and you choose in the Google Photos app which albums,
people or pets it shows. On Google's consent screen the app is called "ioBroker".

## Data accessed

Only with your consent on Google's consent screen:

- your basic profile (scope `profile`): the name and the profile picture of your Google Account;
- the photos you choose for the device in the Google Photos app (scope `photosambient.mediaitems`), with their ID,
  the time they were taken, their type and their size in pixels.

The adapter does not see the rest of your Google Photos library. It does not upload, change or delete anything in
Google Photos. To register the device, it sends Google the device name you enter in the settings of the adapter.

## Use

The data is used only to

- show in the settings of the adapter which Google Account is connected (name and profile picture), and
- show the chosen photos as a slideshow and screensaver on your own displays.

It is not used for advertising, not sold, not used to build profiles, and not used to develop, improve or train
artificial intelligence or machine learning models. No person at ioBroker GmbH reads it.

## Storage and retention

Google user data is stored only on your own ioBroker server:

| Data | Where on your ioBroker server | How long |
|------|-------------------------------|----------|
| Refresh token | object of the instance, encrypted | until you disconnect |
| Account name, link of the profile picture, device ID | object of the instance | until you disconnect |
| List of the chosen photos (ID, time taken, width and height) | data folder of the instance | renewed at most every 3 hours, until you disconnect |
| Reduced copies of the photos | file storage of the instance | at most 60 minutes |
| Access token, download links of the photos | memory of the adapter only | at most 60 minutes |

The log of your ioBroker server may contain the names of the albums you chose, for example when the choice changes
or an album name in the settings does not match. It stays on your server and is removed by its log rotation.

The photos and the profile data go directly from Google to your ioBroker server over HTTPS. No server of ioBroker
GmbH receives them.

## Sign-in service

The OAuth client secret of ioBroker must not be part of software that runs on your server. Therefore the sign-in
runs through the service `oauth2.iobroker.in` of ioBroker GmbH, hosted at Amazon Web Services (region eu-west-1,
Ireland). It requests the sign-in code from Google, exchanges it for tokens, renews access tokens, and passes the
tokens to your ioBroker server. It does not store tokens, codes, profile data or photos. Its technical log records
errors without tokens or codes and is deleted after 3 days.

## Sharing

Google user data is not transferred to ioBroker GmbH or to third parties. The photos are shown on the displays you
set up; who can see them there, or open the web interface of your ioBroker, is up to you.

## Security

All connections to Google and to the sign-in service use HTTPS. The refresh token is encrypted with the key of your
ioBroker installation. The OAuth client secret is kept only in the sign-in service.

## Withdrawing the access and deleting the data

- "Disconnect" in the settings of the adapter removes the device from Google Photos, withdraws your consent at
  Google, and deletes the tokens, the account data, the list of the photos and the copies.
- If you remove the device in the Google Photos app, or remove the access of ioBroker in your
  [Google Account](https://myaccount.google.com/connections), the adapter notices it the next time it contacts
  Google and deletes the same data; after a removal in the app it also withdraws the consent.

## Limited Use

The use and transfer to any other app of information received from Google APIs by the ioBroker adapter "screensaver"
will adhere to the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy),
including the Limited Use requirements.
