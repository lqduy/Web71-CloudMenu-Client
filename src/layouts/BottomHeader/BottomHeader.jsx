/* eslint-disable indent */
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Row, Space } from 'antd';
import {
  HomeOutlined,
  BarsOutlined,
  BookOutlined,
  FileDoneOutlined,
  LineChartOutlined,
  HeartOutlined
} from '@ant-design/icons';
import Container from '~/components/Container';
import { THEME_COLOR, VIEW_NAME } from '~/utils/constants';
import { useEffect, useMemo } from 'react';
import { setThemeColor } from '~/redux/view/viewSlice';

const BottomHeader = () => {
  const { currentUser } = useSelector(state => state.user);
  const { activePage } = useSelector(state => state.page);
  const { currentView } = useSelector(state => state.view);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const themeColor = useMemo(() => {
    let color = '';
    if (activePage && activePage.themeColor) {
      color = activePage.themeColor;
    } else if (currentUser && currentUser.themeColor) {
      color = currentUser.themeColor;
    } else {
      color = THEME_COLOR.DEFAULT;
    }
    return color;
  }, [activePage, currentUser]);

  useEffect(() => {
    if (themeColor) {
      dispatch(setThemeColor(themeColor));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeColor]);

  const { _id: pageId } = activePage ?? {};
  const FOCUS_STYLE = 'bg-black/[0.1]';
  const bottomNavigationClasses = 'h-11 text-white';
  return (
    <div style={{ backgroundColor: themeColor }}>
      <Container>
        <Row className='justify-between items-center h-11'>
          <Space wrap>
            <Button
              type='text'
              icon={<HomeOutlined />}
              className={classNames(bottomNavigationClasses, {
                [FOCUS_STYLE]: currentView === VIEW_NAME.HOME
              })}
              onClick={() => navigate('/')}
            >
              Trang chủ
            </Button>
            {!activePage && (
              <Button
                type='text'
                icon={<HeartOutlined />}
                className={classNames(bottomNavigationClasses, {
                  [FOCUS_STYLE]: currentView === VIEW_NAME.LIKE
                })}
                onClick={() => navigate(`/u/${currentUser._id}/like`)}
              >
                Yêu thích
              </Button>
            )}
            {activePage && (
              <>
                <Button
                  type='text'
                  icon={<BarsOutlined />}
                  className={classNames(bottomNavigationClasses, {
                    [FOCUS_STYLE]: currentView === VIEW_NAME.DISH
                  })}
                  onClick={() => navigate(`/p/${pageId}/dish`)}
                >
                  Món ăn
                </Button>
                <Button
                  type='text'
                  icon={<BookOutlined />}
                  className={classNames(bottomNavigationClasses, {
                    [FOCUS_STYLE]: currentView === VIEW_NAME.MENU
                  })}
                  onClick={() => navigate(`/p/${pageId}/menu`)}
                >
                  Thực đơn
                </Button>
                <Button
                  type='text'
                  icon={<FileDoneOutlined />}
                  className={classNames(bottomNavigationClasses, {
                    [FOCUS_STYLE]: currentView === VIEW_NAME.ORDER
                  })}
                  onClick={() => navigate(`/p/${pageId}/order`)}
                >
                  Gọi món
                </Button>
                <Button
                  type='text'
                  icon={<LineChartOutlined />}
                  className={classNames(bottomNavigationClasses, {
                    [FOCUS_STYLE]: currentView === VIEW_NAME.SALES
                  })}
                >
                  Thống kê
                </Button>
              </>
            )}
          </Space>
        </Row>
      </Container>
    </div>
  );
};

export default BottomHeader;
