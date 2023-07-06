import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import StudentAPI from '../../../service/student'
// import './style.css'
import { GENDERS, GRADES } from '../components/detail'
import { Radio, Select, Form, Input, Button, message, InputNumber ,Spin} from 'antd';

export default () => {
    const params = useParams()
    const [data, setData] = useState()
    const [formData, setFormData] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState()

    const navigate = useNavigate();

    const [form] = Form.useForm();
    const onReset = () => {
        form.resetFields(["name"]);
        console.log('onreset', form)
    };

    const error = () => {
        messageApi.open({
            type: 'error',
            content: '更新失败',
        });
    };

    useEffect(() => {
        if (!params.id) return
        setLoading(true)
        StudentAPI.getById(params.id)
            .then(data => {
                setData(data);
                setFormData(data);
                setLoading(false);
            })
            .catch(error => {
                setErrorMessage(error.message)
                setLoading(false);
            })
    }, [params.id])

    const handleSubmit = () => {
        StudentAPI.updateById({ id: data.id, ...formData })
            .then(() => {
                message.success('更新成功');
                navigate(`/student`)
            })
            .catch(() => error())
    }

    if (!params.id) return null;

    if (loading) {
        return (
            <div><Spin /></div>
        )
    }

    if (!formData) {
        return (
            <div>{errorMessage || 'Not found'}</div>
        )
    }


    return (
        <div className="student-table">
            <h2>Edit {params.id}</h2>

            {contextHolder}

            <p>
                <Link to='/student'>返回列表</Link>
            </p>

            <Form
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="horizontal"
                initialValues={
                    data
                }
                onValuesChange={
                    (changedValues, allValues) => {
                        setFormData(allValues)
                        console.log('change:', allValues);
                    }
                }
                onFinish={
                    (values) => {
                        console.log('Success:', values);
                        handleSubmit();
                    }}
                style={{
                    maxWidth: 600,
                }}>
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
                    <Radio.Group   >
                        <Radio.Button value={1} >男</Radio.Button>
                        <Radio.Button value={0} >女</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="年级" name="grade">
                    <Select
                        options={[
                            { value: 0, label: '一年级' },
                            { value: 1, label: '二年级' },
                            { value: 2, label: '三年级' },
                            { value: 3, label: '四年级' },
                            { value: 4, label: '五年级' },
                            { value: 5, label: '六年级' },
                        ]} >
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
                </Form.Item><br />

                {/* <button onClick={() => console.log(formData)} type="button">查看</button> */}

                <Button htmlType="reset">reset</Button>

                <Button type="primary" htmlType="submit">
                    Submit
                </Button>

                {/* <Button onClick={() => {
                    if (!formData.name) message.warning('请输入学生姓名', 2.5);
                    else if (!formData.gender) message.warning('请输入学生性别', 2.5);
                    else if (!formData.grade) message.warning('请输入学生年级', 2.5);
                    else if (!formData.score) message.warning('请输入学生分数', 2.5);
                    else handleSubmit();
                }}>提交</Button> */}

            </Form>
        </div>
    )
}