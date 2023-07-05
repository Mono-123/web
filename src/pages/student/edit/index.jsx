import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import StudentAPI from '../../../service/student'
// import './style.css'
import { GENDERS, GRADES } from '../components/detail'
import { Radio, Select, Form, Input ,Button, message} from 'antd';

export default () => {
    const params = useParams()
    const [data, setData] = useState()
    const [formData, setFormData] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    const [messageApi, contextHolder] = message.useMessage();

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };
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


    useEffect(() => {
        if (!params.id) return
        StudentAPI.getById(params.id)
            .then(data => {
                setData(data);
                setFormData(data);
            })
            .catch(error => {
                setErrorMessage(error.message)
            })
    }, [params.id])

    const handleSubmit = () => {
        StudentAPI.updateById(formData)
            .then(() =>success())
            .catch(() => error())
    }

    if (!params.id) return null;

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
                initialValues={{
                    size: componentSize,
                }}
                onValuesChange={onFormLayoutChange}
                size={componentSize}
                style={{
                    maxWidth: 600,
                }}>
                <div>
                    <Form.Item label="姓名">
                        <Input name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                    </Form.Item>
                    {/* 
                    <label for="grade">年级</label><br />
                    <select name="grade" value={formData.grade} onChange={e => setFormData({ ...formData, grade: Number.parseInt(e.target.value) })}>
                        {GRADES.map((grade, idx) => idx !== 0 && (
                            <option key={grade} value={idx - 1}>{grade}</option>
                        ))}
                    </select><br /> */}


                    <Form.Item label="性别" >
                        <Radio.Group name="gender"  value={formData.gender} onChange={e => setFormData({ ...formData, gender: Number.parseInt(e.target.value) })}>
                            <Radio.Button value={1} >男</Radio.Button>
                            <Radio.Button value={0} >女</Radio.Button>
                        </Radio.Group>
                    </Form.Item>


                    <Form.Item label="年级" >
                        <Select name="grade" value={formData.grade} onChange={value => setFormData({ ...formData, grade: value })}
                        options={[
                            { value: 0, label: '一年级'},
                            { value: 1, label: '二年级'},
                            { value: 2, label: '三年级'},
                            { value: 3, label: '四年级'},
                            { value: 4, label: '五年级'},
                            { value: 5, label: '六年级'},
                          ]}
                        >
                        {/* <Select.Option value={0} >一年级</Select.Option>
                        <Select.Option value={1} >二年级</Select.Option>
                        <Select.Option value={2} >三年级</Select.Option>
                        <Select.Option value={3} >四年级</Select.Option>
                        <Select.Option value={4} >五年级</Select.Option>
                        <Select.Option value={5} >六年级</Select.Option> */}
                        </Select>
                    </Form.Item>

                    {/* <label for="gender">性别</label><br />
                    {GENDERS.map((gender, idx) => (
                        <span key={gender}><input type="radio" checked={idx === formData.gender} onClick={() => setFormData({ ...formData, gender: idx })} /> {gender}</span>
                    ))} */}
                    {/* <Radio.Group name="gender" defaultValue={formData.gender} onClick={() => setFormData({ ...formData, gender: Number.parseInt(e.target.value) })}>
                        <Radio value={1} >男</Radio>
                        <Radio value={0} >女</Radio>
                    </Radio.Group> */}


                    <Form.Item label="分数">
                        <Input type="number" name="score" value={formData.score} onChange={e => setFormData({ ...formData, score: Number.parseInt(e.target.value) })} />
                    </Form.Item><br />

                    {/* <button onClick={() => console.log(formData)} type="button">查看</button> */}

                    <Button onClick={() => setFormData(data)}>清空</Button>

                    <Button onClick={() => {
                        if (!formData.name) message.warning('请输入学生姓名', 2.5);
                        else if (!formData.gender) message.warning('请输入学生性别', 2.5);
                        else if (!formData.grade) message.warning('请输入学生年级', 2.5);
                        else if (!formData.score) message.warning('请输入学生分数', 2.5);
                        else handleSubmit();
                    }}>提交</Button>

                </div>
            </Form>
        </div>
    )
}