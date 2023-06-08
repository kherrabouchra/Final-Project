import { Notification } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export const NotificationMantine = ({ notification, id }) => {

  console.log(notification);
  return (
    <>
      {/* <Notification color="indigo" radius="md" title="We notify you that">
        You are now obligated to give a star to Mantine project on GitHub
      </Notification> */}

      <Notification key={id} icon={<IconCheck size="1.2rem" />} color="indigo" style={{margin:"0.5rem"}} radius="md" title={notification.title}>
        {notification.name }
      </Notification>
    </>
  );
}
