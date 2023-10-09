import { Button, Space } from 'antd';
import { UserOutlined, ShopOutlined, LogoutOutlined } from '@ant-design/icons';

const User = () => {
  return (
    <Space direction='vertical'>
      <Button type='text' icon={<UserOutlined />} style={{ textAlign: 'left', width: '100%' }}>
        Tài khoản
      </Button>
      <Button type='text' icon={<ShopOutlined />} style={{ textAlign: 'left', width: '100%' }}>
        Quản lý gian hàng
      </Button>
      <Button type='text' danger icon={<LogoutOutlined />} style={{ textAlign: 'left', width: '100%' }}>
        Đăng xuất
      </Button>
    </Space>
  );
};

export default User;
