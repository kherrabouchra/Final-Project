// import { Avatar, Badge, Table, Group, Text, Select, ScrollArea } from '@mantine/core';
// import { SegmentedControl } from '@mantine/core';
// import { useState } from 'react';
// import { TransferList, TransferListData } from '@mantine/core';

// const initialValues: TransferListData = [
//   [
//     { value: 'react', label: 'React' },
//     { value: 'ng', label: 'Angular' },
//     { value: 'next', label: 'Next.js' },
//     { value: 'blitz', label: 'Blitz.js' },
//     { value: 'gatsby', label: 'Gatsby.js' },
//     { value: 'vue', label: 'Vue' },
//     { value: 'jq', label: 'jQuery' },
//   ]


// function Demo() {
//     const [data, setData] = useState<TransferListData>(initialValues);
//     return (
//       <TransferList
//         value={data}
//         onChange={setData}
//         searchPlaceholder="Search..."
//         nothingFound="Nothing here"
//         titles={['Frameworks', 'Libraries']}
//         breakpoint="sm"
//       />
//     );
//   }
// function SegmentedControl() {
//   return <SegmentedControl color="dark" />;
// }
// const UsersTableProps {
//   data: { avatar: string; name: string; job: string; email: string; role: string }[];
// }

// const rolesData = ['Manager', 'Collaborator', 'Contractor'];

// export function UsersRolesTable({ data }: UsersTableProps) {
//   const rows = data.map((item) => (
//     <tr key={item.name}>
//       <td>
//         <Group spacing="sm">
//           <Avatar size={40} src={item.avatar} radius={40} />
//           <div>
//             <Text fz="sm" fw={500}>
//               {item.name}
//             </Text>
//             <Text fz="xs" c="dimmed">
//               {item.email}
//             </Text>
//           </div>
//         </Group>
//       </td>

//       <td>
//         <Select data={rolesData} defaultValue={item.role} variant="unstyled" />
//       </td>
//       <td>{Math.floor(Math.random() * 6 + 5)} days ago</td>
//       <td>
//         {Math.random() > 0.5 ? (
//           <Badge fullWidth>Active</Badge>
//         ) : (
//           <Badge color="gray" fullWidth>
//             Disabled
//           </Badge>
//         )}
//       </td>
//     </tr>
//   ));

//   return (
//     <ScrollArea>
//       <Table miw={800} verticalSpacing="sm">
//         <thead>
//           <tr>
//             <th>Employee</th>
//             <th>Role</th>
//             <th>Last active</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </Table>
//     </ScrollArea>
//   );
// }