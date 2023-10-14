import { useEffect } from 'react';
import { Row, Col, Spin, Button, Input, Form } from 'antd';
import { CloseOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDishes } from '~/redux/dish/dishActions';
import { unselectAll } from '~/redux/menu/menuSlice';
import MenuItem from '~/components/MenuItem';
import Search from 'antd/es/input/Search';
import MenuContent from '~/components/MenuContent';

const MenuContentForm = ({ form, onFinish }) => {
  const { dishData, isLoading } = useSelector(state => state.dish);
  const { menuContent } = useSelector(state => state.menu);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDishes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Row gutter={32}>
        <Col span={8} className='flex gap-2'>
          <Button icon={<MenuOutlined />} />
          <Search placeholder='Tìm món' allowClear />
        </Col>
        <Col span={16} className='flex justify-between'>
          <Form name='menuName' form={form} onFinish={onFinish}>
            <Form.Item
              name='name'
              rules={[{ required: true, message: 'Vui lòng nhập tên thực đơn!' }]}
            >
              <Input
                autoFocus
                placeholder='ĐẶT TÊN CHO THỰC ĐƠN CỦA BẠN'
                className='w-72 font-bold blur:border-none'
              />
            </Form.Item>
          </Form>
          <div className='flex gap-1'>
            <Button icon={<CloseOutlined />} onClick={() => dispatch(unselectAll())}>
              Bỏ chọn tất cả
            </Button>
            <Button icon={<PlusOutlined />}>Thêm nhóm</Button>
          </div>
        </Col>
      </Row>
      <Row gutter={32} className='mt-2'>
        <Col span={8} className='flex flex-col gap-1'>
          {isLoading ? <Spin /> : dishData.map(dish => <MenuItem key={dish._id} data={dish} />)}
        </Col>
        <Col span={16}>{menuContent.length > 0 && <MenuContent data={menuContent} />}</Col>
      </Row>
    </>
  );
};

export default MenuContentForm;
