import React, {useEffect, useState} from 'react';
import {Redirect, Link} from 'react-router-dom'
import Styles from './styles'

function LandingPage() {
  const [redirect, setRedirect] = useState(false)

  if (redirect) {
    return <Redirect to='/messages'/>
  }

  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className={`${Styles.header}`}>Messages</div>
      <Link to='/login'>
        <div className={`${Styles.bodySection} transition duration-500 ease-in-out hover:shadow-xl`}>
          Login
        </div>
      </Link>
      <Link to='/create-user'>
        <div className={`${Styles.bodySection} transition duration-500 ease-in-out hover:shadow-xl`}>
          Create New User
        </div>
      </Link>
      <Link to='/about'>
        <div className={`${Styles.bodySection} transition duration-500 ease-in-out hover:shadow-xl`}>
          About
        </div>
      </Link>
    </div>
  );
}

export default LandingPage;
