import React, {useState} from 'react';
import {Redirect} from 'react-router-dom'
import Api from '../Api'
import {v4} from 'uuid'
import Form from './Form'


function CreateUserPage() {
  const [redirect, setRedirect] = useState(false)
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
        <Form onMessage={(input) => {
          setUsername(input)
        }} theme='none' submitName='none' type='name'>
          Username
        </Form>
        <Form onSubmit={({input}) => {
          const uid = v4()
          Api.post('users', {uid, name: username, passcode: Number.parseFloat(input)})
          setUuid(uid)
          setRedirect(true)
        }} theme='white' submitName='Create' type='password'>
          Four Digit Passcode
        </Form>
      </div>
    </div>
  );
}

export default CreateUserPage;
