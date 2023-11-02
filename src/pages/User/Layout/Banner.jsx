import backgroundBanner from '~/assets/image/blog/pexels-vincent-ma-janssen-1310777.jpg';
import { Button, Tag, message } from 'antd';
import { EnvironmentOutlined, LikeOutlined, SendOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import UserAPI from '~/services/userAPI';
import { reloadPage } from '~/redux/page/pageSlice';
import { reloadUser } from '~/redux/user/userSlice';
import convertAddressToGoogleMapsUrl from '~/utils/functions/convertAddressToGoogleMapsUrl';

const Banner = ({ pageData }) => {
  const { _id, name, businessType, address, ward, district, province, avatar, likes } =
    pageData || {};
  const { isAuthenticated, currentUser } = useSelector(state => state.user);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLiked = () => {
      const isLikedPage = Array.isArray(currentUser.likes) && currentUser.likes.includes(_id);
      if (isLikedPage) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    };
    checkLiked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, pageData]);

  const handleToggleLike = async () => {
    let updatedUserData = { ...currentUser };
    if (!isLiked) {
      updatedUserData = { ...updatedUserData, likes: [...updatedUserData.likes, _id] };
    } else {
      const likes = updatedUserData.likes?.filter(pageId => pageId !== _id);
      if (!likes) return;
      updatedUserData = { ...updatedUserData, likes };
    }
    try {
      await UserAPI.update(currentUser._id, updatedUserData);
      dispatch(reloadUser());
      dispatch(reloadPage());
      if (!isLiked) {
        message.success('Đã thích trang');
      } else {
        message.success('Đã bỏ thích trang');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const googleMapsUrl = useMemo(() => {
    const fullAddress = `${address}, ${ward}, ${district}, ${province}`;
    const url = convertAddressToGoogleMapsUrl(fullAddress);
    return url;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageData]);

  return (
    <div className='md:mt-20 bg-white'>
      <div>
        <img src={backgroundBanner} className='object-cover w-full h-96 md:h-72 lg:h-80' />
      </div>
      <div className='ct-client-page-container relative h-[calc(570px-144px+16px)] lg:h-auto'>
        <div className='w-full md:px-4 xl:px-0 md:mx-0 md:absolute left-0 top-0 -translate-y-[144px] lg:-translate-y-1/2 xl:mx-0 flex flex-col lg:flex-row items-center lg:items-end gap-4 lg:gap-0'>
          <div className='bg-gray-300/60 rounded-full p-2'>
            {Array.isArray(avatar) && avatar.length > 0 ? (
              <img
                className='w-72 aspect-square rounded-full object-cover shadow-2xl'
                src={avatar[0]}
                alt={name}
              />
            ) : (
              <div className='flex items-center justify-center w-72 h-72 rounded-full text-[172px] bg-primary'>
                <span className='leading-3 font-roboto text-white'>
                  {name ? name[0] : undefined}
                </span>
              </div>
            )}
          </div>
          <div className='flex-1 flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12 lg:gap-0'>
            <div className='flex flex-col items-start gap-4'>
              <h1 className='w-full flex flex-col-reverse lg:flex-row items-center gap-2 m-0 md:pl-5 lg:text-3xl font-bold font-roboto'>
                <span>{name}</span>
                <Tag className='text-base font-normal'>{businessType}</Tag>
              </h1>
              <a href={googleMapsUrl} target='blank' className='no-underline hover:underline'>
                <p className='m-0 md:pl-5 text-gray-500'>
                  <EnvironmentOutlined className='mr-2' />
                  {address}, {ward}, <br />{district}, {province}
                </p>
              </a>
            </div>
            <div className='flex flex-col items-center lg:items-end'>
              <p className='font-bold'>{likes} lượt thích</p>
              <div className='flex gap-2'>
                <Button icon={<SendOutlined />} type='primary' size='large'>
                  Nhắn tin
                </Button>
                {isAuthenticated && (
                  <Button
                    icon={<LikeOutlined />}
                    type='primary'
                    ghost={isLiked}
                    size='large'
                    onClick={handleToggleLike}
                  >
                    {isLiked ? 'Đã thích' : 'Yêu thích'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
