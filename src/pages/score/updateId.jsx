import React, { useState } from 'react'
import ScoreJson from '../../../mock/Score.json'
import Score from '../../components/score'
import { useParams, useSearchParams, useNavigate } from 'react-router-dom'

export default () => {
    const list = ScoreJson.map(score => (
        <Score key={score.id} id={score.id} studentId={score.studentId} chinese={score.chinese} math={score.math} english={score.english} />
    ))
    const params = useParams()
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams);

    const [updateStudentId, setUpdateStudentId] = useState(params.studentId)
    const [updateChinese, setUpdateChinese] = useState(params.chinese)
    const [updateMath, setUpdateMath] = useState(params.math)
    const [updateEnglish, setUpdateEnglish] = useState(params.english)
    console.log(params.id,updateStudentId)
    return (
        <div>
            <form >
                <p>
                    需要更新的学生ID:
                    <input name="id" readonly="true" placeholder={params.id} />
                </p>
                <p>
                    学生学号
                    <input placeholder={params.studentId} onChange={(e) => setUpdateStudentId(parseInt(e.target.value))} />
                </p>
                <p>
                    语文成绩:
                    <input placeholder={params.chinese} onChange={(e) => setUpdateChinese(parseInt(e.target.value))} />
                </p>
                <p>
                    数学成绩:
                    <input placeholder={params.math} onChange={(e) => setUpdateMath(parseInt(e.target.value))} />
                </p>
                <p>
                    英语成绩:
                    <input placeholder={params.english} onChange={(e) => setUpdateEnglish(parseInt(e.target.value))} />
                </p>
                <div>
                    性别:
                    女 <input  checked={query.gender ==='0'}  name="gender" type="radio"   />
                    男 <input  checked={query.gender ==='1'} name="gender" type="radio"  />
                </div>
                <button onClick={() => {
                    navigate(`/score/update/${params.id}/${updateStudentId}/${updateChinese}/${updateMath}/${updateEnglish}`)
                }}disabled={!updateStudentId || !updateChinese || !updateMath || !updateEnglish}>提交</button>
                <input type="reset" value="重置" />
            </form>
            {/* 如果是表格转过来的，对于默认输入，重置无效 */}
            <input type="reset" value="重置" />
        </div>
    )

}