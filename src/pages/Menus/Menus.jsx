import { useState } from 'react';
import { Row, Col } from 'antd';
import { useForm } from 'antd/es/form/Form';
import BodyPageTopBar from '~/components/BodyPageTopBar';
import MenuForm from './MenuForm';

const Menus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4 min-h-screen'>
          <Col span={5} className='flex flex-col gap-4'>
            <div className='ct-section-wrapper min-h-[100px]'></div>
          </Col>
          <Col span={19} className='flex flex-col gap-4'>
            <BodyPageTopBar
              title={'Thực đơn'}
              createButtonTitle={'Tạo thực đơn mới'}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </Col>
        </Row>
      </div>
      <MenuForm form={form} isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </>
  );
};

export default Menus;
