import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Space, Avatar, Popover, Tag } from 'antd';
import {
  QuestionCircleOutlined,
  BgColorsOutlined,
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import Container from '~/components/Container';
import ThemeColors from './SubMenus/ThemeColors';
import User from './SubMenus/User';
import { useCallback } from 'react';

const TopHeader = () => {
  const { currentUser } = useSelector(state => state.user);
  const { activePage } = useSelector(state => state.page);

  const UserButton = useCallback(
    () => (
      <Button type='text' icon={<UserOutlined />} className='flex items-center'>
        {currentUser.userName}
        <Avatar size='small' className='ml-2 align-middle bg-blue-800'>
          D
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
          <Popover placement='bottomRight' content={<ThemeColors />} trigger='click'>
            <Button type='text' icon={<BgColorsOutlined />}>
              Chủ đề
            </Button>
          </Popover>
          <Button type='text' icon={<QuestionCircleOutlined />}>
            Hỗ trợ
          </Button>
          <Button type='text' icon={<SettingOutlined />}>
            Thiết lập
          </Button>
          <Popover placement='bottomRight' content={<User />} trigger='click'>
            {activePage && Object.keys(activePage).length > 0 && <ActivePageButton />}
            {!activePage && <UserButton />}
          </Popover>
        </Space>
      </div>
    </Container>
  );
};

export default TopHeader;
