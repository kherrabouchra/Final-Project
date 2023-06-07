import { TypographyStylesProvider } from '@mantine/core';

function Demo() {
  return (
    <TypographyStylesProvider>
      <div dangerouslySetInnerHTML={{ __html: '<p>Your html here</p>' }} />
    </TypographyStylesProvider>
  );
}