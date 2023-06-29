import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default () => {

    const params = useParams()
    const navigate = useNavigate()

    const [updateName, setUpdateName] = useState()
    const [updateGender, setUpdateGender] = useState(0)
    const [updateGrade, setUpdateGrade] = useState()
    const [updateScore, setUpdateScore] = useState()

    return (
        <div>
            <form >
                <p>
                    需要更新的学生ID:
                    <input name="id" readonly="true" placeholder={params.id} />
                </p>
                <p>
                    姓名:
                    <input placeholder={params.name} onChange={(e) => setUpdateName(e.target.value)} />
                </p>
                <div>
                    性别:
                    女 <input  name="gender" type="radio"  onClick={() => setUpdateGender(0)} />
                    男 <input  name="gender" type="radio"  onClick={() => setUpdateGender(1)} />
                </div>
                <p>
                    年级:
                    <select placeholder={params.grade} onChange={(e) => setUpdateGrade(parseInt(e.target.value))}>
                        <option disabled selected value>--请选择--</option>
                        <option value="1">一年级</option>
                        <option value="2">二年级</option>
                        <option value="3">三年级</option>
                        <option value="4">四年级</option>
                    </select>
                </p>
                <p>
                    分数:
                    <input placeholder={params.score} onChange={(e) => setUpdateScore(parseInt(e.target.value))} />
                </p>

                <button onClick={() => {
                    navigate(`/students/update/${updateId}/${updateName}/${updateGender}/${updateGrade}/${updateScore}/`)
                }} disabled={ !updateName || !updateGrade || !updateScore} >提交</button>

                <input type="reset" value="重置" />
            </form>

        </div>
    )

}