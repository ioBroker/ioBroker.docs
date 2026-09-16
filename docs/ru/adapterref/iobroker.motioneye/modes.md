---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.motioneye/modes.md
title: без названия
hash: WZWrMXesdSZX8UxZd3RBAr5HC62U6puiR3nkhR6G2xM=
---
![логотип](../../../de/admin/motioneye.png)

[Вернуться к обзору документации](/#/adapters/motioneye)

## режимы камеры

| режим   | Обнаружение движения | Видеозапись    | Webhook to ioBroker |
| ------- | -------------------- | -------------- | ------------------- |
| `off`   | нет                  | нет            | нет                 |
| `still` | Да                   | нет            | Да                  |
| `sharp` | Да                   | MP4 в движении | Да                  |

Режим через точку данных`<kamera>.mode` или задать скрипты. Адаптер записывает конфигурацию MotionEye, когда **MotionEye активно управляется через Config-API** .

Для **выпадающего списка VIS,** включающего Telegram для отслеживания перемещений, необходимо выбрать соответствующий пункт.[`alertLevel`](/#/docs/adapterref/iobroker.motioneye/alert-level.md) использовать (`off` /`motion` /`notify` /`record` /`full` Точка данных`mode` его берут с собой.