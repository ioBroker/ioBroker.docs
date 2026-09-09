---
chapters: {"pages":{"en/adapterref/iobroker.asterisk/README.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README.md"},"en/adapterref/iobroker.asterisk/README_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/README_DE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE.md"},"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/SIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_FRITZBOX_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_TELEKOM_DE.md"},"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md":{"title":{"en":"ioBroker Asterisk VoIP Adapter"},"content":"en/adapterref/iobroker.asterisk/docs/PJSIP_SIPGATE_DE.md"}}}
---
![Logo](../admin/asterisk.png)

# ioBroker Asterisk VoIP Adapter

## Grundeinstellungen

Du musst für Asterisk das Paket ffmpeg oder sox installieren um MP3-Audiodateien in GSM-Audiodateien umzuwandeln.

Du kannst Asterisk unter Linux (Raspberry), Windows und Apple Macs Computer installieren. Wenn Du Asterisk in einem Docker-Container im Bridge-Modus installieren möchtest, musst Du Sie die UDP-Ports 5038,5060 und die UDP-Ports 7078 bis 7097 im Container exposen.

Asterisk muss auf dem gleichen Server wie ioBroker installiert werden, da auf die Sprachnachrichten (Audiodateien) von ioBroker sowie Asterisk zugegriffen wird.

Sollten ioBroker und Asterisk auf getrennten Servern laufen kannst Du ssh dafür nutzen. Hier wird weiterhin ffmpeg oder sox auf dem ioBroker Server benötigt. Ein ssh Client muss auf dem ioBroker Server und ein ssh Server auf dem Asterisk Server installiert sein. Die Trennung von ioBroker und Asterisk sollte nur vorgenommen werden, wenn man gute Linux Kenntnisse hat.

Unter Linux (z.B. Raspberry) installiere folgende Pakete:

## Installation und Konfiguration

Zuerst musst Du die Verbindung zwischen ioBroker und Asterisk auf der Registerkarte "Asterisk Einstellungen" konfigurieren.
Normalerweise lautet der Benutzername **manager**. Du kannst ein beliebiges Passwort auswählen. Der Benutzername und das Passwort müssen jedoch später mit den Einträgen in der manager.conf identisch sein.
Diese Konfiguration ist unabhängig vom SIP-Provider wie z.B. Fritzbox, Telekom oder Sipgate.
.

![iobroker_main](iobroker_main.png)

Wenn Du mit den "Asterisk Einstellungen" fertig bist, wechsle auf die Registerkarte "SIP Einstellungen". Wähle als Service **pjsip** aus. Gebe nun folgendes ein:

1. IP/Hostname of SIP Server : Gebe hier **tel.t-online.de** als Hostname ein
2. Username of SIP Server: Hinterlege Deine Telefonnummer mit Vorwahl (ohne Ländervorwahl!). Beispiel: 03047114711 (keine Leezeichen)
3. Password of SIP Server: Dein T-Online Passwort in folgndem Format **PIN:ZUGANGSNUMMER-MITBENUTZERNUMMER** . Beispiel: 23457830:323127211711-0001

![iobroker_telekom_pjsip](iobroker_telekom_pjsip.png)

### Automatische Erstellung der Asterisk Konfiguration

Gehe auf den Reiter "Asterisk Settings" und aktiviere das Kontrollkästchen "Anlegen der Asterisk Konfigurationsdateien (einmalig)". Drücke anschließend auf „Speichern und Schließen". Nun befinden sich die Konfigurationsdateien im /tmp/ Verzeichnis. Kopiere diese wie unten beschrieben das Verzeichnis /etc/asterisk. Die Benutzerberechtigungen der Dateien im /etc/asterisk Verzeichnis müssen unverändert bleiben. Vielleicht müssen die Berechtigungen nach dem Kopieren angepasst werden.

```sh
sudo mv /tmp/extensions.ael /etc/asterisk/extensions.ael
sudo mv /tmp/manager.conf /etc/asterisk/manager.conf
sudo mv /tmp/pjsip_telekom.conf /etc/asterisk/pjsip.conf
sudo mv /tmp/rtp.conf /etc/asterisk/rtp.conf

# Example if userrights of files have owner asterisk and group asterisk
sudo chown asterisk:asterisk  /etc/asterisk/extensions.ael
sudo chown asterisk:asterisk /etc/asterisk/manager.conf
sudo chown asterisk:asterisk /etc/asterisk/pjsip.conf
sudo chown asterisk:asterisk /etc/asterisk/rtp.conf

# Asterisk restart
sudo /etc/init.d/asterisk restart
```

Ist der Kopiervorgang abgeschlossen muss erst die Asterisk und danach die Asterisk ioBroker Instanz neu gestartet werden.
Jetzt sollte der Asterisk Adapter funktionieren. Entferne noch die überflüssigen Konfigurationsdateien aus dem /tmp/ Verzeichnis da diese Passwörter enthalten.

### Manuelle Erstellung der Asterisk Konfiguration

