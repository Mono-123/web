const GENDERS = [
    "男", "女"
]

const GRADES = [
    "一", "二", "三", "四", "五", "六"
]

export default (props) => {
    return (
        <div>
            <p>ID: {props.id}</p>
            {(!props.field || props.field === 'name') && <p>姓名: {props.name}</p>}
            {(!props.field || props.field === 'grade') && <p>年级: {GRADES[props.grade]}</p>}
            {(!props.field || props.field === 'gender') && <p>性别: {GENDERS[props.gender]}</p>}
            {(!props.field || props.field === 'score') && <p>分数: {props.score}</p>}
        </div>
    )
}