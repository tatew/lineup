import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Calendar } from './components/Calendar';
import { Settings } from './components/Settings';
import { authService } from './services/AuthService';
import { PrivateRoute } from './routes/PrivateRoute';
import { AddUser } from './components/AddUser';
import 'primeflex/primeflex.css';

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
                <Switch>
                    <PrivateRoute path="/settings" component={Settings} isAuth={isAuthorized} />
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/addUser">
                        <AddUser/>
                    </Route>
                    <PrivateRoute path="/" component={Calendar} isAuth={isAuthorized} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(AppWrapper);