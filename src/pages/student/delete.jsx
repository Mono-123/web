import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'
import StudentAPI from '../../service/student'

export default () => {
    const params = useParams()
    const[result,setResult] = useState()


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

    return(
        <div>
            {result}
        </div>
    )
}