/**
 * External destinations that are used in more than one place.
 * The PayPal donate link carries a token from the ioBroker PayPal account -
 * when it is renewed, this is the only place that has to change.
 */
export const EXTERNAL_LINKS = {
    /**
     * The donate button of the ioBroker PayPal account. Until 10.09.2026 this held a
     * `?token=...`; such a token belongs to a single donation session and is dead after a short
     * while - which is why the button led nowhere (Denis: "PayPal in the footer is wrong"). The
     * permanent form is the id of the hosted button; it comes from the form of the old site
     * (`cmd=_s-xclick`, `hosted_button_id=2EHHSVEKASKGC`).
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
