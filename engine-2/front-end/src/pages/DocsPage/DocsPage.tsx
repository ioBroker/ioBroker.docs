import { Box } from '@mui/material';
import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { I18n } from '../../utils/i18n';
import { DocsMenu } from '../../components/DocsMenu/DocsMenu';
import { docsData } from './DocsData';

const DocsPage = (): React.ReactNode => {
    return (
        <Box>
            <SectionTitle>{I18n.t('home.docs.title')}</SectionTitle>
            <DocsMenu docsData={docsData} />
        </Box>
    );
};

export default DocsPage;
