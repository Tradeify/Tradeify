import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

class Login extends React.Component {
   render() {
      return (
         <div className="w-full py-2 px-5 h-full">
            <form className="flex flex-col h-full">
               <AccountCircleIcon style={{
                  fontSize: '120px',
                  alignSelf: 'center'
               }} />
               <label className="flex flex-row justify-between pb-2 pt-6">
                  Username:
                  <input type='text' className="rounded-md border-2 border-black p-1" name="username" />
               </label>
               <label className="flex flex-row justify-between py-2">
                  Password:
                  <input type='password' className="rounded-md border-2 border-black p-1" name="password" />
               </label>
               <div className="flex flex-row justify-evenly py-3">
                  <button className="rounded-md border-2 border-black w-24" type="submit" >Log In</button>
                  <button className="rounded-md border-2 border-black w-36" type="submit" >Create Account</button>
               </div>
            </form>
         </div>
      );
   }
}

export default Login