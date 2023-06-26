import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default () => {
    const params = useParams()
    return (
        <div>
            <h2>Test</h2>

            a: {params.a} <br />
            b: {params.b}
        </div>  
    )
}