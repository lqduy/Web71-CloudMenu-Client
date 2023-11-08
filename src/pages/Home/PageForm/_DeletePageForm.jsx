import { Button, Form, Input, message, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reloadUser } from '~/redux/user/userSlice';
import PageAPI from '~/services/pageAPI';

const DeletePageForm = ({ handleCancel }) => {
  const [form] = Form.useForm();
  const { activePage } = useSelector(state => state.page);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const MESSAGE_KEY = 'delete-page-loading';

  const handleDeletePage = async value => {
    message.loading({ key: MESSAGE_KEY, content: 'Đang xóa trang' });
    try {
      const response = await PageAPI.delete(activePage._id, value);
      navigate('/');
      handleCancel();
      dispatch(reloadUser());
      message.destroy(MESSAGE_KEY);
      message.success(response.data.message);
    } catch (err) {
      message.destroy(MESSAGE_KEY);
      message.error(err.message);
      form.resetFields();
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <Popconfirm
      title='Xóa trang kinh doanh'
      description={
        <Form form={form} onFinish={handleDeletePage} className='w-72'>
          <div className='my-4'>
            <p className='mb-0'>Trang đã xóa không thể khôi phục</p>
            <p>Nhập mật khẩu để xóa</p>
          </div>
          <Form.Item
            name='password'
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
          >
            <Input.Password type='text' />
          </Form.Item>
        </Form>
      }
      onConfirm={() => form.submit()}
      cancelText='Đóng'
      okText='Xóa'
      okButtonProps={{ danger: true }}
    >
      <div className='text-right'>
        <Button danger>Xóa trang</Button>
      </div>
    </Popconfirm>
  );
};

export default DeletePageForm;