Die Konfigurationsdateien können auch manuell erstellt werden. Dafür sind die alten 4 Konfigurationsdateien durch die unten beschriebenen Dateien zu ersetzen. Dabei ändere nicht die Benutzerberechtigungen.

**/etc/asterisk/manager.conf**

```sh
[general]                       ; Do not change
enabled =  yes                      ; Do not change
port =  5038                        ; Do not change
bindaddr =  0.0.0.0                 ; Do not change

[manager]                       ; Do not change
secret =  managerpassword               ; Change Manager password for ioBroker asterisk adapter
permit = 0.0.0.0/0.0.0.0                                ; Change to your subnet and netmask if you like
read =  all                     ; Do not change
write =  all                        ; Do not change
```

In der Datei _/etc/asterisk/manager.conf_ ersetzte die Werte für _secret_ und _permit_ mit (your subnet / subnet mask).

**/etc/asterisk/rtp.conf**

```sh
[general]
rtpstart = 30000
rtpend = 30100
```

In der Datei _/etc/asterisk/rtp.conf_ änderst Du nichts. Kopiere diese nur.

**/etc/asterisk/pjsip.conf**

```sh
[global]
type = global
endpoint_identifier_order = ip,username

[transport-udp]
type = transport
protocol = udp
bind = 0.0.0.0

[transport-tcp]
type = transport
protocol = tcp
bind = 0.0.0.0

[iobroker]
type = registration
transport = transport-udp
outbound_auth = iobroker
server_uri = sip:tel.t-online.de
client_uri = sip:$countrymynumber@tel.t-online.de   ; Change here
contact_user = $mynumber
retry_interval = 60
forbidden_retry_interval = 300
expiration = 480
auth_rejection_permanent = false

[iobroker]
type = auth
auth_type = userpass
password = $pin:$zugangsnummer-$mitbenutzernr@t-online.de ; Change here
username = $mynumber
realm = tel.t-online.de

[iobroker]
type = aor
contact = sip:$countrymynumber@tel.t-online.de  ; Change here

[$mynumber]
type = endpoint
transport = transport-udp
context = ael-antwort
disallow = all
allow = g722
allow = alaw
outbound_auth = iobroker
aors = iobroker
callerid = $mynumber    ; Change here
from_user = $mynumber   ; Change here
from_domain = tel.t-online.de
timers = no
rtp_symmetric = yes

[iobroker]
type = identify
endpoint = $mynumber
match = 217.0.0.0/13

```

Du musst folgende Felder in der _/etc/asterisk/psip.conf_ ändern.

- **$mynumber** : Meine Telefonnummer mit Vorwahl. Beispiel: 03047114711 (keine Leerzeichen)
- **$countrymynumber** : Meine Telefonnummer mit Ländercode und Vorwahl. Beispiel: +493047114711 (keine Leerzeichen)
- **$zugangsnummer** : T-Online Zungangsnummer wie z.B. 532496966969
- **$mitbenutzernr** : Mitbenutzernummer wie z.B. 0001
- **$pin** : Deine Telekom / T-Online Passwort (persönliches Kennwort). Beispiel: 34242322

In der ioBroker Asterisk Konfiguration nehme folgende Einstellungen vor:

- Die IP-Adresse/Hostname des SIP Servers lautet **tel.t-online.de**
- Der Benutzername des SIP Servers ist Deine **Telekom telphonenumber ($mynumber)** (Mit Vorwahl, ohne Ländercode und ohne Leerzeichen)
- Das Passwort des SIP Servers ist Dein **pin:zugangsnummer-mitbenutzernr** of your telekom account

![iobroker_telekom_pjsip](iobroker_telekom_pjsip.png)

**/etc/asterisk/extensions.ael**

```sh
context default {
   1000 => {
       Goto(ael-antwort,s,1);
   }
}

context ael-ansage {
    _. => {
       Answer();
       Wait(1);
        Read(dtmf,${file}&beep,0,s,${repeat},1);
        if ("${dtmf}" != "") {
            SayDigits(${dtmf});
        }
        Hangup();
   }

    h =>  {
       if ("${del}" = "delete") {
                NoOp(/bin/rm ${file}.*);
               System(/bin/rm ${file}.*);
        }
    }
}

context ael-antwort {
    s  => {
        Answer();
        Wait(1);
        Set(repeat=5);
        Read(dtmf,/tmp/asterisk_dtmf&beep,0,s,${repeat},1);
        if ("${dtmf}" != "") {
            SayDigits(${dtmf});
        }
       Hangup();
    }

    _.  => {
       Goto(ael-antwort,s,1);
   }
}
```

Ersetze den Inhalt der Datei _/etc/asterisk/extensions.ael_ ohne Änderungen.

Nun muss der Asterisk Server neu gestartet werden. Dieses geschieht z.b. über _/etc/init.d/asterisk restart_. Nun sollte sich ioBroker mit dem Asterisk Server verbinden.