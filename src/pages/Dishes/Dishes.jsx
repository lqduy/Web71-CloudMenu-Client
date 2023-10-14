import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import BodyPageTopBar from '~/components/BodyPageTopBar';
import DishesTable from './DishesTable';
import DishesAsideBar from './DishesAsideBar';
import DishForm from './DishForm';
import { fetchAllDishes } from '~/redux/dish/dishActions';

const Dishes = () => {
  const { dishData, isLoading } = useSelector(state => state.dish);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [reload, setReload] = useState(null);
  const dispatch = useDispatch();

  const toReload = () => {
    setReload(Math.random());
  };

  useEffect(() => {
    dispatch(fetchAllDishes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

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
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4 min-h-screen'>
          <Col span={5} className='flex flex-col gap-4'>
            <DishesAsideBar />
          </Col>
          <Col span={19} className='flex flex-col gap-4'>
            <BodyPageTopBar
              title={'Món ăn'}
              createButtonTitle={'Thêm món mới'}
              onOpenModal={() => setIsModalOpen(true)}
            />
            <DishesTable
              data={dishData}
              onSetEdit={handleSetEdit}
              toReload={toReload}
              isLoading={isLoading}
            />
          </Col>
        </Row>
      </div>
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
