import { LockOutlined, UserOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import AuthenAPI from '~/services/authenAPI';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = async formValue => {
    const { isAgreed, ...signupValue } = formValue;
    if (!isAgreed) return;
    try {
      await AuthenAPI.signup(signupValue);
      navigate('/login');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <Form name='normal_login' className='flex flex-col gap-2' onFinish={handleSignup}>
      <h1 className='text-gray-800 font-bold text-2xl mb-1'>Đăng ký</h1>
      <p className='text-sm font-normal text-gray-600 mb-4'>
        Tạo ngay tài khoản để quản lý nhà hàng của bạn tốt hơn!
      </p>

      <Form.Item name='lastName' rules={[{ required: true, message: 'Hãy nhập họ và tên đệm!' }]}>
        <Input prefix={<UserOutlined />} placeholder='Nhập họ và tên đệm' />
      </Form.Item>

      <Form.Item name='firstName' rules={[{ required: true, message: 'Hãy nhập tên của bạn!' }]}>
        <Input prefix={<UserOutlined />} placeholder='Nhập tên' />
      </Form.Item>

      <Form.Item
        name='email'
        rules={[
          { required: true, message: 'Hãy điền Email của bạn!' },
          { type: 'email', message: 'Nhập chính xác địa chỉ email' }
        ]}
        validateDebounce={600}
      >
        <Input prefix={<MailOutlined />} placeholder='Email' />
      </Form.Item>

      <Form.Item
        name='phoneNumber'
        rules={[{ required: true, message: 'Hãy nhập số điện thoại của bạn!' }]}
      >
        <Input prefix={<MobileOutlined />} placeholder='Nhập số điện thoại' />
      </Form.Item>

      <Form.Item
        name='password'
        rules={[
          { required: true, message: 'Hãy điền mật khẩu!' },
          {
            pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()._-])[A-Za-z\d@$!%*#?&^()._-]{8,24}$/,
            message: 'Dài 8-24, chứa đủ chữ thường, chữ hoa, ký tự đặc biệt'
          }
        ]}
        validateDebounce={600}
      >
        <Input.Password prefix={<LockOutlined />} type='password' placeholder='Nhập mật khẩu' />
      </Form.Item>

      <Form.Item name='isAgreed' valuePropName='checked' noStyle>
        <Checkbox>Tôi đã đọc và đồng ý Điều khoản và chính sách sử dụng</Checkbox>
      </Form.Item>

      <Button
        className='bg-[#F98616] text-white font-bold hover:bg-yellow-400 hover:text-black '
        htmlType='submit'
      >
        Đăng ký
      </Button>
    </Form>
  );
};

export default Signup;
