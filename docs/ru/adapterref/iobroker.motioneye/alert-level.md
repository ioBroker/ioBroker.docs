---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.motioneye/alert-level.md
title: без названия
hash: uZM37r8PYppw88C5qYCtwXLiMSIY9XkfkT4ASjhr8oI=
---
![логотип](../../../de/admin/motioneye.png)

[Вернуться к обзору документации](/#/adapters/motioneye)

## Уровень защиты (`alertLevel` )

Каждая камера объединяет режим **alertLevel** MotionEye и обнаружение движения с помощью Telegram в записываемом информационном блоке — идеально подходит для выпадающего списка VIS.

| `alertLevel` | MotionEye`mode` | `motion` -Курок | Телеграмм при переезде                                |
| ------------ | --------------- | --------------- | ----------------------------------------------------- |
| `off`        | `off`           | нет             | нет                                                   |
| `motion`     | `still`         | Да              | нет                                                   |
| `notify`     | `still`         | Да              | Да (текст/изображение согласно вкладке «Уведомления») |
| `record`     | `sharp`         | Да              | нет                                                   |
| `full`       | `sharp`         | Да              | Да                                                    |

Путь:`motioneye.<Instanz>.<kamera>.alertLevel` (на том же уровне, что и`mode` ).

### использование VIS

выпадающее мен&#x44E;**`alertLevel`** привязывать вместо прикрепления`mode` Адаптер применяет профиль и удерживает его.**`mode`** синхронный (`still` /`sharp` /`off` ).

Псевдонимы (регистронезависимое обозначение):`aus` ,`bewegung` ,`alarm` ,`aufnahme` ,`vollschutz` или`0` –`4` .

### Управление устаревшими системами через`mode`

Прямое письм&#x43E;**`mode`** Работает (существующие VIS/скрипты). Затем Telegram следует настройкам на вкладке **«Уведомления»** ;**`alertLevel`** Для отображения установлен соответствующий уровень.

Письмо &#x43E;**`alertLevel`** До дальнейшего уведомления приоритет в перемещении пользователей отдается Telegram.**`mode`** написано.

### Упорство

Выбранный уровень находится &#x432;**`alertLevel`** -Состояние, которое повторно применяется после перезапуска адаптера.

Руководств&#x43E;**`snapshot`** и остаются независимыми в конфигурации **при использовании снимков** .

### Изображение в Telegram о движении (`notify` /`full` )

Если вкладка «Уведомления» включает опцию **«Отправлять изображение»** , адаптер **сначала запускает создание снимка MotionEye** при активации веб-перехватчика движения (например, при ручном запуске).**`snapshot`** (-кнопка), ожидани&#x435;**`snapshotCacheDelayMs`** (Вкладка «Снимки», по умолчанию 800 мс), а затем загружает JPEG-файл для Telegram. В этом режим&#x435;**`still`** Зачастую готового продукта еще нет в наличии.`lastsnap.jpg` не предприняв этот шаг.