export default function Grade (record) {
    return (
        <tr>
           <td>{record.id}</td> 
           <td>{record.name}</td> 
           <td>{(record.gender ? '男' : '女  ')}</td> 
        </tr>
    )
}
