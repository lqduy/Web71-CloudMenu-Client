import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';

const Login = () => {
  return (
    <Form
      name='normal_login'
      className='login-form'
      initialValues={{
        remember: true
      }}
    >
      <h1 className='text-gray-800 font-bold text-2xl mb-1'>Đăng Nhập</h1>
      <p className='text-sm font-normal text-gray-600 mb-7'>Đăng nhập vào hệ thống !</p>

      <Form.Item name='email' rules={[{ required: true, message: 'Hãy điền Email của bạn!' }]}>
        <Input
          prefix={<MailOutlined className='site-form-item-icon' />}
          type='email'
          placeholder='Email'
        />
      </Form.Item>

      <Form.Item name='password' rules={[{ required: true, message: 'Hãy điền Mật khẩu!' }]}>
        <Input
          prefix={<LockOutlined className='site-form-item-icon' />}
          type='password'
          placeholder='Nhập mật khẩu'
        />
      </Form.Item>

      <Form.Item>
        <Button
          className='bg-[#F98616] text-white font-bold  hover:bg-yellow-400 hover:text-black '
          htmlType='submit'
        >
          Đăng nhập
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
