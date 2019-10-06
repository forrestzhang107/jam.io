import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './index.css';
import Login from './Login'
import Menu from './Menu'
import Create from './Create'
import Join from './Join'
import Recordings from './Recordings'
import Room from './Room'
import Recording from './Recording'


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
        <Route path='/auth/recording' component={Recording} /> 
        <Redirect from='/' to='/login' />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
