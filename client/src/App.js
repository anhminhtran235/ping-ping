import React from 'react';
import './App.css';
import AlertMessages from './components/AlertMessages/AlertMessages';
import AppInfo from './components/AppInfo/AppInfo';
import Header from './components/Header/Header';
import UserOptions from './components/UserOptions/UserOptions';

function App() {
  return (
    <div className='App'>
      <Header />
      <AlertMessages />
      <UserOptions />
      <AppInfo />
    </div>
  );
}

export default App;
