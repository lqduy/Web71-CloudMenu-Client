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

const CreatePage = () => {
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
          className='mt-8'
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label='Tên kinh doanh'
                name='brandName'
                rules={[{ required: true, message: 'Vui lòng nhập tên cơ sở kinh doanh!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Loại hình' name='businessType'>
                <Select>
                  <Select.Option value='restaurant'>Nhà hàng</Select.Option>
                  <Select.Option value='eatery'>Quán ăn</Select.Option>
                  <Select.Option value='canteen'>Căng tin</Select.Option>
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
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label='Tỉnh/Thành phố'
                name='province'
                rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành!' }]}
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
                rules={[{ required: true, message: 'Vui lòng chọn huyện quận!' }]}
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
                rules={[{ required: true, message: 'Vui lòng chọn xã phường!' }]}
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
                rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
              >
                <InputNumber controls={false} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label='Email'
                name='email'
                rules={[{ type: 'email', message: 'Vui lòng nhập chính xác địa chỉ email!' }]}
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

export default CreatePage;
