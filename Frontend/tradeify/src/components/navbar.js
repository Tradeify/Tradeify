import React from "react";
import Add from '@mui/icons-material/Add'
import ChevronLeft from '@mui/icons-material/ChevronLeft'
import ChevronRight from '@mui/icons-material/ChevronRight'
import MoreHoriz from '@mui/icons-material/MoreHoriz'
import TabIcon from '@mui/icons-material/Tab';

class NavBar extends React.Component {
   render() {
      return (
         <header className="flex flex-row justify-between w-full outline-slate-400 border-b-2 items-center">
            <div className="flex">
               <div>
                  <button className="p-2 text-slate-500"><ChevronLeft /></button>
                  <button className="p-2 text-slate-500"><ChevronRight /></button>
               </div>
               <div className="p-2 text-lg font-semibold h-fit">{this.props.title}</div>
            </div>
            <div className="flex flex-row">
               <button className="p-2 text-slate-500"><Add /></button>
               <button className="p-2 text-slate-500"><TabIcon /></button>
               <button className="p-2 text-slate-500"><MoreHoriz /></button>
            </div>
         </header>
      );
   }
}

export default NavBar