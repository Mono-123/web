import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import Students from '../../components/Students'

export default () => {
    const params = useParams()
    const [students, setScore] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    const id = params.id
    const name = params.name
    const gender = params.gender
    const grade = params.grade
    const score = params.score

    const url = '/api/student/'+ id

    useEffect(() => {
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "name": name,
                "gender": gender,
                "grade": grade,
                "score": score
            })
        }).then(async resp => {
            console.log(id)
            const json = await resp.json()
            if (resp.status >= 200 && resp.status < 400) {
                console.log("json from api:", json)
                setScore(<Students key={json.id} id={json.id} name={json.name} gender={json.gender} grade={json.grade} score={json.score} />)
                setErrorMessage('')
            } else {
                console.log("error form api:", json)
                setScore(undefined)
                setErrorMessage(json.error)
            }
        })
    }, [name, gender, grade, score])

    if (!students) {
        return (
            <div><br></br>
                {errorMessage || 'Not found'}</div>
        )
    }

    return (
        <div>
        <p>更新了ID为{id}的学生成绩信息</p>
            {students}
        </div>
    )

}