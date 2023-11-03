import { Button, Divider, Popover, Space, Tag, message, Modal, QRCode } from 'antd';
import {
  UserOutlined,
  ShopOutlined,
  LogoutOutlined,
  SyncOutlined,
  PlusOutlined,
  PictureOutlined,
  QrcodeOutlined,
  LinkOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import UserAPI from '~/services/userAPI';
import { logout, reloadUser, setOpenEditProfile } from '~/redux/user/userSlice';
import { setOpenPageCreateForm, setEditPage } from '~/redux/page/pageSlice';
import { useState } from 'react';

const User = () => {
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);
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

  const onClickEditPage = () => {
    dispatch(setEditPage());
    dispatch(setOpenPageCreateForm());
  };

  const ChangeActivist = () => (
    <div className='flex flex-col'>
      <h3 className='mb-4'>Hoạt động với tư cách</h3>
      <div className='flex flex-col gap-2'>
        {activePage && (
          <>
            <Button
              type='text'
              icon={<UserOutlined />}
              className='flex items-center text-left'
              onClick={() =>
                handleChangeActivist(null, `${currentUser.firstName} ${currentUser.lastName}`)
              }
            >
              <div className='flex justify-between items-center gap-4 w-full h-full'>
                {`${currentUser.firstName} ${currentUser.lastName}`}
                <Tag className='py-0.5 mr-0 bg-[#F97316] text-white'>Cá nhân</Tag>
              </div>
            </Button>
            {pageList.length > 1 && <Divider className='my-1' />}
          </>
        )}
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
                <Tag className='py-0.5 mr-0 bg-[#4bac4d] text-white'>{page.businessType}</Tag>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );

  const QRCodeModal = () => (
    <Modal
      title='Mã QR của trang'
      open={isQRCodeOpen}
      cancelText='Đóng'
      onCancel={() => setIsQRCodeOpen(false)}
      footer={null}
    >
      <div className='flex flex-col items-center gap-4'>
        <QRCode
          value={`http://web71-cloud-menu-client.onrender.com/${activePage._id}`}
          icon={activePage.avatar[0]}
        />
        <div className='flex flex-col items-center'>
          <p className='mb-0 mt-2'>{activePage.businessType}</p>
          <h4 className='m-0 text-xl'>{activePage.name}</h4>
        </div>
        <div className='flex items-center gap-2'>
          <LinkOutlined />
          <p className='mb-0'>{`web71-cloud-menu-client.onrender.com/${activePage._id}`}</p>
        </div>
      </div>
    </Modal>
  );

  return (
    <>
      <Space direction='vertical'>
        {pageList.length > 0 && (
          <Popover placement='leftTop' content={<ChangeActivist />}>
            <Button type='text' icon={<SyncOutlined />} className='w-full text-left'>
              Chuyển đổi
            </Button>
          </Popover>
        )}
        <Button
          type='text'
          icon={<PlusOutlined />}
          className='w-full text-left'
          onClick={() => dispatch(setOpenPageCreateForm())}
        >
          Tạo trang mới
        </Button>
        <Divider className='my-1' />
        <Button
          type='text'
          icon={<UserOutlined />}
          className='w-full text-left'
          onClick={() => dispatch(setOpenEditProfile())}
        >
          Tài khoản
        </Button>
        {activePage && (
          <>
            <Button
              type='text'
              icon={<ShopOutlined />}
              className='w-full text-left'
              onClick={onClickEditPage}
            >
              Quản lý gian hàng
            </Button>
            <Button
              type='text'
              icon={<QrcodeOutlined />}
              className='w-full text-left'
              onClick={() => setIsQRCodeOpen(true)}
            >
              Mã QR
            </Button>
          </>
        )}
        <Button type='text' icon={<PictureOutlined />} className='w-full text-left'>
          Đa phương tiện
        </Button>
        <Button
          type='text'
          danger
          icon={<LogoutOutlined />}
          style={{ textAlign: 'left', width: '100%' }}
          onClick={() => dispatch(logout())}
        >
          Đăng xuất
        </Button>
      </Space>

      {/* QRCode Modal */}
      {activePage && <QRCodeModal />}
    </>
  );
};

export default User;
