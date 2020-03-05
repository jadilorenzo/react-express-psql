import React, {useEffect, useState} from 'react';
import {v4} from 'uuid'
import {Link, useParams} from 'react-router-dom'
import scrollIntoView from 'scroll-into-view'
import PropTypes from 'prop-types'
import Header from '../components/Header'
import Form from '../components/Form'
import heart from '../components/icon/heart.svg'
import Logout from '../components/icon/logout.svg'
import getAccessibleRooms from '../methods/GetAccessibleRooms'
import getDisplayMessages from '../methods/GetDisplayMessages'
import Markdown from 'markdown-to-jsx';



function MessagePage({Api, userId}) {
  const [database, setDatabase] = useState([])
  const [rooms, setRooms] = useState([])
  const [currentRoom, setCurrentRoom] = useState({})
  const [allUsers, setUsers] = useState([])
  const [reaction, setReaction] = useState('')
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
      const accessibleRooms = rooms.filter(room => {
        return JSON.parse(room.users.replace('{', '[').replace('}', ']')).includes(params.userId)
      })
      setRooms(accessibleRooms)
      if (currentRoom.rid === undefined){
        setCurrentRoom((accessibleRooms.length > 0) ? accessibleRooms[0] : {})
      }
      return {rooms}
    })
  }

  const sendMessage = (input, reaction) => {
    if (input !== '') {
      Api.post('messages', {mid: v4(), uid: params.userId, rid: currentRoom.rid, message: input, reaction}).then(getAll)
    }
  }

  useEffect(() => {
    getAll()
  }, [Api, userId])

  useEffect(() => {
    scrollIntoView(lastRef.current, {time: 0})
  }, [database, rooms, currentRoom, lastRef])

  const displayRooms = rooms.map((x, index) => {
    return (
      <div key={index}>
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
  })

  const displayMessages = (getDisplayMessages(database, allUsers, currentRoom) !== 0) ? (
    <div className='overflow-y-scroll p-2 h-32 bg-gray-300 rounded shadow'>
      {getDisplayMessages(database, allUsers, currentRoom).map((message) =>
        <div ref={message.ref ? lastRef : React.createRef()} className={`bubble`} key={message.index}>
          {message.name}: {message.message !== null ? <Markdown>{message.message}</Markdown> : <span/>} { message.message !== null ? <span className='px-1 font-bold' style={{float: 'right'}}>{message.reaction}</span> : <span className='font-bold'>{message.reaction}</span> }
        </div>
      )}
    </div>
  ) : <div>No Messages!</div>


  return (
    <div className="h-screen">
      <Header>
        Messages
        <span className='float-right pt-2'><img alt='' src={Logout}/></span>
      </Header>
      <div className={`body-section`}>
        Rooms
        {displayRooms}
        <Link to={`/createRoom/${params.userId}`}><span className='block text-blue-500'>Add +</span></Link>
      </div>
      <div className={`body-section`}>
        <div>Messages</div>
        {displayMessages}
        <Form onSubmit={({input, setInput, setReactionInput}) => {
          if (input !== '') {
            sendMessage(input, reaction)
            setInput('')
            setReaction('')
          }
        }}  button='blue' submitName=''>
          <div>Send</div>
          <input className='input w-8 mr-1 inline' value={reaction} maxlength="3" placeholder=':)' onChange={(e) => {
            setReaction(e.target.value)
          }}/>
        </Form>
        <div className='text-gray-600'>Supports Markdown!</div>

      </div>
      <a href='https://github.com/jadilorenzo/react-express-psql' target='_blank'  rel="noopener noreferrer" className='m-4 opacity-75 bg-blue-600 rounded-full h-16 w-16 absolute right-0 bottom-0 p-5 hover:bg-blue-500'><img alt='' alt='' src={heart}/></a>
    </div>
  );
}
MessagePage.propTypes = {
  userId: PropTypes.string,
  Api: PropTypes.any
}

export default MessagePage;
