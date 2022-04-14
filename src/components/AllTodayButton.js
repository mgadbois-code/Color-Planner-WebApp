import React from 'react'

const AllTodayButton = ({goalId, status, toggleAllToday, setAllTodayStatus}) => {
  return (
    <div>
        <button style={{border:"none",fontSize:"20px", background:"none" }} onClick={(event) => {event.stopPropagation(); setAllTodayStatus(!status); toggleAllToday(goalId,status)}}>{!status ? "🟢" : "🟡"}</button>
    </div>
  )
}

export default AllTodayButton