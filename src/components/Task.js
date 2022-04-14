import ItemRemoveButton from "./ItemRemoveButton"
import React from "react"
import ReOrderButtons from "./ReOrderButtons"

const Task = (props) => {
    return (
        
        <div className="item pointer task" style={{backgroundColor: props.goal.color, overflow:"auto"}} onClick={(event) =>props.onToggle(props.goal.id,props.task.id)}>
            <div className="header">
            <h3 className="detail" >{props.task.title}</h3>
                <div style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
                <ReOrderButtons styling="goal-reorder" style={{backgroundColor:props.goal.color}} reOrderUp={() => props.reOrderTaskUp(props.goal.id,props.task.id, props.goal.tasks, true)} reOrderDown={() => props.reOrderTaskDown(props.goal.id,props.task.id, props.goal.tasks, true)} />
                <ItemRemoveButton removeGoal={() => props.removeTask(props.goal.id,props.task.id)} allDone="1" />
                </div>                
            </div>
        </div>
        
    )
}

export default Task
