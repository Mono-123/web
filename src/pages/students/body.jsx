import React, { useState } from 'react'
import { Link, Outlet, useNavigate,useParams } from 'react-router-dom'

export default () => {
    // const [visibleLink, setVisibleLink] = useState()
    const navigate = useNavigate()
    const params = useParams()

    const [id, setId] = useState()

    const [limit, setLimit] = useState(10)
    const [offset, setOffset] = useState(0)

    const [name, setName] = useState()
    const [gender, setGender] = useState(0)
    const [grade, setGrade] = useState()
    const [score, setScore] = useState()

    const [updateId, setUpdateId] = useState()
    const [updateName, setUpdateName] = useState()
    const [updateGender, setUpdateGender] = useState(0)
    const [updateGrade, setUpdateGrade] = useState()
    const [updateScore, setUpdateScore] = useState()

    const [deleteId, setDeleteId] = useState()

    // if (typeof (updateId) != undefined && typeof (updateName) != undefined && typeof (updateGender) != undefined && typeof (updateGrade) != undefined && typeof (updateScore) != undefined) {
    //     setUpdateId(params.updateId)
    //     setUpdateName(params.updateName)
    //     setUpdateGender(params.updateGender)
    //     setUpdateGrade (params.updateGrade)
    //     setUpdateScore (params.updateScore)
    // }

    return (
        <div>
            <p>
                <Link to={`/`}>返回主页</Link>
            </p>

            <h2>students</h2>

            <h4>按id查询</h4>
            请输入需要查找的id:
            <input value={id} onChange={(e) => setId(e.target.value)}></input>
            <button onClick={() => {
                if (!id) return
                navigate(`/students/id/${id}`)
            }} disabled={!id}>查询</button>
            {/* <input type="number" onChange={(e) => {
                const nextId = parseInt(e.target.value);
                setId(nextId);
                setVisibleLink(StudentsJson.find(students => students.id === nextId));
            }} />

            {visibleLink && (<span>
                <Link to={`id/${id}`}>查询</Link>
            </span>)} */}


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

            <form>
                <h2>更新</h2>
                <p>
                    ID:
                    <input name="Id" onChange={(e) => setUpdateId(parseInt(e.target.value))} />
                </p>
                <p>
                    姓名:
                    <input onChange={(e) => setUpdateName(e.target.value)} />
                </p>
                <div>
                    性别:
                    女 <input name="gender" type="radio" checked onClick={() => setUpdateGender(0)} />
                    男 <input name="gender" type="radio" onClick={() => setUpdateGender(1)} />
                </div>
                <p>
                    年级:
                    <select onChange={(e) => setUpdateGrade(parseInt(e.target.value))}>
                        <option disabled selected value>--请选择--</option>
                        <option value="1">一年级</option>
                        <option value="2">二年级</option>
                        <option value="3">三年级</option>
                        <option value="4">四年级</option>
                    </select>
                </p>
                <p>
                    分数:
                    <input onChange={(e) => setUpdateScore(parseInt(e.target.value))} />
                </p>

                <button onClick={() => {
                    navigate(`/students/update/${updateId}/${updateName}/${updateGender}/${updateGrade}/${updateScore}/`)
                }} disabled={!updateId || !updateName || !updateGrade || !updateScore} >提交</button>

                <input type="reset" value="重置" />
            </form>

            <h4>按id删除</h4>
            请输入需要删除的学生id:
            <input value={id} onChange={(e) => setDeleteId(e.target.value)}></input>
            <button onClick={() => {
                if (!deleteId) return
                navigate(`/students/delete/${deleteId}`)
            }} disabled={!deleteId}>删除</button>

            <Outlet />
        </div>
    )
}