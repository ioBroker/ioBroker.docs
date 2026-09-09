---
chapters: {"pages":{"en/adapterref/iobroker.elgato-key-light/README.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README.md"},"en/adapterref/iobroker.elgato-key-light/README_DE.md":{"title":{"en":"ioBroker.elgato-key-light"},"content":"en/adapterref/iobroker.elgato-key-light/README_DE.md"},"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md":{"title":{"en":"Elgato local API evidence"},"content":"en/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md"},"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md":{"title":{"en":"Migration guide"},"content":"en/adapterref/iobroker.elgato-key-light/docs/MIGRATION.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.elgato-key-light/docs/ELGATO_API.md
title: Доказательства использования локального API Elgato
hash: Y/4BlHoHGYwvxYNLRtznUTip8X0rR9oisNL/Aek3vvw=
---
# Доказательства использования локального API Elgato

Адаптер использует локальный неаутентифицированный HTTP-протокол Elgato и определяет тип службы.`_elg._tcp.local.` Поддержка конечных точек целенаправленно основана на фактических данных и ориентирована на реагирование.

| Конечная точка            | Метод             | использование адаптера                                                                                            | Уверенность                                                                  |
| ------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `/elgato/accessory-info`  | ПОЛУЧАТЬ          | Идентификационные данные, информация о продукте, микропрограммное обеспечение, характеристики и метаданные Wi-Fi. | Проверено существующим адаптером и общедоступными клиентами.                 |
| `/elgato/accessory-info`  | ПОМЕЩАТЬ          | Отображаемое имя                                                                                                  | Реализовано; ожидается проверка оборудования.                                |
| `/elgato/lights`          | ПОЛУЧИТЬ/ВСТАВИТЬ | Мощность, яркость, цветовая температура, оттенок и насыщенность                                                   | Проверено существующим адаптером и общедоступными клиентами.                 |
| `/elgato/lights/settings` | ПОЛУЧИТЬ/ВСТАВИТЬ | Настройки запуска/перехода и обход батареи Mini                                                                   | Форма проверена публично; для изменения требуется полная аппаратная матрица. |
| `/elgato/battery-info`    | ПОЛУЧАТЬ          | Мини-аккумулятор, зарядка и напряжение/ток                                                                        | Подтверждено на основании мини-ответа/общедоступного клиента.                |
| `/elgato/identify`        | ПОЧТА             | Определить действие                                                                                               | Проверено публичными клиентами                                               |

Парсер принимает необязательные поля и сохраняет их.`hardwareRevision` в виде строки. Возможности определяются на основе фактических полей освещенности/настроек/реакции батареи. Температура передается в миледах и отображается в Кельвинах; значения RGB преобразуются через HSV для собственного API.

## Преднамеренные исключения

- Функция перезапуска не предоставляется через пользовательский интерфейс/контракт состояния адаптера.
- Сцены и эффекты, связанные со светодиодной лентой, остаются недокументированными/экспериментальными и не подвергаются изменениям.
- Облачные API, учетные данные и телеметрия не используются.

## Рабочий процесс сбора доказательств с оборудования

Бегать`npm run elgato:probe -- <private-host> [port]` Для каждой доступной модели. Прикрепите очищенный JSON с версией прошивки к тестовой записи. Перед продвижением необязательных мутаций протестируйте GET-запрос, одно ограниченное изменение, обратное чтение, перезапуск механизма сохранения данных (где это необходимо), откат и выключение адаптера. Планируемая матрица: один Key Light, одна светодиодная лента и два мини-блока Key Light. Аппаратные тесты остаются необязательными и никогда не должны запускаться в CI.

## Источники

- Протокол связи Elgato: <https://help.elgato.com/hc/en-us/articles/360060048331-What-Communication-Protocol-Is-Used-by-Elgato-Wi-Fi-Products>
- Обзор API Elgato Key Light: <https://help.elgato.com/hc/en-us/articles/4413403384845>
- Интеграция с Home Assistant: <https://www.home-assistant.io/integrations/elgato>
- Клиент Elgato на Python: <https://github.com/frenck/python-elgato>
- API-клиент NickParks: <https://github.com/NickParks/elgato-light-api>
- Реализация Homebridge: <https://github.com/derjayjay/homebridge-keylights>