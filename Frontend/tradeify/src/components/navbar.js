import React from "react";
import { ChevronLeft, ChevronRight, Add } from '@mui/icons-material'

class NavBar extends React.Component {
   render() {
      return (
         <header className="flex flex-row">
            <button><ChevronLeft /></button>
            <button><ChevronRight /></button>
            <div><h4>All Tradenotes</h4></div>
         </header>
      );
   }
}

export default NavBar