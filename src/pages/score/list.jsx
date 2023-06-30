import { useEffect, useState } from "react";
import usePagination from "../../utils/usePagination"
import ScoreAPI from '../../service/score'
import Detail from './components/detail'
import Pagination from "../../components/pagination";
import { useNavigate } from 'react-router-dom'

export default () => {
    const { limit, offset } = usePagination();
    const [data, setData] = useState([])
    // const [length, setLength] = useState()
    const navigate = useNavigate();

    useEffect(() => {
        ScoreAPI.list(limit, offset).then(data => {
            setData(data)
        })
    }, [limit, offset])

    // useEffect(() => {
    //     ScoreAPI.listAll().then(length=>{
    //         setLength(length)
    //         console.log(length)
    //     })
    // })

    return (
        <div className="student-table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>学生学号</th>
                        <th>语文成绩</th>
                        <th>数学成绩</th>
                        <th>英语成绩</th>
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
                                    <button onClick={() => navigate(`/score/detail/${d.id}`)}>查看</button>
                                    <button onClick={() => navigate(`/score/edit/${d.id}`)}>编辑</button>
                                    <button onClick={() => {
                                        console.log(d.id);
                                        navigate(`/score/delete/${d.id}?limit=${limit}&offset=${offset}`)}}>删除</button>
                                </div>
                            }
                        />
                    ))}
                </tbody>
            </table>

            <Pagination />
            
            <button onClick={() => navigate(`/score/insert`)}>新建</button>
        </div>
    )
}