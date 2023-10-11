import { Space, Table, Button, Popconfirm, message } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

const DishesTable = ({ data, onSetEdit }) => {
  const handleDeleteDish = (_id, name) => {
    message.success(`Món "${name}" đã được xóa`);
  };

  const columns = [
    {
      title: 'SKU',
      dataIndex: '_id',
      key: '_id',
      render: text => <p className='mb-0'>{text}</p>
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      render: image => <img src={image} className='h-32' />
    },
    {
      title: 'Tên món',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Đơn Giá',
      key: 'price',
      dataIndex: 'price',
      render: (price, record) => (
        <p className='mb-0'>
          {price}/{record.unit}
        </p>
      )
    },
    {
      title: 'Tùy chọn',
      key: 'setting',
      render: (_, data) => (
        <Space>
          <Button type='text' icon={<EyeOutlined />} />
          <Button type='text' icon={<EditOutlined />} onClick={() => onSetEdit(data)} />
          <Popconfirm
            placement='topRight'
            title='Xóa món ăn'
            description='Bạn chắc chắn muốn xóa món ăn này?'
            onConfirm={() => handleDeleteDish(data._id, data.name)}
            okText='Xóa'
            cancelText='Đóng'
            okButtonProps={{ ['danger']: true }}
          >
            <Button type='text' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};
export default DishesTable;
