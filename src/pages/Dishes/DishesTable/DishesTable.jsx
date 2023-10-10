import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Mã',
    dataIndex: 'id',
    key: 'id',
    render: text => <a>{text}</a>
  },
  {
    title: 'Hình ảnh',
    dataIndex: 'image',
    key: 'image',
    render: image => <img src={image} />
  },
  {
    title: 'Tên món',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Nhóm',
    dataIndex: 'group',
    key: 'group'
  },
  {
    title: 'Đơn vị',
    dataIndex: 'unit',
    key: 'unit'
  },
  {
    title: 'Đơn Giá',
    key: 'price',
    dataIndex: 'price',
    render: (_, { tags }) => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    )
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    )
  }
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
];
const DishesTable = () => <Table columns={columns} dataSource={data} />;
export default DishesTable;
