import React, { useState } from 'react'
import StudentsJson from '../../../mock/students.json'
import { Link, Outlet, useNavigate } from 'react-router-dom'

export default () => {
    const [visibleLink, setVisibleLink] = useState()
    const navigate = useNavigate()

    const [id, setId] = useState()
    const [name, setName] = useState()
    const [gender, setGender] = useState(0)
    const [grade, setGrade] = useState()
    const [score, setScore] = useState()

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
                const nextId = parseInt(e.target.value);
                setId(nextId);
                setVisibleLink(StudentsJson.find(students => students.id === nextId));
            }} />

            {visibleLink && (<span>
                <Link to={`id/${id}`}>查询</Link>
            </span>)}


            <h4>分页查询</h4>
            limit：<input type="number" onChange={(e) => setLimit(parseInt(e.target.value))} />
            offset：<input type="number" onChange={(e) => setOffset(parseInt(e.target.value))} />
            <button onClick={() => {
                navigate(`/students/pagination/${limit}/${offset}`)
            }} >点击查看</button>

            <form>
                <h2>创建</h2>
                <p>
                    姓名:
                    <input onChange={(e) => setName(e.target.value)} />
                </p>
                <div>
                    性别:
                    女 <input name="gender" type="radio" checked onClick={() => setGender(0)} />
                    男 <input name="gender" type="radio" onClick={() => setGender(1)} />
                </div>
                <p>
                    年级:
                    <select onChange={(e) => setGrade(parseInt(e.target.value))}>
                        <option disabled selected value>--请选择--</option>
                        <option value="1">一年级</option>
                        <option value="2">二年级</option>
                        <option value="3">三年级</option>
                        <option value="4">四年级</option>
                    </select>
                </p>
                <p>
                    分数:
                    <input onChange={(e) => setScore(parseInt(e.target.value))} />
                </p>

                <button onClick={() => {
                    navigate(`/students/insert/${name}/${gender}/${grade}/${score}`)
                }} disabled={!name || !grade || !score} >提交</button>

                <input type="reset" value="重置" />
            </form>

            <Outlet />
        </div>
    )
}