import { useEffect, useState, React } from "react";
import usePagination from "../../utils/usePagination"
import StudentAPI from '../../service/student'
import { GENDERS, GRADES } from './components/detail'
import Pagination from "../../components/pagination";
import { useNavigate } from 'react-router-dom'
import { Table, Button, Input, message, Select, Image } from 'antd';
import Detail from './components/detail'

export default () => {
  const { limit, offset } = usePagination();
  const [data, setData] = useState([])
  const [formData, setFormData] = useState([])
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [gender, setGender] = useState(undefined)
  const [order, setOrder] = useState()
  const [desc, setDesc] = useState(0)

  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      sorter: true,
      // sorter: {
      //   compare: (a, b) => a.id - b.id,
      //   multiple: 4,
      // },
      // render: (value) => { data.id = value }
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        {
          text: '男',
          value: '1',
        },
        {
          text: '女',
          value: '0',
        },
      ],

      // sorter: {
      //   compare: (a, b) => a.gender - b.gender,
      //   multiple: 3,
      // },
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      sorter: true,
      // sorter: {
      //   compare: (a, b) => a.grade - b.grade,
      //   multiple: 2,
      // },
    },
    {
      title: 'Score',
      dataIndex: 'score',
      sorter: true,
      // sorter: {
      //   compare: (a, b) => a.score - b.score,
      //   multiple: 1,
      // },
    },
    {
      title: 'img',
      dataIndex: 'img',
      render: (text, record) => {
        // console.log(text)
        if (record.img !== null) {
          return <Image
            width={200}
            src={'/uploadFile/' + record.img}
          />
        }
      }
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
    StudentAPI.list(gender,order, desc, limit, offset)
      .then(data => {
        let record = data[0]
        console.log('record:', record)
        record.map(record => (
          { ...record },
          record.key = record.id));
        setData(record);
        record.map(record => {
          record.grade = GRADES[record.grade];
          record.gender = GENDERS[record.gender];
        }
        )
        setFormData(record)

        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: data[1],
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });

      })
  }, [JSON.stringify(tableParams),gender,order, desc, limit, offset])


  const handleTableChange = (pagination, filters, sorter) => {
    console.log('pagination:',pagination,'filters:',filters,'sorter:',sorter)
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
    if(sorter.order==="descend")setDesc(1)
    if(sorter.order==="ascend")setDesc(0)
    
    if(filters.gender!==null){
    if(filters.gender.length===2)setGender(undefined)
    else if(filters.gender[0]==='1')setGender(1)
    else setGender(0)}

    setOrder(sorter.field)
    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div className="student-table">

      {/* <p>last:{last}</p> */}

      {/* <Detail {...last} /> */}

      {contextHolder}
      <Button onClick={() => navigate(`/student/insert`)}>新建学生信息</Button>

      <Button onClick={() => navigate(`/student/query`)}>查询学生信息</Button>
      <br />

      <Table columns={columns}
        dataSource={formData}
        // onchange={onChange}
        // pagination={{
        //   hideOnSinglePage: true,
        //   showQuickJumper: true,
        //   defaultCurrent: 1,
        //   total: 100,
        //   showSizeChanger: true,
        //   pageSizeOptions: ["5", "10"],
        // }} 
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />

      {/* <Pagination /> */}

    </div>
  )
}