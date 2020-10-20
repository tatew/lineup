import React from 'react';
import {Topbar} from './components/Topbar'
import './App.css';
import { Calender } from './components/Calender';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div className="App">
      <Topbar/>
      <Calender/>
    </div>
  );
}

export default App;
