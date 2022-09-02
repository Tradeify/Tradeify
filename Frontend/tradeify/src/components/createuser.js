import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function CreateUser(props) {
   const [message, setMessage] = React.useState("");
   function createUserRequest(e) {
      e.preventDefault()
      var formdata = new FormData(document.getElementById('createUserForm'));

      var requestOptions = {
         method: 'POST',
         body: formdata,
         redirect: 'follow',
         credentials: 'include'
      };

      fetch(process.env.REACT_APP_DJANGO_API + "create_user", requestOptions)
         .then(response => response.json())
         .then(result => {
            console.log(result)
            if (result.username) {
               //setLoginError(false)
               props.onCreateSuccess(result)
            } else {
               //setLoginError(true)
            }
         })
         .catch(error => {
            console.log('error', error)
            setMessage(error.message)
         });
   }

   function validateField(e) {
      if (e.currentTarget.value.trim() !== '') {
         e.currentTarget.className.replace(' validField', '')
         e.currentTarget.className.replace(' invalidField', '')
         e.currentTarget.className += " validField"
      } else {
         e.currentTarget.className.replace(' validField', '')
         e.currentTarget.className.replace(' invalidField', '')
         e.currentTarget.className += " invalidField"
      }
   }

   return (
      <div className="w-96 py-2 px-5">
         <form id="createUserForm" name="createUserForm" className="flex flex-col h-full">
            <AccountCircleIcon style={{
               fontSize: '120px',
               alignSelf: 'center'
            }} />
            <p>{message}</p>
            <label className="flex flex-row justify-between pb-2 pt-6">
               First Name:
               <input type='text' onChange={validateField} className="rounded-md border-2 border-black p-1" name="firstname" />
            </label>
            <label className="flex flex-row justify-between pb-2 pt-6">
               Last Name:
               <input type='text' onChange={validateField} className="rounded-md border-2 border-black p-1" name="lastname" />
            </label>
            <label className="flex flex-row justify-between pb-2 pt-6">
               E-Mail:
               <input type='text' onChange={validateField} className="rounded-md border-2 border-black p-1" name="email" />
            </label>
            <label className="flex flex-row justify-between pb-2 pt-6">
               Username:
               <input type='text' onChange={validateField} className="rounded-md border-2 border-black p-1" name="username" />
            </label>
            <label className="flex flex-row justify-between py-2">
               Password:
               <input type='password' onChange={validateField} className="rounded-md border-2 border-black p-1" name="password" />
            </label>
            <div className="flex flex-row justify-evenly py-3">
               <button className="rounded-md border-2 border-black w-24 hover:bg-red-500" onClick={createUserRequest}>Register</button>
               <Link to='/login'>
                  <button className="rounded-md border-2 border-black w-36 hover:bg-green-500" >Log In</button>
               </Link>
            </div>
         </form>
      </div>
   );
}

export default CreateUser