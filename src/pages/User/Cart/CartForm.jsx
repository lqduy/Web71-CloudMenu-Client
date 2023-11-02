import { Button, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const CartForm = ({ pageData, orderInfo, setOrderInfo }) => {
  return (
    <>
      {pageData.tables && pageData.tables > 0 && (
        <>
          <h3 className='mb-4 text-lg'>Bàn</h3>
          <div className='flex flex-wrap gap-2'>
            {Array.from({ length: pageData.tables }).map((_, index) => (
              <Button
                key={index}
                type='primary'
                ghost={index + 1 !== orderInfo.tableIndex}
                className='flex justify-center items-center w-[calc(12.5%-8px*7/8)] rounded-sm'
                onClick={() => setOrderInfo(pre => ({ ...pre, tableIndex: index + 1 }))}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </>
      )}
      <h3 className='my-4 text-lg'>Tên</h3>
      <Input
        placeholder='VD: Gia đình Anh A'
        className='py-2'
        onChange={e => setOrderInfo(pre => ({ ...pre, clientName: e.target.value }))}
      />
      <h3 className='my-4 text-lg'>Ghi chú</h3>
      <TextArea
        maxLength={100}
        style={{ height: 120, resize: 'none' }}
        placeholder='VD: Nấu nhạt vị'
        onChange={e => setOrderInfo(pre => ({ ...pre, note: e.target.value }))}
      />
    </>
  );
};

export default CartForm;
