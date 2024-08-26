---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translatedFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.synochat/README.md
title: <img src="docs/images/synochatLogo.png" alt="рисунок"/>Адаптер Synology-Chat для ioBroker
hash: 8+CDL/UDMzxpuBfUyveIUWQuIl/ql1uXHc6XOIJSCEA=
---
![Стабильная версия](https://iobroker.live/badges/synochat-stable.svg)
![версия NPM](https://img.shields.io/npm/v/iobroker.synochat.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.synochat.svg)
![Количество установок](https://iobroker.live/badges/synochat-installed.svg)
![НПМ](https://nodei.co/npm/iobroker.synochat.png?downloads=true)

#<img src="docs/images/synochatLogo.png" alt="рисунок"/> Адаптер Synology-Chat для ioBroker
![Тестируйте и выпускайте](https://github.com/phoeluga/ioBroker.synochat/workflows/Test%20and%20Release/badge.svg)

[![Пожертвовать][пожертвовать-значок2]][пожертвовать-ссылка]

## Что это такое?
Этот адаптер обеспечивает интерфейс между Synology Chat и ioBroker.\ Для этой цели используются стандартные функции интеграции, предоставляемые Synology Chat, и соответствующие конечные точки REST API.
Входящие и исходящие интеграции можно использовать для отправки сообщений на сервер чата Synology или обновления объекта сообщения в вашем экземпляре ioBroker для получения сообщений.

---

# Руководство
## 1. Установка
Адаптер может быть создан из раздела адаптера в вашей установке ioBroker.
Дополнительную информацию можно найти в официальном [документация ioBroker](https://www.iobroker.net/#de/documentation/admin/adapter.md).

## 2. Конфигурация
<div id="synology-chat-configuration"></div>

### 2.1. Настройка чата Synology
- Synology Chat позволяет обрабатывать входящие и исходящие сообщения. Далее оба варианта будут рассмотрены более подробно.

- Для создания сообщений через интерфейс Synology Chat необходимо создать интеграцию в Synology Chat:

![SynoChatChannel](./docs/images/diSynoChatChannel.png) ![SynoChatИнтеграции](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatIntegrations.png)

  #### 2.1.1. Входящая интеграция
Для интеграции входящего сообщения в чат Synology необходим токен, который можно взять из URL-адреса, сгенерированного при создании.
![SynoChatIntegrationВходящие](./docs/images/diSynoChatIntegrationIncoming.png) ![SynoChatIntegrationIncomingSettings](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatIntegrationIncomingSettings.png)

<div id="synologyChatConfigurationOutgoingIntegration"></div>

  #### 2.1.2. Исходящая интеграция
Для интеграции исходящего сообщения в чат Synology необходимо указать URL-адрес веб-перехватчика. Вы получите этот URL-адрес веб-перехватчика из объектов экземпляра после создания экземпляра адаптера `synochat`. Более подробную информацию можно найти в [3. Использование > 3.1 Общие](#web-hook-location) ![SynoChatIntegrationВходящие](./docs/images/diSynoChatIntegrationOutgoing.png) ![SynoChatIntegrationIncomingSettings](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatIntegrationOutgoingSettings.png)

***ПРИМЕЧАНИЕ.*** *Тип канала (входящий; исходящий) указывается с точки зрения чата Synology. Например, «Входящие» означает, что сообщения будут отправлены на сервер чата Synology.*

Дополнительные сведения об интеграции с чатом Synology см. в официальной документации Synology [ЗДЕСЬ](https://kb.synology.com/DSM/help/Chat/chat_integration).

### 2.2. Конфигурация экземпляра адаптера ioBroker
- Конфигурация этого адаптера может быть выполнена в настройках экземпляра.

    #### 2.2.1. Основные настройки:
	![IobrokerInstanceSettingsMainSettings](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerInstanceSettingsMainSettings.png)

* **URL-адрес/IP-адрес Synology**

С помощью этого свойства будет предоставлен URL-адрес вашего приложения Synology-Chat. Обратите внимание, что необходимо использовать абсолютный URL-адрес, включая `http://` или `https://`, и не указывать постфикс, например `/`.
Конкретный порт можно указать, как обычно, за URL-адресом, используя `:`.

***Образец допустимых значений:***

- https://mychat.mydomain.tld
- https://192.168.1.1:8080

    * **Подтвердить SSL-сертификат**

Конечно, всегда рекомендуется шифровать передачу данных.
Часто самозаверяющие сертификаты используются для зашифрованных соединений в домашних условиях. В этом случае может потребоваться отключить проверку SSL-сертификата HTTP-соединения.
Отключите это свойство, чтобы отключить проверку сертификата.

* **Имя хоста/IP-адрес экземпляра ioBroker**

        Это свойство позволяет указать имя хоста или IP-адрес, по которому ваш экземпляр ioBroker доступен через URL-адрес. Это значение автоматически устанавливается равным текущему IP-адресу операционной системы хоста вашей установки ioBroker после первоначального создания экземпляра адаптера.

В случае использования ioBroker в качестве экземпляра Docker может потребоваться изменить это значение, например. если для доступа к вашему экземпляру ioBroker используется обратный прокси-сервер или аналогичный.

Это значение используется для создания URL-адреса веб-перехватчика для каналов, которые получают сообщения от сервера чата Synology.

<div id="configurationAdapterWebInstance"></div>

* **Веб-экземпляр для отправки сообщений из чата Synology в экземпляр адаптера ioBroker**

        Адаптер `synochat` использует адаптер `web`, чтобы сделать доступными веб-перехватчики. Вам нужно выбрать конкретный экземпляр адаптера `web`, чтобы предоставить специальный веб-хук для интеграции чата Synology.

<div id="channel-configuration"></div>

    #### 2.2.2. Управление/конфигурация каналов:
	![IobrokerInstanceSettingsChannelConfiguration](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerInstanceSettingsChannelConfiguration.png)

* **Канал включен**

Этот параметр можно использовать для отключения обработки входящих или исходящих сообщений.

Это может быть полезно, если, например. пользователь хочет отключить использование канала только временно и хочет сохранить настройки, такие как токен доступа или аналогичные, чтобы предотвратить их повторный сбор.

    * **Название канала**

Этот параметр указывает имя канала, из/в который отправляются сообщения. Это имя можно выбрать в случае каналов типа `Send data to Synology chat server - Incoming integration`, и оно используется для ссылки.

Настраиваемое здесь имя канала должно совпадать с именем канала чата Synology.

Для каналов типа `Get data from Synology chat server - Outgoing integration` имя должно совпадать с именем канала чата Synology, чтобы можно было получать сообщения.
Отображение имен каналов чувствительно к регистру (необходимо учитывать верхний и нижний регистр).

* **Токен канала**

Этот параметр предоставляет токен доступа к каналу чата Synology. В зависимости от типа канала его создание различается.
Более подробную информацию можно найти в главе [Настройка чата Synology](#synology-chat-configuration).

***ПРИМЕЧАНИЕ.***\ *В зависимости от интеграции при создании интеграции чата Synology вы получите ссылку, аналогичную следующему примеру:*

https://mychat.mydomain.tld/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22QF5DWyG7M47Ls3cv%22

*В этом примере токен включен в URL-адрес. Закодированные управляющие символы — `%22` — указываются здесь в начале и в конце настройки.\ **Их необходимо удалить!**\ В этом примере вводимым токеном будет `QF5DWyG7M47Ls3cv`. *

* **Тип канала**

***ПРИМЕЧАНИЕ.***\ *Тип канала должен быть указан с точки зрения чата Synology. Например, выбор «Входящие» в конфигурации означает, что сообщения будут отправляться в чат Synology.*

Этот параметр указывает тип канала чата Synology, который будет использоваться в зависимости от интеграции, выбранной в чате Synology.

* **Отправка данных на сервер чата Synology — входящая интеграция**\

Эта опция позволяет каналу отправлять новое значение объекта сообщения ioBroker ([см. главу об использовании](#usage)), как только значение объекта изменится.

        * **Получить данные с сервера чата Synology — исходящая интеграция**\

Этот параметр позволяет каналу получать сообщения от сервера чата Synology и обновлять новое значение объекта сообщения ioBroker ([см. главу об использовании](#usage)).

Обратите внимание, что при использовании этого типа канала имя канала конфигурации экземпляра адаптера ioBroker должно совпадать с именем канала канала чата Synology для получения сообщений.
Отображение имен каналов чувствительно к регистру (необходимо учитывать верхний и нижний регистр).

> Примечание. Убедитесь, что не выбраны параметры «*реагировать на*» для исходящих каналов.

Если канал должен быть настроен как для отправки, так и для получения сообщений, просто добавьте второй канал с тем же именем и выберите другой тип канала.

    * **Шаблон значения объекта**

Если значение объекта сообщения канала содержит значение JSON, вы можете выбрать шаблон, который преобразует это значение объекта в удобочитаемое значение перед его отправкой в канал чата Synology.

Соответствующий шаблон сообщения можно настроить в разделе [Шаблоны сообщений](#message-templates).

  * **Реагировать на диспетчер уведомлений**

        `synochat` может получать сообщения от [ioBroker Notification-Manager](https://github.com/foxriver76/ioBroker.notification-manager). Этот параметр позволяет выбрать, должен ли соответствующий канал реагировать на сообщения из диспетчера уведомлений и соответствующим образом перенаправлять их в Synology Chat.

Соответствующий шаблон сообщения можно настроить в разделе [Шаблоны сообщений](#messageTemplates).

    * **Реагировать на все сообщения ioBroker**

Помимо сообщений от [ioBroker Notification-Manager](https://github.com/foxriver76/ioBroker.notification-manager) `synochat` также может принимать другие сообщения от других адаптеров. Этот параметр позволяет выбрать, должен ли соответствующий канал реагировать на сообщения от всех других отправителей и соответствующим образом перенаправлять их в Synology Chat.

Экземпляр адаптера может получать сообщения. Эти сообщения состоят из объекта с несколькими атрибутами, которые можно включить в качестве параметров в шаблон сообщения. Эти параметры заменяются соответствующим образом перед отправкой сообщения.

Соответствующий шаблон сообщения можно настроить в разделе [Шаблоны сообщений](#message-templates).

* **Подтвердить SSL-сертификат — для нетекстовых сообщений**

В случае, если для типа входящего канала должно быть отправлено содержимое, отличное от текста, например изображение, это указывается из источника HTTP через URL-адрес. Если этот контент предоставляется с самозаверяющим сертификатом, проверку сертификата можно включить или отключить с помощью этого параметра.
Подробнее об отправке нетекстового содержимого см. в главе [Настройка чата Synology](#synology-chat-configuration)..

<div id="message-templates"></div>

#### 2.2.3. Шаблоны сообщений:
    Можно определить шаблоны сообщений, которые обрабатываются перед отправкой сообщения на Synology Chat Server. Эти шаблоны могут содержать шаблоны, которые заменяются в процессе отправки.

	![IobrokerInstanceSettingsChannelConfiguration](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerInstanceSettingsMessageTemplates.png)

Шаблоны всегда должны начинаться с `${` и заканчиваться на `}`. например `${foo}`. При обработке сообщения шаблон `${foo}` будет заменен соответствующим значением JSON атрибута `foo`.

**Образец:**

Если канал, настроенный для отправки данных в Synology Chat, получает изменение объекта в своем объекте сообщения, он может содержать значение JSON, подобное следующему:

	```json
    {
        "sensor": {
            "id": "temp0815",
            "name": "Temperature - Living room",
            "type": "temperature",
            "location": "living room",
            "value": "23.4"
        }
    }
	```

Вы можете получить доступ к внутренним атрибутам этого значения, указав их по пути, например `${sensor.value}`.

Если вы хотите отправить текст, как > Температура в гостиной изменилась на 23,4°C

ваш шаблон сообщения будет выглядеть так:

`The ${type} in the ${location} changed to ${value}°C`

**ПРИМЕЧАНИЕ И ОГРАНИЧЕНИЯ:**

    1. Если вы пытаетесь получить доступ к атрибуту с помощью ключа, содержащего точки (`.`), вы должны экранировать их символами `/-`!

    например если ваше значение объекта сообщения выглядит так:

```JSON
{
       "category": {
           "instances": {
               "system.adapter.notification-manager.0": {
                   "notification": "Test notification",
               }
           }
       }
   }
```

    и вы хотите получить доступ к атрибуту `notification`, ваш шаблон будет `${category.instances.system/-adapter/-notification-manager/-0.notification}`

2. Невозможно получить доступ к определенным элементам в массивах.

например если ваше значение объекта сообщения выглядит так:

```JSON
{
       "messages": [
           {
           "text": "Lorem"
           },
           {
           "text": "Ipsum"
           }
       ]
   }
```

вы не можете получить доступ к атрибуту `text` в объекте `message`. В этом случае вам необходимо подготовить значение объекта вне этого адаптера, прежде чем передать его в объект сообщения канала `synochat`.

* **Шаблон для отправки сообщений, полученных через ioBroker Notification-Manager**

        Этот шаблон будет определять сообщение сообщений, полученных от Notification-Manager. В качестве параметров в вашем шаблоне вы можете использовать имена атрибутов объекта `iobroker.Message` и встроенного объекта сообщения Notification-Manager.

Внутренний полученный объект имеет тип `iobroker.Message`:

		```javascript
		/** A message being passed between adapter instances */
        interface Message {
            /** The command to be executed */
            command: string;
            /** The message payload */
            message: MessagePayload;
            /** The source of this message */
            from: string;
            /** ID of this message */
            _id: number;
            /** Callback information. This is set when the source expects a response */
            callback: MessageCallbackInfo;
        }
		```

Согласно описанию, Notification-Manager предоставит свой собственный объект сообщения, встроенный в атрибут `message` как часть `iobroker.Message`.

Вы можете получить доступ к этим данным через атрибут `message`, используя шаблон `${message.NOTIFICATION_MANAGER_ATTRIBUTES}`.

**Доступные шаблоны:**

* `${command}` — шаблон, относящийся к объекту iobroker.Message.
* `${message}` - Шаблон, связанный с объектом `iobroker.Message`
* `${from}` — шаблон, относящийся к объекту iobroker.Message.
* `${_id}` - Шаблон, связанный с объектом `iobroker.Message`
* `${instances}` - Шаблон будет заменен списком экземпляров, связанных с полученным уведомлением диспетчера уведомлений.

        Дополнительная информация о структуре файла [Объект сообщения Notification-Manager](https://github.com/foxriver76/ioBroker.notification-manager) можно найти в [README](https://github.com/foxriver76/ioBroker.notification-manager).

> Примечание. Убедитесь, что не выбраны параметры «*реагировать на*» для исходящих каналов.

    * **Шаблон для отправки сообщений всех других полученных сообщений**

        Тот же самый объект `iobroker.Message`, как описано выше, используется для отправки всех видов сообщений экземпляру адаптера.

		```javascript
		/** A message being passed between adapter instances */
        interface Message {
            /** The command to be executed */
            command: string;
            /** The message payload */
            message: MessagePayload;
            /** The source of this message */
            from: string;
            /** ID of this message */
            _id: number;
            /** Callback information. This is set when the source expects a response */
            callback: MessageCallbackInfo;
        }
		```

Из самого этого объекта можно использовать следующие шаблоны для доступа к значениям связанных атрибутов.

**Доступные шаблоны:**

* `${command}` — шаблон, относящийся к объекту iobroker.Message.
* `${message}` - Шаблон, связанный с объектом `iobroker.Message`
* `${from}` — шаблон, относящийся к объекту iobroker.Message.
* `${_id}` - Шаблон, связанный с объектом `iobroker.Message`

        Шаблон `${message}` всегда содержит информацию от соответствующего отправителя. Если сообщение содержит только `String`, вам нужно указать только шаблон `${message}`. Предоставляет ли он значение JSON, вы также можете получить доступ к внутренним атрибутам, указав путь к значению, например `${message.foo.bar}`.

> Примечание. Убедитесь, что не выбраны параметры «*реагировать на*» для исходящих каналов.

    * **Шаблон 1-10 — Шаблон для применения к определенному каналу**

        Вы также можете указать значение JSON для объекта сообщения определенного канала. В этом случае вы можете определить до десяти пользовательских шаблонов, которые можно применить перед отправкой сообщения на сервер Synology Chat.

Доступ к атрибутам JSON можно получить, указав путь к значению в виде шаблона, например `${foo.bar}`.

Шаблон может быть связан с каналом в [Конфигурация канала](#channel-configuration).

**Доступные шаблоны:**

Доступные шаблоны связаны со значением JSON клиента, которое будет предоставлено объекту сообщения канала.

#### 2.2.4. Помощь:
   * Эта вкладка обычно перенаправляет на официальную страницу GitHub этого проекта, где дана подробная помощь и инструкции по использованию.
* Если есть открытые вопросы, предложения по изменениям, нежелательному поведению или ошибкам, создайте [проблему GitHub](https://github.com/phoeluga/ioBroker.synochat/issues/new/choose), чтобы убедиться в качестве этот проект.

<div id="configurationWebInstance"></div>

### 2.3. Конфигурация экземпляра `web`
Для получения сообщений с сервера чата Synology необходимо настроить исходящую интеграцию — см. [Исходящая интеграция](#synologyChatConfigurationOutgoingIntegration).

Для этого требуется, чтобы экземпляр адаптера `web` был запущен и настроен в файле [Настроен экземпляр адаптера `synochat`](#configurationAdapterWebInstance).

Если используемый экземпляр `web` настроен на использование безопасного соединения через HTTPS, **убедитесь, что вы предоставили действительный сертификат или импортировали свой собственный сертификат в доверенные сертификаты в Synology**.\ В противном случае сообщения не отправляются. с сервера чата Synology на экземпляр адаптера ioBroker.
Связь не будет установлена, и, к сожалению, на обоих сайтах не будет прямого указания пользователю, что сообщение было отклонено из-за недействительного сертификата.

<div id="usage"></div>

## 3. Использование
### 3.1 Общие
* После настройки экземпляра адаптера для каждого настроенного канала в объектах соответствующего экземпляра адаптера создается папка с именем канала.

	![IobrokerObjectОбзор](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerObjectOverview.png)

* В этой папке можно найти объект сообщения соответствующего канала, который представляет отправленное или полученное сообщение.

***ПРИМЕЧАНИЕ:***\ *При отправке сообщения или изменении объекта сообщения пользователем убедитесь, что флаг Ack не установлен. Флаг Ack будет установлен адаптером после подтверждения успешного получения сообщения сервером чата Synology.*\ **Если флаг Ack установлен пользователем при изменении значения сообщения в представлении объекта ioBroker, сообщение будет не обрабатываться!***

	![IobrokerObjectSetMessage](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerObjectSetMessage.png)

* При изменении объекта сообщения и выборе типа канала «Отправить данные на сервер чата Synology» это сообщение передается в чат Synology.

	![SynoChatChannelIncomingMessage](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatChannelIncomingMessage.png)

* Чтобы получать сообщения от Synology Chat Server и чтобы объект сообщения обновлялся соответствующим образом, убедитесь, что настроенное `Триггерное слово` (см. [Конфигурация чата Synology](#synology-chat-configuration)) находится в сообщении без знаков препинания. Поэтому он должен стоять один.

**Пример:**\ Если `Trigger word` будет `Alarm`, сообщение в чате Synology должно выглядеть следующим образом:\ `An alarm was triggered in the hallway.`

Обратите внимание, что `Trigger word` чувствителен к регистру (необходимо учитывать прописные и строчные буквы).

<div id="web-hook-location"></div>

* URL-адрес/адрес веб-хука будет предоставлен как значение объекта в информационной папке экземпляра адаптера и действителен для всех каналов с одним экземпляром адаптера.

	![IobrokerObjectWebHook](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerObjectWebHook.png)

### 3.2 Тип содержимого сообщения
Помимо отправки обычных текстовых сообщений, во входящий канал также можно отправлять другие типы контента, такие как изображения. Для реализации этого контент должен быть доступен как веб-ресурс. Чтобы отправить изображение, просто установите URL-адрес в качестве значения объекта сообщения экземпляра адаптера Syno-Chat, упомянутого в [3. Использование > 3.1 Общие](#usage).

**Пример использования камеры наблюдения:**\ Многие камеры наблюдения предоставляют поток или интерфейс для получения изображения, которое обновляется через заданный интервал времени или при обнаружении движения.\ Этот URL-адрес предоставляет изображение, которое необходимо устанавливается в качестве значения объекта сообщения.

### 3.3 Отладка в случае возникновения проблем
Чтобы получить более подробную информацию о поведении адаптера в случае возникновения проблем, вы можете повысить уровень журнала экземпляра адаптера `synochat` до `debug`.

Поскольку этот адаптер использует экземпляр адаптера `web` для предоставления веб-перехватчиков серверу чата Synology, настроенный экземпляр `web` выполняет некоторые функции. Чтобы получить более подробную информацию в случае проблем с получением сообщений, необходимо повысить уровень журнала настроенного экземпляра `web`, а также до `debug`. Сообщения журнала, относящиеся к адаптеру `synochat`, можно идентифицировать по префиксу сообщений журнала `synochat.<INSTANCE_NUMBER>`.

---

## Другие раскрытия информации
#### Атрибуция ресурса
- [Значки чата, созданные Pixel perfect - Flaticon](https://www.flaticon.com/free-icons/chat)

[donate-badge]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcgMjJoMTBhMSAxIDAgMCAwIC45OS0uODU4TDE5Ljg2NyA4SDIxVjZoLTEuMzgybC0xLjcyNC0zLjQ0N0EuOTk4Ljk5OCAwIDAgMCAxNyAySDdjLS4zNzkgMC0uNzI1LjIxNC0uODk1LjU1M0w0LjM4MiA2SDN2MmgxLjEzM0w2LjAxIDIxLjE0MkExIDEgMCAwIDAgNyAyMnptMTAuNDE4LTExSDYuNTgybC0uNDI5LTNoMTEuNjkzbC0uNDI4IDN6bS05LjU1MSA5LS40MjktM2g5LjEyM2wtLjQyOSAzSDcuODY3ek03LjYxOCA0aDguNzY0bDEgMkg2LjYxOGwxLTJ6IiBmaWxsPSIjZWRmMmZhIiBjbGFzcz0iZmlsbC0wMDAwMDAiPjwvcGF0aD48L3N2Zz4=

[donate-badge2]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjYuNSAxNUgyNnYtMWEyIDIgMCAwIDAtMi0ySDJhMiAyIDAgMCAwLTIgMnY2YTEwLjY0IDEwLjY0IDAgMCAwIDExIDExaDRhMTAuNzkgMTAuNzkgMCAwIDAgOS4zMS01aDIuMTlhNS41IDUuNSAwIDAgMCAwLTExWk0xNSAyN2gtNGE2LjcgNi43IDAgMCAxLTctN3YtNGgxOHY0YTYuNzcgNi43NyAwIDAgMS03IDdabTExLjQ0LTQuNzdoLS43OGExMy43NSAxMy43NSAwIDAgMCAuMi0yLjMxdi0xLjE1aC41OGExLjczIDEuNzMgMCAwIDEgMCAzLjQ2Wk0xMyAxMGEyIDIgMCAwIDAgMi0yVjJhMiAyIDAgMSAwLTQgMHY2YTIgMiAwIDAgMCAyIDJaTTIwIDEwYTIgMiAwIDAgMCAyLTJWN2EyIDIgMCAwIDAtNCAwdjFhMiAyIDAgMCAwIDIgMlpNNiAxMGEyIDIgMCAwIDAgMi0yVjZhMiAyIDAgMCAwLTQgMHYyYTIgMiAwIDAgMCAyIDJaIiBmaWxsPSIjZjBmNWZhIiBjbGFzcz0iZmlsbC1iYTYzYzYiPjwvcGF0aD48L3N2Zz4=

[donate-link]: https://www.paypal.com/donate/?hosted_button_id=9MLB29CKX5674

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 1.3.1 (2023-08-13)
- *[@phoeluga]* Fixed TypeError issue with empty initial value of outgoing channels - #13
- *[@phoeluga]* Updated information about handling of outgoing channels - #14
- *[@phoeluga]* Fixed special character escaping issue - #16
- *[@phoeluga]* Added text mapping for 'human readable' descriptions of the message parent objects - #14

### 1.3.0 (2023-07-23)
- *[@phoeluga]* Added feature to react on messages from Notification-Manager - #9
- *[@phoeluga]* Added feature to react on general received messages sent to the `synochat` adapter instance.
- *[@phoeluga]* Added message templates for received messages from other adapters.
- *[@phoeluga]* Added message templates for object values related to an associated channel.

### 1.2.1 (2022-05-18)
- *[@phoeluga]* The IP family check to determine the local IP address of the ioBroker instance has been adjusted.

### 1.2.0 (2022-05-17)

- *[@phoeluga]* Added enhancement #6 - Delayed sending of messages has been added to work around the limitations of messages sent to the Synology Chat Server in a certain time interval.
- *[@phoeluga]* Regarding #6, a message queue has been added to ensure that the order of messages to be sent is respected when the sending of messages is delayed.
- *[@phoeluga]* Implementation of the [requirements](https://github.com/ioBroker/ioBroker.repositories/pull/1759#issuecomment-1127520995) for adding the adapter in the ioBroker repository - Adding MIT license hint to the Readme.
- *[@phoeluga]* Implementation of the [requirements](https://github.com/ioBroker/ioBroker.repositories/pull/1759#issuecomment-1127520995) for adding the adapter in the ioBroker repository - Moved adapter instance object subscription after initial connectivity check.
- *[@phoeluga]* Implementation of the [requirements](https://github.com/ioBroker/ioBroker.repositories/pull/1759#issuecomment-1127520995) for adding the adapter in the ioBroker repository - Added exception handling to cover https://github.com/nodejs/node/issues/43014 in Nodejs 18
- *[@phoeluga]* Implementation of the [requirements](https://github.com/ioBroker/ioBroker.repositories/pull/1759#issuecomment-1127527703) for adding the adapter in the ioBroker repository - Added axios as dependency in package.json

### 1.1.1 (2022-04-16)

- *[@phoeluga]* Fixed issue #4 - Issue while migrating data from version < 1.1.0
- *[@phoeluga]* Added collecting and loading of default values when loading the initial configuration of the adapter instance
- *[@phoeluga]* The channel search behavior has been adjusted to react accordingly to deactivated channels and to query the remaining channels.

### 1.1.0 (2022-04-14)

- *[@phoeluga]* Added the ability to manage multiple channels in one adapter instance per Synology chat server.
- *[@phoeluga]* A possibility of ioBroker hostname / IP address configuration has been introduced.\
(May be helpful when using an ioBroker Docker instance).
- *[@phoeluga]* A functionality to receive incoming messages from the Synology chat server using WebHooks has been added.\
(An instance of the web adapter is required to use this feature)
- *[@phoeluga]* The translation of the UI properties was added.
- *[@phoeluga]* Added function to migrate channel data from an older version to a new channel object in the list approach.
- *[@phoeluga]* Added possibility for a user to disable dedicated channels from being processed.

### 1.0.1 (2022-04-06)

- *[@phoeluga]* Resolved #1 - Unable to send messages with special characters
- *[@phoeluga]* Resolved #2 - Send images


### 1.0.0 (2022-04-05)

- *[@phoeluga]* Initial release


### 0.0.1 (2022-04-03) - ALPHA

- *[@phoeluga]* Start of development

## License

This code is licensed under 'The MIT License (MIT)' license specified in the [LICENSE](./LICENSE) file.

Copyright (c) 2023 phoeluga <phoeluga@gmail.com>
