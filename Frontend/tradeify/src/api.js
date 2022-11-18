function login(body) {
   var requestOptions = {
      method: 'POST',
      body: body,
      redirect: 'follow',
      credentials: 'include'
   };

   return (fetch(process.env.REACT_APP_DJANGO_API + "login_user", requestOptions)
      .then(response => response.json()))
}

function createNewTradenote(body) {
   var requestOptions = {
      method: 'POST',
      body: body,
      redirect: 'follow',
      credentials: 'include'
   };

   return (fetch(process.env.REACT_APP_DJANGO_API + "create_tradenote", requestOptions))
}

const api = {
   login: login,
   createNewTradenote: createNewTradenote
}

export default api