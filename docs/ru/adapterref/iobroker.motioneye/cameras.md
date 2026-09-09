---
chapters: {"pages":{"de/adapterref/iobroker.motioneye/README.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/README.md"},"de/adapterref/iobroker.motioneye/settings.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/settings.md"},"de/adapterref/iobroker.motioneye/cameras.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/cameras.md"},"de/adapterref/iobroker.motioneye/modes.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/modes.md"},"de/adapterref/iobroker.motioneye/alert-level.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/alert-level.md"},"de/adapterref/iobroker.motioneye/datapoints.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/datapoints.md"},"de/adapterref/iobroker.motioneye/vis-stream.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/vis-stream.md"},"de/adapterref/iobroker.motioneye/faq.md":{"title":{"de":"no title"},"content":"de/adapterref/iobroker.motioneye/faq.md"}}}
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.motioneye/cameras.md
title: без названия
hash: qB6iXpjqxbsX6uX3YLXyXf+M5bMvVWE5zHDP6O2yCnE=
---
![логотип](../../../de/admin/motioneye.png)

[Вернуться к обзору документации](/#/adapters/motioneye)

## Камеры планшетов

| Расколоть                | Описание                                                                                                       |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| Отображаемое имя         | Отображение в ioBroker; папки каналов — **строчными буквами** (например,`Garten` →`garten` )                   |
| MotionEye ID             | Числовой идентификатор из веб-интерфейса MotionEye → видеоустройство → идентификатор камеры, или`/config/list` |
| Внутренний идентификатор | Стабильный ключ веб-перехватчика (например,`auffahrt` ); пусто = получено из отображаемого имени               |
| Папка "Медиа"            | Дополнительно в разделе`/var/lib/motioneye` ; устанавливается при запуске адаптера                             |
| Активный                 | Отключить, чтобы пропустить камеру                                                                             |

### Камеры от MotionEye загружаются

Экземпляр должен быть **запущен** . Кнопка ведет к...`/config/list` Добавьте строку в таблицу, не удаляя существующие строки. Сохраните и перезапустите программу после добавления строк.

После перезапуска адаптер создает точки данных и записывает URL-адреса веб-перехватчиков в MotionEye.