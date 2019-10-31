import React from 'react';
import './App.css';

import NavContainer from './containers/NavContainer'
import UserContainer from './containers/UserContainer'
import MainContainer from './containers/MainContainer'

function App() {
  return (
    <div className="App">
      <NavContainer />
      <UserContainer />
      <MainContainer />
    </div>
  );
}

export default App;
