import { CheckOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import MenuContent from '~/components/MenuContent';
import SectionWrapper from '~/components/SectionWrapper';
import { fetchAllMenus } from '~/redux/menu/menuActions';
import MenusAPI from '~/services/menuAPI';

const MenuDetails = () => {
  const { menuList } = useSelector(state => state.menu);
  const [menuData, setMenuData] = useState({});
  const { menuId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    getMenuData();
    if (menuList.length === 0) {
      dispatch(fetchAllMenus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuId]);

  const getMenuData = async () => {
    try {
      const menu = await MenusAPI.getOne(menuId);
      setMenuData(menu.data.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const menuCoreData = menuData?.content;

  return (
    <Row gutter={16} className='mt-8'>
      <Col span={19}>
        <div className='w-[744px] min-h-[calc(100vh-50px-44px)] mx-auto'>
          <Card
            className='ct-card-shadow-hover'
            cover={
              <div className='h-28 py-4 px-6 bg-red-300 rounded-t-lg'>
                <div className='flex justify-between items-end h-full mt-auto'>
                  <h1 className='mb-0'>{menuData.name}</h1>
                  <div className='flex gap-2'>
                    <Button type='text' icon={<CheckOutlined />} />
                    <Button type='text' icon={<EditOutlined />} />
                  </div>
                </div>
              </div>
            }
          >
            <Meta
              description={
                <div className='bg-white text-black'>
                  {menuCoreData && <MenuContent data={menuCoreData} />}
                </div>
              }
            />
          </Card>
        </div>
      </Col>
      <Col span={5} className='flex flex-col gap-4'>
        <SectionWrapper></SectionWrapper>
        <SectionWrapper title={'Mở thực đơn khác'}>
          <div className='flex flex-col'>
            {menuList.map(menu => (
              <Link
                key={menu._id}
                to={`/m/${menu._id}`}
                className='flex justify-between px-4 py-2 text-black hover:bg-gray-100 cursor-pointer'
              >
                <h4 className='mb-0'>{menu.name}</h4>
                <p className='mb-0'>{menu.dishQuantity} món</p>
              </Link>
            ))}
          </div>
        </SectionWrapper>
      </Col>
    </Row>
  );
};

export default MenuDetails;
