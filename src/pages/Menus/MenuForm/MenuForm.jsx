import { useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { Button, Modal, Tabs, message } from 'antd';
import { CheckOutlined, SaveOutlined } from '@ant-design/icons';
import MenuContentForm from './FormParts/MenuContentForm';
import MenuDesignForm from './FormParts/MenuDesignForm';
import MenusAPI from '~/services/menuAPI';

const MenuForm = ({ isModalOpen, handleCancel, handleReload }) => {
  const { currentUser } = useSelector(state => state.user);
  const { activePage } = useSelector(state => state.page);
  const { menuContent, itemList } = useSelector(state => state.menu);
  const [form] = useForm();

  const handleSaveMenu = async value => {
    const priceAverage = itemList.reduce((sum, item) => sum + item.price, 0) / itemList.length;
    try {
      const menuContentData = {
        name: value.name,
        userId: currentUser._id,
        pageId: activePage._id,
        priceAverage,
        dishQuantity: itemList.length,
        content: menuContent
      };
      await MenusAPI.create(menuContentData);
      message.success('Đã lưu thực đơn');
      handleCancel();
      form.resetFields();
      handleReload();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const items = [
    {
      key: '1',
      label: 'Chọn món',
      children: <MenuContentForm form={form} onFinish={handleSaveMenu} />
    },
    {
      key: '2',
      label: 'Thiết kế',
      children: <MenuDesignForm />
    }
  ];

  const buttonGroup = (
    <div className='flex gap-1'>
      <Button key='save' icon={<SaveOutlined />} type='primary' onClick={() => form.submit()}>
        Lưu
      </Button>
      <Button key='apply' icon={<CheckOutlined />} type='primary' onClick={handleSaveMenu}>
        Lưu và áp dụng
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        title='TẠO THỰC ĐƠN MỚI'
        open={isModalOpen}
        onCancel={handleCancel}
        maskClosable={false}
        width='70%'
        className='min-w-[1180px]'
        footer={false}
      >
        <Tabs defaultActiveKey='1' items={items} type='card' tabBarExtraContent={buttonGroup} />
      </Modal>
    </>
  );
};

export default MenuForm;
