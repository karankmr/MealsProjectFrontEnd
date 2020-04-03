import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import '../css/App.css';
import {Link} from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const axios = require('axios').default;

const Login=(props)=>{
    const history =useHistory();
    const [userName,setUserName]=useState('')
    const [password,setPassword]=useState('')

    const  handleSubmit=(e)=>{
        console.log(userName,password)
        e.preventDefault();
        axios.post('http://localhost:3001/user/login',
            {'userName':userName,'password':password})
            .then(res=>{reactLocalStorage.set('isLoggedIn', res.data.loggedIn);
                reactLocalStorage.set('jwttoken', res.data.token);
                if(res.data.iAm==='admin')
                {history.push('/adminView')}
                if(res.data.iAm==='user')
                {history.push('/viewAllMeals')}})
            .catch(onerror=>{console.log(onerror)});
    }

    const updateUsername=(e)=> {
        setUserName(e.target.value)
    }

    const updatePassword=(e)=>{
        setPassword(e.target.value)
    }
//     return(
//         <div className="Login">
//
//             <form className="form" onSubmit={handleSubmit}>
//                 <input type="email" name="userName" placeholder="Username" value={userName} onChange={updateUsername}/><br/>
//                 <input type="password" name="password" placeholder="Password" value={password} onChange={updatePassword}/><br/>
//                 <button type="submit" className=" Login-button">Login</button>
//             </form>
//             <div className="signUpLink">
//                 <label  >New User?</label><br/>
//                 <Link to='/signUp'>
//                 <button >SignUp</button>
//                 </Link>
//             </div>
//
//         </div>
//     )
// }


    return (
        <div className='login'>
            <div className='form'>
                <Form
                    name="normal_login"
                    // className="login-form"
                    initialValues={{
                        remember: true,
                    }}

                >
                    <Form.Item
                        name="userName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                        value={userName}
                        onChange={updateUsername}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                               placeholder="Username"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                        value={password}
                        onChange={updatePassword}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />

                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={handleSubmit}>
                            Log in
                        </Button>
                        Or
                        <Link to='/signUp'>
                            <span style={{color:'white'}}>  register now!</span>
                        </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>

    );
}
export default Login
