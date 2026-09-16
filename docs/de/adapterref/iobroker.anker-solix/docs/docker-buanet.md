---
chapters: {"pages":{"en/adapterref/iobroker.anker-solix/README.md":{"title":{"en":"ioBroker.anker-solix"},"content":"en/adapterref/iobroker.anker-solix/README.md"},"en/adapterref/iobroker.anker-solix/docs/docker-buanet.md":{"title":{"en":"Anker Solix im buanet/iobroker-Container"},"content":"en/adapterref/iobroker.anker-solix/docs/docker-buanet.md"},"en/adapterref/iobroker.anker-solix/CREDITS.md":{"title":{"en":"Credits & acknowledgments"},"content":"en/adapterref/iobroker.anker-solix/CREDITS.md"}}}
translatedFrom: en
translatedWarning: Wenn Sie dieses Dokument bearbeiten möchten, löschen Sie bitte das Feld "translationsFrom". Andernfalls wird dieses Dokument automatisch erneut übersetzt
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/de/adapterref/iobroker.anker-solix/docs/docker-buanet.md
title: Anker Solix im buanet/iobroker-Container
hash: 9q7nPfOidNuEyTILR5+CCh8KfnkwpGz4xmEco+IM+4I=
---
# Anker Solix im buanet/iobroker-Container

