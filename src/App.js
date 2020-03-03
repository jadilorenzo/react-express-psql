import React, {useEffect, useCallback} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Api from './Api'
import MessagePage from './pages/MessagePage.js'
import LoginPage from './pages/LoginPage.js'
import CreateRoomPage from './pages/CreateRoomPage.js'
import LandingPage from './pages/LandingPage.js'
import AboutPage from './pages/AboutPage.js'
import CreateUserPage from './pages/CreateUserPage.js'
import {darkTheme} from './components/Theme'

const App = () => {
  const userId = window.localStorage.getItem('userId')
  const getUserId = useCallback(() => {
    if (userId !== undefined) {
      return userId
    } else {
      return ''
    }
  }, [userId])

  useEffect(() => {
    window.localStorage.setItem('userId', getUserId())
  }, [getUserId])

  return (
    <div>
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
    </div>

  )
}

export default App
