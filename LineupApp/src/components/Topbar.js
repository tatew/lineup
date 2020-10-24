import React, {Component} from 'react';
import { Route } from 'react-router-dom'
import { Button } from 'primereact/button';
import { authService } from '../services/AuthService';

export class Topbar extends Component {

    render() {
        return (
            <div>
                <div className="p-grid">
                    <div className="p-col">
                        <h1 style={{textAlign: "left", margin: "20px"}}>Lineup</h1>
                    </div>
                    <div className="p-col">
                        <Button label="Logout" icon="pi pi-sign-out" iconPos="right" onClick={authService.logout} style={{float: "right", margin: "20px"}}/>
                    </div>
                </div>
                <div className="p-d-flex p-jc-center">
                    <div className="p-mr-2">{NavButton("", "pi pi-calendar")}</div>
                    <div className="p-mr-2">{NavButton("Settings", "pi pi-cog")}</div>
                </div>
            </div>
        );
    }
}

const NavButton = (route, icon) => (
    <Route render={({ history}) => (
        <Button style={{}} label={route === "" ? "Calendar" : route} icon={icon} onClick={() => { history.push("/" + route) }}/>
        )}
    />
)