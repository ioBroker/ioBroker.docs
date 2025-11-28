import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button, Switch, useTheme } from '@mui/material';

import { I18n } from '../../utils/i18n';
import CookieIcon from '../icons/CookieIcon';


const getStyles = (theme: any): Record<string, any> => ({
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    button: {
        marginTop: '30px',
        fontSize: 16,
        width: 'calc(50% - 8px)',
        fontFamily: theme.typography.h1.fontFamily,
        textTransform: 'none',
        '&:hover': {
            color: theme.custom.textColorHover,
        },
    },
});

type PossibleSettings = '' | '-' | 'cms' | 'ms' | 'cm' | 'm';

export default function CookiesHint(props: { force?: boolean; onClose?: () => void }): React.JSX.Element | null {
    const theme = useTheme();
    const navigate = useNavigate();
    const styles = getStyles(theme);
    const [full, setFull] = useState<boolean>(false);
    const [commercial, setCommercial] = useState<boolean>(false);
    const [statistics, setStatistics] = useState<boolean>(false);
    // m - minimal
    // c - commercial
    // s - statistics
    // "-" - all declined
    const [acknowledged, setAcknowledged] = useState<PossibleSettings>(
        (window.localStorage.getItem('cookieUsage') as PossibleSettings) || '',
    );

    useEffect(() => {
        if (props.force || !acknowledged) {
            const settings: PossibleSettings = (window.localStorage.getItem('cookieUsage') as PossibleSettings) || '';
            // legacy
            if ((settings as any) === 'acknowledged') {
                setAcknowledged('');
            } else {
                setStatistics(settings.includes('s'));
                setCommercial(settings.includes('c'));
            }
        }
    }, [props.force]);

    if (
        (acknowledged && !props.force) ||
        window.location.pathname.includes('/imprint') ||
        window.location.pathname.includes('/policy')
    ) {
        return null;
    }

    return (
        <div
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 9999,
                backgroundColor: '#000000C0',
            }}
        >
            <Box
                sx={{
                    maxWidth: 650,
                    padding: '40px',
                    bottom: 20,
                    right: 20,
                    '@media (max-width: 750px)': {
                        maxWidth: 'calc(100% - 60px)',
                        bottom: 10,
                        right: 10,
                        padding: '20px',
                    },
                }}
                style={{
                    backgroundColor: theme.palette.secondary.main,
                    position: 'absolute',
                    color: theme.palette.text.primary,
                    zIndex: 1000,
                    width: '100%',
                    borderRadius: '24px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 32,
                        fontFamily: theme.typography.h1.fontFamily,
                        fontSize: 32,
                        marginBottom: 24,
                    }}
                >
                    <CookieIcon />
                    {I18n.t('Cookie-Time!')}
                </div>
                <div style={{ marginBottom: 20 }}>{I18n.t('cookie_text')}</div>
                {!full && !acknowledged ? (
                    <Box
                        onClick={() => setFull(true)}
                        sx={{
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            '&:hover': {
                                color: theme.custom.textColorHover,
                            },
                        }}
                    >
                        {I18n.t('Customize cookies')}
                    </Box>
                ) : null}
                {full || acknowledged ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <div>{I18n.t('Required cookies')}</div>
                        <Switch
                            sx={{
                                '&.MuiSwitch-root': {
                                    padding: '9px',
                                },
                                '& .Mui-checked .MuiSwitch-thumb': {
                                    backgroundColor: theme.palette.text.primary,
                                },
                                '& .MuiSwitch-track': {
                                    borderRadius: '50px',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    backgroundColor: theme.palette.primary.main + ' !important',
                                    opacity: 1,
                                },
                                opacity: 0.7,
                            }}
                            checked
                            disabled
                        />
                    </div>
                ) : null}
                {full || acknowledged ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <div>{I18n.t('Marketing cookies')}</div>
                        <Switch
                            sx={{
                                '&.MuiSwitch-root': {
                                    padding: '9px',
                                },
                                '& .Mui-checked .MuiSwitch-thumb': {
                                    backgroundColor: theme.palette.text.primary,
                                },
                                '& .MuiSwitch-track': {
                                    borderRadius: '50px',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    backgroundColor: commercial ? theme.palette.primary.main + ' !important' : 'transparent',
                                    opacity: 1,
                                },
                            }}
                            checked={commercial}
                            onChange={() => setCommercial(!commercial)}
                        />
                    </div>
                ) : null}
                {full || acknowledged ? (
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <div>{I18n.t('Statistics cookie')}</div>
                        <Switch
                            sx={{
                                '&.MuiSwitch-root': {
                                    padding: '9px',
                                },
                                '& .Mui-checked .MuiSwitch-thumb': {
                                    backgroundColor: theme.palette.text.primary,
                                },
                                '& .MuiSwitch-track': {
                                    borderRadius: '50px',
                                    border: `1px solid ${theme.palette.primary.main}`,
                                    backgroundColor: statistics ? theme.palette.primary.main + ' !important' : 'transparent',
                                    opacity: 1,
                                },
                            }}
                            checked={statistics}
                            onChange={() => setStatistics(!statistics)}
                        />
                    </div>
                ) : null}
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 20,
                        marginTop: 20,
                    }}
                >
                    {acknowledged || full ? (
                        <Button
                            variant="outlined"
                            sx={{
                                color: theme.palette.text.primary,
                                borderColor: theme.palette.text.primary,
                                ...styles.button,
                            }}
                            onClick={() => {
                                let value: PossibleSettings = 'm';
                                if (commercial && statistics) {
                                    value = 'cms';
                                } else if (statistics) {
                                    value = 'ms';
                                } else if (commercial) {
                                    value = 'cm';
                                }
                                window.localStorage.setItem('cookieUsage', value);
                                setAcknowledged(value);
                                props.onClose?.();
                            }}
                        >
                            {I18n.t('Save selection')}
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            sx={{
                                color: theme.palette.text.primary,
                                borderColor: theme.palette.text.primary,
                                ...styles.button,
                            }}
                            onClick={() => {
                                window.localStorage.setItem('cookieUsage', 'm');
                                setAcknowledged('m');
                                props.onClose?.();
                            }}
                        >
                            {I18n.t('Accept only required')}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        sx={{
                            ...styles.button,
                            backgroundColor: theme.palette.text.primary,
                            color: theme.palette.secondary.main,
                        }}
                        color="primary"
                        onClick={() => {
                            window.localStorage.setItem('cookieUsage', 'cms');
                            setAcknowledged('cms');
                            props.onClose?.();
                        }}
                    >
                        {I18n.t('Accept all')}
                    </Button>
                </div>
                <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
                    <Box
                        component="a"
                        sx={{
                            color: theme.palette.text.primary,
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                                color: theme.custom.textColorHover,
                            },
                        }}
                        href="/www/policy"
                        onClick={() => {
                            navigate('/www/policy');
                        }}
                    >
                        {I18n.t('Privacy policy')}
                    </Box>
                    <Box
                        component="a"
                        sx={{
                            color: theme.palette.text.primary,
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'underline',
                                color: theme.custom.textColorHover,
                            },
                        }}
                        href="/www/imprint"
                        onClick={() => {
                            navigate('/www/imprint');
                        }}
                    >
                        {I18n.t('Imprint')}
                    </Box>
                </div>
            </Box>
        </div>
    );
}
