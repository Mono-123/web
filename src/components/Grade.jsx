export default function Grade (record) {
    const grades = ['一年级', '二年级', '三年级', '四年级']
    return (
        <tr>
           <td>{record.id}</td> 
           <td>{grades[record.grade - 1]}</td> 
           <td>{record.managerId}</td> 
           <td>{(record.isGraduated ? '毕业' : '未毕业')}</td> 
        </tr>
    )
}
