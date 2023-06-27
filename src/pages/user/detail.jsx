import React, { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import User from '../../components/User'
import UserJson from '../../../mock/users.json'

export default () => {
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const query = Object.fromEntries(searchParams)

    if (!params.id) return null;
    const user = UserJson.users.find(u => u.id.toString() === params.id)

    if (!user) return (
        <div>Not found</div>
    )
    return (
        <div>
            <h2>Detail of {params.id}</h2>
            <p>
                请选择要查看的信息：
                <select value={query.tab} onChange={
                    (e) => setSearchParams({
                        ...query,
                        tab: e.target.value
                    })
                }>
                    <option disabled selected value> -- select an option -- </option>
                    <option>username</option>
                    <option>email</option>
                    <option>phone</option>
                </select>
            </p>
             <User username={user.username} email={user.email} phone={user.phone} />
            {query.tab === 'username' && user.username}
            {query.tab === 'email' && user.email}
            {query.tab === 'phone' && user.phone}
        </div>
    )
}