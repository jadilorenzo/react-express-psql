import React from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';

const Header = (props) => {
  return (
    <Link to='/'>
      <div className='header'>
        <span>{props.children}</span>
      </div>
    </Link>
  )
}

Header.propTypes = {
  children: PropTypes.any
}



export default Header;
