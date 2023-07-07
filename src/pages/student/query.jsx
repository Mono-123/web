import { useEffect, useState, React } from "react";
import usePagination from "../../utils/usePagination"
import StudentAPI from '../../service/student'
import { GENDERS, GRADES } from './components/detail'
import Pagination from "../../components/pagination";
import { useNavigate, Link } from 'react-router-dom'
import { Table, Button, Input, message, Select, Form, Radio, InputNumber } from 'antd';

export default () => {
  const { order, limit, offset } = usePagination();
  const [data, setData] = useState([])
  const [condition, setCondition] = useState()
  const [query, setQuery] = useState()


  const [name, setName] = useState()
  const [gender, setGender] = useState()
  const [grade, setGrade] = useState()
  const [score, setScore] = useState()

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    setName(); setGender(); setGrade(); setScore();
    console.log('onreset')
  };

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
  ];

  useEffect(() => {
    StudentAPI.list(order, limit, offset)
      .then(data => {
        data.map(data => (
          { ...data },
          data.key = data.id));
        setData(data); data.map(data => {
          data.grade = GRADES[data.grade];
          data.gender = GENDERS[data.gender];
        })
      })
  }, [limit, offset, order])

  const listCondition = (condition, query) => {
    StudentAPI.listCondition(condition, query)
      .then(data => {
        if (data[0] == null) return (<div>{errorMessage || 'Not found'}</div>)
        else data.map(data => (
          { ...data },
          data.key = data.id));
        setData(data); data.map(data => {
          data.grade = GRADES[data.grade];
          data.gender = GENDERS[data.gender];
        })
      })
      .catch(() => message.info('未找到相关学生信息'))
  }

  const conditionalQuery = (name, gender, grade, score) => {
    StudentAPI.conditionalQuery(name, gender, grade, score)
      .then(data => {
        if (data[0] == null) return (<div>{errorMessage || 'Not found'}</div>)
        else data.map(data => (
          { ...data },
          data.key = data.id));
        setData(data); data.map(data => {
          data.grade = GRADES[data.grade];
          data.gender = GENDERS[data.gender];
        })
      })
      .catch(() => message.info('未找到相关学生信息'))
  }

  return (
    <div className="student-table">

      {contextHolder}

      <p>
        <Link to='/student'>返回列表</Link>
      </p>

      <Button type="primary" onClick={() => useEffect}>显示全部学生信息</Button>

      <h4>单项查询</h4>

      <div><p>请选择需要查找的项目
        <Select style={{ width: '25%' }} label="请选择需要查找的项目" name="condition" placeholder="-请选择-"
          onChange={value => {
            console.log(value);
            setCondition(value);
            if (value === 'gender') message.info('如果是男生请输入“1”，如果是女生请输入“0”')
            if (value === 'grade') message.info('请输入年级对应的数字,范围是“1-6”')
          }}>
          <Option value="name">学生姓名</Option>
          <Option value="gender">性别</Option>
          <Option value="grade">年级</Option>
          <Option value="score">分数</Option>
        </Select>
      </p>
      </div>

      <div><p>请输入查找的具体内容
        <Input style={{ width: '25%' }} onChange={e => setQuery(e.target.value)} />
        <Button type="primary" onClick={() => {
          console.log(condition, query, typeof (query), query !== '0', (condition === 'gender') && (query !== '0' || query !== '1'));
          if (!condition) message.warning('请选择需要查询的项目', 2.5);
          else if (!query) message.warning('请输入需要查询的具体内容', 2.5);
          // else if (condition === 'gender' && query !== '0' && query !== '1') message.warning('请正确输入性别信息，如果是男生请输入“1”，如果是女生请输入“0”', 2.5);
          // else if
          //   (condition === 'grade' && query !== '1' && query !== '2' && query !== '3' && query !== '4' && query !== '5' && query !== '6') {
          //   message.warning('请正确输入年级对应的数字,范围是“1-6”', 2.5);
          // }
          else listCondition(condition, query)
        }}>查询</Button>
      </p>
      </div>

      <h4>多重查询</h4>

      <Form
        form={form}
        onValuesChange={
          (changedValues, allValues) => {
            let key = Object.keys(changedValues)
            if (key == 'name') setName(changedValues.name)
            if (key == 'gender') setGender(changedValues.gender)
            if (key == 'grade') setGrade(changedValues.grade)
            if (key == 'score') setScore(changedValues.score)
            console.log('name:', changedValues.name, 'gender:', changedValues.gender, 'grade:', changedValues.grade, 'score:', changedValues.score);
          }
        }
        onFinish={
          (values) => {
            console.log('Success:', values.name, gender, grade, score);
            conditionalQuery(name, gender, grade, score);
          }}

        style={{
          maxWidth: 300,
        }}>

        <Form.Item label="姓名" name="name">
          <Input />
        </Form.Item>

        <Form.Item label="性别" name="gender">
          <Radio.Group >
            <Radio.Button value={1} >男</Radio.Button>
            <Radio.Button value={0} >女</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="年级" name="grade">
          <Select
            options={[
              { value: 1, label: '一年级' },
              { value: 2, label: '二年级' },
              { value: 3, label: '三年级' },
              { value: 4, label: '四年级' },
              { value: 5, label: '五年级' },
              { value: 6, label: '六年级' },
            ]} >
          </Select>
        </Form.Item>

        <Form.Item label="分数" name="score">
          <InputNumber />
        </Form.Item>

        <Button htmlType="button" onClick={onReset}>重置</Button>

        <Button htmlType="submit">查询</Button>

      </Form>

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