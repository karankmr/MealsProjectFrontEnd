// import React, {useEffect, useState} from "react";
// import '../css/App.css';
// import {reactLocalStorage} from 'reactjs-localstorage';
// import {PoweroffOutlined} from '@ant-design/icons';
// import {Table, Pagination, Select, Input, Button, InputNumber, Spin} from 'antd';
// import {useHistory} from "react-router-dom";
// const {Search}=Input
// const axios = require('axios').default;
// const { Column } = Table;
//
//
// const userView=(props)=>{
//
//     const [currentUser,setCurrentUser]=useState({})
//     const [meals,getMeals]=useState([])
//     const [status,setStatus]=useState([])
//     const [disabled,setDisabled]=useState('true')
//     const [maxCalorie,setMaxCalorie]=useState(2000)
//     const [page,setPage]=useState(1)
//     const [loading,setLoading]=useState('true')
//
//     useEffect(()=> {
//         axios.get('http://localhost:3001/meal/getAllmeals',{headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
//             .then(res=>{getMeals(res.data)})
//
//         axios.get(`http://localhost:3001/user?id=${props.location.state.userId}`,
//             {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
//             .then(res=>{
//                 setCurrentUser(res.data.user)
//                 setLoading(false);
//                 setMaxCalorie(res.data.user.maxCalorie)
//             })
//     },[])
//
//     const handlePagination=(page)=>{
//         setPage(page);
//         axios.get(`http://localhost:3001/meal/getAllmeals?page=${page}`,
//             {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
//             .then(res=>{getMeals(res.data)})
//     }
//
//     const handleStatus=(status,id,userId)=>{
//
//         axios.put(`http://localhost:3001/meal/status?id=${id}&userId=${userId}`,{'status':status},
//             {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
//             .then(res=> getMeals(res.data.meals))
//     }
//
//
//     const handleStatusChange=(value,record)=>{
//         let S=status;
//         S[record.id]=value;
//         setStatus(S)
//         handleStatus(value,record.id,record.userId)
//     }
//
//
//     const handleSearch=(value)=>{
//         console.log("in handle search")
//         axios.get(`http://localhost:3001/meal/getFilteredMeals?search=${value}`,
//             {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
//             .then(res=>{getMeals(res.data)})
//     }
//
//
//     const history =useHistory();
//     const handleLogout=()=>{
//         reactLocalStorage.clear();
//         history.push('/login')
//     }
//
//     const toggle = (e) => { //for maxCalorie Set Input button
//         axios.put(`http://localhost:3001/user?userId=${currentUser.id}`,
//             {'maxCalorie':maxCalorie},
//             {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
//             .then(res=>{if(res.data.updated)
//             {setMaxCalorie(res.data.maxCalorie)}})
//             .catch(err=>console.log(JSON.stringify(err)))
//
//         setDisabled({
//             disabled: !disabled,
//         });
//     };
//
//     const handleReset=()=>{
//         axios.put(`http://localhost:3001/user?userId=${currentUser.id}`,
//             {'maxCalorie':'0'},
//             {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
//             .then(res=>{console.log(res.data)
//                 if(res.data.updated)
//                 {setMaxCalorie(res.data.maxCalorie)}})
//             .catch(err=>console.log(JSON.stringify(err)))
//     }
//
//     const handleCalorieChange=(e)=>{
//         setMaxCalorie(e)
//     }
//
//     console.log("line188",currentUser,maxCalorie)
//
//     let i=1
//     return(
//         <div className="viewMeals">
//             {loading?
//                 <Spin style={{margin:"200px"}} size={"large"} spinning={loading}/>
//                 :(
//                     <div>
//                         <br/>
//                         <Search
//                             placeholder="input search text"
//                             onSearch={value => handleSearch(value)}
//                             style={{ width: 150 ,margin:'10px'}}
//                         />
//                         <Table dataSource={meals}
//                                pagination={false}>
//
//                             <Column title="Index"
//                                     key="index"
//                                     render={()=><span>
//                             {i++}
//                         </span>}
//                             />
//
//                             <Column title="Meal Title" dataIndex="title" key="title" />
//                             <Column title="Date" dataIndex="date" key="date" />
//                             <Column title="Time" dataIndex="time" key="time" />
//                             <Column title="Calorie" dataIndex="calorie" key="calorie" />
//
//                             <Column span={24} title="Status"
//                                     key="status"
//
//                                     render={(text,record)=> <Select  value={status[record.id]}
//                                                                      defaultValue={record.status}
//                                                                      onChange={(value)=>{handleStatusChange(value,record)}}
//                                                                      style={{ width: 140,textAlign:'centre' }}
//                                         // size="default"
//                                     >
//                                         <Select.Option value="consumed" key="consumed">Consumed</Select.Option>
//                                         <Select.Option  value="notConsumed" key="notConsumed">Not Consumed</Select.Option>
//                                     </Select>}/>
//
//                         </Table>
//
//                         <div style={{margin:'30px'}}>
//                             <label>Max Calorie </label>
//                             <InputNumber min={0}  disabled={false}
//                                 // defaultValue={2000}
//                                          value={maxCalorie}
//                                          onChange={e=>handleCalorieChange(e)} />
//                             <span style={{ marginLeft:20 }}>
//                     <Button onClick={toggle} shape="round" type="primary">
//                         Set
//                     </Button>
//                 </span>
//
//                             <span style={{ marginLeft:20 }}>
//                     <Button onClick={handleReset} shape="round" type="dashed">
//                         Reset
//                     </Button>
//                 </span>
//                         </div>
//
//                         <Pagination size="small" current={page} onChange={handlePagination} total={50}  />
//
//                         <footer style={{marginTop:'15%'}}>
//                             <h3>@Calorie Counter</h3>
//                             <div style={{position:'absolute',marginLeft:'85%'}}>
//                                 <Button
//                                     icon={<PoweroffOutlined />}
//                                     onClick={handleLogout}
//                                 >
//                                     Logout
//                                 </Button>
//                             </div>
//                         </footer>
//
//                     </div>
//
//                 )}
//         </div>
//     );
// }
//
// export default userView