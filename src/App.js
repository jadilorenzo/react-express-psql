import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import Api from './Api'

import MessagePage from './components/MessagePage.js'
import LoginPage from './components/LoginPage.js'
import CreateRoomPage from './components/CreateRoomPage.js'
import LandingPage from './components/LandingPage.js'
import AboutPage from './components/AboutPage.js'
import CreateUserPage from './components/CreateUserPage.js'


const App = () => {
  const getUserId = () => {
    if (window.localStorage.getItem('userId') !== undefined) {
      return window.localStorage.getItem('userId')
    } else {
      return ''
    }
  }

  useEffect(() => {
    window.localStorage.setItem('userId', getUserId())
  }, [getUserId, window])

  return (
    <Router>
      <Switch>
        <Route exact path='/messages/:userId'>
          {getUserId() === '' ? <Redirect to='/login'/> : <MessagePage userId={getUserId()} Api={Api} /> }
        </Route>
        <Route exact path='/login'>
          <LoginPage/>
        </Route>
        <Route exact path='/createRoom/:userId'>
          <CreateRoomPage/>
        </Route>
        <Route exact path='/'>
          <LandingPage/>
        </Route>
        <Route exact path='/about'>
          <AboutPage/>
        </Route>
       <Route exact path='/create-user'>
          <CreateUserPage/>
        </Route>
        <Route>
          404 Not Found
        </Route>
      </Switch>
    </Router>

  )
}

export default App
