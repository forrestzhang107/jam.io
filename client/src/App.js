import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './index.css';
import Login from './Login'
import Menu from './Menu'
import Create from './Create'
import Join from './Join'
import Recordings from './Recordings'
import Room from './Room'
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={ Login } />
        <Route path='/auth/menu' component={ Menu } />
        <Route path='/auth/create' component={ Create } />
        <Route path='/auth/join' component={ Join } />
        <Route path='/auth/recordings' component={ Recordings } />
        <Route path='/auth/room' component={ Room } />
        <Redirect from='/' to='/login' />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
