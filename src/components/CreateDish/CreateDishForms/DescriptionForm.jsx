import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const DescriptionForm = ({ value, handleChange }) => {
  return (
    <div className='min-h-[224px]'>
      <ReactQuill theme='snow' value={value} onChange={handleChange} className='h-40' />;
    </div>
  );
};

export default DescriptionForm;
