import React from "react";
import { Outlet } from "react-router-dom";

function PageSwitcher() {
   return (
      <div className="p-4 opacity-60 w-full h-full">
         <div className="w-full py-2 px-5 h-full">
            <div className="flex flex-col h-full justify-center items-center">
               <Outlet />
            </div>
         </div>
      </div>
   );
}

export default PageSwitcher;