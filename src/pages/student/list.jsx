import { useEffect, useState } from "react";
import usePagination from "../../utils/usePagination"
import StudentAPI from '../../service/student'
import Detail from './components/detail'
import Pagination from "../../components/pagination";
import { useNavigate } from 'react-router-dom'

export default () => {
    const { limit, offset } = usePagination();
    const [data, setData] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        StudentAPI.list(limit, offset).then(data => {
            setData(data)
        })
    }, [limit, offset])

    return (
        <div className="student-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>姓名</th>
                        <th>年级</th>
                        <th>性别</th>
                        <th>分数</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(d => (
                        <Detail {...d}
                            key={d.id}
                            type="table"
                            action={
                                <div>
                                    <button onClick={() => navigate(`/student/detail/${d.id}`)}>查看</button>
                                    <button onClick={() => navigate(`/student/edit/${d.id}`)}>编辑</button>
                                </div>
                            }
                        />
                    ))}
                </tbody>
            </table>

            <Pagination />
        </div>
    )
}