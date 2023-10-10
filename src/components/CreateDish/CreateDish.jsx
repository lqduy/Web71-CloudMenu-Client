import { useState, useEffect } from 'react';
import { Tabs, Button, Modal, Form } from 'antd';
import DishOverviewForm from './CreateDishForms/DishOverviewForm';
import DescriptionForm from './CreateDishForms/DescriptionForm';

const CreateDish = ({ isModalOpen, closeModal, editing }) => {
  const [descriptionValue, setDescriptionValue] = useState('');
  const [form] = Form.useForm();

  useEffect(() => {
    if (!editing) return;
    const description = editing.description;
    setDescriptionValue(description);
    form.setFieldsValue({
      name: editing.name,
      group: editing.group,
      origin: editing.origin,
      type: editing.type,
      preOrder: editing.preOrder,
      sku: editing.sku,
      unit: editing.unit,
      price: editing.price
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing]);

  const handleCancel = () => {
    form.resetFields();
    closeModal();
  };

  const handleResetForm = () => {
    form.resetFields();
    setDescriptionValue('');
  };

  const onFinish = values => {
    console.log(descriptionValue);
    const inputValue = { ...values, description: descriptionValue };
    console.log(inputValue);
  };

  const items = [
    {
      key: '1',
      label: 'Thông tin',
      children: <DishOverviewForm form={form} onFinish={onFinish} editing={editing} />
    },
    {
      key: '2',
      label: 'Hình ảnh',
      children: 'Content of Tab Pane 3'
    },
    {
      key: '3',
      label: 'Mô tả chi tiết',
      children: <DescriptionForm value={descriptionValue} handleChange={setDescriptionValue} />
    }
  ];

  return (
    <>
      <Modal
        title='Thêm món ăn'
        open={isModalOpen}
        onOk={() => form.submit()}
        onCancel={handleCancel}
        maskClosable={false}
        width={680}
        footer={[
          <Button key='cancel' onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key='reset' onClick={handleResetForm}>
            Điền lại
          </Button>,
          <Button key='create' type='primary' onClick={() => form.submit()}>
            {editing ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        ]}
      >
        <Tabs
          defaultActiveKey='1'
          items={items}
          onChange={key => {
            console.log(key);
          }}
        />
      </Modal>
    </>
  );
};

export default CreateDish;
