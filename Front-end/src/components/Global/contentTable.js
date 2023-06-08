import { useState } from 'react';
import { IconGauge, IconFingerprint, IconActivity, IconChevronRight } from '@tabler/icons-react';
import { Box, NavLink } from '@mantine/core';

const data = [
  { icon: IconGauge, label: 'Dashboard', description: 'Item with description' ,
  rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
},
  {
    icon: IconFingerprint,
    label: 'Security',
    rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
  },
  { icon: IconActivity, label: 'Activity',
  rightSection: <IconChevronRight size="1rem" stroke={1.5} />,
},
];

export const  ContentNav=()=> {
  const [active, setActive] = useState(0);

  const items = data.map((item, index) => (
    <NavLink
      key={item.label}
      active={index === active}
      label={item.label}
      description={item.description}
      rightSection={item.rightSection}
      icon={<item.icon size="1rem" stroke={1.5} />}
      onClick={() => setActive(index)}
      color="violet" style={{background:'white', borderRadius:'10px'}}
      variant="subtle"
    />
  ));

  return <Box w={300}>{items}</Box>;
}