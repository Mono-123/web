export default function Students (record) {
    const classes = ['一班', '二班', '三班']
    return (
        <tr>
           <td>{record.id}</td> 
           <td>{record.name}</td> 
           <td>{(record.gender ? '男' : '女  ')}</td> 
           <td>{classes[record.classId - 1]}</td> 
        </tr>
    )
}