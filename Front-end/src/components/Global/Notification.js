import { Notification } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export const NotificationMantine=()=> {
  return (
    <>
      {/* <Notification color="indigo" radius="md" title="We notify you that">
        You are now obligated to give a star to Mantine project on GitHub
      </Notification> */}

      <Notification icon={<IconCheck size="1.2rem" />} color="indigo" radius="md" title="We notify you that">
        You are now obligated to give a star to Mantine project on GitHub
      </Notification>
    </>
  );
}