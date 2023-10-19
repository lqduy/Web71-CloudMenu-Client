/* eslint-disable indent */
import { useEffect, useMemo, useState } from 'react';
import { Row, Col, Spin, Button, Input, Form, Popover, Divider, Space, Checkbox } from 'antd';
import {
  ArrowDownOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  CloseOutlined,
  MenuOutlined,
  PlusOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDishes } from '~/redux/dish/dishActions';
import { unselectAll } from '~/redux/menu/menuSlice';
import MenuItem from '~/components/MenuItem';
import Search from 'antd/es/input/Search';
import MenuContent from '~/components/MenuContent';
import { SORT_TYPE } from '~/utils/constants';

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
      <Button
        type='text'
        icon={<SortAscendingOutlined />}
        className='w-full text-left'
        onClick={() => onChangeSortType(SORT_TYPE.A_TO_Z)}
      >
        Chữ cái tăng
      </Button>
      <Button
        type='text'
        icon={<SortDescendingOutlined />}
        className='w-full text-left'
        onClick={() => onChangeSortType(SORT_TYPE.Z_TO_A)}
      >
        Chữ cái giảm
      </Button>
      <Button
        type='text'
        icon={<ArrowUpOutlined />}
        className='w-full text-left'
        onClick={() => onChangeSortType(SORT_TYPE.L_TO_H)}
      >
        Đơn giá tăng
      </Button>
      <Button
        type='text'
        icon={<ArrowDownOutlined />}
        className='w-full text-left'
        onClick={() => onChangeSortType(SORT_TYPE.H_TO_L)}
      >
        Đơn giá giảm
      </Button>
    </Space>
  );

  const renderDishList = useMemo(() => {
    let list = [...dishData];
    switch (viewMode.sortType) {
      case SORT_TYPE.Z_TO_A: {
        list = list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      }
      case SORT_TYPE.L_TO_H: {
        list = list.sort((a, b) => a.price - b.price);
        break;
      }
      case SORT_TYPE.H_TO_L: {
        list = list.sort((a, b) => b.price - a.price);
        break;
      }
      default:
        list = list.sort((a, b) => a.name.localeCompare(b.name));
    }
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
