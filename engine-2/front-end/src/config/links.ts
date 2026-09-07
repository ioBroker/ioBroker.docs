/**
 * External destinations that are used in more than one place.
 * The PayPal donate link carries a token from the ioBroker PayPal account -
 * when it is renewed, this is the only place that has to change.
 */
export const EXTERNAL_LINKS = {
    PAYPAL_DONATE:
        'https://www.paypal.com/donate?token=tsya9ABM_SZFGgI4p65nDcuOgcaZ8BETCzIJ-0knDi4UHglKX-SGE2v8Wazsxg5Wokum1JtcMQTH1cFb',
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
