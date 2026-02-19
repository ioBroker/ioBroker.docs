import { Box } from '@mui/material';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';

const DocsPage = (): React.ReactNode => {
    return (
        <Box>
            <SectionTitle>{I18n.t('home.docs.title')}</SectionTitle>
        </Box>
    );
};

export default DocsPage;
