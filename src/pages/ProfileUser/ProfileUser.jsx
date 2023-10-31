import { LockOutlined, UserOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Space, message } from 'antd';
import { reloadUser, setOpenEditProfile } from '~/redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import UserAPI from '~/services/userAPI';
import { useEffect, useState } from 'react';
import AddressAPI from '~/services/addressAPI';
import dayjs from 'dayjs';
import UploadAvatar from '~/components/UploadAvatar/UploadAvatar';
import ChangePassword from './ChangePassword/ChangePassword';

const ProfileUser = () => {
  const { openEditProfile } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const initialValues = {
    lastName: currentUser.lastName,
    firstName: currentUser.firstName,
    email: currentUser.email,
    phoneNumber: currentUser.phoneNumber,
    gender: currentUser.gender,
    age: currentUser.age,
    province: currentUser.province,
    district: currentUser.district,
    ward: currentUser.ward,
    avatar: currentUser.avatar
  };

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [provinceData, setProvinceData] = useState([]);
  const [districtData, setDistrictData] = useState([]);
  const [wardData, setWardData] = useState([]);
  const [value, setValue] = useState(initialValues);
  const [cloudinaryUrl, setCloudinaryUrl] = useState([]);
  const [show, setShow] = useState(true);
  const [buttonType, setButtonType] = useState('text');

  const dateFormat = 'DD-MM-YYYY';

  const onChange = (date, dateString) => {
    console.log(dateString);
    setValue(prevValue => ({
      ...prevValue,
      age: dateString
    }));
  };

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

  const handleButtonClick = () => {
    setShow(!show);
  };

  const handleCancel = () => {
    form.resetFields();
    dispatch(setOpenEditProfile());
  };

  const handleChange = (field, value) => {
    setValue(prevValue => ({
      ...prevValue,
      [field]: value
    }));
  };
  const handlePhoneNumberChange = phoneNumber => {
    handleChange('phoneNumber', phoneNumber);
  };

  const handleGenderChange = gender => {
    handleChange('gender', gender);
  };

  const handleProvinceChange = province => {
    fetchDistrictData(province);
    handleChange('province', province);
  };

  const handleWardChange = ward => {
    handleChange('ward', ward);
  };

  const handleDistrictChange = district => {
    fetchWardData(district);
    handleChange('district', district);
  };

  const onClickUpdate = async () => {
    try {
      const newData = { ...currentUser, ...value, ...cloudinaryUrl };
      await UserAPI.update(currentUser._id, newData);
      dispatch(reloadUser());
      dispatch(setOpenEditProfile());
      message.success('Cập nhật thông tin thành công.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal
      title={[
        <div key='button' className='flex justify-center border-b-2 mx-6'>
          <Button
            key='profile'
            disabled={show == true}
            type='text'
            block
            onClick={handleButtonClick}
          >
            <b>Chỉnh sửa thông tin cá nhân</b>
          </Button>
          <Button
            key='changePass'
            disabled={show == false}
            type='text'
            block
            onClick={handleButtonClick}
          >
            <b>Đổi mật khẩu</b>
          </Button>
        </div>
      ]}
      open={openEditProfile}
      onOk={onClickUpdate}
      onCancel={() => dispatch(setOpenEditProfile())}
      width={900}
      footer={
        show
          ? [
              <Button key='updateProfile' type='primary' onClick={onClickUpdate}>
                Cập nhật
              </Button>,
              <Button key='cancelProfile' type='primary' danger onClick={handleCancel}>
                Huỷ bỏ
              </Button>
            ]
          : null
      }
    >
      {show ? (
        <Form
          layout='vertical'
          form={form}
          name='currentUser'
          initialValues={initialValues}
          className={`bg-white flex  items-center justify-center gap-16 mt-8 mx-auto w-11/12 py-10 font-bold`}
          onFinish={onClickUpdate}
        >
          <div className='flex flex-col items-center'>
            <Form.Item name='avatar' valuePropName='fileList'>
              <UploadAvatar setUrl={link => setCloudinaryUrl({ ...cloudinaryUrl, avatar: link })} />
            </Form.Item>
            <div className=' w-60'>
              <h2 className='text-gray-800 font-bold text-xl mb-1'>
                {`Xin chào ${currentUser.firstName} ${currentUser.lastName}  !`}
              </h2>
              <p className='text-sm font-normal text-gray-600 mb-4'>
                Bạn có thể cập nhật và thay đổi thông tin cá nhân tại đây.
              </p>
            </div>
          </div>
          <div className=' w-1/2'>
            <div className='grid grid-flow-col gap-8'>
              <Form.Item
                key='lastname'
                label='Tên :'
                name='lastName'
                rules={[{ required: true, message: 'Hãy nhập họ và tên đệm!' }]}
                className='w-36'
              >
                <Input
                  prefix={<UserOutlined className='mr-2' />}
                  placeholder='Họ và tên đệm'
                  onChange={e => setValue({ ...value, lastName: e.target.value })}
                />
              </Form.Item>

              <Form.Item
                key='fistname'
                label='Họ và tên đệm :'
                name='firstName'
                rules={[{ required: true, message: 'Hãy nhập tên của bạn!' }]}
              >
                <Input
                  prefix={<UserOutlined className='mr-2' />}
                  placeholder='Tên của bạn'
                  onChange={e => setValue({ ...value, firstName: e.target.value })}
                />
              </Form.Item>
            </div>
            <div className='grid  grid-flow-col gap-8'>
              <Form.Item
                key='gender'
                label='Giới tính:'
                name='gender'
                rules={[{ required: true, message: 'Hãy nhập ngày sinh của bạn!' }]}
                className=' w-36'
              >
                <Select onChange={handleGenderChange} placeholder='...'>
                  <Select.Option value='Nam'>Nam</Select.Option>
                  <Select.Option value='Nữ'>Nữ</Select.Option>
                  <Select.Option value='Khác'>Khác</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                key='email'
                label='Email:'
                name='email'
                rules={[
                  { required: true, message: 'Hãy điền Email của bạn!' },
                  { type: 'email', message: 'Nhập chính xác địa chỉ email' }
                ]}
                validateDebounce={600}
                // className=' w-80'
              >
                <Input
                  prefix={<MailOutlined className='mr-2' />}
                  placeholder='Email'
                  onChange={e => setValue({ ...value, email: e.target.value })}
                />
              </Form.Item>
            </div>
            <div className='grid  grid-flow-col gap-8'>
              <Form.Item
                key='age'
                label='Ngày sinh:'
                name='age'
                rules={[{ required: true, message: 'Hãy chọn ngày sinh của bạn!' }]}
                className='w-36'
              >
                <Space direction='vertical'>
                  <DatePicker
                    defaultValue={dayjs(currentUser.age, dateFormat)}
                    format={dateFormat}
                    onChange={onChange}
                  />
                </Space>
              </Form.Item>

              <Form.Item
                key='phone'
                className='col-span-5 '
                label='Số điện thoại:'
                name='phoneNumber'
                rules={[{ required: true, message: 'Hãy nhập số điện thoại của bạn!' }]}
              >
                <InputNumber
                  controls={false}
                  prefix={<MobileOutlined className='mr-2' />}
                  placeholder='Số điện thoại'
                  className='flex items-center w-full'
                  onChange={handlePhoneNumberChange}
                />
              </Form.Item>
            </div>
            <Form.Item
              label='Tỉnh/Thành phố'
              name='province'
              rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành!' }]}
            >
              <Select
                onChange={handleProvinceChange}
                placeholder='Chọn tỉnh/thành phố bạn đang sống'
              >
                {provinceData.map(province => (
                  <Select.Option key={province.province_id} value={province.province_name}>
                    {province.province_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label='Quận/Huyện :'
              name='district'
              rules={[{ required: true, message: 'Vui lòng chọn huyện quận!' }]}
            >
              <Select onChange={handleDistrictChange} placeholder='Chọn quận/huyện bạn đang sống'>
                {districtData.map(district => (
                  <Select.Option key={district.district_id} value={district.district_name}>
                    {district.district_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label='Phường/Xã :'
              name='ward'
              rules={[{ required: true, message: 'Vui lòng chọn xã phường!' }]}
            >
              <Select onChange={handleWardChange} placeholder='Chọn phường/xã bạn đang sống'>
                {wardData.map(ward => (
                  <Select.Option key={ward.ward_id} value={ward.ward_name}>
                    {ward.ward_name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Form>
      ) : null}
      {!show ? <ChangePassword /> : null}
    </Modal>
  );
};

export default ProfileUser;
