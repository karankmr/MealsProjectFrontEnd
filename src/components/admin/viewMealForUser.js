import React, {useEffect, useState} from "react";
import '../../css/App.css';
import {reactLocalStorage} from "reactjs-localstorage";
import {DatePicker, Table} from "antd";
const axios = require('axios').default;
const { Column } = Table;
const { RangePicker } = DatePicker;

const ViewMealForUser=({match})=>{
    const [meals,getMeals]=useState([])
    useEffect(()=> {
        axios.get(`http://localhost:3001/meal/getMealsByUserId?userId=${match.params.id}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{getMeals(res.data);})
    },[])



    const handleDelete=(id,title)=>{
        console.log("inthe deleteMeal",id,title)
        axios.delete(`http://localhost:3001/meal/deleteMeal?id=${id}&title=${title}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{if(res.data.deleted)
            {getMeals(res.data.meals)}})
    }

    // const Meals=meals.map(meal=>{
    //     return(
    //         <div style={{margin: '40px', background: '0px 5px 20px gray'}} key={meal.id}>
    //             <h2 style={{display:'inline'}}>{meal.title}</h2><br/>
    //             <h5>Date: {meal.date}</h5>
    //             <h5>Time: {meal.time}</h5>
    //             <h5 style={{display:'inline'}}>Calorie: {meal.calorie}</h5><br/><br/>
    //             <button onClick={()=>{handleDelete(meal.userId,meal.title)}}>Delete Meal</button>
    //         </div>
    //     )})
    // return(
    //     <div >
    //         {Meals}
    //     </div>
    // )

    return(
        <div>
        <Table dataSource={meals}
        pagination={false}>
            <Column title="User Id" dataIndex="userId" key="userId" />
            <Column title="Meal Title" dataIndex="title" key="title" />
            <Column title="Date" dataIndex="date" key="date" />
            <Column title="Time" dataIndex="time" key="time" />
            <Column title="Calorie" dataIndex="calorie" key="calorie" />
            <Column title="Status" dataIndex="status" key="status" />

            <Column
                title="Action"
                key="action"

                render={(text,record) => <span><a onClick={()=>handleDelete(
                    record.userId,record.title)}>delete</a></span>
                   }

            />
        </Table>
            <RangePicker />
        </div>
    );
}
export default ViewMealForUser