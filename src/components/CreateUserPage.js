import React, {useEffect, useState} from 'react';
import {Redirect, Link} from 'react-router-dom'
import Styles from './styles'
import Api from '../Api'
import {v4} from 'uuid'


function CreateUserPage() {
  const [redirect, setRedirect] = useState(false)
  const [passcode, setPasscode] = useState('1234')
  const [username, setUsername] = useState('New User Name')
  const [showWarning, setShowWarning] = useState(false)


  if (redirect) {
    return <Redirect to='/messages'/>
  }

  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className={`${Styles.header}`}>Create User Page</div>
      <div className={`${Styles.bodySection}`}>
        <form onSubmit={() => {
            Api.post('users', {uid: v4() , name: username, passcode: Number.parseFloat(passcode)})
            setRedirect(true)
        }}>
          Username
          <input
            type='text'
            value={username}
            className={`${Styles.input} border focus:border-red-500`}
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            onClick={() => {
              setShowWarning(true)
            }}/>
          Four Digit Passcode
          <input
            type='number'
            value={passcode}
            className={`${Styles.input} w-32 border focus:border-red-500`}
            onChange={(e) => {
              setPasscode(e.target.value)
            }}
            onClick={() => {
              setShowWarning(true)
            }}
          />
        {showWarning ? <div className='text-red-500'>All fields are required!</div> : <div/>}
        <hr/>
        <button className={`${Styles.button}`}>Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUserPage;
