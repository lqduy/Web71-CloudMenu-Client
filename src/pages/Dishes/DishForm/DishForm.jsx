import { useState, useEffect } from 'react';
import { Tabs, Button, Modal, Form, message } from 'antd';
import { useSelector } from 'react-redux';
import DishOverviewForm from './FormParts/DishOverviewForm';
import DishDescriptionForm from './FormParts/DishDescriptionForm';
import DishesAPI from '~/services/dishAPI';
import DishImageForm from './FormParts/DishImageForm';

const DishForm = ({ isModalOpen, closeModal, editingDish, resetEditing, toReload }) => {
  const { currentUser } = useSelector(state => state.user);
  const { activePage } = useSelector(state => state.page);
  const [descriptionValue, setDescriptionValue] = useState('');
  const [imageList, setImageList] = useState([]);
  const [cloudinaryUrlList, setCloudinaryUrlList] = useState([]);
  const [form] = Form.useForm();
  const MESSAGE_KEY = 'post-dish-form-loading';

  useEffect(() => {
    const fieldData = () => {
      if (!editingDish) return;
      const description = editingDish.description;
      setDescriptionValue(description);

      const images = editingDish.images.map(image => ({ url: image }));
      setImageList(images);
      setCloudinaryUrlList(editingDish.images);

      form.setFieldsValue({
        name: editingDish.name,
        group: editingDish.group,
        origin: editingDish.origin,
        type: editingDish.type,
        preOrder: editingDish.preOrder,
        sku: editingDish.sku,
        unit: editingDish.unit,
        price: editingDish.price,
        note: editingDish.node
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
      setImageList([]);
    }
  };

  const handleResetForm = () => {
    form.resetFields();
    setDescriptionValue('');
    setImageList([]);
  };

  const onFinish = async values => {
    const dishData = {
      ...values,
      userId: currentUser._id,
      pageId: activePage._id,
      description: descriptionValue,
      images: cloudinaryUrlList
    };
    if (!editingDish) {
      handleCreateDish(dishData);
    } else {
      handleUpdateDish(editingDish._id, dishData);
    }
  };

  const handleCreateDish = async dishData => {
    message.loading({ key: MESSAGE_KEY, content: 'Đang tạo món...' });
    try {
      await DishesAPI.create(dishData);
      message.destroy(MESSAGE_KEY);
      message.success('Tạo món thành công');
      handleResetForm();
      closeModal();
      toReload();
    } catch (err) {
      message.destroy(MESSAGE_KEY);
      message.error('Có lỗi xảy ra, vui lòng thử lại');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleUpdateDish = async (id, dishData) => {
    message.loading({ key: MESSAGE_KEY, content: 'Đang cập nhật món...' });
    try {
      await DishesAPI.update(id, dishData);
      message.destroy(MESSAGE_KEY);
      message.success('Cập nhật món thành công');
      handleResetForm();
      closeModal();
      toReload();
    } catch (err) {
      message.destroy(MESSAGE_KEY);
      message.error('Có lỗi xảy ra, vui lòng thử lại');
      // eslint-disable-next-line no-console
      console.log(err);
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
          setCloudinaryUrlList={setCloudinaryUrlList}
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
        title={editingDish ? 'CHỈNH SỬA MÓN ĂN' : 'THÊM MÓN ĂN'}
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
        <Tabs defaultActiveKey='1' items={items} type='card' />
      </Modal>
    </>
  );
};

export default DishForm;
