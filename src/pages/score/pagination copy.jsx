import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ScoreTable from '../../components/ScoreTable'
import ScoreJson from '../../../mock/Score.json'

const enabledMock = false

export default () => {
    const params = useParams()
    const [scoreList, setScoreList] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    const [limit, setLimit] = useState()
    const [offset, setOffset] = useState()

    setLimit(parseInt(params.limit))
    setOffset(parseInt(params.offset))


    useEffect(() => {
        if (enabledMock) {
            for (let i = offset; i < (offset + limit); i++) {
                array.push(ScoreJson[i]);
            }
        } else {
            fetch(`/api/score/list?limit=${limit}&offset=${offset}`)
                .then(async resp => {
                    const json = await resp.json()
                    if (resp.status >= 200 && resp.status < 400) {
                        console.log("json from api:", json)
                        setScoreList(json.map(score => (
                            <ScoreTable key={score.id} id={score.id} studentId={score.studentId} chinese={score.chinese} math={score.math} english={score.english} />
                        )))
                        setErrorMessage('')
                    } else {
                        console.log("error form api:", json)
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
                        <th>Id</th>
                        <th>名称</th>
                        <th>性别</th>
                        <th>年级</th>
                        <th>分数</th>
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