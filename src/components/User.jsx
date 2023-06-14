export default (props) => {
    return (
        <li>
            用户名：{props.username}<br />
            邮箱：{props.email}<br />
            手机号：{props.phone}
        </li>
    )
}