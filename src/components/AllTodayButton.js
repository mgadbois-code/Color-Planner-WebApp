import React from 'react'
import {ReactComponent as SunIcon} from '../sun.svg'
import {ReactComponent as EmptySunIcon} from '../empty-sun.svg'

const AllTodayButton = ({goalId, status, toggleAllToday, setAllTodayStatus}) => {
  return (
    <div>
      {status ? <EmptySunIcon onClick={(event) => {event.stopPropagation(); setAllTodayStatus(!status); toggleAllToday(goalId,status)}}/> : <SunIcon style={{border:"none",fontSize:"20px", background:"none" }} onClick={(event) => {event.stopPropagation(); setAllTodayStatus(!status); toggleAllToday(goalId,status)}}/>}
        {/* <button style={{border:"none",fontSize:"20px", background:"none" }} onClick={(event) => {event.stopPropagation(); setAllTodayStatus(!status); toggleAllToday(goalId,status)}}>{status ? "🟡" : "🟢"}</button> */}
    </div>
  )
}

export default AllTodayButton