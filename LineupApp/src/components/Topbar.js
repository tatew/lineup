import React, {Component} from 'react';
import { Route } from 'react-router-dom'
import { Button } from 'primereact/button';
import 'primeflex/primeflex.css';

export class Topbar extends Component {

    render() {
        return (
            <div>
                <h1 style={{textAlign: "left", margin: "1em"}}>Welcome to Lineup</h1>
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