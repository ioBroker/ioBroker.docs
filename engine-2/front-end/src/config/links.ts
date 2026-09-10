/**
 * External destinations that are used in more than one place.
 * The PayPal donate link carries a token from the ioBroker PayPal account -
 * when it is renewed, this is the only place that has to change.
 */
export const EXTERNAL_LINKS = {
    /**
     * Der Spendenknopf des ioBroker-PayPal-Kontos. Bis zum 10.09.2026 stand hier ein
     * `?token=...`; ein solcher Token gehoert zu einer einzelnen Spendensitzung und ist
     * nach kurzer Zeit tot - deshalb fuehrte der Knopf ins Leere (Denis: "im Footer ist
     * PayPal falsch"). Die dauerhafte Form ist die Kennung des gehosteten Knopfes; sie
     * stammt aus dem Formular der alten Seite (`cmd=_s-xclick`,
     * `hosted_button_id=2EHHSVEKASKGC`).
     */
    PAYPAL_DONATE: 'https://www.paypal.com/donate/?hosted_button_id=2EHHSVEKASKGC',
    /** search link with the ioBroker affiliate tag */
    AMAZON: 'https://www.amazon.de/s?k=homematic&tag=httpwwwiobron-21',
    FORUM: 'https://forum.iobroker.net/',
    GITHUB: 'https://github.com/ioBroker',
    GITHUB_COMMUNITY: 'https://github.com/iobroker-community-adapters',
    FACEBOOK_GROUP: 'https://www.facebook.com/groups/440499112958264',
    FACEBOOK_PAGE: 'https://www.facebook.com/iobroker1/',
    DISCORD: 'https://discord.gg/HwUCwsH',
    INSTAGRAM: 'https://www.instagram.com/iobroker.gmbh/',
} as const;
