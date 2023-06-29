import { useNavigate } from 'react-router-dom'
export default function Students(record) {

    const grades = ['一年级', '二年级', '三年级', '四年级']
    const navigate = useNavigate()

    return (
        <tr>
            <td>{record.id}</td>
            <td>{record.name}</td>
            <td>{(record.gender ? '男' : '女  ')}</td>
            <td>{grades[record.grade - 1]}</td>
            <td>{record.score}</td>
            <td>
                <button onClick={() => {
                    navigate(`/students/delete/${record.id}`)
                }}>删除</button>
                <button onClick={() => {
                    navigate(`/students/${record.id}/${record.name}/${record.gender}/${record.grade}/${record.score}`)
                }}>更新</button>

            </td>
        </tr>
    )
}