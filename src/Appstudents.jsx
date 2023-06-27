import React, { useState } from 'react'
import StudentsJson from '../mock/students.json'
import Students from './components/Students'
import { Link, Outlet } from 'react-router-dom'
import id from './pages/students/id'

export default () => {
    let list = StudentsJson.map(students => (
        <Students key={students.id} id={students.id} name={students.name} gender={students.gender} grade={students.grade} score={students.score} />
    ))

    // const [visible, setVisible] = useState(false)
    // const [visible3, setVisible3] = useState(false)
    // const [visible5, setVisible5] = useState(false)
    // const [visible6, setVisible6] = useState(false)

    const [id, setId] = useState()
    const [error, setError] = useState(false)
    // const [array, setArray] = useState([])
    // const [array2, setArray2] = useState([])

    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)

    return (
        <div>
            <p>
                <Link to={`/`}>返回主页</Link>
            </p>

            <h1>students</h1>

            {/* <button onClick={(e) => {
                setVisible(e.target);
                setVisible3(false);
                setVisible5(false);
            }} >显示所有学生信息</button> */}

            <h4>按id查询</h4>
            请输入需要查找的id: <input type="number" onChange={(e) => {
                setId(parseInt(e.target.value))
                console.log(id);
                let i;
                for (i = 0; i < list.length - 1; i++) {
                    if (list[i].id == id) {
                        break;
                    }
                } if (i == (list.length - 1)) {
                    setError(true)
                }
            }} />

            {(!error) && (<span>
                <Link to={`id/${id}`}>查询</Link>
            </span>)}

            {/* <button onClick={() => {
                for (let i = 0; i < list.length - 1; i++) {
                    if (list[i].id == id) {
                        break;
                    } if(i==list.length - 1){
                        <Link to={`id/${id}`}>查询</Link>
                    }else{<p>not found</p>}
                }
            }} >查询</button> */}

            <h4>分页查询</h4>
            limit：<input type="number" onChange={(e) => setLimit(parseInt(e.target.value))} />
            offset：<input type="number" onChange={(e) => setOffset(parseInt(e.target.value))} />

            <Link to={`pagination/${limit}/${offset}`}>查询</Link>


            {/* <button onClick={() => {
                setVisible(false);
                setVisible5(true);
                let b=[];
                for (let i = offset; i < (offset+limit); i++) {
                        b.push(list[i]);    
                }setArray2(b);
            }} >获取</button> */}


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
            </table> */}<br></br>
            {error && ("未找到学号为" + id + "的学生成绩")}

            <Outlet />
        </div>
    )
}