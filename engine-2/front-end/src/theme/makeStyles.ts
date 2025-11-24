import { createMakeAndWithStyles } from 'tss-react';
import { useTheme } from '@mui/material/styles';

export const { makeStyles, withStyles } = createMakeAndWithStyles({
    useTheme,
});
