import { useEffect, useState } from 'react';
import PageLayout from '~/layouts/PageLayout';
import { Row, Col } from 'antd';
import DishesTopBar from './DishesTopBar';
import DishesTable from './DishesTable';
import DishesAsideBar from './DishesAsideBar';
import DishForm from '~/components/DishForm';
import DishesAPI from '~/services/dishAPI';

const Dishes = () => {
  const [dishesData, setDishesData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [reload, setReload] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const toReload = () => {
    setReload(Math.random());
  };

  useEffect(() => {
    fetchAllDishes();
  }, [reload]);

  const fetchAllDishes = async () => {
    setIsLoading(true);
    try {
      const dishes = await DishesAPI.getAll();
      const rawData = dishes.data.data;
      const sortedData = rawData.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      setDishesData(sortedData);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetEdit = data => {
    if (!data) {
      setEditingDish(null);
      return;
    }
    setIsModalOpen(true);
    setEditingDish(data);
  };

  return (
    <>
      <PageLayout>
        <div className='flex flex-col gap-4'>
          <Row gutter={16} className='mt-4 min-h-screen'>
            <Col span={5} className='flex flex-col gap-4'>
              <DishesAsideBar />
            </Col>
            <Col span={19} className='flex flex-col gap-4'>
              <DishesTopBar onOpenModal={() => setIsModalOpen(true)} />
              <DishesTable
                data={dishesData}
                onSetEdit={handleSetEdit}
                toReload={toReload}
                isLoading={isLoading}
              />
            </Col>
          </Row>
        </div>
      </PageLayout>
      <DishForm
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        editingDish={editingDish}
        resetEditing={() => handleSetEdit(null)}
        toReload={toReload}
      />
    </>
  );
};

export default Dishes;
