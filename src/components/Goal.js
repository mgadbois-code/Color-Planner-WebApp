import SubGoal from "./SubGoal"
import ItemRemovebutton from "./ItemRemoveButton"
import EditButton from "./EditButton"
import FocusButton from "./FocusButton"
import EditGoal from "./EditGoal"
import AllTodayButton from "./AllTodayButton"
import React from "react"
import { useState } from "react"
import {ReactComponent as CheckboxChecked} from '../checkbox_checked.svg'
import {ReactComponent as CheckboxUnchecked} from '../checkbox_unchecked.svg'



const Goal = (props) => {

    //order Tasks by whether they are done
    var doneTasks = props.goal.tasks.filter((task) => task.done)
    var undoneTasks = props.goal.tasks.filter((task) => !task.done)
    
    var done = undoneTasks.length == 0
    // console.log(`From goal.js from ${props.goal.title}: undone tasks are ${undoneTasks} `)
    
    const [allTodayStatus, setAllTodayStatus] = useState(undoneTasks.filter(task => task.today).length > 0);
    const displayDate = (date) => {
        let dateArr = date.split('-')
        if(dateArr[1][0] == 0){
            dateArr[1] = dateArr[1][1]
        
        }
        if(dateArr[2][0] == 0){
            dateArr[2] = dateArr[2][1]
        
        }
        let formattedDate = dateArr[1] + '/' + dateArr[2] + '/' + dateArr[0]
        return formattedDate
    }
    
    
    if(props.showEditGoal){
        return (
            <EditGoal submitGoalEdits={props.submitGoalEdits} goals={props.goals} reOrderGoalUp={props.reOrderGoalUp} reOrderGoalDown={props.reOrderGoalDown} reOrderTaskUp={props.reOrderTaskUp} reOrderTaskDown={props.reOrderTaskDown} 
            addTask={props.addTask} removeTask={props.removeTask} toggleShowEditGoal={props.toggleShowEditGoal} goalId = {props.goal.id} goalColor={props.goal.color} goalTitle={props.goal.title} goal={props.goal} />
        )
    }

    return (
        <div className="item pointer" style={{border:"solid 6px", borderColor: props.goal.color, overflow:"auto",background:`${props.goal.color}`}} onClick={() => props.onToggle(props.goal.id)}>
            
            <div className="header" style={{marginTop:"-5px"}}>
                {/* goal title */}
                <h3 className="detail flex"  style={{fontWeight: '550'}} onClick={() => props.onToggle(props.goal.id)}>{props.goal.title} 
                
                
                </h3>

                <div className="header">
                    {props.goal.visible && <AllTodayButton allDone={undoneTasks.length} goalId={props.goal.id} toggleAllToday={props.toggleAllToday} status={!undoneTasks.filter(task => task.today).length > 0} tasks={props.goal.tasks} setAllTodayStatus={setAllTodayStatus} />}
                    {props.goal.visible && <EditButton toggleShowEditGoal={props.toggleShowEditGoal} goalId = {props.goal.id} />}
                    <FocusButton toggleVisible={props.toggleVisible} goalId={props.goal.id} visible={props.goal.visible} />
                    {<ItemRemovebutton allDone={undoneTasks.length} removeGoal={() => props.removeGoal(props.goal.id,done)}/>}
                </div>

            </div>

            {props.goal.dueDate !=="" && <h6 style={{fontWeight:'bold'}} onClick={() => props.onToggle(props.goal.id)} className="detail">Due: {displayDate(props.goal.dueDate) } </h6>}

            <div className="flex" style={{overflow:"auto"}}>
                {!props.goal.showSubGoals && props.goal.tasks.map((task) =>{
                    if(task.done){
                        return <CheckboxChecked className='checkbox-goal' />
                    }
                    return <CheckboxUnchecked className='checkbox-goal' />
                })}
            </div>

            {props.goal.showSubGoals && <SubGoal goal={props.goal} toggleDone={props.toggleDone} setAllTodayStatus={setAllTodayStatus} toggleToday={props.toggleToday} tasks={props.goal.tasks}/>}

        </div>
    )
}

export default Goal
