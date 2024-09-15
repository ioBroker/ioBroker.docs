---
translatedFrom: en
translatedWarning: 如果您想编辑此文档，请删除“translatedFrom”字段，否则此文档将再次自动翻译
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/zh-cn/adapterref/iobroker.hilink/README.md
title: ioBroker.hilink
hash: bFBKIrlMwYsfNrWvnVd5ncl4dlJeIU7Y/5KlhfMWeYM=
---
![标识](../../../en/adapterref/iobroker.hilink/admin/hilink.png)

![安装数量](http://iobroker.live/badges/hilink-stable.svg)

# IoBroker.hilink
＃＃ 描述
它是带有 Hilink 固件的华为 USB 调制解调器的适配器。

[Русский](https://github.com/bondrogeen/iobroker.hilink/blob/master/docs/ru/README.md)

在调制解调器上测试：E3372h-153_Update_22.323.01.00.143_M_AT_05.10 E3372s Update_22.286.53.01.161_S_ADB_TLN_03 E3272s 22.491.09.00.00 17.100.08.00.03-Mod1.2

固件和其他信息可以在这里找到 - http://4pda.ru/forum/index.php?showtopic=582284&

兼容性 E3372（МТС 827F/829F、МегаФон M150-2、Билайн E3372/E3370、TELE2 E3372р-153、МТС 824F、Мегафон M100-4、Билайн E3272）。

- 连接、断开网络连接并重新启动调制解调器
- 阅读收到和发送的消息。
- 发送消息。
- 发送 ussd 请求。
- 获取调制解调器的基本参数、流量信息。

```javascript

//  connection - 'connect',
//  disconnecting - 'disconnect'
//  rebooting - 'reboot'

sendTo("hilink.0",'control','reboot',function (response){
    log(JSON.stringify( response, null, 2 ));
});

sendTo("hilink.0",'control','connect');

// send messages
sendTo("hilink.0",'send',{
    phone:  '+7123456789', // phone number
    message:  'test messages' // test message
    },function (response){
    log(JSON.stringify( response, null, 2 ));
});

sendTo("hilink.0",'send',{phone:'+7123456789',message:  'test messages'});


// read messages
sendTo("hilink.0",'read','inbox',function (response){
     log(JSON.stringify( response, null, 2 ));
});

/*
'inbox' incoming,
'outbox' outgoing,
'new' new
*/


//send ussd request
sendTo("hilink.0",'ussd','*100#',function (response){
     log(JSON.stringify( response, null, 2 ));
});

// delete one messages to index '40002'
sendTo("hilink.0",'delete','40002',function (response){
     log(JSON.stringify( response, null, 2 ));
});

// clear all 'outbox' outgoing messages, 'inbox' incoming messages
sendTo("hilink.0",'clear','outbox',function (response){
     log(JSON.stringify( response, null, 2 ));
});

```

## Changelog

#### 0.3.0
* (bondrogeen) update

#### 0.2.8
* (bondrogeen) add E3272s

#### 0.2.2
* (bondrogeen) add json last sms

#### 0.0.5
* (bondrogeen) fix last sms

#### 0.0.4
* (bondrogeen) fix

#### 0.0.3
* (bondrogeen) add 3372h

#### 0.0.1
* (bondrogeen) initial release