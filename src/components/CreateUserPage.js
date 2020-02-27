import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import Api from '../Api'
import {v4} from 'uuid'


function CreateUserPage() {
  const [redirect, setRedirect] = useState(false)
  const [passcode, setPasscode] = useState('1234')
  const [uuid, setUuid] = useState('')
  const [username, setUsername] = useState('New User Name')
  const [showWarning, setShowWarning] = useState(false)


  if (redirect) {
    return <Redirect to={`/messages/${uuid}`}/>
  }

  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className={`header`}>Create User Page</div>
      <div className={`body-section`}>
        <form onSubmit={() => {
            const uid = v4()
            Api.post('users', {uid, name: username, passcode: Number.parseFloat(passcode)})
            setUuid(uid)
            setRedirect(true)
        }}>
          Username
          <input
            type='text'
            value={username}
            className={`input border focus:border-red-500`}
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
            className={`input w-32 border focus:border-red-500`}
            onChange={(e) => {
              setPasscode(e.target.value)
            }}
            onClick={() => {
              setShowWarning(true)
            }}
          />
        {showWarning ? <div className='text-red-500'>All fields are required!</div> : <div/>}
        <hr/>
        <button className={`button`}>Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUserPage;
