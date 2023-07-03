import { useEffect, useState,React } from "react";
import usePagination from "../../utils/usePagination"
import StudentAPI from '../../service/student'
import Detail from './components/detail'
import Pagination from "../../components/pagination";
import { useNavigate } from 'react-router-dom'
import { Table ,Button} from 'antd';

export default () => {
    const { limit, offset } = usePagination();
    const [data, setData] = useState([])
    // const [length, setLength] = useState()
    const navigate = useNavigate();

    const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id - b.id,
        multiple: 4,
        render: (value) => {data.id=value}
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
      render: () => 
      <div>
          <Button type="primary" ghost onClick={() => {navigate(`/student/detail/${data.id}`);console.log(data.id)}}>查看</Button>
          <Button onClick={() => {navigate(`/student/edit/${data.id}`);console.log(data)}}>编辑</Button>
          <Button type="dashed" danger onClick={() => {navigate(`/student/delete/${d.id}?limit=${limit}&offset=${offset}`)}}>删除</Button></div>
    },
    
  ];

    useEffect(() => {
        StudentAPI.list(limit, offset).then(data => {
            data.map(data => (
                { ...data },
                data.key = data.id));
              setData(data);
              console.log(data, data[1].key);
        })
    }, [limit, offset])

    // useEffect(() => {
    //     StudentAPI.listAll().then(length=>{
    //         setLength(length)
    //         console.log(length)
    //     })
    // })

    return (
        <div className="student-table">
        <Button type="primary" onClick={() => navigate(`/student/insert`)}>新建学生信息</Button>
           <Table columns={columns} dataSource={data}
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