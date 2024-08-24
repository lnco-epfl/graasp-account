import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Stack, Typography } from '@mui/material';

import { useAccountTranslation } from '@/config/i18n';
import {
  GO_TO_HOME_LINK_ID,
  NOT_FOUND_MESSAGE_ID,
  NOT_FOUND_TEXT_ID,
} from '@/config/selectors';

const NotFoundPage = (): JSX.Element => {
  const { t } = useAccountTranslation();

  return (
    <Container
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Stack spacing={2} marginTop={5}>
        <Typography variant="h1" id={NOT_FOUND_TEXT_ID}>
          {t('NOT_FOUND_PAGE_TEXT')}
        </Typography>
        <Typography variant="body1" id={NOT_FOUND_MESSAGE_ID}>
          {t('NOT_FOUND_PAGE_MESSAGE')}
        </Typography>
        <Link to="/" id={GO_TO_HOME_LINK_ID}>
          {t('GO_TO_HOME_TEXT')}
        </Link>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;
