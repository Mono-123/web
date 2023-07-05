import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Students from '../components/detail'
import StudentAPI from '../../../service/student'
// import './style.css'
import { GENDERS, GRADES } from '../components/detail'
import { Radio, Select, Form, Input, Button, message } from 'antd';

export default () => {
    const params = useParams()
    const [data, setData] = useState({ ...data, gender: 1 })
    const [insertData, setInsertData] = useState({})
    const [visiable, setVisiable] = useState(false)
    // const [students, setStudents] = useState()
    // const [id, setId] = useState()
    // const [errorMessage, setErrorMessage] = useState('')
    // const url = '/api/student'

    // const name = params.name
    // const gender = params.gender
    // const grade = params.grade
    // const score = params.score
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
        messageApi.open({
            type: 'success',
            content: '更新成功',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: '更新失败',
        });
    };


    const handleSubmit = () => {
        StudentAPI.insert(data)
            .then(data => {
                setInsertData(data);
                setVisiable(true);
                success()
            })
            .catch(error => error())
    }

    return (
        <div className="student-table" style={{ overflow: 'auto' }}>
            <h2>insert</h2>

            <p>
                <Link to='/student'>返回列表</Link>
            </p>

            <Form>
                <div>
                    <Form.Item label="姓名" style={{ width: '25%' }}>
                        <Input name="name" onChange={e => setData({ ...data, name: e.target.value })} /><br />
                    </Form.Item>

                    {/* <label for="grade">年级</label><br />
                    <select name="grade" onChange={e => setData({ ...data, grade: Number.parseInt(e.target.value) })}>
                        <option disabled selected value>--请选择--</option>
                        {GRADES.map((grade, idx) => idx !== 0 && (
                            <option key={grade} value={idx - 1}>{grade}</option>
                        ))}
                    </select><br /> */}

                    <Form.Item label="性别" >
                        <Radio.Group name="gender" defaultValue={"1"} onChange={e => setData({ ...data, gender: e.target.value })}>
                            <Radio.Button value="1" >男</Radio.Button>
                            <Radio.Button value="0" >女</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="年级" style={{ width: '25%' }}>
                        <Select name="grade" placeholder="Select grade" onChange={value => setData({ ...data, grade: value })}>
                            <Option value="0" >一年级</Option>
                            <Option value="1" >二年级</Option>
                            <Option value="2" >三年级</Option>
                            <Option value="3" >四年级</Option>
                            <Option value="4" >五年级</Option>
                            <Option value="5" >六年级</Option>
                        </Select>
                    </Form.Item>

                    {/* <label for="gender">性别</label><br />
                    {GENDERS.map((gender, idx) => (
                        <span key={gender}><input type="radio" name="gender" defaultChecked={idx === 0} onClick={() => setData({ ...data, gender: idx })} /> {gender}</span>
                    ))}
                    <br /> */}

                    <Form.Item label="分数" style={{ width: '25%' }}>
                        <Input type="number" name="score" onChange={e => setData({ ...data, score: Number.parseInt(e.target.value) })} /><br />
                    </Form.Item>

                    <Button type="reset">清空</Button>
                    <Button onClick={() => {
                        if (!data.name) message.warning('请输入学生姓名', 2.5);
                        else if (!data.grade) message.warning('请输入学生年级', 2.5);
                        else if (!data.score) message.warning('请输入学生分数', 2.5);
                        else handleSubmit();
                    }}>提交</Button>
                </div>
            </Form>
            {visiable && <div>
                <p>创建了ID为{insertData.id}的学生成绩信息</p>
                <Students {...insertData} /></div>}
        </div>
    )

}