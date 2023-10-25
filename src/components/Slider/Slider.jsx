import Slider from 'react-slick';
import classNames from 'classnames';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlideItem from './SlideItem';

const MoveButton = props => {
  const { isNext, isPrev, style, onClick } = props;
  return (
    <button
      type='text'
      className={classNames(
        'absolute top-1/2 -translate-y-1/2 z-10 p-0 py-1 text-white hover:text-black/30 bg-gray-300/40 rounded-sm cursor-pointer',
        {
          'left-0': isPrev,
          'right-0 translate-x-1': isNext
        }
      )}
      style={{ ...style }}
      onClick={onClick}
    >
      {isNext && <RightOutlined className='text-4xl' />}
      {isPrev && <LeftOutlined className='text-4xl' />}
    </button>
  );
};

const ListSlider = ({ listData, title, isPageSlide }) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <MoveButton isNext />,
    prevArrow: <MoveButton isPrev />
  };

  return (
    <div className='w-full'>
      <h2 className='uppercase'>{title}</h2>
      <Slider {...settings} className='relative'>
        {listData.length > 0 &&
          listData.map(item => <SlideItem key={item._id} data={item} isPageSlide={isPageSlide} />)}
      </Slider>
    </div>
  );
};

export default ListSlider;
