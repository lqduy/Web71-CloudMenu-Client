import { useState } from 'react';
import { Row, Col, Tabs, Button, Modal, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import DishOverviewForm from './CreateDishForms/DishOverviewForm';

const initialValues = {
  brandName: '',
  businessType: 'restaurant',
  isVegetarian: false,
  hasAlcoholic: false,
  orderWays: ['direct'],
  address: '',
  province: '',
  district: '',
  ward: '',
  phoneNumber: '',
  email: ''
};

const CreateDish = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const items = [
    {
      key: '1',
      label: 'Thông tin',
      children: <DishOverviewForm form={form} />
    },
    {
      key: '2',
      label: 'Mô tả chi tiết',
      children: 'Content of Tab Pane 2'
    },
    {
      key: '3',
      label: 'Thành phần',
      children: 'Content of Tab Pane 3'
    }
  ];

  return (
    <>
      <Button type='primary' icon={<PlusOutlined />} className='h-9' onClick={showModal}>
        Thêm mới
      </Button>

      <Modal
        title='Thêm món ăn'
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        maskClosable={false}
        width={680}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key='reset' onClick={() => form.resetFields()}>
            Điền lại
          </Button>,
          <Button key='create' type='primary' onClick={() => form.submit()}>
            Xác nhận
          </Button>
        ]}
      >
        <Tabs
          defaultActiveKey='1'
          items={items}
          onChange={key => {
            console.log(key);
          }}
        />
      </Modal>
    </>
  );
};

export default CreateDish;
