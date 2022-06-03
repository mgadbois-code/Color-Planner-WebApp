import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'
import { faCircleUp } from '@fortawesome/free-solid-svg-icons'
import { faCircleDown } from '@fortawesome/free-solid-svg-icons'

const ReOrderButtons = ({styling,reOrderUp, reOrderDown}) => {
    return (
        <div className="flex">
            <FontAwesomeIcon icon={faCircleUp} onClick={(event) =>{event.stopPropagation();reOrderUp()}} className={`${styling}`} />
            <FontAwesomeIcon icon={faCircleDown} onClick={(event) =>{event.stopPropagation();reOrderDown()}} className={`${styling}`}  />
            {/* <button  onClick={(event) =>{event.stopPropagation();reOrderUp()}} className={`${styling}`} style={{background:"none"}}>⬆️</button> */}
            {/* <button onClick={(event) =>{event.stopPropagation();reOrderDown()}} className={`${styling}`} style={{background:"none"}}>⬇️</button> */}
        </div>
    )
}

ReOrderButtons.defaultProps = {
    reOrderUp: () => console.log("up"),
    id: -1,
    arr: []
}
export default ReOrderButtons
