import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import GradeJson from '../../../mock/grade.json'
import Grade from '../../components/Grade'

export default () => {
    const params = useParams()
    // let id = parseInt(params.id)

    // const [visible, setVisible] = useState(false)
    // const [visible2, setVisible2] = useState(false)
    let visible=false;
    let visible2=false;

    let list = GradeJson.map(grade => (
        <Grade key={grade.id} id={grade.id} grade={grade.grade} managerId={grade.managerId} isGraduated={grade.isGraduated} />
    ))

    let i;
    for (i = 0; i < (list.length - 1); i++) {
        if (list[i].id == params.id) {
            break;
        }
    }

    let list2 = []
    
    if (i == list.length - 1) {
        visible=false;
        visible2=true;
    } else {
        visible2=false;
        visible=true;
        const grade = GradeJson.find(u => u.id.toString() === params.id);
        list2 = <Grade key={grade.id} id={grade.id} grade={grade.grade} managerId={grade.managerId} isGraduated={grade.isGraduated} />
    }

    return (
        <div>
            <h4>学号为{params.id}的学生的个人信息</h4>
            {visible && (
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
                </span>)
            }
            {visible2&&"未找到id为" +params.id+ "的年级信息"}
        </div>
    )
}