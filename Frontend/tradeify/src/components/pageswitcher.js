import React from "react";
import { Outlet } from "react-router-dom";

function PageSwitcher() {
   return (
      <div className="px-2 py-1 w-full h-full">
         <div className="flex flex-col h-full justify-center items-center">
            <Outlet />
         </div>
      </div>
   );
}

export default PageSwitcher;