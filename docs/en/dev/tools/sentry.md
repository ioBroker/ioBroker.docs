# Tools
## Sentry - Error reporting from live installations

Sentry provides automatic error reporting.

Adapter developers can request access to a ioBroker Sentry instance, use public Sentry.io or host an own installation of Sentry.

Sentry is already integrated into ioBroker's core component [JS-Controller](https://github.com/ioBroker/ioBroker.js-controller).

So the usage of Sentry for an Adapter is very easy by adding a few lines to io-package.json.

In this basic configuration, Sentry receives events about uncatched exceptions and unhandled promises.

It is also possible to send own errors and additional events. The information can be enhanced by breadcrumbs during execution of the Adapters' code.

Find more information about ioBroker Sentry here:

https://github.com/ioBroker/plugin-sentry
