import { useEffect } from 'react';
import { Row, Col, Spin } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDishes } from '~/redux/slices/dishSlice';
import MenuItem from '~/components/MenuItem';

const MenuContentForm = () => {
  const { dishData, isLoading } = useSelector(state => state.dish);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDishes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row gutter={32}>
      <Col span={8}>
        <div className=''>
          <h2>Danh sách món</h2>
          <div className='flex flex-col gap-1'>
            {isLoading ? <Spin /> : dishData.map(dish => <MenuItem key={dish._id} data={dish} />)}
          </div>
        </div>
      </Col>
      <Col span={16}>
        <div className='bg-red-300'>
          <h2>Thực đơn</h2>
        </div>
      </Col>
    </Row>
  );
};

export default MenuContentForm;
