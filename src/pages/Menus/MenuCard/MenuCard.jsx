import {
  CheckCircleOutlined,
  CheckOutlined,
  DeleteOutlined,
  DollarOutlined,
  EditOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import { Avatar, Button, Card, Popconfirm, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { applyMenu } from '~/redux/page/pageActions';
import { reloadPage } from '~/redux/page/pageSlice';
import MenusAPI from '~/services/menuAPI';

const MenuCard = ({ data, index, applyButtonRef }) => {
  const { activePage } = useSelector(state => state.page);
  const dispatch = useDispatch();
  const MESSAGE_KEY = 'apply-or-delete-menu';

  const handleApplyMenu = async () => {
    message.loading({ key: MESSAGE_KEY, content: 'Đang áp dụng thực đơn...' });
    const payload = {
      id: activePage._id,
      data: { menuId: data._id }
    };
    await dispatch(applyMenu(payload));
    dispatch(reloadPage());
    message.destroy(MESSAGE_KEY);
    message.success('Áp dụng thực đơn thành công');
  };

  const handleDeleteMenu = async () => {
    message.loading({ key: MESSAGE_KEY, content: 'Đang xóa thực đơn...' });
    try {
      await MenusAPI.deleteOne(data._id);
      dispatch(reloadPage());
      message.destroy(MESSAGE_KEY);
      message.success('Đã xóa thực đơn');
    } catch (err) {
      message.destroy(MESSAGE_KEY);
      message.error(err.message);
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
          description='Thực đơn này sẽ được hiển thị cho khách hàng?'
          icon={<CheckCircleOutlined style={{ color: 'green' }} />}
          cancelText='Đóng'
          okText='Xác nhận'
          onConfirm={handleApplyMenu}
        >
          <CheckOutlined ref={applyButtonRef} />
        </Popconfirm>,
        <EditOutlined key='edit' />,
        <Popconfirm
          key='delete'
          title='Xóa thực đơn'
          description='Bạn chắc chắn muốn xóa thực đơn này?'
          cancelText='Đóng'
          okText='Xóa'
          okButtonProps={{ danger: true }}
          onConfirm={handleDeleteMenu}
        >
          <DeleteOutlined />
        </Popconfirm>
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
