import { TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import React from "react";
import dayjs from "dayjs";

function NewTradenote(props) {
   const [begintime, setBegintime] = React.useState(dayjs(new Date()))
   const [endtime, setEndtime] = React.useState(dayjs(new Date()))

   function handleBeginDateChange(newValue) {
      setBegintime(newValue)
   }

   function handleEndDateChange(newValue) {
      setEndtime(newValue)
   }

   return (
      <div className="w-full h-full">
         <div className="m-4">
            <h2 className="font-bold text-xl">Add a new tradenote.</h2>
         </div>
         <div className="m-4">
            <TextField id="title" label="Title" className="w-[300px]" variant="outlined" />
         </div>
         <div className="m-4">
            <TextField id="summary" label="Summary" multiline minRows={3} className="w-[700px] max-w-full" variant="outlined" />
         </div>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="m-4 flex">
               <div className="mr-1">
                  <DatePicker id="begindate" label="Begin Date"
                     value={begintime}
                     onChange={handleBeginDateChange}
                     renderInput={(params) => <TextField className="mx-4" {...params} />}
                  />
               </div>
               <div className="ml-1">
                  <TimePicker id="begintime" label="Begin Time"
                     value={begintime}
                     onChange={handleBeginDateChange}
                     renderInput={(params) => <TextField className="mx-4" {...params} />}
                  />
               </div>
            </div>
            <div className="m-4 flex">
               <div className="mr-1">
                  <DatePicker id="enddate" label="End Date"
                     value={endtime}
                     onChange={handleEndDateChange}
                     renderInput={(params) => <TextField className="mx-4" {...params} />}
                  />
               </div>
               <div className="ml-1">
                  <TimePicker id="endtime" label="End Time"
                     value={endtime}
                     onChange={handleEndDateChange}
                     renderInput={(params) => <TextField className="mx-4" {...params} />}
                  />
               </div>
            </div>
         </LocalizationProvider>
      </div>
   );
}

export default NewTradenote;