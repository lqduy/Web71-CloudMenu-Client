import { Row, Col, Form, Input, InputNumber, Select } from 'antd';
import Dish from '~/utils/data/dish';

const initialValues = {
  name: '',
  group: 'chinh',
  origin: 'vn',
  type: null,
  preOrder: false,
  sku: '',
  unit: 'Phần',
  price: null,
  note: ''
};

const DishOverviewForm = ({ form, onFinish }) => {
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
              {Dish.group.map(group => (
                <Select.Option key={group.value} value={group.value}>
                  {group.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            label='Xuất xứ'
            name='origin'
            rules={[{ required: true, message: 'Vui lòng chọn phân loại!' }]}
          >
            <Select>
              {Dish.origin.map(origin => (
                <Select.Option key={origin.value} value={origin.value}>
                  {origin.title}
                </Select.Option>
              ))}
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
              {Dish.type.map(type => (
                <Select.Option key={type.value} value={type.value}>
                  {type.title}
                </Select.Option>
              ))}
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
            label='Mã SKU'
            name='sku'
            rules={[
              { required: true, message: 'Vui lòng nhập mã SKU!' },
              { pattern: /^[a-zA-Z0-9]{4,12}$/, message: 'Dài 4-12, không ký tự đặc biệt' }
            ]}
            validateDebounce={600}
          >
            <Input placeholder='VD: CANHCHUA' />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            label='Đơn vị'
            name='unit'
            rules={[{ required: true, message: 'Vui lòng nhập đơn vị!' }]}
          >
            <Input placeholder='Phần' />
          </Form.Item>
        </Col>
        <Col span={8}>
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

      <Form.Item label='Ghi chú' name='note'>
        <Input placeholder='Nguyên liệu, khẩu vị, thời gian chế biến...' />
      </Form.Item>
    </Form>
  );
};

export default DishOverviewForm;