**PDF zum Hochladen (Forum / GitHub):** [Anker-Solix-buanet-Docker-Anleitung.pdf](https://github.com/MatthiasUlrich1/ioBroker.anker-solix/blob/main/docs/Anker-Solix-buanet-Docker-Anleitung.pdf)\
&#x20;(Neu erzeugen:`python tools/build-docker-guide-pdf.py` )

Das Bild[`buanet/iobroker`](https://hub.docker.com/r/buanet/iobroker/) basiert auf **Debian 12 Bookworm** und bringt **Python 3.11** mit (`python3` /`python3-dev` ).

**Ab Adapter 0.10.87** akzeptiert ioBroker.anker-solix genau in diesem Fall (Linux- **Container** auf Debian Bookworm, z. B.`buanet/iobroker:latest-v11` ) System- **Python 3.11** als Best-Effort. Bare-Metal-Bookworm, andere Distros und Nicht-Bookworm-Container brauchen weiter **Python 3.12+** . Upstream (Solixapi / HA) bevorzugt weiterhin 3.12+.

| Weg                                                                     | Wann sinnvoll                                                                          |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| [Stockfoto mit 3.11](#stock-image-mit-python-311-empfohlen)             | Normalfall ab 0.10.87: kein Extra-Image, kein Backport                                 |
| [A – Eigenes Image mit 3.12](#a--eigenes-image-mit-python-312-optional) | Wenn Sie die Upstream-Version 3.12+ benötigen; Aktualisiert die Base-Images-Planleiste |
| [B – Userscript mit 3.12](#b--userscript-mit-python-312-optional)       | 3.12 nachrüsten ohne Image-Build                                                       |

Offizielle Container-Doku: [docs.buanet.de – ioBroker Docker](https://docs.buanet.de/iobroker-docker-image/docs/) .

---

## Stock-Image mit Python 3.11 (empfohlen)

Voraussetzung: Adapter **0.10.87 oder neuer** .

1. Unverändertes Bild nutzen, z. B.`buanet/iobroker:latest-v11` (Oder`latest` ).
2. Im Container **venv/pip für 3.11** bereitgestellt, damit der Adapter Abhängigkeiten installieren kann. In der buanet-Compose z. B.:

   ```yaml
   environment:
     - PACKAGES=python3-venv python3-pip
   ```

   (Das installierte Werkzeuge für das **System-Python 3.11** — das reicht hier.)
3. Adapter **anker-solix** installieren bzw. Instanz anlegen.
4. **Optionen:** **Python-Befehl** leer lassen (Auto-Erkennung) oder`/usr/bin/python3` setzen. **autoInstallPython** aktivieren bzw. einmal **Python-Abhängigkeiten installieren** .

Prüfen:

```bash
docker exec -it iobroker python3 --version
# erwartet z. B.: Python 3.11.x
```

Im Adapter-Log kann ein Hinweis stehen, dass 3.11 in Bookworm-Containern best-effort akzeptiert wird.`info.pythonReady` sollte`true` werden.

---

## A – Eigenes Image mit Python 3.12 (optional)

Nur nötig, wenn du **3.12+** neben dem System-Python haben willst (Empfohlen von Upstream, nicht mehr Pflicht für Buanet).

Python-3.12-Pakete: [pascallj/python3.12-backport](https://github.com/pascallj/python3.12-backport) (amd64, arm64, armhf).

### 1. Dateien anlegen

Auf dem Docker-Host einen Ordner anlegen, z. B.`~/iobroker-anker-solix/` :

**`Dockerfile`**

```dockerfile
FROM buanet/iobroker:latest

# Optional: Python 3.12 neben dem System-Python 3.11 (Bookworm)
# Quelle: https://github.com/pascallj/python3.12-backport
USER root
RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends ca-certificates curl; \
    mkdir -p /etc/apt/keyrings; \
    curl -fsSL https://pascalroeleven.nl/deb-pascalroeleven.gpg \
      -o /etc/apt/keyrings/deb-pascalroeleven.gpg; \
    printf '%s\n' \
      'Types: deb' \
      'URIs: http://deb.pascalroeleven.nl/python3.12' \
      'Suites: bookworm-backports' \
      'Components: main' \
      'Signed-By: /etc/apt/keyrings/deb-pascalroeleven.gpg' \
      > /etc/apt/sources.list.d/pascalroeleven.sources; \
    apt-get update; \
    apt-get install -y --no-install-recommends python3.12 python3.12-venv python3.12-dev; \
    python3.12 --version; \
    rm -rf /var/lib/apt/lists/*
```

**`docker-compose.yml`** (Beispiel – Volumes/Ports und dein Setup anpassen)

```yaml
services:
  iobroker:
    container_name: iobroker
    build:
      context: .
      dockerfile: Dockerfile
    image: iobroker-anker-solix:latest
    hostname: iobroker
    restart: always
    ports:
      - "8081:8081"
    volumes:
      - iobrokerdata:/opt/iobroker
    environment:
      - TZ=Europe/Berlin

volumes:
  iobrokerdata:
```

Statt`latest` kannst du beim`FROM` und beim Tag eine feste Version nutzen (z. B.`buanet/iobroker:latest-v11` ), siehe [Best Practice](https://docs.buanet.de/iobroker-docker-image/docs/) .

### 2. Bauen und starten

```bash
cd ~/iobroker-anker-solix
docker compose build --pull
docker compose up -d
```

Bestehender Container mit gleichem Daten-Volume ersetzen (Backup vorher):

```bash
docker compose down
docker compose up -d --build
```

### 3. Prüfen

```bash
docker exec -it iobroker python3.12 --version
# erwartet z. B.: Python 3.12.x
```

### 4. Adapter

1. Im Admin: Adapter **anker-solix** installieren bzw. Instanz anlegen.
2. **Optionen** → **Python-Befehl:**`/usr/bin/python3.12`
3. **Python-Abhängigkeiten installieren** oder Instanz neu starten (`autoInstallPython` ).
4. Konto/AGB wie in der [README](/#/adapters/anker-solix) beschrieben.

Manuell im Container (falls nötig):

```bash
docker exec -it iobroker bash
cd /opt/iobroker/node_modules/iobroker.anker-solix
python3.12 -m venv python/.venv
python/.venv/bin/pip install -r python/requirements.txt
iobroker restart anker-solix.0
```

### Bildaktualisierung

Bei neuem`buanet/iobroker` -Release erneut bauen:

```bash
docker compose build --pull
docker compose up -d
```

Die ioBroker-Daten liegen im Volume und bleiben erhalten.

---

## B – Userscript mit Python 3.12 (optional)

Ohne eigenes Image: Beim Container-Start ein Script ausführen, das Python 3.12 per apt nachzieht. Dafür den Ordner[`/opt/userscripts`](https://docs.buanet.de/iobroker-docker-image/docs/) vom Host mounten.

Für den Normalbetrieb mit 3.11 ist das **nicht** nötig.

### 1. Host-Ordner und Skript

Auf dem Host z. B.`~/iobroker-userscripts/` anlegen. Beim **ersten** Start mit leerem Mount legt das Image Beispiel-Dateien an. Danach:

- `userscript_firststart.sh_example` →**`userscript_firststart.sh`** umbenennen (ohne`_example` )
- Inhalt durch das folgende Script ersetzen (oder die Datei direkt so anlegen)

**`userscript_firststart.sh`**

```bash
#!/usr/bin/env bash
# Optional: installiert Python 3.12 beim ersten Start eines neuen Containers (buanet/iobroker).
# Läuft erneut nach Recreate des Containers (Container-FS ist dann wieder „frisch“).
set -euo pipefail

MARKER="/opt/.docker_config/.anker-solix-python312"
if [[ -x /usr/bin/python3.12 ]] && /usr/bin/python3.12 --version >/dev/null 2>&1; then
  echo "[anker-solix] Python 3.12 already present: $(/usr/bin/python3.12 --version)"
  exit 0
fi

echo "[anker-solix] Installing Python 3.12 (bookworm backport) ..."
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y --no-install-recommends ca-certificates curl
mkdir -p /etc/apt/keyrings
curl -fsSL https://pascalroeleven.nl/deb-pascalroeleven.gpg \
  -o /etc/apt/keyrings/deb-pascalroeleven.gpg
cat >/etc/apt/sources.list.d/pascalroeleven.sources <<'EOF'
Types: deb
URIs: http://deb.pascalroeleven.nl/python3.12
Suites: bookworm-backports
Components: main
Signed-By: /etc/apt/keyrings/deb-pascalroeleven.gpg
EOF
apt-get update
apt-get install -y --no-install-recommends python3.12 python3.12-venv python3.12-dev
python3.12 --version
mkdir -p "$(dirname "$MARKER")"
date -Is >"$MARKER"
echo "[anker-solix] Python 3.12 install finished."
```

Ausführbar machen:

```bash
chmod +x ~/iobroker-userscripts/userscript_firststart.sh
```

`userscript_everystart.sh` ist für diese Installation **nicht** nötig (apt bei jedem Start wäre langsam). Nur`firststart` reicht: Nach Recreate ist das Container-FS neu und firststart läuft wieder.

### 2. Komponieren / Ausführen anpassen

Band für Userscripts ergänzen, Bild bleibt`buanet/iobroker:…` :

```yaml
services:
  iobroker:
    container_name: iobroker
    image: buanet/iobroker:latest
    hostname: iobroker
    restart: always
    ports:
      - "8081:8081"
    volumes:
      - iobrokerdata:/opt/iobroker
      - ~/iobroker-userscripts:/opt/userscripts
    environment:
      - TZ=Europe/Berlin

volumes:
  iobrokerdata:
```

Container neu erstellen, damit firststart greift:

```bash
docker compose up -d
# bzw. nach Änderung des Scripts / neuen Container:
docker compose down
docker compose up -d
```

Im Container-Log unter dem Schritt zu den Userscripts sollte die Zeile sein\
`[anker-solix] Installing Python 3.12 …` bzw.`already present` erscheinen.

### 3. Prüfen und Adapter

```bash
docker exec -it iobroker python3.12 --version
```

**pythonPath** =`/usr/bin/python3.12` , Abhängigkeiten installieren.

### Hinweise zum Userscript

- Pakete liegen im **Container-Dateisystem** , nicht im ioBroker-Volume. Nach`docker compose down` + neuer Container ohne Firststart-Lauf wäre Python 3.12 wieder weg – deshalb Script aktiv lassen.
- Einfacher **Neustart** (`docker restart` ) behält die Installation; firststart läuft dann nicht erneut.
- Externe apt-Quelle (Third-Party): nur verwenden, wenn du das Backport-Repo vertraust.

---

## Nach der Einrichtung – Kurzcheck

| Überprüfen                            | Aktie 3.11                                 | Optional 3.12                           |
| ------------------------------------- | ------------------------------------------ | --------------------------------------- |
| Version im Container                  | `python3 --version` →`Python 3.11.x`       | `python3.12 --version` →`Python 3.12.x` |
| **Administratoroptionen**`pythonPath` | leer oder `/usr/bin/python3`               | `/usr/bin/python3.12`                   |
| Adapter-Protokoll                     | Python-Setup OK /`info.pythonReady` = wahr | gleich                                  |

Fehler „Python 3.12+ notfound“ auf einem **Stock-buanet-Image** → Adapter ist älter als **0.10.87** , oder der Prozess läuft nicht als Linux-Container auf Debian Bookworm.\
&#x20;Fehler zu`venv` /`pip` →`python3-venv` /`python3-pip` (3.11) bzw.`python3.12-venv` fehlen.

---

## Fertige Dateien im Repo

Zum Kopieren liegen Vorlagen für den **optionalen** 3.12-Weg unter:

- [`docs/docker/Dockerfile`](https://github.com/MatthiasUlrich1/ioBroker.anker-solix/blob/main/docs/docker/Dockerfile)
- [`docs/docker/docker-compose.image.yml`](https://github.com/MatthiasUlrich1/ioBroker.anker-solix/blob/main/docs/docker/docker-compose.image.yml)
- [`docs/docker/docker-compose.userscript.yml`](https://github.com/MatthiasUlrich1/ioBroker.anker-solix/blob/main/docs/docker/docker-compose.userscript.yml)
- [`docs/docker/userscript_firststart.sh`](https://github.com/MatthiasUlrich1/ioBroker.anker-solix/blob/main/docs/docker/userscript_firststart.sh)