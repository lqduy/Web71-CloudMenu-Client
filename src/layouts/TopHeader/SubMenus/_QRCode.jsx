import { Modal } from 'antd';

const QRCode = ({ isModalOpen, handleCancel }) => {
  return (
    <Modal title='Basic Modal' open={isModalOpen} cancelText='Đóng' onCancel={handleCancel}>
      <QRCode value={text || '-'} />
    </Modal>
  );
};

export default QRCode;
