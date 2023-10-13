import { Card } from 'antd';
import Meta from 'antd/es/card/Meta';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MenuContent from '~/components/MenuContent';
import MenusAPI from '~/services/menuAPI';

const MenuDetails = () => {
  const [menuData, setMenuData] = useState({});
  const { menuId } = useParams();

  useEffect(() => {
    getMenuData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <div className='w-[744px] min-h-[calc(100vh-50px-44px)] mx-auto'>
      <Card
        className='ct-card-shadow-hover mt-8'
        cover={
          <div className='relative h-24 bg-red-300 rounded-t-lg'>
            <h1 className='absolute left-8 bottom-4 mb-0'>{menuData.name}</h1>
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
  );
};

export default MenuDetails;
