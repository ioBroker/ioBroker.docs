---
chapters: {"pages":{"en/adapterref/iobroker.pondpump/README.md":{"title":{"en":"ioBroker.pondpump"},"content":"en/adapterref/iobroker.pondpump/README.md"},"en/adapterref/iobroker.pondpump/doc/handbook/en/manual.md":{"title":{"en":"ioBroker.pondpump — User Manual"},"content":"en/adapterref/iobroker.pondpump/doc/handbook/en/manual.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.pondpump/README.md
title: ioBroker.pondpump
hash: W+rcHuWvtxMTXacHibs1G3d2RD6c4ooytT6WpCPoB8o=
---
![Логотип](../../../en/adapterref/iobroker.pondpump/admin/pondpump.png)

![Версия NPM](https://img.shields.io/npm/v/iobroker.pondpump.svg)
![Загрузки](https://img.shields.io/npm/dm/iobroker.pondpump.svg)
![Количество установок](https://iobroker.live/badges/pondpump-installed.svg)
![Текущая версия находится в стабильном репозитории.](https://iobroker.live/badges/pondpump-stable.svg)
![НПМ](https://nodei.co/npm/iobroker.pondpump.png?downloads=true)
![Тестирование и выпуск](https://github.com/ssbingo/ioBroker.pondpump/workflows/Test%20and%20Release/badge.svg)

# ioBroker.pondpump

---

<p align="center">
  <a href="https://www.buymeacoffee.com/ssbingo"><img src="https://img.buymeacoffee.com/button-api/?text=Buy%20me%20a%20coffee&emoji=&slug=ssbingo&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" /></a>
</p>

---

## Адаптер для насоса Pondpump для ioBroker

Управляйте и контролируйте прудовые насосы **OASE AquaMax Eco Titanium** через **облачную платформу OASE Garden Controller Cloud (EGC)** — локально и через облако.

Страницы товаров производителя:

- Насос для пруда [OASE AquaMax Eco Titanium](https://www.oase.com/) , артикул 73656
- [Облачный контроллер садового оборудования OASE](https://www.oase.com/) (шлюз EGC, артикул 55317)

### Отказ от ответственности

Это **неофициальный проект сообщества** . Он никоим образом **не связан с компанией OASE GmbH, не одобрен ею и не поддерживается ею** . «OASE», «AquaMax» и связанные с ними названия продуктов являются товарными знаками OASE GmbH и используются здесь исключительно для описания совместимости устройств. Протокол связи был проанализирован независимо — используйте этот адаптер на свой страх и риск.

Благодарность: [mr-suw/ioBroker.oasecontrol](https://github.com/mr-suw/ioBroker.oasecontrol) (адаптер для контроллеров разъемов EGC, FM-Master EGC) послужил ценным справочным материалом по протоколу. Код не копировался; этот адаптер предназначен для интеллектуальных прудовых насосов и был написан с нуля.

### Поддерживаемое оборудование

| Устройство                         | Номер изделия. | Роль                           |
| ---------------------------------- | -------------- | ------------------------------ |
| OASE Garden Controller Cloud (EGC) | 55317          | Шлюз (`GatewayCloud` )         |
| OASE AquaMax Eco Titanium          | 73656          | Прудовой насос (`GardenPump` ) |

### Статус проекта

- **Этап 1 — доступ только для чтения из облака** ✓ опрашивает облачный инвентарь OASE; шлюз и оба насоса с отображением текущего состояния.
- **Этап 2 — облачное управление** ✓ Включение/выключение насоса и скорость можно изменять через облачный туннель
- **Этап 4 — телеметрия в реальном времени** ✓ мощность, скорость двигателя, температура и напряжение сети считываются в режиме реального времени при каждом опросе
- **Фаза 3 — локальный (LAN) транспорт** ✓ режим подключения`local` Запускает весь процесс подключения адаптера по локальной сети без использования облака: инвентаризация, телеметрия в реальном времени, включение/выключение и управление скоростью — всё через локальную сеть.

**Аутентификация в облаке:** облако OASE использует **Azure AD B2C** (`account.oase.com` Адаптер аутентифицируется с помощью удобного для безголовых систем **механизма предоставления токена обновления** : один раз получайте токен обновления при входе в приложение OASE и вставляйте его в настройки адаптера (в зашифрованном виде). Адаптер обменивает его на кратковременные токены доступа и прозрачно обновляет токен обновления. **Пароль вашей учетной записи никогда не вводится и не хранится адаптером.** Без токена обновления адаптер запускается, но сообщает об ошибке.`info.connection = false` с четким предупреждением.

### Конфигурация

Все настройки доступны в административном интерфейсе (конфигурационный файл JSON):

| Параметр                              | Описание                                                                           |
| ------------------------------------- | ---------------------------------------------------------------------------------- |
| Режим подключения                     | `cloud` или`local` (взаимоисключающие)                                             |
| Интервал опроса                       | Интервал опроса в секундах (по умолчанию 30)                                       |
| Пользователь/пароль облачного сервиса | Учетные данные облачной учетной записи OASE (пароль хранится в зашифрованном виде) |
| IP-адрес контроллера                  | IP-адрес шлюза EGC (локальный режим)                                               |
| пароль устройства                     | Пароль устройства для локальной аутентификации (хранится в зашифрованном виде)     |
| Адрес привязки / порт                 | Локальный TLS-сервер, к которому контроллер подключается обратно.                  |

## Документация

📖 **Руководство для начинающих:** [английский](/#/docs/adapterref/iobroker.pondpump/doc/handbook/en/manual.md) ( [PDF](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/handbook/en/manual.pdf) ) · [немецкий](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/handbook/de/manual.md) ( [PDF](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/handbook/de/manual.pdf) )

Переведённая документация:

- 🇩🇪 [Немецкая документация](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/de/README.md)
- 🇷🇺 [Документация на английском языке](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/ru/README.md)
- 🇳🇱 [Документальные фильмы о Нидерландах](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/nl/README.md)
- 🇫🇷 [Документация на французском языке](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/fr/README.md)
- 🇮🇹Итальянская [документация](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/it/README.md)
- 🇪🇸 [Документация на испанском языке](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/es/README.md)
- 🇵🇱 [Документация польская](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/pl/README.md)
- 🇵🇹 [Португальская документация](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/pt/README.md)
- 🇺🇦 [Документация украинская](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/uk/README.md)
- 🇨🇳[简体中文文档](https://github.com/ssbingo/ioBroker.pondpump/blob/main/doc/zh-cn/README.md)

Более старые списки изменений можно найти в [файле CHANGELOG\_OLD.md](https://github.com/ssbingo/ioBroker.pondpump/blob/main/CHANGELOG_OLD.md) .

## Changelog
<!--
    Placeholder for the next version (at the beginning of the line):
    ### **WORK IN PROGRESS**
-->

### 0.6.0 (2026-09-09)

- (ssbingo) **Maximum power % per pump.** A new hard ceiling in the scheduler's fine-tuning: the applied power never exceeds it — it is capped **last**, so it also limits the temperature curve, weather-rule raises/`boostMax` and the missing-source fail-safe. For pumps that only run up to e.g. 90 %

### 0.5.1 (2026-09-09)

- (ssbingo) Fix: the new **water temperature sensor** dropdown rendered as an empty, flat field (empty value, no visible control) — rebuilt as a proper labelled `Select` (with `displayEmpty`/notched label) so the field, its value and the dropdown show correctly
- (ssbingo) Fix: on startup the scheduler evaluated the temperature curve **before** subscribing to its source states, so the curve briefly hit the missing-source **fail-safe (100 %)** even though the water sensor had a value — it now subscribes to the sources first, then evaluates

### 0.5.0 (2026-09-09)

- (ssbingo) **Water-temperature sensor picker + clearer scheduler UI.** Each pump's temperature/weather section gains a **"Water temperature sensor"** dropdown: it lists the pump's own device temperature sensors **with their live value**, so you pick which one actually reads the water. The choice feeds a new read-only state **`telemetry.waterTemperature`** and **pre-fills the curve source** (external sensors are still selectable via the object picker)
- (ssbingo) **Every scheduler field is now self-explanatory** — full labels, a **suggested value** (placeholder) and a **help text** on each: minimum power (Q_min), temperature smoothing, hysteresis, max change per hour, the curve-vs-windows priority and the curve source
- (ssbingo) Handbook chapter 11 (DE + EN) updated for the sensor picker and the fine-tuning suggestions; PDFs regenerated

### 0.4.0 (2026-09-09)

- (ssbingo) **Phase 12 — water-temperature control model.** Reworked the temperature/weather scheduler around the pond-flow research (`doc/research/teichpumpe-durchfluss-temperatur-wetter.md`): the **water-temperature curve** now sets the base flow — with a **default Q10 curve** preset — and **weather rules only ever raise** it. New effect set: **Raise to power %**, **Boost to 100 %**, **Hold (frost)**, **SFC on/off**, and a generic **Set actuator** effect that writes any external state (aeration, waterfall, …). New per-pump limits: **minimum power (Q_min)**, temperature **smoothing** (EMA, hours), **hysteresis (K)** and a **max ramp (% per hour)**. If the temperature source is lost the pump **fails safe to 100 %**, and a warning fires when the curve regulates power while the pump's **native SFC** is on
- (ssbingo) The curve/rule **source is no longer defaulted to the pump's telemetry** — that value is the pump's *device* temperature, not the water. Pick a real water sensor via the new **object picker**
- (ssbingo) ⚠️ The weather-rule model changed: rules configured under 0.3.0 (effects *Power %/SFC/Off*) become inert — reconfigure them with the new effects

### 0.3.0 (2026-09-09)

- (ssbingo) **Phase 11 — temperature-/weather-dependent scheduler parameters.** Each pump's scheduler tab gains a **Conditions** section: a **temperature→power curve** (interpolation points; the source defaults to the pump's own water temperature) plus **threshold rules** — any state OID (the pump's temperature or an external weather adapter) compared to a threshold, applying a **power %**, **SFC on/off** or **Off**. A per-pump toggle decides whether conditions **override** the active time window or apply **only outside** the windows. The backend subscribes to the source states and re-evaluates the moment they change

### 0.2.2 (2026-09-09)

- (ssbingo) Set the minimum ioBroker **admin to 8.0.11** — the per-pump scheduler is a React 19 / MUI 9 (admin 8) component, so admin 8.0.11+ keeps it loading reliably
- (ssbingo) Maintenance: processed the open Dependabot updates — `@iobroker/gui-components` 10.2.3, `@iobroker/json-config` 9.1.2, `@mui/material` + `@mui/icons-material` 9.4.0, `@module-federation/vite` 1.21.x, `@iobroker/types-vis-2` 2.20.1, `@tsconfig/node22` 22.0.6 (admin and widget bundles rebuilt to match)
- (ssbingo) Fixed the CI type-check: `@tsconfig/node22` 22.0.6 pins `types` to `["node"]`, which dropped the mocha globals in the test files — restored via `types: ["node", "mocha"]` + a declared `@types/mocha`

### 0.2.1 (2026-08-14)

- (ssbingo) Maintenance: synced the auto-merged repository updates — Dependabot bumps (`@iobroker/json-config` 9.0.18, `@iobroker/gui-components` 10.1.0, `@module-federation/vite` 1.20.4) with the admin and widget bundles rebuilt to match, plus ioBroker template updates (`node:` import prefixes, `CHANGELOG_OLD.md`, Dependabot/CI tuning)

### 0.2.0 (2026-08-05)

- (ssbingo) **Requires ioBroker admin ≥ 8.0.0.** The admin scheduler component is migrated to the admin-8 UI stack — **React 19 + MUI 9** via `@iobroker/gui-components` and `@iobroker/json-config` 9 (replacing `@iobroker/adapter-react-v5`, which has no React 19 release). The vis-2 widgets stay on the vis-2 host stack (React 18 / MUI 6)
- (ssbingo) Minimum requirements raised: **js-controller ≥ 6.0.11, admin ≥ 8.0.0, Node.js ≥ 22**

### 0.1.0 (2026-07-26)

- (ssbingo) **Milestone release.** Consolidates the full feature set — cloud & local control with live telemetry, **SFC** (Seasonal Flow Control), two **vis-2 widgets**, and **per-pump time schedules** — into the first **0.1.x** milestone
- (ssbingo) Maintenance: the ioBroker adapter checker is clean (no errors, no suggestions) — Dependabot now uses randomised cron schedules and the deploy action is pinned to its major version (`@v1`)

### 0.0.9 (2026-07-26)

- (ssbingo) **Phase 9 — per-pump time schedules.** The adapter settings gain a **Schedules** section (bottom of the Connection tab) that lists the detected pumps; enable a pump and it gets its own **“Scheduler – &lt;pump&gt;” tab** where you set a **base power** (applied outside all windows) and a sorted list of **time windows**, each setting a power % or switching **SFC** on/off. The adapter runs the schedule and applies the target at the window boundaries. **Overlapping windows are rejected** — the editor validates live and the backend re-checks before applying

### 0.0.8 (2026-07-25)

- (ssbingo) Control widget: a dropdown next to the power slider lets you set the power in precise **5 % steps** (0–100 %). It writes the same setpoint as the quick buttons and is disabled while SFC controls the flow; it can be hidden via the new “Show 5 % dropdown” option

### 0.0.7 (2026-07-24)

- (ssbingo) Widgets: during Seasonal Flow Control (SFC) the pump visualization now reflects the **real** pump speed — the ice crystal spins by the actual (SFC-driven) speed like the impeller, the “Power” value shows the real output, and the control widget’s power slider shows the actual output (disabled while SFC controls the flow). Uses a live rpm-per-percent calibration learned during normal operation
- (ssbingo) Dependencies: processed the pending Dependabot updates — `@iobroker/adapter-react-v5` → 8.3.2 and `@module-federation/vite` → 1.19.1 (a leaner widget bundle), plus CI action bumps. Major bumps that would break vis-2 host compatibility (React 19, MUI 9, Vite 8, plugin-react 6, TypeScript 7) are pinned via Dependabot ignore rules, because the vis-2 host shares React 18 + MUI 6 as module-federation singletons

### 0.0.6 (2026-07-24)

- (ssbingo) Maintenance: updated the CI deploy action (`testing-action-deploy` 1.5.1 → 1.5.2) and tidied up the repository (removed stale/merged and open Dependabot branches). No functional changes to the adapter

### 0.0.5 (2026-07-24)

- (ssbingo) Phase 6 — the adapter now ships two **vis-2 widgets**. *Pump visualization* shows an impeller that spins with the pump speed (in 10 % steps), a rotating ice crystal while frost-protection (SFC) mode is active, and a red cross with a still impeller when the pump is off, plus live power (W), motor speed (rpm) and the “Power” setpoint (%). *Pump control* offers on/off, a speed slider and quick presets. Both widgets have an instance and pump selector and derive their state IDs themselves; vis-2 is restarted automatically on install so the widgets appear immediately
- (ssbingo) Seasonal Flow Control (SFC) can now be switched from the adapter: the SFC on/off command (ONet `0x5000`) was reverse-engineered, exposed as a new writable `control.sfc` state, and wired into the control widget's SFC button; the pump visualization reflects the active SFC state. SFC is OASE's temperature-dependent seasonal throughput reduction (up to −50 %), not frost protection
- (ssbingo) Hardening: all transport timers are now adapter-managed (auto-cancelled on unload — compact-mode safe), and a batch of ioBroker adapter-checker findings were resolved (CI/deploy on Node 24, dependabot cooldown + auto-merge migration, `io-package.json` metadata)

### 0.0.4 (2026-07-24)

- (ssbingo) Phase 7 — cloud and local are now mutually exclusive: the `both` connection mode was removed (a saved `both` is migrated to `cloud`). When you switch between `cloud` and `local`, the device objects are rebuilt cleanly so the two never mix, and the new `info.connectionType` state shows which data source is active

### 0.0.3 (2026-07-23)

- (ssbingo) Phase 3 — local (LAN) transport is complete: connection mode `local` runs the whole adapter over the local network without the cloud. The adapter wakes the controller over UDP, the controller connects back over TLS (legacy cipher, self-signed certificate), authenticates with the device password, then reads the gateway and pumps, polls live telemetry (power, speed, temperature, voltage) and controls on/off and speed — all over the LAN. The poll and command path is transport-agnostic (local preferred, cloud fallback), and on/off is derived from live telemetry. Note: the speed setpoint value is not read back over the local channel yet
- (ssbingo) Documentation: multilingual README docs in 11 languages (under `doc/<lang>/`), beginner handbooks in English and German with a step-by-step mitmproxy guide (available as PDF), a Documentation section and CHANGELOG_OLD.md

### 0.0.2 (2026-07-23)

- (ssbingo) Phase 1 – cloud read-only: connects to the OASE Garden Controller Cloud (Azure AD B2C refresh-token auth), discovers the gateway and pumps, and polls live speed and status
- (ssbingo) Phase 2 – cloud control: pump on/off and speed (0–100 %) are writable and sent through the cloud SendONetPacket tunnel, verified byte-for-byte against the app
- (ssbingo) Phase 4 – live telemetry: power (W), motor speed (rpm), temperature (°C) and mains voltage (V) are read live each poll; still-unmapped sensors are exposed as raw values for classification
- (ssbingo) Pumps are named after their controller name; new stylized adapter icon (own illustration, not the product photo)
- (ssbingo) Extensive, component-tagged logging so any failure can be pinpointed from the logs, with secrets never logged

[Older changelogs can be found there](https://github.com/ssbingo/ioBroker.pondpump/blob/main/CHANGELOG_OLD.md)

## License
MIT License

Copyright (c) 2026 ssbingo <s.sternitzke@online.de>

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