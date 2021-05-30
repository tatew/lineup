import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import {Password} from 'primereact/password';
import { lineupService } from '../services/LineupService';
import { Messages } from 'primereact/messages';
import { Message } from 'primereact/message';
import { Dialog } from 'primereact/dialog';
import { authService } from '../services/AuthService';


interface State {
    username: string,
    password: string,
    password2: string,
    validationError: boolean,
    validationErrorMsgs: string[],
    success: boolean,
    failure: boolean,
    alreadyExists: boolean
}

interface Props {}

export class AddUser extends Component<Props, State> {
    msgs: Messages;


    constructor(props: Props) {
        super(props);
        this.state = {
            username: "", 
            password: "",
            password2: "",
            validationError: false,
            validationErrorMsgs: [],
            success: false,
            failure: false,
            alreadyExists: false
        }
    }

    validate = (): boolean => {
        let errorMsgs: string[] = [];
        let valid: boolean = true;
        if (this.state.username === "") {
            errorMsgs.push("Username is required");
            valid = false;
        }
        if (this.state.password === "") {
            errorMsgs.push("Password is required");
            valid = false;
        }
        if (this.state.password !== this.state.password2) {
            errorMsgs.push("Passwords do not match");
            valid = false;
        }
        this.setState({
            validationError: !valid,
            validationErrorMsgs: errorMsgs
        })
        return valid;
    }

    handleConfirm = async () => {
        if (this.validate()) {
            const result = await lineupService.addUser(this.state.username, this.state.password);
            if (result === 201) {
                this.setState({
                    success: true
                })
            }
            else if (result === 409) {
                this.setState({
                    alreadyExists: true
                })
            }
            else {
                this.setState({
                    failure: true
                })
            }
        }
    }

    success = async () => {
        await authService.login(this.state.username, this.state.password);
        window.location.href = "http://" + window.location.host;
    }

    render() {
        const errorHeader = (
            <div>
                <p className="p-error"><span style={{'fontSize': '1.5em'}} className="pi pi-exclamation-circle"></span> Error</p>
            </div>
        );

        const successFooter = (
            <div>
                <Button label="Ok!" icon="pi pi-check" iconPos="right" onClick={this.success}/>
            </div>
        );

        const userAlreadyExistsFooter = (
            <div>
                <Button label="Go to Login" icon="pi pi-sign-in" iconPos="right" onClick={() => window.location.href = "http://" + window.location.host}/>
                <Button className="p-button-secondary" icon="pi pi-user-edit" iconPos="right" label="Change username" onClick={() => this.setState({alreadyExists: false})}/>
            </div>
        );
        

        return (
            <div>
                <Messages ref={(el) => this.msgs = el} />
                <h1>Create Account</h1>
                <div className="card">
                    <div className="p-grid p-justify-center p-dir-col">
                        <div className="p-col p-mx-auto">
                            <label htmlFor="username" className="p-mx-auto">Username</label>
                            <InputText 
                                id="username"
                                value={this.state.username} 
                                onChange={(e: any) => this.setState({username: e.target.value})}
                                style={{display: "block", margin: "1em"}}
                                className="p-inputtext-lg p-mx-auto"/>
                        </div>
                        <div className="p-col p-mx-auto">
                            <label htmlFor="password" className="p-mx-auto">Password</label>
                            <Password 
                                value={this.state.password} 
                                id="password"
                                onChange={(e: any) => this.setState({password: e.target.value})} 
                                style={{display: "block", margin: "1em"}}
                                className="p-inputtext-lg p-mx-auto"
                                promptLabel="Enter a password"/>
                        </div>
                        <div className="p-col p-mx-auto">
                            <label htmlFor="password" className="p-mx-auto">Re-enter Password</label>
                            <InputText 
                                id="password2"
                                value={this.state.password2} 
                                onChange={(e: any) => this.setState({password2: e.target.value})}
                                style={{display: "block", margin: "1em"}}
                                className="p-inputtext-lg p-mx-auto"
                                type="password"/>
                        </div>
                        <div className="p-col p-mx-auto">
                            <Button
                                label="Confirm"
                                icon="pi pi-check"
                                iconPos="right"
                                onClick={this.handleConfirm}
                            />
                        </div>
                        <Dialog header={errorHeader} visible={this.state.validationError} onHide={() => this.setState({validationError: false, validationErrorMsgs: []})}>
                            {this.state.validationErrorMsgs.map(msg => {
                                return (<p>{msg}</p>)
                            })}
                        </Dialog>
                        <Dialog header="Success!" footer={successFooter} visible={this.state.success} onHide={this.success}>
                            <p>User <em>{this.state.username}</em> was successfully created!</p>
                        </Dialog>
                        <Dialog header={errorHeader} visible={this.state.failure} onHide={() => this.setState({failure: false})}>
                            <p>An error occured while adding user <em>{this.state.username}</em>. Please try again later.</p>
                        </Dialog>
                        <Dialog header="User already exists" footer={userAlreadyExistsFooter} visible={this.state.alreadyExists} onHide={() => this.setState({alreadyExists: false})}>
                            <p>A user with the username <em>{this.state.username}</em> already exists</p>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }
}