import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import Score from '../../components/ScoreId'

export default () => {
    const params = useParams()
    const [score, setScore] = useState()
    const [id, setId] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    const url = '/api/score'

    const studentId = params.studentId
    const chinese = params.chinese
    const math = params.math
    const english = params.english

    useEffect(() => {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "studentId": studentId,
                "chinese": chinese,
                "math": math,
                "english": english
            })
        }).then(async resp => {
            const json = await resp.json()
            if (resp.status >= 200 && resp.status < 400) {
                console.log("json from api:", json)
                setScore(<Score key={json.id} id={json.id} studentId={json.studentId} chinese={json.chinese} math={json.math} english={json.english} />)
                setId(json.id)
                setErrorMessage('')
            } else {
                console.log("error form api:", json)
                setScore(undefined)
                setErrorMessage(json.error)
            }
        })
    }, [studentId, chinese, math, english])

    if (!score) {
        return (
            <div><br></br>
                {errorMessage || 'Not found'}</div>
        )
    }

    return (
        <div>
            <p>创建了ID为{id}的学生成绩信息</p>
            {score}
        </div>
    )

}