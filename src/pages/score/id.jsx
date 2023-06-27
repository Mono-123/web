import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ScoreJson from '../../../mock/Score.json'
import Score from '../../components/score'
import ScoreId from '../../components/ScoreId'

export default () => {

    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams)

    if (!params.id) return null;
    const score = ScoreJson.find(u => u.id.toString() === params.id);

    return (
        <div>

            <h4>学号为{params.id}的学生的成绩</h4>
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
                {(!query.tab || query.tab === '全科成绩') && <ScoreId key={score.id} id={score.id} studentId={score.studentId} chinese={score.chinese} math={score.math} english={score.english} />}
                {query.tab === '语文成绩' && ("语文成绩："+score.chinese)}
                {query.tab === '数学成绩' && ("数学成绩："+score.math)}
                {query.tab === '英语成绩' && ("英语成绩："+score.english)}

            </p>

        </div>
    )
}