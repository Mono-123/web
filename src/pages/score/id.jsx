import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ScoreJson from '../../../mock/Score.json'
import Score from '../../components/score'
import ScoreId from '../../components/ScoreId'

export default () => {

    const [visible, setVisible] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [array, setArray] = useState([])
    const [a, setA] = useState()

    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams)

    const list = ScoreJson.map(score => (
        <Score key={score.id} id={score.id} studentId={score.studentId} chinese={score.chinese} math={score.math} english={score.english} />
    ))

    if (!params.id) return null;
    const score = ScoreJson.find(u => u.id.toString() === params.id);

    return (
        <div>
            <h1>score</h1>
            <p>学号为{params.id}的学生的成绩</p>
            <p>
                请选择要查看的成绩信息：
                <select value={query.tab} onChange={
                    (e) => setSearchParams({
                        ...query,
                        tab: e.target.value
                    })
                }>
                    <option disabled selected value> -- select an option -- </option>
                    <option>语文成绩</option>
                    <option>数学成绩</option>
                    <option>英语成绩</option>
                    <option>全科成绩</option>
                </select>
            </p>
            <p>
            {(!query.tab || query.tab === '全科成绩')&& <ScoreId key={score.id} id={score.id} studentId={score.studentId} chinese={score.chinese} math={score.math} english={score.english} />}
            {query.tab === '语文成绩' && score.chinese}
            {query.tab === '数学成绩' && score.math}
            {query.tab === '英语成绩' && score.english}
            </p>
            

            <button onClick={(e) => setVisible(e.target)} >显示所有学生成绩</button>

            <h4>按id查询</h4>
            请输入需要查找的id: <input type="number" onChange={(e) => setA(e.target.value)} />
            <button onClick={() => {
                setVisible(false);
                setVisible3(true);
                let getbyid = ScoreJson.find(score => score.id == a);
                const list2 = <Score key={a} id={a} studentId={getbyid.studentId} chinese={getbyid.chinese} math={getbyid.math} english={getbyid.english} />
                setArray(list2);
            }} >查询</button>


            <table>
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
                    {visible3 && array}
                </tbody>
            </table>

        </div>
    )
}