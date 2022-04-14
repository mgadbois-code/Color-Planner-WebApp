import React from 'react'

const ItemRemoveButton = ({removeGoal, allDone,size,className}) => {
    ItemRemoveButton.defaultProps= {
        size: "25px",
        className: "btn h2"
    }
    return (
        <button style={{fontSize: size}} className={className} onClick={(event) => {event.stopPropagation(); removeGoal()}}>
            {allDone != 0 ? "❌": "✔️"}
        </button >
    )
}

export default ItemRemoveButton
