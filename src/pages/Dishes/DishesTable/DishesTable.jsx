import { Space, Table, Button, Popconfirm, message } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DishesAPI from '~/services/dishAPI';
import Dish from '~/utils/data/dish';
import DishDefaultImage from '~/assets/layouts/dish-default.png';

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
      dataIndex: 'images',
      key: 'images',
      render: images => {
        let imageSrc = DishDefaultImage;
        if (images) {
          imageSrc = images[0].url;
        }
        return <img src={imageSrc} className='h-32' />;
      }
    },
    {
      title: 'Tên món',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Loại',
      dataIndex: 'type',
      key: 'type',
      render: type => {
        const typeData = Dish.type.find(item => item.value === type);
        return typeData.title;
      }
    },
    {
      title: 'Đơn Giá',
      key: 'price',
      dataIndex: 'price',
      render: (price, dish) => {
        const formattedPrice = price.toLocaleString('vi-VN');
        return (
          <p className='mb-0'>
            {formattedPrice}/{dish.unit}
          </p>
        );
      }
    },
    {
      title: 'Tùy chọn',
      key: 'setting',
      render: (_, dish) => (
        <Space>
          <Button type='text' icon={<EyeOutlined />} />
          <Button type='text' icon={<EditOutlined />} onClick={() => onSetEdit(dish)} />
          <Popconfirm
            placement='topRight'
            title='Xóa món ăn'
            description='Bạn chắc chắn muốn xóa món ăn này?'
            onConfirm={() => handleDeleteDish(dish._id, dish.name)}
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
