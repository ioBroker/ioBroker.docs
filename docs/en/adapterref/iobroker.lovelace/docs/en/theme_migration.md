---
chapters: {"pages":{"en/adapterref/iobroker.lovelace/README.md":{"title":{"en":"ioBroker.lovelace"},"content":"en/adapterref/iobroker.lovelace/README.md"},"en/adapterref/iobroker.lovelace/docs/en/README.md":{"title":{"en":"ioBroker.lovelace — Documentation"},"content":"en/adapterref/iobroker.lovelace/docs/en/README.md"},"en/adapterref/iobroker.lovelace/docs/en/entities.md":{"title":{"en":"Entities"},"content":"en/adapterref/iobroker.lovelace/docs/en/entities.md"},"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md":{"title":{"en":"Custom cards, themes & UI tips"},"content":"en/adapterref/iobroker.lovelace/docs/en/cards_and_ui.md"},"en/adapterref/iobroker.lovelace/docs/en/features.md":{"title":{"en":"Features"},"content":"en/adapterref/iobroker.lovelace/docs/en/features.md"},"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md":{"title":{"en":"Migrating themes (2026 frontend update)"},"content":"en/adapterref/iobroker.lovelace/docs/en/theme_migration.md"}}}
---
# Migrating themes (2026 frontend update)

The frontend update brought a rewritten Home Assistant theme engine.
**Existing themes keep working** – the old variables are still supported. But a
few changes can cause visible problems. The most common one: **white input-field
backgrounds**.

## Contents

* [The problem: white input fields](#the-problem-white-input-fields)
* [Quick fix](#quick-fix)
* [Recommended theme template (light + dark)](#recommended-theme-template-light--dark)
* [What changed?](#what-changed)
* [FAQ](#faq)

---

## The problem: white input fields

Several input elements (text fields, selects, sliders, switches, checkboxes, time
inputs …) now use new components. They **no longer** take their background from
the old `--mdc-text-field-fill-color` / `--input-fill-color` variables, but from a
**new variable**:

```
--ha-color-form-background
```

Its default values are:

| Mode | Default | Result |
|------|---------|--------|
| Light | `--ha-color-neutral-95` | ≈ `#f3f3f3` (near-white) |
| Dark | `--ha-color-neutral-20` | ≈ `#363636` (dark) |

**Important:** the dark value only applies **when dark mode is active**.
`--ha-color-form-background` does **not** follow `--card-background-color`. So if
your theme only sets `card-background-color` and the old `--mdc-text-field-*`
variables (like the classic *synthwave* theme), `--ha-color-form-background` stays
at the light default → **white fields**, even in an otherwise dark theme.

---

## Quick fix

Set the new `--ha-color-form-background` variable (plus the hover and disabled
variants):

```yaml
my_theme:
  ha-color-form-background: 'var(--card-background-color)'          # field background
  ha-color-form-background-hover: 'var(--light-primary-color)'      # on hover
  ha-color-form-background-disabled: 'var(--primary-background-color)'  # disabled
```

You can also use fixed colors instead of `var(...)`, e.g.
`ha-color-form-background: '#34294f'`.

### Related: white accordions / expansion panels

The same kind of new token affects expanded **accordions / expansion panels**
(e.g. in the Browser Mod settings panel). Their header background uses
`--ha-color-fill-neutral-normal-active`, which also defaults light. If you see
white accordion headers, add:

```yaml
my_theme:
  ha-color-fill-neutral-normal-active: 'var(--card-background-color)'
  ha-color-fill-neutral-normal-hover: 'var(--light-primary-color)'
```

In general, the rule is the same for all of these: legacy-only themes don't
override the new `--ha-color-*` tokens unless dark mode is active (see below).

> For the *synthwave* theme, adding exactly these three lines is enough – it
> already sets `card-background-color`, just not `ha-color-form-background`. The
> current upstream version of the theme sets this variable itself.

---

## Recommended theme template (light + dark)

So that light and dark both look right, use the `modes` block. Home Assistant
then picks the matching set automatically:

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

Setting `--ha-color-form-background` per mode is exactly what colors the new input
fields correctly. In light mode you usually don't need it (the light default is
fine); in dark mode (or for dark themes without `modes`) it is required.

---

## What changed?

### 1. New layered color-token system

There are now three layers of color variables:

| Layer | Examples | Purpose |
|-------|----------|---------|
| **Core** | `--ha-color-primary-50`, `--ha-color-neutral-90` … | Raw palette. Not meant to be used directly. |
| **Semantic** | `--ha-color-text-primary`, `--ha-color-fill-neutral-normal-resting`, `--ha-color-surface-*` | Purpose-based colors, derived from core. |
| **Legacy (compat)** | `--card-background-color`, `--primary-text-color`, `--primary-color` … | Still present and still work. |

Themes that set the old variables keep working. But new components partly read
the semantic or `--wa-*` variables – which a legacy-only theme does not override.

### 2. `primary-color` now auto-generates a palette

When a theme sets `primary-color`, the frontend now generates the full
`--ha-color-primary-*` palette from it. So a single `primary-color` cascades into
the new variables. **Backgrounds/surfaces are NOT auto-derived** – set them
yourself.

### 3. Dark mode

Dark mode applies the dark values of the new color layers **only when dark mode
is actually active**. A "dark-looking" theme applied in light mode (without
`modes`) starts from the **light** default colors → white fields. So use the
`modes` block.

### 4. Removed internal files

Internally, old style files were removed and replaced by a new theme system.
Themes that only use documented HA variables are unaffected. Themes that copied
internal variable names may break.

---

## FAQ

**Do I have to rewrite my theme completely?**
No. In most cases adding `ha-color-form-background` (plus `-hover` and
`-disabled`) is enough.

**My theme was dark-only and now looks partly light (white fields).**
That's the most common case. Set `ha-color-form-background` to a dark color (e.g.
`var(--card-background-color)`). Optionally move the values into a `modes: dark:`
block and enable dark mode, so the dark defaults of the new variables apply
automatically.

**Where do I configure the theme?**
As before, in the adapter settings under "Themes" (YAML). The adapter passes these
themes unchanged to the frontend.

**Do I need the new `--ha-color-*` variables?**
For most themes, adding **`ha-color-form-background`** is enough – it's the one new
variable that affects almost everyone (white input fields). The other
`--ha-color-*` variables are only needed for fine-tuning.