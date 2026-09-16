---
chapters: {"pages":{"en/adapterref/iobroker.webcal/README.md":{"title":{"en":"ioBroker.webcal"},"content":"en/adapterref/iobroker.webcal/README.md"},"en/adapterref/iobroker.webcal/doc/google.md":{"title":{"en":"Google Calendar API"},"content":"en/adapterref/iobroker.webcal/doc/google.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.webcal/doc/google.md
title: Google Kalender API
hash: 8+BTC7koMqce+JLa2ig3nyihvZ9XQSgaHhT4Yh/9+mY=
---
# Google Kalender API

Siehe <https://developers.google.com/calendar/caldav/v2/guide>

- Melden Sie sich unter <https://console.developers.google.com/projectselector/apis/credentials> an
- Klicken Sie auf „Projekt erstellen“.[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/Utkgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/Utkgrafik.png)

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/Fb0grafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/Fb0grafik.png)

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/xPmgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/xPmgrafik.png)

Zustimmungsbildschirm konfigurieren

- Benutzertyp extern

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/KUcgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/KUcgrafik.png)

- für Anwendungsnamen verwenden`ioBroker.webCal`
- Wählen Sie Ihre E-Mail-Adresse für den Support und die Kontaktaufnahme mit den Entwicklern.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/zvAgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/zvAgrafik.png)

- Dreimal auf Speichern klicken
- Zurück zum Dashboard klicken
- Veröffentlichung auf Produktion umstellen

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/vmpgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/vmpgrafik.png)

Klicken Sie auf „+ Anmeldeinformationen erstellen“ und fügen Sie eine neue OAuth-Client-ID hinzu.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/2Hcgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/2Hcgrafik.png)

- Typ: Webanwendung
- Name`ioBroker.webCal`
- Autorisierte Umleitungs-URIs:`https://developers.google.com/oauthplayground`
- Klicken Sie auf „Erstellen“ und laden Sie die JSON-Datei im nächsten Bildschirm herunter.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/kUXgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/kUXgrafik.png)

- Klicken Sie im Seitenmenü auf „Bibliothek“.
- Suchen Sie nach „WebDAV“ und klicken Sie auf die entsprechende Ergebniskachel.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/S5sgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/S5sgrafik.png)

- Klicken Sie auf „Aktivieren“, um die calDAV-API zu aktivieren.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/VCigrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/VCigrafik.png)

Open [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/)

- Klicken Sie auf die Schaltfläche „OAuth 2.0-Konfiguration“ in der oberen rechten Ecke.
- Wählen`Use your own OAuth credentials` Geben Sie im unteren Bereich die Werte für Client-ID und Client-Geheimnis aus der JSON-Datei an.

[![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/CCZgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/CCZgrafik.png)

- Klicken Sie auf Schließen

- Unter Schritt 1 auf der linken Seite nach Google Kalender suchen und darauf klicken.\
  `https://www.googleapis.com/auth/calendar` Und[`https://www.googleapis.com/auth/calendar.events`](https://www.googleapis.com/auth/calendar.events)\
  [![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/tsLgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/tsLgrafik.png)

- Klicken Sie auf „APIs autorisieren“.
  - Jetzt musst du dich selbst akzeptieren und dir selbst vertrauen.... (Vielleicht musst du auf „Erweitert“ klicken)
  - [![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/0Elgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/0Elgrafik.png)

    [![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/8hMgrafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/8hMgrafik.png)

- Klicken`Button Exchange authorization code for tokens` zu Schritt 2\
  [![grafik.png](https://github.com/dirkhe/ioBroker.webcal/blob/master/doc/images/google/LW2grafik.png)](../../../../en/adapterref/iobroker.webcal/doc/images/google/LW2grafik.png)

- Hier benötigen wir das Refresh-Token.

Verwenden Sie die folgenden Einstellungen in ioBroker

- Authentifizierungsmethode = Google
- Geheimnis = Client-Geheimnis (aus der JSON-Datei)
- Refresh-Token = den Sie oben erhalten
- Client-ID = Ihre Client-ID (aus der JSON-Datei)