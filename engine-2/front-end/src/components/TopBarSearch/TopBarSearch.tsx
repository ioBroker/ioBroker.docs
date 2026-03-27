import { Box, TextField, InputAdornment, type BoxProps } from '@mui/material';
import SearchIcon from '../../assets/img/whiteSearchIcon.svg';
import { useStyles } from './TopBarSearch.styles';

interface TopBarSearchProps {
    value: string;
    onChange: (value: string) => void;
    isMenuCollapsed?: boolean | undefined;
    isFluid?: boolean;
    sx?: BoxProps['sx'];
}

export const TopBarSearch = ({ value, onChange, isMenuCollapsed, isFluid, sx }: TopBarSearchProps): React.ReactNode => {
    const { classes } = useStyles({ isMenuCollapsed, isFluid });
    return (
        <Box className={classes.topBarSearch}>
            <TextField
                sx={sx}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder=""
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment
                                position="start"
                                sx={{ marginLeft: '8px' }}
                            >
                                <img
                                    alt="Search Icon"
                                    src={SearchIcon}
                                />
                            </InputAdornment>
                        ),
                    },
                }}
            />
        </Box>
    );
};
