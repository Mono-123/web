import { useEffect, useRef, useState } from "react";
import usePagination from "../../utils/usePagination"
import ScoreAPI from '../../service/score'
import Detail from './components/detail'
import pagiNation from "../../components/pagination";
import { useNavigate } from 'react-router-dom'
import { Table, Pagination, Button, Form } from 'antd';
import useFormInstance from "antd/es/form/hooks/useFormInstance";



const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export default () => {
  const GENDERS = ["男", "女"]
  const { limit, offset } = usePagination();
  const [data, setData] = useState([])
  const navigate = useNavigate();

  // const formRef = useRef<useFormInstance>();
  // const values = await form.validateFields()

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

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
    ScoreAPI.list(limit, offset).then(data => {
      data.map(data => (
        { ...data },
        data.key = data.id));
      setData(data);
      console.log(data, data[1].key);
    })
  }, [limit, offset])

  return (
    <div >

      <Button type="primary" onClick={() => navigate(`/SCORE/insert`)}>新建学生分数信息</Button>
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