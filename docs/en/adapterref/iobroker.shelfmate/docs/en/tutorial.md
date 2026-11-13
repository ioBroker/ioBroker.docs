---
chapters: {"pages":{"en/adapterref/iobroker.shelfmate/README.md":{"title":{"en":"ioBroker.shelfmate"},"content":"en/adapterref/iobroker.shelfmate/README.md"},"en/adapterref/iobroker.shelfmate/README.de.md":{"title":{"en":"ioBroker.shelfmate"},"content":"en/adapterref/iobroker.shelfmate/README.de.md"},"en/adapterref/iobroker.shelfmate/docs/en/tutorial.md":{"title":{"en":"ShelfMate – Guide"},"content":"en/adapterref/iobroker.shelfmate/docs/en/tutorial.md"}}}
---
# ShelfMate – Guide

With ShelfMate you manage your pantry directly in ioBroker. This guide shows you how to create products, manage stock, scan barcodes and use the different functions.

You find all settings, requirements and data points in the [README](/#/adapters/shelfmate).

Deutsche Version: [Anleitung](https://github.com/backfisch88/ioBroker.shelfmate/blob/main/docs/de/tutorial.md)

---

## Contents

1. [The app at a glance](#the-app-at-a-glance)
2. [Editing products](#editing-products)
3. [Automatic shelf life and the sparkle symbol](#automatic-shelf-life-and-the-sparkle-symbol)
4. [Refreshing product data](#refreshing-product-data)
5. [Stock in, take out and move](#stock-in-take-out-and-move)
6. [Creating storage locations](#creating-storage-locations)
7. [Products without a barcode](#products-without-a-barcode)
8. [Minimum stock and shopping list](#minimum-stock-and-shopping-list)
9. [Best-before date](#best-before-date)
10. [Shopping list modes](#shopping-list-modes)
11. [Checking ingredients](#checking-ingredients)
12. [Stocking a whole shelf](#stocking-a-whole-shelf)
13. [Doing a stocktaking](#doing-a-stocktaking)
14. [Scanner mode without the app](#scanner-mode-without-the-app)
15. [Suggestions](#suggestions)
16. [Notifications](#notifications)
17. [Export and backup](#export-and-backup)
18. [Offline mode](#offline-mode)
19. [HTTPS and certificates](#https-and-certificates)
20. [Printing labels](#printing-labels)
21. [Appearance](#appearance)

---

## The app at a glance

### Overview

On the start page you see your products and their stock.

With the search you find products by name, brand or tag. Matching suggestions appear while you type. Tap × to reset the search.

There are also several filters:

- Area: shows only products from one storage area.
- Location: filters by a single shelf, cupboard or compartment.
- Category: shows products of one category.
- Status: filters by opened, expiring soon, expired, to-buy or empty products.
- Tags: frequently used search terms can be picked directly.

Tapping an active status or tag again removes that filter.

Product groups are shown together. Tap the small triangle to unfold the products inside.

The list is sorted: products that expire soon or have expired come first, then opened products, then all others (products to buy first). Empty products come last.

When you come back from a product page, you land at your previous position in the overview.

<p align="center"><img src="../images/filterOpen.jpg" width="250"><br><sub>The status filters and tags above the list. The red frame shows the active filter "Opened".</sub></p>

The scan button sits above the bar on every tab and folds in while you scroll. If you do not need it, switch it off under Settings → Controls → Scan-Knopf. The setting applies to this device only.

### Product page

On the product page you find the total stock, the storage locations and, if turned on, the shelf life data.

Expired and soon-to-expire products are highlighted in colour.

If standard values exist, ShelfMate shows for example:

`Standard shelf life 365 days · after opening 90 days`

Below that, the actions are always in the same order:

1. Stock in / take out
2. Move / open / undo open, if available
3. To shopping list – with a check mark if the product is already on it
4. Print labels – which buttons appear is set in the instance settings in the ioBroker admin under "Labels"
5. Edit / delete

---

<p align="center"><img src="../images/productButtons.jpg" width="250"><br><sub>The product page with stock, locations and buttons. "Stock in" and "Take out" (red) book the stock.</sub></p>

## Editing products

Tap Edit to open the product settings.

When you create a product by hand, ShelfMate suggests matching products from a ready-made list while you type the name. If you enter `Sch`, for example, chocolate (Schokolade) appears among others. Tapping a suggestion takes over the name and sets the category if you have not chosen one yet. There are no suggestions for products from Open Food Facts, because the name comes from there.

The form is split into five sections that you can unfold. Closed sections show a short summary, for example `Packung · 400g · min 1`.

| Section | Settings |
| --- | --- |
| Basics | Product name, brand, image and category |
| Stock | Piece, weight or volume, unit, package size and minimum stock |
| Group & tags | Product group and extra search terms |
| Shelf life | Best-before date, standard shelf life and shelf life after opening |
| More | Barcode, own EAN, Nutri-Score, image link and Open Food Facts |

Basics is open by default, and for new products the Stock section as well.

<p align="center"><img src="../images/editProduct.jpg" width="250"><br><sub>The editor has sections that can be folded, for example "Stock" (open) and "Group & tags" (red, closed).</sub></p>

### Product groups

Several products can be combined into one group.

Example: wheat flour from REWE, Edeka and Kaufland belongs to the shared group Flour.

ShelfMate adds up the stock of these products and takes it into account for the minimum stock.

If a product has no standard shelf life of its own, the value of its group can be used.

#### Finding and managing groups

- **New product:** If you create a product that fits an existing group, it joins that group automatically. ShelfMate compares the first word of the name, without the brand. "Fuchs Zimt" and "Zimt gemahlen" both fit the group Zimt. If several groups fit, ShelfMate does not choose one. The group is shown in the message after saving.
- **Suggestions:** Under Tasks → Groups you find suggestions for products that are not in a group yet.
- **Several at once:** Under Tasks → Groups → Set group for several you search and filter like for the minimum stock, tick products and enter the group name. An empty name removes them from the group.
- **Manage:** Under Tasks → Groups → Manage groups you see all groups. You can rename them, add or remove products and dissolve the group. The products are kept. If you give a group the name of another one, the two are merged.

### Nutri-Score

You choose the Nutri-Score under More with the coloured buttons A to E.

Tapping the selected value again removes it.

---

## Automatic shelf life and the sparkle symbol

ShelfMate can suggest or fill in shelf life values automatically.

This includes:

- The standard shelf life of a product
- The shelf life after opening
- Best-before dates calculated automatically when stocking in

### What does the sparkle symbol mean?

The small ✨ sparkle symbol on the product page marks values that were taken over automatically.

It appears, for example, when the shelf life comes from the built-in food list or from a product group, or when a best-before date was calculated automatically.

Values you enter yourself always win.

If you change a date that was suggested automatically, it counts as a manual value from then on. The symbol disappears as soon as no automatic values are left.

The symbol is shown only on the product page, not in the overview.

ShelfMate can recognise older automatically calculated dates when you run "Fill in shelf life automatically" again, if they are exactly the stocking date plus the standard shelf life.

### When is the shelf life filled in?

You set this in the adapter settings.

| Setting | Behaviour |
| --- | --- |
| Always | The app suggests a date when stocking in. Scanner mode and data points fill it in automatically |
| Only without the app | Filled in automatically only through scanner mode and data points |
| Never | No automatic filling in and no automatic suggestions |

With Never, the function "Fill in shelf life automatically" can still be used by hand.

### Which values are used?

There are two choices:

**All with a standard shelf life**

Takes into account your own values on the product, the values of the product group and the built-in list.

**Only dry goods from the built-in list**

Uses only the stored standard values for typical pantry products. Your own product and group values are then not filled in automatically.

The built-in list contains, for example, pasta, rice, flour, tins and sweets.

Fresh and chilled products such as milk, meat, sausage, cheese, eggs or yoghurt deliberately get no automatically calculated standard value.

Baby food in jars (for example jars from Hipp or Bebivita) gets 120 days and, after opening, only 1 to 2 days, because opened jars spoil quickly.

Important: automatic shelf lives are guide values, not an actual manufacturer's best-before date. A printed or manually entered date wins. Opening a package also never extends an earlier date.

### Managing shelf life values

Under Tasks → Shelf life → Manage shelf lives you find all products with their own shelf life values.

There you can edit values, remove them one by one with × or delete them all at once with Remove all own values.

Changes apply immediately.

Use the search at the top to find a product quickly. The search bar stays at the top while you scroll, and × clears the text. Every product shows the shelf life and the shelf life after opening. A grey value was estimated by ShelfMate, a black value was entered by you.

### Shelf life rules

Under Tasks → Shelf life → Manage shelf lives → Shelf life rules you change how ShelfMate guesses a shelf life from the product name.

Every rule consists of keywords, the shelf life in days and the shelf life after opening in days. If a product name contains one of the keywords, the rule applies.

- + Rule adds a rule, Save keeps your changes.
- Your own rules are listed first. They win over the built-in defaults.
- Below you find the defaults with their values. Tap Edit and the entry opens right there with fields for the keywords and the days. Cancel closes it without changing anything.
- Suggestions appear while you type keywords. They come from the products in your stock.
- The search at the top filters rules and defaults by keyword.

After you change a rule, run "Fill in shelf life automatically" in the Tasks tab once to apply it to products that were estimated before.

---

## Refreshing product data

Products with a known barcode can get their information from Open Food Facts.

In the product editor you find "Reload from Open Food Facts" at the very bottom. It always searches the source the product came from; for products without a safe source it reads "Update data from the web" and searches the web. When you scan, ShelfMate asks dm automatically after Open Food Facts, and only then Open Beauty Facts and the other sister databases; Rossmann and the rest of the web search you start yourself. ShelfMate remembers where a product came from, and "Reload tags & Nutri-Score" reloads dm products from dm again. For dm and Rossmann, ShelfMate also takes the shop category as tags and derives the category (drugstore, household …) from it; for Rossmann it comes from the product link. Drugstore and household products get no automatic food shelf life. Image search works the same way: for a product from a database it only asks that database, the web is only used for products without a safe source. For cosmetics, pet food and household products the source is Open Beauty Facts, Open Pet Food Facts or Open Products Facts, and ShelfMate shows the matching name there.

If none of these databases knows a barcode, the product is new. The editor then shows a "Search the web" button at the top. It works step by step and stops at the first sure hit: first it asks the official MCP service of dm (free, no key) for name, brand and pictures. Then come the barcode databases ean-suche.net (free, at most 50 lookups per hour, also hands out the picture of its product page), ean-search.org and, if a key is entered, Open EAN (opengtindb.org). The website of ean-search.org blocks you after a few lookups; with a free token in the adapter settings, ShelfMate uses its official interface instead, and asks it first. Last it searches the barcode on the web, the way I would by hand: on DuckDuckGo and Bing with `ean "<barcode>" <country>`, where the country follows from the barcode prefix (400–440 is Germany), then with the number alone. A hit on rossmann.de counts when its address ends with the barcode, as Rossmann closes its pages to scripts, and the name then comes from the search result. Pages of other countries (a Polish shop of the same brand, say) are ignored. If the sources only know the name, it looks for pictures of that name in the image search of DuckDuckGo and Bing, where only hits whose title contains at least two words of the product name count. The message names the source, and you should check the data before saving. A hit of the web search only counts if the page or the search result really shows the barcode; otherwise the product stays unchanged. A grey line below the button shows which steps ran. This never runs on its own, only when you tap the button, and only the barcode is sent. To search only for a picture, use "Find images" next to the image: it asks the open databases first and only if they have nothing, the web. For a product whose data does not come from such a database, "Update data from the web" at the bottom of the editor searches again and fills the fields (nothing is saved until you tap save). If a search finds nothing, "Technical details" at the very bottom holds a short log you can copy into a bug report. If several new products are waiting under Tasks → Edit new products, "Search all on the web" searches them one after the other and shows the progress. An overview then lists all matches with name, brand, size, picture and source. Untick wrong matches and tap "Apply selected". Only the ticked products are saved; the others stay unchanged in the list. You can turn the web search off in the adapter settings.

These details are refreshed:

- Name and brand
- Package size
- Product image
- Category
- Nutri-Score
- Additional tags

Tags you created yourself are kept.

Changes only apply once you tap Save product. So you can check the result first and close the form without saving if you like.

For products from Open Food Facts the barcode is locked in the editor.

---

## Stock in, take out and move

This is how a normal booking works:

1. Tap Scan at the bottom right of the overview and capture the barcode with the camera or type it in.
2. For known products the product page opens.
3. Unknown barcodes are looked up on Open Food Facts. You can check and save what was found.
4. Choose Stock in, Take out or Move.
5. Set the amount and the storage location and save the booking.

You can pick the storage location from the list or scan its QR code directly.

All bookings are saved in the history.

---

## Creating storage locations

ShelfMate distinguishes between storage areas and storage locations.

Example:

- Area: Pantry
- Location: Shelf 1

Under Locations you can create and edit both.

<p align="center"><img src="../images/locationEdit.jpg" width="250"><br><sub>A storage location with its QR code text. The checkbox "Consumables" lists the stock of this location in a data point.</sub></p>

### Consumables

"Consumables" outputs the stock of a storage location as a data point. It is meant for locations you regularly take things from, for example the fridge, the pantry or the freezer. A script, VIS or a voice output can then tell what is in the fridge right now, what is opened and what expires soon.

Tick "Consumables" when editing the location. The stock of all ticked locations is then combined and listed in two data points under `shelfmate.0.stats`:

| Data point | Description |
| --- | --- |
| `stats.consumables` | JSON list with name, brand, amount, unit, locations, opened amount, nearest best-before date, days left and `expiring` |
| `stats.consumablesText` | One line per product, for example `2 Stück Joghurt (1 geöffnet, MHD 2026-10-25)` |

The text shows the opened amount and the best-before date only if there is something opened or it expires soon. This is handy for planning recipes or for your own scripts.

### Freezer locations

Tick "Freezer location" when editing a location (chest freezer, freezer drawer). Anything stocked in there gets the frozen shelf life instead of the normal one, because food keeps much longer frozen.

- **Own value per product:** enter "Frozen, in days" on the product page. Without it, the default from the adapter settings is used (180 days; 0 switches this off).
- **Moving into the freezer:** when you move a product from a normal location into a freezer location, the best-before date is set to today plus the frozen shelf life. Moving it back keeps that date.
- **Opening:** choose "When opened, move to" (for example the fridge) on the freezer location. If you open a package from the freezer, it moves there automatically. The date then follows the shelf life after opening, and undo takes the move back. The history shows the move (for example "Chest → Fridge"), and "Undo opening" on the product page puts the package back into the freezer.
- **Bought frozen:** tick "Frozen product" on the product page for products you buy frozen, such as chips. They keep their normal shelf life, also in the freezer.
- **Vacuum-sealed and frozen:** cold cuts keep the same barcode. Give the product its own frozen value and print the "Freezer EAN label" from the product page.

The date is only filled in automatically if automatic shelf life is switched on for stocking in; you can always change it by hand.

### QR codes for storage locations

Every storage location gets its own code.

Open the location and choose the label you want:

- QR code only
- Large shelf label
- Box label with contents

Alternatively you can create location labels with a Code 128 barcode. This is especially handy for scanners without QR code support.

You choose the code type under Settings → Labels.

### Label size

You set the label size once, for example 50 × 30 mm.

For large shelf labels, box labels and full-page codes, your own formats such as A6, A5 or A4 are possible too.

Which label buttons are shown in the app, you choose in the instance settings in the ioBroker admin under "Label buttons in the app". You set the label size directly in the app settings.

After creating it, you can save the label as an image or print it directly.

---

## Products without a barcode

Products without a manufacturer barcode can be managed as well.

1. Create the product by hand.
2. In the editor, choose Generate EAN.
3. Print the own EAN-13 code as a label.
4. Stick the label on the product or the container.

After that, the product can be scanned like any other.

You can also upload your own product image. ShelfMate scales it down automatically.

### Your own product database

Besides Open Food Facts, ShelfMate can use a database of your own. It is asked first when you scan or enter a barcode, so your own names, groups and shelf lives win.

The data point `ownDb.data` always exists. Paste your database there as a JSON list, for example:

`[{"ean":"4006381333931","name":"Oat flakes","brand":"Demo","shelfLifeDays":365}]`

Products with a barcode that ShelfMate made up itself (Generate EAN) are added to this list automatically. If data is restored or moved, the same product gets the same barcode again. Entries you added yourself stay untouched.

In the adapter settings you can add more sources, all read only:

- a data point with the database (JSON or CSV text)
- a file on the system or on a mounted network drive
- the web address of a file (http or https), loaded again after the refresh time

JSON list, JSON object with the barcodes as keys and CSV with a header line are understood; "Detect automatically" picks the right one.

If your data uses other names, enter them in the table "Field names in your data", for example the field "name" → `Krömpel`. A dot reaches into nested data (`data.title`). Every product field can be mapped: barcode, name, brand, package size, unit, category, product group, tags, image URL, minimum stock and the shelf lives (normal, after opening, frozen). Only the name is required besides the barcode. The data point `ownDb.data` always uses the ShelfMate names.

Under "Use of the own database" you choose:

| Setting | Behaviour |
| --- | --- |
| Own database first, then internet | Own data wins, Open Food Facts and the web only help if nothing is found |
| Own database only | The internet is not asked at all |
| Not used | Only the internet, as before |

A product found there is filled into the editor like any other, or created directly when you stock in or scan.

---

## Minimum stock and shopping list

You can set a minimum stock for every product.

Example: you always want at least two packs of pasta in stock.

As soon as the stock falls to two packs or less, ShelfMate can put the pasta on your shopping list automatically.

For product groups, the stock of the products in the group is counted together.

In the overview, a check mark shows which products are already on the shopping list. Tapping it removes the entry again, if the matching settings are active.

The connection to the shopping list is set up in the adapter settings.

### Fruit and vegetables from the scale (PLU)

Loose fruit and vegetables have no barcode, only a produce number (PLU) with four digits, for example 4011 for yellow bananas. Organic produce has a 9 in front (94011). ShelfMate knows the international list of these numbers (about 1,500 numbers, IFPS list 2024, with a name in every language of the adapter), so a scan or a typed number creates the product by itself. The category is always "Food".

Labels from scales (for example at REWE) carry the number in a data matrix code. ShelfMate reads the number out of it, also with a scanner or with the camera. The price and weight on the label are not used.

Some numbers are assigned by the retailer and say only "bananas". REWE, for example, prints "Banane Bio" on the label for 4238, but the code only contains the number. To get your own name, enter it in the data point `plu.data`:

```json
{ "4238": "Banane Bio", "4400": { "name": "Pfirsich", "packageSize": "500 g" } }
```

Your own entries win over the built-in list. You can use the fields of the own product database (`name`, `category`, `group`, `unit`, `shelfLifeDays`, ...). A product is only created once; after that it is found by its number.

### Setting the minimum stock for several products

If many products should get the same minimum stock, for example 1 for all spices, you do not have to open each product.

1. Open the "Tasks" page and tap "Set minimum stock for several" under "Minimum stock".
2. Search for a keyword such as "spice", or choose an area, location or category like in the overview. "Not set" shows only products without a minimum stock.
3. Tick the products, or tap "Select all" to mark everything that is shown.
4. Enter the number and tap "Set". Enter 0 to remove the minimum stock again.

The selection is kept when you change the search, so you can collect products from several searches and set them all at once.

### Writing the missing amount

With the option "Write the missing amount to the list" (Bring! special and script mode), ShelfMate also writes how many are missing. Example: minimum stock 5 for flour.

- The stock falls to 5: the list gets `Flour, 1`.
- The stock falls further to 3: only the difference is added. With Bring! special the entry becomes `Flour, 3`. In script mode your script gets `Flour, 2` and adds the amount itself.
- The stock falls from 8 straight to 3: the list gets `Flour, 2`.

---

## Best-before date

ShelfMate supports three modes.

| Mode | Description |
| --- | --- |
| Off | No best-before management |
| Per product | One shared best-before date for the product |
| Per stocking | Every stocking can have its own best-before date |

### Best-before date per stocking

When stocking in, every package can get its own date.

Several best-before dates are stored separately per product and location.

When taking out or moving, the stock with the oldest best-before date is used first.

If a date is missing, ShelfMate can calculate one from the standard shelf life. For this, the stocking date from the history is used.

### Opening a package

With Open you can mark a single package as opened.

ShelfMate then keeps this package separately and uses it first when taking out.

If a shelf life after opening is stored, a new date is calculated from it. An earlier existing best-before date stays.

With Undo open you can reset it.

### Spoiled products

When taking out, you can distinguish between Used and Spoiled.

Spoiled products do not count towards normal consumption. In the history they are summarised for 30 days.

### Undoing bookings

In the history you can undo the last booking.

In scanner mode the control code `SM:UNDO` is available for this.

It does not work there for moves and stocktakings.

<p align="center"><img src="../images/history.jpg" width="250"><br><sub>The history with the button to undo the last booking.</sub></p>

### Changing a best-before date later

In the mode Per stocking, "Edit best-before date" shows all packages one by one – opened ones too.

You can enter a date by hand or use the quick buttons:

- +1 day
- +3 days
- +5 days
- +10 days
- No date

Save applies all changes. The changes appear in the history and can be undone.

In scanner mode you can set a new best-before date for all unopened stock with `SM:DATE:<days>` followed by scanning the product.

`SM:DATE:0` removes the date.

### Entering a date quickly

Besides normal dates, ShelfMate understands short forms.

| Input | Meaning |
| --- | --- |
| +3d | In 3 days |
| +2w | In 2 weeks |
| +1m | In one month |
| +1y | In one year |
| 12/26 | End of December 2026 |
| 2412 | Next 24 December |
| 24.12. | Next 24 December |
| 24.12.26 | 24 December 2026 |
| x | No date |

Below the input field a preview of the recognised date appears.

Tap × in the field to clear it; the keyboard closes. If the product already has dates in stock, they appear as buttons below the field so you can pick one with a tap. When you edit several packages at once, "same as above" copies the date of the row above. After "Set date" the field is empty again.

There are also quick buttons for +1 to +14 days, +3 weeks, +1 month, +3 months, +6 months and +1 year.

### Expiry warnings

Products that expire soon or have expired are marked in the app, for example with:

- "Expires in 3 days"
- "Expired"

The information is also available in the data points `stats.expiring*`.

Under Date format you can choose between 31.10.2026, 31/10/2026 and 2026-10-31.

---

## Shopping list modes

ShelfMate supports four ways to put products on a shopping list.

### Off

No products are passed to a shopping list automatically.

### Script

ShelfMate writes the item name with `ack=false` into a data point of your choice.

Optionally you can also name a data point with the current shopping list. A JSON array of objects is expected, each with a `name`. The content has to look like this:

```json
[
  { "name": "Mehl" },
  { "name": "Milch" },
  { "name": "Feta" }
]
```

With it, ShelfMate recognises products that are already there and avoids duplicate entries.

The objects may contain further fields, for example an amount or a description. ShelfMate reads only the `name` and ignores the rest.

If "Write the missing amount" is on, ShelfMate writes the text `Name, amount` instead of the plain name into the data point, for example `Milk, 2`. Your script splits the text at the comma and adds the amounts up itself, because ShelfMate does not check for duplicates in this case.

Alternatively your script reads the data point `shopping.lastItem`. It holds the item added last as JSON, so you do not have to split text:

```json
{ "name": "Mehl", "quantity": 500, "unit": "g", "text": "500 g" }
```

`quantity` is a number or `null`, `unit` is empty when there was no unit. The data point is only filled in script mode.

For removing items you can set one more data point. The item name is written there with `ack=false` as well.

Only with this data point do removing via the check mark in the app and automatic removal after refilling work.

### Bring!

ShelfMate can work directly with the Bring! adapter.

The available lists are detected automatically. Alternatively you can enter the channel by hand, for example:

```
bring.0.<list-id>
```

ShelfMate reads the list content through `<Liste>.content` and adds new products through `<Liste>.saveItem`.

Products that are already on the list are not entered again.

For an entry with a comma, only the item name before the first comma is used.

### Bring! special

This mode also takes quantities and variants into account.

Examples:

- `Mehl` → `Mehl, 2` → `Mehl, 3`
- `Feta, 200g` and then `Feta, Kräuter` give **one** entry: `Feta, Kräuter, 200g`. So you can see: one feta with 200 g and one feta as the herb variant
- If another `Feta, Kräuter` is added, the entry reads `Feta, Kräuter 2, 200g`

So existing items are not simply skipped. Instead, ShelfMate raises the quantity or adds the variant.

The entries are processed one after the other. The next item is only passed on once the Bring! adapter has updated its list.

This is especially helpful for the ingredient check.

### Data point shopping.addItem

With `shopping.addItem` you can put products on the shopping list independently of the app.

The currently selected shopping list mode is always used.

### Removing products automatically

With Bring!, Bring! special and script with a remove data point set up, there are two independent options:

**Take off the list when refilled**

As soon as the stock rises above the minimum stock again, the product is removed from the shopping list.

Off by default.

**Take off the list when the check mark is removed**

A tap on the check mark in the app also removes the product from the connected shopping list.

If the function is turned off, only the mark in ShelfMate disappears.

On by default.

Only items that are really on the list are removed. With Bring! the removal goes through `<Liste>.removeItem`.

---

## Checking ingredients

ShelfMate can compare a list of ingredients with your current stock.

The recipes themselves are not stored in ShelfMate. Instead you hand over a list of ingredients, for example from a recipe app.

### Handing over ingredients

Write the ingredients into the data point `check.request` with `ack=false`.

Possible formats:

- One ingredient per line
- Ingredients separated by semicolons
- A JSON array of texts
- A JSON array of objects with `name`, `amount` and `unit`

Examples:

```
Zwiebeln, rot, 1
Cherrytomaten, bunt, 500g
Salz, 0.5 tl
Basilikum
```

These spellings are recognised too:

```
380g Linguine
2EL Olivenöl
Mehl 200g
```

Supported units are kg, g, l, ml, cl and pieces.

Specifications such as EL or TL (tablespoon, teaspoon) are only checked for presence.

Identical ingredients are added up.

### How the comparison works

ShelfMate looks at the product name first, then the group, and last at the last word of the name. The last word says what a product is: "Kartoffel Rösti" is a Rösti and does not count as potatoes. Numbers, amounts and "Fett" at the end are skipped, so "H-Milch 3,5 % Fett" counts as milk. Names with "mit", "und", "in" or "&" (for example "Reis mit Karotten") are dishes and are never found through a single word, only through the whole name or the group. The first hit wins. Tags are not used for the comparison because they are often too broad (for example "cream cheese" on every cream cheese).

Whole words are compared.

Example: Cherrytomaten is not recognised as Tomaten automatically. Give the product the group "Cherrytomaten" for that. The same goes for two names of one thing, for example Vanillezucker and Vanillinzucker: give both products the group "Vanillezucker".

For products by weight or volume, the actual stock is used.

Example: 500 g flour in stock, 200 g needed – the ingredient is available.

Package sizes such as 1 kg are converted accordingly.

For ingredients without an amount, positive stock is enough.

Unknown ingredients count as missing. This way, other shopping items can be taken over too.

### Result

After every check, these data points are available:

| Data point | Content |
| --- | --- |
| `check.result` | Result for every single ingredient as JSON |
| `check.available` | Ingredients in stock |
| `check.missing` | Missing ingredients |
| `check.allAvailable` | true if everything is in stock |

The lists contain the original ingredient lines, one per line.

With `check.addMissing` you can put the missing ingredients on the shopping list.

Alternatively, turn on "Put missing ingredients on the shopping list" in the adapter settings. Then they are passed on automatically after every check.

Bring! special also takes quantities and variants into account, while the other modes pass on only the item name.

To keep an eye on the check, turn on "Report ingredients that were not put on the list". After every check you then get a message through your notification adapter, for example:

`Not put on the shopping list, already in stock:` followed by lines like `- Potatoes: Potatoes Rewe`

Each line shows the ingredient and the products that were counted for it, so you can spot a wrong match right away. This needs a notification adapter in the settings and works together with "Put missing ingredients on the shopping list".

### Taking the minimum stock into account

When comparing ingredients, ShelfMate can also include the minimum stock you want.

Example:

- Stock: 2 kg sugar
- Minimum stock: 1 kg
- Needed: 3 kg sugar

2 kg sugar end up on the shopping list, so that the minimum stock is kept after cooking.

After every check, `check.request` is emptied automatically.

---

## Stocking a whole shelf

With Locations → Stock in you can capture several products one after the other and book them in together.

1. Scan the QR code of the location or pick it from the list.
2. Scan the products one after the other – with the camera, an external scanner or by typing the EAN.
3. Every scan raises the amount by 1.
4. Correct amounts in the list if needed.
5. To finish, scan the same location code again or choose Stock in.

All captured products are booked in together.

For products by weight or volume, every scan counts as one whole package. The package size in g or ml must be stored for this.

### Unknown products

If a barcode is not known yet, ShelfMate asks Open Food Facts for the product data and creates the product.

If nothing is found there, ShelfMate temporarily creates an entry like:

```
Unbekanntes Produkt 1234567890123
```

The product is counted anyway.

In the settings, the hint "Edit new products" then appears until the entry has been completed and saved.

---

## Doing a stocktaking

With a stocktaking you check whether the stored stock matches what you really have.

There are two variants: Scan and List.

### Stocktaking by scan

1. Under Locations → Stocktaking choose the variant Scan.
2. Scan the QR code of the location.
3. Scan all products there one after the other.
4. Every scan counts one piece. The same barcode can be scanned several times.
5. To finish, scan the same location QR again.

ShelfMate compares the counted amounts with the stored stock and shows a summary.

Differences are shown with expected and counted amounts.

Products that were not scanned are counted as 0.

After that, you can continue with the next location. A new location is only accepted once the previous one is finished.

In the overview you see which locations have been checked and which are still open.

### Stocktaking by list

Alternatively, you can check the existing products directly in a list.

- Enter the actual amount
- Confirm with ✓ if the stock is right

Stock corrections are saved in the history as Stocktaking.

A regular stocktaking reminder can be turned on in the adapter settings.

---

<p align="center"><img src="../images/inventory.jpg" width="250"><br><sub>Stocktaking: choose a location and check the products in a list or by scanning.</sub></p>

## Scanner mode without the app

ShelfMate supports stocking in and out with an external barcode scanner, without the web app having to be open.

Scanner mode is turned on with `scanner.active`.

Scans can be handed over through `scanner.input` with `ack=false` or received from a scanner connected directly to the ioBroker host.

### Scan sequences

| Scan sequence | Action |
| --- | --- |
| Product → location | Stock in 1 piece |
| Product → product | Take out 1 piece |
| Product → product → location | Take out 1 piece from a specific location |
| Location | Start stocking mode |
| Location again | End stocking mode |
| Another location | Switch location in stocking mode |

If no location is given when taking out, ShelfMate uses the stock with the shortest best-before date.

If there is no best-before date, the location with the largest amount is used.

### Scanning several times

One scan waits for a location, two scans take out. From three scans of the same product in a row, ShelfMate runs an action that you choose yourself.

You set the actions in the adapter settings under "Actions for repeated scans". Each number of scans from 3 to 20 has one row and can be used once.

| Action | Effect |
| --- | --- |
| Stock in at the last known location | One item goes back to where the product was stocked last. A location scanned afterwards is used instead. |
| Stock in several at the last location | Like above, but with the quantity from the "Value" field. If it is empty, the number of scans counts. |
| Mark as empty | The whole stock is set to 0. At a minimum stock the product lands on the shopping list. |
| Toggle opened / closed | Marks one package as opened, like `SM:OPEN`, without the control code. If a package is already opened, the same scan closes it again. |
| Put on the shopping list | The product is noted. The "Value" field can hold a quantity. |
| Remove from the shopping list | The product is taken off the list. |

By default three scans stock in at the last location, four mark the product as empty and five put it on the shopping list. One and two scans stay as they are.

From the third scan on, each scan must follow within the time between repeated scans (3 seconds by default). If it takes longer, counting starts over and the earlier scans are booked as a take-out.

Every triggered action is written to the log and to the data point `scanner.lastAction` with the number of scans, for example `3x: Pasta ×1 stocked in at Pantry`. You can use it for speech output or a notification. The bookings also show up in the history.

### Unknown products in scanner mode

If a scanned barcode is not known yet, ShelfMate creates the product by itself before booking it. The data (name, brand, category and tags) comes from Open Food Facts, also from its databases for cosmetics and pet food. The scan is then booked as usual.

If nothing is found, ShelfMate creates the product as incomplete with a name like `New product 1234567890123` and books it anyway. The scanner result says so. Under Tasks → Edit new products you can complete these entries later.

### Scanner with memory

Some scanners keep scans while they are out of range and send them all at once later. ShelfMate splits such a burst into single scans and processes them in the order they were scanned. A sequence like location → products → location (stocking mode) works as well. If looking up many unknown products takes longer than the waiting time between two scans, raise that time.

### Stocking mode

First scan the location code.

After that you can scan as many products as you like. Every product scan books one piece into the selected location right away.

To end it, scan the same location code again.

Another location code switches the location directly.

After five minutes without a scan, the mode ends automatically.

### Counting mode (scans = quantity)

If you do not want to scan a location at all, choose "Scans = quantity" as the scanner mode in the adapter settings.

- Every scan of a product stocks in one piece at the location where the product was stocked in last. Three scans are three pieces.
- Products that were never stocked in use the default location from the settings, or the only location if you have just one. With several locations and no default location the scan is refused and the result says so.
- `SM:QTY:5` before a scan stocks in five pieces at once.
- To take out, scan `SM:OUT`. Every product scanned afterwards is taken out. Scan `SM:OUT` again to finish, or wait five minutes.
- A location code scanned first still stocks in at that location, as in stocking mode.

`SM:OUT` also works in the standard mode.

### Best-before date while stocking

Several products with the same date do not have to be entered one by one.

1. Scan the location code to start stocking mode.
2. Scan `SM:DATE:7`, meaning "today plus 7 days".
3. Scan all products. Each one is stocked in and gets the date right away. For several identical packages scan `SM:QTY:3` first.
4. For a different date scan the next `SM:DATE:…` code. `SM:DATE:0` switches the date off.
5. Scan the location again at the end.

If another product has the right date, scan `SM:COPY` and then that product. The following products in stocking mode get its date. Outside stocking mode the next scanned product gets the date for its existing stock.

Without stocking mode, `SM:DATE:7` followed by the product still sets the date for stock that is already in storage.

### Without best-before date: several products at once

Tick "Record the best-before date when stocking in" on a location, for example the fridge. The products of that location that have no date yet then appear in the Tasks tab and as the filter "Ohne MHD" on the overview. A date estimated by ShelfMate (spark symbol) counts as missing until you confirm it.

Enter a date (for example `0511` or `+7d`), tick the products it applies to and tap "Datum setzen" (set date). Products in other locations, such as pasta in the pantry, do not appear there.

### Control codes

There are special codes for further actions:

| Code | Function |
| --- | --- |
| `SM:UNDO` | Undo the last supported booking |
| `SM:SPOIL` | Take out the next product as spoiled |
| `SM:OPEN` | Mark the next product as opened |
| `SM:OUT` | Take out every following product until the code is scanned again |
| `SM:DATE:<days>` | Set the best-before date for the unopened stock |
| `SM:DATE:0` | Remove the best-before date |
| `SM:COPY` | Copy the best-before date of a product |
| `SM:QTY:5` | Make the next booking with amount 5 |
| `SM:CANCEL` | Cancel a waiting scan |

The control codes can be printed as a PDF from the settings.

### Code library

Under Settings → Scanner → Code library you manage your own codes.

- Scan a code or enter its content by hand, give it a name and save it.
- Print a saved code as a label.
- The standard control codes from the table above are listed below your own codes. They cannot be deleted.
- A checkbox on every code decides whether it goes into the control code PDF.

If no code is ticked, the PDF cannot be created and the app says so.

<p align="center"><img src="../images/controlCodes.jpg" width="250"><br><sub>The settings have the control codes for the scanner as a PDF.</sub></p>

### Time between two scans

In the adapter settings you can set how long ShelfMate waits for the next code.

Possible are 3 to 120 seconds.

Default: 10 seconds.

For repeated scans (from the third scan on) there is a separate short time between repeated scans, 3 seconds by default.

### Connecting an external wireless scanner

Intended, for example, is the Tera HW0009 with a 2.4 GHz dongle.

1. Put the scanner into pairing mode and pair it with the dongle over 2.4 GHz, following the manufacturer's manual.
2. Plug the USB dongle into the ioBroker computer. If ioBroker runs in a virtual machine, pass the USB device through to the VM. How this works depends on the virtualisation software.
3. Set the keyboard layout of the scanner to US or German and the end of the code to Enter. In the ShelfMate adapter settings, choose the same layout (keyboard layout of the scanner). Scanner and setting must match.
4. Give ioBroker the right to read the input device (see below) and restart ioBroker. The right only applies after the restart.
5. In the ShelfMate adapter settings, choose the scanner device.
6. Turn on scanner mode through `scanner.active`.

The scanner is recognised as a USB keyboard. An extra driver is normally not needed.

For ioBroker to access the input device, the user needs the right permissions:

```
sudo adduser iobroker input
```

Then restart ioBroker itself, not only the instance. The new right only applies after that.

If the scanner uses a prefix or suffix, the matching settings in ShelfMate must be the same.

Every recognised code is stored in `scanner.lastCode`. The result is in `scanner.result`.

### Connecting the scanner by Bluetooth

If the scanner should be far from the ioBroker host (for example in the kitchen), pair it directly over Bluetooth. The charging station then only charges.

1. On the scanner, scan "Bluetooth HID" and then "Pairing" (manual of the Tera HW0009, page 4).
2. On the ioBroker host start `bluetoothctl` and enter `scan on`, `pair <address>`, `trust <address>` and `connect <address>`. The scanner is called "BarCode Scanner HID".
3. In the ShelfMate settings choose the device with the "(Bluetooth)" suffix.

ShelfMate finds the device by its name, so it picks the scanner up again when it reconnects after power saving. Pressing the trigger wakes it up.

### Short location codes

Because some scanners work with a US keyboard layout, special characters or umlauts can cause problems.

For this, ShelfMate offers short location codes.

In the location editor choose "Use short scanner code", save and print the label again.

Existing labels stay valid.

The short code has the format:

```
SM:L:<8 characters>
```

### Scanners without QR code support

Simple scanners that read only barcodes can be used too.

For this, choose the option Barcode under Settings → Labels.

ShelfMate then creates Code 128 barcodes instead of QR codes for locations and control codes.

This also applies to box and shelf labels.

The location must be saved first so that its short ID can be used.

The codes fit, for example, on labels of 50 × 30 mm.

Note: the scanner itself needs no display. The result of every scan is output in `scanner.result`.

A stocktaking still takes place in the web app, because it needs a display.

---

## Suggestions

Whenever ShelfMate has something for you, the Tasks tab in the bottom bar shows a dot. All suggestions and open tasks are in one place there. The scan button is on the overview.

They include:

### Record best-before dates

For locations with "Record the best-before date when stocking in" this lists all products without a date. Enter a date, tick the packages and set it. Every package is listed on its own, so two Parmesan appear twice. That way you can give them different dates. The scan button is above the bar on all tabs.

### Product groups

ShelfMate recognises similarly named products and suggests combining them into a group.

Single products can be removed from a suggestion. Whole suggestions can also be ignored.

### Minimum stock

Based on the consumption of the last 30 days, ShelfMate can suggest a fitting minimum stock.

This considers regularly used products.

With ✓ you accept the suggestion, with × you reject it.

### New products

Products that were created by the scanner without data (see Unknown products in scanner mode) wait here until they are completed.

### Stocktaking

If a stocktaking is due, a hint appears as well.

Important: ShelfMate never applies suggestions by itself. Changes are only made after you confirm.

---

## Notifications

ShelfMate can send messages automatically for important events.

In the adapter settings you choose a supported notification adapter and the recipient you want.

Supported are:

- Telegram
- telegrammenu2
- Pushover
- Signal
- WhatsApp
- Matrix
- E-mail

With Test you can check whether the connection works.

These notifications are possible:

### Minimum stock reached

A message as soon as a product reaches or falls below its minimum stock.

### Best-before warning

A daily summary of products that expire soon and have already expired.

The time can be set. Under "Message on these days before the date" you can list the days on which a message is sent, for example `7,4,3,2,1,0`: you get one message 7 days before, then on days 4, 3, 2 and 1 before and on the day itself, and nothing in between. `0` is the day itself, `-1` one day after. Empty means a message every day within the warning period. In the adapter settings you can change the headings and the line per product. These placeholders are available: `{name}`, `{brand}`, `{date}`, `{days}`, `{when}`, `{amount}`, `{place}`. Default: `• {name} ({date}) – {place}`. Example: `• {brand} {name}: {when}, {place}`.

### Stocktaking reminder

A reminder after a set number of days without a stocktaking.

With the value 0 the reminder is off.

---

## Export and backup

Under Settings → Data there are several options.

### JSON backup

Creates a complete backup of your ShelfMate data.

A previously saved backup can be imported again later.

### CSV export

Exports the stock as a CSV file, for example for use in Excel.

### PDF export

Creates a printable stock list, sorted by storage location.

The PDF can be saved or printed through the share menu.

### Data storage

ShelfMate stores the stock data in the file:

```
shelfmate.json
```

It is in the adapter's data directory and not in the ioBroker object database.

When you import a backup or delete all data, the previous state is saved as `shelfmate.json.bak`.

---

## Offline mode

ShelfMate can also be used when the connection is briefly interrupted, as long as the web app was set up before and a trusted HTTPS certificate exists.

The app keeps a copy of all data on the device: products, stock, locations, history, best-before data, settings, hints and the shopping list. It is shown when the connection is missing.

Stock-ins, take-outs, creating and editing products and locations and the stocktaking mark are kept in a queue while offline. Opening a package, marking spoiled, undoing and looking up unknown barcodes at Open Food Facts need a connection.

A stock-in that was booked offline changes the stock at once. Best-before date and opened state of the new items are completed when the booking has been sent.

As soon as the connection is back, ShelfMate sends the waiting actions automatically.

This way, bookings are not lost when the connection drops for a short time.

---

## HTTPS and certificates

For the camera and offline mode, ShelfMate needs HTTPS with a certificate that the device you use trusts.

### Setting up HTTPS

1. In the adapter settings, turn on Use HTTPS.
2. Choose an existing certificate or create a new one.
3. Save the settings and restart the instance.

With Create self-signed certificate, ShelfMate creates a certificate for the host name and the IP addresses of the ioBroker computer.

The certificate is stored in the ioBroker certificate store, selected automatically and valid for 825 days.

### The iPhone asks for the camera every time

On the iPhone the app asks "Allow camera?" again after every start. I get rid of the question like this:

1. Open ShelfMate in Safari at its address, not from the Home Screen icon.
2. Open the scanner, tap Start camera and tap Allow.

From then on the question stays away, also in the app on the Home Screen. If it comes back, Safari and the Home Screen app have forgotten the permission; repeat the two steps.

Alternatively you can use your own certificates or a certificate collection, for example through the ioBroker adapter acme.

A publicly trusted certificate, for example from Let's Encrypt, normally does not have to be installed on the phone additionally, as long as the host name you open matches it.

### Installing a self-signed certificate on the iPhone

These steps were tested on the iPhone:

1. Open ShelfMate in Safari: `https://<Host>:8120/`
2. In the app open Settings → Offline mode.
3. Choose "Load ioBroker certificate" and allow the download.

Alternatively the certificate file is available at this address:

`https://<Host>:8120/iobrokerZertifikat.cer`

Then on the iPhone:

1. Open Settings → General → VPN & Device Management.
2. Select the downloaded profile and install it.
3. Open Settings → General → About → Certificate Trust Settings.
4. Turn on trust for the installed certificate.
5. Open ShelfMate again.
6. Check the connection under Offline mode → Check again.

Only install and trust certificates whose origin you know.

### Android

Setup on Android has not been tested so far.

The certificate file can also be downloaded at `https://<Host>:8120/iobrokerZertifikat.cer`.

Depending on the Android version, a CA certificate is installed through the security or credentials settings.

Menu names and behaviour can differ by manufacturer and version.

### Adding to the home screen

iPhone: open ShelfMate in Safari, choose the share menu and tap Add to Home Screen.

Android: open ShelfMate in the browser and choose Add to Home screen or Install app from the browser menu.

After that, ShelfMate starts like a normal app.

---

## Printing labels

ShelfMate creates labels as PNG images in the set size.

You can save them on your phone, share them or print them directly.

Supported are, among others:

- EAN labels
- QR labels
- QR-only labels
- Large shelf labels
- Box labels with contents
- "Opened on" labels
- Freezer labels

Which label types are available, you choose in the instance settings in the ioBroker admin under "Label buttons in the app".

### Example: Niimbot B1

The labels can be printed, for example, with a Niimbot B1.

For this, the printer can be set up through CUPS on a Linux computer as an AirPrint printer. Then you can print directly from the iPhone.

Setting up the printer is not part of ShelfMate.

For more information, search for "Niimbot CUPS AirPrint".

---

## Questions, ideas or bugs?

If something does not work or you have an idea for ShelfMate, feel free to open an issue on GitHub:

[GitHub – ShelfMate Issues](https://github.com/backfisch88/ioBroker.shelfmate/issues)

---

## Appearance

Under Settings → Appearance you change how the app looks. The settings apply to this device only.

- Theme: light, dark or automatic.
- Accent colour: the colour of selected tabs, buttons, switches and the tick circles. The default is blue. Pick one of the colours or tap the colour wheel for your own. Plus and minus always stay green and red, whatever accent colour you choose.
- Background colour: the colour behind the cards. The default is grey. You can pick your own colour here too.
- Transparency: the slider sets how see-through the glass parts are: the bar at the bottom, the scan button and the messages. The cards are not affected. In the middle position the bar is almost clear like in iOS. If your device has "Reduce transparency" switched on, the glass stays frosted.

- Blur: the second slider sets how strongly the glass blurs what is behind it. The middle position is a light blur like in iOS; move it down for almost sharp glass or up for frostier glass. It works together with the transparency slider. With "Reduce transparency" switched on the glass stays frosted and both sliders have no effect.

The search bars have the same glass look as the bottom bar and follow both sliders. They stay at the top while you scroll.

The text follows the text size of your device (iOS: Settings → Display & Brightness → Text Size; Android: font size). Pinching to zoom stays off.

The bar at the bottom folds into a small circle with the current icon while you scroll down and opens again when you scroll up or tap it.

While you press a switch, a tick circle or the slider knob, a glass bubble appears around it, as you know it from iOS.