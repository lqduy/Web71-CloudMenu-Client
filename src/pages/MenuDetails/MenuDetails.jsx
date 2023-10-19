import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import MenuFullCard from '~/components/MenuFullCard';
import SectionWrapper from '~/components/SectionWrapper';
import PageLayout from '~/layouts/PageLayout';
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

  return (
    <PageLayout>
      <Row gutter={16} className='mt-8'>
        <Col span={19}>
          <div className='w-[744px] min-h-[calc(100vh-50px-44px)] mx-auto'>
            <MenuFullCard data={menuData} />
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
    </PageLayout>
  );
};

export default MenuDetails;
