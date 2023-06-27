import React, { useState } from 'react'
import StudentsJson from '../../../mock/students.json'
import { Link, Outlet } from 'react-router-dom'

export default () => {

    const [visibleLink, setVisibleLink] = useState()
    const [id, setId] = useState()

    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)

    return (
        <div>
            <p>
                <Link to={`/`}>返回主页</Link>
            </p>

            <h1>students</h1>

            <h4>按id查询</h4>
            请输入需要查找的id: <input type="number" onChange={(e) => {
                const nextId=parseInt(e.target.value);
                setId(nextId);
                setVisibleLink(StudentsJson.find(students => students.id === nextId));
            }} />

            {visibleLink && (<span>
                <Link to={`id/${id}`}>查询</Link>
            </span>)}


            <h4>分页查询</h4>
            limit：<input type="number" onChange={(e) => setLimit(parseInt(e.target.value))} />
            offset：<input type="number" onChange={(e) => setOffset(parseInt(e.target.value))} />

            <Link to={`pagination/${limit}/${offset}`}>查询</Link>


            {/* <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>名称</th>
                        <th>性别</th>
                        <th>年级</th>
                        <th>分数</th>
                    </tr>
                </thead>
                <tbody id="table">
                    {visible && list}
                    {visible3 && array}
                    {visible5 && array2}
                </tbody>
            </table> */}

            <Outlet />
        </div>
    )
}