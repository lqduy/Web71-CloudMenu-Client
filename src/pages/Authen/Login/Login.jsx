import { useEffect, useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Divider, Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthenAPI from '~/services/authenAPI';
import { fetchCurrentUser } from '~/redux/user/userActions';
import { TOKEN_TYPES } from '~/utils/constants';
import { PATH } from '~/routes';
import FacebookLogo from '~/assets/layouts/facebook-logo.webp';
import GoogleLogo from '~/assets/layouts/google-logo.webp';

const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [errowMessage, setErrowMessage] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading && !errowMessage) return;
    messageApi.open({
      key: 'login',
      type: isLoading ? 'loading' : 'error',
      content: isLoading ? 'Đang đăng nhập...' : errowMessage
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, errowMessage]);

  const handleLogin = async formValue => {
    setIsLoading(true);
    setErrowMessage(null);
    try {
      const response = await AuthenAPI.login(formValue);
      const accessToken = response.data.accessToken;

      if (accessToken) {
        localStorage.setItem(TOKEN_TYPES.ACCESS_TOKEN, accessToken);
        await dispatch(fetchCurrentUser());
        navigate('/');
      }
    } catch (error) {
      setErrowMessage(error.message);
      // eslint-disable-next-line no-console
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <div className='flex flex-col gap-4'>
        <Form name='normal_login' className='flex flex-col gap-2' onFinish={handleLogin}>
          <h1 className='text-gray-800 font-bold text-3xl mb-1'>Đăng nhập</h1>
          <p className='text-sm font-normal text-gray-600 mb-4'>
            Đăng nhập để trải nghiệm dịch vụ tuyệt vời
          </p>

          <Form.Item name='email' rules={[{ required: true, message: 'Hãy điền Email của bạn!' }]}>
            <Input
              prefix={<MailOutlined className='mr-2' />}
              type='email'
              placeholder='Email'
              className='h-11'
            />
          </Form.Item>

          <Form.Item name='password' rules={[{ required: true, message: 'Hãy điền Mật khẩu!' }]}>
            <Input.Password
              prefix={<LockOutlined className='mr-2' />}
              type='password'
              placeholder='Nhập mật khẩu'
              className='h-11'
            />
          </Form.Item>

          <Button
            htmlType='submit'
            className='w-full h-11 bg-[#F98616] text-white font-bold  hover:bg-yellow-400 hover:text-black '
          >
            Đăng nhập
          </Button>
        </Form>

        <p className='mt-2'>
          Bạn chưa có tài khoản?{' '}
          <Link to={PATH.SIGNUP} className='text-blue-400 hover:no-underline'>
            Đăng ký
          </Link>
        </p>

        <Divider style={{ margin: '0' }}>HOẶC</Divider>

        <div className='flex flex-col gap-4'>
          <Button className='flex justify-start items-center gap-2 h-11'>
            <img src={GoogleLogo} alt='Login with Google' className='h-8 text-left' />
            Đăng nhập với Google
          </Button>
          <Button className='flex justify-start items-center gap-2 h-11'>
            <img src={FacebookLogo} alt='Login with Facebook' className='h-8 text-left' />
            Đăng nhập với Facebook
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
