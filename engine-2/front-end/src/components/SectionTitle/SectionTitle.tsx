import React from 'react';
import { styled, Typography, type SxProps, type Theme } from '@mui/material';

interface SectionTitleProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

/**
 * Built with MUI's `styled` rather than the `makeStyles` this project uses elsewhere, and
 * that is the point of the component.
 *
 * `makeStyles` hands its rules to the element as a `className`, which emotion composes
 * into the same class as `sx` - and composes last. Its rules therefore beat the caller's
 * `sx` with no hint that they do. Five pages had worked around that with `!important`, and
 * one page's value was silently ignored for months. `styled` emits its own class and lets
 * `sx` come after it in the stylesheet, so a caller overrides the ordinary way, including
 * the responsive steps below.
 *
 * If this ever moves back to `makeStyles`, the overrides in DocsPage, BlogPage,
 * StatisticsPage, InstallationPage, AdaptersPage and ProductOverviewPage stop working.
 */
const Root = styled(Typography)(({ theme }) => ({
    fontFamily: 'Audiowide, sans-serif',
    color: theme.palette.primary.main,
    letterSpacing: '-0.02em',
    fontWeight: 400,
    lineHeight: 1.1,
    fontSize: '36px',
    // One distance from a section title to the text under it, everywhere: 40 px.
    // Before this every section brought its own value and the element below added
    // its own margin on top - the measured gaps ran from 24 to 80 px.
    //
    // Deliberately not responsive. Emotion composes this component and the caller's `sx`
    // into a single class, and inside one class a media rule always beats a plain one - so
    // a step at `down('sm')` here would override every page's plain `marginBottom` on a
    // phone, which is exactly the silent override this component was rewritten to avoid.
    // A page that wants a different distance on a small screen writes its own media query.
    marginBottom: '40px',
    whiteSpace: 'nowrap',
    wordBreak: 'keep-all',
    overflowWrap: 'normal',
    [theme.breakpoints.down('md')]: {
        fontSize: '28px',
    },
    // On a phone a long title no longer fits on one line - "// ADAPTER- UND
    // ZUGANGSLIZENZEN" needs 473 px at 22 px and the column has 343. It wraps at the
    // spaces instead of being cut off; words themselves stay unbroken.
    // The size may stay responsive: the one page that overrides it (the product overview)
    // does so with its own media queries, and among media rules the caller's come later
    // and win.
    [theme.breakpoints.down('sm')]: {
        fontSize: '22px',
        whiteSpace: 'normal',
    },
}));

export const SectionTitle: React.FC<SectionTitleProps> = ({ children, sx }) => (
    <Root
        variant="h4"
        sx={sx}
    >
        {'//'} {children}
    </Root>
);
