import { LockOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import UserAPI from '~/services/userAPI';

const ChangePassword = () => {
  const { currentUser } = useSelector(state => state.user);
  // const [error, setError] = useState(null);
  const [form] = Form.useForm();

  const handleSubmit = async value => {
    try {
      const response = await UserAPI.changePassword(currentUser._id, value);

      // form.resetFields();
      if (!response) {
        message.error('Đổi mật khẩu thất bại, xin vui lòng thử lại');
        return;
      }
      message.success('Đổi mật khẩu thành công!');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=' flex justify-center'>
      <Form form={form} layout='vertical' className=' font-bold w-1/2 p-10' onFinish={handleSubmit}>
        <Form.Item
          label='Nhập mật khẩu cũ:'
          name='oldPassword'
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
            placeholder='Nhập mật khẩu cũ...'
            className='h-11'
          />
        </Form.Item>
        <Form.Item
          label='Nhập mật khẩu mới:'
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
            placeholder='Nhập mật khẩu mới...'
            className='h-11'
          />
        </Form.Item>
        <Form.Item
          label='Nhập lại mật khẩu mới:'
          name='newPassword'
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
            placeholder='Nhập lại mật khẩu mới...'
            className='h-11'
          />
        </Form.Item>
        <Form.Item className='flex justify-center'>
          <Button htmlType='submit' type='primary' size='large'>
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;
