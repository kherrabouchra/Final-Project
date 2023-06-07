import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
 
import { styled } from '@nextui-org/react';
import { useState, useEffect } from "react";
import AlertDialogModal from "../DiscardAlert";
import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DeleteForever from '@mui/icons-material/DeleteForever';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import Typography from '@mui/joy/Typography';
import api from "../../../api/api";
import dayjs from 'dayjs'
import { useLocation } from "react-router-dom";
export const EyeIcon = ({
  fill,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DeleteIcon = ({
  fill,
  size,
  height,
  width,
  ...props  
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 20 20"
      fill="none"  color="red"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
        stroke={fill}
        strokeWidth={1.5} 
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.60834 13.75H11.3833"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.91669 10.4167H12.0834"
        stroke={fill}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

// IconButton component will be available as part of the core library soon
export const IconButton = styled('button', {
  dflex: 'center',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: '0',
  margin: '0',
  bg: 'transparent',
  transition: '$default',
  '&:hover': {
    opacity: '0.8'
  },
  '&:open': {
    opacity: '0.6'
  }
});


// Badge component will be available as part of the core library soon
export const StyledBadge = styled('span', {
  display: 'inline-block',
  textTransform: 'uppercase',
  padding: '$2 $3',
  margin: '0 2px',
  fontSize: '10px',
  fontWeight: '$bold',
  borderRadius: '14px',
  letterSpacing: '0.6px',
  lineHeight: 1,
  boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 5%)',
  alignItems: 'center',
  alignSelf: 'center',
  color: '$white',
  variants: {
    type: {
      open: {
        bg: '$successLight',
        color: '$successLightContrast'
      },
      closed: {
        bg: '$errorLight',
        color: '$errorLightContrast'
      },upcoming: 
        {
          bg: '$warningLight',
          color: '$warningLightContrast'
        }
      
        // unscheduled: {
        //         bg: '$warningLight',
        //         color: '$warningLightContrast'
        //       }
    }
  },
  defaultVariants: {
    type: 'open'
  }
});

export const EditIcon = ({
  fill,
  size,
  height,
  width,
  ...props
}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
        stroke={fill}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
        stroke={fill}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 18.3333H17.5"
        stroke={fill}
        strokeWidth={1.5}
        strokeMiterlimit={10}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default function HackTableList() {
  const [hackathons, setHackathons] = useState([]);
  const location= useLocation();
  const user= location.state;
  console.log(user);
  const columns = [
    { name: "name", uid: "name" },
    { name: "participants", uid: "participants" },
    { name: "status", uid: "status" },
    { name: "actions", uid: "actions" },
  ];
  const[alert, setAlert]=useState('')
  const[id, setID]=useState('')
  const handleDelete = (index) => {
        setAlert(true);
        setID(index);
       
      };
        const handleConfirm=()=>{
        setAlert(false);
         const updatedItems = hackathons.filter(( i) => i.id !== id);
        setHackathons(updatedItems);
        } 
  
   
   useEffect(( ) => { 
      
      api.get(`/hackathons/instructor/${user.userID}`)
     .then(res => {
       setHackathons(res.data.data) 
       

     })
     .catch(err => console.log(err));
   },[user])


   
   const renderCell = (h, columnKey) => {
    const cellValue = h[columnKey];
    switch (columnKey) {
      case "name":
        return (
          <Col>
            <Row>
              <Text b size={18} css={{ tt: "capitalize" }}>
                {cellValue}
              </Text>
            </Row>
            <Row>
              <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
                Date of creation: {dayjs(h.creationDate).format('DD/MM/YYYY')}
              </Text>
            </Row>
          </Col>
        );
      case "participants":
        return (
          <Col>
            <Row>
              <Text b size={14} css={{ tt: "capitalize" }}>
                {!h.participants ? '0' :cellValue}
              </Text>
            </Row>
          </Col>
        );
      case "status":
        return <StyledBadge type={h.status}>{cellValue}</StyledBadge>;
      case "actions":
        return (
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              <Tooltip content="Details">
                <IconButton onClick={() => console.log("View")}>
                  <EyeIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip content="Edit ">
                <IconButton onClick={() => console.log("Edit user")}>
                  <EditIcon size={20} fill="#979797" />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Delete "
                color="error"
                onClick={() => handleDelete(h.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill="#FF0080" />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        );
      default:
        return cellValue;
    }

  };
  return (
  <>
  {hackathons.length!==0 && hackathons ? 
  (<React.Fragment>
   
       <Modal open={alert} onClose={() => setAlert(false)}>
       <ModalDialog
            variant="outlined"
            role="alertdialog"
            aria-labelledby="alert-dialog-modal-title"
            aria-describedby="alert-dialog-modal-description"
          >
            <Typography
              id="alert-dialog-modal-title"
              component="h2"
              startDecorator={<WarningRoundedIcon />}
            >
              Confirmation
            </Typography>
            <Divider />
            <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
              Are you sure you want to delete this hackathon?
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
              <Button variant="plain" color="neutral" onClick={() => setAlert(false)}>
                Cancel
              </Button>
              <Button variant="solid" color="danger" onClick={ handleConfirm}>
                Delete
              </Button>
            </Box>
          </ModalDialog>
        </Modal> 
    <Table   bordered
      aria-label="Example table with custom cells"
      css={{
        height: "auto",
        minWidth: "80%",
      }}
      selectionMode="none"
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={hackathons}>
  {hackathons.map((item) => (
    <Table.Row key={item.id}>
      {columns.map((column) => (
        <Table.Cell key={column.uid}>{renderCell(item, column.uid)}</Table.Cell>
      ))}
    </Table.Row>
  ))}
</Table.Body>

    </Table>
      </React.Fragment>):
      (

        <div style={{margin:'auto'}}>No hackathons.</div>
      )}</>
  );
}
// import { Table, Row, Col, Tooltip, User, Text } from "@nextui-org/react";
 
// import { styled } from '@nextui-org/react';
// import { useState, useEffect } from "react";
// import AlertDialogModal from "../DiscardAlert";
// import * as React from 'react';
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import Divider from '@mui/joy/Divider';
// import Modal from '@mui/joy/Modal';
// import ModalDialog from '@mui/joy/ModalDialog';
// import DeleteForever from '@mui/icons-material/DeleteForever';
// import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
// import Typography from '@mui/joy/Typography';
// import axios from 'axios'

// export const EyeIcon = ({
//   fill,
//   size,
//   height,
//   width,
//   ...props
// }) => {
//   return (
//     <svg
//       width={size || width || 24}
//       height={size || height || 24}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <path
//         d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
//         stroke={fill}
//         strokeWidth={1.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
//         stroke={fill}
//         strokeWidth={1.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };

// export const DeleteIcon = ({
//   fill,
//   size,
//   height,
//   width,
//   ...props
// }) => {
//   return (
//     <svg
//       width={size || width || 24}
//       height={size || height || 24}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <path
//         d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
//         stroke={fill}
//         strokeWidth={1.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
//         stroke={fill}
//         strokeWidth={1.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
//         stroke={fill}
//         strokeWidth={1.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M8.60834 13.75H11.3833"
//         stroke={fill}
//         strokeWidth={1.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M7.91669 10.4167H12.0834"
//         stroke={fill}
//         strokeWidth={1.5}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };

// // IconButton component will be available as part of the core library soon
// export const IconButton = styled('button', {
//   dflex: 'center',
//   border: 'none',
//   outline: 'none',
//   cursor: 'pointer',
//   padding: '0',
//   margin: '0',
//   bg: 'transparent',
//   transition: '$default',
//   '&:hover': {
//     opacity: '0.8'
//   },
//   '&:open': {
//     opacity: '0.6'
//   }
// });


// // Badge component will be available as part of the core library soon
// export const StyledBadge = styled('span', {
//   display: 'inline-block',
//   textTransform: 'uppercase',
//   padding: '$2 $3',
//   margin: '0 2px',
//   fontSize: '10px',
//   fontWeight: '$bold',
//   borderRadius: '14px',
//   letterSpacing: '0.6px',
//   lineHeight: 1,
//   boxShadow: '1px 2px 5px 0px rgb(0 0 0 / 5%)',
//   alignItems: 'center',
//   alignSelf: 'center',
//   color: '$white',
//   variants: {
//     type: {
//       open: {
//         bg: '$successLight',
//         color: '$successLightContrast'
//       },
//       closed: {
//         bg: '$errorLight',
//         color: '$errorLightContrast'
//       },
//        unscheduled: {
//         bg: '$warningLight',
//         color: '$warningLightContrast'
//       }
//     }
//   },
//   defaultVariants: {
//     type: 'open'
//   }
// });

// export const EditIcon = ({
//   fill,
//   size,
//   height,
//   width,
//   ...props
// }) => {
//   return (
//     <svg
//       width={size || width || 24}
//       height={size || height || 24}
//       viewBox="0 0 20 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       {...props}
//     >
//       <path
//         d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
//         stroke={fill}
//         strokeWidth={1.5}
//         strokeMiterlimit={10}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
//         stroke={fill}
//         strokeWidth={1.5}
//         strokeMiterlimit={10}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M2.5 18.3333H17.5"
//         stroke={fill}
//         strokeWidth={1.5}
//         strokeMiterlimit={10}
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };

//   const [filterRole, setFilterRole] = useState("all");

//   const handleFilterChange = (value) => {
//     setFilterRole(value);
//   };
//   const handleDelete = (index) => {
//     setAlert(true);
//     setID(index);
   
//   };
//     const handleConfirm=()=>{
//     setAlert(false);
//      const updatedItems = hackathons.filter(( i) => i.id !== id);
//     setHackathons(updatedItems);
//     }
  
//   const renderCell = (h, columnKey) => {
//     const cellValue = h[columnKey];
//     switch (columnKey) {
//       case "name":
//         return (
          
//       < Col>
//       {/* <User  name={cellValue} css={{ p: 0 }}>
//             {user.email}
//           </User> */}
//           <Row>
//             <Text b size={18} css={{ tt: "capitalize" }}>
//               {cellValue}
//             </Text>
//           </Row>
//           <Row>
//             <Text b size={13} css={{ tt: "capitalize", color: "$accents7" }}>
//             {h.creationDate}
//             </Text>
//           </Row>
//         </Col>
//         );
//       case "participantsNumber":
//         return (
//           <Col>
//             <Row>
//               <Text b size={14} css={{ tt: "capitalize" }}>
//               {h.participantsNumber}
//               </Text>
//             </Row>
           
//           </Col>
//         );
//       case "state":
//         return <StyledBadge type={h.state}>{cellValue}</StyledBadge>;

//       case "actions":
//         return (
//           <Row justify="center" align="center">
//             <Col css={{ d: "flex" }}>
//               <Tooltip content="Details">
//                 <IconButton onClick={() => console.log("View", h.id)}>
//                   <EyeIcon size={20} fill="#979797"/>
//                 </IconButton>
//               </Tooltip>
//             </Col>
//             <Col css={{ d: "flex" }}>
//               <Tooltip content="Edit ">
//                 <IconButton onClick={() => console.log("Edit user", h.id)}>
//                   <EditIcon size={20} fill="#979797" />
//                 </IconButton>
//               </Tooltip>
//             </Col>
//             <Col css={{ d: "flex" }}>
//               <Tooltip
//                 content="Delete "
//                 color="error"
//                 onClick={() => handleDelete(h.id)}
//               >
           
    
  
//                 <IconButton>
//                   <DeleteIcon size={20} fill="#FF0080" />
//                 </IconButton>
//               </Tooltip>
//             </Col>
//           </Row>
//         );
//       default:
//         return cellValue;
//     }
//   };

  

//   return ( <><React.Fragment>
   
//     <Modal open={alert} onClose={() => setAlert(false)}>
//       <ModalDialog
//         variant="outlined"
//         role="alertdialog"
//         aria-labelledby="alert-dialog-modal-title"
//         aria-describedby="alert-dialog-modal-description"
//       >
//         <Typography
//           id="alert-dialog-modal-title"
//           component="h2"
//           startDecorator={<WarningRoundedIcon />}
//         >
//           Confirmation
//         </Typography>
//         <Divider />
//         <Typography id="alert-dialog-modal-description" textColor="text.tertiary">
//           Are you sure you want to delete this hackathon?
//         </Typography>
//         <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
//           <Button variant="plain" color="neutral" onClick={() => setAlert(false)}>
//             Cancel
//           </Button>
//           <Button variant="solid" color="danger" onClick={ handleConfirm}>
//             Delete
//           </Button>
//         </Box>
//       </ModalDialog>
//     </Modal>
//   </React.Fragment>
//     <Table   bordered
//       aria-label="Example table with custom cells"
//       css={{
//         height: "auto",
//         minWidth: "80%",
//       }}
//       selectionMode="none"
//     >
//       <Table.Header columns={columns}>
//         {(column) => (
//           <Table.Column
//             key={column.uid}
//             hideHeader={column.uid === "actions"}
//             align={column.uid === "actions" ? "center" : "start"}
//           >
//             {column.name}
//           </Table.Column>
//         )}
//       </Table.Header>
//       <Table.Body items={hackathons}>
//         {(item) => (
//           <Table.Row>
//             {(columnKey) => (
//               <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
//             )}
//           </Table.Row>
//         )}
//       </Table.Body>
//     </Table>
    
//  </> );
// }
