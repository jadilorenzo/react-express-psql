import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import './App.css';
import Api from './Api'

import MessagePage from './components/MessagePage.js'
import LoginPage from './components/LoginPage.js'
import CreateRoomPage from './components/CreateRoomPage.js'
import LandingPage from './components/LandingPage.js'
import AboutPage from './components/AboutPage.js'

const App = () => {
  const [userId, setUserId] = useState(() => {
    if (window.localStorage.getItem('userId') === undefined) {
      return window.getItem('userId')
    }
  })

  useEffect(() => {
    window.localStorage.setItem('userId', userId)
  }, [window, userId])

  return (
    <Router>
      <Switch>
        <Route exact path='/messages'>
          {userId === '' ? <Redirect to='/login'/> : <MessagePage userId={userId} Api={Api} /> }
        </Route>
        <Route exact path='/login'>
          <LoginPage setUserId={setUserId}/>
        </Route>
        <Route exact path='/createRoom'>
          <CreateRoomPage/>
        </Route>
        <Route exact path='/'>
          <LandingPage/>
        </Route>
        <Route exact path='/about'>
          <AboutPage/>
        </Route>
        <Route>
          404 Not Found
        </Route>
      </Switch>
    </Router>

  )
}

export default App
