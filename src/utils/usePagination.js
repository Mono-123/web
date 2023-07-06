
import { useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom'

export default () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams)

    const limit = Number.parseInt(query.limit) || 100
    const offset = Number.parseInt(query.offset) || 0
    const order = query.order
    const desc = Number.parseInt(query.desc) || 0

    return {
        limit,
        offset,
        order,
        desc,
        goPage:(jump)=>{
            setSearchParams({
                ...query,
                limit,
                offset:(jump-1)*10,
            })
        },
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
        goPreviousPage : () => {
            setSearchParams({
                ...query,
                limit,
                offset:Math.max((offset - limit),0),
            })
        },
        page: offset / limit + 1,
    }
}