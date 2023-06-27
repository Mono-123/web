import React, { useState } from 'react'
import { useParams, Outlet, useNavigate } from 'react-router-dom'

export default () => {
  const params = useParams()
  const [id, setId] = useState(params.id)
  const navigate = useNavigate();

  return (
    <div> 
      <h1>Student</h1>

      <input value={id} onChange={(e) => setId(e.target.value)}></input>
      <button onClick={() => {
        if (!id) return
        navigate(`/student/detail/${id}`)
      }} disabled={!id}>点击查看</button>

      <Outlet />
    </div>
  )
}