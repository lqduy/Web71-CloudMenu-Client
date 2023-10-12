import { Button, Modal, Tabs } from 'antd';
import { CheckOutlined, SaveOutlined } from '@ant-design/icons';
import MenuContentForm from './FormParts/MenuContentForm';
import MenuDesignForm from './FormParts/MenuDesignForm';

const MenuForm = ({ form, isModalOpen, handleCancel }) => {
  const items = [
    {
      key: '1',
      label: 'Chọn món',
      children: <MenuContentForm />
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
      <Button key='apply' icon={<CheckOutlined />} type='primary' onClick={() => form.submit()}>
        Lưu và áp dụng
      </Button>
    </div>
  );

  return (
    <>
      <Modal
        title='TẠO THỰC ĐƠN MỚI'
        open={isModalOpen}
        onOk={() => form.submit()}
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
