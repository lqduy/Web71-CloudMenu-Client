import { Button, Divider, Popover, Space, Tag, message } from 'antd';
import { UserOutlined, ShopOutlined, LogoutOutlined, SyncOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import UserAPI from '~/services/userAPI';
import { reloadUser } from '~/redux/user/userSlice';

const User = () => {
  const { currentUser } = useSelector(state => state.user);
  const { pageList, activePage } = useSelector(state => state.page);
  const dispatch = useDispatch();

  const handleChangeActivist = async (pageId, changedName) => {
    const updatedData = { ...currentUser, activePageId: pageId };
    try {
      await UserAPI.update(currentUser._id, updatedData);
      await dispatch(reloadUser());
      message.success(`Đổi thành ${changedName}`);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const ChangeActivist = () => (
    <div className='flex flex-col'>
      <h3 className='mb-4'>Hoạt động với tư cách</h3>
      <div className='flex flex-col gap-2'>
        <Button
          type='text'
          icon={<UserOutlined />}
          className='flex items-center text-left'
          onClick={() => handleChangeActivist(null, currentUser.userName)}
        >
          <div className='flex justify-between items-center gap-4 w-full h-full'>
            {currentUser.userName}
            <Tag className='py-0.5 mr-0 bg-[#4bac4d] text-white'>Cá nhân</Tag>
          </div>
        </Button>
        <Divider className='my-1' />
        {pageList.map(page => {
          if (page._id === activePage?._id) return null;
          return (
            <Button
              key={page._id}
              type='text'
              icon={<ShopOutlined />}
              className='flex items-center text-left'
              onClick={() => handleChangeActivist(page._id, `${page.name} (${page.businessType})`)}
            >
              <div className='flex justify-between items-center gap-4 w-full h-full'>
                {page.name}
                <Tag className='py-0.5 mr-0 bg-[#4bac4d] text-white'>
                  {page.businessType}
                </Tag>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );

  return (
    <Space direction='vertical'>
      <Popover placement='leftTop' content={<ChangeActivist />}>
        <Button type='text' icon={<SyncOutlined />} className='w-full text-left'>
          Chuyển đổi
        </Button>
      </Popover>
      <Divider className='my-1' />
      <Button type='text' icon={<UserOutlined />} style={{ textAlign: 'left', width: '100%' }}>
        Tài khoản
      </Button>
      <Button type='text' icon={<ShopOutlined />} style={{ textAlign: 'left', width: '100%' }}>
        Quản lý gian hàng
      </Button>
      <Button
        type='text'
        danger
        icon={<LogoutOutlined />}
        style={{ textAlign: 'left', width: '100%' }}
      >
        Đăng xuất
      </Button>
    </Space>
  );
};

export default User;
