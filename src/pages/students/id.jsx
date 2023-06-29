import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Students from '../../components/StudentsId'

export default () => {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams);
    
    const [students, setStudents] = useState()
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if(!params.id) return
            fetch(`/api/student/${params.id}`)
            .then(async resp => {
                const json = await resp.json()
                if(resp.status>=200&&resp.status<400){
                    console.log("json from api:",json)
                    setStudents(json)
                    setErrorMessage('')
                } else {
                    console.log("error form api:", json) 
                    setStudents(undefined)
                    setErrorMessage(json.error)
                }
            })
        
    }, [params.id])
    
    if(!params.id) return null;
    if(!students){
        return(
            <div><br></br>
            {errorMessage || 'Not found'}</div>
        )
    }
    return (
        <div>
            <h2>学号为{params.id}的学生信息</h2>
            <p>
                请选择要查看的学生信息：
                <select value= {query.tab}onChange={
                    (e)=>setSearchParams({
                        ...query,
                        tab:e.target.value
                    })
                }>
                    <option disabled selected value>--请选择--</option>
                    <option>name</option>
                    <option>gender</option>
                    <option>grade</option>
                    <option>score</option>
                </select>
            </p>
            < Students {...students} field={query.tab}/>
        </div>
    )
}