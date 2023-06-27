import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import StudentsJson from '../../../mock/students.json'
import Students from '../../components/Students'

export default () => {
    const params = useParams()

    let list = StudentsJson.map(students => (
        <Students key={students.id} id={students.id} name={students.name} gender={students.gender} grade={students.grade} score={students.score} />
    ))
    let i = 0;
    for (; i < list.length - 1; i++) {
        if (list[i].id == params.id) {
            break;
        }
    }
    let list2=[] 

    if (!params.id || i == list.length - 1) {
        list2 = "not found"
    }
    const students = StudentsJson.find(u => u.id.toString() === params.id);
    list2 = <Students key={students.id} id={students.id} name={students.name} gender={students.gender} grade={students.grade} score={students.score} />

    return (
        <div>
            <h4>学号为{params.id}的学生的个人信息</h4>

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
                    {params.id && list2}
                </tbody>
            </table>

        </div>
    )
}