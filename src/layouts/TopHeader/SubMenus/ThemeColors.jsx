import { CheckOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { updatePageById } from '~/redux/page/pageActions';
import { reloadPage } from '~/redux/page/pageSlice';
import { updateUserById } from '~/redux/user/userActions';
import { reloadUser } from '~/redux/user/userSlice';
import { THEME_COLOR } from '~/utils/constants';

const colors = [
  '#06c',
  '#4b6580',
  '#27ae61',
  '#9b58b5',
  '#d64457',
  '#6e9992',
  '#16a086',
  THEME_COLOR.DEFAULT,
  '#d73c8a'
];

const ThemeColors = () => {
  const { currentUser } = useSelector(state => state.user);
  const { activePage } = useSelector(state => state.page);
  const dispatch = useDispatch();

  const handleChangeThemeColor = async color => {
    if (activePage) {
      const payload = {
        id: activePage._id,
        data: { ...activePage, themeColor: color }
      };
      await dispatch(updatePageById(payload));
      dispatch(reloadPage());
    } else if (currentUser) {
      const payload = {
        id: currentUser._id,
        data: { ...currentUser, themeColor: color }
      };
      await dispatch(updateUserById(payload));
      dispatch(reloadUser());
    }
  };

  const checkSelectedColor = color => {
    console.log(color);
    if (activePage && activePage.themeColor) {
      return activePage.themeColor === color;
    } else if (currentUser && currentUser.themeColor) {
      return currentUser.themeColor === color;
    } else {
      return false;
    }
  };


  return (
    <div className='flex flex-wrap gap-2 w-28'>
      {colors.map(color => {
        const isSelectedColor = checkSelectedColor(color);
        return (
          <span
            key={color}
            className='flex justify-center items-center w-[calc(33.33%-8px*2/3)] aspect-square rounded-md cursor-pointer'
            style={{ backgroundColor: color }}
            onClick={() => handleChangeThemeColor(color)}
          >
            {isSelectedColor && <CheckOutlined className='text-white' />}
          </span>
        );
      })}
    </div>
  );
};

export default ThemeColors;
