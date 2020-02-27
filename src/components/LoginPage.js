import React, {useEffect, useState} from 'react';
import Api from '../Api'
import {Redirect} from 'react-router-dom'
import user from './icon/user.svg'
import lock from './icon/lock.svg'


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
      <div className={`header`}>Login</div>
      <div className={`body-section`}>
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
          <div className='bg-blue-600 p-1 rounded-full w-10'><div className='user-circle'><img className='mx-auto pt-1' alt='' src={user}/></div></div>
          <input type='text' placeholder='User Name' className={`input`} value={username} onChange={(e) => {
            setUsername(e.target.value)
          }}/>
          Passcode
          <div className='bg-blue-600 p-1 rounded-full w-10'><div className='user-circle'><img className='mx-auto pt-1' alt='' src={lock}/></div></div>
          <input type='text' placeholder='1234' className={`input w-32`} value={passcode} onChange={(e) => {
            setPasscode(e.target.value)
          }}/>
          <hr/>
          <button className={`button`} type='submit'>Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
