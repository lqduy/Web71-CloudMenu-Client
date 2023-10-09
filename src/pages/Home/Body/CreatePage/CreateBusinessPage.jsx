import { useState } from 'react';
import { Row, Col, Button, Modal, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const CreateBusinessPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
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
        okText='Tạo'
        cancelText='Hủy'
        onOk={() => form.submit()}
        onCancel={handleCancel}
        maskClosable={false}
        width={600}
      >
        <Form
          form={form}
          name='basic'
          layout='vertical'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label='Tên gian hàng'
                name='username'
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Loại hình'
                name='type'
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Select defaultValue={'restaurant'}>
                  <Select.Option value='restaurant'>Nhà hàng</Select.Option>
                  <Select.Option value='restaurant1'>Quán ăn</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label='Mặn/Chay'
                name='isVagan'
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Select defaultValue={false}>
                  <Select.Option value={false}>Mặn</Select.Option>
                  <Select.Option value={true}>Chay</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Thức uống cồn'
                name='hasBeer'
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Select defaultValue={false}>
                  <Select.Option value={true}>Có</Select.Option>
                  <Select.Option value={false}>Không</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Phục vụ'
                name='order'
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Select mode='multiple' defaultValue={'direct'}>
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
            className='mb-2'
          >
            <Input />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label='Tỉnh/Thành phố'
                name='province'
                rules={[{ required: true, message: 'Please input your username!' }]}
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
                rules={[{ required: true, message: 'Please input your username!' }]}
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
                name='type'
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Select>
                  <Select.Option value='restaurant'>Nhà hàng</Select.Option>
                  <Select.Option value='restaurant1'>Quán ăn</Select.Option>
                  <Select.Option value='restaurant2'>Quầy</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label='Điện thoại'
            name='phoneNumber'
            rules={[{ required: true, message: 'Please input your password!' }]}
            className='mb-2'
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateBusinessPage;
