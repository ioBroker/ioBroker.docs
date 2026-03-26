import type React from 'react';
import type { AdapterItem } from '../AdapterItem/AdapterItem';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { I18n } from '../../utils/i18n';
import { Link, useNavigate } from 'react-router-dom';
import { useStyles } from './AdapterTable.styles';

const stripEmails = (value: string): string => {
    return value.replace(/\s*<[^>]*>/g, '').replace(/\s{2,}/g, ' ').trim();
};
import StackIcon from '../../assets/img/whiteStack.svg';
import StarIcon from '../../assets/img/whiteStar.svg';
import DownloadIcon from '../../assets/img/whiteDownloadIcon.svg';

export const AdapterTable = (props: { adapters: AdapterItem[] }): React.ReactNode => {
    const { classes } = useStyles();
    const language = I18n.getLanguage();
    // const navigate = useNavigate();

    // const handleNavigate = () => {
    //     if (slug) {
    //         navigate(`/adapters/${slug}`);
    //     }
    // };

    return (
        <Box className={classes.tableContainer}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        <TableCell className={classes.nameCell}>Name</TableCell>
                        <TableCell className={classes.descriptionCell}>Beschreibung</TableCell>
                        <TableCell className={classes.authorCell}>Entwickler</TableCell>
                        <TableCell className={classes.statsCell}>
                            <Box className={classes.headerIcon}>
                                <img src={DownloadIcon} alt="Downloads" />
                            </Box>
                        </TableCell>
                        <TableCell className={classes.statsCell}>
                            <Box className={classes.headerIcon}>
                                <img src={StackIcon} alt="Version" />
                            </Box>
                        </TableCell>
                        <TableCell className={`${classes.statsCell} ${classes.lastCell}`}>
                            <Box className={classes.headerIcon}>
                                <img src={StarIcon} alt="Stars" />
                            </Box>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.adapters.map(adapter => {
                        const title =
                            adapter.title?.[language] ||
                            adapter.title?.en ||
                            adapter.title?.de ||
                            adapter.title?.ru ||
                            '';
                        const slug = adapter.title?.en || title;
                        const description =
                            adapter.description?.[language] ||
                            adapter.description?.en ||
                            adapter.description?.de ||
                            adapter.description?.ru ||
                            '';
                        return (
                            <TableRow className={classes.tableRow} key={slug}>
                                <TableCell className={classes.nameCell}>
                                    <Link
                                        to={`/adapters/${slug}`}
                                        className={classes.nameContent}
                                    >
                                        <Box className={classes.adapterIcon}>
                                            <img
                                                src={`https://www.iobroker.net/en/${adapter.icon}`}
                                                alt={title}
                                            />
                                        </Box>
                                        <Box className={classes.adapterName}>
                                            {title}
                                        </Box>
                                    </Link>
                                </TableCell>
                                <TableCell className={classes.descriptionCell}>
                                    <Link
                                        to={`/adapters/${slug}`}
                                        className={classes.nameContent}
                                    >
                                        {description}
                                    </Link>
                                </TableCell>
                                <TableCell className={classes.authorCell}>
                                    <Link
                                        to={`/adapters/${slug}`}
                                        className={classes.nameContent}
                                    >
                                        {stripEmails(adapter.authors || '')}
                                    </Link>
                                </TableCell>
                                <TableCell className={classes.statsCell}>
                                    <Link
                                        to={`/adapters/${slug}`}
                                    >
                                        {adapter.installs}
                                    </Link>
                                </TableCell>
                                <TableCell className={classes.statsCell}>
                                    <Link
                                        to={`/adapters/${slug}`}
                                    >
                                        {adapter.version}
                                    </Link>
                                </TableCell>
                                <TableCell className={`${classes.statsCell} ${classes.lastCell}`}>
                                    <Link
                                        to={`/adapters/${slug}`}
                                    >
                                        {adapter.stars}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Box>
    );
};
