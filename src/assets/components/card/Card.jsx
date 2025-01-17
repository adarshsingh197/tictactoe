import React from 'react'
import './card.css'
import Icon from '../Icon/Icon'
const Card = ({onPlay,player,index,gameEnd}) => {
  let icon =<Icon/>
  if(player=="X"){
    icon =<Icon name={"cross"}/>
  }else if(player=="O"){
    icon=<Icon name={"circle"}/>
  }
  return (
    <div className='card' onClick={()=> !gameEnd&& player==""&&onPlay(index)}>
        {icon}
    </div>
  )
}

export default Card