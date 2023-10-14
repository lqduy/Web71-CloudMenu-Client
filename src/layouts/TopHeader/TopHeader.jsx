import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Space, Avatar, Popover, Tag } from 'antd';
import { QuestionCircleOutlined, BgColorsOutlined, SettingOutlined } from '@ant-design/icons';
import Container from '~/components/Container';
import ThemeColors from './SubMenus/ThemeColors';
import User from './SubMenus/User';

const TopHeader = () => {
  const { currentPage } = useSelector(state => state.page);

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
          {/* <Popover placement='bottomRight' content={<User />} trigger='click'>
            <Button type='text' className='flex gap-2'>
              lqduycp
              <Avatar style={{ backgroundColor: 'blue', verticalAlign: 'middle' }} size='small'>
                D
              </Avatar>
            </Button>
          </Popover> */}
          <Popover placement='bottomRight' content={<User />} trigger='click'>
            <Button
              type='text'
              icon={
                <Avatar size='small' className='align-middle bg-blue-800'>
                  T
                </Avatar>
              }
              className='flex items-center'
            >
              {currentPage.name}
              <Tag className='py-0.5 ml-2 mr-0 bg-[#4bac4d] text-white'>
                {currentPage.businessType}
              </Tag>
            </Button>
          </Popover>
        </Space>
      </div>
    </Container>
  );
};

export default TopHeader;
