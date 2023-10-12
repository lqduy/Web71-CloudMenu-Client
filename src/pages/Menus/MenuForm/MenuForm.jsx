import { Button, Modal, Tabs } from 'antd';
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
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key='reset'>Điền lại</Button>,
          <Button key='create' type='primary' onClick={() => form.submit()}>
            Tạo
          </Button>
        ]}
      >
        <Tabs defaultActiveKey='1' items={items} />
      </Modal>
    </>
  );
};

export default MenuForm;
