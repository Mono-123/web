import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Students from '../components/detail'
import StudentAPI from '../../../service/student'
// import './style.css'
import { GENDERS, GRADES } from '../components/detail'
import { Radio, Select, Form, Input, Button, message, InputNumber, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default () => {
    const params = useParams()
    const [data, setData] = useState({ ...data, gender: '1' })
    const [insertData, setInsertData] = useState({})
    const [visiable, setVisiable] = useState(false)
    const [img, setImg] = useState()


    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: '更新成功',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: '更新失败',
        });
    };

    const handleSubmit = () => {
        const a = { ...data, img: img };
        delete a._img;
        StudentAPI.insert(a)
            .then(data => {
                setInsertData(data);
                setVisiable(true);
                success()
            })
            .catch(() => error())
    }

    return (
        <div className="student-table" style={{ overflow: 'auto' }}>
            <h2>insert</h2>
            {contextHolder}

            <p>
                <Link to='/student'>返回列表</Link>
            </p>

            <Form
                style={{ width: '25%' }}
                initialValues={
                    data
                }
                onValuesChange={
                    (changedValues, allValues) => {
                        setData(allValues)
                        console.log('change:', allValues);
                    }
                }
                onFinish={
                    (values) => {
                        console.log('Success:', values);
                        handleSubmit();
                    }}
            >
                <Form.Item label="姓名" name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your name!',
                        },
                    ]}>
                    <Input />
                </Form.Item>

                <Form.Item label="性别" name="gender">
                    <Radio.Group defaultValue={"1"}>
                        <Radio.Button value="1" >男</Radio.Button>
                        <Radio.Button value="0" >女</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="年级" name="grade" rules={[
                    {
                        required: true,
                        message: 'Please input your grade!',
                    },
                ]}>
                    <Select placeholder="Select grade">
                        <Option value="0" >一年级</Option>
                        <Option value="1" >二年级</Option>
                        <Option value="2" >三年级</Option>
                        <Option value="3" >四年级</Option>
                        <Option value="4" >五年级</Option>
                        <Option value="5" >六年级</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="分数" name="score"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your score!',
                        },
                    ]}>
                    <InputNumber />
                </Form.Item>

                <Form.Item label="学生头像" name="_img">
                    <Upload
                        customRequest={(options) => {
                            console.log("options:", options);
                            StudentAPI.upload(options.file).then(data => {
                                console.log(data)
                                setImg(data)
                                options.onSuccess();
                            })
                                .catch(() => (options.onError()))
                        }}
                        onRemove={(file) => {
                            console.log(file);
                            setImg(undefined)
                        }}
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>

                <Button type="reset">清空</Button>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>

            </Form>
            {visiable && <div>
                <p>创建了ID为{insertData.id}的学生成绩信息</p>
                <Students {...insertData} /></div>}
        </div>
    )

}