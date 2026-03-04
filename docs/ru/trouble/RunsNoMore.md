---
title: ioBroker больше не работает.
lastChanged: 24.10.2025
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/trouble/RunsNoMore.md
hash: Pzd/BPnQ2vPUNUd7CaZLkxWLhoWz+MoUp+oYFe6Qxcs=
---
# IoBroker больше не работает - Полная подборка проблем и решений
## Обзор категорий проблем
Если ioBroker перестал запускаться или стал недоступен, обычно причиной является одна из **семи основных проблем**. В этой подборке систематически рассматриваются все известные и повторяющиеся ошибки с проверенными решениями.

## 1. Блокировки и повреждение базы данных
### 1.1 Ошибка блокировки базы данных (наиболее распространенная ошибка)
**Симптомы:**

```
Server Cannot start inMem-states on port 9000: Failed to lock DB file "/opt/iobroker/iobroker-data/states.jsonl"!
Server Cannot start inMem-objects on port 9001: Failed to lock DB file "/opt/iobroker/iobroker-data/objects.jsonl"!
```

**Причины:**

- Некорректное завершение работы (отключение электроэнергии, жесткая перезагрузка)
- Процессы ioBroker продолжают работать после сбоя
- Поврежденные или чрезмерно большие файлы базы данных
- Недостаточные системные права доступа
- Повреждена файловая система (SD-карта, SSD)

**Последовательность решения:**

```bash
# 1. Zuerst iob fix ausführen - komprimiert Datenbanken
cd /opt/iobroker
iob fix

# 2. System neu starten (wenn fix nicht hilft)
sudo reboot

# 3. Nach Neustart: Verfügbare Backups prüfen
cd /opt/iobroker/iobroker-data/backup-objects
ls -la

# Backup-Größe beachten: Wenn Größe plötzlich massiv kleiner wurde,
# ist die Datenbank an diesem Punkt kaputt gegangen

# 4. Datenbank aus Backup wiederherstellen
iob stop
gunzip -ck [neueste_datei]_objects.jsonl.gz > /opt/iobroker/iobroker-data/objects.jsonl
gunzip -ck [neueste_datei]_states.gz > /opt/iobroker/iobroker-data/states.jsonl
iob start

# 5. NUR States zurücksetzen (Verlust nur aktueller Zustände):
iob stop
rm /opt/iobroker/iobroker-data/states.jsonl
iob start

# 6. NOTFALL: Kompletter Reset (ACHTUNG: Verlust aller Objekte UND States!)
# Nur wenn Objects-Datenbank irreparabel beschädigt ist
iob stop
rm /opt/iobroker/iobroker-data/states.jsonl
rm /opt/iobroker/iobroker-data/objects.jsonl
iob setup first  # Grundinitialisierung durchführen
iob start
```

**Важно:** Базу данных объектов ВСЕГДА следует восстанавливать из резервной копии, а не удалять! Удалять можно только состояния, если это необходимо.

### 1.2 Проблемы базы данных Redis
**Симптомы:**

- ioBroker работает крайне медленно
— Загрузка административного интерфейса занимает несколько минут.
- Бесконечное количество точек данных из-за неисправных адаптеров.

**Диагноз:**

```bash
# In Redis-Datenbank schauen (VORSICHT: dauert bei vielen Keys sehr lange!):
redis-cli
KEYS *
# Anzahl der Keys prüfen:
DBSIZE
```

**Подходы к решению:**

```bash
# 1. Problematische Adapter identifizieren und entfernen
# Beispiel Withings-Adapter mit 130.000 Datenpunkten:
iob stop withings
iob del withings

# 2. Redis-Datenbank komplett zurücksetzen (ACHTUNG!)
# Wenn nur States in Redis: OK
# Wenn auch Objects in Redis: Alle Daten weg!
# Nach FLUSHALL muss "iob setup first" ausgeführt werden
iob stop
redis-cli FLUSHALL
iob setup first
iob start

# 3. Zurück zu Files wechseln (bei weniger als 50.000 Objekten empfohlen):
iob stop
iobroker setup custom
# Files für Objects und States wählen
```

**Техническое обслуживание Redis:**

```bash
# Backup der Redis-Datenbank:
redis-cli BGSAVE
cp /var/lib/redis/dump.rdb /backup/pfad/

# Redis-Speicher optimieren (nur wirksam wenn kein AOF genutzt wird):
redis-cli CONFIG SET save "900 1 300 10 60 10000"
```

**Примечание:** Оптимизация памяти в Redis работает лишь в ограниченной степени и сильно зависит от конфигурации.

## 2. Проблемы с административным адаптером и веб-интерфейсом
### 2.1 Административный адаптер остановлен
**Симптомы:**

— `http://IP:8081` недоступен
— Ошибка «Соединение отклонено» или таймаут.
— Административный интерфейс не загружается

