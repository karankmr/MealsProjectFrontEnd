import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import {reactLocalStorage} from "reactjs-localstorage";
const axios = require('axios').default;

const CollectionCreateForm = ({ visible, handleSubmit, onCancel,currentUser }) => {
    const [form] = Form.useForm();
    console.log("currentUser.........>>>>>>>>>",currentUser)
    return (
        <Modal
            visible={visible}
            title="Edit your Profile"
            okText="Submit"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        handleSubmit(values);
                    })
                    .catch(info => {
                        console.log('Validate Failed:', info);
                    });
            }}
        >
            <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                        {
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input defaultValue={currentUser.name} />
                </Form.Item>

                <Form.Item name="age" label="Age" >
                    <Input type="number" defaultValue={currentUser.age}/>
                </Form.Item>

                <Form.Item name="userName" label="User Name">
                    <Input type="email" defaultValue={currentUser.username}/>
                </Form.Item>

                <Form.Item name="password" label="Password">
                    <Input type="password" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

const EditUser = ({currentUser}) => {
    const [visible, setVisible] = useState(false);

    const handleSubmit = (values) => {
        console.log('Received values of form: ', values);
        let nValue={}
        if(values.name&&currentUser.name!==values.name)
        {nValue.name=values.name}

        if(values.age&&currentUser.age!==values.age)
        {nValue.age=values.age}

        if(values.username&&currentUser.username!==values.username)
        {nValue.username=values.username}

        if(values.password)
        {nValue.password=values.password}
        console.log(nValue);
        if(nValue)
        {axios.put(`http://localhost:3001/user?userId=${currentUser.id}`,{...nValue},
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{
                if(res.data.updated)
                {(console.log('success'))}})
            .catch(err=>console.log(err))}

        setVisible(false);
    };
    return (
        <div className='edit-user'>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
            >
                Edit Profile
            </Button>
            <CollectionCreateForm
                currentUser={currentUser}
                visible={visible}
                handleSubmit={handleSubmit}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </div>
    );
};

export default EditUser