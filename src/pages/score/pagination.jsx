import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ScoreTable from '../../components/ScoreTable'
import ScoreJson from '../../../mock/Score.json'

const enabledMock = false

export default () => {
    const params = useParams()
    const [scoreList, setScoreList] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    let limit = params.limit
    let offset = params.offset

    // const [limit, setLimit] = useState(10)
    // const [offset, setOffset] = useState(0)

    // const [limit, setLimit] = useState()
    // const [offset, setOffset] = useState()

    // setLimit(params.limit)
    // setOffset(params.offset)

    useEffect(() => {
        console.log('limit:', limit, 'offset:', offset);
        // if (limit !== limit || offset !== offset) {
            if (isNaN(limit)) {
            limit = 10;
            console.log("limit进行了判断")
        }
        if (isNaN(offset)) {
            offset = 0;
            console.log("offset进行了判断")
        }
        if (enabledMock) {
            for (let i = offset; i < (offset + limit); i++) {
                array.push(ScoreJson[i]);
            }
        } else {
            fetch(`/api/score/list?limit=${limit}&offset=${offset}`)
                .then(async resp => {
                    const json = await resp.json()
                    if (resp.status >= 200 && resp.status < 400) {
                        console.log("json from api:", json, 'limit:', limit, 'offset:', offset)
                        setScoreList(json.map(score => (
                            <ScoreTable key={score.id} id={score.id} studentId={score.studentId} chinese={score.chinese} math={score.math} english={score.english} />
                        )))
                        setErrorMessage('')
                    } else {
                        console.log("error form api:", json, 'limit:', limit, 'offset:', offset)
                        setScoreList(undefined)
                        setErrorMessage(json.error)
                    }
                })

        }
    }, [limit, offset])

    if (!scoreList) {
        return (
            <div><br></br>
                {errorMessage || 'Not found'}</div>
        )
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>学生学号</th>
                        <th>语文成绩</th>
                        <th>数学成绩</th>
                        <th>英语成绩</th>
                    </tr>
                </thead>
                <tbody id="table">
                    {scoreList}
                </tbody>
            </table>

        </div>
        //     let list = ScoreJson.map(score => (
        //     <Score key={score.id} id={score.id} studentId={score.studentId} chinese={score.chinese} math={score.math} english={score.english} />
        // ))

        // let array = [];
        // for (let i = offset; i < (offset + limit); i++) {
        //     array.push(list[i]);
        // }

    )
}