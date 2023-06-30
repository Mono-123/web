import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Score from '../components/detail'
import ScoreAPI from '../../../service/score'
import './style.css'

export default () => {
    const params = useParams()
    const [data, setData] = useState({})
    const [visiable, setVisiable] = useState(false)
    // const [students, setStudents] = useState()
    // const [id, setId] = useState()
    // const [errorMessage, setErrorMessage] = useState('')
    // const url = '/api/score'

    // const name = params.name
    // const gender = params.gender
    // const grade = params.grade
    // const score = params.score

    const handleSubmit = () => {
        ScoreAPI.insert(data)
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
                <Link to='/score'>返回列表</Link>
            </p>

            <form onsubmit="return false;">
                <div>
                <label for="studentId">学生学号</label><br />
                    <input type="number" name="studentId" onChange={e => setData({ ...data, studentId: Number.parseInt(e.target.value) })} /><br />

                    <label for="chinese">语文成绩</label><br />
                    <input type="number" name="chinese" onChange={e => setData({ ...data, chinese: Number.parseInt(e.target.value) })} /><br />

                    <label for="math">数学成绩</label><br />
                    <input type="number" name="math" onChange={e => setData({ ...data, math: Number.parseInt(e.target.value) })} /><br />
                    
                    <label for="english">英语成绩</label><br />
                    <input type="number" name="english" onChange={e => setData({ ...data, english: Number.parseInt(e.target.value) })} /><br />

                    <button type="reset">清空</button>

                    <button type="button"  onClick={handleSubmit}  disabled={!data.studentId || !data.chinese || !data.math||!data.english}>提交</button>
                </div>
            </form>
            {visiable && <div>
                <p>创建了ID为{data.id}的学生成绩信息</p>
                <Score {...data} /></div>}
        </div>
    )

}