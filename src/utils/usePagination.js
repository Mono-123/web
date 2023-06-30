
import { useParams, useSearchParams } from 'react-router-dom'

export default () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams)

    const limit = Number.parseInt(query.limit) || 10
    const offset = Number.parseInt(query.offset) || 0

    return {
        limit,
        offset,
        goFirstPage: () => {
            setSearchParams({
                ...query,
                limit,
                offset: 0,
            })
        },
        goNextPage: () => {
            setSearchParams({
                ...query,
                limit,
                offset: offset + limit,
            })
        },
        goPage:(page)=>{
            setSearchParams({
                ...query,
                limit,
                offset:(page-1)*10,
            })
        },
        page: offset / limit + 1,
    }
}