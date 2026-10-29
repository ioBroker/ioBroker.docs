---
translatedFrom: de
translatedWarning: If you want to edit this document please delete "translatedFrom" field, elsewise this document will be translated automatically again
editLink: https://github.com/ioBroker/ioBroker.docs/edit/master/docs/en/faq/_040_contibution/010_how_to_debug_gui.md
title: no title
hash: eh141K6ZgUBSAOs1s5Ypj/mn6GJoohoZ3t/LHHuvcd0=
---
## Report errors in the graphical user interface

ioBroker has many graphical user interfaces written in JavaScript.

Many user interfaces are currently developed with ReactJS. If a bug occurs in such an interface, or the response freezes, or the page behaves unexpectedly, then you can and should report the bug.

To do this, you need to open the browser console and find the error messages there. The browser console looks different in each browser, but most browsers have the console in the developer view, which is usually accessible with F12 (Chrome, Firefox, Edge).

It is important that \* _the browser console is opened first, then the page is reloaded (F5)_ and then the actions that are causing the error are performed.

This is what the browser console looks like in Chrome:![Chrome browser console](../../../de/faq/_040_contibution/media/010_browser_console.png)

This is what an error message looks like if the console is opened only after the page has loaded:![Errors without sources](../../../de/faq/_040_contibution/media/010_browser_without_sources.png)

And so, if the console is opened before the page loads:![Errors with sources](../../../de/faq/_040_contibution/media/010_browser_with_sources.png)

As you can see, the filename and line number where the error occurs are displayed.

With this information (along with the adapter's version number), we can reproduce or fix the error.