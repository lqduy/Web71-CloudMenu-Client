import { useState, useEffect } from 'react';
import { Tabs, Button, Modal, Form, message } from 'antd';
import DishOverviewForm from './FormParts/DishOverviewForm';
import DishDescriptionForm from './FormParts/DishDescriptionForm';
import DishesAPI from '~/services/dishAPI';
import DishImageForm from './FormParts/DishImageForm';
import DishDefault from '~/assets/layouts/dish-default.png';

const initalImageList = [
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: DishDefault
  }
];

const DishForm = ({ isModalOpen, closeModal, editingDish, resetEditing, toReload }) => {
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imageList, setImageList] = useState(initalImageList);
  const [form] = Form.useForm();

  useEffect(() => {
    const fieldData = () => {
      if (!editingDish) return;
      const description = editingDish.description;
      setDescriptionValue(description);
      form.setFieldsValue({
        name: editingDish.name,
        group: editingDish.group,
        origin: editingDish.origin,
        type: editingDish.type,
        preOrder: editingDish.preOrder,
        sku: editingDish.sku,
        unit: editingDish.unit,
        price: editingDish.price
      });
    };
    fieldData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingDish]);

  const handleCancel = () => {
    form.resetFields();
    closeModal();
    if (editingDish) {
      resetEditing();
    }
  };

  const handleResetForm = () => {
    form.resetFields();
    setDescriptionValue('');
    setImageList(initalImageList);
  };

  const onFinish = async values => {
    const dishData = { ...values, description: descriptionValue, images: imageList };
    if (!editingDish) {
      try {
        await DishesAPI.create(dishData);
        message.success('Tạo món thành công');
        handleResetForm();
        closeModal();
        toReload();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    } else {
      try {
        await DishesAPI.update(editingDish._id, dishData);
        message.success('Cập nhật thành công');
        handleResetForm();
        closeModal();
        toReload();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
      }
    }
  };

  const items = [
    {
      key: '1',
      label: 'Thông tin',
      children: <DishOverviewForm form={form} onFinish={onFinish} />
    },
    {
      key: '2',
      label: 'Hình ảnh',
      children: (
        <DishImageForm
          fileList={imageList}
          handleChange={({ fileList: newFileList }) => setImageList(newFileList)}
        />
      )
    },
    {
      key: '3',
      label: 'Mô tả chi tiết',
      children: <DishDescriptionForm value={descriptionValue} handleChange={setDescriptionValue} />
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
            {editingDish ? 'Cập nhật' : 'Tạo mới'}
          </Button>
        ]}
      >
        <Tabs defaultActiveKey='1' items={items} />
      </Modal>
    </>
  );
};

export default DishForm;
