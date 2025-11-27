import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './AdaptersSection.styles';
import { SectionTitle } from '../../../../components/SectionTitle/SectionTitle';
import { StyledButton } from '../../../../components/StyledButton/StyledButton';
import { useAdapters } from '../../../../api/hooks/useAdapters';
import { I18n } from '../../../../utils/i18n';

import icon1 from '../../../../assets/img/Alexa.svg';
import icon2 from '../../../../assets/img/Pillips_hue.svg';
import icon3 from '../../../../assets/img/javascript_1.svg';
import icon4 from '../../../../assets/img/telegram.svg';
import icon5 from '../../../../assets/img/image_418.svg';
import icon6 from '../../../../assets/img/image_422.svg';
import icon7 from '../../../../assets/img/image_415.svg';
import icon8 from '../../../../assets/img/image_416.svg';
import icon9 from '../../../../assets/img/image_419.svg';
import icon10 from '../../../../assets/img/image_417.svg';
import icon11 from '../../../../assets/img/image_412.svg';
import icon12 from '../../../../assets/img/image_420.svg';
import icon13 from '../../../../assets/img/image_413.svg';
import icon14 from '../../../../assets/img/image_414.svg';
import icon15 from '../../../../assets/img/image_421.svg';
import icon16 from '../../../../assets/img/image_424.svg';
import icon17 from '../../../../assets/img/image_425.svg';
import icon18 from '../../../../assets/img/image_426.svg';
import icon19 from '../../../../assets/img/image_427.svg';
import icon20 from '../../../../assets/img/image_428.svg';
import icon21 from '../../../../assets/img/image_429.svg';
import icon22 from '../../../../assets/img/image_430.svg';

interface AdapterIcon {
    src: string;
    width: number;
    height: number;
    alt?: string;
}

export const AdaptersSection: React.FC = () => {
    const { classes } = useStyles();
    const { data: adapters } = useAdapters();

    const totalAdapters = React.useMemo(() => {
        if (!adapters?.pages) return 680;
        return Object.values(adapters.pages).reduce((sum, category) => {
            return sum + (category?.pages ? Object.keys(category.pages).length : 0);
        }, 0);
    }, [adapters]);

    const adapterIcons: AdapterIcon[] = [
        { src: icon1, width: 48, height: 48, alt: 'Alexa' },
        { src: icon2, width: 48, height: 48, alt: 'Phillips Hue' },
        { src: icon3, width: 48, height: 48, alt: 'JavaScript' },
        { src: icon4, width: 60, height: 60, alt: 'Telegram' },
        { src: icon5, width: 48, height: 48, alt: 'Adapter 5' },
        { src: icon6, width: 60, height: 60, alt: 'Adapter 6' },
        { src: icon7, width: 48, height: 48, alt: 'Adapter 7' },
        { src: icon8, width: 48, height: 48, alt: 'Adapter 8' },
        { src: icon9, width: 60, height: 34, alt: 'Adapter 9' },
        { src: icon10, width: 50, height: 50, alt: 'Adapter 10' },
        { src: icon11, width: 60, height: 60, alt: 'Adapter 11' },
        { src: icon12, width: 48, height: 48, alt: 'Adapter 12' },
        { src: icon13, width: 48, height: 48, alt: 'Adapter 13' },
        { src: icon14, width: 60, height: 60, alt: 'Adapter 14' },
        { src: icon15, width: 60, height: 60, alt: 'Adapter 15' },
        { src: icon16, width: 48, height: 48, alt: 'Adapter 16' },
        { src: icon17, width: 48, height: 48, alt: 'Adapter 17' },
        { src: icon18, width: 48, height: 48, alt: 'Adapter 18' },
        { src: icon19, width: 60, height: 60, alt: 'Adapter 19' },
        { src: icon20, width: 48, height: 48, alt: 'Adapter 20' },
        { src: icon21, width: 48, height: 48, alt: 'Adapter 21' },
        { src: icon22, width: 60, height: 60, alt: 'Adapter 22' },
        { src: icon22, width: 60, height: 60, alt: 'Adapter 23' },
        { src: icon22, width: 60, height: 60, alt: 'Adapter 24' },
        { src: icon22, width: 60, height: 60, alt: 'Adapter 25' },
    ];

    const columnsDesktop = [4, 5, 4, 5, 4];
    const columnsMobile = [5, 5, 5, 5, 5];

    const renderGrid = (columns: number[], isMobile: boolean = false) => {
        let iconCounter = 0;
        const totalIcons = columns.reduce((sum, num) => sum + num, 0);
        const iconsToRender = [...adapterIcons];

        while (iconsToRender.length < totalIcons) {
            iconsToRender.push({ src: '', width: 0, height: 0 });
        }

        return columns.map((numIconsInColumn, colIndex) => {
            const columnIcons = iconsToRender.slice(iconCounter, iconCounter + numIconsInColumn);
            iconCounter += numIconsInColumn;

            const shouldOffset = isMobile ? colIndex % 2 === 0 : numIconsInColumn === 5;

            return (
                <Box
                    key={colIndex}
                    className={`${classes.adapterColumn} ${shouldOffset ? classes.offsetColumn : ''}`}
                >
                    {columnIcons.map((icon, itemIndex) => (
                        <Box
                            key={itemIndex}
                            className={classes.adapterIcon}
                        >
                            {icon.src ? (
                                <img
                                    src={icon.src}
                                    alt={icon.alt || `Adapter ${iconCounter - columnIcons.length + itemIndex + 1}`}
                                    className={classes.iconImage}
                                />
                            ) : null}
                        </Box>
                    ))}
                </Box>
            );
        });
    };

    return (
        <Box
            component="section"
            className={classes.adaptersSection}
        >
            <Box className={classes.container}>
                <Box className={classes.adaptersContent}>
                    <Box className={classes.adaptersTextSection}>
                        <SectionTitle>{I18n.t('home.adapters.title')}</SectionTitle>
                        <Typography
                            component="p"
                            sx={{ mt: 2 }}
                            className={classes.adaptersText}
                        >
                             /* {I18n.t('home.adapters.text')} */
                        </Typography>
                        <Box className={classes.buttonWrapperDesktop}>
                            <StyledButton
                                sx={{
                                    height: '60px',
                                    width: '100%',
                                    maxWidth: '867px',
                                    padding: '10px 24px',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            >
                                {totalAdapters}+ {I18n.t('home.adapters.word')}
                            </StyledButton>
                        </Box>
                    </Box>
                    <Box className={classes.adaptersGrid}>
                        <Box className={classes.desktopGrid}>{renderGrid(columnsDesktop, false)}</Box>
                        <Box className={classes.mobileGrid}>{renderGrid(columnsMobile, true)}</Box>
                    </Box>
                    <Box className={classes.buttonWrapperMobile}>
                        <Box className={classes.buttonGlow} />
                        <StyledButton
                            sx={{
                                height: { sm: '44px', xs: '44px' },
                                width: { sm: '500px', xs: '100%' },
                                maxWidth: '867px',
                                padding: '10px 24px',
                                borderRadius: '10px',
                                position: 'relative',
                                zIndex: 1,
                            }}
                        >
                            {totalAdapters}+ {I18n.t('home.adapters.word')}
                        </StyledButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
