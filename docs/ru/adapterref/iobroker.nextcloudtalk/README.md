---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.nextcloudtalk/README.md
title: Адаптер ioBroker Nextcloud Talk
hash: FghpMM1/d+igV6WEaRTugKo8SPF1Vuy9vr7WKzKEnyU=
---
# IoBroker Nextcloud Talk Adapter
Этот адаптер позволяет отправлять уведомления в комнаты Nextcloud Talk.

## Конфигурация
Этот адаптер теперь использует систему конфигурации JSON ioBroker. Введите следующие параметры в диалоговом окне экземпляра:

1. **URL-адрес сервера** — например, `https://nextcloud.example.com`
2. **Имя пользователя** для базовой аутентификации
3. Для пользователя генерируется **токен приложения**

## Штаты
- `roomID` (строка): токен комнаты разговора, в которую следует отправлять сообщения.
- `text` (строка): При изменении этого состояния адаптер отправляет новое значение как сообщение в настроенную комнату.

## Использование
Обновите состояние `text` из скриптов или других адаптеров для отправки сообщения.
Сообщения отправляются через конечную точку API Nextcloud Talk `/ocs/v2.php/apps/spreed/api/v1/chat/{token}`.

## Changelog

### **WORK IN PROGRESS**

### 1.0.2
* updated logo
* tests

### 1.0.1
* initial version

### 1.0.0
* initial version

## License

Copyright (c) 2025 Rello

MIT