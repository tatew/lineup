import React from 'react';
import {Topbar} from './components/Topbar'
import './App.css';
import { Calendar } from './components/Calendar';
import {Settings} from './components/Settings';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Topbar/>
        <Switch>
          <Route path="/settings">
            <Settings/>
          </Route>
          <Route path="/">
            <Calendar/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
