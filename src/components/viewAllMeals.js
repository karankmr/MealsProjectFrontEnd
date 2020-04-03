import React, {useEffect, useState} from "react";
import '../css/App.css';
import {reactLocalStorage} from 'reactjs-localstorage';
import {Table, Pagination, Select, Input, DatePicker} from 'antd';
const {Search}=Input
const axios = require('axios').default;
const { Column } = Table;
const { RangePicker } = DatePicker;


const ViewAllMeals=()=>{
    const [meals,getmeals]=useState([])
    const [status,setStatus]=useState([])

    useEffect(()=> {

        axios.get('http://localhost:3001/meal/getAllmeals',{headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{getmeals(res.data)})
    },[])

    const [page,setPage]=useState(1)
    const handlePagination=(page)=>{
        setPage(page);
        axios.get(`http://localhost:3001/meal/getAllmeals?page=${page}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{getmeals(res.data)})
    }
    const handleStatus=(status,id,userId)=>{
        axios.put(`http://localhost:3001/meal?id=${id}&userId=${userId}`,{'status':status},
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{console.log(res.data)})
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
            .then(res=>{getmeals(res.data)})
    }

    return(
        <div >
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

        </div>
    );
}

export default ViewAllMeals