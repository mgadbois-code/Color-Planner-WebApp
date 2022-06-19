import React from 'react'
import './calendar.css'
import {ReactComponent as Exit} from '../../exit.svg'
import {ReactComponent as Forward} from '../../forward_arrow.svg'
import {ReactComponent as Back} from '../../back_arrow.svg'

import logo from '../../Color-Planner_Icon.png'
import { useState } from 'react'

const Calendar = ({date, completed, goals, setShowCalendar}) => {
    var weekDay = date.getDay();
    var currMonth = date.getMonth()
    var currYear = date.getFullYear();
    var currDate = date.getDate()
    const [year, setYear] = useState(currYear)
    const [month,setMonth] = useState(date.getMonth())
    var theDate = new Date(currYear, month,1)
    const [dayOffset, setDayOffset] = useState(theDate.getDay())
    // working on tyhis
    const monthsArr = ['January','Febuary','March','April', 'May','June','July','August','September','October','November','December']
    var monthDayNumberArr = [31,28,31,30,31,30,31,31,30,31,30,31]
    
    // Gets All Tasks in goals and completed and puts the ones completed in the current month in an array in the index of the day completed - 1
    const getCompletedTasks = (month, year) => {
        let tasks = goals.reduce((prevCompleted,completed) => {
                let taskArr = completed.tasks.filter((task)=>{
                    task.color = completed.color
                   return (task.hasOwnProperty('dateDone') && task.dateDone.split('/')[0] == (month+1) && task.dateDone.split('/')[2] == (year))
               })
               return prevCompleted.concat(taskArr)
           }, []).concat(completed.reduce((prevCompleted,completed) => {
               let taskArr = completed.tasks.filter((task)=>{
                    task.color = completed.color
                  return (task.hasOwnProperty('dateDone') && task.dateDone.split('/')[0] == (month+1) && task.dateDone.split('/')[2] == (year))
              })
              return prevCompleted.concat(taskArr)
          }, []))
          let dayArr = [...Array(monthDayNumberArr[month]).keys()].map((day)=>[])
          
          for(let i = 0; i< tasks.length; i++){
            dayArr[tasks[i].dateDone.split('/')[1] -1].push(tasks[i])

          }
          return dayArr
          
        }
        
    const getDueGoals = (month, year) => {
        let dueGoals = goals.filter((goal) => {
            if(goal.dueDate.length == 0){
                return false
            }
            let dueDate = goal.dueDate.split('-')
            if( dueDate[1][0] == 0){
                dueDate[1] = dueDate[1][1]
            }
            return dueDate[0] == year && dueDate[1] == month+1
        })

        let dayArr = [...Array(monthDayNumberArr[month]).keys()].map((day)=>[])
          
          for(let i = 0; i< dueGoals.length; i++){

            dayArr[dueGoals[i].dueDate.split('-')[2] -1].push(dueGoals[i])

          }
          return dayArr
    }

    const [completedTasks, setCompletedTasks] = useState(getCompletedTasks(month, year))
    const [dueGoals, setDueGoals] = useState(getDueGoals(month,year))
    
    const setDate = (dateStr) => {
        let dateArr = dateStr.split('-');
        if(dateArr[1][0] == 0){
            dateArr[1] = dateArr[1][1]
        }
        if(dateArr[2][0] == 0){
            dateArr[2] = dateArr[2][1]
        }
        setMonth(dateArr[1] -1)
        setYear(dateArr[0])
        theDate = new Date(dateArr[0], dateArr[1] -1,1)
        setDayOffset(theDate.getDay()) 
        setCompletedTasks(getCompletedTasks(dateArr[1]-1,dateArr[0]))
        setDueGoals(getDueGoals(dateArr[1]-1,dateArr[0]))
    }
    
    
    

    var arr = [...Array(42).keys()]

    function changeMonth(forward){
        if(forward){
            if(month+1 >11){
                setYear(year +1)
                let newMonth = new Date(year, (month+1)%12, 1); setMonth(newMonth.getMonth()); setDayOffset(newMonth.getDay())
                setCompletedTasks(getCompletedTasks(newMonth.getMonth(), year+1))
                setDueGoals(getDueGoals(newMonth.getMonth(), year+1)) 
                
            }
            else{
                let newMonth = new Date(year, (month+1)%12, 1); setMonth(newMonth.getMonth()); setDayOffset(newMonth.getDay())
                setCompletedTasks(getCompletedTasks(newMonth.getMonth(), year))
                setDueGoals(getDueGoals(newMonth.getMonth(), year))
                
            }
        }
        else{
            if(month-1 <0){
                setYear(year -1)
                let newMonth = new Date(year, (month-1)%12, 1); setMonth(newMonth.getMonth()); setDayOffset(newMonth.getDay())
                setCompletedTasks(getCompletedTasks(newMonth.getMonth(), year-1))
                setDueGoals(getDueGoals(newMonth.getMonth(), year-1))
            }
            else{
                let newMonth = new Date(year, (month-1)%12, 1); setMonth(newMonth.getMonth()); setDayOffset(newMonth.getDay())
                setCompletedTasks(getCompletedTasks(newMonth.getMonth(), year))
                setDueGoals(getDueGoals(newMonth.getMonth(), year))
            }
            }
        return
    }
  
    return (
        <div className="calendar-container" onClick={(event) => event.stopPropagation()}>
            
                <div className="sign-in-header">
            <Exit className='exit-btn' onClick={()=>setShowCalendar(false)} />
                    <div className='month-header'>
                        <Back className='arrow-btn' id='back-btn' onClick={()=>{changeMonth(false)}}/>
                            <h1>{`${monthsArr[month]} ${year}`}</h1>
                        <Forward className='arrow-btn' id='forward-btn' onClick={()=>{changeMonth(true)}}/>
                    </div>
                {/* <img src={logo} alt="" /> */}
                <input type="date" className='date-picker' onChange={(event => setDate(event.target.value))} />
                </div>
                <div className="calendar">
                <div className="week-days-header">
                    <p id='sunday'>Sunday</p>
                    <p id='monday'>Monday</p>
                    <p id='tuesday'>Tuesday</p>
                    <p id='wednesday'>Wednesday</p>
                    <p id='thursday'>Thursday</p>
                    <p id='friday'>Friday</p>
                    <p id='saturday'>Saturday</p>
                </div>
                <div className="calendar-days">
                   {arr.map((monthDay) =>{
                    return <div className={`day-square-${(monthDay+1 - dayOffset) > 0 && (monthDay+1 - dayOffset) <= monthDayNumberArr[month]}-${(monthDay+1 - dayOffset) == currDate && month == currMonth && currYear == year}`} >
                        
                        
                        <div>{(monthDay+1 - dayOffset) > 0 && (monthDay+1 - dayOffset) <= monthDayNumberArr[month] ?
                            <div>
                                <h5 style={{position:'fixed'}}>{(monthDay+1 - dayOffset)}</h5>
                               {dueGoals[monthDay - dayOffset].length > 0 &&  
                               <div className="due-goal">
                                    <ul>
                                        {dueGoals[monthDay - dayOffset].map((goal) => <li  className='dueGoal-item' style={{background:`${goal.color}`, padding:'0px'}}>Due: {goal.title}</li>)}
                                    </ul>
                                </div>}
                                {completedTasks[monthDay - dayOffset].length > 0 && 
                                <div className="completed-tasks">
                                    <ul>
                                        {completedTasks[monthDay - dayOffset].map((task) => <li  className='task-item' style={{background:`${task.color}`}}>{task.title}</li>)}
                                    </ul>
                                </div>}
                            </div>
                            : ''  }
                         </div>
                        
                    </div>
                   })}

                </div>
                </div>
            
        </div>
      )
}

export default Calendar