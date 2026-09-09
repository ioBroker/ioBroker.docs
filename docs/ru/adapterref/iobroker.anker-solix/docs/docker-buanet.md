---
chapters: {"pages":{"en/adapterref/iobroker.anker-solix/README.md":{"title":{"en":"ioBroker.anker-solix"},"content":"en/adapterref/iobroker.anker-solix/README.md"},"en/adapterref/iobroker.anker-solix/docs/docker-buanet.md":{"title":{"en":"Anker Solix im buanet/iobroker-Container"},"content":"en/adapterref/iobroker.anker-solix/docs/docker-buanet.md"},"en/adapterref/iobroker.anker-solix/CREDITS.md":{"title":{"en":"Credits & acknowledgments"},"content":"en/adapterref/iobroker.anker-solix/CREDITS.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.anker-solix/docs/docker-buanet.md
title: Anker Solix im buanet/iobroker-Container
hash: 9q7nPfOidNuEyTILR5+CCh8KfnkwpGz4xmEco+IM+4I=
---
# Anker Solix im buanet/iobroker-Container

**PDF zum Hochladen (Форум/GitHub):** [Anker-Solix-buanet-Docker-Anleitung.pdf](https://github.com/MatthiasUlrich1/ioBroker.anker-solix/blob/main/docs/Anker-Solix-buanet-Docker-Anleitung.pdf)\
&#x20;(Neu erzeugen:`python tools/build-docker-guide-pdf.py` )

Изображение[`buanet/iobroker`](https://hub.docker.com/r/buanet/iobroker/) Базовая версия **Debian 12 Bookworm** и **Python 3.11** с (`python3` /`python3-dev` ).

**Ab Adapter 0.10.87** обновлен ioBroker.anker-solix в этой осени (Linux- **контейнер** для Debian Bookworm, z. B.`buanet/iobroker:latest-v11` ) Система — **Python 3.11** также Best-Effort. Bare-Metal-Bookworm, другие дистрибутивы и Nicht-Bookworm-Container, работающие в **Python 3.12+** . Восходящий поток (solixapi/HA) bevorzugt weiterhin 3.12+.

| Вег                                                                                  | Wann sinnvoll                                                                  |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| [Stock-Image mit 3.11](#stock-image-mit-python-311-empfohlen)                        | Normalfall ab 0.10.87: Kein Extra-Image, Kein Backport                         |
| [A – Собственное изображение с 3.12](#a--eigenes-image-mit-python-312-optional)      | Wenn du die Upstream — версия 3.12+ будет; Обновления панели плана Base-Images |
| [B – Пользовательский скрипт с версией 3.12](#b--userscript-mit-python-312-optional) | 3.12 Добавление без Image-Build                                                |

Официальная документация по контейнерам: [docs.buanet.de – ioBroker Docker](https://docs.buanet.de/iobroker-docker-image/docs/) .

---

## Stock-Image с Python 3.11 (empfohlen)

Информация: Адаптер **0.10.87 или новый** .

1. Unverändertes Image nutzen, z. Б.`buanet/iobroker:latest-v11` (Одер`latest` ).
2. В контейнере **venv/pip для версии 3.11** необходимо установить адаптер, который можно установить. In der buanet-Compose z. Б.:

   ```yaml
   environment:
     - PACKAGES=python3-venv python3-pip
   ```

   (Das installiert Werkzeuge für das **System-Python 3.11** — das reicht hier.)
3. Адаптер **anker-solix** устанавливается bzw. Инстанц анлеген.
4. **Опции:** **Python-Befehl** leer lassen (Auto-Erkennung) или`/usr/bin/python3` сетцен. **autoInstallPython** активируется bzw. einmal **Python-Abhängigkeiten installieren** .

Prüfen:

```bash
docker exec -it iobroker python3 --version
# erwartet z. B.: Python 3.11.x
```

Я могу использовать адаптер-журнал, начиная с версии 3.11 в Bookworm-Container и получая максимальную отдачу от использования.`info.pythonReady` соллте`true` верден.

---

## A – Eigenes Image с Python 3.12 (необязательно)

Если в версии **3.12+** нет возможности использовать System-Python (например, Upstream, nicht mehr Pflicht für buanet).

Пакет Python-3.12: [pascallj/python3.12-backport](https://github.com/pascallj/python3.12-backport) (amd64, Arm64, Armhf).

### 1. Dateien anlegen

Auf dem Docker-Host einen Ordner anlegen, z. Б.`~/iobroker-anker-solix/` :

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

**`docker-compose.yml`** (Особенности – Тома/Порты и их настройка)

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

Статт`latest` kannst du beim`FROM` und beim Tag eine feste Version nutzen (z.B.`buanet/iobroker:latest-v11` ), см. [раздел «Лучшие практики»](https://docs.buanet.de/iobroker-docker-image/docs/) .

### 2. Bauen und starten

```bash
cd ~/iobroker-anker-solix
docker compose build --pull
docker compose up -d
```

Лучший контейнер с резервным копированием Daten-Volume (резервное копирование):

```bash
docker compose down
docker compose up -d --build
```

### 3. Prüfen

```bash
docker exec -it iobroker python3.12 --version
# erwartet z. B.: Python 3.12.x
```

### 4. Адаптер

1. Я администратор: Адаптер **anker-solix** установлен bzw. Инстанц анлеген.
2. **Параметры** → **Команды Python:**`/usr/bin/python3.12`
3. **Установка Python-Abhängigkeiten** или мгновенный запуск (`autoInstallPython` ).
4. Учетная запись/Условия, содержащиеся в описании [README](/#/adapters/anker-solix) .

Мануэль в Контейнере (падение нетиг):

```bash
docker exec -it iobroker bash
cd /opt/iobroker/node_modules/iobroker.anker-solix
python3.12 -m venv python/.venv
python/.venv/bin/pip install -r python/requirements.txt
iobroker restart anker-solix.0
```

### Обновление изображения

Bei neuem`buanet/iobroker` -Release erneut bauen:

```bash
docker compose build --pull
docker compose up -d
```

Данные ioBroker-Date лежат в томе и не работают.

---

## B – Пользовательский скрипт с Python 3.12 (необязательно)

Ваше собственное изображение: используйте Container-Start в сценарии, используя Python 3.12, для каждого нового варианта. Дафюр ден Орднер[`/opt/userscripts`](https://docs.buanet.de/iobroker-docker-image/docs/) vom Host mounten.

Для версии Normalbetrieb mit 3.11 это **ничего не** значит.

### 1. Host-Ordner und Script

Auf dem Host z. B.`~/iobroker-userscripts/` анлеген. Beim **ersten** Start mit leerem Mount legt das Image Beispiel-Dateien an. Данах:

- `userscript_firststart.sh_example` →**`userscript_firststart.sh`** umbenennen (ohne`_example` )
- Используйте другой сценарий (или дату, прямо так, чтобы это было понятно)

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

`userscript_everystart.sh` Это **не** означает, что установка будет невозможна (можно сразу же начать работу). Нур`firststart` Ответ: nach Recreate ist das Container-FS neu und firststart läuft wieder.

### 2. Compose / Run anpassen

Том для пользовательских скриптов, изображение bleibt`buanet/iobroker:…` :

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

Контейнер neu erstellen, damit firststart greift:

```bash
docker compose up -d
# bzw. nach Änderung des Scripts / neuen Container:
docker compose down
docker compose up -d
```

Я Container-Log для написания пользовательских сценариев, которые можно использовать в Zeile.\
`[anker-solix] Installing Python 3.12 …` бзв.`already present` erscheinen.

### 3. Prüfen und Adapter

```bash
docker exec -it iobroker python3.12 --version
```

**pythonPath** =`/usr/bin/python3.12` , Dependencies installieren.

### Hinweise zum Userscript

- Пакет хранится в **Container-Dateisystem** , но не в ioBroker-Volume. Нах`docker compose down` + neuem Container ohne firststart-Lauf wäre Python 3.12 wieder weg – активировать сценарий deshalb.
- Einfacher **Restart** (`docker restart` ) behält die Установка; первый запуск läuft dann nicht erneut.
- Внешние apt-Quelle (сторонние): nur verwenden, wenn du dem Backport-Repo vertraust.

---

## Nach der Einrichtung – Kurzcheck

| Проверять                                | Акция 3.11                                                 | Дополнительный пункт 3.12               |
| ---------------------------------------- | ---------------------------------------------------------- | --------------------------------------- |
| Версия в контейнере                      | `python3 --version` →`Python 3.11.x`                       | `python3.12 --version` →`Python 3.12.x` |
| **Параметры** администратора`pythonPath` | leer oder `/usr/bin/python3`                               | `/usr/bin/python3.12`                   |
| Журнал адаптера                          | Настройка Python прошла успешно /`info.pythonReady` = true | глейч                                   |

Используйте «Python 3.12+ не найден» в своем **Stock-buanet-Image** → Адаптер — это версия **0.10.87** или процесс не работает в Linux-контейнере для Debian Bookworm.\
&#x20;Fehler zu`venv` /`pip` →`python3-venv` /`python3-pip` (3.11) bzw.`python3.12-venv` фелен.

---

## Fertige Dateien im Repo

Zum Kopieren Ligen Vorlagen für den **optionen** 3.12-Weg unter:

- [`docs/docker/Dockerfile`](https://github.com/MatthiasUlrich1/ioBroker.anker-solix/blob/main/docs/docker/Dockerfile)
- [`docs/docker/docker-compose.image.yml`](https://github.com/MatthiasUlrich1/ioBroker.anker-solix/blob/main/docs/docker/docker-compose.image.yml)
- [`docs/docker/docker-compose.userscript.yml`](https://github.com/MatthiasUlrich1/ioBroker.anker-solix/blob/main/docs/docker/docker-compose.userscript.yml)
- [`docs/docker/userscript_firststart.sh`](https://github.com/MatthiasUlrich1/ioBroker.anker-solix/blob/main/docs/docker/userscript_firststart.sh)