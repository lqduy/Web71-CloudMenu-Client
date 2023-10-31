import { useMemo } from 'react';
import { Divider, Select } from 'antd';
import { CheckOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { ORDER_STATUS } from '~/utils/constants';
import OrderAPI from '~/services/orderApi';
import getDateAndTime from '~/utils/functions/getDateAndTime';

const OrderCard = ({ data, handleReload }) => {
  const handleChangeStatus = async value => {
    const updatedData = { ...data, status: value };
    try {
      await OrderAPI.update(data._id, updatedData);
      handleReload();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleToNextStep = async () => {
    // eslint-disable-next-line no-unused-vars
    const { SHIPPING, ...stepsObject } = ORDER_STATUS;
    const steps = Object.values(stepsObject);
    const index = steps.findIndex(step => step === data.status);
    const updatedData = { ...data, status: steps[index + 1] };
    try {
      await OrderAPI.update(data._id, updatedData);
      handleReload();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const totalAmount = data.list.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const orderStatusOptions = useMemo(
    () => Object.values(ORDER_STATUS).map(status => ({ label: status, value: status })),
    []
  );

  const [formattedDate, formattedTime] = getDateAndTime(data.createdAt);

  return (
    <div key={data._id} className='w-[calc(33.33%-16px*2/3)] h-fit rounded-lg shadow-2xl'>
      <div className='bg-white rounded-t-lg p-4'>
        <div className='w-14 py-[1px] -translate-x-[16px] bg-primary text-center text-white'>
          #{data.orderIndex}
        </div>
        {data.tableIndex && <h2 className='text-center'>Bàn số {data.tableIndex}</h2>}
        {data.clientName !== '' && <h2 className='text-center'>{data.clientName}</h2>}
        <p className='mt-4 mb-1 italic'>
          {formattedTime}, {formattedDate}
        </p>
        <Divider className='mt-0' />
        <div className='flex flex-col gap-2'>
          {data.list.map(dish => {
            return (
              <div key={dish._id} className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <div className='h-20'>
                    <img src={dish.images[0]} className='h-full' />
                  </div>
                  <div>
                    <h4 className='mb-0'>{dish.name}</h4>
                    <p className='mb-0'>
                      {dish.price.toLocaleString()} đ/
                      <span className='lowercase'>{dish.unit}</span>
                    </p>
                  </div>
                </div>
                <div>
                  <div className='flex justify-center items-center w-8 h-8 rounded-full bg-primary font-bold text-white'>
                    {dish.quantity}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {data.note && (
          <>
            <Divider />
            <div className='flex gap-2'>
              <div className='w-20 text-center'>
                <InfoCircleOutlined />
              </div>
              <p className='m-0'>{data.note}</p>
            </div>
          </>
        )}
        <Divider />
        <div className='flex justify-between'>
          <h3>Tổng tiền:</h3>
          <h3>{totalAmount.toLocaleString()} đ</h3>
        </div>
      </div>
      <div className='rounded-b-lg p-4'>
        <div className='flex justify-between items-end'>
          <Select
            options={orderStatusOptions}
            value={data.status}
            onChange={handleChangeStatus}
            className='w-40 h-8'
          />
          {data.status !== ORDER_STATUS.DONE && (
            <button
              className='h-[30px] px-3 rounded bg-primary hover:bg-primary/80 text-white cursor-pointer'
              onClick={handleToNextStep}
            >
              <CheckOutlined />
              <span className='ml-1'>Bước tiếp</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
