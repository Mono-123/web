import React, { useState } from 'react'
import ScoreJson from '../mock/Score.json'
import Score from './components/score'

export default () => {
    const list = ScoreJson.map(score => (
        <Score key={score.id} id={score.id} studentId={score.studentId} chinese={score.chinese} math={score.math} english={score.english} />
    ))
    let getbyid = ScoreJson.find(score => score.id == 1);
    const list2 = <Score key={1} id={1} studentId={getbyid.studentId} chinese={getbyid.chinese} math={getbyid.math} english={getbyid.english} />
    
    const [visible, setVisible] = useState(false)
    const [visible2, setVisible2] = useState(false)
    const [visible3, setVisible3] = useState(false)
    const [visible4, setVisible4] = useState(false)
    const [input, setInput] = useState('')
    const [input2, setInput2] = useState('')
    const [input3, setInput3] = useState('')
    const [array, setArray] = useState([])
    const [a, setA] = useState()

    function getById(id) {
        let Array = ScoreJson;
        for (let i = 0; i < Array.length - 1; i++) {
            if (Array[i].id == id) {
                return (Array[i]);
            }
        }
    }
    const list3 = getById(1);

    // a.addEventListener("click",
    //     function getById(id) {
    //         let Array = ScoreJson;
    //         for (let i = 0; i < Array.length - 1; i++) {
    //             if (Array[i].id == id) {
    //                 return (Array[i]);
    //             }
    //         }
    //     }
    // );

    return (
        <div>
            <h1>score</h1>

            <div>
                <p>请输入：<input value={input} onChange={(e) => setInput(e.target.value)}></input></p>
                <p>你输入的是：{input}</p>
            </div>

            <div>
                <p>请输入：<input value={input2} onChange={(e) => setInput2(e.target.value)}></input></p>
                <p onMouseOver={(e)=>setVisible2(e.target)} onMouseOut={(e)=>setVisible2(false)} >鼠标放在此处将显示你输入的是：{ visible2 &&input2 }</p>
            </div>

            <div>
                <p>请输入：<input value={input3} onChange={(e) => setInput3(e.target.value)}></input></p>
                <p onMouseOver={(e) => setVisible3(e.target)}>鼠标滑过将显示你输入的是：{visible3 && input2}</p>
            </div>

            {/* <input type='checkbox' onChange={(e) => setVisible(e.target.checked)} checked={visible}></input>查询学生成绩 */}
            <button onClick={(e) => setVisible(e.target)} >查询学生成绩</button>

            <h4>按id查询</h4>
            请输入需要查找的id: <input type="number" onChange={(e) => setA(e.target.value)} />
            <button onClick={(e) => {
                setVisible(false);
                setVisible3(e.target);
                let getbyid = ScoreJson.find(score => score.id == a);
                const list2 = <Score key={a} id={a} studentId={getbyid.studentId} chinese={getbyid.chinese} math={getbyid.math} english={getbyid.english} />
                setArray(list2);
            }} >查询</button>


            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>学生学号</th>
                        <th>语文成绩</th>
                        <th>数学成绩</th>
                        <th>英语成绩</th>
                    </tr>
                </thead>
                <tbody id="table">
                    {visible && list}
                    {array}
                    {list2}
                    {[list3]}
                    {a}
                </tbody>
            </table>

        </div>
    )
}