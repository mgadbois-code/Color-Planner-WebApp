import React from 'react'
import { ReactComponent as RedXIcon} from '../red_x_icon.svg'
import {ReactComponent as CheckMarkIcon} from '../check_mark.svg'

const ItemRemoveButton = ({removeGoal, allDone,size,className}) => {
    ItemRemoveButton.defaultProps= {
        size: "25px",
        className: "btn h2"
    }
    if(!allDone){
        return <CheckMarkIcon style={{width:`${size}`, height:'auto', margin:'15px', cursor:'pointer'}} onClick={(event) => {event.stopPropagation(); removeGoal()}}/>
    }
    else{
        return (
            <RedXIcon style={{width:`${size}`, height:'auto', margin:'15px', cursor:'pointer'}} onClick={(event) => {event.stopPropagation(); removeGoal()}}/>
        
        )
    }
}

export default ItemRemoveButton
