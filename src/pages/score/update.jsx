import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import Score from '../../components/score'

export default () => {
    const params = useParams()
    const [scoreList, setScoreList] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    const id = params.id
    const studentId = params.studentId
    const chinese = params.chinese
    const math = params.math
    const english = params.english

    const url = '/api/score/'+ id

    useEffect(() => {
        fetch(url, {
            method: 'PUT',
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
            console.log(id)
            const json = await resp.json()
            if (resp.status >= 200 && resp.status < 400) {
                console.log("json from api:", json)
                setScoreList(<Score key={json.id} id={json.id} studentId={json.studentId} chinese={json.chinese} math={json.math} english={json.english} />)
                setErrorMessage('')
            } else {
                console.log("error form api:", json)
                setScoreList(undefined)
                setErrorMessage(json.error)
            }
        })
    }, [studentId, chinese, math, english])

    if (!scoreList) {
        return (
            <div><br></br>
                {errorMessage || 'Not found'}</div>
        )
    }

    return (
        <div>
            {scoreList}
        </div>
    )

}