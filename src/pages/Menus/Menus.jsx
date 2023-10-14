import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import BodyPageTopBar from '~/components/BodyPageTopBar';
import MenuForm from './MenuForm';
import MenuCard from './MenuCard';
import { fetchAllMenus } from '~/redux/menu/menuActions';

const Menus = () => {
  const { menuList } = useSelector(state => state.menu);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllMenus());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReload = () => {
    setReload(Math.random());
  };

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4 min-h-screen'>
          <Col span={5} className='flex flex-col gap-4'>
            <div className='ct-section-wrapper min-h-[100px]'></div>
          </Col>
          <Col span={19} className='flex flex-col gap-4'>
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
      <MenuForm isModalOpen={isModalOpen} handleCancel={handleCancel} handleReload={handleReload} />
    </>
  );
};

export default Menus;
