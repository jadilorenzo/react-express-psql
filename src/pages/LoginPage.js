import React, {useEffect, useState} from 'react';
import Api from '../Api'
import Header from '../components/Header'
import {Redirect} from 'react-router-dom'
import user from '../components/icon/user.svg'
import lock from '../components/icon/lock.svg'
import Form from '../components/Form'
import getUser from '../methods/GetUser'


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

  return (
    <div className="h-screen w-screen bg-gray-100">
      <Header>
        Login
      </Header>
      <div className={`body-section`}>
        <Form onChange={setUsername} button='none' type='text' submitName='none'>
          Username<br/>
          <div className='mb-1 bg-blue-600 p-1 rounded-full w-10'>
            <div className='user-circle'>
              <img className='mx-auto pt-1' alt='' src={user}/>
            </div>
          </div>
        </Form>
        <Form onSubmit={({input, setInput}) => {
          setPasscode(input)
          if (getUser(users, username, input).length !== 0) {
            const userId = getUser(users, username, input)[0].uid
            window.localStorage.setItem('userId', userId)
            setRedirect(true)
          }
        }} button='white' type='password' submitName='Login'>
          Passcode<br/>
          <div className='mb-1 bg-blue-600 p-1 rounded-full w-10'>
            <div className='user-circle'>
              <img className='mx-auto pt-1' alt='' src={lock}/>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default LoginPage;
