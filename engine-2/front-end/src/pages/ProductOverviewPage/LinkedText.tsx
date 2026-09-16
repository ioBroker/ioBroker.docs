import React from 'react';
import { Box, useTheme } from '@mui/material';

/**
 * Words in the translated texts of the license page that lead somewhere, and where. An adapter
 * opens in a new tab, like the "i" beside a line: the page keeps its scroll position and the
 * durations that were chosen.
 */
const LINKS: Record<string, { href: string; newTab: boolean }> = {
    'ioBroker.iot': { href: '/adapters/iot', newTab: true },
    'ioBroker.cloud': { href: '/adapters/cloud', newTab: true },
    'info@iobroker.net': { href: 'mailto:info@iobroker.net', newTab: false },
};

/** a word of LINKS inside a pattern - the dots in it are meant literally */
const escapeRegExp = (word: string): string => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const LINK_PATTERN = new RegExp(`(${Object.keys(LINKS).map(escapeRegExp).join('|')})`);

/** A translated text with every word of LINKS turned into a link */
const LinkedText = ({ text }: { text: string }): React.JSX.Element => {
    const theme = useTheme();

    return (
        <>
            {/* split with a capturing group puts the matched words at the odd positions */}
            {text.split(LINK_PATTERN).map((part, index) => {
                const link = index % 2 === 1 ? LINKS[part] : undefined;
                if (!link) {
                    return <React.Fragment key={index}>{part}</React.Fragment>;
                }
                return (
                    <Box
                        key={index}
                        component="a"
                        href={link.href}
                        target={link.newTab ? '_blank' : undefined}
                        rel={link.newTab ? 'noopener noreferrer' : undefined}
                        sx={{
                            color: theme.palette.primary.main,
                            textDecoration: 'none',
                            '&:hover': { textDecoration: 'underline' },
                            '&:focus-visible': {
                                outline: 'none',
                                boxShadow: theme.custom.focusRing,
                                borderRadius: '2px',
                            },
                        }}
                    >
                        {part}
                    </Box>
                );
            })}
        </>
    );
};

export default LinkedText;
