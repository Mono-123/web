import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import ScoreAPI from '../../../service/score'
// import './style.css'
import { UserOutlined,FunctionOutlined,HighlightOutlined,FontColorsOutlined } from '@ant-design/icons';
import { Input,InputNumber } from 'antd';

export default () => {
    const params = useParams()
    const [data, setData] = useState({})
    const [formData, setFormData] = useState({})

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
                <Link to='/score'>返回列表</Link>
            </p>

            <form>
                <div>
                    <label for="studentId">学生学号</label><br />
                    <InputNumber placeholder="default size"  prefix={<UserOutlined />} type="number" name="studentId" defaultValue={formData.studentId} onChange={e => setFormData({ ...formData, studentId: Number.parseInt(e.target.value) })} /><br />

                    <label for="chinese">语文成绩</label><br />
                    <InputNumber addonAfter={"分"} placeholder="default size" prefix={<HighlightOutlined />} type="number" name="chinese" value={formData.chinese} onChange={e => setFormData({ ...formData, chinese: Number.parseInt(e.target.value) })} /><br />

                    <label for="math">数学成绩</label><br />
                    <InputNumber addonAfter={"分"} placeholder="default size" prefix={<FunctionOutlined />} type="number" name="math" value={formData.math} onChange={e => setFormData({ ...formData, math: Number.parseInt(e.target.value) })} /><br />
                    
                    <label for="english">英语成绩</label><br />
                    <InputNumber addonAfter={"分"} placeholder="default size" prefix={<FontColorsOutlined />} type="number" name="english" value={formData.english} onChange={e => setFormData({ ...formData, english: Number.parseInt(e.target.value) })} /><br />

                    {/* <button onClick={() => console.log(formData)} type="button">查看</button> */}

                    <button type="button" onClick={() => setFormData(data)}>清空</button>

                    <button type="button" onClick={handleSubmit} disabled={!formData.studentId || !formData.chinese || !formData.math||!formData.english}>提交</button>
                </div>
            </form>
        </div>
    )
}