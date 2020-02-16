import React, {useEffect, useState} from 'react';
import {v4} from 'uuid'
import Styles from './styles'
import {Link} from 'react-router-dom'

function MessagePage({Api, userId}) {
  const [database, setDatabase] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState('')
  const [allUsers, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    Api.get('users').then((r) => {
      setUsers(r.users)
      setCurrentUser(r.users.filter(x => x.uid === userId)[0])
    }).then(() => {
      Api.get('messages').then(({db}) => {
        setDatabase(db)
        return {db}
      })
    })
    Api.get('rooms').then(({rooms}) => {
      setRooms(rooms)
      setCurrentRoom(rooms[0])
      return {rooms}
    })
  }, [Api, userId])

  useEffect(() => {
    if (newMessage !== '') {
      Api.post('messages', database[database.length - 1])
    }
  }, [database, Api, newMessage])

  return (
    <div className="h-screen">
      <div className={`${Styles.header}`}>Messages <Link to='/login'><span role='img' aria-label=''>💬</span></Link></div>
      <div className={`${Styles.bodySection}`}>
        Rooms
        {rooms.map((x, index) => <div key={index} className={`${Styles.bubble} ${(x.rid === currentRoom.rid) ? 'border-b border-blue-500' : ''}`} onClick={() => {
          setCurrentRoom(x)
        }}>{x.name}</div>)}
        <Link to='/createRoom'><span className='block text-blue-500'>Add +</span></Link>
      </div>
      <div className={`${Styles.bodySection}`}>
        <div>Messages</div>
        {database
          .filter(x => x.rid === currentRoom.rid)
          .map((x, index) =>
          <div className={`${Styles.bubble}`} key={index}>
            {allUsers.filter(y => y.uid === x.uid)[0].name}: {x.message}
          </div>)
        }
        Send
        <hr/>
        <input type='text' className={`${Styles.input} w-full`}  onChange={(e) => setNewMessage(e.target.value)}></input>
        <button className={`${Styles.button}`} onClick={() => {
          if (newMessage !== '') {
            setDatabase(d => [...d, {mid: v4(), uid: currentUser.uid, rid: currentRoom.rid, message: newMessage}])
          }
        }}>Send</button>
      </div>
    </div>
  );
}
//

export default MessagePage;
