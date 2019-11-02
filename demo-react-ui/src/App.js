//Open Chrome dev tools to see the logs.
//If you use this code on your project don't forget to remove the console logs.

import React, {useState, useEffect} from 'react'
import './App.css'
import Nav from './Components/Nav/Nav'
import Login from './Components/Login/Login'
import axios from 'axios'
import { 
  BrowserRouter,
  Route
} from 'react-router-dom'

 export default function App() {
  const [isUserLogged, setIsUserLogged] = useState(false)
  const [username, setUsername] = useState('')

  //This is used to get the user status and pass user data around.
  useEffect(()=> {
    axios.get('/logged_in')
      .then(response=> {
        console.log(response)
        if(response.data.logged_in && isUserLogged === false) {
          setIsUserLogged(true)
          setUsername(response.data.username)
        } else if(!response.data.logged_in && isUserLogged) {
          setIsUserLogged(false)
          setUsername('')
        }
      })
  }, [isUserLogged, username]) 


  //You can consider using the context api to provide the user object to child components.
  return (
    <div className="App container">
      <BrowserRouter>
        <Nav isUserLogged={isUserLogged} username={username}/>   
        <div className="row">
        <div className="col-md-12 text-center">
          <br />
          <h3>Welcome to the demo app for REACT EXPRESS MYSQL with AUTH(sessions and passport) </h3>
        </div>
        <div className="col-md-3">
          <ul>
            <li>Login with:</li>
            <li><b>email: </b>test@test.com</li>
            <li><b>password: </b>test</li>
          </ul>
        </div>
      </div> 
        <Route path="/login" component={Login} exact />   
      </BrowserRouter>
    </div>
  );
}
