import React from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import AppWrapper from './AppWrapper';


function App() {
  return (
    <div className="App">
      <Router>
        <AppWrapper/>
      </Router>
    </div>
  );
}

export default App;
