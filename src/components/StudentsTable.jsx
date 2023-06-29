export default function Students (record) {
    const grades = ['一年级', '二年级', '三年级', '四年级']
    return (
        <tr>
           <td>{record.id}</td> 
           <td>{record.name}</td> 
           <td>{(record.gender ? '男' : '女  ')}</td> 
           <td>{grades[record.grade - 1]}</td> 
           <td>{record.score}</td> 
        </tr>
    )
}