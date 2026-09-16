---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.lovelace/docs/en/theme_migration.md
title: Перенос тем оформления (обновление интерфейса 2026 года)
hash: epwv9g2Vt+yeHfL7xiXktDjalmXvKTk8SASaC0mwUZc=
---
# Перенос тем оформления (обновление интерфейса 2026 года)

Обновление интерфейса привело к переработке механизма тем оформления Home Assistant. **Существующие темы продолжают работать** — старые переменные по-прежнему поддерживаются. Но некоторые изменения могут вызвать видимые проблемы. Самая распространенная из них: **белый фон полей ввода** .

## Содержание

- [Проблема: белые поля ввода.](#the-problem-white-input-fields)
- [Быстрое решение](#quick-fix)
- [Рекомендуемый шаблон темы (светлая + темная)](#recommended-theme-template-light--dark)
- [Что изменилось?](#what-changed)
- [Часто задаваемые вопросы](#faq)

---

## Проблема: белые поля ввода.

Некоторые элементы ввода (текстовые поля, выпадающие списки, ползунки, переключатели, флажки, поля ввода времени и т. д.) теперь используют новые компоненты. Их фон **больше не** заимствован из старых компонентов.`--mdc-text-field-fill-color` /`--input-fill-color` переменные, но из **новой переменной** :

```
--ha-color-form-background
```

Значения по умолчанию следующие:

| Режим  | По умолчанию            | Результат                |
| ------ | ----------------------- | ------------------------ |
| Свет   | `--ha-color-neutral-95` | ≈`#f3f3f3` (почти белый) |
| Темный | `--ha-color-neutral-20` | ≈`#363636` (темный)      |

**Важно:** значение «темный» применяется только **при активном темном режиме** .`--ha-color-form-background` **не** следует`--card-background-color` . Поэтому, если ваша тема устанавливает только`card-background-color` и старик`--mdc-text-field-*` переменные (как классическая тема _синтвейва_ ),`--ha-color-form-background` Сохраняет светлый цвет по умолчанию → **белые поля** , даже в тёмной теме оформления.

---

## Быстрое решение

Установить новый`--ha-color-form-background` переменная (плюс варианты при наведении курсора и отключении):

```yaml
my_theme:
  ha-color-form-background: 'var(--card-background-color)'          # field background
  ha-color-form-background-hover: 'var(--light-primary-color)'      # on hover
  ha-color-form-background-disabled: 'var(--primary-background-color)'  # disabled
```

Вместо этого можно также использовать фиксированные цвета.`var(...)` например`ha-color-form-background: '#34294f'` .

### См. также: белые гофрированные стеллажи / расширительные панели

Аналогичный новый токен влияет на развернутые **аккордеоны/панели расширения** (например, в панели настроек Browser Mod). В качестве фона заголовка используется`--ha-color-fill-neutral-normal-active` , который также по умолчанию имеет светлый оттенок. Если вы видите белые заголовки аккордеона, добавьте:

```yaml
my_theme:
  ha-color-fill-neutral-normal-active: 'var(--card-background-color)'
  ha-color-fill-neutral-normal-hover: 'var(--light-primary-color)'
```

В целом, правило для всех этих случаев одинаково: темы, созданные только для устаревших версий, не заменяют новые.`--ha-color-*` токены, если не активирован темный режим (см. ниже).

> Для темы _в стиле синтвейв_ достаточно добавить ровно эти три строки — и всё готово.`card-background-color` просто нет`ha-color-form-background` Текущая версия темы, используемая в исходном коде, устанавливает эту переменную автоматически.

---

## Рекомендуемый шаблон темы (светлая + темная)

Чтобы и светлые, и темные участки выглядели правильно, используйте`modes` блок. Затем Home Assistant автоматически выбирает соответствующий набор:

```yaml
my_theme:
  # shared
  primary-color: "#18bcf2"
  accent-color: "#f36d00"
  modes:
    light:
      primary-background-color: "#fafafa"
      card-background-color: "#ffffff"
      secondary-background-color: "#e5e5e5"
      primary-text-color: "#212121"
      secondary-text-color: "#727272"
    dark:
      primary-background-color: "#111111"
      card-background-color: "#1c1c1c"
      secondary-background-color: "#282828"
      primary-text-color: "#e1e1e1"
      secondary-text-color: "#9b9b9b"
      ha-color-form-background: "#1c1c1c"
      ha-color-form-background-hover: "#282828"
      ha-color-form-background-disabled: "#111111"
```

Параметр`--ha-color-form-background` Параметр «для каждого режима» точно определяет, как правильно раскрасить новые поля ввода. В светлом режиме он обычно не нужен (светлый режим по умолчанию вполне подходит); в темном режиме (или для темных тем без него)`modes` ) это необходимо.

---

## Что изменилось?

### 1. Новая многоуровневая система цветовых жетонов.

Теперь существует три уровня цветовых переменных:

| Слой                         | Примеры                                                                                     | Цель                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| **Основной**                 | `--ha-color-primary-50` ,`--ha-color-neutral-90` …                                          | Необработанная палитра. Не предназначена для непосредственного использования. |
| **Семантический**            | `--ha-color-text-primary` ,`--ha-color-fill-neutral-normal-resting` ,`--ha-color-surface-*` | Цвета, соответствующие назначению, выведены из базовых цветов.                |
| **Устаревшая (совместимая)** | `--card-background-color` ,`--primary-text-color` ,`--primary-color` …                      | Всё ещё существует и всё ещё работает.                                        |

Темы, которые задают старые переменные, продолжают работать. Но новые компоненты частично считывают семантическую информацию или`--wa-*` переменные, которые не переопределяются в теме оформления, предназначенной только для устаревших систем.

### 2.`primary-color` теперь автоматически генерирует палитру

Когда закладывается тема`primary-color` Теперь фронтенд генерирует полный текст.`--ha-color-primary-*` палитра из нее. Так что одна`primary-color` Это влияет на новые переменные. **Фоновые изображения/поверхности НЕ создаются автоматически** — задайте их самостоятельно.

### 3. Темный режим

Темный режим применяет темные значения новых цветовых слоев **только тогда, когда темный режим действительно активен** . Тема с «темным» оттенком применяется в светлом режиме (без`modes` Начинается с **легких** цветов по умолчанию → белые поля. Поэтому используйте`modes` блокировать.

### 4. Удалены внутренние файлы.

Внутри системы старые файлы стилей были удалены и заменены новой системой тем оформления. Темы, использующие только документированные переменные Home Assistant, остаются без изменений. Темы, копирующие внутренние имена переменных, могут перестать работать.

---

## Часто задаваемые вопросы

**Нужно ли мне полностью переписывать свою тему?** Нет. В большинстве случаев добавление`ha-color-form-background` (плюс)`-hover` и`-disabled` ) этого достаточно.

**Моя тема оформления была только темной, а теперь выглядит частично светлой (белые поля).** Это наиболее распространенный случай. Установить`ha-color-form-background` к темному цвету (например)`var(--card-background-color)` При желании переместите значения в`modes: dark:` Заблокируйте и включите темный режим, чтобы значения по умолчанию для новых переменных применялись автоматически.

**Где настроить тему оформления?** Как и раньше, в настройках адаптера в разделе "Темы" (YAML). Адаптер передает эти темы на фронтенд без изменений.

**Мне нужен новый?`--ha-color-*` переменные?** Для большинства тем добавлени&#x435;**`ha-color-form-background`** Этого достаточно — это единственная новая переменная, которая затрагивает почти всех (белые поля ввода). Другая`--ha-color-*` Переменные необходимы только для тонкой настройки.