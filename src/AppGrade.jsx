import React, { useState } from 'react'
import GradeJson from '../mock/grade.json'
import Grade from './components/Grade'

export default () => {
    const list = GradeJson.map(grade => (
        <Grade key={grade.id} id={grade.id} grade={grade.grade} managerId={grade.managerId} isGraduated={grade.isGraduated} />
    ))


    return (
        <div>
        <h1>Grade</h1>

        <table>
        <thead>
            <tr>
                <th>Id</th>
                <th>年级</th>
                <th>班主任编号</th>
                <th>毕业情况</th>
                <th>修改</th>
            </tr>
        </thead>
        <tbody id="table">
        {list}
        </tbody>
    </table>

    </div>
    )
}