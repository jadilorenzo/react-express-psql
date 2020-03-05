import React, {useState} from 'react'
import send from './icon/up.svg'
import PropTypes from 'prop-types';

const Form = (props = {onChange: console.log, onSubmit: console.log, type: 'text', button: 'white', submitName: 'Submit'}) => {
  const [input, setInput] = useState()

  let button = <div/>
  if (props.button === 'blue') {
    button = (
      <button type='submit' className='button-blue'>
        <div className='mx-auto'>
          <img className='mx-auto w-1/2 h-1/2' alt='' src={send}/>
        </div>
      </button>
    )
  } else if (props.button === 'white') {
    button = (
      <button className={`button`}>{props.submitName}</button>
    )
  } else {
    button = <div/>
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      props.onSubmit({input, setInput})
    }} className=''>
      {props.children}
      <hr/>
      <input type={props.type} value={input} className={`input`}  onChange={(e) => {
          if (props.onChange === undefined) {
            setInput(e.target.value)
          } else {
            props.onChange(e.target.value)
          }
        }
      }/>
    {button}
    </form>
  )
};

Form.propTypes = {
  type: PropTypes.oneOf(['text', 'password', 'name']),
  onSubmit: PropTypes.func,
  button: PropTypes.string,
  submitName: PropTypes.string.isRequired,
  onChange: PropTypes.func
}

export default Form
