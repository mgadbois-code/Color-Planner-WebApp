import React from "react"


function SubGoal(props) {
    return (
        <div>
            <ul>
            {props.tasks.map((task,index) => 
                <div className="flex">
                    <li key = {index}  className={`done-${task.done}`} onClick={(event) => {
                    event.stopPropagation();
                    props.toggleDone(props.goal.id,task.id)}}>{task.title}
                    </li>
                    {task.done ? <span style={{paddingLeft: "5px"}}>{` - ${task.dateDone}`}</span> : 
                    <div style={{paddingLeft:"5px"}} onClick={(event) => {
                        event.stopPropagation();
                        props.toggleToday(props.goal.id, task.id)
                        if(props.goal.tasks.filter(otherTask => !otherTask.done).filter((otherTask)=> otherTask.today == task.today).length == props.goal.tasks.filter(otherTask => !otherTask.done).length){
                            props.setAllTodayStatus(!task.today)
                        }
                    }}>{props.goal.visible && (task.today ? "🟢" : "🟡")}</div>}
                </div>)}
            </ul>
            
        </div>
    )
}

export default SubGoal
