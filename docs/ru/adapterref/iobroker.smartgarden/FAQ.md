---
chapters: {"pages":{"en/adapterref/iobroker.smartgarden/README.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/README.md"},"en/adapterref/iobroker.smartgarden/FAQ.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/FAQ.md"},"en/adapterref/iobroker.smartgarden/FORECAST.md":{"title":{"en":"ioBroker.smartgarden"},"content":"en/adapterref/iobroker.smartgarden/FORECAST.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.smartgarden/FAQ.md
title: ioBroker.smartgarden
hash: ZSuRKfaP/jQsYRLdEy+UiPYzQ45P1hj+C9ueiejgu4g=
---
![Логотип](../../../en/adapterref/iobroker.smartgarden/admin/smartgarden.png)

# IoBroker.smartgarden
## ЧАСТО ЗАДАВАЕМЫЕ ВОПРОСЫ
| Вопрос | Ответ |
| - | - |
| Я постоянно получаю `Error: 401` | Повторно проверьте имя пользователя, пароль и ключ API |
| Я не получаю значения для прогноза времени кошения или зарядки | Удалите точки данных `info.saveMowingHistory` и `info.saveChargingHistory` и начните заново. Убедитесь, что у вас есть хотя бы один цикл кошения/зарядки без ошибок |
| Я не получаю значения для прогноза времени кошения или зарядки | Удалите точки данных `info.saveMowingHistory` и `info.saveChargingHistory` и начните заново. Убедитесь, что у вас есть хотя бы один цикл кошения/зарядки без ошибок |
| Я хотел бы получить больше/другие значения для своих устройств | Пожалуйста, прочтите главу *Пожелания относительно точек данных* в [README](/#/adapters/smartgarden) |
| Я получаю `invalid date` для каждой метки времени | Это поведение должно быть исправлено в версиях > 0.6.0 |
| У меня постоянно появляется ошибка `Error: getlocations: no data` | Эта ошибка была связана с API Gardena Smart и исправлена компанией Gardena |
| У меня постоянно появляется ошибка `Error: getlocations: no data` | Эта ошибка была связана с API Gardena Smart и исправлена компанией Gardena |
| Мои устройства, например, газонокосилка, не реагируют на мои команды. | Пожалуйста, убедитесь, что вы установили значение для команды с помощью `ack=false`. См. [Раздел «Команды и статусы» в руководстве для разработчиков адаптеров.](https://github.com/ioBroker/ioBroker.docs/blob/master/docs/en/dev/adapterdev.md#commands-and-statuses)|
| Почему моя газонокосилка / мой клапан / моя розетка запускаются на одну минуту, хотя я задал другую команду, например, `PARK_UNTIL_NEXT_TASK` для газонокосилки? | Весьма вероятно, что вы неправильно написали команду. Если адаптер не распознает команду, устройство запускается на 60 секунд. |
| Почему моя газонокосилка / мой клапан / моя розетка запускаются на одну минуту, хотя я задал другую команду, например, `PARK_UNTIL_NEXT_TASK` для газонокосилки? | Весьма вероятно, что вы неправильно написали команду. Если адаптер не распознает команду, устройство запускается на 60 секунд. |
| Я не могу ввести секретный ключ приложения. Поле неактивно. | Пожалуйста, удалите имя пользователя и пароль. Можно ввести только секретный ключ приложения или имя пользователя и пароль.|

<!--- SVN: $Rev: 2931 $ $Date: 2023-06-14 21:18:24 +0200 (Mi, 14 Jun 2023) $ --->