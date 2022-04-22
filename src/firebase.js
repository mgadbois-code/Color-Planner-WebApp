
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider,getAuth,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword, sendPasswordResetEmail,signOut} from "firebase/auth";
import { getFirestore,query, getDoc,  getDocs,collection,where, addDoc, deleteDoc, Firestore, setDoc, doc} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAEPg40Hrb0MjSMtGjqEH5FEQPLUpOoQvo",
    authDomain: "color-planner.firebaseapp.com",
    projectId: "color-planner",
    storageBucket: "color-planner.appspot.com",
    messagingSenderId: "854019719938",
    appId: "1:854019719938:web:ded7b98d079cc0a8b4381b",
    measurementId: "G-Z0W7LEN0K4"
    
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const userCollectionRef = collection(db, 'users')
var currUserDocRef
var goalsRef
var completedRef

const googleProvider = new GoogleAuthProvider();


const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider)
        const user = res.user
        const q = query(userCollectionRef, where('uid','==', user.uid))
        const docs = await getDocs(q)
        if(docs.docs.length == 0) {
            await addDoc(userCollectionRef, {
                uid: user.uid,
                authProvider: 'google',
                email: user.email,
            })
        }
        let goals = await getUserGoals()
        let completed = await getUserCompleted()
        return [goals,completed]

    }catch (err) {
        console.error(err)
        alert(err.message)
    }
}

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        let goals = await getUserGoals()
        let completed = await getUserCompleted()
        return [goals,completed]
        
        // const goals = currUserDocRef.collection('goals')
        // goals.forEach((goal) => {
        //     console.log(goal.id)
        // })
    } catch (err) {
        console.error(err)
        alert(err.message)
    }
}

const registerWithEmailAndPassword = async(name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user
        await addDoc(userCollectionRef, {
            uid: user.uid,
            authProvider: 'local',
            email,
        })
        return true
    } catch (err) {
        console.error(err)
        alert(err.message)
        return false
    }
}

const sendPasswordReset = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email)
        alert("Password reset link sent!")
        return true
    }catch (err) {
        console.error(err)
        alert(err.message)
        return false
    }
}

const logout = () => {
    try{
        signOut(auth)
    }
    catch (err) {
        console.error(err)
        alert(err.message)
    }
}

// database interaction

const getUserGoals = async () => {
    try{

        const q = query(userCollectionRef, where('uid','==', auth.currentUser.uid))
        const snapshot = await getDocs(q)
        currUserDocRef = snapshot.docs[0].ref
        goalsRef = collection(currUserDocRef, 'goals')
        const gq = query(goalsRef, where('id', '!=', '-1'))
        const goalSnap = await getDocs(gq)
        var goalsArr = []
        goalSnap.forEach((doc) => {
            goalsArr.push(doc.data())
        })
        // console.log(goalsArr)
        return goalsArr
        
    }catch (err) {
        console.error(err)
        alert(err.message)
    }
    

}

const getUserCompleted = async () => {
    try{
        const q = query(userCollectionRef, where('uid','==', auth.currentUser.uid))
        const snapshot = await getDocs(q)
        completedRef = collection(currUserDocRef, 'completed')
        const cq = query(completedRef, where('id', '!=', '-1'))
        const completedSnap = await getDocs(cq)
        var completedArr = []
        completedSnap.forEach((doc) => {
            completedArr.push(doc.data())
        })
        // console.log(goalsArr)
        return completedArr
    
    }catch (err) {
        console.error(err)
        alert(err.message)
    }
    }


const addGoalDB = async (newGoal) => {
    try{

        await addDoc(goalsRef, newGoal)
    }catch (err) {
        console.error(err)
        alert(err.message)
    }
}
const addCompletedDB = async (newGoal) => {
    try{

        await addDoc(completedRef, newGoal)
    }catch (err) {
        console.error(err)
        alert(err.message)
    }
}



const updateGoalDB = async (newGoal) => {
    try{
    // console.log(newGoal)
    const gq = query(goalsRef, where('id', '==', newGoal.id))
    const goalSnap = await getDocs(gq)
    var goalDocId = goalSnap.docs[0].id
    await setDoc(doc(goalsRef, goalDocId),newGoal)
}catch (err) {
    console.error(err)
    alert(err.message)
}

}
const changeGoalIdDB = async (newGoal, newId) => {
    try{
    const gq = query(goalsRef, where('id', '==', newGoal.id))
    const goalSnap = await getDocs(gq)
    var goalDocId = goalSnap.docs[0].id
    newGoal.id = newId
    await setDoc(doc(goalsRef, goalDocId),newGoal)
}catch (err) {
    console.error(err)
    alert(err.message)
}

}
const updateCompletedDB = async (newGoal) => {
    try{
    // console.log(newGoal)
    const cq = query(completedRef, where('id', '==', newGoal.id))
    const completedSnap = await getDocs(cq)
    var completedDocId = completedSnap.docs[0].id
    await setDoc(doc(completedRef, completedDocId),newGoal)
}catch (err) {
    console.error(err)
    alert(err.message)
}

}
const changeCompletedIdDB = async (newGoal,newId) => {
    try{
    // console.log(newGoal)
    const cq = query(completedRef, where('id', '==', newGoal.id))
    const completedSnap = await getDocs(cq)
    var completedDocId = completedSnap.docs[0].id
    newGoal.id = newId
    await setDoc(doc(completedRef, completedDocId),newGoal)
}catch (err) {
    console.error(err)
    alert(err.message)
}

}

const deleteGoalDB = async (newGoal) => {
    try{
        const gq = query(goalsRef, where('id', '==', newGoal.id))
        const goalSnap = await getDocs(gq)
        var goalDocRef = goalSnap.docs[0].ref
        await deleteDoc(goalDocRef)
    }catch (err) {
        console.error(err)
        alert(err.message)
    }

}
const deleteCompletedDB = async (newGoal) => {
    try{

        const cq = query(completedRef, where('id', '==', newGoal.id))
        const completedSnap = await getDocs(cq)
        var completedDocRef = completedSnap.docs[0].ref
        await deleteDoc(completedDocRef)
    }catch (err) {
        console.error(err)
        alert(err.message)
    }

}

export {
    auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,

    addGoalDB,
    updateGoalDB,
    deleteGoalDB,
    changeGoalIdDB,
    addCompletedDB,
    updateCompletedDB,
    deleteCompletedDB,
    changeCompletedIdDB,
    getUserGoals,
    getUserCompleted
  }
