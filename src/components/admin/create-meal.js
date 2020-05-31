import React, {useEffect, useState} from "react";
import '../../css/App.css';
import { useHistory } from "react-router-dom";
import {DatePicker, Form,InputNumber, Button,Input,TimePicker} from "antd";
import {reactLocalStorage} from 'reactjs-localstorage'
const axios = require('axios').default;
const CreateMeal=(props)=>{


    useEffect(()=>{
        setUserId(props.location.state.UserId)
    })
    const [title,setTitle]=useState("")
    const [time,setTime]=useState("")
    const [date,setDate]=useState("")
    const [calorie,setCalorie]=useState("")
    const [userId,setUserId]=useState("")
    const history =useHistory();

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(title,time,date,calorie,userId)
        axios.post('http://localhost:3001/meal/createMeal',
            {'title':title,'time':time,'date':date,'calorie':calorie,'userId':userId},
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(history.push(`/viewMealById/${props.location.state.UserId}`))
            .catch(onerror=>{console.log(onerror)});
    }
    const [componentSize, setComponentSize] = useState('small');
    const onFormLayoutChange = ({size}) => {
        setComponentSize(size);
    };
    return (
        <div className="CreateMeal" >
            <div className="form">
                <Form
                    labelCol={{span: 8}}
                    wrapperCol={{span: 12}}
                    layout="horizontal"
                    initialValues={{size: componentSize}}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                >
                    <Form.Item label="Meal Title"
                               value={title}
                               onChange={e=>setTitle(e.target.value)}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Date"
                    >
                        <DatePicker allowClear={false} format="DD/MM/YYYY" onChange={e =>  setDate(e.format('DD/MM/YYYY'))}/>
                    </Form.Item>

                    <Form.Item name="time-picker"
                               label="TimePicker"
                               value={time}
                    >
                        <TimePicker allowClear={false} format="HH:mm" placeholder="time" onChange={e=>{ setTime(e.format("HH:mm")) }}/>
                    </Form.Item>

                    <Form.Item label="Calorie"
                               value={calorie}
                               onChange={e=>setCalorie(e.target.value)}>
                        <InputNumber/>
                    </Form.Item>

                    <Form.Item label="User Id"
                               value={userId}
                               onChange={e=>setUserId(e.target.value)}>
                        <InputNumber defaultValue={props.location.state.UserId}/>
                    </Form.Item>

                    <Form.Item label="Create Meal"
                               onClick={handleSubmit}>
                        <Button type="primary">Submit</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default CreateMeal

