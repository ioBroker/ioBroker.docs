import React, { useState, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../assets/img/ioBroker-Title2.svg';
import { Box, Typography } from '@mui/material';
import { useStyles } from './HeroSection.styles';
import AmazonIcon from '../../../../assets/img/amazonBlue.svg';
import PayPalIcon from '../../../../assets/img/paypalBlue.svg';
import HousesGroup from '../../../../assets/img/Houses.webp';
import SmallHousesGroup from '../../../../assets/img/Houses-small.webp';
import { SupportModal } from '../../../../components/SupportModal/SupportModal';
import { CustomButton } from '../../../../components/Button/Button';
import { I18n } from '../../../../utils/i18n';

interface HeroSectionProps {
    sectionRef?: RefObject<HTMLElement | null>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ sectionRef }) => {
    const { classes } = useStyles();
    const navigate = useNavigate();
    const [supportModalOpen, setSupportModalOpen] = useState(false);

    return (
        <Box
            component="section"
            className={classes.heroSection}
            ref={sectionRef}
        >
            <Box className={classes.heroBackgroundImage} />
            <Box className={classes.heroBackgroundImageOverlay} />
            <Box className={classes.heroContentWrapper}>
                <Box className={`${classes.container} ${classes.heroContent}`}>
                    <Box className={classes.heroLeft}>
                        {/*
                            The three pictures of this section carry their own size, and the
                            browser needs it: the CSS gives them a width and leaves the height to
                            the picture, so until the file arrived the box was flat and everything
                            below it moved once it was not. That single jump was the whole layout
                            shift of the page (CLS 0.155, measured 18.09.2026). The numbers are the
                            pictures' own: 470 by 119 for the mark, 566 by 390 and 361 by 252 for
                            the houses; the browser reserves the room in that ratio and draws the
                            page once.
                        */}
                        <img
                            src={logo}
                            alt="ioBroker Logo"
                            width={470}
                            height={119}
                            className={classes.heroLogo}
                        />
                        <Box className={classes.smallHousesImageWrapper}>
                            <img
                                src={SmallHousesGroup}
                                alt="Houses"
                                width={361}
                                height={252}
                                className={classes.smallHousesImage}
                            />
                        </Box>
                        {/*
                            The claim of the page, in the order a first-time visitor
                            needs: what it is, what it does, how to start, and three pieces of
                            evidence for it. Until 11.09.2026 only the line
                            "// Open-Source-Plattform für Smart-Home-Automatisierung" stood here - true,
                            but it answers none of those questions.
                        */}
                        <Box className={classes.heroClaim}>
                            {/* the claim is the H1 of the page: one heading, the page's subject */}
                            <Typography
                                component="h1"
                                className={classes.heroHeadline}
                            >
                                {I18n.t('home.hero.headline')}
                                <br />
                                <span className={classes.heroHeadlineAccent}>{I18n.t('home.hero.headlineAccent')}</span>
                            </Typography>
                            <Typography
                                component="p"
                                className={classes.heroSubtitle}
                            >
                                {I18n.t('home.hero.subtitle')}
                            </Typography>
                            {/* button and evidence share one width: the group is as
                                wide as the evidence line, and the button fills it */}
                            <Box className={classes.heroCta}>
                                <CustomButton
                                    variant="primary"
                                    onClick={() => navigate('/installation')}
                                    className={classes.installButton}
                                >
                                    {I18n.t('home.hero.install')}
                                </CustomButton>
                                <Box className={classes.heroTrust}>
                                    {[
                                        ['home.hero.trustFreeStrong', 'home.hero.trustFree'],
                                        ['home.hero.trustAdaptersStrong', 'home.hero.trustAdapters'],
                                        ['home.hero.trustLocalStrong', 'home.hero.trustLocal'],
                                    ].map(([strong, rest]) => (
                                        <span key={strong}>
                                            <span className={classes.heroTrustSlashes}>{'//'}</span>
                                            <b>{I18n.t(strong)}</b> {I18n.t(rest)}
                                        </span>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box className={classes.heroRight}>
                        <Box className={classes.housesImageWrapper}>
                            <img
                                src={HousesGroup}
                                alt="Houses"
                                width={566}
                                height={390}
                                className={classes.housesImage}
                            />
                        </Box>
                        <Typography className={classes.supportText}>
                            {I18n.t('home.hero.free')} <br />
                            <span className={classes.supportTextStrong}>{I18n.t('home.hero.support')}</span>
                        </Typography>
                        <Box className={classes.supportIcons}>
                            <Box
                                className={classes.supportIconPayPal}
                                onClick={() => setSupportModalOpen(true)}
                            >
                                <img
                                    alt="PayPal Icon"
                                    src={PayPalIcon}
                                    className={classes.paypalIconImage}
                                />
                            </Box>
                            <Box
                                className={classes.supportIconAmazon}
                                onClick={() => setSupportModalOpen(true)}
                            >
                                <img
                                    alt="Amazon Icon"
                                    src={AmazonIcon}
                                    className={classes.amazonIconImage}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <SupportModal
                open={supportModalOpen}
                onClose={() => setSupportModalOpen(false)}
            />
        </Box>
    );
};
