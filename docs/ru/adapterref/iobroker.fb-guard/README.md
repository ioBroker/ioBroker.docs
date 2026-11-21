---
BADGE-NPM version: https://img.shields.io/npm/v/iobroker.fb-guard.svg
BADGE-Downloads: https://img.shields.io/npm/dm/iobroker.fb-guard.svg
BADGE-Number of Installations: https://iobroker.live/badges/fb-guard-installed.svg
BADGE-Current version in stable repository: https://iobroker.live/badges/fb-guard-stable.svg
BADGE-Test and Release: https://github.com/Flyor/ioBroker.fb-guard/workflows/Test%20and%20Release/badge.svg
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.fb-guard/README.md
title: ioBroker.fb-guard
hash: o2xAQIRtfEgd6GMnMdy0cMF/v0iPTFrKjqqRun2t38k=
---
![логотип](../../../de/admin/fb-guard.png)

# ioBroker.fb-guard

Система отслеживает безопасность вашего [FRITZ!Box](https://fritz.com) и уведомляет вас через Telegram или электронную почту в случае возникновения проблем.

## По какой причине

Любой, кто получает доступ к интерфейсу вашего маршрутизатора, получает полный контроль над вашей домашней сетью: переадресацией портов, DNS, телефонией и VPN-соединениями. Это может произойти из-за угаданного или скомпрометированного пароля, уязвимости прошивки или правила переадресации портов, которое было настроено много лет назад и забыто. Маршрутизатор записывает большую часть этой информации в свой журнал событий, но никто его не читает и не выдает никаких предупреждений.

fb-guard читает это за вас. Он сообщает о неудачных и неожиданных попытках входа в систему самого устройства (интерфейс, удаленный доступ, приложения, TR-064), а также отдельно об устройствах, пытающихся подключиться к Wi-Fi с неверным паролем. Он также проверяет настройки, которые могут способствовать атаке.

## Что проверяется

- В журнале событий зафиксированы **неудачные попытки входа в систему** , с указанием адреса, времени, имени пользователя, способа доступа и того, были ли они совершены из интернета или из домашней сети.
- Сводная информация **о неудачных попытках подключения к Wi-Fi** (неверный ключ) по каждому устройству с указанием того, распознает ли устройство устройство уже.
- **Регистрация в интернете** с адресов, которых нет в вашем списке известных адресов.
- **Открытые порты** : переадресация портов, MyFRITZ!, удаленный доступ, FTP через Интернет, TR-069 и UPnP, для каждого из которых приведено краткое описание его обычного назначения.
- **Прошивка** : доступно обновление, но не установлено, автоматические обновления отключены, бета-версия прошивки и более новые бета-версии, а также будет ли ваша модель по-прежнему получать обновления или потребуется новый блок.
- **Настройки** : Заводской пароль активен, вход без пароля, двухфакторная аутентификация отключена, новые пользователи устройства, открытый или слабый Wi-Fi, WPS
- **Перезагрузка устройства** (это очистит журнал событий).
- **Уровень безопасности от 0 до 100** для вашей визуализации.

Адаптер только считывает данные. Он ничего не меняет в устройстве и взаимодействует только с вашим собственным устройством.

## Обстановка

1. Установите адаптер и откройте настройки. Вкладки помогут вам выполнить настройку слева направо.
2. Создайте на устройстве отдельного пользователя с правами доступа только к «настройкам FRITZ!Box» и без доступа из интернета.
3. Нажмите «Проверить соединение».
4. Выберите Telegram и/или электронную почту и отправьте тестовое сообщение.

Все обнаруженные элементы перечислены в настройках на вкладке «Обнаруженные элементы», каждый с пояснением. Отметьте галочкой нужный элемент (например, правило переадресации портов, которое вы настроили) и сохраните. После этого он больше не будет отображаться в отчетах. Если что-то изменится, адаптер снова уведомит вас. Вы также можете запросить ежедневный или еженедельный обзор всех ожидающих обнаружения элементов.

## Безопасность и защита данных

- Пароль хранится в зашифрованном виде в ioBroker и никогда не записывается в лог.
- Соединение с устройством устанавливается по протоколу TLS. Ключ сертификата устройства записывается при первом подключении. Если он изменится, адаптер больше не сможет подключиться. Функция «Проверить соединение» отображает отпечаток сертификата, чтобы вы могли сравнить его с отпечатком сертификата устройства.
- После отклонения попытки входа в систему адаптер прекращает дальнейшие попытки, чтобы избежать блокировки.
- Внешние сервисы по умолчанию отключены. В настоящее время доступен только один: синхронизация прошивки. Он считывает файл версии с сервера загрузок производителя, из публичного списка поддержки продукта на fritz.com и, для бета-версий прошивки, с публичной страницы бета-версии. В лучшем случае передается название модели.
- Проверка порта проверяет только ваш собственный WAN-адрес.
- Инструмент диагностики удаляет пароли, ключи, имена пользователей, адреса и серийные номера.
- Совет: Откройте административную панель ioBroker через HTTPS, тогда ваши данные также будут зашифрованы во время передачи.

Гарантии нет: адаптер помогает выявлять проблемы, но сам по себе не обеспечивает безопасность вашей сети.

## Отказ от ответственности

FRITZ!, FRITZ!Box, FRITZ!OS и MyFRITZ! являются товарными знаками компании FRITZ! GmbH. Данный проект не связан с компанией FRITZ! GmbH (ранее AVM) и не одобрен и не проверен ею. Гарантии безопасности не предоставляется; использование на свой страх и риск.

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->
### 0.1.3 (2026-11-03)
* (Flyor) Messages and states are available in all ioBroker languages
* (Flyor) Summaries and vendor checks run at a random time, so not all systems access the services at once

### 0.1.2 (2026-10-12)
* (Flyor) The trusted certificate is bound to the box address and to its key, so a renewed certificate or a new box address no longer raises an alarm
* (Flyor) "Trust certificate again" accepts exactly the certificate from the warning
* (Flyor) Test connection shows the certificate fingerprint and checks the rights more strictly
* (Flyor) Readable adapter title
* (Flyor) Firmware comparison with the vendor server works again with the current file format
* (Flyor) Lab firmware is reported, and newer lab versions are found on the vendor lab page
* (Flyor) README explains what the adapter is for
* (Flyor) Failed Wi-Fi logins (wrong key) are reported per device
* (Flyor) Reports when the model gets no more updates, using the vendor support list

### 0.1.1 (2026-10-11)
* (Flyor) Clearer log messages: network problems and internal errors are no longer mixed up
* (Flyor) Pressing "run now" several times no longer queues the same checks again
* (Flyor) Small cleanups in the package

### 0.1.0 (2026-10-11)
* (Flyor) First release: failed logins, open ports, firmware and settings checks, findings and confirmation right in the settings, setup wizard, Telegram and e-mail

Older changes are in CHANGELOG_OLD.md.

## License
MIT License

Copyright (c) 2026 Flyor <AskMe@Stonehiller.de>

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