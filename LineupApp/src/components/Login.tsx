import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { authService } from '../services/AuthService';

interface State {
    username: string,
    password: string,
}

interface Props {}

export class Login extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    componentDidMount = async () => {

        if (authService.isAuth()) {
            window.location.href = "http://" + window.location.host;
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === "Enter") {
                this.login();
            }
        });
    }

    fieldsFilled = () => {
        return this.state.password !== "" && this.state.username !== "";
    }

    login = async () => {
        if (this.fieldsFilled()){
            const authed = await authService.login(this.state.username, this.state.password);
            if (authed) {
                window.location.href = "http://" + window.location.host;
            } else {
                alert("Login failed")
            }
        }
    }

    render() {
        return (
            <div>
                <h1>Welome to Lineup</h1>
                <div className="card">
                    <div className="p-grid p-justify-center p-dir-col">
                        <div className="p-col p-mx-auto">
                            <span className="p-float-label">
                                <InputText 
                                    id="username"
                                    value={this.state.username} 
                                    onChange={(e: any) => this.setState({username: e.target.value})}
                                    style={{display: "block", margin: "1em"}}
                                    className="p-inputtext-lg p-mx-auto"/>
                                    <label htmlFor="username" className="p-mx-auto">Username</label>
                            </span>
                        </div>
                        <div className="p-col p-mx-auto">
                            <span className="p-float-label">
                                <InputText 
                                    id="password"
                                    value={this.state.password} 
                                    onChange={(e: any) => this.setState({password: e.target.value})}
                                    style={{display: "block", margin: "1em"}}
                                    className="p-inputtext-lg p-mx-auto"
                                    type="password"/>
                                <label htmlFor="password" className="p-mx-auto">Password</label>
                            </span>
                        </div>
                        <div className="p-col p-mx-auto">
                            <Button
                                label="Login"
                                icon="pi pi-sign-in"
                                iconPos="right"
                                onClick={this.login}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}