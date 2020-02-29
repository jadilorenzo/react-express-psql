import React from 'react';
import {Link} from 'react-router-dom'
import Header from './Header'
import react from './icon/react.svg'
import tailwind from './icon/tailwind.svg'
import postgres from './icon/postgres.png'

function AboutPage() {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <Header>
        Resources
      </Header>
      <div className='block md:flex'>
        <div className={`body-section md:w-1/3`}>
          <div className=''>
            <img alt='tailwind' className='mx-auto shadow bg-gray-300 rounded-full w-32 h-32' src={tailwind}></img>
            <div className='mt-4 mx-auto text-center'>Made with Tailwind CSS</div>
          </div>
        </div>
        <div className={`body-section md:w-1/3`}>
          <div className=''>
            <img alt='react' className='mx-auto shadow bg-gray-300 rounded-full w-32 h-32' src={react}></img>
            <div className='mt-4 mx-auto text-center'>Made with React</div>
          </div>
        </div>
        <div className={`body-section md:w-1/3`}>
          <div className=''>
            <div className='mx-auto shadow bg-gray-300 rounded-full w-32 h-32'><img alt='postgres' className='w-16 m-auto pt-8' src={postgres}></img></div>
            <div className='mt-4 mx-auto text-center'>Made with Postgres</div>
          </div>
        </div>
      </div>
      <Link to='/'>
        <div className={`body-section text-center transition duration-500 ease-in-out hover:shadow-xl`}>
          Home
        </div>
      </Link>
      <br/>
    </div>
  );
}

export default AboutPage;
