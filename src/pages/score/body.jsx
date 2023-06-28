import React, { useState } from 'react'
import ScoreJson from '../../../mock/Score.json'
import Score from '../../components/score'
import { useParams, Link, Outlet, useNavigate } from 'react-router-dom'

export default () => {
    const list = ScoreJson.map(score => (
        <Score key={score.id} id={score.id} studentId={score.studentId} chinese={score.chinese} math={score.math} english={score.english} />
    ))
    const params = useParams()
    const [id, setId] = useState()
    const [updateId, setUpdateId] = useState()
    const [deleteId, setDeleteId] = useState()
    const navigate = useNavigate()

    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)

    const [studentId, setStudentId] = useState()
    const [chinese, setChinese] = useState()
    const [math, setMath] = useState()
    const [english, setEnglish] = useState()

    const [updateStudentId, setUpdateStudentId] = useState()
    const [updateChinese, setUpdateChinese] = useState()
    const [updateMath, setUpdateMath] = useState()
    const [updateEnglish, setUpdateEnglish] = useState()
    //key尽量不要一样
    // let getbyid = ScoreJson.find(score => score.id == 1);
    // const list2 = <Score key={10000} id={1} studentId={getbyid.studentId} chinese={getbyid.chinese} math={getbyid.math} english={getbyid.english} />

    return (
        <div>
            <Link to={`/`}>返回主页</Link>

            <h1>score</h1>

            <h4>按id查询</h4>
            请输入需要查找的id:
            <input value={id} onChange={(e) => setId(e.target.value)}></input>
            <button onClick={() => {
                if (!id) return
                navigate(`/score/id/${id}`)
            }} disabled={!id}>查询</button>

            <h4>分页查询</h4>
            limit：<input type="number" onChange={(e) => setLimit(parseInt(e.target.value))} />
            offset：<input type="number" onChange={(e) => setOffset(parseInt(e.target.value))} />
            <button onClick={() => {
                navigate(`/score/pagination/${limit}/${offset}`)
            }} >点击查看</button>

            <form name="scoreform" onsubmit="return false;">
                <h2>创建</h2>
                <p>
                    学生学号:
                    <input name="studentId" onChange={(e) => setStudentId(parseInt(e.target.value))} />
                </p>
                <p>
                    语文成绩:
                    <input name="chinese" onChange={(e) => setChinese(parseInt(e.target.value))} />
                </p>
                <p>
                    数学成绩:
                    <input name="math" onChange={(e) => setMath(parseInt(e.target.value))} />
                </p>
                <p>
                    英语成绩:
                    <input name="english" onChange={(e) => setEnglish(parseInt(e.target.value))} />
                </p>
                <button onClick={() => {
                    navigate(`/score/insert/${studentId}/${chinese}/${math}/${english}`)
                }} disabled={!studentId || !chinese || !math || !english} >提交</button>

                <input type="reset" value="重置" />
            </form>

            <form >
                <h2>更新</h2>
                <p>
                    ID:
                    <input name="Id" onChange={(e) => setUpdateId(parseInt(e.target.value))} />
                </p>
                <p>
                    学生学号
                    <input onChange={(e) => setUpdateStudentId(parseInt(e.target.value))} />
                </p>
                <p>
                    语文成绩:
                    <input onChange={(e) => setUpdateChinese(parseInt(e.target.value))} />
                </p>
                <p>
                    数学成绩:
                    <input onChange={(e) => setUpdateMath(parseInt(e.target.value))} />
                </p>
                <p>
                    英语成绩:
                    <input onChange={(e) => setUpdateEnglish(parseInt(e.target.value))} />
                </p>
                <button onClick={() => {
                    navigate(`/score/update/${updateId}/${updateStudentId}/${updateChinese}/${updateMath}/${updateEnglish}`)
                }} disabled={!updateId || !updateStudentId || !updateChinese || !updateMath || !updateEnglish}>提交</button>
                <input type="reset" value="重置" />
            </form>

            <h4>按id删除</h4>
            请输入需要删除的学生id:
            <input value={id} onChange={(e) => setDeleteId(e.target.value)}></input>
            <button onClick={() => {
                if (!deleteId) return
                navigate(`/score/delete/${deleteId}`)
            }} disabled={!deleteId}>删除</button>

            <Outlet />
        </div>
    )
}