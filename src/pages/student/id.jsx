import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Detail from './components/detail'
import StudentAPI from '../../service/student'

export default () => {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams)
    const [data, setData] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (!params.id) return
        StudentAPI.getById(params.id)
            .then(data => {
                setData(data)
                if (!data) {
                    return (
                        <div>{errorMessage || 'Not found'}</div>
                    )
                }
            })
            .catch(error => {
                setErrorMessage(error.message)
            })
    }, [params.id])

    if (!params.id) return null;


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
            <Detail {...data} field={query.tab} />
        </div>
    )
}