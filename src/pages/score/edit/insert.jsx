import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Score from '../components/detail'
import ScoreAPI from '../../../service/score'
import { InputNumber, message, Form } from 'antd'
import { UserOutlined, FunctionOutlined, HighlightOutlined, FontColorsOutlined } from '@ant-design/icons'

// import './style.css'

export default () => {
    const params = useParams()
    const [data, setData] = useState({})
    const [visiable, setVisiable] = useState(false)
    const [messageApi, contextHolder] = message.useMessage();

    const onchange = (record, value) => {
        if (record === 'studentId') setData({ ...data, studentId: value });
        else if (record === 'chinese') setData({ ...data, chinese: value });
        else if (record === 'math') setData({ ...data, math: value });
        else if (record === 'english') setData({ ...data, english: value });
    }

    // const onchange = (record, value) => {
    //     setData({ ...data, record:value});
    // }

    const success = () => {
        messageApi.open({
            type: 'success',
            content: '新建成功',
        });
    };
    const error = () => {
        messageApi.open({
            type: 'error',
            content: '新建失败',
        });
    };

    const handleSubmit = () => {
        ScoreAPI.insert(data)
            .then(data => {
                setData(data);
                setVisiable(true);
                success()
            })
            .catch(() => error())
    }

    return (
        <div className="student-table">
            <h2>insert</h2>

            {contextHolder}
            <p>
                <Link to='/score'>返回列表</Link>
            </p>

            <Form style={{ width: '25%' }} placeholder="default size">
                <div>
                    <Form.Item label="学生学号">
                        <InputNumber prefix={<UserOutlined />} onChange={(e)=>onchange('studentId',e)} /><br />
                    </Form.Item>

                    <Form.Item label="语文成绩">
                        <InputNumber addonAfter={"分"} prefix={<HighlightOutlined />} onChange={(e)=>onchange('chinese',e)} /><br />
                    </Form.Item>

                    <Form.Item label="数学成绩">
                        <InputNumber addonAfter={"分"} prefix={<FunctionOutlined />} onChange={(e)=>onchange('math',e)} /><br />
                    </Form.Item>

                    <Form.Item label="英语成绩">
                        <InputNumber addonAfter={"分"} prefix={<FontColorsOutlined />} onChange={(e)=>onchange('english',e)} /><br />
                    </Form.Item>

                    <button type="reset">清空</button>

                    <button type="button" onClick={() => {
                        if (!data.studentId) message.warning('请输入学生学号', 2.5);
                        else if (!data.chinese) message.warning('请输入学生语文成绩', 2.5);
                        else if (!data.math) message.warning('请输入学生数学成绩', 2.5);
                        else if (!data.english) message.warning('请输入学生英语成绩', 2.5);
                        else handleSubmit();
                    }}>提交</button>
                </div>
            </Form>
            {visiable && <div>
                <p>创建了ID为{data.id}的学生成绩信息</p>
                <Score {...data} /></div>}
        </div>
    )

}