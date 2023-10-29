import { useSelector } from 'react-redux';

const Footer = () => {
  const { themeColor } = useSelector(state => state.view);

  return (
    <footer
      style={{ backgroundColor: themeColor }}
      className='h-11 flex justify-center items-center mt-4 text-white'
    >
      <p className='m-0'>Copyright © 2023 by Thanh-Duy-Hieu Team</p>
    </footer>
  );
};

export default Footer;
