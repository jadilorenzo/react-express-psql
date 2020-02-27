import React, {useState} from 'react'
import send from './icon/up.svg'

export default (props = {onSubmit: console.log, type: 'text', theme: 'white', submitName: 'Submit'}) => {
  const [input, setInput] = useState()

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      props.onSubmit({input, setInput})
    }} className=''>
      {props.children}
      <hr/>
      <input type={props.type} value={input} className={`input`}  onChange={(e) => setInput(e.target.value)}/>
      {(props.theme === 'blue') ? (
        <button type='submit' className={`bg-blue-500 rounded-full h-8 w-8 text-white text-center shadow hover:shadow-md`}>
          <div className='mx-auto'>
            <img className='mx-auto w-1/2 h-1/2' alt='' src={send}/>
          </div>
        </button>
      ) : (
        <button className={`button`}>{props.submitName}</button>
      )}
    </form>
  )
};
