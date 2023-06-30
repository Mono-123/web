import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Students from '../components/detail'
import StudentAPI from '../../../service/student'
import './style.css'
import {GENDERS,GRADES} from '../components/detail'

export default () => {
    const params = useParams()
    const [data, setData] = useState({})
    const [visiable, setVisiable] = useState(false)
    // const [students, setStudents] = useState()
    // const [id, setId] = useState()
    // const [errorMessage, setErrorMessage] = useState('')
    // const url = '/api/student'

    // const name = params.name
    // const gender = params.gender
    // const grade = params.grade
    // const score = params.score

    const handleSubmit = () => {
        StudentAPI.insert(data)
            .then(data => {
                setData(data);
                setVisiable(true);
            })
            .catch(error => {
                alert('新建失败' + error)
            })
    }

    return (
        <div className="student-table">
            <h2>insert</h2>

            <p>
                <Link to='/student'>返回列表</Link>
            </p>

            <form onsubmit="return false;">
                <div>
                    <label for="name">姓名</label><br />
                    <input type="text" name="name" onChange={e => setData({ ...data, name: e.target.value })} /><br />


                    <label for="grade">年级</label><br />
                    <select name="grade" onChange={e => setData({ ...data, grade: Number.parseInt(e.target.value) })}>
                        <option disabled selected value>--请选择--</option>
                        {GRADES.map((grade, idx) => idx !== 0 && (
                            <option key={grade} value={idx - 1}>{grade}</option>
                        ))}
                    </select><br />


                    <label for="gender">性别</label><br />
                    {GENDERS.map((gender, idx) => (
                        <span key={gender}><input type="radio" name="gender" defaultChecked={idx===0} onClick={() => setData({ ...data, gender: idx })} /> {gender}</span>
                    ))}
                    <br />


                    <label for="score">分数</label><br />
                    <input type="number" name="score" onChange={e => setData({ ...data, score: Number.parseInt(e.target.value) })} /><br />

                    <button type="reset">清空</button>

                    <button type="button"  onClick={handleSubmit}  disabled={!data.name || !data.grade || !data.score}>提交</button>
                </div>
            </form>
            {visiable && <div>
                <p>创建了ID为{data.id}的学生成绩信息</p>
                <Students {...data} /></div>}
        </div>
    )

}