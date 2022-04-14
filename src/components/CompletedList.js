import React from 'react'
import Completed from './Completed'

const CompletedList = (props) => {
    return (
        <div>
            { props.completed.map((goal,index) => {
               
               return <Completed key = {index} completed={props.completed} removeGoal={props.removeGoal} goal= {goal} onToggle={props.onToggle} reOrderCompletedUp={props.reOrderCompletedUp} reOrderCompletedDown={props.reOrderCompletedDown}/>
                }
           )}
        </div>
    )
}

export default CompletedList
