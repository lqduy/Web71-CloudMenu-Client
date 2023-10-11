import { Space, Table, Button, Popconfirm, message } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DishesAPI from '~/services/dishAPI';

const DishesTable = ({ data, onSetEdit, toReload }) => {
  const handleDeleteDish = async (id, name) => {
    try {
      await DishesAPI.deleteById(id);
      message.success(`Món "${name}" đã được xóa`);
      toReload();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const columns = [
    {
      title: 'SKU',
      dataIndex: 'sku',
      key: 'sku',
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
            okButtonProps={{ danger: true }}
          >
            <Button type='text' danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      )
    }
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey={dish => dish._id} />
    </>
  );
};
export default DishesTable;
