import React, {useEffect, useState} from "react";
import '../css/App.css';
import {reactLocalStorage} from 'reactjs-localstorage';
import { PoweroffOutlined } from '@ant-design/icons';
import {Table, Pagination, Select, Input, Button} from 'antd';
import {useHistory} from "react-router-dom";
const {Search}=Input
const axios = require('axios').default;
const { Column } = Table;


const ViewAllMeals=()=>{
    const [meals,getMeals]=useState([])
    const [status,setStatus]=useState([])

    useEffect(()=> {

        axios.get('http://localhost:3001/meal/getAllmeals',{headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{getMeals(res.data)})
    },[])

    const [page,setPage]=useState(1)
    const handlePagination=(page)=>{
        setPage(page);
        axios.get(`http://localhost:3001/meal/getAllmeals?page=${page}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{getMeals(res.data)})
    }

    const handleStatus=(status,id,userId)=>{
        console.log("in handle status")
        axios.put(`http://localhost:3001/meal/status?id=${id}&userId=${userId}`,{'status':status},
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{console.log(res.data)
                getMeals(res.data.meals)})
    }


    const handleStatusChange=(value,record)=>{
        let S=status;
        S[record.id]=value;
        setStatus(S)
        handleStatus(value,record.id,record.userId)
    }

    const handleSearch=(value)=>{
        axios.get(`http://localhost:3001/meal/getFilteredMeals?search=${value}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{getMeals(res.data)})
    }

    const history =useHistory();
    const handleLogout=()=>{
        reactLocalStorage.clear();
        history.push('/login')
    }

    return(
        <div className="viewMeals">
            <br/>
            <Search
                placeholder="input search text"
                onSearch={value => handleSearch(value)}
                style={{ width: 150 }}

            />

            <Table dataSource={meals}
                   pagination={false}>

                <Column title="User Id" dataIndex="userId" key="userId" />
                <Column title="Meal Title" dataIndex="title" key="title" />
                <Column title="Date" dataIndex="date" key="date" />
                <Column title="Time" dataIndex="time" key="time" />
                <Column title="Calorie" dataIndex="calorie" key="calorie" />



                <Column span={24} title="Status"
                        key="status"

                        render={(text,record)=> <Select  value={status[record.id]}
                                                         defaultValue={'notConsumed'}
                                                         onChange={(value)=>{handleStatusChange(value,record)}}
                        >
                            <Select.Option value="consumed" key="consumed">Consumed</Select.Option>
                            <Select.Option  value="notConsumed" key="notConsumed">Not Consumed</Select.Option>
                        </Select>}/>



            </Table>
            <br/>
            <br/>
            <Pagination size="small" current={page} onChange={handlePagination} total={50}  />
            <div style={{position:'absolute',marginLeft:'90%',marginTop:'230px'}}>
                <Button
                    icon={<PoweroffOutlined />}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
                </div>

        </div>
    );
}

export default ViewAllMeals