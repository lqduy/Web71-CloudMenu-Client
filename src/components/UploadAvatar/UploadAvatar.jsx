import { useEffect, useMemo, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload, Spin } from 'antd';
import MediaAPI from '~/services/mediaAPI';
import { useSelector } from 'react-redux';

const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const UploadAvatar = ({ setUrl }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { activePage, isEditingPage } = useSelector(state => state.page);
  const { currentUser, openEditProfile } = useSelector(state => state.user);

  useEffect(() => {
    if (isEditingPage) {
      setFileList([{ url: activePage.avatar[0] }]);
    }
    if (openEditProfile) {
      if (!currentUser.avatar) {
        return;
      }
      setFileList([{ url: currentUser.avatar[0] }]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditingPage, openEditProfile]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleUploadImage = async info => {
    if (info.file.status === 'removed') return;
    setUploading(true);
    const formData = new FormData();
    const imageFile = info.fileList[info.fileList.length - 1].originFileObj;
    formData.append('image', imageFile);
    try {
      const res = await MediaAPI.uploadImage(formData);
      if (res.data.url) {
        setUrl(res.data.url);
        handleChange(info);
        setUrl([res.data.url]);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    handleChange({ fileList: [] });
    setUrl([]);
  };

  const uploadButton = useMemo(
    () => (
      <div>
        {!uploading && (
          <>
            <PlusOutlined />
            <div className='mt-2'>Chọn ảnh</div>
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
      <Upload
        accept='.png,.jpg,.jpeg,.webp'
        listType='picture-circle'
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleUploadImage}
        maxCount={1}
        onRemove={handleRemoveImage}
        beforeUpload={file => {
          return new Promise((resolve, reject) => {
            const isLt5M = file.size / 1024 / 1024 < 5;
            if (isLt5M) {
              reject('File size exceeded');
            } else {
              resolve('Success');
            }
          });
        }}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt='example' style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
export default UploadAvatar;