**Быстрые решения:**

```bash
# 1. Admin-Adapter über Konsole starten:
iobroker start admin

# 2. Status aller Instanzen prüfen:
iobroker list instances

# 3. Admin-Adapter neu starten:
iobroker restart admin

# 4. Falls Admin nicht reagiert:
iobroker stop admin
iobroker start admin
```

**Решение, разработанное специально для Docker:**

```bash
# In Container-Console:
docker exec -it iobroker-container bash
iobroker start admin

# Oder Container neu starten:
docker restart iobroker-container
```

### 2.2 Конфликты веб-адаптера
**Проблема:** Использование нескольких веб-адаптеров на одном порту или конфликт портов.

**Решение:**

```bash
# Alle Web-Instanzen auflisten:
iobroker list instances | grep web

# Port-Belegung prüfen:
sudo netstat -tulpn | grep :8081
sudo netstat -tulpn | grep :8082

# Web-Adapter-Ports anpassen:
# Über Admin-Interface: Instanzen → web.0 → Konfiguration → Port ändern
```

## 3. Node.js и проблемы с зависимостями
### 3.1 Конфликт версий Node.js
**Симптомы:**

- Ошибка `SyntaxError: Unexpected token` во время обновления js-контроллера (также может быть вызвана повреждением файловой системы!)
— Адаптеры не запускаются после обновления Node.js
- Команды NPM не работают

**Диагноз:**

```bash
# Aktuelle Versionen prüfen:
node -v
npm -v
iob --version

# Empfohlene Versionen (2025):
# Node.js: 20.x, 22.x (LTS)
# js-controller: 7.x
```

**Правильная процедура обновления:**

