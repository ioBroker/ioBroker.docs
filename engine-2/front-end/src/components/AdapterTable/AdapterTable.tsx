import type React from 'react';
import type { AdapterItem } from '../AdapterItem/AdapterItem';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { I18n } from '../../utils/i18n';
import { Link } from 'react-router-dom';
import { useStyles } from './AdapterTable.styles';
import StackIcon from '../../assets/img/whiteStack.svg';
import StarIcon from '../../assets/img/whiteStar.svg';
import DownloadIcon from '../../assets/img/whiteDownloadIcon.svg';

export const AdapterTable = (props: { adapters: AdapterItem[] }): React.ReactNode => {
    const { classes } = useStyles();

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
                    {props.adapters.map(adapter => (
                        <TableRow className={classes.tableRow} key={adapter.title.en}>
                            <TableCell className={classes.nameCell}>
                                <Link
                                    to={`/adapters/${adapter.title.en}`}
                                    className={classes.nameContent}
                                >
                                    <Box className={classes.adapterIcon}>
                                        <img
                                            src={`https://www.iobroker.net/en/${adapter.icon}`}
                                            alt={adapter.title[I18n.getLanguage()]}
                                        />
                                    </Box>
                                    <Box className={classes.adapterName}>
                                        {adapter.title[I18n.getLanguage()]}
                                    </Box>
                                </Link>
                            </TableCell>
                            <TableCell className={classes.descriptionCell}>
                                {adapter.description[I18n.getLanguage()]}
                            </TableCell>
                            <TableCell className={classes.authorCell}>
                                {adapter.authors}
                            </TableCell>
                            <TableCell className={classes.statsCell}>{adapter.installs}</TableCell>
                            <TableCell className={classes.statsCell}>{adapter.version}</TableCell>
                            <TableCell className={`${classes.statsCell} ${classes.lastCell}`}>
                                {adapter.stars}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};
