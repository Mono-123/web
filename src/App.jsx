import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

export default () => {
    return (
        <div>
            <h1>Home Page</h1>

            <p>
                <Link to={`score`}>查看成绩信息</Link>
            </p>

            <p>
                <Link to={`students`}>查看学生信息</Link>
            </p>

            <p>
                <Link to={`grade`}>查看年级信息</Link>
            </p>
            <Outlet />

        </div>
    )

}