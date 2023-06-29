import { useNavigate } from 'react-router-dom'

export default function Score (record) {
    const navigate = useNavigate()

    return (
        <tr>
           <td>{record.id}</td> 
           <td>{record.studentId}</td> 
           <td>{record.chinese}</td> 
           <td>{record.math}</td> 
           <td>{record.english}</td> 
           <td>
                <button onClick={() => {
                    navigate(`/score/delete/${record.id}`)
                }}>删除</button>
                <button onClick={() => {
                    navigate(`/score/updateId/${record.id}/${record.studentId}/${record.chinese}/${record.math}/${record.english}`)
                }}>更新</button>

            </td>
        </tr>
    )
}