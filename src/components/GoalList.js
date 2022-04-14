import React from "react"

import Goal from "./Goal"
const GoalList = (props) => {
    
    
    return (
        <div>
           { props.goals.filter((goal)=> goal.visible).map((goal,index) => {
               let showEditGoal = false
               if(goal.hasOwnProperty("showEditGoal")){
                    showEditGoal= goal.showEditGoal
               }
               
               return <Goal hidden={goal.visible} submitGoalEdits={props.submitGoalEdits} goals = {props.goals} reOrderTaskUp={props.reOrderTaskUp} reOrderTaskDown={props.reOrderTaskDown}
                reOrderGoalUp={props.reOrderGoalUp} reOrderGoalDown={props.reOrderGoalDown} showEditGoal={showEditGoal} key = {index} toggleVisible={props.toggleVisible}
                removeGoal={props.removeGoal} addTask={props.addTask} removeTask={props.removeTask} toggleShowEditGoal={props.toggleShowEditGoal} toggleDone = {props.toggleDone} toggleToday={props.toggleToday} toggleAllToday={props.toggleAllToday}
                goal= {goal} onToggle={props.onToggle} />
                }
           )}
        </div>
    )
}

export default GoalList