Подробную информацию об обновлении Node.js можно найти в [Руководство по обновлению Node.js](https://www.iobroker.net/#de/documentation/install/updatenode.md).

```bash
# 1. Backup erstellen:
iob backup

# 2. System stoppen:
iob stop

# 3. Node.js korrekt aktualisieren (aktualisiert automatisch NPM):
iob nodejs-update

# 4. System reparieren:
iob fix

# 5. System starten:
iob start
```

### 3.2 Ошибка установки NPM
**Распространенные ошибки:**

- `ENOTFOUND registry.npmjs.org`
- `ENOENT: нет такого файла или каталога`
- `npm: не найден`

**Важно:** NPM автоматически и корректно устанавливается вместе с Node.js. Если у вас возникнут проблемы с NPM, НЕ пытайтесь установить его вручную!

Дополнительную информацию об установке Node.js и NPM можно найти в разделе [Руководство по установке Node.js](https://www.iobroker.net/#de/documentation/install/nodejs.md).

**Рекомендуемые решения:**

```bash
# 1. Node.js-Update durchführen (aktualisiert automatisch NPM + behebt meiste NPM-Probleme):
iob nodejs-update

# 2. NPM-Cache verifizieren:
npm cache verify

# 3. NPM-Cache bereinigen (bei Cache-Problemen):
npm cache clean --force

# 4. NPM-Registry prüfen/zurücksetzen (nur bei Registry-Problemen):
npm config get registry
npm config set registry https://registry.npmjs.org/

# 5. Proxy-Probleme (nur in Unternehmensnetzen):
npm config set proxy http://proxy-server:port
npm config set https-proxy https://proxy-server:port
```

**При возникновении ошибки «npm not found» после обновления Node.js:**

```bash
# System neu starten, damit PATH aktualisiert wird:
sudo reboot

# Nach Neustart prüfen:
node -v
npm -v
```

**Важно:** НИКОГДА не пытайтесь вручную удалить или переустановить NPM! Это обычно приводит к дальнейшим проблемам. Вместо этого используйте `iob nodejs-update`, который автоматически настраивает NPM.

### 3.3 Ошибка обновления js-контроллера
**Проблема:** `SyntaxError: Unexpected token '<', "<!doctype "... is not valid JSON`

**Подходы к решению:**

```bash
# 1. Fix ausführen vor Update:
iob fix

# 2. Manuelles Update bei UI-Fehlern:
iob upgrade self

# 3. Bei persistenten Problemen:
cd /opt/iobroker
iob stop
npm install iobroker.js-controller@latest --production --prefix /opt/iobroker
iob start
```

## 4. Системные ресурсы и производительность
### 4.1 Проблемы с памятью
**Симптомы:**

- Система зависает, если доступно менее 20% свободной оперативной памяти.
- Адаптеры автоматически отключаются.
— Административный интерфейс перестал отвечать

**Немедленная диагностика:**

```bash
# RAM-Nutzung prüfen:
free -m

# Prozess-spezifischer Verbrauch:
top -p $(pgrep -d',' iobroker)

# Swap-Nutzung:
swapon --show
```

**Подходы к решению:**

```bash
# 1. Unnötige Adapter stoppen:
iobroker list instances
iobroker stop [adaptername]

# 2. Problematische Skripte identifizieren:
# Admin → Skripte → alle Skripte temporär deaktivieren
# Einzeln wieder aktivieren und RAM-Verbrauch beobachten

# 3. System-Services reduzieren:
sudo systemctl disable avahi-daemon
sudo systemctl disable cups
sudo systemctl stop desktop-session  # Auf Headless-Systemen
```

**Рекомендации по оборудованию:**

- Raspberry Pi 3: Максимум 30-40 экземпляров адаптера
- Для производственных систем требуется не менее 4 ГБ оперативной памяти.
- Использование SSD вместо SD-карты для повышения производительности

### 4.2 Проблемы с жестким диском
**Симптомы:**

- Символ `/` означает 100% заполняемость
- Размер файлов журналов достигает ГБ
- Система перестала отвечать

**Экстренная уборка:**

```bash
# 1. Große Log-Dateien finden:
du -h /opt/iobroker/log/ | sort -hr
du -h /var/log/ | sort -hr

# 2. Sichere Log-Bereinigung:
# Logs älter als 7 Tage löschen:
find /opt/iobroker/log/ -name "*.log" -mtime +7 -delete
find /opt/iobroker/log/ -name "*.gz" -mtime +14 -delete

# 3. System-Logs bereinigen:
sudo journalctl --vacuum-time=7d
sudo journalctl --vacuum-size=100M

# 4. NPM-Cache bereinigen:
npm cache clean --force
```

**Настройка ротации журналов:**

```bash
# /etc/logrotate.d/iobroker erstellen:
/opt/iobroker/log/*.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 iobroker iobroker
}
```

### 4.3 Перегрев и аппаратные проблемы
**Симптомы:**

- Raspberry Pi выключается
- Температура процессора выше 80°C
- Случайные сбои системы

**Диагноз:**

```bash
# CPU-Temperatur prüfen:
# Raspberry Pi:
/opt/vc/bin/vcgencmd measure_temp

# Allgemeine Linux-Systeme:
sensors
cat /sys/class/thermal/thermal_zone0/temp

# Über ioBroker SystemInfo-Adapter:
# Automatische Temperatur-Überwachung einrichten
```

**Подходы к решению:**

```bash
# 1. Übertaktung reduzieren (/boot/config.txt):
# Zeilen entfernen oder auskommentieren:
# arm_freq=1400
# gpu_freq=500

# 2. Thermal Throttling prüfen:
dmesg | grep -i thermal

# 3. Hardware-Überwachung aktivieren:
# SystemInfo-Adapter installieren
# Temperatur-Alarme bei >75°C einrichten
```

## 5. Проблемы с сетью и DNS
### 5.1 Разрешение DNS не удалось
**Симптомы:**

- ошибка `getaddrinfo ENOTFOUND`
- Адаптеры не могут подключаться к внешним сервисам.
— Функции `iob fix` и `iob diag` не работают.

**Диагноз:**

```bash
# DNS-Konfiguration prüfen:
cat /etc/resolv.conf
nslookup google.com
dig google.com

# Netzwerk-Interface prüfen:
ip addr
ip route
```

**Подходы к решению:**

```bash
# 1. DNS-Server in /etc/resolv.conf korrigieren:
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
echo "nameserver 1.1.1.1" | sudo tee -a /etc/resolv.conf

# 2. systemd-resolved neu starten:
sudo systemctl restart systemd-resolved

# 3. Netzwerk-Interface neu starten:
sudo systemctl restart networking

# 4. Bei statischen IPs: /etc/netplan/ Konfiguration prüfen
```

### 5.2 Проблемы с брандмауэром и прокси-сервером
**Корпоративные сети:**

```bash
# Proxy für NPM konfigurieren:
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy https://proxy.company.com:8080

# Git-Proxy (für GitHub-Dependencies):
git config --global http.proxy http://proxy.company.com:8080
```

**Проблемы с обратным прокси-сервером:**

- WebSocket-соединения не работают
- Пути Socket.io перенаправляются некорректно.

## 6. Права доступа и проблемы пользователей
### 6.1 Ошибка «Доступ запрещен»
**Симптомы:**

- `EACCES: доступ запрещен`
Ошибка резервного копирования, несмотря на команду `chmod 777`.
- Адаптеры не могут записывать

**ВАЖНО:** Никогда не используйте `chmod 777`! Это представляет угрозу безопасности и часто не решает проблему.

**Правильные решения:**

```bash
# 1. ioBroker-Berechtigungen reparieren:
iob fix

# 2. Benutzer-Gruppen korrigieren:
sudo usermod -aG iobroker $(whoami)
sudo usermod -aG redis iobroker  # Bei Redis-Nutzung

# 3. Verzeichnis-Eigentümer korrigieren:
sudo chown -R iobroker:iobroker /opt/iobroker
sudo chown -R iobroker:iobroker /opt/iobroker-data  # Docker

# 4. Nach Änderungen: Logout/Login erforderlich
```

### 6.2 Проблемы с правами доступа, специфичные для Docker
**Проблема:** Права доступа к томам в контейнерах Docker.

**Решение:**

```bash
# Host-System:
sudo chown -R 1000:1000 /pfad/zu/iobroker-data

# Docker-Compose mit korrekter UID:
version: '3'
services:
  iobroker:
    image: buanet/iobroker:latest
    user: "1000:1000"
    volumes:
      - /pfad/zu/iobroker-data:/opt/iobroker
```

## 7. Системные ошибки, специфичные для адаптера
### 7.1 Проблемы с подключением HomeMatic/CCU3
**Проблема:** Ошибка парсера JSON во время связи с CCU3.

**Подходы к решению:**

```bash
# 1. CCU3-Firmware aktualisieren
# 2. URL-Encoding-Probleme beheben:
# In Adapter-Konfiguration: IP statt Hostname verwenden
# Firewall zwischen ioBroker und CCU3 prüfen

# 3. hm-rega Adapter neu installieren:
iob stop hm-rega
iob del hm-rega
iob install hm-rega
```

### 7.2 Спам в логах адаптера MQTT
**Проблема:** MQTT заполняет логи ненужными сообщениями.

**Решение:**

```bash
# In MQTT-Adapter Konfiguration:
# "Eigene States bekanntgeben" → nur "info.0.*"
# Log-Level auf "info" oder "warn" setzen
```

## Систематическая диагностика неисправностей
### Стандартные диагностические процедуры
```bash
# 1. Grundlegende Systemprüfung:
iob status
iob diag
free -m
df -h

# 2. Prozess-Status:
ps aux | grep iobroker
systemctl status iobroker

# 3. Netzwerk-Connectivity:
ping 8.8.8.8
nslookup registry.npmjs.org

# 4. Log-Analyse:
iob logs --watch
tail -f /var/log/syslog | grep iobroker
```

### Последовательность аварийного ремонта
Если проблемы неясны, выполните следующую последовательность действий:

```bash
# 1. Backup (falls System reagiert):
iob backup

# 2. System stoppen:
iob stop

# 3. Alles reparieren:
iob fix

# 4. Updates durchführen:
iob update
iob upgrade self

# 5. System starten:
iob start

# 6. Status prüfen:
iob status
```

### Когда требуется новая установка
**Новая установка по адресу:**

- Повреждена установка Node.js после некорректных обновлений
- Масштабный ущерб системе, причиненный операциями с правами root.
- Изменение аппаратной части (другая архитектура)
— Более 3 неудачных попыток ремонта

**Подготовка к новой установке:**

```bash
# Vollständiges Backup:
iob backup
cp -R /opt/iobroker/backups /external/storage/

# Wichtige Konfigurationsdateien sichern:
cp /opt/iobroker/iobroker-data/iobroker.json /backup/
cp -R /opt/iobroker/node_modules/iobroker.vis/www/vis-views /backup/
```

## Профилактические меры
### Настройка мониторинга
```bash
# 1. Automatische Backups (täglich):
# Backitup-Adapter konfigurieren

# 2. System-Monitoring:
# SystemInfo-Adapter für Temperatur, RAM, Festplatte
# Grenzwerte für Alarme setzen

# 3. Log-Monitoring:
# Bei kritischen Fehlern E-Mail-Benachrichtigung
```

### План технического обслуживания
**Еженедельно:**

```bash
sudo apt update && sudo apt upgrade
iob update
# Log-Größen prüfen: du -h /opt/iobroker/log/
```

**Ежемесячно:**

```bash
iob fix
iob backup
# Alte Backups bereinigen
# System-Ressourcen analysieren
```

## Краткое содержание
Этот всеобъемлющий сборник задач охватывает все известные ошибки системы ioBroker и предлагает проверенные решения для каждой проблемной области. Порядок попыток решения оптимизирован в соответствии с вероятностью успеха и надежностью.

**Наиболее важные основные правила:**

1. Всегда выполняйте команду `iob fix` в первую очередь.
2. Создавайте резервные копии перед серьезными вмешательствами.
3. Никогда не удаляйте базу данных объектов без резервной копии.
4. Никогда не используйте команду `chmod 777`.
5. При использовании Redis обратите внимание: команда FLUSHALL удалит всё!
6. После изменения прав доступа: Войдите в систему снова.
7. Решайте проблемы с NPM с помощью `iob nodejs-update`, не экспериментируйте вручную.