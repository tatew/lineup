import React, {Component} from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';
import { Login } from './components/Login';
import { Calendar } from './components/Calendar';
import {Settings} from './components/Settings';
import {Topbar} from './components/Topbar';
import {authService} from './services/AuthService';
import {PrivateRoute, privateRoute} from './Routes/PrivateRoute';

class AppWrapper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthed: false,
        }
    }

    render() {

        const isAuthorized = authService.isAuth();
        return (
            <div>
            <Topbar/>
                <Switch>
                    <PrivateRoute path="/settings" component={Settings} isAuth={isAuthorized}/>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path="/">
                        <Calendar/>
                    </Route>
                </Switch>
            </div>
        );
    }
}

export default withRouter(AppWrapper);