import React from 'react'
import Goal from './Goal'

const HiddenList = ({goals, toggleVisible, onToggle, toggleDone, removeGoal}) => {
  return (
    <div>
        {goals.filter((goal)=>!goal.visible).map((goal) => {
            return <Goal hidden={goal.visible}  onToggle={onToggle} goal={goal} goals={goals} toggleVisible={toggleVisible} toggleDone={toggleDone} removeGoal={removeGoal}/>
        })}
    </div>
  )
}

export default HiddenList