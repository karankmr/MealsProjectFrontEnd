import React, {useEffect, useState} from "react";
import '../css/App.css';
import { useHistory } from "react-router-dom";
import {Form, Input, Button, Select} from 'antd';
import {LockOutlined} from "@ant-design/icons";

const axios = require('axios').default;
const SignUp=()=>{

    const [componentSize, setComponentSize] = useState('small');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    const [name,setName]=useState("")
    const [password,setPassword]=useState("")
    const [userName,setUserName]=useState("")
    const [iAm,setIAm]=useState("")
    useEffect(()=>{},)
    const history =useHistory();

    const handleSubmit=(e)=>{
        console.log(name+password+userName+iAm)
        e.preventDefault()
        axios.post('http://localhost:3001/user/signUp',
            {'name':name,'userName':userName,'password':password,'iAm':iAm})
            .then(history.push('/login'))
            .catch(onerror=>{console.log(onerror)});

    }
//     return(
//         <div className="SignUp">
//             <form className="form" onSubmit={handleSubmit}>
//                 <input type="text" name="name" placeholder="Name" value={name} onChange={e=>setName(e.target.value) } /><br/>
//                 <input type="email" name="userName" placeholder="Username" value={userName} onChange={e=>setUserName(e.target.value)}/><br/>
//                 <input type="password" name="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/><br/>
//                 <input type="text" name="iAm" placeholder="iAM" value={iAm} onChange={e=>setIAm(e.target.value)}/><br/>
//                 <button className=" SignUp-button">SignUp</button>
//             </form>
//
//         </div>
//
//     )
//
// }
//     const layout = {
//         labelCol: { span: 8 },
//         wrapperCol: { span: 16 },
//     };
    return (
        <div className='SignUp'>
            <div className='form'>
                <Form
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    initialValues={{
                        size: componentSize,
                    }}
                    onValuesChange={onFormLayoutChange}
                    size={componentSize}
                >

                    <Form.Item label="Name"
                               value={userName}
                               onChange={e=>setName(e.target.value) }>
                        <Input />
                    </Form.Item>

                    <Form.Item label="UserName"
                               value={userName}
                               onChange={e=>setUserName(e.target.value) }>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                        value={password}
                        onChange={e=>{setPassword(e.target.value)}}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item label="Select">
                        <Select  value={iAm}
                                 onChange={value=>{setIAm(value)}
                                 } >
                            <Select.Option value="user" >user</Select.Option>
                            <Select.Option value="admin" >admin</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" onClick={handleSubmit}>SignUp</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>

    )
};


export default SignUp