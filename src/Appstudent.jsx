import React, { useState } from 'react'
import StudentJson from '../mock/student.json'
import Student from './components/Student'

export default () => {
    const list = StudentJson.map(student => (
        <Student key={student.id} id={student.id} name={student.name} gender={student.gender} classId={student.classId}/>
    ))

    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [input, setInput] = useState('')
    const [input2, setInput2] = useState('')

    return (
        <div>
            <h1>student</h1>

            <div>
                <p>请输入：<input value={input} onChange={(e) => setInput(e.target.value)}></input></p>
                <p>你输入的是：{input}</p>
            </div>

            <div>
                <p>请输入：<input value={input2} onChange={(e) => setInput2(e.target.value)}></input></p>
                <p onMouseOver={(e) => setVisible2(e.target)}>鼠标滑过将显示你输入的是：{visible2 && input2}</p>
            </div>

            {/* <input type='checkbox' onChange={(e) => setVisible(e.target.checked)} checked={visible}></input>查询学生成绩 */}
            <button onClick={(e) => setVisible(e.target)} >查询学生成绩</button>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>名称</th>
                        <th>性别</th>
                        <th>年级</th>
                    </tr>
                </thead>
                <tbody id="table">
                    {visible && list}
                </tbody>
            </table>

        </div>
    )
}