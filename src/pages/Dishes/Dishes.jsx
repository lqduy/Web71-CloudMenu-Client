import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'antd';
import BodyPageTopBar from '~/components/BodyPageTopBar';
import DishesTable from './DishesTable';
import DishesAsideBar from './DishesAsideBar';
import DishForm from './DishForm';
import { fetchAllDishes } from '~/redux/dish/dishActions';
import { PATH } from '~/routes';
import PageLayout from '~/layouts/PageLayout';

const Dishes = () => {
  const { dishData, isLoading } = useSelector(state => state.dish);
  const { activePage } = useSelector(state => state.page);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [reload, setReload] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!activePage) {
      navigate(PATH.DASH_BOARD);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const toReload = () => {
    setReload(Math.random());
  };

  useEffect(() => {
    if (activePage) {
      dispatch(fetchAllDishes(activePage._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload, activePage]);

  const handleSetEdit = data => {
    if (!data) {
      setEditingDish(null);
      return;
    }
    setIsModalOpen(true);
    setEditingDish(data);
  };

  return (
    <PageLayout>
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
    </PageLayout>
  );
};

export default Dishes;
