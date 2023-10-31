import SkeletonImage from 'antd/es/skeleton/Image';
import Skeleton from 'react-loading-skeleton';

const SlideSkeleton = () => {
  return (
    <div className='flex gap-4 w-full px-1.5 translate-x-[1px]'>
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className='w-[calc(25%-16px*3/4)] p-2 bg-white shadow-md'>
          <div className='h-60 flex justify-center items-center'>
            <SkeletonImage active />
          </div>
          <div>
            <Skeleton width={'50%'} />
            <Skeleton />
            <Skeleton width={'80%'} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SlideSkeleton;
