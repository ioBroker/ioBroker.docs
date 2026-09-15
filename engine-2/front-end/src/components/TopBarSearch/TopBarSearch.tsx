import { Box, IconButton, InputAdornment, TextField, type BoxProps } from '@mui/material';
import { Close } from '@mui/icons-material';
import SearchIcon from '../../assets/img/whiteSearchIcon.svg';
import FilterIcon from '../icons/FilterIcon';
import { I18n } from '../../utils/i18n';
import { useStyles } from './TopBarSearch.styles';

interface TopBarSearchProps {
    value: string;
    onChange: (value: string) => void;
    isFluid?: boolean;
    sx?: BoxProps['sx'];
    /** Was im leeren Feld steht - es sagt, was das Feld tut */
    placeholder?: string;
    /**
     * Was das Feld tut. `search` fragt etwas ab, `filter` verkleinert eine Liste, die schon
     * da ist. Das Zeichen vorn richtet sich danach: Lupe oder Trichter.
     */
    variant?: 'search' | 'filter';
    /** Was Vorleseprogramme ansagen - das Zeichen vorn allein sagt es ihnen nicht */
    ariaLabel?: string;
    /**
     * Die Eingabetaste. Das Feld in der Doku filtert nur Titel; wer etwas sucht, das im Text
     * steht, kommt damit in die Volltextsuche, statt vor einer leeren Liste zu stehen.
     */
    onSubmit?: (value: string) => void;
}

export const TopBarSearch = ({
    value,
    onChange,
    isFluid,
    sx,
    placeholder,
    onSubmit,
    variant = 'search',
    ariaLabel,
}: TopBarSearchProps): React.ReactNode => {
    const { classes } = useStyles({ isFluid });
    return (
        <Box className={classes.topBarSearch}>
            <TextField
                sx={sx}
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder ?? ''}
                onKeyDown={event => {
                    if (event.key === 'Enter' && onSubmit) {
                        event.preventDefault();
                        onSubmit(value);
                    }
                }}
                slotProps={{
                    htmlInput: ariaLabel ? { 'aria-label': ariaLabel } : undefined,
                    input: {
                        startAdornment: (
                            <InputAdornment
                                position="start"
                                sx={{ marginLeft: '8px' }}
                            >
                                {variant === 'filter' ? (
                                    <Box
                                        component="span"
                                        sx={{ display: 'flex', color: 'text.secondary' }}
                                        aria-hidden="true"
                                    >
                                        <FilterIcon />
                                    </Box>
                                ) : (
                                    <img
                                        alt="Search Icon"
                                        src={SearchIcon}
                                    />
                                )}
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
