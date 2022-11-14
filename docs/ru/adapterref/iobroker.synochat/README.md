---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.synochat/README.md
title: <img src="docs/images/synochatLogo.png" alt="Рисование"/>Адаптер Synology-Chat для ioBroker
hash: DzT6jCvzbCdQRXm+MK1pxWib1vd3CPkC2plPyUPr+Ok=
---
![версия NPM](https://img.shields.io/npm/v/iobroker.synochat.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.synochat.svg)
![Количество установок](https://iobroker.live/badges/synochat-installed.svg)
![Текущая версия в стабильном репозитории](https://iobroker.live/badges/synochat-stable.svg)
![Статус зависимости](https://img.shields.io/david/phoeluga/iobroker.synochat.svg)
![НПМ](https://nodei.co/npm/iobroker.synochat.png?downloads=true)

#<img src="docs/images/synochatLogo.png" alt="Рисование"/> Адаптер Synology-Chat для ioBroker
![Тестируйте и выпускайте](https://github.com/phoeluga/ioBroker.synochat/workflows/Test%20and%20Release/badge.svg)

[![Пожертвовать][пожертвовать-значок2]][пожертвовать-ссылка]

## Что это?
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

![SynoChatChannel](./docs/images/diSynoChatChannel.png) ![SynoChatИнтеграции](../../../en/adapterref/iobroker.synochat/./docs/images/diSynoChatIntegrations.png)

  #### 2.1.1. Входящая интеграция
Для интеграции входящего сообщения в чат Synology необходим токен, который можно взять из URL-адреса, сгенерированного при создании.
![SynoChatIntegrationВходящие](./docs/images/diSynoChatIntegrationIncoming.png) ![SynoChatIntegrationIncomingSettings](../../../en/adapterref/iobroker.synochat/./docs/images/diSynoChatIntegrationIncomingSettings.png)

<div id="synologyChatConfigurationOutgoingIntegration"></div>

  #### 2.1.1. Исходящая интеграция
Для интеграции исходящего сообщения в чат Synology необходимо указать URL-адрес веб-перехватчика. Вы получите этот URL-адрес веб-перехватчика из объектов экземпляра после создания экземпляра адаптера `synochat`. Более подробную информацию можно найти в [3. Использование > 3.1 Общие](#webHookLocation) ![SynoChatIntegrationВходящие](./docs/images/diSynoChatIntegrationOutgoing.png) ![SynoChatIntegrationIncomingSettings](../../../en/adapterref/iobroker.synochat/./docs/images/diSynoChatIntegrationOutgoingSettings.png)

***ПРИМЕЧАНИЕ.*** *Тип канала (входящий; исходящий) указывается с точки зрения чата Synology. Например, «Входящие» означает, что сообщения будут отправлены на сервер чата Synology.*

Дополнительные сведения об интеграции с чатом Synology см. в официальной документации Synology [ЗДЕСЬ](https://kb.synology.com/DSM/help/Chat/chat_integration).

### 2.2. Конфигурация экземпляра адаптера ioBroker
- Конфигурация этого адаптера может быть выполнена в настройках экземпляра.

    #### 2.2.1. Основные параметры:
	![IobrokerInstanceSettingsMainSettings](../../../en/adapterref/iobroker.synochat/./docs/images/diIobrokerInstanceSettingsMainSettings.png)

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

Это значение используется для создания URL-адреса веб-перехватчика для каналов, которые получают сообщения с сервера чата Synology.

<div id="configurationAdapterWebInstance"></div>

* **Веб-экземпляр для отправки сообщений из чата Synology в экземпляр адаптера ioBroker**

        Адаптер `synochat` использует адаптер `web`, чтобы сделать доступными веб-перехватчики. Вам нужно выбрать конкретный экземпляр адаптера `web`, чтобы предоставить специальный веб-хук для интеграции чата Synology.

<div id="channel-configuration"></div>

    #### 2.2.2. Конфигурация/управление каналом:
	![IobrokerInstanceSettingsChannelConfiguration](../../../en/adapterref/iobroker.synochat/./docs/images/diIobrokerInstanceSettingsChannelConfiguration.png)

* **Канал включен**

Этот параметр можно использовать для отключения обработки входящих или исходящих сообщений.

Это может быть полезно, если, например. пользователь хочет отключить использование канала только временно и хочет сохранить настройки, такие как токен доступа или аналогичные, чтобы предотвратить их повторный сбор.

    * **Название канала**

Этот параметр указывает имя канала, из/в который отправляются сообщения. Это имя может быть свободно выбрано и используется для ссылок.

Настраиваемое здесь имя канала должно совпадать с именем канала чата Synology.

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

Если канал должен быть настроен как для отправки, так и для получения сообщений, просто добавьте второй канал с тем же именем и выберите другой тип канала.

* **Подтвердить SSL-сертификат — для нетекстовых сообщений**

В случае, если для типа входящего канала должно быть отправлено содержимое, отличное от текста, например изображение, это указывается из источника HTTP через URL-адрес. Если этот контент предоставляется с самозаверяющим сертификатом, проверку сертификата можно включить или отключить с помощью этого параметра.
Подробнее об отправке нетекстового содержимого см. в главе [Настройка чата Synology](#synology-chat-configuration)..

#### 2.2.3. Помощь:
   * Эта вкладка обычно перенаправляет на официальную страницу GitHub этого проекта, где дана подробная помощь и инструкции по использованию.
* Если есть открытые вопросы, предложения по изменениям, нежелательному поведению или ошибкам, создайте [проблему GitHub](https://github.com/phoeluga/ioBroker.synochat/issues/new/choose), чтобы убедиться в качестве этот проект.

<div id="configurationWebInstance"></div>

### 2.3. Конфигурация экземпляра `web`
Для получения сообщений с сервера чата Synology необходимо настроить исходящую интеграцию — см. [Исходящая интеграция](#synologyChatConfigurationOutgoingIntegration).

Для этого требуется, чтобы экземпляр адаптера `web` был запущен и настроен в файле [Экземпляр адаптера `synochat` настроен](#configurationAdapterWebInstance).

Если используемый экземпляр `web` настроен на использование безопасного соединения через HTTPS, **убедитесь, что вы предоставили действительный сертификат или импортировали свой собственный сертификат в свои доверенные сертификаты Synology**.\ В противном случае сообщения не отправляются с Сервер чата Synology к экземпляру адаптера ioBroker.
Связь не будет установлена, и, к сожалению, пользователю на обоих сайтах не будет прямого указания, что сообщение было отклонено из-за недействительного сертификата.

Если настроенный экземпляр `web` настроен на использование безопасного соединения через HTTPS, обязательно укажите действительный сертификат или импортируйте свой собственный сертификат в доверенные сертификаты в Synology.
В противном случае сообщения с сервера чата Synology не будут отправляться на ваш экземпляр адаптера ioBroker.

<div id="usage"></div>

## 3. Использование
### 3.1 Общие
* После настройки экземпляра адаптера для каждого настроенного канала в объектах соответствующего экземпляра адаптера создается папка с именем канала.

	![IobrokerObjectОбзор](../../../en/adapterref/iobroker.synochat/./docs/images/diIobrokerObjectOverview.png)

* В этой папке можно найти объект сообщения соответствующего канала, который представляет отправленное или полученное сообщение.

***ПРИМЕЧАНИЕ:***\ *При отправке сообщения или изменении объекта сообщения пользователем убедитесь, что флаг Ack не установлен. Флаг Ack будет установлен адаптером после подтверждения успешного получения сообщения сервером чата Synology.*\ **Если флаг Ack установлен пользователем при изменении значения сообщения в представлении объекта ioBroker, сообщение будет не обрабатываться!***

	![IobrokerObjectSetMessage](../../../en/adapterref/iobroker.synochat/./docs/images/diIobrokerObjectSetMessage.png)

* Если объект сообщения изменен и тип канала установлен на «Отправить данные на сервер чата Synology», это сообщение — в зависимости от типа канала — передается в чат Synology.

	![SynoChatChannelIncomingMessage](../../../en/adapterref/iobroker.synochat/./docs/images/diSynoChatChannelIncomingMessage.png)

<div id="webHookLocation"></div>

* URL-адрес/адрес веб-перехватчика будет предоставлен как значение объекта в информационной папке экземпляра адаптера и действителен для всех каналов с одним экземпляром адаптера.

	![IobrokerObjectWebHook](../../../en/adapterref/iobroker.synochat/./docs/images/diIobrokerObjectWebHook.png)

### 3.2 Тип содержимого сообщения
Помимо отправки обычных текстовых сообщений, во входящий канал также можно отправлять другие типы контента, такие как изображения. Для реализации этого контент должен быть доступен как веб-ресурс. Чтобы отправить изображение, просто установите URL-адрес в качестве значения объекта сообщения экземпляра адаптера Syno-Chat, упомянутого в [3. Использование > 3.1 Общие](#usage).

**Пример использования камеры наблюдения:**\ Многие камеры наблюдения предоставляют поток или интерфейс для получения изображения, которое обновляется через заданный интервал времени или при обнаружении движения.\ Этот URL-адрес предоставляет изображение, которое необходимо устанавливается в качестве значения объекта сообщения.

### 3.3 Отладка в случае возникновения проблем
Чтобы получить более подробную информацию о поведении адаптера в случае возникновения проблем, вы можете повысить уровень журнала экземпляра адаптера `synochat` до `debug`.

Поскольку этот адаптер использует экземпляр адаптера `web` для предоставления веб-перехватчиков серверу чата Synology, настроенный экземпляр `web` выполняет некоторые функции. Чтобы получить более подробную информацию в случае проблем с получением сообщений, вам необходимо повысить уровень журнала настроенного экземпляра `web`, а также до `debug`. Сообщения журнала, относящиеся к адаптеру `synochat`, можно идентифицировать по префиксу сообщений журнала `synochat.<INSTANCE_NUMBER>`.

---

## Другие раскрытия информации
#### Атрибуция ресурса
- [Значки чата, созданные Pixel perfect - Flaticon](https://www.flaticon.com/free-icons/chat)

[donate-badge]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcgMjJoMTBhMSAxIDAgMCAwIC45OS0uODU4TDE5Ljg2NyA4SDIxVjZoLTEuMzgybC0xLjcyNC0zLjQ0N0EuOTk4Ljk5OCAwIDAgMCAxNyAySDdjLS4zNzkgMC0uNzI1LjIxNC0uODk1LjU1M0w0LjM4MiA2SDN2MmgxLjEzM0w2LjAxIDIxLjE0MkExIDEgMCAwIDAgNyAyMnptMTAuNDE4LTExSDYuNTgybC0uNDI5LTNoMTEuNjkzbC0uNDI4IDN6bS05LjU1MSA5LS40MjktM2g5LjEyM2wtLjQyOSAzSDcuODY3ek03LjYxOCA0aDguNzY0bDEgMkg2LjYxOGwxLTJ6IiBmaWxsPSIjZWRmMmZhIiBjbGFzcz0iZmlsbC0wMDAwMDAiPjwvcGF0aD48L3N2Zz4=

[donate-badge2]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjYuNSAxNUgyNnYtMWEyIDIgMCAwIDAtMi0ySDJhMiAyIDAgMCAwLTIgMnY2YTEwLjY0IDEwLjY0IDAgMCAwIDExIDExaDRhMTAuNzkgMTAuNzkgMCAwIDAgOS4zMS01aDIuMTlhNS41IDUuNSAwIDAgMCAwLTExWk0xNSAyN2gtNGE2LjcgNi43IDAgMCAxLTctN3YtNGgxOHY0YTYuNzcgNi43NyAwIDAgMS03IDdabTExLjQ0LTQuNzdoLS43OGExMy43NSAxMy43NSAwIDAgMCAuMi0yLjMxdi0xLjE1aC41OGExLjczIDEuNzMgMCAwIDEgMCAzLjQ2Wk0xMyAxMGEyIDIgMCAwIDAgMi0yVjJhMiAyIDAgMSAwLTQgMHY2YTIgMiAwIDAgMCAyIDJaTTIwIDEwYTIgMiAwIDAgMCAyLTJWN2EyIDIgMCAwIDAtNCAwdjFhMiAyIDAgMCAwIDIgMlpNNiAxMGEyIDIgMCAwIDAgMi0yVjZhMiAyIDAgMCAwLTQgMHYyYTIgMiAwIDAgMCAyIDJaIiBmaWxsPSIjZjBmNWZhIiBjbGFzcz0iZmlsbC1iYTYzYzYiPjwvcGF0aD48L3N2Zz4=

[donate-link]: https://www.paypal.com/donate/?hosted_button_id=9MLB29CKX5674

## Changelog
All changes to this project are described in the [CHANGELOG](./CHANGELOG.md).

## License

This code is licensed under 'The MIT License (MIT)' license specified in the [LICENSE](./LICENSE) file.

Copyright (c) 2022 phoeluga <phoeluga@gmail.com>