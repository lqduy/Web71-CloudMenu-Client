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
import { reloadPage } from '~/redux/page/pageSlice';
import PageAPI from '~/services/pageAPI';

const MenuCard = ({ data, index }) => {
  const { activePage } = useSelector(state => state.page);
  const dispatch = useDispatch();

  const handleApplyMenu = async () => {
    try {
      await PageAPI.applyMenu(activePage._id, { menuId: data._id });
      message.success('Áp dụng thực đơn thành công');
      dispatch(reloadPage());
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
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
          description='Thay thế thực đơn đang áp dụng?'
          icon={<CheckCircleOutlined style={{ color: 'green' }} />}
          cancelText='Đóng'
          okText='Xác nhận'
          onConfirm={handleApplyMenu}
        >
          <CheckOutlined />
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
