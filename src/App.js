import { useState, useEffect } from "react";
import React from "react"


import LoginPage from "./components/Login/LoginPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import calendarIcon from './calendar_icon.png'
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import GoalList from "./components/GoalList";
import MinMaxButtons from "./components/MinMaxButtons";
import CompletedList from "./components/CompletedList";
import HiddenList from "./components/HiddenList";
import Calendar from "./components/Calendar/Calendar";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, changeGoalIdDB } from "./firebase";

import { logout, addGoalDB, updateGoalDB, deleteGoalDB, addCompletedDB, updateCompletedDB, deleteCompletedDB, changeCompletedIdDB, getUserGoals, getUserCompleted } from "./firebase";
import { collection } from "firebase/firestore";

function App() {

  const [user, loading, error] = useAuthState(auth)
  const [loaded, setLoaded] = useState(false)
  
  const [showCalendar, setShowCalendar] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [showAddGoal, setShowAddGoal] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [showCompleted, setShowCompleted] = useState(false)
  const [showHiddenList, setShowHiddenList] = useState(false)
  const [addToGoal, setAddToGoal] = useState("")
  const [minimizeTasks, setMinimizeTasks] = useState(true)
  const [minimizeGoals, setMinimizeGoals] = useState(false)
  const [holdingGoalMinimize, setHoldingGoalMinimize] =useState(false);
  const [completed, setCompleted] = useState([ ])
  const [goals, setGoals] = useState([ ])
  const [windowWidth, setWindowWidth] = useState(800)

  var date = new Date();
  const numericDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`


 
//loads goals from db

const getGoals = async () => {
  let goals = await getUserGoals()
  goals.sort((a,b) => b.id - a.id)
  setGoals(goals)
  // var goalsFromFile = await fetchGoals();

  // let g = await JSON.parse(goalsFromFile).goals
  // setGoals([])
}
const getCompleted = async () => {
  let completed = await getUserCompleted()
  completed.sort((a,b) => b.id - a.id)
  setCompleted(completed)
  // var completedFromFile = await fetchCompleted();
  // let c = await JSON.parse(completedFromFile).completed
}
// getGoals()

// Get Goals when first loaded and logged in

useEffect( () => {
  auth.onAuthStateChanged(function(user) {
    if(user){
      getGoals()
      getCompleted()
      setShowLogin(false)
    }
    else{
      setShowLogin(true)
    }
   
  })

}, [])
//




  useEffect(() => {
    function handleResize() {
      // console.log('resized to: ', window.innerWidth, 'x', window.innerHeight)
      setWindowWidth(window.innerWidth)
      if( windowWidth < 920 && (!minimizeTasks && !minimizeGoals)){
        setMinimizeGoals(true)
        setHoldingGoalMinimize(true)
      }
      else if(windowWidth >= 920 && holdingGoalMinimize){
        setMinimizeGoals(false);
        setMinimizeTasks(false);
        setHoldingGoalMinimize(false)
      }
      else{
        setMinimizeTasks(minimizeTasks)
        setMinimizeGoals(minimizeGoals)
      }
    
}

    window.addEventListener('resize', handleResize)
    return _ => {
      window.removeEventListener('resize', handleResize)
    
}
    
  })

const toggleMiniTasks = () => {
  if(windowWidth < 920){
    if(minimizeTasks){
      setMinimizeTasks(false)
      setMinimizeGoals(true)
    }
    if(!minimizeTasks){
      setMinimizeTasks(true)
      setMinimizeGoals(false)
    }
  }
  else{
    setMinimizeTasks(!minimizeTasks)
  }
}

const toggleMiniGoals = () => {
  if(windowWidth < 920){
    if(minimizeGoals){
      setMinimizeGoals(false)
      setMinimizeTasks(true)
    }
    if(!minimizeGoals){
      setMinimizeGoals(true)
      setMinimizeTasks(false)
    }
  }
  else{
    setMinimizeGoals(!minimizeGoals)
  }
}

// used in GoalList component to toggle view of tasks in a goal with checkmarks
const toggleSubGoals = async (id) => {
  var newGoal
  setGoals(goals.map((goal) =>{
    if(goal.id === id){
      newGoal = {...goal, showSubGoals: !goal.showSubGoals}
      
      return newGoal
    }
    
    return goal
  }))
  
  await updateGoalDB(newGoal,newGoal)

}

const toggleSubCompleted = (id) => {
  let newCompleted = completed.map((goal) => {
    if(goal.id == id){
      let newGoal = {...goal, showSubGoals: !goal.showSubGoals}
      return newGoal
    }
    return goal
  })

  setCompleted(newCompleted)
  return newCompleted
}

const toggleEditGoal = async (id) => {
  var updGoal
  setGoals(goals.map((goal) => {
    if( goal.id == id){
      let showEditGoalValue = true
      if(goal.hasOwnProperty("showEditGoal")){
        showEditGoalValue = !goal.showEditGoal
      }
      updGoal = {...goal,showEditGoal: showEditGoalValue}
      goal = updGoal
    }
    return goal
  }))

  await updateGoalDB(updGoal,updGoal)
}

// 
const removeGoal = async (goalId, done) => {
 
    let removedGoal
   
    let newGoals = goals.filter((goal) => {
      if(goal.id != goalId){
      return true
    }
    else{
      removedGoal = goal
      return false
  }})
  setGoals(newGoals)

  if(user){
    await deleteGoalDB(removedGoal)
  }

  for(let i= 0; i< newGoals.length; i++ ){
    
    if(user){
        await changeGoalIdDB(newGoals[i], newGoals.length - i)
    }
    newGoals[i].id = newGoals.length - i;
  }
  setGoals(newGoals)

  if(done){
    removedGoal.id = completed.length + 1
    removedGoal.showSubGoals = false;
    // removedGoal.date =
    removedGoal.dateDone = numericDate
    let newCompleted = [removedGoal, ...completed]
    setCompleted(newCompleted)
    await addCompletedDB(removedGoal)
    // await updCompletedDB(newCompleted)
    //
  }
  // await updGoalsDB(newGoals)
}

const removeCompleted = async (goalId) => {
  let removedGoal
  let newCompleted =   completed.filter((goal) => {
    if(goal.id != goalId){
    return true
  }
  else{
    removedGoal = goal
    return false
}})
  setCompleted(newCompleted)

  if(user){
    await deleteCompletedDB(removedGoal)
  }

    for(let i = 0; i< newCompleted.length; i++){
      if(user){
        await changeCompletedIdDB(newCompleted[i], newCompleted.length - i)
      }
      newCompleted[i].id = newCompleted.length - i
    }
  setCompleted(newCompleted)
  return newCompleted
  // updCompletedDB(newCompleted)
}

//used to be async
const addTask = async (goalId, taskTitle) => {
  // const goalToUpdate = await fetchGoal(goalId)
  if(taskTitle == ""){
    // showDialogBox("Input a Task")
    return
  }
  let goalToUpdate = goals.filter((goal)=>(goal.id == goalId))[0]

  const tasks = goalToUpdate.tasks
  let newTask = {id:tasks.length+1, title: taskTitle, done:false, today:true,}
  let index = 1;
  const updTasks = [...tasks, newTask] 
  const updGoal = {...goalToUpdate, tasks:updTasks}
  
  let newGoals = goals.map((goal) => {
    if(goal.id == goalId){
      return updGoal
    }
    return goal
  })

  // await updGoalsDB(newGoals)
  setGoals(newGoals)
  await updateGoalDB(updGoal,updGoal)
  

}


const removeTask = async (goalId, taskId) => {
  // const goalToUpdate = await fetchGoal(goalId)
  let goalToUpdate = goals.filter((goal)=>(goal.id == goalId))[0]

  const tasks = goalToUpdate.tasks
  let index = 1;
  const updTasks = tasks.filter(task => task.id != taskId).map((task) => {
    task.id = index
    index++;
    return task
  })
  const updGoal = {...goalToUpdate, tasks:updTasks}
  
  let newGoals = goals.map((goal) => {
    if(goal.id == goalId){
      return updGoal
    }
    return goal
  })

  // await updGoalsDB(newGoals)
  setGoals(newGoals)
  await updateGoalDB(updGoal,updGoal)

  

}

//Toggles checkmark icon in the sugoals in the GoalList component from unchecked icon to checked icon by toggling done property in task object within goal object

//used to be async
const toggleDone=  async (goalId,taskId) => {
  
  const goalToUpdate = goals.filter((goal) => (goal.id==goalId))[0]
  const tasks = goalToUpdate.tasks;
  const updTasks = tasks.map((task) => {
    if(task.id == taskId){
      task.done = !task.done
      if(task.done){
        task.dateDone = numericDate
      }
      else{
        task.dateDone = ""
      }
    }
    return task;
  })
  const updGoal = { ...goalToUpdate, tasks:updTasks}

  
let newGoals = goals.map((goal) => {
  if(goal.id == goalId){
    return updGoal
  }
  return goal
})

setGoals(newGoals)
await updateGoalDB(updGoal,updGoal)
// await updGoalsDB(newGoals)

 
}
// Toggle task's today property
const toggleToday=  async (goalId,taskId) => {
  let goalToUpdate = goals.filter((goal) => (goal.id==goalId))[0]
  let tasks = goalToUpdate.tasks;
  let updTasks = tasks.map((task) => {
    if(task.id == taskId){
      if(!task.hasOwnProperty('today')){
        task.today = true
      }
      else{
        task.today = !task.today
      }
    }
    return task;
  })
  let updGoal = { ...goalToUpdate, tasks:updTasks}

  
let newGoals = goals.map((goal) => {
  if(goal.id == goalId){
    return updGoal
  }
  return goal
})

setGoals(newGoals)
if(user){
  await updateGoalDB(updGoal,updGoal)
}
// await updGoalsDB(newGoals)

 
}

//When submit button is clicked in addTask component it toggles view, adds the task to the target goal, uses setGoals
//used to be async

const submitGoalEdits = async(oldGoal,newGoal) =>{
  if(newGoal.tasks.length == 0){
    await removeGoal(oldGoal.id, false)
    return
  }
  
  setGoals(goals.map(goal => {
    if(goal.id == oldGoal.id){
      // console.log(newGoal)
      return newGoal
    }
    return goal
  }))
  // console.log(newGoal.id)
  await updateGoalDB(oldGoal, newGoal)
  // await updGoalsDB(goals)
}

const submitTasks = async(taskArr) =>{
  if(taskArr.length == 0){
    // showDialogBox("Input a Task")
    return
  }
  
  setShowAddTask(!showAddTask)
 
  let taskObjArr = []
  // 
  let targetGoal = goals.filter((goal)=> {return goal.id==addToGoal})[0]
  for(let i = 0; i < taskArr.length; i++){
    taskObjArr.push({id:targetGoal.tasks.length+1+i, title:taskArr[i], done: false, today:true})
  }
  

  let newTasks = targetGoal.tasks.concat(taskObjArr);
  targetGoal.tasks = newTasks

  const goalToUpdate = targetGoal
  goalToUpdate.tasks = newTasks;

  let newGoals = [...goals]
  newGoals= newGoals.map((goal) => {
    if(goal.id=== targetGoal.id){
      return targetGoal
    }
    else{
      return goal
    }
  })
  // addTaskDB([newTasks, addToGoal])

  setGoals(newGoals)
  updateGoalDB(targetGoal, targetGoal)
  // await updGoalsDB(newGoals)
}

//Creates goal object and adds it to the goals array
//used to be async
const addGoal = async(goal) => {

  goal.id = goals.length + 1
  let newGoals =  [goal,...goals]
  setGoals(newGoals)
  if(user){
    await addGoalDB(goal);
  }
  // await updGoalsDB(newGoals)

}

const createNewGoal =  async() => {
  let randomHue = (Math.floor(Math.random()*3600)/10).toString() 
  let randomColor = `hsl(${randomHue},100%,80%)`
  let newGoal = {title:"New Goal",dueDate:"",showEditGoal:true, showSubGoals:false,color:randomColor,tasks:[], visible:true }
  await addGoal(newGoal);
  
}

const reOrderTaskUp = async (goalId,taskId, taskArr, onTaskList = false) =>{
  for(var i = 0; i< taskArr.length; i++){
      if(taskArr[i].id == taskId){
        var switchIndex = i-1
        if(onTaskList){
          // Find Task with smaller index with today == true and set switchIndex
          while(switchIndex > 0){
            if(!taskArr[switchIndex].today || taskArr[switchIndex].done){
              switchIndex--
            }
            else{
              break
            }
          }
        }
          if(i == 0){
              switchIndex = taskArr.length -1
          }
          let tempTask = taskArr[switchIndex]
          taskArr[switchIndex] = taskArr[i]
          taskArr[i] = tempTask;
          break;
      }
  }
  var updGoal
  setGoals(goals.map(((goal) => {
    if(goal.id == goalId){
      goal.tasks = taskArr
      updGoal = goal
    }
    return goal
  })))

  await updateGoalDB(updGoal,updGoal)
  
}

const reOrderTaskDown = async (goalId,taskId, taskArr, onTaskList=false) =>{
  for(let i = 0; i< taskArr.length; i++){
      if(taskArr[i].id == taskId){
          let switchIndex = i+1
          if(onTaskList){
            // Find Task with smaller index with today == true and set switchIndex
            while(switchIndex < taskArr.length - 1){
              if(!taskArr[switchIndex].today || taskArr[switchIndex].done){
                switchIndex++
              }
              else{
                break
              }
            }
          }
          if(i == taskArr.length -1){
              switchIndex = 0
          }
          let tempTask = taskArr[switchIndex]
          taskArr[switchIndex] = taskArr[i]
          taskArr[i] = tempTask;
          break;
      }
  }
  
  var updGoal
  setGoals(goals.map(((goal) => {
    if(goal.id == goalId){
      goal.tasks = taskArr
      updGoal = goal
    }
    return goal
  })))
  
  await updateGoalDB(updGoal,updGoal)
}

const reOrderGoalUp = async (goalId) => {
  let goalsArr = [...goals]
  if(goalsArr.length == 1){
    return
  }
  var switchIndex
  for(let i = 0; i< goalsArr.length; i++){
    if(goalsArr[i].id == goalId){
        switchIndex = i-1;
        while( switchIndex > 0){
          if(!goalsArr[switchIndex].visible){
            switchIndex -= 1
          }
          else{
            break
          }
        }
        if(switchIndex < 0){
            switchIndex = goalsArr.length -1
        }
        let tempGoal = goalsArr[switchIndex]
        var tempGoalDB = {...tempGoal}
        var movingGoalDB = {...goalsArr[i]}
        var tempId = tempGoal.id
        var movingGoalId = goalsArr[i].id
        goalsArr[i].id = tempId
        goalsArr[switchIndex] = goalsArr[i]
        tempGoal.id = movingGoalId
        goalsArr[i] = tempGoal;
        break;
      }
    }
    
    setGoals(goalsArr)
    await changeGoalIdDB(tempGoalDB, 0)
    await changeGoalIdDB(movingGoalDB, tempId)
    tempGoalDB.id = 0;
    await changeGoalIdDB(tempGoalDB, movingGoalId)
// updGoalsDB(goalsArr)

}

const reOrderGoalDown = async (goalId) => {
  let goalsArr = [...goals]
  if(goalsArr.length == 1){
    return
  }
  for(let i = 0; i< goalsArr.length; i++){
    if(goalsArr[i].id == goalId){
        let switchIndex = i+1
        while( switchIndex < goalsArr.length){
          if(!goalsArr[switchIndex].visible){
            switchIndex += 1
          }
          else{
            break
          }
        }
        if(switchIndex >= goalsArr.length){
            switchIndex = 0
        }
        let tempGoal = goalsArr[switchIndex]
        var tempGoalDB = {...tempGoal}
        var movingGoalDB = {...goalsArr[i]}
        var tempId = tempGoal.id
        var movingGoalId = goalsArr[i].id
       
        goalsArr[i].id = tempId
        goalsArr[switchIndex] = goalsArr[i]
        tempGoal.id = movingGoalId
        goalsArr[i] = tempGoal;
        break;
    }
}
setGoals(goalsArr)
await changeGoalIdDB(tempGoalDB, 0)
await changeGoalIdDB(movingGoalDB, tempId)
tempGoalDB.id = 0;
await changeGoalIdDB(tempGoalDB, movingGoalId)
// updGoalsDB(goalsArr)

}

const reOrderCompletedUp = async (goalId) => {
  let completedArr = [...completed]
  if(completedArr.length == 1){
    return
  }
  for(let i = 0; i< completedArr.length; i++){
    if(completedArr[i].id == goalId){
        let switchIndex = i-1;
        if(i == 0){
            switchIndex = completedArr.length -1
        }
        let tempGoal = completedArr[switchIndex]
        var tempGoalDB = {...tempGoal}
        var movingGoalDB = {...completedArr[i]}
        var tempId = tempGoal.id
        var movingGoalId = completedArr[i].id
        
        completedArr[i].id = tempId
        completedArr[switchIndex] = completedArr[i]
        tempGoal.id = movingGoalId
        completedArr[i] = tempGoal;
        break;
    }
}
    setCompleted(completedArr)
    await changeCompletedIdDB(tempGoalDB, 0)
    await changeCompletedIdDB(movingGoalDB, tempId)
    tempGoalDB.id = 0;
    await changeCompletedIdDB(tempGoalDB, movingGoalId)
    return completedArr
// updCompletedDB(completedArr)

}

const reOrderCompletedDown = async(goalId) => {
  let completedArr = [...completed]
  if(completedArr.length == 1){
    return
  }
  for(let i = 0; i< completedArr.length; i++){
    if(completedArr[i].id == goalId){
        let switchIndex = i+1
        if(i == completedArr.length -1){
            switchIndex = 0
        }
        let tempGoal = completedArr[switchIndex]
        var tempGoalDB = {...tempGoal}
        var movingGoalDB = {...completedArr[i]}
        var tempId = tempGoal.id
        var movingGoalId = completedArr[i].id
      
        completedArr[i].id = tempId
        completedArr[switchIndex] = completedArr[i]
        tempGoal.id = movingGoalId
        completedArr[i] = tempGoal;
        break;
    }
}

setCompleted(completedArr)
await changeCompletedIdDB(tempGoalDB, 0)
await changeCompletedIdDB(movingGoalDB, tempId)
tempGoalDB.id = 0;
await changeCompletedIdDB(tempGoalDB, movingGoalId)
return completedArr
// updCompletedDB(completedArr)

}



//Toggle view of addTask component and TaskList component when dropdown is clicked and the goal to add to is chosen
const handleDropDown = (eventKey,event) => {
  if(eventKey != "newGoal"){
    setShowAddTask(!showAddTask)
    setAddToGoal(eventKey)
  }
  else{
    // setMinimizeTasks(true);
    if (windowWidth < 645){
      setMinimizeTasks(true)
    }
    setMinimizeGoals(false);
    createNewGoal();
  }
  // 
}

const toggleAllToday = async (goalId, status) => {
  let updGoal = goals.filter((goal) => goal.id == goalId)[0]
  updGoal.tasks = updGoal.tasks.map((task) => {
    task.today = status
    return task
  })

  // let newGoals = goals;
  let newGoals = goals.map((goal) => {
    if(goal.id == goalId){
      return updGoal
    }
    else{
      return goal
    }
  })

  setGoals(newGoals)
  await updateGoalDB(updGoal,updGoal)
  

}

const toggleVisible = async (goalId) => {
  

  let targetGoal = goals.filter((goal)=> {return goal.id==goalId})[0]
  let visibility = false
  if(targetGoal.hasOwnProperty("visible")){
    visibility = !targetGoal.visible
  }
  targetGoal.visible = visibility
  

  const goalToUpdate = goals.filter((goal) => (goal.id == goalId))[0]
  goalToUpdate.visible = visibility;




  let newGoals = [...goals]
  newGoals= newGoals.map((goal) => {
    if(goal.id=== targetGoal.id){
      return targetGoal
    }
    else{
      return goal
    }
  })
  
  

  setGoals(newGoals)
  await updateGoalDB(targetGoal, targetGoal)
}

  return (
    <div className="app-header">
      {showLogin &&
      <div className="sign-in-window" onClick={() => setShowLogin(false)}>
          <LoginPage setShowLogin={setShowLogin} setGoals={setGoals} setCompleted={setCompleted} />   
      </div>}
      {showCalendar && !showLogin &&
      <div className="sign-in-window" onClick={() => setShowCalendar(false)}>
          <Calendar date= {date} completed={completed} goals={goals} setShowCalendar={setShowCalendar}/>   
      </div>}
      <div className="heading">
          {!user && !showLogin && 
          <div className="offline-warning" >
            <h5 className="warning">⚠️You are not signed in.⚠️<p>Sign in to create and save goals!</p></h5>
          </div>}
          <img src={calendarIcon} id="calendar-btn" onClick={() => setShowCalendar(true)}/>
          {user ? <button id='sign-in-btn' onClick={() => {logout(); setGoals([]); setCompleted([]); setShowLogin(true) }}>Sign Out</button> :
          <button id='sign-in-btn' onClick={() => setShowLogin(true)}>Sign in</button>}
      </div>
    <div className="App">
        <div id="app-container">
          {!minimizeGoals && <div className = "container">
          {/* Goals components */}
          <div style={{display:"flex", flexDirection:"row-reverse" }}>
            <MinMaxButtons windowWidth={windowWidth} component = "Goals" goals={goals} miniTasks = {minimizeTasks} miniGoals = {minimizeGoals} toggleMiniTasks={() => toggleMiniTasks()} toggleMiniGoals={() => setMinimizeGoals(!minimizeGoals)} />
            { !showCompleted && completed.length > 0 ?<button className="completed-btn" onClick={() => {setShowCompleted(!showCompleted); setShowHiddenList(false)} }>Completed</button> : (completed.length > 0 || showCompleted) && <button className="completed-btn"  onClick={() => setShowCompleted(!showCompleted)}>Goals</button> }
            {(showHiddenList || goals.filter((goal) => !goal.visible).length > 0) && <button style={{backgroundColor:"steelblue"}} className="completed-btn" onClick={() => {setShowHiddenList(!showHiddenList); setShowCompleted(false)} }>{!showHiddenList ? "Hidden Goals" : "Goals"}</button>}
          </div>
        
        {showCompleted ? <h1 style={{display:"flex", justifyContent:"space-around"}}>Completed Goals</h1> : showAddGoal || (goals.filter(goal => goal.visible).length == 0 && !showHiddenList) ? <Header titleName="⟵  Add A Goal!"  buttonColor="green" buttonText="Add"title="Goals" onAdd={() => createNewGoal()}></Header> 
        : showHiddenList ? <h1 style={{display:"flex", justifyContent:"space-around"}}>Hidden Goals</h1> 
        : <Header titleName="Goals"  buttonColor="green" buttonText="Add"title="Goals" onAdd={() => createNewGoal()}/>}
          {showCompleted ? 
          <CompletedList completed={completed} submitGoalEdits={submitGoalEdits} date={date}
            reOrderCompletedUp={reOrderCompletedUp} reOrderCompletedDown={reOrderCompletedDown} removeGoal={removeCompleted} onToggle ={toggleSubCompleted}/> 
            : 
            showHiddenList ? <HiddenList goals={goals} toggleVisible={toggleVisible} onToggle ={toggleSubGoals} toggleDone={toggleDone} removeGoal={removeGoal}/>
            :
            <GoalList  submitGoalEdits={submitGoalEdits} toggleVisible={toggleVisible}
            reOrderGoalUp={reOrderGoalUp} reOrderGoalDown={reOrderGoalDown} reOrderTaskUp={reOrderTaskUp} reOrderTaskDown={reOrderTaskDown} 
            goals={goals}  removeGoal={removeGoal} addTask={addTask} removeTask={removeTask} onToggle ={toggleSubGoals} toggleDone={toggleDone} toggleToday={toggleToday}  toggleAllToday={toggleAllToday}
            toggleShowEditGoal={toggleEditGoal} />}
      </div>}

      {!minimizeTasks && <div className="container">
          {/* Tasks components */}
          <MinMaxButtons windowWidth={windowWidth} component = "Tasks" goals={goals} miniTasks = {minimizeTasks} miniGoals = {minimizeGoals} toggleMiniTasks={() => toggleMiniTasks()} toggleMiniGoals={() => toggleMiniGoals()} />
          {showAddTask ? <Header titleName="Today's Tasks" buttonColor="red" buttonText="✖️ Never Mind" title="New Tasks" onAdd={() => (setShowAddTask(!showAddTask))}/> : 
          <Header titleName= "Today's Tasks" goals={goals} title="Tasks"  onAdd={handleDropDown} />}
          {showAddTask && <AddTask addToGoalColor={goals.filter(goal => goal.id == addToGoal)[0].color} 
          onSubmit={submitTasks} buttonColor="red" buttonText="✖️ Never Mind" title="New Tasks" onAdd={() => (setShowAddTask(!showAddTask))}/>}
          <TaskList reOrderTaskUp={reOrderTaskUp} reOrderTaskDown={reOrderTaskDown} goals={goals} removeTask={removeTask}  onToggle={toggleDone} />
      </div>}
      </div>
      
    </div>
    </div>
  );
}

export default App;
