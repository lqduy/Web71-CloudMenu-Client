import { useState } from 'react';
import { Space, Table, Button } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dishMockup from '~/utils/mockup/dishes';
import CreateDish from '~/components/CreateDish';

const DishesTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

  const handleClickEdit = data => {
    setIsModalOpen(true);
    setEditingDish(data);
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
          <Button type='text' icon={<EditOutlined />} onClick={() => handleClickEdit(data)} />
          <Button type='text' danger icon={<DeleteOutlined />} />
        </Space>
      )
    }
  ];

  return (
    <>
      <Table columns={columns} dataSource={dishMockup} />
      <CreateDish
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        editing={editingDish}
      />
    </>
  );
};
export default DishesTable;
