import { useEffect } from 'react';
import { Row, Col, Spin, Button, Input, Form } from 'antd';
import { CloseOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDishes } from '~/redux/slices/dishSlice';
import { unselectAll } from '~/redux/slices/menuSlice';
import MenuItem from '~/components/MenuItem';
import Search from 'antd/es/input/Search';
import Dish from '~/utils/data/dish';

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
        <Col span={16}>
          {menuContent.length > 0 && (
            <div className='flex flex-col gap-8 p-4 border border-gray-300 border-1 rounded-lg'>
              {menuContent.map(group => {
                const groupData = Dish.group.find(item => item.value === group.value);
                return (
                  <div key={group.id}>
                    <h2 className='pl-2 py-1 rounded-md bg-gray-200'>{groupData.title}</h2>
                    <div className='flex flex-col gap-2 pl-8'>
                      {group.subGroup.map(type => {
                        const typeData = Dish.type.find(item => item.value === type.value);
                        return (
                          <div key={type.id}>
                            <h3>{typeData.title}</h3>
                            <div className='flex flex-col gap-2 pl-4'>
                              {type.dishList.map(dish => (
                                <MenuItem key={dish.id} data={dish} isPreview />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default MenuContentForm;
