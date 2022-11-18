import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, TimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { useNavigate } from "react-router-dom";
import React from "react";
import dayjs from "dayjs";
import api from "../api";

function NewTradenote(props) {
   const [begintime, setBegintime] = React.useState(dayjs(new Date()))
   const [endtime, setEndtime] = React.useState(dayjs(new Date()))
   let navigate = useNavigate();

   function handleBeginDateChange(newValue) {
      setBegintime(newValue)
   }

   function handleEndDateChange(newValue) {
      setEndtime(newValue)
   }

   function handleCancel(e) {
      e.preventDefault()
      navigate("..")
   }

   function handleSubmit(e) {
      document.getElementById("errorMessage").textContent = ""
      e.preventDefault();

      api.createNewTradenote(new FormData(document.getElementById('newTradenoteForm')))
         .then(response => {
            console.log(response);

            if (response.ok) {
               response.json().then(result => {
                  navigate(`../tradenote/${result.id}`)
               })
            } else {
               response.json().then(result => {
                  document.getElementById("errorMessage").textContent = result.message
               })
            }
         })
         .catch(error => {
            console.log('error', error)
            return error;
         });
   }

   return (
      <div className="w-full h-full">
         <form id="newTradenoteForm" name="newTradenoteForm">
            <div className="m-4 mt-12">
               <h2 className="font-bold text-4xl">Add a new tradenote.</h2>
            </div>
            <div className="m-4 flex flex-col">
               <label className="text-sm my-1 font-bold text-gray-400">Title</label>
               <TextField id="title" className="w-[300px] bg-gray-100" variant="outlined" />
            </div>
            <div className="m-4 flex flex-col">
               <label className="text-sm my-1 font-bold text-gray-400">Summary</label>
               <TextField id="summary" multiline minRows={3} className="w-[700px] max-w-full bg-gray-100" variant="outlined" />
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
               <div className="m-4 flex">
                  <div className="mr-1 flex flex-col">
                     <label className="text-sm my-1 font-bold text-gray-400">Begin Date</label>
                     <DatePicker id="begindate"
                        className="mx-4 bg-gray-100"
                        value={begintime}
                        onChange={handleBeginDateChange}
                        renderInput={(params) => <TextField {...params} />}
                     />
                  </div>
                  <div className="ml-1 flex flex-col">
                     <label className="text-sm my-1 font-bold text-gray-400">Begin Time</label>
                     <TimePicker id="begintime"
                        className="mx-4 bg-gray-100"
                        value={begintime}
                        onChange={handleBeginDateChange}
                        renderInput={(params) => <TextField {...params} />}
                     />
                  </div>
               </div>
               <div className="m-4 flex">
                  <div className="mr-1 flex flex-col">
                     <label className="text-sm my-1 font-bold text-gray-400">End Date</label>
                     <DatePicker id="enddate"
                        className="mx-4 bg-gray-100"
                        value={endtime}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                     />
                  </div>
                  <div className="ml-1 flex flex-col">
                     <label className="text-sm my-1 font-bold text-gray-400">End Time</label>
                     <TimePicker id="endtime"
                        className="mx-4 bg-gray-100"
                        value={endtime}
                        onChange={handleEndDateChange}
                        renderInput={(params) => <TextField {...params} />}
                     />
                  </div>
               </div>
            </LocalizationProvider>
            <div className="m-4">
               <p>You'll be able to add individual trades and properties once the tradenote has been created.</p>
            </div>
            <div id="errorMessage" className="m-4 text-red-500"></div>
            <div className="m-4">
               <Button style={{ marginRight: "15px" }} variant="contained" onClick={handleSubmit}>Submit</Button>
               <Button variant="text" onClick={handleCancel}>Cancel</Button>
            </div>
         </form>
      </div>
   );
}

export default NewTradenote;