import React from "react";
import { Route, Redirect } from "react-router-dom";

export function PrivateRoute({ component: Component, isAuth: auth, ...rest }) {
    console.log(auth);
    return (
      <Route
        {...rest}
        render={props =>
          auth ? (
            <Component {...props} />
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