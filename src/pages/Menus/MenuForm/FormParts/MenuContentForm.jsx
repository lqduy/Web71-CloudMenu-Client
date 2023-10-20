/* eslint-disable indent */
import { useEffect, useMemo, useState } from 'react';
import {
  Row,
  Col,
  Spin,
  Button,
  Input,
  Form,
  Popover,
  Divider,
  Space,
  Checkbox,
  Radio
} from 'antd';
import { ArrowRightOutlined, CloseOutlined, MenuOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDishes } from '~/redux/dish/dishActions';
import { unselectAll } from '~/redux/menu/menuSlice';
import MenuItem from '~/components/MenuItem';
import Search from 'antd/es/input/Search';
import MenuContent from '~/components/MenuContent';
import { SORT_TYPE } from '~/utils/constants';
import sortDishesByType from '~/utils/functions/sortDishesByType';

const sortTypeList = [
  { label: 'Chữ cái tăng', value: SORT_TYPE.A_TO_Z },
  { label: 'Chữ cái giảm', value: SORT_TYPE.Z_TO_A },
  { label: 'Đơn giá tăng', value: SORT_TYPE.L_TO_H },
  { label: 'Đơn giá giảm', value: SORT_TYPE.H_TO_L }
];

const MenuContentForm = ({ form, onFinish }) => {
  const { activePage } = useSelector(state => state.page);
  const { dishData, isLoading } = useSelector(state => state.dish);
  const { menuContent, itemList } = useSelector(state => state.menu);
  const [viewMode, setViewMode] = useState({ hiddenAdded: false, sortType: SORT_TYPE.A_TO_Z });
  const dispatch = useDispatch();

  useEffect(() => {
    if (activePage) {
      dispatch(fetchAllDishes(activePage._id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const onChangeSortType = type => {
    setViewMode(pre => ({ ...pre, sortType: type }));
  };

  const DishSetting = () => (
    <Space direction='vertical'>
      <Button type='text' icon={<ArrowRightOutlined />} className='w-full text-left'>
        Chọn tất cả
      </Button>
      <Button type='text' className='w-full text-left'>
        <Checkbox
          checked={viewMode.hiddenAdded}
          onChange={() => setViewMode(pre => ({ ...pre, hiddenAdded: !viewMode.hiddenAdded }))}
        >
          Ẩn món đã thêm
        </Checkbox>
      </Button>
      <Divider className='my-1' />
      <h4>Sắp xếp theo</h4>
      <Radio.Group value={viewMode.sortType} className='flex flex-col gap-2'>
        {sortTypeList.map(option => (
          <Button key={option.value} type='text' className='text-left'>
            <Radio value={option.value} onClick={() => onChangeSortType(option.value)}>
              {option.label}
            </Radio>
          </Button>
        ))}
      </Radio.Group>
    </Space>
  );

  const renderDishList = useMemo(() => {
    let list = sortDishesByType(dishData, viewMode.sortType);
    if (viewMode.hiddenAdded) {
      list = list.filter(dish => itemList.every(item => item._id !== dish._id));
    }
    return list;
  }, [dishData, itemList, viewMode]);

  return (
    <>
      <Row gutter={32}>
        <Col span={8} className='flex gap-2'>
          <Popover placement='rightTop' content={<DishSetting />}>
            <Button icon={<MenuOutlined />} className='aspect-square' />
          </Popover>
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
          {isLoading ? (
            <Spin />
          ) : (
            renderDishList.map(dish => <MenuItem key={dish._id} data={dish} />)
          )}
        </Col>
        <Col span={16}>{menuContent.length > 0 && <MenuContent data={menuContent} />}</Col>
      </Row>
    </>
  );
};

export default MenuContentForm;
