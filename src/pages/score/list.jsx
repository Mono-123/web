import { useEffect, useRef, useState } from "react";
import usePagination from "../../utils/usePagination"
import ScoreAPI from '../../service/score'
import Detail from './components/detail'
import pagiNation from "../../components/pagination";
import { useNavigate } from 'react-router-dom'
import { Table, Pagination, Button, Form, message,InputNumber } from 'antd';
import useFormInstance from "antd/es/form/hooks/useFormInstance";

export default () => {
  const GENDERS = ["男", "女"]
  const { limit, offset } = usePagination();
  const [data, setData] = useState([])
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [order, setOrder] = useState()
  const [desc, setDesc] = useState(0)
  // const formRef = useRef<useFormInstance>();
  // const values = await form.validateFields()

  const columns = [
    {
      name: 'id',
      title: 'id',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
      },
    },
    {
      title: 'StudentId',
      dataIndex: 'studentId',
    },
    {
      title: 'Chinese Score',
      dataIndex: 'chinese',
      value: GENDERS[data.gender],
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Math Score',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: 'English Score',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
      render: (a, b) => {
          console.log(b.english)
          return b.english
      }
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (col,row ) =>
        <div>
          <Button type="primary" ghost onClick={() => {
            navigate(`/score/detail/${(Number.parseInt(row.id))}`)
          }
          }>查看</Button>
          <Button onClick={() => navigate(`/score/edit/${row.id}`)}>编辑</Button>
          <Button type="dashed" danger onClick={() => { navigate(`/score/delete/${row.id}?limit=${limit}&offset=${offset}`) }}>删除</Button></div>
    },

  ];

  useEffect(() => {
    ScoreAPI.list(order, desc,limit, offset).then(data => {
      data.map(data => (
        { ...data },
        data.key = data.id));
      setData(data);
      
      console.log(data, data[1].key);
    })
  }, [limit, offset, order, desc])

  return (
    <div >
      
      {contextHolder}

      <Button onClick={() => navigate(`/SCORE/insert`)}>新建学生分数信息</Button><br/>

      <Button onClick={() => {
       if (desc === 0&&order==='id') setDesc(1)
       else if(desc===1||order==='id') setDesc(0)
       setOrder('id'); 
       }}>按ID排序</Button>

      <Button onClick={() => {
        if (desc === 0&&order==='chinese') setDesc(1)
        else if(desc===1||order==='chinese') setDesc(0)
        setOrder('chinese'); 
        }}>按语文成绩排序</Button>

         <Button onClick={() => {
        if (desc === 0&&order==='math') setDesc(1)
        else if(desc===1||order!=='math') setDesc(0)
        setOrder('math'); 
        }}>按数学成绩排序</Button>

        <Button onClick={() => {
       if (desc === 0&&order==='english') setDesc(1)
       else if(desc===1||order==='english') setDesc(0)
       setOrder('english'); 
       }}>按英语成绩排序</Button><br/>


      请输入需要查找的学生ID
      <InputNumber onChange={e => setId(e)}/>
      <Button type="primary" onClick={() => {
        if (!id) message.warning('请输入学生姓名', 2.5);
        else navigate(`/student/detail/${id}`)
      }}>查询</Button>

      <Form component={false}>
        <Table columns={columns} dataSource={data}
          pagination={{
            hideOnSinglePage: true,
            showQuickJumper: true,
            defaultCurrent: 1,
            total: 100,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10"],
          }} />
      </Form>
      {/* 
      <Pagination /> */}

    </div>
  )
}