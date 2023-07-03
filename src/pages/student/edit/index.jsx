import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import StudentAPI from '../../../service/student'
// import './style.css'
import { GENDERS, GRADES } from '../components/detail'
import { Radio, Select, Space } from 'antd';

export default () => {
    const params = useParams()
    const [data, setData] = useState({})
    const [formData, setFormData] = useState({})

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

            <form>
                <div>
                    <label for="name">姓名</label><br />
                    <input type="text" name="name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /><br />


                    <label for="grade">年级</label><br />
                    <select name="grade" value={formData.grade} onChange={e => setFormData({ ...formData, grade: Number.parseInt(e.target.value) })}>
                        {GRADES.map((grade, idx) => idx !== 0 && (
                            <option key={grade} value={idx - 1}>{grade}</option>
                        ))}
                    </select><br />

                    <Select
                        defaultValue={formData.grade}
                        style={{width: 120,}}
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


                    <label for="gender">性别</label><br />
                    {/* {GENDERS.map((gender, idx) => (
                        <span key={gender}><input type="radio" checked={idx === formData.gender} onClick={() => setFormData({ ...formData, gender: idx })} /> {gender}</span>
                    ))} */}
                    <Radio.Group name="gender" defaultValue={formData.gender} onClick={() => setFormData({ ...formData, gender: Number.parseInt(e.target.value) })}>
                        <Radio value={1} >男</Radio>
                        <Radio value={0} >女</Radio>
                    </Radio.Group>

                    <br />


                    <label for="score">分数</label><br />
                    <input type="number" name="score" value={formData.score} onChange={e => setFormData({ ...formData, score: Number.parseInt(e.target.value) })} /><br />

                    {/* <button onClick={() => console.log(formData)} type="button">查看</button> */}

                    <button type="button" onClick={() => setFormData(data)}>清空</button>

                    <button type="button" onClick={handleSubmit}>提交</button>
                </div>
            </form>
        </div>
    )
}