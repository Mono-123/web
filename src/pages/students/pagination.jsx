import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StudentsTable from '../../components/StudentsTable'

export default () => {
    const params = useParams()
    const [studentsList, setStudentsList] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    let limit = parseInt(params.limit)
    let offset = parseInt(params.offset)

    useEffect(() => {
        console.log('limit:', limit, 'offset:', offset);
        // if (limit !== limit || offset !== offset) {
            if (isNaN(limit)) {
            console.log("limit为NaN")
            limit = 10;
        }
        if (isNaN(offset)) {
            console.log("offset为NaN")
            offset = 0;
        }
        fetch(`/api/student/list?limit=${limit}&offset=${offset}`)
            .then(async resp => {
                const json = await resp.json()
                if (resp.status >= 200 && resp.status < 400) {
                    console.log("json from api:", json)
                    setStudentsList(json.map(students => (
                        <StudentsTable key={students.id} id={students.id} name={students.name} gender={students.gender} grade={students.grade} score={students.score} />
                    )))
                    setErrorMessage('')
                } else {
                    console.log("error form api:", json)
                    setStudentsList(undefined)
                    setErrorMessage(json.error)
                }
            })
    }, [limit, offset])

    if (!studentsList) {
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
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody id="table">
                    {studentsList}
                </tbody>
            </table>
        </div>

    )
}
