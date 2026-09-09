---
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.ring/README.md
title: Кольцевой адаптер
hash: n3Ge+4riAnBNpF9sAyd8urV5uUKVbssKbfosGzTCKeU=
---
![Логотип](../../../en/adapterref/iobroker.ring/admin/ring.png)

![Количество установок](http://iobroker.live/badges/ring-stable.svg)
![Версия NPM](http://img.shields.io/npm/v/iobroker.ring.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.ring.svg)
![НПМ](https://nodei.co/npm/iobroker.ring.png?downloads=true)

# Кольцевой адаптер

Адаптер Ring работает с устройствами Ring, такими как видеодомофон Ring и видеокамера Ring Cam, и показывает, если кто-то звонит в дверь или обнаружено движение. Видеодомофон Ring или видеокамера Ring передают видеопоток при обнаружении движения или звонка в дверь.

## Установка и настройка

После установки адаптера вам необходимо ввести свой токен. Теперь Ring требует использования двухфакторной аутентификации (2FA) для всех учетных записей. Чтобы получить токен, выполните следующие действия в командной строке.

```shell
npx -p ring-client-api ring-auth-cli
```

или

```bash
## Unix 
cd /opt/iobroker/node_modules/iobroker.ring/
npm i ring-client-api

cd /opt/iobroker/node_modules/iobroker.ring/node_modules/ring-client-api
node ring-auth-cli
```

Для пути к прямой трансляции и снимку, а также имени файла можно использовать специальные переменные. Эти переменные будут заменены счетчиком, меткой времени, идентификатором кольца или типом кольца.

- `%d` : Метка времени Unix. Пример:`test_%d -> test_1588331430061`
- `%g` : Дата в формате ГГГГММДД. Пример:`test_%g -> test_20240614`
- `%t` : Форматированное время HHiiss. Пример:`test_%t -> test_235901`
- `%i` Идентификатор вашего кольцевого устройства: Пример:`test_%i -> test_234567890`
- `%n` Счетчик с момента запуска экземпляра кольца. Пример:`test_%n -> test_1`
- `%k` Тип вашего кольцевого устройства: Пример:`test_%k -> test_doorbell`

### Часто задаваемые вопросы

#### Я не получаю событий, снимков и видеозаписей о движении или обнаружении человека.

Поздравляем! Весьма вероятно, что ваш текущий токен был внесен Ring в черный список, из-за чего вы не получаете необходимые push-уведомления. Лучший способ решить эту проблему — удалить все предыдущие токены браузеров/адаптеров на веб-сайте Ring и сгенерировать новый токен для адаптера.

Для корректной работы этого адаптера на события Ring необходимо отправить push-уведомление используемому [клиенту Ring API](https://github.com/dgreif/ring) . Логика этого адаптера была многократно проверена и работает у множества пользователей, поэтому, если у вас возникнут проблемы с отсутствием событий, это вряд ли вина данного адаптера.

### Изменения, нарушающие совместимость в версии V5

1. Некоторые точки данных были переименованы для большей согласованности (например,`livestream_request` свело к`request` как это уже есть в канале`livestream` ).
2. Теперь вы можете настроить, хотите ли вы реагировать на события (с записью, созданием снимков и т. д.) или нет.
3. Бинарные состояния были удалены.

### Изменения, нарушающие совместимость, в версии V3 Rewrite

1. Названия устройств были дополнены их описанием (например, из`Device 1234567` к`Device 1234567 ("Floodlight Garden")` )
2. Данные снимка/трансляции теперь находятся в соответствующем канале и содержат остальные точки данных.
3. Тип объекта snapshot/livestream был изменен с meta на state с типом file.
4. События (движение, звонок и т. д.) теперь находятся в соответствующем канале.
5. Из-за`ring-api` прекращение поддержки Node.js до`v16.x` этому адаптеру необходимо`node v16.x` или`node v18.x`
6. Частота активного обновления сократилась до одного раза в 2 часа, поскольку мы отслеживаем события и реагируем на них.

### SIP (до версии 3.x)

Вы можете использовать информацию SIP для видеоконференции SIP с вашим SIP-клиентом. Адаптер не предоставит доступ ко всем устройствам вызова, поскольку используемый API не включает все устройства вызова.

Вы можете использовать, например, SIP-клиент Blink по адресу <http://icanblink.com/> . Чтобы включить видео, зайдите в настройки Blink и в разделе «Учетные записи» переключитесь на вкладку «Медиа» и снимите флажок «Шифровать аудио и видео» в разделе «Параметры RTP». Будьте осторожны, информация SIP истекает через несколько секунд! Надеюсь, скоро я смогу добавить поддержку видеопотока. К сожалению, [у ring.com](https://ring.com) нет официального API, поддерживающего эту функцию. Если вы нажмете`livestream request` Нажав эту кнопку, вы получите новую информацию SIP для создания сеанса видеозвонка SIP. Если вы используете облако [ring.com](https://ring.com) , в разделе «История» вы найдете HTTP-ссылку на последнее записанное видео с датчика движения/дверного звонка.

## Установка

Установите этот адаптер, используя репозитории ioBroker.

> \[!NOTE] Этот адаптер не поддерживает установку из GitHub.

## Changelog

<!--
	Placeholder for the next version (at the beginning of the line):
	### **WORK IN PROGRESS**
-->
### 7.0.1 (2026-09-04)
- (mcm1957) **BREAKING:** enhanced security (added encryption) requires that you enter the access refreshtoken one more time 
- (bluefox) The admin tab was rewritten in React (`src-tab/`), replacing the materialize page - doorbell cameras are listed now, they were silently skipped before
- (bluefox) The tab no longer assumes the web adapter runs on port 8082; it derives host, port and protocol from the URL states
- (bluefox) The adapter was refactored: TypeScript 6, @iobroker/eslint-config, gulp removed
- (bluefox) **BREAKING:** `build/` is no longer committed and `common.nogit` is set - the adapter can only be installed from npm, no longer directly from GitHub
- (bluefox) `ring-client-api` is ESM only and is loaded dynamically now, which fixes `ERR_REQUIRE_ESM` on Node.js 22.0 - 22.11
- (bluefox) All backend timers are managed by js-controller now and are stopped when the instance unloads
- (bluefox) Scheduled jobs (daily sun calculation, auto save) are cancelled on unload and no longer collide between instances
- (bluefox) Fixed: the health state was never refreshed after switching a camera light
- (bluefox) Fixed: a failing livestream target preparation still deleted the target file and never reported the error to the caller
- (bluefox) Fixed: several `async` methods returned before the work they started was finished
- (bluefox) Removed the unused config values `email`, `password`, `pollsec`, `sentry_enable`, `timeout` and `twofaceauth`; `renew_registration` has a default now
- (bluefox) Removed the leftover `admin/index_m.html` - the configuration dialog has been JsonConfig for a while
- (Speedbreaker12) #993 Add doorbell_sunray (Battery Video Doorbell 2K) as doorbell
- (Speedbreaker12) #993 #854 Add stickup_cam_mini_ptz_v1 (Pan-Tilt Indoor Cam) as stickup cam
- (Speedbreaker12) #993 Unsupported device logging no longer dumps the whole device object (could expose the Ring refresh token in the log)
- (GermanBluefox) Devices previously created below `unknown_<id>` are recreated below `doorbell_<id>` / `stickup_<id>`; the old objects stay behind and have to be deleted manually
- (copilot) Adapter requires node.js >= 22 now
- (copilot) Adapter requires admin >= 7.7.22 now
- (copilot) Adapter requires js-controller >= 6.0.11 now
- (copilot) Adapter requires admin >= 7.6.17 now

* (copilot) **CI/CD**: Updated ioBroker Copilot Instructions template from v0.4.0 to v0.4.2

### 6.4.0 (2025-06-27)

* (theimo1221) #820 Support Node-JS 22

### 6.3.0 (2024-11-08)

* (theimo1221) #768 Add df_doorbell_clownfish
* (theimo1221) #738 Add stickup_cam_medusa
* (theimo1221) #685 Add cocoa_doorbell_v3

### 6.2.4 (2024-10-31)

* (simatec) Settings for responsive Design
* (theimo1221) Update some developer packages

### 6.2.3 (2024-10-31)

* (theimo1221) Fix License-Info object in io-package.json
* (theimo1221) Update iobroker test package
* (theimo1221) Update some test packages regarding mocha


[Older changelogs can be found there](CHANGELOG_OLD.md)

## License

MIT License


Copyright (c) 2026 iobroker-community-adapters <iobroker-community-adapters@gmx.de>  
Copyright (c) 2018-2025 Thorsten <thorsten@stueben.de> / <https://github.com/schmupu>

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