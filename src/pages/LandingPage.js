import React from 'react';
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import login from '../components/icon/login.svg'
import menu from '../components/icon/menu.svg'
import userAdd from '../components/icon/user-add.svg'
import community from '../components/icon/communication.png'
import createUser from '../components/icon/create-user.png'
import createRoom from '../components/icon/create-room.png'
import sendMessages from '../components/icon/send-messages.png'


function LandingPage() {
  return (
    <div className="h-screen w-screen landing-page overflow-scroll">
      <Header>
        Online Chat
      </Header>
      <div className='body-section'>
        <img className='mx-auto mt-4' alt='' src={community}/>
        <div className='text-blue-700 text-center text-2xl'>Create your community with Online Chat!</div>

        <div className='m-4 flex shadow w-2/3 mx-auto rounded-md'>
          <img className='inline-block bg-gray-200 w-1/2 h-full rounded-tl-md rounded-bl-md' alt='' src={createUser}/>
          <div className='p-4 bg-gray-100 rounded-tr-md rounded-br-md'>
            <div className='step'> Step 1:</div>
            <div className='step'> Create a user with your username and four digit passcode.</div>
          </div>
        </div>

        <div className='m-4 flex shadow w-2/3 mx-auto rounded-md'>
          <img className='inline-block bg-gray-200 w-1/2 h-full rounded-tl-md rounded-bl-md' alt='' src={createRoom}/>
          <div className='p-4 bg-gray-100 rounded-tr-md rounded-br-md'>
            <div className='step'> Step 2:</div>
            <div className='step'> Create a room with the name of your choice.</div>
          </div>
        </div>

        <div className='m-4 flex shadow w-2/3 mx-auto rounded-md'>
          <img className='inline-block bg-gray-200 w-1/2 h-full rounded-tl-md rounded-bl-md' alt='' src={sendMessages}/>
          <div className='p-4 bg-gray-100 rounded-tr-md rounded-br-md'>
            <div className='step'> Step 3:</div>
            <div className='step'> Start sending messages. Tell people about your life, your adventures and your passions!</div>
          </div>
        </div>

      </div>
      <div className='block'>
        <div className=''>
          <Link to='/login'>
            <div className={`body-section transition duration-500 ease-in-out hover:shadow-xl`}>
              Login
              <span className='_md:hidden float-right' role='img' aria-label=''>
                <img alt='' className='h-5 mr-1' src={login}/>
              </span>
            </div>
          </Link>
          <Link to='/create-user'>
            <div className={`body-section transition duration-500 ease-in-out hover:shadow-xl`}>
              Create User <span className='_md:hidden float-right' role='img' aria-label=''><img alt='' className='h-5 mt-1' src={userAdd}/></span>
            </div>
          </Link>
          <Link to='/about'>
            <div className={`body-section transition duration-500 ease-in-out hover:shadow-xl align-middle `}>
              About <span className='_md:hidden float-right -my-1' role='img' aria-label=''><img alt='' className='h-4 mt-2 mr-1' src={menu}/></span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
