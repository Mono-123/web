export default function Score (props) {
    return (
        <div>
            <p>ID: {props.id}</p>
            {(!props.field || props.field === 'studentId') && <p>学生学号: {props.studentId}</p>}
            {(!props.field || props.field === 'chinese') && <p>语文成绩: {props.chinese}</p>}
            {(!props.field || props.field === 'math') && <p>数学成绩: {props.math}</p>}
            {(!props.field || props.field === 'english') && <p>英语成绩: {props.english}</p>}
        </div>
    )
}