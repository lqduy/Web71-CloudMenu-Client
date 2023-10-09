import { Link } from 'react-router-dom';
import { Button, Space, Avatar, Popover } from 'antd';
import { QuestionCircleOutlined, BgColorsOutlined, SettingOutlined } from '@ant-design/icons';
import Container from '~/components/Container';
import ThemeColors from './SubMenus/ThemeColors';
import User from './SubMenus/User';

const TopHeader = () => {
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
            <Button type='text' className='flex gap-2'>
              lqduycp
              <Avatar style={{ backgroundColor: 'blue', verticalAlign: 'middle' }} size='small'>
                D
              </Avatar>
            </Button>
          </Popover>
        </Space>
      </div>
    </Container>
  );
};

export default TopHeader;
