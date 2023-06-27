export default (record) => {
    return (
        <p>
            {/* 学生学号：{record.studentId}<br /> */}
            语文成绩：{record.chinese}<br />
            数学成绩：{record.math}<br />
            英语成绩：{record.english}
        </p>
    )
}