import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Students from '../../components/Students'
import StudentsJson from '../../../mock/students.json'

export default () => {
    const params = useParams()

    let limit = parseInt(params.limit)
    let offset = parseInt(params.offset)

    let list = StudentsJson.map(students => (
        <Students key={students.id} id={students.id} name={students.name} gender={students.gender} grade={students.grade} score={students.score} />
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
                        <th>名称</th>
                        <th>性别</th>
                        <th>年级</th>
                        <th>分数</th>
                    </tr>
                </thead>
                <tbody id="table">
                    {array}
                </tbody>
            </table>

        </div>
    )
}