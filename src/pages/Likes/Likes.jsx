import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '~/layouts/PageLayout';
import { setCurrentView } from '~/redux/view/viewSlice';
import { VIEW_NAME } from '~/utils/constants';
import { Row, Col, Tag } from 'antd';
import { EnvironmentOutlined, LikeOutlined } from '@ant-design/icons';
import UserAPI from '~/services/userAPI';
import { useNavigate } from 'react-router-dom';

const Likes = () => {
  const { currentUser } = useSelector(state => state.user);
  const [likedPageData, setLikedPageData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentView(VIEW_NAME.LIKE));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchLikedPages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchLikedPages = async () => {
    try {
      const res = await UserAPI.getLikes(currentUser._id);
      setLikedPageData(res.data.data);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <PageLayout>
      <div className='flex flex-col gap-4'>
        <Row gutter={16} className='mt-4 min-h-screen'>
          <Col span={5} className='flex flex-col gap-4'></Col>
          <Col span={19} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-4 w-[720px] mx-auto ct-section-wrapper p-4'>
              {likedPageData.map(page => (
                <div key={page._id} className='flex justify-between items-center w-full'>
                  <div className='flex items-center gap-4'>
                    <img src={page.avatar[0]} className='h-36' />
                    <div className='flex flex-col gap-2'>
                      <Tag className='h-fit w-fit'>{page.businessType}</Tag>
                      <h3 className='m-0 cursor-pointer' onClick={() => navigate(`/${page._id}`)}>
                        {page.name}
                      </h3>
                      <p className='text-gray-500 m-0 leading-normal'>
                        <EnvironmentOutlined className='mr-2' />
                        {page.address}, {page.ward}, <br /> {page.district}, {page.province}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col items-center gap-2'>
                    <LikeOutlined className='text-2xl' />
                    <h4>{page.likes} lượt thích</h4>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </PageLayout>
  );
};

export default Likes;
