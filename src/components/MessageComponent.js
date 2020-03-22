import React, {useState, useEffect} from 'react'
import Markdown from 'markdown-to-jsx';
import Api from '../Api'
import {v4} from 'uuid'

const MessageComponent = ({message, lastRef, reactions, userId, users}) => {
  const [selected, setSelected] = useState(false)
  const [imogiHoverName, setImogiHoverName] = useState('')
  const [filteredReactions, setFilteredReactions] = useState(() => {
    return reactions.filter(x => x.mid === message.mid)
  })

  const messageClick = () => {
    if (!reactions.filter(x => x.mid === message.mid) !== []) {
      setSelected(s => !s)
    }
  }

  const imogiClick = (i) => {
    console.log(message.mid, i);
    Api.post('reactions', {reactid: v4(), value: i, mid: message.mid, uid: userId})
  }

  const onReactionMouseOver = (uid) => {
    setImogiHoverName(users.filter((user) => user.uid === uid)[0].name)
  }

  const reactionForm = (
    <div>
      <button type='button' onClick={() => imogiClick('😀')} className='reaction-button reaction-button-start'><span role='img' aria-label=''>😀</span></button>
      <button type='button' onClick={() => imogiClick('😕')} className='reaction-button'><span role='img' aria-label=''>😕</span></button>
      <button type='button' onClick={() => imogiClick('👍')} className='reaction-button reaction-button-end'><span role='img' aria-label=''>👍</span></button>
    </div>
  )

  useEffect(() => {
    setFilteredReactions(reactions.filter(x => x.mid === message.mid))
  }, [reactions])

  console.log({isReaction: (filteredReactions.length > 0), uid: (filteredReactions.length > 0) ? filteredReactions[0].uid : 'no uid'});

  return (
    <div key={message.mid}>
      <div onClick={messageClick} ref={message.ref ? lastRef : React.createRef()} className={`bubble`} key={message.index}>
        {message.name}: {message.message !== null ? <Markdown>{message.message}</Markdown> : <span/>}
        {selected &&  !(filteredReactions.filter(x => x.uid === userId).length > 0) ? reactionForm : <span/>}
        <div>
          {
            (filteredReactions.length > 0)
            ? filteredReactions.map(x => (
              <div
                className='reaction-button-end reaction-button-start reaction-button inline-block mr-1'
                onMouseOver={() => onReactionMouseOver(x.uid)}
                onMouseLeave={() => setImogiHoverName('')}
              >{x.value}</div>
            ))
            : ''
          }
          <span className='text-gray-500'>{` ${imogiHoverName}`}</span>
        </div>
      </div>
    </div>
  )
}

export default MessageComponent
