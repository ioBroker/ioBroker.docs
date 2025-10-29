import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './AdaptersSection.styles';
import { SectionTitle } from '../../components/SectionTitle';
import { StyledButton } from '../../components/StyledButton';

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
    ];

    const columns = [4, 5, 4, 5, 4];
    let iconCounter = 0;

    return (
        <Box component="section" className={classes.section}>
            <Box className={classes.container}>
                <Box className={classes.adaptersContent}>
                    <Box className={classes.adaptersText}>
                        <Box>
                            <SectionTitle>ADAPTER</SectionTitle>
                            <Typography paragraph sx={{ mt: 2 }}>
                                sind die Schnittstellen zu verschiedenen Geräten, Diensten und Technologien. Ein Adapter fungiert dabei wie
                                ein "Übersetzer", der Daten von einem spezifischen Gerät oder Protokoll in ein standardisiertes Format bringt, das ioBroker
                                versteht. Gleichzeitig ermöglicht er, dass Befehle von ioBroker an die Geräte oder Dienste weitergegeben werden können.
                            </Typography>
                        </Box>
                        <Box className={classes.buttonWrapper}>
                            <StyledButton sx={{
                                height:  '60px',
                                width: { md: '100%', sm: '500px', xs: '300px' } ,
                                maxWidth: '867px',
                                padding: '10px 24px',
                                borderRadius: '10px',
                                position: 'relative',
                                zIndex: 1,
                            }}>640+ ADAPTER</StyledButton>
                        </Box>
                    </Box>
                    <Box className={classes.adaptersGrid}>
                        {columns.map((numIconsInColumn, colIndex) => {
                            const columnIcons = adapterIcons.slice(iconCounter, iconCounter + numIconsInColumn);
                            iconCounter += numIconsInColumn;

                            return (
                                <Box
                                    key={colIndex}
                                    className={`${classes.adapterColumn} ${numIconsInColumn === 5 ? classes.offsetColumn : ''
                                        }`}
                                >
                                    {columnIcons.map((icon, itemIndex) => (
                                        <Box key={itemIndex} className={classes.adapterIcon}>
                                            {icon ? (
                                                <img
                                                    src={icon.src}
                                                    alt={icon.alt || `Adapter ${iconCounter - columnIcons.length + itemIndex + 1}`}
                                                    className={classes.iconImage}
                                                />
                                            ) : (
                                                <Box sx={{ width: 32, height: 32, opacity: 0.5 }}>Icon</Box>
                                            )}
                                        </Box>
                                    ))}
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};