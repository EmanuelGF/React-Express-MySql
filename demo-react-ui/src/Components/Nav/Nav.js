import React from 'react';
import './Nav.css';
import axios from 'axios';

export default function Nav(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <a id="cardrea-logo" className="navbar-brand" href="/">Demo-app</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
        
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
   
      {(props.isUserLogged) ? <UserLinks username={props.username} /> : <GuestLinks /> }

      </div>
    </nav>
    );
}

function GuestLinks(){
    return(
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <a className="nav-link" href="/login">Login</a>
        </li>
      </ul>
    );
  }
  
  function UserLinks(props) {
    function handleLogoutClick(event) {
      event.preventDefault();
      axios.get('/logout').then((response)=> {
        console.log(response);
        window.location.replace("/login");
      }).catch((error)=> {
        console.log(error);
        alert('Something disastrous happened!')
      })
    }
    return(
      <ul className="navbar-nav mr-auto">
            
          <li className="nav-item">
              <a className="nav-link" href="/" onClick={handleLogoutClick}>Logout</a>
          </li>
          <li id="greetings">(Welcome <b>{props.username})</b> </li>
      </ul>
    );   
  }