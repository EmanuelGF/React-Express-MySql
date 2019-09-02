import React from 'react';
import './Login.css';

import axios from 'axios';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        const email = document.getElementById('email').value;
        const passwd = document.getElementById('passwd').value;

        axios.post('/loginform', {
            email: email,
            password: passwd
        }).then(response => {
            console.log(response);
            window.location.replace("/"); //redirects the user to the home page
        }).catch(error=>{
            console.log(error);
            alert('An error has ocurred! Please try again.')
            window.location.replace("/login");
        })
    }

    render(){
        return (
            <div id="login" className="row justify-content-center">
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>
        
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="passwd" placeholder="Password"/>
                    </div>
      
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );


    }
}

export default Login;