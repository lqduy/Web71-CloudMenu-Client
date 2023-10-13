import { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import BodyPageTopBar from '~/components/BodyPageTopBar';
import MenuForm from './MenuForm';
import MenusAPI from '~/services/menuAPI';
import MenuCard from './MenuCard';

const Menus = () => {
  const [menuData, setMenuData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reload, setReload] = useState(null);

  useEffect(() => {
    fetchAllMenus();
  }, [reload]);

  const fetchAllMenus = async () => {
    try {
      const res = await MenusAPI.getAll();
      setMenuData(res.data.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

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
              {menuData.map((menu, index) => (
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
