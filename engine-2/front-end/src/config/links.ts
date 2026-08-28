/**
 * External destinations that are used in more than one place.
 * The PayPal donate link carries a token from the ioBroker PayPal account -
 * when it is renewed, this is the only place that has to change.
 */
export const EXTERNAL_LINKS = {
    PAYPAL_DONATE:
        'https://www.paypal.com/donate?token=StbKXfs33nrQEu7hpBfFwl6Tf2YI1oxO-D5DVABgfo89uOULEu_UIqKvGiUuXObuThS3GvFTeseNjg4m',
    /** search link with the ioBroker affiliate tag */
    AMAZON: 'https://www.amazon.de/s?k=homematic&tag=httpwwwiobron-21',
} as const;
