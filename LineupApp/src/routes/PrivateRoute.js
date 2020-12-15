import React from "react";
import { Route, Redirect } from "react-router-dom";
import {Topbar} from '../components/Topbar';

export function PrivateRoute({ component: Component, isAuth: auth, ...rest }) {
    console.log(auth);
    return (
      <Route
        {...rest}
        render={props =>
          auth ? (
            <React.Fragment>
              <Topbar/>
              <Component {...props} />
            </React.Fragment>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }