import React from 'react';
import {Topbar} from './components/Topbar'
import './App.css';
import { Calender } from './components/Calender';

function App() {
  return (
    <div className="App">
      <Topbar/>
      <Calender/>
    </div>
  );
}

export default App;
