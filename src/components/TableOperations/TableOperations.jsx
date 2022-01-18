import { Table } from 'antd';

const TableOperation = (props) => {

const columns = [
  {
    title: 'Name',
    dataIndex: '',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [props.data.account]
console.log(data);
  // {
  //   key: '1',
  //   name: 'John Brown',
  //   age: 32,
  //   address: 'New York No. 1 Lake Park',
  // },
  // {
  //   key: '2',
  //   name: 'Jim Green',
  //   age: 42,
  //   address: 'London No. 1 Lake Park',
  // },
  // {
  //   key: '3',
  //   name: 'Joe Black',
  //   age: 32,
  //   address: 'Sidney No. 1 Lake Park',
  // },
// ];

return(
  <div>
    <Table columns={columns} dataSource={data} size="middle" />
  </div>
)
};

export default TableOperation