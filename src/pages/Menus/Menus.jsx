import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Empty, Button, Tour } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import BodyPageTopBar from '~/components/BodyPageTopBar';
import MenuForm from './MenuForm';
import MenuCard from './MenuCard';
import { fetchAllMenus } from '~/redux/menu/menuActions';
import PageLayout from '~/layouts/PageLayout';
import MenuFullCard from '~/components/MenuFullCard';
import { CheckOutlined } from '@ant-design/icons';
import { setCurrentView } from '~/redux/view/viewSlice';
import { VIEW_NAME } from '~/utils/constants';

const Menus = () => {
  const { activePage } = useSelector(state => state.page);
  const { menuList } = useSelector(state => state.menu);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState(null);
  const [openApplyNowTour, setOpenApplyNowTour] = useState(false);
  const applyButtonRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setCurrentView(VIEW_NAME.MENU));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const applyNowTourSteps = [
    {
      title: 'Chọn vào đây',
      description: 'Dấu tick bên dưới thực đơn bạn muốn áp dụng',
      cover: <CheckOutlined className='text-6xl' />,
      target: () => applyButtonRef.current
    }
  ];

  return (
    <>
      <PageLayout>
        <div className='flex flex-col gap-4'>
          <Row gutter={16} className='justify-between mt-4 min-h-screen'>
            <Col span={8} className='flex flex-col gap-4'>
              <div className='ct-section-wrapper'>
                {activeMenuData && <MenuFullCard data={activeMenuData} controls={false} />}
                {!activeMenuData && (
                  <div className='flex flex-col gap-6 items-center justify-center h-[calc(100vh-50px-44px-16px-16px)] p-4'>
                    <Empty description='Chưa có thực đơn được áp dụng' />
                    <div className='flex flex-col gap-2'>
                      <Button type='primary' onClick={() => setIsModalOpen(true)}>
                        Tạo mới
                      </Button>
                      {menuList.length > 0 && (
                        <Button type='primary' onClick={() => setOpenApplyNowTour(true)}>
                          Chọn ngay
                        </Button>
                      )}
                    </div>
                  </div>
                )}
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
                    <MenuCard
                      key={menu._id}
                      data={menu}
                      index={index}
                      applyButtonRef={index === 0 ? applyButtonRef : undefined}
                    />
                  ))}
              </div>
            </Col>
          </Row>
        </div>
      </PageLayout>
      <MenuForm isModalOpen={isModalOpen} handleCancel={handleCancel} handleReload={handleReload} />
      <Tour
        open={openApplyNowTour}
        onClose={() => setOpenApplyNowTour(false)}
        steps={applyNowTourSteps}
      />
    </>
  );
};

export default Menus;
