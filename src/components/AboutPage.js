import React from 'react';
import {Link} from 'react-router-dom'
import Styles from './styles'
import logo from '../logo.svg'
import logo2 from '../logo2.svg'
import logo3 from '../logo3.png'

function AboutPage() {
  return (
    <div className="h-screen w-screen bg-gray-100">
      <div className={`${Styles.header}`}>Messages</div>
      <div className='block md:flex'>
        <div className={`${Styles.bodySection} md:w-1/3`}>
          <div className=''>
            <img alt='tailwind' className='mx-auto shadow bg-gray-300 rounded-full w-32 h-32' src={logo2}></img>
            <div className='mt-4 mx-auto text-center'>Made with Tailwind CSS</div>
          </div>
        </div>
        <div className={`${Styles.bodySection} md:w-1/3`}>
          <div className=''>
            <img alt='react' className='mx-auto shadow bg-gray-300 rounded-full w-32 h-32' src={logo}></img>
            <div className='mt-4 mx-auto text-center'>Made with React</div>
          </div>
        </div>
        <div className={`${Styles.bodySection} md:w-1/3`}>
          <div className=''>
            <div className='mx-auto shadow bg-gray-300 rounded-full w-32 h-32'><img alt='postgres' className='w-16 m-auto pt-8' src={logo3}></img></div>
            <div className='mt-4 mx-auto text-center'>Made with Postgres</div>
          </div>
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

export default AboutPage;
