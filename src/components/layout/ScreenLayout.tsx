import { ReactNode } from 'react';

import { Container, Divider, Stack, Typography } from '@mui/material';

type ScreenLayoutProps = {
  id?: string;
  title: string;
  children: ReactNode;
};
const ScreenLayout = ({
  id,
  title,
  children,
}: ScreenLayoutProps): JSX.Element => (
  <Container maxWidth="lg" id={id}>
    <Stack spacing={2}>
      <Typography variant="h2" component="h1">
        {title}
      </Typography>
      <Divider />
      {children}
    </Stack>
  </Container>
);
export default ScreenLayout;
