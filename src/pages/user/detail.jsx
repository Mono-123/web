import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import User from '../../components/User'
import UserJson from '../../../mock/users.json'

export default () => {
    const params = useParams()

    if (!params.id) return null;

    const user = UserJson.users.find(u => u.id.toString() === params.id)

    if (!user) return (
        <div>Not found</div>
    )
    return (
        <div>
            <h2>Detail of {params.id}</h2>
            <User username={user.username} email={user.email} phone={user.phone} />
        </div>  
    )
}