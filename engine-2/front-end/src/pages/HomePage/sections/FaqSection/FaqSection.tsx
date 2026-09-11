import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './FaqSection.styles';
import { I18n } from '../../../../utils/i18n';
import ArrowIconSvg from '../../../../assets/img/arrowIcon.svg';

/** die Fragen, in der Reihenfolge, in der sie gestellt werden */
const QUESTIONS = ['1', '2', '5', '3', '7', '6', '8', '4', '9'] as const;

/**
 * Die vier Fragen, die vor der Installation am haeufigsten kommen. Sie stehen bewusst
 * nach den drei Schritten: wer bis hierher gelesen hat, will meistens noch eine dieser
 * vier Antworten, bevor er anfaengt. Die Liste nutzt `details`, also die Mechanik des
 * Browsers - ohne Skript, mit Tastatur bedienbar und fuer Suchmaschinen lesbar.
 */
export const FaqSection: React.FC = () => {
    const { classes } = useStyles();

    return (
        <Box
            component="section"
            className={classes.faqSection}
        >
            <Box className={classes.container}>
                <Typography
                    component="p"
                    className={classes.label}
                >
                    <span className={classes.labelSlashes}>{'//'}</span>
                    {I18n.t('home.faq.label')}
                </Typography>

                <Box className={classes.list}>
                    {QUESTIONS.map(question => (
                        <Box
                            component="details"
                            key={question}
                            className={classes.item}
                        >
                            <Box
                                component="summary"
                                className={classes.question}
                            >
                                {I18n.t(`home.faq.items.${question}.q`)}
                                <Box
                                    component="img"
                                    src={ArrowIconSvg}
                                    alt=""
                                    className={classes.sign}
                                    aria-hidden="true"
                                />
                            </Box>
                            <Typography className={classes.answer}>
                                {I18n.t(`home.faq.items.${question}.a`)}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
