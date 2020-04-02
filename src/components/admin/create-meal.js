import React, {useEffect, useState} from "react";
import '../App.css';
import { useHistory } from "react-router-dom";
const axios = require('axios').default;
const CreateMeal=(props)=>{

    const [title,setTitle]=useState("")
    const [time,setTime]=useState("")
    const [date,setDate]=useState("")
    const [calorie,setCalorie]=useState("")
    const [userId,setUserId]=useState("")
    useEffect(()=>{
        console.log(props.token)
    },[])
    const history =useHistory();

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/meal/createMeal',
            {'title':title,'time':time,'date':date,'calorie':calorie,'userId':userId},
            {headers:{'jwttoken':props.token}})
            .then(history.push('/user/meals'))
            .catch(onerror=>{console.log(onerror)});
    }
    return(
        <div className="CreateMeal">
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value) } /><br/>
                <input type="text" name="time" placeholder="Time" value={time} onChange={e=>setTime(e.target.value)}/><br/>
                <input type="text" name="date" placeholder="Date" value={date} onChange={e=>setDate(e.target.value)}/><br/>
                <input type="number" name="calorie" placeholder="Calorie" value={calorie} onChange={e=>setCalorie(e.target.value)}/><br/>
                <input type="number" name="userId" placeholder="userId" value={userId} onChange={e=>setUserId(e.target.value)}/><br/>
                <button >Create Meal</button>
            </form>
        </div>
    )
}

export default CreateMeal