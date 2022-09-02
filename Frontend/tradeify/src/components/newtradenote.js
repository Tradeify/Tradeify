import { TextField } from "@mui/material";
import React from "react";

function NewTradenote(props) {
   return (
      <div className="w-full h-full">
         <TextField id="Title" label="Title" className="w-full" variant="outlined" />
      </div>
   );
}

export default NewTradenote;