import React, {useState} from 'react'
import Markdown from 'markdown-to-jsx';
import Api from '../Api'
import {v4} from 'uuid'

const MessageComponent = ({message, lastRef, reactions}) => {
  const [selected, setSelected] = useState(false)


  const messageClick = () => {
    if (!reactions.filter(x => x.mid === message.mid).length > 0) {
      setSelected(s => !s)
    }
  }

  const imogiClick = (i) => {
    console.log(message.mid, i);
    Api.post('reactions', {reactid: v4(), value: i, mid: message.mid})
  }

  const reactionForm = (
    <div>
      <button type='button' onClick={() => imogiClick('😀')} className='reaction-button reaction-button-start'><span role='img' aria-label=''>😀</span></button>
      <button type='button' onClick={() => imogiClick('😕')} className='reaction-button'><span role='img' aria-label=''>😕</span></button>
      <button type='button' onClick={() => imogiClick('👍')} className='reaction-button reaction-button-end'><span role='img' aria-label=''>👍</span></button>
    </div>
  )

  return (
    <div>
      <div onClick={messageClick} ref={message.ref ? lastRef : React.createRef()} className={`bubble`} key={message.index}>
        {message.name}: {message.message !== null ? <Markdown>{message.message}</Markdown> : <span/>}
        {selected ? reactionForm : <span/>}
        <div>
          {
            (reactions.filter(x => x.mid === message.mid).length > 0)
            ? reactions.filter(x => x.mid === message.mid)[0].value
            : ''
          }
        </div>
      </div>
    </div>
  )
}

export default MessageComponent
