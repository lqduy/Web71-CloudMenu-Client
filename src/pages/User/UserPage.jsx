import Banner from './Layout/Banner';
import Header from './Layout/Header';
import MealList from './Meals/MealList';
import TabBar from './Layout/TabBar';
import { Col, Row, Divider, Button, message } from 'antd';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageAPI from '~/services/pageAPI';
import MenusAPI from '~/services/menuAPI';
import { PATH } from '~/routes';
import Cart from './Cart/Cart';
import OrderAPI from '~/services/orderApi';
import { useSelector } from 'react-redux';

const User = () => {
  const [pageData, setPageData] = useState({});
  const [menuData, setMenuData] = useState({});
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
    } else {
      try {
        await OrderAPI.create(cartItems);
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
            <Col span={8}>
              <div className='ct-section-wrapper p-4'>
                <h3 className='mb-4 text-xl font-bold'>ĐƠN GỌI MÓN</h3>
                <Divider className='mb-2 mt-4' />
                <Cart />
                <Button
                  type='primary'
                  size='large'
                  className='w-full mt-4'
                  onClick={handleSubmitOrder}
                >
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
