import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
 function BasicDateCalendar(props) {
 const{currentDate, setCurrentDate}= props; 
 const {edit,setEdit}= props;
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={currentDate} onChange={(newDate)=>{setCurrentDate(newDate);
      setEdit(false)} } />
    </LocalizationProvider>
  );
}
export default BasicDateCalendar;