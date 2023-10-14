const SectionWrapper = ({ children, title }) => {
  return (
    <div className='shadow-xl rounded-md bg-white pb-2 min-h-[100px]'>
      <h3 className='p-4'>{title}</h3>
      {children}
    </div>
  );
};

export default SectionWrapper;
