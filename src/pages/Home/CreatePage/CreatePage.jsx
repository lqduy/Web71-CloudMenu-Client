import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Button, Modal, Form, Input, InputNumber, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddressAPI from '~/services/addressAPI';
import PageAPI from '~/services/pageAPI';
import { reloadPage } from '~/redux/page/pageSlice';

const initialValues = {
  name: '',
  businessType: 'Nhà hàng',
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
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProvinceData();
  }, []);

  const fetchProvinceData = async () => {
    const provinces = await AddressAPI.getProvinces();
    setProvinceData(provinces.data.results);
  };

  const fetchDistrictData = async provinceName => {
    const selectedProvince = provinceData.find(province => provinceName === province.province_name);
    const provinceId = selectedProvince.province_id;
    const districts = await AddressAPI.getDistricts(provinceId);
    setDistrictData(districts.data.results);
  };

  const fetchWardData = async districtName => {
    const selectedDistrict = districtData.find(district => districtName === district.district_name);
    const districtId = selectedDistrict.district_id;
    const wards = await AddressAPI.getWard(districtId);
    setWardData(wards.data.results);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCreatePage = async value => {
    try {
      await PageAPI.create(value);
      dispatch(reloadPage());
      handleCancel();
      message.success('Tạo trang kinh doanh thành công');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
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
          onFinish={handleCreatePage}
          className='mt-8'
        >
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                label='Tên kinh doanh'
                name='name'
                rules={[{ required: true, message: 'Vui lòng nhập tên cơ sở kinh doanh!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label='Loại hình' name='businessType'>
                <Select>
                  <Select.Option value='Nhà hàng'>Nhà hàng</Select.Option>
                  <Select.Option value='Quán ăn'>Quán ăn</Select.Option>
                  <Select.Option value='Căng tin'>Căng tin</Select.Option>
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
                <Select onChange={value => fetchDistrictData(value)}>
                  {provinceData.map(province => (
                    <Select.Option key={province.province_id} value={province.province_name}>
                      {province.province_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Huyện/Quận'
                name='district'
                rules={[{ required: true, message: 'Vui lòng chọn huyện quận!' }]}
              >
                <Select
                  disabled={districtData.length === 0}
                  onChange={value => fetchWardData(value)}
                >
                  {districtData.map(district => (
                    <Select.Option key={district.district_id} value={district.district_name}>
                      {district.district_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Xã/Phường'
                name='ward'
                rules={[{ required: true, message: 'Vui lòng chọn xã phường!' }]}
              >
                <Select disabled={wardData.length === 0}>
                  {wardData.map(ward => (
                    <Select.Option key={ward.ward_id} value={ward.ward_name}>
                      {ward.ward_name}
                    </Select.Option>
                  ))}
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
