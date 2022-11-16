# <img src="docs/images/synochatLogo.png" alt="drawing"/> Synology-Chat adapter for ioBroker

[![NPM version](https://img.shields.io/npm/v/iobroker.synochat.svg)](https://www.npmjs.com/package/iobroker.synochat)
[![Downloads](https://img.shields.io/npm/dm/iobroker.synochat.svg)](https://www.npmjs.com/package/iobroker.synochat)
![Number of Installations](https://iobroker.live/badges/synochat-installed.svg)
![Current version in stable repository](https://iobroker.live/badges/synochat-stable.svg)
[![Dependency Status](https://img.shields.io/david/phoeluga/iobroker.synochat.svg)](https://david-dm.org/phoeluga/iobroker.synochat)
![Test and Release](https://github.com/phoeluga/ioBroker.synochat/workflows/Test%20and%20Release/badge.svg)

[![NPM](https://nodei.co/npm/iobroker.synochat.png?downloads=true)](https://nodei.co/npm/iobroker.synochat/)

[![Donate][donate-badge2]][donate-link]

## What is it? 
This adapter provides an interface between Synology Chat and ioBroker.\
For this purpose, the standard integration features provided by Synology Chat and the corresponding REST API endpoints are used.
Incoming and Outgoing integrations can be used to send messages to the Synology chat server or update a message object within your ioBroker instance to receive messages.

---

# Manual

## 1. Installation
The adapter can be instantiated from the adapter section in your ioBroker installation.
More information can be found in the official [ioBroker documentation](https://www.iobroker.net/#de/documentation/admin/adapter.md).

## 2. Configuration

<div id="synology-chat-configuration"></div>

### 2.1. Synology chat configuration
- The Synology Chat offers the possibility to handle incoming and outgoing messages. In the following, both options will be examined in more detail.

- To create messages via the Synology Chat interface, an integration must be created in Synology Chat:
![SynoChatChannel](./docs/images/diSynoChatChannel.png)
![SynoChatIntegrations](./docs/images/diSynoChatIntegrations.png)

  	#### 2.1.1. Incoming integration

	For the integration of an incoming message in the Synology chat, a token is needed, which can be taken from the URL generated during the creation.
	![SynoChatIntegrationIncoming](./docs/images/diSynoChatIntegrationIncoming.png)
	![SynoChatIntegrationIncomingSettings](./docs/images/diSynoChatIntegrationIncomingSettings.png)

	<div id="synologyChatConfigurationOutgoingIntegration"></div>

  	#### 2.1.1. Outgoing integration
	For the integration of an outgoing message in the Synology chat, a web hook URL needs to be provided. You will get this web hook URL from the instance objects after instantiating the `synochat` adapter. More details can be found in [3. Usage > 3.1 General](#webHookLocation)
	![SynoChatIntegrationIncoming](./docs/images/diSynoChatIntegrationOutgoing.png)
	![SynoChatIntegrationIncomingSettings](./docs/images/diSynoChatIntegrationOutgoingSettings.png)

***NOTE:***
*The channel type (incoming; outgoing) is specified from the perspective of the Synology chat. For example, 'Incoming' means that the messages will be sent to the Synology chat server.*

For more details on how to handle integrations within Synology chat, please refer to Synology's official documentation [HERE](https://kb.synology.com/DSM/help/Chat/chat_integration)

### 2.2. ioBroker adapter instance configuration
- The configuration of this adapter can be done in the instance settings.
    #### 2.2.1. Main settings:
	![IobrokerInstanceSettingsMainSettings](./docs/images/diIobrokerInstanceSettingsMainSettings.png)
    
	* **Synology URL/IP**

        With this property a URL to your Synology-Chat app will be provided. Please note to use an absolute URL including `http://` or `https://` and do not provide an postfix like `/`.
		A specific port can be provided as usual behind the URL using `:`.

		***Sample for valid values:***
		- https://mychat.mydomain.tld
		- https://192.168.1.1:8080

    * **Validate SSL certificate**

        It is of course always recommended to encrypt data transfers.
		Often, self-signed certificates are used for encrypted connections in home environments. In this case, it may be necessary to disable SSL certificate verification of an HTTP connection.
		Disable this property to turn off certificate validation.
	
	* **Hostname / IP address of ioBroker instance**

        This property allows you to specify the hostname or IP address at which your ioBroker instance is accessible via URL. This value is automatically set to the current IP address of the host operating system of your ioBroker installation after the initial adapter instantiation.

		In case of using ioBroker as a Docker instance, it may be necessary to change this value, e.g. if a reverse proxy or similar is used to reach your ioBroker instance.

		This value is used to generate the web hook URL for channels that receive messages from the Synology chat server.

	<div id="configurationAdapterWebInstance"></div>

	* **Web instance for messages send from Synology chat to ioBroker adapter instance**

        The `synochat` adapter is using a `web` adapter to make web hooks available. You need to select a specific instance of the `web` adapter to provide a dedicated web hook to the Synology chat integration.

	<div id="channel-configuration"></div>

    #### 2.2.2. Channel configuration / management:
	![IobrokerInstanceSettingsChannelConfiguration](./docs/images/diIobrokerInstanceSettingsChannelConfiguration.png)

	* **Channel enabled**

		This option can be used to disable the handling of incoming or outgoing messages.

		This can be useful if e.g. the user wants to disable the use of a channel only temporarily and wants to keep the settings like the access token or similar to prevent to collect them again.

    * **Channel name**

		This setting specifies the name of the channel from/to which messages are sent. This name can be freely selected and is used for referencing.

		The channel name to be configured here should be identical to the channel name of the Synology chat.

	* **Channel token**

		This setting provides the access token to the Synology chat channel. Depending on the channel type, the creation of this varies.
		More details can be found in chapter [Synology chat configuration](#synology-chat-configuration).

		***NOTE:***\
		*Depending on the integration, when create the Synology chat integration, you will get a link similar to the following example:*

			https://mychat.mydomain.tld/webapi/entry.cgi?api=SYNO.Chat.External&method=incoming&version=2&token=%22QF5DWyG7M47Ls3cv%22
		
		*In this example, the token is included in the URL. Encoded control characters - `%22` - are specified here at the beginning and end of the setting.\
		**These have to be removed!**\
		In this example the token to be entered would be `QF5DWyG7M47Ls3cv`.*
		
	* **Channel type**
  
		***NOTE:***\
		*The channel type must be specified from the perspective of the Synology chat. For example, selecting 'Incoming' in the configuration means that the messages will be sent to the Synology chat.*

		This setting specifies the type of Synology chat channel that will be used depending on the integration selected in Synology chat.

		* **Send data to Synology chat server - Incoming integration**\
			This option enables the channel to send the new value of the ioBroker message object ([see usage chapter](#usage)) as soon as the object value changes.

        * **Get data from Synology chat server - Outgoing integration**\
			This option enables the channel to receive messages from the Synology chat server and update the new value of the ioBroker message object ([see usage chapter](#usage)).

			Please note that when using this channel type, the channel name of the ioBroker adapter instance configuration must be identical to the channel name of the Synology chat channel in order to receive messages.

		If a channel should be configured in both, sending and receiving messages, simply add a second channel with the same name and select the other channel type.

	* **Validate SSL certificate - For non-text messages**
	
		In case that for an incoming channel type a content other than a text, for example an image, is to be sent, this is specified from an HTTP source via a URL. If this content is provided with a self-signed certificate, the certificate check can be enabled or disabled with this setting.
		For details on sending non-text content, see chapter [Synology chat configuration](#synology-chat-configuration)..

	#### 2.2.3. Help:
   	* This tab usually redirects to the official GitHub page of this project, where detailed help and usage instructions are given.
	* If there are any open questions, suggestions for changes, unwanted behavior or bugs, please create a [GitHub issue](https://github.com/phoeluga/ioBroker.synochat/issues/new/choose) to ensure the quality of this project.

<div id="configurationWebInstance"></div>

### 2.3. Configuration of the `web` instance
For receiving messages from the Synology chat server an outgoing integration is needed to be configured - See [Outgoing integration](#synologyChatConfigurationOutgoingIntegration).

This requires an instance of the `web` adapter to be running and configures in the [`synochat` adapter instance configured](#configurationAdapterWebInstance).

If the used `web` instance is configured to use a secure connection over HTTPS, **ensure that you provide a valid certificate or import your own certificate into your Synology trusted certificates**.\
Otherwise, no messages are sent from the Synology chat server to your ioBroker adapter instance.
The communication will not be established and unfortunately there will be no direct indication to the user on both sites that the message was rejected due to an invalid certificate.

If the configured `web` instance is configured to use a secure connection via HTTPS make sure to provide a valid certificate or import your own certificate to the trusted certificates in your Synology.
Otherwise no messages will be send from the Synology chat server to your ioBroker adapter instance.

<div id="usage"></div>

## 3. Usage
### 3.1 General
* After configuring the adapter instance, a folder with the channel name is created for each configured channel in the objects of the respective adapter instance.
	![IobrokerObjectOverview](./docs/images/diIobrokerObjectOverview.png)

* In this folder a message object of the respective channel can be found, which represents the sent or received message.
  
  ***NOTE:***\
	*When sending a message or when the message object is changed by the user, make sure that the Ack flag is not set. The Ack flag will be set by the adapter after confirmation of successful receipt of the message by the Synology chat server.*\
	**If the Ack flag is set by the user while changing the message value in the ioBroker object view, the message will not be processed!***
		
	![IobrokerObjectSetMessage](./docs/images/diIobrokerObjectSetMessage.png)

* When the message object is changed and the channel type is set to `Send data to Synology chat server`, this message - depending on the channel type - is passed to the Synology chat.
	![SynoChatChannelIncomingMessage](./docs/images/diSynoChatChannelIncomingMessage.png)

<div id="webHookLocation"></div>

* The web hook URL / address will be provided as an object value in the info folder of the adapter instance ans is valid for all channels withing one adapter instance.
	![IobrokerObjectWebHook](./docs/images/diIobrokerObjectWebHook.png)

### 3.2 Message content type

Besides sending plain text messages, other content types such as images can also be sent to an incoming channel.\
To realize this, the content must be available as a web resource. To send an image, just set the URL as the value of the the message object of the Syno-Chat adapter instance mentioned in [3. Usage > 3.1 General](#usage).

**Example of a use case of a surveillance camera:**\
Many surveillance cameras provide a stream or interface to retrieve an image that is updated at a specified time interval or when motion is detected.\
This URL provides image that needs to be set as the value of the the message object.


### 3.3 Debugging in case of issues

To get more detailed information about the adapter behaviors in case of issues, you can increase the log level of the `synochat` adapter instance to `debug`.

Since this adapter is using a `web` adapter instance to provide web hooks to the Synology chat server, the configured `web` instance is executing some functions. In order to get more detailed information in case of receiving message issues you need to increase the log level of the configured `web` instance as well to `debug`. Log messages related to the `synochat` adapter can be identified by the log message prefix `synochat.<INSTANCE_NUMBER>`.

---

## Changelog
All changes to this project are described in the [CHANGELOG](./CHANGELOG.md).

## License

This code is licensed under 'The MIT License (MIT)' license specified in the [LICENSE](./LICENSE) file.

Copyright (c) 2022 phoeluga <phoeluga@gmail.com>


## Other disclosures
#### Resource attribution
- [Chat icons created by Pixel perfect - Flaticon](https://www.flaticon.com/free-icons/chat)



[donate-badge]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTcgMjJoMTBhMSAxIDAgMCAwIC45OS0uODU4TDE5Ljg2NyA4SDIxVjZoLTEuMzgybC0xLjcyNC0zLjQ0N0EuOTk4Ljk5OCAwIDAgMCAxNyAySDdjLS4zNzkgMC0uNzI1LjIxNC0uODk1LjU1M0w0LjM4MiA2SDN2MmgxLjEzM0w2LjAxIDIxLjE0MkExIDEgMCAwIDAgNyAyMnptMTAuNDE4LTExSDYuNTgybC0uNDI5LTNoMTEuNjkzbC0uNDI4IDN6bS05LjU1MSA5LS40MjktM2g5LjEyM2wtLjQyOSAzSDcuODY3ek03LjYxOCA0aDguNzY0bDEgMkg2LjYxOGwxLTJ6IiBmaWxsPSIjZWRmMmZhIiBjbGFzcz0iZmlsbC0wMDAwMDAiPjwvcGF0aD48L3N2Zz4=
[donate-badge2]:https://img.shields.io/static/v1?label=Treat%20a%20coffee&message=donate%20a%20tip&color=2a9cde&logo=data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHZpZXdCb3g9IjAgMCAzMiAzMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjYuNSAxNUgyNnYtMWEyIDIgMCAwIDAtMi0ySDJhMiAyIDAgMCAwLTIgMnY2YTEwLjY0IDEwLjY0IDAgMCAwIDExIDExaDRhMTAuNzkgMTAuNzkgMCAwIDAgOS4zMS01aDIuMTlhNS41IDUuNSAwIDAgMCAwLTExWk0xNSAyN2gtNGE2LjcgNi43IDAgMCAxLTctN3YtNGgxOHY0YTYuNzcgNi43NyAwIDAgMS03IDdabTExLjQ0LTQuNzdoLS43OGExMy43NSAxMy43NSAwIDAgMCAuMi0yLjMxdi0xLjE1aC41OGExLjczIDEuNzMgMCAwIDEgMCAzLjQ2Wk0xMyAxMGEyIDIgMCAwIDAgMi0yVjJhMiAyIDAgMSAwLTQgMHY2YTIgMiAwIDAgMCAyIDJaTTIwIDEwYTIgMiAwIDAgMCAyLTJWN2EyIDIgMCAwIDAtNCAwdjFhMiAyIDAgMCAwIDIgMlpNNiAxMGEyIDIgMCAwIDAgMi0yVjZhMiAyIDAgMCAwLTQgMHYyYTIgMiAwIDAgMCAyIDJaIiBmaWxsPSIjZjBmNWZhIiBjbGFzcz0iZmlsbC1iYTYzYzYiPjwvcGF0aD48L3N2Zz4=
[donate-link]: https://www.paypal.com/donate/?hosted_button_id=9MLB29CKX5674
