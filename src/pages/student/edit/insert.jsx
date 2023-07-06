import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Students from '../components/detail'
import StudentAPI from '../../../service/student'
// import './style.css'
import { GENDERS, GRADES } from '../components/detail'
import { Radio, Select, Form, Input, Button, message, InputNumber } from 'antd';

export default () => {
    const params = useParams()
    const [data, setData] = useState({ ...data, gender: 1 })
    const [insertData, setInsertData] = useState({})
    const [visiable, setVisiable] = useState(false)

    const onchange = (record, e) => {
        if (record === 'name') setData({ ...data, studentId: Number.parseInt(e.target.value) });
        if (record === 'gender') setData({ ...data, chinese: Number.parseInt(e.target.value) });
        if (record === 'grade') setData({ ...data, math: e });
        if (record === 'score') setData({ ...data, english: e });
    }

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
            .catch(() => error())
    }

    return (
        <div className="student-table" style={{ overflow: 'auto' }}>
            <h2>insert</h2>
            {contextHolder}

            <p>
                <Link to='/student'>返回列表</Link>
            </p>

            <Form style={{ width:'25%'}}>
                <div>
                    <Form.Item label="姓名" >
                        <Input name="name" onChange={e => onchange('name',e)} /><br />
                    </Form.Item>

                    <Form.Item label="性别" >
                        <Radio.Group name="gender" defaultValue={"1"} onChange={e => onchange('gender',e)}>
                            <Radio.Button value="1" >男</Radio.Button>
                            <Radio.Button value="0" >女</Radio.Button>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="年级" >
                        <Select name="grade" placeholder="Select grade" onChange={value => onchange('grade',value)}>
                            <Option value="0" >一年级</Option>
                            <Option value="1" >二年级</Option>
                            <Option value="2" >三年级</Option>
                            <Option value="3" >四年级</Option>
                            <Option value="4" >五年级</Option>
                            <Option value="5" >六年级</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="分数" >
                        <InputNumber name="score" onChange={value => onchange('name',value)} /><br />
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