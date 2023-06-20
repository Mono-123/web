export default function Score (record) {
    return (
        <tr>
           <td>{record.id}</td> 
           <td>{record.studentId}</td> 
           <td>{record.chinese}</td> 
           <td>{record.math}</td> 
           <td>{record.english}</td> 
        </tr>
    )
}