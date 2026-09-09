---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.synochat/README.md
title: <img src="docs/images/synochatLogo.png" alt="drawing"/> Адаптер Synology-Chat для ioBroker
hash: KdY90xutteoYa8FaaD/ok26675S0ILmZj/pyrcly8N0=
---
# <img src="docs/images/synochatLogo.png" alt="drawing"/> Адаптер Synology-Chat для ioBroker

![Стабильная версия](https://iobroker.live/badges/synochat-stable.svg)
![Версия NPM](https://img.shields.io/npm/v/iobroker.synochat.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.synochat.svg)
![Количество установок](https://iobroker.live/badges/synochat-installed.svg)
![Тестирование и выпуск](https://github.com/phoeluga/ioBroker.synochat/workflows/Test%20and%20Release/badge.svg)
![НПМ](https://nodei.co/npm/iobroker.synochat.png?downloads=true)

[![Donate][donate-badge2]][donate-link]

## Что это такое?
Этот адаптер обеспечивает интерфейс между Synology Chat и ioBroker. Для этого используются стандартные функции интеграции, предоставляемые Synology Chat, и соответствующие конечные точки REST API.
Интеграции для входящих и исходящих сообщений могут использоваться для отправки сообщений на сервер чата Synology или для обновления объекта сообщения в вашем экземпляре ioBroker для получения сообщений.

---

# Руководство
## 1. Установка
Адаптер можно создать в разделе адаптеров в вашей установке ioBroker.
Более подробную информацию можно найти в официальном документе [документация ioBroker](https://www.iobroker.net/#de/documentation/admin/adapter.md).

## 2. Конфигурация
<div id="synology-chat-configuration"></div>

### 2.1. Настройка чата Synology
- В Synology Chat есть возможность обрабатывать входящие и исходящие сообщения. Далее обе опции будут рассмотрены более подробно.

Для создания сообщений через интерфейс Synology Chat необходимо создать интеграцию в Synology Chat:

![SynoChatChannel](./docs/images/diSynoChatChannel.png) ![Интеграции SynoChat](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatIntegrations.png)

#### 2.1.1. Входящая интеграция
Для интеграции входящего сообщения в чат Synology необходим токен, который можно получить из URL-адреса, сгенерированного при создании.

![SynoChatIntegrationIncoming](./docs/images/diSynoChatIntegrationIncoming.png) ![SynoChatIntegrationIncomingSettings](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatIntegrationIncomingSettings.png)

<div id="synologyChatConfigurationOutgoingIntegration"></div>

#### 2.1.2. Исходящая интеграция
Для интеграции исходящего сообщения в чат Synology необходимо указать URL-адрес веб-перехватчика. Этот URL-адрес веб-перехватчика вы получите из объектов экземпляра после создания адаптера `synochat`. Более подробную информацию можно найти в [3. Использование > 3.1 Общие положения](#web-hook-location) ![SynoChatIntegrationIncoming](./docs/images/diSynoChatIntegrationOutgoing.png) ![SynoChatIntegrationIncomingSettings](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatIntegrationOutgoingSettings.png)

***ПРИМЕЧАНИЕ:*** *Тип канала (входящий; исходящий) указывается с точки зрения чата Synology. Например, «Входящий» означает, что сообщения будут отправляться на сервер чата Synology.*

Для получения более подробной информации о том, как работать с интеграциями в чате Synology, обратитесь к официальной документации Synology [ЗДЕСЬ](https://kb.synology.com/DSM/help/Chat/chat_integration)

### 2.2. Конфигурация экземпляра адаптера ioBroker
- Настройка этого адаптера может быть выполнена в параметрах экземпляра.

#### 2.2.1. Основные настройки:
	![IobrokerInstanceSettingsMainSettings](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerInstanceSettingsMainSettings.png)

* **URL/IP-адрес Synology**

С помощью этого свойства будет указан URL-адрес вашего приложения Synology-Chat. Обратите внимание, что следует использовать абсолютный URL-адрес, включающий `http://` или `https://`, и не следует указывать суффикс, например, `/`.
Конкретный порт можно указать, как обычно, после URL-адреса, используя `:`.

***Пример допустимых значений:***

- https://mychat.mydomain.tld
- https://192.168.1.1:8080

* **Проверка SSL-сертификата**

Разумеется, всегда рекомендуется шифровать передачу данных.
Часто в домашних условиях для зашифрованных соединений используются самоподписанные сертификаты. В этом случае может потребоваться отключить проверку SSL-сертификата для HTTP-соединения.
Отключите это свойство, чтобы выключить проверку сертификата.

* **Имя хоста / IP-адрес экземпляра ioBroker**

Это свойство позволяет указать имя хоста или IP-адрес, по которому ваш экземпляр ioBroker доступен по URL-адресу. После первоначального создания адаптера это значение автоматически устанавливается на текущий IP-адрес операционной системы хоста вашей установки ioBroker.

В случае использования ioBroker в качестве экземпляра Docker может потребоваться изменить это значение, например, если для доступа к вашему экземпляру ioBroker используется обратный прокси-сервер или аналогичное средство.

Это значение используется для генерации URL-адреса веб-перехватчика для каналов, получающих сообщения с чат-сервера Synology.

<div id="configurationAdapterWebInstance"></div>

* **Веб-экземпляр для сообщений, отправляемых из чата Synology в экземпляр адаптера ioBroker**

Адаптер `synochat` использует адаптер `web` для обеспечения доступности веб-хуков. Вам необходимо выбрать конкретный экземпляр адаптера `web`, чтобы предоставить выделенный веб-хук для интеграции с чатом Synology.

<div id="channel-configuration"></div>

#### 2.2.2. Управление каналами / настройка:
	![IobrokerInstanceSettingsChannelConfiguration](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerInstanceSettingsChannelConfiguration.png)

* **Канал включен**

Этот параметр позволяет отключить обработку входящих и исходящих сообщений.

Это может быть полезно, например, если пользователь хочет временно отключить использование канала и сохранить такие настройки, как токен доступа или аналогичные, чтобы предотвратить их повторное получение.

* **Название канала**

Этот параметр задает имя канала, с которого/на который отправляются сообщения. В случае каналов типа `Send data to Synology chat server - Incoming integration` это имя можно выбрать произвольно, и оно используется для ссылок.

Название канала, которое необходимо здесь настроить, должно совпадать с названием канала чата Synology.

Для каналов типа `Get data from Synology chat server - Outgoing integration` имя должно совпадать с именем канала чата Synology, чтобы получать сообщения.
Сопоставление имен каналов чувствительно к регистру (необходимо учитывать как верхний, так и нижний регистр).

* **Токен канала**

Этот параметр предоставляет токен доступа к каналу чата Synology. В зависимости от типа канала, процесс его создания может отличаться.
Более подробная информация приведена в главе [Настройка чата Synology](#synology-chat-configuration).

***ПРИМЕЧАНИЕ:*** *В зависимости от интеграции, при создании интеграции чата Synology вы получите ссылку, похожую на приведенный ниже пример:*

https://mychat.mydomain.tld/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22QF5DWyG7M47Ls3cv%22

*В этом примере токен включен в URL. Закодированные управляющие символы - `%22` - указаны здесь в начале и конце параметра. **Их необходимо удалить!** В этом примере вводимый токен будет `QF5DWyG7M47Ls3cv`.*

* **Тип канала**

***ПРИМЕЧАНИЕ:***\ *Тип канала необходимо указывать в настройках чата Synology. Например, выбор «Входящие» в конфигурации означает, что сообщения будут отправляться в чат Synology.*

Этот параметр определяет тип канала чата Synology, который будет использоваться в зависимости от интеграции, выбранной в чате Synology.

* **Отправка данных на сервер чата Synology - Входящая интеграция**

Эта опция позволяет каналу отправлять новое значение объекта сообщения ioBroker ([см. главу об использовании](#usage)) сразу после изменения значения объекта.

* **Получение данных с сервера чата Synology - исходящая интеграция**

Эта опция позволяет каналу получать сообщения с чат-сервера Synology и обновлять новое значение объекта сообщения ioBroker ([см. главу об использовании](#usage)).

Обратите внимание, что при использовании этого типа канала имя канала в конфигурации экземпляра адаптера ioBroker должно совпадать с именем канала чата Synology для получения сообщений.
Сопоставление имен каналов чувствительно к регистру (необходимо учитывать как верхний, так и нижний регистр).

Примечание: Пожалуйста, убедитесь, что вы не выбираете опцию «*реагировать на*» для исходящих каналов.

Если канал необходимо настроить как для отправки, так и для приема сообщений, просто добавьте второй канал с тем же именем и выберите другой тип канала.

* **Шаблон значения объекта**

Если значение объекта сообщения канала содержит значение в формате JSON, вы можете выбрать шаблон, который преобразует это значение объекта в удобочитаемый формат перед отправкой в канал чата Synology.

Соответствующий шаблон сообщения можно настроить в разделе [Шаблоны сообщений](#message-templates).

* **Реагируйте на уведомления в менеджере уведомлений**

Канал `synochat` может получать сообщения от канала [ioBroker Notification-Manager](https://github.com/foxriver76/ioBroker.notification-manager). Эта опция позволяет выбрать, должен ли соответствующий канал реагировать на сообщения от Notification Manager и пересылать их в Synology Chat.

Соответствующий шаблон сообщения можно настроить в разделе [Шаблоны сообщений](#messageTemplates).

* **Отвечайте на все сообщения ioBroker**

Помимо сообщений от [ioBroker Notification-Manager](https://github.com/foxriver76/ioBroker.notification-manager) `synochat`, канал может принимать и другие сообщения от других адаптеров. Эта опция позволяет выбрать, должен ли соответствующий канал реагировать на сообщения от всех других отправителей и пересылать их в Synology Chat.

Экземпляр адаптера может принимать сообщения. Эти сообщения представляют собой объект с несколькими атрибутами, которые могут быть включены в качестве параметров в шаблон сообщения. Эти параметры заменяются соответствующим образом перед отправкой сообщения.

Соответствующий шаблон сообщения можно настроить в разделе [Шаблоны сообщений](#message-templates).

* **Проверка SSL-сертификата - для сообщений, не являющихся текстовыми**

В случае, если для входящего канала необходимо отправить контент, отличный от текста, например, изображение, это указывается из HTTP-источника через URL. Если этот контент предоставляется с самоподписанным сертификатом, проверку сертификата можно включить или отключить с помощью этой настройки.
Подробнее об отправке нетекстового контента см. в главе [Настройка чата Synology](#synology-chat-configuration)..

<div id="message-templates"></div>

#### 2.2.3. Шаблоны сообщений:
Можно определить шаблоны сообщений, которые обрабатываются перед отправкой сообщения на Synology Chat Server. Эти шаблоны могут содержать шаблоны, которые заменяются в процессе отправки.

	![IobrokerInstanceSettingsChannelConfiguration](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerInstanceSettingsMessageTemplates.png)

Шаблоны всегда должны начинаться с `${` и заканчиваться на `}`, например, `${foo}`. При обработке сообщения шаблон `${foo}` будет заменен соответствующим JSON-значением атрибута `foo`.

	**Образец:**

Если канал, настроенный для отправки данных в Synology Chat, получает изменение объекта сообщения, оно может содержать значение в формате JSON, подобное следующему:

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

Вы можете получить доступ к внутренним атрибутам этого значения, указав их в пути, например, `${sensor.value}`.

Если вы хотите отправить сообщение, например: «Температура в гостиной изменилась до 23,4°C»,

Шаблон вашего сообщения будет выглядеть так:

`The ${sensor.type} in the ${sensor.location} changed to ${sensor.value}°C`

**ПРИМЕЧАНИЯ И ОГРАНИЧЕНИЯ:**

1. Если вы пытаетесь получить доступ к атрибуту с ключом, содержащим точки (`.`), вам необходимо экранировать их символами `/-`!

Например, если значение вашего объекта сообщения выглядит так:

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

Если вы хотите получить доступ к атрибуту `notification`, ваш шаблон будет `${category.instances.system/-adapter/-notification-manager/-0.notification}`

2. Невозможно получить доступ к конкретным элементам массивов.

Например, если значение вашего объекта сообщения выглядит так:

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

Вы не можете получить доступ к атрибуту `text` в объекте `message`. В этом случае вам необходимо подготовить значение объекта вне этого адаптера, прежде чем передавать его объекту сообщения канала `synochat`.

* **Шаблон для отправки сообщений, полученных через ioBroker Notification-Manager**

Этот шаблон определяет содержание сообщений, получаемых от Notification-Manager. В качестве параметров шаблона можно использовать имена атрибутов объекта `iobroker.Message` и встроенного объекта сообщения Notification-Manager.

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

Согласно описанию, менеджер уведомлений предоставит собственный объект сообщения, встроенный в атрибут `message`, как часть `iobroker.Message`.

Доступ к этим данным можно получить через атрибут `message`, используя шаблон `${message.NOTIFICATION_MANAGER_ATTRIBUTES}`.

**Доступные варианты расцветки:**

* `${command}` - Шаблон, связанный с объектом `iobroker.Message`.
* `${message}` - Шаблон, связанный с объектом `iobroker.Message`.
* `${from}` - Шаблон, связанный с объектом `iobroker.Message`.
* `${_id}` - Шаблон, связанный с объектом `iobroker.Message`.
* `${instances}` - Шаблон будет заменен списком экземпляров, связанных с полученным уведомлением от Notification-Manager.
* `${contextData}` - Шаблон, предоставляющий дополнительные контекстные данные, которые также хранятся вместе с информацией об уведомлении.

Более подробная информация о структуре [Объект сообщения Notification-Manager](https://github.com/foxriver76/ioBroker.notification-manager) можно найти в файле [README].](https://github.com/foxriver76/ioBroker.notification-manager).

Примечание: Пожалуйста, убедитесь, что вы не выбираете опцию «*реагировать на*» для исходящих каналов.

* **Шаблон для отправки сообщений, содержащих все остальные полученные сообщения**

Тот же самый объект `iobroker.Message`, что описан выше, используется для отправки сообщений всех типов экземпляру адаптера.

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

Из самого объекта можно использовать следующие шаблоны для доступа к значениям соответствующих атрибутов.

**Доступные варианты расцветки:**

* `${command}` - Шаблон, связанный с объектом `iobroker.Message`.
* `${message}` - Шаблон, связанный с объектом `iobroker.Message`.
* `${from}` - Шаблон, связанный с объектом `iobroker.Message`.
* `${_id}` - Шаблон, связанный с объектом `iobroker.Message`.

Шаблон `${message}` всегда содержит информацию от соответствующего отправителя. Если сообщение содержит только `String`, достаточно указать шаблон `${message}`. Если сообщение содержит значение в формате JSON, вы также можете получить доступ к внутренним атрибутам, указав путь к значению, например, `${message.foo.bar}`.

Примечание: Пожалуйста, убедитесь, что вы не выбираете опцию «*реагировать на*» для исходящих каналов.

* **Шаблоны 1-10 - Шаблоны, применяемые к конкретному каналу**

Вы также можете передать значение в формате JSON объекту сообщения определенного канала. В этом случае вы можете определить до десяти пользовательских шаблонов, которые будут применяться перед отправкой сообщения на сервер Synology Chat.

Доступ к атрибутам JSON можно получить, указав путь к значению в виде шаблона, например, `${foo.bar}`.

Шаблон может быть связан с каналом в [Настройка канала](#channel-configuration).

**Доступные варианты расцветки:**

Доступные шаблоны связаны со значением JSON клиента, которое будет передано объекту сообщения канала.

#### 2.2.4. Помощь:
* Эта вкладка обычно перенаправляет на официальную страницу проекта на GitHub, где представлены подробные справки и инструкции по использованию.
* Если у вас есть какие-либо открытые вопросы, предложения по изменениям, нежелательное поведение или ошибки, пожалуйста, создайте [проблему на GitHub](https://github.com/phoeluga/ioBroker.synochat/issues/new/choose), чтобы обеспечить качество этого проекта.

<div id="configurationWebInstance"></div>

### 2.3. Конфигурация экземпляра `web`
Для получения сообщений с чат-сервера Synology необходимо настроить исходящую интеграцию - см. [Исходящая интеграция](#synologyChatConfigurationOutgoingIntegration).

Для этого необходимо, чтобы был запущен экземпляр адаптера `web`, конфигурация которого находится в файле [Настроен экземпляр адаптера `synochat`](#configurationAdapterWebInstance).

Если используемый экземпляр `web` настроен на использование защищенного соединения по HTTPS, **убедитесь, что вы предоставили действительный сертификат или импортировали свой собственный сертификат в список доверенных сертификатов в вашем Synology**. В противном случае сообщения с сервера чата Synology на ваш адаптер ioBroker не будут отправляться.
Связь не будет установлена, и, к сожалению, ни на одном из сайтов не будет прямого уведомления пользователя о том, что сообщение было отклонено из-за недействительного сертификата.

<div id="usage"></div>

## 3. Использование
### 3.1 Общие положения
* После настройки экземпляра адаптера для каждого настроенного канала в объектах соответствующего экземпляра адаптера создается папка с именем канала.

	![IobrokerObjectOverview](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerObjectOverview.png)

* В этой папке можно найти объект сообщения соответствующего канала, представляющий собой отправленное или полученное сообщение.

***ПРИМЕЧАНИЕ:*** *При отправке сообщения или изменении пользователем объекта сообщения убедитесь, что флаг Ack не установлен. Флаг Ack будет установлен адаптером после подтверждения успешного получения сообщения сервером чата Synology.* **Если пользователь установит флаг Ack при изменении значения сообщения в представлении объекта ioBroker, сообщение не будет обработано!***

	![IobrokerObjectSetMessage](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerObjectSetMessage.png)

* При изменении объекта сообщения и установке типа канала на «Отправлять данные на сервер чата Synology», это сообщение передается в чат Synology.

	![SynoChatChannelIncomingMessage](../../../en/adapterref/iobroker.synochat/docs/images/diSynoChatChannelIncomingMessage.png)

* Чтобы получать сообщения от Synology Chat Server и чтобы объект сообщения обновлялся соответствующим образом, убедитесь, что настроенное «ключевое слово» (см. [Конфигурация чата Synology](#synology-chat-configuration)) присутствует в сообщении без знаков препинания. То есть оно должно стоять отдельно.

**Пример:** Если `Trigger word` будет `Alarm`, сообщение в чате Synology должно выглядеть так: `An alarm was triggered in the hallway.`

Обратите внимание, что `Trigger word` чувствителен к регистру (необходимо учитывать как верхний, так и нижний регистр).

<div id="web-hook-location"></div>

* URL/адрес веб-перехватчика будет предоставлен в виде значения объекта в папке info экземпляра адаптера и действителен для всех каналов в рамках одного экземпляра адаптера.

	![IobrokerObjectWebHook](../../../en/adapterref/iobroker.synochat/docs/images/diIobrokerObjectWebHook.png)

### 3.2 Тип содержимого сообщения
Помимо отправки обычных текстовых сообщений, во входящий канал можно отправлять и другие типы контента, например, изображения. Для этого контент должен быть доступен в качестве веб-ресурса. Чтобы отправить изображение, просто установите URL-адрес в качестве значения объекта сообщения экземпляра адаптера Syno-Chat, упомянутого в [3. Использование > 3.1 Общие положения](#usage).

**Пример использования камеры видеонаблюдения:** Многие камеры видеонаблюдения предоставляют поток или интерфейс для получения изображения, которое обновляется через заданный интервал времени или при обнаружении движения. Этот URL-адрес предоставляет изображение, которое необходимо установить в качестве значения объекта сообщения.

### 3.3 Отладка в случае возникновения проблем
Для получения более подробной информации о поведении адаптера в случае возникновения проблем можно повысить уровень логирования экземпляра адаптера `synochat` до `debug`.

Поскольку этот адаптер использует экземпляр адаптера `web` для предоставления веб-хуков серверу чата Synology, настроенный экземпляр `web` выполняет некоторые функции. Для получения более подробной информации в случае проблем с получением сообщений необходимо также повысить уровень логирования настроенного экземпляра `web` до `debug`. Сообщения журнала, относящиеся к адаптеру `synochat`, можно идентифицировать по префиксу сообщения журнала `synochat.<INSTANCE_NUMBER>`.

---

## Прочие раскрытия информации
#### Атрибуция ресурсов
- [Иконки чата созданы Pixel perfect - Flaticon](https://www.flaticon.com/free-icons/chat)

[donate-badge]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcgMjJoMTBhMSAxIDAgMCAwIC45OS0uODU4TDE5Ljg2NyA4SDIxVjZoLTEuMzgybC0xLjcyNC0zLjQ0N0EuOTk4Ljk5OCAwIDAgMCAxNyAySDdjLS4zNzkgMC0uNzI1LjIxNC0uODk1LjU1M0w0LjM4MiA2SDN2MmgxLjEzM0w2LjAxIDIxLjE0MkExIDEgMCAwIDAgNyAyMnptMTAuNDE4LTExSDYuNTgybC0uNDI5LTNoMTEuNjkzbC0uNDI4IDN6bS05LjU1MSA5LS40MjktM2g5LjEyM2wtLjQyOSAzSDcuODY3ek03LjYxOCA0aDguNzY0bDEgMkg2LjYxOGwxLTJ6IiBmaWxsPSIjZWRmMmZhIiBjbGFzcz0iZmlsbC0wMDAwMDAiPjwvcGF0aD48L3N2Zz4=

[donate-badge2]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjYuNSAxNUgyNnYtMWEyIDIgMCAwIDAtMi0ySDJhMiAyIDAgMCAwLTIgMnY2YTEwLjY0IDEwLjY0IDAgMCAwIDExIDExaDRhMTAuNzkgMTAuNzkgMCAwIDAgOS4zMS01aDIuMTlhNS41IDUuNSAwIDAgMCAwLTExWk0xNSAyN2gtNGE2LjcgNi43IDAgMCAxLTctN3YtNGgxOHY0YTYuNzcgNi43NyAwIDAgMS03IDdabTExLjQ0LTQuNzdoLS43OGExMy43NSAxMy43NSAwIDAgMCAuMi0yLjMxdi0xLjE1aC41OGExLjczIDEuNzMgMCAwIDEgMCAzLjQ2Wk0xMyAxMGEyIDIgMCAwIDAgMi0yVjJhMiAyIDAgMSAwLTQgMHY2YTIgMiAwIDAgMCAyIDJaTTIwIDEwYTIgMiAwIDAgMCAyLTJWN2EyIDIgMCAwIDAtNCAwdjFhMiAyIDAgMCAwIDIgMlpNNiAxMGEyIDIgMCAwIDAgMi0yVjZhMiAyIDAgMCAwLTQgMHYyYTIgMiAwIDAgMCAyIDJaIiBmaWxsPSIjZjBmNWZhIiBjbGFzcz0iZmlsbC1iYTYzYzYiPjwvcGF0aD48L3N2Zz4=

[donate-link]: https://www.paypal.com/donate/?hosted_button_id=9MLB29CKX5674

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### **WORK IN PROGRESS**
- *[@phoeluga]* Updated outdated devDependencies (`@alcalzone/release-script*` to v5.x, `@iobroker/testing` to 5.2.2)
- *[@phoeluga]* Bumped `admin` globalDependency requirement to `>=7.6.20`
- *[@phoeluga]* Migrated CI/CD to NPM Trusted Publishing (OIDC) — removed long-lived `NPM_TOKEN`
- *[@phoeluga]* Split monolithic `test-and-release.yml` workflow into reusable `test.yml` and `release.yml`
- *[@phoeluga]* Added `node:` prefix to all Node.js built-in `require()` calls
- *[@phoeluga]* Removed `JSON.parse(JSON.stringify(...))` anti-pattern in REST API client
- *[@phoeluga]* Fixed loose equality comparisons (`==` → `===`) throughout codebase
- *[@phoeluga]* Removed dead commented-out code and unreachable branches
- *[@phoeluga]* Fixed typos in log messages and variable names (`maxItter` → `maxIter`)
- *[@phoeluga]* Added optional chaining for safer template interpolation
- *[@phoeluga]* Updated copyright year to 2025-2026

### 1.4.2 (2025-10-04)
- *[@phoeluga]* Adding channelToken and channels properties to protectedNative and encryptedNative object type
- *[@phoeluga]* Enhanced template handling to properly ignore non-JSON objects, preventing them from being processed as JSON objects
- *[@OlliMartin]* Allow to be used in message templates - #34
- *[@phoeluga]* Adding compatibility check and testing for node.js 24 - #35
- *[@phoeluga]* Updated dependencies to the current minimum versions and according to - #36 ; #38 ; #39

### 1.3.3 (2025-01-26)
- *[@phoeluga]* Updated admin UI to fix responsive design (mobile view) - #28

### 1.3.2 (2025-01-04)
- *[@phoeluga]* Fixed issue with 5 digit port number when using a IP for property Synology URL/IP - #20
- *[@phoeluga]* Addressed W[171],W[105],W[109] - #18
- *[@phoeluga]* Updated admin style.css and classes to support scrolling on mobile device view - #24
- *[@phoeluga]* Updated several dependencies to met the current overall config - #21
- *[@phoeluga]* Update test-workflow to be prepared for Node.js v22 - #22
- *[@phoeluga]* Bumped min. Node.js version to v18 - #22
- *[@phoeluga]* Bumped @iobroker/adapter-core to version >= 3.x.x - #23
- *[@phoeluga]* Updated ESLint usage and config - Migration to ESLint 9 - #25

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

This code is licensed under 'The MIT License (MIT)' license specified in the [LICENSE](https://github.com/phoeluga/ioBroker.synochat/blob/master/LICENSE) file.

Copyright (c) 2025-2026 phoeluga <phoeluga@gmail.com>