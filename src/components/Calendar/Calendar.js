import React from 'react'
import './calendar.css'

import logo from '../../Color-Planner_Icon.png'
import { useState } from 'react'

const Calendar = ({date, completed, goals}) => {
    var weekDay = date.getDay();
    var currMonth = date.getMonth()
    var currYear = date.getFullYear();
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
                   return (task.dateDone.split('/')[0] == (month+1) && task.dateDone.split('/')[2] == (year))
               })
               return prevCompleted.concat(taskArr)
           }, []).concat(completed.reduce((prevCompleted,completed) => {
               let taskArr = completed.tasks.filter((task)=>{
                  return (task.dateDone.split('/')[0] == (month+1) && task.dateDone.split('/')[2] == (year))
              })
              return prevCompleted.concat(taskArr)
          }, []))
          var dayArr = [...Array(monthDayNumberArr[month]).keys()].map((day)=>[])
          
          for(let i = 0; i< tasks.length; i++){
            dayArr[tasks[i].dateDone.split('/')[1] -1].push(tasks[i].title)

          }
          return dayArr
          
        }
    
        const [completedTasks, setCompletedTasks] = useState(getCompletedTasks(month, year))
        
        console.log(completedTasks)
    
    

    var arr = [...Array(42).keys()]

    function changeMonth(forward){
        if(forward){
            if(month+1 >11){
                setYear(year +1)
            }
            let newMonth = new Date(year, (month+1)%12, 1); setMonth(newMonth.getMonth()); setDayOffset(newMonth.getDay())
        }
        else{
            if(month-1 <0){
                setYear(year -1)
            }
            let newMonth = new Date(year, (month-1)%12, 1); setMonth(newMonth.getMonth()); setDayOffset(newMonth.getDay())
        }
        return
    }
    return (
        <div className="calendar-container" onClick={(event) => event.stopPropagation()}>
            
                <div className="sign-in-header">
                    <button onClick={()=>{changeMonth(false)}}>back</button>
                <h1>{`${monthsArr[month]} ${year}`}</h1>
                    <button onClick={()=>{changeMonth(true)}}>forward</button>
                {/* <img src={logo} alt="" /> */}
                </div>
                <div className="calendar">
                <div className="week-days-header">
                    <p>Sunday</p>
                    <p>Monday</p>
                    <p>Tuesday</p>
                    <p>Wednesday</p>
                    <p>Thursday</p>
                    <p>Friday</p>
                    <p>Saturday</p>
                </div>
                <div className="calendar-days">
                   {arr.map((monthDay) =>{
                    return <div className={`day-square-${(monthDay+1 - dayOffset) > 0 && (monthDay+1 - dayOffset) <= monthDayNumberArr[month]}`}>
                        {/* <h3>{(monthDay - (dayOffset + 1) > 0) ? `${monthDay - dayOffset - 1}` : `${dayOffset}` }</h3> */}
                        <div className="due-goal"></div>
                        <div className="completed-goal"></div>
                        <div>{(monthDay+1 - dayOffset) > 0 && (monthDay+1 - dayOffset) <= monthDayNumberArr[month] ?
                            <div>
                                <h5>{(monthDay+1 - dayOffset)}</h5>
                                {completedTasks[monthDay - dayOffset].length > 0 && 
                                <div className="completed-tasks">
                                    <ul>
                                        {completedTasks[monthDay - dayOffset].map((taskTitle) => <li>{taskTitle}</li>)}
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