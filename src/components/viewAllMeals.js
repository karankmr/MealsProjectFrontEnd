import React, {useEffect, useState} from "react";
import '../css/App.css';
import {reactLocalStorage} from 'reactjs-localstorage';
import { PoweroffOutlined } from '@ant-design/icons';
import {Table, Pagination, Select, Input, Button,InputNumber,Spin} from 'antd';
import {useHistory} from "react-router-dom";
const {Search}=Input
const axios = require('axios').default;
const { Column } = Table;


const ViewAllMeals=(props)=>{

    const [currentUser,setCurrentUser]=useState({})
    const [meals,getMeals]=useState([])
    const [status,setStatus]=useState([])
    const [disabled,setDisabled]=useState('true')
    const [maxCalorie,setMaxCalorie]=useState(2000)
    const [page,setPage]=useState(1)
    const [loading,setLoading]=useState('true')

    useEffect(()=> {
        axios.get('http://localhost:3001/meal/getAllmeals',{headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{getMeals(res.data)})

        axios.get(`http://localhost:3001/user?id=${props.location.state.userId}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{
                setCurrentUser(res.data.user)
                setLoading(false);
                setMaxCalorie(res.data.user.maxCalorie)
            })
    },[])

    //
    // useEffect(()=> {
    //     console.log("xvvvv",currentUser)
    //
    //     if(currentUser!== {})
    //     {
    //         setLoading(false)
    //     }
    //
    // },[currentUser])

    const handlePagination=(page)=>{
        setPage(page);
        axios.get(`http://localhost:3001/meal/getAllmeals?page=${page}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{getMeals(res.data)})
    }

    const handleStatus=(status,id,userId)=>{
        axios.put(`http://localhost:3001/meal/status?id=${id}&userId=${userId}`,{'status':status},
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=> getMeals(res.data.meals))
    }


    const handleStatusChange=(value,record)=>{
        let S=status;
        S[record.id]=value;
        setStatus(S)
        handleStatus(value,record.id,record.userId)
    }


    const handleSearch=(value)=>{
        console.log("in handle search")
        axios.get(`http://localhost:3001/meal/getFilteredMeals?search=${value}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{getMeals(res.data)})
    }


    const history =useHistory();
    const handleLogout=()=>{
        reactLocalStorage.clear();
        history.push('/login')
    }

    const toggle = () => {//for maxCalorie Input button
        console.log("in toggle")
        axios.put(`http://localhost:3001/user?userId=${currentUser.id}`,
            {'maxCalorie':maxCalorie},
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{
                if(res.data.updated)
            {setMaxCalorie(res.data.maxCalorie)}})
            .catch(err=>console.log(JSON.stringify(err)))

        setDisabled({
            disabled: !disabled,
        });

    };


    const handleCalorieChange=(e)=>{
       setMaxCalorie(e)
    }
     console.log("line188",currentUser,maxCalorie)
    return(
        <div className="viewMeals">
            {loading?
                <Spin style={{margin:"200px"}} size={"large"} spinning={loading}/>
            :(
            <div>
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
                                                         defaultValue={record.status}
                                                         onChange={(value)=>{handleStatusChange(value,record)}}
                        >
                            <Select.Option value="consumed" key="consumed">Consumed</Select.Option>
                            <Select.Option  value="notConsumed" key="notConsumed">Not Consumed</Select.Option>
                        </Select>}/>
            </Table>

            <div >
                <label>Max Calorie </label>
                <InputNumber min={0}  disabled={false}
                             // defaultValue={2000}
                             value={maxCalorie}
                             onChange={e=>handleCalorieChange(e)} />
                <span style={{ marginTop: 20,marginLeft:20 }}>
                    <Button onClick={toggle} type="primary">
                        Submit
                    </Button>
                </span>
            </div>

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

                )}
        </div>
    );
}

export default ViewAllMeals