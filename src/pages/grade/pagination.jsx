import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Grade from '../../components/Grade'
import GradeJson from '../../../mock/grade.json'

export default () => {
    const params = useParams()

    let limit = parseInt(params.limit)
    let offset = parseInt(params.offset)

    let list = GradeJson.map(grade => (
        <Grade key={grade.id} id={grade.id} grade={grade.grade} managerId={grade.managerId} isGraduated={grade.isGraduated} />
    ))

    let array = [];
    for (let i = offset; i < (offset + limit); i++) {
        array.push(list[i]);
    }

    return (
        <div>

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
                    {array}
                </tbody>
            </table>

        </div>
    )
}