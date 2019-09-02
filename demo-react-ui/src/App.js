import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Login from './Components/Login/Login';
import axios from 'axios';
import { 
  BrowserRouter,
  Route
} from 'react-router-dom';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      isUserLogged: 'false',
      username: ''
    }
  }

  //This is used to get the user status and pass user data around.
  checkLoginStatus() {
    axios.get('/logged_in')
    .then(response=> {
      console.log(response)
      if(response.data.logged_in && this.state.isUserLogged === 'false') {
        this.setState({
          isUserLogged: 'true',
          username: response.data.username
        })
      } else if(!response.data.logged_in && this.state.isUserLogged === 'true') {
        this.setState({
          isUserLogged: '',
          username: ''
        })
      }
    })
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  render(){
    return (
      <div className="App container">
        <BrowserRouter>
          <Nav isUserLogged={this.state.isUserLogged} username={this.state.username}/>   
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
}
  
export default App;
