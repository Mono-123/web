import React, { useState } from 'react'
import UserJson from '../mock/users.json'
import User from './components/User'
import  Classes from './components/Classes'


export default () => {
    console.log(UserJson)

    const list = UserJson.users.map(user => (
        <User key={user.id} username={user.username} email={user.email} phone={user.phone} />
    ))


    const list2 = ClassesJson.map(classes =>(
        <Classes key={classes.id} id={classes.id} name={classes.name} managerId={classes.managerId} gradeId={classes.gradeId} />
    ))


    const [visible, setVisible] = useState(false)
    const [input, setInput] = useState('')


    return (
        <div>
            <h1>React App</h1>

            <div>
                <p>请输入：<input value={input} onChange={(e) => setInput(e.target.value)}></input></p>
                <p>你输入的是：{input}</p>
            </div>

            <input type='checkbox' onChange={(e) => setVisible(e.target.checked)} checked={visible}></input>显示列表
            <ul>
                {visible && list}
            </ul>

            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>班级名</th>
                        <th>班主任ID</th>
                        <th>年级</th>
                    </tr>
                </thead>
                <tbody id="table">
                   {list2}
                </tbody>
            </table>
        </div>

    )
}