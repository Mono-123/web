export default function Score(props) {
    const grades = ['一年级', '二年级', '三年级', '四年级']
    return (
        <div>
            <p>ID: {props.id}</p>
            {(!props.field || props.field === 'name') && <p>姓名: {props.name}</p>}
            {(!props.field || props.field === 'gender') && <p>性别: {(props.gender ? '男' : '女  ')}</p>}
            {(!props.field || props.field === 'grade') && <p>年级: {grades[props.grade - 1]}</p>}
            {(!props.field || props.field === 'score') && <p>分数: {props.score}</p>}
        </div>
    )
}