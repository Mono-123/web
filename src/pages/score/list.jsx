import { useEffect, useState } from "react";
import usePagination from "../../utils/usePagination"
import ScoreAPI from '../../service/score'
import Detail from './components/detail'
import pagiNation from "../../components/pagination";
import { useNavigate } from 'react-router-dom'
import { Table } from 'antd';
import { Pagination } from 'antd';

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
    render: () => {
        <div>
            <button onClick={() => navigate(`/score/detail/${d.id}`)}>查看</button>
            <button onClick={() => navigate(`/score/edit/${d.id}`)}>编辑</button>
            <button onClick={() => {
                console.log(d.id);
                navigate(`/score/delete/${d.id}?limit=${limit}&offset=${offset}`)
            }}>删除</button>
        </div>
    },
},
];

const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

export default () => {
    const { limit, offset } = usePagination();
    const [data, setData] = useState([])
    const navigate = useNavigate();

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      };
    
    useEffect(() => {
        ScoreAPI.list(limit, offset).then(data => {
            data.map(data => (
                  {...data},
                  data.key=data.id));
                  setData(data);
                  console.log(data,data[1].key);
        })
    }, [limit, offset])

    return (
        <div >
            <Table columns={columns} dataSource={data} 
            pagination={{
              hideOnSinglePage:true,
              showQuickJumper:true,
              defaultCurrent:2,
              total:100,
              showSizeChanger:true,
              pageSizeOptions:["10","20","50"],
            }}/>

            <Pagination />
            
            <button onClick={() => navigate(`/score/insert`)}>新建</button>
        </div>
    )
}