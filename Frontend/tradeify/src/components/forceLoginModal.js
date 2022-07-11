import React from "react";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function ForceLoginModal(props) {
   let navigate = useNavigate();

   function navigateToLogin() {
      props.onLoginAction();
      navigate('../login');
   }

   return (
      <div className="p-4 App bg-slate-300 opacity-60">
         <div className="w-full py-2 px-5 h-full">
            <div className="flex flex-col h-full justify-center items-center">
               <AccountCircleIcon style={{
                  fontSize: '120px',
               }} />
               <p className="p-4">You are not logged in. Please log in for the best experience</p>
               <button className="rounded-md border-2 border-black w-24 hover:bg-amber-700" onClick={navigateToLogin}>Login</button>
            </div>
         </div>
      </div>
   );
}

export default ForceLoginModal