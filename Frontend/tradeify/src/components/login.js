import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import api from "../api";

function Login(props) {
   const [loginError, setLoginError] = React.useState(false);

   function logUserIn(e) {
      e.preventDefault()

      api.login(new FormData(document.getElementById('loginForm')))
         .then(result => {
            if (result.username) {
               setLoginError(false)
               props.onLoginSuccess(result)
            } else {
               setLoginError(true)
            }
         })
         .catch(error => {
            console.log('error', error)
            setLoginError(true)
         });
   }

   return (
      <div className="w-96 py-2 px-5">
         <form id="loginForm" name='loginForm' className="flex flex-col h-full">
            <AccountCircleIcon style={{
               fontSize: '120px',
               alignSelf: 'center'
            }} />
            <label className="flex flex-row justify-between pb-2 pt-6">
               Username:
               <input type='text' id="username" className="rounded-md border-2 border-black p-1" name="username" />
            </label>
            <label className="flex flex-row justify-between py-2">
               Password:
               <input type='password' id="password" className="rounded-md border-2 border-black p-1" name="password" />
            </label>
            {loginError ? <label className="w-fit-content text-red-500">Error logging in. Please check your credentials</label> : null}
            <div className="flex flex-row justify-evenly py-3">
               <button className="rounded-md border-2 border-black w-24 hover:bg-red-700" onClick={logUserIn}>Log In</button>
               <Link to='/createuser'>
                  <button className="rounded-md border-2 border-black w-36 hover:bg-green-700">Create Account</button>
               </Link>
            </div>
         </form>
      </div>
   );
}

export default Login