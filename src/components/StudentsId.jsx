export default (record) => {
    const grades = ['一年级', '二年级', '三年级', '四年级']
    return (
        <p>
            姓名：{record.name}<br />
            性别：{(record.gender ? '男' : '女  ')}<br />
            年级：{grades[record.grade - 1]}<br />
            分数：{record.score}
        </p>
    )
}