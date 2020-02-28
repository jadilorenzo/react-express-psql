import React from 'react';
import {Link} from 'react-router-dom'
import login from '../components/icon/login.svg'
import menu from '../components/icon/menu.svg'
import userAdd from '../components/icon/user-add.svg'

function LandingPage() {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className='header'>Messages <Link to='/'>💬</Link></div>
      <div className='block'>
        {/*<div className={`body-section  h-full text-center`}>
          <div className=''>Chat</div>
          <div className='text-center' style={{fontSize: '100px'}}>💬</div>
        </div>*/}
        <div className=''>
          <Link to='/login'>
            <div className={`body-section transition duration-500 ease-in-out hover:shadow-xl`}>
              Login
              <span className='_md:hidden float-right' role='img' aria-label=''>
                <img className='h-5 mr-1' src={login}/>
              </span>
            </div>
          </Link>
          <Link to='/create-user'>
            <div className={`body-section transition duration-500 ease-in-out hover:shadow-xl`}>
              Create User <span className='_md:hidden float-right' role='img' aria-label=''><img className='h-5 mt-1' src={userAdd}/></span>
            </div>
          </Link>
          <Link to='/about'>
            <div className={`body-section transition duration-500 ease-in-out hover:shadow-xl align-middle `}>
              About <span className='_md:hidden float-right -my-1' role='img' aria-label=''><img className='h-4 mt-2 mr-1' src={menu}/></span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
