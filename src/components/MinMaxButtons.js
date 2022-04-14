import React from "react"

const MinMaxButtons = ({toggleMiniTasks, toggleMiniGoals,miniGoals, miniTasks,component}) => {
    return (
        <div style={{display:"flex", flexDirection:"row-reverse"}}>

           {((component == "Goals" || miniGoals) && !miniTasks) && <button onClick ={toggleMiniGoals}>{component == "Tasks" ? "G" : "-"}</button>}

            {((component == "Tasks" || miniTasks) && !miniGoals) && <button onClick={toggleMiniTasks}>{component=="Goals" ?  "T" : "-"}</button>}
        </div>
        )
}

export default MinMaxButtons
