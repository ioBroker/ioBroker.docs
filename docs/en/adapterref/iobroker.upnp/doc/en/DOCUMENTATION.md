---
chapters: {"pages":{"en/adapterref/iobroker.upnp/README.md":{"title":{"en":"ioBroker.upnp"},"content":"en/adapterref/iobroker.upnp/README.md"},"en/adapterref/iobroker.upnp/doc/en/DOCUMENTATION.md":{"title":{"en":"no title"},"content":"en/adapterref/iobroker.upnp/doc/en/DOCUMENTATION.md"}}}
---
1. [What is UPnP?](#what-is-upnp)
2. [Functional description](#functional-description)
3. [Object structure](#object-structure)
4. [General Objects](#general-objects)
5. [Upnp Objects](#object-structure)
6. [Control](#control)
7. [Devices/Service Specific Features](#devicesservice-specific-features)


### Intended use

Serves for communication and interaction with all UPnP-capable devices.

#### What is UPnP?

UPnP = Universal Plug and Play. The attempt to standardize communication between devices on the network. For this purpose there are so-called "schemas", which are displayed in the form of an xml file. They contain all information about the device or the software and its services that they provide. To ensure that these services can also be used, a description of each service is provided. This description follows the scheme defined for the service, allowing information and commands to be quickly exchanged without knowing which model or manufacturer the device or software is. In the past, this standardization was mainly used for media devices and software. For some time now, efforts have also been made to standardize the communication of the "IoT - Internet of Things" with this standardization. For this purpose, the "Open connectivity Foundation" was founded in 2016, which takes over the tasks of the UPnP forum, which has carried out the certification of UPnP-capable devices and created standards.

#### Functional description

The adapter broadcasts and evaluates the responses at the first start. The answers contain the link to the xml files of the services. The xml files are used to create the objects in ioBroker and fill them with all available information.

Time delayed a service is started which waits for messages from devices/services which log on or off. Newly detected devices/services are automatically added to the existing ones. A second service logs in to each available device and subscribes to status messages, so that ioBroker is automatically notified of any changes (sent) to the device/service.

#### Object structure

Each device or software that reacts to the broadcast is created as a separate object. Below this object you will find all available services with their capabilities. The possibilities are divided into 3 categories (role/role): indicator. state, action and argument.

**state -** is a variable representing the current state of an object/data point in the device/service. Each indicator.state has a certain type like number, string, boolean,..... In addition, it is also specified exactly what value or range of values the inidcator. state can have, these details are stored in the "native" of an object. Previously implemented native' s:
- 	sendEvents 		= Meaning until now Unknown.
- 	allowedValues 	= strings that are accepted.
- 	minimum 		= Gives the lowest value at which the value is accepted.
- 	maximum 		= Gives the highest value at which the acceptance is made.
- 	step 			= Specifies in which steps a value can be changed.

**button -** "reuqest" is a command that can be sent to and accepted by the device/service. This object usually has a subobject, the argument.

**argument -** is a sub-object of an action. The type is "mixed" as it is not specified. The native's of the object contain different information, they can be different from argument to argument. Previously known native' s:
- 	direction 		= Indicates the direction in which the information flow takes place. In "means that no value is returned. 					Out "means that a value is returned.
- 	relatedStateVariable 	= Returns the indicator. state at which the exchange of data is responsible for.
- 	argumentNumber 		= Returns the number of arguments of the action it is.

### General objects

The following objects are found for each device/service and are required for administration. They are not part of the UPnP standard or the device/instruction manual of the respective device.

**Alive -** set to "true" by the device/service and set to "null" by the adapter after x seconds if the device/service does not set it to "true" again. The expiration time depends on the maximum lifetime of the Alive signal given by the device. When a device logs off, the status is set to "false". It is possible to set this object to "true" by hand or script, but this should only be done if you are sure that the device/service is reachable. If Alive has been set manually to "true", it should also be set manually to "false" if not necessary anymore, otherwise errors may occur.

**Sid -** Serves as an identification of the subscription. This page is created by the host each time a subscription is requested from a client. The sid runs after a time defined by the host, so it is updated again and again. It is only valid for a particular service.

### UPnP Objects

The objects listed here can be found in the UPnP standard and/or the device/dinest-descriptions. This is not a complete list of all objects, this selection of objects represents only frequently occurring objects.

**(A_ARG_TYPE_)InstanceID -** The instanceID is the most common and is required because it specifies the instance of a service to be addressed. In most cases, the instanceID is = 0. This ID is passed with every event message by a service and every command that is sent to a service.

**(A_ARG_TYPE_)Channel (*) -** The channel object is associated with audio/video services. For example, a channel must be specified if you want to change the volume. Possible values can be, for example,"Master","LF" or "RF". In this example,"Master" stands for the general volume,"LF" for the left front and "RF" for the right front. If you want to change the volume only on the right front panel, you have to specify "RF" in Channel.

**(Set/Get)Volume (*) -** The Volume object is associated with audio/video services. Depending on where it occurs, it is used to display the volume or to adjust the volume. This object always has a minimum and a maximum value that can be specified, in most cases the range of values is between 0 and 100. The step size is normally 1, which means that only even numbers can be entered.

### Control

**button -** "request" action is a command that can be sent to the device/service. Each action also includes arguments that must be specified as mandatory. Action's can be recognized by its role/role, which says "action". If you describe the action with "send" the command is sent to the device/the service.

**state.argument.x -** Mandatory for an action, if role is "state.argument.in". Possible values that can/must be specified can be found in the "Related State Variable". The name of this "Related State Variable" is stored in the object under "native" -> "relatedStateVariable". The arguments must be given in a certain order, for this there is "native" -> Argument_No. An argument can be recognized by its role/role, where it says "argument". Some strings have to be written with a """" in the data point. It is not possible to answer this question in a flat-rate way, but with complex strings like URL's this can be the case. It only helps to try it out. If you want to pass a " in an argument you have to use """.

**(Related State) Variable -** These are variables used for data exchange. In the Native's of the variable, there is some information:

-	allowedValues = gives information about the possible contents of the variable or what can be sent as an argument with an action.
-	minimum = the lowest value that the variable can contain or be sent as an argument with an action.
-	maximum = the highest value that the variable can contain or be sent as an argument with an action.
-	step = indicates in which steps a value is specified.
-	sendEvents = ? Possible values are "yes" or "no". But it is completely unclear what that means. The assumption that the values for this variable are only sent automatically by a device/service if "yes" is set at sendEvents has not been confirmed.

Example how to poll the values:
```
// get every 10 seconds the values from device
schedule("*/10 * * * * *",  function () {
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetCommonLinkProperties.request"/*GetCommonLinkProperties*/, true);
   setState( "upnp.0.FRITZ!Box_6590_Cable.WANDevice.WANCommonInterfaceConfig.GetAddonInfos.request"/*GetAddonInfos*/, true);
});
```

You can enable polling in admin via objects configuration.

### Devices/Service Specific Features

**Sonos:** It is not possible to create a subscription for QPlay. This may require authentication.

**Phillips Hue Bridge 2:** The implementation of the UPnP standard in Hue Bridge 2 is faulty, which is why the Hue Bridge 2 is found but not accessible via UPnP.

**Yamaha:** Uses an API based on the UPnP standard, but using its own data format. Currently, this is not supported by the UPnP adapter.

**Sony:** Uses a ScalarWebApi interface called UPnP addressable but using its own data format. Currently, this is not supported by the UPnP adapter.

**Amazon Kindle:** Provides an UPnP service, but no UPnP service description is provided and therefore cannot be used.