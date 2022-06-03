import SubGoal from "./SubGoal"
import ReOrderButtons from "./ReOrderButtons"
import React from "react"
import {ReactComponent as CheckboxChecked} from '../checkbox_checked.svg'
import {ReactComponent as CheckboxUnchecked} from '../checkbox_unchecked.svg'
import {ReactComponent as TrashIcon} from '../trash.svg'



const Completed = ({goal, removeGoal,onToggle,reOrderCompletedUp,reOrderCompletedDown }) => {

    //order Tasks by whether they are done
    // const doneTasks = goal.tasks.filter((task) => task.done)
    // const undoneTasks = props.goal.tasks.filter((task) => !task.done)
  
    const tasks= goal.tasks
    var numericDueDate = `${goal.dueDate.substr(5,)}-${goal.dueDate.substr(0,4)}`
    
    return (
        <div className="item pointer" style={{border:"solid 6px", borderColor: goal.color, overflow:"auto",background:`${goal.color}`} } onClick={() => onToggle(goal.id) } >
            
            <div className="header" style={{marginTop:"-5px"}}>
               <div className="flex">
                    <h3 className="detail flex" style={{marginRight:"20px", fontWeight:'550'}}  onClick={() => onToggle(goal.id)}>{goal.title}</h3>
                    <ReOrderButtons styling="completed-reorder" reOrderUp={(event) => {reOrderCompletedUp(goal.id);}} reOrderDown={(event) => {reOrderCompletedDown(goal.id)}} />
                </div>
                <div className="header">
                    <TrashIcon style={{width:'40px', height:'auto', margin:'10px'}} onClick={(event) => {event.stopPropagation(); removeGoal(goal.id)}} />
                </div>

            </div>
            <h5 style={{ fontWeight:'bold'}}>{`Completed: ${goal.dateDone}`}</h5>
            {goal.dueDate !=="" && <h6 onClick={() => onToggle(goal.id)} className="detail">Due: {numericDueDate} </h6>}

            <div className="flex" style={{overflow:"auto"}}>
                {!goal.showSubGoals && tasks.map((task) =>{
                    if(task.done){
                        return <CheckboxChecked className='checkbox-goal'/>
                    }
                    return <CheckboxUnchecked className='checkbox-goal'/>
                })}
            </div>

            {goal.showSubGoals && <SubGoal goal={goal} toggleDone={()=>{return}} tasks={tasks}/>}

        </div>
    )
}

export default Completed
