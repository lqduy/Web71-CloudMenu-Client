import { Fragment, useMemo } from 'react';
import { Checkbox, Collapse, Divider, Form, Radio } from 'antd';
import Search from 'antd/es/input/Search';
import { SORT_TYPE } from '~/utils/constants';
import Dish from '~/utils/data/dish';

const DishesAsideBar = () => {
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
    <Form layout='vertical' className='flex flex-col gap-4'>
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
              <Form.Item className='flex flex-col gap-4 mb-0'>
                <Radio.Group className='flex flex-col gap-2'>
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
              <Form.Item className='mb-0'>
                <Checkbox.Group options={groupOptions} className='flex flex-col gap-2' />
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
              <Form.Item className='mb-0'>
                <Checkbox.Group options={originOptions} className='flex flex-col gap-2' />
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
              <Form.Item className='mb-0'>
                <Checkbox.Group options={typeOptions} className='flex flex-col gap-2' />
              </Form.Item>
            )
          }
        ]}
      />
    </Form>
  );
};

export default DishesAsideBar;
