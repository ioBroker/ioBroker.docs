import { Box, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '../../assets/img/whiteSearchIcon.svg';
import { useStyles } from './TopBarSearch.styles';

interface TopBarSearchProps {
    value: string;
    onChange: (value: string) => void;
    isMenuCollapsed?: boolean | undefined;
}

export const TopBarSearch = ({ value, onChange, isMenuCollapsed }: TopBarSearchProps): React.ReactNode => {
    const { classes } = useStyles({ isMenuCollapsed });

    return (
        <Box className={classes.topBarSearch}>
            <TextField
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder=""
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start" sx={{ marginLeft: '8px' }}>
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
