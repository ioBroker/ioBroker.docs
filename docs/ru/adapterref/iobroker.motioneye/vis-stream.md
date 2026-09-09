---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.motioneye/vis-stream.md
title: без названия
hash: 9HAb4DYfaXqIr3Ug3NYExOi91n+ecBcvZx4IyjMli6Y=
---
![логотип](../../../de/admin/motioneye.png)

[Вернуться к обзору документации](/#/adapters/motioneye)

## Прямая трансляция в VIS (VIS1 / VIS2)

Рекомендуется: **HTML-виджет** с **привязкой**`streamUrl` Адаптер записывает туда сообщение о завершении работы.`<img>` — Фрагмент кода — не вводите URL-адрес MotionEye вручную.

### Шаги

1. **Включите трансляцию** —`<kamera>.stream` на`true` установить или`<kamera>.streamPulse` Запустите предварительный просмотр.

2. Разместите **HTML-виджет** в режиме просмотра VIS.

3. **Привязка в поле HTML** , например:

   ```
   {motioneye.0.garten.streamUrl}
   ```

   `0` по номеру экземпляра и`garten` Замените на название канала камеры (строчные буквы, см. вкладку «Объекты»).

4. Подождите немного после включения трансляции —`streamUrl` Обновление происходит, когда порт MJPEG готов.

5. **Дополнительно:** Включите виджет`<kamera>.stream` связывать.

### Примечания

- `streamUrl` Она защищена от записи и обновляется автоматически.
- **HTTPS в VIS + HTTP в MotionEye:** Браузер может блокировать смешанный контент.
- Панели мониторинга с несколькими камерами: адаптер может повторно связывать соседние потоки после повторного рендеринга VIS.