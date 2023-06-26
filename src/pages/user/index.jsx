import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default () => {
    const [id, setId] = useState()

    return (
        <div>
            <h1>User</h1>

            <input value={id} onChange={(e) => setId(e.target.value)}></input>
            <br />

            {id && (
              <span>
                <Link to={`detail/${id}`}>点击查看</Link> {id} 号 User
              </span>
            )}

            <Outlet />
        </div>
    )
}