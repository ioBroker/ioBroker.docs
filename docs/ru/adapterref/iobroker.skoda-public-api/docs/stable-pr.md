---
chapters: {"pages":{"en/adapterref/iobroker.skoda-public-api/README.md":{"title":{"en":"ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/README.md"},"en/adapterref/iobroker.skoda-public-api/HANDOFF.md":{"title":{"en":"Handoff — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/HANDOFF.md"},"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md":{"title":{"en":"Compact Mode"},"content":"en/adapterref/iobroker.skoda-public-api/docs/compact-mode.md"},"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md":{"title":{"en":"Entwurfsentscheidungen — ioBroker.skoda-public-api"},"content":"en/adapterref/iobroker.skoda-public-api/docs/design-decisions.md"},"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md":{"title":{"en":"Technische Arbeitsgrundlage und offene Umsetzung"},"content":"en/adapterref/iobroker.skoda-public-api/docs/implementation-plan.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md":{"title":{"en":"Erste Stable-Aufnahme abgeschlossen"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-release.md"},"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md":{"title":{"en":"Stable application for 0.1.11 — merged"},"content":"en/adapterref/iobroker.skoda-public-api/docs/stable-pr.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.skoda-public-api/docs/stable-pr.md
title: Стабильная версия приложения для 0.1.11 - объединена.
hash: UyLczrqrkae118uKOd4APldr+VyISnd7Ft7Yy+0aG7Q=
---
# Стабильная версия приложения для 0.1.11 — объединена.

[Запрос на слияние в репозитории #6832](https://github.com/ioBroker/ioBroker.repositories/pull/6832) был объединен 11 октября 2026 года. Приведенный ниже текст заявки документирует завершенную отправку.

Добавлять `skoda-public-api` Версия **0.1.11** добавлена в стабильный репозиторий.

Адаптер считывает данные и управляет автомобилями Škoda через официальный API MyŠkoda Public. Версия 0.1.11 опубликована на npm 20 сентября 2026 года и уже доступна в `latest`.

Публичные тесты задокументированы в [теме на форуме](https://forum.iobroker.net/topic/85433/test-adapter-skoda-public-api-v0.1.x) . Отчеты включают успешные тесты состояния автомобиля, положения при парковке, расхода топлива/AdBlue и системы старт/стоп дополнительного отопления на Octavia 2.0 TDI, а также положительные отзывы от владельцев Superb Hybrid 2025 года, Superb iV 2022 года и Elroq 2027 модельного года. В отчете по Elroq также описывается успешное использование данных о положении при парковке на панели управления ioBroker. В отчете по 2025 Hybrid тест системы климат-контроля еще не завершен. Режимы зарядки и управление профилем зарядки также были протестированы на Enyaq, принадлежащем обслуживающему автомобилю.

В репозитории есть автоматизированные модульные тесты, тесты интеграции пакетов и адаптеров. [CI-тестирование релиза v0.1.11](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/35531311953) прошло успешно для всех девяти комбинаций платформы/Node и опубликовало пакет. [Основной CI-прогон после подготовительного PR #7](https://github.com/tmarthy/ioBroker.skoda-public-api/actions/runs/38143355427) прошел успешно на Ubuntu, Windows и macOS с Node 22, 24 и 26. Этот прогон включает обновления API-спецификации и компактных тестов после версии 0.1.11; запрошенный стабильный пакет остается неизмененным, опубликованной версией 0.1.11. Загруженный npm-пакет содержит `build/main.js`, конфигурация административной панели и все поддерживаемые переводы административной панели. `bluefox` и `tmarthy` являются сопровождающими npm.

VIN-коды и сгенерированный приложением ключ API настраиваются вручную, поскольку публичный API не имеет конечной точки для обнаружения транспортных средств.

**Контрольный список**

- [x] Все требования для стабильного включения выполнены, включая окончательную проверку CI и repository-checker после обновления зависимостей в процессе разработки.
- [x] Ссылки на обсуждение в теме публичного тестирования и отзывы приведены выше.

Это изменение добавляет только `skoda-public-api` вход в `sources-dist-stable.json` закреплено на версии `0.1.11`.