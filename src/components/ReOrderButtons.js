import React from 'react'

const ReOrderButtons = ({styling,reOrderUp, reOrderDown}) => {
    return (
        <div className="flex">
            <button  onClick={(event) =>{event.stopPropagation();reOrderUp()}} className={`${styling}`} style={{background:"none"}}>⬆️</button>
            <button onClick={(event) =>{event.stopPropagation();reOrderDown()}} className={`${styling}`} style={{background:"none"}}>⬇️</button>
        </div>
    )
}

ReOrderButtons.defaultProps = {
    reOrderUp: () => console.log("up"),
    id: -1,
    arr: []
}
export default ReOrderButtons
