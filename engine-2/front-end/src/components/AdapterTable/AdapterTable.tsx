import type React from 'react';
import type { AdapterItem } from '../AdapterItem/AdapterItem';
import { Box, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { I18n } from '../../utils/i18n';
import { Link } from 'react-router-dom';

export const AdapterTable = (props: { adapters: AdapterItem[] }): React.ReactNode => {
    return (
        <Box>
            <Table>
                <TableHead></TableHead>
                <TableBody>
                    {props.adapters.map(adapter => (
                        <TableRow key={adapter.title.en}>
                            <TableCell>
                                <Link to={`/adapters/${adapter.title.en}`}>
                                    <img
                                        src={`https://www.iobroker.net/en/${adapter.icon}`}
                                        alt={adapter.title[I18n.getLanguage()]}
                                    />
                                    {adapter.title[I18n.getLanguage()]}
                                </Link>
                            </TableCell>
                            <TableCell>{adapter.description[I18n.getLanguage()]}</TableCell>
                            <TableCell>{adapter.authors}</TableCell>
                            <TableCell>{adapter.installs}</TableCell>
                            <TableCell>{adapter.version}</TableCell>
                            <TableCell>{adapter.stars}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
};
