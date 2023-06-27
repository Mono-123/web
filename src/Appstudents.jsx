import React, { useState } from 'react'
import StudentsJson from '../mock/students.json'
import Students from './components/Students'

export default () => {
    let list = StudentsJson.map(students => (
        <Students key={students.id} id={students.id} name={students.name} gender={students.gender} grade={students.grade} score={students.score} />
    ))

    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [visible4, setVisible4] = useState(false)
    const [visible5, setVisible5] = useState(false)

    const [input, setInput] = useState('')
    const [input2, setInput2] = useState('')
    const [input3, setInput3] = useState('')

    const [a, setA] = useState()
    const [array, setArray] = useState([])
    const [array2, setArray2] = useState([])
    
    const [limit, setLimit] = useState(0)
    const [offset, setOffset] = useState(5)

    return (
        <div>
            <h1>students</h1>

            <div>
                <p>请输入：<input value={input} onChange={(e) => setInput(e.target.value)}></input></p>
                <p>你输入的是：{input}</p>
            </div>

            <div>
                <p>请输入：<input value={input2} onChange={(e) => setInput2(e.target.value)}></input></p>
                <p onMouseOver={(e) => setVisible2(e.target)}>鼠标滑过此处一次将显示你的输入是：{visible2 && input2}</p>
            </div>

            <div>
                <p>请输入：<input value={input3} onChange={(e) => setInput3(e.target.value)}></input></p>
                <p onMouseOver={(e) => setVisible4(e.target)} onMouseOut={(e) => setVisible4(false)} >鼠标放于在此处将显示你的输入是：{visible4 && input3}</p>
            </div>

            {/* <input type='checkbox' onChange={(e) => setVisible(e.target.checked)} checked={visible}></input>查询学生成绩 */}
            <button onClick={(e) => {
                setVisible(e.target);
                setVisible3(false);
                setVisible5(false);
            }} >查询学生成绩</button>

            <h4>按id查询</h4>
            请输入需要查找的id: <input type="number" onChange={(e) => setA(e.target.value)} />
            <button onClick={(e) => {
                setVisible(false);
                setVisible5(false);
                setVisible3(e.target);
                let Array = StudentsJson;
                for (let i = 0; i < Array.length - 1; i++) {
                    if (Array[i].id == a) {
                        setArray(list[i]);
                        break;
                    } else {
                        setArray("not found")
                    }
                }
            }} >查询</button>

            <h4>分页查询</h4>
            limit：<input type="number" onChange={(e) => setLimit(e.target.value)} />
            offset：<input type="number" onChange={(e) => setOffset(e.target.value)} />
            <button onClick={(e) => {
                setVisible(false);
                setVisible5(e.target);
                for (let i = limit; i < offset; i++) {
                        setArray2(list[i]);     
                }
            }} >获取</button>

            <table>
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
            </table>

        </div>
    )
}