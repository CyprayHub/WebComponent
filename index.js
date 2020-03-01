import React from 'react';
import ReactDOM from "react-dom";
import "./index.css"

class SignUpForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            email: "",
            password: "",
            confirm_password:"",
        };
    }
    handleUserNameChange = evt => {
        this.setState({ username: evt.target.value });
    };
    handleConfirmPasswordChange = evt => {
        this.setState({ confirm_password: evt.target.value });
        console.log(this.state.password, evt.target.value);
        if(this.state.password.length === evt.target.value.length && this.state.password !==  evt.target.value){
            alert("Password do not match")
        }
    };
    handleEmailChange = evt => {
        this.setState({ email: evt.target.value });
    };

    handlePasswordChange = evt => {
        this.setState({ password: evt.target.value });
    };

    handleSubmit = evt => {
        if (!this.canBeSubmitted()) {
            evt.preventDefault();
            return;
        }
        const { email, password } = this.state;
        alert(`Signed up with email: ${email} password: ${password}`);
    };

    checkEmail(email){
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    canBeSubmitted() {
        const { username, email, password , confirm_password} = this.state;
        if(username.length > 15){
            alert('Username length not greater than 15')
        }
        console.log(this.checkEmail(email));
        return this.checkEmail(email) && password.length > 0 && confirm_password.length > 0 && password === confirm_password && 0 < username.length < 16
    }

    render() {
        const isEnabled = this.canBeSubmitted();
        return (
            <form  onSubmit={this.handleSubmit}>
                <input
                    className="input-field"
                    type="text"
                    placeholder="Enter Username"
                    value={this.state.username}
                    onChange={this.handleUserNameChange}
                />
                <input
                    className="input-field"
                    type="email"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={this.handleEmailChange}
                />
                <input
                    className="input-field"
                    type="password"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                />
                <input
                    className="input-field"
                    type="password"
                    placeholder="Confirm password"
                    value={this.state.confirm_password}
                    onChange={this.handleConfirmPasswordChange}
                />
                <button className="input-field" disabled={!isEnabled}>Sign up</button>
            </form>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<SignUpForm />, rootElement);

