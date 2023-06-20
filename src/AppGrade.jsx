import React, { useState } from 'react'
import GradeJson from '../mock/grade.json'
import Grade from './components/Grade'

export default () => {
    const list = GradeJson.map(grade => (
        <Grade key={grade.id} id={grade.id} grade={grade.grade} managerId={grade.managerId} isGraduated={grade.isGraduated} />
    ))

    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [input, setInput] = useState('')
    const [input2, setInput2] = useState('')

    return (
        <div>
            <h1>Grade</h1>

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
                        <th>年级</th>
                        <th>班主任编号</th>
                        <th>毕业情况</th>
                    </tr>
                </thead>
                <tbody id="table">
                    {visible && list}
                </tbody>
            </table>

        </div>
    )
}