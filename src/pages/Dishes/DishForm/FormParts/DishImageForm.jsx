import { useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Space, Input, Button, Spin } from 'antd';
import MediaAPI from '~/services/mediaAPI';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const DishImageForm = ({ fileList, handleChange, setCloudinaryUrlList }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleUploadImage = async info => {
    if (info.file.status === 'removed') return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', info.file);
    try {
      const res = await MediaAPI.uploadImage(formData);
      if (res.data.url) {
        setCloudinaryUrlList(list => [...list, res.data.url]);
        handleChange(info);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = file => {
    const newList = fileList.filter(image => image.uid !== file.uid);
    handleChange({ fileList: newList });
    setCloudinaryUrlList(newList);
  };

  const uploadButton = useMemo(
    () => (
      <div>
        {!uploading && (
          <>
            <PlusOutlined />
            <div className='mt-2'>Chọn hoặc thả ảnh</div>
          </>
        )}
        {uploading && (
          <>
            <Spin />
            <div className='mt-2'>Đang tải ảnh lên</div>
          </>
        )}
      </div>
    ),
    [uploading]
  );

  return (
    <>
      <Space.Compact block size='middle' className='mb-4'>
        <Input placeholder='Lấy ảnh bằng đường link' className='w-full' />
        <Button type='primary'>Chọn</Button>
      </Space.Compact>
      <Upload.Dragger
        accept='.png,.jpe,.jpeg,.webp'
        multiple
        listType='picture-card'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleUploadImage}
        height={200}
        maxCount={8}
        style={{ marginBottom: 16 }}
        iconRender={() => <Spin></Spin>}
        onRemove={handleRemoveImage}
        beforeUpload={file => {
          return new Promise((resolve, reject) => {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (isLt2M) {
              reject('File size exceeded');
            } else {
              resolve('Success');
            }
          });
        }}
      >
        {fileList?.length >= 8 ? null : uploadButton}
      </Upload.Dragger>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='example' className='w-full' src={previewImage} />
      </Modal>
    </>
  );
};
export default DishImageForm;
