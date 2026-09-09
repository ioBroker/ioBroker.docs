---
chapters: {"pages":{"en/adapterref/iobroker.hiob/README.md":{"title":{"en":"ioBroker.hiob"},"content":"en/adapterref/iobroker.hiob/README.md"},"en/adapterref/iobroker.hiob/docs/en/README.md":{"title":{"en":"ioBroker.hiob Adapter for ioBroker"},"content":"en/adapterref/iobroker.hiob/docs/en/README.md"},"en/adapterref/iobroker.hiob/docs/en/example.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/example.md"},"en/adapterref/iobroker.hiob/docs/en/app.md":{"title":{"en":"Step 1: Installation and APP setup"},"content":"en/adapterref/iobroker.hiob/docs/en/app.md"},"en/adapterref/iobroker.hiob/docs/en/enum.md":{"title":{"en":"Step 1: Create Enums"},"content":"en/adapterref/iobroker.hiob/docs/en/enum.md"},"en/adapterref/iobroker.hiob/docs/en/widgets.md":{"title":{"en":"Step 3: Create Widgets"},"content":"en/adapterref/iobroker.hiob/docs/en/widgets.md"},"en/adapterref/iobroker.hiob/docs/en/sreens.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/sreens.md"},"en/adapterref/iobroker.hiob/docs/en/backups.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/backups.md"},"en/adapterref/iobroker.hiob/docs/en/general.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/general.md"},"en/adapterref/iobroker.hiob/docs/en/secureCon.md":{"title":{"en":"Secure connection"},"content":"en/adapterref/iobroker.hiob/docs/en/secureCon.md"},"en/adapterref/iobroker.hiob/docs/en/aessecure.md":{"title":{"en":"Step 1: AES states"},"content":"en/adapterref/iobroker.hiob/docs/en/aessecure.md"},"en/adapterref/iobroker.hiob/docs/en/custom.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/custom.md"},"en/adapterref/iobroker.hiob/docs/en/notifications.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/notifications.md"},"en/adapterref/iobroker.hiob/docs/en/example_log.md":{"title":{"en":"ioBroker Logs"},"content":"en/adapterref/iobroker.hiob/docs/en/example_log.md"},"en/adapterref/iobroker.hiob/docs/en/example_ram.md":{"title":{"en":"ioBroker RAM"},"content":"en/adapterref/iobroker.hiob/docs/en/example_ram.md"},"en/adapterref/iobroker.hiob/docs/en/example_updates.md":{"title":{"en":"ioBroker Infos, News and Updates"},"content":"en/adapterref/iobroker.hiob/docs/en/example_updates.md"},"en/adapterref/iobroker.hiob/docs/en/example_window.md":{"title":{"en":"ioBroker Status Windows"},"content":"en/adapterref/iobroker.hiob/docs/en/example_window.md"},"en/adapterref/iobroker.hiob/docs/en/example_door.md":{"title":{"en":"ioBroker Status doors"},"content":"en/adapterref/iobroker.hiob/docs/en/example_door.md"},"en/adapterref/iobroker.hiob/docs/en/button.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/button.md"},"en/adapterref/iobroker.hiob/docs/en/value.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/value.md"},"en/adapterref/iobroker.hiob/docs/en/advanced.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/advanced.md"},"en/adapterref/iobroker.hiob/docs/en/switch_w_slider.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/switch_w_slider.md"},"en/adapterref/iobroker.hiob/docs/en/division.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/division.md"},"en/adapterref/iobroker.hiob/docs/en/webview.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/webview.md"},"en/adapterref/iobroker.hiob/docs/en/table.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/table.md"},"en/adapterref/iobroker.hiob/docs/en/graph.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/graph.md"},"en/adapterref/iobroker.hiob/docs/en/color.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/color.md"},"en/adapterref/iobroker.hiob/docs/en/media_player.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.hiob/docs/en/media_player.md"}}}
---
![Logo](../../admin/hiob.png)

-   [Back to Summary](/#/docs/adapterref/iobroker.hiob/docs/en/README.md)

# Secure connection

Encrypt messages between the adapter and cell phone?

## Notice

Adapter version at least 0.0.54

## Create a certificate

```bash
cd /opt/iobroker
mkdir cert
cd cert
openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out hiob.crt \
            -keyout hiob.key 
```

## certificate

```
pi@iobroker:~ $ cd /opt/iobroker
pi@iobroker:/opt/iobroker $ mkdir cert
pi@iobroker:/opt/iobroker $ cd cert
pi@iobroker:/opt/iobroker/cert $ openssl req -newkey rsa:4096 \
            -x509 \
            -sha256 \
            -days 3650 \
            -nodes \
            -out hiob.crt \
            -keyout hiob.key
..+.....+.........+...............+......+.+......+...+.....+......+++++++++++++                                                                                                             ++++++++++++++++++++++++++++++++++++++++++++++++++++*...........................                                                        
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:Your_2_letter_ISO_country_code Example DE
State or Province Name (full name) [Some-State]:Your_State_Province_or_County Example NRW
Locality Name (eg, city) []:Your_City Example Düsseldorf
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Your_Company Example HIOB
Organizational Unit Name (eg, section) []:Your_Department Example HIOB
Common Name (e.g. server FQDN or YOUR name) []:secure.yourwebsite.com
Email Address []:youremail@yourwebsite.com
pi@iobroker:/opt/iobroker/cert $ sudo chown iobroker hiob.crt
pi@iobroker:/opt/iobroker/cert $ sudo chown iobroker hiob.key
pi@iobroker:/opt/iobroker/cert $
```

## chown rights

```bash
sudo chown iobroker hiob.crt
sudo chown iobroker hiob.key
```

## Settings

-   Check “Use certificate Connection” and enter the respective paths

![instance_cer.png](img/instance_cer.png)
![instance_cer_path.png](img/instance_cer_path.png)

-   In the APP settings, tick the box “Use secure connection”.

![secure_app.png](img/secure_app.png)