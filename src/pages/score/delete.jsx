import React, { useEffect, useState } from 'react'
import { useParams} from 'react-router-dom'

export default () => {
    const params = useParams()
    const id = params.id
    const url = '/api/score/'+ id

    const [result, setResult] = useState()

    useEffect(() => {
        fetch(url, {
            method: 'DELETE',
        }).then(async resp => {
            if (resp.status==200) {
               setResult("删除成功")
            } else {
                console.log("error form api:",resp)
                setResult(resp.statusText)
            }
        })
    }, [params.id])

    return(
        <div>
            {result}
        </div>
    )
}