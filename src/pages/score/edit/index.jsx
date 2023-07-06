import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ScoreAPI from '../../../service/score'
// import './style.css'
import { UserOutlined, FunctionOutlined, HighlightOutlined, FontColorsOutlined } from '@ant-design/icons';
import { Input, Button, message, Form } from 'antd';

export default () => {
    const params = useParams()
    const [data, setData] = useState()
    const [formData, setFormData] = useState()
    const [errorMessage, setErrorMessage] = useState('')

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
    const warning = () => {
        messageApi.open({
            type: 'warning',
            content: '请输入完整数据',
        });
    };

    const onchange = (record, e) => {
        if (record === 'studentId') setFormData({ ...formData, studentId: Number.parseInt(e.target.value) });
        if (record === 'chinese') setFormData({ ...formData, chinese: Number.parseInt(e.target.value) });
        if (record === 'math') setFormData({ ...formData, math: Number.parseInt(e.target.value) });
        if (record === 'english') setFormData({ ...formData, english: Number.parseInt(e.target.value) });
    }

    useEffect(() => {
        if (!params.id) return
        ScoreAPI.getById(params.id)
            .then(data => {
                setData(data)
                setFormData(data)
            })
            .catch(error => {
                setErrorMessage(error.message)
            })
    }, [params.id])

    const handleSubmit = () => {
        ScoreAPI.updateById(formData)
            .then(() => success())
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
                <Link to='/score'>返回列表</Link>
            </p>

            <Form style={{ width: '25%' }} placeholder="default size">
                <div>

                    <Form.Item label="学生学号">
                        <Input  prefix={<UserOutlined />} name="studentId"
                            value={formData.studentId} onChange={(e)=>onchange('studentId', e)} /><br />
                    </Form.Item>

                    <Form.Item label="语文成绩">
                        <Input addonAfter={"分"}  prefix={<HighlightOutlined />} name="chinese"
                            value={formData.chinese} onChange={(e)=>onchange('chinese', e)} /><br />
                    </Form.Item>

                    <Form.Item label="数学成绩">
                        <Input addonAfter={"分"}  prefix={<FunctionOutlined />} name="math"
                            value={formData.math} onChange={(e)=>onchange('math', e)} /><br />
                    </Form.Item>

                    <Form.Item label="英语成绩">
                        <Input addonAfter={"分"}  prefix={<FontColorsOutlined />} name="english"
                            value={formData.english} onChange={(e)=>onchange('english', e)} /><br />
                    </Form.Item>

                    <Button onClick={() => setFormData(data)}>清空</Button>

                    <Button onClick={() => {
                        if (!formData.studentId) message.warning('请输入学生学号', 2.5);
                        else if (!formData.chinese) message.warning('请输入学生语文成绩', 2.5);
                        else if (!formData.math) message.warning('请输入学生数学成绩', 2.5);
                        else if (!formData.english) message.warning('请输入学生英语成绩', 2.5);
                        else handleSubmit();
                    }}>提交</Button>
                </div>
            </Form>
        </div>
    )
}