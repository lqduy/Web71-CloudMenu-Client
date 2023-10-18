import { LockOutlined, UserOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

const Signup = () => {
  return (
    <Form
      name='normal_login'
      className='flex flex-col gap-2'
      initialValues={{
        remember: true
      }}
    >
      <h1 className='text-gray-800 font-bold text-2xl mb-1'>Đăng Ký</h1>
      <p className='text-sm font-normal text-gray-600 mb-4'>
        Tạo ngay tài khoản để quản lý nhà hàng của bạn tốt hơn !
      </p>
      <Form.Item name='fullName' rules={[{ required: true, message: 'Hãy nhập họ tên của bạn!' }]}>
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Nhập họ tên'
        />
      </Form.Item>
      <Form.Item
        name='mobileNumber'
        rules={[{ required: true, message: 'Hãy nhập số điện thoại của bạn!' }]}
      >
        <Input
          prefix={<MobileOutlined className='site-form-item-icon' />}
          placeholder='Nhập số điện thoại'
        />
      </Form.Item>
      <Form.Item name='password' rules={[{ required: true, message: 'Hãy điền Mật khẩu!' }]}>
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Nhập mật khẩu'
        />
      </Form.Item>
      <Form.Item name='email' rules={[{ required: true, message: 'Hãy điền Email của bạn!' }]}>
        <Input
          prefix={<MailOutlined className='site-form-item-icon' />}
          type='email'
          placeholder='Email'
        />
      </Form.Item>

      <Form.Item valuePropName='remember' noStyle>
        <Checkbox>Tôi đã đọc và đồng ý Điều khoản và chính sách sử dụng.</Checkbox>
      </Form.Item>

      <Button
        className='w-fit bg-[#F98616] text-white font-bold hover:bg-yellow-400 hover:text-black '
        htmlType='submit'
      >
        Đăng ký
      </Button>
    </Form>
  );
};

export default Signup;
