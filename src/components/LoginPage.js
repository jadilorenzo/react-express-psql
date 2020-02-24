import React, {useEffect, useState} from 'react';
import Api from '../Api'
import {Redirect} from 'react-router-dom'
import Styles from './styles'

function LoginPage() {
  const [username, setUsername] = useState('')
  const [passcode, setPasscode] = useState('')
  const [users, setUsers] = useState([])
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    Api.get('users').then((r) => {
      setUsers(r.users)
    })
  }, [])

  if (redirect) {
    return <Redirect to={`/messages/${window.localStorage.getItem('userId')}`}/>
  }

  console.log('users', users.filter(x => x.name === username && x.passcode === Number.parseFloat(passcode)));

  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className={`${Styles.header}`}>Login</div>
      <div className={`${Styles.bodySection}`}>
        <form onSubmit={(e) => {
          e.preventDefault()
          console.log(users);
          if (users.filter(x => (x.name === username && x.passcode === Number.parseFloat(passcode))).length > 0) {
            const userId = users.filter(x => x.name === username && x.passcode === Number.parseFloat(passcode))[0].uid
            console.log(userId);
            window.localStorage.setItem('userId', userId)
            setRedirect(true)
          }
        }}>
          Username
          <input type='text' placeholder='User Name' className={`${Styles.input}`} value={username} onChange={(e) => {
            setUsername(e.target.value)
          }}/>
          Passcode
          <input type='text' placeholder='1234' className={`${Styles.input} w-32`} value={passcode} onChange={(e) => {
            setPasscode(e.target.value)
          }}/>
          <hr/>
          <button className={`${Styles.button}`} type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;