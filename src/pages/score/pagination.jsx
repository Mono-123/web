import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Score from '../../components/score'
import ScoreJson from '../../../mock/Score.json'

export default () => {
    const params = useParams()

    let limit = parseInt(params.limit)
    let offset = parseInt(params.offset)

    let list = ScoreJson.map(score => (
        <Score key={score.id} id={score.id} studentId={score.studentId} chinese={score.chinese} math={score.math} english={score.english} />
    ))

    let array = [];
    for (let i = offset; i < (offset + limit); i++) {
        array.push(list[i]);
    }

    return (
        <div>
            
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>名称</th>
                        <th>性别</th>
                        <th>年级</th>
                        <th>分数</th>
                    </tr>
                </thead>
                <tbody id="table">
                    {array}
                </tbody>
            </table>

        </div>
    )
}