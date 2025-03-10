---
title: Линукс
lastChanged: 23.10.2022
translatedFrom: de
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/install/linux.md
hash: aiCatYZKkq2LrcihIs3YAZEkYTwN9cfz6NNxqxF4odE=
---
# Установка ioBroker под Linux и на Raspberry Pi
ioBroker устанавливается с помощью сценария, который выполняет необходимые шаги установки и перезагружает любые пакеты программного обеспечения, которые могут потребоваться.

## Проверьте требования
Перед установкой проверьте, соответствует ли система всем необходимым [Требования к установке](./#de/documentation/install/requirements.md).

## Важные моменты, на которые следует обратить внимание
- НЕТ установки ioBroker от имени пользователя **root**! Выполнение сценария установки **должно** выполняться от имени обычного пользователя; этот пользователь в дальнейшем будет также администрировать систему. Обычного пользователя не следует называть `iobroker`, это должен быть пользователь, созданный во время базовой установки.
- Требуемое оборудование: Raspberry Pi с ОС Raspberry или любое другое оборудование с обычным Linux. Однако рекомендуется Debian, Ubuntu или один из дистрибутивов на их основе.
- Новичкам следует начинать с Debian/Raspberry Pi OS/Armbian без дополнительного уровня виртуализации, такого как Docker или Proxmox, поскольку с каждым дополнительным уровнем добавляются дополнительные административные усилия и возможные источники проблем.
- Установите вашу операционную систему как серверный вариант без рабочего стола.
- ioBroker работает как сервер 24/7 и администрируется через терминальные программы, такие как Putty, Powershell или аналогичные. Среда рабочего стола потребляет ненужные ресурсы и увеличивает вероятность ошибок.
- Аппаратное обеспечение Raspberry Pi: важно использовать хороший источник питания. Проблемы со стабильностью следует ожидать при слабом источнике питания (например, блоках питания сотовых телефонов).

## Малиновый Пи
Инструкции по установке ioBroker на Raspberry Pi: https://forum.iobroker.net/topic/51869/installation-auf-raspi-einfacher-gehen-s-nicht

## Линукс
* Установите желаемую текущую базовую операционную систему (Debian, Ubuntu и т. д.) в зависимости от используемого оборудования.

  Справка и инструкции для соответствующих версий доступны на соответствующих страницах поддержки, YouTube и т. д.

* Выполните обновление системы через консоль и в зависимости от используемой ОС с помощью ``sudo apt update && sudo apt full-upgrade``.

* ioBroker с помощью команды ``curl -sLf https://iobroker.net/install.sh | bash -`` установить.

  Сценарий установки будет выполнен. В зависимости от оборудования установка может занять некоторое время.

  Должно быть ``curl`` fehlen, kann das Paket einfach nachinstalliert werden: ``sudo apt install curl``.

  Установка происходит в 4 шага, которые можно увидеть в консоли:

  ``Installing prerequisites (1/4)``

  ``Creating ioBroker user and directory (2/4)``

  ``Installing ioBroker (3/4)``

  ``Finalizing installation (4/4)``

  В конце есть сообщение

  ``ioBroker was installed successfully``

  ``Open http://localhost:8081 in a browser and start configuring!``

Теперь к ioBroker можно получить доступ через указанный IP-адрес в веб-браузере ``http://<IP-Adresse>:8081`` и настроить его.

# Установка ioBroker под Docker
## Проверьте требования
Перед установкой проверьте, соответствует ли система всем необходимым [Требования к установке](./#de/documentation/install/requirements.md).

## Установка
На этой странице вы можете найти официальную документацию по установке ioBroker на Docker: https://docs.buanet.de/de/iobroker-docker-image/