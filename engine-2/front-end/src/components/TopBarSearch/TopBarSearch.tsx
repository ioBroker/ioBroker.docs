import { Box, IconButton, InputAdornment, TextField, type BoxProps } from '@mui/material';
import { Close } from '@mui/icons-material';
import SearchIcon from '../../assets/img/whiteSearchIcon.svg';
import { I18n } from '../../utils/i18n';
import { useStyles } from './TopBarSearch.styles';

interface TopBarSearchProps {
    value: string;
    onChange: (value: string) => void;
    isFluid?: boolean;
    sx?: BoxProps['sx'];
}

export const TopBarSearch = ({ value, onChange, isFluid, sx }: TopBarSearchProps): React.ReactNode => {
    const { classes } = useStyles({ isFluid });
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
                        // Only while there is something to clear: an always-visible cross next to
                        // an empty field is a button that does nothing.
                        endAdornment: value ? (
                            <InputAdornment position="end">
                                <IconButton
                                    size="small"
                                    className={classes.clearButton}
                                    aria-label={I18n.t('search.clear')}
                                    title={I18n.t('search.clear')}
                                    onClick={() => onChange('')}
                                >
                                    <Close fontSize="small" />
                                </IconButton>
                            </InputAdornment>
                        ) : null,
                    },
                }}
            />
        </Box>
    );
};
