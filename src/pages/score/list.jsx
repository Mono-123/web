import { useEffect, useState } from "react";
import usePagination from "../../utils/usePagination"
import ScoreAPI from '../../service/score'
import Detail from './components/detail'
import pagiNation from "../../components/pagination";
import { useNavigate } from 'react-router-dom'
import { Table ,Pagination,Button} from 'antd';



const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export default () => {
  const GENDERS = [  "男", "女" ]
  const { limit, offset } = usePagination();
  const [data, setData] = useState([])
  const navigate = useNavigate();

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columns = [
    {
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
      value:GENDERS[data.gender],
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
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => 
      <div>
          <Button type="primary" ghost onClick={() => navigate(`/score/detail/${data.id}`)}>查看</Button>
          <Button onClick={() => navigate(`/score/edit/${data.id}`)}>编辑</Button>
          <Button type="dashed" onClick={() => {navigate(`/score/delete/${d.id}?limit=${limit}&offset=${offset}`)}}>删除</Button></div>
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
      <Table columns={columns} dataSource={data}
        pagination={{
          hideOnSinglePage: true,
          showQuickJumper: true,
          defaultCurrent: 2,
          total: 100,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
        }} />

      <Pagination />

      <button onClick={() => navigate(`/score/insert`)}>新建</button>
    </div>
  )
}