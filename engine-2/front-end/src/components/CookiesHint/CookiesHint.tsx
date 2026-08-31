import React, { useCallback, useEffect, useState } from 'react';

import { Box, Switch } from '@mui/material';

import { I18n } from '../../utils/i18n';
import CookieIcon from '../icons/CookieIcon';
import { IMPRINT_LINK, PRIVACY_LINK } from '../../config/api';
import { useStyles } from './CookiesHint.styles';

/** m - minimal, c - commercial, s - statistics, "-" - all declined */
type PossibleSettings = '' | '-' | 'cms' | 'ms' | 'cm' | 'm' | 'acknowledged';

const STORAGE_KEY = 'cookieUsage';

/** the footer link opens the settings again, from wherever the banner is mounted */
export const COOKIE_SETTINGS_EVENT = 'iobroker-cookie-settings';

export const openCookieSettings = (): void => {
    window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
};

/** the banner never covers the pages that explain what it is about */
const isLegalPage = (): boolean => {
    const location = `${window.location.pathname}${window.location.hash}`;
    return location.includes('/imprint') || location.includes('/policy');
};

/** the three pieces of state the banner keeps, as they are stored in the browser */
const readStoredSettings = (): { acknowledged: PossibleSettings; commercial: boolean; statistics: boolean } => {
    const settings: PossibleSettings = (window.localStorage.getItem(STORAGE_KEY) as PossibleSettings) || '';
    // legacy value of the old website
    if ((settings as string) === 'acknowledged') {
        return { acknowledged: '', commercial: false, statistics: false };
    }
    return { acknowledged: settings, commercial: settings.includes('c'), statistics: settings.includes('s') };
};

export default function CookiesHint(props: { force?: boolean; onClose?: () => void }): React.JSX.Element | null {
    const { classes, cx } = useStyles();
    const [full, setFull] = useState<boolean>(false);
    const [reopened, setReopened] = useState<boolean>(false);
    const [commercial, setCommercial] = useState<boolean>(() => readStoredSettings().commercial);
    const [statistics, setStatistics] = useState<boolean>(() => readStoredSettings().statistics);
    const [acknowledged, setAcknowledged] = useState<PossibleSettings>(() => readStoredSettings().acknowledged);

    const readSettings = useCallback((): void => {
        const stored = readStoredSettings();
        setAcknowledged(stored.acknowledged);
        setCommercial(stored.commercial);
        setStatistics(stored.statistics);
    }, []);

    useEffect(() => {
        const onOpen = (): void => {
            readSettings();
            setFull(true);
            setReopened(true);
        };
        window.addEventListener(COOKIE_SETTINGS_EVENT, onOpen);
        return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, onOpen);
    }, [readSettings]);

    const close = (value: PossibleSettings): void => {
        window.localStorage.setItem(STORAGE_KEY, value);
        setAcknowledged(value);
        setReopened(false);
        setFull(false);
        props.onClose?.();
    };

    if ((acknowledged && !props.force && !reopened) || isLegalPage()) {
        return null;
    }

    const showOptions = full || !!acknowledged || !!props.force;

    return (
        <Box className={classes.overlay}>
            <Box className={classes.card}>
                <Box className={classes.titleRow}>
                    <CookieIcon />
                    <Box className={classes.title}>{I18n.t('cookies.title')}</Box>
                </Box>

                <Box className={classes.text}>{I18n.t('cookies.text')}</Box>

                {!showOptions && (
                    <Box
                        component="button"
                        type="button"
                        className={classes.customize}
                        onClick={() => setFull(true)}
                    >
                        {I18n.t('cookies.customize')}
                    </Box>
                )}

                {showOptions && (
                    <Box className={classes.options}>
                        <Box className={classes.option}>
                            <span>{I18n.t('cookies.required')}</span>
                            <Switch
                                className={classes.toggle}
                                checked
                                disabled
                            />
                        </Box>
                        <Box className={classes.option}>
                            <span>{I18n.t('cookies.marketing')}</span>
                            <Switch
                                className={classes.toggle}
                                checked={commercial}
                                onChange={() => setCommercial(!commercial)}
                            />
                        </Box>
                        <Box className={classes.option}>
                            <span>{I18n.t('cookies.statistics')}</span>
                            <Switch
                                className={classes.toggle}
                                checked={statistics}
                                onChange={() => setStatistics(!statistics)}
                            />
                        </Box>
                    </Box>
                )}

                <Box className={classes.buttons}>
                    {showOptions ? (
                        <Box
                            component="button"
                            type="button"
                            className={cx(classes.button, classes.buttonOutline)}
                            onClick={() => {
                                let value: PossibleSettings = 'm';
                                if (commercial && statistics) {
                                    value = 'cms';
                                } else if (statistics) {
                                    value = 'ms';
                                } else if (commercial) {
                                    value = 'cm';
                                }
                                close(value);
                            }}
                        >
                            {I18n.t('cookies.saveSelection')}
                        </Box>
                    ) : (
                        <Box
                            component="button"
                            type="button"
                            className={cx(classes.button, classes.buttonOutline)}
                            onClick={() => close('m')}
                        >
                            {I18n.t('cookies.acceptRequired')}
                        </Box>
                    )}

                    <Box
                        component="button"
                        type="button"
                        className={cx(classes.button, classes.buttonSolid)}
                        onClick={() => close('cms')}
                    >
                        {I18n.t('cookies.acceptAll')}
                    </Box>
                </Box>

                <Box className={classes.links}>
                    <Box
                        component="a"
                        className={classes.link}
                        href={PRIVACY_LINK}
                    >
                        {I18n.t('menu-policy')}
                    </Box>
                    <Box
                        component="a"
                        className={classes.link}
                        href={IMPRINT_LINK}
                    >
                        {I18n.t('menu-imprint')}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
