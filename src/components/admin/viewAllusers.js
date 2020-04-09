import React, {useEffect, useState} from "react";
import axios from 'axios'
import {Button, Pagination, Table,Input} from 'antd';
import 'antd/dist/antd.css';
import {Link} from "react-router-dom";
import {reactLocalStorage} from "reactjs-localstorage";
const { Column ,ColumnGroup} = Table;
const {Search}=Input


const ViewAllUsers=()=>{
    const [users,setUsers]=useState([])

    useEffect(()=>{
        axios.get('http://localhost:3001/user/getAlluser',
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>setUsers(res.data.users))
    },[])


    const handleDelete=(username)=>{
        axios.delete(`http://localhost:3001/user/delete?username=${username}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{console.log(res.data)
                if(res.data.deleted)
                { setUsers(res.data.users)}})
            .catch(error=>{console.log(error)})
    }


    const [page,setPage]=useState(1)
    const handlePagination=(page)=>{
        setPage(page);
        axios.get(`http://localhost:3001/user/getAlluser?page=${page}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>setUsers(res.data.users))
    }

    const handleSearch=(value)=>{
        axios.get(`http://localhost:3001/user/searchUser?search=${value}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{setUsers(res.data)})
    }
   //  let index=[]
   // for(let i=1;i<users.length;i++){
   //     index[i]=i
   // }
   let i=1;

    return(<div className="viewAllUsers">
            <br/>
            <Search
                placeholder="input search text"
                onSearch={value => handleSearch(value)}
                style={{ width: 150 }}

            />
            <Table dataSource={users}
                   pagination={false} >
                <Column title="Index"
                        key="index"
                        render={(text,record)=><span>
                            {i++}
                        </span>}
                />

                <Column title="User Name" dataIndex="name" key="name" />
                <Column title="Email" dataIndex="username" key="username" />
                <ColumnGroup title="Meals">

                    <Column
                        key="viewMeal"

                        render={(text,record)=><Link to={`/viewMealById/${record.id}`}>View Meals</Link>}/>

                    <Column
                        key="createMeal"

                        render={(text,record)=><Link to={{
                            pathname:"/createMeals",
                            state:{
                            UserId:record.id
                            }}}>Create Meal</Link>}/>
                </ColumnGroup>

                <Column title="Max Calories" dataIndex="maxCalorie" key="maxCalorie" />
                <Column
                    title="Action"
                    key="action"

                    render={(text,record) => <Button type="primary" onClick={()=>handleDelete(
                        record.username)}>Delete User</Button>
                    }

                />
            </Table>
            <br/>
            <footer>
            <Pagination size="small" current={page} onChange={handlePagination} total={50}  />
            </footer>
        </div>

    );
}
export default ViewAllUsers