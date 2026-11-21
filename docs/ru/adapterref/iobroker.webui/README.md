---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.webui/README.md
title: ioBroker.webui
hash: FXpS9b4KAaHE0lDvD390oRsICpFPR8J0gz0Q4f7ELPc=
---
# ioBroker.webui

![Количество установок](https://iobroker.live/badges/webui-installed.svg)
![Стабильная версия](https://iobroker.live/badges/webui-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.webui.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.webui.svg)
![НПМ](https://nodei.co/npm/iobroker.webui.png?downloads=true)

веб-интерфейс для ioBroker

![изображение](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/screenshot.png)

## Видеоуроки (в настоящее время только на немецком языке)

<https://www.youtube.com/@jogibear9988>

## Описание

Это полноценная система визуализации для ioBroker.

В его состав входят такие функции, как:

- простой язык сценариев
- Привязка к объектам ioBroker, включая конвертеры и выражения JavaScript.
- вставка изображений из буфера обмена
- перетаскивание внешних изображений
- Перетаскивание объектов ioBroker для автоматического создания привязок
- Перетаскивайте объекты ioBroker в свойства, чтобы создавать для них привязки.
- Относительные пути передачи сигнала к объектам ioBroker на экранах (полный путь может передаваться извне на экран).
- Редактирование макета и HTML-кода в режиме разделенного экрана
- глобальная поддержка таблиц стилей
- использование npm-пакетов, содержащих веб-компоненты
- Использование веб-компонентов ioBroker установленных адаптеров (те же компоненты, что и в vis-2, устройствах и административной панели).
- экраны внутри экранов
- Используйте все пакеты значков от ioBroker.
- Используйте графики от ioBroker.
- Используйте объединенные идентификаторы объектов сигналов, например, "webui.0.test3.{webui.0.test3.select}" -> это позволит использовать значение из webui.0.test3.select в качестве имени сигнала.

Более подробная информация по конкретным темам содержится в [вики](https://github.com/iobroker-community-adapters/ioBroker.webui/wiki) (в немецком разделе статей немного больше, чем в английском).

## Установка

### Зависимости

- Для работы необходим установленный веб-адаптер. Он работает со следующими настройками:![изображение](https://raw.githubusercontent.com/iobroker-community-adapters/ioBroker.webui/master/web.png)

## Концепции

### Описание

Дизайнер использует веб-компоненты, поэтому создаваемый вами HTML-код находится внутри теневого корня веб-компонента. Это означает, что вы не можете использовать стили.<body> или<html> внутри таблицы стилей. Для оформления внешнего макета используйте селектор ":host". Это также означает, что вы не можете использовать обработчики событий "on...". Используйте назначение событий "@...".

### Пользовательские элементы управления в веб-интерфейсе

В WebUI можно создавать собственные многоразовые элементы управления CustomControls, каждый из которых может иметь свой собственный JavaScript-код, свойства и шаблон.

Для создания привязок из шаблона к свойствам, определенным в конструкторе, можно использовать синтаксис двойных скобок и синтаксис двойных фигурных скобок компонента "BaseCustomWebcomponent". Фигурные скобки создают двусторонние привязки. При использовании диалогового окна "Привязки" можно привязаться к свойству с помощью параметра ??Propertyname и к объекту IoBroker в этом свойстве с помощью параметра ?Propertyname. В скриптах также можно записывать данные в сигналы, определенные в пользовательских свойствах.

Вы можете встраивать JavaScript в свой CustomControl или Screen. Кроме того, вы можете экспортировать функцию. `init(instance)` Эта функция будет вызвана при создании экземпляра вашего пользовательского элемента управления. Наконец, `connected()` и `disconnected()` Функции можно определить таким образом, чтобы они вызывались, когда...

### веб-компоненты ioBroker

Адаптеры позволяют подключать [веб-компоненты ioBroker](https://github.com/ioBroker/web-components) : пользовательские элементы, которые отображаются одинаково во всех интерфейсах ioBroker. Список этих элементов отображается в адаптерах. `common.webComponents`. Дизайнер отображает их в палитре в **разделе «Управление» → «Дизайнер» → «Веб-компоненты ioBroker»** ; компоненты, которые изменяют собственное значение (`editsValue`) опущены, поскольку веб-интерфейс не хранит такие значения.

Размещенный компонент хранится следующим образом:

```html
<iobroker-webui-web-component adapter="flow" component="flow-diagram" setting-oid="flow.0.diagrams.main" theme="dark"></iobroker-webui-web-component>
```

- Каждое значение параметра компонента является атрибутом. `setting-<name>` (`textTrue` становится `setting-text-true` Отредактируйте его в сетке свойств или привяжите к состоянию ioBroker, как любой другой атрибут. Параметр флажка работает как логический атрибут HTML: present означает true.
- `theme` является `light` (по умолчанию), `dark` или `auto` (следует за браузером). Пользовательские свойства CSS. `--iob-primary`, `--iob-paper`, `--iob-text`...элемент, расположенный на нем или над ним, переопределяет отдельные цвета при отображении компонента.
- В конструкторе компонент получает `editMode` и не записывает состояния. Во время выполнения он получает сокет веб-интерфейса.
- Мероприятие `iob-navigate` Открывает веб-интерфейс с таким названием, если таковой имеется.
- Компоненты считываются один раз при загрузке страницы: после установки адаптера необходимо перезагрузить конструктор.

## ИИ-помощник на экране

Откройте **AI** на панели инструментов дизайнера. Настройте провайдера в **ioBroker Admin → Системные настройки → AI** , затем выберите его модель в помощнике. Адаптер использует тот же самый[`@iobroker/ai-core`](https://github.com/ioBroker/ai-core) В качестве бэкенда используется vis-2; учетные данные провайдера остаются на сервере. Локальный ИИ-сервер/конечная точка Ollama может быть выбрана через конфигурацию ИИ системы. Требуется Node.js 22.19 или более поздняя версия; для чата с ИИ также необходим современный контроллер/веб-адаптер с подписками на сообщения экземпляра.

Ассистент запускается в виде свернутой вкладки в правом углу экрана. Откройте его из этой вкладки или с помощью команды на панели инструментов **ИИ** . Кнопка «Закрыть» скрывает панель инструментов, не теряя черновики и запущенные чаты; команда на панели инструментов снова открывает ее.

Введите текст и нажмите **Enter** , чтобы автоматически создать чат. **Shift+Enter** вставляет новую строку. Щелкните вкладку чата, чтобы продолжить его; щелкните выбранную вкладку еще раз, чтобы вернуться к новому черновику. Щелкните правой кнопкой мыши вкладку, чтобы переименовать или удалить этот чат. Селекторы поставщика/модели расположены под окном сообщения; щелкните правой кнопкой мыши элементы управления компоновщика, чтобы перезагрузить их. Чаты и неотправленные новые черновики сохраняются в этом браузере для текущей установки и пользователя ioBroker. Перезагрузка прерывает текущие реплики.

Пока помощник работает, продолжайте печатать и отправляйте сообщения с помощью **кнопки «Управлять»** , чтобы перенаправить его на следующий безопасный шаг, или выберите **«Очередь»** , чтобы отправить последующее сообщение после текущего хода. Ожидающие сообщения можно редактировать или удалять над полем ввода. **Кнопка «Остановить»** немедленно завершает локальный ход, пропускает последующие инструменты и очищает неотправленные ожидающие сообщения; уже отправленный запрос поставщика может завершиться в фоновом режиме. На вкладках «Запущенные» и в диалоге отображаются индикаторы активности.

Кнопка микрофона позволяет диктовать текст в поле сообщения без его отправки. Она использует распознавание речи в браузере и требует разрешения на использование микрофона; доступность зависит от браузера. Остановить диктовку можно той же кнопкой. Закрытие панели ИИ также останавливает диктовку.

Помощник может проверять сохраненные экраны и элементы управления, несохраненные открытые редакторы, HTML/CSS/JavaScript, глобальные стили/скрипты, установленные элементы палитры, а также метаданные/текущие значения объектов ioBroker, доступные для поиска. Он содержит документацию по привязкам, обработчикам событий и фактическим сгенерированным схемам команд простых скриптов. Собственная конфигурация объекта исключена, и отсутствует инструмент для записи состояния в реальном времени. Исходный и объектный контекст, запрашиваемый помощником, отправляется поставщику, выбранному в ioBroker.

Используйте **функцию «Прикрепить файлы»** для текстовых/исходных файлов и изображений PNG/JPEG/WebP/GIF, или вставьте скриншоты в поле сообщения. Выберите модель, поддерживающую обработку изображений. Ограничение: восемь вложений и 10 МБ на сообщение. Текущий мост ioBroker Anthropic поддерживает только текст; для чатов со скриншотами необходимо использовать совместимый с OpenAI поставщик обработки изображений (например, OpenAI, Gemini, OpenRouter или подходящую локальную модель).

Изменения отображаются в виде предложений с исходным и предлагаемым исходным кодом. **Функция «Применить к редактору»** обновляет экран без сохранения. Просмотрите его в конструкторе и используйте обычную команду **«Сохранить** », чтобы сохранить изменения. Если исходный код изменился после того, как его прочитал ассистент, функция «Применить» не перезапишет его; попросите ассистента прочитать его снова и создать новое предложение. Новые экраны создаются с помощью того же процесса создания предложений.

## Спонсорство

Если вы хотите помочь в разработке, поддержите этот проект, сделав спонсорскую поддержку по ссылке <https://github.com/sponsors/jogibear9988>

## Развитие

- Установите репозиторий в качестве адаптера в IOBroker.

- Загрузите репозиторий в отдельную директорию "dev", не разрабатывайте приложение внутри директории ioBroker Node\_modules.

- Выполните следующие действия внутри каталога "dev".

- Установите зависимости

```
  $ npm install
```

- После внесения изменений скомпилируйте TypeScript (или нажмите Ctrl + Shift + B в VsCode и выберите "tsc watch")

```
  $ npm run tsc
```

- Отредактируйте файл 'config.js', указав IP-адрес и порт вашего iobroker (файл config.js в корне репозитория будет заменен файлом из '/config' при выполнении команды 'npm build').

```
    window.iobrokerHost = '192.168.1.2';
    window.iobrokerPort = '8082';
    window.iobrokerSocketScriptUrl = 'http://' + window.iobrokerHost + ':' + window.iobrokerPort + '/lib/js/socket.io.js';
```

- Запустите приложение на локальном сервере.

```
  $ npm start
```

- Чтобы открыть приложение, перейдите в Chrome по адресу [localhost:8000]() .

### Подробнее о развитии

- Бегать

```
  $ npm run reflection
```

воссоздать файлы отражения для скриптов, которые используются для сетки свойств.

- Бегать

```
  $ npm run build
```

чтобы скопировать скомпилированные файлы и папку node\_modules в папку www, чтобы адаптер можно было установить через GitHub.

- Бегать

```
  $ npm run release
  $ npm publish
```

Чтобы создать корректный коммит релиза для iobroker, будьте осторожны, он также отправляет изменения в репозиторий Git. Обязательно отредактируйте файл "CHANGELOG.md" перед этим, так как текст из раздела "## **WORK IN PROGRESS** " в файле README.md будет использоваться для информации о версии.

## Информация об адаптере.

Адаптер основан на следующем компоненте Designer: <https://github.com/node-projects/web-component-designer>

Вам необходимо создать экран "start", это первый экран, вызываемый при открытии файла runtime.html, но вы можете изменить это с помощью параметра запроса: runtime.html?screenName=screen2

## Changelog
<!--
	Placeholder for next versions:
	### __WORK IN PROGRESS__
-->
### 2.4.0 (2026-11-11)
- Use the ioBroker web components of installed adapters (`common.webComponents`, `@iobroker/web-components`) in screens: palette entries, a settings section in the property grid with every setting as a bindable `setting-*` attribute, theme support and `iob-navigate` to screens.
- dark mode changed
- components list

### 2.3.0 (2026-11-10)
- Expand AI context with current/open editors, selected screen elements, separate CSS/JavaScript, settings and component properties.
- Add paged discovery of components, installed component APIs, signals, images, icons and chart presets, with on-demand image/icon previews for vision models.
- Improve AI guidance for CSS bindings, converters and simple scripts, preferring the separate CSS/JavaScript fields.
- Apply AI proposals as one Undo/Redo step covering HTML, CSS, JavaScript, settings and properties while preserving earlier manual history.
- Show proposal review and Apply/Discard actions below AI answers, outside collapsed work outputs.
- Add chat message timestamps, elapsed thinking time and cost totals in the chat list/footer when explicitly reported.
- Balance the default dock column widths and fix document context-menu colors in light/dark mode.
- Keep detached screens, AI chats and tool/global-editor windows editable, including component drops, shared models, Save and Undo/Redo. Closing a popup returns its unsaved panel to the main editor.
- Fix missing script command details, including SetSignalValue signal/target fields, by resolving scalar schema aliases.

### 2.2.0 (2026-11-10)
- (copilot) Adapter requires node.js >= 22.19.0 now
* (GermanBluefox) Repochecker warnings fixed (#563)
- new features, AI, new designer, ...

### 2.1.0 (2026-09-15)
- fix blockly scripts
- add dark/light mode

### 2.0.3 (2026-08-21)
- fix help dlg pos

## License

The MIT License (MIT)

Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2025 jogibear9988 <jochen.kuehner@gmx.de>

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