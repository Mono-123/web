import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import StudentAPI from '../../../service/student'
// import './style.css'
import { GENDERS, GRADES } from '../components/detail'
import { Radio, Select, Form, Input } from 'antd';

export default () => {
    const params = useParams()
    const [data, setData] = useState({})
    const [formData, setFormData] = useState({})

    const [componentSize, setComponentSize] = useState('default');
    const onFormLayoutChange = ({ size }) => {
        setComponentSize(size);
    };

    useEffect(() => {
        if (!params.id) return
        StudentAPI.getById(params.id)
            .then(data => {
                setData(data)
                setFormData(data)
            })
            .catch(error => {
                setErrorMessage(error.message)
            })
    }, [params.id])

    const handleSubmit = () => {
        StudentAPI.updateById(formData)
            .then(data => {
                alert('更新成功')
            })
            .catch(error => {
                alert('更新失败')
            })


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

                    <label for="grade">年级</label><br />
                    <select name="grade" value={formData.grade} onChange={e => setFormData({ ...formData, grade: Number.parseInt(e.target.value) })}>
                        {GRADES.map((grade, idx) => idx !== 0 && (
                            <option key={grade} value={idx - 1}>{grade}</option>
                        ))}
                    </select><br />

                    <Select
                        defaultValue={formData.grade}
                        style={{ width: 120, }}
                        onChange={e => setFormData({ ...formData, grade: Number.parseInt(e.target.value) })}
                        options={[
                            {
                                value: '0',
                                label: '一年级',
                            },
                            {
                                value: '1',
                                label: '二年级',
                            },
                            {
                                value: '2',
                                label: '三年级',
                            },
                            {
                                value: '3',
                                label: '四年级',
                            },
                        ]}
                    /><br />
                    <Form.Item label="年级">
                        <Select defaultValue={formData.grade} onChange={e => setFormData({ ...formData, grade: Number.parseInt(e.target.value) })}>
                            <Select.Option value="0">一年级</Select.Option>
                            <Select.Option value="1">二年级</Select.Option>
                            <Select.Option value="2">三年级</Select.Option>
                            <Select.Option value="3">四年级</Select.Option>
                            <Select.Option value="4">五年级</Select.Option>
                            <Select.Option value="5">一年级</Select.Option>
                        </Select>
                    </Form.Item>

                    <label for="gender">性别</label><br />
                    {/* {GENDERS.map((gender, idx) => (
                        <span key={gender}><input type="radio" checked={idx === formData.gender} onClick={() => setFormData({ ...formData, gender: idx })} /> {gender}</span>
                    ))} */}
                    <Radio.Group name="gender" defaultValue={formData.gender} onClick={() => setFormData({ ...formData, gender: Number.parseInt(e.target.value) })}>
                        <Radio value={1} >男</Radio>
                        <Radio value={0} >女</Radio>
                    </Radio.Group>

                    <br />

                    <Form.Item label="分数">
                        <Input type="number" name="score" value={formData.score} onChange={e => setFormData({ ...formData, score: Number.parseInt(e.target.value) })} />
                    </Form.Item><br />

                    {/* <button onClick={() => console.log(formData)} type="button">查看</button> */}

                    <button type="button" onClick={() => setFormData(data)}>清空</button>

                    <button type="button" onClick={handleSubmit}>提交</button>
                </div>
            </Form>
        </div>
    )
}