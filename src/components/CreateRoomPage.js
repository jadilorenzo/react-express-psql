import React, {useEffect, useState} from 'react';
import Api from '../Api'
import {Redirect, useParams} from 'react-router-dom'
import Styles from './styles'
import {v4} from 'uuid'

function CreateRoomPage() {
  const [roomName, setRoomName] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [unaccessibleRooms, setUnaccessibleRooms] = useState([])

  const params = useParams()

  useEffect(() => {
    Api.get('rooms').then(({rooms}) => {
      const filteredRooms = rooms.filter(room => !(JSON.parse(room.users.replace('{', '[').replace('}', ']')).includes(params.userId)))
      setUnaccessibleRooms(filteredRooms)
    })
  }, [])

  if (redirect) {
    return <Redirect to={`/messages/${params.userId}`}/>
  }
  console.log(unaccessibleRooms);

  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className={`${Styles.header}`}>Create Room +</div>
      <div className={`${Styles.bodySection}`}>
        <form onSubmit={(e) => {
          e.preventDefault()
          setRedirect(true)
          Api.post('rooms', {rid: v4(), name: roomName, users: [params.userId]})
        }}>
          Room Name
          <input value={roomName} className={`${Styles.input} w-full`} onChange={(e) => {
            setRoomName(e.target.value)
          }}/>
          <hr/>
          <button className={`${Styles.button}`}>Create</button>
        </form>
      </div>
      <div className={`${Styles.bodySection}`}>
        Join Existing Room...
        {unaccessibleRooms.map(x => <div onClick={() => {
          Api.post('roomAddPerson', {users: [...JSON.parse(x.users.replace('{', '[').replace('}', ']')), params.userId], rid: x.rid})
          setRedirect(true)
        }} className={`${Styles.bubble} transition duration-500 ease-in-out hover:shadow-md`}>{x.name}</div>)}
      </div>
    </div>
  );
}

export default CreateRoomPage;
