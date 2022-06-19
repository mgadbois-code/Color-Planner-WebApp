import React from 'react'
import Completed from './Completed'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import { useState } from 'react'

const CompletedList = (props) => {
    const [completed, setCompleted] = useState(props.completed)
    const [filter, setFilter] = useState('allTime')
    const month = props.date.getMonth() + 1
    const day = props.date.getDate()
    const year = props.date.getFullYear()
    const weekDay = props.date.getDay()

    const filterCompleted = (eventKey, completedList) =>{
        setFilter(eventKey)
        if(eventKey == 'today'){
            setCompleted(completedList.filter((goal)=>{
                let dateDoneArr = goal.dateDone.split('/')
                return dateDoneArr[0] == month && dateDoneArr[1] == day && dateDoneArr[2] == year
            }))
        }
        if(eventKey == 'thisWeek'){
            setCompleted(completedList.filter((goal)=>{
                let dateDoneArr = goal.dateDone.split('/')
                return dateDoneArr[0] == month && ((day - weekDay) <= dateDoneArr[1]) && dateDoneArr[2] == year
            }))
        }
        if(eventKey == 'thisMonth'){
            setCompleted(completedList.filter((goal)=>{
                let dateDoneArr = goal.dateDone.split('/')
                return dateDoneArr[0] == month && dateDoneArr[2] == year
            }))
        }
        if(eventKey == 'thisYear'){
            setCompleted(completedList.filter((goal)=>{
                let dateDoneArr = goal.dateDone.split('/')
                return dateDoneArr[2] == year
            }))
        }
        if(eventKey == 'allTime'){
            setCompleted(completedList)

        }
    }

    const removeGoal = async (id) => {
        let completedArr = await props.removeGoal(id)
        filterCompleted(filter,completedArr)

    }

    const reOrderCompletedUp = async (id) => {
        let completedArr = await props.reOrderCompletedUp(id)
        filterCompleted(filter,completedArr)

    }

    const reOrderCompletedDown = async (id) => {
        let completedArr = await props.reOrderCompletedDown(id)
        filterCompleted(filter,completedArr)

    }
    const onToggle = (id) => {
        filterCompleted(filter, props.onToggle(id))
    }


    return (
        <div>
            <DropdownButton onSelect={(eventKey)=>filterCompleted(eventKey,props.completed)} id="drop-down" title="Filter">
                <Dropdown.Item eventKey="today">Today</Dropdown.Item>
                <Dropdown.Item eventKey="thisWeek">This Week</Dropdown.Item>
                <Dropdown.Item eventKey="thisMonth">This Month</Dropdown.Item>
                <Dropdown.Item eventKey="thisYear">This Year</Dropdown.Item>
                <Dropdown.Item eventKey="allTime">All Time</Dropdown.Item>
                
            </DropdownButton>
            {completed.map((goal,index) => {
               
               return <Completed key = {index} completed={props.completed} removeGoal={() => removeGoal(goal.id)} goal= {goal} onToggle={() => onToggle(goal.id)} reOrderCompletedUp={() => reOrderCompletedUp(goal.id)} reOrderCompletedDown={()=>reOrderCompletedDown(goal.id)}/>
                }
           )}
        </div>
    )
}

export default CompletedList
