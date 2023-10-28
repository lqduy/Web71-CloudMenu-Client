import Banner from './Layout/Banner';
import Header from './Layout/Header';
import MealList from './Meals/MealList';
import TabBar from './Layout/TabBar';
import { Col, Row, Divider, Button, message, Input } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageAPI from '~/services/pageAPI';
import MenusAPI from '~/services/menuAPI';
import { PATH } from '~/routes';
import Cart from './Cart/Cart';
import OrderAPI from '~/services/orderApi';
import { useSelector } from 'react-redux';
import { ORDER_STATUS } from '~/utils/constants';
import TextArea from 'antd/es/input/TextArea';

const User = () => {
  const [pageData, setPageData] = useState({});
  const [menuData, setMenuData] = useState({});
  const [orderInfo, setOrderInfo] = useState({ tableIndex: null, clientName: '', note: '' });
  const { cartItems } = useSelector(state => state.cart);
  const navigate = useNavigate();
  const { pageId } = useParams();

  useEffect(() => {
    fetchPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchMenuData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);

  const fetchPageData = async () => {
    try {
      const res = await PageAPI.getOne(pageId);
      if (!res.data._id) {
        navigate(PATH.ABOUT_ME);
      }
      setPageData(res.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const fetchMenuData = async () => {
    if (!pageData.activeMenuId) return;
    try {
      const res = await MenusAPI.getOne(pageData.activeMenuId);
      setMenuData(res.data.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) {
      message.error('Không có món ăn nào được chọn');
    } else if (!orderInfo.tableIndex && orderInfo.clientName === '') {
      message.error('Chưa cung cấp thông tin thực khách');
    } else {
      try {
        const payload = {
          pageId,
          list: cartItems,
          status: ORDER_STATUS.INIT,
          tableIndex: orderInfo.tableIndex,
          clientName: orderInfo.clientName,
          note: orderInfo.note
        };
        console.log(payload);
        await OrderAPI.create(payload);
        message.success('Thêm đơn hàng thành công');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  return (
    <div className='bg-white'>
      <Header handleSubmitOrder={handleSubmitOrder} />
      <Banner pageData={pageData} />
      <TabBar />
      <div className='bg-[#eee] border-t-2'>
        <div className='ct-client-page-container py-4'>
          <Row gutter={16}>
            <Col span={8} className='flex flex-col gap-4'>
              <div className='ct-section-wrapper p-4 h-fit'>
                <h3 className='mb-4 text-xl font-bold'>ĐƠN GỌI MÓN</h3>
                <Divider className='mb-2 mt-4' />
                <Cart />
              </div>
              <div className='ct-section-wrapper p-4'>
                <h3 className='mb-4 text-xl font-bold'>Chọn bàn</h3>
                <div className='flex flex-wrap gap-2'>
                  {Array.from({ length: 12 }).map((_, index) => (
                    <Button
                      key={index}
                      type='primary'
                      ghost={index !== orderInfo.tableIndex}
                      className='flex justify-center items-center w-[calc(12.25%-8px*7/8)] rounded-sm'
                      onClick={() => setOrderInfo(pre => ({ ...pre, tableIndex: index }))}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
                <h3 className='my-4 text-xl font-bold'>Hoặc nhập tên</h3>
                <Input
                  placeholder='VD: Gia đình Anh A'
                  className='py-2'
                  onChange={e => setOrderInfo(pre => ({ ...pre, clientName: e.target.value }))}
                />
                <h3 className='my-4 text-xl font-bold'>Ghi chú</h3>
                <TextArea
                  maxLength={100}
                  style={{ height: 120, resize: 'none' }}
                  placeholder='VD: Nấu nhạt vị'
                  onChange={e => setOrderInfo(pre => ({ ...pre, note: e.target.value }))}
                />
              </div>
              <div className='ct-section-wrapper'>
                <Button type='primary' size='large' className='w-full' onClick={handleSubmitOrder}>
                  Đặt đơn
                </Button>
              </div>
            </Col>
            <Col span={16}>
              <MealList data={menuData.content} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default User;
