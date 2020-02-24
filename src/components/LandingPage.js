import React from 'react';
import {Link} from 'react-router-dom'
import Styles from './styles'
import Enter from '../Enter.png'

function LandingPage() {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className={`${Styles.header}`}>Messages <Link to='/'>💬</Link></div>
      <div className='block '>
        {/*<div className={`${Styles.bodySection}  h-full text-center`}>
          <div className=''>Chat</div>
          <div className='text-center' style={{fontSize: '100px'}}>💬</div>
        </div>*/}
        <div className=''>
          <Link to='/login'>
            <div className={`${Styles.bodySection} transition duration-500 ease-in-out hover:shadow-xl`}>
              Login
              <span className='_md:hidden float-right' role='img' aria-label=''>
                <img className='pt-1 h-4' src={Enter}/>
              </span>
            </div>
          </Link>
          <Link to='/create-user'>
            <div className={`${Styles.bodySection} transition duration-500 ease-in-out hover:shadow-xl`}>
              Create User <span className='_md:hidden float-right' role='img' aria-label=''>+</span>
            </div>
          </Link>
          <Link to='/about'>
            <div className={`${Styles.bodySection} transition duration-500 ease-in-out hover:shadow-xl`}>
              About <span className='_md:hidden float-right -my-1' role='img' aria-label=''>…</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
