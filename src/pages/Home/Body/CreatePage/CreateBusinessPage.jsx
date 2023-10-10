import { useState } from 'react';
import { Row, Col, Button, Modal, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

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

const MODAL_WIDTH = 680;

const CreateBusinessPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Button
        type='primary'
        icon={<PlusOutlined />}
        className='w-full h-11 outline outline-white'
        onClick={showModal}
      >
        Tạo trang kinh doanh
      </Button>

      <Modal
        title='TẠO TRANG KINH DOANH'
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        maskClosable={false}
        width={MODAL_WIDTH}
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
        <Form
          form={form}
          name='businessPageData'
          initialValues={initialValues}
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className='mt-8'
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label='Tên gian hàng'
                name='brandName'
                rules={[{ required: true, message: 'Please input the brand name!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Loại hình' name='businessType'>
                <Select>
                  <Select.Option value='restaurant'>Nhà hàng</Select.Option>
                  <Select.Option value='eatery'>Quán ăn</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label='Mặn/chay' name='isVegetarian'>
                <Select>
                  <Select.Option value={false}>Mặn</Select.Option>
                  <Select.Option value={true}>Chay</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Thức uống cồn' name='hasAlcoholic'>
                <Select>
                  <Select.Option value={true}>Có</Select.Option>
                  <Select.Option value={false}>Không</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Phục vụ' name='orderWays'>
                <Select mode='multiple'>
                  <Select.Option value={'direct'}>Tại chỗ</Select.Option>
                  <Select.Option value={'ship'}>Ship</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label='Địa chỉ'
            name='address'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label='Tỉnh/Thành phố'
                name='province'
                rules={[{ required: true, message: 'Please select province or city!' }]}
              >
                <Select>
                  <Select.Option value='restaurant'>Nhà hàng</Select.Option>
                  <Select.Option value='restaurant1'>Quán ăn</Select.Option>
                  <Select.Option value='restaurant2'>Quầy</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Huyện/Quận'
                name='district'
                rules={[{ required: true, message: 'Please select district!' }]}
              >
                <Select>
                  <Select.Option value='restaurant'>Nhà hàng</Select.Option>
                  <Select.Option value='restaurant1'>Quán ăn</Select.Option>
                  <Select.Option value='restaurant2'>Quầy</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Xã/Phường'
                name='ward'
                rules={[{ required: true, message: 'Please select ward!' }]}
              >
                <Select>
                  <Select.Option value='restaurant'>Nhà hàng</Select.Option>
                  <Select.Option value='restaurant1'>Quán ăn</Select.Option>
                  <Select.Option value='restaurant2'>Quầy</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label='Điện thoại'
                name='phoneNumber'
                rules={[{ required: true, message: 'Please input phone number!' }]}
              >
                <InputNumber controls={false} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Email'
                name='email'
                rules={[{ type: 'email', message: 'Please input correct email!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBusinessPage;
