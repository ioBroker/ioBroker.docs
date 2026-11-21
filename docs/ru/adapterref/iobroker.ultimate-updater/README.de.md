---
chapters: {"pages":{"en/adapterref/iobroker.ultimate-updater/README.md":{"title":{"en":"ioBroker.ultimate-updater"},"content":"en/adapterref/iobroker.ultimate-updater/README.md"},"en/adapterref/iobroker.ultimate-updater/README.de.md":{"title":{"en":"ioBroker.ultimate-updater"},"content":"en/adapterref/iobroker.ultimate-updater/README.de.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ultimate-updater/README.de.md
title: ioBroker.ultimate-updater
hash: 1FxG01HaE0rHcUZV2pQJgOOHD9lCTOrTOTKxAr7jB58=
---
![Логотип](../../../en/adapterref/iobroker.ultimate-updater/admin/ultimate-updater.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.ultimate-updater.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ultimate-updater.svg)
![Количество установок](https://iobroker.live/badges/ultimate-updater-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/ultimate-updater-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.ultimate-updater.png?downloads=true)
![Тестирование и выпуск](https://github.com/ipod86/ioBroker.ultimate-updater/workflows/Test%20and%20Release/badge.svg)

# ioBroker.ultimate-updater

🇬🇧 [Английская версия](/#/adapters/ultimate-updater)

## Ultimate-Updater-Адаптер для ioBroker

Приостановите обновление статуса, определите Proxmox-хосты, LXC-контейнер и виртуальные машины в ioBroker и запустите Prüfungen и Updates согласно Knopfdruck.

Адаптер — это клиент для **[Ultimate Updater](https://github.com/BassT23/Proxmox) от [@BassT23](https://github.com/BassT23)** . Der Ultimate Updater обеспечивает собственную работу на Proxmox-Cluster (обновления, снимки/резервные копии, фильтр, модель состояния); dieser Adaptor ist nur dessen Status über die Integrations-API v1 und löst die dort angebotenen Aktionen aus. Имя и значок были добавлены с Erlaubnis от [@BassT23](https://github.com/BassT23) verwendet – vielen Dank!

Значок адаптера — это оригинальный значок Ultimate-Updater-Icon от BassT23, который доступен с помощью Erlaubnis ( [web-ui/assets/ultimate-updater-icon.png](https://github.com/BassT23/Proxmox/blob/master/web-ui/assets/ultimate-updater-icon.png) ).

> **Адаптер сообщества Inoffizieller.** Вы можете использовать Ultimate Updater или Proxmox Server Solutions GmbH. Proxmox® — это eine eingetragene Market of Proxmox Server Solutions GmbH.

### Voraussetzungen

- Node.js >= 22, js-контроллер >= 6.0.11, администратор >= 7.8.23 (для администратора учетных данных диспетчера учетных данных 7.9)
- Ultimate Updater **5.2 или новый** (версия до 5.2: der `develop` -Zweig) с активатором веб-интерфейса (стандартный порт) `8765`)
- Этот **API-токен** для интеграции-API v1. Он работает только с HTTPS и имеет собственное мнение. На хосте Proxmox:
  ```bash
  ultimate-updater-api-token enable
  ultimate-updater-api-token create iobroker --permissions read,logs,check,update,reboot,cancel
  ```
  Der Token будет иметь важное значение. Rechte, die du nicht vergeben willst, lässt du weg (z. B. `read,logs,check` nur für Status und Prüfungen); die zugehörigen Buttons melden dann «keine Berechtigung».

Объединение с вашим Proxmox-Konto или веб-интерфейсом пользователя не будет особенно интересным: вы можете настроить Konto с помощью администратора-ответа, и их конечный пункт будет стабильным.

### Конфигурация

| Einstellung                               | Описание                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| IP-адрес/имя хоста, порт, доступ по HTTPS | Адрес Ultimate-Updater-Weboberfläche (функционал API и HTTPS)                                                                                                                                                                                                                                                                                                                                                             |
| API-токен                                 | **Hier eingeben** (wird verschlüsselt Gespeichert) или **aus dem Credentials-Manager** des Admin (Einstellungen → Credentials, ein Eintrag vom Typ «Key»; подходит для Admin 7.9 и js-controller 7.2.2 или новых). Ein geänderter Eintrag wird sofort ohne Neustart des Adapters übernommen.                                                                                                                              |
| TLS-Zertifikat validieren                 | Стандартный вариант, если веб-интерфейс пользователя является самостоятельным сертификатом Proxmox                                                                                                                                                                                                                                                                                                                        |
| Актуальный статус Vollständige            | Intervall zum Lesen aller Targets (минуты, стандартные 60). Nach einem bedeten Job будет соответствовать актуальному статусу.                                                                                                                                                                                                                                                                                             |
| Job-Abfrageintervall                      | Часто список заданий включается: в режиме ожидания (стандартно 30 с) и в режиме ожидания (стандартно 2 с)                                                                                                                                                                                                                                                                                                                 |
| Ausgenommen von «Alle aktualisieren»      | VM/CT, используйте Sammel-Update-Buttons (например, ioBroker-Container). Einzeln lassen sie sich weiterhin aktualisieren. Die Liste wird von der laufenden Instant geladen.                                                                                                                                                                                                                                               |
| Sammel-Updates umfassen                   | **Доступны виртуальные машины/CT** (стандартные) или **все виртуальные машины/CT** . «Все» функционируют только в том случае, если в Ultimate Updater активирована функция «Ultimate Updater» (`STOPPED_CONTAINER` /`STOPPED_VM` в дессен `update.conf`): Er startet sie dann für das Update und fährt sie danach wieder herunter. Sonst überspringt der Ultimate Updater является и вашим Джобсом, который вам нравится. |
| Neustart-Buttons erlauben                 | Legt für Hosts/VMs/CTs, die einen Neustart brauchen, einen `reboot` -Кнопка ан. Standardmäßig aus.                                                                                                                                                                                                                                                                                                                         |
| Больше ничего не известно о целях         | В случае ввода данных с хостов/виртуальных машин/CT, Ultimate Updater больше не работает (например, в Proxmox gelöscht). Стандартный вариант; Это вариант, который может быть полезен.                                                                                                                                                                                                                                    |
| Benachrichtigungen                        | Neue Sicherheitsupdates, Neustart erforderlich, Job fehlgeschlagen/abgebrochen – jeweils einzeln abschaltbar                                                                                                                                                                                                                                                                                                              |

### Точки данных

| Пункт данных                                                                                 | Описание                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `info.connection`                                                                            | Verbindung zur Web-UI                                                                                                                                                                                                                       |
| `info.lastRefresh`, `info.targetCount`, `info.updaterVersion`, `info.updaterUpdateAvailable` | Allgemeine Informationen                                                                                                                                                                                                                    |
| `jobRunning`                                                                                 | Ein Prüf-/Update-Job läuft                                                                                                                                                                                                                  |
| `summary.text`                                                                               | Kurze Zusammenfassung in der Systemsprache, z. B. «7 обновлений для 3 систем, 1 новостного сообщения»                                                                                                                                       |
| `summary.report`                                                                             | Statusbericht als mehrzeiliger Text wie die Status-Mail des Ultimate Updater (Updates je Node, aktuell, Neustart notig, nicht erreichbar, Fehler, übersprungen), Überschriften in der Systemsprache – z. B. для Telegram или карты Markdown |
| `summary.*`                                                                                  | Offene Sicherheits-/normale Updates Gesamt, Targets mit Updates, nicht erreichbare Targets, Targets mit ausstehendem Neustart                                                                                                               |
| `targets.<Name>_<ID>.*`                                                                      | Алле Фелдер, автор Ultimate Updater pro Host/LXC/VM Lifert (z. B. `security_updates`, `normal_updates`, `reboot_required`, `reachable`, `last_check`)                                                                                       |
| `targets.<…>.jobState`, `targets.<…>.jobUnit`                                                | Статус и идентификатор целей Джобса (`none`, wenn es keinen gibt)                                                                                                                                                                          |
| `widget.data`                                                                                | Все данные и данные о Джобсе в формате JSON – самые простые веб-компоненты                                                                                                                                                                  |
| `jobs.<Unit>.*`                                                                              | Laufende und Letzte Джобс; bei fehlgeschlagenen Джобс stehen die letzten Logzeilen in `log`                                                                                                                                                  |

### Кнопки

| Кнопка                  | Акция                                                                                                                                                                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `targets.<…>.checkNow`  | Diesen Host/diese VM/diesen CT prüfen (kein Update)                                                                                                                                                                                                |
| `targets.<…>.updateNow` | Diesen Host/diese VM/diesen CT aktualisieren (Количество хостов на обновление узла, Gäste werden nicht angefasst)                                                                                                                                  |
| `checkAll`              | Alle Targets inklusive Hosts prüfen                                                                                                                                                                                                                |
| `updateAllVmsCts`       | Все действующие виртуальные машины/CT, хосты и другие целевые объекты находятся в разработке.                                                                                                                                                      |
| `updateSecurityOnly`    | **Полностью** обновите виртуальные машины/CT, отключите Sicherheitsupdates; Хозяева и другие цели были сверхвысокими. Der Ultimate Updater, если вы используете Sicherheits-Update, также включает в себя все обновления, установленные для целей. |
| `bulk.stop`             | Обновление Laufendes Sammel для актуальных целей                                                                                                                                                                                                   |
| `targets.<…>.reboot`    | Diesen Host/diese VM/diesen CT neu starten – nur vorhanden, когда Neustart-Buttons erlaubt sind und das Target einen Neustart braucht                                                                                                              |
| `jobs.<Unit>.cancel`    | Diesen Job сокращенный – nur vorhanden, solange der Job läuft                                                                                                                                                                                      |

Es wird nie autotisch actualisiert или neu gestartet – nur per Knopfdruck. Solange ein Job läuft, werden weitere Aktionen abgelehnt.

**Обновления Sammel-Updates laufen nacheinander:** ответ Der Ultimate Updater, который находится _в рабочем состоянии_ (HTTP 202). Адаптер должен быть готов к работе, прежде чем начать работу с заданными целями. Кроме того, вы можете работать с другими сотрудниками Джобса (например, в веб-интерфейсе). Ден Фортшритт Зейген `bulk.active` унд `bulk.progress` (з. Б. `3/7: web`, am Ende z. B. `4 ok, 2 unchanged, 1 failed, 0 not started`; "unchanged" = Jobstatus `skipped`, es gab nichts zu aktualisieren).

### Виджет (веб-компонент) для AURA, просмотра 2 и других визуальных эффектов

Адаптер приносит виджет **«Ultimate-Updater-Tabelle»** с (своими веб-компонентами, нуцбаром в AURA, vis-2 и другой визуализацией, неиспользуемыми веб-компонентами): все хосты, виртуальные машины и контейнеры в каждой таблице с обновлениями (Sicherheit / weitere), Neustart-Hinweis, Job-Status und den Knöpfen – Dieselben Datenpunkte wie oben, Fertig fürs Dashboard. Sie braucht kein Skript und keine simple-api: Die Knöpfe schreiben die Button-Datenpunkte Direct über die Verbindung der Visualisierung.

![Ultimate-Updater-Tabelle](https://raw.githubusercontent.com/ipod86/ioBroker.ultimate-updater/main/docs/widget_de.jpg)

- Zusammenfassung mit Fortschritt von «Alle prüfen» und Sammel-Updates, Knöpfe _Alle prüfen_ , _Alle VMs/CTs updaten_ und _Nur mit Sicherheitsupdates_
- Система Je: Status-Punkt, Typ und ID, Kennzeichen (Neustart, läuft, Fehler), Prüfen-/Update-/Neustart-Knöpfe также как символы или текст.
- Fehlgeschlagene Jobs: Grund und letzte Logzeilen klappen unter der Zeile auf (das Log wird erst beim Öffnen gelesen)
- Rückfragen vor Updates und Neustarts erscheinen erscheinen unter der der angetippten Zeile
- Дополнительный **CPU-, RAM- и Festplatten-Auslastung aus dem [proxmox-Adapter](https://github.com/iobroker-community-adapters/ioBroker.proxmox)** je System, оранжевый/rot ab einstellbaren Grenzen (Festplatte: Container; VMs nur mit Gast-Agent)
- Einstellungen: welche Knöpfe und Systeme gezeigt werden (Hosts, ausgeschaltete, nur Systeme mit Updates), Reihenfolge, Zeilenhöhe, Textgröße, abwechselndhinterlegte Zeilen und die Farben
- Neue oder gelöschte Systeme erscheinen von selbst

В AURA (начиная с версии 0.106.0) виджет доступен для установки в списке виджетов; Beim Widget **«Klicks» auf «KonComponente» stellen** , sonst kommen die Knöpfe nicht an. vis-2 braucht версии 2.20.7 или новой версии.

### Benachrichtigungen

Адаптер отсутствует в диспетчере уведомлений ioBroker; Телеграмма, электронная почта, Pushover usw. Мы также являемся центральным звеном в ioBroker eingerichtet. Gemeldet werden nur Änderungen, in der Systemsprache:

- **Neue Sicherheitsupdates** – die Anzahl der Sicherheitsupdates eines Hosts/einer VM/eines CT ist gestiegen
- **Neustart erforderlich** – ein Host/eine VM/ein CT braucht neu einen Neustart
- **Job fehlgeschlagen** – ein Prüf-/Update-/Neustart-Job ist fehlgeschlagen или wurde abgebrochen (auch Jobs, die fehlschlugen, während der Adaptor gestoppt war)

Beim allerersten Start wird nichts gemeldet; der aktuelle Stand wird nur erfasst.

### Безопасность

- **API-токен** доступен для входа в систему Proxmox. Если вы работаете с HTTPS и получаете доступ к информации, вы можете ее получить (`read`, `logs`, `check`, `update`, `reboot`, `cancel`). Vergib nur, был du brauchst; entziehen kannst du ihn auf dem Host mit `ultimate-updater-api-token revoke <id>`.
- Токен находится в ioBroker (или в центральном диспетчере учетных данных). Если вы зайдете в ioBroker-Admin или на этот объект Objektdatenbank, вы можете получить несколько дополнительных сведений.
- Если адаптер **не получил стандартного сертификата TLS, он не станет нормальным для** веб-интерфейса, если сертификат Proxmox не будет установлен. Die Verbindung ist dann zwar verschlüsselt, ein Angreifer im eigenen Netz könnte den Token aber abfangen (Человек посередине). Активация _TLS-сертификата действительна_ , если веб-интерфейс пользователя полностью завершён, а адаптер установлен в сети.
- Используйте функцию Zugriff для порта Ultimate-Updater-Web-UI в системе, в браузере (например, для брандмауэра).

### Hinweis zur API

Адаптер полностью документирован, версия Integrations-API v1 от Ultimate Updater 5.2 (Bearer-Token, собственная защита, без HTTPS) используется с использованием BassT23 ( [BassT23/Proxmox#378](https://github.com/BassT23/Proxmox/issues/378) ).

## Changelog
<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 0.2.1 (2026-11-14)
* (ipod86) fix: Web-Komponente lädt deutlich schneller und in einem Schritt (alle Ziele und Jobs im neuen Datenpunkt `widget.data`); Rückfrage-Box in manchen Themes nicht mehr weiß

### 0.2.0 (2026-11-14)
* (ipod86) feat: Widget „Ultimate-Updater-Tabelle“ (Web-Komponente) für AURA, vis-2 und andere Visualisierungen, optional mit CPU/RAM/Festplatte aus dem proxmox-Adapter

### 0.1.3 (2026-11-14)
* (ipod86) fix: eine Benachrichtigung pro Kategorie und Statusabfrage mit allen Zielen statt einer pro Ziel – der Benachrichtigungs-Manager hat sonst bei jeder einzelnen Meldung die offenen erneut verschickt (doppelte Telegram-Nachrichten)

### 0.1.2 (2026-11-12)
* (ipod86) fix: Objektfelder der API (z. B. `error`, `skip_reason`) sind immer Channels; null leert deren Datenpunkte; fehlerhafte Objekte werden beim Start repariert
* (ipod86) fix: Log-Meldungen der Benachrichtigungen immer auf Englisch
* (ipod86) fix: unbehandelte Promise-Rejections in Hintergrundaufgaben; Wartezeiten enden beim Stoppen sofort
* (ipod86) fix: keine Standard-IP-Adresse mehr, eine fehlende Adresse wird gemeldet
* (ipod86) chore: nur noch die Buttons abonniert; Titel „Ultimate Updater“ in allen Sprachen; README nennt die Erlaubnis für Name und Icon

### 0.1.1 (2026-10-25)
* (ipod86) Release über den GitHub-Workflow veröffentlicht (Trusted Publishing); News nur für Versionen auf npm; vereinheitlichte Repository-URL

### 0.1.0 (2026-10-25)
* (ipod86) **Breaking:** nur noch Anmeldung per API-Token (Integrations-API v1, Ultimate Updater 5.2+); der Web-UI-Login mit Proxmox-Benutzer wurde entfernt
* (ipod86) Warnung, wenn HTTPS abgeschaltet ist; laufende Anfragen werden beim Stoppen abgebrochen; feste Rollen für Zeitfelder; `info.connection` nur bei Änderung geschrieben; README und Übersetzungen der News korrigiert
* (ipod86) Benachrichtigungen nennen das Ziel mit ID und Name („115 · iobroker“), damit gleichnamige Ziele unterscheidbar sind

### 0.0.2 (2026-10-21)
* (ipod86) Sammel-Updates laufen nacheinander (Warten auf jeden Job), Fortschritt in `bulk.*`
* (ipod86) Security-Update-Button klarer beschrieben; Sicherheitshinweise in der README
* (ipod86) Einstellung, ob Sammel-Updates auch ausgeschaltete VMs/CTs umfassen (Standard: nur laufende)
* (ipod86) Anmeldung per API-Token über die Integrations-API v1 von Ultimate Updater 5.2 (Web-UI-Login bleibt verfügbar)
* (ipod86) Sammel-Updates zählen Jobs ohne Paketänderung (Jobstatus `skipped`, Ultimate Updater 5.2) als "unchanged" statt als fehlgeschlagen
* (ipod86) neuer Datenpunkt `summary.report`: Statusbericht als Text wie die Status-Mail des Ultimate Updater

Ältere Changelog-Einträge stehen in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 ipod86 <david@graef.email>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.