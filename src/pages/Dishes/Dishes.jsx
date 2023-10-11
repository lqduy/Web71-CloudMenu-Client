import { useState } from 'react';
import PageLayout from '~/layouts/PageLayout';
import { Row, Col } from 'antd';
import DishesTopBar from './DishesTopBar';
import DishesTable from './DishesTable';
import DishesAsideBar from './DishesAsideBar';
import CreateDish from '~/components/CreateDish';
import dishMockup from '~/utils/mockup/dishes';

const Dishes = () => {
  const [dishesData, setDishesData] = useState(dishMockup);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);

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
              <DishesTable data={dishesData} onSetEdit={handleSetEdit} />
            </Col>
          </Row>
        </div>
      </PageLayout>
      <CreateDish
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        editingDish={editingDish}
        resetEditing={() => handleSetEdit(null)}
      />
    </>
  );
};

export default Dishes;
