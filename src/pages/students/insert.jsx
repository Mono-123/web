import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import Students from '../../components/StudentsId'

export default () => {
    const params = useParams()
    const [students, setStudents] = useState()
    const [id, setId] = useState()
    const [errorMessage, setErrorMessage] = useState('')
    const url = '/api/student'

    const name = params.name
    const gender = params.gender
    const grade = params.grade
    const score = params.score

    useEffect(() => {
        fetch(url, {
            method: 'POST',
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
            const json = await resp.json()
            if (resp.status >= 200 && resp.status < 400) {
                console.log("json from api:", json)
                setStudents(<Students key={json.id} id={json.id} name={json.name} gender={json.gender} grade={json.grade} score={json.score} />)
                setId(json.id)
                setErrorMessage('')
            } else {
                console.log("error form api:", json)
                setStudents(undefined)
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
            <p>创建了ID为{id}的学生成绩信息</p>
            {students}
        </div>
    )

}