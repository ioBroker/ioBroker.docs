---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.motioneye/settings.md
title: без названия
hash: KZwEG6W4cdAq0z99Cb/Kfdjvsfo30rNeqNIMMoH3jzg=
---
![логотип](../../../de/admin/motioneye.png)

[Вернуться к обзору документации](/#/adapters/motioneye)

## Вкладка Настройки

| вариант                                           | стандарт   | Описание                                                                                     |
| ------------------------------------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| хост MotionEye                                    | _(Долг)_   | IP-адрес или имя хоста сервера MotionEye                                                     |
| Порт API конфигурации MotionEye                   | `8765`     | Режим, веб-хуки, управление потоком, снимки                                                  |
| Пользователи MotionEye                            | `admin`    | Вход через веб-сайт                                                                          |
| пароль MotionEye                                  | _(пустой)_ | Повторно войдите в систему после обновления адаптера по адресу`unauthorized` в журнале       |
| Управление MotionEye через Config-API             | `true`     | Оставьте в активном состоянии для нормальной работы.                                         |
| хост веб-перехватчика                             | _(Долг)_   | IP-адрес/имя хоста ioBroker, **доступный из MotionEye.**                                     |
| порт веб-хука                                     | `8090`     | Встроенный обработчик веб-хуков; разрешает входящие соединения с ioBroker.                   |
| Автоматический сброс движения (мс)                | `15000`    | Сколько`.motion` После установки значения параметра webhook в true, оно остается неизменным. |
| Интервал запроса статуса (с)                      | `300`      | Опрос о состоянии MotionEye                                                                  |
| Отключить видеопоток при запуске системы.         | `true`     | Поток прекращается, когда адаптер начинает работать.                                         |
| Автоматическое отключение импульсного потока (мс) | `120000`   | Продолжительность для`streamPulse`                                                           |

### motionHost против webhookHost

- **motionHost** — ioBroker **подключается к** MotionEye (Config-API, порт 8765).
- **webhookHost** — MotionEye **подключается к** ioBroker (веб-хуки, порт 8090).

Оба направления должны работать в сети. В средах Docker IP-адрес, видимый с ПК, может отличаться от того, который требуется контейнерам.