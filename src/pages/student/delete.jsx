import React, { useEffect, useState } from 'react'
import { useParams,useNavigate , useSearchParams } from 'react-router-dom'
import StudentAPI from '../../service/student'

export default () => {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams)
    const navigate = useNavigate();

    const [result, setResult] = useState()


    useEffect(() => {
        console.log(params.id);
        if (!params.id) return
        StudentAPI.delete(params.id)
            .then(result => {
                setResult("删除成功")
            })
            .catch(error => {
                setResult("删除失败")
            })
    }, [params.id])

    return (
        <div>
            {result}
            <p>
            <button onClick={() => {
                console.log(params.id,query.limit,query.offset);
                navigate(`/student/?limit=${query.limit}&offset=${query.offset}`)
            }}>返回之前列表</button>
            </p>
        </div>
    )
}