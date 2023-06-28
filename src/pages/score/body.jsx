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
    const navigate = useNavigate()

    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)

    const [studentId, setStudentId] = useState()
    const [chinese, setChinese] = useState()
    const [math, setMath] = useState()
    const [english, setEnglish] = useState()




    // let getbyid = ScoreJson.find(score => score.id == 1);
    // const list2 = <Score key={10000} id={1} studentId={getbyid.studentId} chinese={getbyid.chinese} math={getbyid.math} english={getbyid.english} />

    // function getById(id) {
    //     let Array = ScoreJson;
    //     for (let i = 0; i < Array.length - 1; i++) {
    //         if (Array[i].id == id) {
    //             return (Array[i]);
    //         }
    //     }
    // }
    // const list3 = getById(1);

    // id.addEventListener("click",
    //     function getById(id) {
    //         let Array = ScoreJson;
    //         for (let i = 0; i < Array.length - 1; i++) {
    //             if (Array[i].id == id) {
    //                 return (Array[i]);
    //             }
    //         }
    //     }
    // );

    return (
        <div>
            <p>
                <Link to={`/`}>返回主页</Link>
            </p>

            <h1>score</h1>

            <h4>按id查询</h4>
            请输入需要查找的id:
            <input value={id} onChange={(e) => setId(e.target.value)}></input>
            <button onClick={() => {
                if (!id) return
                navigate(`/score/id/${id}`)
            }} disabled={!id}>查询</button>
            {/* <input type="number" onChange={(e) => {
                setId(parseInt(e.target.value))
                console.log(id);
                let i;
                for (i = 0; i < list.length - 1; i++) {
                    if (list[i].id == id) {
                        break;
                    }
                } if (i == (list.length - 1)) {
                    alert("未找到学号为" + id + "的学生成绩");
                }
            }} /> */}
            {/* <Link to={`id/${id}`}>查询</Link> */}
            {/* <button onClick={(e) => {
                setVisible(false);
                let getbyid = ScoreJson.find(score => score.id == id);
                const list2 = <Score key={id} id={id} studentId={getbyid.studentId} chinese={getbyid.chinese} math={getbyid.math} english={getbyid.english} />
                setArray(list2);
            }} >查询</button> */}

            <h4>分页查询</h4>
            limit：<input type="number" onChange={(e) => setLimit(parseInt(e.target.value))} />
            offset：<input type="number" onChange={(e) => setOffset(parseInt(e.target.value))} />

            <button onClick={() => {
                navigate(`/score/pagination/${limit}/${offset}`)
            }} >点击查看</button>
            {/* <Link to={`pagination/${limit}/${offset}`}>查询</Link> */}

            {/* <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>学生学号</th>
                        <th>语文成绩</th>
                        <th>数学成绩</th>
                        <th>英语成绩</th>
                    </tr>
                </thead>
                <tbody id="table">
                    {visible && list}
                    {array}
                </tbody>
            </table> */}

            <form name="scoreform" onsubmit="return false;">
                <h2>创建</h2>
                <p>
                    学生学号
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
                    // navigate(`/score/insert/${studentId}/${chinese}/${math}/${english}`)
                }} >提交</button>
                <input type="reset" value="重置" />
            </form>

            <form >
                <h2>更新</h2>
                <p>
                    ID:
                    <input name="Id" onChange={(e) => setId(parseInt(e.target.value))} />
                </p>
                
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
                    navigate(`/score/update/${id}/${studentId}/${chinese}/${math}/${english}`)
                }} >提交</button>
                <input type="reset" value="重置" />
            </form>

            {/* <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>学生学号</th>
                        <th>语文成绩</th>
                        <th>数学成绩</th>
                        <th>英语成绩</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="table">
                </tbody>
            </table> */}


            <Outlet />
        </div>
    )
}