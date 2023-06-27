export default function Classes (record) {
    const classes2 = ['一班', '二班', '三班']
    const grade = ['一年级', '二年级', '三年级', '四年级']
    return (
        <tr>
           <td>{record.id}</td> 
           <td>{classes2[record.name - 1]}</td> 
           <td>{record.managerId}</td> 
           <td>{grade[record.gradeId - 1]}</td> 
        </tr>
    )
}
