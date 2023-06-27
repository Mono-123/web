import React, { useState } from 'react'
import GradeJson from '../../../mock/grade.json'
import Grade from '../../components/Grade'
import { Link, Outlet } from 'react-router-dom'

export default () => {
    const [id, setId] = useState()

    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)

    const list = GradeJson.map(grade => (
        <Grade key={grade.id} id={grade.id} grade={grade.grade} managerId={grade.managerId} isGraduated={grade.isGraduated} />
    ))

    // const [visible, setVisible] = useState(false)

    return (
        <div>
            <p>
                <Link to={`/`}>返回主页</Link>
            </p>

            <h1>Grade</h1>

            <h4>按id查询</h4>
            请输入需要查找的id: <input type="number" onChange={(e) => setId(parseInt(e.target.value))} />
            <Link to={`id/${id}`}>查询</Link>
            
            {/* <input type='checkbox' onChange={(e) => setVisible(e.target.checked)} checked={visible}></input>查询学生成绩 */}
            {/* <button onClick={(e) => setVisible(e.target)} >查询学生成绩</button> */}


            <h4>分页查询</h4>
            limit：<input type="number" onChange={(e) => setLimit(parseInt(e.target.value))} />
            offset：<input type="number" onChange={(e) => setOffset(parseInt(e.target.value))} />

            <Link to={`pagination/${limit}/${offset}`}>查询</Link>


            {/* <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>年级</th>
                        <th>班主任编号</th>
                        <th>毕业情况</th>
                    </tr>
                </thead>
                <tbody id="table">
                    {visible && list}
                </tbody>
            </table> */}
            <Outlet />
        </div>
    )
}