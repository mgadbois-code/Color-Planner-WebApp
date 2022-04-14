import React from 'react'
import { useState } from "react"
import EditButton from './EditButton'
import ItemRemoveButton from './ItemRemoveButton'
import ReOrderButtons from './ReOrderButtons'
import { HuePicker, SliderPicker } from "react-color"
import GoalList from './GoalList'

const EditGoal = ({submitGoalEdits,toggleShowEditGoal,reOrderTaskUp,reOrderTaskDown,showDialogBox, reOrderGoalUp,reOrderGoalDown, goalId, goalColor, goal,goals}) => {
    var [goalName,setGoalName] = useState(goal.title)
    var [goalDueDate, setGoalDueDate] = useState(goal.dueDate)
    var [color,setColor] = useState(goalColor)
    var [newTask,setNewTask] = useState("")
    // var [taskArr, setTaskArr] = useState(goal.tasks)

    // const editGoalColor = (newColor,event) =>{
    //     // let colorValue = newColor.hex + "80";
    //     // setColor(colorValue)

    //     // console.log(color.hex)

    // }

    const removeTask = (taskId) => {
        let tasks = goal.tasks;
        tasks = tasks.filter(task => {
            return task.id != taskId
        })
        tasks = tasks.map((task,index) => {
            task.id = index + 1
            return task
        })
        // setTaskArr(tasks)
        goal.tasks = tasks
        submitGoalEdits(goalId,goal)
        
    }


    const addTask = (taskTitle) =>{
        if(taskTitle==""){
            showDialogBox("Enter a task name")
            return
        }
        let newTaskObj = {id:goal.tasks.length + 1, title: taskTitle, done:false}
        goal.tasks = [...goal.tasks,newTaskObj]
        setNewTask("")
        // goal.tasks = taskArr;
        // console.log(taskArr)
        
    }

    const editGoalTitle = (newTitle)=>{
        goal.title= newTitle
        setGoalName(newTitle)

    }
  

    const editGoalDueDate = (newDueDate) =>{
        goal.dueDate = newDueDate
        setGoalDueDate(newDueDate)
    }

    const editGoalColor =(newColor,event) => {
        let newColorValue = newColor.hex + "80";
        goal.color = newColorValue
        setColor(newColorValue)
    }

    const editTaskTitle = (taskId, newTitle) => {
        let tasks = goal.tasks
        tasks = tasks.map(task => {
            if(task.id == taskId){
                task.title = newTitle;
            }
        return task
        })
        // setTaskArr(tasks)
        goal.tasks = tasks
        submitGoalEdits(goal.id,goal)
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
          event.preventDefault();
          addTask(newTask)
          submitGoalEdits(goalId,goal)
        //   console.log("Enter Press")
        }
      }

    return (
        <div style={{border:"solid 6px", borderColor: goal.color}}>
            <div className="flex header">
                <div className="header">
                    <input autoFocus className="h3 edit-goal-title" placeholder={goal.title} value={goal.title} onChange={(event) => {editGoalTitle(event.target.value)}}></input>
                    <ReOrderButtons styling="goal-reorder" reOrderUp={() => {reOrderGoalUp(goal.id)}} reOrderDown={() => {reOrderGoalDown(goal.id)}} size="40px" />
                </div>
    
                    <button onClick={() => {goal.showEditGoal=false;
                        submitGoalEdits(goalId,goal)}} className="btn" style={{backgroundColor:goal.color, marginRight:"20px", color:"black", fontWeight:"bold"}}>{goal.tasks.length == 0 ? "Remove" : "Done"}</button>
 
            </div>
          
                    <h6>Due Date <span style={{color:"gray"}}>(Optional)</span>: </h6>
                    <input type="date" className="h6 edit-due-date" placeholder="Due Date" value={goal.dueDate} onChange={(event) => {editGoalDueDate(event.target.value)}} />
               
            <div className="flex">
                <div>
                    <HuePicker color={goal.color} onChange={(color,event) => editGoalColor(color,event)} />
                {goal.tasks.map((task)=>
                    <div className="flex" style={{marginTop:"5px"}}>
                        <ReOrderButtons styling="task-reorder" reOrderUp={() => reOrderTaskUp(goalId,task.id,goal.tasks)} reOrderDown={() => reOrderTaskDown(goalId,task.id,goal.tasks)} size="20px" />
                        <input className="p" value={goal.tasks.filter(arrTask => arrTask.id == task.id)[0].title} onChange={(event) => {editTaskTitle(task.id,event.target.value)}}></input>
                        <ItemRemoveButton size="20px" className="p small-btn" removeGoal={() => {removeTask(task.id)}} allDone="1" />
                    </div>
                    )}
                    <div className="flex" style={{marginTop: "7px"}}>
                        <label style={{fontWeight:"bold", fontSize:"12px", backgroundColor:"white",padding:"12px 2px 2px"}} for="New Task">Add Task: </label>
                        <input style={{margin:"5px 7px 2px 0px"}}  name="New Task" className="p" value={newTask} placeholder="New Task" onChange={(event) => {setNewTask(event.target.value)}} onKeyPress={handleKeyPress} />
                        <button style = {{backgroundColor:"green", color:"white",fontSize:"20px",fontWeight:"bold",margin:"5px 0px 5px 0px", padding:"0px 5px 0px 5px"}}
                         onClick ={(event) => {addTask(newTask); submitGoalEdits(goalId,goal)}} className="plus-btn"> + </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditGoal
