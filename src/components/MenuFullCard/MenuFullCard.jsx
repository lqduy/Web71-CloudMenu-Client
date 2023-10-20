import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { Button, Card, Popconfirm, message } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useDispatch, useSelector } from 'react-redux';
import MenuContent from '~/components/MenuContent';
import { applyMenu } from '~/redux/page/pageActions';
import { reloadPage } from '~/redux/page/pageSlice';
import PageAPI from '~/services/pageAPI';

const MenuFullCard = ({ data }) => {
  const { activePage } = useSelector(state => state.page);
  const isAppliedMenu = data._id === activePage.activeMenuId ?? false;
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

  const handleUnApplyMenu = async () => {
    try {
      await PageAPI.unApplyMenu(activePage._id);
      dispatch(reloadPage());
      message.success('Đã dừng áp dụng thực đơn');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <Card
      className='ct-card-shadow-hover'
      cover={
        <div className='h-28 py-4 px-6 bg-red-300 rounded-t-lg'>
          <div className='flex justify-between items-end h-full mt-auto'>
            <h1 className='mb-0'>{data.name}</h1>
            <div className='flex gap-2'>
              {!isAppliedMenu && (
                <Popconfirm
                  title='Áp dụng thực đơn'
                  description='Thực đơn này sẽ được hiển thị cho khách hàng?'
                  icon={<CheckCircleOutlined style={{ color: 'green' }} />}
                  cancelText='Đóng'
                  okText='Xác nhận'
                  onConfirm={handleApplyMenu}
                >
                  <Button type='text' icon={<CheckOutlined />} />
                </Popconfirm>
              )}
              <Button type='text' icon={<EditOutlined />} />
              {isAppliedMenu && (
                <Popconfirm
                  title='Hủy áp dụng thực đơn'
                  description='Gian hàng sẽ không hiển thị thực đơn?'
                  icon={<ExclamationCircleOutlined style={{ color: 'red' }} />}
                  cancelText='Đóng'
                  okText='Xác nhận'
                  onConfirm={handleUnApplyMenu}
                >
                  <Button type='text' icon={<CloseOutlined />} />
                </Popconfirm>
              )}
            </div>
          </div>
        </div>
      }
    >
      <Meta
        description={
          <div className='bg-white text-black'>
            <MenuContent data={data?.content} />
          </div>
        }
      />
    </Card>
  );
};

export default MenuFullCard;
