import React from 'react';
import { Box, Typography } from '@mui/material';
import { useStyles } from './FaqSection.styles';
import { I18n } from '../../../../utils/i18n';
import ArrowIconSvg from '../../../../assets/img/arrowIcon.svg';

/** the questions, in the order in which they are asked */
const QUESTIONS = ['1', '2', '5', '3', '7', '6', '8', '4', '9'] as const;

/**
 * The four questions that come up most often before the installation. They deliberately stand
 * after the three steps: whoever has read this far usually wants one of these four answers before
 * starting. The list uses `details`, that is the mechanics of the browser - without a script,
 * operable with the keyboard and readable for search engines.
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
