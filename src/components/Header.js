import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import React from "react"



const Header = (props) => {
    return (
        <header className="header">
           {props.title==="Goals" &&
            <button className="btn" style={{backgroundColor: props.buttonColor, color: "white"}} onClick={props.onAdd}>{props.buttonText}</button>
            }
           {props.title==="Tasks" &&
           <DropdownButton onSelect={props.onAdd} id="drop-down" title="Add">
          {props.goals.length > 0 && props.goals.map(goal => <Dropdown.Item  eventKey={goal.id} >{goal.title}</Dropdown.Item>)}
          {props.goals.length > 0 && <Dropdown.Divider />}
          <Dropdown.Item eventKey="newGoal">New Goal</Dropdown.Item>
         </DropdownButton>}
         {/* Keeps the tasks title on the right side */}
            {props.title!="New Tasks" ? <h1 style={{marginRight:"20px"}}>{props.titleName}</h1> :<div></div> }
            {props.title=="New Tasks" && <h1 style={{marginRight:"20px"}}>{props.titleName}</h1>}
            {props.title === "New Goal" &&
            <button className="btn" style={{backgroundColor: props.buttonColor, color: "white"}} onClick={props.onAdd}>{props.buttonText}</button>}
            
        </header>
    )
}

export default Header
