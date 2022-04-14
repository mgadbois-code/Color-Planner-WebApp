import { useState } from "react"
import React from "react"

const AddTask = ({addToGoalColor,onSubmit,onAdd}) => {
    var [taskName, setTaskName] = useState("")
    

    const submitTasks = (event,taskName) =>{
        event.preventDefault();
        // setTaskArr([taskName])
        onSubmit([taskName])
    }
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          event.preventDefault();
          submitTasks(event,taskName)
        //   console.log("Enter Press")
        }
      }

    return (
        <div className="item pointer task" style={{backgroundColor: addToGoalColor, cursor:"default"}}>
            <div className="header">
                <input autoFocus className="h3 detail edit-task-title" value={taskName} onChange={(event) => setTaskName(event.target.value)} onKeyPress={handleKeyPress} placeholder="New Task" />
                <div className="flex">
                    <button onClick={(event) => submitTasks(event,taskName)} className="edit-task-btns" style={{backgroundColor:"green", color:"white", fontWeight:"400"}}>Done</button>
                    <button className="edit-task-btns" style={{backgroundColor:"red", marginRight:"20px", color:"white", fontWeight:"400"}} onClick={onAdd}>Never Mind</button>
                </div>
                {/* <ItemRemoveButton removeGoal={() => props.removeTask(props.goal.id,props.task.id)} allDone="1" /> */}
            </div>
        </div>
    )
}

export default AddTask
