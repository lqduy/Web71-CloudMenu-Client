import React from 'react';
import { LockOutlined, UserOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, InputNumber, Select } from 'antd';
import Logo from '../../../image/Kios/Kios_dark.png';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className='h-screen md:flex'>
      <div className='relative overflow-hidden md:flex w-2/5 bg-gradient-to-tr from-orange-500 to-yellow-400 i justify-around items-center hidden'>
        <div>
          <img className='w-20' src={Logo} />
          <h1 className='text-white font-bold text-4xl font-sans'>Quản lý dễ dàng</h1>
          <h1 className='text-white font-bold text-4xl font-sans'>Bán hàng đơn giản</h1>
          <Link
            to='/'
            type='submit'
            className='block text-center w-28 bg-white text-[#F98416] hover:text-black hover:bg-[#b6600e] mt-4 py-2 rounded-2xl font-bold mb-2'
          >
            Trang Chủ
          </Link>
        </div>
      </div>
      <div className='flex md:w-3/5 justify-center py-10 items-center bg-white'>
        <Form
          name='normal_login'
          className='login-form'
          // style={{ maxWidth: 700 }}
          initialValues={{
            remember: true
          }}
        >
          <h1 className='text-gray-800 font-bold text-2xl mb-1'>Đăng Ký</h1>
          <p className='text-sm font-normal text-gray-600 mb-7'>
            Tạo ngay tài khoản để quản lý nhà hàng của bạn tốt hơn !
          </p>
          <Form.Item
            name='fullName'
            rules={[
              {
                required: true,
                message: 'Hãy nhập họ tên của bạn!'
              }
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Nhập họ tên'
            />
          </Form.Item>
          <Form.Item
            name='mobileNumber'
            rules={[
              {
                required: true,
                message: 'Hãy nhập số điện thoại của bạn!'
              }
            ]}
          >
            <Input
              prefix={<MobileOutlined className='site-form-item-icon' />}
              placeholder='Nhập số điện thoại'
            />
          </Form.Item>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Hãy điền Mật khẩu!'
              }
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Nhập mật khẩu'
            />
          </Form.Item>
          <Form.Item
            name='email'
            rules={[
              {
                required: true,
                message: 'Hãy điền Email của bạn!'
              }
            ]}
          >
            <Input
              prefix={<MailOutlined className='site-form-item-icon' />}
              type='email'
              placeholder='Email'
            />
          </Form.Item>

          <Form.Item>
            <Form.Item name='remember' noStyle>
              <Checkbox>Tôi đã đọc và đồng ý Điều khoản và chính sách sử dụng !</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              className='bg-[#F98616] text-white font-bold  hover:bg-yellow-400 hover:text-black '
              htmlType='submit'
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
