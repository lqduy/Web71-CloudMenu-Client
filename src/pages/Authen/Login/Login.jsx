import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthenAPI from '~/services/authenAPI';
import { fetchCurrentUser } from '~/redux/user/userActions';
import { TOKEN_TYPES } from '~/utils/constants';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async formValue => {
    try {
      const response = await AuthenAPI.login(formValue);
      const accessToken = response.data.accessToken;

      if (accessToken) {
        localStorage.setItem(TOKEN_TYPES.ACCESS_TOKEN, accessToken);
        await dispatch(fetchCurrentUser());
        navigate('/');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <Form name='normal_login' onFinish={handleLogin}>
      <h1 className='text-gray-800 font-bold text-2xl mb-1'>Đăng Nhập</h1>
      <p className='text-sm font-normal text-gray-600 mb-7'>Đăng nhập vào hệ thống !</p>

      <Form.Item name='email' rules={[{ required: true, message: 'Hãy điền Email của bạn!' }]}>
        <Input prefix={<MailOutlined />} type='email' placeholder='Email' />
      </Form.Item>

      <Form.Item name='password' rules={[{ required: true, message: 'Hãy điền Mật khẩu!' }]}>
        <Input prefix={<LockOutlined />} type='password' placeholder='Nhập mật khẩu' />
      </Form.Item>

      <Button
        className='w-full bg-[#F98616] text-white font-bold  hover:bg-yellow-400 hover:text-black '
        htmlType='submit'
      >
        Đăng nhập
      </Button>
    </Form>
  );
};

export default Login;
