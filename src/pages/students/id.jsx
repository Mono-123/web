import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import StudentsJson from '../../../mock/students.json'
import Students from '../../components/Students'

export default () => {
    const params = useParams()
    // let id = parseInt(params.id)

    // const [visible, setVisible] = useState(false)
    // const [visible2, setVisible2] = useState(false)
    let visible=false;
    let visible2=false;

    let list = StudentsJson.map(students => (
        <Students key={students.id} id={students.id} name={students.name} gender={students.gender} grade={students.grade} score={students.score} />
    ))

    let i;
    for (i = 0; i < (list.length - 1); i++) {
        if (list[i].id == params.id) {
            break;
        }
    }

    let list2 = []
    
    // if (i == list.length - 1) {
    //     visible=false;
    //     visible2=true;
    // } else {
    //     visible2=false;
    //     visible=true;
        
    // }
    const students = StudentsJson.find(u => u.id.toString() === params.id);
    list2 = <Students key={students.id} id={students.id} name={students.name} gender={students.gender} grade={students.grade} score={students.score} />
    return (
        <div>
            <h4>学号为{params.id}的学生的个人信息</h4>
            {/* {visible && ( */}
                <span
                ><table>
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
                            {list2}
                        </tbody>
                    </table>
                </span>
            {/* } */}
            {/* {visible2&&"未找到学号为" +params.id+ "的学生成绩"} */}
        </div>
    )
}