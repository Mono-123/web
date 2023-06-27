import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Student from '../../components/Student'
import StudentJsonMock from '../../../mock/students.json'

const enabledMock = false

export default () => {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams)
    const [student, setStudent] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (!params.id) return
        if (enabledMock) {
            setStudent(StudentJsonMock.find(s => s.id.toString() === params.id))
        } else {
            fetch(`/api/student/${params.id}`)
              .then(async resp => {
                const json = await resp.json()
                if (resp.status >= 200 && resp.status < 400) {
                    console.log("json form api:", json) 
                    setStudent(json)
                    setErrorMessage('')
                } else {
                    console.log("error form api:", json) 
                    setStudent(undefined)
                    setErrorMessage(json.error)
                }
            })
        }
    }, [params.id])

    if (!params.id) return null;

    if (!student) {
        return (
            <div>{errorMessage || 'Not found'}</div>
        )
    }
    return (
        <div>
            <h2>Detail of {params.id}</h2>
            <p>
                请选择要查看的信息：
                <select value={query.tab} onChange={
                    (e) => setSearchParams({
                        ...query,
                        tab: e.target.value
                    })
                }>
                    <option disabled selected value>请选择</option>
                    <option>name</option>
                    <option>grade</option>
                    <option>gender</option>
                    <option>score</option>
                </select>
            </p>
            <Student {...student} field={query.tab} />
        </div>
    )
}