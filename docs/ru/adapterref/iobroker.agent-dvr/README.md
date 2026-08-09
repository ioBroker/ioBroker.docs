---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.agent-dvr/README.md
title: ioBroker.agent-dvr
hash: FndVMZc/c5xH7KZmBMM8n02qGF84wi5MYMsFCtz3xDA=
---
![Логотип](../../../en/adapterref/iobroker.agent-dvr/admin/agent-dvr.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.agent-dvr.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.agent-dvr.svg)
![Количество установок](https://iobroker.live/badges/agent-dvr-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/agent-dvr-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.agent-dvr.png?downloads=true)

# IoBroker.agent-dvr
**Тесты:** ![Тестирование и выпуск](https://github.com/ipod86/ioBroker.agent-dvr/workflows/Test%20and%20Release/badge.svg)

## Адаптер agent-dvr для ioBroker
Подключает ioBroker к [AgentDVR](https://www.ispyconnect.com): автоматически обнаруживает все камеры, отображает свойства каждого устройства в виде точек данных, предоставляет кнопки для всех распространенных команд (запись, включение, PTZ и т. д.), обеспечивает обновление галереи при появлении новых записей, генерирует адаптивный HTML-виджет галереи для каждой камеры и включает встроенную панель мониторинга в реальном времени с выбором потока для каждой камеры (MJPEG, MP4/FLV со звуком или go2rtc WebRTC).

## Требования
- ioBroker с адаптером `iobroker.web`
- **AgentDVR ≥ 7.8.0.0** — в более ранних версиях обнаружена ошибка в конечной точке `streamFile.cgi` (неправильно сформированная кодировка фрагментов, неверный MIME-тип), которая препятствует записи и воспроизведению во встроенной панели управления. Разработчик подтвердил, что исправление включено в версию 7.8.0.0.

## Функции
- Автоматическое обнаружение всех камер AgentDVR при запуске (за исключением микрофонов)
- Все свойства устройства отображаются в виде точек данных (полученных из API в плоском виде).
- Кнопки управления для каждого устройства: запись, снимок, обнаружение, оповещения о постановке/снятии с охраны, включение/выключение, обнаружение объектов, включение/выключение по расписанию, включение/выключение детектора, чувствительность (мин/макс/усиление), сброс, …
- Кнопки системного уровня: постановка на охрану, снятие с охраны, включение/выключение всех устройств, перезагрузка, управление хранилищем, перезапуск, …
- **Выбор профиля** — выпадающий список с возможностью редактирования, отображающий текущий профиль AgentDVR (Дома / Вне дома / Ночь / пользовательский)
- **Снимок в формате Base64** — состояние `snapshot_b64` для каждой камеры, записывается с помощью кнопки или автоматически обновляется при каждом цикле опроса.
- Управление поворотным механизмом с помощью кнопок, позволяющих удерживать кнопку для перемещения.
- Ссылки на потоковое видео для каждой камеры (снимок, фото, MJPEG, MP4)
— Конечная точка веб-перехватчика для обновлений в реальном времени — вызовите её из действия AgentDVR, чтобы немедленно запустить полный опрос.
— HTML-виджет галереи записей для каждой камеры (`widget_recordings`) и виджет живой записи для одной камеры (`widget_live`) — в режиме чистого HTML/CSS или полного JS с поиском и фильтром по тегам.
— Виджет обзора, объединяющий все камеры в одном HTML-состоянии.
- **Встроенная панель мониторинга в режиме реального времени** по адресу `http://<iobroker>:<webport>/agent-dvr.0/` — дополнительное приложение не требуется:
- Выбор формата потока для каждой камеры: MJPEG, MP4/FLV со звуком или go2rtc WebRTC/MSE
— Кнопка фильтра камер в заголовке (значок воронки) — открывает всплывающее окно с флажком для каждой камеры; значок показывает, сколько камер скрыто; состояние сохраняется в localStorage
— Индикаторы движения и оповещения в реальном времени (желтая/оранжевая рамка плитки) через Socket.io
- Полноэкранный режим с наложением PTZ-эффекта, записью, отключением звука и встроенной кнопкой полноэкранного режима браузера; заголовок автоматически скрывается.
— Вкладка «Записи» с сеткой, временной шкалой и журналом событий, поиском, сворачиваемым фильтром по тегам и видеоплеером с навигацией «предыдущее/следующее».
- Удаление записи непосредственно из всплывающего окна видеоплеера (требуется AgentDVR версии 7.7.8.0 и выше)
- Настройки отображения записей — значок шестеренки ⚙ на панели выбора/удаления регулирует ширину столбцов сетки, максимальное количество отображаемых записей и видимость значка (сохраняется в localStorage).
- Цвета с камер считываются из AgentDVR и применяются к полосам временной шкалы и точкам записи.
- Предустановки PTZ — перейдите к сохраненным предустановкам из окна PTZ (требуется AgentDVR версии 7.7.8.0 и выше)
— В строке состояния отображается количество камер в режиме реального времени и количество записей/событий в режиме просмотра записей.
- Автоматическое переподключение для всех типов потоков после прерывания сети или переключения вкладок.
- Полная возможность настройки цветовой темы через конфигурацию адаптера.

## Конфигурация
### Вкладка: Подключение
| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| IP-адрес AgentDVR | IP-адрес сервера AgentDVR | — |
| Порт | HTTP-порт AgentDVR | `8090` |
| Имя пользователя | Необязательное имя пользователя для базовой HTTP-аутентификации | — |
| Интервал опроса (с) | Как часто получать данные от AgentDVR (5–3600) | `30` |
| Тайм-аут HTTP (мс) | Тайм-аут на каждый запрос API (1000–30000) | `8000` |
| Таймаут HTTP (мс) | Таймаут на один API-запрос (1000–30000) | `8000` |

### Вкладка: Функции
**Элементы управления**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Кнопки управления системой | Создание кнопок постановки/снятия с охраны/перезапуска/… и селектора профилей | `true` |
| Генерация URL-адресов потока | Создание состояний URL (снимок, MJPEG, MP4) для каждой камеры | `true` |
| Снимок в формате Base64 | Автоматическое получение и сохранение текущего кадра в формате Base64 при каждом опросе | `false` |
| Снимок в формате Base64 | Автоматическая загрузка и сохранение текущего кадра в формате Base64 при каждом опросе | `false` |

**События**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Точки данных события | Метаданные зеркальной записи (последнее событие, количество, теги и т. д.) для каждой камеры | `true` |

**Отображать**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Виджет обзора | Единое HTML-состояние, объединяющее все плитки с изображением с камеры в режиме реального времени | `true` |

**Прокси**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Медиа-прокси | Маршрутизация потоков MJPEG, снимков, миниатюр записей и видео через ioBroker | `false` |

**Отлаживать**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Сохранение необработанного JSON-данных API | Запись полного ответа getObjects в `system.raw_getObjects` | `false` |

### Вкладка: Панель управления
**Вид по умолчанию**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Вид по умолчанию | Какая вкладка открывается при загрузке панели управления: «В прямом эфире» или «Записи» | `Live` |
| Максимальное общее количество записей | Максимальное количество записей, отображаемых на панели управления для всех камер (сначала самые новые). Не зависит от ограничения виджета. | `200` |
| Максимальное общее количество записей | Максимальное количество записей, отображаемых на панели управления для всех камер (сначала самые новые). Не зависит от ограничения виджета. | `200` |

**Сетка камер**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Столбцы | Количество столбцов сетки (0 = автоматическая подгонка по ширине плитки) | `0` |
| Положение бейджа | Угол, где на каждом блоке отображается бейдж с названием камеры | `bottom-right` |
| Расположение бейджа | Угол, где на каждом блоке отображается бейдж с названием камеры | `внизу справа` |

**Транслировать**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Интервал обновления (с) | Как часто панель мониторинга повторно запрашивает данные с камеры (10–600) | `60` |
| Автоматическое переподключение потоков | Автоматическое переподключение потоков MJPEG, MP4/FLV и go2rtc после ошибки или переключения вкладки | `true` |

**Цветовая тема** — 7 вариантов выбора цвета для вашего пользовательского интерфейса:

| Настройки | Описание |
|---------|-------------|
| Фон | Цвет фона страницы/сетки |
| Поверхность | Фоновое изображение с камеры |
| Акцент | Цвет выделения / активного элемента |
| Текст | Основной цвет текста |
| Граница | Цвет границы плитки |
| Индикатор онлайн-состояния | Цвет точки онлайн-статуса |
| Индикатор офлайн-режима | Цвет точки, указывающей на офлайн-статус |

**Назначение потока**

Здесь вы назначаете источник потока каждой камере по отдельности. В выпадающем списке отображаются все камеры, обнаруженные AgentDVR (микрофоны исключены).

| Вариант | Описание |
|--------|-------------|
| MJPEG *(AgentDVR)* | Классический поток MJPEG, предоставляемый AgentDVR — минимальная задержка, без звука |
| MP4 / FLV со звуком *(AgentDVR)* | Поток FLV, проксируемый через ioBroker с использованием flv.js — включает звук, правильное соотношение сторон |
| *название потока* *(go2rtc)* | Поток WebRTC/MSE от go2rtc — плавная работа, низкая задержка, поддержка звука |

Названия потоков go2rtc автоматически загружаются с сервера go2rtc при открытии административного интерфейса. Если браузер не может напрямую связаться с go2rtc (например, при передаче смешанного контента по HTTPS), адаптер загружает их на стороне сервера в качестве резервного варианта.

**URL-адрес go2rtc** (виден только в том случае, если хотя бы одна камера использует поток go2rtc)*

| Настройка | Описание | Пример |
|---------|-------------|---------|
| URL go2rtc | Базовый URL вашего экземпляра go2rtc | `http://192.168.1.10:1984` |

> **Примечание:** go2rtc должен уже иметь настроенные потоки. Адаптер только считывает список потоков и выступает в качестве прокси для WebSocket — он не настраивает go2rtc.

### Вкладка: Виджет (виджет галереи для каждой камеры)
**Общий**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Включить виджет | Создать виджет галереи HTML для каждой камеры | `true` |
| Режим виджета | `Без JS` — чистый HTML/CSS, встраивание куда угодно; `JS` — полная интерактивность с поиском и фильтром по тегам | `Без JS` |

**Макет**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Макс. записей | Максимальное количество записей, отображаемых в виджете | `20` |
| Максимальная ширина модального окна (пиксели) | Максимальная ширина модального окна воспроизведения видео | `900` |
| Максимальная ширина модального окна (в пикселях) | Максимальная ширина модального окна воспроизведения видео | `900` |

**Теги**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Показать теги | Отображать теги записи на каждом миниатюрном изображении | `true` |
| Расположение значка тега | Угол, где теги отображаются на миниатюре | `внизу слева` |

**Фильтр**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Новые записи первыми | Сортировать записи, чтобы самые новые были вверху | `true` |
| Компактный режим | Более плотная компоновка с уменьшенными миниатюрами | `false` |
| Компактный режим | Более плотная компоновка с уменьшенными миниатюрами | `false` |
| Размер миниатюры | `Small` / `Medium` / `Large` | `Medium` |
| Размер миниатюры | `Маленький` / `Средний` / `Большой` | `Средний` |

**Игрок**

| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Соотношение сторон в реальном времени | Соотношение сторон для предварительного просмотра прямой трансляции, например, `16/9` | — |
| URL проигрывателя | Пользовательский URL видеоплеера, используемого в виджете | — |

**Цветовая тема** — 5 палитр цветов + радиус скругления углов:

| Настройки | Описание |
|---------|-------------|
| Фон карточки | Фон карточки виджета |
| Фон тега | Фон чипа тега |
| Текст тега | Цвет текста метки тега |
| Акцентный | Цвет выделения |
| Фоновое изображение модального окна | Фоновое изображение видеомодального окна |
| Радиус скругления углов (пиксели) | Радиус закругления углов для карточек | `4` |

### Вкладка: Расширенные настройки
| Настройки | Описание | По умолчанию |
|---------|-------------|---------|
| Максимальная глубина рекурсии | Сколько уровней в глубину JSON-файла API преобразуется в точки данных (1–10) | `6` |
| Динамические теги | Автоматическое создание точки данных тега для каждого уникального тега записи | `false` |
| Динамические теги | Автоматически создавать точку данных тега для каждого уникального тега записи | `false` |
| Игнорировать теги (разделенные запятыми) | Запись тегов, которые следует исключить из данных события | — |
| Фильтр по тегам (разделенные запятыми) | Создавать только точки данных события для записей, соответствующих этим тегам | — |

## Панель мониторинга в реальном времени
В адаптере имеется встроенная панель мониторинга в реальном времени по адресу `http://<iobroker>:<webport>/agent-dvr.0/`.
Второй экземпляр доступен по адресу `/agent-dvr.1/`, третий — по адресу `/agent-dvr.2/` и так далее.

**Функции:**

- Выбор формата потока для каждой камеры: MJPEG, MP4/FLV со звуком (через flv.js) или go2rtc WebRTC/MSE
- Кнопка фильтра камер (значок воронки, заголовок в правом верхнем углу) — открывает всплывающее окно с флажками для каждой камеры и переключателем «Все»; значок показывает количество скрытых камер; состояние сохраняется в localStorage
- Полноэкранный режим с наложением PTZ-эффекта, кнопкой записи, кнопкой отключения звука и полноэкранным режимом браузера (заголовок автоматически скрывается через 3 секунды бездействия; появляется снова при нажатии мыши или касании).
— Индикаторы движения в реальном времени (желтая рамка) и оповещения (оранжевая рамка) через Socket.io
- Автоматическое переподключение: MJPEG и FLV переподключаются после ошибки; go2rtc переподключается после неожиданного закрытия WebSocket или задержки в 10 секунд.
— Вкладка «Записи» с сеткой, временной шкалой и журналом событий, поиском, сворачиваемым фильтром по тегам и видеоплеером с навигацией «предыдущее/следующее».
- Фильтр тегов разделяет разделенные запятыми теги AgentDVR на отдельные чипы для фильтрации по каждому тегу.
- Удалить запись из всплывающего окна видеоплеера или выбрать несколько записей, удерживая кнопку мыши, и выполнить массовое удаление (требуется AgentDVR версии 7.7.8.0 и выше).
— Настройки отображения записи — ⚙ кнопка с изображением шестеренки на панели выбора/удаления; ползунок для ширины столбцов сетки, ограничения максимального количества записей и переключения значка — все сохраняется в localStorage
— Значок «Новые записи» на вкладке «Записи» — показывает, сколько записей появилось с момента вашего последнего посещения этой вкладки; базовое значение хранится в локальном хранилище браузера и является общим для каждого браузера/устройства (не используется разными браузерами или устройствами).
- Цвета с камер считываются из AgentDVR и применяются к полосам временной шкалы и точкам записи.
- Предустановки PTZ — переход к сохраненным предустановкам из окна PTZ; одна точка выбора данных для каждой камеры (требуется AgentDVR v7.7.8.0+)
— В строке состояния отображается количество камер, загрузка процессора/оперативной памяти и свободное место на диске.
- Цветовая гамма через конфигурацию адаптера

### Потоки WebRTC go2rtc
[go2rtc](https://github.com/AlexxIT/go2rtc) обеспечивает плавную передачу потоков WebRTC/MSE с низкой задержкой и аудио.

**Настраивать:**

1. Установите и запустите go2rtc, настройте потоки с камер в конфигурационном файле go2rtc.
2. В настройках адаптера → вкладка *Панель управления*, выберите из выпадающего списка желаемое имя потока go2rtc для каждой камеры.
3. Введите **URL-адрес go2rtc**, который отображается под таблицей (например, `http://192.168.1.10:1984`).
4. Сохраните и перезапустите. Адаптер перенаправляет трафик WebSocket через ioBroker, чтобы обойти ограничения на междоменные соединения браузеров.

## Медиа-прокси
Адаптер может направлять все медиафайлы через ioBroker, поэтому браузеру никогда не потребуется прямое подключение к AgentDVR. Включите **Медиа-прокси** на вкладке "Функции".

| Что такое прокси | Прокси выключен | Прокси включен |
|-----------------|-----------|----------|
| Прямая трансляция в формате MJPEG | Прямая ссылка AgentDVR | `/agent-dvr.0/api/mjpeg?oid=…` |
| Миниатюры записей | Прямая ссылка на AgentDVR | `/agent-dvr.0/api/thumb?oid=…` |
| Запись видео | Прямая ссылка на AgentDVR | `/agent-dvr.0/api/media?oid=…` |
| Запись видео | Прямая ссылка на AgentDVR | `/agent-dvr.0/api/media?oid=…` |
| Прямая трансляция FLV | **всегда через ioBroker** | **всегда через ioBroker** |
| go2rtc WebSocket | **всегда через ioBroker** | **всегда через ioBroker** |

FLV и go2rtc всегда работают через ioBroker независимо от настроек — браузер не может напрямую отправлять запросы к этим конечным точкам из других источников.

### Когда включать
— Вы получаете доступ к панели управления извне вашей домашней сети, где AgentDVR недоступен напрямую из браузера.
- Извне доступен только ioBroker (например, через обратный прокси или VPN).

### Когда его следует выключить
- Браузер и AgentDVR находятся в одной сети (локальный доступ).
- Прямое соединение быстрее — нет лишнего перехода, меньшая задержка.
- Меньшая нагрузка на сервер ioBroker — потоки не проходят через Node.js

Настройки вступают в силу немедленно после сохранения — перезапуск не требуется.

## Точки данных
`<cam>` означает `cam_<oid>_<name>`, например, `cam_8_Reolink`.

### Система
| Точка данных | Тип | Чтение/Запись | Описание |
|-----------|------|-----|-------------|
| `system.online` | логическое значение | R | Соединение с AgentDVR установлено |
| `system.lastPoll` | номер | R | Временная метка Unix последнего опроса |
| `system.cameraCount` | число | R | Количество обнаруженных камер |
| `system.disk_free_gb` | число | R | Свободное место на диске в ГБ |
| `system.settings.*` | различные | R | Сглаженные настройки сервера AgentDVR |
| `system.stats.*` | различные | R | Статистика ЦП / ОЗУ / диска |
| `system.status.*` | различные | R | Состояние системы (включена, устройства, версия, …) |
| `system.raw_getObjects` | строка | R | Необработанные JSON-данные getObjects (если включено) |
| `system.raw_getObjects` | строка | R | Необработанные JSON-данные getObjects (если включено) |

### Управление системой *(требуются кнопки управления системой)*
| Точка данных | Тип | Чтение/Запись | Описание |
|-----------|------|-----|-------------|
| `system.control.arm` | кнопка | W | Поставить систему на охрану |
| `system.control.allOn` | кнопка | W | Включить все устройства |
| `system.control.allOff` | кнопка | W | Выключить все устройства |
| `system.control.reloadConfig` | кнопка | W | Перезагрузить конфигурацию AgentDVR |
| `system.control.reloadObjects` | кнопка | W | Перезагрузить объекты |
| `system.control.runStorageMgmt` | кнопка | W | Запустить управление хранилищем |
| `system.control.blockExternal` | кнопка | W | Блокировать внешний доступ |
| `system.control.unblockExternal` | кнопка | W | Разблокировать внешний доступ |
| `system.control.restart` | кнопка | W | Перезапустить AgentDVR |
| `system.control.refresh` | кнопка | W | Принудительный немедленный опрос |
| `system.profile.selector` | число | Чтение/Запись | Индекс активного профиля — выпадающий список (0 = Дома, 1 = Вне дома, …) |
| `system.profile.list` | строка | R | Доступные профили в виде массива JSON |
| `system.profile.list` | строка | R | Доступные профили в виде массива JSON |

### На камеру
| Точка данных | Тип | Чтение/Запись | Описание |
|-----------|------|-----|-------------|
| `<cam>.name` | строка | R | Название камеры |
| `<cam>.data.connected` | логическое значение | R | Поток подключен |
| `<cam>.data.recording` | логическое значение | R | Сейчас ведётся запись |
| `<cam>.data.detected` | логическое значение | R | Обнаружено движение/объект |
| `<cam>.data.detectorActive` | логическое значение | R | Детектор движения включен |
| `<cam>.data.alertsActive` | логическое значение | R | Оповещения включены |
| `<cam>.data.alerted` | логическое значение | R | Оповещение в данный момент активно |
| `<cam>.data.scheduleActive` | логическое значение | R | Расписание включено |
| `<cam>.data.width` / `height` | число | R | Разрешение потока |
| `<cam>.data.*` | различные | R | Все дополнительные свойства устройства из AgentDVR |
| `<cam>.snapshot_b64` | строка | R | Текущий кадр как `data:image/jpeg;base64,…` (роль `media.picture`) |
| `<cam>.control.record` | кнопка | W | Начать запись |
| `<cam>.control.recordStop` | кнопка | W | Остановить запись |
| `<cam>.control.recordRestart` | кнопка | W | Перезапустить запись |
| `<cam>.control.triggerRecord` | кнопка | W | Запустить запись (работает до истечения таймаута) |
| `<cam>.control.snapshot` | кнопка | W | Указать AgentDVR сохранить снимок на диск |
| `<cam>.control.refreshSnapshotB64` | кнопка | W | Получить текущий кадр и записать в `snapshot_b64` |
| `<cam>.control.detect` | кнопка | W | Запуск обнаружения движения |
| `<cam>.control.alertOn` | кнопка | W | Предупреждения о включении сигнализации |
| `<cam>.control.alertOff` | кнопка | W | Снять тревогу |
| `<cam>.control.switchOn` | кнопка | W | Включить камеру |
| `<cam>.control.switchOff` | кнопка | W | Выключить камеру |
| `<cam>.control.objectDetectOn` | кнопка | W | Включить обнаружение объектов *(только для камер)* |
| `<cam>.control.objectDetectOff` | кнопка | W | Отключить обнаружение объектов *(только для камер)* |
| `<cam>.control.scheduleOn` | кнопка | W | Включить расписание устройства |
| `<cam>.control.scheduleOff` | кнопка | W | Отключить расписание устройства |
| `<cam>.control.detectorOn` | кнопка | W | Включить датчик движения |
| `<cam>.control.detectorOff` | кнопка | W | Отключить датчик движения |
| `<cam>.control.sensitivityMin` | число 0–100 | Чтение/Запись | Чувствительность детектора — минимальный порог *(только для камер)* |
| `<cam>.control.sensitivityMax` | число 0–100 | Чтение/Запись | Чувствительность детектора — максимальный порог *(только для камер)* |
| `<cam>.control.sensitivityGain` | число 0–100 | Чтение/Запись | Чувствительность детектора — усиление *(только для камер)* |
| `<cam>.control.recOnAlert` | кнопка | W | Включить "запись при оповещении" |
| `<cam>.control.recOnDetect` | кнопка | W | Включить "запись при обнаружении" |
| `<cam>.control.purge` | кнопка | W | Удалить все записи с этой камеры |
| `<cam>.control.purge` | кнопка | W | Удалить все записи с этой камеры |

### PTZ *(требуются кнопки управления PTZ)*
| Точка данных | Тип | Чтение/Запись | Описание |
|-----------|------|-----|-------------|
| `<cam>.control.ptz.left` | переключатель | Чтение/Запись | Панорамирование влево (удерживайте для продолжения движения) |
| `<cam>.control.ptz.up` | переключатель | Чтение/Запись | Наклон вверх |
| `<cam>.control.ptz.down` | переключатель | Чтение/Запись | Наклон вниз |
| `<cam>.control.ptz.upLeft` | переключатель | Ч/З | Диагональ вверх-влево |
| `<cam>.control.ptz.upRight` | переключатель | Чтение/Запись | Диагональ вверх/вправо |
| `<cam>.control.ptz.downLeft` | переключатель | Чтение/Запись | Диагональ вниз-влево |
| `<cam>.control.ptz.downRight` | переключатель | Ч/В | Диагональ вниз-вправо |
| `<cam>.control.ptz.zoomIn` | переключатель | Чтение/Запись | Увеличение |
| `<cam>.control.ptz.zoomOut` | переключатель | Чтение/Запись | Уменьшение масштаба |
| `<cam>.control.ptz.stop` | кнопка | W | Остановить движение PTZ |
| `<cam>.control.ptz.center` | кнопка | W | Переместить в центральное/начальное положение |
| `<cam>.control.ptz.preset` | номер | Чтение/Запись | Селектор предустановок — индекс записи для перехода к этой предустановке; перечисление states содержит списки имен предустановок (требуется AgentDVR v7.7.8.0+) |
| `<cam>.control.ptz.preset` | число | Ч/З | Селектор предустановок — индекс записи для перехода к этой предустановке; перечисление states содержит списки имен предустановок (требуется AgentDVR v7.7.8.0+) |

### URL-адреса потоков *(требуется "Сгенерировать URL-адреса потоков")*
| Точка данных | Тип | Чтение/Запись | Описание |
|-----------|------|-----|-------------|
| `<cam>.urls.snapshot` | строка | R | URL текущего снимка JPEG *(только для камер)* |
| `<cam>.urls.mjpeg` | строка | R | URL для прямой трансляции MJPEG *(только с камер)* |
| `<cam>.urls.mp4` | строка | R | URL для прямой трансляции MP4 *(только с камер)* |
| `<mic>.urls.audio_mp3` | строка | R | URL для аудиопотока MP3 *(только для микрофонов)* |
| `<mic>.urls.audio_ogg` | строка | R | URL аудиопотока OGG *(только для микрофонов)* |
| `<mic>.urls.audio_ogg` | строка | R | URL для аудиопотока OGG *(только для микрофонов)* |

### События / Галерея *(только для фото)*
| Точка данных | Тип | Чтение/Запись | Описание |
|-----------|------|-----|-------------|
| `<cam>.events.*` | различные | R | Последние метаданные записи — требуются «точки данных события» |
| `<cam>.widget_live` | строка | R | HTML-плитка с одной камерой в режиме реального времени — требуется виджет «Галерея»; снимок обновляется при каждом опросе адаптера |
| `<cam>.widget_live` | строка | R | HTML-плитка с одной камерой в режиме реального времени — требуется виджет "Галерея"; снимок обновляется при каждом опросе адаптера |

## Вебхук
Адаптер предоставляет конечную точку веб-перехватчика, которая запускает немедленный полный опрос AgentDVR:

```
GET http://<iobroker>:<webport>/agent-dvr.0/webhook
```

Замените `agent-dvr.0` на фактический номер экземпляра (`agent-dvr.1` и т. д.), если вы используете несколько экземпляров.

Настройте этот URL-адрес как **действие** в AgentDVR (Камера → Редактировать → Оповещения → Действия → URL), чтобы получать обновления в режиме реального времени всякий раз, когда запись заканчивается или срабатывает оповещение. Адаптер немедленно повторно получит все данные с камер, записи и системную статистику — не нужно ждать следующего цикла опроса.

Возвращает `{"ok":true}` в случае успеха.

### Обзор *(требуется виджет «Обзор»)*
| Точка данных | Тип | Чтение/Запись | Описание |
|-----------|------|-----|-------------|
| `widget_live_overview` | строка | R | HTML-сетка всех камер — обновление снимков при каждом опросе адаптера |

## Changelog

### 0.5.2 (2026-08-05)
* (ipod86) feat: rename `overview` DP to `widget_live_overview` for consistent naming

### 0.5.1 (2026-08-05)
* (ipod86) feat: per-instance URL routing — each adapter instance uses its own URL namespace (`agent-dvr.0/`, `agent-dvr.1/`, …)
* (ipod86) feat: rename per-camera recording widget DP from `widget` to `widget_recordings`; add new `widget_live` DP with a single-camera live tile

### 0.5.0 (2026-08-03)
* (ipod86) feat: replace live-view camera chip-bar with compact header filter button — funnel icon opens a popover with per-camera checkboxes and drag-to-reorder; order persisted in localStorage
* (ipod86) feat: new-recordings badge on the Recordings tab — shows count of recordings since last visit; persisted per browser/device in localStorage
* (ipod86) feat: recording display settings panel — ⚙ gear button in the select/delete bar; grid column width slider, max-recordings override, badge toggle (all persisted in localStorage)
* (ipod86) feat: first-visit onboarding modals for live view (camera filter & sort) and recordings tab (gestures, gear panel, badge)
* (ipod86) feat: webhook endpoint `/agent-dvr.0/webhook` triggers immediate full poll — configure as AgentDVR action for real-time updates
* (ipod86) feat: PTZ presets — navigate to saved presets from PTZ overlay; single selector DP `<cam>.control.ptz.preset` per camera (requires AgentDVR v7.7.8.0+)
* (ipod86) feat: add event log view to recordings panel (clock icon toggle) alongside grid and timeline
* (ipod86) feat: delete recording from video modal (trash icon, two-click confirm, requires AgentDVR v7.7.8.0+)
* (ipod86) feat: bulk-delete recordings — long-press a tile to enter select mode, checkbox each recording, delete all at once
* (ipod86) feat: new `dashMaxRec` config setting — limits total recordings shown across all cameras in the dashboard (independent of widget limit, default 200)
* (ipod86) feat: tag filter splits AgentDVR's comma-separated tags into individual chips for per-tag filtering
* (ipod86) feat: read camera color from AgentDVR and use it for timeline bars and recording dots
* (ipod86) feat: status bar shows CPU usage, RAM % and free, disk usage % and free alongside camera/recording counts
* (ipod86) feat: reset colors to defaults button in Live Dashboard settings tab
* (ipod86) refactor: remove per-camera pushTrigger data points in favour of the global webhook
* (ipod86) fix: new-recordings badge now correctly visible (display:none CSS fallback fixed)
* (ipod86) fix: record button moved to rightmost position in grid tiles and fullscreen panel
* (ipod86) fix: camera filter button no longer changes appearance when cameras are hidden
* (ipod86) fix: header z-index lifted so the camera filter popover renders above the main content area
* (ipod86) fix: drive object pruning regex corrected; stale drive entries are now properly removed
* (ipod86) fix: deleted recordings no longer reappear after the next adapter poll
* (ipod86) fix: extend video format error message with AgentDVR auto-convert hint in all 11 languages
* (ipod86) fix: FLV stream and grid tile layout scaling corrections
* (ipod86) fix: Italian i18n string with apostrophe broke page JS (changed to escaped variant)
* (ipod86) fix: detect AgentDVR "Command not found" response on delete and show proper error message

### 0.4.3 (2026-07-19)
* (ipod86) fix: switch polling loop from setInterval to setTimeout to prevent concurrent poll runs
* (ipod86) fix: httpTimeoutMs=0 now correctly clamps to 1000ms instead of falling back to default
* (ipod86) fix: go2rtcEnabled config flag is now honored in fetchGo2rtcStreams
* (ipod86) fix: remove unused isSupportedLang export from widget-i18n

### 0.4.2 (2026-07-12)
* (ipod86) fix: FLV stream proxy now sends Authorization header (HTTP 401 with AgentDVR auth)
* (ipod86) fix: dashboard camera online status was read from wrong state path (data.online → status.online)
* (ipod86) fix: MP4/FLV stream label was hardcoded German — now translated in all 11 languages
* (ipod86) fix: admin UI default values now match io-package.json (dashTagPosition, widgetAnzahl, widgetBorderRadius)
* (ipod86) fix: go2rtcEnabled flag now respected when loading streams in admin UI
* (ipod86) fix: enableStreamProxy missing from native defaults in io-package.json

### 0.4.1 (2026-07-12)
* (ipod86) fix: overview tile links to ioBroker host; go2rtc URL shown only when enabled

### 0.4.0 (2026-07-12)
* (ipod86) feat: optional MJPEG and snapshot stream proxy through ioBroker (browser needs only one connection to ioBroker, not directly to AgentDVR)

### 0.3.0 (2026-07-06)
* (ipod86) feat: add scheduleOn/Off and detectorOn/Off control buttons for cameras and microphones
* (ipod86) feat: add sensitivityMin, sensitivityMax, sensitivityGain level states for cameras (0–100)
* (ipod86) feat: add audio_mp3 and audio_ogg URL states for microphones
* (ipod86) fix: restrict objectDetectOn/Off and snapshot buttons to cameras (ot=2) only
* (ipod86) feat: inline flv.js into dashboard HTML — no external file required
* (ipod86) fix: preserve FLV stream aspect ratio after tab visibility change (all three player call sites)
* (ipod86) feat: collapsible tag filter row on recordings and timeline pages
* (ipod86) feat: native browser fullscreen button in live view modal with correct aspect ratio
* (ipod86) feat: live view modal header auto-hides after 3 s of inactivity; reappears on mouse/touch
* (ipod86) fix: add fsEnter, fsExit, filterByLabel, timelineView, closePanel i18n keys in all 10 languages

[Older changelog entries in CHANGELOG_OLD.md](CHANGELOG_OLD.md)

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