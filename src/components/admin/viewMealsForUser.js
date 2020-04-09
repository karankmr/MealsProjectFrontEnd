import React, {useEffect, useState} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Pagination} from 'antd';
import {reactLocalStorage} from "reactjs-localstorage";
const axios = require('axios').default;

const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {

    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (

                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>

    );
};

const ViewMealsForUser = ({match}) => {

    const [meals,getMeals]=useState([])
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');

    const isEditing = record => record.id === editingKey;

    useEffect(()=> {
        axios.get(`http://localhost:3001/meal/getMealsByUserId?userId=${match.params.id}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{getMeals(res.data);})
    },[])


    const handleDelete=(id,userId)=>{
        axios.delete(`http://localhost:3001/meal/deleteMeal?id=${id}&userId=${userId}`,
            {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
            .then(res=>{console.log(res.data)
                if(res.data.deleted)
            {getMeals(res.data.meals)}}).
        catch(err=>console.log(err))
    }


    const edit = record => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.id);
    };

    const cancel = () => {
        setEditingKey('');
    };


    const save = async (key,userId) => {
        try {
            const row = await form.validateFields();

            const newData = [...meals];
            const index = newData.findIndex(item => key === item.id);

            if (index > -1) {
                const item = newData[index];
                let nValue={}
                if(row.status!==item.status)
                {nValue.status=row.status}

                if(row.date!==item.date)
                {nValue.date=row.date}

                if(row.time!==item.time)
                {nValue.time=row.time}

                if(row.calorie!==item.calorie)
                {nValue.calorie=row.calorie}

                if(row.title!==item.title)
                {nValue.title=row.title}

                newData.splice(index, 1, { ...item, ...row });
                // getMeals(newData);

                axios.put(`http://localhost:3001/meal?id=${key}&userId=${userId}`,{...nValue},
                    {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
                    .then(res=>{if(res.data.updated)
                               {getMeals(res.data.meals)}})
                    .catch(err=>console.log(err))
                setEditingKey('');
            }
            else {
                newData.push(row);
                getMeals(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    let i=1;

    const columns = [
        {
            title: 'Index',
            key:'index',
            width: '10%',
            editable: false,
            render:()=>
                <span style={{color:'black'}}>{i++}</span>
        },
        {
            title: 'Meal Title',
            dataIndex: 'title',
            key:'title',
            width: '20%',
            editable: true,
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key:'date',
            width: '20%',
            editable: true,
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key:'time',
            width: '20%',
            editable: true,
        },
        {
            title: 'Calorie',
            dataIndex: 'calorie',
            key:'calorie',
            width: '15%',
            editable: true,
            render:(text)=> {
                return text < 0 ? (
                  <span style={{color:'red'}}>{text}</span>
                ) :  (
                    <span>{text}</span>
                );
            }

        },
        {
          title:'Status',
          dataIndex:'status',
          key:'status',
            width:'15%',
            editable:true,
        },

        {
            title:'Action',
            key:'action',
            dataIndex:'action',

            render:(text,record) => <span><a onClick={()=>handleDelete(
                       record.id,record.userId)}>delete</a></span>

        },
        {
            title: 'Action',
            key:'action',
            dataIndex: 'acton',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <a
                href="javascript:;"
                onClick={() => save(record.id,record.userId)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <a disabled={editingKey !== ''} onClick={() => edit(record)}>
                        Edit
                    </a>
                );
            },
        },
    ];


    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <Table
                rowKey={record => record.id}
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                pagination={false}
                bordered
                dataSource={meals}
                columns={mergedColumns}
                rowClassName="editable-row"
            />
        </Form>
    );
};
export default ViewMealsForUser
