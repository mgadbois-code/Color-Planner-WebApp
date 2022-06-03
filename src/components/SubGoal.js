import React from "react"
import {ReactComponent as CheckboxChecked} from '../checkbox_checked.svg'
import {ReactComponent as CheckboxUnchecked} from '../checkbox_unchecked.svg'
import {ReactComponent as SunIcon} from '../sun.svg'
import {ReactComponent as EmptySunIcon} from '../empty-sun.svg'


function SubGoal(props) {
    return (
        <div>
            <div className="task-list">
            {props.tasks.map((task,index) => 
                <div className="flex">
                   {task.done ? <div key = {index}  className='task-list-item' onClick={(event) => {event.stopPropagation(); props.toggleDone(props.goal.id,task.id)}}> <CheckboxChecked className='checkbox-subgoal'/> {task.title}</div> :
                   <div key = {index}  className='task-list-item' onClick={(event) => {event.stopPropagation(); props.toggleDone(props.goal.id,task.id)}}> <CheckboxUnchecked className='checkbox-subgoal'/> {task.title}</div>}
                    {task.done ? <span style={{paddingLeft: "5px"}}>{` - ${task.dateDone}`}</span> : 
                    <div style={{margin:'0px'}} onClick={(event) => {
                        event.stopPropagation();
                        props.toggleToday(props.goal.id, task.id)
                        if(props.goal.tasks.filter(otherTask => !otherTask.done).filter((otherTask)=> otherTask.today == task.today).length == props.goal.tasks.filter(otherTask => !otherTask.done).length){
                            props.setAllTodayStatus(!task.today)
                        }
                    }}>{props.goal.visible && (task.today ? <SunIcon style={{width:'32px',height:'auto', padding:'0px', marginTop:'-3px' }}/> :<EmptySunIcon style={{width:'32px',height:'auto',padding:'0px', marginTop:'-3px' }}/>)}</div>}
                </div>)}
            </div>
            
        </div>
    )
}

export default SubGoal
