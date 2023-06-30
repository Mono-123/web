import './style.css'

export const GENDERS = [
   "女", "男" 
]

export const GRADES = [
    '', "一", "二", "三", "四", "五", "六"
]

export default (props) => {
    if (props.type === 'table') {
        return (
            <tr>
                <td>{props.id}</td>
                <td>{props.name}</td>
                <td>{GRADES[props.grade + 1]}</td>
                <td>{GENDERS[props.gender]}</td>
                <td>{props.score}</td>
                <td>{props.action}</td>
            </tr>
        )
    }
    return (
        <div>
            <p>ID: {props.id}</p>
            {(!props.field || props.field === 'name') && <p>姓名: {props.name}</p>}
            {(!props.field || props.field === 'grade') && <p>年级: {GRADES[props.grade + 1]}</p>}
            {(!props.field || props.field === 'gender') && <p>性别: {GENDERS[props.gender]}</p>}
            {(!props.field || props.field === 'score') && <p>分数: {props.score}</p>}
        </div>
    )
}