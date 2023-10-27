import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Space, Avatar, Popover, Tag } from 'antd';
import {
  QuestionCircleOutlined,
  BgColorsOutlined,
  UserOutlined,
  ShopOutlined
} from '@ant-design/icons';
import Container from '~/components/Container';
import ThemeColors from './SubMenus/ThemeColors';
import User from './SubMenus/User';
import { useCallback } from 'react';

const TopHeader = () => {
  const { currentUser } = useSelector(state => state.user);
  const { activePage } = useSelector(state => state.page);
  const { themeColor } = useSelector(state => state.view);
  const navigate = useNavigate();

  const UserButton = useCallback(
    () => (
      <Button type='text' icon={<UserOutlined />} className='flex items-center'>
        {`${currentUser.firstName} ${currentUser.lastName}`}
        <Avatar size='small' className='ml-2 align-middle bg-blue-800'>
          {currentUser.firstName.charAt(0)}
        </Avatar>
      </Button>
    ),
    [currentUser]
  );

  const ActivePageButton = useCallback(
    () => (
      <Button
        type='text'
        icon={
          <Avatar size='small' className='align-middle bg-blue-800'>
            {activePage.name.charAt(0)}
          </Avatar>
        }
        className='flex items-center'
      >
        {activePage.name}
        <Tag className='py-0.5 ml-2 mr-0 bg-[#4bac4d] text-white'>{activePage.businessType}</Tag>
      </Button>
    ),
    [activePage]
  );

  return (
    <Container>
      <div className='flex justify-between items-center h-[50px]'>
        <Link to={'/'}>CLOUD MENU</Link>
        <Space wrap>
          <Popover placement='bottomRight' content={<ThemeColors />}>
            <Button type='text' icon={<BgColorsOutlined />}>
              Chủ đề
            </Button>
          </Popover>
          <Button
            type='text'
            icon={<QuestionCircleOutlined />}
            onClick={() => navigate('/about-me')}
          >
            Giới thiệu
          </Button>
          {activePage && (
            <Button
              type='text'
              icon={<ShopOutlined />}
              style={{ backgroundColor: themeColor, color: 'white' }}
              onClick={() => navigate(`/${activePage._id}`)}
            >
              Trang kinh doanh
            </Button>
          )}
          <Popover placement='bottomRight' content={<User />}>
            {activePage && <ActivePageButton />}
            {!activePage && Object.keys(currentUser).length > 0 && <UserButton />}
          </Popover>
        </Space>
      </div>
    </Container>
  );
};

export default TopHeader;
