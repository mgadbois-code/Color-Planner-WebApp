import React from "react"

const MinMaxButtons = ({toggleMiniTasks, toggleMiniGoals,miniGoals, miniTasks,component, goals}) => {
    let active = goals.filter(goal => goal.visible).map((goal) => goal.tasks.filter((task) => !task.done)).reduce((prev,curr)=> prev.concat(curr), []).filter(task => (!task.done && task.today)).length !== 0
    // let active = true
    return (
        <div style={{display:"flex", flexDirection:"row-reverse"}}>

           {((component == "Goals" || miniGoals) && !miniTasks) && <button className= {`min-max-btn-Goals`} onClick ={toggleMiniGoals}>{component == "Tasks" ? "Goals" : "-"}</button>}

            {((component == "Tasks" || miniTasks) && !miniGoals) && <button className={`min-max-btn-${active}`} onClick={toggleMiniTasks}>{component=="Goals" ?  "Today's Tasks" : "-"}</button>}
        </div>
        )
}

export default MinMaxButtons
