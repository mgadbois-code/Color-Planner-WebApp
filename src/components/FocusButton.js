import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import React from "react"



const FocusButton = ({toggleVisible, goalId, visible}) => {
    return (
        <div style={{fontSize:"24px"}}>
            {visible && <FontAwesomeIcon icon={faEye} onClick = {(event) => {event.stopPropagation(); toggleVisible(goalId);}} />}
            {!visible && <FontAwesomeIcon icon={faEyeSlash} onClick = {(event) => {event.stopPropagation(); toggleVisible(goalId);}} />}
        </div>
    )
}

export default FocusButton
