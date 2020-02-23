import React from 'react';
import {Link} from 'react-router-dom'
import Styles from './styles'

function LandingPage() {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className={`${Styles.header}`}>Messages</div>
      <Link to='/login'>
        <div className={`${Styles.bodySection} transition duration-500 ease-in-out hover:shadow-xl`}>
          Login <span className='_md:hidden text-md float-right' role='img' aria-label=''>➠</span>
        </div>
      </Link>
      <Link to='/create-user'>
        <div className={`${Styles.bodySection} transition duration-500 ease-in-out hover:shadow-xl`}>
          Create New User <span className='_md:hidden float-right' role='img' aria-label=''>+</span>
        </div>
      </Link>
      <Link to='/about'>
        <div className={`${Styles.bodySection} transition duration-500 ease-in-out hover:shadow-xl`}>
          About <span className='_md:hidden float-right -my-1' role='img' aria-label=''>…</span>
        </div>
      </Link>
    </div>
  );
}

export default LandingPage;
