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
import CartForm from './Cart/CartForm';

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
        await OrderAPI.create(payload);
        message.success('Thêm đơn hàng thành công');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  const cartFormProps = {
    pageData,
    orderInfo,
    setOrderInfo
  };

  return (
    <div className='bg-white'>
      <Header handleSubmitOrder={handleSubmitOrder} cartFormProps={cartFormProps} />
      <Banner pageData={pageData} />
      <TabBar />
      <div className='bg-[#eee] border-t-2'>
        <div className='ct-client-page-container py-4'>
          <Row gutter={16}>
            <Col span={8} className='hidden xl:block'>
              <div className='flex flex-col gap-4 sticky top-24'>
                <div className='ct-section-wrapper p-4 h-fit'>
                  <h3 className='mb-4 text-lg font-bold'>ĐƠN GỌI MÓN</h3>
                  <Divider className='mb-2 mt-4' />
                  <Cart />
                </div>
                {/* Cart Form  */}
                <div className='ct-section-wrapper p-4'>
                  <CartForm {...cartFormProps} />
                  <Button
                    type='primary'
                    size='large'
                    className='w-full mt-4'
                    onClick={handleSubmitOrder}
                  >
                    Đặt đơn
                  </Button>
                </div>
              </div>
            </Col>
            <Col className='flex-grow'>
              <MealList data={menuData.content} />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default User;
