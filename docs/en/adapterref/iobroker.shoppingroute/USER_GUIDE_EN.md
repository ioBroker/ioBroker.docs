---
chapters: {"pages":{"en/adapterref/iobroker.shoppingroute/README.md":{"title":{"en":"ShoppingRoute for ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README.md"},"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md":{"title":{"en":"ShoppingRoute – User Guide"},"content":"en/adapterref/iobroker.shoppingroute/USER_GUIDE_EN.md"},"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md":{"title":{"en":"ShoppingRoute – Bedienungsanleitung"},"content":"en/adapterref/iobroker.shoppingroute/BEDIENUNGSANLEITUNG_DE.md"},"en/adapterref/iobroker.shoppingroute/README_DE.md":{"title":{"en":"ShoppingRoute für ioBroker"},"content":"en/adapterref/iobroker.shoppingroute/README_DE.md"}}}
---
# ShoppingRoute – User Guide

**Applies to version 0.5.0 and newer**

ShoppingRoute helps turn a normal Alexa shopping list into a list that follows the way you actually shop.

## Why ShoppingRoute actually makes shopping easier

The main benefit is not simply having a “sorted list”. ShoppingRoute can reflect your **real shopping habits**.

### All stores in one list – or split across several lists

You can keep **all purchases for several stores in one Alexa shopping list**. ShoppingRoute still separates the items automatically by market.

Example:

**LIDL**
- Bananas
- Milk
- Yoghurt

**REWE**
- Vegan mince
- Olives

**PHARMACY**
- Painkillers

That means you do not have to switch between several lists while shopping.

If you prefer separate lists, that works too. For example, you can keep groceries in one list and hardware-store or pharmacy items in another. ShoppingRoute supports **both ways of working**.

### The key feature: your own route through every store

The most important difference compared with a normal shopping list is **market routing**.

For each store, you define the order in which you normally pass its sections.

If your LIDL starts with fruit and vegetables, followed by bakery, meat, dairy and finally frozen food, you can configure exactly that route.

ShoppingRoute then sorts your items to match **your personal walking route**.

The practical result is:

- less walking back and forth,
- less searching,
- fewer forgotten items,
- a calmer and clearer shopping list,
- and most importantly: **faster and more efficient shopping**.

Every store can have a completely different route because a REWE is not laid out like a LIDL or ALDI. ShoppingRoute is designed to handle exactly that.

Instead of one long unsorted list such as:

- Milk
- Screws
- Bananas
- Yoghurt
- Tomatoes

ShoppingRoute can turn it into something like:

**LIDL**
- Bananas
- Tomatoes
- Milk
- Yoghurt

**HARDWARE STORE**
- Screws

You do not need to know how the sorting works internally, and you do not need to program anything.

---

## 1. The important things first

To get started, you only need five things:

1. a working **Alexa2 instance** in ioBroker,
2. at least one Alexa shopping list,
3. the stores where you normally shop,
4. product groups such as **Fruit/vegetables**, **Dairy products** or **Drinks**,
5. the order in which you usually walk through each store.

ShoppingRoute then uses that information to sort your list.

### One important setting in the Alexa app

Open the shopping list in the Alexa app and set its sorting to **A–Z**.

This may look unusual, but ShoppingRoute uses the alphabetical order to create the shopping order you configured.

You do not need to understand the technical details behind this.

### What does “Dry Run” mean?

**Dry Run is a safe test mode.**

While Dry Run is enabled, ShoppingRoute may **read and plan** your Alexa list, but it is **not allowed to change it**.

That makes it ideal during setup:

- You configure stores, products and routes.
- ShoppingRoute shows what it would do.
- Your real Alexa list stays untouched.

Once everything looks correct, you disable Dry Run. Only then may ShoppingRoute actually reorganize the list.

Think of Dry Run as a preview before printing.

---

## 2. Where do I find everything?

Starting with version 0.5.0, ShoppingRoute has two separate areas.

### Adapter settings

Under **Instances → ShoppingRoute → wrench icon**, you find only the basic settings, for example:

- which Alexa2 instance is used,
- whether Dry Run is enabled,
- how unknown products are handled,
- general safety and API settings.

### ShoppingRoute management page

There is a dedicated **ShoppingRoute** entry in the ioBroker sidebar.

This is where you manage the things you use in everyday operation:

- **Shopping list**
- **Products**
- **Markets**
- **Product groups**
- **Routes**
- **Lists**
- **Review**

Changes made here are saved at runtime. The adapter does not need to be restarted.

---

## 3. Quick start – your first sorted list in about 10 minutes

### Step 1: Select Alexa2

Open the normal ShoppingRoute adapter settings.

Under **General**, select your Alexa2 instance and save.

If you have just changed the Alexa2 instance, reopen the page once afterwards.

### Step 2: Enable Dry Run

Enable:

**Dry Run – do not write to Alexa**

This allows you to set everything up safely.

### Step 3: Select the shopping list

Open the **ShoppingRoute management page** from the ioBroker sidebar and choose **Lists**.

Select the Alexa list ShoppingRoute should manage.

For many users, one list such as **SHOP** is enough.

### Step 4: Add your stores

Open **Markets** and enter the stores where you normally shop.

For example:

- LIDL
- ALDI
- REWE
- EDEKA
- PHARMACY
- HARDWARE STORE

ShoppingRoute stores market names in **UPPERCASE** automatically.

So entering “Lidl” or “Rewe” is fine.

### Step 5: Check product groups

Under **Product groups**, define areas that roughly match sections of a store.

For example:

- Fruit/vegetables
- Bread/bakery
- Meat/fish
- Dairy products
- Drinks
- Frozen products
- Household/hygiene
- Non-food
- Other

You do not need a perfect retail classification system. The groups only need to make sense for your shopping trip.

### Step 6: Set the walking route

Open **Routes**.

Choose a market, for example **LIDL**, and arrange the product groups in the order in which you normally walk through that store.

Example:

1. Fruit/vegetables
2. Bread/bakery
3. Meat/fish
4. Dairy products
5. Drinks
6. Frozen products

If your ALDI is arranged differently, ALDI simply gets its own route.

### Step 7: Check known products

Open **Products**.

A product can look like this:

**Milk**
- Product group: Dairy products
- Default market: LIDL
- Available markets: LIDL, ALDI, REWE

### Step 8: Test it

Add a few items through Alexa, for example:

- Bananas
- Milk
- Yoghurt
- Cola

Then open **Shopping list** in ShoppingRoute.

If the assignments look correct, disable Dry Run in the adapter settings.

From that moment on, ShoppingRoute may sort the real Alexa list.

---

## 4. The Shopping list page

The **Shopping list** page shows your current list grouped by market.

For example:

**LIDL**
- Bananas
- Tomatoes
- Milk
- Yoghurt

**REWE**
- Vegan mince

### Moving an item

If ShoppingRoute assigned an item to the wrong market, you can move it directly.

Depending on the view, you can use drag and drop, arrow buttons or a market selector.

A manual change has priority over the automatic assignment.

### Deleting an item

Use **Delete** to remove that entry from the current Alexa shopping list.

The product itself remains in the product catalogue and can be used again later.

---

## 5. Markets

Use **Markets** to manage the stores where you shop.

A market mainly contains:

- **Name**
- **Active**
- **Order**
- **Aliases**

### What are aliases?

Aliases are alternative names for the same store.

Example:

**REWE**

Aliases:
- Rewe Market
- Rewe Center

If you later say:

“Add milk at Rewe Center”

ShoppingRoute can still understand that you mean **REWE**.

### NO MARKET

**NO MARKET** is a fallback area.

Items can end up there when ShoppingRoute does not yet know which store they belong to.

---

## 6. Product groups

Product groups describe **where in the store an item is roughly located**.

Examples:

- Bananas → Fruit/vegetables
- Milk → Dairy products
- Cola → Drinks
- Frozen pizza → Frozen products

They matter because ShoppingRoute uses them to recreate your normal route through the store.

You do not need a perfect product database. The groups only need to be useful for real shopping.

---

## 7. Routes

A route is simply the order in which you pass the store sections.

Example for LIDL:

1. Fruit/vegetables
2. Bread/bakery
3. Meat/fish
4. Dairy products
5. Drinks
6. Frozen products

ShoppingRoute then tries to show the items in that same order.

Every market can have its own route.

---

## 8. Products

Use **Products** to manage the product catalogue.

For every product you can define:

### Name

The normal product name.

Example:

**Milk**

### Aliases

Other words that mean the same product.

Example for “Minced meat”:

- Mince
- Beef mince

### Product group

Where the item is located in the store.

Example:

Milk → Dairy products

### Default market

The store where you normally buy that product.

Example:

Milk → LIDL

### Available markets

Other stores where the same item can also be bought.

Example:

Milk:
- LIDL
- ALDI
- REWE

This gives ShoppingRoute more flexibility.

---

## 9. Naming a market directly through Alexa

You can explicitly tell ShoppingRoute where you want to buy an item.

For example:

- “Milk from REWE”
- “Cola at LIDL”
- “Eggs at ALDI”

An explicit market has priority over the normal automatic rules.

So even if you usually buy milk at LIDL, “Milk from REWE” stays assigned to REWE.

---

## 10. Quantities

You can use normal quantity expressions with Alexa.

For example:

- 2 milk
- 3 packs of milk
- two bottles of cola
- 1.5 kg potatoes
- 6x water
- half a kilo of minced meat

ShoppingRoute tries to recognize the actual product while keeping the quantity visible.

---

## 11. What happens with unknown products?

When you add something ShoppingRoute does not know yet, there are three possible behaviours.

You choose this in the normal adapter settings.

### Review first

The new item appears under **Review**.

This is the best option for beginners.

You can check:

- product name,
- product group,
- default market,
- additional available markets,
- aliases.

Then you can accept the product.

### Learn automatically

ShoppingRoute tries to add new products to the catalogue automatically.

This is convenient, but less transparent while you are still setting things up.

### Do not learn

Unknown products are not stored permanently.

---

## 12. Review

The **Review** page contains unknown or not-yet-confirmed products.

Example:

Alexa added “Skyr”, but ShoppingRoute does not know Skyr yet.

You can then define:

- Name: Skyr
- Product group: Dairy products
- Default market: LIDL
- Additional markets: ALDI, REWE

Use **Accept** to add the product permanently to the catalogue.

Use **Ignore** if you do not want ShoppingRoute to learn it.

---

## 13. Which market wins?

Most users do not need to think about this.

But if you want to understand why an item ended up in a certain store, ShoppingRoute roughly follows this order:

1. a market you explicitly named through Alexa,
2. the product's default market,
3. a temporary market selected for the current shopping trip,
4. the default market of the Alexa list,
5. the general default market,
6. another allowed market,
7. NO MARKET.

An explicitly named market always wins.

---

## 14. Safety

ShoppingRoute does not write blindly to your Alexa list.

If Amazon does not confirm a change or something looks inconsistent, ShoppingRoute can trigger a **safety stop**.

That means:

**ShoppingRoute stops making further changes instead of guessing.**

If you see a safety-stop message, first check the Alexa list and the error message.

A safety stop is a protection feature, not a data-loss event.

---

## 15. What are numbers such as “20>” in Alexa?

You may sometimes see entries such as:

`20> Milk`

or a heading such as:

`40> ═════ LIDL ═════`

ShoppingRoute uses these characters internally so Alexa displays the list in the desired order.

**You do not need to do anything with them.**

Do not manually change or remove these numbers while ShoppingRoute manages the list.

They are only a technical sorting trick.

---

## 16. What ShoppingRoute does not do

ShoppingRoute does not:

- automatically mark items as completed,
- place orders,
- buy anything,
- delete a product from the catalogue when you remove it from the current shopping list,
- require an adapter restart for normal product, market or route changes.

---

## 17. If something does not work

### The list is not being sorted

Check:

1. Is the Alexa list set to **A–Z** in the Alexa app?
2. Is the correct Alexa list enabled under **Lists**?
3. Is Dry Run still enabled?
4. Is the Alexa2 instance running?
5. Does ShoppingRoute show an error or safety stop?

### An item is assigned to the wrong market

Check the product under **Products**:

- default market,
- available markets,
- product group.

Or move the item directly on the Shopping list page.

### A new item is missing from Products

Look under **Review**.

If the learning mode is set to “Review first”, the item is waiting there for your confirmation.

### A button does not react

While ShoppingRoute is sending a change to Amazon, further changes are briefly blocked.

Wait until the current operation has finished and try again.

---

## 18. For advanced users

You do **not** need this section for normal operation.

### Temporary priority market

For a single shopping trip, a market can be preferred temporarily through:

`shoppingroute.0.control.temporaryPriorityMarket`

### Preview information

Technical preview information is available in:

`shoppingroute.0.info.preview`

`shoppingroute.0.info.previewText`

`shoppingroute.0.info.lastPlan`

### Configuration protection

Starting with version 0.5.0, the large catalogue data is additionally stored at runtime under:

`shoppingroute.0.data.managedConfig`

This protects markets, routes, products and other management data from silently falling back to package defaults during a faulty Admin or update operation.

### Sorting prefixes

Visible numbers from `00>` through `99>` are internal sorting keys.

ShoppingRoute uses them because Alexa does not offer a freely programmable list order. With the list set to **A–Z**, the numeric prefixes make Alexa display the items in the order ShoppingRoute calculated.

For normal use, you do not need to understand or manage these prefixes yourself.

---

## 19. Recommended setup for new users

For a new installation, we recommend:

1. Set the Alexa list to **A–Z**.
2. Enable Dry Run.
3. Add your markets.
4. Check the product groups.
5. Configure the routes.
6. Add a few typical products.
7. Check **Shopping list** and **Review**.
8. Disable Dry Run.
9. Try one real shopping trip.

After that, ShoppingRoute should handle most of the work automatically.

### Create lists and add items on your phone

**Lists → Create in Alexa** creates a real Alexa list, verifies Amazon's confirmation and immediately saves its ShoppingRoute binding. Existing names are reused. The list is then available in the Alexa mobile app.

In **Shopping list**, enter an item and tap **Add**, including on an empty list. ShoppingRoute adds it to the selected Alexa list and schedules sorting. Failed submissions retain your input; repeated taps do not create duplicate requests. Dry Run and write protection remain effective. Missing Alexa bindings do not stop healthy lists.