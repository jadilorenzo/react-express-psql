import React, {useEffect, useState} from 'react';
import Api from '../Api'
import {Redirect} from 'react-router-dom'
import Styles from './styles'
import {v4} from 'uuid'

function CreateRoomPage() {
  const [roomName, setRoomName] = useState('')
  const [redirect, setRedirect] = useState(false)

  if (redirect) {
    return <Redirect to='/messages'/>
  }

  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className={`${Styles.header}`}>Create Room +</div>
      <div className={`${Styles.bodySection}`}>
        <form onSubmit={(e) => {
          e.preventDefault()
          setRedirect(true)
          Api.post('rooms', {rid: v4(), name: roomName})
        }}>
          Room Name
          <input value={roomName} className={`${Styles.input} w-full`} onChange={(e) => {
            setRoomName(e.target.value)
          }}/>
          <hr/>
          <button className={`${Styles.button}`}>Create</button>
        </form>
      </div>
    </div>
  );
}

export default CreateRoomPage;
