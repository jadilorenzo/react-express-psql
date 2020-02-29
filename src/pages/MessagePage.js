import React, {useEffect, useState, useRef} from 'react';
import {v4} from 'uuid'
import {Link, useParams} from 'react-router-dom'
import scrollIntoView from 'scroll-into-view'
import Header from '../components/Header'
import Form from '../compoents/Form'
import heart from './icon/heart.svg'
import send from './icon/up.svg'
import Logout from './icon/logout.svg'


function MessagePage({Api, userId}) {
  const [database, setDatabase] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState({})
  const [allUsers, setUsers] = useState([])
  const params = useParams()
  const lastRef = React.createRef()

  const getAll = () => {
    Api.get('users').then((r) => {
      setUsers(r.users)
    }).then(() => {
      Api.get('messages').then(({db}) => {
        setDatabase(db)
        return {db}
      })
    })
    Api.get('rooms').then(({rooms}) => {
      console.info({allRooms: rooms});
      const accessibleRooms = rooms.filter(room => {
        return JSON.parse(room.users.replace('{', '[').replace('}', ']')).includes(params.userId)
      })
      console.info('accessibleRooms', accessibleRooms);
      setRooms(accessibleRooms)
      if (currentRoom.rid === undefined){
        setCurrentRoom((accessibleRooms.length > 0) ? accessibleRooms[0] : {})
      }
      return {rooms}
    })
  }

  const sendMessage = (input) => {
    if (input !== '') {
      Api.post('messages', {mid: v4(), uid: params.userId, rid: currentRoom.rid, message: input}).then(getAll)
      getAll()
    }
  }

  useEffect(() => {
    getAll()
  }, [Api, userId])

  useEffect(() => {
    scrollIntoView(lastRef.current, {time: 0})
  }, [database, rooms, newMessage, currentRoom])

  console.info({rooms});
  console.info({currentRoom})

  return (
    <div className="h-screen">
      <Header>
        Messages
        <span className='float-right pt-2'><img src={Logout}/></span>
      </Header>
      <div className={`body-section`}>
        Rooms
        {rooms.map((x, index) => {
          return (
            <div>
              <div
                key={index} className={`bubble ${(x.rid === currentRoom.rid) ? 'border-b border-blue-500' : ''}`}
                onClick={() => {
                  setCurrentRoom(x)
                }}
              >
                {x.name}
              </div>
            </div>
          )
        })}
        <Link to={`/createRoom/${params.userId}`}><span className='block text-blue-500'>Add +</span></Link>
      </div>
      <div className={`body-section`}>
        <div>Messages</div>
        {(database.filter(x => x.rid === currentRoom.rid).length > 0) ? <div className='overflow-y-scroll p-2 h-32 bg-gray-300 rounded shadow'>
          {database
            .filter(x => x.rid === currentRoom.rid)
            .map((x, index) =>
            <div {...((index === database.length - 1) ? {ref: lastRef} : {})} className={`bubble`} key={index}>
              {allUsers.filter(y => y.uid === x.uid)[0].name}: {x.message}
            </div>)
          }
        </div> : <div><em>No messges!</em></div>}
        <Form onSubmit={({input, setInput}) => {
          if (input !== '') {
            sendMessage(input)
            setInput('')
          }
        }} button='blue' submitName=''>
          Send
        </Form>
      </div>
      <a href='https://github.com/jadilorenzo/react-express-psql' target='_blank' className='m-4 opacity-75 bg-blue-600 rounded-full h-16 w-16 absolute right-0 bottom-0 p-5 hover:bg-blue-500'><img alt='' src={heart}/></a>
    </div>
  );
}
//

export default MessagePage;
