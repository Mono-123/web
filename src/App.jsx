import { Link } from "react-router-dom"

export default () => {
    return (
        <div>
            <h1>HomePage</h1>

            <Link to={'/student'}>Student</Link>
        </div>
    )
}