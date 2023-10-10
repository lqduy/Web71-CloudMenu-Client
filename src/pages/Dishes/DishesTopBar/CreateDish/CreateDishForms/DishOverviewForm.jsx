import { Row, Col, Form, Input, InputNumber, Select } from 'antd';

const initialValues = {
  name: '',
  group: 1,
  area: 1,
  type: null,
  preOrder: false,
  unit: 'Phần',
  price: null
};

const DishOverviewForm = ({ form }) => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  return (
    <Form
      form={form}
      name='businessPageData'
      initialValues={initialValues}
      layout='vertical'
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label='Tên món ăn'
            name='name'
            rules={[{ required: true, message: 'Vui lòng nhập tên món ăn!' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label='Nhóm'
            name='group'
            rules={[{ required: true, message: 'Vui lòng chọn phân loại!' }]}
          >
            <Select>
              <Select.Option value={1}>Món chính</Select.Option>
              <Select.Option value={2}>Khai vị, điểm tâm</Select.Option>
              <Select.Option value={3}>Tráng miệng, ăn vặt</Select.Option>
              <Select.Option value={4}>Kem, nước uống</Select.Option>
              <Select.Option value={5}>Món chay</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label='Xuất xứ'
            name='area'
            rules={[{ required: true, message: 'Vui lòng chọn phân loại!' }]}
          >
            <Select>
              <Select.Option value={1}>Việt Nam</Select.Option>
              <Select.Option value={2}>Á Đông</Select.Option>
              <Select.Option value={3}>Phương Tây</Select.Option>
              <Select.Option value={4}>Sáng tạo</Select.Option>
              <Select.Option value={5}>Khác</Select.Option>
              <Select.Option value={6}>Không xác định</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label='Loại'
            name='type'
            rules={[{ required: true, message: 'Vui lòng chọn phân loại!' }]}
          >
            <Select>
              <Select.Option value={1}>Kho</Select.Option>
              <Select.Option value={2}>Xào</Select.Option>
              <Select.Option value={3}>Chiên</Select.Option>
              <Select.Option value={4}>Hấp</Select.Option>
              <Select.Option value={5}>Luộc</Select.Option>
              <Select.Option value={6}>Nướng</Select.Option>
              <Select.Option value={7}>Gỏi, trộn</Select.Option>
              <Select.Option value={8}>Tươi sống</Select.Option>
              <Select.Option value={9}>Khô</Select.Option>
              <Select.Option value={10}>Bánh</Select.Option>
              <Select.Option value={11}>Món nước</Select.Option>
              <Select.Option value={12}>Khác</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label='Phải đặt trước' name='preOrder'>
            <Select>
              <Select.Option value={false}>Không</Select.Option>
              <Select.Option value={true}>Có</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label='Đơn vị'
            name='unit'
            rules={[{ required: true, message: 'Vui lòng nhập đơn vị!' }]}
          >
            <Input placeholder='Phần' />
          </Form.Item>
        </Col>
        <Col span={16}>
          <Form.Item
            label='Đơn giá'
            name='price'
            rules={[
              { required: true, message: 'Vui lòng nhập đơn giá!' },
              { type: 'number', message: 'Vui lòng nhập giá trị số!' }
            ]}
          >
            <InputNumber
              formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              parser={value => value.replace(/[A-Z]|[a-z]|[$ ]|\.+/g, '')}
              controls={false}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DishOverviewForm;
