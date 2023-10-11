import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Space, Input, Button } from 'antd';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
const DishImageForm = ({ fileList, handleChange }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Space.Compact block size='middle' className='mb-8'>
        <Input
          style={{
            width: '100%'
          }}
          placeholder='Lấy ảnh bằng đường link'
        />
        <Button type='primary'>Chọn</Button>
      </Space.Compact>
      <Upload
        action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt='example'
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};
export default DishImageForm;
