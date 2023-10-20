import { useSelector } from 'react-redux';
import { Fragment, useMemo, useRef, useState } from 'react';
import { Button, Checkbox, Collapse, Divider, Form, Radio } from 'antd';
import Search from 'antd/es/input/Search';
import { SORT_TYPE } from '~/utils/constants';
import Dish from '~/utils/data/dish';
import { useForm } from 'antd/es/form/Form';
import sortDishesByType from '~/utils/functions/sortDishesByType';
import { SyncOutlined } from '@ant-design/icons';

const DishesAsideBar = ({ handleSetDishList }) => {
  const { dishData } = useSelector(state => state.dish);
  const [activeSeeAllBtn, setActiveSeeAllBtn] = useState(false);
  const [form] = useForm();
  const sortTypeRef = useRef(null);

  const onFinish = formValue => {
    const { group, origin, type, sortType } = formValue;
    const isSelected =
      (group && group.length > 0) || (origin && origin.length > 0) || (type && type.length > 0);
    if (isSelected) {
      setActiveSeeAllBtn(true);
    } else {
      setActiveSeeAllBtn(false);
    }

    let renderList = [...dishData];
    if (group && group.length > 0) {
      renderList = renderList.filter(dish => group.includes(dish.group));
    }
    if (origin && origin.length > 0) {
      renderList = renderList.filter(dish => origin.includes(dish.origin));
    }
    if (type && type.length > 0) {
      renderList = renderList.filter(dish => type.includes(dish.type));
    }
    if (sortType && sortType !== sortTypeRef.current) {
      renderList = sortDishesByType(renderList, sortType);
      sortTypeRef.current = sortType;
    }
    handleSetDishList(renderList);
  };

  const handleSeeAll = () => {
    form.resetFields();
    handleSetDishList(null);
    setActiveSeeAllBtn(false);
  };

  const sortOptions = [
    { label: 'Thời gian giảm', value: SORT_TYPE.N_TO_O },
    { label: 'Thời gian tăng', value: SORT_TYPE.O_TO_N },
    { label: 'Chữ cái giảm', value: SORT_TYPE.Z_TO_A },
    { label: 'Chữ cái tăng', value: SORT_TYPE.A_TO_Z },
    { label: 'Đơn giá giảm', value: SORT_TYPE.H_TO_L },
    { label: 'Đơn giá tăng', value: SORT_TYPE.L_TO_H }
  ];
  const originOptions = useMemo(
    () => Dish.origin.map(origin => ({ label: origin.title, value: origin.value })),
    []
  );
  const groupOptions = useMemo(
    () => Dish.group.map(group => ({ label: group.title, value: group.value })),
    []
  );
  const typeOptions = useMemo(
    () => Dish.type.map(type => ({ label: type.title, value: type.value })),
    []
  );

  return (
    <>
      <div className='ct-section-wrapper h-9'>
        <Button
          type='text'
          icon={<SyncOutlined />}
          disabled={!activeSeeAllBtn}
          className='w-full h-full'
          onClick={handleSeeAll}
        >
          Xem tất cả
        </Button>
      </div>
      <Form form={form} onFinish={onFinish} layout='vertical' className='flex flex-col gap-4'>
        <Form.Item
          label={<h3 className='mb-2'>Tìm kiếm</h3>}
          className='ct-section-wrapper px-4 py-3 my-0'
        >
          <Search placeholder='Tên, phân loại, SKU...' allowClear />
        </Form.Item>
        <Collapse
          ghost
          expandIconPosition='end'
          defaultActiveKey={'1'}
          className='ct-section-wrapper'
          items={[
            {
              key: '1',
              label: <h3 className='mb-0'>Sắp xếp</h3>,
              children: (
                <Form.Item name='sortType' className='flex flex-col gap-4 mb-0'>
                  <Radio.Group onChange={() => form.submit()} className='flex flex-col gap-2'>
                    {sortOptions.map((option, index) => (
                      <Fragment key={option.value}>
                        <Radio value={option.value}>{option.label}</Radio>
                        {index % 2 === 1 && index !== sortOptions.length - 1 && (
                          <Divider className='my-1' />
                        )}
                      </Fragment>
                    ))}
                  </Radio.Group>
                </Form.Item>
              )
            }
          ]}
        />
        <Collapse
          ghost
          expandIconPosition='end'
          defaultActiveKey={'1'}
          className='ct-section-wrapper'
          items={[
            {
              key: '1',
              label: <h3 className='mb-0'>Nhóm món ăn</h3>,
              children: (
                <Form.Item name='group' className='mb-0'>
                  <Checkbox.Group
                    options={groupOptions}
                    className='flex flex-col gap-2'
                    onChange={() => form.submit()}
                  />
                </Form.Item>
              )
            }
          ]}
        />
        <Collapse
          ghost
          expandIconPosition='end'
          defaultActiveKey={'1'}
          className='ct-section-wrapper'
          items={[
            {
              key: '1',
              label: <h3 className='mb-0'>Xuất xứ</h3>,
              children: (
                <Form.Item name='origin' className='mb-0'>
                  <Checkbox.Group
                    options={originOptions}
                    className='flex flex-col gap-2'
                    onChange={() => form.submit()}
                  />
                </Form.Item>
              )
            }
          ]}
        />
        <Collapse
          ghost
          expandIconPosition='end'
          defaultActiveKey={'1'}
          className='ct-section-wrapper'
          items={[
            {
              key: '1',
              label: <h3 className='mb-0'>Kiểu chế biến</h3>,
              children: (
                <Form.Item name='type' className='mb-0'>
                  <Checkbox.Group
                    options={typeOptions}
                    className='flex flex-col gap-2'
                    onChange={() => form.submit()}
                  />
                </Form.Item>
              )
            }
          ]}
        />
      </Form>
    </>
  );
};

export default DishesAsideBar;
