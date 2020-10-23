import React, {Component} from 'react';
import { Button } from 'primereact/button';

export class Login extends Component {

    constructor(props) {
        super(props);
        
    }

    handleLogin = (e) => {

    }

    render() {
        return (
            <div>
                <p>Login</p>
                <Button label="LOGIN!" onClick={this.handleLogin}/>
            </div>
        );
    }
}