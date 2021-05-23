import React, { Component } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { lineupService } from '../services/LineupService';

interface State {
    username: string,
    password: string,
    password2: string
}

interface Props {}

export class AddUser extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            username: "", 
            password: "",
            password2: ""
        }
    }

    handleConfirm = async () => {
        const result = await lineupService.addUser(this.state.username, this.state.password);
        console.log(result);
    }

    render() {
        return (
            <div>
                <h1>Create Account</h1>
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
                            <span className="p-float-label">
                                <InputText 
                                    id="password2"
                                    value={this.state.password2} 
                                    onChange={(e: any) => this.setState({password2: e.target.value})}
                                    style={{display: "block", margin: "1em"}}
                                    className="p-inputtext-lg p-mx-auto"
                                    type="password"/>
                                <label htmlFor="password" className="p-mx-auto">Re-enter Password</label>
                            </span>
                        </div>
                        <div className="p-col p-mx-auto">
                            <Button
                                label="Confirm"
                                icon="pi pi-check"
                                iconPos="right"
                                onClick={this.handleConfirm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}