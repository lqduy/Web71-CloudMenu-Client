import { useNavigate } from 'react-router-dom';
import { DownOutlined } from '@ant-design/icons';
import { Button, Divider, Popover, Tag } from 'antd';
import { Fragment } from 'react';
import getDateAndTime from '~/utils/functions/getDateAndTime';
import { NEWSFEED_LENGTH } from '~/utils/constants';
import SlideItem from '~/components/Slider/SlideItem';
import Skeleton from 'react-loading-skeleton';

const NewsFeed = ({ data, isLoading }) => {
  const navigate = useNavigate();
  return (
    <div className='ct-section-wrapper p-4'>
      <h3>Tin tức</h3>
      <div className='flex flex-col gap-4 mt-3'>
        {isLoading &&
          Array.from({ length: NEWSFEED_LENGTH }).map((_, index) => (
            <Skeleton key={index} count={3} />
          ))}
        {!isLoading &&
          data.map((news, index) => {
            const [formattedDate, formattedTime] = getDateAndTime(news.time);
            return (
              <Fragment key={news._id}>
                <div className='mb-0'>
                  <Tag className='bg-[#4bac4d] text-white'>{formattedTime}</Tag>
                  <span>{formattedDate}</span>
                  <Divider type='vertical' />
                  {news.madeBy} <span className='italic'>{news.action}</span>
                  <Popover
                    placement='top'
                    content={
                      news.pageData ? (
                        <SlideItem
                          data={news.pageData}
                          isPageSlide
                          className='w-[288px] shadow-none px-0'
                        />
                      ) : undefined
                    }
                  >
                    <a
                      onClick={() => navigate(`/${news.pageId}`)}
                      className='ml-1 hover:underline cursor-pointer'
                    >
                      {news.object}
                    </a>
                  </Popover>
                </div>
                {index !== NEWSFEED_LENGTH - 1 && <Divider className='my-0' />}
              </Fragment>
            );
          })}
      </div>
      <Button icon={<DownOutlined />} className='w-full mt-4'>
        Xem thêm
      </Button>
    </div>
  );
};

export default NewsFeed;
