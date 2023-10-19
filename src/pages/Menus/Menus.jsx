import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import BodyPageTopBar from '~/components/BodyPageTopBar';
import MenuForm from './MenuForm';
import MenuCard from './MenuCard';
import { fetchAllMenus } from '~/redux/menu/menuActions';
import PageLayout from '~/layouts/PageLayout';
import MenuContent from '~/components/MenuContent';
import MenuFullCard from '~/components/MenuFullCard';

const Menus = () => {
  const { activePage } = useSelector(state => state.page);
  const { menuList } = useSelector(state => state.menu);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activePage) {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  useEffect(() => {
    if (activePage) {
      dispatch(fetchAllMenus(activePage._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, activePage]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReload = () => {
    setReload(Math.random());
  };

  const activeMenuData = menuList.find(menu => menu._id === activePage?.activeMenuId);

  return (
    <>
      <PageLayout>
        <div className='flex flex-col gap-4'>
          <Row gutter={16} className='justify-between mt-4 min-h-screen'>
            <Col span={8} className='flex flex-col gap-4'>
              <div className='ct-section-wrapper'>
                {activeMenuData && <MenuFullCard data={activeMenuData} />}
              </div>
            </Col>
            <Col span={15} className='flex flex-col gap-4'>
              <BodyPageTopBar
                title={'Thực đơn'}
                createButtonTitle={'Tạo thực đơn mới'}
                onOpenModal={() => setIsModalOpen(true)}
              />
              <div className='flex gap-4 w-full flex-wrap'>
                {menuList &&
                  menuList.map((menu, index) => (
                    <MenuCard key={menu._id} data={menu} index={index} />
                  ))}
              </div>
            </Col>
          </Row>
        </div>
      </PageLayout>
      <MenuForm isModalOpen={isModalOpen} handleCancel={handleCancel} handleReload={handleReload} />
    </>
  );
};

export default Menus;
