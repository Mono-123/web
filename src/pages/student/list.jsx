import { useEffect, useState, React } from "react";
import usePagination from "../../utils/usePagination"
import StudentAPI from '../../service/student'
import { GENDERS, GRADES } from './components/detail'
import Pagination from "../../components/pagination";
import { useNavigate } from 'react-router-dom'
import { Table, Button, Input, message, Select } from 'antd';

export default () => {
  const { limit, offset } = usePagination();
  const [data, setData] = useState([])
  const [formData, setFormData] = useState([])
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [order, setOrder] = useState()
  const [desc, setDesc] = useState(0)

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
        render: (value) => { data.id = value }
      },
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sorter: {
        compare: (a, b) => a.gender - b.gender,
        multiple: 3,
      },
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      sorter: {
        compare: (a, b) => a.grade - b.grade,
        multiple: 2,
      },
    },
    {
      title: 'Score',
      dataIndex: 'score',
      sorter: {
        compare: (a, b) => a.score - b.score,
        multiple: 1,
      },
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (text, record) =>
        <div>
          <Button type="primary" ghost onClick={() => { navigate(`/student/detail/${record.id}`) }}>查看</Button>
          <Button onClick={() => { navigate(`/student/edit/${record.id}`); console.log(data) }}>编辑</Button>
          <Button type="dashed" danger onClick={() => { navigate(`/student/delete/${record.id}?limit=${limit}&offset=${offset}`) }}>删除</Button></div>
    },

  ];

  useEffect(() => {
    StudentAPI.list(order, desc, limit, offset)
      .then(data => {
        data.map(data => (
          { ...data },
          data.key = data.id));
        setData(data); data.map(data => {
          data.grade = GRADES[data.grade];
          data.gender = GENDERS[data.gender];
        })
        setFormData(data)
      })
  }, [limit, offset, order, desc])

  return (
    <div className="student-table">

      {contextHolder}
      <Button onClick={() => navigate(`/student/insert`)}>新建学生信息</Button>
      <br />
      <Button onClick={() => {
        if (desc === 0&&order==='chinese') setDesc(1)
        else if(desc===1&&order==='chinese') setDesc(0)
        setOrder('chinese'); 
        }}>按语文成绩排序</Button>

         <Button onClick={() => {
        if (desc === 0&&order==='math') setDesc(1)
        else if(desc===1&&order==='math') setDesc(0)
        setOrder('math'); 
        }}>按数学成绩排序</Button>

        <Button onClick={() => {
       if (desc === 0&&order==='english') setDesc(1)
       else if(desc===1&&order==='english') setDesc(0)
       setOrder('english'); 
       }}>按英语成绩排序</Button>

      <Table columns={columns} dataSource={formData}
        pagination={{
          hideOnSinglePage: true,
          showQuickJumper: true,
          defaultCurrent: 1,
          total: 100,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10"],
        }} />

      {/* <Pagination /> */}

    </div>
  )
}