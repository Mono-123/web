import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ScoreJson from '../../../mock/Score.json'
import Score from '../../components/ScoreId'

const enabledMock = false

export default () => {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams);
    
    const [score, setScore] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if(!params.id) return
        if(enabledMock){
            setScore(ScoreJson.find(s=>s.id.toString()===params.id))
        }else{
            fetch(`/api/score/${params.id}`)
            .then(async resp => {
                const json = await resp.json()
                if(resp.status>=200&&resp.status<400){
                    console.log("json from api:",json)
                    setScore(json)
                    setErrorMessage('')
                } else {
                    console.log("error form api:", json) 
                    setScore(undefined)
                    setErrorMessage(json.error)
                }
            })
        }
    }, [params.id])
    
    if(!params.id) return null;
    if(!score){
        return(
            <div><br></br>
            {errorMessage || 'Not found'}</div>
        )
    }
    return (
        <div>
            <h2>学号为{params.id}的学生成绩</h2>
            <p>
                请选择要查看的科目：
                <select value= {query.tab}onChange={
                    (e)=>setSearchParams({
                        ...query,
                        tab:e.target.value
                    })
                }>
                    <option disabled selected value>请选择要查询的科目</option>
                    <option>chinese</option>
                    <option>math</option>
                    <option>english</option>
                </select>
            </p>
            < Score {...score} field={query.tab}/>
        </div>
    )
}
    // let a = false;

    // if (!params.id) return null;
    // const score = ScoreJson.find(u => u.id.toString() === params.id);

    // if (!score) {
    //     a = true;
    // }

    // return (
    //     <div>

    //         <h4>学号为{params.id}的学生的成绩</h4>
    //         <p>
    //             请选择要查看的成绩信息：
    //             <select value={query.tab} onChange={
    //                 (e) => setSearchParams({
    //                     ...query,
    //                     tab: e.target.value
    //                 })
    //             }>
    //                 <option disabled selected value> -- select an option -- </option>
    //                 <option>语文成绩</option>
    //                 <option>数学成绩</option>
    //                 <option>英语成绩</option>
    //                 <option>全科成绩</option>
    //             </select>
    //         </p>
    //         <p>
    //             {(!query.tab || query.tab === '全科成绩') && score && <ScoreId key={score.id} id={score.id} studentId={score.studentId} chinese={score.chinese} math={score.math} english={score.english} />}
    //             {query.tab === '语文成绩'&& score && ("语文成绩：" + score.chinese)}
    //             {query.tab === '数学成绩' && score&& ("数学成绩：" + score.math)}
    //             {query.tab === '英语成绩'&& score && ("英语成绩：" + score.english)}

    //         </p>
    //         {a && "未找到id为" + params.id + "的分数信息"}
    //     </div>
    // )
