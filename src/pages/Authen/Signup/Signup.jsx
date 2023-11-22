import { LockOutlined, UserOutlined, MailOutlined, MobileOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, InputNumber, message } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import AuthenAPI from '~/services/authenAPI';
import { PATH } from '~/routes';
import { useId } from 'react';

const Signup = () => {
  const navigate = useNavigate();
  const MESSAGE_KEY = useId();

  const handleSignup = async formValue => {
    message.loading({ key: MESSAGE_KEY, content: 'Đang tạo tài khoản...' });
    const { isAgreed, ...signupValue } = formValue;
    if (!isAgreed) return;
    try {
      await AuthenAPI.signup(signupValue);
      message.destroy(MESSAGE_KEY);
      navigate('/login');
    } catch (err) {
      message.destroy(MESSAGE_KEY);
      message.error(err.message);
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Form name='normal_login' className='flex flex-col gap-2' onFinish={handleSignup}>
          <h1 className='text-gray-800 font-bold text-3xl mb-1'>Đăng ký</h1>
          <p className='text-sm font-normal text-gray-600 mb-4'>
            Tạo ngay tài khoản để quản lý nhà hàng của bạn tốt hơn!
          </p>

          <Form.Item
            name='lastName'
            rules={[{ required: true, message: 'Hãy nhập họ và tên đệm!' }]}
          >
            <Input
              prefix={<UserOutlined className='mr-2' />}
              placeholder='Họ và tên đệm'
              className='h-11'
            />
          </Form.Item>

          <Form.Item
            name='firstName'
            rules={[{ required: true, message: 'Hãy nhập tên của bạn!' }]}
          >
            <Input
              prefix={<UserOutlined className='mr-2' />}
              placeholder='Tên của bạn'
              className='h-11'
            />
          </Form.Item>

          <Form.Item
            name='email'
            rules={[
              { required: true, message: 'Hãy điền Email của bạn!' },
              { type: 'email', message: 'Nhập chính xác địa chỉ email' }
            ]}
            validateDebounce={600}
          >
            <Input
              prefix={<MailOutlined className='mr-2' />}
              placeholder='Email'
              className='h-11'
            />
          </Form.Item>

          <Form.Item
            name='phoneNumber'
            rules={[{ required: true, message: 'Hãy nhập số điện thoại của bạn!' }]}
          >
            <InputNumber
              controls={false}
              prefix={<MobileOutlined className='mr-2' />}
              placeholder='Số điện thoại'
              className='flex items-center h-11 w-full'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              { required: true, message: 'Hãy điền mật khẩu!' },
              {
                pattern:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()._-])[A-Za-z\d@$!%*#?&^()._-]{8,24}$/,
                message: 'Dài 8-24, chứa đủ chữ thường, chữ hoa, ký tự đặc biệt'
              }
            ]}
            validateDebounce={600}
          >
            <Input.Password
              prefix={<LockOutlined className='mr-2' />}
              type='password'
              placeholder='Mật khẩu'
              className='h-11'
            />
          </Form.Item>

          <Form.Item name='isAgreed' valuePropName='checked' noStyle>
            <Checkbox>Tôi đã đọc và đồng ý Điều khoản và chính sách sử dụng</Checkbox>
          </Form.Item>

          <Button
            className='h-11 bg-[#F98616] text-white font-bold hover:bg-yellow-400 hover:text-black '
            htmlType='submit'
          >
            Đăng ký
          </Button>
        </Form>

        <p className='mt-2'>
          Bạn đã có tài khoản?{' '}
          <Link to={PATH.LOGIN} className='text-blue-400 hover:no-underline'>
            Đăng nhập
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
