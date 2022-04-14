import Task from "./Task";
import React from "react"


const TaskList = (props) => {
    let tasks = props.goals.filter(goal => goal.visible).map((goal) => goal.tasks.filter((task) => !task.done)).reduce((prev,curr)=> prev.concat(curr), [])
    if (tasks.filter(task => (!task.done && task.today)).length == 0){
        return <h3 style={{color:"gray", marginLeft:"25%" }}>No Tasks To Show</h3>
    }

    return (
        <div>
            { props.goals.filter(goal => goal.visible).map((goal) => goal.tasks.filter((task) => {return (task.today && !task.done)}).map((task) => <Task reOrderTaskUp={props.reOrderTaskUp} reOrderTaskDown={props.reOrderTaskDown} onToggle={props.onToggle} removeTask={props.removeTask}  goal= {goal} task={task} />))}
        </div>
    )
}

export default TaskList
