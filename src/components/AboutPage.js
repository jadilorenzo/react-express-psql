import React, {useEffect, useState} from 'react';
import {Redirect, Link} from 'react-router-dom'
import Styles from './styles'
import logo from '../logo.svg'
import logo2 from '../logo2.svg'
import logo3 from '../logo3.png'

function CreateRoomPage() {
  const [redirect, setRedirect] = useState(false)

  if (redirect) {
    return <Redirect to='/messages'/>
  }

  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className={`${Styles.header}`}>Messages</div>
      <div className={`${Styles.bodySection}`}>
        <div className=''>
          <img className='mx-auto shadow bg-gray-300 rounded-full w-32 h-32' src={logo}></img>
          <div className='mt-4 mx-auto text-center'>Made with React</div>
        </div>
      </div>
      <div className={`${Styles.bodySection}`}>
        <div className=''>
          <img className='mx-auto shadow bg-gray-300 rounded-full w-32 h-32' src={logo2}></img>
          <div className='mt-4 mx-auto text-center'>Made with Tailwind CSS</div>
        </div>
      </div>
      <div className={`${Styles.bodySection}`}>
        <div className=''>
          <div className='mx-auto shadow bg-gray-300 rounded-full w-32 h-32'><img className='w-16 m-auto pt-8' src={logo3}></img></div>
          <div className='mt-4 mx-auto text-center'>Made with Postgres</div>
        </div>
      </div>
      <Link to='/'>
        <div className={`${Styles.bodySection} text-center transition duration-500 ease-in-out hover:shadow-xl`}>
          Home
        </div>
      </Link>
      <br/>
    </div>
  );
}

export default CreateRoomPage;
