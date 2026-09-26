---
chapters: {"pages":{"en/adapterref/iobroker.autodoc/README.md":{"title":{"en":"ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/README.md"},"en/adapterref/iobroker.autodoc/TODO.md":{"title":{"en":"AutoDoc Adapter — TODO-Liste"},"content":"en/adapterref/iobroker.autodoc/TODO.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.md":{"title":{"en":"AutoDoc — user guide (first steps)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md":{"title":{"en":"AutoDoc — Konfiguration der Instanz (Wiki)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/README.de.md"},"en/adapterref/iobroker.autodoc/PLAN.md":{"title":{"en":"AutoDoc Adapter — Projektplan"},"content":"en/adapterref/iobroker.autodoc/PLAN.md"},"en/adapterref/iobroker.autodoc/CONTRIBUTING.md":{"title":{"en":"Contributing to ioBroker.autodoc"},"content":"en/adapterref/iobroker.autodoc/CONTRIBUTING.md"},"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md":{"title":{"en":"ioBroker-Adapterentwicklung — Referenzen (adapter-neutral)"},"content":"en/adapterref/iobroker.autodoc/docs/iobroker-adapter-references.md"},"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md":{"title":{"en":"Echte Screenshots für den User-Guide (optional)"},"content":"en/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md"}}}
translatedFrom: en
translatedWarning: Если вы хотите отредактировать этот документ, удалите поле «translationFrom», в противном случае этот документ будет снова автоматически переведен
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/ru/adapterref/iobroker.autodoc/docs/user-guide/assets/SCREENSHOTS.md
title: Добавьте скриншоты для руководства пользователя (необязательно)
hash: c5cBZdUkCtbjf/02E2KJgP3C1873G2xqZUlMejH12OA=
---
# Добавьте скриншоты для руководства пользователя (необязательно)
## Хотите новых успехов? (Пфлеге)
**Никогда** при автоматическом выпуске обновлений в формате PNG появляются следующие сообщения: Вкладки и **значки** Снимки экрана сохраняются, часто требуется **ангепасте Bildunterschrift** (версия AutoDoc из ** `package.json` **, Datum).

**Neu aufnehmen oder gezielt ersetzen**, если:

- Если вы нажмете **Имя вкладки**, вы можете больше **Заблокировать** или **Значения по умолчанию** в администраторе, а также другие варианты отображения **недействительных**;
- **neue** Einstellungsbereiche dokumentiert werden, die auf den alten Shots **nicht vorkommen**;
- Текст auf den Bildern (Überschriften, Hinweise) **hart veraltet** wirkt.
- **Kapitel-JSON / Feld-Hilfe (`?`):** Ergänzungen zu den Tooltips (z.B. Hinweis auf **Adapter-Log** bei unbekannten ord doppelten Ids) erfordern **kein** neues PNG, solange der sichtbare Admin-Bereich gleibt - nur bei ifreführendem **Текст скриншота** nachziehen. Log-Warnungen selbst müssen **nicht** abgelichtet werden.

**Клык:** Vollständige Scroll-Serien wie bisher sind **необязательно**. Für kleine Änderungen reichen oft **Ausschnitte** des betroffenen Bereichs - последовательное руководство по сбору урожая (nicht jedes Bild Crop, jedes Volltab). **Nachziehen bei Bedarf** durch сопровождающий:in ist ausdrücklich ok.

---

Die Dateien ** `fig-*.svg` ** в порядке ** `assets/` ** с **Schemas** («Drahtgitter»): sie sind **kein** Ersatz für echtes Admin‑UI‑Pixel‑Layout, загружает не только персональные данные и работает на GitHub в режиме ожидания.

Если вы хотите сделать **скриншоты**, вы можете использовать **нейтральный Platzhaltern** или **Демо-установку**:

## Записи
| Датанаме (Empfehlung) | Курц бесшрайббарер Инхальт |
| ----------------------- | ---------------------------- |
| `screen-grundeinstellungen-admin.png` | Вкладка **Grundeinstellungen**, nur nicht-kritische Felder sichtbar (Projektname z.B. «Demo …»). |
| `screen-erweitert-basisurl-admin.png` … `screen-erweitert-basisurl-admin-2.png` | Вкладка **Erweitert**, **zwei** Teile (Прокрутка): Grenzen & **Speicher-/States-Hinweis** (Платцхалтер) и Basis-URL; **Setup-Score**, Dateisystem-Export, **PDF**. Базовый URL-адрес/Pfade для **erfunden** или geschwärzt. |
| `screen-html-export-pdf-hint-admin.png` … `screen-html-export-pdf-hint-admin-3.png` | Вкладка **HTML-Экспорт и Zusatzkapitel**, **drei** Элемент (прокрутка): Darstellung/PDF-Hinweis; Bereich «Sichtbare Kapitel» mit **bis zu zwei** anklickbaren GitHub‑Zeilen (JSON‑Kochbuch EN · Wiki DE Schritt6 für Ausblenden/Reihenfolge) sowie Admin-/User‑JSON‑Blöcken; Onboarding-/eigene Kapitel (JSON), Schrift-/CSS‑Hinweis. Будьте уверены в том, что снимки не будут отображаться в документации: Bilduntertitel/`package.json` reicht часто - neu aufnehmen, wenn das UI unreführt. Keine sensiblen Daten в Logo/JSON‑Demos. |
| `screen-benachrichtigungen-admin.png` | Вкладка **Benachrichtigungen** - Адаптер-Instanz, Empfänger, Vorlage: **keine** echten Tokens/Chat-IDs в öffentlichen Commits (Platzhalter или leere Felder). |
| `screen-ki-dokumentation-admin.png` … `screen-ki-dokumentation-admin-2.png` | Вкладка **KI-Dokumentation**, **zwei** Элемент (прокрутка): Anbieter/Modell/URL/Timeout; Kontexthinweise, Temperatur, выберите «Skripte erklären». **Keine** API‑Keys, Abrechnungsdaten или Productiven Cloud‑Felder Zeigen - liber **Ollama‑localhost‑Demo** или Schwärzen. |
| `screen-ki-dokumentation-admin.png` … `screen-ki-dokumentation-admin-2.png` | Вкладка **KI-Dokumentation**, **zwei** Элемент (прокрутка): Anbieter/Modell/URL/Timeout; Kontexthinweise, Temperatur, выберите «Skripte erklären». **Keine** API‑Keys, Abrechnungsdaten или Productiven Cloud‑Felder Zeigen - liber **Ollama‑localhost‑Demo** или Schwärzen. |

**Eingebunden im Repo:** siehe Tabellenzeilen oben - **alle sechs** Зарегистрируйте карту со скриншотами в ** `README.md` ** и ** `README.de.md` **.

- **PNG** или **WebP**; для **лесного описания** в администраторе (например, тема dunkles) размером **≥ 1280 пикселей** Размер **oder** vor der Aufnahme **Браузер-Масштаб 125-150%** и в этом случае он не будет отображаться. Die frühere **920-1280px**-Spanne war knapp - bei Bedarf **bis ~1680px** gehen, solange die Repo-Größe noch vertretbar ist (PNG komprimieren statt harte Qualitätsverluste).
- **Dateigröße:** **< 350 КБ** требуется, а также **Lesbarkeit** шляпа Vorrang; lieber etwas größere Datei als unleserlich kleine Schrift.
- **Bildunterschrift (Markdown):** Unter jedem eingebundenen **PNG** в ** `README.md` ** / ** `README.de.md` ** Dieselbe Kurzform verwenden und bei **neuen Aufnahmen** anpassen:
  - **EN:** `*Capture: AutoDoc **0.9.43**, ioBroker Admin **≥ 7.6.20** (май **2026**).*` - `0.9.43` и ** `package.json` `version` **, Monat/Jahr и ReShoot, Admin-Version и ** `io-package.json` → `common.globalDependities` ** (Администратор).
  - **DE:** `*Aufnahme: AutoDoc **0.9.43**, администратор ioBroker **≥ 7.6.20** (Стенд **2026-05**).*`

## Lesbarkeit (GitHub, eingebettete Vorschau)
- Eingebettete Markdown-Bilder werden auf der Readme-Seite часто **skaliert**; Kleingedrucktes im Screenshot bleibt **im Vollbild** (Rechtsklick → Bild в новой вкладке) Gut lesbar.
- **Новые возможности:** используйте Fenster, **Zoom im Admin**, или **Höhe**, чтобы получить доступ к Kleintext pro Bild (mehr Teile bei langen Tabs).

## Защита данных
- **Keine** echt-WLANs, **keine** echten Routen-IPs, QR-Ziele nur mit **erfundener** Basis-URL или geschwärzte Bereiche.
- **Benachrichtigungen:** Instanzkennung, Empfänger, Vorlage mit **Platzhaltern** или **Tab leer** останавливается, когда Aufnahme öffentlich wird.
- **KI:** **Keine** Cloud-API-Schlüssel или продуктивный поставщик-контент доступен; Уведомление о тексте и согласие на использование сценария с **вредным демо-текстом**.

## Длинные вкладки (прокрутка)
Viele Tabs sind höher als ein Bildschirm - **ein Screenshot pro Aussage** reicht (z.B. nur derрелевантне Bereich). Необязательно **mehrere Dateien** pro Tab (`…-admin.png`, `…-admin-2.png`, …) и im Markdown nacheinander einbinden (im Repo z.B. **Meine Dokumentation** vier Teile, **Erweitert** zwei, **HTML-Export & Zusatzkapitel** drei, **KI-Dokumentation** zwei). Технический нижний колонтитул мгновенного действия (RAM, Node…) в руководстве часто **wegschneiden**.

## SVG-схемы (`fig-*.svg`)
Die **von Hand** gepflegten Diagramme sind **gültiges XML**: im Text ** `&` ** nur als ** `&amp;` **; keine **Steuerzeichen** в Word/Clipboard - только в GitHub z. B. «Неверный источник изображения» в eingebetteten Vorschau.

## Markdown einbinden
В ** `README.md` ** или ** `README.de.md` ** z. Б.:

```md
![Grundeinstellungen (Demo)](../../../../../../en/adapterref/iobroker.autodoc/docs/user-guide/assets/assets/screen-grundeinstellungen-admin.png)
```

Лучшее изображение **SVG-версии** может быть использовано или добавлено несколько скриншотов.