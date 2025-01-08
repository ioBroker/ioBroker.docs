---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_040_contibution/010_how_to_debug_gui.md
title: no title
hash: H0Uwim6qC08JSQ92nYWdkKtgfeTl+Tsi7vR62Z6ujCA=
---
## Report errors in the graphical interface
ioBroker has many graphical interfaces written in JavaScript.

Currently, many interfaces are developed with ReactJS.
If an error occurs in such an interface, or the reaction freezes or the page behaves unexpectedly, then you can and should report the error.

To do this, you have to open the browser console and find the error messages there.
The browser console is different in every browser, but most browsers have the console in the developer view and the developer view is usually accessible with F12 (Chrome, Firefox, Edge).

It is important to **first open the browser console, then reload the page (F5)* and then perform the actions that are causing the error.

This is what the browser console looks like in Chrome: ![browser console in Chrome](../../../de/faq/_040_contibution/media/010_browser_console.png)

This is what an error message looks like if the console is opened after the page has loaded: ![Errors without sources](../../../de/faq/_040_contibution/media/010_browser_without_sources.png)

And so, if the console is opened before the page loads: ![errors with sources](../../../de/faq/_040_contibution/media/010_browser_with_sources.png)

As you can see, it shows the file name and line number where the error occurs.

With this information (along with the adapter version number) we can reproduce or fix the error.