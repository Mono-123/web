import React, { useState } from 'react'
import UserJson from '../mock/users.json'
import User from './components/User'

export default () => {
    console.log(UserJson)

    const list = UserJson.users.map(user => (
        <User key={user.id} username={user.username} email={user.email} phone={user.phone} />
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
        </div>
    )
}