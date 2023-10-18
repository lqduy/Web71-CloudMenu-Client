import { Link } from 'react-router-dom';
import { Row, Col, Button, Tag, Divider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { setOpenPageCreateForm } from '~/redux/page/pageSlice';
import { Fragment, useEffect, useState } from 'react';
import ListAPI from '~/services/listAPI';
import NewsAPI from '~/services/newsAPI';
import { NEWSFEED_LENGTH, TOP_LIST_LENGTH } from '~/utils/constants';
import getDateAndTime from '~/utils/functions/getDateAndTime';
import PageLayout from '~/layouts/PageLayout';

const Home = () => {
  const [topNewPageList, setTopNewPageList] = useState([]);
  const [topNewDishList, setTopNewDishList] = useState([]);
  const [newsfeed, setNewfeed] = useState([]);
  const { activePage } = useSelector(state => state.page);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchListsFromServer(ListAPI.getTopNewPage, TOP_LIST_LENGTH, setTopNewPageList);
    fetchListsFromServer(ListAPI.getTopNewDish, TOP_LIST_LENGTH, setTopNewDishList);
    fetchListsFromServer(NewsAPI.getNewest, NEWSFEED_LENGTH, setNewfeed);
  }, []);

  const fetchListsFromServer = async (apiFunction, listLength, setStateFunction) => {
    try {
      const response = await apiFunction(listLength);
      setStateFunction(response.data.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const itemWidth = `calc(100% / ${TOP_LIST_LENGTH} - 16px * (${TOP_LIST_LENGTH} - 1) / ${TOP_LIST_LENGTH})`;

  return (
    <PageLayout>
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4 min-h-screen'>
          <Col span={19} className='flex flex-col gap-4'>
            <div className='ct-section-wrapper p-2'>
              <h2>TOP TRANG MỚI</h2>
              <div className='flex gap-4'>
                {topNewPageList.map(page => (
                  <div
                    key={page._id}
                    style={{ width: itemWidth }}
                    className='bg-slate-600 p-2 h-40'
                  >
                    <h3>{page.name}</h3>
                  </div>
                ))}
              </div>
            </div>
            <div className='ct-section-wrapper p-2'>
              <h2>TOP MÓN MỚI</h2>
              <div className='flex gap-4'>
                {topNewDishList.map(page => (
                  <div
                    key={page._id}
                    style={{ width: itemWidth }}
                    className='bg-slate-600 p-2 h-40'
                  >
                    <h3>{page.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col span={5} className='flex flex-col gap-4'>
            {!activePage && (
              <div className='ct-section-wrapper flex items-end bg-create-page bg-no-repeat bg-cover bg-right h-[140px] p-1.5'>
                <Button
                  type='primary'
                  icon={<PlusOutlined />}
                  className='w-full h-11 outline outline-white'
                  onClick={() => dispatch(setOpenPageCreateForm())}
                >
                  Tạo trang kinh doanh
                </Button>
              </div>
            )}
            <div className='ct-section-wrapper min-h-[500px] p-4'>
              <h3>Tin tức</h3>
              <div className='flex flex-col gap-4 mt-3'>
                {newsfeed.map(news => {
                  const formattedTime = getDateAndTime(news.time)[1];
                  return (
                    <Fragment key={news._id}>
                      <p className='mb-0'>
                        <Tag className='bg-[#4bac4d] text-white'>{formattedTime}</Tag>
                        {news.madeBy} <span className='italic'>{news.action}</span>
                        <Link className='ml-1 hover:underline cursor-pointer'>{news.object}</Link>
                      </p>
                      <Divider className='my-0' />
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default Home;
