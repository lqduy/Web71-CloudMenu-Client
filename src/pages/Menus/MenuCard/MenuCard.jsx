import {
  CheckCircleOutlined,
  CheckOutlined,
  DollarOutlined,
  EditOutlined,
  EllipsisOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { Avatar, Button, Card, Popconfirm, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { applyMenu } from '~/redux/page/pageActions';
import { reloadPage } from '~/redux/page/pageSlice';

const MenuCard = ({ data, index, applyButtonRef }) => {
  const { activePage } = useSelector(state => state.page);
  const dispatch = useDispatch();

  const handleApplyMenu = async () => {
    const payload = {
      id: activePage._id,
      data: { menuId: data._id }
    };
    await dispatch(applyMenu(payload));
    dispatch(reloadPage());
    message.success('Áp dụng thực đơn thành công');
  };

  return (
    <Card
      key={data._id}
      hoverable
      className='w-[calc(33.33%-16px*2/3)] shadow-sm'
      cover={<div className='h-12 bg-red-300 rounded-t-lg'></div>}
      actions={[
        <Popconfirm
          key='apply'
          title='Áp dụng thực đơn'
          description='Thực đơn này sẽ được hiển thị cho khách hàng?'
          icon={<CheckCircleOutlined style={{ color: 'green' }} />}
          cancelText='Đóng'
          okText='Xác nhận'
          onConfirm={handleApplyMenu}
        >
          <CheckOutlined ref={applyButtonRef} />
        </Popconfirm>,
        <EditOutlined key='edit' />,
        <EllipsisOutlined key='ellipsis' />
      ]}
    >
      <Meta
        avatar={<Avatar>#{index + 1}</Avatar>}
        title={
          <Link to={`/m/${data._id}`} className='text-black'>
            {data.name}
          </Link>
        }
        description={
          <div className='flex gap-8'>
            <Button icon={<FileTextOutlined />} type='text' className='p-0.5'>
              {data.dishQuantity} món
            </Button>
            <Button icon={<DollarOutlined />} type='text' className='p-0.5'>
              {data.priceAverage?.toLocaleString('vi-VN')}đ
            </Button>
          </div>
        }
      />
    </Card>
  );
};

export default MenuCard;
