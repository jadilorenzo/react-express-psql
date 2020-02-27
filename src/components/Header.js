import React from 'react';
import {Link} from 'react-router-dom'

export default (props) => {
  return <Link to='/'><div className='header'><span aria-label='' role='img'>{props.children}</span></div></Link>
}
