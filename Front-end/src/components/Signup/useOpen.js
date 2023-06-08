
import React from 'react' 
export const useOpen = () => {

    const [open, setOpen] = React.useState(true);
const handleOpen = (    ) =>   setOpen(true);
const handleClose = ( ) => setOpen(false);
 
  return (
    {open, handleClose, handleOpen}
  )
}

  
