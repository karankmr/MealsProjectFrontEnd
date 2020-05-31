import React, {useEffect, useState} from 'react';
import {Table, Input, InputNumber, Popconfirm, Form} from 'antd';
import {reactLocalStorage} from "reactjs-localstorage";
import DatePicker from "antd/es/date-picker";
import TimePicker from "antd/es/time-picker"
import * as moment from 'moment';
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
    const [enabler,setEnabler] = useState(true);
    const [time,setTime]=useState("");
    const [date,setDate]=useState("");


    const isEditing = (record)=> {if(record.id === editingKey)
        setEnabler(false);
        return record.id === editingKey;}



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
                {getMeals(res.data.meals)}})
            .catch(err=>console.log(err))
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

                let nValue={};              //initialise n value

                if(row.status!==item.status)
                {nValue.status=row.status}

                if(date)
                {nValue.date=date}

                if(time)
                {nValue[ 'time' ] = time}               //nValues initialise

                if(row.calorie!==item.calorie)
                {nValue.calorie=row.calorie}

                if(row.title!==item.title)
                {nValue.title=row.title}

                console.log("nValue>>>>>>",nValue)
                console.log("SpreadNValues",{...nValue})

                newData.splice(index, 1, { ...item, ...row });

                axios.put(`http://localhost:3001/meal?id=${key}&userId=${userId}`,
                    {...nValue},
                    {headers:{'jwttoken':reactLocalStorage.get('jwttoken')}})
                    .then(res=>
                    {   console.log("backendResponse >>>>",res.data)
                        if(res.data.updated)
                        {
                            getMeals(res.data.meals)}})
                    .catch(err=>console.log(err.message))

                setEditingKey('');
                setEnabler(true);
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
            editable: false,
            render:(text,record) => <span>
                <DatePicker
                    disabled={enabler}
                    defaultValue={moment(record.date,'DD/MM/YYYY')}
                    onChange={e =>  setDate(e.format('DD/MM/YYYY'))}
                    format='DD/MM/YYYY' /></span>
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key:'time',
            width: '20%',
            editable: false,
            render:(text,record) => <span>
                <TimePicker
                    disabled={enabler}
                    defaultValue={moment(record.time,'HH:mm')}
                    onChange={e=>{ setTime(e.format("HH:mm")) }}
                    format='HH:mm' /></span>
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
// ek component bna le jo datepicker ko wrap kedega
    // use do props de
    // ek toh current current date and dusra ek handler
    // hadnler ko onchange me lga dio
    // ab jab bhi date change hogi toh handelr terat table ke data ko change krdega
    // jisse

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === 'calorie' ? 'number' : 'text',
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
